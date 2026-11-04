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
  Eye,
  CreditCard,
  QrCode,
} from 'lucide-react';

export interface FigmaCraftingCanvasProps {
  groomNick?: string;
  brideNick?: string;
  weddingDateFormatted?: string;
  venueName?: string;
  onFinishCrafting?: () => void;
}

interface CursorState {
  name: string;
  color: string;
  x: number; // percentage
  y: number; // percentage
  actionLabel?: string;
  isDragging?: boolean;
}

export const FigmaCraftingCanvas: React.FC<FigmaCraftingCanvasProps> = ({
  groomNick = 'Arif',
  brideNick = 'Windi',
  weddingDateFormatted = 'Minggu, 14 November 2027',
  venueName = 'Pendopo Dalem Ngabean, Yogyakarta',
  onFinishCrafting,
}) => {
  // Timeline Step (0: Idle/Prep, 1: Arif Type Walimatul, 2: Windi Craft Names, 3: Divider & Dot, 4: Arif Date/Venue, 5: Budi Drop QRIS, 6: Finished)
  const [step, setStep] = React.useState<number>(1);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(true);

  // Typewriter text progress
  const [textWalimatul, setTextWalimatul] = React.useState('');
  const [textNames, setTextNames] = React.useState('');
  const [textDetails, setTextDetails] = React.useState('');

  // Active designer cursor
  const [activeCursor, setActiveCursor] = React.useState<CursorState>({
    name: 'Arif (Mempelai)',
    color: '#0F766E', // Teal
    x: 48,
    y: 18,
    actionLabel: 'T  Text: Plus Jakarta Sans · 11px',
  });

  // Snapping guides state
  const [showCenterGuide, setShowCenterGuide] = React.useState(false);

  // Auto timeline sequencer
  React.useEffect(() => {
    if (!isPlaying || step > 5) return;

    let timer: ReturnType<typeof setTimeout>;

    if (step === 1) {
      // Step 1: Arif mengetik "WALIMATUL 'URS"
      setActiveCursor({
        name: 'Arif (Mempelai)',
        color: '#0F766E',
        x: 48,
        y: 16,
        actionLabel: 'T  Type: 11px · Spacing 0.25em · #0F766E',
      });
      setShowCenterGuide(true);

      const targetText = "WALIMATUL 'URS";
      let charIdx = 0;
      const typeInterval = setInterval(() => {
        if (charIdx <= targetText.length) {
          setTextWalimatul(targetText.slice(0, charIdx));
          charIdx++;
        } else {
          clearInterval(typeInterval);
          setShowCenterGuide(false);
          timer = setTimeout(() => setStep(2), 700);
        }
      }, 90);

      return () => {
        clearInterval(typeInterval);
        clearTimeout(timer);
      };
    } else if (step === 2) {
      // Step 2: Windi mengetik "Arif & Windi" dengan font serif besar
      setActiveCursor({
        name: 'Windi (Mempelai)',
        color: '#D97706',
        x: 52,
        y: 28,
        actionLabel: 'T  Cormorant Garamond · Italic · 48px',
      });
      setShowCenterGuide(true);

      const targetText = `${groomNick} & ${brideNick}`;
      let charIdx = 0;
      const typeInterval = setInterval(() => {
        if (charIdx <= targetText.length) {
          setTextNames(targetText.slice(0, charIdx));
          charIdx++;
        } else {
          clearInterval(typeInterval);
          setShowCenterGuide(false);
          timer = setTimeout(() => setStep(3), 800);
        }
      }, 100);

      return () => {
        clearInterval(typeInterval);
        clearTimeout(timer);
      };
    } else if (step === 3) {
      // Step 3: Windi menambahkan aksen titik divider bulat di tengah
      setActiveCursor({
        name: 'Windi (Mempelai)',
        color: '#D97706',
        x: 50,
        y: 38,
        actionLabel: '🎨 Fill: #0F766E · Size: 8x8px · Center Align',
      });
      setShowCenterGuide(true);

      timer = setTimeout(() => {
        setShowCenterGuide(false);
        setStep(4);
      }, 1400);

      return () => clearTimeout(timer);
    } else if (step === 4) {
      // Step 4: Arif mengetik tanggal & venue
      setActiveCursor({
        name: 'Arif (Mempelai)',
        color: '#0F766E',
        x: 48,
        y: 46,
        actionLabel: 'T  Date & Venue Details · 13px',
      });
      setShowCenterGuide(true);

      const targetText = `${weddingDateFormatted} · ${venueName}`;
      let charIdx = 0;
      const typeInterval = setInterval(() => {
        if (charIdx <= targetText.length) {
          setTextDetails(targetText.slice(0, charIdx));
          charIdx++;
        } else {
          clearInterval(typeInterval);
          setShowCenterGuide(false);
          timer = setTimeout(() => setStep(5), 900);
        }
      }, 45);

      return () => {
        clearInterval(typeInterval);
        clearTimeout(timer);
      };
    } else if (step === 5) {
      // Step 5: Budi (Bestman) men-drag komponen Amplop Digital & QRIS ke kanvas
      setActiveCursor({
        name: 'Budi (Bestman)',
        color: '#7C3AED',
        x: 50,
        y: 65,
        actionLabel: '📦 Drop Component: DigitalEnvelopeBlock.fig',
        isDragging: true,
      });
      setShowCenterGuide(true);

      timer = setTimeout(() => {
        setShowCenterGuide(false);
        setActiveCursor((prev) => ({
          ...prev,
          actionLabel: '✨ All Layouts Aligned & Snapped!',
          isDragging: false,
        }));
        timer = setTimeout(() => {
          setStep(6);
          onFinishCrafting?.();
        }, 1800);
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [step, isPlaying, groomNick, brideNick, weddingDateFormatted, venueName, onFinishCrafting]);

  const handleSkipAll = () => {
    setTextWalimatul("WALIMATUL 'URS");
    setTextNames(`${groomNick} & ${brideNick}`);
    setTextDetails(`${weddingDateFormatted} · ${venueName}`);
    setStep(6);
    onFinishCrafting?.();
  };

  const handleReplay = () => {
    setTextWalimatul('');
    setTextNames('');
    setTextDetails('');
    setStep(1);
    setIsPlaying(true);
  };

  return (
    <div className="relative w-full min-h-[640px] bg-[#E8E6E3] p-3 sm:p-6 select-none overflow-hidden rounded-3xl border border-stone-300 shadow-xl font-sans">
      {/* Background Dot Grid khas Figma */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#9CA3AF 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* Top Figma Control Bar */}
      <div className="relative z-30 mb-4 bg-stone-900/90 backdrop-blur-md text-white rounded-2xl p-2.5 sm:px-4 sm:py-2.5 flex items-center justify-between shadow-lg border border-stone-700 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono font-semibold tracking-wider uppercase text-[11px] text-stone-200">
            Figma Live Crafting
          </span>
          <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-400 font-mono">
            Step {Math.min(step, 5)}/5
          </span>
        </div>

        {/* Player Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 sm:px-3 sm:py-1 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center gap-1 transition-colors cursor-pointer"
            title={isPlaying ? 'Jeda Animasi' : 'Lanjutkan Animasi'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span className="hidden sm:inline text-[11px]">{isPlaying ? 'Jeda' : 'Putar'}</span>
          </button>

          <button
            type="button"
            onClick={handleReplay}
            className="p-1.5 sm:px-2.5 sm:py-1 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center gap-1 transition-colors cursor-pointer"
            title="Ulangi dari Awal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Ulangi</span>
          </button>

          <button
            type="button"
            onClick={handleSkipAll}
            className="px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-semibold flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer text-[11px]"
          >
            <span>Lewati ke Undangan Jadi</span>
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Frame Kanvas Ponsel (375px Target) di Tengah */}
      <div className="relative mx-auto max-w-sm w-full bg-[#FAF8F5] rounded-3xl shadow-2xl border-2 border-stone-300 overflow-hidden min-h-[520px] p-5 flex flex-col justify-between text-center transition-all">
        {/* Frame Label Badge di Atas Kiri Frame Figma */}
        <div className="absolute -top-6 left-0 text-[10px] font-mono text-stone-500 font-semibold uppercase tracking-wider flex items-center gap-1">
          <span># Mobile Frame · 375 x 812</span>
        </div>

        {/* Smart Snapping Center Guide (Garis Merah Tengah saat Alignment Aktif) */}
        {showCenterGuide && (
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 border-l border-dashed border-rose-500 z-20 pointer-events-none" />
        )}

        {/* 1. Header Teks Walimatul 'Urs */}
        <div className="pt-4 relative">
          {step === 1 && (
            /* Bounding Box Figma Aktif milik Arif */
            <div
              className="absolute -inset-1 rounded-lg border-2 pointer-events-none z-10 transition-all"
              style={{ borderColor: activeCursor.color }}
            >
              <span
                className="absolute -top-3.5 left-1 text-[9px] font-bold text-white px-1.5 py-0.2 rounded-xs"
                style={{ backgroundColor: activeCursor.color }}
              >
                {activeCursor.name}
              </span>
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-stone-600" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-stone-600" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-stone-600" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-stone-600" />
            </div>
          )}

          <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-teal-800 min-h-[18px]">
            {textWalimatul}
            {step === 1 && <span className="inline-block w-1.5 h-3 bg-teal-800 ml-0.5 animate-pulse" />}
          </div>
        </div>

        {/* 2. Nama Mempelai Kaligrafi Editorial */}
        <div className="relative my-auto py-4">
          {step === 2 && (
            /* Bounding Box Figma Aktif milik Windi */
            <div
              className="absolute -inset-2 rounded-xl border-2 pointer-events-none z-10 transition-all"
              style={{ borderColor: activeCursor.color }}
            >
              <span
                className="absolute -top-4 left-1 text-[9px] font-bold text-white px-1.5 py-0.2 rounded-xs"
                style={{ backgroundColor: activeCursor.color }}
              >
                {activeCursor.name}
              </span>
              <div className="absolute -top-1.5 -left-1.5 w-2 h-2 bg-white border border-stone-600" />
              <div className="absolute -top-1.5 -right-1.5 w-2 h-2 bg-white border border-stone-600" />
              <div className="absolute -bottom-1.5 -left-1.5 w-2 h-2 bg-white border border-stone-600" />
              <div className="absolute -bottom-1.5 -right-1.5 w-2 h-2 bg-white border border-stone-600" />
            </div>
          )}

          <h2 className="font-serif italic text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight min-h-[56px] flex items-center justify-center">
            {textNames}
            {step === 2 && <span className="inline-block w-2 h-8 bg-stone-900 ml-1 animate-pulse" />}
          </h2>

          {/* 3. Divider Dot Aksen dari Windi */}
          {step >= 3 && (
            <div className="relative inline-block mt-3">
              {step === 3 && (
                <div
                  className="absolute -inset-1 rounded-full border-2 pointer-events-none z-10"
                  style={{ borderColor: activeCursor.color }}
                />
              )}
              <div className="w-2.5 h-2.5 rounded-full bg-teal-700 mx-auto shadow-xs animate-in zoom-in" />
            </div>
          )}

          {/* 4. Tanggal & Venue dari Arif */}
          {step >= 4 && (
            <div className="relative mt-4">
              {step === 4 && (
                <div
                  className="absolute -inset-1.5 rounded-lg border-2 pointer-events-none z-10"
                  style={{ borderColor: activeCursor.color }}
                >
                  <span
                    className="absolute -top-3.5 left-1 text-[9px] font-bold text-white px-1.5 py-0.2 rounded-xs"
                    style={{ backgroundColor: activeCursor.color }}
                  >
                    {activeCursor.name}
                  </span>
                </div>
              )}
              <p className="text-xs text-stone-600 font-mono tracking-wide">
                {textDetails}
                {step === 4 && <span className="inline-block w-1.5 h-3 bg-stone-700 ml-0.5 animate-pulse" />}
              </p>
            </div>
          )}
        </div>

        {/* 5. Komponen Amplop Digital & QRIS (Drop oleh Budi) */}
        <div className="relative mt-2">
          {step === 5 && (
            <div
              className="absolute -inset-2 rounded-2xl border-2 pointer-events-none z-10 animate-pulse"
              style={{ borderColor: activeCursor.color }}
            >
              <span
                className="absolute -top-4 left-1 text-[9px] font-bold text-white px-1.5 py-0.2 rounded-xs"
                style={{ backgroundColor: activeCursor.color }}
              >
                {activeCursor.name} · Component Drop
              </span>
            </div>
          )}

          {step >= 5 ? (
            <div className="bg-white rounded-2xl p-3 border border-stone-200 shadow-xs text-left text-xs animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between text-teal-800 font-bold mb-1">
                <span className="flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Amplop Digital &amp; QRIS</span>
                </span>
                <span className="text-[10px] text-emerald-700 font-mono font-medium">Auto-Snapped</span>
              </div>
              <p className="text-[11px] text-stone-500">
                Komponen transfer bank BCA, Mandiri &amp; scan QRIS siap digunakan tamu.
              </p>
            </div>
          ) : (
            <div className="h-14 border-2 border-dashed border-stone-200 rounded-2xl flex items-center justify-center text-[11px] text-stone-400">
              <span>Menunggu komponen amplop...</span>
            </div>
          )}
        </div>

        {/* Status Desain Siap */}
        {step >= 6 && (
          <div className="mt-4 p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 animate-in fade-in flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-semibold">
              <CheckCircle className="w-4 h-4 text-emerald-700" />
              <span>Desain Undangan Selesai Dirakit!</span>
            </span>
            <button
              type="button"
              onClick={onFinishCrafting}
              className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-medium text-[11px] cursor-pointer"
            >
              Buka Penuh
            </button>
          </div>
        )}
      </div>

      {/* Kursor Kolaboratif Figma Dinamis yang Melayang */}
      {step < 6 && (
        <div
          className="absolute z-40 pointer-events-none transition-all duration-700 ease-out flex flex-col items-start"
          style={{
            left: `${activeCursor.x}%`,
            top: `${activeCursor.y}%`,
          }}
        >
          {/* Panah Kursor Figma */}
          <svg
            className="w-5 h-5 drop-shadow-md"
            viewBox="0 0 24 24"
            fill={activeCursor.color}
            stroke="white"
            strokeWidth="1.5"
          >
            <path d="M5.5 3.5l14 7-6.5 2-2 6.5-5.5-15.5z" />
          </svg>

          {/* Tag Nama Desainer */}
          <div
            className="text-[10px] font-bold text-white px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap ml-3 -mt-1 flex items-center gap-1"
            style={{ backgroundColor: activeCursor.color }}
          >
            <span>{activeCursor.name}</span>
          </div>

          {/* Floating Figma Property Pill */}
          {activeCursor.actionLabel && (
            <div className="bg-stone-900/90 text-white text-[10px] px-2.5 py-1 rounded-xl shadow-md mt-1 ml-3 font-mono border border-stone-700 flex items-center gap-1 animate-in fade-in">
              <span>{activeCursor.actionLabel}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
