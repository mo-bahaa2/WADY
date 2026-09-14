import React from 'react';
import { CheckIcon, CircleIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { TimelineEvent } from '../../types';

export function Timeline({ events, currentIndex }: {events: TimelineEvent[];currentIndex: number;}) {
  return (
    <ol className="relative">
      {events.map((e, i) => {
        const isCurrent = i === currentIndex;
        const isDone = e.done && !isCurrent;
        const isFuture = !e.done && !isCurrent;
        return (
          <li key={e.label} className="relative flex gap-4 pb-6 last:pb-0">
            {i < events.length - 1 &&
            <span
              className={cn(
                'absolute right-[13px] top-7 bottom-0 w-px',
                isDone || isCurrent ? 'bg-navy-200' : 'bg-line'
              )}
              aria-hidden />

            }
            <span
              className={cn(
                'relative z-10 w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 bg-white',
                isDone && 'border-navy bg-navy',
                isCurrent && 'border-orange bg-orange',
                isFuture && 'border-line'
              )}
              aria-hidden>
              
              {isDone && <CheckIcon className="w-3.5 h-3.5 text-white" />}
              {isCurrent && <CircleIcon className="w-2.5 h-2.5 text-white fill-white" />}
            </span>
            <div className="min-w-0 -mt-0.5">
              <p
                className={cn(
                  'text-sm font-medium',
                  isFuture ? 'text-ink-subtle' : 'text-ink',
                  isCurrent && 'text-navy font-bold'
                )}>
                
                {e.label}
              </p>
              <p className="text-[12.5px] text-ink-muted tabular mt-0.5">
                {e.time}
                {e.actor && <span className="text-ink-subtle"> · {e.actor}</span>}
              </p>
            </div>
          </li>);

      })}
    </ol>);

}

export function StepFlow({
  steps,
  activeIndex,
  onSelect




}: {steps: {key: string;label: string;}[];activeIndex: number;onSelect?: (index: number) => void;}) {
  return (
    <ol className="flex items-stretch gap-1 overflow-x-auto wedi-scroll">
      {steps.map((s, i) => {
        const done = i < activeIndex;
        const active = i === activeIndex;
        const Wrapper: React.ElementType = onSelect ? 'button' : 'div';
        return (
          <li key={s.key} className="flex-1 min-w-[132px]">
            <Wrapper
              onClick={onSelect ? () => onSelect(i) : undefined}
              className={cn(
                'w-full text-right rounded-xl border px-3.5 py-3 transition-colors duration-150 ease-out h-full',
                active && 'border-orange bg-orange-50',
                done && 'border-line bg-white',
                !done && !active && 'border-line bg-navy-50/60',
                onSelect && 'hover:border-navy-200'
              )}>
              
              <span
                className={cn(
                  'inline-flex items-center justify-center w-6 h-6 rounded-full text-[11px] font-bold tabular mb-1.5',
                  active ? 'bg-orange text-white' : done ? 'bg-navy text-white' : 'bg-navy-100 text-navy-500'
                )}>
                
                {done ? <CheckIcon className="w-3.5 h-3.5" aria-hidden /> : i + 1}
              </span>
              <p className={cn('text-[12.5px] leading-5', active ? 'text-navy font-bold' : 'text-ink-muted')}>
                {s.label}
              </p>
            </Wrapper>
          </li>);

      })}
    </ol>);

}