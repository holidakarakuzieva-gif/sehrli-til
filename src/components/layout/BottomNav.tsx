import { NavLink } from 'react-router-dom';
import { BookOpen, Compass, Gamepad2, Home, Settings } from 'lucide-react';
import { useTranslation } from '@/i18n';

export function BottomNav() {
  const { t } = useTranslation();

  const items = [
    { to: '/', label: t.nav.home, icon: Home, end: true },
    { to: '/xarita', label: t.nav.map, icon: Compass },
    { to: '/lugat', label: t.nav.dictionary, icon: BookOpen },
    { to: '/oyinlar', label: t.nav.games, icon: Gamepad2 },
    { to: '/sozlamalar', label: t.nav.settings, icon: Settings },
  ];

  return (
    <nav
      aria-label="Mobile navigation"
      className="no-print lg:hidden fixed bottom-0 inset-x-0 z-40 h-16 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] px-2 flex items-center justify-around"
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center min-w-[56px] min-h-[48px] px-2 py-1 rounded-xl text-[11px] font-bold transition-colors ${
                isActive
                  ? 'text-[var(--accent-sunny-strong)] bg-[#FFF2DF] dark:bg-[#2B231E]'
                  : 'text-[var(--text-secondary)]'
              }`
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span className="truncate max-w-[68px] mt-0.5">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
