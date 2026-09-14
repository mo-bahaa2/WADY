import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Drawer({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  width = 'w-[420px]'








}: {open: boolean;onClose: () => void;title: string;description?: string;children: React.ReactNode;footer?: React.ReactNode;width?: string;}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
          className="absolute inset-0 bg-navy-900/35"
          onClick={onClose} />
        
          <motion.aside
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
          className={cn('absolute inset-y-0 left-0 bg-white border-r border-line flex flex-col shadow-pop', width)}>
          
            <header className="flex items-start justify-between gap-4 px-6 py-5 border-b border-line">
              <div>
                <h2 className="text-[17px] font-bold text-navy">{title}</h2>
                {description && <p className="text-[13px] text-ink-muted mt-0.5">{description}</p>}
              </div>
              <button
              onClick={onClose}
              aria-label="إغلاق"
              className="w-8 h-8 rounded-lg text-navy-400 hover:bg-navy-50 inline-flex items-center justify-center transition-colors duration-150 ease-out">
              
                <XIcon className="w-4 h-4" aria-hidden />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto wedi-scroll">{children}</div>
            {footer && <div className="px-6 py-4 border-t border-line bg-navy-50/40">{footer}</div>}
          </motion.aside>
        </div>
      }
    </AnimatePresence>);

}