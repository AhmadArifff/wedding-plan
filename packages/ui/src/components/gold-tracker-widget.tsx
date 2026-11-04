import * as React from 'react';
import { cn } from './button';
import { Button } from './button';
import { formatRupiah, formatRupiahDiff, formatGrams } from '../formatters';
import { Sparkles, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';

export interface GoldTrackerWidgetProps {
  marketPricePerGram: number;
  userUnitPrice: number;
  goldWeightGrams: number;
  lastUpdatedDate: string;
  sourceNote?: string;
  onSyncPrice?: () => void;
  className?: string;
}

export const GoldTrackerWidget: React.FC<GoldTrackerWidgetProps> = ({
  marketPricePerGram,
  userUnitPrice,
  goldWeightGrams,
  lastUpdatedDate,
  sourceNote,
  onSyncPrice,
  className,
}) => {
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [isSynced, setIsSynced] = React.useState(false);

  const priceDiffPerGram = marketPricePerGram - userUnitPrice;
  const totalVariance = priceDiffPerGram * goldWeightGrams;

  const handleConfirmSync = () => {
    setIsSynced(true);
    setShowConfirm(false);
    onSyncPrice?.();
    setTimeout(() => setIsSynced(false), 3000);
  };

  return (
    <div
      className={cn(
        'relative bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40 rounded-xl border border-amber-200/90 p-4 transition-all',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-amber-100/90 text-amber-800 rounded-lg">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Acuan Harga Emas Hari Ini
            </h4>
            <p className="text-[11px] text-stone-500">
              Update: {lastUpdatedDate} {sourceNote ? `(${sourceNote})` : ''}
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-sm sm:text-base font-extrabold text-amber-900 tabular-nums">
            {formatRupiah(marketPricePerGram)}
          </span>
          <span className="text-xs text-stone-500 font-medium"> /gram</span>
        </div>
      </div>

      <div className="bg-white/90 rounded-lg border border-amber-100 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="text-stone-500">Item Mahar Anda ({formatGrams(goldWeightGrams)}): </span>
          <span className="font-semibold text-stone-800 tabular-nums">
            {formatRupiah(userUnitPrice)}/gram
          </span>
          <div className="mt-0.5">
            <span className="text-stone-500">Estimasi Selisih Pasar: </span>
            <span
              className={cn(
                'font-bold tabular-nums',
                totalVariance > 0
                  ? 'text-amber-700'
                  : totalVariance < 0
                  ? 'text-teal-700'
                  : 'text-stone-600'
              )}
            >
              {formatRupiahDiff(totalVariance)}
            </span>
          </div>
        </div>

        <div className="relative">
          {!showConfirm ? (
            <Button
              size="sm"
              variant="amber"
              onClick={() => setShowConfirm(true)}
              className="w-full sm:w-auto text-xs py-2 h-auto"
            >
              {isSynced ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-white" />
                  Harga Tersinkron
                </>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5 mr-1" />
                  Sesuaikan ke Harga Emas Hari Ini
                </>
              )}
            </Button>
          ) : (
            <div className="p-3 bg-stone-900 text-white rounded-lg shadow-xl text-xs space-y-2 max-w-xs">
              <p className="leading-snug">
                Perbarui harga Mahar Emas ke <strong>{formatRupiah(marketPricePerGram)}/gram</strong>?
                Anda tetap bisa mengubahnya manual kapan saja.
              </p>
              <div className="flex items-center gap-2 justify-end pt-1">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-2 py-1 text-stone-300 hover:text-white text-[11px]"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmSync}
                  className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-stone-950 font-semibold rounded text-[11px]"
                >
                  Ya, Sesuaikan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

