# Peta Navigasi Tata Kelola `.agents/` — NikahPlan Studio (`wedding-plan`)

Selamat datang di direktori tata kelola arsitektur, aturan kerja, basis pengetahuan, dan keahlian agen AI untuk **NikahPlan Studio**. Proyek ini mengadopsi protokol **Child Spoke** dari **Master Hub (`agentic AI`)** yang telah disesuaikan khusus untuk kebutuhan [PRD.md](../PRD.md), [PRD-FRONTEND.md](../PRD-FRONTEND.md), dan [PRD-BACKEND.md](../PRD-BACKEND.md).

---

## 1. Peta Aturan Berdasarkan Area Kerja (*Task-Based Rules*)

| Jika Sedang Mengerjakan... | Buka & Patuhi Dokumen: | Cakupan Utama |
| :--- | :--- | :--- |
| **Semua Tugas (Wajib Selalu Aktif)** | **[rules/00-core-guardrails.md](./rules/00-core-guardrails.md)** & **[rules/01-workflow-discipline.md](./rules/01-workflow-discipline.md)** | Siklus OODA, Evaluasi 7 Pilar, No Self-Review, perlindungan kredensial, dan sinkronisasi `session-state.json`. |
| **Arsitektur Monorepo & Business Logic** (`apps/**`, `packages/**`) | **[rules/10-domain-architecture.md](./rules/10-domain-architecture.md)** | Batas Turborepo (`apps/web` vs `apps/invite`), Vertical Slice, Guard Clauses, Result Pattern, Full User Autonomy, dan Zero Hardcoded Master Data. |
| **Database Supabase, Views, RPC & Storage** (`packages/db/**`) | **[rules/20-database-storage.md](./rules/20-database-storage.md)** | Presisi angka `NUMERIC(15,2)`, 3 Views wajib, 4 PL/pgSQL RPC (`SECURITY DEFINER` + `SET search_path`), dan isolasi 2 Bucket Storage. |
| ** Pemilihan Elemen UI (Modal/Drawer/Popover/Toast)** | **[rules/30-ui-component-reasoning.md](./rules/30-ui-component-reasoning.md)** | Matriks reasoning komponen interaktif, lapisan Z-Index, dan focus trap. |
| **Tabel Master Anggaran, Dapur & Vendor** | **[rules/31-ui-financial-tables.md](./rules/31-ui-financial-tables.md)** | Single Unified Table, Pure Numeric Typography (`14.200.000` tanpa `"Rp "` di sel), Inline Editing keyboard, dan filter `Uncategorized`. |
| **Slicing UI, Animasi Interaktif & Anti-AI-Slop** | **[rules/32-visual-first-engineering.md](./rules/32-visual-first-engineering.md)** | ASCII Wireframe Gate, Dual Liveliness Dials (`ENERGY 2` vs `ENERGY 3`), larangan em-dash (`R-02`), dan wajib 3-State UI. |
| **Keamanan, RLS 4-Tier & Anti Kebocoran Data** | **[rules/40-security-rbac-rls.md](./rules/40-security-rbac-rls.md)** | Kebijakan RLS `SUPER_ADMIN`, `OWNER`, `EDITOR`, `VIEWER_KITCHEN`, dan isolasi `PUBLIC_GUEST` (`/v/[slug]`). |

---

## 2. Prosedur Kerja Baku (*Workflows*)

- **[workflows/git-workflow.md](./workflows/git-workflow.md)**: **[MUTLAK]** Setiap perubahan di-commit atomik dan langsung di-push ke branch `dev` (`git push origin dev`). **DILARANG KERAS melakukan merge ke branch `main`** (merge ke `main` dilakukan manual oleh pengguna).
- **[workflows/task-review-protocol.md](./workflows/task-review-protocol.md)**: Evaluasi 7 pilar sebelum penulisan kode fitur baru.
- **[workflows/new-feature-lifecycle.md](./workflows/new-feature-lifecycle.md)**: Siklus hidup pengembangan fitur end-to-end.
- **[workflows/playwright-verification.md](./workflows/playwright-verification.md)**: Pengujian browser interaktif dan *click-through smoke test* (`R-35`).
- **[workflows/record-bug-case.md](./workflows/record-bug-case.md)**: Pencatatan setiap bug yang ditemukan ke dalam `.agents/knowledge/cases/`.

---

## 3. Cetak Biru Pengetahuan (*Knowledge Blueprints*) & Skill Lokal

- **[knowledge/nikahplan-domain-logic.md](./knowledge/nikahplan-domain-logic.md)**: Rumus matematika Live Gold Price Tracker, Kalkulator Dapur Mandiri, Proyeksi Tabungan, dan 14 Kategori Standar.
- **[knowledge/supabase-rls-and-rpc-blueprint.md](./knowledge/supabase-rls-and-rpc-blueprint.md)**: Kode SQL siap pakai untuk RLS helper, Views, dan PL/pgSQL RPCs.
- **[knowledge/anti-slop-design-dna.md](./knowledge/anti-slop-design-dna.md)**: Profil Design DNA JSON dan resep koreografi animasi (`motion`, `animate-ui`, `animejs`).
- **[skills/nikahplan-domain/SKILL.md](./skills/nikahplan-domain/SKILL.md)**: Skill orkestrasi domain NikahPlan Studio yang menghubungkan 42 skill global.
- **[stubs/](./stubs/)**: Template kode TypeScript Service (`Result Pattern`), Repository, dan Supabase RPC.
