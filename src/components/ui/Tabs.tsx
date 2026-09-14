import React from 'react';
import { cn } from '../../utils/cn';

export interface TabItem {
  key: string;
  label: string;
  count?: number;
  disabled?: boolean;
}

export function Tabs({
  items,
  value,
  onChange,
  className





}: {items: TabItem[];value: string;onChange: (key: string) => void;className?: string;}) {
  return (
    <div role="tablist" className={cn('flex items-center gap-1 border-b border-line overflow-x-auto', className)}>
      {items.map((item) => {
        const active = item.key === value;
        return (
          <button
            key={item.key}
            role="tab"
            aria-selected={active}
            disabled={item.disabled}
            onClick={() => onChange(item.key)}
            className={cn(
              'relative px-4 h-11 text-sm font-medium whitespace-nowrap transition-colors duration-150 ease-out',
              'disabled:text-ink-subtle disabled:pointer-events-none',
              active ? 'text-navy' : 'text-ink-muted hover:text-navy'
            )}>
            
            <span className="inline-flex items-center gap-2">
              {item.label}
              {typeof item.count === 'number' &&
              <span
                className={cn(
                  'inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[11px] font-bold tabular',
                  active ? 'bg-navy text-white' : 'bg-navy-50 text-navy-500'
                )}>
                
                  {item.count}
                </span>
              }
            </span>
            {active && <span className="absolute inset-x-2 -bottom-px h-0.5 bg-orange rounded-full" />}
          </button>);

      })}
    </div>);

}

export function SegmentedControl({
  items,
  value,
  onChange




}: {items: {key: string;label: string;}[];value: string;onChange: (key: string) => void;}) {
  return (
    <div className="inline-flex items-center p-1 bg-navy-50 rounded-[10px] gap-1">
      {items.map((item) => {
        const active = item.key === value;
        return (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            aria-pressed={active}
            className={cn(
              'h-8 px-3.5 rounded-lg text-[13px] font-medium transition-colors duration-150 ease-out',
              active ? 'bg-white text-navy shadow-card' : 'text-ink-muted hover:text-navy'
            )}>
            
            {item.label}
          </button>);

      })}
    </div>);

}