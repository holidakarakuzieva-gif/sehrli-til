import { Link, NavLink } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { AVATAR_OPTIONS } from '@/config/theme';
import { useTranslation } from '@/i18n';
import { useProgress } from '@/store/useProgress';
import { IconButton } from '@/components/ui/IconButton';

interface HeaderProps {
  onOpenProfile: () => void;
}

export function Header({ onOpenProfile }: HeaderProps) {
  const { t, lang } = useTranslation();
  const profile = useProgress((s) => s.profile);
  const avatar = AVATAR_OPTIONS.find((a) => a.id === profile?.avatarId) ?? AVATAR_OPTIONS[0];

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-bold whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 ${
      isActive
        ? 'text-[var(--accent-sunny-strong)] border-[var(--accent-sunny-strong)]'
        : 'text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]'
    }`;

  return (
    <header className="no-print w-full bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
      {/* Zone 1: Brand Wordmark */}
      <Link
        to="/"
        className="text-xl font-extrabold tracking-tight text-[var(--text-primary)] whitespace-nowrap shrink-0 hover:opacity-90"
      >
        {t.brand.name}
      </Link>

      {/* Zone 2: 4 concise single-line nav links */}
      <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
        <NavLink to="/" end className={navLinkClass}>
          {t.nav.home}
        </NavLink>
        <NavLink to="/xarita" className={navLinkClass}>
          {t.nav.map}
        </NavLink>
        <NavLink to="/lugat" className={navLinkClass}>
          {t.nav.dictionary}
        </NavLink>
        <NavLink to="/oyinlar" className={navLinkClass}>
          {t.nav.games}
        </NavLink>
      </nav>

      {/* Zone 3: 1 primary action (Profile / Settings trigger) */}
      <div className="flex items-center gap-2 shrink-0">
        {profile ? (
          <button
            type="button"
            onClick={onOpenProfile}
            className="inline-flex items-center gap-2 min-h-[44px] px-3.5 py-1.5 rounded-2xl bg-[var(--bg-surface-muted)] hover:opacity-90 border border-[var(--border-subtle)] text-sm font-bold whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              {avatar.emoji}
            </span>
            <span className="max-w-[110px] truncate">{profile.nickname}</span>
          </button>
        ) : (
          <Link to="/sozlamalar" aria-label={t.nav.settings}>
            <IconButton label={t.nav.settings} tabIndex={-1}>
              <Settings className="w-5 h-5" />
            </IconButton>
          </Link>
        )}
        <span className="sr-only">{lang}</span>
      </div>
    </header>
  );
}
