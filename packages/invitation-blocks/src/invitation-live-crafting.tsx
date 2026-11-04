'use client';

import * as React from 'react';
import { CheckCircle, FastForward, Flower2 } from 'lucide-react';

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
  isSpecialFont?: boolean;
  isCenterSnap?: boolean;
}

export interface CraftWaveDefinition {
  waveNumber: number;
  arif: CraftStepDefinition;
  windi: CraftStepDefinition;
  typeDurationMs: number;
}

export const CRAFT_WAVES: CraftWaveDefinition[] = [
  // GELOMBANG 1: Hero Header (Arif) & Nama Utama + Font (Windi) - Bekerja Bersamaan
  {
    waveNumber: 1,
    typeDurationMs: 1200,
    arif: {
      id: 'hero-header',
      actor: 'arif',
      title: "Header Walimatul 'Urs",
      actionDragLabel: 'Tarik Kotak Header',
      actionSettleLabel: 'Validasi Posisi Header',
      actionClickLabel: 'Klik Edit Teks Header [T]',
      actionTypeLabel: 'Mengetik "WALIMATUL \'URS"...',
      actionInspectLabel: 'Validasi Letter-Spacing Header',
      targetText: "WALIMATUL 'URS",
    },
    windi: {
      id: 'hero-names',
      actor: 'windi',
      title: 'Nama Mempelai & Tipografi',
      actionDragLabel: 'Tarik Frame Nama Utama',
      actionSettleLabel: 'Validasi Ukuran Frame Nama',
      actionClickLabel: 'Klik Masuk Mode Tipografi',
      actionTypeLabel: 'Mengetik "Arif & Windi"...',
      actionInspectLabel: 'Validasi Font: Cormorant Garamond',
      targetText: 'Arif & Windi',
      isSpecialFont: true,
    },
  },

  // GELOMBANG 2: Tanggal Hero (Arif) & Ikon Hati Ayat Suci (Windi) - Bekerja Bersamaan
  {
    waveNumber: 2,
    typeDurationMs: 1150,
    arif: {
      id: 'hero-date',
      actor: 'arif',
      title: 'Tanggal Utama Undangan',
      actionDragLabel: 'Tarik Kotak Tanggal Acara',
      actionSettleLabel: 'Validasi Posisi Tanggal',
      actionClickLabel: 'Klik Edit Tanggal',
      actionTypeLabel: 'Mengetik "Minggu, 14 November 2027"...',
      actionInspectLabel: 'Validasi Format Tanggal',
      targetText: 'Minggu, 14 November 2027',
    },
    windi: {
      id: 'verse-icon',
      actor: 'windi',
      title: 'Ornamen Ikon Hati Ayat Suci',
      actionDragLabel: 'Tarik Lingkaran Ikon 36x36px',
      actionSettleLabel: 'Validasi Titik Tengah Ikon',
      actionClickLabel: 'Klik Sematkan Ikon Heart SVG',
      actionTypeLabel: 'Merender Ikon Hati Sage Green...',
      actionInspectLabel: 'Validasi Proporsi & Warna Ikon',
      targetText: '♥',
    },
  },

  // GELOMBANG 3: Label Surah Ar-Rum (Arif) & Teks Lengkap Ayat Suci (Windi) - Bekerja Bersamaan
  {
    waveNumber: 3,
    typeDurationMs: 1750,
    arif: {
      id: 'verse-ref',
      actor: 'arif',
      title: 'Label Surah QS. Ar-Rum: 21',
      actionDragLabel: 'Tarik Label Referensi Surah',
      actionSettleLabel: 'Validasi Posisi Label Surah',
      actionClickLabel: 'Klik Ketik Nama Surah',
      actionTypeLabel: 'Mengetik "QS. AR-RUM: 21"...',
      actionInspectLabel: 'Validasi Tipografi Surah',
      targetText: 'QS. AR-RUM: 21',
    },
    windi: {
      id: 'verse-text',
      actor: 'windi',
      title: 'Terjemahan Ayat Suci Ar-Rum: 21',
      actionDragLabel: 'Tarik Frame Paragraf Ayat',
      actionSettleLabel: 'Validasi Margin Paragraf',
      actionClickLabel: 'Klik Ketik Terjemahan Ayat',
      actionTypeLabel: 'Mengetik Terjemahan Lengkap Ar-Rum: 21...',
      actionInspectLabel: 'Validasi Kerapihan Baris Ayat',
      targetText:
        'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
    },
  },

  // GELOMBANG 4: Judul Kedua Mempelai (Arif) & Kalimat Mukadimah (Windi) - Bekerja Bersamaan
  {
    waveNumber: 4,
    typeDurationMs: 1350,
    arif: {
      id: 'couple-title',
      actor: 'arif',
      title: 'Judul Seksi Kedua Mempelai',
      actionDragLabel: 'Tarik Kotak Judul Mempelai',
      actionSettleLabel: 'Validasi Posisi Judul',
      actionClickLabel: 'Klik Ketik Judul Mempelai',
      actionTypeLabel: 'Mengetik "Kedua Mempelai"...',
      actionInspectLabel: 'Validasi Heading Serif',
      targetText: 'Kedua Mempelai',
    },
    windi: {
      id: 'couple-intro',
      actor: 'windi',
      title: 'Kalimat Pengantar Mukadimah',
      actionDragLabel: 'Tarik Kotak Teks Mukadimah',
      actionSettleLabel: 'Validasi Lebar Teks Mukadimah',
      actionClickLabel: 'Klik Ketik Kalimat Mukadimah',
      actionTypeLabel: 'Mengetik Kalimat Rahmat & Ridho Allah SWT...',
      actionInspectLabel: 'Validasi Teks Pengantar Pernikahan',
      targetText:
        'Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud melangsungkan pernikahan:',
    },
  },

  // GELOMBANG 5: Foto Avatar Pengantin Pria (Arif) & Foto Avatar Pengantin Wanita (Windi) - Bekerja Bersamaan
  {
    waveNumber: 5,
    typeDurationMs: 950,
    arif: {
      id: 'groom-avatar',
      actor: 'arif',
      title: 'Foto Profil Pengantin Pria',
      actionDragLabel: 'Tarik Frame Lingkaran Pria 80x80px',
      actionSettleLabel: 'Validasi Lingkaran Avatar Pria',
      actionClickLabel: 'Klik Pasang Foto Pengantin Pria',
      actionTypeLabel: 'Memasang Ilustrasi Ahmad Arif...',
      actionInspectLabel: 'Validasi Border & Foto Pria',
      targetText: 'avatar-groom.svg',
    },
    windi: {
      id: 'bride-avatar',
      actor: 'windi',
      title: 'Foto Profil Pengantin Wanita',
      actionDragLabel: 'Tarik Frame Lingkaran Wanita 80x80px',
      actionSettleLabel: 'Validasi Lingkaran Avatar Wanita',
      actionClickLabel: 'Klik Pasang Foto Pengantin Wanita',
      actionTypeLabel: 'Memasang Ilustrasi Windi Widia...',
      actionInspectLabel: 'Validasi Border & Foto Wanita',
      targetText: 'avatar-bride.svg',
    },
  },

  // GELOMBANG 6: Nama Lengkap Pria (Arif) & Nama Lengkap Wanita (Windi) - Bekerja Bersamaan
  {
    waveNumber: 6,
    typeDurationMs: 1150,
    arif: {
      id: 'groom-name',
      actor: 'arif',
      title: 'Nama Lengkap Pengantin Pria',
      actionDragLabel: 'Tarik Kotak Nama Pria',
      actionSettleLabel: 'Validasi Posisi Nama Pria',
      actionClickLabel: 'Klik Ketik Nama & Gelar Pria',
      actionTypeLabel: 'Mengetik "Ahmad Arif, S.Kom"...',
      actionInspectLabel: 'Validasi Ejaan Nama & Gelar Pria',
      targetText: 'Ahmad Arif, S.Kom',
    },
    windi: {
      id: 'bride-name',
      actor: 'windi',
      title: 'Nama Lengkap Pengantin Wanita',
      actionDragLabel: 'Tarik Kotak Nama Wanita',
      actionSettleLabel: 'Validasi Posisi Nama Wanita',
      actionClickLabel: 'Klik Ketik Nama & Gelar Wanita',
      actionTypeLabel: 'Mengetik "Windi Widia, S.Pd"...',
      actionInspectLabel: 'Validasi Ejaan Nama & Gelar Wanita',
      targetText: 'Windi Widia, S.Pd',
    },
  },

  // GELOMBANG 7: Nama Orang Tua Pria (Arif) & Nama Orang Tua Wanita (Windi) - Bekerja Bersamaan
  {
    waveNumber: 7,
    typeDurationMs: 1400,
    arif: {
      id: 'groom-parents',
      actor: 'arif',
      title: 'Silsilah Orang Tua Pria',
      actionDragLabel: 'Tarik Kotak Orang Tua Pria',
      actionSettleLabel: 'Validasi Posisi Teks Orang Tua Pria',
      actionClickLabel: 'Klik Ketik Nama Bapak & Ibu Pria',
      actionTypeLabel: 'Mengetik "Putra dari Bpk. H. Mahmud & Ibu Hj. Aminah"...',
      actionInspectLabel: 'Validasi Nama Bpk. H. Mahmud & Ibu Hj. Aminah',
      targetText: 'Putra dari Bpk. H. Mahmud & Ibu Hj. Aminah',
    },
    windi: {
      id: 'bride-parents',
      actor: 'windi',
      title: 'Silsilah Orang Tua Wanita',
      actionDragLabel: 'Tarik Kotak Orang Tua Wanita',
      actionSettleLabel: 'Validasi Posisi Teks Orang Tua Wanita',
      actionClickLabel: 'Klik Ketik Nama Bapak & Ibu Wanita',
      actionTypeLabel: 'Mengetik "Putri dari Bpk. Drs. H. Subagyo & Ibu Hj. Endang"...',
      actionInspectLabel: 'Validasi Nama Bpk. Drs. H. Subagyo & Ibu Hj. Endang',
      targetText: 'Putri dari Bpk. Drs. H. Subagyo & Ibu Hj. Endang',
    },
  },

  // GELOMBANG 8: Header Rangkaian Acara (Arif) & Kartu Akad Nikah (Windi) - Bekerja Bersamaan
  {
    waveNumber: 8,
    typeDurationMs: 1450,
    arif: {
      id: 'agenda-header',
      actor: 'arif',
      title: 'Judul Rangkaian Acara',
      actionDragLabel: 'Tarik Kotak Header Acara',
      actionSettleLabel: 'Validasi Posisi Header Acara',
      actionClickLabel: 'Klik Ketik Judul & Pengantar Acara',
      actionTypeLabel: 'Mengetik "Rangkaian Acara"...',
      actionInspectLabel: 'Validasi Tipografi Header Acara',
      targetText: 'Rangkaian Acara | Insya Allah acara diselenggarakan pada:',
    },
    windi: {
      id: 'agenda-akad',
      actor: 'windi',
      title: 'Kartu Jadwal Akad Nikah',
      actionDragLabel: 'Tarik Card Akad Nikah',
      actionSettleLabel: 'Validasi Ukuran Card Akad',
      actionClickLabel: 'Klik Isi Waktu & Lokasi Akad',
      actionTypeLabel: 'Mengetik Detail Akad 08:00 WIB & Lokasi...',
      actionInspectLabel: 'Validasi Jadwal Pendopo Dalem Ngabean',
      targetText:
        'Akad Nikah | Khusus Keluarga | Minggu, 14 November 2027 | 08:00 - 10:00 WIB | Pendopo Dalem Ngabean, Kraton Yogyakarta',
    },
  },

  // GELOMBANG 9: Kartu Resepsi Pernikahan (Arif) & Tombol Google Maps (Windi) - Bekerja Bersamaan
  {
    waveNumber: 9,
    typeDurationMs: 1450,
    arif: {
      id: 'agenda-resepsi',
      actor: 'arif',
      title: 'Kartu Jadwal Resepsi',
      actionDragLabel: 'Tarik Card Resepsi Pernikahan',
      actionSettleLabel: 'Validasi Ukuran Card Resepsi',
      actionClickLabel: 'Klik Isi Waktu & Gedung Resepsi',
      actionTypeLabel: 'Mengetik Detail Resepsi 11:00 WIB & Gedung...',
      actionInspectLabel: 'Validasi Jadwal Graha Sakinah',
      targetText:
        'Resepsi Pernikahan | Umum & Kerabat | Minggu, 14 November 2027 | 11:00 - 14:00 WIB | Graha Sakinah Convention Hall',
    },
    windi: {
      id: 'maps-button',
      actor: 'windi',
      title: 'Tombol Navigasi Google Maps',
      actionDragLabel: 'Tarik Komponen Tombol Maps',
      actionSettleLabel: 'Validasi Tinggi Tap Target 44px',
      actionClickLabel: 'Klik Ketik Label & Tautan Maps',
      actionTypeLabel: 'Mengetik "Petunjuk Arah Google Maps"...',
      actionInspectLabel: 'Validasi Tautan & Ikon Pin Maps',
      targetText: 'Petunjuk Arah Google Maps',
    },
  },

  // GELOMBANG 10: Header Amplop Digital (Arif) & Kartu Rekening BCA/Mandiri (Windi) - Bekerja Bersamaan
  {
    waveNumber: 10,
    typeDurationMs: 1500,
    arif: {
      id: 'envelope-header',
      actor: 'arif',
      title: 'Header Amplop Digital & Kado',
      actionDragLabel: 'Tarik Blok Judul Amplop',
      actionSettleLabel: 'Validasi Posisi Header Amplop',
      actionClickLabel: 'Klik Ketik Judul & Pesan Kasih',
      actionTypeLabel: 'Mengetik "Amplop Digital & Kado"...',
      actionInspectLabel: 'Validasi Teks Pengantar Amplop',
      targetText:
        'Amplop Digital & Kado | Doa restu Anda merupakan karunia terindah bagi kami.',
    },
    windi: {
      id: 'bank-card',
      actor: 'windi',
      title: 'Kartu Rekening BCA & Mandiri',
      actionDragLabel: 'Tarik Frame Rekening Bank',
      actionSettleLabel: 'Validasi Ukuran Kartu Rekening',
      actionClickLabel: 'Klik Ketik Nomor Rekening & Atas Nama',
      actionTypeLabel: 'Mengetik Rek BCA (Ahmad Arif) & Mandiri (Windi Widia)...',
      actionInspectLabel: 'Validasi Nomor Rekening & Tombol Salin',
      targetText: 'BCA 1234567890 a.n Ahmad Arif | Mandiri 9876543210 a.n Windi Widia',
    },
  },

  // GELOMBANG 11: Header Konfirmasi RSVP (Arif) & Kartu Barcode QRIS (Windi) - Bekerja Bersamaan
  {
    waveNumber: 11,
    typeDurationMs: 1250,
    arif: {
      id: 'rsvp-header',
      actor: 'arif',
      title: 'Header Konfirmasi Kehadiran',
      actionDragLabel: 'Tarik Blok Header RSVP',
      actionSettleLabel: 'Validasi Posisi Header RSVP',
      actionClickLabel: 'Klik Ketik Judul & Sub-teks RSVP',
      actionTypeLabel: 'Mengetik "Konfirmasi Kehadiran"...',
      actionInspectLabel: 'Validasi Bagian Konfirmasi Tamu',
      targetText:
        'Konfirmasi Kehadiran | Mohon konfirmasikan kehadiran Bapak/Ibu/Saudara/i untuk kenyamanan persiapan jamuan.',
    },
    windi: {
      id: 'qris-card',
      actor: 'windi',
      title: 'Barcode QRIS Merchant (Auto-Snap)',
      actionDragLabel: 'Tarik Frame Barcode QRIS',
      actionSettleLabel: 'Validasi Ukuran Kotak QRIS',
      actionClickLabel: 'Klik Sematkan Kode QRIS & NMID',
      actionTypeLabel: 'Menyematkan QRIS a.n Arif & Windi Wedding...',
      actionInspectLabel: 'Validasi Auto-Snap Sumbu X & QRIS',
      targetText: 'Arif & Windi Wedding',
      isCenterSnap: true,
    },
  },
];

