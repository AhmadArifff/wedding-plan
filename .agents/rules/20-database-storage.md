# Rule 20: Database Optimization, Supabase RPC/Views & Cloud Storage Standards

> **Status**: STANDAR BASIS DATA & STORAGE `NikahPlan Studio (wedding-plan)`

---

## 1. Presisi Matematika Finansial & Penanganan Filter Tanpa Miskonsepsi

1. **Presisi Angka Rupiah & Berat Emas**:
   - Seluruh kolom nominal uang wajib menggunakan `NUMERIC(15, 2)` atau `BIGINT` (satuan Rupiah utuh).
   - Kolom berat emas mahar (`gold_weight_grams`) wajib menggunakan `NUMERIC(10, 3)`.
   - **DILARANG KERAS** menggunakan tipe data `FLOAT` atau `REAL` pada perhitungan uang, porsi dapur, atau harga emas.
2. **Filter `NULL` / `Unassigned` yang Transparan**:
   - Kolom `category_id` pada `budget_items` dan `vendors` mengizinkan nilai `NULL` (`ON DELETE SET NULL`).
   - Query Repository wajib menyediakan 3 cabang filter eksplisit: `ALL`, `UNASSIGNED` (`WHERE category_id IS NULL`), dan `<category_uuid>` agar tidak ada baris anggaran atau vendor yang "hilang secara misterius" saat pengguna memfilter data.

---

## 2. Pemaksimalan Database Views (`v_...`) & Stored Procedures (`rpc_...`)

Untuk menghindari duplikasi rumus finansial di frontend/backend dan mengeliminasi masalah N+1 query:

### A. Tiga Database Views Wajib (`CREATE VIEW`)
1. **`v_workspace_financial_summary`**:
   - Menghitung secara *pre-compiled* metrik Top KPI Cards: Total Semua Anggaran, Total Tamu & Porsi (`male + female` dan `total * multiplier`), Total Biaya Dapur & Rasio per Tamu, Komitmen Vendor Deal, Selisih Harga Emas Mahar (`gold_mahar_variance_amount`), Sisa Kebutuhan Dana Tabungan, Estimasi Bulan Menabung, dan Sisa Hari `PRO_TRIAL`.
2. **`v_vendor_decision_matrix`**:
   - Menyajikan perbandingan harga penawaran vendor terhadap plafon kategori dan menghasilkan flag `is_over_ceiling` untuk fitur *Early Warning*.
3. **`v_public_invitation_safe`**:
   - View khusus berkeamanan tinggi untuk halaman publik `/v/[slug]`. Hanya menampilkan informasi acara publik, blok undangan aktif, rekening/QRIS aktif, dan ucapan RSVP yang disetujui. Sama sekali tidak menyertakan kolom anggaran atau tabungan pasangan pengantin.

### B. Empat Supabase PL/pgSQL RPC Wajib (`SECURITY DEFINER`)
Setiap fungsi RPC dengan `SECURITY DEFINER` **WAJIB** memasang `SET search_path = public, pg_temp`, memvalidasi `auth.uid()`, dan menggunakan `FOR UPDATE` row-level locking:
1. **`rpc_bootstrap_new_workspace`**: Membuat workspace baru saat registrasi, menetapkan status `PRO_TRIAL` sesuai durasi dinamis di `platform_trial_configs` (default 30 hari), dan menyalin 14 kategori standar dari `master_categories` secara idempoten (`ON CONFLICT DO NOTHING`).
2. **`rpc_sync_gold_mahar_price`**: Menyesuaikan harga satuan item Mahar Emas di `budget_items` ke harga acuan terbaru di `master_gold_prices` atas permintaan pengguna (One-Click Sync) dan mencatat riwayatnya di `audit_logs`.
3. **`rpc_sync_vendor_deal_to_budget`**: Mengubah status vendor menjadi `DEAL` dan secara opsional menyinkronkan harga penawarannya ke baris item terkait di `budget_items`.
4. **`rpc_redeem_promo_code`**: Memvalidasi dan mengklaim kode promo perpanjangan `PRO_TRIAL` dengan penguncian baris (`FOR UPDATE`) guna mencegah *double-redemption race condition*.

---

## 3. Isolasi Dua Bucket Storage Supabase & Keamanan File

1. **Pemisahan Bucket Berdasarkan Tingkat Privasi**:
   - **`public-invitation-assets`**: Untuk aset publik undangan digital (foto mempelai, gambar kode **QRIS Merchant**, dan ikon bank). Diakses via URL CDN publik.
   - **`private-workspace-docs`**: Untuk dokumen internal pasangan pengantin (bukti transfer DP vendor, kwitansi katering, kontrak PDF). Wajib diakses menggunakan *Signed URL* bertempo pendek (`15 menit`).
2. **Penyimpanan Path Relatif & Validasi Unggahan**:
   - Database hanya menyimpan *relative path* (contoh: `invitations/arif-siti/qris-merchant.webp`), bukan URL lengkap yang dapat kedaluwarsa.
   - Wajib memvalidasi *Magic Bytes / MIME-type* di server (`image/png`, `image/jpeg`, `image/webp` $\le 2\text{ MB}$ untuk QRIS/foto; menolak `.svg`/`.html` untuk mencegah XSS) serta membersihkan metadata **EXIF GPS** pada foto sebelum disimpan.

---

## 4. Kebijakan Zero-Direct-CRUD & Migrasi SQL Terverifikasi
- Seluruh perubahan DDL (Tabel, Index, View, RPC, Policy RLS) wajib disimpan di dalam repositori (`packages/db/supabase/migrations/`) lengkap dengan skrip *rollback* dan kueri *smoke test*.
