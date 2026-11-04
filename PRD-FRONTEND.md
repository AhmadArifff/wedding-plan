# Product Requirements Document: Frontend Architecture & Interactive UI/UX (`PRD-FRONTEND.md`)

| Informasi Dokumen | Detail |
| :--- | :--- |
| **Nama Proyek** | NikahPlan Studio (Wedding Planner, Financial Insight & Digital Invitation SaaS) |
| **Dokumen Terkait** | [PRD.md](./PRD.md) (Core Architecture) · [PRD-BACKEND.md](./PRD-BACKEND.md) (Backend, DB & Security) |
| **Cakupan Aplikasi** | `apps/web` (Dashboard Planner, Super Admin & Invitation Builder) · `apps/invite` (Public Renderer `/v/[slug]`) · `packages/ui` · `packages/invitation-blocks` |
| **Tech Stack Frontend** | Next.js (App Router), TypeScript, Tailwind CSS, Shadcn UI, Untitled UI Primitives, Motion (Framer Motion), Animate UI, Anime.js, Zustand, TanStack Query |
| **Standar Kualitas** | Zero AI-Slop (`antislop` R-01 s.d R-38), Visual-First Engineering (`Rule 32`), UI Component Reasoning (`Rule 30`), Pure Numeric Financial Tables (`Rule 31`), WCAG AA Contrast |

---

## 1. Filosofi Desain, Identitas Visual & Anti-AI-Slop Mandate

Dokumen ini menjadi acuan tunggal (*Single Source of Truth*) bagi `frontend-engineer` dan `ui-ux-designer` agar antarmuka **NikahPlan Studio** terasa dirancang oleh desainer produk kelas atas (*crafted by a human designer*), memiliki micro-interactions yang hidup, bebas dari kesan template AI generik (*Zero AI Slop*), dan memberikan kenyamanan kognitif saat pengguna mengelola ratusan baris anggaran pernikahan.

### 1.1. Design Read & Deklarasi Liveliness Dials (`antislop` Part 3)

Karena monorepo ini memiliki dua aplikasi dengan tujuan psikologis yang berbeda, sistem menetapkan **Dua Profil Liveliness Dials** yang eksplisit:

1. **Workspace Perencanaan & Finansial (`apps/web`)**:
   > **Design Read**: *"Reading this as: Collaborative Personal Finance & Event Planning Studio for engaged couples and family committees, in a Warm Editorial Financial Clarity style, dial `ENERGY 2 / RHYTHM 2 / MOTION 2`."*
   - **ENERGY 2 (Balanced)**: Hangat, tenang, dan terstruktur. Menghindari tampilan akuntansi korporat yang kaku maupun dekorasi pernikahan yang berlebihan di halaman tabel kerja.
   - **RHYTHM 2 (Consistent with Intentional Breaks)**: Tata letak dashboard konsisten (8pt grid), dipadukan dengan pemecah ritme visual pada **Widget Harga Emas Harian** dan **Banner Sisa Trial Pro**.
   - **MOTION 2 (Purposeful Transitions & Micro-Interactions)**: Transisi angka finansial berpegas (*spring physics*), *highlight pulse* saat sinkronisasi harga emas/vendor, dan *slide-over drawer* yang mulus.

2. **Halaman Publik Undangan Digital (`apps/invite` -> `/v/[slug]`)**:
   > **Design Read**: *"Reading this as: Bespoke Interactive Digital Wedding Invitation for invited guests on mobile devices, in an Editorial Heritage & Botanical Storytelling style, dial `ENERGY 3 / RHYTHM 3 / MOTION 3`."*
   - **ENERGY 3 (Bold Editorial)**: Tipografi serif ekspresif untuk nama mempelai, komposisi layar pembuka (*cover*) yang berkarakter, dan palet warna kurasi dari Database Tema.
   - **RHYTHM 3 (Asymmetric & Varied Storytelling)**: Setiap blok undangan (Sampul -> Ayat/Kutipan -> Profil Mempelai -> Timeline Acara -> Peta Lokasi -> Galeri -> Amplop Digital QRIS -> Ucapan RSVP) memiliki komposisi visual yang bervariasi, bukan tumpukan kartu seragam.
   - **MOTION 3 (Choreographed Scroll & Envelope Physics)**: Animasi pembukaan segel amplop undangan (`animejs` + `motion`), *scroll-triggered reveal* bertahap, serta mikro-interaksi salin rekening & perbesar QRIS.

---

### 1.2. Sistem Token Warna & Tipografi (Maksimal 3 Warna Inti + 1 Aksen — `R-29` & `R-25`)

> [!IMPORTANT]
> **Larangan Mutlak Warna AI Slop (`R-01`)**: Dilarang keras menggunakan gradien biru-ke-ungu (`from-blue-500 to-purple-600`), efek *neon glow* di seluruh halaman, atau latar belakang gelap tanpa alasan identitas merek.

#### A. Palet Warna `apps/web` (Warm Editorial Financial Clarity)

