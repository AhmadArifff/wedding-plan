'use client';

import * as React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Type,
  MousePointer,
  CheckCircle,
  CreditCard,
  Heart,
  Calendar,
  MapPin,
  Sparkles,
} from 'lucide-react';

export interface FigmaCraftingCanvasProps {
  groomNick?: string;
  brideNick?: string;
  weddingDateFormatted?: string;
  venueName?: string;
  onFinishCrafting?: () => void;
}

interface Collaborator {
  id: string;
  name: string;
  role: string;
  color: string;
  avatarBg: string;
}

const COLLABORATORS: Collaborator[] = [
  { id: 'arif', name: 'Arif (Mempelai Pria)', role: 'Header, Jadwal & Peta Lokasi', color: '#0F766E', avatarBg: 'bg-teal-700' },
  { id: 'windi', name: 'Windi (Mempelai Wanita)', role: 'Foto, Tipografi & Amplop QRIS', color: '#D97706', avatarBg: 'bg-amber-600' },
];

export const FigmaCraftingCanvas: React.FC<FigmaCraftingCanvasProps> = ({
  groomNick = 'Arif',
  brideNick = 'Windi',
  weddingDateFormatted = 'Minggu, 14 November 2027',
  venueName = 'Graha Sakinah Convention Hall',
  onFinishCrafting,
}) => {
  // Timeline progress: 0 to 100 percentage
  const [progress, setProgress] = React.useState<number>(0);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = React.useState<number>(1);

  // Animation frame / timer loop
  React.useEffect(() => {
    if (!isPlaying) return;

    // Total duration: 16 seconds at 1x speed
    const stepDuration = 50; // ms
    const increment = (stepDuration / (16000 / speedMultiplier)) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return Math.min(100, prev + increment);
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isPlaying, speedMultiplier]);

  // =========================================================================
  // SPATIAL ANCHORS (Exact percentages within the mobile card frame)
  // =========================================================================
  // 1. Header Box: (x1: 15, y1: 3.5) -> (x2: 85, y2: 8)
  // 2. Avatar Box: (x1: 40, y1: 10.5) -> (x2: 60, y2: 21.5)
  // 3. Names Box: (x1: 10, y1: 23.5) -> (x2: 90, y2: 33.5)
  // 4. Divider Dot: (x1: 46, y1: 35) -> (x2: 54, y2: 38)
  // 5. Schedule Pill: (x1: 8, y1: 49) -> (x2: 92, y2: 56.5)
  // 6. Maps Button: (x1: 12, y1: 58.5) -> (x2: 88, y2: 65.5)
  // 7. Envelope Card: (x1: 6, y1: 68) -> (x2: 94, y2: 93)

  // =========================================================================
  // ARIF'S TRACK (Header -> Schedule Pill -> Google Maps Button)
  // =========================================================================
  // 1a. Header: Travel (0-3%), Drag (3-7%), Typing STILL (7-17%), Deselect (17-20%)
  const isArifDraggingHeader = progress >= 3 && progress < 7;
  const showHeaderElement = progress >= 7;
  const isHeaderFocused = progress >= 7 && progress < 17;
  const walimatulTarget = "WALIMATUL 'URS";
  const walimatulProgress = Math.min(1, Math.max(0, (progress - 7) / 9));
  const walimatulText = walimatulTarget.slice(0, Math.floor(walimatulProgress * walimatulTarget.length));

  // 1b. Schedule Pill: Travel (20-24%), Drag (24-28%), Typing STILL (28-42%), Deselect (42-46%)
  const isArifDraggingSchedule = progress >= 24 && progress < 28;
  const showScheduleElement = progress >= 28;
  const isScheduleFocused = progress >= 28 && progress < 42;
  const scheduleTarget = `${weddingDateFormatted} · ${venueName}`;
  const scheduleProgress = Math.min(1, Math.max(0, (progress - 28) / 13));
  const scheduleText = scheduleTarget.slice(0, Math.floor(scheduleProgress * scheduleTarget.length));

  // 1c. Maps Button: Travel (46-50%), Drag (50-55%), Typing STILL (55-68%), Deselect (68-72%)
  const isArifDraggingButton = progress >= 50 && progress < 55;
  const showButtonElement = progress >= 55;
  const isButtonFocused = progress >= 55 && progress < 68;
  const buttonLabelTarget = 'Buka Peta Lokasi (Google Maps)';
  const buttonLabelProgress = Math.min(1, Math.max(0, (progress - 56) / 11));
  const buttonLabelText = buttonLabelTarget.slice(0, Math.floor(buttonLabelProgress * buttonLabelTarget.length));

  // =========================================================================
  // WINDI'S TRACK (Avatar Foto -> Hero Names -> Font Dropdown -> Amplop QRIS)
  // =========================================================================
  // 2a. Avatar Foto: Travel (0-4%), Drag (4-8%), Settle Image (8-18%), Deselect (18-21%)
  const isWindiDraggingAvatar = progress >= 4 && progress < 8;
  const showAvatarElement = progress >= 8;
  const isAvatarFocused = progress >= 8 && progress < 18;

  // 2b. Hero Names: Travel (21-25%), Drag (25-29%), Typing STILL (29-38%), Font Dropdown (38-48%), Deselect (48-51%)
  const isWindiDraggingNames = progress >= 25 && progress < 29;
  const showNamesElement = progress >= 29;
  const isNamesFocused = progress >= 29 && progress < 48;
  const namesTarget = `${groomNick} & ${brideNick}`;
  const namesProgress = Math.min(1, Math.max(0, (progress - 29) / 8));
  const namesText = namesTarget.slice(0, Math.floor(namesProgress * namesTarget.length));
  const showFontDropdown = progress >= 38 && progress < 47;
  const isCormorantFont = progress >= 41;
  const isItalicFont = progress >= 44;

  // 2c. Botanical Sage Divider Dot & Lines (51-66%)
  const isWindiDraggingDivider = progress >= 51 && progress < 55;
  const showDividerDot = progress >= 55;
  const showDividerLines = progress >= 59;
  const isDividerFocused = progress >= 55 && progress < 63;

  // 2d. Amplop Digital & QRIS: Travel (64-68%), Drag (68-74%), Cards Settle (74-88%), Deselect (88-92%)
  const isWindiDraggingEnvelope = progress >= 68 && progress < 74;
  const showEnvelopeElement = progress >= 74;
  const isEnvelopeFocused = progress >= 74 && progress < 88;

  // =========================================================================
  // ARIF'S PRECISE CURSOR MOTION (EXACT ANCHORS, NO JITTER WHILE TYPING)
  // =========================================================================
  const arifCursor = React.useMemo(() => {
    // Stage 1: Header (x1: 15, y1: 3.5) -> (x2: 85, y2: 8)
    if (progress < 3) {
      // Travel to top-left of Header
      const t = progress / 3;
      return { x: 30 - t * 15, y: 1 - t * 0.5 + t * 4, action: 'Menuju Titik Awal Header', isClicking: false, isStill: false };
    } else if (progress < 7) {
      // DRAG TO SIZE: from (15, 3.5) to (85, 8)
      const t = (progress - 3) / 4;
      return { x: 15 + t * 70, y: 3.5 + t * 4.5, action: `Drag Ukuran: ${Math.round(t * 260)} x 22px`, isClicking: true, isStill: false };
    } else if (progress < 17) {
      // TYPING: STAYS COMPLETELY STILL at bottom-right edge of header!
      return { x: 86, y: 6, action: 'Mengetik "WALIMATUL \'URS"...', isClicking: false, isStill: true };
    } else if (progress < 20) {
      // Click outside to deselect
      return { x: 90, y: 11, action: 'Klik Luar: Deselect Header', isClicking: progress >= 17 && progress <= 18.5, isStill: false };
    }

    // Stage 2: Schedule Pill (x1: 8, y1: 49) -> (x2: 92, y2: 56.5)
    else if (progress < 24) {
      // Travel down to top-left of Schedule
      const t = (progress - 20) / 4;
      return { x: 90 - t * 82, y: 11 + t * 38, action: 'Menuju Titik Awal Jadwal', isClicking: false, isStill: false };
    } else if (progress < 28) {
      // DRAG TO SIZE: from (8, 49) to (92, 56.5)
      const t = (progress - 24) / 4;
      return { x: 8 + t * 84, y: 49 + t * 7.5, action: `Drag Ukuran: ${Math.round(t * 310)} x 36px`, isClicking: true, isStill: false };
    } else if (progress < 42) {
      // TYPING: STAYS COMPLETELY STILL at right edge of schedule!
      return { x: 93, y: 53, action: 'Mengetik Tanggal & Gedung...', isClicking: false, isStill: true };
    } else if (progress < 46) {
      // Click outside to deselect
      return { x: 94, y: 46, action: 'Klik Luar: Deselect Jadwal', isClicking: progress >= 42 && progress <= 43.5, isStill: false };
    }

    // Stage 3: Maps Button (x1: 12, y1: 58.5) -> (x2: 88, y2: 65.5)
    else if (progress < 50) {
      // Travel to top-left of Maps Button
      const t = (progress - 46) / 4;
      return { x: 94 - t * 82, y: 46 + t * 12.5, action: 'Menuju Titik Awal Tombol', isClicking: false, isStill: false };
    } else if (progress < 55) {
      // DRAG TO SIZE: from (12, 58.5) to (88, 65.5)
      const t = (progress - 50) / 5;
      return { x: 12 + t * 76, y: 58.5 + t * 7, action: `Drag Tombol: ${Math.round(t * 280)} x 38px`, isClicking: true, isStill: false };
    } else if (progress < 68) {
      // TYPING: STAYS COMPLETELY STILL at right edge of button!
      return { x: 89, y: 62, action: 'Mengetik Label: "Buka Google Maps"', isClicking: false, isStill: true };
    } else if (progress < 72) {
      // Click outside to deselect
      return { x: 92, y: 67, action: 'Klik Luar: Deselect Tombol', isClicking: progress >= 68 && progress <= 69.5, isStill: false };
    }

    // Stage 4: Finished & celebration
    else {
      return { x: 14, y: 8, action: 'Jadwal & Lokasi Siap, Sayang! ❤️', isClicking: false, isStill: true };
    }
  }, [progress]);

  // =========================================================================
  // WINDI'S PRECISE CURSOR MOTION (EXACT ANCHORS, NO JITTER WHILE TYPING)
  // =========================================================================
  const windiCursor = React.useMemo(() => {
    // Stage 1: Avatar Foto (x1: 40, y1: 10.5) -> (x2: 60, y2: 21.5)
    if (progress < 4) {
      // Travel to top-left of Avatar Frame
      const t = progress / 4;
      return { x: 70 - t * 30, y: 3 + t * 7.5, action: 'Menuju Frame Foto', isClicking: false, isStill: false };
    } else if (progress < 8) {
      // DRAG TO SIZE: from (40, 10.5) to (60, 21.5)
      const t = (progress - 4) / 4;
      return { x: 40 + t * 20, y: 10.5 + t * 11, action: `Drag Frame: ${Math.round(t * 64)} x 64px`, isClicking: true, isStill: false };
    } else if (progress < 18) {
      // Inspecting photo & ring gold: STAYS STILL!
      return { x: 61, y: 16, action: 'Memasang Foto & Ring Emas', isClicking: false, isStill: true };
    } else if (progress < 21) {
      // Click outside to deselect
      return { x: 68, y: 14, action: 'Klik Luar: Deselect Foto', isClicking: progress >= 18 && progress <= 19.5, isStill: false };
    }

    // Stage 2: Hero Names (x1: 10, y1: 23.5) -> (x2: 90, y2: 33.5)
    else if (progress < 25) {
      // Travel to top-left of Names
      const t = (progress - 21) / 4;
      return { x: 68 - t * 58, y: 14 + t * 9.5, action: 'Menuju Titik Awal Nama', isClicking: false, isStill: false };
    } else if (progress < 29) {
      // DRAG TO SIZE: from (10, 23.5) to (90, 33.5)
      const t = (progress - 25) / 4;
      return { x: 10 + t * 80, y: 23.5 + t * 10, action: `Drag Ukuran: ${Math.round(t * 290)} x 54px`, isClicking: true, isStill: false };
    } else if (progress < 38) {
      // TYPING: STAYS COMPLETELY STILL at right edge of names!
      return { x: 91, y: 28.5, action: 'Mengetik "Arif & Windi"...', isClicking: false, isStill: true };
    } else if (progress < 42) {
      // Moves to font dropdown inspector
      const t = (progress - 38) / 4;
      return { x: 91 - t * 15, y: 28.5 - t * 8.5, action: 'Membuka Dropdown Font...', isClicking: progress >= 40, isStill: false };
    } else if (progress < 48) {
      // Picking Cormorant Garamond & Italic: STAYS STILL
      return { x: 76, y: 20, action: 'Memilih Cormorant Garamond 50px Italic', isClicking: progress >= 43 && progress <= 45, isStill: true };
    } else if (progress < 51) {
      // Click outside to deselect
      return { x: 93, y: 34, action: 'Klik Luar: Konfirmasi Tipografi', isClicking: progress >= 48 && progress <= 49.5, isStill: false };
    }

    // Stage 3: Botanical Divider Dot (x1: 46, y1: 35) -> (x2: 54, y2: 38)
    else if (progress < 55) {
      // DRAG small dot from (46, 35) to (54, 38)
      const t = (progress - 51) / 4;
      return { x: 46 + t * 8, y: 35 + t * 3, action: 'Drop Aksen: Titik Sage #047857', isClicking: true, isStill: false };
    } else if (progress < 63) {
      // Settle divider: STAYS STILL
      return { x: 55, y: 36.5, action: 'Ornamen Pembatas Anggun', isClicking: false, isStill: true };
    } else if (progress < 66) {
      // Click outside
      return { x: 62, y: 37, action: 'Klik Luar: Deselect Aksen', isClicking: progress >= 63 && progress <= 64.5, isStill: false };
    }

    // Stage 4: Amplop Digital & QRIS (x1: 6, y1: 68) -> (x2: 94, y2: 93)
    else if (progress < 70) {
      // Travel to top-left of Envelope Card
      const t = (progress - 66) / 4;
      return { x: 62 - t * 56, y: 37 + t * 31, action: 'Menuju Area Amplop Digital', isClicking: false, isStill: false };
    } else if (progress < 75) {
      // DRAG TO SIZE: from (6, 68) to (94, 93)
      const t = (progress - 70) / 5;
      return { x: 6 + t * 88, y: 68 + t * 25, action: `Drag Amplop: ${Math.round(t * 320)} x 120px`, isClicking: true, isStill: false };
    } else if (progress < 88) {
      // Card settling with Bank BCA, Mandiri & QRIS: STAYS STILL!
      return { x: 95, y: 80, action: 'Menyematkan BCA, Mandiri & QRIS', isClicking: false, isStill: true };
    } else if (progress < 92) {
      // Click outside
      return { x: 96, y: 94, action: 'Klik Luar: Finalisasi Undangan', isClicking: progress >= 88 && progress <= 89.5, isStill: false };
    }

    // Stage 5: Finished & celebration
    else {
      return { x: 82, y: 22, action: 'Undangan Kita Cantik Banget! ✨', isClicking: false, isStill: true };
    }
  }, [progress]);

  // Handle Scrub
  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    setProgress(newProgress);
  };

  const handleSkipToFinish = () => {
    setProgress(100);
    onFinishCrafting?.();
  };

  const handleReplay = () => {
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full min-h-[720px] bg-[#202020] p-2 sm:p-5 select-none overflow-hidden rounded-3xl border border-stone-700 shadow-2xl font-sans text-stone-100">
      {/* Background Dot Grid khas Figma Canvas */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#9CA3AF 1.2px, transparent 1.2px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Top Figma Application Header Bar */}
      <div className="relative z-30 mb-3 bg-[#181818] border border-stone-800 rounded-2xl p-2 sm:px-4 sm:py-2 flex flex-wrap items-center justify-between gap-2 shadow-lg text-xs">
        {/* Left: Project title */}
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-stone-200 font-semibold">
            NikahPlan · Desain Berdua (Arif &amp; Windi)
          </span>
        </div>

        {/* Center: 2 Collaborators Avatars */}
        <div className="flex items-center gap-2 bg-stone-900 px-3 py-1 rounded-full border border-stone-800 text-[10px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600 inline-block" />
            <span className="text-teal-300 font-semibold">Arif</span>
          </div>
          <span className="text-stone-600">&amp;</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block" />
            <span className="text-amber-300 font-semibold">Windi</span>
          </div>
        </div>

        {/* Right: Player Controls & Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Speed selector */}
          <button
            type="button"
            onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1))}
            className="px-2 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 font-mono text-[10px] border border-stone-700 transition-colors cursor-pointer"
            title="Kecepatan Animasi"
          >
            {speedMultiplier}x Speed
          </button>

          {/* Play/Pause */}
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center gap-1 transition-colors cursor-pointer"
            title={isPlaying ? 'Jeda' : 'Putar'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span className="hidden sm:inline text-[11px]">{isPlaying ? 'Jeda' : 'Putar'}</span>
          </button>

          {/* Replay */}
          <button
            type="button"
            onClick={handleReplay}
            className="p-1.5 sm:px-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
            title="Putar Ulang dari Awal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Skip / Finish Button */}
          <button
            type="button"
            onClick={handleSkipToFinish}
            className="px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-semibold flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer text-[11px]"
          >
            <span>Hasil Jadi</span>
            <FastForward className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Timeline Scrubbing Bar */}
      <div className="relative z-30 mb-3 px-1">
        <div
          onClick={handleScrub}
          className="relative w-full h-2.5 bg-stone-800 rounded-full cursor-pointer overflow-hidden border border-stone-700/80 group"
          title="Klik untuk loncat ke detik tertentu"
        >
          {/* Progress fill */}
          <div
            className="h-full bg-linear-to-r from-teal-500 via-amber-500 to-teal-400 transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[9px] font-mono text-stone-400 mt-1 px-0.5">
          <span>00:00 · Arif &amp; Windi Mulai Desain</span>
          <span className="text-teal-400 font-semibold">{Math.round(progress)}% Real-time Crafting</span>
          <span>00:16 · Undangan Selesai</span>
        </div>
      </div>

      {/* Main Work Area: Canvas Frame Ponsel 375px */}
      <div className="relative mx-auto max-w-sm w-full min-h-[620px] p-2 sm:p-0">
        {/* Frame Label Badge */}
        <div className="text-[10px] font-mono text-stone-400 font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
          <span># Mobile Frame · 375 x 812 (NikahPlan-Canvas)</span>
          <span className="text-[9px] text-stone-500 font-mono">Zoom: 100%</span>
        </div>

        {/* Center Vertical Smart Guide (Magenta Snap Guide) */}
        {(isDividerFocused || isEnvelopeFocused) && (
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-pink-500 z-30 pointer-events-none opacity-85" />
        )}

        {/* ========================================================================= */}
        {/* THE MOBILE CARD ITSELF */}
        {/* ========================================================================= */}
        <div className="relative w-full bg-[#FAF8F5] rounded-3xl shadow-2xl overflow-hidden min-h-[600px] p-4 sm:p-5 flex flex-col justify-between text-center transition-all duration-500 border-2 border-stone-300">
          {/* 1. Header Teks Walimatul 'Urs (Arif) */}
          <div className="relative pt-1">
            {isHeaderFocused && (
              <div className="absolute -inset-1 rounded-lg border-2 border-teal-600 pointer-events-none z-20 animate-in fade-in">
                <span className="absolute -top-3 left-1 text-[8px] font-bold text-white px-1 rounded-xs bg-teal-700 font-mono shadow-xs">
                  Arif · Text: 11px [T]
                </span>
                <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-white border border-teal-800" />
                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white border border-teal-800" />
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white border border-teal-800" />
                <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-white border border-teal-800" />
              </div>
            )}

            {showHeaderElement ? (
              <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-teal-800 min-h-[18px]">
                {walimatulText}
                {isHeaderFocused && <span className="inline-block w-1.5 h-3 bg-teal-800 ml-0.5 animate-pulse" />}
              </div>
            ) : (
              <div className="h-5" />
            )}
          </div>

          {/* 2. Avatar Foto Pasangan Lingkaran dengan Ring Emas (Windi) */}
          <div className="relative my-0.5 flex justify-center">
            {isAvatarFocused && (
              <div className="absolute -inset-1 w-[72px] h-[72px] rounded-full border-2 border-amber-500 pointer-events-none z-20 animate-in fade-in">
                <span className="absolute -top-3 left-1 text-[8px] font-bold text-white px-1 rounded-xs bg-amber-600 font-mono shadow-xs">
                  Windi · Avatar 64px
                </span>
              </div>
            )}

            {showAvatarElement ? (
              <div className="relative w-16 h-16 rounded-full p-1 bg-gradient-to-tr from-amber-300 via-stone-100 to-amber-400 shadow-md animate-in zoom-in-75 duration-300">
                <div className="w-full h-full rounded-full overflow-hidden bg-stone-200 flex items-center justify-center">
                  <img
                    src="/generated/avatar-groom.svg"
                    alt="Avatar Mempelai"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="h-16" />
            )}
          </div>

          {/* 3. Nama Mempelai Hero & Divider Dot (Windi) */}
          <div className="relative my-1">
            {isNamesFocused && (
              <div className="absolute -inset-1.5 rounded-xl border-2 border-amber-500 pointer-events-none z-20 animate-in fade-in">
                <span className="absolute -top-3.5 left-1 text-[8px] font-bold text-white px-1.5 py-0.2 rounded-xs bg-amber-600 font-mono shadow-xs">
                  Windi · {isCormorantFont ? 'Cormorant 50px Italic' : 'Inter Sans 36px'}
                </span>
                <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-white border border-amber-700" />
                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white border border-amber-700" />
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white border border-amber-700" />
                <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-white border border-amber-700" />
              </div>
            )}

            {/* Floating Font Dropdown Mockup while Windi selects it */}
            {showFontDropdown && (
              <div className="absolute -top-12 right-2 bg-stone-900 text-white rounded-xl p-2 shadow-2xl border border-stone-700 z-30 text-left font-mono text-[9px] animate-in zoom-in-95">
                <div className="text-stone-400 text-[8px] uppercase tracking-wider mb-1">Font Family</div>
                <div className="bg-amber-600/30 text-amber-300 font-serif px-2 py-0.5 rounded-sm font-semibold flex items-center justify-between gap-2">
                  <span>✓ Cormorant Garamond</span>
                  <span className="text-[7px]">Serif</span>
                </div>
                <div className="text-stone-400 px-2 py-0.5 opacity-60">Inter Sans</div>
              </div>
            )}

            {showNamesElement ? (
              <h2
                className={`text-stone-900 tracking-tight min-h-[48px] flex items-center justify-center transition-all duration-300 ${
                  isCormorantFont ? 'font-serif text-4xl sm:text-5xl font-bold' : 'font-sans text-3xl font-semibold'
                } ${isItalicFont ? 'italic' : ''}`}
              >
                {namesText}
                {isNamesFocused && !isCormorantFont && (
                  <span className="inline-block w-2 h-7 bg-stone-900 ml-1 animate-pulse" />
                )}
              </h2>
            ) : (
              <div className="h-12" />
            )}

            {/* Botanical Sage Divider Dot & Flanking Ornaments */}
            {showDividerDot && (
              <div className="relative flex items-center justify-center gap-2 mt-1">
                {showDividerLines && <div className="w-8 h-[1px] bg-teal-700/40 animate-in fade-in" />}
                <div className="w-2.5 h-2.5 rounded-full bg-teal-700 shadow-xs animate-in zoom-in" />
                {showDividerLines && <div className="w-8 h-[1px] bg-teal-700/40 animate-in fade-in" />}
              </div>
            )}
          </div>

          {/* 4. Ayat Suci Kutipan Ar-Rum 21 (Hadir sebagai Pondasi Nilai) */}
          <div className="relative my-0.5 bg-[#FAF6F0] rounded-2xl p-2 border border-stone-200/80 shadow-xs">
            <Heart className="w-3 h-3 text-teal-700 mx-auto mb-0.5 opacity-70" />
            <p className="font-serif italic text-[10px] text-stone-600 leading-relaxed">
              &ldquo;Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri agar kamu merasa tenteram.&rdquo;
            </p>
            <p className="text-[8px] font-bold uppercase tracking-widest text-teal-800 font-mono mt-0.5">
              QS. AR-RUM: 21
            </p>
          </div>

          {/* 5. Jadwal Tanggal & Venue Pill (Arif) */}
          <div className="relative my-1">
            {isScheduleFocused && (
              <div className="absolute -inset-1 rounded-xl border-2 border-teal-600 pointer-events-none z-20 animate-in fade-in">
                <span className="absolute -top-3 left-1 text-[8px] font-bold text-white px-1 rounded-xs bg-teal-700 font-mono shadow-xs">
                  Arif · Pill Jadwal
                </span>
              </div>
            )}

            {showScheduleElement ? (
              <div className="bg-stone-100 rounded-xl py-1.5 px-3 border border-stone-200 text-stone-700 flex items-center justify-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <p className="text-[10px] font-mono font-medium tracking-wide truncate">
                  {scheduleText}
                  {isScheduleFocused && <span className="inline-block w-1.5 h-2.5 bg-stone-700 ml-0.5 animate-pulse" />}
                </p>
              </div>
            ) : (
              <div className="h-9" />
            )}
          </div>

          {/* 6. Tombol Aksi Buka Google Maps (Arif) */}
          <div className="relative my-0.5">
            {isButtonFocused && (
              <div className="absolute -inset-1 rounded-xl border-2 border-teal-600 pointer-events-none z-20 animate-in fade-in">
                <span className="absolute -top-3 left-1 text-[8px] font-bold text-white px-1 rounded-xs bg-teal-700 font-mono shadow-xs">
                  Arif · CTA Button
                </span>
              </div>
            )}

            {showButtonElement ? (
              <button
                type="button"
                className="w-full py-2 px-3 rounded-xl bg-teal-700 text-white font-medium text-[11px] shadow-xs flex items-center justify-center gap-1.5 transition-all hover:bg-teal-800"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{buttonLabelText}</span>
                {isButtonFocused && <span className="inline-block w-1 h-3 bg-white ml-0.5 animate-pulse" />}
              </button>
            ) : (
              <div className="h-8" />
            )}
          </div>

          {/* 7. Komponen Amplop Digital, Bank & QRIS (Windi) */}
          <div className="relative mt-1">
            {isEnvelopeFocused && (
              <div className="absolute -inset-1.5 rounded-2xl border-2 border-amber-500 pointer-events-none z-20 animate-in fade-in">
                <span className="absolute -top-3.5 left-1 text-[8px] font-bold text-white px-1.5 py-0.2 rounded-xs bg-amber-600 font-mono shadow-xs">
                  Windi · Amplop Digital &amp; QRIS
                </span>
              </div>
            )}

            {showEnvelopeElement ? (
              <div className="bg-white rounded-2xl p-2.5 border border-stone-200 shadow-xs text-left text-xs transition-all animate-in slide-in-from-bottom-2">
                <div className="flex items-center justify-between text-teal-800 font-bold mb-1">
                  <span className="flex items-center gap-1 text-[11px]">
                    <CreditCard className="w-3 h-3" />
                    <span>Amplop Digital &amp; QRIS</span>
                  </span>
                  <span className="text-[8.5px] text-amber-700 font-mono font-semibold bg-amber-50 px-1.5 py-0.2 rounded-sm border border-amber-200">
                    Auto-Centered
                  </span>
                </div>

                {/* Bank Badges */}
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-stone-600 mb-1.5 bg-stone-50 p-1 rounded-lg border border-stone-200">
                  <span className="font-bold text-blue-700">BCA</span>
                  <span>1234567890</span>
                  <span className="text-stone-300">|</span>
                  <span className="font-bold text-amber-700">Mandiri</span>
                  <span>9876543210</span>
                </div>

                {/* QRIS Barcode */}
                <div className="flex items-center gap-2 bg-stone-50 p-1.5 rounded-xl border border-stone-200 animate-in zoom-in-95">
                  <div className="w-8 h-8 bg-teal-800 text-white rounded-lg flex items-center justify-center font-mono font-bold text-[9px] shrink-0">
                    QRIS
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] font-bold text-stone-800 truncate">
                      NikahPlan: {groomNick} &amp; {brideNick}
                    </div>
                    <div className="text-[8px] text-stone-500">Scan BCA, Mandiri, Gopay, Ovo</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-20" />
            )}
          </div>

          {/* Selesai / Celebration Footer Notification */}
          {progress >= 95 && (
            <div className="mt-2 p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 animate-in fade-in flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-semibold text-[11px]">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                <span>Undangan Selesai Dirakit Berdua!</span>
              </span>
              <button
                type="button"
                onClick={onFinishCrafting}
                className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-medium text-[10px] cursor-pointer"
              >
                Buka Penuh
              </button>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* DYNAMIC DRAG-TO-SIZE RECTANGLES (EXPANDS IN LOCKSTEP WITH CURSOR TIP) */}
        {/* ========================================================================= */}

        {/* Arif's Dragging Boxes */}
        {isArifDraggingHeader && (
          <div
            className="absolute border-2 border-dashed border-teal-500 bg-teal-500/15 pointer-events-none z-30 rounded-md"
            style={{
              left: '15%',
              top: '3.5%',
              width: `${Math.max(2, arifCursor.x - 15)}%`,
              height: `${Math.max(2, arifCursor.y - 3.5)}%`,
            }}
          >
            <div className="absolute -bottom-5 right-0 bg-teal-700 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs whitespace-nowrap">
              {Math.round((arifCursor.x - 15) * 3.75)} x {Math.round((arifCursor.y - 3.5) * 6)}px
            </div>
          </div>
        )}

        {isArifDraggingSchedule && (
          <div
            className="absolute border-2 border-dashed border-teal-500 bg-teal-500/15 pointer-events-none z-30 rounded-xl"
            style={{
              left: '8%',
              top: '49%',
              width: `${Math.max(2, arifCursor.x - 8)}%`,
              height: `${Math.max(2, arifCursor.y - 49)}%`,
            }}
          >
            <div className="absolute -bottom-5 right-0 bg-teal-700 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs whitespace-nowrap">
              {Math.round((arifCursor.x - 8) * 3.75)} x {Math.round((arifCursor.y - 49) * 6)}px
            </div>
          </div>
        )}

        {isArifDraggingButton && (
          <div
            className="absolute border-2 border-dashed border-teal-500 bg-teal-500/15 pointer-events-none z-30 rounded-xl"
            style={{
              left: '12%',
              top: '58.5%',
              width: `${Math.max(2, arifCursor.x - 12)}%`,
              height: `${Math.max(2, arifCursor.y - 58.5)}%`,
            }}
          >
            <div className="absolute -bottom-5 right-0 bg-teal-700 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs whitespace-nowrap">
              {Math.round((arifCursor.x - 12) * 3.75)} x {Math.round((arifCursor.y - 58.5) * 6)}px
            </div>
          </div>
        )}

        {/* Windi's Dragging Boxes */}
        {isWindiDraggingAvatar && (
          <div
            className="absolute border-2 border-dashed border-amber-500 bg-amber-500/15 pointer-events-none z-30 rounded-full"
            style={{
              left: '40%',
              top: '10.5%',
              width: `${Math.max(2, windiCursor.x - 40)}%`,
              height: `${Math.max(2, windiCursor.y - 10.5)}%`,
            }}
          >
            <div className="absolute -bottom-5 right-0 bg-amber-600 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs whitespace-nowrap">
              {Math.round((windiCursor.x - 40) * 3.75)} x {Math.round((windiCursor.y - 10.5) * 6)}px
            </div>
          </div>
        )}

        {isWindiDraggingNames && (
          <div
            className="absolute border-2 border-dashed border-amber-500 bg-amber-500/15 pointer-events-none z-30 rounded-xl"
            style={{
              left: '10%',
              top: '23.5%',
              width: `${Math.max(2, windiCursor.x - 10)}%`,
              height: `${Math.max(2, windiCursor.y - 23.5)}%`,
            }}
          >
            <div className="absolute -bottom-5 right-0 bg-amber-600 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs whitespace-nowrap">
              {Math.round((windiCursor.x - 10) * 3.75)} x {Math.round((windiCursor.y - 23.5) * 6)}px
            </div>
          </div>
        )}

        {isWindiDraggingDivider && (
          <div
            className="absolute border border-dashed border-amber-500 bg-amber-500/15 pointer-events-none z-30 rounded-full"
            style={{
              left: '46%',
              top: '35%',
              width: `${Math.max(1, windiCursor.x - 46)}%`,
              height: `${Math.max(1, windiCursor.y - 35)}%`,
            }}
          />
        )}

        {isWindiDraggingEnvelope && (
          <div
            className="absolute border-2 border-dashed border-amber-500 bg-amber-500/15 pointer-events-none z-30 rounded-2xl"
            style={{
              left: '6%',
              top: '68%',
              width: `${Math.max(2, windiCursor.x - 6)}%`,
              height: `${Math.max(2, windiCursor.y - 68)}%`,
            }}
          >
            <div className="absolute -bottom-5 right-0 bg-amber-600 text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shadow-xs whitespace-nowrap">
              {Math.round((windiCursor.x - 6) * 3.75)} x {Math.round((windiCursor.y - 68) * 6)}px
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2 CURSORS MULTIPLAYER OVERLAYS (EXACT TIP ANCHOR, STILL WHILE TYPING) */}
        {/* ========================================================================= */}

        {/* Cursor 1: Arif (Teal) */}
        <div
          className={`absolute z-40 pointer-events-none flex flex-col items-start ${
            arifCursor.isStill ? 'transition-none' : 'transition-all duration-300 ease-out'
          }`}
          style={{
            left: `${arifCursor.x}%`,
            top: `${arifCursor.y}%`,
          }}
        >
          {/* Click Ripple Pulse (only fires on single clicks) */}
          {arifCursor.isClicking && (
            <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full border-2 border-teal-400 bg-teal-400/20 animate-ping pointer-events-none" />
          )}

          <svg className="w-5 h-5 drop-shadow-md" viewBox="0 0 24 24" fill="#0F766E" stroke="white" strokeWidth="1.5">
            <path d="M5.5 3.5l14 7-6.5 2-2 6.5-5.5-15.5z" />
          </svg>

          <div className="text-[9px] font-bold text-white px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap ml-3 -mt-1 bg-teal-700 flex items-center gap-1">
            <span>Arif (Mempelai)</span>
            {arifCursor.isStill && <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />}
          </div>

          <div className="bg-[#1A1A1A]/95 text-stone-200 text-[8.5px] px-2 py-0.5 rounded-md shadow-md mt-0.5 ml-3 font-mono border border-stone-700 whitespace-nowrap animate-in fade-in">
            <span>{arifCursor.action}</span>
          </div>
        </div>

        {/* Cursor 2: Windi (Amber) */}
        <div
          className={`absolute z-40 pointer-events-none flex flex-col items-start ${
            windiCursor.isStill ? 'transition-none' : 'transition-all duration-300 ease-out'
          }`}
          style={{
            left: `${windiCursor.x}%`,
            top: `${windiCursor.y}%`,
          }}
        >
          {windiCursor.isClicking && (
            <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full border-2 border-amber-400 bg-amber-400/20 animate-ping pointer-events-none" />
          )}

          <svg className="w-5 h-5 drop-shadow-md" viewBox="0 0 24 24" fill="#D97706" stroke="white" strokeWidth="1.5">
            <path d="M5.5 3.5l14 7-6.5 2-2 6.5-5.5-15.5z" />
          </svg>

          <div className="text-[9px] font-bold text-white px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap ml-3 -mt-1 bg-amber-600 flex items-center gap-1">
            <span>Windi (Mempelai)</span>
            {windiCursor.isStill && <span className="w-1.5 h-1.5 rounded-full bg-amber-200 animate-pulse" />}
          </div>

          <div className="bg-[#1A1A1A]/95 text-stone-200 text-[8.5px] px-2 py-0.5 rounded-md shadow-md mt-0.5 ml-3 font-mono border border-stone-700 whitespace-nowrap animate-in fade-in">
            <span>{windiCursor.action}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
