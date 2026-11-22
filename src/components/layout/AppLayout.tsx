import { useEffect, useState, type ReactNode } from 'react';
import { useUzText } from '@/lib/useUzText';
import { useProgress } from '@/store/useProgress';
import { useSettings } from '@/store/useSettings';
import { OnboardingModal } from '@/components/onboarding/OnboardingModal';
import { BottomNav } from './BottomNav';
import { Footer } from './Footer';
import { Header } from './Header';
import { RestReminderModal } from './RestReminderModal';
import { Sidebar } from './Sidebar';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const uzText = useUzText();
  const theme = useSettings((s) => s.theme);
  const fontSize = useSettings((s) => s.fontSize);
  const easyRead = useSettings((s) => s.easyRead);
  const reducedMotion = useSettings((s) => s.reducedMotion);
  const screenTimeLimitMin = useSettings((s) => s.screenTimeLimitMin);
  const recordDailyVisit = useProgress((s) => s.recordDailyVisit);

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [restOpen, setRestOpen] = useState(false);

  // Sync theme, typography, and motion preferences to <html>
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const dark = theme === 'dark' || (theme === 'system' && media.matches);
      root.classList.toggle('dark', dark);
    };

    applyTheme();
    media.addEventListener('change', applyTheme);
    return () => media.removeEventListener('change', applyTheme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-large', 'font-xlarge');
    if (fontSize === 'large') root.classList.add('font-large');
    if (fontSize === 'xlarge') root.classList.add('font-xlarge');
    root.classList.toggle('easy-read', easyRead);
    root.classList.toggle('reduce-motion', reducedMotion);
  }, [fontSize, easyRead, reducedMotion]);

  useEffect(() => {
    recordDailyVisit();
  }, [recordDailyVisit]);

  // Screen-time break timer
  useEffect(() => {
    if (screenTimeLimitMin <= 0) return;
    const ms = screenTimeLimitMin * 60 * 1000;
    const timer = window.setInterval(() => {
      setRestOpen(true);
    }, ms);
    return () => window.clearInterval(timer);
  }, [screenTimeLimitMin]);

  return (
    <div className="min-h-dvh flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <div className="no-print w-full bg-[var(--bg-surface-muted)] border-b border-[var(--border-subtle)] px-4 sm:px-6 py-1.5 text-left">
        <p className="text-xs sm:text-[13px] font-bold text-[var(--text-primary)] leading-snug">
          {uzText(
            '54-maktabning oliy toifali oʻzbek tili fani oʻqituvchisi KARAKUZIYEVA XOLIDA NIGʻMATILLAYEVNA tomonidan tayyorlandi'
          )}
        </p>
      </div>

      <Header onOpenProfile={() => setProfileModalOpen(true)} />

      <div className="flex flex-1 min-w-0">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {children}
          </main>
          <Footer />
        </div>
      </div>

      <BottomNav />

      <OnboardingModal
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
      <RestReminderModal open={restOpen} onDismiss={() => setRestOpen(false)} />
    </div>
  );
}
