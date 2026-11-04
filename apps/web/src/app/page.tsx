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
} from 'lucide-react';
import {
  KpiCard,
  GoldTrackerWidget,
  BottomNav,
  formatRupiah,
} from '@nikahplan/ui';
import {
  DUMMY_WORKSPACE,
  DUMMY_BUDGET_CATEGORIES,
  DUMMY_BUDGET_ITEMS,
  DUMMY_VENDORS,
  DUMMY_KITCHEN_ITEMS,
  DUMMY_GOLD_PRICE,
  getDummyFinancialSummary,
} from '@nikahplan/ui';
import type { BudgetItem, Vendor, VendorStatus } from '@nikahplan/db';
import { TrialBanner } from '../features/trial/trial-banner';
import { BudgetTable } from '../features/budget/budget-table';
import { KitchenCalculator } from '../features/kitchen/kitchen-calculator';
import { VendorMatrix } from '../features/vendor/vendor-matrix';

export default function PlannerDashboardPage() {
  const [activeTab, setActiveTab] = React.useState<
    'budget' | 'kitchen' | 'vendors' | 'gold' | 'invite'
  >('budget');
  const [budgetItems, setBudgetItems] = React.useState<BudgetItem[]>(DUMMY_BUDGET_ITEMS);
  const [vendors, setVendors] = React.useState<Vendor[]>(DUMMY_VENDORS);

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
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      {/* Top Header App Bar */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200 px-4 py-3 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full border-2 border-amber-600/40 p-0.5 bg-amber-50">
              <img
                src="/generated/avatar-groom.svg"
                alt="Avatar Pengantin"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif italic font-bold text-stone-900 text-base sm:text-lg">
                  {DUMMY_WORKSPACE.weddingTitle}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                  NikahPlan
                </span>
              </div>
              <p className="text-xs text-stone-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>14 November 2027 · Dalem Ngabean Yogyakarta</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="http://localhost:3001/v/arif-siti"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
            >
              <span>Lihat Undangan Publik</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-6">
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

        {/* Tab Switcher Horizontal (Mobile-First Segmented Control) */}
        <section aria-label="Menu Modul Perencanaan">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs sm:text-sm font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('budget')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'budget'
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Master Anggaran (14 Kategori)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('kitchen')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'kitchen'
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Kalkulator Dapur Mandiri</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('vendors')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'vendors'
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Decision Matrix Vendor</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('gold')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'gold'
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Coins className="w-4 h-4" />
              <span>Live Gold Tracker</span>
            </button>
          </div>
        </section>

        {/* Tab Content Display */}
        <section aria-label="Konten Modul Terpilih">
          {activeTab === 'budget' && (
            <div className="space-y-6">
              {/* Highlight Live Gold Mini Widget jika ada pos mahar */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <BudgetTable
                    categories={DUMMY_BUDGET_CATEGORIES}
                    items={budgetItems}
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

      {/* Sticky Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab === 'invite' ? 'invitation' : (activeTab as any)}
        onTabChange={(tab) => {
          if (tab === 'invitation') {
            window.open('http://localhost:3001/v/arif-siti', '_blank');
          } else {
            setActiveTab(tab as any);
          }
        }}
      />
    </div>
  );
}
