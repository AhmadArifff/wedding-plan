import * as React from 'react';

export type DashboardThemeId =
  | 'classic-sacred'      // 🌾 Classic Sacred Cream & Emerald Teal
  | 'royal-editorial'     // 👑 Royal Burgundy Velvet & Champagne Gold (Adopted from BucketFlowers Tema B)
  | 'korean-atelier'      // 🌸 Korean Pastel Atelier (Sakura & Sage, Adopted from BucketFlowers Tema A)
  | 'midnight-celestial';  // ✨ Midnight Celestial Gold (Obsidian & Starlight)

export interface DashboardThemeConfig {
  id: DashboardThemeId;
  name: string;
  subtitle: string;
  badge: string;
  tagline: string;
  sentimentQuote: string;
  quoteAuthor: string;
  greetingPrefix: string;
  fontHeadingClass: string;
  fontBodyClass: string;
  fontHeadingInline: string;

  // Colors & Surfaces
  pageBg: string;
  pageBackgroundCss: string;
  containerBg: string;
  containerBorder: string;
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  
  // Typography Colors
  textHeading: string;
  textBody: string;
  textMuted: string;
  textSubtle: string;

  // Accent Colors & Pills
  primaryAccent: string;
  primaryHover: string;
  primaryLight: string;
  primaryText: string;
  activePillBg: string;
  activePillText?: string;
  inactivePillText: string;
  inactivePillHover: string;

  // Left Dock Bar
  dockBg: string;
  dockBorder: string;
  dockAddBtnBg: string;
  dockAddBtnText: string;
  dockIconColor: string;
  dockActiveColor: string;

  // Swatch
  swatchPrimary: string;
  swatchAccent: string;

  // Metric Chip Accents
  kpiStyles: {
    budget: { bg: string; border: string; text: string; badge: string; badgeText: string };
    kitchen: { bg: string; border: string; text: string; badge: string; badgeText: string };
    vendor: { bg: string; border: string; text: string; badge: string; badgeText: string };
    savings: { bg: string; border: string; text: string; badge: string; badgeText: string };
  };
}

