# Product Requirements Document (PRD)

## Platform Perencanaan Pernikahan, Insight Finansial & Digital Invitation Builder

| Informasi Dokumen | Detail |
| ----- | ----- |
| **Nama Proyek** | NikahPlan Studio — Wedding Planner & Invitation SaaS (Monorepo) |
| **Pengembang** | Solo Developer |
| **Tech Stack Utama** | Next.js (App Router), Turborepo, Supabase (PostgreSQL, Auth, Storage), Tailwind CSS, Shadcn UI, Vercel |
| **Status Dokumen** | Final v1.2 (Dilengkapi Rencana UI-First, Mobile-First Priority & Pipeline Aset Gambar Ter-generate) |
| **Dokumen Spesifikasi Terpecah** | [PRD-FRONTEND.md](./PRD-FRONTEND.md) (UI/UX Interaktif & Zero AI-Slop) · [PRD-BACKEND.md](./PRD-BACKEND.md) (Logic Flow, DB Optimization & Security) · [PLAN-DEVELOPMENT.md](./PLAN-DEVELOPMENT.md) (Tracking Rencana Kerja) · [AGENTS.md](./AGENTS.md) (Tata Kelola `.agents`) |

## 1. Visi & Tujuan Produk

Membangun aplikasi web *all-in-one* yang membantu calon pengantin merencanakan anggaran pernikahan secara presisi (mengadopsi alur kerja spreadsheet yang sudah teruji), memberikan kendali penuh atas pengelolaan rincian biaya, melakukan seleksi dan komparasi vendor secara objektif, mendapatkan rekomendasi finansial (termasuk pantauan harga emas mahar) agar tercapai pernikahan *minim budget* sesuai target waktu menabung, serta membuat undangan digital mandiri (*App Builder*) yang dilengkapi fitur amplop digital (Transfer Bank & QRIS Merchant).

## 2. Peran Pengguna, Hak Akses & Model Berlangganan (Subscription & Marketing Trial)

### 2.1. Tingkatan Peran Pengguna (Supabase RLS)

1. **Super Admin (Pemilik Platform)**
   * Mengelola **Data Master** global: Daftar Kategori Pengeluaran bawaan, Daftar Bank nasional, Referensi Harga Emas Harian, serta Template Tema Undangan.
   * Mengelola **Manajemen Subscription & Kampanye Marketing Trial**: Mengatur durasi *Free Trial Pro Plan* untuk pengguna baru (misal: gratis 30 hari sejak tanggal pendaftaran), membuat kode promo perpanjangan, dan memantau status langganan pengguna.
2. **Workspace Owner (Calon Pengantin - Pembuat Akun)**
   * Akses penuh (*Create, Read, Update, Delete*) dan **kendali otonom 100%** pada rencana pernikahan miliknya sendiri (Anggaran, Dapur, Seleksi Vendor, Tabungan, dan Desain Undangan).
3. **Collaborator (Pasangan / Panitia Keluarga)**
   * **Editor (Pasangan):** Akses setara Owner untuk mengubah anggaran dan memilih vendor.
   * **Viewer / Panitia Dapur:** Hanya bisa melihat anggaran atau mengelola sub-modul tertentu.
4. **Public User / Tamu Undangan (Tanpa Login)**
   * Mengakses halaman publik undangan digital (`/v/[slug]`), mengisi RSVP/ucapan, menyalin nomor rekening, atau memindai QRIS amplop digital.

### 2.2. Manajemen Subscription & Marketing Pro Trial

Untuk mendukung strategi akuisisi pengguna baru (*growth marketing*):

* **Auto-Trial Pro Plan saat Registrasi:** Setiap pengguna baru yang mendaftar otomatis mendapatkan status `PRO_TRIAL` dengan masa aktif yang dapat diatur oleh Super Admin (default: **30 hari / 1 bulan penuh** terhitung sejak `created_at` pembuatan akun).
* **Indikator Sisa Waktu Trial:** Di bagian atas dashboard pengguna, tampil *banner* informatif yang menghitung mundur sisa hari penggunaan *Pro Plan* beserta tanggal berakhirnya.
* **Perbedaan Fitur Free vs Pro (Setelah Masa Trial Berakhir):**
  * **Free Plan (Setelah Trial Habis):** Tetap bisa mengakses dan mengedit seluruh tabel Anggaran, Kalkulator Dapur Mandiri, dan Seleksi Vendor (data tidak dikunci/dihapus), namun publikasi link Undangan Digital dibatasi (*watermark* / batas kuota RSVP) dan fitur *Export PDF/Excel* dinonaktifkan.
  * **Pro Plan (Aktif / Berbayar):** Akses penuh tanpa batas ke seluruh modul, *custom slug* undangan digital aktif selamanya, amplop digital QRIS & Bank tanpa watermark, serta insight finansial lengkap.

