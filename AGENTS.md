# AGENTS.md: NikahPlan Studio — Multi-Agent Governance, Skills & Knowledge System

> **Universal Project Entry File**: File ini dibaca secara otomatis pada setiap awal sesi percakapan di lingkungan Antigravity, Claude Code, Codex, dan Cursor untuk memastikan seluruh agen mematuhi arsitektur **NikahPlan Studio (`wedding-plan`)**, spesifikasi [PRD.md](./PRD.md), [PRD-FRONTEND.md](./PRD-FRONTEND.md), [PRD-BACKEND.md](./PRD-BACKEND.md), serta disiplin cabang Git (`dev` vs `main`).

---

## 1. Identitas Proyek & Dokumen Ground-Truth

- **Nama Proyek**: **NikahPlan Studio** — Platform Perencanaan Pernikahan, Insight Finansial & Digital Invitation Builder (Monorepo)
- **Repositori GitHub**: `https://github.com/AhmadArifff/wedding-plan.git`
- **Cabang Aktif Development**: `dev` (Setiap perubahan wajib di-commit secara jelas & langsung di-push ke `origin dev`; **DILARANG KERAS melakukan merge ke `main` secara otomatis** karena merge ke `main` dilakukan manual oleh pemilik proyek).
- **Empat Pilar Dokumen Spesifikasi**:
  1. **[PRD.md](./PRD.md)**: Visi produk, 4 tingkatan peran pengguna, model berlangganan `PRO_TRIAL` 30 hari, dan arsitektur tingkat tinggi.
  2. **[PRD-FRONTEND.md](./PRD-FRONTEND.md)**: Spesifikasi UI/UX interaktif, ASCII Wireframes, koreografi animasi (`motion`, `animate-ui`, `animejs`), tabel finansial Pure Numeric, dan filter ketat Zero AI-Slop (`R-01` s.d `R-38`).
  3. **[PRD-BACKEND.md](./PRD-BACKEND.md)**: Spesifikasi Safe Logic Flow (Guard Clauses & Result Pattern), ERD Database Supabase lengkap, 3 Database Views (`v_...`), 4 PL/pgSQL Stored Procedures (`rpc_...`), serta keamanan berlapis RLS & pencegahan kebocoran data.
  4. **[.agents/session-state.json](./.agents/session-state.json)**: Single Source of Truth pelacakan sub-tugas dan batasan arsitektur terkunci (`established_constraints`).

---

## 2. Arsitektur Multi-Agen (OODA Loop & No Self-Review)

Proyek ini menerapkan siklus **OODA (Observe -> Orient -> Decide -> Act)** dengan pemisahan tegas antara **Builder** dan **Reviewer**:

1. **Orchestration Tier**:
   - `triage-router`, `problem-decomposer`, dan `goal-tracker` (pengelola `.agents/session-state.json`).
2. **Builders Tier (Pelaksana Teknis)**:
   - `frontend-engineer` & `ui-ux-designer`: Membangun `apps/web`, `apps/invite`, `packages/ui`, dan `packages/invitation-blocks` sesuai [PRD-FRONTEND.md](./PRD-FRONTEND.md).
   - `backend-engineer`: Membangun `packages/db`, skema Supabase, RLS, Views, PL/pgSQL RPC, Storage Buckets, dan Service/Repository layer sesuai [PRD-BACKEND.md](./PRD-BACKEND.md).
   - `copywriter`: Menulis mikro-kopi humanis Bahasa Indonesia tanpa klise AI dan bebas em-dash (`—`).
3. **Reviewers Tier (Verifikasi Independen — No Self-Review)**:
   - `qa-engineer`: Menguji boundary conditions, rumus matematika finansial, dan *click-through verification* Playwright (`R-35`).
   - `security-engineer`: Mengaudit kebijakan RLS 4-tier, isolasi view publik `v_public_invitation_safe`, validasi unggahan QRIS, dan rate-limiting RSVP.
   - `tech-critic`: Devil's advocate independen pemeriksa kepatuhan arsitektur sebelum commit & push ke `origin dev`.

---

## 3. Matriks Adopsi Skill & Knowledge (`.agents/` + Global Skills)

Untuk memaksimalkan kualitas implementasi, agen wajib memuat skill lokal **[.agents/skills/nikahplan-domain/SKILL.md](./.agents/skills/nikahplan-domain/SKILL.md)** bersama skill global yang relevan:

