#!/usr/bin/env node
/**
 * Deterministic Vector Asset Generator for NikahPlan Studio
 * Zero Stock Photo Internet Mandate (C-CUSTOM-GENERATED-ASSETS)
 * Generates custom SVG assets:
 * 1. avatar-groom.svg
 * 2. avatar-bride.svg
 * 3. theme-javanese-heritage.svg
 * 4. theme-botanical-sage.svg
 * 5. theme-minimal-editorial.svg
 * 6. qris-merchant-dummy.svg
 * 7. gold-mahar-illustration.svg
 */

const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const targetDirs = [
  path.join(rootDir, 'packages', 'ui', 'src', 'assets', 'generated'),
  path.join(rootDir, 'apps', 'web', 'public', 'generated'),
  path.join(rootDir, 'apps', 'invite', 'public', 'generated'),
];

targetDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 1. Avatar Groom (Modern Bespoke Traditional Attire)
const avatarGroomSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGroom" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F5F3EF"/>
      <stop offset="100%" stop-color="#E8E2D9"/>
    </linearGradient>
    <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1C1917"/>
      <stop offset="100%" stop-color="#292524"/>
    </linearGradient>
    <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FCD3B8"/>
      <stop offset="100%" stop-color="#F6B894"/>
    </linearGradient>
    <linearGradient id="goldAcc" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D97706"/>
      <stop offset="100%" stop-color="#B45309"/>
    </linearGradient>
  </defs>
  <!-- Background Circle -->
  <circle cx="200" cy="200" r="190" fill="url(#bgGroom)" stroke="#E7E5E4" stroke-width="4"/>
  <!-- Decorative Ring -->
  <circle cx="200" cy="200" r="175" fill="none" stroke="#D97706" stroke-width="1.5" stroke-dasharray="6,6" opacity="0.4"/>
  
  <!-- Shoulders & Jas Beskap Modern -->
  <path d="M70,390 C80,310 130,280 170,270 L200,300 L230,270 C270,280 320,310 330,390 Z" fill="url(#suitGrad)"/>
  <!-- Kemeja Putih -->
  <polygon points="170,270 200,310 230,270 200,250" fill="#FFFFFF"/>
  <!-- Dasi Kupu-Kupu / Bros Emas Jawa Modern -->
  <circle cx="200" cy="285" r="7" fill="url(#goldAcc)"/>
  <polygon points="190,285 200,280 200,290" fill="url(#goldAcc)"/>
  <polygon points="210,285 200,280 200,290" fill="url(#goldAcc)"/>

  <!-- Leher -->
  <rect x="185" y="210" width="30" height="45" rx="5" fill="url(#skinGrad)"/>

  <!-- Kepala -->
  <ellipse cx="200" cy="175" rx="48" ry="60" fill="url(#skinGrad)"/>

  <!-- Rambut Rapi -->
  <path d="M150,165 C150,110 170,105 200,105 C230,105 250,110 250,165 C250,140 240,120 200,120 C160,120 150,140 150,165 Z" fill="#1C1917"/>
  <!-- Telinga -->
  <ellipse cx="150" cy="175" rx="8" ry="14" fill="#F6B894"/>
  <ellipse cx="250" cy="175" rx="8" ry="14" fill="#F6B894"/>

  <!-- Alis & Mata Elegan Minimalis -->
  <path d="M170,160 Q180,157 190,160" stroke="#1C1917" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M210,160 Q220,157 230,160" stroke="#1C1917" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="180" cy="168" rx="3.5" ry="4" fill="#1C1917"/>
  <ellipse cx="220" cy="168" rx="3.5" ry="4" fill="#1C1917"/>

  <!-- Hidung & Senyum Hangat -->
  <path d="M200,168 L197,185 L203,185" stroke="#E09F7D" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M188,198 Q200,206 212,198" stroke="#9A3412" stroke-width="2.5" fill="none" stroke-linecap="round"/>

  <!-- Label Groom -->
  <rect x="130" y="340" width="140" height="30" rx="15" fill="#0F766E"/>
  <text x="200" y="360" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">MEMPELAI PRIA</text>
