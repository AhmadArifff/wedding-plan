'use client';

import * as React from 'react';
import {
  Calendar,
  ExternalLink,
  DollarSign,
  Utensils,
  Store,
  Coins,
  Sparkles,
  Plus,
  Crown,
} from 'lucide-react';
import {
  KpiCard,
  GoldTrackerWidget,
  BottomNav,
  formatRupiah,
  DUMMY_WORKSPACE,
  DUMMY_BUDGET_CATEGORIES,
  DUMMY_BUDGET_ITEMS,
  DUMMY_VENDORS,
  DUMMY_KITCHEN_ITEMS,
  DUMMY_GOLD_PRICE,
  getDummyFinancialSummary,
} from '@nikahplan/ui';
import type { BudgetCategory, BudgetItem, Vendor, VendorStatus } from '@nikahplan/db';
import { Sidebar, type SidebarTab } from '../components/sidebar';
import { TrialBanner } from '../features/trial/trial-banner';
import { BudgetTable } from '../features/budget/budget-table';
import { BudgetItemModal } from '../features/budget/budget-item-modal';
import { KitchenCalculator } from '../features/kitchen/kitchen-calculator';
import { VendorMatrix } from '../features/vendor/vendor-matrix';

export default function PlannerDashboardPage() {
  const [activeTab, setActiveTab] = React.useState<SidebarTab>('budget');
  const [categories, setCategories] = React.useState<BudgetCategory[]>(DUMMY_BUDGET_CATEGORIES);
  const [budgetItems, setBudgetItems] = React.useState<BudgetItem[]>(DUMMY_BUDGET_ITEMS);
  const [vendors, setVendors] = React.useState<Vendor[]>(DUMMY_VENDORS);

  // State Modal Penambahan Item & Kategori Terpadu
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalTargetCategoryId, setModalTargetCategoryId] = React.useState<string | undefined>(undefined);

  const summary = React.useMemo(() => getDummyFinancialSummary(), []);

  // Perhitungan KPI dinamis
  const totalEstimated = React.useMemo(() => {
    return budgetItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
  }, [budgetItems]);

  const dealVendors = React.useMemo(() => {
    return vendors.filter((v) => v.selectionStatus === 'DEAL');
  }, [vendors]);

  const totalDealAmount = React.useMemo(() => {
    return dealVendors.reduce((acc, curr) => acc + curr.quotedPrice, 0);
  }, [dealVendors]);

  const handleOpenAddModal = (categoryId?: string) => {
    setModalTargetCategoryId(categoryId || categories[0]?.id);
    setIsModalOpen(true);
  };

  const handleSaveBudgetItem = (newItemData: {
    categoryId: string;
    itemName: string;
    quantity: number;
    unitLabel: string;
    unitPrice: number;
    totalPrice: number;
    isGoldMahar: boolean;
    goldWeightGrams?: number;
    notes?: string;
  }) => {
    const newItem: BudgetItem = {
      id: `bi-${Date.now()}`,
      workspaceId: DUMMY_WORKSPACE.id,
      categoryId: newItemData.categoryId,
      itemName: newItemData.itemName,
      quantity: newItemData.quantity,
      unitLabel: newItemData.unitLabel,
      unitPrice: newItemData.unitPrice,
      totalPrice: newItemData.totalPrice,
      isGoldMahar: newItemData.isGoldMahar,
      goldWeightGrams: newItemData.goldWeightGrams,
      priceSource: newItemData.isGoldMahar ? 'GOLD_SYNC' : 'MANUAL',
      notes: newItemData.notes,
      updatedAt: new Date().toISOString(),
    };

    setBudgetItems((prev) => [newItem, ...prev]);
  };

  const handleAddNewCategory = (categoryName: string, ceilingAmount: number) => {
    const newCategory: BudgetCategory = {
      id: `bc-custom-${Date.now()}`,
      workspaceId: DUMMY_WORKSPACE.id,
      name: categoryName,
      sortOrder: categories.length + 1,
      ceilingAmount,
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleSyncKitchen = (totalKitchenCost: number) => {
    setBudgetItems((prev) =>
      prev.map((item) => {
        if (item.categoryId === 'bc-cat-04') {
          return { ...item, totalPrice: totalKitchenCost };
        }
        return item;
      })
    );
  };

  const handleVendorStatusChange = (vendorId: string, newStatus: VendorStatus) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === vendorId ? { ...v, selectionStatus: newStatus } : v))
    );
  };

  const handleSyncVendorDeal = (vendor: Vendor) => {
    setBudgetItems((prev) =>
      prev.map((item) => {
        if (item.linkedVendorId === vendor.id) {
          return { ...item, totalPrice: vendor.quotedPrice, priceSource: 'VENDOR_SYNC' };
        }
        return item;
      })
    );
  };

  const handleSyncGold = () => {
    setBudgetItems((prev) =>
      prev.map((item) => {
        if (item.isGoldMahar && item.goldWeightGrams) {
          const newPrice = DUMMY_GOLD_PRICE.pricePerGram;
          return {
            ...item,
            unitPrice: newPrice,
            totalPrice: newPrice * item.goldWeightGrams,
            priceSource: 'GOLD_SYNC',
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col lg:flex-row">
      {/* 1. Sidebar Navigasi Admin Dashboard */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'invite') {
            window.open('http://localhost:3001/v/arif-windi', '_blank');
          } else {
            setActiveTab(tab);
          }
        }}
        trialDaysRemaining={summary.trialDaysRemaining}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-8">
        {/* Top Navbar Header Dashboard */}
        <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3.5 sticky top-0 z-20 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-xl font-bold font-serif text-stone-900 tracking-tight">
                {activeTab === 'overview' && 'Ringkasan Eksekutif & Finansial'}
                {activeTab === 'budget' && 'Master Lembar Anggaran 14 Kategori'}
                {activeTab === 'kitchen' && 'Kalkulator Belanja Dapur Mandiri'}
                {activeTab === 'vendors' && 'Decision Matrix Vendor Pernikahan'}
                {activeTab === 'gold' && 'Live Gold Price Tracker (Antam)'}
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 font-semibold uppercase">
                Aktif
              </span>
            </div>
            <p className="text-xs text-stone-500 hidden sm:block mt-0.5">
              Kelola pernikahan Anda secara terukur, objektif, dan hemat biaya bersama NikahPlan Studio.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {activeTab === 'budget' && (
              <button
                type="button"
                onClick={() => handleOpenAddModal()}
                className="min-h-[38px] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Item / Kategori</span>
              </button>
            )}

            <a
              href="http://localhost:3001/v/arif-windi"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors cursor-pointer"
            >
              <span className="hidden sm:inline">Pratinjau Tamu</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
            </a>
          </div>
        </header>

        {/* Content Container */}
        <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Banner Pro Trial (Sisa 28 Hari) */}
          <TrialBanner
            daysRemaining={summary.trialDaysRemaining}
            trialTotalDays={30}
            planName="NikahPlan Pro Trial (30 Hari)"
          />

          {/* 4 Top KPI Summary Cards */}
          <section aria-label="Ringkasan Finansial Utama" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <KpiCard
              title="Total Estimasi Anggaran"
              amount={totalEstimated}
              subtitle="Plafon 14 Kategori"
              accent="default"
            />
            <KpiCard
              title="Dapur 600 Porsi"
              amount={summary.totalKitchenCost}
              subtitle={`${formatRupiah(summary.kitchenCostPerGuest)} / tamu (300 Tamu)`}
              accent="teal"
            />
            <KpiCard
              title="Vendor Deal Terikat"
              amount={totalDealAmount}
              subtitle={`${dealVendors.length} dari ${vendors.length} Vendor Terpilih`}
              accent="amber"
            />
            <KpiCard
              title="Target Tabungan Sisa"
              amount={summary.savingsDeficitAmount}
              subtitle={`Estimasi ${summary.estimatedSavingMonths} bulan menabung`}
              accent="rose"
            />
          </section>

          {/* Tab Content Display */}
          <section aria-label="Konten Modul Terpilih">
            {activeTab === 'budget' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <BudgetTable
                      categories={categories}
                      items={budgetItems}
                      onAddItem={(catId) => handleOpenAddModal(catId)}
                    />
                  </div>
                  <div className="space-y-4">
                    <GoldTrackerWidget
                      marketPricePerGram={DUMMY_GOLD_PRICE.pricePerGram}
                      userUnitPrice={1350000}
                      goldWeightGrams={10}
                      lastUpdatedDate={DUMMY_GOLD_PRICE.effectiveDate}
                      sourceNote={DUMMY_GOLD_PRICE.sourceNote}
                      onSyncPrice={handleSyncGold}
                    />

                    {/* Insight Kotak Rekomendasi Pengantin */}
                    <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-amber-800">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span>Tips Finansial NikahPlan</span>
                      </div>
                      <p className="leading-relaxed">
                        Dengan memasak dapur mandiri untuk 300 tamu (600 porsi), Anda berhasil menghemat sekitar <strong>Rp 15.180.000</strong> dibandingkan paket vendor katering standar!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <GoldTrackerWidget
                    marketPricePerGram={DUMMY_GOLD_PRICE.pricePerGram}
                    userUnitPrice={1350000}
                    goldWeightGrams={10}
                    lastUpdatedDate={DUMMY_GOLD_PRICE.effectiveDate}
                    sourceNote={DUMMY_GOLD_PRICE.sourceNote}
                    onSyncPrice={handleSyncGold}
                  />
                  <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-3">
                    <h3 className="font-serif font-bold text-base text-stone-900">
                      Rencana Tabungan Menuju Hari H
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Target Pernikahan: <strong>14 November 2027</strong>. Dengan kapasitas menabung bulanan saat ini, estimasi kekurangan tabungan sebesar {formatRupiah(summary.savingsDeficitAmount)} dapat tercapai dalam kurun waktu <strong>{summary.estimatedSavingMonths} bulan</strong>.
                    </p>
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                      <span>Status Finansial Keseluruhan:</span>
                      <strong className="text-emerald-800">Sangat Realistis (Aman)</strong>
                    </div>
                  </div>
                </div>

                <BudgetTable
                  categories={categories}
                  items={budgetItems}
                  onAddItem={(catId) => handleOpenAddModal(catId)}
                />
              </div>
            )}

            {activeTab === 'kitchen' && (
              <KitchenCalculator
                initialGuestCount={300}
                initialPortions={600}
                ingredients={DUMMY_KITCHEN_ITEMS}
                onSyncToBudget={handleSyncKitchen}
              />
            )}

            {activeTab === 'vendors' && (
              <VendorMatrix
                vendors={vendors}
                onStatusChange={handleVendorStatusChange}
                onSyncDealToBudget={handleSyncVendorDeal}
              />
            )}

            {activeTab === 'gold' && (
              <div className="max-w-xl mx-auto">
                <GoldTrackerWidget
                  marketPricePerGram={DUMMY_GOLD_PRICE.pricePerGram}
                  userUnitPrice={1350000}
                  goldWeightGrams={10}
                  lastUpdatedDate={DUMMY_GOLD_PRICE.effectiveDate}
                  sourceNote={DUMMY_GOLD_PRICE.sourceNote}
                  onSyncPrice={handleSyncGold}
                />
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Modal Terpadu Tambah/Kelola Kategori & Item Pengeluaran */}
      <BudgetItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={categories}
        defaultCategoryId={modalTargetCategoryId}
        onSaveItem={handleSaveBudgetItem}
        onAddNewCategory={handleAddNewCategory}
        liveGoldPricePerGram={DUMMY_GOLD_PRICE.pricePerGram}
      />

      {/* Mobile Bottom Navigation Sticky */}
      <div className="lg:hidden">
        <BottomNav
          activeTab={activeTab === 'overview' ? 'budget' : (activeTab as any)}
          onTabChange={(tab) => {
            if (tab === 'invitation') {
              window.open('http://localhost:3001/v/arif-windi', '_blank');
            } else {
              setActiveTab(tab as any);
            }
          }}
        />
      </div>
    </div>
  );
}
