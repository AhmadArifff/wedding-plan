import * as React from 'react';
import { cn } from './button';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'deal' | 'discussion' | 'candidate' | 'rejected' | 'archived' | 'trial' | 'neutral' | 'amber';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  children,
  ...props
}) => {
  const variantStyles = {
    deal: 'bg-teal-50 text-teal-800 border-teal-200/80 font-semibold',
    discussion: 'bg-amber-50 text-amber-800 border-amber-200/80 font-semibold',
    candidate: 'bg-sky-50 text-sky-800 border-sky-200/80 font-medium',
    rejected: 'bg-rose-50 text-rose-800 border-rose-200/80 font-medium',
    archived: 'bg-stone-100 text-stone-600 border-stone-200 font-normal',
    trial: 'bg-amber-500 text-white border-amber-600 font-bold',
    amber: 'bg-amber-50 text-amber-900 border-amber-200 font-semibold',
    neutral: 'bg-stone-100 text-stone-700 border-stone-200 font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border tracking-wide select-none',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
