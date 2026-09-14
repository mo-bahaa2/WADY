import React from 'react';
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  CircleDashedIcon,
  ClockIcon,
  InfoIcon,
  TruckIcon,
  XCircleIcon } from
'lucide-react';
import { cn } from '../../utils/cn';
import { toneClasses, type StatusMeta, type Tone } from '../../utils/status';

const toneIcon: Record<Tone, React.ComponentType<{className?: string;}>> = {
  neutral: CircleDashedIcon,
  info: InfoIcon,
  active: TruckIcon,
  success: CheckCircle2Icon,
  warn: ClockIcon,
  danger: AlertTriangleIcon
};

interface StatusChipProps {
  meta: StatusMeta;
  size?: 'sm' | 'md';
  withIcon?: boolean;
  className?: string;
}

export function StatusChip({ meta, size = 'sm', withIcon = true, className }: StatusChipProps) {
  const Icon = toneIcon[meta.tone];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium whitespace-nowrap',
        size === 'sm' ? 'text-xs px-2.5 h-6' : 'text-[13px] px-3 h-7',
        toneClasses[meta.tone],
        className
      )}>
      
      {withIcon && <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden />}
      {meta.label}
    </span>);

}

export function Badge({
  children,
  tone = 'neutral',
  className




}: {children: React.ReactNode;tone?: Tone;className?: string;}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 h-6 text-xs font-medium',
        toneClasses[tone],
        className
      )}>
      
      {children}
    </span>);

}

export function CountBadge({ value, tone = 'danger' }: {value: number;tone?: Tone;}) {
  if (!value) return null;
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-[11px] font-bold tabular',
        tone === 'danger' ? 'bg-orange text-white' : 'bg-purple text-white'
      )}>
      
      {value}
    </span>);

}

export { XCircleIcon };