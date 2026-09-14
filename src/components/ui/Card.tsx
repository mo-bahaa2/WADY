import React from 'react';
import { cn } from '../../utils/cn';

export function Card({
  className,
  children,
  as: As = 'section'




}: {className?: string;children: React.ReactNode;as?: 'section' | 'div' | 'article';}) {
  return (
    <As className={cn('bg-white border border-line rounded-card shadow-card', className)}>
      {children}
    </As>);

}

export function CardHeader({
  title,
  description,
  action,
  className





}: {title: React.ReactNode;description?: React.ReactNode;action?: React.ReactNode;className?: string;}) {
  return (
    <div className={cn('flex items-start justify-between gap-4 px-6 pt-5 pb-4', className)}>
      <div className="min-w-0">
        <h2 className="text-[17px] font-bold text-navy leading-7">{title}</h2>
        {description && <p className="text-[13px] text-ink-muted mt-0.5">{description}</p>}
      </div>
      {action && <div className="shrink-0 flex items-center gap-2">{action}</div>}
    </div>);

}

export function SectionTitle({
  children,
  description,
  action




}: {children: React.ReactNode;description?: string;action?: React.ReactNode;}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-4">
      <div>
        <h2 className="text-xl font-bold text-navy">{children}</h2>
        {description && <p className="text-[13px] text-ink-muted mt-0.5">{description}</p>}
      </div>
      {action}
    </div>);

}

export function DataRow({
  label,
  value,
  className




}: {label: string;value: React.ReactNode;className?: string;}) {
  return (
    <div className={cn('flex items-center justify-between gap-4 py-2.5 border-b border-line last:border-0', className)}>
      <dt className="text-[13px] text-ink-muted shrink-0">{label}</dt>
      <dd className="text-sm font-medium text-ink text-left tabular">{value}</dd>
    </div>);

}