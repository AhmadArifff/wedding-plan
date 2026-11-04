-- ==============================================================================
-- STUB: Supabase PL/pgSQL Atomic RPC Function (NikahPlan Studio)
-- Standar Keamanan: SECURITY DEFINER + SET search_path = public, pg_temp + FOR UPDATE
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.rpc_template_workspace_mutation(
    p_workspace_id UUID,
    p_target_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
    -- 1. Guard Clause: Verifikasi Autentikasi & Otorisasi Role Workspace
    IF NOT public.has_workspace_role(p_workspace_id, ARRAY['OWNER', 'EDITOR']) THEN
        RETURN jsonb_build_object(
            'isSuccess', false,
            'error', jsonb_build_object(
                'code', 'ERR_FORBIDDEN_ROLE',
                'message', 'Anda tidak memiliki akses untuk mengubah data pada rencana pernikahan ini.'
            )
        );
    END IF;

    -- 2. Row-Level Locking (FOR UPDATE) & Transaksi Atomik
    -- SELECT ... FROM public.<table_name> WHERE id = p_target_id AND workspace_id = p_workspace_id FOR UPDATE;

    RETURN jsonb_build_object(
        'isSuccess', true,
        'data', jsonb_build_object('updatedId', p_target_id)
    );

EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object(
        'isSuccess', false,
        'error', jsonb_build_object(
            'code', 'ERR_INTERNAL_SERVER',
            'message', 'Terjadi kesalahan saat memproses perubahan data.'
        )
    );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.rpc_template_workspace_mutation(UUID, UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.rpc_template_workspace_mutation(UUID, UUID) TO authenticated;
