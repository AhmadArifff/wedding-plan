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
  Heart,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Mail,
} from 'lucide-react';
import {
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
import { TopNavbar } from '../components/top-navbar';
import { FloatingDock, type DashboardTab } from '../components/floating-dock';
import {
  DASHBOARD_THEMES,
  type DashboardThemeId,
} from '../config/themes';
import { TrialBanner } from '../features/trial/trial-banner';
import { BudgetTable } from '../features/budget/budget-table';
import { BudgetItemModal } from '../features/budget/budget-item-modal';
import { KitchenCalculator } from '../features/kitchen/kitchen-calculator';
import { VendorMatrix } from '../features/vendor/vendor-matrix';
import { InvitationStudio } from '../features/invitation/invitation-studio';

export default function PlannerDashboardPage() {
  const [activeTab, setActiveTab] = React.useState<DashboardTab>('overview');
  const [dashboardTheme, setDashboardTheme] = React.useState<DashboardThemeId>('classic-sacred');
  const [categories, setCategories] = React.useState<BudgetCategory[]>(DUMMY_BUDGET_CATEGORIES);
  const [budgetItems, setBudgetItems] = React.useState<BudgetItem[]>(DUMMY_BUDGET_ITEMS);
  const [vendors, setVendors] = React.useState<Vendor[]>(DUMMY_VENDORS);

  // State Modal Penambahan Item & Kategori Terpadu
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalTargetCategoryId, setModalTargetCategoryId] = React.useState<string | undefined>(undefined);

  const summary = React.useMemo(() => getDummyFinancialSummary(), []);
  const currentTheme = DASHBOARD_THEMES[dashboardTheme] || DASHBOARD_THEMES['classic-sacred'];

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
    <div
      className="min-h-screen p-2 sm:p-4 lg:p-6 transition-colors duration-500 flex flex-col justify-start"
      style={{
        backgroundColor: currentTheme.pageBg,
        backgroundImage: currentTheme.pageBackgroundCss,
      }}
    >
      {/* Outer Shell: Left Floating Dock + Main Application Bento Canvas */}
      <div className="max-w-[1440px] w-full mx-auto flex gap-4 lg:gap-6 items-start">
        {/* 1. Left Floating Capsule Dock Bar (Sesuai Referensi Gambar Murmura) */}
        <FloatingDock
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          currentTheme={dashboardTheme}
          onThemeChange={(th) => setDashboardTheme(th)}
          onOpenAddModal={() => handleOpenAddModal()}
          onOpenSearch={() => handleOpenAddModal()}
        />

        {/* 2. Main Bento Application Canvas Container */}
        <div
          className="flex-1 min-w-0 rounded-[32px] sm:rounded-[36px] border p-4 sm:p-6 lg:p-8 transition-all duration-300 shadow-xl"
          style={{
            backgroundColor: currentTheme.containerBg,
            borderColor: currentTheme.containerBorder,
          }}
        >
          {/* Top Header Bar dengan Centered Nav Pills & Theme Selector */}
          <TopNavbar
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
            currentTheme={dashboardTheme}
            onThemeChange={(th) => setDashboardTheme(th)}
            onOpenAddModal={() => handleOpenAddModal()}
            trialDaysRemaining={summary.trialDaysRemaining}
          />

          {/* Hero Greeting & Sentiment Banner + 4 Horizontal Metric Chips */}
          <section className="mt-6 mb-8 space-y-5">
            {/* Greeting Header & Emotional Quote */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200/60">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold bg-stone-100 border border-stone-200/80">
                  <span>{currentTheme.badge}</span>
                  <span className="text-stone-300">•</span>
                  <span className="text-stone-600 font-mono">14 Nov 2027 · Yogyakarta</span>
                </div>
                <h1
                  className={`text-2xl sm:text-4xl font-bold tracking-tight leading-tight ${currentTheme.fontHeadingClass}`}
                  style={{
                    fontFamily: currentTheme.fontHeadingInline,
                    color: currentTheme.textHeading,
                  }}
                >
                  {currentTheme.greetingPrefix}, Arif &amp; Windi
                </h1>
                <p className="text-xs sm:text-sm italic leading-relaxed max-w-2xl" style={{ color: currentTheme.textMuted }}>
                  &ldquo;{currentTheme.sentimentQuote}&rdquo; <span className="font-semibold font-mono not-italic text-[11px]">({currentTheme.quoteAuthor})</span>
                </p>
              </div>

              {/* Countdown Badge Menuju Akad */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 shrink-0 flex items-center gap-3 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-950 font-bold flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-stone-500 font-mono uppercase tracking-wider font-semibold">
                    Menuju Akad Nikah
                  </div>
                  <div className="text-sm font-bold text-stone-900 font-mono">
                    19 Bulan 7 Hari
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Horizontal Metric Chips (Sesuai 976.3K / 10.3% / 19 pada Gambar Referensi) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Chip 1: Plafon Anggaran */}
              <div
                className="p-4 rounded-2xl border transition-all shadow-2xs flex items-center gap-3.5"
                style={{
                  backgroundColor: currentTheme.kpiStyles.budget.bg,
                  borderColor: currentTheme.kpiStyles.budget.border,
                }}
              >
                <div className="w-10 h-10 rounded-2xl bg-white shadow-xs border border-stone-200/60 flex items-center justify-center shrink-0 text-stone-800">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base sm:text-xl font-bold font-mono tracking-tight" style={{ color: currentTheme.textHeading }}>
                      {formatRupiah(totalEstimated)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-semibold font-mono ${currentTheme.kpiStyles.budget.badge}`}>
                      {currentTheme.kpiStyles.budget.badgeText}
                    </span>
                    <span className="text-[11px] truncate" style={{ color: currentTheme.textMuted }}>
                      Plafon 14 Kategori
                    </span>
                  </div>
                </div>
              </div>

              {/* Chip 2: Dapur 600 Porsi */}
              <div
                className="p-4 rounded-2xl border transition-all shadow-2xs flex items-center gap-3.5"
                style={{
                  backgroundColor: currentTheme.kpiStyles.kitchen.bg,
                  borderColor: currentTheme.kpiStyles.kitchen.border,
                }}
              >
                <div className="w-10 h-10 rounded-2xl bg-white shadow-xs border border-stone-200/60 flex items-center justify-center shrink-0 text-stone-800">
                  <Utensils className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base sm:text-xl font-bold font-mono tracking-tight" style={{ color: currentTheme.textHeading }}>
                      {formatRupiah(summary.totalKitchenCost)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-semibold font-mono ${currentTheme.kpiStyles.kitchen.badge}`}>
                      {currentTheme.kpiStyles.kitchen.badgeText}
                    </span>
                    <span className="text-[11px] truncate" style={{ color: currentTheme.textMuted }}>
                      600 Porsi (300 Tamu)
                    </span>
                  </div>
                </div>
              </div>

              {/* Chip 3: Vendor Terpilih */}
              <div
                className="p-4 rounded-2xl border transition-all shadow-2xs flex items-center gap-3.5"
                style={{
                  backgroundColor: currentTheme.kpiStyles.vendor.bg,
                  borderColor: currentTheme.kpiStyles.vendor.border,
                }}
              >
                <div className="w-10 h-10 rounded-2xl bg-white shadow-xs border border-stone-200/60 flex items-center justify-center shrink-0 text-stone-800">
                  <Store className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base sm:text-xl font-bold font-mono tracking-tight" style={{ color: currentTheme.textHeading }}>
                      {formatRupiah(totalDealAmount)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-semibold font-mono ${currentTheme.kpiStyles.vendor.badge}`}>
                      {currentTheme.kpiStyles.vendor.badgeText}
                    </span>
                    <span className="text-[11px] truncate" style={{ color: currentTheme.textMuted }}>
                      {dealVendors.length} dari {vendors.length} Terpilih
                    </span>
                  </div>
                </div>
              </div>

              {/* Chip 4: Target Sisa Tabungan */}
              <div
                className="p-4 rounded-2xl border transition-all shadow-2xs flex items-center gap-3.5"
                style={{
                  backgroundColor: currentTheme.kpiStyles.savings.bg,
                  borderColor: currentTheme.kpiStyles.savings.border,
                }}
              >
                <div className="w-10 h-10 rounded-2xl bg-white shadow-xs border border-stone-200/60 flex items-center justify-center shrink-0 text-stone-800">
                  <Coins className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base sm:text-xl font-bold font-mono tracking-tight" style={{ color: currentTheme.textHeading }}>
                      {formatRupiah(summary.savingsDeficitAmount)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-semibold font-mono ${currentTheme.kpiStyles.savings.badge}`}>
                      {currentTheme.kpiStyles.savings.badgeText}
                    </span>
                    <span className="text-[11px] truncate" style={{ color: currentTheme.textMuted }}>
                      Sisa Bulan Menabung
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* MAIN CONTENT BENTO AREA BERDASARKAN TAB AKTIF */}
          <main className="space-y-6">
            {/* 1. TAB RINGKASAN EKSEKUTIF (OVERVIEW) : BENTO SPLIT MIRIP GAMBAR MURMURA */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Kolom Kiri Bento (7 Kolom Desktop: Featured Action + Rekap Anggaran) */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Featured Card dengan Foto/Preview + Live Status (Mirip Featured Card 19 h 34 min di Referensi) */}
                  <div
                    className="relative overflow-hidden rounded-3xl p-6 border shadow-md text-white space-y-4"
                    style={{
                      background: 'linear-gradient(135deg, #1C1917 0%, #292524 60%, #44403C 100%)',
                      borderColor: currentTheme.cardBorder,
                    }}
                  >
                    {/* Decorative Background Image / Graphic */}
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 pointer-events-none">
                      <img
                        src="/generated/theme-botanical-sage.svg"
                        alt="Aksen Pernikahan"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="relative z-10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Status Rencana Utama</span>
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-400 text-stone-950 font-mono">
                          SIAP MENUJU HARI H
                        </span>
                      </div>

                      <h2
                        className="text-2xl sm:text-3xl font-bold tracking-tight"
                        style={{ fontFamily: currentTheme.fontHeadingInline }}
                      >
                        Resepsi Pendopo Dalem Ngabean
                      </h2>

                      <p className="text-xs text-stone-300 max-w-md leading-relaxed">
                        Plafon anggaran {formatRupiah(totalEstimated)} untuk 300 tamu (600 porsi dapur mandiri). Seluruh pos pengeluaran mahar emas, katering, dan busana terikat dalam status aman terkendali.
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setActiveTab('budget')}
                          className="px-4 py-2 rounded-xl bg-white text-stone-900 text-xs font-bold shadow-md hover:bg-stone-100 transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <span>Buka Master Anggaran</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setActiveTab('invite')}
                          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5 text-amber-300" />
                          <span>Pratinjau Undangan</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Tabel Anggaran Ringkas */}
                  <div
                    className="p-5 rounded-3xl border shadow-xs"
                    style={{
                      backgroundColor: currentTheme.cardBg,
                      borderColor: currentTheme.cardBorder,
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-base" style={{ color: currentTheme.textHeading }}>
                          Pos Anggaran Prioritas
                        </h3>
                        <p className="text-xs" style={{ color: currentTheme.textMuted }}>
                          14 Kategori pengeluaran pernikahan terencana
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab('budget')}
                        className="text-xs font-semibold text-teal-800 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Lihat Semua</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {budgetItems.slice(0, 5).map((item) => (
                        <div
                          key={item.id}
                          className="p-3 rounded-2xl border flex items-center justify-between gap-3 hover:bg-stone-50/70 transition-colors"
                          style={{ borderColor: currentTheme.cardBorder }}
                        >
                          <div className="min-w-0">
                            <div className="text-xs font-bold truncate" style={{ color: currentTheme.textHeading }}>
                              {item.itemName}
                            </div>
                            <div className="text-[10px] font-mono text-stone-500">
                              {item.quantity} {item.unitLabel} · {item.priceSource}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-xs font-mono font-bold" style={{ color: currentTheme.textHeading }}>
                              {formatRupiah(item.totalPrice)}
                            </div>
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full font-semibold bg-emerald-100 text-emerald-800">
                              Terkunci
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Kolom Kanan Bento (5 Kolom Desktop: Needs You / Keputusan & Gold Tracker) */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Live Gold Tracker Widget */}
                  <GoldTrackerWidget
                    marketPricePerGram={DUMMY_GOLD_PRICE.pricePerGram}
                    userUnitPrice={1350000}
                    goldWeightGrams={10}
                    lastUpdatedDate={DUMMY_GOLD_PRICE.effectiveDate}
                    sourceNote={DUMMY_GOLD_PRICE.sourceNote}
                    onSyncPrice={handleSyncGold}
                  />

                  {/* Panel "Butuh Keputusan Anda" (Sesuai "Needs You" pada Referensi Murmura) */}
                  <div
                    className="p-5 rounded-3xl border shadow-xs space-y-4"
                    style={{
                      backgroundColor: currentTheme.cardBg,
                      borderColor: currentTheme.cardBorder,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs">
                          !
                        </div>
                        <h3 className="font-bold text-sm" style={{ color: currentTheme.textHeading }}>
                          Keputusan Menanti Anda
                        </h3>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-amber-100 text-amber-900">
                        2 Vendor
                      </span>
                    </div>

                    <div className="space-y-3">
                      {/* Kartu Vendor 1: Katering */}
                      <div className="p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200/80 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-stone-900">Katering Barokah Jogja</span>
                          <span className="text-xs font-mono font-bold text-stone-900">Rp 18.500.000</span>
                        </div>
                        <p className="text-[11px] text-stone-600 leading-tight">
                          Paket buffet 600 porsi siap diikat deal. Bandingkan dengan kalkulator dapur mandiri untuk hemat 53%.
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setActiveTab('vendors')}
                            className="px-3 py-1.5 rounded-xl bg-teal-800 text-white text-[11px] font-bold shadow-2xs hover:bg-teal-900 transition-colors cursor-pointer"
                          >
                            Setujui Deal
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveTab('kitchen')}
                            className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 text-[11px] font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
                          >
                            Uji Dapur Mandiri
                          </button>
                        </div>
                      </div>

                      {/* Kartu Vendor 2: Fotografi */}
                      <div className="p-3.5 rounded-2xl bg-stone-50/80 border border-stone-200/80 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-stone-900">Lensa Kenangan Wedding</span>
                          <span className="text-xs font-mono font-bold text-stone-900">Rp 5.500.000</span>
                        </div>
                        <p className="text-[11px] text-stone-600 leading-tight">
                          Mencakup foto akad, resepsi, album eksklusif 20 halaman, dan teaser video 60 detik.
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setActiveTab('vendors')}
                            className="px-3 py-1.5 rounded-xl bg-teal-800 text-white text-[11px] font-bold shadow-2xs hover:bg-teal-900 transition-colors cursor-pointer"
                          >
                            Setujui Deal
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveTab('vendors')}
                            className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-700 text-[11px] font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
                          >
                            Lihat Opsi Lain
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. TAB MASTER ANGGARAN (BUDGET) */}
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

                    {/* Insight Box */}
                    <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-5 text-xs text-amber-900 space-y-2 shadow-2xs">
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

            {/* 3. TAB STUDIO UNDANGAN DIGITAL */}
            {activeTab === 'invite' && <InvitationStudio />}

            {/* 4. TAB KALKULATOR DAPUR MANDIRI */}
            {activeTab === 'kitchen' && (
              <KitchenCalculator
                initialGuestCount={300}
                initialPortions={600}
                ingredients={DUMMY_KITCHEN_ITEMS}
                onSyncToBudget={handleSyncKitchen}
              />
            )}

            {/* 5. TAB DECISION MATRIX VENDOR */}
            {activeTab === 'vendors' && (
              <VendorMatrix
                vendors={vendors}
                onStatusChange={handleVendorStatusChange}
                onSyncDealToBudget={handleSyncVendorDeal}
              />
            )}

            {/* 6. TAB LIVE GOLD TRACKER */}
            {activeTab === 'gold' && (
              <div className="max-w-xl mx-auto space-y-6">
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
          </main>
        </div>
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
      <div className="md:hidden">
        <BottomNav
          activeTab={activeTab === 'overview' ? 'budget' : (activeTab as any)}
          onTabChange={(tab) => {
            if (tab === 'invitation') {
              setActiveTab('invite');
            } else {
              setActiveTab(tab as any);
            }
          }}
        />
      </div>
    </div>
  );
}
