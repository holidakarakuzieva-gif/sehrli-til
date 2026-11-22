import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { useTranslation } from '@/i18n';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="no-print mt-12 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 sm:px-8 py-6 pb-24 lg:pb-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-[var(--text-secondary)]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-xl bg-[var(--bg-surface-muted)] border border-[var(--border-subtle)] font-extrabold text-[var(--text-primary)] tabular-nums">
            {t.common.ageRating}
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#0F766E] dark:text-[#5FE0D3] shrink-0" />
            <span>{t.common.safeZone}</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 font-bold">
          <Link to="/xavfsiz-internet" className="hover:text-[var(--text-primary)] whitespace-nowrap">
            {t.nav.safety}
          </Link>
          <span aria-hidden="true">·</span>
          <Link to="/ota-onalar" className="hover:text-[var(--text-primary)] whitespace-nowrap">
            {t.nav.parents}
          </Link>
          <span aria-hidden="true">·</span>
          <Link to="/sozlamalar" className="hover:text-[var(--text-primary)] whitespace-nowrap">
            {t.nav.settings}
          </Link>
        </div>
      </div>
    </footer>
  );
}