</svg>
`.trim();

// 2. Avatar Bride (Modern Elegant Kebaya & Hijab)
const avatarBrideSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bgBride" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDF8"/>
      <stop offset="100%" stop-color="#F5ECE2"/>
    </linearGradient>
    <linearGradient id="hijabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F4EAE0"/>
      <stop offset="50%" stop-color="#EAD9C8"/>
      <stop offset="100%" stop-color="#DCC7B2"/>
    </linearGradient>
    <linearGradient id="kebayaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F766E"/>
      <stop offset="100%" stop-color="#115E59"/>
    </linearGradient>
    <linearGradient id="skinBride" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FDE8D8"/>
      <stop offset="100%" stop-color="#F9CFB5"/>
    </linearGradient>
    <linearGradient id="goldHead" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
  </defs>
  <!-- Background Circle -->
  <circle cx="200" cy="200" r="190" fill="url(#bgBride)" stroke="#E7E5E4" stroke-width="4"/>
  <circle cx="200" cy="200" r="175" fill="none" stroke="#0F766E" stroke-width="1.5" stroke-dasharray="6,6" opacity="0.35"/>

  <!-- Bahu Kebaya Modern Sage-Emerald -->
  <path d="M70,390 C80,310 130,280 170,270 L200,305 L230,270 C270,280 320,310 330,390 Z" fill="url(#kebayaGrad)"/>
  <!-- Aksen Renda Emas Kebaya -->
  <path d="M170,270 Q200,315 230,270" stroke="#F59E0B" stroke-width="3" fill="none"/>

  <!-- Hijab Drape Luar -->
  <path d="M140,180 C130,260 150,300 200,305 C250,300 270,260 260,180 C260,110 240,90 200,90 C160,90 140,110 140,180 Z" fill="url(#hijabGrad)"/>

  <!-- Wajah -->
  <ellipse cx="200" cy="180" rx="42" ry="52" fill="url(#skinBride)"/>

  <!-- Hijab Inner / Ciput -->
  <path d="M158,160 C158,135 175,128 200,128 C225,128 242,135 242,160 Z" fill="#E2CEB9"/>

  <!-- Alis Melengkung Rapi -->
  <path d="M172,166 Q182,162 192,165" stroke="#451A03" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M208,165 Q218,162 228,166" stroke="#451A03" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <!-- Mata & Eyelash Halus -->
  <ellipse cx="182" cy="173" rx="3.5" ry="4" fill="#1C1917"/>
  <ellipse cx="218" cy="173" rx="3.5" ry="4" fill="#1C1917"/>
  <path d="M176,170 Q182,167 188,170" stroke="#1C1917" stroke-width="1" fill="none"/>
  <path d="M212,170 Q218,167 224,170" stroke="#1C1917" stroke-width="1" fill="none"/>

  <!-- Hidung & Senyum Natural -->
  <path d="M200,174 L198,189 L202,189" stroke="#E09F7D" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <path d="M190,202 Q200,210 210,202" stroke="#BE123C" stroke-width="2.5" fill="none" stroke-linecap="round"/>

  <!-- Mahkota Headpiece Melati / Tiara Emas -->
  <circle cx="200" cy="125" r="4.5" fill="url(#goldHead)"/>
  <circle cx="186" cy="130" r="3.5" fill="url(#goldHead)"/>
  <circle cx="214" cy="130" r="3.5" fill="url(#goldHead)"/>
  <circle cx="174" cy="138" r="2.8" fill="url(#goldHead)"/>
  <circle cx="226" cy="138" r="2.8" fill="url(#goldHead)"/>

  <!-- Label Bride -->
  <rect x="125" y="340" width="150" height="30" rx="15" fill="#B45309"/>
  <text x="200" y="360" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">MEMPELAI WANITA</text>
</svg>
`.trim();

// 3. Theme 1: Javanese Heritage (9:16 Vertical)
const themeJavaneseSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 960" width="100%" height="100%">
  <defs>
    <linearGradient id="javBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#261E1B"/>
      <stop offset="50%" stop-color="#1B1513"/>
      <stop offset="100%" stop-color="#0E0A09"/>
    </linearGradient>
    <linearGradient id="javGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B"/>
      <stop offset="50%" stop-color="#D97706"/>
      <stop offset="100%" stop-color="#92400E"/>
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="540" height="960" fill="url(#javBg)"/>
  <!-- Border Ornamen Keraton -->
  <rect x="30" y="30" width="480" height="900" rx="20" fill="none" stroke="url(#javGold)" stroke-width="2" opacity="0.8"/>
  <rect x="42" y="42" width="456" height="876" rx="14" fill="none" stroke="url(#javGold)" stroke-width="0.8" opacity="0.5"/>

  <!-- Sudut Ornamen Batik Motif Parang Halus -->
  <g fill="none" stroke="url(#javGold)" stroke-width="1.2" opacity="0.6">
    <path d="M50,70 Q70,50 90,70 T130,70"/>
    <path d="M490,70 Q470,50 450,70 T410,70"/>
    <path d="M50,890 Q70,910 90,890 T130,890"/>
    <path d="M490,890 Q470,910 450,890 T410,890"/>
  </g>

  <!-- Typography Editorial -->
  <text x="270" y="240" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="600" fill="#D97706" text-anchor="middle" letter-spacing="4">THE WEDDING OF</text>
  <text x="270" y="340" font-family="'Cormorant Garamond', Georgia, serif" font-size="52" font-style="italic" fill="#FDF6ED" text-anchor="middle">Arif &amp; Siti</text>
  <line x1="200" y1="380" x2="340" y2="380" stroke="url(#javGold)" stroke-width="1.5"/>

  <!-- Date -->
  <text x="270" y="440" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="500" fill="#E5D9CC" text-anchor="middle" letter-spacing="2">MINGGU, 14 NOVEMBER 2027</text>
  <text x="270" y="470" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#A89B8C" text-anchor="middle">Depok, Jawa Barat</text>

  <!-- Badge Preview -->
  <rect x="180" y="780" width="180" height="42" rx="21" fill="url(#javGold)"/>
  <text x="270" y="806" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700" fill="#1C1917" text-anchor="middle" letter-spacing="1">JAVANESE HERITAGE</text>
