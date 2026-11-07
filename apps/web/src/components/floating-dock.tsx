'use client';

import * as React from 'react';
import {
  Search,
  Plus,
  LayoutDashboard,
  DollarSign,
  Utensils,
  Store,
  Coins,
  Mail,
  Palette,
  Check,
  Sparkles,
} from 'lucide-react';
import {
  DASHBOARD_THEMES,
  type DashboardThemeId,
  type DashboardThemeConfig,
} from '../config/themes';

export type DashboardTab = 'overview' | 'budget' | 'kitchen' | 'vendors' | 'gold' | 'invite';

export interface FloatingDockProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  currentTheme: DashboardThemeId;
  onThemeChange: (theme: DashboardThemeId) => void;
  onOpenAddModal: () => void;
  onOpenSearch?: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  activeTab,
  onTabChange,
  currentTheme,
  onThemeChange,
  onOpenAddModal,
  onOpenSearch,
}) => {
  const [isThemePopoverOpen, setIsThemePopoverOpen] = React.useState(false);
  const themeRef = React.useRef<HTMLDivElement>(null);

  const themeConfig = DASHBOARD_THEMES[currentTheme];

  const dockItems: {
    id: DashboardTab;
    label: string;
    icon: React.FC<{ className?: string }>;
    badge?: string;
  }[] = [
    { id: 'overview', label: 'Ringkasan', icon: LayoutDashboard },
    { id: 'budget', label: 'Master Anggaran', icon: DollarSign, badge: '14' },
    { id: 'kitchen', label: 'Kalkulator Dapur', icon: Utensils, badge: '7' },
    { id: 'vendors', label: 'Decision Matrix', icon: Store, badge: '18' },
    { id: 'gold', label: 'Live Gold Tracker', icon: Coins, badge: 'Sync' },
    { id: 'invite', label: 'Undangan Studio', icon: Mail, badge: 'Live' },
  ];

  // Close popover when clicking outside
  React.useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setIsThemePopoverOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <aside
      aria-label="Navigasi Dock Cepat"
      className={`hidden md:flex flex-col items-center justify-between w-16 py-4 rounded-[30px] border shadow-2xl shrink-0 sticky top-5 z-40 transition-colors duration-300 ${themeConfig.dockBg} ${themeConfig.dockBorder}`}
      style={{ height: 'calc(100vh - 40px)', maxHeight: '640px' }}
    >
      {/* BAGIAN ATAS: Search & Tombol Aksi Tambah Cepat (+) */}
      <div className="flex flex-col items-center gap-3 w-full px-2">
        {/* Tombol Pencarian */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="w-10 h-10 rounded-2xl flex items-center justify-center text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Cari Kategori, Item, atau Vendor"
          aria-label="Cari Cepat"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Tombol Bulat Tambah Cepat (+) */}
        <button
          type="button"
          onClick={onOpenAddModal}
          className={`w-11 h-11 rounded-full flex items-center justify-center font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer ${themeConfig.dockAddBtnBg}`}
          title="Tambah Item Pengeluaran / Kategori Baru"
          aria-label="Tambah Item Baru"
        >
          <Plus className="w-5 h-5 stroke-[2.8]" />
        </button>
      </div>

      {/* BAGIAN TENGAH: Ikon Modul Navigasi */}
      <div className="flex flex-col items-center gap-1.5 w-full px-2">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`relative w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                isActive
                  ? `${themeConfig.dockActiveColor} shadow-xs font-bold scale-105`
                  : `${themeConfig.dockIconColor} hover:bg-white/5`
              }`}
              title={item.label}
              aria-label={item.label}
            >
              <Icon className="w-4 h-4" />
              {item.badge && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 text-stone-950 font-bold text-[8px] flex items-center justify-center font-mono">
                  •
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* BAGIAN BAWAH: Pengatur Mode / Tema Popover */}
      <div className="relative flex flex-col items-center w-full px-2" ref={themeRef}>
        <button
          type="button"
          onClick={() => setIsThemePopoverOpen(!isThemePopoverOpen)}
          className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
            isThemePopoverOpen
              ? 'bg-amber-400 text-stone-950 font-bold shadow-md'
              : 'text-stone-400 hover:text-amber-300 hover:bg-white/10'
          }`}
          title="Ganti Tema & Suasana Emosional Dashboard"
          aria-label="Pilih Tema Dashboard"
        >
          <Palette className="w-4 h-4" />
        </button>

        {/* Popover Menu Pilihan Tema Lengkap */}
        {isThemePopoverOpen && (
          <div className="absolute left-16 bottom-0 w-80 rounded-3xl bg-white border border-stone-200/90 shadow-2xl p-4 z-50 text-stone-900 animate-in fade-in slide-in-from-left-2 duration-150">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-stone-800">
                  Suasana &amp; Tema Dashboard
                </span>
              </div>
              <span className="text-[10px] text-stone-400 font-mono">4 Karakter</span>
            </div>

            <div className="space-y-2">
              {Object.values(DASHBOARD_THEMES).map((th) => {
                const isSelected = currentTheme === th.id;
                return (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => {
                      onThemeChange(th.id);
                      setIsThemePopoverOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-amber-400 bg-amber-50/50 shadow-xs ring-1 ring-amber-400/50'
                        : 'border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Swatch Dua Warna */}
                      <div
                        className="w-7 h-7 rounded-xl shadow-xs shrink-0 flex items-center justify-center border"
                        style={{ backgroundColor: th.swatchPrimary }}
                      >
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: th.swatchAccent }}
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-stone-900 truncate">
                            {th.name}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded-full font-semibold bg-stone-100 text-stone-600 shrink-0">
                            {th.badge.split(' ')[0]}
                          </span>
                        </div>
                        <p className="text-[10px] text-stone-500 truncate mt-0.5 font-serif italic">
                          {th.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-bold">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-stone-300" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
