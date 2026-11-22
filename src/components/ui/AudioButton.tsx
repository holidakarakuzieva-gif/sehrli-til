import { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { playWordAudio } from '@/lib/audio';
import { useSettings } from '@/store/useSettings';
import { useTranslation } from '@/i18n';

interface AudioButtonProps {
  wordId: string;
  uzText: string;
  pronunciationRu: string;
  className?: string;
}

export function AudioButton({
  wordId,
  uzText,
  pronunciationRu,
  className = '',
}: AudioButtonProps) {
  const soundEnabled = useSettings((s) => s.soundEnabled);
  const { t } = useTranslation();
  const [showHint, setShowHint] = useState(false);

  const handlePlay = async () => {
    const res = await playWordAudio(wordId, uzText, soundEnabled);
    if (res.mode === 'pronunciation-hint') {
      setShowHint((prev) => !prev);
    }
  };

  return (
    <div className={`inline-flex flex-col items-start gap-2 ${className}`}>
      <button
        type="button"
        onClick={handlePlay}
        aria-label={`${t.common.listen}: ${uzText}`}
        className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-2xl bg-[#EAF6FF] hover:bg-[#D4ECFF] text-[#0369A1] dark:bg-[#1E3A5F] dark:hover:bg-[#274B7A] dark:text-[#7CC7FF] font-bold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
      >
        <Volume2 className="w-5 h-5 shrink-0" />
        <span>{t.common.listen}</span>
      </button>

      {showHint && (
        <div
          role="status"
          className="rounded-xl bg-[var(--bg-surface-muted)] border border-[var(--border-subtle)] px-3.5 py-2 text-sm"
        >
          <span className="font-bold text-[var(--accent-sunny-strong)]">
            {t.common.pronunciation}:{' '}
          </span>
          <span className="font-semibold text-[var(--text-primary)]">{pronunciationRu}</span>
        </div>
      )}
    </div>
  );
}