</svg>
`.trim();

// 4. Theme 2: Botanical Sage (9:16 Vertical)
const themeBotanicalSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 960" width="100%" height="100%">
  <defs>
    <linearGradient id="botBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF9F5"/>
      <stop offset="50%" stop-color="#F2EFE8"/>
      <stop offset="100%" stop-color="#E8E4D9"/>
    </linearGradient>
    <linearGradient id="sageLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F766E"/>
      <stop offset="100%" stop-color="#115E59"/>
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="540" height="960" fill="url(#botBg)"/>
  <rect x="25" y="25" width="490" height="910" rx="16" fill="none" stroke="#D1CDC2" stroke-width="1.5"/>

  <!-- Daun Botani Hijau Sage di Atas -->
  <g fill="url(#sageLeaf)" opacity="0.85">
    <path d="M270,70 Q285,110 320,120 Q290,135 270,165 Q250,135 220,120 Q255,110 270,70 Z"/>
    <path d="M220,120 Q200,90 170,95 Q190,120 185,145 Q210,140 220,120 Z"/>
    <path d="M320,120 Q340,90 370,95 Q350,120 355,145 Q330,140 320,120 Z"/>
  </g>

  <!-- Typography -->
  <text x="270" y="270" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="600" fill="#0F766E" text-anchor="middle" letter-spacing="4">WALIMATUL 'URS</text>
  <text x="270" y="360" font-family="'Cormorant Garamond', Georgia, serif" font-size="56" font-style="italic" fill="#1C1917" text-anchor="middle">Arif &amp; Siti</text>
  <circle cx="270" cy="400" r="4" fill="#0F766E"/>

  <text x="270" y="460" font-family="'Plus Jakarta Sans', sans-serif" font-size="16" font-weight="600" fill="#292524" text-anchor="middle" letter-spacing="1">14 . 11 . 2027</text>
  <text x="270" y="490" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" fill="#57534E" text-anchor="middle">Graha Sakinah Convention Hall</text>

  <!-- Badge Preview -->
  <rect x="185" y="780" width="170" height="42" rx="21" fill="#0F766E"/>
  <text x="270" y="806" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">BOTANICAL SAGE</text>
</svg>
`.trim();

// 5. Theme 3: Minimal Editorial (9:16 Vertical)
const themeMinimalSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 960" width="100%" height="100%">
  <!-- Background -->
  <rect width="540" height="960" fill="#FFFFFF"/>
  <rect x="35" y="35" width="470" height="890" fill="none" stroke="#E7E5E4" stroke-width="1"/>

  <!-- Monogram Serif -->
  <text x="270" y="240" font-family="'Cormorant Garamond', serif" font-size="80" font-weight="300" fill="#1C1917" text-anchor="middle">A &amp; S</text>
  
  <line x1="220" y1="280" x2="320" y2="280" stroke="#1C1917" stroke-width="1"/>

  <text x="270" y="380" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="500" fill="#78716C" text-anchor="middle" letter-spacing="5">THE WEDDING CELEBRATION</text>
  <text x="270" y="450" font-family="'Cormorant Garamond', Georgia, serif" font-size="44" fill="#1C1917" text-anchor="middle">Ahmad Arif</text>
  <text x="270" y="490" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#A8A29E" text-anchor="middle">&amp;</text>
  <text x="270" y="540" font-family="'Cormorant Garamond', Georgia, serif" font-size="44" fill="#1C1917" text-anchor="middle">Siti Rahmawati</text>

  <text x="270" y="620" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="600" fill="#1C1917" text-anchor="middle">14 NOVEMBER 2027</text>

  <!-- Badge Preview -->
  <rect x="180" y="780" width="180" height="42" rx="21" fill="#1C1917"/>
  <text x="270" y="806" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">MINIMAL EDITORIAL</text>
