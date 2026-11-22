interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  colorClass?: string;
}

export function ProgressBar({
  value,
  max,
  label,
  colorClass = 'bg-[#2EC4B6] dark:bg-[#4ED8CA]',
}: ProgressBarProps) {
  const safeMax = Math.max(1, max);
  const pct = Math.min(100, Math.max(0, Math.round((value / safeMax) * 100)));

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between text-sm font-bold mb-1.5">
          <span className="text-[var(--text-secondary)]">{label}</span>
          <span className="tabular-nums text-[var(--text-primary)]">
            {value} / {max}
          </span>
        </div>
      )}
      <div
        className="w-full h-3.5 rounded-full bg-[var(--bg-surface-muted)] overflow-hidden border border-[var(--border-subtle)]"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${colorClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
