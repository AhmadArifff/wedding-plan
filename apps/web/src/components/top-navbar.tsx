'use client';

import * as React from 'react';
import Link from 'next/link';
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
} from 'lucide-react';
import { DUMMY_WORKSPACE } from '@nikahplan/ui';

export type DashboardTab = 'overview' | 'budget' | 'kitchen' | 'vendors' | 'gold' | 'invite';
export type DashboardTheme = 'classic' | 'sage' | 'terracotta' | 'dark';

export interface TopNavbarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  currentTheme: DashboardTheme;
  onThemeChange: (theme: DashboardTheme) => void;
  trialDaysRemaining?: number;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  activeTab,
  onTabChange,
  currentTheme,
  onThemeChange,
  trialDaysRemaining = 28,
}) => {
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const themeDropdownRef = React.useRef<HTMLDivElement>(null);

  const navItems: {
    id: DashboardTab;
    label: string;
    icon: React.FC<{ className?: string }>;
    badge?: string;
  }[] = [
    { id: 'overview', label: 'Ringkasan Eksekutif', icon: LayoutDashboard },
    { id: 'budget', label: 'Master Anggaran', icon: DollarSign, badge: '14' },
    { id: 'kitchen', label: 'Kalkulator Dapur', icon: Utensils, badge: '7 Bahan' },
    { id: 'vendors', label: 'Decision Matrix', icon: Store, badge: '18' },
    { id: 'gold', label: 'Live Gold Tracker', icon: Coins, badge: 'Sync' },
    { id: 'invite', label: 'Undangan Digital', icon: Mail, badge: 'Live' },
  ];

  const themeOptions: {
    id: DashboardTheme;
    name: string;
    description: string;
    colorSwatch: string;
    borderSwatch: string;
  }[] = [
    {
      id: 'classic',
      name: 'Classic Cream',
      description: 'Palet ivory pernikahan hangat & teal sakral',
      colorSwatch: 'bg-[#FAF8F5]',
      borderSwatch: 'border-amber-300',
    },
    {
      id: 'sage',
      name: 'Earthy Sage',
      description: 'Nuansa botanical mint & hijau daun asri',
      colorSwatch: 'bg-[#F2F7F4]',
      borderSwatch: 'border-emerald-400',
    },
    {
      id: 'terracotta',
      name: 'Warm Terracotta',
      description: 'Sentuhan bata hangat, blush & tanah liat',
      colorSwatch: 'bg-[#FAF4F0]',
      borderSwatch: 'border-orange-400',
    },
    {
      id: 'dark',
      name: 'Midnight Gold',
      description: 'Tema gelap mewah dengan aksen emas berkelas',
      colorSwatch: 'bg-stone-900',
      borderSwatch: 'border-amber-400',
    },
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

  const activeThemeMeta = themeOptions.find((t) => t.id === currentTheme) || themeOptions[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* SISI KIRI: Brand Logo + Pengatur Mode / Tema */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Tombol Hamburger Mobile */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Buka Menu Navigasi"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo NikahPlan Studio */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-800 border border-teal-700 flex items-center justify-center shadow-xs">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div className="hidden sm:block">
                <div className="font-serif italic font-bold text-stone-900 text-base leading-tight">
                  NikahPlan Studio
                </div>
                <div className="text-[10px] text-teal-800 font-semibold uppercase tracking-wider font-mono">
                  Planner Dashboard
                </div>
              </div>
            </div>

            {/* Menu Dropdown Setting Mode / Tema Dashboard */}
            <div className="relative" ref={themeDropdownRef}>
              <button
                type="button"
                onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                title="Ganti Tema & Mode Tampilan Dashboard"
              >
                <Palette className="w-3.5 h-3.5 text-teal-700" />
                <span className="hidden md:inline">{activeThemeMeta.name}</span>
                <span className="md:hidden">Tema</span>
                <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform ${isThemeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Popover Pilihan Tema */}
              {isThemeDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-white border border-stone-200 shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2 px-1">
                    Pilih Tema Dashboard
                  </div>
                  <div className="space-y-1.5">
                    {themeOptions.map((opt) => {
                      const isSelected = opt.id === currentTheme;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            onThemeChange(opt.id);
                            setIsThemeDropdownOpen(false);
                          }}
                          className={`w-full text-left p-2 rounded-xl flex items-center gap-2.5 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-teal-50 border border-teal-200 text-teal-950 font-bold'
                              : 'hover:bg-stone-50 text-stone-700'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full border-2 ${opt.borderSwatch} ${opt.colorSwatch} shadow-2xs shrink-0 flex items-center justify-center`}
                          >
                            {isSelected && <Check className="w-3 h-3 text-teal-800" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold">{opt.name}</div>
                            <div className="text-[10px] text-stone-500 truncate">{opt.description}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SISI TENGAH: Menu Navigasi Horizontal Desktop */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1" aria-label="Menu Utama">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTabChange(item.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-teal-800 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-medium ${
                        isActive
                          ? 'bg-teal-900 text-amber-200'
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

          {/* SISI KANAN: Status Mempelai & Tombol Pratinjau */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Status Mempelai & Pro Trial */}
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-xl bg-stone-100 border border-stone-200/80 text-xs">
              <img
                src="/generated/avatar-groom.svg"
                alt="Avatar Pengantin"
                className="w-6 h-6 rounded-full border border-amber-500/60 object-cover"
              />
              <div className="leading-tight text-left">
                <span className="font-semibold text-stone-900 block truncate max-w-[100px]">Arif &amp; Windi</span>
                <span className="text-[10px] text-amber-700 font-mono font-bold flex items-center gap-0.5">
                  <Crown className="w-2.5 h-2.5" />
                  Trial ({trialDaysRemaining}h)
                </span>
              </div>
            </div>

            {/* Tombol Cepat Buka Undangan Publik di Tab Baru */}
            <a
              href="http://localhost:3001/v/arif-windi"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
              title="Buka Undangan Tamu Publik di Tab Baru"
            >
              <span className="hidden sm:inline">Pratinjau Tamu</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 py-3 space-y-1 shadow-lg animate-in slide-in-from-top-1 duration-150">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider px-2 py-1">
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
                    ? 'bg-teal-800 text-white shadow-xs'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-teal-900 text-amber-200' : 'bg-stone-200 text-stone-600'
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

