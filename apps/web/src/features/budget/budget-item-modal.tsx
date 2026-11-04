'use client';

import * as React from 'react';
import { X, Plus, Sparkles, Check, DollarSign, FolderPlus, HelpCircle } from 'lucide-react';
import { formatPureNumeric, formatRupiah } from '@nikahplan/ui';
import type { BudgetCategory, BudgetItem } from '@nikahplan/db';

export interface BudgetItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: BudgetCategory[];
  defaultCategoryId?: string;
  onSaveItem: (item: {
    categoryId: string;
    itemName: string;
    quantity: number;
    unitLabel: string;
    unitPrice: number;
    totalPrice: number;
    isGoldMahar: boolean;
    goldWeightGrams?: number;
    notes?: string;
  }) => void;
  onAddNewCategory?: (categoryName: string, ceilingAmount: number) => void;
  liveGoldPricePerGram?: number;
}

export const BudgetItemModal: React.FC<BudgetItemModalProps> = ({
  isOpen,
  onClose,
  categories,
  defaultCategoryId,
  onSaveItem,
  onAddNewCategory,
  liveGoldPricePerGram = 1420000,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(defaultCategoryId || categories[0]?.id || '');
  const [itemName, setItemName] = React.useState('');
  const [quantity, setQuantity] = React.useState(1);
  const [unitLabel, setUnitLabel] = React.useState('paket');
  const [unitPrice, setUnitPrice] = React.useState(1000000);
  const [isGoldMahar, setIsGoldMahar] = React.useState(false);
  const [goldGrams, setGoldGrams] = React.useState(10);
  const [notes, setNotes] = React.useState('');

  // Mode pembuatan kategori baru
  const [isCreatingNewCategory, setIsCreatingNewCategory] = React.useState(false);
  const [newCatName, setNewCatName] = React.useState('');
  const [newCatCeiling, setNewCatCeiling] = React.useState(5000000);

  // Set default category jika prop berubah
  React.useEffect(() => {
    if (defaultCategoryId) {
      setSelectedCategoryId(defaultCategoryId);
    } else if (categories[0]) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [defaultCategoryId, categories]);

  // Efek jika opsi mahar emas dipilih
  React.useEffect(() => {
    if (isGoldMahar) {
      setItemName('Mahar Emas Logam Mulia Antam');
      setQuantity(goldGrams);
      setUnitLabel('gram');
      setUnitPrice(liveGoldPricePerGram);
    }
  }, [isGoldMahar, goldGrams, liveGoldPricePerGram]);

  if (!isOpen) return null;

  const currentCategory = categories.find((c) => c.id === selectedCategoryId);
  const calculatedTotal = isGoldMahar ? goldGrams * liveGoldPricePerGram : quantity * unitPrice;

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    onAddNewCategory?.(newCatName.trim(), newCatCeiling);
    setIsCreatingNewCategory(false);
    setNewCatName('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim() || !selectedCategoryId) return;

    onSaveItem({
      categoryId: selectedCategoryId,
      itemName: itemName.trim(),
      quantity: isGoldMahar ? goldGrams : quantity,
      unitLabel: isGoldMahar ? 'gram' : unitLabel,
      unitPrice: isGoldMahar ? liveGoldPricePerGram : unitPrice,
      totalPrice: calculatedTotal,
      isGoldMahar,
      goldWeightGrams: isGoldMahar ? goldGrams : undefined,
      notes: notes.trim() || undefined,
    });

    // Reset dan tutup
    setItemName('');
    setNotes('');
    setIsGoldMahar(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div>
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Kelola Item Pengeluaran &amp; Kategori
            </h3>
            <p className="text-xs text-stone-500">
              Satukan kebutuhan pos biaya langsung ke dalam 14 kategori anggaran resmi.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Tutup Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Konten Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* 1. Pemilihan atau Pembuatan Kategori */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                Kategori Anggaran:
              </label>
              <button
                type="button"
                onClick={() => setIsCreatingNewCategory(!isCreatingNewCategory)}
                className="text-[11px] font-semibold text-teal-800 hover:text-teal-900 flex items-center gap-1 cursor-pointer"
              >
                <FolderPlus className="w-3.5 h-3.5" />
                <span>{isCreatingNewCategory ? 'Batal Tambah' : '+ Kategori Baru'}</span>
              </button>
            </div>

            {isCreatingNewCategory ? (
              <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-2xl space-y-2.5">
                <div className="text-xs font-semibold text-teal-900">Buat Kategori Kustom Baru:</div>
                <input
                  type="text"
                  placeholder="Nama Kategori (misal: Biaya Souvenir Tambahan)"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-teal-300 focus:outline-hidden focus:ring-1 focus:ring-teal-700"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Plafon Anggaran (Rp)"
                    value={newCatCeiling}
                    onChange={(e) => setNewCatCeiling(Math.max(0, Number(e.target.value)))}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-teal-300 focus:outline-hidden focus:ring-1 focus:ring-teal-700"
                  />
                  <button
                    type="button"
                    onClick={handleCreateCategory}
                    className="px-3 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-semibold shrink-0 cursor-pointer"
                  >
                    Simpan Kategori
                  </button>
                </div>
              </div>
            ) : (
              <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50/60 font-medium text-stone-900 focus:outline-hidden focus:border-teal-700"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} (Plafon: {formatRupiah(cat.ceilingAmount)})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* 2. Opsi Cepat Mahar Emas (Gold Sync) */}
          <div className="bg-amber-50/60 border border-amber-200/90 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">
                <Sparkles className="w-4 h-4 text-amber-600" />
              </span>
              <div>
                <div className="text-xs font-bold text-stone-900">Pos Mahar Emas Logam Mulia?</div>
                <div className="text-[11px] text-stone-500">
                  Sinkron otomatis dengan harga Antam hari ini ({formatRupiah(liveGoldPricePerGram)}/gr).
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isGoldMahar}
              onChange={(e) => setIsGoldMahar(e.target.checked)}
              className="w-4 h-4 rounded text-teal-700 border-stone-300 focus:ring-teal-700 cursor-pointer"
            />
          </div>

          {/* 3. Detail Item Pengeluaran */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Nama Kebutuhan / Item
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Sewa Busana Pengantin & MUA"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-hidden focus:border-teal-700"
              />
            </div>

            {isGoldMahar ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Berat Emas (Gram)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="0.5"
                    value={goldGrams}
                    onChange={(e) => setGoldGrams(Math.max(0.5, Number(e.target.value)))}
                    className="w-full text-xs font-mono font-bold px-3.5 py-2 rounded-xl border border-stone-200 focus:outline-hidden focus:border-teal-700"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Harga Antam Hari Ini
                  </label>
                  <div className="px-3.5 py-2 bg-stone-100 rounded-xl font-mono text-xs text-stone-800 font-semibold">
                    {formatRupiah(liveGoldPricePerGram)}/gr
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Kuantitas</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-full text-xs font-mono px-3 py-2 rounded-xl border border-stone-200 focus:outline-hidden focus:border-teal-700"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Satuan</label>
                  <input
                    type="text"
                    placeholder="paket / pcs"
                    value={unitLabel}
                    onChange={(e) => setUnitLabel(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-hidden focus:border-teal-700"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">Harga Satuan (Rp)</label>
                  <input
                    type="number"
                    step="10000"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(Math.max(0, Number(e.target.value)))}
                    className="w-full text-xs font-mono px-3 py-2 rounded-xl border border-stone-200 focus:outline-hidden focus:border-teal-700"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Catatan / Spesifikasi Vendor (Opsional)
              </label>
              <textarea
                rows={2}
                placeholder="Spesifikasi bahan, warna, vendor deal..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-stone-200 focus:outline-hidden focus:border-teal-700"
              />
            </div>
          </div>

          {/* 4. Kalkulasi Live Dampak Anggaran */}
          <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200 flex items-center justify-between text-xs">
            <div>
              <span className="text-stone-500 block text-[11px]">Subtotal Biaya Item:</span>
              <span className="font-mono font-bold text-base text-stone-900">
                {formatRupiah(calculatedTotal)}
              </span>
            </div>
            {currentCategory && (
              <div className="text-right">
                <span className="text-stone-500 block text-[11px]">Plafon Kategori:</span>
                <span className="font-mono font-semibold text-teal-800">
                  {formatRupiah(currentCategory.ceilingAmount)}
                </span>
              </div>
            )}
          </div>

          {/* Tombol Simpan */}
          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Simpan ke Anggaran</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
