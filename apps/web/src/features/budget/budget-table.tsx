'use client';

import * as React from 'react';
import {
  ChevronDown,
  ChevronRight,
  Plus,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { formatPureNumeric, formatRupiahDiff } from '@nikahplan/ui';
import type { BudgetCategory, BudgetItem } from '@nikahplan/db';

export interface BudgetTableProps {
  categories: BudgetCategory[];
  items: BudgetItem[];
  onAddItem?: (categoryId: string) => void;
  onUpdateActual?: (itemId: string, actualCost: number) => void;
}

export const BudgetTable: React.FC<BudgetTableProps> = ({
  categories,
  items,
  onAddItem,
}) => {
  const [collapsedCategories, setCollapsedCategories] = React.useState<Record<string, boolean>>({});
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'unassigned'>('all');

  const toggleCategory = (categoryId: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Filter items berdasarkan kategori & status unassigned
  const filteredCategories = React.useMemo(() => {
    return categories.filter((cat) => {
      if (activeFilter === 'unassigned') {
        return cat.id === 'unassigned' || !cat.masterCategoryId;
      }
      return true;
    });
  }, [categories, activeFilter]);

  // Kalkulasi Total Keseluruhan
  const totals = React.useMemo(() => {
    const totalEst = items.reduce((acc, curr) => acc + curr.totalPrice, 0);
    const totalCeiling = categories.reduce((acc, curr) => acc + curr.ceilingAmount, 0);
    const diff = totalCeiling - totalEst;
    return { totalEst, totalCeiling, diff };
  }, [items, categories]);

  return (
    <div className="w-full bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
      {/* Header Bar Kontrol & Filter */}
      <div className="p-4 border-b border-stone-200 bg-stone-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
            Master Lembar Anggaran 14 Kategori
          </h2>
          <p className="text-xs text-stone-500">
            Nilai nominal disajikan dalam format angka murni (titik ribuan). Kolom selisih berwarna hijau jika hemat, merah jika defisit.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <div className="inline-flex p-1 bg-stone-200/80 rounded-xl text-xs font-medium">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-white text-stone-900 font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Semua ({categories.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('unassigned')}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeFilter === 'unassigned'
                  ? 'bg-white text-stone-900 font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Tanpa Kategori</span>
            </button>
          </div>
        </div>
      </div>

      {/* Single Unified Table Container dengan horizontal scrolling untuk mobile */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-stone-100/80 text-stone-700 font-semibold border-b border-stone-200 text-xs uppercase tracking-wider">
              <th className="py-3 px-4 w-2/5">Item Pengeluaran</th>
              <th className="py-3 px-3 text-center w-28">Kuantitas</th>
              <th className="py-3 px-3 text-right w-32">Harga Satuan (Rp)</th>
              <th className="py-3 px-3 text-right w-32">Subtotal (Rp)</th>
              <th className="py-3 px-3 text-right w-32">Plafon Kategori (Rp)</th>
              <th className="py-3 px-3 text-center w-28">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-200">
            {filteredCategories.map((category) => {
              const isCollapsed = !!collapsedCategories[category.id];
              const categoryItems = items.filter(
                (item) => item.categoryId === category.id
              );
              const catTotal = categoryItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
              const catDiff = category.ceilingAmount - catTotal;
              const isDiffPositive = catDiff >= 0;

              return (
                <React.Fragment key={category.id}>
                  {/* Category Header Row */}
                  <tr
                    onClick={() => toggleCategory(category.id)}
                    className="bg-[#FAF8F5] hover:bg-stone-100/70 transition-colors cursor-pointer select-none border-t-2 border-stone-200"
                  >
                    <td colSpan={2} className="py-2.5 px-4">
                      <div className="flex items-center gap-2">
                        {isCollapsed ? (
                          <ChevronRight className="w-4 h-4 text-stone-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-stone-500" />
                        )}
                        <span className="font-bold text-stone-900 text-xs sm:text-sm">
                          {category.name}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 font-mono">
                          {categoryItems.length} item
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-stone-500 text-xs">
                      Plafon:
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-stone-900">
                      {formatPureNumeric(catTotal)}
                    </td>
                    <td
                      className={`py-2.5 px-3 text-right font-mono font-semibold text-xs ${
                        isDiffPositive ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {formatRupiahDiff(catDiff)}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddItem?.(category.id);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-800 hover:text-teal-900 p-1 rounded-md hover:bg-teal-50 cursor-pointer"
                        title="Tambah Item ke Kategori ini"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Item</span>
                      </button>
                    </td>
                  </tr>

                  {/* Category Items Rows */}
                  {!isCollapsed &&
                    categoryItems.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-amber-50/20 transition-colors text-xs sm:text-sm"
                      >
                        <td className="py-2.5 px-4 pl-9">
                          <div className="flex items-center gap-1.5 font-medium text-stone-900">
                            <span>{item.itemName}</span>
                            {item.isGoldMahar && (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-800">
                                <Sparkles className="w-3 h-3 text-amber-600" />
                                Mahar Emas
                              </span>
                            )}
                          </div>
                          {item.notes && (
                            <div className="text-[11px] text-stone-500 line-clamp-1">
                              {item.notes}
                            </div>
                          )}
                        </td>

                        <td className="py-2.5 px-3 text-center font-mono text-stone-600 text-xs">
                          {item.quantity} {item.unitLabel}
                        </td>

                        <td className="py-2.5 px-3 text-right font-mono text-stone-700">
                          {formatPureNumeric(item.unitPrice)}
                        </td>

                        <td className="py-2.5 px-3 text-right font-mono text-stone-900 font-semibold">
                          {formatPureNumeric(item.totalPrice)}
                        </td>

                        <td className="py-2.5 px-3 text-right font-mono text-stone-400 text-xs">
                          {item.priceSource === 'GOLD_SYNC' ? 'Gold Sync' : 'Tercatat'}
                        </td>

                        <td className="py-2.5 px-3 text-center text-[11px] text-stone-400 font-mono">
                          #{item.id.replace('bi-', '')}
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              );
            })}
          </tbody>

          {/* Sticky Total Summary Footer */}
          <tfoot>
            <tr className="bg-stone-900 text-white font-bold border-t-2 border-stone-950 text-xs sm:text-sm">
              <td className="py-3 px-4">TOTAL KESELURUHAN</td>
              <td className="py-3 px-3 text-center font-mono text-xs text-stone-400">
                {items.length} Item
              </td>
              <td className="py-3 px-3 text-right font-mono text-stone-400 text-xs">
                Plafon: {formatPureNumeric(totals.totalCeiling)}
              </td>
              <td className="py-3 px-3 text-right font-mono text-amber-300">
                {formatPureNumeric(totals.totalEst)}
              </td>
              <td
                className={`py-3 px-3 text-right font-mono text-xs ${
                  totals.diff >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {formatRupiahDiff(totals.diff)}
              </td>
              <td className="py-3 px-3 text-center text-xs text-stone-400">
                {totals.diff >= 0 ? 'Terkendali' : 'Defisit'}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
