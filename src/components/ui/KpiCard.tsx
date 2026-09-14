import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export function KpiCard({
  label,
  value,
  support,
  trend,
  accent = 'neutral',
  icon: Icon,
  to,
  emphasis = false









}: {label: string;value: string;support?: string;trend?: {direction: 'up' | 'down';value: string;};accent?: 'neutral' | 'orange' | 'purple' | 'danger';icon?: React.ComponentType<{className?: string;}>;to?: string;emphasis?: boolean;}) {
  const accentBar = {
    neutral: 'bg-navy-200',
    orange: 'bg-orange',
    purple: 'bg-purple',
    danger: 'bg-danger'
  }[accent];

  const body =
  <div
    className={cn(
      'relative bg-white border border-line rounded-card shadow-card p-5 h-full flex flex-col overflow-hidden',
      to && 'transition-colors duration-150 ease-out hover:border-navy-200'
    )}>
    
      <span className={cn('absolute inset-y-0 right-0 w-1', accentBar)} aria-hidden />
      <div className="flex items-start justify-between gap-3">
        <p className="text-[13px] text-ink-muted font-medium">{label}</p>
        {Icon && <Icon className="w-4 h-4 text-navy-300 shrink-0" aria-hidden />}
      </div>
      <p className={cn('font-bold text-navy tabular mt-3', emphasis ? 'text-[34px] leading-[44px]' : 'text-[26px] leading-9')}>
        {value}
      </p>
      <div className="mt-auto pt-2 flex items-center gap-2 flex-wrap">
        {trend &&
      <span
        className={cn(
          'inline-flex items-center gap-1 text-[12px] font-medium tabular',
          trend.direction === 'up' ? 'text-success' : 'text-danger'
        )}>
        
            {trend.direction === 'up' ?
        <TrendingUpIcon className="w-3.5 h-3.5" aria-hidden /> :

        <TrendingDownIcon className="w-3.5 h-3.5" aria-hidden />
        }
            {trend.value}
          </span>
      }
        {support && <span className="text-[12px] text-ink-subtle">{support}</span>}
        {to && <ArrowUpRightIcon className="w-3.5 h-3.5 text-navy-300 mr-auto" aria-hidden />}
      </div>
    </div>;


  return to ?
  <Link to={to} className="block h-full">
      {body}
    </Link> :

  body;

}