| Peran Token | Nama Warna | Hex / Tailwind Token | Rasio Kontras (WCAG AA) | Alasan Penggunaan Tertulis (`R-31`) |
| :--- | :--- | :--- | :---: | :--- |
| **Background Canvas** | Warm Alabaster | `#FAF8F5` (`bg-[#FAF8F5]`) | — | Memberikan permukaan baca yang hangat dan tidak menyilaukan mata saat menyunting tabel anggaran berjam-jam. |
| **Surface Card / Table** | Crisp Ivory White | `#FFFFFF` (`bg-white` + `border-[#E7E5E4]`) | — | Memisahkan area kerja tabel dan kartu KPI dari latar belakang menggunakan border 1px tegas tanpa bayangan berlebih. |
| **Primary Text & Numerals** | Deep Espresso | `#1C1917` (`text-stone-900`) | **16.4 : 1** (AAA) | Menjamin keterbacaan maksimal pada angka rupiah dan teks rincian item di layar mobile maupun desktop. |
| **Muted / Meta Text** | Warm Slate | `#57534E` (`text-stone-600`) | **7.2 : 1** (AAA) | Digunakan untuk label kolom sekunder, satuan (`gram`, `porsi`), dan keterangan waktu tanpa mengaburkan fokus utama. |
| **Primary Brand & Deal Accent** | Botanical Emerald | `#0F766E` (`teal-700` / `emerald-700`) | **5.4 : 1** (AA) | Menandai aksi primer, status `Deal / Terpilih`, dan indikator tabungan sehat (asosiasi psikologis pertumbuhan & kepastian). |
| **Secondary Mahar / Alert Accent** | Champagne Amber | `#B45309` (`amber-700` / `bg-amber-50`) | **5.0 : 1** (AA) | Digunakan khusus pada **Widget Harga Emas Mahar**, peringatan selisih anggaran (*Early Warning*), dan sisa hari *Pro Trial*. |
| **Destructive / Over-Budget** | Crimson Rose | `#BE123C` (`rose-700` / `bg-rose-50`) | **6.1 : 1** (AA) | Menandai selisih defisit anggaran kritis, aksi hapus baris, atau status vendor `Ditolak`. |

#### B. Sistem Tipografi 3-Tingkat (`R-06` & `Rule 32`)

1. **Display / Editorial Heading (Khusus Undangan & Header Sambutan)**:
   - Font: `Cormorant Garamond` atau `Instrument Serif` (via `next/font/google`).
   - Alasan (`R-31`): Menghadirkan sentuhan editorial pernikahan yang hangat dan elegan pada judul momen spesial.
2. **UI & Workspace Sans (Seluruh Navigasi, Form & Tabel)**:
   - Font: `Plus Jakarta Sans` (via `next/font/google`).
   - Alasan (`R-31`): Proporsi huruf x-height tinggi dan ramah untuk pembaca Indonesia pada antarmuka padat data.
3. **Numeric & Financial Data (Angka Anggaran, Harga Emas, Rasio Porsi)**:
   - Font: `Plus Jakarta Sans` atau `JetBrains Mono` dengan properti CSS wajib `font-variant-numeric: tabular-nums` (`tabular-nums`).
   - Alasan (`R-31`): Memastikan satuan, ribuan, dan jutaan pada kolom angka sejajar vertikal secara presisi seperti buku besar akuntansi.

---

### 1.3. Aturan Mutlak Anti-Slop pada Copywriting & Elemen Visual (`R-01` s.d `R-38`)

1. **Larangan Mutlak Karakter Em-Dash (`R-02`)**:
   - Seluruh teks UI, label, *placeholder*, pesan *empty state*, *toast*, dan deskripsi di dalam kode aplikasi **DILARANG KERAS** memuat karakter em-dash (`—`). Gunakan tanda koma (`,`), titik dua (`:`), atau tanda kurung `()`.
2. **Larangan Kata Klise AI (`R-15` & `R-16`)**:
   - Dilarang menggunakan kata *"Revolutionary"*, *"Seamless"*, *"AI-Powered"*, *"Cutting-Edge"*, atau tombol generik *"Get Started"* / *"Learn More"*.
   - Gunakan CTA kontekstual yang spesifik:
     - `"Mulai Susun Anggaran (Gratis 30 Hari Pro)"`
     - `"Sesuaikan ke Harga Emas Hari Ini"`
     - `"Sinkronkan Harga Deal ke Anggaran"`
     - `"Buka Undangan & Isi Konfirmasi Kehadiran"`
3. **Dose Caps untuk Efek Visual (`R-10`, `R-12`, `R-13`)**:
   - **Glassmorphism (`R-10`)**: Maksimal digunakan pada **2 elemen** di seluruh layar: (1) Sticky Header Bar saat di-scroll, dan (2) Floating Bottom Action Dock pada editor undangan (`backdrop-blur-md bg-white/85`). Dilarang mem-blur kartu tabel atau sidebar secara bersamaan.
   - **Glow (`R-13`)**: Maksimal digunakan pada **1 elemen fokus** (indikator aktif *Live Gold Price*).
   - **Shadow (`R-12`)**: Kartu tabel dan KPI menggunakan border tegas `1px solid #E7E5E4` dengan `shadow-none` atau `shadow-xs`. Bayangan elevasi (`shadow-lg`) hanya diizinkan untuk komponen melayang (Modal, Popover, Slide-Over Drawer, dan Toast).
4. **Larangan Statistik & Testimoni Fiktif (`R-17`, `R-18`, `R-36`, `R-38`)**:
   - Pada halaman landing page atau dashboard, dilarang mengarang klaim palsu seperti *"Dipercaya 50.000+ Pasangan Indonesia"* atau membuat avatar testimoni palsu. Tampilkan simulasi interaktif kalkulator anggaran nyata sebagai bukti nilai produk (*Evidence Over Claims — C-5*).

---

## 2. Arsitektur Teknis Frontend & Safe Logic Flow

### 2.1. Struktur Vertical Slice di Dalam Monorepo

Setiap modul bisnis di `apps/web/src/features/` diisolasi menggunakan **Vertical Slice Architecture** agar perubahan pada satu modul tidak merusak modul lain:

