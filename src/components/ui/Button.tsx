import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-[#D95607] hover:bg-[#BF4904] text-white dark:bg-[#FFA366] dark:hover:bg-[#FFB482] dark:text-[#141B2D] shadow-sm',
  secondary:
    'bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-muted)] text-[var(--text-primary)] border border-[var(--border-subtle)]',
  ghost:
    'bg-transparent hover:bg-[var(--bg-surface-muted)] text-[var(--text-primary)]',
  danger:
    'bg-[#C81E4A] hover:bg-[#A6173C] text-white dark:bg-[#FF80A4] dark:hover:bg-[#FF99B6] dark:text-[#141B2D]',
};

const SIZE_CLASSES: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'min-h-[44px] px-4 py-2 text-sm',
  md: 'min-h-[46px] px-5 py-2.5 text-base',
  lg: 'min-h-[52px] px-7 py-3 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl font-bold whitespace-nowrap shrink-0 transition-transform duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
