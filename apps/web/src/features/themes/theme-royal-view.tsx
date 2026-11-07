'use client';

import * as React from 'react';
import {
  Crown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  GlassWater,
  Shirt,
  Gem,
  Award,
  Users,
  CreditCard,
  QrCode,
  Flame,
} from 'lucide-react';
import { formatRupiah, DUMMY_GOLD_PRICE } from '@nikahplan/ui';
import type { BudgetItem } from '@nikahplan/db';
import type { DashboardThemeConfig } from '../../config/themes';

export interface ThemeRoyalViewProps {
  themeConfig: DashboardThemeConfig;
  budgetItems: BudgetItem[];
  totalEstimated: number;
  onNavigateTab: (tab: any) => void;
  onSyncGold: () => void;
}

export const ThemeRoyalView: React.FC<ThemeRoyalViewProps> = ({
  themeConfig,
  budgetItems,
  totalEstimated,
  onNavigateTab,
  onSyncGold,
}) => {
  return (
    <div className="space-y-6">
      {/* 1. Haute Couture Editorial Magazine Header */}
      <div
        className="rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border shadow-xl"
        style={{
          background: 'linear-gradient(135deg, #2B181E 0%, #3D222B 50%, #4A2E35 100%)',
          borderColor: '#D4AF37',
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-xs font-mono font-bold text-amber-300">
              <Crown className="w-3.5 h-3.5" />
              <span>THE ROYAL WEDDING ATELIER · ISSUE NO. 11/2027</span>
            </div>

            <h2
              className="text-3xl sm:text-5xl font-bold tracking-tight text-[#FDF9F0]"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
            >
              The Grand Vows of Arif &amp; Windi
            </h2>

            <p className="text-xs sm:text-sm text-[#D5C2C7] leading-relaxed font-serif italic max-w-xl">
              &ldquo;Kemewahan abadi terpancar dalam setiap helai benang beludru emas dan tata kelola perjamuan kerajaan yang megah.&rdquo;
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigateTab('budget')}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 text-stone-950 text-xs font-bold shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Periksa Ledger Anggaran Luxury</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('invite')}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-[#D4AF37]/50 text-amber-200 text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>E-Invitation VIP Concierge</span>
              </button>
            </div>
          </div>

          {/* Gold Ingot Sync Badge */}
          <div className="p-4 rounded-2xl bg-black/40 border border-[#D4AF37]/50 backdrop-blur-md shrink-0 space-y-1.5 text-center">
            <span className="text-[10px] text-amber-300 uppercase tracking-widest font-mono block">
              Mahar Logam Mulia 24K
            </span>
            <div className="text-2xl font-bold font-mono text-amber-300">
              {formatRupiah(DUMMY_GOLD_PRICE.pricePerGram * 10)}
            </div>
            <span className="text-[10px] text-stone-400 block font-mono">10 Gram Antam Bersertifikat</span>
          </div>
        </div>
      </div>

      {/* 2. Slicing Khusus Royal Editorial (3 Kolom Magazine Grid: Couture, Ballroom, VIP Concierge) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* KARTU 1: HAUTE COUTURE & ATELIER WARDROBE */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8D399] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#722F37] text-amber-300 flex items-center justify-center">
                <Shirt className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-[#2A171D]" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                Haute Couture &amp; Busana
              </h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold font-mono">
              Fitting 100%
            </span>
          </div>

          <div className="space-y-3 text-xs text-[#4A2E35]">
            <div className="p-3 rounded-2xl bg-[#FAF6F3] border border-[#E8D399]/60 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F37] block">
                Akad Nikah
              </span>
              <strong className="text-stone-900 block text-xs">Beskap Beludru Hitam Bordir Emas</strong>
              <p className="text-[11px] text-stone-500 leading-tight">
                Kain batik Sidomukti prada emas, ronce melati tibo dodo, dan keris warangka ladrang.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-[#FAF6F3] border border-[#E8D399]/60 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#722F37] block">
                Resepsi Agung
              </span>
              <strong className="text-stone-900 block text-xs">Kebaya Beludru Ekor Burgundy Sutra</strong>
              <p className="text-[11px] text-stone-500 leading-tight">
                Paes Ageng Kanigaran Yogyakarta, cunduk mentul 9 kembang goyang emas bertabur permata.
              </p>
            </div>
          </div>
        </div>

        {/* KARTU 2: ROYAL BALLROOM & BANQUET PROTOCOL */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8D399] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#722F37] text-amber-300 flex items-center justify-center">
                <GlassWater className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-[#2A171D]" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                Ballroom &amp; Banquet
              </h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#722F37] text-white font-bold font-mono">
              Pendopo Grand
            </span>
          </div>

          <div className="space-y-3 text-xs text-[#4A2E35]">
            <div className="p-3 rounded-2xl bg-[#FAF6F3] border border-[#E8D399]/60 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900">Perjamuan VIP Table Service</span>
                <span className="text-xs font-mono font-bold text-[#722F37]">120 Kursi</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">
                Pelayanan meja pramusaji berseragam adat Jawa laras madya dengan set piring keramik emas.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-[#FAF6F3] border border-[#E8D399]/60 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900">Live Gamelan Klenengan</span>
                <span className="text-xs font-mono font-bold text-emerald-800">Locked Deal</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">
                Gamelan Kyai Kebo Giro menyambut kedatangan kedua mempelai dengan gending agung.
              </p>
            </div>
          </div>
        </div>

        {/* KARTU 3: VIP GUEST CONCIERGE & QRIS PRESTIGE */}
        <div className="bg-white rounded-3xl p-5 border border-[#E8D399] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#722F37] text-amber-300 flex items-center justify-center">
                <QrCode className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-[#2A171D]" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                VIP Concierge &amp; QRIS
              </h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold font-mono">
              Private
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-2xl bg-[#FAF6F3] border border-[#E8D399]/60 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 text-xs">Amplop Digital QRIS Eksklusif</span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold">BCA Prioritas</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">
                Tamu kehormatan dapat mengirim tanda kasih digital langsung ke rekening escrow terpisah.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-[#FAF6F3] border border-[#E8D399]/60 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 text-xs">Packaging Hardbox Rigid</span>
                <span className="text-[10px] font-mono text-[#722F37] font-bold">Gold Foil Hotprint</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-tight">
                Undangan fisik rigid box berlapis beludru marun dikirimkan khusus untuk 50 tokoh keluarga.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
