# Rule 40: Multi-Tenant Security, Supabase RLS & Data Leakage Prevention

> **Status**: STANDAR KEAMANAN MUTLAK `NikahPlan Studio (wedding-plan)`
> **Acuan Utama**: [PRD-BACKEND.md](../../PRD-BACKEND.md)

---

## 1. Isolasi Data Multi-Tenant & Matriks 4-Tier Peran (Supabase RLS)

Seluruh tabel di skema `public` wajib mengaktifkan **Row-Level Security (`ENABLE ROW LEVEL SECURITY` & `FORCE ROW LEVEL SECURITY`)** dengan pemisahan ketat untuk 4 tingkatan pengguna:

1. **`SUPER_ADMIN` (Pemilik Platform)**:
   - Memiliki akses penuh (`SELECT, INSERT, UPDATE, DELETE`) pada tabel Data Master (`master_categories`, `master_banks`, `master_gold_prices`, `master_invitation_themes`) dan manajemen kampanye (`platform_trial_configs`, `promo_codes`).
   - Demi privasi finansial pengguna, Super Admin tidak mengubah rincian anggaran pribadi pasangan pengantin.
2. **`OWNER` (Calon Pengantin Pembuat Akun)**:
   - Kendali otonom 100% (`Full CRUD`) atas workspace pernikahannya sendiri (`workspaces`, `budget_categories`, `budget_items`, `vendors`, `kitchen_configs`, `kitchen_items`, `savings_plans`, `invitations`, `invitation_envelopes`, `rsvp_wishes`) serta manajemen anggota (`workspace_members`).
3. **`COLLABORATOR` (Pasangan & Panitia Keluarga)**:
   - **`EDITOR` (Pasangan)**: Akses setara Owner untuk menyunting anggaran, memilih vendor, mengubah kalkulator dapur, dan mengedit undangan digital.
   - **`VIEWER_KITCHEN` (Viewer / Panitia Dapur)**: Akses baca (`SELECT`) pada anggaran dan izin kelola terbatas pada modul belanja dapur (`kitchen_items`), tanpa izin menghapus workspace atau mengubah pengaturan langganan.
4. **`PUBLIC_GUEST` (Tamu Undangan Tanpa Login di `/v/[slug]`)**:
   - **DILARANG KERAS** memiliki akses baca langsung ke tabel `workspaces`, `budget_categories`, `budget_items`, `vendors`, `kitchen_configs`, `savings_plans`, atau `profiles`.
   - Hanya dapat membaca data undangan melalui view terisolasi **`v_public_invitation_safe`** (untuk undangan yang `is_published = true`) dan mengirim ucapan/RSVP melalui RPC yang dilindungi rate-limiter.

---

## 2. Pencegahan Kebocoran Data & Serangan Umum (OWASP Top 10)

1. **Zero Financial Leakage di `/v/[slug]`**:
   - Response API atau Server Component pada aplikasi `apps/invite` (`/v/[slug]`) tidak boleh memuat satu pun field dari tabel anggaran, tabungan, harga emas mahar, atau nomor telepon pribadi pemilik workspace.
2. **Keamanan Unggah Gambar QRIS & Aset Undangan**:
   - Validasi ukuran file ($\le 2\text{ MB}$) dan *Magic Bytes* (`image/png`, `image/jpeg`, `image/webp`).
   - Tolak file `.svg`, `.html`, atau `.js` di bucket storage untuk mencegah *Stored XSS*.
   - Bersihkan metadata **EXIF GPS** dari foto mempelai dan gambar QRIS saat diunggah.
3. **Proteksi Endpoint Publik RSVP (Anti-Spam & Quota Gate)**:
   - Terapkan rate-limiting berbasis IP (Upstash Redis: maksimal 5 pengiriman per 10 menit per IP).
   - Validasi kuota RSVP `FREE_PLAN` (setelah `PRO_TRIAL` berakhir) langsung di dalam fungsi database PostgreSQL agar tidak dapat di-bypass dari sisi client.
   - Sanitasi seluruh input teks ucapan tamu (`wish_message` & `guest_name`) dari karakter/tag HTML berbahaya.
4. **Keamanan Fungsi `SECURITY DEFINER`**:
   - Setiap fungsi PL/pgSQL yang dideklarasikan dengan `SECURITY DEFINER` **WAJIB** mencantumkan `SET search_path = public, pg_temp` dan memvalidasi `auth.uid()` serta keanggotaan workspace (`has_workspace_role`) di awal blok `BEGIN`.