```text
apps/web/src/
├── app/                          # Next.js App Router (Routing, Layouts, Error/Loading Boundaries)
│   ├── (auth)/                   # Login, Register (Auto-Trial Pro 30 Hari), Forgot Password
│   ├── (workspace)/              # Protected Workspace Area (Owner & Collaborators)
│   │   ├── [workspaceId]/
│   │   │   ├── dashboard/        # Master Anggaran, Top KPI Cards & Gold Tracker Widget
│   │   │   ├── vendors/          # Seleksi & Perbandingan Vendor (Decision Matrix)
│   │   │   ├── kitchen/          # Kalkulator Tamu & Belanja Dapur Mandiri
│   │   │   ├── savings/          # Perencanaan Tabungan & Early Warning Insight
│   │   │   ├── invitation/       # Visual Block Invitation Builder & QRIS Manager
│   │   │   └── settings/         # Kolaborator (Pasangan/Panitia) & Status Langganan
│   └── (super-admin)/            # Super Admin Portal (Dynamic Master Data & Promo Trial)
├── features/                     # Vertical Slices (Domain-Driven Frontend Modules)
│   ├── budget/                   # Master Anggaran & Inline Spreadsheet Editor
│   │   ├── api/                  # Repository HTTP/Supabase calls
│   │   ├── adapters/             # Transformasi DTO DB -> UI Domain Model
│   │   ├── components/           # BudgetTable, InlineCell, CategoryGroup, GoldDiffBanner
│   │   ├── hooks/                # useBudgetMutation, useGoldPriceSync (Result Pattern)
│   │   ├── types/                # Domain interfaces
│   │   └── index.ts              # Public API barrel (No deep imports allowed!)
│   ├── vendors/                  # Decision Matrix & Deal-to-Budget Sync Modal
│   ├── kitchen/                  # Guest Multiplier & Kitchen Ingredient Calculator
│   ├── savings/                  # Monthly Saving Target & Early Warning Engine
│   ├── invitation-builder/       # Drag-and-drop Block Editor & Mobile Preview Frame
│   └── admin-master/             # Dynamic Master Categories, Banks, Gold Price, Trial Config
└── shared/                       # ErrorBoundary, Result<T,E> helper, Toast manager, Formatters
```

### 2.2. Standar Alur Logika Aman Client-Side (*Safe Logic Flow*)

1. **Guard Clauses & Early Return**:
   - Seluruh event handler dan custom hook wajib memvalidasi prasyarat di baris awal (misal: cek izin `Viewer` vs `Editor`, cek validitas angka positif) sebelum memanggil mutasi API.
2. **Result Pattern (`Result.ok` / `Result.fail`)**:
   - Semua fungsi di `features/*/api/` wajib mengembalikan objek `{ isSuccess: boolean, data?: T, error?: AppError }` sehingga komponen UI selalu menangani skenario gagal secara eksplisit tanpa *unhandled promise rejection*.
3. **Granular React Error Boundaries**:
   - Setiap widget utama (Gold Price Tracker, Tabel Master Anggaran, Preview Undangan) dibungkus dengan `<ModuleErrorBoundary>` mandiri. Jika widget harga emas gagal memuat data, tabel anggaran tetap dapat diedit dengan lancar.
4. **Zero Emoji Icons**:
   - Seluruh ikon menggunakan SVG konsisten (`lucide-react` dengan ketebalan `strokeWidth={1.75}` dan ukuran `w-4 h-4` / `w-5 h-5`) atau ilustrasi vektor kustom. Dilarang menggunakan emoji (seperti 💰, 💍, 🍳) sebagai ikon antarmuka.

---

## 3. Spesifikasi Visual, ASCII Wireframes & Koreografi Animasi per Modul

Sesuai **Rule 32 (Visual-First Engineering)**, berikut adalah spesifikasi tata letak (ASCII Wireframe), matriks komponen (`Rule 30`), dan koreografi animasi untuk setiap modul.

### 3.1. Modul Banner Pro Trial & Widget Pengingat Harga Emas Terkini

#### A. ASCII Wireframe (Bagian Atas Dashboard `apps/web`)
```text
+--------------------------------------------------------------------------------------------------+
| [PRO TRIAL AKTIF: Sisa 28 Hari (Berakhir 04 Des 2026)]       [Masukkan Kode Promo] [Upgrade Pro] |
+--------------------------------------------------------------------------------------------------+
| ACUAN HARGA EMAS HARI INI (Update: 04 Nov 2026, 09:00 WIB)                                       |
| Harga Pasar: Rp 1.420.000 /gr  |  Di Anggaran Anda (10 gr): Rp 1.350.000 /gr                     |
| Status Mahar: Selisih +Rp 700.000 dari rencana awal    [Sesuaikan ke Harga Emas Hari Ini] [Abaikan] |
+--------------------------------------------------------------------------------------------------+
| KPI 1: TOTAL SEMUA ANGGARAN  | KPI 2: TAMU & PORSI      | KPI 3: BIAYA DAPUR/TAMU | KPI 4: VENDOR DEAL |
| Rp 81.170.000                | 300 Tamu (600 Porsi)     | Rp 13.620.000           | Rp 42.500.000      |
| 14 Kategori Aktif            | Faktor Pengali: 2.0x     | Rasio: Rp 45.400 /Tamu  | 5 Vendor Terpilih  |
+--------------------------------------------------------------------------------------------------+
```

#### B. Koreografi Animasi & Interaksi
- **Sliding Number Counter (`@animate-ui` / Motion Spring)**:
  - Saat pengguna menekan tombol **"Sesuaikan ke Harga Emas Hari Ini"**, terbuka **Popover Confirmation** (`Rule 30`) tepat di bawah tombol: *"Perbarui harga satuan Mahar Emas (10 gr) dari 1.350.000 menjadi 1.420.000? Anda tetap dapat mengubahnya manual kapan saja."*
  - Setelah dikonfirmasi, angka di KPI 1 (`Total Semua Anggaran`) bertransisi mulus dengan animasi *spring* dari `81.170.000` ke `81.870.000` dalam `450ms`, diikuti *Toast hijau* pasif di pojok kanan atas.
- **Indikator Sisa Trial Pro**:
  - Jika sisa waktu trial $> 7$ hari: tampil sebagai *slim top bar* tenang berwarna `stone-100` dengan badge `teal-700`.
  - Jika sisa waktu trial $\le 7$ hari: berubah menjadi `amber-50` dengan border `amber-200` dan tombol klaim kode promo perpanjangan.
  - Jika trial berakhir (masuk ke **Free Plan**): menampilkan informasi jujur bahwa **seluruh data Anggaran, Dapur, dan Vendor tetap 100% dapat diakses dan diedit**, hanya fitur Export PDF/Excel dan kuota/watermark publikasi undangan yang dibatasi.

