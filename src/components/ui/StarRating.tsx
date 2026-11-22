import { Star } from 'lucide-react';

interface StarRatingProps {
  stars: number;
  max?: number;
  label?: string;
}

export function StarRating({ stars, max = 3, label }: StarRatingProps) {
  return (
    <div className="inline-flex items-center gap-1" aria-label={label ?? `${stars} / ${max}`}>
      {Array.from({ length: max }, (_, idx) => {
        const filled = idx < stars;
        return (
          <Star
            key={idx}
            className={`w-5 h-5 ${
              filled
                ? 'fill-[#FFD23F] text-[#D97706]'
                : 'text-slate-300 dark:text-slate-600'
            }`}
          />
        );
      })}
    </div>
  );
}
