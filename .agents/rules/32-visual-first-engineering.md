# Rule 32: Visual-First Engineering, Anti-Slop & Interactive Motion Protocol

> **Status**: PROTOKOL WAJIB UI/UX & FRONTEND SLICING `NikahPlan Studio`
> **Acuan Utama**: [PRD-FRONTEND.md](../../PRD-FRONTEND.md) & `skills/antislop/SKILL.md` (R-01 s.d R-38)

---

## 1. Larangan Koding Buta (*Zero Blind Slicing*) & Visual Planning Gate

1. **Wajib Acu ASCII Wireframe & Visual Anchor**:
   - Sebelum menulis kode komponen di `apps/web`, `apps/invite`, `packages/ui`, atau `packages/invitation-blocks`, agen wajib memeriksa spesifikasi tata letak ASCII Wireframe di [PRD-FRONTEND.md](../../PRD-FRONTEND.md) atau menyajikan ASCII Wireframe di tahap review untuk komponen baru.
2. **Deklarasi Liveliness Dials Eksplisit**:
   - **`apps/web` (Dashboard Planner & Financial Studio)**:
     - Gaya Visual: *Warm Editorial Financial Clarity* (`#FAF8F5` Warm Alabaster, `#FFFFFF` Card Surface, `#1C1917` Deep Espresso, `#0F766E` Botanical Emerald, `#B45309` Champagne Amber).
     - Dial Terkunci: **`ENERGY 2 / RHYTHM 2 / MOTION 2`**.
   - **`apps/invite` (Public Digital Invitation `/v/[slug]`)**:
     - Gaya Visual: *Bespoke Editorial Heritage & Botanical Storytelling* (dikendalikan secara dinamis dari `master_invitation_themes`).
     - Dial Terkunci: **`ENERGY 3 / RHYTHM 3 / MOTION 3`**.

---

## 2. Enam Aturan Keras Anti-AI-Slop (`R-01` s.d `R-38`)

1. **Larangan Mutlak Karakter Em-Dash (`R-02`)**:
   - Dilarang keras menuliskan karakter em-dash (`—`) pada teks antarmuka, judul, subjudul, label form, pesan toast, maupun isi template undangan.
2. **Larangan Gradien & Dekorasi Generik AI (`R-01`, `R-10`, `R-13`)**:
   - Dilarang menggunakan gradien biru-ungu generik, *glow* berlebih, atau *glassmorphism* pada seluruh kartu sekaligus (batas maksimum `backdrop-blur` hanya pada 1-2 elemen melayang seperti Sticky Top Bar dan Bottom Action Dock).
3. **Larangan Klaim, Angka & Testimoni Fiktif (`R-17`, `R-18`, `R-36`)**:
   - Dilarang membuat angka statistik karangan atau testimoni pasangan fiktif.
4. **Kewajiban 3-State UI (`R-27` & `C-4`)**:
   - Setiap komponen yang memuat data wajib memiliki **Empty State** yang ramah dan kontekstual, **Skeleton Loading State** yang presisi tanpa *layout shift*, dan **Error State** dengan tombol `[Coba Lagi]`.
5. **Kewajiban Interaktivitas Nyata (`R-24`, `R-26`, `R-32`)**:
   - Dilarang membuat tombol atau tautan mati. Seluruh elemen interaktif wajib memiliki fungsi nyata, memiliki `cursor-pointer`, berukuran sentuh minimal `44x44px` di mobile (`R-03`), dan dapat dioperasikan penuh via keyboard (`Tab`, `Enter`, `Escape`).
6. **Koreografi Animasi Bertujuan (`R-19` & `R-31`)**:
   - Setiap animasi menggunakan `motion`, `@animate-ui`, atau `animejs` wajib memiliki tujuan UX yang jelas:
     - *Sliding Tabular Number* saat total anggaran atau harga emas berubah.
     - *Shared Layout Transition (`layoutId`)* saat memindahkan status vendor di Decision Matrix.
     - *Envelope Unsealing Choreography* & *Copy Account Checkmark Morph* pada halaman undangan publik `/v/[slug]`.
   - Wajib menghormati preferensi aksesibilitas `@media (prefers-reduced-motion: reduce)`.
