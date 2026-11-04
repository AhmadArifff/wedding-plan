'use client';

import * as React from 'react';
import { Sparkles, CheckCircle, Heart, FastForward, Flower2 } from 'lucide-react';

export type CraftActor = 'arif' | 'windi';

export type CraftSubPhase =
  | 'idle'
  | 'traveling'
  | 'dragging'
  | 'settling'
  | 'clicking'
  | 'typing'
  | 'inspecting'
  | 'deselecting'
  | 'celebrating'
  | 'finished';

export interface CraftStepDefinition {
  id: string;
  actor: CraftActor;
  title: string;
  actionDragLabel: string;
  actionSettleLabel: string;
  actionClickLabel: string;
  actionTypeLabel: string;
  actionInspectLabel: string;
  targetText?: string;
  typeDurationMs?: number;
  isSpecialFont?: boolean;
  isCenterSnap?: boolean;
}

export const CRAFT_STEPS: CraftStepDefinition[] = [
  // 1. Walimatul 'Urs Header
  {
    id: 'hero-header',
    actor: 'arif',
    title: "Header Walimatul 'Urs",
    actionDragLabel: 'Tarik Kotak Header: Kiri Atas ke Kanan Bawah',
    actionSettleLabel: 'Validasi Posisi Kotak Header',
    actionClickLabel: 'Klik Masuk Mode Edit Teks [T]',
    actionTypeLabel: 'Mengetik "WALIMATUL \'URS"...',
    actionInspectLabel: 'Validasi Teks & Letter-Spacing Header',
    targetText: "WALIMATUL 'URS",
    typeDurationMs: 1000,
  },
  // 2. Nama Mempelai Hero + Font Cormorant Garamond
  {
    id: 'hero-names',
    actor: 'windi',
    title: 'Nama Mempelai Hero & Tipografi',
    actionDragLabel: 'Tarik Frame Nama Utama Mempelai',
    actionSettleLabel: 'Validasi Ukuran Frame Nama',
    actionClickLabel: 'Klik Masuk Mode Tipografi',
    actionTypeLabel: 'Mengetik "Arif & Windi"...',
    actionInspectLabel: 'Validasi Font: Cormorant Garamond Italic',
    targetText: 'Arif & Windi',
    typeDurationMs: 1000,
    isSpecialFont: true,
  },
  // 3. Tanggal Resepsi Hero
  {
    id: 'hero-date',
    actor: 'arif',
    title: 'Tanggal Utama Undangan',
    actionDragLabel: 'Tarik Kotak Tanggal Acara',
    actionSettleLabel: 'Validasi Posisi Tanggal',
    actionClickLabel: 'Klik Edit Tanggal',
    actionTypeLabel: 'Mengetik "Minggu, 14 November 2027"...',
    actionInspectLabel: 'Validasi Format Tanggal Acara',
    targetText: 'Minggu, 14 November 2027',
    typeDurationMs: 1100,
  },
  // 4. Ikon Hati Ayat Suci
  {
    id: 'verse-icon',
    actor: 'windi',
    title: 'Ornamen Ikon Hati Ayat Suci',
    actionDragLabel: 'Tarik Lingkaran Ornamen Hati 32x32px',
    actionSettleLabel: 'Validasi Titik Tengah Ikon',
    actionClickLabel: 'Klik Sematkan Ikon Heart SVG',
    actionTypeLabel: 'Merender Ikon Hati Sage Green...',
    actionInspectLabel: 'Validasi Proporsi & Warna Ikon',
    targetText: '♥',
    typeDurationMs: 700,
  },
  // 5. Teks Lengkap Ayat Suci QS. Ar-Rum: 21
  {
    id: 'verse-text',
    actor: 'windi',
    title: 'Terjemahan Ayat Suci Ar-Rum: 21',
    actionDragLabel: 'Tarik Frame Paragraf Ayat Suci',
    actionSettleLabel: 'Validasi Batas Margin Paragraf',
    actionClickLabel: 'Klik Ketik Terjemahan Lengkap Ayat',
    actionTypeLabel: 'Mengetik Terjemahan Lengkap QS. Ar-Rum: 21...',
    actionInspectLabel: 'Validasi Kerapihan Baris Ayat Suci',
    targetText:
      'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
    typeDurationMs: 1900,
  },
  // 6. Referensi Surah QS. AR-RUM: 21
  {
    id: 'verse-ref',
    actor: 'windi',
    title: 'Label Surah QS. Ar-Rum: 21',
    actionDragLabel: 'Tarik Label Referensi Surah',
    actionSettleLabel: 'Validasi Posisi Label Surah',
    actionClickLabel: 'Klik Ketik Nama Surah',
    actionTypeLabel: 'Mengetik "QS. AR-RUM: 21"...',
    actionInspectLabel: 'Validasi Tipografi Surah',
    targetText: 'QS. AR-RUM: 21',
    typeDurationMs: 900,
  },
  // 7. Judul & Mukadimah Kedua Mempelai
  {
    id: 'couple-header',
    actor: 'arif',
    title: 'Judul & Mukadimah Kedua Mempelai',
    actionDragLabel: 'Tarik Blok Judul Kedua Mempelai',
    actionSettleLabel: 'Validasi Posisi Header Mempelai',
    actionClickLabel: 'Klik Ketik Judul & Kalimat Mukadimah',
    actionTypeLabel: 'Mengetik "Kedua Mempelai & Mukadimah"...',
    actionInspectLabel: 'Validasi Teks Pengantar Pernikahan',
    targetText:
      'Kedua Mempelai | Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud melangsungkan pernikahan:',
    typeDurationMs: 1400,
  },
  // 8. Foto Avatar Pengantin Pria
  {
    id: 'groom-avatar',
    actor: 'arif',
    title: 'Foto Profil Pengantin Pria',
    actionDragLabel: 'Tarik Frame Foto Lingkaran 80x80px',
    actionSettleLabel: 'Validasi Lingkaran Avatar Pria',
    actionClickLabel: 'Klik Unggah Ilustrasi Pengantin Pria',
    actionTypeLabel: 'Memasang Avatar Ahmad Arif...',
    actionInspectLabel: 'Validasi Border & Resolusi Foto Pria',
    targetText: 'avatar-groom.svg',
    typeDurationMs: 800,
  },
  // 9. Nama Lengkap Pengantin Pria
  {
    id: 'groom-name',
    actor: 'arif',
    title: 'Nama Lengkap Pengantin Pria',
    actionDragLabel: 'Tarik Kotak Teks Nama Pria',
    actionSettleLabel: 'Validasi Posisi Nama Pria',
    actionClickLabel: 'Klik Ketik Nama & Gelar Pria',
    actionTypeLabel: 'Mengetik "Ahmad Arif, S.Kom"...',
    actionInspectLabel: 'Validasi Ejaan Nama & Gelar Pria',
    targetText: 'Ahmad Arif, S.Kom',
    typeDurationMs: 1100,
  },
  // 10. Nama Orang Tua Pengantin Pria (Bapak & Ibu)
  {
    id: 'groom-parents',
    actor: 'arif',
    title: 'Nama Orang Tua Pengantin Pria',
    actionDragLabel: 'Tarik Kotak Silsilah Orang Tua Pria',
    actionSettleLabel: 'Validasi Posisi Teks Orang Tua Pria',
    actionClickLabel: 'Klik Ketik Nama Bapak & Ibu Mempelai Pria',
    actionTypeLabel: 'Mengetik "Putra dari Bpk. H. Mahmud & Ibu Hj. Aminah"...',
    actionInspectLabel: 'Validasi Nama Bpk. H. Mahmud & Ibu Hj. Aminah',
    targetText: 'Putra dari Bpk. H. Mahmud & Ibu Hj. Aminah',
    typeDurationMs: 1350,
  },
  // 11. Foto Avatar Pengantin Wanita
  {
    id: 'bride-avatar',
    actor: 'windi',
    title: 'Foto Profil Pengantin Wanita',
    actionDragLabel: 'Tarik Frame Foto Lingkaran 80x80px',
    actionSettleLabel: 'Validasi Lingkaran Avatar Wanita',
    actionClickLabel: 'Klik Unggah Ilustrasi Pengantin Wanita',
    actionTypeLabel: 'Memasang Avatar Windi Widia...',
    actionInspectLabel: 'Validasi Border & Resolusi Foto Wanita',
    targetText: 'avatar-bride.svg',
    typeDurationMs: 800,
  },
  // 12. Nama Lengkap Pengantin Wanita
  {
    id: 'bride-name',
    actor: 'windi',
    title: 'Nama Lengkap Pengantin Wanita',
    actionDragLabel: 'Tarik Kotak Teks Nama Wanita',
    actionSettleLabel: 'Validasi Posisi Nama Wanita',
    actionClickLabel: 'Klik Ketik Nama & Gelar Wanita',
    actionTypeLabel: 'Mengetik "Windi Widia, S.Pd"...',
    actionInspectLabel: 'Validasi Ejaan Nama & Gelar Wanita',
    targetText: 'Windi Widia, S.Pd',
    typeDurationMs: 1100,
  },
  // 13. Nama Orang Tua Pengantin Wanita (Bapak & Ibu)
  {
    id: 'bride-parents',
    actor: 'windi',
    title: 'Nama Orang Tua Pengantin Wanita',
    actionDragLabel: 'Tarik Kotak Silsilah Orang Tua Wanita',
    actionSettleLabel: 'Validasi Posisi Teks Orang Tua Wanita',
    actionClickLabel: 'Klik Ketik Nama Bapak & Ibu Mempelai Wanita',
    actionTypeLabel: 'Mengetik "Putri dari Bpk. Drs. H. Subagyo & Ibu Hj. Endang"...',
    actionInspectLabel: 'Validasi Nama Bpk. Drs. H. Subagyo & Ibu Hj. Endang',
    targetText: 'Putri dari Bpk. Drs. H. Subagyo & Ibu Hj. Endang',
    typeDurationMs: 1400,
  },
  // 14. Header Rangkaian Acara
  {
    id: 'agenda-header',
    actor: 'arif',
    title: 'Judul Seksi Rangkaian Acara',
    actionDragLabel: 'Tarik Kotak Judul Rangkaian Acara',
    actionSettleLabel: 'Validasi Posisi Header Acara',
    actionClickLabel: 'Klik Ketik Judul & Sub-teks Acara',
    actionTypeLabel: 'Mengetik "Rangkaian Acara"...',
    actionInspectLabel: 'Validasi Tipografi Header Acara',
    targetText: 'Rangkaian Acara | Insya Allah acara diselenggarakan pada:',
    typeDurationMs: 1150,
  },
  // 15. Kartu Agenda Akad Nikah Lengkap
  {
    id: 'agenda-akad',
    actor: 'arif',
    title: 'Kartu Jadwal Akad Nikah',
    actionDragLabel: 'Tarik Card Akad Nikah',
    actionSettleLabel: 'Validasi Ukuran Card Akad Nikah',
    actionClickLabel: 'Klik Isi Waktu & Lokasi Akad Nikah',
    actionTypeLabel: 'Mengetik Detail Akad Nikah, Jam 08:00 WIB & Lokasi...',
    actionInspectLabel: 'Validasi Jadwal & Lokasi Pendopo Dalem Ngabean',
    targetText:
      'Akad Nikah | Khusus Keluarga | Minggu, 14 November 2027 | 08:00 - 10:00 WIB | Pendopo Dalem Ngabean, Kraton Yogyakarta',
    typeDurationMs: 1500,
  },
  // 16. Kartu Agenda Resepsi Pernikahan Lengkap
  {
    id: 'agenda-resepsi',
    actor: 'arif',
    title: 'Kartu Jadwal Resepsi Pernikahan',
    actionDragLabel: 'Tarik Card Resepsi Pernikahan',
    actionSettleLabel: 'Validasi Ukuran Card Resepsi',
    actionClickLabel: 'Klik Isi Waktu & Gedung Resepsi',
    actionTypeLabel: 'Mengetik Detail Resepsi, Jam 11:00 WIB & Gedung...',
    actionInspectLabel: 'Validasi Jadwal & Lokasi Graha Sakinah',
    targetText:
      'Resepsi Pernikahan | Umum & Kerabat | Minggu, 14 November 2027 | 11:00 - 14:00 WIB | Graha Sakinah Convention Hall',
    typeDurationMs: 1500,
  },
  // 17. Tombol Google Maps
  {
    id: 'maps-button',
    actor: 'arif',
    title: 'Tombol Navigasi Google Maps',
    actionDragLabel: 'Tarik Komponen Tombol Navigasi Maps',
    actionSettleLabel: 'Validasi Tinggi Tap Target 44px',
    actionClickLabel: 'Klik Ketik Label & Tautan Maps',
    actionTypeLabel: 'Mengetik "Petunjuk Arah Google Maps"...',
    actionInspectLabel: 'Validasi Tautan & Ikon Pin Maps',
    targetText: 'Petunjuk Arah Google Maps',
    typeDurationMs: 1100,
  },
  // 18. Header Amplop Digital & Kado
  {
    id: 'envelope-header',
    actor: 'windi',
    title: 'Judul & Pengantar Amplop Digital',
    actionDragLabel: 'Tarik Blok Judul Amplop Digital',
    actionSettleLabel: 'Validasi Posisi Header Amplop',
    actionClickLabel: 'Klik Ketik Judul & Pesan Tanda Kasih',
    actionTypeLabel: 'Mengetik "Amplop Digital & Kado"...',
    actionInspectLabel: 'Validasi Teks Pengantar Tanda Kasih',
    targetText:
      'Amplop Digital & Kado | Doa restu Anda merupakan karunia terindah bagi kami. Bagi keluarga dan sahabat yang ingin memberikan tanda kasih secara digital, dapat melalui rekening berikut:',
    typeDurationMs: 1400,
  },
  // 19. Kartu Rekening Bank BCA & Mandiri
  {
    id: 'bank-card',
    actor: 'windi',
    title: 'Kartu Rekening BCA & Mandiri',
    actionDragLabel: 'Tarik Frame Kartu Rekening Bank',
    actionSettleLabel: 'Validasi Ukuran Kartu Rekening',
    actionClickLabel: 'Klik Ketik Nomor Rekening & Atas Nama',
    actionTypeLabel: 'Mengetik Rek BCA (Ahmad Arif) & Mandiri (Windi Widia)...',
    actionInspectLabel: 'Validasi Nomor Rekening & Tombol Salin',
    targetText: 'BCA 1234567890 a.n Ahmad Arif | Mandiri 9876543210 a.n Windi Widia',
    typeDurationMs: 1550,
  },
  // 20. Kartu Barcode QRIS Merchant (Auto-Snap Center Guide)
  {
    id: 'qris-card',
    actor: 'windi',
    title: 'Barcode QRIS Merchant (Auto-Snap)',
    actionDragLabel: 'Tarik Frame Barcode QRIS Merchant',
    actionSettleLabel: 'Validasi Ukuran Kotak QRIS',
    actionClickLabel: 'Klik Sematkan Kode QRIS & NMID',
    actionTypeLabel: 'Menyematkan QRIS a.n Arif & Windi Wedding...',
    actionInspectLabel: 'Validasi Auto-Snap Sumbu X & Barcode QRIS',
    targetText: 'Arif & Windi Wedding',
    typeDurationMs: 1200,
    isCenterSnap: true,
  },
];

