# Rule 10: Domain Architecture, Monorepo Boundaries & Safe Logic Flow

> **Status**: PANDUAN UTAMA ARSITEKTUR TEKNIS `NikahPlan Studio (wedding-plan)`

---

## 1. Struktur Arsitektur Monorepo (Turborepo)

Proyek ini menggunakan arsitektur **Turborepo** yang memisahkan aplikasi kerja internal pasangan pengantin (`apps/web`) dari aplikasi renderer undangan publik berkecepatan tinggi (`apps/invite`):

```text
wedding-plan/
├── apps/
│   ├── web/                     # Dashboard Planner, Financial Studio, Super Admin & Invitation Builder
│   └── invite/                  # Public Invitation Renderer (/v/[slug]) - Ringan, Cepat, Terisolasi
├── packages/
│   ├── db/                      # Skema Supabase, Migrasi SQL, Views, RPCs, RLS, Zod DTOs, & Kalkulasi
│   ├── ui/                      # Design System Bersama (Tabel Finansial, KPI Card, Modal, Drawer, Toast)
│   └── invitation-blocks/       # Komponen Blok Undangan Bersama (Dipakai di Builder & Public Renderer)
└── turbo.json
```

### Batasan Ketat Antar-Paket (*Architectural Boundaries*):
1. **`apps/invite` Dilarang Mengimpor Modul Internal `apps/web`**:
   - `apps/invite` hanya boleh mengimpor dari `packages/invitation-blocks`, `packages/ui`, dan kontrak publik `packages/db/public` (`v_public_invitation_safe`).
   - Hal ini menjamin ukuran bundle undangan digital tetap sangat ringan di jaringan seluler tamu serta mencegah kebocoran logika/data finansial internal.
2. **Vertical Slice Architecture di `apps/web`**:
   - Setiap domain fitur (`budget`, `vendors`, `kitchen`, `savings`, `invitation-builder`, `admin-master`) diisolasi di dalam `src/features/<domain>/`.
   - Komunikasi lintas fitur wajib melalui `index.ts` barrel file (*Zero Deep Imports*).

---

## 2. Pemisahan 4-Layer & Safe Logic Flow

Seluruh fitur wajib mengikuti alur 4-layer:
$$\text{UI Component} \rightarrow \text{Hook / Action (Guard Clause)} \rightarrow \text{Service (Result Pattern)} \rightarrow \text{Repository (Supabase / RPC)}$$

1. **Pola Guard Clause (Early Return)**:
   - Validasi sesi, peran pengguna (`OWNER`, `EDITOR`, `VIEWER_KITCHEN`), status masa aktif `PRO_TRIAL`, dan skema `Zod` wajib dilakukan di baris paling awal. Dilarang menulis `if-else` bersarang lebih dari 2 level.
2. **Pola Result Pattern (`Result.ok` / `Result.fail`)**:
   - Seluruh method di Service Layer dan custom hooks wajib mengembalikan objek `{ isSuccess, data, error: { code, message } }`.
3. **Granular React Error Boundaries**:
   - Setiap modul utama wajib dibungkus `<ModuleErrorBoundary>` agar kegagalan pada satu widget tidak pernah menjatuhkan (*crash*) seluruh halaman.

---

## 3. Tiga Invarian Logika Bisnis NikahPlan Studio

1. **Invarian Kendali Penuh Pengguna (*100% Full User Autonomy*)**:
   - Sistem menyediakan otomatisasi kalkulasi (seperti **One-Click Sync Harga Emas Hari Ini** dan **Sinkronisasi Harga Vendor Deal ke Master Anggaran**), namun **DILARANG KERAS** menimpa, mengunci, atau menghapus baris anggaran pengguna secara paksa tanpa persetujuan eksplisit pengguna.
   - Pengguna bebas mengedit nominal kapan saja, memiliki anggaran di kategori terpisah sekaligus menguji kandidat di kategori *All-In (Venue + Catering)*.
2. **Invarian Zero Hardcoded Master Data**:
   - Dilarang meng-hardcode Daftar Kategori Pengeluaran (14 kategori), Daftar Bank Nasional, Referensi Harga Emas Harian, Template Tema Undangan, maupun Durasi Free Trial Pro di dalam file TypeScript/React. Seluruhnya wajib ditarik secara dinamis dari tabel `master_*` dan `platform_trial_configs` yang dikelola oleh Super Admin.
3. **Invarian Non-Destructive Downgrade (Setelah `PRO_TRIAL` Berakhir)**:
   - Ketika masa `PRO_TRIAL` (default 30 hari sejak registrasi) habis dan pengguna beralih ke `FREE`, pengguna **tetap 100% dapat mengakses dan mengedit** seluruh tabel Master Anggaran, Kalkulator Dapur Mandiri, dan Seleksi Vendor. Pembatasan `FREE` hanya berlaku pada fitur *Export PDF/Excel* dan penambahan *watermark* / batas kuota RSVP pada publikasi undangan digital.
