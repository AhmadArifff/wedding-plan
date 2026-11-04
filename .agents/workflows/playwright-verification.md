# Workflow: Playwright E2E & Anti-Slop Click-Through Verification (`R-35`)

> **Verification Gate**: Prosedur wajib bagi `qa-engineer` untuk memverifikasi fungsionalitas antarmuka, ketiadaan AI Slop, dan responsivitas mobile sebelum sub-tugas frontend dinyatakan selesai (`approved`).

---

## 1. Checklist Verifikasi Interaktif (`R-35`)

1. **Verifikasi Konsol & Jaringan**:
   - Buka halaman lokal (`apps/web` atau `apps/invite`) menggunakan Playwright.
   - Pastikan **0 Console Error** dan **0 Unhandled Network 500 Error**.
2. **Click-Through Smoke Test Elemen Interaktif**:
   - Klik tombol **"Sesuaikan ke Harga Emas Hari Ini"** -> pastikan Popover konfirmasi terbuka, dapat ditutup dengan `Escape`, dan saat dikonfirmasi memperbarui angka KPI secara reaktif.
   - Uji **Inline Editing** pada Tabel Master Anggaran -> klik sel harga/volume, ubah nilai, tekan `Enter`, pastikan `Subtotal` dan `<tfoot> TOTAL AKUMULASI` terhitung akurat tanpa *double scrollbar*.
   - Uji **Filter Kategori** -> pilih `Semua Kategori`, `Tanpa Kategori (Unassigned)`, dan kategori spesifik; pastikan tidak ada data yang hilang.
   - Uji **Halaman Publik Undangan (`/v/[slug]`)** pada viewport mobile `375x812px` -> pastikan bebas *horizontal overflow* (`R-03`), tombol **Salin Rekening** memunculkan Toast, dan modal **QRIS Merchant** tampil tajam.
3. **Verifikasi 4-Blok Mandatory Delivery Gate**:
   - Sertakan bukti hasil klik satu per satu di laporan akhir sesuai `skills/antislop/SKILL.md`.

