import React from 'react';
import { cn } from '../../utils/cn';

const palette = ['bg-navy text-white', 'bg-purple text-white', 'bg-orange text-white', 'bg-navy-500 text-white'];

function initials(name: string): string {
  const parts = name.trim().split(' ').filter(Boolean);
  return parts.slice(0, 2).map((p) => p[0]).join('');
}

export function Avatar({
  name,
  size = 'md',
  className




}: {name: string;size?: 'sm' | 'md' | 'lg';className?: string;}) {
  const idx = name.length % palette.length;
  const sizes = {
    sm: 'w-8 h-8 text-[11px]',
    md: 'w-10 h-10 text-[13px]',
    lg: 'w-16 h-16 text-lg'
  } as const;
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex items-center justify-center rounded-full font-bold shrink-0',
        palette[idx],
        sizes[size],
        className
      )}>
      
      {initials(name)}
    </span>);

}

export function PersonCell({
  name,
  sub,
  size = 'sm'




}: {name: string;sub?: string;size?: 'sm' | 'md';}) {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <Avatar name={name} size={size} />
      <div className="min-w-0">
        <p className="text-[13.5px] font-medium text-ink truncate">{name}</p>
        {sub && <p className="text-[12px] text-ink-subtle tabular truncate">{sub}</p>}
      </div>
    </div>);

}