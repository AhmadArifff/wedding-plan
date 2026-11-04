'use client';

import * as React from 'react';
import { Utensils, Users, TrendingDown, RefreshCw, Check } from 'lucide-react';
import { formatPureNumeric, formatRupiah } from '@nikahplan/ui';
import type { KitchenItem } from '@nikahplan/db';

export interface KitchenCalculatorProps {
  initialGuestCount?: number;
  initialPortions?: number;
  ingredients: KitchenItem[];
  onSyncToBudget?: (totalCost: number) => void;
}

export const KitchenCalculator: React.FC<KitchenCalculatorProps> = ({
  initialGuestCount = 300,
  initialPortions = 600,
  ingredients: initialIngredients,
  onSyncToBudget,
}) => {
  const [guestCount, setGuestCount] = React.useState(initialGuestCount);
  const [ingredients] = React.useState(initialIngredients);
  const [isSynced, setIsSynced] = React.useState(false);

  // Rasio 2x porsi
  const portions = guestCount * 2;

  // Skala bahan pokok berdasarkan porsi baru relatif terhadap 600 porsi default
  const scaleRatio = portions / 600;

  const scaledIngredients = React.useMemo(() => {
    return ingredients.map((item) => {
      const scaledQty = Math.round(item.quantity * scaleRatio * 10) / 10;
      const subtotal = Math.round(scaledQty * item.unitPrice);
      return {
        ...item,
        scaledQty: scaledQty || 1,
        scaledSubtotal: subtotal,
      };
    });
  }, [ingredients, scaleRatio]);

  const totalKitchenCost = React.useMemo(() => {
    return scaledIngredients.reduce((acc, curr) => acc + curr.scaledSubtotal, 0);
  }, [scaledIngredients]);

  const costPerPortion = portions > 0 ? Math.round(totalKitchenCost / portions) : 0;
  const costPerGuest = guestCount > 0 ? Math.round(totalKitchenCost / guestCount) : 0;

  // Komparasi dengan Katering Prasmanan Vendor (Asumsi Rp 48.000/porsi)
  const cateringEstimate = portions * 48000;
  const potentialSavings = cateringEstimate - totalKitchenCost;

  const handleSync = () => {
    onSyncToBudget?.(totalKitchenCost);
    setIsSynced(true);
    setTimeout(() => setIsSynced(false), 3000);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
      {/* Header Panel */}
      <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50/70">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 font-serif">
                Kalkulator Dapur Mandiri (7 Bahan Pokok)
              </h3>
              <p className="text-xs text-stone-500">
                Formula aman rasio 2 porsi per undangan untuk memasak mandiri oleh panitia/keluarga.
              </p>
            </div>
          </div>

          {/* Sync Button (Kendali Penuh Pengguna) */}
          <button
            type="button"
            onClick={handleSync}
            className={`min-h-[40px] inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isSynced
                ? 'bg-emerald-600 text-white'
                : 'bg-teal-700 hover:bg-teal-800 text-white active:scale-95'
            }`}
          >
            {isSynced ? (
              <>
                <Check className="w-4 h-4" />
                <span>Tersinkron ke Anggaran!</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                <span>Sinkron ke Master Anggaran</span>
              </>
            )}
          </button>
        </div>

        {/* Input Pengaturan Jumlah Tamu & Porsi */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white p-3 rounded-xl border border-stone-200 flex items-center justify-between">
            <div>
              <label htmlFor="guestCountInput" className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                Jumlah Undangan:
              </label>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Users className="w-4 h-4 text-teal-700" />
                <input
                  id="guestCountInput"
                  type="number"
                  min="50"
                  max="3000"
                  step="25"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Math.max(1, Number(e.target.value)))}
                  className="font-mono font-bold text-stone-900 text-base w-24 border-b border-dashed border-stone-300 focus:outline-hidden focus:border-teal-700"
                />
                <span className="text-xs text-stone-600 font-medium">Tamu</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-stone-200">
            <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
              Total Porsi (2x Rasio):
            </span>
            <div className="font-mono font-bold text-teal-800 text-lg mt-0.5">
              {formatPureNumeric(portions)} <span className="text-xs font-sans font-normal text-stone-500">Porsi</span>
            </div>
          </div>

          <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
                Potensi Penghematan:
              </span>
              <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="font-mono font-bold text-emerald-800 text-lg mt-0.5">
              {formatRupiah(potentialSavings)}
            </div>
            <span className="text-[10px] text-emerald-600">
              Dibanding vendor katering prasmanan
            </span>
          </div>
        </div>
      </div>

      {/* Tabel 7 Bahan Pokok (Single Table Pure Numeric) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse min-w-[620px]">
          <thead>
            <tr className="bg-stone-100/90 text-stone-700 font-semibold border-b border-stone-200 uppercase tracking-wider text-[11px]">
              <th className="py-2.5 px-4">Nama Bahan Pokok</th>
              <th className="py-2.5 px-3 text-center">Standar Rasio</th>
              <th className="py-2.5 px-3 text-right">Kebutuhan</th>
              <th className="py-2.5 px-3 text-right">Harga Satuan (Rp)</th>
              <th className="py-2.5 px-4 text-right">Subtotal (Rp)</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-100">
            {scaledIngredients.map((item) => (
              <tr key={item.id} className="hover:bg-amber-50/20 transition-colors">
                <td className="py-2.5 px-4">
                  <div className="font-semibold text-stone-900">{item.ingredientName}</div>
                  {item.notes && <div className="text-[10px] text-stone-500">{item.notes}</div>}
                </td>
                <td className="py-2.5 px-3 text-center font-mono text-stone-600">
                  {item.quantity / 600} {item.unitLabel} / porsi
                </td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-stone-900">
                  {item.scaledQty} {item.unitLabel}
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-stone-700">
                  {formatPureNumeric(item.unitPrice)}
                </td>
                <td className="py-2.5 px-4 text-right font-mono font-bold text-stone-900">
                  {formatPureNumeric(item.scaledSubtotal)}
                </td>
              </tr>
            ))}
          </tbody>

          {/* Sticky Total Dapur */}
          <tfoot>
            <tr className="bg-teal-900 text-white font-bold text-xs">
              <td colSpan={3} className="py-3 px-4">
                TOTAL BELANJA DAPUR MANDIRI ({portions} Porsi)
              </td>
              <td className="py-3 px-3 text-right text-stone-300 font-mono text-[11px]">
                {formatPureNumeric(costPerPortion)}/porsi
              </td>
              <td className="py-3 px-4 text-right font-mono text-amber-300 text-sm">
                {formatPureNumeric(totalKitchenCost)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
