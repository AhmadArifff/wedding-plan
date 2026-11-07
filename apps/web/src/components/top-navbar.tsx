'use client';

import * as React from 'react';
import {
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Crown,
  Check,
} from 'lucide-react';
import {
  DASHBOARD_THEMES,
  type DashboardThemeId,
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
  const navRef = React.useRef<HTMLElement>(null);

  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const themeConfig = DASHBOARD_THEMES[currentTheme];

  const navItems: {
    id: DashboardTab;
    label: string;
    shortLabel: string;
    badge?: string;
  }[] = [
    { id: 'overview', label: 'Overview', shortLabel: 'Overview' },
    { id: 'budget', label: 'Master Anggaran', shortLabel: 'Anggaran', badge: '14' },
    { id: 'kitchen', label: 'Kalkulator Dapur', shortLabel: 'Dapur', badge: '7' },
    { id: 'vendors', label: 'Decision Matrix', shortLabel: 'Vendor', badge: '18' },
    { id: 'gold', label: 'Live Gold', shortLabel: 'Emas', badge: 'Sync' },
    { id: 'invite', label: 'Undangan Digital', shortLabel: 'Undangan', badge: 'Live' },
  ];

  const checkScroll = React.useCallback(() => {
    if (navRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
      setCanScrollLeft(scrollLeft > 6);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
    }
  }, []);

  React.useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll]);

  // Support mouse wheel horizontal scrolling
  const handleNavWheel = (e: React.WheelEvent<HTMLElement>) => {
    if (e.deltaY !== 0 && navRef.current) {
      navRef.current.scrollLeft += e.deltaY;
      checkScroll();
    }
  };

  const scrollNav = (direction: 'left' | 'right') => {
    if (navRef.current) {
      navRef.current.scrollBy({
        left: direction === 'left' ? -130 : 130,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 220);
    }
  };

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

  const navContainerThemeClass =
    currentTheme === 'midnight-celestial'
      ? 'bg-[#030712]/90 border-amber-500/30 shadow-md shadow-black/40'
      : currentTheme === 'royal-editorial'
      ? 'bg-[#2A171D]/10 border-[#E8D399]/60'
      : currentTheme === 'korean-atelier'
      ? 'bg-[#FFF0F3]/80 border-[#F7D1D9]'
      : 'bg-stone-100/90 border-stone-200/80';

  return (
    <header className="w-full pb-2">
      <div className="flex items-center justify-between gap-2 sm:gap-3 w-full min-w-0">
        {/* SISI KIRI: Brand Logo */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Tombol Hamburger Mobile */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-2xl border text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            style={{
              borderColor: themeConfig.cardBorder,
              backgroundColor: currentTheme === 'midnight-celestial' ? '#182234' : 'rgba(255, 255, 255, 0.9)',
              color: themeConfig.textHeading,
            }}
            aria-label="Buka Menu Navigasi"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo NikahPlan Studio */}
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-2xl shadow-xs border flex items-center justify-center transition-colors shrink-0"
              style={{
                backgroundColor: themeConfig.dockBg.includes('bg-') ? undefined : themeConfig.primaryAccent,
                borderColor: themeConfig.cardBorder,
              }}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="font-bold text-sm sm:text-base leading-tight tracking-tight"
                style={{
                  fontFamily: themeConfig.fontHeadingInline,
                  color: themeConfig.textHeading,
                }}
              >
                NikahPlan
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold bg-amber-400 text-stone-950">
                STUDIO
              </span>
            </div>
          </div>
        </div>

        {/* SISI TENGAH: Menu Navigasi Pills Horizontal dengan Dukungan Scroll Samping & Arrow Buttons */}
        <div className="hidden md:flex items-center relative min-w-0 max-w-full mx-auto px-1">
          {/* Tombol Scroll Kiri */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollNav('left')}
              className="absolute -left-2 z-20 w-6 h-6 rounded-full bg-white/95 border border-stone-200/90 shadow-md flex items-center justify-center text-stone-700 hover:bg-stone-50 cursor-pointer transition-transform hover:scale-105 active:scale-95"
              title="Geser menu ke kiri"
              aria-label="Geser navigasi ke kiri"
            >
              <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          )}

          <nav
            ref={navRef}
            onScroll={checkScroll}
            onWheel={handleNavWheel}
            className={`flex items-center gap-1 p-1 rounded-full border backdrop-blur-md shadow-2xs min-w-0 max-w-full overflow-x-auto no-scrollbar scroll-smooth ${navContainerThemeClass}`}
            aria-label="Navigasi Menu Utama"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTabChange(item.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? themeConfig.activePillBg
                      : `${themeConfig.inactivePillText} ${themeConfig.inactivePillHover}`
                  }`}
                >
                  {/* Gunakan short label di bawah layar 2xl (1536px) agar muat sempurna tanpa overflow */}
                  <span className="hidden 2xl:inline">{item.label}</span>
                  <span className="2xl:hidden">{item.shortLabel}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold leading-none ${
                        isActive
                          ? 'bg-amber-400 text-stone-950'
                          : currentTheme === 'midnight-celestial'
                          ? 'bg-stone-800 text-amber-300/90'
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

          {/* Tombol Scroll Kanan */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollNav('right')}
              className="absolute -right-2 z-20 w-6 h-6 rounded-full bg-white/95 border border-stone-200/90 shadow-md flex items-center justify-center text-stone-700 hover:bg-stone-50 cursor-pointer transition-transform hover:scale-105 active:scale-95"
              title="Geser menu ke kanan"
              aria-label="Geser navigasi ke kanan"
            >
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          )}
        </div>

        {/* SISI KANAN: Theme Pill Selector + Avatar + Pratinjau */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Dropdown Pemilih Tema & Mode Suasana */}
          <div className="relative" ref={themeDropdownRef}>
            <button
              type="button"
              onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer shadow-2xs backdrop-blur-md"
              style={{
                borderColor: themeConfig.cardBorder,
                backgroundColor: currentTheme === 'midnight-celestial' ? '#182234' : 'rgba(255, 255, 255, 0.9)',
                color: themeConfig.textHeading,
              }}
              title="Ganti Tema & Suasana Emosional"
            >
              <div
                className="w-3.5 h-3.5 rounded-full border shadow-2xs shrink-0 flex items-center justify-center"
                style={{ backgroundColor: themeConfig.swatchPrimary }}
              >
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: themeConfig.swatchAccent }} />
              </div>
              <span className="hidden xl:inline">{themeConfig.name}</span>
              <span className="xl:hidden">{themeConfig.name.split(' ')[0]}</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform ${isThemeDropdownOpen ? 'rotate-180' : ''}`}
                style={{ color: themeConfig.textMuted }}
              />
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
          <div
            className="hidden sm:flex items-center gap-2 p-1 pr-2.5 rounded-full border shadow-2xs"
            style={{
              borderColor: themeConfig.cardBorder,
              backgroundColor: currentTheme === 'midnight-celestial' ? '#182234' : 'rgba(255, 255, 255, 0.9)',
            }}
          >
            <div className="relative">
              <img
                src="/generated/avatar-groom.svg"
                alt="Avatar Pengantin"
                className="w-6 h-6 rounded-full border border-amber-500/80 object-cover"
              />
              <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-500 border border-white" />
            </div>
            <div className="leading-none text-left hidden 2xl:block">
              <span
                className="font-bold text-[11px] block truncate max-w-[80px]"
                style={{ color: themeConfig.textHeading }}
              >
                Arif &amp; Windi
              </span>
              <span className="text-[8px] text-amber-500 font-mono font-bold flex items-center gap-0.5 mt-0.5">
                <Crown className="w-2 h-2" />
                {trialDaysRemaining}h
              </span>
            </div>
          </div>

          <a
            href="http://localhost:3001/v/arif-windi"
            target="_blank"
            rel="noreferrer"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-full border text-xs font-semibold shadow-2xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
            style={{
              borderColor: themeConfig.cardBorder,
              backgroundColor: currentTheme === 'midnight-celestial' ? '#182234' : 'rgba(255, 255, 255, 0.9)',
              color: themeConfig.textHeading,
            }}
            title="Buka Undangan Tamu Publik"
          >
            <span className="hidden sm:inline text-xs">Pratinjau</span>
            <ExternalLink className="w-3.5 h-3.5" style={{ color: themeConfig.textMuted }} />
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
                <span>{item.label}</span>
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
