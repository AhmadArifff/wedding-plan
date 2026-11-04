'use client';

import * as React from 'react';
import { Crown, Sparkles, ArrowRight, Clock } from 'lucide-react';

export interface TrialBannerProps {
  daysRemaining?: number;
  trialTotalDays?: number;
  planName?: string;
  onUpgradeClick?: () => void;
}

export const TrialBanner: React.FC<TrialBannerProps> = ({
  daysRemaining = 28,
  trialTotalDays = 30,
  planName = 'Pro Trial NikahPlan',
  onUpgradeClick,
}) => {
  const percentUsed = Math.min(
    100,
    Math.round(((trialTotalDays - daysRemaining) / trialTotalDays) * 100)
  );

  return (
    <aside
      aria-label="Informasi Paket Berlangganan"
      className="w-full bg-gradient-to-r from-stone-900 via-teal-950 to-stone-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-teal-800/40 relative overflow-hidden"
    >
      {/* Background Accent Glow */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
            <Crown className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                {planName}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-teal-900/60 text-teal-300 border border-teal-700/50">
                <Clock className="w-3 h-3" />
                {daysRemaining} Hari Tersisa
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 mt-1">
              Seluruh fitur premium (Master Anggaran 14 Kategori, Gold Sync &amp; Undangan Digital QRIS) aktif sepenuhnya.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:self-center shrink-0">
          <button
            type="button"
            onClick={onUpgradeClick}
            className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Upgrade Pro Lifetime</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar Penggunaan Trial */}
      <div className="mt-3.5 pt-3 border-t border-stone-800/80 flex items-center gap-3 text-[11px] text-stone-400">
        <span>Periode Percobaan:</span>
        <div className="flex-1 h-1.5 bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-amber-500 rounded-full transition-all duration-500"
            style={{ width: `${percentUsed}%` }}
          />
        </div>
        <span className="tabular-nums font-mono font-medium text-stone-300">
          Hari ke-{trialTotalDays - daysRemaining} dari {trialTotalDays}
        </span>
      </div>
    </aside>
  );
};