export const DASHBOARD_THEMES: Record<DashboardThemeId, DashboardThemeConfig> = {
  'classic-sacred': {
    id: 'classic-sacred',
    name: 'Classic Sacred Cream',
    subtitle: 'Tradisi Pernikahan Suci & Asri',
    badge: '🌿 Sakral & Penuh Berkah',
    tagline: 'Walimatul \'Urs Suci Penuh Berkah',
    sentimentQuote:
      'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
    quoteAuthor: 'QS. Ar-Rum: 21',
    greetingPrefix: 'Selamat Siang',
    fontHeadingClass: 'font-serif italic tracking-tight',
    fontBodyClass: 'font-sans',
    fontHeadingInline: "'Cormorant Garamond', Georgia, serif",

    pageBg: '#FAF8F5',
    pageBackgroundCss: 'radial-gradient(circle at 50% 0%, #FFFDF9 0%, #FAF8F5 100%)',
    containerBg: '#FFFFFF',
    containerBorder: '#E7E0D6',
    cardBg: '#FFFFFF',
    cardBorder: '#E7E0D6',
    cardShadow: '0 4px 16px -2px rgba(28, 25, 23, 0.05)',

    textHeading: '#1C1917',
    textBody: '#44403C',
    textMuted: '#78716C',
    textSubtle: '#A8A29E',

    primaryAccent: '#0F766E',
    primaryHover: '#115E59',
    primaryLight: '#F0FDFA',
    primaryText: '#FFFFFF',
    activePillBg: 'bg-stone-900 text-white shadow-xs',
    inactivePillText: 'text-stone-600',
    inactivePillHover: 'hover:bg-stone-100 hover:text-stone-900',

    dockBg: 'bg-stone-900',
    dockBorder: 'border-stone-800',
    dockAddBtnBg: 'bg-amber-400 hover:bg-amber-300 text-stone-950',
    dockAddBtnText: 'text-stone-950',
    dockIconColor: 'text-stone-400 hover:text-white',
    dockActiveColor: 'text-amber-300 bg-stone-800',

    swatchPrimary: '#0F766E',
    swatchAccent: '#F59E0B',

    kpiStyles: {
      budget: { bg: 'bg-teal-50/50', border: 'border-teal-200/80', text: 'text-teal-950', badge: 'bg-teal-100 text-teal-800', badgeText: '14 Kategori' },
      kitchen: { bg: 'bg-emerald-50/50', border: 'border-emerald-200/80', text: 'text-emerald-950', badge: 'bg-emerald-100 text-emerald-800', badgeText: 'Hemat 53%' },
      vendor: { bg: 'bg-amber-50/50', border: 'border-amber-200/80', text: 'text-amber-950', badge: 'bg-amber-100 text-amber-800', badgeText: '4 Deal Terpilih' },
      savings: { bg: 'bg-rose-50/50', border: 'border-rose-200/80', text: 'text-rose-950', badge: 'bg-rose-100 text-rose-800', badgeText: '11 Bulan Tabungan' },
    },
  },

  'royal-editorial': {
    id: 'royal-editorial',
    name: 'Royal Editorial Luxury',
    subtitle: 'Burgundy Velvet & Champagne Gold',
    badge: '👑 Megah & Berkelas',
    tagline: 'The Grand Wedding of Arif & Windi',
    sentimentQuote:
      'Momen agung terindah dalam hidup, dirajut dengan kemewahan abadi, cinta sakral, dan tata kelola anggaran tanpa cela.',
    quoteAuthor: 'The Royal Vows of Elegance',
    greetingPrefix: 'Grand Afternoon',
    fontHeadingClass: 'font-serif tracking-tight',
    fontBodyClass: 'font-sans',
    fontHeadingInline: "'Bodoni Moda', 'Playfair Display', Georgia, serif",

    pageBg: '#FAF5F2',
    pageBackgroundCss: 'radial-gradient(circle at 50% 0%, #FFFDF9 0%, #F5ECE3 100%)',
    containerBg: '#FFFFFF',
    containerBorder: '#E8D399',
    cardBg: '#FFFFFF',
    cardBorder: '#E8D399',
    cardShadow: '0 8px 24px -4px rgba(114, 47, 55, 0.08), 0 2px 8px -2px rgba(212, 175, 55, 0.1)',

    textHeading: '#2A171D',
    textBody: '#4A2E35',
    textMuted: '#6E6868',
    textSubtle: '#A09A9A',

    primaryAccent: '#722F37',
    primaryHover: '#5A232A',
    primaryLight: '#F7EAEB',
    primaryText: '#FFFFFF',
    activePillBg: 'bg-[#2B181E] text-[#FDF9F0] border border-[#D4AF37]/50 shadow-sm',
    inactivePillText: 'text-[#6E6868]',
    inactivePillHover: 'hover:bg-[#F7EAEB] hover:text-[#2A171D]',

    dockBg: 'bg-[#2B181E]',
    dockBorder: 'border-[#D4AF37]/40',
    dockAddBtnBg: 'bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-stone-950',
    dockAddBtnText: 'text-stone-950',
    dockIconColor: 'text-[#D5C2C7] hover:text-[#FDF9F0]',
    dockActiveColor: 'text-amber-300 bg-[#3D222B]',

    swatchPrimary: '#722F37',
    swatchAccent: '#D4AF37',

    kpiStyles: {
      budget: { bg: 'bg-[#FDF9F0]', border: 'border-[#E8D399]', text: 'text-[#2A171D]', badge: 'bg-[#722F37] text-amber-200', badgeText: '14 Kategori Plafon' },
      kitchen: { bg: 'bg-[#FAF6F3]', border: 'border-[#E8D399]', text: 'text-[#2A171D]', badge: 'bg-amber-100 text-amber-900 border border-amber-300', badgeText: 'Dapur Mandiri' },
      vendor: { bg: 'bg-[#FDF9F0]', border: 'border-[#E8D399]', text: 'text-[#2A171D]', badge: 'bg-[#722F37] text-white', badgeText: '4 Vendor Deal' },
      savings: { bg: 'bg-[#FAF6F3]', border: 'border-[#E8D399]', text: 'text-[#2A171D]', badge: 'bg-amber-50 text-amber-900', badgeText: 'Kesiapan 84%' },
    },
  },

  'korean-atelier': {
    id: 'korean-atelier',
    name: 'Korean Pastel Atelier',
    subtitle: 'Sentuhan Hangat Sakura, Sage & Peach',
    badge: '🌸 Lembut & Romantis',
    tagline: 'Sweet Blossom Wedding Story',
    sentimentQuote:
      'Cinta adalah kehangatan sederhana yang bertumbuh setiap hari, merajut impian bersama dengan senyum dan ketulusan.',
    quoteAuthor: 'Sweet Romance Story',
    greetingPrefix: 'Annyeong',
    fontHeadingClass: 'font-serif tracking-normal',
    fontBodyClass: 'font-sans',
    fontHeadingInline: "'Cormorant Garamond', Georgia, serif",

    pageBg: '#FFF9F7',
    pageBackgroundCss: 'radial-gradient(circle at 60% 0%, #FFF0F3 0%, #FFF9F7 100%)',
    containerBg: '#FFFFFF',
    containerBorder: '#F3DCE2',
    cardBg: '#FFFFFF',
    cardBorder: '#F7D1D9',
    cardShadow: '0 8px 24px -4px rgba(244, 167, 185, 0.16)',

    textHeading: '#2D2A2A',
    textBody: '#4A2E35',
    textMuted: '#7E7676',
    textSubtle: '#A09898',

    primaryAccent: '#E86A82',
    primaryHover: '#D6536C',
    primaryLight: '#FFF0F3',
    primaryText: '#FFFFFF',
    activePillBg: 'bg-[#E86A82] text-white shadow-xs',
    inactivePillText: 'text-[#7E7676]',
    inactivePillHover: 'hover:bg-[#FFF0F3] hover:text-[#2D2A2A]',

    dockBg: 'bg-[#38252B]',
    dockBorder: 'border-[#F7D1D9]/40',
    dockAddBtnBg: 'bg-[#F4A7B9] hover:bg-[#E86A82] text-white',
    dockAddBtnText: 'text-white',
    dockIconColor: 'text-[#E0CCD2] hover:text-[#FFF5F7]',
    dockActiveColor: 'text-[#F4A7B9] bg-[#4A333B]',

    swatchPrimary: '#E86A82',
    swatchAccent: '#A8C3A0',

    kpiStyles: {
      budget: { bg: 'bg-[#FFF5F7]', border: 'border-[#F7D1D9]', text: 'text-[#4A2E35]', badge: 'bg-[#FDF2F4] text-[#E86A82] border border-[#F7D1D9]', badgeText: 'Plafon 14 Kategori' },
      kitchen: { bg: 'bg-[#F1F6F0]', border: 'border-[#C6DEC0]', text: 'text-[#1F3E1A]', badge: 'bg-[#A8C3A0] text-white', badgeText: 'Hemat 53%' },
      vendor: { bg: 'bg-[#FFF5F7]', border: 'border-[#F7D1D9]', text: 'text-[#4A2E35]', badge: 'bg-[#E86A82] text-white', badgeText: '4 Vendor Terpilih' },
      savings: { bg: 'bg-[#FFF8F0]', border: 'border-[#FED7AA]', text: 'text-[#7C2D12]', badge: 'bg-[#FED7AA] text-[#7C2D12]', badgeText: '11 Bulan' },
    },
  },

  'midnight-celestial': {
    id: 'midnight-celestial',
    name: 'Midnight Celestial Gold',
    subtitle: 'Obsidian Noir & Emas Starlight Abadi',
    badge: '✨ Gelap Mewah & Eksklusif',
    tagline: 'Celestial Union of Two Souls',
    sentimentQuote:
      'Dua bintang bertaut di bawah langit malam abadi, memancarkan cahaya cinta agung yang takkan pernah pudar.',
    quoteAuthor: 'Celestial Midnight Ode',
    greetingPrefix: 'Good Evening',
    fontHeadingClass: 'font-serif tracking-wide',
    fontBodyClass: 'font-sans',
    fontHeadingInline: "'Bodoni Moda', Georgia, serif",

    pageBg: '#0B0F17',
    pageBackgroundCss: 'radial-gradient(circle at 50% 0%, #151E2E 0%, #0B0F17 100%)',
    containerBg: '#0F172A',
    containerBorder: 'rgba(245, 158, 11, 0.3)',
    cardBg: '#131B2A',
    cardBorder: 'rgba(245, 158, 11, 0.25)',
    cardShadow: '0 8px 30px -4px rgba(0, 0, 0, 0.5), 0 0 15px rgba(245, 158, 11, 0.08)',

    textHeading: '#F8FAFC',
    textBody: '#CBD5E1',
    textMuted: '#94A3B8',
    textSubtle: '#64748B',

    primaryAccent: '#F59E0B',
    primaryHover: '#D97706',
    primaryLight: 'rgba(245, 158, 11, 0.15)',
    primaryText: '#0F172A',
    activePillBg: 'bg-amber-400 text-stone-950 font-bold shadow-md shadow-amber-400/20',
    inactivePillText: 'text-stone-400',
    inactivePillHover: 'hover:bg-stone-800 hover:text-stone-100',

    dockBg: 'bg-[#030712]',
    dockBorder: 'border-amber-500/30',
    dockAddBtnBg: 'bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold shadow-lg shadow-amber-500/25',
    dockAddBtnText: 'text-stone-950',
    dockIconColor: 'text-stone-400 hover:text-amber-300',
    dockActiveColor: 'text-amber-300 bg-stone-900 border border-amber-500/40',

    swatchPrimary: '#F59E0B',
    swatchAccent: '#38BDF8',

    kpiStyles: {
      budget: { bg: 'bg-[#182234]', border: 'border-amber-500/30', text: 'text-amber-200', badge: 'bg-amber-500/20 text-amber-300 border border-amber-500/40', badgeText: '14 Kategori Plafon' },
      kitchen: { bg: 'bg-[#182234]', border: 'border-amber-500/30', text: 'text-amber-200', badge: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40', badgeText: 'Hemat 53%' },
      vendor: { bg: 'bg-[#182234]', border: 'border-amber-500/30', text: 'text-amber-200', badge: 'bg-amber-500/20 text-amber-300 border border-amber-500/40', badgeText: '4 Terpilih' },
      savings: { bg: 'bg-[#182234]', border: 'border-amber-500/30', text: 'text-amber-200', badge: 'bg-sky-500/20 text-sky-300 border border-sky-500/40', badgeText: '11 Bulan' },
    },
  },
};
