import React, { useEffect, useRef, useState } from 'react';
import { MoreVerticalIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface MenuAction {
  label: string;
  icon?: React.ComponentType<{className?: string;}>;
  onSelect: () => void;
  danger?: boolean;
}

export function RowActions({ actions, label = 'إجراءات' }: {actions: MenuAction[];label?: string;}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-navy-500 hover:bg-navy-100 transition-colors duration-150 ease-out">
        
        <MoreVerticalIcon className="w-4 h-4" aria-hidden />
      </button>
      {open &&
      <div
        role="menu"
        className="absolute left-0 top-9 z-30 w-52 bg-white border border-line rounded-xl shadow-pop py-1.5">
        
          {actions.map((a) =>
        <button
          key={a.label}
          role="menuitem"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
            a.onSelect();
          }}
          className={cn(
            'w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-right transition-colors duration-150 ease-out',
            a.danger ? 'text-danger hover:bg-danger-100' : 'text-ink hover:bg-navy-50'
          )}>
          
              {a.icon && <a.icon className="w-4 h-4 shrink-0" aria-hidden />}
              {a.label}
            </button>
        )}
        </div>
      }
    </div>);

}

export function Tooltip({ label, children, className }: {label: string;children: React.ReactNode; className?: string}) {
  return (
    <span className={cn("relative inline-flex group", className)}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute top-full mt-2 right-1/2 translate-x-1/2 whitespace-nowrap rounded-lg bg-navy px-2.5 py-1 text-[11px] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out z-40">
        
        {label}
      </span>
    </span>);

}