import { useState, type FormEvent } from 'react';
import { Check } from 'lucide-react';
import { AVATAR_OPTIONS } from '@/config/theme';
import type { Lang } from '@/content/types';
import { useTranslation } from '@/i18n';
import { playSfx } from '@/lib/sfx';
import { useProgress } from '@/store/useProgress';
import { useSettings } from '@/store/useSettings';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
}

export function OnboardingModal({ open, onClose }: OnboardingModalProps) {
  const { t, lang } = useTranslation();
  const setLang = useSettings((s) => s.setLang);
  const soundEnabled = useSettings((s) => s.soundEnabled);
  const profile = useProgress((s) => s.profile);
  const setProfile = useProgress((s) => s.setProfile);

  const [nickname, setNickname] = useState(profile?.nickname ?? '');
  const [avatarId, setAvatarId] = useState(profile?.avatarId ?? AVATAR_OPTIONS[0].id);
  const [grade, setGrade] = useState<2 | 3>(profile?.grade ?? 2);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = nickname.trim() || (lang === 'ru' ? 'Друг' : lang === 'en' ? 'Friend' : 'Doʻst');
    setProfile({ nickname: cleaned, avatarId, grade });
    playSfx('success', soundEnabled);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={t.onboarding.editProfile} closeLabel={t.common.close}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="modal-nickname" className="block text-sm font-bold mb-1.5">
            {t.onboarding.nicknameLabel}
          </label>
          <input
            id="modal-nickname"
            type="text"
            maxLength={24}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder={t.onboarding.nicknamePlaceholder}
            className="w-full min-h-[46px] px-4 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-semibold"
          />
        </div>

        <div>
          <span className="block text-sm font-bold mb-2">{t.onboarding.avatarLabel}</span>
          <div className="grid grid-cols-3 gap-2.5">
            {AVATAR_OPTIONS.map((av) => {
              const selected = avatarId === av.id;
              return (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => setAvatarId(av.id)}
                  className={`flex flex-col items-center justify-center gap-1 p-3 rounded-2xl border transition-all cursor-pointer min-h-[76px] ${
                    selected
                      ? 'border-[#D95607] bg-[#FFF2DF] dark:border-[#FFA366] dark:bg-[#2F2722]'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-canvas)] hover:bg-[var(--bg-surface-muted)]'
                  }`}
                >
                  <span className="text-2xl leading-none" aria-hidden="true">
                    {av.emoji}
                  </span>
                  <span className="text-xs font-bold truncate max-w-full">{av.label[lang]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className="block text-sm font-bold mb-2">{t.onboarding.gradeLabel}</span>
            <div className="flex gap-2">
              {([2, 3] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGrade(g)}
                  className={`flex-1 min-h-[44px] rounded-2xl font-bold text-sm border cursor-pointer transition-colors ${
                    grade === g
                      ? 'bg-[#D95607] text-white border-transparent dark:bg-[#FFA366] dark:text-[#141B2D]'
                      : 'bg-[var(--bg-canvas)] border-[var(--border-subtle)]'
                  }`}
                >
                  {g === 2 ? t.common.grade2 : t.common.grade3}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="block text-sm font-bold mb-2">{t.onboarding.langLabel}</span>
            <div className="flex gap-1.5">
              {(['ru', 'uz', 'en'] as Lang[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={`flex-1 min-h-[44px] rounded-2xl font-bold text-xs uppercase border cursor-pointer transition-colors ${
                    lang === code
                      ? 'bg-[#0369A1] text-white border-transparent dark:bg-[#60BCFF] dark:text-[#141B2D]'
                      : 'bg-[var(--bg-canvas)] border-[var(--border-subtle)]'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            {t.common.cancel}
          </Button>
          <Button type="submit">
            <Check className="w-4 h-4" />
            <span>{t.common.save}</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
}