export interface CraftingState {
  currentStepIndex: number;
  subPhase: CraftSubPhase;
  activeStepId: string | null;
  completedStepIds: string[];
  typedText: string;
  typingProgress: number;
  dragProgress: number;
  isSpecialFontActive: boolean;
  isFinished: boolean;
}

export interface InvitationLiveCraftingProps {
  containerRef: React.RefObject<HTMLElement | null>;
  enabled?: boolean;
  onStateChange?: (state: CraftingState) => void;
}

interface FloralParticleSpec {
  id: number;
  leftPercent: number;
  kind: 'jasmine' | 'rose-petal' | 'sage-leaf' | 'golden-daisy';
  sizePx: number;
  fallDurationSec: number;
  swayDurationSec: number;
  delaySec: number;
  driftPx: number;
  swayPx: number;
  rotDeg: number;
}

const FLORAL_PARTICLES: FloralParticleSpec[] = Array.from({ length: 36 }, (_, idx) => {
  const kinds: FloralParticleSpec['kind'][] = ['jasmine', 'rose-petal', 'sage-leaf', 'golden-daisy'];
  return {
    id: idx,
    leftPercent: ((idx * 17 + 7) % 94) + 3,
    kind: kinds[idx % kinds.length],
    sizePx: 16 + (idx % 4) * 4,
    fallDurationSec: 6.2 + (idx % 5) * 1.15,
    swayDurationSec: 2.6 + (idx % 3) * 0.7,
    delaySec: (idx % 12) * 0.45,
    driftPx: (idx % 2 === 0 ? 1 : -1) * (20 + (idx % 4) * 12),
    swayPx: (idx % 2 === 0 ? 1 : -1) * (14 + (idx % 3) * 8),
    rotDeg: (idx % 2 === 0 ? 1 : -1) * (260 + (idx % 4) * 80),
  };
});

