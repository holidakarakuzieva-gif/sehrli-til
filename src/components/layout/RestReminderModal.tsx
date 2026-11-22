import { Eye } from 'lucide-react';
import { useTranslation } from '@/i18n';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Humocha } from '@/components/mascot/Humocha';

interface RestReminderModalProps {
  open: boolean;
  onDismiss: () => void;
}

export function RestReminderModal({ open, onDismiss }: RestReminderModalProps) {
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onClose={onDismiss}
      title={t.restReminder.title}
      closeLabel={t.common.close}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <Humocha mood="sleeping" size={120} />
        <p className="text-[var(--text-secondary)] font-semibold">
          {t.restReminder.subtitle}
        </p>

        <ol className="w-full text-left space-y-2.5 rounded-2xl bg-[var(--bg-surface-muted)] p-4 border border-[var(--border-subtle)]">
          {t.restReminder.steps.map((step, index) => (
            <li key={index} className="flex items-start gap-3 text-sm sm:text-base font-bold">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#2EC4B6] text-[#0F172A] text-sm font-extrabold shrink-0">
                {index + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>

        <Button onClick={onDismiss} size="lg" className="w-full sm:w-auto">
          <Eye className="w-5 h-5" />
          <span>{t.restReminder.resumeBtn}</span>
        </Button>
      </div>
    </Modal>
  );
}
