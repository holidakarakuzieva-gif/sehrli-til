import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  closeLabel?: string;
  children: ReactNode;
  dismissible?: boolean;
}

export function Modal({
  open,
  onClose,
  title,
  closeLabel = 'Close',
  children,
  dismissible = true,
}: ModalProps) {
  useEffect(() => {
    if (!open || !dismissible) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, dismissible, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
      onClick={() => {
        if (dismissible) onClose();
      }}
    >
      <div
        className="w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-[24px] bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <h2 id="modal-heading" className="text-xl sm:text-2xl font-extrabold leading-snug">
            {title}
          </h2>
          {dismissible && (
            <IconButton label={closeLabel} onClick={onClose}>
              <X className="w-5 h-5" />
            </IconButton>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