---

### 3.2. Modul Master Anggaran (Spreadsheet-Grade Inline Editing & Pure Numeric Table)

Mematuhi **Rule 31 (Single Unified Table & Pure Numeric Typography)** serta **Prinsip Kendali Penuh Pengguna (4.1)**.

#### A. ASCII Wireframe Tabel Rincian Pengeluaran
```text
+--------------------------------------------------------------------------------------------------+
| Filter Kategori: [Semua Kategori (14) v] [Tanpa Kategori (0)]   [Cari item...]   [+ Tambah Item] |
+--------------------------------------------------------------------------------------------------+
| KATEGORI / NAMA ITEM           |   VOLUME | SATUAN |  HARGA SATUAN |     SUBTOTAL | STATUS / AKSI|
+--------------------------------------------------------------------------------------------------+
| v 01. SESERAHAN & MAHAR (3 Item)                                     Subtotal:       18.200.000  |
|   Mahar Emas Logam Mulia [Emas]|       10 | gram   |     1.420.000 |   14.200.000 | [Manual] [..] |
|   Kotak Hantaran & Jasa Hias   |        1 | paket  |     1.500.000 |    1.500.000 | [Deal]   [..] |
|   Isi Seserahan Kosmetik       |        1 | paket  |     2.500.000 |    2.500.000 | [Rencana][..] |
+--------------------------------------------------------------------------------------------------+
| v 02. VENUE & GEDUNG (1 Item)                                        Subtotal:       15.000.000  |
|   Sewa Gedung Serbaguna        |        1 | hari   |    15.000.000 |   15.000.000 | [Deal]   [..] |
+--------------------------------------------------------------------------------------------------+
| ... (Kategori 03 s.d 14 dapat di-collapse/expand atau ditambah kategori kustom oleh pengguna)    |
+==================================================================================================+
| TOTAL AKUMULASI ANGGARAN (tfoot sticky bottom)                                       81.870.000  |
+==================================================================================================+
```

#### B. Aturan Kritis Tabel Finansial & UX Spreadsheet
1. **Pure Numeric Typography (`Rule 31`)**:
   - Di dalam sel tabel (`<td>`), **DILARANG** mengulang teks `"Rp "` pada setiap baris agar mata pengguna tidak lelah. Format angka menggunakan titik pemisah ribuan murni (`14.200.000`), rata kanan (`text-right tabular-nums`). Simbol `"Rp"` hanya ditampilkan pada header kolom (`HARGA SATUAN (Rp)`) dan kartu ringkasan KPI atas.
2. **Inline Editing Berkecepatan Tinggi (Keyboard-First `R-32`)**:
   - Klik satu kali atau tekan `Enter` pada sel `Nama Item`, `Volume`, `Satuan`, atau `Harga Satuan` langsung mengubah sel menjadi input aktif tanpa menggeser lebar kolom (*Zero Layout Shift*).
   - Menekan `Tab` berpindah ke kolom sebelah kanan; menekan `Enter` menyimpan perubahan secara optimistik (*Optimistic UI Update via TanStack Query*); menekan `Escape` membatalkan perubahan.
3. **Full User Autonomy (Tanpa Penguncian Paksa)**:
   - Meskipun sebuah baris memiliki lencana `[Tersinkron Vendor Deal]`, pengguna tetap diizinkan mengedit nominalnya secara manual kapan saja. Jika diedit manual, sistem cukup mengubah lencana menjadi `[Diedit Manual]` tanpa memblokir input pengguna.
4. **Filter Bebas Miskonsepsi**:
   - Filter kategori wajib menyediakan opsi: `Semua Kategori`, `Tanpa Kategori (Unassigned)`, dan daftar kategori dinamis dari database.

---

### 3.3. Modul Seleksi & Perbandingan Vendor (Decision Matrix)

#### A. ASCII Wireframe Decision Matrix
```text
+--------------------------------------------------------------------------------------------------+
| Metrik: [Total Kandidat: 18]  [Vendor Terpilih (Deal): 5]  [Total Deal: Rp 42.5M]  [Review: 6]   |
+--------------------------------------------------------------------------------------------------+
| Mode Tampilan: (o) Tabel Komparasi Objektif   ( ) Papan Status Seleksi     [+ Tambah Kandidat]   |
| Filter Kategori: [Semua (18) v] [Catering (4)] [Venue All-In (3)] [MUA (5)] [Tanpa Kategori (1)] |
+--------------------------------------------------------------------------------------------------+
| NAMA VENDOR        | KATEGORI       | HARGA PENAWARAN | SELISIH PLAFON | STATUS SELEKSI   | AKSI |
+--------------------------------------------------------------------------------------------------+
| Sanggar Rias Ayu   | MUA & Busana   |       8.500.000 |     -500.000   | [Deal / Terpilih]| [..] |
| Gedung Graha Indah | Paket All-In   |      45.000.000 |   +2.000.000 ! | [Proses Diskusi] | [..] |
| Catering Ibu Sari  | Katering       |      18.000.000 |            0   | [Kandidat]       | [..] |
+--------------------------------------------------------------------------------------------------+
```

#### B. Alur Interaksi Sinkronisasi Opsional (`Deal / Terpilih`)
- Saat pengguna mengubah dropdown status vendor menjadi **`Deal / Terpilih`**, sistem **TIDAK** langsung menimpa angka di Master Anggaran secara diam-diam.
- Sistem membuka **Modal / Slide-Over Konfirmasi Sinkronisasi** (`Rule 30`):
  - Menampilkan perbandingan: *"Harga di Master Anggaran saat ini: Rp 9.000.000 -> Harga Deal Sanggar Rias Ayu: Rp 8.500.000 (Hemat Rp 500.000)."*
  - Menyediakan 2 tombol jelas:
    1. **`"Perbarui Baris Anggaran Terkait"`** (Menyinkronkan harga ke item anggaran yang dipilih).
    2. **`"Simpan Status Deal Saja (Jangan Ubah Anggaran)"`** (Menjaga otonomi penuh pengguna yang ingin menguji skenario terpisah).