export const CRAFT_STEPS: CraftStepDefinition[] = CRAFT_WAVES.flatMap((w) => [w.arif, w.windi]);

export interface CraftingState {
  currentStepIndex: number;
  subPhase: CraftSubPhase;
  activeStepId: string | null;
  activeStepIds: string[];
  completedStepIds: string[];
  typedText: string;
  typedTexts: Record<string, string>;
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

interface BoxRect {
  x: number;
  y: number;
  w: number;
  h: number;
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
  const [waveIndex, setWaveIndex] = React.useState<number>(0);
  const [subPhase, setSubPhase] = React.useState<CraftSubPhase>('idle');
  const [completedSteps, setCompletedSteps] = React.useState<string[]>([]);
  const [typedTexts, setTypedTexts] = React.useState<Record<string, string>>({});
  const [typingProgress, setTypingProgress] = React.useState<number>(0);
  const [dragProgress, setDragProgress] = React.useState<number>(0);
  const [isSpecialFont, setIsSpecialFont] = React.useState<boolean>(false);
  const [isFinished, setIsFinished] = React.useState<boolean>(false);
  const [showFloralConfetti, setShowFloralConfetti] = React.useState<boolean>(false);

  // Simultaneous bounding boxes for Arif & Windi's active elements
  const [arifRect, setArifRect] = React.useState<BoxRect | null>(null);
  const [windiRect, setWindiRect] = React.useState<BoxRect | null>(null);

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
    x: 36,
    y: 20,
    isClicking: false,
    isStill: false,
    isDragging: false,
    action: 'Siap Merakit Bersama',
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
    action: 'Siap Merakit Bersama',
    visible: true,
  });

  const activeWave = CRAFT_WAVES[waveIndex] || null;
  const activeStepIds = React.useMemo(
    () => (activeWave ? [activeWave.arif.id, activeWave.windi.id] : []),
    [activeWave]
  );

  // Sync state to parent
  React.useEffect(() => {
    onStateChange?.({
      currentStepIndex: waveIndex,
      subPhase,
      activeStepId: activeWave ? activeWave.arif.id : null,
      activeStepIds,
      completedStepIds: completedSteps,
      typedText: activeWave ? typedTexts[activeWave.arif.id] || '' : '',
      typedTexts,
      typingProgress,
      dragProgress,
      isSpecialFontActive: isSpecialFont,
      isFinished,
    });
  }, [
    waveIndex,
    subPhase,
    activeWave,
    activeStepIds,
    completedSteps,
    typedTexts,
    typingProgress,
    dragProgress,
    isSpecialFont,
    isFinished,
    onStateChange,
  ]);

  // Measure element in DOM relative to container
  const measureElement = React.useCallback(
    (craftId: string): BoxRect | null => {
      if (!containerRef.current) return null;
      const el = containerRef.current.querySelector(
        `[data-craft-id="${craftId}"]`
      ) as HTMLElement | null;
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

  // Smooth scroll window so the midpoint of both active elements is centered in viewport
  const scrollToWavePair = React.useCallback(
    (idA: string, idB: string) => {
      if (!containerRef.current) return;
      const elA = containerRef.current.querySelector(`[data-craft-id="${idA}"]`) as HTMLElement | null;
      const elB = containerRef.current.querySelector(`[data-craft-id="${idB}"]`) as HTMLElement | null;
      const targetEl = elA || elB;
      if (!targetEl) return;

      const rectA = elA?.getBoundingClientRect();
      const rectB = elB?.getBoundingClientRect();
      const topY =
        rectA && rectB
          ? Math.min(rectA.top, rectB.top)
          : (rectA || rectB)!.top;
      const bottomY =
        rectA && rectB
          ? Math.max(rectA.bottom, rectB.bottom)
          : (rectA || rectB)!.bottom;

      const midY = (topY + bottomY) / 2;
      const windowHeight = window.innerHeight;
      const targetScrollY = window.scrollY + midY - windowHeight * 0.46;

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

  // Main Simultaneous Dual-Cursor Orchestrator
  React.useEffect(() => {
    if (!enabled || isFinished) return;

    if (waveIndex >= CRAFT_WAVES.length) {
      setIsFinished(true);
      setSubPhase('celebrating');
      setArifPos((prev) => ({
        ...prev,
        action: 'Alhamdulillah, semua elemen selesai kita rakit! ❤️',
        isClicking: false,
        isStill: true,
        isDragging: false,
      }));
      setWindiPos((prev) => ({
        ...prev,
        action: 'Kompak & rapih banget, siap dibagikan! 🌸',
        isClicking: false,
        isStill: true,
        isDragging: false,
      }));
      return;
    }

    const wave = CRAFT_WAVES[waveIndex];
    const arifStep = wave.arif;
    const windiStep = wave.windi;

    let timer: ReturnType<typeof setTimeout>;
    let dragInterval: ReturnType<typeof setInterval>;
    let typeInterval: ReturnType<typeof setInterval>;

    const runWave = () => {
      const rArif = measureElement(arifStep.id);
      const rWindi = measureElement(windiStep.id);
      if (!rArif || !rWindi) {
        timer = setTimeout(runWave, 90);
        return;
      }

      setArifRect(rArif);
      setWindiRect(rWindi);
      setDragProgress(0);
      setTypingProgress(0);
      setTypedTexts({});
      scrollToWavePair(arifStep.id, windiStep.id);

      // Phase 1: TRAVELING SIMULTANEOUSLY to top-left corners of BOTH elements (620ms)
      setSubPhase('traveling');
      setArifPos({
        x: rArif.x,
        y: rArif.y,
        isClicking: false,
        isStill: false,
        isDragging: false,
        action: `Menuju: ${arifStep.title}`,
        visible: true,
      });
      setWindiPos({
        x: rWindi.x,
        y: rWindi.y,
        isClicking: false,
        isStill: false,
        isDragging: false,
        action: `Menuju: ${windiStep.title}`,
        visible: true,
      });

      timer = setTimeout(() => {
        // Phase 2: DRAGGING SIMULTANEOUSLY from top-left (0%) to bottom-right (100%) in lockstep (920ms)
        setSubPhase('dragging');
        const dragDuration = 920;
        const tickMs = 38;
        const totalTicks = Math.max(1, Math.floor(dragDuration / tickMs));
        let tick = 0;

        setArifPos({
          x: rArif.x,
          y: rArif.y,
          isClicking: true,
          isStill: false,
          isDragging: true,
          action: arifStep.actionDragLabel,
          visible: true,
        });
        setWindiPos({
          x: rWindi.x,
          y: rWindi.y,
          isClicking: true,
          isStill: false,
          isDragging: true,
          action: windiStep.actionDragLabel,
          visible: true,
        });

        dragInterval = setInterval(() => {
          tick += 1;
          const progress = Math.min(1, tick / totalTicks);
          setDragProgress(progress);

          setArifPos({
            x: rArif.x + rArif.w * progress,
            y: rArif.y + rArif.h * progress,
            isClicking: true,
            isStill: false,
            isDragging: true,
            action: `${arifStep.actionDragLabel} (${Math.round(rArif.w * progress)}x${Math.round(
              rArif.h * progress
            )}px)`,
            visible: true,
          });

          setWindiPos({
            x: rWindi.x + rWindi.w * progress,
            y: rWindi.y + rWindi.h * progress,
            isClicking: true,
            isStill: false,
            isDragging: true,
            action: `${windiStep.actionDragLabel} (${Math.round(
              rWindi.w * progress
            )}x${Math.round(rWindi.h * progress)}px)`,
            visible: true,
          });

          if (progress >= 1) {
            clearInterval(dragInterval);
          }
        }, tickMs);

        timer = setTimeout(() => {
          clearInterval(dragInterval);
          setDragProgress(1);

          // Phase 3: SETTLING SIMULTANEOUSLY (Both pause to validate placed empty boxes) (880ms)
          const settledArif = measureElement(arifStep.id) || rArif;
          const settledWindi = measureElement(windiStep.id) || rWindi;
          setArifRect(settledArif);
          setWindiRect(settledWindi);
          setSubPhase('settling');

          setArifPos({
            x: settledArif.x + settledArif.w,
            y: settledArif.y + settledArif.h,
            isClicking: false,
            isStill: true,
            isDragging: false,
            action: `✓ ${arifStep.actionSettleLabel}`,
            visible: true,
          });
          setWindiPos({
            x: settledWindi.x + settledWindi.w,
            y: settledWindi.y + settledWindi.h,
            isClicking: false,
            isStill: true,
            isDragging: false,
            action: `✓ ${windiStep.actionSettleLabel}`,
            visible: true,
          });

          timer = setTimeout(() => {
            // Phase 4: CLICKING SIMULTANEOUSLY inside each element to start editing (560ms)
            setSubPhase('clicking');

            setArifPos({
              x: settledArif.x + Math.min(44, settledArif.w * 0.28),
              y: settledArif.y + settledArif.h * 0.5,
              isClicking: true,
              isStill: false,
              isDragging: false,
              action: arifStep.actionClickLabel,
              visible: true,
            });
            setWindiPos({
              x: settledWindi.x + Math.min(44, settledWindi.w * 0.28),
              y: settledWindi.y + settledWindi.h * 0.5,
              isClicking: true,
              isStill: false,
              isDragging: false,
              action: windiStep.actionClickLabel,
              visible: true,
            });

            timer = setTimeout(() => {
              // Phase 5: TYPING SIMULTANEOUSLY (Both cursors stay completely still while both texts type!)
              setSubPhase('typing');
              if (arifStep.isSpecialFont || windiStep.isSpecialFont) {
                setIsSpecialFont(true);
              }

              const arifTarget = arifStep.targetText || arifStep.title;
              const windiTarget = windiStep.targetText || windiStep.title;
              const typeDuration = wave.typeDurationMs || 1300;
              const typeTickMs = 45;
              const totalTypeTicks = Math.max(1, Math.floor(typeDuration / typeTickMs));
              let currentTypeTick = 0;

              setArifPos({
                x: settledArif.x + settledArif.w - 6,
                y: settledArif.y + settledArif.h * 0.5,
                isClicking: false,
                isStill: true,
                isDragging: false,
                action: arifStep.actionTypeLabel,
                visible: true,
              });
              setWindiPos({
                x: settledWindi.x + settledWindi.w - 6,
                y: settledWindi.y + settledWindi.h * 0.5,
                isClicking: false,
                isStill: true,
                isDragging: false,
                action: windiStep.actionTypeLabel,
                visible: true,
              });

              typeInterval = setInterval(() => {
                currentTypeTick += 1;
                const progress = Math.min(1, currentTypeTick / totalTypeTicks);
                const arifCount = Math.max(1, Math.ceil(arifTarget.length * progress));
                const windiCount = Math.max(1, Math.ceil(windiTarget.length * progress));

                setTypingProgress(progress);
                setTypedTexts({
                  [arifStep.id]: arifTarget.slice(0, arifCount),
                  [windiStep.id]: windiTarget.slice(0, windiCount),
                });

                if (progress >= 1) {
                  clearInterval(typeInterval);
                }
              }, typeTickMs);

              timer = setTimeout(() => {
                clearInterval(typeInterval);
                setTypingProgress(1);
                setTypedTexts({
                  [arifStep.id]: arifTarget,
                  [windiStep.id]: windiTarget,
                });

                const finalArif = measureElement(arifStep.id) || settledArif;
                const finalWindi = measureElement(windiStep.id) || settledWindi;
                setArifRect(finalArif);
                setWindiRect(finalWindi);

                // Phase 6: INSPECT & VALIDATION PAUSE SIMULTANEOUSLY (1050ms)
                setSubPhase('inspecting');
                setArifPos({
                  x: finalArif.x + finalArif.w - 4,
                  y: finalArif.y + finalArif.h * 0.5,
                  isClicking: false,
                  isStill: true,
                  isDragging: false,
                  action: `✓ ${arifStep.actionInspectLabel}`,
                  visible: true,
                });
                setWindiPos({
                  x: finalWindi.x + finalWindi.w - 4,
                  y: finalWindi.y + finalWindi.h * 0.5,
                  isClicking: false,
                  isStill: true,
                  isDragging: false,
                  action: `✓ ${windiStep.actionInspectLabel}`,
                  visible: true,
                });

                timer = setTimeout(() => {
                  // Phase 7: DESELECT SIMULTANEOUSLY (Both click outside to lock both elements) (460ms)
                  setSubPhase('deselecting');
                  setCompletedSteps((prev) => {
                    const next = [...prev];
                    if (!next.includes(arifStep.id)) next.push(arifStep.id);
                    if (!next.includes(windiStep.id)) next.push(windiStep.id);
                    return next;
                  });

                  setArifPos({
                    x: Math.min(340, finalArif.x + finalArif.w + 16),
                    y: finalArif.y + finalArif.h + 10,
                    isClicking: true,
                    isStill: false,
                    isDragging: false,
                    action: 'Klik Luar: Kunci Elemen',
                    visible: true,
                  });
                  setWindiPos({
                    x: Math.max(16, finalWindi.x - 16),
                    y: finalWindi.y + finalWindi.h + 10,
                    isClicking: true,
                    isStill: false,
                    isDragging: false,
                    action: 'Klik Luar: Kunci Elemen',
                    visible: true,
                  });

                  timer = setTimeout(() => {
                    setTypedTexts({});
                    setTypingProgress(0);
                    setDragProgress(0);
                    setWaveIndex((prev) => prev + 1);
                  }, 440);
                }, 1050);
              }, typeDuration);
            }, 560);
          }, 880);
        }, dragDuration);
      }, 620);
    };

    runWave();

    return () => {
      clearTimeout(timer);
      clearInterval(dragInterval);
      clearInterval(typeInterval);
    };
  }, [enabled, waveIndex, isFinished, measureElement, scrollToWavePair]);

  // Recalculate active rects on window resize
  React.useEffect(() => {
    const handleResize = () => {
      if (activeWave) {
        const rA = measureElement(activeWave.arif.id);
        const rW = measureElement(activeWave.windi.id);
        if (rA) setArifRect(rA);
        if (rW) setWindiRect(rW);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeWave, measureElement]);

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
            <span>
              Lewati Animasi (Tahap Paralel {waveIndex + 1}/{CRAFT_WAVES.length})
            </span>
            <FastForward className="w-3.5 h-3.5 text-teal-400" />
          </button>
        </div>
      )}

      {/* 2. Celebration Notification Banner + Floral Replay Button when all elements finish */}
      {isFinished && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-40 bg-emerald-950/95 text-white px-3.5 py-2 rounded-2xl shadow-2xl border border-emerald-500/60 backdrop-blur-md flex items-center gap-2 text-[11px] craft-pop-in select-none">
          <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
          <span className="font-semibold whitespace-nowrap">
            22/22 Elemen Selesai Dirakit Serempak oleh Arif &amp; Windi!
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

      {/* 3. Global Crafting Overlay inside Container (Simultaneous Dual-Cursor & Dual-Box) */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        {/* Active Smart Snap Magenta Guide Line (When Windi snaps QRIS card) */}
        {activeWave?.windi.isCenterSnap && subPhase === 'inspecting' && windiRect && (
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-pink-500 z-40 pointer-events-none opacity-90 craft-fade-in"
            style={{ left: `${windiRect.x + windiRect.w / 2}px` }}
          >
            <span className="absolute top-4 left-2 text-[8px] font-mono font-bold bg-pink-600 text-white px-1.5 py-0.5 rounded-xs shadow-xs">
              Center Snap X: {Math.round(windiRect.x + windiRect.w / 2)}px
            </span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SIMULTANEOUS DYNAMIC DRAG BOXES (ARIF TEAL + WINDI AMBER AT THE SAME TIME) */}
        {/* ========================================================================= */}
        {subPhase === 'dragging' && arifRect && (
          <div
            className="absolute border-2 border-dashed border-teal-500 bg-teal-500/10 pointer-events-none z-30 rounded-xl"
            style={{
              left: `${arifRect.x}px`,
              top: `${arifRect.y}px`,
              width: `${Math.max(12, arifRect.w * dragProgress)}px`,
              height: `${Math.max(12, arifRect.h * dragProgress)}px`,
            }}
          >
            <div className="absolute -bottom-5 right-0 bg-teal-700 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs whitespace-nowrap">
              Arif: {Math.round(arifRect.w * dragProgress)} x {Math.round(arifRect.h * dragProgress)}px
            </div>
          </div>
        )}

        {subPhase === 'dragging' && windiRect && (
          <div
            className="absolute border-2 border-dashed border-amber-500 bg-amber-500/10 pointer-events-none z-30 rounded-xl"
            style={{
              left: `${windiRect.x}px`,
              top: `${windiRect.y}px`,
              width: `${Math.max(12, windiRect.w * dragProgress)}px`,
              height: `${Math.max(12, windiRect.h * dragProgress)}px`,
            }}
          >
            <div className="absolute -bottom-5 right-0 bg-amber-600 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs whitespace-nowrap">
              Windi: {Math.round(windiRect.w * dragProgress)} x {Math.round(windiRect.h * dragProgress)}px
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SIMULTANEOUS SELECTION BOUNDING BOXES (ARIF + WINDI)                      */}
        {/* ========================================================================= */}
        {['settling', 'clicking', 'typing', 'inspecting'].includes(subPhase) && arifRect && (
          <div
            className={`absolute border-2 pointer-events-none z-30 rounded-xl transition-all duration-200 ${
              isInspecting
                ? 'border-emerald-500 bg-emerald-500/5 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]'
                : 'border-teal-600'
            }`}
            style={{
              left: `${arifRect.x - 4}px`,
              top: `${arifRect.y - 4}px`,
              width: `${arifRect.w + 8}px`,
              height: `${arifRect.h + 8}px`,
            }}
          >
            <div
              className={`absolute -top-4 left-1 text-[8px] font-bold text-white px-1.5 py-0.5 rounded-xs font-mono shadow-xs flex items-center gap-1 whitespace-nowrap ${
                isInspecting ? 'bg-emerald-700' : 'bg-teal-700'
              }`}
            >
              <span>Arif · Designer</span>
              {subPhase === 'typing' && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </div>

            {isSettling && (
              <div className="absolute -top-4 right-1 bg-sky-700 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs flex items-center gap-1 whitespace-nowrap craft-pop-in">
                <span>
                  ✓ Posisi Valid ({Math.round(arifRect.w)}x{Math.round(arifRect.h)})
                </span>
              </div>
            )}

            {isInspecting && (
              <div className="absolute -top-4 right-1 bg-emerald-600 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs flex items-center gap-1 whitespace-nowrap craft-pop-in">
                <span>✓ Konten Terverifikasi</span>
              </div>
            )}

            <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-stone-800" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-stone-800" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-stone-800" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-stone-800" />
          </div>
        )}

        {['settling', 'clicking', 'typing', 'inspecting'].includes(subPhase) && windiRect && (
          <div
            className={`absolute border-2 pointer-events-none z-30 rounded-xl transition-all duration-200 ${
              isInspecting
                ? 'border-emerald-500 bg-emerald-500/5 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]'
                : 'border-amber-500'
            }`}
            style={{
              left: `${windiRect.x - 4}px`,
              top: `${windiRect.y - 4}px`,
              width: `${windiRect.w + 8}px`,
              height: `${windiRect.h + 8}px`,
            }}
          >
            <div
              className={`absolute -top-4 left-1 text-[8px] font-bold text-white px-1.5 py-0.5 rounded-xs font-mono shadow-xs flex items-center gap-1 whitespace-nowrap ${
                isInspecting ? 'bg-emerald-700' : 'bg-amber-600'
              }`}
            >
              <span>Windi · Designer</span>
              {subPhase === 'typing' && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </div>

            {isSettling && (
              <div className="absolute -top-4 right-1 bg-sky-700 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs flex items-center gap-1 whitespace-nowrap craft-pop-in">
                <span>
                  ✓ Posisi Valid ({Math.round(windiRect.w)}x{Math.round(windiRect.h)})
                </span>
              </div>
            )}

            {isInspecting && (
              <div className="absolute -top-4 right-1 bg-emerald-600 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs flex items-center gap-1 whitespace-nowrap craft-pop-in">
                <span>✓ Konten Terverifikasi</span>
              </div>
            )}

            <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-stone-800" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-stone-800" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-stone-800" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-stone-800" />
          </div>
        )}

        {/* Floating Font Dropdown Preview during Windi's Hero Names inspection */}
        {activeWave?.windi.isSpecialFont && subPhase === 'inspecting' && windiRect && (
          <div
            className="absolute bg-stone-900 text-white rounded-xl p-2 shadow-2xl border border-stone-700 z-40 text-left font-mono text-[9px] craft-pop-in pointer-events-none"
            style={{
              left: `${Math.max(12, windiRect.x + windiRect.w - 185)}px`,
              top: `${Math.max(8, windiRect.y - 52)}px`,
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
        {/* COLLABORATOR CURSORS (WORKING SIMULTANEOUSLY IN LOCKSTEP)                 */}
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
              left: `${Math.min(310, Math.max(8, arifPos.x))}px`,
              top: `${Math.max(8, arifPos.y)}px`,
            }}
          >
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
              left: `${Math.min(310, Math.max(8, windiPos.x))}px`,
              top: `${Math.max(8, windiPos.y)}px`,
            }}
          >
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