## 3. Arsitektur Monorepo (Khusus Solo Developer)

```
wedding-monorepo/
├── apps/
│   ├── web/                 # Aplikasi Utama: Dashboard Planner, Admin Master, & Invitation Builder
│   └── invite/              # Aplikasi Publik (Ringan & Cepat): Renderer Undangan Digital (/v/[slug])
├── packages/
│   ├── db/                  # Skema Supabase, migrasi SQL, TypeScript types, & fungsi kalkulasi
│   ├── ui/                  # Komponen UI bersama (Tabel, Form, Modal, Chart)
│   └── invitation-blocks/   # Komponen blok undangan (dipakai bersama oleh Builder & Renderer)
└── turbo.json
```

## 4. Spesifikasi Fitur & Logika Bisnis

### 4.1. Prinsip Kendali Penuh Pengguna (Full User Autonomy)

* Sistem menyediakan otomatisasi untuk memudahkan pengguna, namun **keputusan akhir dan keterkaitan antar data sepenuhnya berada di tangan pengguna**.
* Pengguna bebas mengubah nominal, menambah/menghapus baris, atau memiliki anggaran di kategori terpisah sekaligus menguji kandidat di kategori *All-In (Venue + Catering)* tanpa ada penghapusan/penguncian paksa dari sistem.

### 4.2. Modul Pengingat Harga Emas Terkini (Live Gold Price Tracker)

Karena item **Mahar Emas** (contoh: $10\text{ gram}$) sangat dipengaruhi fluktuasi harga pasar di lapangan:

* **Widget Referensi Harga Emas Harian:** Menampilkan harga emas murni per gram terkini di atas tabel anggaran (misal: harga acuan hari ini vs harga per gram yang tercatat di anggaran pengguna).
* **Notifikasi Selisih Harga Mahar:** Jika pengguna menginput Mahar Emas $10\text{ gram} \times \text{Rp}1.350.000 = \text{Rp}13.500.000$, sementara harga emas di lapangan saat ini adalah $\text{Rp}1.420.000/\text{gram}$, sistem memberikan informasi selisih ($\text{+Rp}700.000$).
* **Tombol Penyesuaian Opsional (One-Click Sync):** Pengguna dapat menekan tombol *"Sesuaikan ke Harga Emas Hari Ini"* untuk memperbarui harga satuan Mahar Emas secara instan, atau tetap mempertahankan harga manual sesuai toko tempat mereka membeli.

### 4.3. Modul Dashboard & Rincian Pengeluaran (Master Anggaran)

* **Kartu Ringkasan Atas (Top KPI Cards):**
  * **Total Semua Anggaran:** Akumulasi seluruh kategori pengeluaran ($\text{Rp}81.170.000$).
  * **Total Tamu Undangan:** Diambil dari modul Tamu ($300\text{ Tamu} / 600\text{ Porsi}$).
  * **Total Biaya Dapur & Rasio per Tamu:** $\text{Rp}13.620.000 \rightarrow \text{Rp}45.400/\text{Tamu}$.
  * **Komitmen Vendor Deal:** Total biaya dari vendor yang sudah berstatus `Deal / Terpilih`.
* **Tabel Rincian Pengeluaran:** Memuat 14 kategori standar beserta rincian item yang dapat diedit langsung (*inline editing*), ditambah, atau dihapus oleh pengguna.

### 4.4. Modul Seleksi & Perbandingan Vendor (Decision Matrix)

* Menampilkan metrik **Total Vendor**, **Vendor Terpilih (Deal)**, **Total Biaya Deal**, dan **Dalam Review**.
* Mendukung 5 status seleksi: `Deal / Terpilih`, `Proses Diskusi`, `Kandidat`, `Ditolak`, dan `Arsip`.
* Saat status vendor diubah menjadi `Deal / Terpilih`, sistem menawarkan sinkronisasi harga ke baris item kebutuhan terkait di Master Anggaran, namun pengguna tetap bisa mengeditnya secara manual kapan saja.

### 4.5. Modul Tamu & Kalkulator Dapur Mandiri

* Mengelola jumlah **Tamu Laki-laki**, **Tamu Perempuan**, dan **Faktor Pengali Porsi** (contoh: $300\text{ tamu} \times 2 = 600\text{ porsi}$).
* Tabel rincian belanja bahan dapur (*Beras, Daging Sapi, Daging Ayam, Bumbu & Sayur, Minyak & LPG, Buah & Es, Jasa Tukang Masak*) yang otomatis menjumlahkan **Total Biaya Dapur** dan menghitung **Biaya Makan per Tamu**.

### 4.6. Modul Perencanaan Tabungan & Insight Finansial (Minim Budget)