---

### 3.4. Modul Tamu & Kalkulator Dapur Mandiri

#### A. ASCII Wireframe Kalkulator Dapur Mandiri
```text
+--------------------------------------------------------------------------------------------------+
| PARAMETER TAMU & PORSI                                    RINGKASAN EFISIENSI DAPUR              |
| Tamu Laki-laki : [ - ]  150  [ + ]                        Total Biaya Dapur : Rp 13.620.000      |
| Tamu Perempuan : [ - ]  150  [ + ]                        Total Tamu        : 300 Orang          |
| Faktor Porsi   : [ 1.5x ] [ 2.0x (Aktif) ] [ Kustom ]     Total Porsi Masak : 600 Porsi          |
|                                                           Biaya per Tamu    : Rp 45.400 /Tamu    |
|                                                           Biaya per Porsi   : Rp 22.700 /Porsi   |
+--------------------------------------------------------------------------------------------------+
| RINCIAN BELANJA BAHAN DAPUR MANDIRI                                      [+ Tambah Bahan Dapur]  |
| KOMPONEN BAHAN                | KEBUTUHAN | SATUAN | HARGA SATUAN |    TOTAL BIAYA | CATATAN     |
| 1. Beras Kualitas Super       |       100 | kg     |       15.000 |      1.500.000 | Pasar Induk |
| 2. Daging Sapi Segar          |        45 | kg     |      135.000 |      6.075.000 | Langganan   |
| 3. Daging Ayam Potong         |        60 | ekor   |       38.000 |      2.280.000 | -           |
| 4. Bumbu, Sayur & Santan      |         1 | paket  |    1.765.000 |      1.765.000 | -           |
| 5. Minyak Goreng & Gas LPG    |         1 | paket  |      600.000 |        600.000 | -           |
| 6. Buah, Kerupuk & Es         |         1 | paket  |      600.000 |        600.000 | -           |
| 7. Jasa Tukang Masak & Bantu  |         1 | tim    |      800.000 |        800.000 | 4 Orang     |
+==================================================================================================+
| TOTAL BELANJA DAPUR MANDIRI                                             13.620.000               |
+==================================================================================================+
```

---

### 3.5. Modul Perencanaan Tabungan & Insight Finansial (Minim Budget)

#### A. ASCII Wireframe Insight Finansial & Early Warning
```text
+--------------------------------------------------------------------------------------------------+
| [!] PERINGATAN DINI FINANSIAL (EARLY WARNING CALLOUT)                                            |
| • Kenaikan harga emas mahar (+Rp 700.000) dan kandidat vendor "Gedung Graha Indah" (+Rp 2.000.000)|
|   berpotensi menambah waktu menabung Anda selama +0.6 bulan jika dipilih.                        |
+--------------------------------------------------------------------------------------------------+
| SIMULATOR TARGET TABUNGAN PASANGAN                                                               |
| Total Kebutuhan Anggaran : Rp 81.170.000                                                         |
| Tabungan Saat Ini        : [ Rp 36.170.000        ] (44.5% Terkumpul)                            |
| Sisa Kebutuhan Dana      : Rp 45.000.000                                                         |
| Kapasitas Menabung/Bulan : [ Rp 4.500.000  /bulan ] (Gabungan Calon Pengantin)                   |
| Estimasi Durasi Menabung : 10 Bulan Lagi (Target Tercapai: September 2027)                       |
| [=============================44.5%=============================................................] |
+--------------------------------------------------------------------------------------------------+
```

---

### 3.6. Modul App Builder Undangan Digital (`apps/web`) & Public Renderer (`apps/invite`)

#### A. ASCII Wireframe Editor Visual Undangan (`apps/web`)
```text
+--------------------------------------------------------------------------------------------------+
| Undangan: nikahplan.id/v/arif-dan-siti    [Status: Draft]   [Salin Link] [Publikasikan Undangan] |
+-----------------------------------------------+--------------------------------------------------+
| PANEL KONFIGURASI BLOK (Kiri - Scrollable)    | LIVE MOBILE PREVIEW (Kanan - Frame 375x812px)    |
|                                               |   +------------------------------------------+   |
| [1. Tema & Tipografi v]                       |   |          THE WEDDING OF                  |   |
|    Pilih Tema: [Javanese Heritage] [Botanical]|   |         Arif & Siti                      |   |
| [2. Informasi Mempelai v]                     |   |       Minggu, 14 November 2027           |   |
|    Mempelai Pria & Wanita, Nama Orang Tua     |   |                                          |   |
| [3. Waktu & Lokasi Acara (Google Maps) v]     |   |   [ Lokasi Akad & Resepsi (Peta) ]       |   |
|    Akad Nikah & Resepsi + Pin Koordinat Peta  |   |                                          |   |
| [4. Amplop Digital (Transfer Bank & QRIS) v]  |   |   +----------------------------------+   |   |
|    + Rekening 1: BCA - 1234567890 a.n Arif    |   |   | AMPLOP DIGITAL (Tanda Kasih)     |   |   |
|    + Unggah Kode QRIS Merchant (PNG/JPG/WebP) |   |   | BCA 1234567890  [Salin Rekening] |   |   |
| [5. Form RSVP & Buku Tamu Ucapan v]           |   |   | [ Tampilkan Kode QRIS Merchant ] |   |   |
|    Batas Kuota RSVP & Filter Kata Kasar       |   |   +----------------------------------+   |   |
+-----------------------------------------------+--------------------------------------------------+
```