</svg>
`.trim();

// 6. QRIS Merchant Dummy Vector
const qrisMerchantSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="100%" height="100%">
  <!-- White Card Canvas -->
  <rect width="600" height="750" rx="24" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="2"/>
  
  <!-- Header QRIS Merah -->
  <rect x="0" y="0" width="600" height="110" rx="24" fill="#EA1E24"/>
  <rect x="0" y="80" width="600" height="30" fill="#EA1E24"/>

  <!-- Logo QRIS Putih -->
  <text x="50" y="70" font-family="'Arial Black', sans-serif" font-size="42" font-weight="900" fill="#FFFFFF" letter-spacing="-1">QRIS</text>
  <text x="180" y="55" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">PEMBAYARAN DIGITAL</text>
  <text x="180" y="75" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="#FEE2E2">STANDAR NASIONAL INDONESIA</text>

  <!-- Merchant Name -->
  <text x="300" y="165" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="800" fill="#111827" text-anchor="middle">NIKAHPLAN: ARIF &amp; SITI WEDDING</text>
  <text x="300" y="195" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="500" fill="#6B7280" text-anchor="middle">NMID: ID1026048899123 / A01</text>

  <!-- QR Frame Outer -->
  <rect x="100" y="230" width="400" height="400" rx="16" fill="#F9FAFB" stroke="#D1D5DB" stroke-width="2"/>

  <!-- Simulated QR Pattern Matrix -->
  <!-- Top Left Finder Pattern -->
  <rect x="130" y="260" width="80" height="80" rx="8" fill="#111827"/>
  <rect x="145" y="275" width="50" height="50" rx="4" fill="#FFFFFF"/>
  <rect x="157" y="287" width="26" height="26" rx="2" fill="#111827"/>

  <!-- Top Right Finder Pattern -->
  <rect x="390" y="260" width="80" height="80" rx="8" fill="#111827"/>
  <rect x="405" y="275" width="50" height="50" rx="4" fill="#FFFFFF"/>
  <rect x="417" y="287" width="26" height="26" rx="2" fill="#111827"/>

  <!-- Bottom Left Finder Pattern -->
  <rect x="130" y="520" width="80" height="80" rx="8" fill="#111827"/>
  <rect x="145" y="535" width="50" height="50" rx="4" fill="#FFFFFF"/>
  <rect x="157" y="547" width="26" height="26" rx="2" fill="#111827"/>

  <!-- Center Decorative GPN / NikahPlan Shield -->
  <rect x="260" y="390" width="80" height="80" rx="12" fill="#111827"/>
  <text x="300" y="438" font-family="'Plus Jakarta Sans', sans-serif" font-size="28" font-weight="900" fill="#F59E0B" text-anchor="middle">NP</text>

  <!-- Dummy Data Cells Matrix -->
  <g fill="#111827">
    <rect x="230" y="265" width="20" height="20" rx="2"/>
    <rect x="270" y="265" width="30" height="15" rx="2"/>
    <rect x="320" y="265" width="15" height="20" rx="2"/>
    <rect x="350" y="275" width="20" height="20" rx="2"/>
    
    <rect x="230" y="305" width="15" height="35" rx="2"/>
    <rect x="265" y="315" width="25" height="20" rx="2"/>
    <rect x="310" y="305" width="40" height="15" rx="2"/>
    <rect x="360" y="315" width="15" height="35" rx="2"/>

    <rect x="135" y="365" width="25" height="20" rx="2"/>
    <rect x="180" y="365" width="30" height="15" rx="2"/>
    <rect x="135" y="415" width="35" height="15" rx="2"/>
    <rect x="185" y="410" width="25" height="25" rx="2"/>
    <rect x="135" y="455" width="45" height="20" rx="2"/>
    <rect x="195" y="455" width="20" height="30" rx="2"/>

    <rect x="390" y="365" width="30" height="20" rx="2"/>
    <rect x="440" y="365" width="25" height="15" rx="2"/>
    <rect x="390" y="410" width="20" height="30" rx="2"/>
    <rect x="430" y="405" width="35" height="20" rx="2"/>
    <rect x="390" y="460" width="40" height="15" rx="2"/>
    <rect x="445" y="455" width="20" height="30" rx="2"/>

    <rect x="230" y="495" width="30" height="20" rx="2"/>
    <rect x="280" y="500" width="25" height="15" rx="2"/>
    <rect x="325" y="495" width="20" height="35" rx="2"/>
    <rect x="365" y="505" width="30" height="20" rx="2"/>

    <rect x="230" y="545" width="20" height="35" rx="2"/>
    <rect x="270" y="535" width="35" height="20" rx="2"/>
    <rect x="320" y="550" width="30" height="15" rx="2"/>
    <rect x="370" y="540" width="20" height="40" rx="2"/>
    <rect x="410" y="535" width="30" height="20" rx="2"/>
    <rect x="455" y="545" width="20" height="25" rx="2"/>
  </g>

  <!-- Footer Info -->
  <text x="300" y="675" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="700" fill="#111827" text-anchor="middle">DAPAT DIPINDAI OLEH SELURUH BANK &amp; E-WALLET</text>
  <text x="300" y="705" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="#6B7280" text-anchor="middle">BCA Mobile • Livin Mandiri • GoPay • OVO • DANA • ShopeePay</text>
</svg>
`.trim();

