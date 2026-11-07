'use client';

import * as React from 'react';
import { MailOpen, Sparkles } from 'lucide-react';

export interface WaxSealEnvelopeCoverProps {
  groomNick: string;
  brideNick: string;
  weddingDateFormatted: string;
  guestName?: string;
  isOpen: boolean;
  onOpen: () => void;
}

export const WaxSealEnvelopeCover: React.FC<WaxSealEnvelopeCoverProps> = ({
  groomNick,
  brideNick,
  weddingDateFormatted,
  guestName = 'Tamu Undangan',
  isOpen,
  onOpen,
}) => {
  const [isAnimating, setIsAnimating] = React.useState(false);

  const handleOpenClick = () => {
    setIsAnimating(true);
    // Jalankan urutan animasi: Wax seal break -> Flap opens -> Letter rises -> Fade out cover
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  if (isOpen) return null;

  const initials = `${groomNick.trim().charAt(0) || 'A'} & ${brideNick.trim().charAt(0) || 'W'}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#FAF8F5] select-none overflow-hidden transition-all duration-1000 ease-in-out ${
        isAnimating ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 40%, #FFFDF8 0%, #EFE7E0 100%)',
      }}
    >
      <div className="w-full max-w-sm flex flex-col items-center text-center">
        {/* Header Pembuka */}
        <div className="mb-6 space-y-1">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-teal-800">
            THE WEDDING OF
          </span>
          <h1 className="font-serif italic text-4xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            {groomNick} &amp; {brideNick}
          </h1>
          <p className="text-xs text-stone-500 font-mono tracking-wider uppercase">
            {weddingDateFormatted}
          </p>
        </div>

        {/* Bentuk Amplop Surat Fisik dengan Flap & Wax Seal */}
        <div className="relative w-72 sm:w-80 h-52 bg-stone-100 rounded-2xl shadow-2xl border border-stone-300 overflow-hidden flex flex-col justify-end p-4">
          {/* Latar Belakang Tekstur Kertas Amplop Bagian Dalam */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F2EAE1] to-[#E3D6C8] opacity-95" />

          {/* Lipatan Segitiga Amplop Belakang / Atas */}
          <div
            className="absolute top-0 left-0 right-0 h-28 bg-[#D8CABE] border-b border-stone-300/80 transition-transform duration-700 origin-top shadow-xs z-10"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              transform: isAnimating ? 'rotateX(180deg)' : 'rotateX(0deg)',
            }}
          />

          {/* Kertas Surat di Dalam Amplop yang Meluncur Naik saat Buka */}
          <div
            className={`absolute left-4 right-4 bg-white rounded-t-xl p-3 shadow-md border border-stone-200 transition-all duration-700 ease-out text-center z-5 ${
              isAnimating
                ? '-translate-y-20 opacity-100 scale-100'
                : 'translate-y-20 opacity-0 pointer-events-none scale-95'
            }`}
          >
            <span className="text-[10px] text-teal-800 uppercase tracking-widest font-semibold">
              Walimatul 'Urs
            </span>
            <div className="font-serif italic text-sm font-bold text-stone-900">
              {groomNick} &amp; {brideNick}
            </div>
          </div>

          {/* Saku Depan Amplop Fisik yang Menutup Rapi Bagian Bawah Kertas */}
          <div
            className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#E6DACF] to-[#EFE5DB] border-t border-stone-300/60 shadow-xs z-15 pointer-events-none"
            style={{
              clipPath: 'polygon(0 40%, 50% 16%, 100% 40%, 100% 100%, 0 100%)',
            }}
          />

          {/* Wax Seal Segel Lilin Emas di Tengah Flap */}
          <div
            onClick={handleOpenClick}
            className={`relative z-30 mx-auto -mt-10 mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 border-2 border-amber-400 shadow-xl flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-105 active:scale-95 ${
              isAnimating ? 'scale-125 opacity-0 rotate-45' : ''
            }`}
            title="Klik Segel Lilin untuk Membuka Undangan"
          >
            <div className="w-12 h-12 rounded-full border border-dashed border-amber-300/60 flex flex-col items-center justify-center text-amber-100 font-serif font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 mb-0.5" />
              <span>{initials}</span>
            </div>
          </div>

          {/* Kartu Kepada Yth */}
          <div className="relative z-25 bg-white/95 backdrop-blur-xs rounded-xl p-2.5 border border-stone-200/90 text-xs shadow-xs">
            <span className="text-[10px] text-stone-500 block">Kepada Yth. Bapak/Ibu/Saudara/i:</span>
            <strong className="text-stone-900 text-sm block truncate">{guestName}</strong>
          </div>
        </div>

        {/* Tombol Buka Undangan Utama */}
        <div className="mt-6 w-full max-w-xs space-y-3">
          <button
            type="button"
            onClick={handleOpenClick}
            disabled={isAnimating}
            className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white text-sm font-semibold shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50"
          >
            <MailOpen className="w-4 h-4 text-amber-300" />
            <span>{isAnimating ? 'Membuka Surat...' : 'Buka Undangan'}</span>
          </button>
          <p className="text-[11px] text-stone-500">
            Sentuh segel lilin atau tombol di atas untuk membuka surat undangan.
          </p>
        </div>
      </div>
    </div>
  );
};