#### B. Pengalaman Interaktif Tamu di `/v/[slug]` (`apps/invite`)
1. **Layar Sampul Terpersonalisasi (`?to=Nama+Tamu`)**:
   - Menampilkan nama tamu undangan secara elegan dengan tombol **"Buka Undangan"**.
   - Saat diklik, layar sampul membuka ke atas dengan transisi `cubic-bezier(0.22, 1, 0.36, 1)` berdurasi `700ms` tanpa lag di perangkat mobile kelas bawah (`devicePixelRatio` terjaga).
2. **Fitur Amplop Digital (Transfer Bank & QRIS Merchant)**:
   - **Tombol Salin Rekening**: Menyalin nomor rekening ke *clipboard*, mengubah ikon salin menjadi tanda centang hijau selama `2 detik`, dan memunculkan Toast: *"Nomor rekening BCA berhasil disalin"*.
   - **Tampilan QRIS Merchant**: Menampilkan gambar QRIS yang tervalidasi tajam dengan tombol **"Unduh Gambar QRIS"** agar tamu mudah mengimpor kode QRIS ke aplikasi mobile banking / e-wallet mereka.
3. **Penanganan Watermark & Kuota (Free Plan vs Pro Plan)**:
   - Jika masa `PRO_TRIAL` pemilik acara telah habis dan belum upgrade ke `PRO_ACTIVE`, bagian kaki (*footer*) undangan menampilkan atribusi bersih `"Dibuat dengan NikahPlan Studio"` serta membatasi tampilan form RSVP jika kuota Free Plan telah tercapai, tanpa merusak tampilan informasi acara utama.

---

## 4. Standar Wajib 3-State UI (Empty, Loading, Error — `R-27` & `C-4`)

Setiap tabel, kartu metrik, dan daftar di aplikasi **WAJIB** mengimplementasikan 3 kondisi berikut:

| Modul | Empty State (Saat Data Kosong) | Loading State (Saat Fetch Data) | Error State (Saat Gagal Jaringan/API) |
| :--- | :--- | :--- | :--- |
| **Master Anggaran** | Ilustrasi garis buku anggaran + tombol *"Muat 14 Kategori Standar Pernikahan"* atau *"Tambah Baris Pertama"*. | Skeleton baris tabel dengan tinggi persis `44px` per baris agar tidak terjadi *layout shift*. | Banner kuning/merah ramah: *"Gagal memuat rincian anggaran. Periksa koneksi Anda."* + tombol `[Coba Lagi]`. |
| **Decision Matrix Vendor** | Pesan *"Belum ada kandidat vendor yang dibandingkan"* + tombol *"+ Tambah Kandidat Vendor Pertama"*. | Skeleton 4 kartu metrik atas + 5 baris skeleton tabel vendor. | Inline alert dengan tombol retry tanpa menghapus filter yang sedang dipilih pengguna. |
| **Kalkulator Dapur** | Menampilkan template 7 bahan pokok dapur standar yang siap diaktifkan dengan 1 klik. | Shimmer halus pada kartu ringkasan rasio biaya per tamu. | Fallback kalkulasi lokal (client-side cache) + indikator *"Menyimpan perubahan saat kembali online"*. |
| **Buku Tamu & RSVP (`/v/[slug]`)** | *"Jadilah yang pertama memberikan doa dan ucapan selamat untuk kedua mempelai."* | 3 kartu ucapan skeleton beranimasi pulse lembut. | Toast ramah saat submit gagal: *"Ucapan belum terkirim karena koneksi terputus. Silakan tekan Kirim kembali."* |

---

## 5. Pemetaan Katalog Skill Frontend yang Wajib Diaktifkan

Saat agen `frontend-engineer` atau `ui-ux-designer` mengeksekusi sub-tugas dari PRD ini, agen **WAJIB** memuat skill berikut:

1. **`skills/antislop/SKILL.md` + `skills/antislop-ui/SKILL.md` + `skills/antislop-copywriting/SKILL.md`**: Filter mutlak sebelum dan sesudah penulisan kode UI.
2. **`skills/antislop-human/SKILL.md` + `skills/antislop-layoutmobile/SKILL.md`**: Audit kontras warna matematis, navigasi keyboard (`Tab`/`Enter`/`Escape`), dan pencegahan *horizontal overflow* di layar 375px.
3. **`skills/untitled-ui/SKILL.md` & `skills/shadcn-ui/SKILL.md`**: Arsitektur Application Shell, Top KPI Cards, Data Table, Slide-Over Sheet, Popover, dan Dialog.
4. **`skills/animate-ui/SKILL.md` & `skills/motion/SKILL.md` & `skills/motion-design-skill/SKILL.md`**: Animasi perubahan angka finansial (*sliding number*), transisi status vendor (`layoutId`), dan koreografi pembukaan undangan digital.
5. **`skills/21st-dev/SKILL.md` & `skills/cast/SKILL.md`**: Komponen interaktif khusus pada halaman publik undangan digital (`/v/[slug]`) dan *live preview dock*.
6. **`skills/playwright/SKILL.md`**: Pengujian klik nyata (*click-through verification* `R-35`) pada seluruh tombol, modal, inline edit, dan salin nomor rekening sebelum serah terima.

---

## 6. Standar Rekayasa Visual Mobile-First Priority (Mobile-to-Desktop)

Sesuai instruksi pengembangan, **fokus utama pengerjaan antarmuka adalah layar ponsel (Mobile-First)** sebelum diperluas ke tampilan desktop.

### 6.1. Spesifikasi Viewport & Ergonomi Jempol (Thumb Zone)

| Dimensi Layar | Target Breakpoint | Perilaku Navigasi & Komponen Utama |
| :--- | :--- | :--- |
| **Mobile Compact (Prioritas 1)** | `375px` s.d `430px` (iPhone & Android) | **Bottom Navigation Bar** sticky di bawah, filter horizontal chip scrollable dengan scroll-snap, form edit menggunakan **Slide-Up Bottom Sheet**, tombol aksi mengambang (*Floating Action Button / Sticky Bottom Bar*), ukuran tap target $\ge 44 \times 44\text{px}$, tanpa overflow horizontal (`R-03`). |
| **Tablet / iPad (Prioritas 2)** | `768px` s.d `1023px` | Header navigasi atas mulai aktif, KPI cards 2x2 grid, tabel anggaran menampilkan kolom volume & satuan inline, modal dialog tengah dengan backdrop blur halus. |
| **Desktop / Laptop (Prioritas 3)** | `1024px` s.d `1440px` | Sidebar navigasi kiri sticky, KPI cards 4 kolom berjajar, tabel spreadsheet penuh dengan sticky header & footer, split-view 50:50 pada Digital Invitation Builder. |

