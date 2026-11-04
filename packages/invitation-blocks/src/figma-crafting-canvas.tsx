'use client';

import * as React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Type,
  Move,
  Sparkles,
  CheckCircle,
  CreditCard,
  QrCode,
  Heart,
  Sliders,
  Layers,
  LayoutGrid,
  Maximize2,
  Share2,
  MousePointer,
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
  { id: 'arif', name: 'Arif (Mempelai)', role: 'Header & Schedule', color: '#0F766E', avatarBg: 'bg-teal-700' },
  { id: 'windi', name: 'Windi (Mempelai)', role: 'Hero Typography', color: '#D97706', avatarBg: 'bg-amber-600' },
  { id: 'budi', name: 'Budi Santoso', role: 'Digital Envelope & QRIS', color: '#7C3AED', avatarBg: 'bg-purple-600' },
  { id: 'reza', name: 'Reza Pratama', role: 'Verse & Auto-Layout', color: '#2563EB', avatarBg: 'bg-blue-600' },
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
  const [viewStyle, setViewStyle] = React.useState<'studio' | 'clean'>('studio');

  // Animation frame / timer loop
  React.useEffect(() => {
    if (!isPlaying) return;

    // Loop duration: approx 15 seconds at 1x speed
    const stepDuration = 50; // ms
    const increment = (stepDuration / (14000 / speedMultiplier)) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Stay at 100% for celebration, then loop or pause
          return 100;
        }
        return Math.min(100, prev + increment);
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isPlaying, speedMultiplier]);

  // Derived state values based on timeline progress (0 - 100)

  // 1. Arif's Track (Header & Schedule)
  // 0% - 22%: Types Walimatul 'Urs
  // 22% - 48%: Types Date & Venue
  // 48% - 75%: Aligns center
  // 75% - 100%: Finished & celebration
  const walimatulFull = "WALIMATUL 'URS";
  const walimatulProgress = Math.min(1, Math.max(0, progress / 20));
  const walimatulChars = Math.floor(walimatulProgress * walimatulFull.length);
  const textWalimatul = walimatulFull.slice(0, walimatulChars);

  const detailsFull = `${weddingDateFormatted} · ${venueName}`;
  const detailsProgress = Math.min(1, Math.max(0, (progress - 24) / 24));
  const detailsChars = Math.floor(detailsProgress * detailsFull.length);
  const textDetails = detailsFull.slice(0, detailsChars);

  // 2. Windi's Track (Hero Names & Divider)
  // 0% - 22%: Types "Arif & Windi" in sans
  // 22% - 50%: Changes font to Cormorant Garamond, Italic, 52px
  // 50% - 75%: Drops botanical divider dot
  // 75% - 100%: Finished & celebration
  const namesFull = `${groomNick} & ${brideNick}`;
  const namesProgress = Math.min(1, Math.max(0, progress / 22));
  const namesChars = Math.floor(namesProgress * namesFull.length);
  const textNames = namesFull.slice(0, namesChars);
  const isCormorantFont = progress >= 26;
  const isItalicFont = progress >= 34;
  const showDividerDot = progress >= 48;

  // 3. Reza's Track (Sacred Verse & Auto-Layout)
  // 0% - 22%: Creates verse container card
  // 22% - 50%: Types Quran Ar-Rum: 21 quote
  // 50% - 75%: Triggers Auto-Layout [Shift+A]
  // 75% - 100%: Finished & celebration
  const showVerseCard = progress >= 8;
  const verseFull =
    'Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri agar kamu merasa tenteram.';
  const verseProgress = Math.min(1, Math.max(0, (progress - 20) / 28));
  const verseChars = Math.floor(verseProgress * verseFull.length);
  const textVerse = verseFull.slice(0, verseChars);
  const isAutoLayoutActive = progress >= 62 && progress <= 82;

  // 4. Budi's Track (Digital Envelope & QRIS)
  // 0% - 22%: Drags Digital Envelope container from sidebar to canvas
  // 22% - 50%: Sets border-radius 16px, adds bank accounts
  // 50% - 75%: Drops and centers QRIS merchant barcode
  // 75% - 100%: Finished & celebration
  const isDraggingEnvelope = progress >= 4 && progress < 24;
  const showEnvelopeCard = progress >= 22;
  const showQrisBarcode = progress >= 52;

  // Dynamic Cursor Coordinates & Action Labels (Simultaneous for all 4!)
  // Arif Cursor
  const arifCursor = React.useMemo(() => {
    if (progress < 22) {
      // Typing Walimatul header
      const t = progress / 22;
      return {
        x: 35 + t * 20,
        y: 12 + Math.sin(t * Math.PI) * 2,
        action: 'T Text: 11px · Tracking 0.25em · #0F766E',
        isClicking: progress % 5 < 1.5,
        isActiveOnElement: 'header',
      };
    } else if (progress < 50) {
      // Typing Date & Venue
      const t = (progress - 22) / 28;
      return {
        x: 25 + t * 45,
        y: 45 + Math.sin(t * Math.PI) * 2,
        action: '📅 Date & Venue Card · Auto-fit',
        isClicking: (progress - 22) % 6 < 1.5,
        isActiveOnElement: 'schedule',
      };
    } else if (progress < 75) {
      // Center aligning
      return {
        x: 50,
        y: 47,
        action: '↔️ Text Align: Center · Snapped',
        isClicking: progress >= 60 && progress <= 65,
        isActiveOnElement: 'schedule',
      };
    } else {
      // Idle & celebration
      return {
        x: 18,
        y: 8,
        action: '❤️ Jadwal akad fix! 🌿',
        isClicking: false,
        isActiveOnElement: null,
      };
    }
  }, [progress]);

  // Windi Cursor
  const windiCursor = React.useMemo(() => {
    if (progress < 24) {
      // Typing Names
      const t = progress / 24;
      return {
        x: 30 + t * 38,
        y: 22 + Math.sin(t * Math.PI) * 1.5,
        action: 'T Type: Arif & Windi · 36px',
        isClicking: progress % 4 < 1.2,
        isActiveOnElement: 'names',
      };
    } else if (progress < 50) {
      // Changing font to Cormorant Garamond & Italic
      const t = (progress - 24) / 26;
      return {
        x: 58 + Math.cos(t * Math.PI * 2) * 6,
        y: 19 + Math.sin(t * Math.PI) * 4,
        action: isCormorantFont ? '✨ Cormorant Garamond · Italic · 50px' : 'Dropdown: Selecting Font...',
        isClicking: (progress >= 26 && progress <= 29) || (progress >= 34 && progress <= 37),
        isActiveOnElement: 'names',
      };
    } else if (progress < 75) {
      // Dropping botanical sage dot
      const t = (progress - 50) / 25;
      return {
        x: 50 + (1 - t) * 12,
        y: 31 + t * 2,
        action: '🎨 Dot Divider · 10px · Fill #047857',
        isClicking: progress >= 52 && progress <= 56,
        isActiveOnElement: 'dot',
      };
    } else {
      // Idle & celebration
      return {
        x: 82,
        y: 24,
        action: '😍 Suka banget font-nya! ✨',
        isClicking: false,
        isActiveOnElement: null,
      };
    }
  }, [progress, isCormorantFont]);

  // Budi Cursor (Envelope & QRIS)
  const budiCursor = React.useMemo(() => {
    if (progress < 24) {
      // Dragging component from left edge
      const t = progress / 24;
      return {
        x: 12 + t * 36,
        y: 72 - Math.sin(t * Math.PI) * 4,
        action: '📦 Drag: DigitalEnvelope.fig',
        isClicking: true,
        isActiveOnElement: 'envelope',
      };
    } else if (progress < 52) {
      // Styling envelope card
      const t = (progress - 24) / 28;
      return {
        x: 35 + t * 30,
        y: 68 + Math.sin(t * Math.PI * 2) * 2,
        action: '💳 R: 16px · Bank Mandiri & BCA Linked',
        isClicking: (progress - 24) % 6 < 1.5,
        isActiveOnElement: 'envelope',
      };
    } else if (progress < 75) {
      // Centering QRIS barcode
      const t = (progress - 52) / 23;
      return {
        x: 48 + Math.sin(t * Math.PI) * 4,
        y: 78,
        action: '📲 QRIS Merchant: Arif & Windi · Snapped',
        isClicking: progress >= 58 && progress <= 64,
        isActiveOnElement: 'qris',
      };
    } else {
      // Idle & celebration
      return {
        x: 84,
        y: 82,
        action: '🎉 QRIS siap scan & transfer! 🚀',
        isClicking: false,
        isActiveOnElement: null,
      };
    }
  }, [progress]);

  // Reza Cursor (Verse & Auto-Layout)
  const rezaCursor = React.useMemo(() => {
    if (progress < 22) {
      // Formatting Verse Box
      const t = progress / 22;
      return {
        x: 45 + Math.cos(t * Math.PI * 2) * 12,
        y: 35 + t * 4,
        action: '📜 Quote Frame · Background #FCFAF7',
        isClicking: progress % 5 < 1.2,
        isActiveOnElement: 'verse',
      };
    } else if (progress < 52) {
      // Typing verse text
      const t = (progress - 22) / 30;
      return {
        x: 28 + t * 42,
        y: 38 + Math.sin(t * Math.PI) * 1.5,
        action: 'T QS. Ar-Rum: 21 · Serif 11px',
        isClicking: (progress - 22) % 5 < 1.2,
        isActiveOnElement: 'verse',
      };
    } else if (progress < 78) {
      // Selecting Canvas & Triggering Auto-Layout
      return {
        x: 52,
        y: 10,
        action: '📐 Auto-Layout [Shift+A] · Gap: 16px',
        isClicking: progress >= 62 && progress <= 68,
        isActiveOnElement: 'canvas',
      };
    } else {
      // Idle & celebration
      return {
        x: 16,
        y: 42,
        action: '💍 Layout mobile 375px presisi! 💯',
        isClicking: false,
        isActiveOnElement: null,
      };
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
    <div className="relative w-full min-h-[680px] bg-[#2C2C2C] p-2 sm:p-5 select-none overflow-hidden rounded-3xl border border-stone-700 shadow-2xl font-sans text-stone-100">
      {/* Background Dot Grid khas Figma Canvas */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#6B7280 1.2px, transparent 1.2px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Top Figma Application Header Bar */}
      <div className="relative z-30 mb-3 bg-[#1E1E1E] border border-stone-800 rounded-2xl p-2 sm:px-4 sm:py-2 flex flex-wrap items-center justify-between gap-2 shadow-lg text-xs">
        {/* Left: Project title & Figma Tools icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 font-semibold text-white tracking-wide">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-stone-300">
              NikahPlan Canvas · Live 4-Multiplayer
            </span>
          </div>

          {/* Quick tool selector badges */}
          <div className="hidden md:flex items-center gap-1 bg-stone-900 px-2 py-0.5 rounded-lg border border-stone-800 text-[10px] text-stone-400 font-mono">
            <span className="text-teal-400 flex items-center gap-0.5 font-bold">
              <MousePointer className="w-3 h-3" /> V
            </span>
            <span>·</span>
            <span className="text-amber-400 flex items-center gap-0.5 font-bold">
              <Type className="w-3 h-3" /> T
            </span>
            <span>·</span>
            <span className="text-blue-400 flex items-center gap-0.5 font-bold">
              <LayoutGrid className="w-3 h-3" /> Shift+A
            </span>
          </div>
        </div>

        {/* Center: Active Collaborators Presence Avatars */}
        <div className="flex items-center -space-x-1.5 overflow-hidden py-0.5">
          {COLLABORATORS.map((user) => (
            <div
              key={user.id}
              className={`w-6 h-6 rounded-full border-2 border-stone-900 ${user.avatarBg} text-white text-[9px] font-bold flex items-center justify-center shadow-xs cursor-default`}
              title={`${user.name} (${user.role})`}
            >
              {user.name.charAt(0)}
            </div>
          ))}
          <span className="pl-2 text-[10px] font-mono text-emerald-400 font-medium hidden sm:inline">
            4 Aktif Bersamaan
          </span>
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
            <span>Hasil Undangan</span>
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
            className="h-full bg-linear-to-r from-teal-500 via-amber-500 to-purple-500 transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[9px] font-mono text-stone-400 mt-1 px-0.5">
          <span>00:00 · Inisialisasi</span>
          <span className="text-teal-400 font-semibold">{Math.round(progress)}% Selesai Dirakit</span>
          <span>00:14 · Undangan Sempurna</span>
        </div>
      </div>

      {/* Main Work Area: Canvas Frame Ponsel 375px */}
      <div className="relative mx-auto max-w-sm w-full min-h-[580px] p-2 sm:p-0">
        {/* Frame Label Badge di Pojok Atas */}
        <div className="text-[10px] font-mono text-stone-400 font-semibold uppercase tracking-wider mb-1 flex items-center justify-between">
          <span># Mobile Frame · 375 x 812 (NikahPlan-Invitation)</span>
          <span className="text-[9px] text-stone-400 font-mono">Zoom: 100%</span>
        </div>

        {/* Center Vertical Smart Guide (Figma Magenta Guide) */}
        {(windiCursor.isActiveOnElement || budiCursor.isActiveOnElement || isAutoLayoutActive) && (
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-pink-500 z-30 pointer-events-none opacity-80" />
        )}

        {/* Horizontal Alignment Guide during Auto-Layout */}
        {isAutoLayoutActive && (
          <>
            <div className="absolute left-0 right-0 top-[28%] h-[1px] bg-pink-500/70 z-30 pointer-events-none" />
            <div className="absolute left-0 right-0 top-[48%] h-[1px] bg-pink-500/70 z-30 pointer-events-none" />
            <div className="absolute left-0 right-0 top-[68%] h-[1px] bg-pink-500/70 z-30 pointer-events-none" />
          </>
        )}

        {/* The Mobile Card Itself */}
        <div
          className={`relative w-full bg-[#FAF8F5] rounded-3xl shadow-2xl overflow-hidden min-h-[560px] p-5 flex flex-col justify-between text-center transition-all duration-500 border-2 ${
            rezaCursor.isActiveOnElement === 'canvas' ? 'border-blue-500 shadow-blue-500/20' : 'border-stone-300'
          }`}
        >
          {/* Outer Frame Auto-Layout Label when Reza activates it */}
          {rezaCursor.isActiveOnElement === 'canvas' && (
            <div className="absolute -top-3.5 left-2 bg-blue-600 text-white text-[9px] font-mono px-2 py-0.5 rounded-sm z-30 shadow-xs flex items-center gap-1 animate-in fade-in">
              <span>Reza · Auto-Layout [Shift+A] · Gap 16px</span>
            </div>
          )}

          {/* 1. Header Teks Walimatul 'Urs (Arif's Area) */}
          <div className="relative pt-2">
            {/* Arif's Bounding Box */}
            {arifCursor.isActiveOnElement === 'header' && (
              <div
                className="absolute -inset-1 rounded-lg border-2 pointer-events-none z-20 animate-in fade-in"
                style={{ borderColor: '#0F766E' }}
              >
                <span className="absolute -top-3.5 left-1 text-[8px] font-bold text-white px-1 py-0.2 rounded-xs bg-teal-700 font-mono shadow-xs">
                  Arif · Text: 11px
                </span>
                <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-white border border-teal-800" />
                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white border border-teal-800" />
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white border border-teal-800" />
                <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-white border border-teal-800" />
              </div>
            )}

            <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-teal-800 min-h-[18px]">
              {textWalimatul}
              {progress < 22 && <span className="inline-block w-1.5 h-3 bg-teal-800 ml-0.5 animate-pulse" />}
            </div>
          </div>

          {/* 2. Nama Mempelai Hero & Divider Dot (Windi's Area) */}
          <div className="relative my-2 py-2">
            {/* Windi's Bounding Box */}
            {windiCursor.isActiveOnElement === 'names' && (
              <div
                className="absolute -inset-1.5 rounded-xl border-2 pointer-events-none z-20 animate-in fade-in"
                style={{ borderColor: '#D97706' }}
              >
                <span className="absolute -top-3.5 left-1 text-[8px] font-bold text-white px-1 py-0.2 rounded-xs bg-amber-600 font-mono shadow-xs">
                  Windi · {isCormorantFont ? 'Cormorant 50px' : 'Inter 36px'}
                </span>
                <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-white border border-amber-700" />
                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white border border-amber-700" />
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white border border-amber-700" />
                <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-white border border-amber-700" />
              </div>
            )}

            <h2
              className={`text-stone-900 tracking-tight min-h-[52px] flex items-center justify-center transition-all duration-300 ${
                isCormorantFont ? 'font-serif text-4xl sm:text-5xl font-bold' : 'font-sans text-3xl font-semibold'
              } ${isItalicFont ? 'italic' : ''}`}
            >
              {textNames}
              {progress < 22 && <span className="inline-block w-2 h-7 bg-stone-900 ml-1 animate-pulse" />}
            </h2>

            {/* Botanical Sage Divider Dot */}
            <div className="relative inline-block mt-2">
              {windiCursor.isActiveOnElement === 'dot' && (
                <div className="absolute -inset-1 rounded-full border-2 border-amber-500 pointer-events-none z-20 animate-pulse" />
              )}
              {showDividerDot ? (
                <div className="w-2.5 h-2.5 rounded-full bg-teal-700 mx-auto shadow-xs animate-in zoom-in duration-300" />
              ) : (
                <div className="w-2 h-2 rounded-full border border-dashed border-stone-300 mx-auto" />
              )}
            </div>
          </div>

          {/* 3. Ayat Suci Ar-Rum: 21 (Reza's Area) */}
          <div className="relative my-1">
            {/* Reza's Bounding Box */}
            {rezaCursor.isActiveOnElement === 'verse' && (
              <div
                className="absolute -inset-1 rounded-xl border-2 pointer-events-none z-20 animate-in fade-in"
                style={{ borderColor: '#2563EB' }}
              >
                <span className="absolute -top-3.5 left-1 text-[8px] font-bold text-white px-1 py-0.2 rounded-xs bg-blue-600 font-mono shadow-xs">
                  Reza · Quote Frame
                </span>
                <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-white border border-blue-700" />
                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white border border-blue-700" />
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white border border-blue-700" />
                <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-white border border-blue-700" />
              </div>
            )}

            {showVerseCard ? (
              <div className="bg-[#FAF6F0] rounded-2xl p-2.5 border border-stone-200/80 shadow-xs transition-all">
                <Heart className="w-3 h-3 text-teal-700 mx-auto mb-1 opacity-70" />
                <p className="font-serif italic text-[10.5px] text-stone-600 leading-relaxed min-h-[34px]">
                  &ldquo;{textVerse}&rdquo;
                </p>
                {progress >= 42 && (
                  <p className="text-[9px] font-bold uppercase tracking-widest text-teal-800 font-mono mt-1">
                    QS. AR-RUM: 21
                  </p>
                )}
              </div>
            ) : (
              <div className="h-10 border border-dashed border-stone-300 rounded-xl flex items-center justify-center text-[10px] text-stone-400">
                <span>[Frame Quote dalam proses...]</span>
              </div>
            )}
          </div>

          {/* 4. Jadwal Tanggal & Venue (Arif's Area) */}
          <div className="relative my-1">
            {/* Arif's Bounding Box on Schedule */}
            {arifCursor.isActiveOnElement === 'schedule' && (
              <div
                className="absolute -inset-1 rounded-xl border-2 pointer-events-none z-20 animate-in fade-in"
                style={{ borderColor: '#0F766E' }}
              >
                <span className="absolute -top-3.5 left-1 text-[8px] font-bold text-white px-1 py-0.2 rounded-xs bg-teal-700 font-mono shadow-xs">
                  Arif · Schedule Pill
                </span>
              </div>
            )}

            <div className="bg-stone-100 rounded-xl py-1.5 px-3 border border-stone-200 text-stone-700">
              <p className="text-[11px] font-mono font-medium tracking-wide">
                {textDetails}
                {progress >= 24 && progress < 48 && (
                  <span className="inline-block w-1.5 h-2.5 bg-stone-700 ml-0.5 animate-pulse" />
                )}
              </p>
            </div>
          </div>

          {/* 5. Komponen Amplop Digital & QRIS (Budi's Area) */}
          <div className="relative mt-2">
            {/* Budi's Bounding Box on Envelope / QRIS */}
            {(budiCursor.isActiveOnElement === 'envelope' || budiCursor.isActiveOnElement === 'qris') && (
              <div
                className="absolute -inset-1.5 rounded-2xl border-2 pointer-events-none z-20 animate-in fade-in"
                style={{ borderColor: '#7C3AED' }}
              >
                <span className="absolute -top-3.5 left-1 text-[8px] font-bold text-white px-1 py-0.2 rounded-xs bg-purple-600 font-mono shadow-xs">
                  Budi · {budiCursor.isActiveOnElement === 'qris' ? 'QRIS Component' : 'Digital Envelope'}
                </span>
                <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-white border border-purple-800" />
                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-white border border-purple-800" />
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white border border-purple-800" />
                <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-white border border-purple-800" />
              </div>
            )}

            {showEnvelopeCard ? (
              <div className="bg-white rounded-2xl p-2.5 border border-stone-200 shadow-xs text-left text-xs transition-all animate-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center justify-between text-teal-800 font-bold mb-1">
                  <span className="flex items-center gap-1 text-[11px]">
                    <CreditCard className="w-3 h-3" />
                    <span>Amplop Digital &amp; QRIS</span>
                  </span>
                  <span className="text-[9px] text-purple-700 font-mono font-semibold bg-purple-50 px-1.5 py-0.2 rounded-sm border border-purple-200">
                    Auto-Centered
                  </span>
                </div>

                {showQrisBarcode ? (
                  <div className="flex items-center gap-2 mt-1 bg-stone-50 p-1.5 rounded-xl border border-stone-200">
                    <div className="w-8 h-8 bg-teal-800 text-white rounded-lg flex items-center justify-center font-mono font-bold text-[9px] shrink-0">
                      QRIS
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] font-bold text-stone-800 truncate">
                        NikahPlan: {groomNick} &amp; {brideNick}
                      </div>
                      <div className="text-[8px] text-stone-500">Scan QRIS BCA, Mandiri, Gopay, Ovo</div>
                    </div>
                  </div>
                ) : (
                  <p className="text-[10px] text-stone-500">
                    Transfer BCA, Mandiri &amp; scan QRIS resmi siap digunakan.
                  </p>
                )}
              </div>
            ) : isDraggingEnvelope ? (
              <div className="h-14 border-2 border-dashed border-purple-400 bg-purple-50/50 rounded-2xl flex items-center justify-center text-[10px] text-purple-700 font-mono animate-pulse">
                <span>[Budi: Dragging DigitalEnvelope.fig ke Kanvas...]</span>
              </div>
            ) : (
              <div className="h-12 border border-dashed border-stone-300 rounded-2xl flex items-center justify-center text-[10px] text-stone-400">
                <span>Area Amplop Digital &amp; QRIS</span>
              </div>
            )}
          </div>

          {/* Selesai / Celebration Footer Notification */}
          {progress >= 95 && (
            <div className="mt-2 p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 animate-in fade-in flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-semibold text-[11px]">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                <span>Undangan Selesai Dirakit Berempat!</span>
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
        {/* 4 CURSORS SIMULTANEOUS MULTIPLAYER OVERLAYS (BERGERAK BEBARENGAN) */}
        {/* ========================================================================= */}

        {/* Cursor 1: Arif (Mempelai Pria - Teal) */}
        <div
          className="absolute z-40 pointer-events-none transition-all duration-300 ease-out flex flex-col items-start"
          style={{
            left: `${arifCursor.x}%`,
            top: `${arifCursor.y}%`,
          }}
        >
          {/* Click Ripple Pulse */}
          {arifCursor.isClicking && (
            <div className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full border-2 border-teal-400 bg-teal-400/20 animate-ping pointer-events-none" />
          )}

          {/* Figma Arrow */}
          <svg className="w-5 h-5 drop-shadow-md" viewBox="0 0 24 24" fill="#0F766E" stroke="white" strokeWidth="1.5">
            <path d="M5.5 3.5l14 7-6.5 2-2 6.5-5.5-15.5z" />
          </svg>

          {/* Badge Tag */}
          <div className="text-[9px] font-bold text-white px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap ml-3 -mt-1 bg-teal-700 flex items-center gap-1">
            <span>Arif (Mempelai)</span>
          </div>

          {/* Floating Action Property Pill */}
          <div className="bg-[#1E1E1E]/95 text-stone-200 text-[9px] px-2 py-0.5 rounded-md shadow-md mt-0.5 ml-3 font-mono border border-stone-700 whitespace-nowrap animate-in fade-in">
            <span>{arifCursor.action}</span>
          </div>
        </div>

        {/* Cursor 2: Windi (Mempelai Wanita - Amber) */}
        <div
          className="absolute z-40 pointer-events-none transition-all duration-300 ease-out flex flex-col items-start"
          style={{
            left: `${windiCursor.x}%`,
            top: `${windiCursor.y}%`,
          }}
        >
          {/* Click Ripple Pulse */}
          {windiCursor.isClicking && (
            <div className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full border-2 border-amber-400 bg-amber-400/20 animate-ping pointer-events-none" />
          )}

          {/* Figma Arrow */}
          <svg className="w-5 h-5 drop-shadow-md" viewBox="0 0 24 24" fill="#D97706" stroke="white" strokeWidth="1.5">
            <path d="M5.5 3.5l14 7-6.5 2-2 6.5-5.5-15.5z" />
          </svg>

          {/* Badge Tag */}
          <div className="text-[9px] font-bold text-white px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap ml-3 -mt-1 bg-amber-600 flex items-center gap-1">
            <span>Windi (Mempelai)</span>
          </div>

          {/* Floating Action Property Pill */}
          <div className="bg-[#1E1E1E]/95 text-stone-200 text-[9px] px-2 py-0.5 rounded-md shadow-md mt-0.5 ml-3 font-mono border border-stone-700 whitespace-nowrap animate-in fade-in">
            <span>{windiCursor.action}</span>
          </div>
        </div>

        {/* Cursor 3: Budi Santoso (Best Man - Purple) */}
        <div
          className="absolute z-40 pointer-events-none transition-all duration-300 ease-out flex flex-col items-start"
          style={{
            left: `${budiCursor.x}%`,
            top: `${budiCursor.y}%`,
          }}
        >
          {/* Click Ripple Pulse */}
          {budiCursor.isClicking && (
            <div className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full border-2 border-purple-400 bg-purple-400/20 animate-ping pointer-events-none" />
          )}

          {/* Figma Arrow */}
          <svg className="w-5 h-5 drop-shadow-md" viewBox="0 0 24 24" fill="#7C3AED" stroke="white" strokeWidth="1.5">
            <path d="M5.5 3.5l14 7-6.5 2-2 6.5-5.5-15.5z" />
          </svg>

          {/* Badge Tag */}
          <div className="text-[9px] font-bold text-white px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap ml-3 -mt-1 bg-purple-600 flex items-center gap-1">
            <span>Budi Santoso</span>
          </div>

          {/* Floating Action Property Pill */}
          <div className="bg-[#1E1E1E]/95 text-stone-200 text-[9px] px-2 py-0.5 rounded-md shadow-md mt-0.5 ml-3 font-mono border border-stone-700 whitespace-nowrap animate-in fade-in">
            <span>{budiCursor.action}</span>
          </div>
        </div>

        {/* Cursor 4: Reza Pratama (Decorator / Alumni TI - Blue) */}
        <div
          className="absolute z-40 pointer-events-none transition-all duration-300 ease-out flex flex-col items-start"
          style={{
            left: `${rezaCursor.x}%`,
            top: `${rezaCursor.y}%`,
          }}
        >
          {/* Click Ripple Pulse */}
          {rezaCursor.isClicking && (
            <div className="absolute -top-1.5 -left-1.5 w-6 h-6 rounded-full border-2 border-blue-400 bg-blue-400/20 animate-ping pointer-events-none" />
          )}

          {/* Figma Arrow */}
          <svg className="w-5 h-5 drop-shadow-md" viewBox="0 0 24 24" fill="#2563EB" stroke="white" strokeWidth="1.5">
            <path d="M5.5 3.5l14 7-6.5 2-2 6.5-5.5-15.5z" />
          </svg>

          {/* Badge Tag */}
          <div className="text-[9px] font-bold text-white px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap ml-3 -mt-1 bg-blue-600 flex items-center gap-1">
            <span>Reza Pratama</span>
          </div>

          {/* Floating Action Property Pill */}
          <div className="bg-[#1E1E1E]/95 text-stone-200 text-[9px] px-2 py-0.5 rounded-md shadow-md mt-0.5 ml-3 font-mono border border-stone-700 whitespace-nowrap animate-in fade-in">
            <span>{rezaCursor.action}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
