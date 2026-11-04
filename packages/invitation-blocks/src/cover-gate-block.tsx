import * as React from 'react';
import { MailOpen } from 'lucide-react';

export interface CoverGateBlockProps {
  groomNick: string;
  brideNick: string;
  weddingDateFormatted: string;
  guestName?: string;
  onOpen: () => void;
  isOpen: boolean;
}

export const CoverGateBlock: React.FC<CoverGateBlockProps> = ({
  groomNick,
  brideNick,
  weddingDateFormatted,
  guestName = 'Tamu Undangan',
  onOpen,
  isOpen,
}) => {
  if (isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col justify-between items-center bg-[#FAF8F5] text-stone-900 p-6 text-center select-none overflow-hidden transition-all duration-700 ease-out"
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 30%, #FFFDF8 0%, #F5EFEB 100%)',
      }}
    >
      {/* Ornamen Atas */}
      <div className="pt-10 flex flex-col items-center">
        <div className="w-12 h-0.5 bg-teal-700 mb-4 rounded-full" />
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-teal-800">
          WALIMATUL 'URS
        </span>
      </div>

      {/* Konten Mempelai */}
      <div className="space-y-4 my-auto">
        <h1 className="font-serif italic text-5xl sm:text-6xl text-stone-900 tracking-tight">
          {groomNick} &amp; {brideNick}
        </h1>
        <div className="w-2 h-2 bg-amber-600 rounded-full mx-auto" />
        <p className="text-xs sm:text-sm font-medium tracking-widest text-stone-600 uppercase">
          {weddingDateFormatted}
        </p>
      </div>

      {/* Kartu Penerima Undangan & Tombol Buka */}
      <div className="w-full max-w-xs space-y-4 pb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3.5 border border-stone-200/90 shadow-sm text-xs">
          <p className="text-stone-500 mb-1">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
          <p className="font-bold text-stone-900 text-sm">{guestName}</p>
        </div>

        <button
          onClick={onOpen}
          className="w-full min-h-[48px] bg-teal-700 hover:bg-teal-800 text-white font-medium text-sm rounded-xl py-3 px-4 shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
        >
          <MailOpen className="w-4 h-4" />
          <span>Buka Undangan</span>
        </button>

        <p className="text-[11px] text-stone-600">
          Mohon maaf apabila ada kesalahan penulisan nama/gelar.
        </p>
      </div>
    </div>
  );
};

