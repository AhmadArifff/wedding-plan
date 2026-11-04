'use client';

import * as React from 'react';

export interface VirtualGuestCursor {
  id: string;
  name: string;
  color: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  message?: string;
}

const DEFAULT_VIRTUAL_GUESTS: VirtualGuestCursor[] = [
  { id: '1', name: 'Windi (Mempelai)', color: '#D97706', x: 25, y: 32, message: 'Terima kasih sudah hadir ❤️' },
  { id: '2', name: 'Arif (Mempelai)', color: '#0F766E', x: 65, y: 28, message: 'Mohon doa restunya yaa' },
];

export const FigmaPartyCursors: React.FC = () => {
  const [cursors, setCursors] = React.useState<VirtualGuestCursor[]>(DEFAULT_VIRTUAL_GUESTS);
  const [floatingEmojis, setFloatingEmojis] = React.useState<
    { id: number; emoji: string; x: number; y: number }[]
  >([]);

  // Simulasi gerakan natural kursor seperti multiplayer di Figma
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCursors((prev) =>
        prev.map((c) => {
          // Gerakan random kecil tapi halus (+/- 4% sampai 8%)
          const deltaX = (Math.random() - 0.5) * 8;
          const deltaY = (Math.random() - 0.5) * 8;
          return {
            ...c,
            x: Math.max(10, Math.min(85, c.x + deltaX)),
            y: Math.max(15, Math.min(85, c.y + deltaY)),
          };
        })
      );
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const triggerReaction = (emoji: string) => {
    const newEmoji = {
      id: Date.now() + Math.random(),
      emoji,
      x: 35 + Math.random() * 30, // Area tengah
      y: 75 + Math.random() * 10,
    };
    setFloatingEmojis((prev) => [...prev, newEmoji]);

    // Hapus emoji setelah animasi selesai (2.5s)
    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((item) => item.id !== newEmoji.id));
    }, 2400);
  };

  return (
    <>
      {/* 1. Multiplayer Cursors Layer (Pointer Events None agar tidak mengganggu klik tamu) */}
      <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden select-none">
        {cursors.map((cursor) => (
          <div
            key={cursor.id}
            className="absolute transition-all duration-1000 ease-out flex flex-col items-start"
            style={{
              left: `${cursor.x}%`,
              top: `${cursor.y}%`,
            }}
          >
            {/* SVG Panah Kursor Khas Figma */}
            <svg
              className="w-5 h-5 drop-shadow-md"
              viewBox="0 0 24 24"
              fill={cursor.color}
              stroke="white"
              strokeWidth="1.5"
            >
              <path d="M5.5 3.5l14 7-6.5 2-2 6.5-5.5-15.5z" />
            </svg>

            {/* Label Nama Tamu ala Multiplayer Presence */}
            <div
              className="text-[11px] font-semibold text-white px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap ml-3 -mt-1 flex items-center gap-1"
              style={{ backgroundColor: cursor.color }}
            >
              <span>{cursor.name}</span>
            </div>

            {/* Chat Bubble / Komentar Pop-up singkat jika ada */}
            {cursor.message && (
              <div className="bg-white/95 text-stone-900 border border-stone-200 text-[10px] px-2.5 py-1 rounded-xl shadow-md mt-1 ml-4 font-medium max-w-[140px] leading-tight animate-in fade-in">
                {cursor.message}
              </div>
            )}
          </div>
        ))}

        {/* 2. Floating Party Emojis Melayang ke Atas */}
        {floatingEmojis.map((item) => (
          <div
            key={item.id}
            className="absolute text-2xl animate-float-fade"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* 3. Floating Reaction Bar (Party Mode Picker) di pojok kanan bawah */}
      <div className="fixed bottom-6 right-4 z-40 flex items-center gap-1.5 p-1.5 rounded-full bg-stone-900/85 backdrop-blur-md shadow-xl border border-stone-700">
        <button
          type="button"
          onClick={() => triggerReaction('❤️')}
          className="w-9 h-9 rounded-full hover:bg-white/20 active:scale-90 flex items-center justify-center text-base transition-all cursor-pointer"
          title="Kirim Cinta"
        >
          ❤️
        </button>
        <button
          type="button"
          onClick={() => triggerReaction('🎉')}
          className="w-9 h-9 rounded-full hover:bg-white/20 active:scale-90 flex items-center justify-center text-base transition-all cursor-pointer"
          title="Kirim Party Confetti"
        >
          🎉
        </button>
        <button
          type="button"
          onClick={() => triggerReaction('💍')}
          className="w-9 h-9 rounded-full hover:bg-white/20 active:scale-90 flex items-center justify-center text-base transition-all cursor-pointer"
          title="Kirim Cincin Doa"
        >
          💍
        </button>
        <button
          type="button"
          onClick={() => triggerReaction('✨')}
          className="w-9 h-9 rounded-full hover:bg-white/20 active:scale-90 flex items-center justify-center text-base transition-all cursor-pointer"
          title="Kirim Berkah Sparkles"
        >
          ✨
        </button>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes floatUpFade {
              0% {
                opacity: 1;
                transform: translateY(0) scale(0.8);
              }
              50% {
                opacity: 1;
                transform: translateY(-80px) scale(1.2);
              }
              100% {
                opacity: 0;
                transform: translateY(-160px) scale(1.4);
              }
            }
            .animate-float-fade {
              animation: floatUpFade 2.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            }
          `,
        }}
      />
    </>
  );
};