| Area Pengembangan | Skill yang Wajib Diaktifkan | Knowledge & Rules Lokal yang Diacu |
| :--- | :--- | :--- |
| **UI/UX, Design System & Anti-AI-Slop** | `antislop`, `antislop-ui`, `antislop-copywriting`, `antislop-human`, `antislop-layoutmobile`, `design-dna`, `paint` | [.agents/rules/32-visual-first-engineering.md](./.agents/rules/32-visual-first-engineering.md) · [.agents/knowledge/anti-slop-design-dna.md](./.agents/knowledge/anti-slop-design-dna.md) |
| **Komponen Tabel Anggaran, KPI & Dashboard (`apps/web`)** | `frontend`, `untitled-ui`, `shadcn-ui` | [.agents/rules/31-ui-financial-tables.md](./.agents/rules/31-ui-financial-tables.md) · [.agents/rules/30-ui-component-reasoning.md](./.agents/rules/30-ui-component-reasoning.md) |
| **Animasi Interaktif, Micro-Interactions & Undangan (`/v/[slug]`)** | `motion`, `motion-design-skill`, `animate-ui`, `animejs`, `21st-dev`, `cast`, `react-bits` | [.agents/knowledge/anti-slop-design-dna.md](./.agents/knowledge/anti-slop-design-dna.md) · [PRD-FRONTEND.md](./PRD-FRONTEND.md) |
| **Database Supabase, Views, RPC & Keamanan RLS** | `backend`, `pm` | [.agents/rules/20-database-storage.md](./.agents/rules/20-database-storage.md) · [.agents/rules/40-security-rbac-rls.md](./.agents/rules/40-security-rbac-rls.md) · [.agents/knowledge/supabase-rls-and-rpc-blueprint.md](./.agents/knowledge/supabase-rls-and-rpc-blueprint.md) |
| **Logika Domain Finansial (Emas, Dapur, Vendor, Tabungan)** | `nikahplan-domain` (`.agents/skills/nikahplan-domain/SKILL.md`) | [.agents/rules/10-domain-architecture.md](./.agents/rules/10-domain-architecture.md) · [.agents/knowledge/nikahplan-domain-logic.md](./.agents/knowledge/nikahplan-domain-logic.md) |
| **Ekspor Laporan PDF/Excel & Pengujian E2E** | `excel-export`, `qa`, `playwright`, `playwright-skill`, `tech-critic` | [.agents/workflows/playwright-verification.md](./.agents/workflows/playwright-verification.md) · [.agents/workflows/task-review-protocol.md](./.agents/workflows/task-review-protocol.md) |

---

## 4. Aturan Operasional Mutlak Proyek (`Established Constraints`)

1. **Disiplin Git Branching (`dev` Auto-Push & Larangan Merge ke `main`)**:
   - Seluruh pekerjaan pengembangan dilakukan di branch **`dev`**.
   - Setiap perubahan yang selesai wajib langsung di-commit dengan format Conventional Commits yang jelas dan langsung di-push ke `origin dev` (`git push origin dev`) sesuai [.agents/workflows/git-workflow.md](./.agents/workflows/git-workflow.md).
   - **DILARANG KERAS** melakukan merge branch `dev` ke `main` atau push langsung ke `main`. Merge ke `main` (production) dilakukan secara manual oleh pemilik proyek.
2. **Prinsip Kendali Penuh Pengguna (*100% Full User Autonomy*)**:
   - Fitur *One-Click Sync Harga Emas Hari Ini* dan *Sinkronisasi Harga Vendor Deal ke Master Anggaran* wajib bersifat opsional/membantu atas persetujuan pengguna, tanpa pernah mengunci atau menghapus baris manual pengguna.
3. **Zero Hardcoded Master Data**:
   - Seluruh data master (14 Kategori Pengeluaran, Daftar Bank, Harga Emas Harian, Tema Undangan, Durasi Trial Pro 30 Hari, dan Kode Promo) wajib dikelola secara dinamis di database Supabase dengan dukungan filter `Uncategorized / Tanpa Kategori`.
4. **Zero Data Leakage pada Undangan Publik (`/v/[slug]`)**:
   - Halaman publik undangan digital hanya diizinkan membaca dari `v_public_invitation_safe` dan dilarang keras mengekspos data anggaran, tabungan, maupun informasi pribadi pemilik workspace.

---

## 5. Peta Direktori `.agents/`

Lihat **[.agents/README.md](./.agents/README.md)** untuk daftar lengkap:
- `.agents/rules/` (`00` s.d `40`)
- `.agents/workflows/` (`git-workflow.md`, `task-review-protocol.md`, `new-feature-lifecycle.md`, `playwright-verification.md`, `record-bug-case.md`)
- `.agents/knowledge/` (`nikahplan-domain-logic.md`, `supabase-rls-and-rpc-blueprint.md`, `anti-slop-design-dna.md`, `cases/`)
- `.agents/skills/nikahplan-domain/SKILL.md`
- `.agents/stubs/` (`service-result.stub.ts`, `repository-supabase.stub.ts`, `supabase-rpc.stub.sql`)

<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, read `C:\Users\ASUS\.gemini\config\skills\antislop\SKILL.md` (core) and then the skill for the task:
- UI / visual: `C:\Users\ASUS\.gemini\config\skills\antislop-ui\SKILL.md`
- Copy & text: `C:\Users\ASUS\.gemini\config\skills\antislop-copywriting\SKILL.md`
- People: `C:\Users\ASUS\.gemini\config\skills\antislop-human\SKILL.md`
- Mobile / responsive: `C:\Users\ASUS\.gemini\config\skills\antislop-layoutmobile\SKILL.md`
- Code comments: `C:\Users\ASUS\.gemini\config\skills\antislop-code\SKILL.md`
Before starting, ask the user when antislop applies: during the work, or after it is done.
<!-- antislop:end -->
