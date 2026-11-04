# wedding-plan  -  NikahPlan Studio

**Platform Perencanaan Pernikahan, Insight Finansial & Digital Invitation Builder (Monorepo SaaS)**

Aplikasi web *all-in-one* yang membantu calon pengantin merencanakan anggaran pernikahan secara presisi (mengadopsi alur kerja spreadsheet dengan kendali penuh 100%), memantau selisih harga emas mahar harian, menyeleksi kandidat vendor secara objektif (*Decision Matrix*), menghitung kebutuhan belanja dapur mandiri, merencanakan target tabungan (*Early Warning*), serta membuat undangan digital interaktif (`/v/[slug]`) lengkap dengan fitur amplop digital (Transfer Bank & QRIS Merchant).

---

## 1. Menjalankan Aplikasi di Windows (1-Click Batch Scripts)

Untuk kemudahan pengembangan di lingkungan Windows, telah disediakan skrip `.bat` otomatis:

| File Script | Fungsi & Kegunaan |
| :--- | :--- |
| **`setup.bat`** | **Inisialisasi & Setup**: Memeriksa Node.js, memasang `pnpm`, menginstall seluruh dependensi monorepo, membuat aset gambar SVG kustom, dan menjalankan verifikasi TypeScript. |
| **`start.bat`** | **Menu Launcher Interaktif**: Menu CLI dengan pilihan menjalankan Planner, Undangan Digital, Dual Server, Uji Type-Check, atau Generate Ulang Aset. |
| **`start-all.bat`** | **Jalankan Keduanya (Dual Dev Servers)**: Otomatis membuka `apps/web` (Port 3000) dan `apps/invite` (Port 3001) di jendela CMD terpisah dan membuka browser secara otomatis. |
| **`start-web.bat`** | **Jalankan Planner Studio**: Membuka dashboard perencana di `http://localhost:3000`. |
| **`start-invite.bat`** | **Jalankan Undangan Tamu**: Membuka halaman undangan tamu di `http://localhost:3001/v/arif-windi`. |

### Menjalankan Manual via Terminal (Alternatif)

```bash
# 1. Install seluruh dependensi workspace
pnpm install

# 2. Generate aset SVG kustom (Avatar, QRIS, Cover)
pnpm generate:assets

# 3. Jalankan Planner Studio (apps/web) di port 3000
pnpm dev:web

# 4. Jalankan Undangan Tamu (apps/invite) di port 3001
pnpm dev:invite
```

---

## 2. Struktur Dokumentasi Spesifikasi & Arsitektur

| Dokumen | Fokus & Cakupan |
| :--- | :--- |
| **[PRD.md](./PRD.md)** | **Core Product Requirements Document (v1.1)**: Visi produk, 4 peran pengguna, strategi manajemen *Auto-Trial Pro Plan (30 Hari)*, struktur Monorepo Turborepo, dan logika bisnis utama. |
| **[PRD-FRONTEND.md](./PRD-FRONTEND.md)** | **Frontend Architecture, Interactive Motion & Anti-AI-Slop PRD**: Desain sistem *Warm Editorial Financial Clarity*, Dual Liveliness Dials (`ENERGY 2` untuk Studio vs `ENERGY 3` untuk Undangan), ASCII Wireframes 6 modul, *Pure Numeric Typography* tabel anggaran, dan koreografi animasi (`motion`, `animate-ui`, `animejs`). |
| **[PRD-BACKEND.md](./PRD-BACKEND.md)** | **Backend Logic Flow, Database Optimization & Security PRD**: Arsitektur 4-Layer (*Guard Clauses* & *Result Pattern*), ERD Database Supabase lengkap, *Zero Hardcoded Master Data*, 3 Database Views (`v_...`), 4 PL/pgSQL Stored Procedures (`rpc_...`), kebijakan RLS 4-tier, dan isolasi keamanan undangan publik (`v_public_invitation_safe`). |
| **[PLAN-DEVELOPMENT.md](./PLAN-DEVELOPMENT.md)** | **Pelan Pengembangan Bertahap (Development Plan)**: Tracking roadmap 8 fase, strategi UI-First dengan data dummy riil, prioritas Mobile-First (375px), dan pipeline aset gambar kustom ter-generate. |
| **[AGENTS.md](./AGENTS.md)** & **[.agents/README.md](./.agents/README.md)** | **Multi-Agent Governance, Skills & Knowledge System**: Tata kelola siklus OODA, pemetaan 42 skill global + skill lokal `nikahplan-domain`, aturan teknis (`.agents/rules/`), blueprint SQL/rumus bisnis (`.agents/knowledge/`), dan *session state* (`.agents/session-state.json`). |

---

## 3. Alur Kerja Cabang Git (`dev` vs `main`)

- **`dev` (Active Development)**: Seluruh pengembangan fitur dan perubahan kode dikerjakan di branch `dev`. Setiap perubahan di-commit secara atomik dan langsung di-push ke `origin dev`.
- **`main` (Production)**: Cabang rilis produksi. Proses *merge* dari `dev` ke `main` hanya dilakukan secara **manual** oleh pemilik proyek setelah verifikasi selesai.
