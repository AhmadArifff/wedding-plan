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
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  Crown,
  Sparkles,
} from 'lucide-react';
import { DUMMY_WORKSPACE } from '@nikahplan/ui';

export type SidebarTab = 'overview' | 'budget' | 'kitchen' | 'vendors' | 'gold' | 'invite';

export interface SidebarProps {
  activeTab: SidebarTab;
  onTabChange: (tab: SidebarTab) => void;
  trialDaysRemaining?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  trialDaysRemaining = 28,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const menuItems: {
    id: SidebarTab;
    label: string;
    icon: React.FC<{ className?: string }>;
    badge?: string;
  }[] = [
    { id: 'overview', label: 'Ringkasan Eksekutif', icon: LayoutDashboard },
    { id: 'budget', label: 'Master Anggaran 14 Kategori', icon: DollarSign, badge: '14' },
    { id: 'kitchen', label: 'Kalkulator Dapur Mandiri', icon: Utensils, badge: '7 Bahan' },
    { id: 'vendors', label: 'Decision Matrix Vendor', icon: Store, badge: '18' },
    { id: 'gold', label: 'Live Gold Tracker Antam', icon: Coins, badge: 'Sync' },
    { id: 'invite', label: 'Undangan Digital QRIS', icon: Mail, badge: 'Live' },
  ];

  return (
    <>
      {/* Mobile Top Header dengan tombol Hamburger */}
      <div className="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsMobileOpen(true)}
            className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
            aria-label="Buka Menu Navigasi"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-serif italic font-bold text-stone-900 text-base leading-none">
              {DUMMY_WORKSPACE.weddingTitle}
            </h1>
            <span className="text-[10px] text-teal-800 font-semibold tracking-wider uppercase">
              Admin Workspace
            </span>
          </div>
        </div>

        <a
          href="http://localhost:3001/v/arif-windi"
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold flex items-center gap-1"
          title="Buka Undangan Tamu"
        >
          <Mail className="w-4 h-4" />
        </a>
      </div>

      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Shell (Desktop Static Sticky / Mobile Slide-Over Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between bg-stone-900 text-stone-100 transition-all duration-300 ease-in-out lg:static lg:z-30 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}`}
      >
        {/* Header Profil & Logo */}
        <div>
          <div className="p-4 border-b border-stone-800 flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-9 h-9 rounded-xl bg-teal-800/80 border border-teal-700 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                </div>
                <div className="truncate">
                  <div className="font-serif italic font-bold text-base text-white truncate">
                    NikahPlan Studio
                  </div>
                  <div className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">
                    Admin Planner
                  </div>
                </div>
              </div>
            )}

            {isCollapsed && (
              <div className="mx-auto w-9 h-9 rounded-xl bg-teal-800/80 border border-teal-700 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
            )}

            {/* Tombol Tutup di Mobile & Toggle Collapse di Desktop */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800"
                aria-label="Tutup Menu"
              >
                <X className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                title={isCollapsed ? 'Perluas Sidebar' : 'Ciutkan Sidebar'}
              >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Kartu Status Mempelai */}
          {!isCollapsed && (
            <div className="m-3 p-3 rounded-2xl bg-stone-800/80 border border-stone-700/60 text-xs">
              <div className="flex items-center gap-2 mb-1.5">
                <img
                  src="/generated/avatar-groom.svg"
                  alt="Avatar"
                  className="w-7 h-7 rounded-full border border-amber-500/60 object-cover"
                />
                <div className="truncate">
                  <div className="font-semibold text-white truncate">Arif &amp; Windi</div>
                  <div className="text-[10px] text-stone-400">14 Nov 2027 · Yogyakarta</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-stone-700/60 text-stone-300">
                <span className="flex items-center gap-1 text-amber-400">
                  <Crown className="w-3 h-3" />
                  Pro Trial
                </span>
                <span className="font-mono text-stone-400">{trialDaysRemaining} hari tersisa</span>
              </div>
            </div>
          )}

          {/* Daftar Menu Navigasi Utama */}
          <nav className="p-2 space-y-1" aria-label="Menu Navigasi Sidebar">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onTabChange(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'text-stone-300 hover:bg-stone-800/80 hover:text-white'
                  } ${isCollapsed ? 'justify-center px-2' : ''}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-300' : 'text-stone-400'}`} />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${
                            isActive
                              ? 'bg-teal-800 text-amber-200'
                              : 'bg-stone-800 text-stone-400'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Sidebar: Link ke Undangan Tamu */}
        <div className="p-3 border-t border-stone-800">
          <a
            href="http://localhost:3001/v/arif-windi"
            target="_blank"
            rel="noreferrer"
            className={`flex items-center gap-2.5 p-2.5 rounded-xl bg-stone-800/90 hover:bg-teal-900/60 border border-stone-700/60 text-stone-200 hover:text-white transition-all text-xs font-semibold group cursor-pointer ${
              isCollapsed ? 'justify-center p-2' : ''
            }`}
            title="Buka Halaman Undangan Tamu Publik"
          >
            <Mail className="w-4 h-4 text-teal-400 shrink-0 group-hover:scale-110 transition-transform" />
            {!isCollapsed && (
              <>
                <div className="flex-1 text-left truncate">
                  <div className="text-[11px] leading-tight">Pratinjau Undangan</div>
                  <div className="text-[9px] text-stone-400 font-mono">/v/arif-windi</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-300 transition-colors" />
              </>
            )}
          </a>
        </div>
      </aside>
    </>
  );
};