---

### 6.2. ASCII Wireframe Versi Mobile (Layar 375px)

#### A. Mobile Wireframe: Dashboard & Master Anggaran (`apps/web`)
```text
+------------------------------------------+
| [=] NikahPlan Studio        (Arif & Siti)|
+------------------------------------------+
| [!] PRO TRIAL: Sisa 28 Hari    [Kode >]  |
+------------------------------------------+
| EMAS HARI INI: Rp 1.420.000 /gr          |
| Di Anggaran Anda : Rp 1.350.000 (10 gr)  |
| Selisih          : +Rp 700.000           |
| [  Sesuaikan ke Harga Emas Hari Ini  ]   |
+------------------------------------------+
| RINGKASAN ANGGARAN (Swipe KPI Cards):    |
| [ TOTAL SEMUA ]  [ TAMU & PORSI ]        |
|   81.170.000       300 Tamu / 600 Porsi  |
+------------------------------------------+
| Kategori: ( Semua ) ( Seserahan ) ( Gedung ) >
| [ Cari item kebutuhan...               ] |
+------------------------------------------+
| v 01. SESERAHAN & MAHAR (Rp 18.2M)       |
| • Mahar Emas Logam Mulia (10 gr)         |
|   1.420.000 /gr  ->  14.200.000  [Edit >]|
| • Kotak Hantaran & Jasa Hias             |
|   1 paket        ->   1.500.000  [Edit >]|
+------------------------------------------+
| v 02. VENUE & GEDUNG (Rp 15.0M)          |
| • Sewa Gedung Serbaguna                  |
|   1 hari         ->  15.000.000  [Edit >]|
+------------------------------------------+
| [Sticky Bottom Total: Rp 81.870.000]     |
| [Tab: Anggaran] [Vendor] [Dapur] [Undang]|
+------------------------------------------+
```

#### B. Mobile Wireframe: Decision Matrix Vendor (`apps/web`)
```text
+------------------------------------------+
| [=] Seleksi & Komparasi Vendor           |
+------------------------------------------+
| METRIK CEPAT:                            |
| Total: 18  |  Deal: 5  |  Review: 6      |
+------------------------------------------+
| Filter: [ Semua ] [ Catering ] [ MUA ] > |
+------------------------------------------+
| CARD KANDIDAT VENDOR:                    |
| +--------------------------------------+ |
| | Sanggar Rias Ayu        [DEAL / HIJAU| |
| | Kategori    : MUA & Busana Pengantin | |
| | Penawaran   : 8.500.000              | |
| | Selisih     : -500.000 (Di Bawah Max)| |
| | [ Ubah Status v ]  [ Detail Catatan ]| |
| +--------------------------------------+ |
| | Gedung Graha Indah    [DISKUSI/KUNING| |
| | Kategori    : Paket Venue All-In     | |
| | Penawaran   : 45.000.000             | |
| | Selisih     : +2.000.000 (LEWAT MAX!)| |
| | [ Ubah Status v ]  [ Detail Catatan ]| |
| +--------------------------------------+ |
| [+ Tambah Kandidat Vendor Baru (Sticky)] |
+------------------------------------------+
```

#### C. Mobile Wireframe: Kalkulator Dapur Mandiri (`apps/web`)
```text
+------------------------------------------+
| [=] Tamu & Kalkulator Dapur Mandiri      |
+------------------------------------------+
| TAMU UNDANGAN:                           |
| Laki-laki  : [ - ]  150  [ + ]           |
| Perempuan  : [ - ]  150  [ + ]           |
| Total Tamu : 300 Tamu                    |
|                                          |
| PENGALI PORSI MASAK:                     |
| [ 1.5x ]  [ 2.0x (Aktif) ]  [ Kustom ]   |
| -> Estimasi Porsi: 600 Porsi             |
+------------------------------------------+
| EFISIENSI BIAYA DAPUR:                   |
| Total Belanja  : Rp 13.620.000           |
| Biaya per Tamu : Rp 45.400 /Tamu         |
+------------------------------------------+
| DAFTAR BELANJA BAHAN POKOK:              |
| 1. Beras Super    : 100 kg  -> 1.500.000 |
| 2. Daging Sapi    : 45 kg   -> 6.075.000 |
| 3. Daging Ayam    : 60 ekor -> 2.280.000 |
| 4. Bumbu & Sayur  : 1 paket -> 1.765.000 |
| 5. Minyak & LPG   : 1 paket ->   600.000 |
| 6. Buah & Es      : 1 paket ->   600.000 |
| 7. Tukang Masak   : 1 tim   ->   800.000 |
+------------------------------------------+
| [+ Tambah Item Belanja Bahan Dapur]      |
+------------------------------------------+
```

