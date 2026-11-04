# Knowledge Blueprint: Supabase RLS, Views & PL/pgSQL RPC Architecture

> **Database & Security Blueprint**: Kumpulan kode SQL PostgreSQL/Supabase terverifikasi untuk mengoptimalkan performa baca/tulis dan mencegah kebocoran data pada **NikahPlan Studio**.

---

## 1. Fungsi Helper Otorisasi RLS (`has_workspace_role`)

Fungsi ini digunakan di seluruh kebijakan RLS agar pemeriksaan hak akses konsisten, cepat, dan aman dari *search_path hijacking*:

```sql
CREATE OR REPLACE FUNCTION public.has_workspace_role(
    p_workspace_id UUID,
    p_allowed_roles TEXT[]
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
BEGIN
    IF auth.uid() IS NULL THEN
        RETURN FALSE;
    END IF;

    RETURN EXISTS (
        SELECT 1
        FROM public.workspace_members wm
        WHERE wm.workspace_id = p_workspace_id
          AND wm.user_id = auth.uid()
          AND wm.member_role = ANY(p_allowed_roles)
    );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.has_workspace_role(UUID, TEXT[]) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_workspace_role(UUID, TEXT[]) TO authenticated;
```

---

## 2. Database View: `v_workspace_financial_summary` (Top KPI & Insight)

Menggabungkan seluruh metrik dashboard dalam satu pembacaan tanpa N+1 query:

```sql
CREATE OR REPLACE VIEW public.v_workspace_financial_summary
WITH (security_invoker = true)
AS
WITH latest_gold AS (
    SELECT price_per_gram
    FROM public.master_gold_prices
    ORDER BY effective_date DESC, created_at DESC
    LIMIT 1
),
budget_agg AS (
    SELECT
        bi.workspace_id,
        COALESCE(SUM(bi.quantity * bi.unit_price), 0)::NUMERIC(15,2) AS total_budget_amount,
        COALESCE(SUM(
            CASE
                WHEN bi.is_gold_mahar IS TRUE THEN
                    ((SELECT price_per_gram FROM latest_gold) - bi.unit_price) * COALESCE(bi.gold_weight_grams, bi.quantity)
                ELSE 0
            END
        ), 0)::NUMERIC(15,2) AS gold_mahar_variance_amount
    FROM public.budget_items bi
    GROUP BY bi.workspace_id
),
vendor_agg AS (
    SELECT
        v.workspace_id,
        COUNT(*) FILTER (WHERE v.selection_status = 'DEAL') AS deal_vendor_count,
        COALESCE(SUM(v.quoted_price) FILTER (WHERE v.selection_status = 'DEAL'), 0)::NUMERIC(15,2) AS total_deal_vendor_amount
    FROM public.vendors v
    GROUP BY v.workspace_id
),
kitchen_agg AS (
    SELECT
        ki.workspace_id,
        COALESCE(SUM(ki.quantity * ki.unit_price), 0)::NUMERIC(15,2) AS total_kitchen_cost
    FROM public.kitchen_items ki
    GROUP BY ki.workspace_id
)
SELECT
    w.id AS workspace_id,
    w.wedding_title,
    w.target_wedding_date,
    COALESCE(ba.total_budget_amount, 0)::NUMERIC(15,2) AS total_budget_amount,
    COALESCE(ba.gold_mahar_variance_amount, 0)::NUMERIC(15,2) AS gold_mahar_variance_amount,
    COALESCE((SELECT price_per_gram FROM latest_gold), 0)::NUMERIC(15,2) AS latest_gold_price_per_gram,
    COALESCE(va.deal_vendor_count, 0) AS deal_vendor_count,
    COALESCE(va.total_deal_vendor_amount, 0)::NUMERIC(15,2) AS total_deal_vendor_amount,
    COALESCE(kc.male_guests, 0) + COALESCE(kc.female_guests, 0) AS total_guests,
    ROUND((COALESCE(kc.male_guests, 0) + COALESCE(kc.female_guests, 0)) * COALESCE(kc.portion_multiplier, 2.0))::INT AS total_portions,
    COALESCE(ka.total_kitchen_cost, 0)::NUMERIC(15,2) AS total_kitchen_cost,
    CASE
        WHEN (COALESCE(kc.male_guests, 0) + COALESCE(kc.female_guests, 0)) > 0 THEN
            ROUND(COALESCE(ka.total_kitchen_cost, 0) / (COALESCE(kc.male_guests, 0) + COALESCE(kc.female_guests, 0)), 2)
        ELSE 0
    END::NUMERIC(15,2) AS kitchen_cost_per_guest,
    GREATEST(0, COALESCE(ba.total_budget_amount, 0) - COALESCE(sp.current_savings_amount, 0))::NUMERIC(15,2) AS savings_deficit_amount,
    CASE
        WHEN COALESCE(sp.monthly_saving_capacity, 0) > 0 THEN
            CEIL(GREATEST(0, COALESCE(ba.total_budget_amount, 0) - COALESCE(sp.current_savings_amount, 0)) / sp.monthly_saving_capacity)::INT
        ELSE NULL
    END AS estimated_saving_months,
    CASE
        WHEN ws.plan_status = 'PRO_ACTIVE' AND (ws.pro_expires_at IS NULL OR ws.pro_expires_at > NOW()) THEN 'PRO_ACTIVE'
        WHEN ws.plan_status = 'PRO_TRIAL' AND ws.trial_ends_at > NOW() THEN 'PRO_TRIAL'
        ELSE 'FREE'
    END AS effective_plan_status,
    GREATEST(0, EXTRACT(DAY FROM (ws.trial_ends_at - NOW()))::INT) AS trial_days_remaining
FROM public.workspaces w
LEFT JOIN budget_agg ba ON ba.workspace_id = w.id
LEFT JOIN vendor_agg va ON va.workspace_id = w.id
LEFT JOIN public.kitchen_configs kc ON kc.workspace_id = w.id
LEFT JOIN kitchen_agg ka ON ka.workspace_id = w.id
LEFT JOIN public.savings_plans sp ON sp.workspace_id = w.id
LEFT JOIN public.workspace_subscriptions ws ON ws.workspace_id = w.id
WHERE w.deleted_at IS NULL;
```

