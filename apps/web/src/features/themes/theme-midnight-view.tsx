'use client';

import * as React from 'react';
import {
  Terminal,
  Activity,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  Zap,
  Lock,
  Wifi,
  Coins,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import { formatRupiah, DUMMY_GOLD_PRICE } from '@nikahplan/ui';
import type { BudgetItem } from '@nikahplan/db';
import type { DashboardThemeConfig } from '../../config/themes';

export interface ThemeMidnightViewProps {
  themeConfig: DashboardThemeConfig;
  budgetItems: BudgetItem[];
  totalEstimated: number;
  onNavigateTab: (tab: any) => void;
  onSyncGold: () => void;
}

export const ThemeMidnightView: React.FC<ThemeMidnightViewProps> = ({
  themeConfig,
  budgetItems,
  totalEstimated,
  onNavigateTab,
  onSyncGold,
}) => {
  return (
    <div className="space-y-6 text-[#F8FAFC]">
      {/* 1. HUD Telemetry Header Bar */}
      <div
        className="rounded-3xl p-6 sm:p-7 border shadow-2xl relative overflow-hidden space-y-4"
        style={{
          background: 'linear-gradient(135deg, #0B0F17 0%, #131B2A 60%, #1E293B 100%)',
          borderColor: 'rgba(245, 158, 11, 0.4)',
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>COMMAND CENTER TELEMETRY · 99.4% FINANCIAL ACCURACY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-mono font-bold text-white tracking-tight">
              Arif &amp; Windi Wedding Operations
            </h2>
            <p className="text-xs text-stone-400 font-mono">
              Target: 2027-11-14 · Location: Pendopo Dalem Ngabean · Escrow: Active · Protocol: Zero-Leak
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateTab('budget')}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-mono font-bold shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              <span>Buka Ledger Matrix</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateTab('invite')}
              className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2"
            >
              <Activity className="w-4 h-4" />
              <span>Swarm Engine</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Slicing Khusus Midnight Command (Console Grid 7 / 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Kolom Kiri: Financial Ledger Telemetry Terminal */}
        <div className="lg:col-span-7 space-y-6">
          <div
            className="p-5 rounded-3xl border shadow-xl space-y-4"
            style={{
              backgroundColor: '#131B2A',
              borderColor: 'rgba(245, 158, 11, 0.3)',
            }}
          >
            <div className="flex items-center justify-between pb-2 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-400" />
                <h3 className="font-mono font-bold text-sm text-white">
                  LIVE BUDGET ALLOCATION MATRIX
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                ● 14 NODES ACTIVE
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {budgetItems.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-[#0F172A] border border-stone-800 flex items-center justify-between gap-3 hover:border-amber-500/40 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="text-white font-bold truncate flex items-center gap-1.5">
                      <Lock className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>{item.itemName}</span>
                    </div>
                    <span className="text-[10px] text-stone-500">
                      {item.quantity} {item.unitLabel} · SRC: {item.priceSource}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-amber-300 font-bold">{formatRupiah(item.totalPrice)}</div>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-stone-800 text-stone-400">
                      ALLOCATED
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Live Gold Ticker & Guest Telemetry Stream */}
        <div className="lg:col-span-5 space-y-6">
          {/* Gold Ingot Telemetry Card */}
          <div
            className="p-5 rounded-3xl border shadow-xl space-y-3.5"
            style={{
              backgroundColor: '#131B2A',
              borderColor: 'rgba(245, 158, 11, 0.3)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-400" />
                <h4 className="font-mono font-bold text-sm text-white">
                  ANTAM GOLD SPOT TELEMETRY
                </h4>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                ▲ +5.18%
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0F172A] border border-amber-500/20 space-y-1">
              <div className="text-xs text-stone-400 font-mono">SPOT ACUAN RESMI HARI INI:</div>
              <div className="text-2xl font-mono font-bold text-amber-300">
                {formatRupiah(DUMMY_GOLD_PRICE.pricePerGram)} <span className="text-xs text-stone-400 font-normal">/ gram</span>
              </div>
              <div className="text-[10px] text-stone-500 font-mono">
                Item Mahar: 10 Gram (Surplus Nilai: +Rp 700.000)
              </div>
            </div>

            <button
              type="button"
              onClick={onSyncGold}
              className="w-full py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/50 text-amber-300 text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>EKSEKUSI SINKRONISASI HARGA EMAS</span>
            </button>
          </div>

          {/* Guest Inflow & QRIS Stream Card */}
          <div
            className="p-5 rounded-3xl border shadow-xl space-y-3"
            style={{
              backgroundColor: '#131B2A',
              borderColor: 'rgba(245, 158, 11, 0.3)',
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-white">LIVE RSVP &amp; QRIS STREAM</span>
              <span className="text-[10px] font-mono text-stone-400">LISTEN PORT: 3001</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-[#0F172A] border border-stone-800 flex items-center justify-between">
                <span className="text-stone-300">Total Tamu Diundang</span>
                <strong className="text-white">300 Tamu (600 Pax)</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0F172A] border border-stone-800 flex items-center justify-between">
                <span className="text-stone-300">RSVP Confirmed</span>
                <strong className="text-emerald-400">48 Tamu (96 Pax)</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0F172A] border border-stone-800 flex items-center justify-between">
                <span className="text-stone-300">QRIS Inflow Gate</span>
                <strong className="text-amber-400">BCA &amp; Mandiri Active</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
