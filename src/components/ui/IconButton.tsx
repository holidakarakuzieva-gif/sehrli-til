import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
  active?: boolean;
}

export function IconButton({
  label,
  children,
  active = false,
  className = '',
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-2xl border transition-colors duration-150 cursor-pointer shrink-0 ${
        active
          ? 'bg-[#D95607] text-white border-transparent dark:bg-[#FFA366] dark:text-[#141B2D]'
          : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-muted)] text-[var(--text-primary)] border-[var(--border-subtle)]'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
