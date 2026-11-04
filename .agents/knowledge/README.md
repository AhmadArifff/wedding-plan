# Knowledge Base & Production Blueprints (`NikahPlan Studio`)

Direktori ini menyimpan basis pengetahuan domain, rumus bisnis finansial, cetak biru SQL Supabase (Views, PL/pgSQL RPC, RLS), profil Design DNA, serta bank kasus bug lokal untuk **NikahPlan Studio (`wedding-plan`)**.

---

## 1. Daftar Dokumen Blueprint Utama

| Berkas Knowledge | Cakupan Pengetahuan | Peran Pengguna Utama |
| :--- | :--- | :--- |
| **[nikahplan-domain-logic.md](./nikahplan-domain-logic.md)** | Rumus matematika Live Gold Price Tracker, Kalkulator Dapur Mandiri, Proyeksi Tabungan & Early Warning, 14 Kategori Standar, serta aturan Pro Trial 30 Hari. | `backend-engineer`, `frontend-engineer`, `data-cross-verifier` |
| **[supabase-rls-and-rpc-blueprint.md](./supabase-rls-and-rpc-blueprint.md)** | Kode SQL siap pakai untuk RLS Helper, `v_workspace_financial_summary`, `v_public_invitation_safe`, `rpc_sync_gold_mahar_price`, `rpc_sync_vendor_deal_to_budget`, dan `rpc_redeem_promo_code`. | `backend-engineer`, `security-engineer`, `qa-engineer` |
| **[anti-slop-design-dna.md](./anti-slop-design-dna.md)** | Profil JSON Design DNA 3-Dimensi (Tokens, Visual Style, Motion Choreography) untuk `apps/web` dan `apps/invite` bebas AI-Slop. | `frontend-engineer`, `ui-ux-designer`, `copywriter` |
| **[cases/README.md](./cases/README.md)** | Bank kasus bug lokal & ketidaksesuaian yang telah terverifikasi (`case-YYYYMMDD-slug.yaml`). | Seluruh Agen |
