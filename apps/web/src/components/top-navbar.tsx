'use client';

import * as React from 'react';
import {
  LayoutDashboard,
  DollarSign,
  Utensils,
  Store,
  Coins,
  Mail,
  Sparkles,
  Palette,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Crown,
  Check,
  Plus,
} from 'lucide-react';
import {
  DASHBOARD_THEMES,
  type DashboardThemeId,
  type DashboardThemeConfig,
} from '../config/themes';
import type { DashboardTab } from './floating-dock';

export interface TopNavbarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  currentTheme: DashboardThemeId;
  onThemeChange: (theme: DashboardThemeId) => void;
  onOpenAddModal?: () => void;
  trialDaysRemaining?: number;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  activeTab,
  onTabChange,
  currentTheme,
  onThemeChange,
  onOpenAddModal,
  trialDaysRemaining = 28,
}) => {
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const themeDropdownRef = React.useRef<HTMLDivElement>(null);

  const themeConfig = DASHBOARD_THEMES[currentTheme];

  const navItems: {
    id: DashboardTab;
    label: string;
    icon: React.FC<{ className?: string }>;
    badge?: string;
  }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'budget', label: 'Master Anggaran', icon: DollarSign, badge: '14' },
    { id: 'kitchen', label: 'Kalkulator Dapur', icon: Utensils, badge: '7' },
    { id: 'vendors', label: 'Decision Matrix', icon: Store, badge: '18' },
    { id: 'gold', label: 'Live Gold', icon: Coins, badge: 'Sync' },
    { id: 'invite', label: 'Undangan Digital', icon: Mail, badge: 'Live' },
  ];

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        themeDropdownRef.current &&
        !themeDropdownRef.current.contains(e.target as Node)
      ) {
        setIsThemeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="w-full pb-2">
      <div className="flex items-center justify-between gap-3 flex-wrap lg:flex-nowrap">
        {/* SISI KIRI: Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Tombol Hamburger Mobile */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-2xl bg-white/70 border border-stone-200/80 text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Buka Menu Navigasi"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo NikahPlan Studio */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-10 h-10 rounded-2xl shadow-xs border flex items-center justify-center transition-colors"
              style={{
                backgroundColor: themeConfig.dockBg.includes('bg-') ? undefined : themeConfig.primaryAccent,
                borderColor: themeConfig.cardBorder,
              }}
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div
                className="font-bold text-base leading-tight tracking-tight flex items-center gap-1.5"
                style={{
                  fontFamily: themeConfig.fontHeadingInline,
                  color: themeConfig.textHeading,
                }}
              >
                <span>NikahPlan</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold bg-amber-400 text-stone-950">
                  STUDIO
                </span>
              </div>
              <div
                className="text-[10px] uppercase tracking-wider font-semibold"
                style={{ color: themeConfig.textMuted }}
              >
                {themeConfig.tagline}
              </div>
            </div>
          </div>
        </div>

        {/* SISI TENGAH: Menu Navigasi Pills Horizontal (Seperti Murmura di Gambar Referensi) */}
        <nav
          className="hidden md:flex items-center gap-1 p-1 rounded-full bg-stone-100/90 border border-stone-200/80 backdrop-blur-md shadow-2xs mx-auto"
          aria-label="Navigasi Menu Utama"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? themeConfig.activePillBg
                    : `${themeConfig.inactivePillText} ${themeConfig.inactivePillHover}`
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.2 rounded-full font-mono font-bold ${
                      isActive
                        ? 'bg-amber-400 text-stone-950'
                        : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* SISI KANAN: Theme Pill Selector + Avatar + Tombol Aksi */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Dropdown Pemilih Tema & Mode Suasana */}
          <div className="relative" ref={themeDropdownRef}>
            <button
              type="button"
              onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full border bg-white/90 hover:bg-white text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              style={{
                borderColor: themeConfig.cardBorder,
                color: themeConfig.textHeading,
              }}
              title="Ganti Tema & Suasana Emosional"
            >
              <div
                className="w-4 h-4 rounded-full border shadow-2xs shrink-0 flex items-center justify-center"
                style={{ backgroundColor: themeConfig.swatchPrimary }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeConfig.swatchAccent }} />
              </div>
              <span className="hidden sm:inline">{themeConfig.name}</span>
              <span className="sm:hidden">Tema</span>
              <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform ${isThemeDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Popover Menu Pilihan Tema */}
            {isThemeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-3xl bg-white border border-stone-200/90 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
                  <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                    Pilih Tema &amp; Suasana Dashboard
                  </span>
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
                          setIsThemeDropdownOpen(false);
                        }}
                        className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'border-amber-400 bg-amber-50/60 shadow-xs ring-1 ring-amber-400/50'
                            : 'border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className="w-7 h-7 rounded-xl shadow-xs shrink-0 flex items-center justify-center border"
                            style={{ backgroundColor: th.swatchPrimary }}
                          >
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: th.swatchAccent }} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-stone-900 truncate">{th.name}</span>
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full font-semibold bg-stone-100 text-stone-600">
                                {th.badge.split(' ')[0]}
                              </span>
                            </div>
                            <p className="text-[10px] text-stone-500 truncate mt-0.5 font-serif italic">
                              {th.tagline}
                            </p>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-bold shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Profil Mempelai & Pro Trial Badge */}
          <div className="hidden sm:flex items-center gap-2 p-1.5 pr-3 rounded-full bg-white/90 border border-stone-200/80 shadow-2xs">
            <div className="relative">
              <img
                src="/generated/avatar-groom.svg"
                alt="Avatar Pengantin"
                className="w-7 h-7 rounded-full border border-amber-500/80 object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-white" />
            </div>
            <div className="leading-tight text-left">
              <span
                className="font-bold text-xs block truncate max-w-[90px]"
                style={{ color: themeConfig.textHeading }}
              >
                Arif &amp; Windi
              </span>
              <span className="text-[9px] text-amber-700 font-mono font-bold flex items-center gap-0.5">
                <Crown className="w-2.5 h-2.5" />
                {trialDaysRemaining}h
              </span>
            </div>
          </div>

          {/* Tombol Utama: + Tambah Item atau Pratinjau */}
          <button
            type="button"
            onClick={onOpenAddModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
            style={{
              backgroundColor: themeConfig.primaryAccent,
              color: themeConfig.primaryText,
            }}
            title="Tambah Item Anggaran Baru"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.8]" />
            <span>+ Item</span>
          </button>

          <a
            href="http://localhost:3001/v/arif-windi"
            target="_blank"
            rel="noreferrer"
            className="p-2 sm:px-3 sm:py-2 rounded-full bg-white hover:bg-stone-50 border border-stone-200/90 text-stone-800 text-xs font-semibold shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
            title="Buka Undangan Tamu Publik"
          >
            <span className="hidden sm:inline">Pratinjau</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
          </a>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 p-3 rounded-2xl bg-white border border-stone-200 shadow-xl space-y-1 animate-in slide-in-from-top-1 duration-150">
          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-2 py-1">
            Navigasi Halaman
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onTabChange(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-amber-400 text-stone-950 font-bold' : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
