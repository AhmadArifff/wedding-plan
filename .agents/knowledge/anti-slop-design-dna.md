# Knowledge Blueprint: Anti-Slop Design DNA & Interactive Motion Recipes

> **Design DNA Profile (`skills/design-dna` & `skills/antislop`)**: Konfigurasi token desain 3-dimensi dan resep animasi interaktif untuk memastikan antarmuka **NikahPlan Studio** bebas dari kesan template AI generik.

---

## 1. Profil Design DNA JSON (`apps/web` vs `apps/invite`)

```json
{
  "project": "NikahPlan Studio",
  "profiles": {
    "planner_workspace_web": {
      "aesthetic_direction": "Warm Editorial Financial Clarity",
      "liveliness_dials": {
        "ENERGY": 2,
        "RHYTHM": 2,
        "MOTION": 2
      },
      "tokens": {
        "colors": {
          "canvas_bg": "#FAF8F5",
          "surface_card": "#FFFFFF",
          "border_subtle": "#E7E5E4",
          "text_primary": "#1C1917",
          "text_secondary": "#57534E",
          "accent_primary_emerald": "#0F766E",
          "accent_secondary_gold": "#B45309",
          "semantic_danger_rose": "#BE123C"
        },
        "typography": {
          "heading_serif": "Cormorant Garamond",
          "body_sans": "Plus Jakarta Sans",
          "numeric_mono": "JetBrains Mono",
          "numeric_feature_settings": "'tnum' on, 'lnum' on"
        },
        "radius": {
          "card": "0.5rem (8px)",
          "button": "0.375rem (6px)",
          "badge": "9999px (pill only for status badges)"
        }
      }
    },
    "public_invitation_renderer": {
      "aesthetic_direction": "Bespoke Heritage & Botanical Storytelling",
      "liveliness_dials": {
        "ENERGY": 3,
        "RHYTHM": 3,
        "MOTION": 3
      },
      "mobile_viewport_constraint": {
        "max_container_width": "480px",
        "min_tap_target": "44px",
        "max_device_pixel_ratio": 2.0
      }
    }
  }
}
```

---

## 2. Resep Koreografi Animasi Interaktif (Motion & Anime.js)

Setiap animasi di bawah ini memiliki alasan fungsional tertulis sesuai aturan **Purpose-Gate (`R-19` & `R-31`)**:

1. **Transisi Angka Finansial (*Sliding Tabular Number*)**:
   - **Komponen**: Kartu Top KPI (`Total Semua Anggaran`, `Biaya Makan / Tamu`, `Selisih Harga Emas`).
   - **Parameter Gerak**: Spring physics (`stiffness: 260, damping: 28, mass: 0.8`).
   - **Tujuan UX**: Memberikan umpan balik visual seketika ketika pengguna mengubah volume porsi dapur atau menekan tombol *"Sesuaikan ke Harga Emas Hari Ini"*.
2. **Transisi Baris Tabel Inline Edit**:
   - **Komponen**: Baris `BudgetTable` dan `KitchenTable`.
   - **Parameter Gerak**: `duration: 160ms`, easing `cubic-bezier(0.22, 1, 0.36, 1)`.
   - **Tujuan UX**: Menandai sel yang sedang aktif diedit tanpa menggeser tata letak kolom di sekitarnya (*Zero CLS*).
3. **Animasi Pembukaan Sampul Undangan Digital (`/v/[slug]`)**:
   - **Komponen**: `InvitationCoverGate`.
   - **Parameter Gerak**: Slide-up + scale-down halus (`y: "-100%"`, `duration: 750ms`, easing `cubic-bezier(0.32, 0.72, 0, 1)`) yang dipicu saat tamu menekan tombol *"Buka Undangan"*.
   - **Tujuan UX**: Menciptakan sensasi membuka amplop undangan fisik secara elegan di layar smartphone tamu sekaligus mengizinkan pemutaran audio latar sesuai kebijakan autoplay browser mobile.
4. **Mikro-Interaksi Salin Nomor Rekening & Perbesar QRIS**:
   - **Komponen**: `DigitalEnvelopeCard`.
   - **Parameter Gerak**: Morphing ikon SVG dari `Copy` menjadi `Check` (`stroke-dashoffset` via `motion` / `animejs` dalam `250ms`) disertai Toast konfirmasi pasif selama 3 detik.
   - **Tujuan UX**: Memastikan tamu yakin 100% bahwa nomor rekening telah tersalin ke *clipboard* tanpa perlu menebak.
