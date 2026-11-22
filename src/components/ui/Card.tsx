import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padded?: boolean;
}

export function Card({
  children,
  padded = true,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-[20px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-[0_2px_12px_rgba(43,45,66,0.04)] dark:shadow-[0_2px_14px_rgba(0,0,0,0.22)] ${
        padded ? 'p-5 sm:p-6' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
