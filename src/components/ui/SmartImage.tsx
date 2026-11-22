import { useState } from 'react';

interface SmartImageProps {
  src?: string;
  alt: string;
  emoji: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Avval mahalliy rasmni yuklaydi. Topilmasa chiroyli fon ustida katta emoji koʻrsatadi.
 */
export function SmartImage({
  src,
  alt,
  emoji,
  width = 120,
  height = 120,
  className = '',
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={{ width, height }}
        className={`inline-flex items-center justify-center rounded-2xl bg-[var(--bg-surface-muted)] border border-[var(--border-subtle)] select-none shrink-0 ${className}`}
      >
        <span className="text-4xl sm:text-5xl leading-none" aria-hidden="true">
          {emoji}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`rounded-2xl object-cover shrink-0 ${className}`}
    />
  );
}
