import * as React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'amber';
  size?: 'sm' | 'md' | 'lg';
}

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

    const sizeStyles = {
      sm: 'min-h-[36px] px-3 py-1.5 text-xs rounded-md',
      md: 'min-h-[44px] px-4 py-2.5 text-sm rounded-lg', // min 44px tap target for mobile
      lg: 'min-h-[48px] px-6 py-3 text-base rounded-xl font-semibold',
    };

    const variantStyles = {
      primary:
        'bg-teal-700 text-white hover:bg-teal-800 focus-visible:ring-teal-700 shadow-sm border border-teal-800/20',
      secondary:
        'bg-stone-100 text-stone-800 hover:bg-stone-200 focus-visible:ring-stone-400 border border-stone-200',
      outline:
        'bg-white text-stone-800 hover:bg-stone-50 border border-stone-300 focus-visible:ring-stone-400',
      amber:
        'bg-amber-600 text-white hover:bg-amber-700 focus-visible:ring-amber-500 shadow-sm border border-amber-700/20',
      danger:
        'bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500 shadow-sm border border-rose-700/20',
      ghost:
        'text-stone-700 hover:bg-stone-100 hover:text-stone-900 focus-visible:ring-stone-400',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

