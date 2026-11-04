import * as React from 'react';
import { cn } from './button';
import { Calculator, Store, Utensils, PiggyBank, Mail } from 'lucide-react';

export type NavTabId = 'budget' | 'vendors' | 'kitchen' | 'savings' | 'invitation';

export interface BottomNavProps {
  activeTab: NavTabId;
  onTabChange: (tab: NavTabId) => void;
  className?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  className,
}) => {
  const tabs = [
    { id: 'budget' as NavTabId, label: 'Anggaran', icon: Calculator },
    { id: 'vendors' as NavTabId, label: 'Vendor', icon: Store },
    { id: 'kitchen' as NavTabId, label: 'Dapur', icon: Utensils },
    { id: 'savings' as NavTabId, label: 'Tabungan', icon: PiggyBank },
    { id: 'invitation' as NavTabId, label: 'Undangan', icon: Mail },
  ];

  return (
    <nav
      aria-label="Navigasi Utama Mobile"
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 py-1.5 px-2 md:hidden shadow-lg',
        className
      )}
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex flex-col items-center justify-center min-w-[56px] min-h-[48px] px-2 rounded-lg transition-colors cursor-pointer select-none',
                isActive
                  ? 'text-teal-700 font-semibold'
                  : 'text-stone-500 hover:text-stone-800 font-normal'
              )}
            >
              <Icon className={cn('w-5 h-5 mb-0.5', isActive ? 'stroke-[2.2]' : 'stroke-[1.7]')} />
              <span className="text-[10px] leading-tight tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

