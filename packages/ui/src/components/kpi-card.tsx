import * as React from 'react';
import { cn } from './button';
import { formatRupiah } from '../formatters';

export interface KpiCardProps {
  title: string;
  amount?: number;
  customValue?: string;
  subtitle: string;
  icon?: React.ReactNode;
  accent?: 'default' | 'teal' | 'amber' | 'rose';
  className?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  amount,
  customValue,
  subtitle,
  icon,
  accent = 'default',
  className,
}) => {
  const displayValue = customValue ?? (amount !== undefined ? formatRupiah(amount) : '0');

  const borderAccent = {
    default: 'border-stone-200/90',
    teal: 'border-teal-300 bg-teal-50/20',
    amber: 'border-amber-300 bg-amber-50/20',
    rose: 'border-rose-300 bg-rose-50/20',
  }[accent];

  return (
    <div
      className={cn(
        'bg-white rounded-xl border p-4 shadow-none flex flex-col justify-between transition-colors',
        borderAccent,
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          {title}
        </span>
        {icon && <span className="text-stone-400">{icon}</span>}
      </div>

      <div className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight tabular-nums mb-1">
        {displayValue}
      </div>

      <div className="text-xs text-stone-600 font-medium">
        {subtitle}
      </div>
    </div>
  );
};

