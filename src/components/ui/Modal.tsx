import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangleIcon, CheckCircle2Icon, InfoIcon, XIcon } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../../utils/cn';

type ModalTone = 'confirm' | 'warning' | 'success' | 'error' | 'details';

const toneStyle: Record<ModalTone, {icon: React.ComponentType<{className?: string;}>;wrap: string;color: string;}> = {
  confirm: { icon: InfoIcon, wrap: 'bg-navy-50 border-navy-100', color: 'text-navy' },
  warning: { icon: AlertTriangleIcon, wrap: 'bg-warn-100 border-warn-200', color: 'text-warn' },
  success: { icon: CheckCircle2Icon, wrap: 'bg-success-100 border-success-200', color: 'text-success' },
  error: { icon: AlertTriangleIcon, wrap: 'bg-danger-100 border-danger-200', color: 'text-danger' },
  details: { icon: InfoIcon, wrap: 'bg-purple-50 border-purple-100', color: 'text-purple' }
};

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  tone?: ModalTone;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  confirmVariant?: 'primary' | 'secondary' | 'danger';
  children?: React.ReactNode;
  width?: string;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  tone = 'confirm',
  confirmLabel,
  cancelLabel = 'إلغاء',
  onConfirm,
  confirmVariant = 'primary',
  children,
  width = 'max-w-md'
}: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const { icon: Icon, wrap, color } = toneStyle[tone];

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6" role="dialog" aria-modal="true">
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0 bg-navy-900/40"
          onClick={onClose} />
        
          <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 4 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className={cn('relative w-full bg-white rounded-card shadow-pop border border-line', width)}>
          
            <div className="flex items-start gap-4 p-6 pb-4">
              <span className={cn('w-10 h-10 rounded-xl border flex items-center justify-center shrink-0', wrap)}>
                <Icon className={cn('w-5 h-5', color)} aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-[17px] font-bold text-navy leading-7">{title}</h2>
                {description && <p className="text-sm text-ink-muted mt-1 leading-6">{description}</p>}
              </div>
              <button
              onClick={onClose}
              aria-label="إغلاق"
              className="w-8 h-8 rounded-lg text-navy-400 hover:bg-navy-50 inline-flex items-center justify-center transition-colors duration-150 ease-out">
              
                <XIcon className="w-4 h-4" aria-hidden />
              </button>
            </div>
            {children && <div className="px-6 pb-2">{children}</div>}
            <div className="flex items-center justify-start gap-2 px-6 py-4 border-t border-line mt-2 bg-navy-50/40 rounded-b-card">
              {onConfirm && confirmLabel &&
            <Button variant={confirmVariant} onClick={onConfirm}>
                  {confirmLabel}
                </Button>
            }
              <Button variant="outline" onClick={onClose}>
                {cancelLabel}
              </Button>
            </div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}