* Menghitung **Sisa Kebutuhan Dana** ($\text{Total Anggaran} - \text{Tabungan Saat Ini}$) dan **Estimasi Durasi Menabung (Bulan)** berdasarkan kapasitas menabung bulanan pasangan.
* Memberikan peringatan dini (*Early Warning*) jika harga kandidat vendor di lembar seleksi melampaui plafon anggaran awal atau jika kenaikan harga emas mahar memengaruhi target tabungan.

### 4.7. Modul App Builder Undangan Digital & Amplop QRIS

* Editor visual berbasis blok untuk mengatur informasi mempelai, tanggal akad/resepsi, lokasi Google Maps, tema warna, serta **Amplop Digital** (daftar rekening bank dengan tombol salin otomatis & unggah gambar kode **QRIS Merchant**).

---

## 5. Pendekatan Pengembangan: UI-First dengan Data Dummy Realistis

Untuk mempercepat validasi produk, kenyamanan interaksi (*ergonomi UX*), dan kesempurnaan desain visual sebelum integrasi database:

1. **Strategi UI-First**:
   - Seluruh modul antarmuka (`apps/web` dan `apps/invite`) dibangun terlebih dahulu dengan status interaktif penuh menggunakan mock/dummy data layer.
   - Komponen UI tidak menunggu backend/skema database selesai, melainkan langsung dapat dicoba alur kliknya, transisi animasinya, inline editing, serta responsivitasnya.
2. **Dataset Dummy Realistis Pernikahan Indonesia**:
   - Data pengujian tidak menggunakan placeholder asal-asalan seperti *"Lorem Ipsum"* atau angka acak `12345`.
   - Menggunakan rincian riil pernikahan Indonesia: 14 kategori lengkap, item seserahan, vendor riil (MUA, Fotografi, Katering, Venue), belanja 7 bahan pokok dapur, harga emas Antam harian riil (misal $\text{Rp}1.420.000/\text{gram}$), dan simulasi ucapan tamu nyata.

---

## 6. Standar Rekayasa Visual Mobile-First (Mobile-to-Desktop Priority)

Mengingat calon pengantin dan tamu undangan mayoritas mengakses aplikasi melalui smartphone:

1. **Prioritas Utama Layar Ponsel (Mobile Viewport 375px - 430px)**:
   - Desain tata letak, komponen tabel, kartu metrik, formulir, dan navigasi wajib dirancang dan disempurnakan untuk layar smartphone terlebih dahulu.
   - Memenuhi zona sentuh jempol (*Thumb Zone*), *Bottom Navigation Bar / Sticky Bottom Action*, dan penggunaan *Slide-Over / Bottom Sheet Drawer* alih-alih modal pop-up yang sempit di ponsel.
   - Target sentuh minimal $44 \times 44\text{px}$ (`R-03`) dan bebas dari *horizontal scroll overflow*.
2. **Progressive Enhancement ke Desktop**:
   - Setelah tampilan ponsel terbukti nyaman dan intuitif, tata letak ditingkatkan (*progressive enhancement*) secara elegan ke layar tablet dan desktop monitor lebar (ekspansi kolom spreadsheet, multi-column dashboard, split-view builder undangan).

---

## 7. Protokol Aset Gambar Kustom Ter-generate (Zero Scraped/Stock Photos)

Untuk menjamin kustomisasi penuh, konsistensi gaya visual, dan mencegah tautan gambar rusak (*broken links*) atau pelanggaran hak cipta:

1. **Dilarang Mengambil / Hotlinking Gambar dari Internet**:
   - Dilarang menggunakan URL gambar eksternal dari Unsplash, Pexels, Freepik, atau situs web lain.
2. **Pipeline Aset Ter-generate (Custom Generated Assets)**:
   - Seluruh aset visual (avatar mempelai, foto profil vendor, ilustrasi mahar emas, thumbnail tema undangan, dan gambar kode **QRIS Merchant**) wajib diproduksi secara kustom menggunakan tool generator gambar AI / skrip generator vektor SVG lokal.
   - Seluruh aset tersimpan secara lokal dan mandiri di dalam repositori (`packages/ui/assets/generated/` atau `apps/web/public/generated/`) sehingga dapat dimodifikasi warnanya, disesuaikan rasionya, dan bekerja 100% secara offline.

---

## 8. Pelacakan & Rencana Pengembangan Bertahap (Development Plan)

Rencana kerja teknis, pembagian milestone/sprint, dan acceptance criteria pelacakan didefinisikan secara rinci pada dokumen **[PLAN-DEVELOPMENT.md](./PLAN-DEVELOPMENT.md)** serta tersinkronisasi di [.agents/session-state.json](./.agents/session-state.json).