#### D. Mobile Wireframe: Undangan Publik & Amplop QRIS (`apps/invite` `/v/[slug]`)
```text
+------------------------------------------+
| (Layar Buka: Slide-Up Envelope Reveal)   |
|                                          |
|           WALIMATUL 'URS                 |
|            Arif & Siti                   |
|      Minggu, 14 November 2027            |
|                                          |
|      Kepada Yth. Bapak/Ibu:              |
|         [ Budi Santoso ]                 |
|                                          |
|         [  BUKA UNDANGAN  ]              |
|                                          |
| (Setelah Dibuka: Scroll Cerita Mengalir) |
| • Ayat Suci & Sambutan                   |
| • Profil Mempelai & Foto Ter-generate    |
| • Waktu Akad & Resepsi + Google Maps     |
|                                          |
| TANDA KASIH & AMPLOP DIGITAL:            |
| +--------------------------------------+ |
| | Bank BCA : 1234567890 a.n Ahmad Arif | |
| | [ Salin Nomor Rekening (Animasi) ]   | |
| +--------------------------------------+ |
| | [ TAMPILKAN KODE QRIS MERCHANT ]     | |
| | (Gambar QRIS Ter-generate Tajam)     | |
| | [ Unduh Gambar Kode QRIS ]           | |
| +--------------------------------------+ |
|                                          |
| BUKU TAMU & KONFIRMASI RSVP:             |
| [ Masukkan Nama Anda                 ]   |
| Kehadiran: (o) Hadir  ( ) Ragu  ( ) Tidak|
| Jumlah Tamu: [ 2 Orang v ]               |
| [ Tulis Doa & Ucapan Selamat...      ]   |
| [    KIRIM KONFIRMASI KEHADIRAN      ]   |
+------------------------------------------+
```

---

## 7. Dataset Dummy Realistis Pernikahan Indonesia (UI-First Mock Engine)

Pengembangan tampilan UI **tidak menunggu koneksi Supabase**, melainkan menggunakan engine dataset dummy terstruktur di `packages/ui/mock/` atau `apps/web/src/shared/mock/`:

1. **Identitas Pernikahan**:
   - Judul: *"Pernikahan Arif & Siti"*
   - Tanggal Target: `14 November 2027`
   - Profil Mempelai: Ahmad Arif, S.Kom (Putra Bpk. H. Mahmud & Ibu Hj. Aminah) & Siti Rahmawati, S.Pd (Putri Bpk. Drs. H. Subagyo & Ibu Hj. Endang).
2. **Master Anggaran (14 Kategori & 32 Item Riil)**:
   - Total Akumulasi Anggaran Awal: `Rp 81.170.000`.
   - Item Mahar Emas: Logam Mulia 10 gram, harga anggaran `Rp 1.350.000/gram` (subtotal `Rp 13.500.000`).
   - Harga Emas Hari Ini: `Rp 1.420.000/gram` (selisih `+Rp 700.000`).
3. **Seleksi Vendor (18 Kandidat across 5 Status)**:
   - `DEAL`: Sanggar Rias Ayu (`Rp 8.500.000`), Gedung Graha Sakinah (`Rp 15.000.000`), Fotografi Lensa Cinta (`Rp 4.500.000`), Sewa Tenda Buana (`Rp 8.000.000`), MC Akad Ustadz Fauzan (`Rp 1.200.000`).
   - `DISCUSSION`: Catering Ibu Hajah Dewi (`Rp 18.000.000` - plafon `Rp 16.000.000` / over-budget flag aktif).
   - `CANDIDATE`, `REJECTED`, `ARCHIVED` terisi dengan rincian kontak dan catatan negosiasi riil.
4. **Bahan Dapur Mandiri (7 Komponen)**:
   - 300 Tamu (150 Laki-laki, 150 Perempuan), Pengali Porsi `2.0x` (600 Porsi).
   - Rincian belanja: Beras (`Rp 1.500.000`), Daging Sapi (`Rp 6.075.000`), Daging Ayam (`Rp 2.280.000`), Bumbu & Sayur (`Rp 1.765.000`), Minyak & Gas (`Rp 600.000`), Buah & Es (`Rp 600.000`), Tim Masak (`Rp 800.000`) -> Total `Rp 13.620.000` (`Rp 45.400/tamu`).
5. **Amplop Digital**:
   - Rekening BCA: `1234567890` a.n Ahmad Arif.
   - Rekening Bank Mandiri: `9876543210` a.n Siti Rahmawati.
   - Kode QRIS Merchant dummy ter-generate tajam dengan nama toko *"NikahPlan - Arif & Siti Wedding"*.

---

## 8. Pipeline Aset Visual Ter-generate (Zero Stock Photos Protocol)

> [!CAUTION]
> **Larangan Mutlak Scraping / Hotlinking Foto Internet**:
> Dilarang menggunakan URL eksternal dari situs luar (seperti Unsplash, Pinterest, Google Images). Seluruh aset visual wajib diproduksi secara kustom menggunakan tool generator gambar AI atau skrip generator SVG lokal.

### 8.1. Spesifikasi Aset Ter-generate & Lokasi Penyimpanan

Seluruh aset disimpan di direktori lokal `packages/ui/assets/generated/` dan di-serve via `public/generated/`:

1. **Avatar Pasangan Mempelai (`avatar-groom.webp` & `avatar-bride.webp`)**:
   - Format: WebP rasio 1:1 (`400x400px`).
   - Karakter: Ilustrasi potret elegan bernuansa busana adat modern Indonesia (warna netral hangat, tanpa wajah cacat AI, resolusi tajam).
2. **Thumbnail Tema Undangan Digital (`theme-javanese-heritage.webp`, `theme-botanical-sage.webp`, `theme-minimal-editorial.webp`)**:
   - Format: WebP rasio 9:16 (`540x960px`).
   - Karakter: Komposisi tata letak undangan editorial dengan ornamen dedaunan botani atau sulur motif nusantara yang berkelas.
3. **Gambar Kode QRIS Merchant (`qris-merchant-dummy.png`)**:
   - Format: PNG tajam (`600x750px`).
   - Karakter: Format standar QRIS Nasional Indonesia lengkap dengan logo QRIS resmi, bingkai National Standard QR Code, nama merchant *"NikahPlan: Arif & Siti"*, dan barcode matriks yang dapat dipindai.
4. **Ilustrasi Logam Mulia Mahar (`gold-mahar-illustration.svg`)**:
   - Format: Vektor SVG bersih dengan gradien emas hangat `#D97706` ke `#F59E0B`.
   - Karakter: Gambar koin / emas batangan elegan sebagai pendukung visual widget *Live Gold Price Tracker*.


