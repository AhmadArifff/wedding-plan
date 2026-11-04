---
name: nikahplan-domain
description: >
  Domain-specific engineering skill for NikahPlan Studio (Wedding Planner, Financial Insight & Digital Invitation SaaS).
  Integrates global skills (frontend, backend, pm, qa, antislop, untitled-ui, shadcn-ui, animate-ui, motion, 21st-dev, excel-export)
  with NikahPlan's core rules: 100% Full User Autonomy, Live Gold Price Tracker math, Kitchen Ingredient Calculator,
  5-Status Vendor Decision Matrix, Block-based Invitation Builder (/v/[slug]), QRIS Digital Envelope, Pro Trial lifecycle,
  and Zero-Data-Leakage Supabase RLS/Views/RPCs.
---

# Skill: NikahPlan Studio Domain Architect & Orchestrator

Gunakan skill ini pada setiap pengerjaan fitur di repositori `wedding-plan` untuk memastikan keselarasan antara [PRD.md](../../../PRD.md), [PRD-FRONTEND.md](../../../PRD-FRONTEND.md), dan [PRD-BACKEND.md](../../../PRD-BACKEND.md).

---

## 1. Orkestrasi Skill Global Berdasarkan Modul NikahPlan

Saat mengerjakan modul tertentu, kombinasikan skill lokal ini dengan skill global berikut:

| Modul NikahPlan Studio | Skill Global yang Wajib Dipadukan | Fokus Kualitas & Hasil Akhir |
| :--- | :--- | :--- |
| **1. Master Anggaran (14 Kategori) & Inline Spreadsheet** | `frontend` + `untitled-ui` + `shadcn-ui` + `antislop-ui` + `antislop-human` | Single Unified Table (`Rule 31`), Pure Numeric Typography (`14.200.000` rata kanan `tabular-nums`), Inline Edit via keyboard (`Enter`/`Tab`/`Escape`), Zero Layout Shift. |
| **2. Live Gold Price Tracker & Mahar Sync** | `animate-ui` + `motion` + `backend` | Sliding number counter pada KPI, Popover konfirmasi 1-klik (`Rule 30`), dan eksekusi atomik via `rpc_sync_gold_mahar_price`. |
| **3. Decision Matrix Seleksi Vendor** | `frontend` + `motion` + `backend` | 5 status seleksi (`DEAL`, `DISCUSSION`, `CANDIDATE`, `REJECTED`, `ARCHIVED`), transisi `layoutId`, dan modal penawaran sinkronisasi ke anggaran tanpa paksaan (*Full User Autonomy*). |
| **4. Kalkulator Tamu & Dapur Mandiri** | `frontend` + `untitled-ui` + `backend` | Stepper interaktif Tamu Laki-laki + Perempuan, pengali porsi ($300 \times 2 = 600\text{ porsi}$), 7 bahan pokok dapur, dan rasio biaya makan per tamu otomatis. |
| **5. Perencanaan Tabungan & Early Warning** | `frontend` + `antislop-copywriting` + `backend` | Simulator target menabung bulanan, progress bar terukur, dan Inline Alert *Early Warning* saat kandidat vendor / kenaikan emas melampaui plafon. |
| **6. App Builder Undangan & Public Renderer (`/v/[slug]`)** | `21st-dev` + `cast` + `paint` + `animejs` + `motion` + `antislop-layoutmobile` | Dial `ENERGY 3 / RHYTHM 3 / MOTION 3`, pembukaan sampul amplop interaktif, salin nomor rekening + modal QRIS Merchant, serta isolasi data publik via `v_public_invitation_safe`. |
| **7. Super Admin Master Data & Pro Trial** | `backend` + `frontend` + `qa` | Zero Hardcoded Master Data (CRUD Kategori, Bank, Harga Emas, Tema, Durasi Trial 30 Hari, Kode Promo) dan filter `Uncategorized / Tanpa Kategori`. |
| **8. Ekspor Laporan Anggaran (PDF / Excel Pro)** | `excel-export` + `backend` | Streaming export berkecepatan tinggi dengan pengecekan status langganan (`PRO_TRIAL` atau `PRO_ACTIVE`). |

---

## 2. Checklist Kepatuhan Sebelum Serah Terima (Mandatory Delivery Gate)

1. **Apakah Prinsip Kendali Penuh Pengguna (4.1) terjaga?**
   - Pastikan otomatisasi harga emas dan vendor Deal bersifat membantu (*opt-in*) dan tidak mengunci input manual pengguna.
2. **Apakah Tabel Finansial mematuhi Pure Numeric Typography (`Rule 31`)?**
   - Tidak ada pengulangan teks `"Rp "` di dalam setiap sel `<td>` tabel; semua angka menggunakan `tabular-nums text-right`.
3. **Apakah Bebas AI-Slop (`R-01` s.d `R-38`)?**
   - Bebas em-dash (`—`), bebas gradien ungu-biru generik, memiliki 3 state lengkap (*Empty, Loading, Error*), dan kontras teks memenuhi WCAG AA ($\ge 4.5:1$).
4. **Apakah Keamanan Supabase RLS & RPC Terkunci (`Rule 40`)?**
   - Halaman `/v/[slug]` hanya membaca dari `v_public_invitation_safe` dan sama sekali tidak membocorkan data anggaran/tabungan.
5. **Apakah Perubahan Sudah Di-Push ke Branch `dev`?**
   - Lakukan commit atomik dan `git push origin dev`. **JANGAN PERNAH** melakukan merge ke `main` secara otomatis!
