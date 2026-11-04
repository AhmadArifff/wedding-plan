# Scaffolding Stubs & Boilerplate Templates (`NikahPlan Studio`)

Direktori ini berisi template kode standar (*stubs*) untuk menjaga konsistensi arsitektur 4-layer, pola `Guard Clause` + `Result Pattern`, dan keamanan Stored Procedure Supabase (`SECURITY DEFINER`) di proyek **NikahPlan Studio (`wedding-plan`)**.

---

## Daftar Stubs Tersedia

1. **[service-result.stub.ts](./service-result.stub.ts)**: Template Service Layer TypeScript dengan *Guard Clauses*, *Early Return*, dan *Result Pattern* (`Result.ok` / `Result.fail`).
2. **[repository-supabase.stub.ts](./repository-supabase.stub.ts)**: Template Repository Layer untuk isolasi query Supabase, View, RPC, dan penanganan filter `ALL` / `UNASSIGNED` / `CATEGORY_ID`.
3. **[supabase-rpc.stub.sql](./supabase-rpc.stub.sql)**: Template Stored Procedure PL/pgSQL Supabase berkeamanan tinggi (`SECURITY DEFINER`, `SET search_path = public, pg_temp`, `has_workspace_role`, dan `FOR UPDATE` row locking).
