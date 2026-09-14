import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangleIcon, CheckCircle2Icon, InfoIcon, XCircleIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export type ToastKind = 'success' | 'error' | 'warning' | 'info';

interface ToastItem {
  id: number;
  kind: ToastKind;
  title: string;
  description?: string;
}

const kindStyle: Record<ToastKind, {icon: React.ComponentType<{className?: string;}>;color: string;}> = {
  success: { icon: CheckCircle2Icon, color: 'text-success' },
  error: { icon: XCircleIcon, color: 'text-danger' },
  warning: { icon: AlertTriangleIcon, color: 'text-warn' },
  info: { icon: InfoIcon, color: 'text-purple' }
};

const ToastContext = createContext<(kind: ToastKind, title: string, description?: string) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: {children: React.ReactNode;}) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const push = useCallback((kind: ToastKind, title: string, description?: string) => {
    const id = Date.now() + Math.random();
    setItems((prev) => [...prev, { id, kind, title, description }]);
    window.setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const value = useMemo(() => push, [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-6 left-6 z-[60] flex flex-col gap-2.5 w-[340px]">
        <AnimatePresence initial={false}>
          {items.map((t) => {
            const { icon: Icon, color } = kindStyle[t.kind];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="bg-white border border-line rounded-xl shadow-pop p-4 flex items-start gap-3"
                role="status">
                
                <Icon className={cn('w-5 h-5 shrink-0 mt-0.5', color)} aria-hidden />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-navy">{t.title}</p>
                  {t.description && <p className="text-[13px] text-ink-muted mt-0.5 leading-6">{t.description}</p>}
                </div>
              </motion.div>);

          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>);

}