---

## 3. Database View: `v_public_invitation_safe` (Zero Data Leakage Barrier `/v/[slug]`)

View ini memastikan aplikasi publik `/v/[slug]` **tidak pernah** dapat mengakses data anggaran, tabungan, maupun informasi sensitif pemilik workspace:

```sql
CREATE OR REPLACE VIEW public.v_public_invitation_safe
AS
SELECT
    i.id AS invitation_id,
    i.slug,
    i.groom_nick,
    i.groom_full_name,
    i.bride_nick,
    i.bride_full_name,
    i.akad_datetime,
    i.reception_datetime,
    i.venue_name,
    i.venue_address,
    i.google_maps_url,
    mt.theme_slug,
    mt.design_tokens_json,
    CASE
        WHEN ws.plan_status = 'PRO_ACTIVE' AND (ws.pro_expires_at IS NULL OR ws.pro_expires_at > NOW()) THEN FALSE
        WHEN ws.plan_status = 'PRO_TRIAL' AND ws.trial_ends_at > NOW() THEN FALSE
        ELSE TRUE
    END AS show_free_watermark
FROM public.invitations i
JOIN public.workspaces w ON w.id = i.workspace_id AND w.deleted_at IS NULL
LEFT JOIN public.master_invitation_themes mt ON mt.id = i.theme_id
LEFT JOIN public.workspace_subscriptions ws ON ws.workspace_id = i.workspace_id
WHERE i.is_published IS TRUE;

GRANT SELECT ON public.v_public_invitation_safe TO anon, authenticated;
```

---

## 4. PL/pgSQL RPC: `rpc_sync_gold_mahar_price` (One-Click Gold Sync Atomik)

```sql
CREATE OR REPLACE FUNCTION public.rpc_sync_gold_mahar_price(
    p_workspace_id UUID,
    p_budget_item_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_latest_gold_price NUMERIC(15,2);
    v_old_unit_price    NUMERIC(15,2);
    v_weight_grams      NUMERIC(10,3);
BEGIN
    -- 1. Guard Clause: Cek Autentikasi & Hak Akses Workspace (Owner / Editor)
    IF NOT public.has_workspace_role(p_workspace_id, ARRAY['OWNER', 'EDITOR']) THEN
        RETURN jsonb_build_object(
            'isSuccess', false,
            'error', jsonb_build_object('code', 'ERR_FORBIDDEN_ROLE', 'message', 'Anda tidak memiliki izin untuk mengubah anggaran ini.')
        );
    END IF;

    -- 2. Ambil Harga Emas Acuan Terbaru
    SELECT price_per_gram INTO v_latest_gold_price
    FROM public.master_gold_prices
    ORDER BY effective_date DESC, created_at DESC
    LIMIT 1;

    IF v_latest_gold_price IS NULL THEN
        RETURN jsonb_build_object(
            'isSuccess', false,
            'error', jsonb_build_object('code', 'ERR_INVALID_PAYLOAD', 'message', 'Referensi harga emas harian belum tersedia.')
        );
    END IF;

    -- 3. Kunci Baris Item Mahar (Row-Level Locking FOR UPDATE)
    SELECT unit_price, COALESCE(gold_weight_grams, quantity)
    INTO v_old_unit_price, v_weight_grams
    FROM public.budget_items
    WHERE id = p_budget_item_id
      AND workspace_id = p_workspace_id
      AND is_gold_mahar IS TRUE
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN jsonb_build_object(
            'isSuccess', false,
            'error', jsonb_build_object('code', 'ERR_INVALID_PAYLOAD', 'message', 'Item Mahar Emas tidak ditemukan di anggaran Anda.')
        );
    END IF;

    -- 4. Perbarui Harga Satuan ke Harga Emas Hari Ini
    UPDATE public.budget_items
    SET unit_price = v_latest_gold_price,
        price_source = 'GOLD_SYNC',
        updated_at = NOW()
    WHERE id = p_budget_item_id
      AND workspace_id = p_workspace_id;

    -- 5. Catat Audit Log Transparan
    INSERT INTO public.audit_logs (workspace_id, actor_id, action_type, metadata_json)
    VALUES (
        p_workspace_id,
        auth.uid(),
        'GOLD_MAHAR_PRICE_SYNC',
        jsonb_build_object(
            'budget_item_id', p_budget_item_id,
            'old_unit_price', v_old_unit_price,
            'new_unit_price', v_latest_gold_price,
            'weight_grams', v_weight_grams
        )
    );

    RETURN jsonb_build_object(
        'isSuccess', true,
        'data', jsonb_build_object(
            'newUnitPrice', v_latest_gold_price,
            'newSubtotal', ROUND(v_latest_gold_price * v_weight_grams, 2)
        )
    );
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object(
        'isSuccess', false,
        'error', jsonb_build_object('code', 'ERR_INTERNAL_SERVER', 'message', 'Gagal menyinkronkan harga emas mahar.')
    );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.rpc_sync_gold_mahar_price(UUID, UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.rpc_sync_gold_mahar_price(UUID, UUID) TO authenticated;
```
