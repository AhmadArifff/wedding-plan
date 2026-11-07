'use client';

import * as React from 'react';
import {
  Heart,
  Sparkles,
  ArrowRight,
  Music,
  Camera,
  Gift,
  Smile,
  Flower2,
  Calendar,
  MessageCircleHeart,
  Volume2,
} from 'lucide-react';
import { formatRupiah } from '@nikahplan/ui';
import type { BudgetItem } from '@nikahplan/db';
import type { DashboardThemeConfig } from '../../config/themes';

export interface ThemeKoreanViewProps {
  themeConfig: DashboardThemeConfig;
  budgetItems: BudgetItem[];
  totalEstimated: number;
  onNavigateTab: (tab: any) => void;
  onSyncGold: () => void;
}

export const ThemeKoreanView: React.FC<ThemeKoreanViewProps> = ({
  themeConfig,
  budgetItems,
  totalEstimated,
  onNavigateTab,
}) => {
  const [isPlayingBgm, setIsPlayingBgm] = React.useState(false);

  return (
    <div className="space-y-6">
      {/* 1. Header Banner Korean Atelier dengan Story Pills & D-Day */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#FFF0F3] via-[#FFEBF0] to-[#F1F6F0] border border-[#F7D1D9] shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-[#F7D1D9] text-xs font-semibold text-[#E86A82] shadow-2xs">
              <Flower2 className="w-3.5 h-3.5 text-[#E86A82]" />
              <span>Sweet Korean Wedding Atelier · D-372 Menuju Hari H</span>
            </div>

            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight text-[#2D2A2A]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Kisah Cinta Manis Arif &amp; Windi
            </h2>

            <p className="text-xs text-[#7E7676] leading-relaxed">
              Mempersiapkan hari bahagia dengan senyuman hangat, buket kawat bulu pastel, dekorasi fairy lights, dan keteraturan finansial terukur.
            </p>

            {/* BGM Mini Player Pill */}
            <div className="pt-1 flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setIsPlayingBgm(!isPlayingBgm)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#F7D1D9] text-xs font-semibold text-[#E86A82] hover:bg-[#FFF0F3] transition-colors cursor-pointer shadow-2xs"
              >
                <Music className="w-3.5 h-3.5" />
                <span>{isPlayingBgm ? '🎵 Memutar: Beautiful in White' : '▶ Putar BGM Suasana'}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('invite')}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#E86A82] hover:bg-[#D6536C] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                <span>Lihat Undangan Digital Pastel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* D-Day Circular Ring Badge */}
          <div className="p-4 rounded-3xl bg-white/90 border border-[#F7D1D9] shadow-xs text-center shrink-0 space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#A8C3A0] block font-mono">
              WEDDING D-DAY
            </span>
            <div className="text-3xl font-serif font-bold text-[#E86A82]">
              D - 372
            </div>
            <span className="text-[10px] text-stone-400 block font-mono">14 November 2027</span>
          </div>
        </div>
      </div>

      {/* 2. Slicing Asimetris Korean Soft Bento Grid (4 Kartu) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-start">
        {/* KARTU 1 (7 Kolom): Love Story & Foto Prewedding Mini Frame */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-[#F7D1D9] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-2xl bg-[#FFF0F3] text-[#E86A82] flex items-center justify-center">
                <Camera className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#2D2A2A]">
                  Galeri &amp; Konsep Prewedding
                </h3>
                <p className="text-[10px] text-[#7E7676]">Konsep Studio Korea &amp; Outdoor Hutan Pinus</p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F1F6F0] text-[#1F3E1A] font-bold font-mono">
              Selesai Sesi 1
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-[#FFF9F7] border border-[#F7D1D9]/70 space-y-1.5">
              <span className="text-[10px] font-bold text-[#E86A82] uppercase tracking-wider block">
                Look 1: Clean Minimalist
              </span>
              <p className="text-xs text-stone-700 leading-tight">
                Jas beige krem modern &amp; gaun satin sutra putih sederhana dengan buket kawat bulu tulip.
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-[#F1F6F0] border border-[#A8C3A0]/60 space-y-1.5">
              <span className="text-[10px] font-bold text-[#1F3E1A] uppercase tracking-wider block">
                Look 2: Hanbok &amp; Adat
              </span>
              <p className="text-xs text-stone-700 leading-tight">
                Perpaduan sentuhan pastel Hanbok modern dengan lurik tradisional Jogja yang teduh.
              </p>
            </div>
          </div>

          {/* Pos Anggaran Favorit */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-stone-800 block">Pos Anggaran Lucu &amp; Detail</span>
            {budgetItems.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-2.5 rounded-2xl bg-[#FFF9F7] border border-[#F7D1D9]/50 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E86A82]" />
                  <span className="font-semibold text-stone-800">{item.itemName}</span>
                </div>
                <span className="font-mono font-bold text-[#E86A82]">{formatRupiah(item.totalPrice)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* KARTU 2 (5 Kolom): Ucapan Doa Manis & Hadiah Impian (Wedding Registry) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Kotak Ucapan Masuk Tamu */}
          <div className="bg-white rounded-3xl p-5 border border-[#F7D1D9] shadow-xs space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-2xl bg-[#FFF0F3] text-[#E86A82] flex items-center justify-center">
                  <MessageCircleHeart className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[#2D2A2A]">
                  Ucapan Doa Masuk
                </h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFF0F3] text-[#E86A82] font-bold font-mono">
                Terbaru
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-2xl bg-[#FFF9F7] border border-[#F7D1D9]/60 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-[#2D2A2A]">Siti &amp; Keluarga</strong>
                  <span className="text-[10px] text-stone-400">10m lalu</span>
                </div>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  &ldquo;Selamat ya Arif &amp; Windi! Masya Allah seneng banget dengar kabarnya, semoga lancar sampai hari H! ♡&rdquo;
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#F1F6F0] border border-[#A8C3A0]/60 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-[#1F3E1A]">Rian Saputra</strong>
                  <span className="text-[10px] text-stone-400">1 jam lalu</span>
                </div>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  &ldquo;Bismillah siap hadir di Pendopo! Jangan lupa jaga kesehatan ya kalian berdua. ✨&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Kotak Hadiah & Kado Rumah Tangga */}
          <div className="bg-[#FFF8F0] rounded-3xl p-5 border border-[#FED7AA] shadow-xs space-y-2.5">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#EA580C]" />
              <h4 className="font-bold text-sm text-[#7C2D12]">
                Wedding Registry &amp; Hadiah Impian
              </h4>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Tamu dapat memilih kado perlengkapan rumah baru atau tanda kasih digital QRIS yang tertera pada undangan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
