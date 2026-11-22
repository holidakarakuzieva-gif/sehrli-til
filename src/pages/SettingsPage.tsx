import { useState } from 'react';
import { Monitor, Moon, RotateCcw, Sun, UserPen } from 'lucide-react';
import { AVATAR_OPTIONS, type FontSizeMode, type ThemeMode } from '@/config/theme';
import type { Lang } from '@/content/types';
import { useTranslation } from '@/i18n';
import type { AlphabetMode } from '@/lib/alphabet';
import { useUzText } from '@/lib/useUzText';
import { useProgress } from '@/store/useProgress';
import { useSettings } from '@/store/useSettings';
import { OnboardingModal } from '@/components/onboarding/OnboardingModal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';

export default function SettingsPage() {
  const { t, lang } = useTranslation();
  const uzText = useUzText();

  const setLang = useSettings((s) => s.setLang);
  const theme = useSettings((s) => s.theme);
  const setTheme = useSettings((s) => s.setTheme);
  const alphabet = useSettings((s) => s.alphabet);
  const setAlphabet = useSettings((s) => s.setAlphabet);
  const fontSize = useSettings((s) => s.fontSize);
  const setFontSize = useSettings((s) => s.setFontSize);
  const easyRead = useSettings((s) => s.easyRead);
  const setEasyRead = useSettings((s) => s.setEasyRead);
  const soundEnabled = useSettings((s) => s.soundEnabled);
  const setSoundEnabled = useSettings((s) => s.setSoundEnabled);
  const reducedMotion = useSettings((s) => s.reducedMotion);
  const setReducedMotion = useSettings((s) => s.setReducedMotion);
  const magicGlasses = useSettings((s) => s.magicGlasses);
  const setMagicGlasses = useSettings((s) => s.setMagicGlasses);
  const screenTimeLimitMin = useSettings((s) => s.screenTimeLimitMin);
  const setScreenTimeLimitMin = useSettings((s) => s.setScreenTimeLimitMin);

  const profile = useProgress((s) => s.profile);
  const resetProgress = useProgress((s) => s.resetProgress);

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  const avatar = AVATAR_OPTIONS.find((a) => a.id === profile?.avatarId) ?? AVATAR_OPTIONS[0];

  const langOptions: { id: Lang; label: string }[] = [
    { id: 'ru', label: 'Русский' },
    { id: 'uz', label: 'Oʻzbekcha' },
    { id: 'en', label: 'English' },
  ];

  const alphabetOptions: { id: AlphabetMode; label: string }[] = [
    { id: 'latin', label: t.settings.alphabetLatin },
    { id: 'new-latin', label: t.settings.alphabetNewLatin },
    { id: 'cyrillic', label: t.settings.alphabetCyrillic },
  ];

  const themeOptions: { id: ThemeMode; label: string; icon: typeof Sun }[] = [
    { id: 'light', label: t.settings.themeLight, icon: Sun },
    { id: 'dark', label: t.settings.themeDark, icon: Moon },
    { id: 'system', label: t.settings.themeSystem, icon: Monitor },
  ];

  const fontSizeOptions: { id: FontSizeMode; label: string }[] = [
    { id: 'normal', label: 'A' },
    { id: 'large', label: 'A+' },
    { id: 'xlarge', label: 'A++' },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">{t.settings.title}</h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-1">
          {t.settings.subtitle}
        </p>
      </div>

      {/* Profile */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[var(--bg-surface-muted)] flex items-center justify-center text-3xl shrink-0">
              {avatar.emoji}
            </div>
            <div>
              <h2 className="text-lg font-extrabold">{t.settings.profileSection}</h2>
              <p className="text-sm text-[var(--text-secondary)] font-semibold">
                {profile
                  ? `${profile.nickname} · ${
                      profile.grade === 2 ? t.common.grade2 : t.common.grade3
                    }`
                  : t.onboarding.subtitle}
              </p>
            </div>
          </div>

          <Button variant="secondary" onClick={() => setProfileModalOpen(true)}>
            <UserPen className="w-4 h-4" />
            <span>{t.onboarding.editProfile}</span>
          </Button>
        </div>
      </Card>

      {/* Interface Language */}
      <Card className="space-y-3">
        <h2 className="text-lg font-extrabold">{t.settings.languageSection}</h2>
        <div className="grid grid-cols-3 gap-2.5">
          {langOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setLang(opt.id)}
              className={`min-h-[46px] px-3 rounded-2xl font-bold text-sm border cursor-pointer transition-colors ${
                lang === opt.id
                  ? 'bg-[#0369A1] text-white border-transparent dark:bg-[#60BCFF] dark:text-[#141B2D]'
                  : 'bg-[var(--bg-canvas)] border-[var(--border-subtle)] hover:bg-[var(--bg-surface-muted)]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Alphabet Switcher + Live Preview */}
      <Card className="space-y-4">
        <h2 className="text-lg font-extrabold">{t.settings.alphabetSection}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {alphabetOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setAlphabet(opt.id)}
              className={`min-h-[46px] px-3 py-2 rounded-2xl font-bold text-sm border cursor-pointer transition-colors ${
                alphabet === opt.id
                  ? 'bg-[#D95607] text-white border-transparent dark:bg-[#FFA366] dark:text-[#141B2D]'
                  : 'bg-[var(--bg-canvas)] border-[var(--border-subtle)] hover:bg-[var(--bg-surface-muted)]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl bg-[var(--bg-surface-muted)] border border-[var(--border-subtle)] p-4">
          <span className="block text-xs font-extrabold text-[var(--text-secondary)] uppercase">
            {t.settings.alphabetPreviewLabel}
          </span>
          <p className="text-base sm:text-lg font-extrabold mt-1">
            {uzText(t.settings.alphabetPreviewSample)}
          </p>
        </div>
      </Card>

      {/* Theme */}
      <Card className="space-y-3">
        <h2 className="text-lg font-extrabold">{t.settings.themeSection}</h2>
        <div className="grid grid-cols-3 gap-2.5">
          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTheme(opt.id)}
                className={`min-h-[46px] px-3 py-2 rounded-2xl font-bold text-sm border flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                  theme === opt.id
                    ? 'bg-[#8B5CF6] text-white border-transparent'
                    : 'bg-[var(--bg-canvas)] border-[var(--border-subtle)] hover:bg-[var(--bg-surface-muted)]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Typography & Comfort */}
      <Card className="space-y-4">
        <h2 className="text-lg font-extrabold">{t.settings.typographySection}</h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="font-bold text-sm sm:text-base">{t.settings.fontSizeLabel}</span>
          <div className="flex gap-2">
            {fontSizeOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setFontSize(opt.id)}
                className={`min-w-[56px] min-h-[44px] px-4 rounded-2xl font-extrabold border cursor-pointer transition-colors ${
                  fontSize === opt.id
                    ? 'bg-[#2EC4B6] text-[#0F172A] border-transparent'
                    : 'bg-[var(--bg-canvas)] border-[var(--border-subtle)]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center justify-between gap-4 pt-2 border-t border-[var(--border-subtle)] cursor-pointer min-h-[44px]">
          <div>
            <span className="block font-bold text-sm sm:text-base">{t.settings.easyReadLabel}</span>
            <span className="block text-xs sm:text-sm text-[var(--text-secondary)]">
              {t.settings.easyReadHint}
            </span>
          </div>
          <input
            type="checkbox"
            checked={easyRead}
            onChange={(e) => setEasyRead(e.target.checked)}
            className="w-6 h-6 accent-[#D95607] cursor-pointer shrink-0"
          />
        </label>
      </Card>

      {/* Sound, Motion, Magic Glasses, Screen Time */}
      <Card className="space-y-4">
        <h2 className="text-lg font-extrabold">{t.settings.experienceSection}</h2>

        <label className="flex items-center justify-between gap-4 cursor-pointer min-h-[44px]">
          <span className="font-bold text-sm sm:text-base">{t.settings.soundLabel}</span>
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={(e) => setSoundEnabled(e.target.checked)}
            className="w-6 h-6 accent-[#D95607] cursor-pointer shrink-0"
          />
        </label>

        <label className="flex items-center justify-between gap-4 pt-3 border-t border-[var(--border-subtle)] cursor-pointer min-h-[44px]">
          <span className="font-bold text-sm sm:text-base">{t.settings.reducedMotionLabel}</span>
          <input
            type="checkbox"
            checked={reducedMotion}
            onChange={(e) => setReducedMotion(e.target.checked)}
            className="w-6 h-6 accent-[#D95607] cursor-pointer shrink-0"
          />
        </label>

        <label className="flex items-center justify-between gap-4 pt-3 border-t border-[var(--border-subtle)] cursor-pointer min-h-[44px]">
          <div>
            <span className="block font-bold text-sm sm:text-base">
              👓 {t.settings.magicGlassesLabel}
            </span>
            <span className="block text-xs sm:text-sm text-[var(--text-secondary)]">
              {t.common.magicGlassesHint}
            </span>
          </div>
          <input
            type="checkbox"
            checked={magicGlasses}
            onChange={(e) => setMagicGlasses(e.target.checked)}
            className="w-6 h-6 accent-[#D95607] cursor-pointer shrink-0"
          />
        </label>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[var(--border-subtle)]">
          <span className="font-bold text-sm sm:text-base">{t.settings.screenTimeLabel}</span>
          <div className="flex gap-2">
            {[15, 25, 40, 0].map((min) => (
              <button
                key={min}
                type="button"
                onClick={() => setScreenTimeLimitMin(min)}
                className={`min-h-[44px] px-3.5 rounded-2xl text-sm font-bold border tabular-nums cursor-pointer ${
                  screenTimeLimitMin === min
                    ? 'bg-[#0369A1] text-white border-transparent dark:bg-[#60BCFF] dark:text-[#141B2D]'
                    : 'bg-[var(--bg-canvas)] border-[var(--border-subtle)]'
                }`}
              >
                {min === 0 ? 'Off' : `${min}m`}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold">{t.settings.dangerZone}</h2>
          <p className="text-sm text-[var(--text-secondary)]">{t.settings.resetConfirmBody}</p>
        </div>
        <Button variant="danger" onClick={() => setResetConfirmOpen(true)}>
          <RotateCcw className="w-4 h-4" />
          <span>{t.settings.resetBtn}</span>
        </Button>
      </Card>

      <OnboardingModal
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />

      <Modal
        open={resetConfirmOpen}
        onClose={() => setResetConfirmOpen(false)}
        title={t.settings.resetConfirmTitle}
        closeLabel={t.common.close}
      >
        <div className="space-y-5">
          <p className="text-[var(--text-secondary)]">{t.settings.resetConfirmBody}</p>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setResetConfirmOpen(false)}>
              {t.common.cancel}
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                resetProgress();
                setResetConfirmOpen(false);
              }}
            >
              {t.settings.resetConfirmYes}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