const FloralConfettiShower: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none"
      aria-hidden="true"
    >
      {FLORAL_PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 floral-particle"
          style={
            {
              left: `${p.leftPercent}%`,
              width: `${p.sizePx}px`,
              height: `${p.sizePx}px`,
              '--fall-duration': `${p.fallDurationSec}s`,
              '--sway-duration': `${p.swayDurationSec}s`,
              '--fall-delay': `${p.delaySec}s`,
              '--floral-drift': `${p.driftPx}px`,
              '--floral-sway': `${p.swayPx}px`,
              '--floral-rot': `${p.rotDeg}deg`,
            } as React.CSSProperties
          }
        >
          {p.kind === 'jasmine' && (
            /* Bunga Melati Putih Gading dengan Inti Emas */
            <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
              <g fill="#FFFDF9" stroke="#E7E0D6" strokeWidth="0.8">
                <ellipse cx="16" cy="7" rx="4.2" ry="6.5" />
                <ellipse cx="16" cy="7" rx="4.2" ry="6.5" transform="rotate(72 16 16)" />
                <ellipse cx="16" cy="7" rx="4.2" ry="6.5" transform="rotate(144 16 16)" />
                <ellipse cx="16" cy="7" rx="4.2" ry="6.5" transform="rotate(216 16 16)" />
                <ellipse cx="16" cy="7" rx="4.2" ry="6.5" transform="rotate(288 16 16)" />
              </g>
              <circle cx="16" cy="16" r="3.4" fill="#F59E0B" />
              <circle cx="16" cy="16" r="1.6" fill="#FEF3C7" />
            </svg>
          )}

          {p.kind === 'rose-petal' && (
            /* Kelopak Mawar Blush Pink */
            <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
              <path
                d="M16 4C9 4 5 10 6 17C7 23 12 28 16 29C20 28 25 23 26 17C27 10 23 4 16 4Z"
                fill="#FDA4AF"
                stroke="#F43F5E"
                strokeWidth="0.7"
                fillOpacity="0.9"
              />
              <path
                d="M16 9C13 13 13 20 16 26"
                stroke="#FECDD3"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          )}

          {p.kind === 'sage-leaf' && (
            /* Daun Sage Botanikal */
            <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
              <path
                d="M6 26C6 14 14 6 26 6C26 18 18 26 6 26Z"
                fill="#6EE7B7"
                stroke="#0F766E"
                strokeWidth="0.8"
                fillOpacity="0.85"
              />
              <path
                d="M7 25L23 9"
                stroke="#047857"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          )}

          {p.kind === 'golden-daisy' && (
            /* Bunga Daisy Kemilau Emas */
            <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xs">
              <g fill="#FDE68A" stroke="#D97706" strokeWidth="0.7">
                <ellipse cx="16" cy="6.5" rx="3.2" ry="6" />
                <ellipse cx="16" cy="6.5" rx="3.2" ry="6" transform="rotate(60 16 16)" />
                <ellipse cx="16" cy="6.5" rx="3.2" ry="6" transform="rotate(120 16 16)" />
                <ellipse cx="16" cy="6.5" rx="3.2" ry="6" transform="rotate(180 16 16)" />
                <ellipse cx="16" cy="6.5" rx="3.2" ry="6" transform="rotate(240 16 16)" />
                <ellipse cx="16" cy="6.5" rx="3.2" ry="6" transform="rotate(300 16 16)" />
              </g>
              <circle cx="16" cy="16" r="3.5" fill="#B45309" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

export const InvitationLiveCrafting: React.FC<InvitationLiveCraftingProps> = ({
  containerRef,
  enabled = true,
  onStateChange,
}) => {
  const [stepIndex, setStepIndex] = React.useState<number>(0);
  const [subPhase, setSubPhase] = React.useState<CraftSubPhase>('idle');
  const [completedSteps, setCompletedSteps] = React.useState<string[]>([]);
  const [typedText, setTypedText] = React.useState<string>('');
  const [typingProgress, setTypingProgress] = React.useState<number>(0);
  const [dragProgress, setDragProgress] = React.useState<number>(0);
  const [isSpecialFont, setIsSpecialFont] = React.useState<boolean>(false);
  const [isFinished, setIsFinished] = React.useState<boolean>(false);
  const [showFloralConfetti, setShowFloralConfetti] = React.useState<boolean>(false);

  // Measured bounding box of the active DOM element relative to container
  const [activeRect, setActiveRect] = React.useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);

  // Position of cursors inside container coordinates
  const [arifPos, setArifPos] = React.useState<{
    x: number;
    y: number;
    isClicking: boolean;
    isStill: boolean;
    isDragging: boolean;
    action: string;
    visible: boolean;
  }>({
    x: 40,
    y: 20,
    isClicking: false,
    isStill: false,
    isDragging: false,
    action: 'Siap Merakit Undangan',
    visible: true,
  });

  const [windiPos, setWindiPos] = React.useState<{
    x: number;
    y: number;
    isClicking: boolean;
    isStill: boolean;
    isDragging: boolean;
    action: string;
    visible: boolean;
  }>({
    x: 240,
    y: 20,
    isClicking: false,
    isStill: false,
    isDragging: false,
    action: 'Siap Merakit Undangan',
    visible: true,
  });

  const activeStep = CRAFT_STEPS[stepIndex] || null;

  // Sync state to parent
  React.useEffect(() => {
    onStateChange?.({
      currentStepIndex: stepIndex,
      subPhase,
      activeStepId: activeStep ? activeStep.id : null,
      completedStepIds: completedSteps,
      typedText,
      typingProgress,
      dragProgress,
      isSpecialFontActive: isSpecialFont,
      isFinished,
    });
  }, [
    stepIndex,
    subPhase,
    activeStep,
    completedSteps,
    typedText,
    typingProgress,
    dragProgress,
    isSpecialFont,
    isFinished,
    onStateChange,
  ]);

  // Measure element in DOM relative to container
  const measureElement = React.useCallback(
    (craftId: string) => {
      if (!containerRef.current) return null;
      const el = containerRef.current.querySelector(`[data-craft-id="${craftId}"]`) as HTMLElement | null;
      if (!el) return null;

      const containerRect = containerRef.current.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();

      return {
        x: elRect.left - containerRect.left,
        y: elRect.top - containerRect.top,
        w: Math.max(40, elRect.width),
        h: Math.max(26, elRect.height),
      };
    },
    [containerRef]
  );

  // Smooth scroll window so current element is comfortably centered in viewport
  const scrollToActiveElement = React.useCallback(
    (craftId: string) => {
      if (!containerRef.current) return;
      const el = containerRef.current.querySelector(`[data-craft-id="${craftId}"]`) as HTMLElement | null;
      if (!el) return;

      const elRect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const targetScrollY = window.scrollY + elRect.top - windowHeight * 0.45 + elRect.height / 2;

      window.scrollTo({
        top: Math.max(0, targetScrollY),
        behavior: 'smooth',
      });
    },
    [containerRef]
  );

  // Trigger floral confetti automatically when finished
  React.useEffect(() => {
    if (!isFinished) return;
    setShowFloralConfetti(true);
    const timer = setTimeout(() => {
      setShowFloralConfetti(false);
    }, 15000);
    return () => clearTimeout(timer);
  }, [isFinished]);

  // Main Animation Orchestrator
  React.useEffect(() => {
    if (!enabled || isFinished) return;

    if (stepIndex >= CRAFT_STEPS.length) {
      setIsFinished(true);
      setSubPhase('celebrating');
      setArifPos((prev) => ({
        ...prev,
        action: 'Alhamdulillah, seluruh elemen tervalidasi! ❤️',
        isClicking: false,
        isStill: true,
        isDragging: false,
      }));
      setWindiPos((prev) => ({
        ...prev,
        action: 'Sempurna & rapih, siap dibagikan! 🌸',
        isClicking: false,
        isStill: true,
        isDragging: false,
      }));
      return;
    }

    const current = CRAFT_STEPS[stepIndex];
    const isArif = current.actor === 'arif';

    let timer: ReturnType<typeof setTimeout>;
    let dragInterval: ReturnType<typeof setInterval>;
    let typeInterval: ReturnType<typeof setInterval>;

    const runStep = () => {
      const rect = measureElement(current.id);
      if (!rect) {
        timer = setTimeout(runStep, 90);
        return;
      }

      setActiveRect(rect);
      setDragProgress(0);
      setTypingProgress(0);
      setTypedText('');
      scrollToActiveElement(current.id);

      const updateActiveCursor = (
        patch: Partial<{
          x: number;
          y: number;
          isClicking: boolean;
          isStill: boolean;
          isDragging: boolean;
          action: string;
          visible: boolean;
        }>
      ) => {
        if (isArif) {
          setArifPos((prev) => ({ ...prev, ...patch, visible: true }));
        } else {
          setWindiPos((prev) => ({ ...prev, ...patch, visible: true }));
        }
      };

      // Phase 1: TRAVELING to exact top-left corner of target element (600ms)
      setSubPhase('traveling');
      updateActiveCursor({
        x: rect.x,
        y: rect.y,
        isClicking: false,
        isStill: false,
        isDragging: false,
        action: `Menuju Titik Kiri-Atas: ${current.title}`,
      });

      timer = setTimeout(() => {
        // Phase 2: DRAGGING diagonally from top-left (0%) to bottom-right (100%) in lockstep (920ms)
        setSubPhase('dragging');
        const dragDuration = 920;
        const tickMs = 38;
        const totalTicks = Math.max(1, Math.floor(dragDuration / tickMs));
        let tick = 0;

        updateActiveCursor({
          x: rect.x,
          y: rect.y,
          isClicking: true,
          isStill: false,
          isDragging: true,
          action: current.actionDragLabel,
        });

        dragInterval = setInterval(() => {
          tick += 1;
          const progress = Math.min(1, tick / totalTicks);
          setDragProgress(progress);
          updateActiveCursor({
            x: rect.x + rect.w * progress,
            y: rect.y + rect.h * progress,
            isClicking: true,
            isStill: false,
            isDragging: true,
            action: `${current.actionDragLabel} (${Math.round(rect.w * progress)}x${Math.round(rect.h * progress)}px)`,
          });
          if (progress >= 1) {
            clearInterval(dragInterval);
          }
        }, tickMs);

        timer = setTimeout(() => {
          clearInterval(dragInterval);
          setDragProgress(1);

          // Phase 3: SETTLING (Release click, pause to validate placed container box) (900ms)
          const settledRect = measureElement(current.id) || rect;
          setActiveRect(settledRect);
          setSubPhase('settling');

          updateActiveCursor({
            x: settledRect.x + settledRect.w,
            y: settledRect.y + settledRect.h,
            isClicking: false,
            isStill: true,
            isDragging: false,
            action: `✓ ${current.actionSettleLabel}`,
          });

          timer = setTimeout(() => {
            // Phase 4: CLICKING inside the element to start editing (580ms)
            setSubPhase('clicking');
            const clickX = settledRect.x + Math.min(48, settledRect.w * 0.3);
            const clickY = settledRect.y + settledRect.h * 0.5;

            updateActiveCursor({
              x: clickX,
              y: clickY,
              isClicking: true,
              isStill: false,
              isDragging: false,
              action: current.actionClickLabel,
            });

            timer = setTimeout(() => {
              // Phase 5: TYPING STILLNESS (Cursor parks still while text/content fills smoothly)
              setSubPhase('typing');
              if (current.isSpecialFont) {
                setIsSpecialFont(true);
              }

              const typingTarget = current.targetText || current.title;
              const typeDuration = current.typeDurationMs || 1200;
              const typeTickMs = 45;
              const totalTypeTicks = Math.max(1, Math.floor(typeDuration / typeTickMs));
              let currentTypeTick = 0;

              updateActiveCursor({
                x: settledRect.x + settledRect.w - 6,
                y: settledRect.y + settledRect.h * 0.5,
                isClicking: false,
                isStill: true,
                isDragging: false,
                action: current.actionTypeLabel,
              });

              typeInterval = setInterval(() => {
                currentTypeTick += 1;
                const progress = Math.min(1, currentTypeTick / totalTypeTicks);
                const charCount = Math.max(1, Math.ceil(typingTarget.length * progress));
                setTypingProgress(progress);
                setTypedText(typingTarget.slice(0, charCount));
                if (progress >= 1) {
                  clearInterval(typeInterval);
                }
              }, typeTickMs);

              timer = setTimeout(() => {
                clearInterval(typeInterval);
                setTypingProgress(1);
                setTypedText(typingTarget);

                // Re-measure element now that full content is rendered inside it
                const finalRect = measureElement(current.id) || settledRect;
                setActiveRect(finalRect);

                // Phase 6: INSPECT & VALIDATION PAUSE (1050ms - Clear visual validation badge)
                setSubPhase('inspecting');
                updateActiveCursor({
                  x: finalRect.x + finalRect.w - 4,
                  y: finalRect.y + finalRect.h * 0.5,
                  isClicking: false,
                  isStill: true,
                  isDragging: false,
                  action: `✓ ${current.actionInspectLabel}`,
                });

                timer = setTimeout(() => {
                  // Phase 7: DESELECT (Click outside element to lock it cleanly) (460ms)
                  setSubPhase('deselecting');
                  setCompletedSteps((prev) =>
                    prev.includes(current.id) ? prev : [...prev, current.id]
                  );

                  updateActiveCursor({
                    x: isArif
                      ? Math.min(390, finalRect.x + finalRect.w + 18)
                      : Math.max(16, finalRect.x - 18),
                    y: finalRect.y + finalRect.h + 12,
                    isClicking: true,
                    isStill: false,
                    isDragging: false,
                    action: 'Klik Luar: Kunci Elemen',
                  });

                  timer = setTimeout(() => {
                    setTypedText('');
                    setTypingProgress(0);
                    setDragProgress(0);
                    setStepIndex((prev) => prev + 1);
                  }, 440);
                }, 1050);
              }, typeDuration);
            }, 580);
          }, 900);
        }, dragDuration);
      }, 600);
    };

    runStep();

    return () => {
      clearTimeout(timer);
      clearInterval(dragInterval);
      clearInterval(typeInterval);
    };
  }, [enabled, stepIndex, isFinished, measureElement, scrollToActiveElement]);

  // Recalculate active rect on window resize
  React.useEffect(() => {
    const handleResize = () => {
      if (activeStep) {
        const rect = measureElement(activeStep.id);
        if (rect) setActiveRect(rect);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeStep, measureElement]);

  const handleSkipAll = () => {
    setCompletedSteps(CRAFT_STEPS.map((s) => s.id));
    setIsFinished(true);
    setSubPhase('celebrating');
    setIsSpecialFont(true);
  };

  const handleReplayFloral = () => {
    setShowFloralConfetti(false);
    setTimeout(() => {
      setShowFloralConfetti(true);
    }, 60);
  };

  if (!enabled) return null;

  const isArifActive = activeStep?.actor === 'arif';
  const isInspecting = subPhase === 'inspecting';
  const isSettling = subPhase === 'settling';

  return (
    <>
      {/* Unique Floral & Botanical Confetti Finale */}
      <FloralConfettiShower active={showFloralConfetti} />

      {/* 1. Skip / Full View Floating Pill (Subtle, non-intrusive) */}
      {!isFinished && (
        <div className="fixed bottom-4 right-4 z-50 craft-fade-in">
          <button
            type="button"
            onClick={handleSkipAll}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-stone-900/90 hover:bg-stone-900 text-stone-100 hover:text-white text-[11px] font-medium backdrop-blur-md shadow-lg border border-stone-700 transition-all cursor-pointer select-none active:scale-95"
            title="Lewati proses desain dan tampilkan undangan penuh"
          >
            <span>Lewati Animasi ({stepIndex + 1}/{CRAFT_STEPS.length})</span>
            <FastForward className="w-3.5 h-3.5 text-teal-400" />
          </button>
        </div>
      )}

      {/* 2. Celebration Notification Banner + Floral Replay Button when all elements finish */}
      {isFinished && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40 bg-emerald-950/95 text-white px-3.5 py-2 rounded-2xl shadow-2xl border border-emerald-500/60 backdrop-blur-md flex items-center gap-2 text-[11px] craft-pop-in select-none">
          <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
          <span className="font-semibold whitespace-nowrap">
            20/20 Elemen Selesai Dirakit Arif &amp; Windi!
          </span>
          <button
            type="button"
            onClick={handleReplayFloral}
            className="ml-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-pink-500/25 hover:bg-pink-500/40 border border-pink-300/40 text-pink-100 text-[10px] font-semibold transition-all cursor-pointer active:scale-95"
            title="Taburkan kembali kelopak bunga perayaan"
          >
            <Flower2 className="w-3 h-3 text-pink-300" />
            <span>Tabur Bunga</span>
          </button>
        </div>
      )}

      {/* 3. Global Crafting Overlay inside Container (Zero offset, exact pixel anchors) */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        {/* Active Smart Snap Magenta Guide Line */}
        {activeStep?.isCenterSnap && subPhase === 'inspecting' && activeRect && (
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-pink-500 z-40 pointer-events-none opacity-90 craft-fade-in"
            style={{ left: `${activeRect.x + activeRect.w / 2}px` }}
          >
            <span className="absolute top-4 left-2 text-[8px] font-mono font-bold bg-pink-600 text-white px-1.5 py-0.5 rounded-xs shadow-xs">
              Center Snap X: {Math.round(activeRect.x + activeRect.w / 2)}px
            </span>
          </div>
        )}

        {/* Dynamic Drag Box (Expands smoothly from 0% to 100% in exact lockstep with cursor) */}
        {activeRect && subPhase === 'dragging' && (
          <div
            className={`absolute border-2 border-dashed pointer-events-none z-30 ${
              isArifActive ? 'border-teal-500 bg-teal-500/10' : 'border-amber-500 bg-amber-500/10'
            } rounded-xl`}
            style={{
              left: `${activeRect.x}px`,
              top: `${activeRect.y}px`,
              width: `${Math.max(12, activeRect.w * dragProgress)}px`,
              height: `${Math.max(12, activeRect.h * dragProgress)}px`,
            }}
          >
            <div
              className={`absolute -bottom-5 right-0 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs whitespace-nowrap ${
                isArifActive ? 'bg-teal-700' : 'bg-amber-600'
              }`}
            >
              {Math.round(activeRect.w * dragProgress)} x {Math.round(activeRect.h * dragProgress)}px
            </div>
          </div>
        )}

        {/* Selection Bounding Box with Corner Handles & Structured Validation Pill */}
        {activeRect &&
          ['settling', 'clicking', 'typing', 'inspecting'].includes(subPhase) && (
            <div
              className={`absolute border-2 pointer-events-none z-30 rounded-xl transition-all duration-200 ${
                isInspecting
                  ? 'border-emerald-500 bg-emerald-500/5 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]'
                  : isArifActive
                  ? 'border-teal-600'
                  : 'border-amber-500'
              }`}
              style={{
                left: `${activeRect.x - 4}px`,
                top: `${activeRect.y - 4}px`,
                width: `${activeRect.w + 8}px`,
                height: `${activeRect.h + 8}px`,
              }}
            >
              {/* Left Badge: Collaborator Identity */}
              <div
                className={`absolute -top-4 left-1 text-[8px] font-bold text-white px-1.5 py-0.5 rounded-xs font-mono shadow-xs flex items-center gap-1 whitespace-nowrap ${
                  isInspecting
                    ? 'bg-emerald-700'
                    : isArifActive
                    ? 'bg-teal-700'
                    : 'bg-amber-600'
                }`}
              >
                <span>{isArifActive ? 'Arif · Designer' : 'Windi · Designer'}</span>
                {subPhase === 'typing' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </div>

              {/* Right Badge: Clear Structured Validation Status (Settle vs Inspect) */}
              {isSettling && (
                <div className="absolute -top-4 right-1 bg-sky-700 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs flex items-center gap-1 whitespace-nowrap craft-pop-in">
                  <span>✓ Posisi &amp; Ukuran Valid ({Math.round(activeRect.w)}x{Math.round(activeRect.h)})</span>
                </div>
              )}

              {isInspecting && (
                <div className="absolute -top-4 right-1 bg-emerald-600 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs flex items-center gap-1 whitespace-nowrap craft-pop-in">
                  <span>✓ Konten Terverifikasi &amp; Rapih</span>
                </div>
              )}

              {/* 4 Corner Sizing Knobs */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-stone-800" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-stone-800" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-stone-800" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-stone-800" />
            </div>
          )}

        {/* Floating Font Dropdown Preview during Windi's Hero Names inspection */}
        {activeStep?.isSpecialFont && subPhase === 'inspecting' && activeRect && (
          <div
            className="absolute bg-stone-900 text-white rounded-xl p-2 shadow-2xl border border-stone-700 z-40 text-left font-mono text-[9px] craft-pop-in pointer-events-none"
            style={{
              left: `${Math.max(12, activeRect.x + activeRect.w - 185)}px`,
              top: `${Math.max(8, activeRect.y - 52)}px`,
            }}
          >
            <div className="text-stone-400 text-[8px] uppercase tracking-wider mb-1">
              Typography Inspector
            </div>
            <div className="bg-amber-600/30 text-amber-300 font-serif px-2 py-0.5 rounded-sm font-semibold flex items-center justify-between gap-2">
              <span>✓ Cormorant Garamond</span>
              <span className="text-[7px]">Italic</span>
            </div>
            <div className="text-stone-400 px-2 py-0.5 opacity-60">Plus Jakarta Sans</div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* COLLABORATOR CURSORS (EXACT PIXEL ANCHOR, LOCKSTEP DRAG, ZERO SKEW)       */}
        {/* ========================================================================= */}

        {/* Cursor 1: Arif (Teal) */}
        {arifPos.visible && (
          <div
            className={`absolute z-40 pointer-events-none flex flex-col items-start ${
              arifPos.isStill || arifPos.isDragging
                ? 'transition-none'
                : 'transition-all duration-500 ease-out'
            }`}
            style={{
              left: `${Math.min(320, Math.max(8, arifPos.x))}px`,
              top: `${Math.max(8, arifPos.y)}px`,
            }}
          >
            {/* Click Ripple Pulse */}
            {arifPos.isClicking && (
              <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full border-2 border-teal-400 bg-teal-400/20 animate-ping pointer-events-none" />
            )}

            <svg
              className="w-5 h-5 drop-shadow-md"
              viewBox="0 0 24 24"
              fill="#0F766E"
              stroke="white"
              strokeWidth="1.5"
            >
              <path d="M5.5 3.5l14 7-6.5 2-2 6.5-5.5-15.5z" />
            </svg>

            <div className="text-[9px] font-bold text-white px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap ml-3 -mt-1 bg-teal-700 flex items-center gap-1">
              <span>Arif (Mempelai Pria)</span>
              {arifPos.isStill && (
                <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />
              )}
            </div>

            <div className="bg-[#1A1A1A]/95 text-stone-100 text-[8.5px] px-2 py-0.5 rounded-md shadow-md mt-0.5 ml-3 font-mono border border-stone-700 whitespace-nowrap">
              <span>{arifPos.action}</span>
            </div>
          </div>
        )}

        {/* Cursor 2: Windi (Amber) */}
        {windiPos.visible && (
          <div
            className={`absolute z-40 pointer-events-none flex flex-col items-start ${
              windiPos.isStill || windiPos.isDragging
                ? 'transition-none'
                : 'transition-all duration-500 ease-out'
            }`}
            style={{
              left: `${Math.min(320, Math.max(8, windiPos.x))}px`,
              top: `${Math.max(8, windiPos.y)}px`,
            }}
          >
            {/* Click Ripple Pulse */}
            {windiPos.isClicking && (
              <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full border-2 border-amber-400 bg-amber-400/20 animate-ping pointer-events-none" />
            )}

            <svg
              className="w-5 h-5 drop-shadow-md"
              viewBox="0 0 24 24"
              fill="#D97706"
              stroke="white"
              strokeWidth="1.5"
            >
              <path d="M5.5 3.5l14 7-6.5 2-2 6.5-5.5-15.5z" />
            </svg>

            <div className="text-[9px] font-bold text-white px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap ml-3 -mt-1 bg-amber-600 flex items-center gap-1">
              <span>Windi (Mempelai Wanita)</span>
              {windiPos.isStill && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-200 animate-pulse" />
              )}
            </div>

            <div className="bg-[#1A1A1A]/95 text-stone-100 text-[8.5px] px-2 py-0.5 rounded-md shadow-md mt-0.5 ml-3 font-mono border border-stone-700 whitespace-nowrap">
              <span>{windiPos.action}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
