import { NavLink } from 'react-router-dom';
import {
  Award,
  BookOpen,
  Compass,
  FlaskConical,
  Gamepad2,
  Glasses,
  GraduationCap,
  HelpCircle,
  Home,
  Languages,
  Moon,
  ScrollText,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useTranslation } from '@/i18n';
import { useSettings } from '@/store/useSettings';
import { IconButton } from '@/components/ui/IconButton';

export function Sidebar() {
  const { t, lang } = useTranslation();
  const theme = useSettings((s) => s.theme);
  const setTheme = useSettings((s) => s.setTheme);
  const setLang = useSettings((s) => s.setLang);
  const soundEnabled = useSettings((s) => s.soundEnabled);
  const setSoundEnabled = useSettings((s) => s.setSoundEnabled);
  const magicGlasses = useSettings((s) => s.magicGlasses);
  const setMagicGlasses = useSettings((s) => s.setMagicGlasses);

  const primaryLinks = [
    { to: '/', label: t.nav.home, icon: Home, end: true },
    { to: '/xarita', label: t.nav.map, icon: Compass },
    { to: '/lugat', label: t.nav.dictionary, icon: BookOpen },
    { to: '/laboratoriya', label: t.nav.lab, icon: FlaskConical },
    { to: '/tarjima', label: t.nav.translation, icon: Languages },
    { to: '/ertaklar', label: t.nav.stories, icon: ScrollText },
    { to: '/oyinlar', label: t.nav.games, icon: Gamepad2 },
    { to: '/topishmoqlar', label: t.nav.riddles, icon: HelpCircle },
    { to: '/testlar', label: t.nav.tests, icon: GraduationCap },
    { to: '/yutuqlar', label: t.nav.achievements, icon: Award },
    { to: '/alifbo', label: t.nav.alphabet, icon: Sparkles },
    { to: '/xavfsiz-internet', label: t.nav.safety, icon: ShieldCheck },
  ];

  const utilityLinks = [
    { to: '/ota-onalar', label: t.nav.parents, icon: Users },
    { to: '/oqituvchi', label: t.nav.teacher, icon: GraduationCap },
    { to: '/sozlamalar', label: t.nav.settings, icon: Settings },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 min-h-[44px] px-3.5 py-2 rounded-2xl text-sm font-bold transition-colors whitespace-nowrap ${
      isActive
        ? 'bg-[#FFF2DF] text-[#B34200] dark:bg-[#2B231E] dark:text-[#FFB380]'
        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-muted)] hover:text-[var(--text-primary)]'
    }`;

  const isDarkActive =
    theme === 'dark' ||
    (theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <aside
      aria-label="Sidebar navigation"
      className="no-print hidden lg:flex flex-col w-64 shrink-0 bg-[var(--bg-surface)] border-r border-[var(--border-subtle)] p-4 justify-between gap-4"
    >
      <div className="space-y-1">
        {primaryLinks.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              <Icon className="w-5 h-5 shrink-0" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
        <div className="space-y-1">
          {utilityLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                <Icon className="w-5 h-5 shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Quick controls for child/parent comfort */}
        <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2">
          <IconButton
            label={t.common.magicGlasses}
            active={magicGlasses}
            onClick={() => setMagicGlasses(!magicGlasses)}
          >
            <Glasses className="w-5 h-5" />
          </IconButton>

          <IconButton
            label={t.settings.soundLabel}
            active={soundEnabled}
            onClick={() => setSoundEnabled(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </IconButton>

          <IconButton
            label={isDarkActive ? t.settings.themeLight : t.settings.themeDark}
            onClick={() => setTheme(isDarkActive ? 'light' : 'dark')}
          >
            {isDarkActive ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </IconButton>

          <button
            type="button"
            aria-label={t.settings.languageSection}
            onClick={() => setLang(lang === 'ru' ? 'uz' : lang === 'uz' ? 'en' : 'ru')}
            className="min-w-[44px] min-h-[44px] px-2.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] text-xs font-extrabold uppercase cursor-pointer hover:bg-[var(--bg-surface-muted)]"
          >
            {lang}
          </button>
        </div>
      </div>
    </aside>
  );
}
