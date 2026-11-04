# Knowledge Blueprint: NikahPlan Studio Domain Logic & Financial Formulas

> **Domain Ground-Truth**: Acuan rumus matematika, logika otonomi pengguna, dan struktur data awal (seeding) untuk seluruh modul **NikahPlan Studio**.

---

## 1. Rumus Matematika & Invarian Finansial

Seluruh perhitungan uang wajib menggunakan tipe integer/desimal eksak (`NUMERIC(15,2)` atau `BigInt` di tingkat database/service) tanpa pembulatan *floating-point* liar.

### A. Modul Pengingat Harga Emas Terkini (*Live Gold Price Tracker*)
Untuk setiap baris `budget_items` yang ditandai `is_gold_mahar = true`:
- **Total Harga Mahar di Anggaran Pengguna**:
  $$\text{Subtotal}_{\text{anggaran}} = W_{\text{gram}} \times P_{\text{satuan\_anggaran}}$$
- **Nilai Pasar Mahar Hari Ini**:
  $$\text{Subtotal}_{\text{pasar}} = W_{\text{gram}} \times P_{\text{emas\_hari\_ini}}$$
- **Selisih Harga Mahar ($\Delta \text{Mahar}$)**:
  $$\Delta \text{Mahar} = (P_{\text{emas\_hari\_ini}} - P_{\text{satuan\_anggaran}}) \times W_{\text{gram}}$$
  - Contoh Uji (Verifikasi `PRD.md` Bab 4.2):
    - $W_{\text{gram}} = 10\text{ gram}$
    - $P_{\text{satuan\_anggaran}} = \text{Rp }1.350.000 \rightarrow \text{Subtotal}_{\text{anggaran}} = \text{Rp }13.500.000$
    - $P_{\text{emas\_hari\_ini}} = \text{Rp }1.420.000 \rightarrow \text{Subtotal}_{\text{pasar}} = \text{Rp }14.200.000$
    - $\Delta \text{Mahar} = (1.420.000 - 1.350.000) \times 10 = +\text{Rp }700.000$

---

### B. Modul Tamu & Kalkulator Dapur Mandiri
- **Total Tamu Undangan ($G_{\text{total}}$)**:
  $$G_{\text{total}} = G_{\text{laki}} + G_{\text{perempuan}}$$
- **Total Porsi Masak ($Q_{\text{porsi}}$)**:
  $$Q_{\text{porsi}} = \text{ROUND}(G_{\text{total}} \times M_{\text{pengali}})$$
- **Total Biaya Dapur ($C_{\text{dapur}}$)**:
  $$C_{\text{dapur}} = \sum_{i=1}^{n} (\text{Kuantitas}_i \times \text{HargaSatuan}_i)$$
- **Rasio Biaya Makan per Tamu & per Porsi**:
  $$\text{Biaya per Tamu} = \begin{cases} \frac{C_{\text{dapur}}}{G_{\text{total}}} & \text{jika } G_{\text{total}} > 0 \\ 0 & \text{jika } G_{\text{total}} = 0 \end{cases}$$
  - Contoh Uji (Verifikasi `PRD.md` Bab 4.3 & 4.5):
    - $G_{\text{total}} = 300\text{ Tamu}$, $M_{\text{pengali}} = 2.0 \rightarrow Q_{\text{porsi}} = 600\text{ Porsi}$.
    - $C_{\text{dapur}} = \text{Rp }13.620.000 \rightarrow \text{Biaya per Tamu} = \frac{13.620.000}{300} = \text{Rp }45.400/\text{Tamu}$ ($\text{Rp }22.700/\text{Porsi}$).

---

### C. Modul Perencanaan Tabungan & Early Warning Insight
- **Sisa Kebutuhan Dana ($D_{\text{sisa}}$)**:
  $$D_{\text{sisa}} = \max(0, \text{TotalAnggaran} - \text{TabunganSaatIni})$$
- **Estimasi Durasi Menabung ($T_{\text{bulan}}$)**:
  $$T_{\text{bulan}} = \begin{cases} \lceil \frac{D_{\text{sisa}}}{\text{KapasitasMenabungBulanan}} \rceil & \text{jika } \text{KapasitasMenabungBulanan} > 0 \\ \text{NULL (Tak Terhingga)} & \text{jika } \text{KapasitasMenabungBulanan} = 0 \end{cases}$$
- **Logika Peringatan Dini (*Early Warning Trigger*)**:
  Peringatan dini diaktifkan secara otomatis apabila salah satu dari 3 kondisi berikut terpenuhi:
  1. Terdapat kandidat vendor berstatus `DISCUSSION` atau `DEAL` yang memiliki `quoted_price > budget_categories.ceiling_amount`.
  2. Terdapat selisih kenaikan harga emas mahar positif ($\Delta \text{Mahar} > 0$).
  3. Estimasi selesai menabung ($\text{BulanIni} + T_{\text{bulan}}$) melewati tanggal target pernikahan (`workspaces.target_wedding_date`).

---

## 2. Daftar 14 Kategori Standar Master Anggaran (Seeding Idempoten)

Saat workspace baru diinisialisasi (atau Super Admin menjalankan seeding `master_categories`), berikut adalah 14 kategori standar pernikahan Indonesia:

1. `01. Seserahan & Mahar Pernikahan` (Termasuk item Mahar Emas Logam Mulia)
2. `02. Administrasi KUA & Pencatatan Sipil`
3. `03. Sewa Venue / Gedung & Tenda Dekorasi`
4. `04. Katering & Dapur Mandiri`
5. `05. MUA (Rias Pengantin) & Busana Keluarga`
6. `06. Dokumentasi Foto, Video & Cinematic`
7. `07. Paket All-In (Venue + Catering + Dekorasi)` *(Mendukung pengujian paralel bersama kategori terpisah)*
8. `08. Hiburan, Musik & Sound System`
9. `09. MC, Penghulu & Pengisi Acara`
10. `10. Cincin Kawin & Perhiasan`
11. `11. Undangan Cetak, Undangan Digital & Souvenir`
12. `12. Akomodasi, Transportasi & Panitia Keluarga`
13. `13. Perawatan Pra-Nikah & Kesehatan`
14. `14. Dana Darurat & Biaya Tak Terduga`

---

## 3. Daftar 7 Komponen Bahan Pokok Kalkulator Dapur Mandiri

1. `Beras Kualitas Super` (`kg`)
2. `Daging Sapi Segar` (`kg`)
3. `Daging Ayam Potong` (`ekor` / `kg`)
4. `Bumbu Dapur, Sayur & Santan` (`paket`)
5. `Minyak Goreng & Gas LPG` (`paket`)
6. `Buah, Kerupuk & Es konsumsi` (`paket`)
7. `Jasa Tukang Masak & Tenaga Bantu` (`tim`)