// 7. Gold Mahar Illustration Vector
const goldMaharSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="100%" height="100%">
  <defs>
    <linearGradient id="goldTop" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE68A"/>
      <stop offset="40%" stop-color="#F59E0B"/>
      <stop offset="100%" stop-color="#D97706"/>
    </linearGradient>
    <linearGradient id="goldSide" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#D97706"/>
      <stop offset="100%" stop-color="#92400E"/>
    </linearGradient>
    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="10" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Soft Shadow Floor -->
  <ellipse cx="200" cy="230" rx="130" ry="25" fill="#1C1917" opacity="0.12"/>

  <!-- Emas Batangan 1 (Belakang) -->
  <g transform="translate(130, 70)">
    <!-- Sisi Bawah / Samping -->
    <polygon points="20,110 160,110 180,95 40,95" fill="url(#goldSide)"/>
    <!-- Sisi Depan -->
    <polygon points="20,110 40,95 40,55 20,70" fill="#B45309"/>
    <!-- Sisi Atas Batangan -->
    <polygon points="20,70 160,70 180,55 40,55" fill="url(#goldTop)"/>
  </g>

  <!-- Emas Batangan 2 (Depan Utama) -->
  <g transform="translate(90, 110)" filter="url(#goldGlow)">
    <!-- Tebal Samping Kanan -->
    <polygon points="170,90 200,70 200,45 170,65" fill="#92400E"/>
    <!-- Tebal Depan -->
    <polygon points="10,90 170,90 170,65 10,65" fill="url(#goldSide)"/>
    <!-- Muka Atas Emas -->
    <polygon points="10,65 170,65 200,45 40,45" fill="url(#goldTop)"/>

    <!-- Cetakan Emboss LOGAM MULIA 10g 999.9 -->
    <text x="105" y="60" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="800" fill="#78350F" text-anchor="middle" letter-spacing="1">FINE GOLD 999.9</text>
    <text x="105" y="73" font-family="'Plus Jakarta Sans', sans-serif" font-size="8" font-weight="700" fill="#78350F" text-anchor="middle">NET WEIGHT 10g</text>
  </g>

  <!-- Koin Emas Mahar Bersinar -->
  <g transform="translate(250, 150)">
    <circle cx="40" cy="40" r="35" fill="url(#goldSide)"/>
    <circle cx="38" cy="38" r="33" fill="url(#goldTop)"/>
    <circle cx="38" cy="38" r="26" fill="none" stroke="#FDE68A" stroke-width="1.5" stroke-dasharray="3,2"/>
    <text x="38" y="43" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="900" fill="#78350F" text-anchor="middle">LM</text>
  </g>
</svg>
`.trim();

const assets = [
  { name: 'avatar-groom.svg', content: avatarGroomSvg },
  { name: 'avatar-bride.svg', content: avatarBrideSvg },
  { name: 'theme-javanese-heritage.svg', content: themeJavaneseSvg },
  { name: 'theme-botanical-sage.svg', content: themeBotanicalSvg },
  { name: 'theme-minimal-editorial.svg', content: themeMinimalSvg },
  { name: 'qris-merchant-dummy.svg', content: qrisMerchantSvg },
  { name: 'gold-mahar-illustration.svg', content: goldMaharSvg },
];

console.log('Generating custom vector assets (Zero stock photo internet)...');

assets.forEach(asset => {
  targetDirs.forEach(dir => {
    const filePath = path.join(dir, asset.name);
    fs.writeFileSync(filePath, asset.content, 'utf-8');
  });
  console.log(`  ✓ Generated: ${asset.name}`);
});

console.log('\nAll assets generated successfully across packages/ui and apps public directories!');
