# Rule 31: Financial Spreadsheet Tables & Pure Numeric Typography Standards

> **Status**: STANDAR UI TABEL ANGGARAN, VENDOR & DAPUR `NikahPlan Studio`
> **Cakupan**: Modul Master Anggaran (14 Kategori), Kalkulator Dapur Mandiri, dan Decision Matrix Vendor.

---

## 1. Single Unified Table & Zero-Double-Scroll Standard

1. **Dilarang Double Scrollbar**:
   - Tabel rincian pengeluaran dan bahan dapur tidak boleh menghasilkan dua scrollbar horizontal/vertikal yang bertumpuk.
   - Gunakan satu kontainer tabel terpadu dengan header kolom sticky (`sticky top-0 z-10`) dan baris akumulasi bawah sticky (`<tfoot>` dengan `TOTAL AKUMULASI`).
2. **Pengelompokan Kategori Collapsible**:
   - 14 Kategori pengeluaran ditampilkan sebagai grup baris di dalam satu tabel yang sama (bukan 14 tabel terpisah yang berat di DOM), sehingga lebar kolom `Volume`, `Satuan`, `Harga Satuan`, dan `Subtotal` tetap lurus sempurna dari baris pertama hingga baris terakhir.

---

## 2. Tipografi Angka Murni (*Pure Numeric Typography*)

1. **Dilarang Mengulang Prefix `"Rp "` di Dalam Sel Tabel (`<td>`)**:
   - Menulis `"Rp "` pada ratusan baris anggaran menciptakan *visual noise* dan memperlambat pemindaian mata.
   - Tampilkan angka numerik murni dengan pemisah ribuan titik Indonesia:
     - Contoh Benar: `14.200.000` | `45.400` | `1.350.000`
     - Contoh Salah: `Rp 14.200.000,00` di setiap sel baris.
   - Keterangan mata uang `(Rp)` cukup dicantumkan satu kali pada **Header Kolom** (`HARGA SATUAN (Rp)`, `SUBTOTAL (Rp)`) serta pada **Top KPI Cards** di bagian atas dashboard.
2. **Perataan & Font Numerik Wajib**:
   - Seluruh sel nominal uang, volume, dan rasio wajib menggunakan class `text-right tabular-nums font-medium`.

---

## 3. Standar Inline Editing & Navigasi Keyboard (`R-32`)

1. **Zero Layout Shift saat Mode Edit**:
   - Ketika pengguna mengklik sel `Nama Item`, `Volume`, `Satuan`, atau `Harga Satuan`, input editor menggantikan teks di dalam dimensi kotak yang sama persis (`h-10 px-3`) menggunakan `ring-2 ring-teal-700/30 bg-stone-50` tanpa mengubah lebar kolom atau tinggi baris.
2. **Dukungan Keyboard Spreadsheet**:
   - `Enter`: Menyimpan perubahan baris secara optimistik (*Optimistic Update*) dan memindahkan fokus ke baris di bawahnya.
   - `Tab` / `Shift+Tab`: Memindahkan fokus antar kolom di baris yang sama.
   - `Escape`: Membatalkan perubahan dan mengembalikan nilai semula.

---

## 4. Pewarnaan Semantik Lembut (*Semantic Soft Tokens*)

Gunakan token warna lembut yang memenuhi rasio kontras WCAG AA ($\ge 4.5:1$):

| Status / Kondisi Data | Background & Border Token | Text Token | Konteks Penggunaan |
| :--- | :--- | :--- | :--- |
| **Deal / Terpilih / Aman** | `bg-teal-50 border-teal-200` | `text-teal-800 font-semibold` | Status vendor `Deal`, anggaran di bawah plafon. |
| **Acuan Emas / Perhatian** | `bg-amber-50 border-amber-200` | `text-amber-800 font-semibold` | Selisih kenaikan harga emas mahar, status `Proses Diskusi`. |
| **Melebihi Plafon (Over-Budget)** | `bg-rose-50 border-rose-200` | `text-rose-800 font-semibold` | Harga kandidat vendor melampaui plafon kategori (*Early Warning*). |
| **Netral / Manual / Kandidat** | `bg-stone-100 border-stone-200` | `text-stone-700 font-medium` | Item anggaran input manual, status `Kandidat` atau `Arsip`. |
| **Grand Total (`<tfoot>`)** | `bg-stone-900 text-stone-50` | `text-white font-bold` | Baris `TOTAL AKUMULASI` di bagian bawah tabel. |

