import React from 'react';
import { AlertCircleIcon, InboxIcon, RefreshCcwIcon } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../../utils/cn';

export function EmptyState({
  title,
  description,
  icon: Icon = InboxIcon,
  action,
  className






}: {title: string;description?: string;icon?: React.ComponentType<{className?: string;}>;action?: React.ReactNode;className?: string;}) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center px-6 py-16', className)}>
      <span className="w-12 h-12 rounded-xl bg-navy-50 border border-line flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-navy-400" />
      </span>
      <p className="text-[15px] font-bold text-navy">{title}</p>
      {description && <p className="text-[13px] text-ink-muted mt-1 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>);

}

export function ErrorState({
  title = 'حدث خطأ أثناء تحميل البيانات.',
  description = 'حاول مرة أخرى، ولو استمرت المشكلة تواصل مع فريق التشغيل.',
  onRetry




}: {title?: string;description?: string;onRetry?: () => void;}) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-16">
      <span className="w-12 h-12 rounded-xl bg-warn-100 border border-warn-200 flex items-center justify-center mb-4">
        <AlertCircleIcon className="w-5 h-5 text-warn" />
      </span>
      <p className="text-[15px] font-bold text-navy">{title}</p>
      <p className="text-[13px] text-ink-muted mt-1 max-w-sm">{description}</p>
      {onRetry &&
      <Button size="sm" variant="outline" className="mt-4" icon={<RefreshCcwIcon className="w-4 h-4" />} onClick={onRetry}>
          إعادة المحاولة
        </Button>
      }
    </div>);

}

export function Skeleton({ className }: {className?: string;}) {
  return <div className={cn('bg-navy-100 rounded-md animate-pulse', className)} />;
}

export function SkeletonRows({ rows = 6, cols = 6 }: {rows?: number;cols?: number;}) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, r) =>
      <tr key={r} className="border-b border-line last:border-0">
          {Array.from({ length: cols }).map((__, c) =>
        <td key={c} className="px-5 py-4">
              <Skeleton className={cn('h-3.5', c === 0 ? 'w-20' : c % 3 === 0 ? 'w-14' : 'w-24')} />
            </td>
        )}
        </tr>
      )}
    </tbody>);

}

export function SkeletonCard() {
  return (
    <div className="bg-white border border-line rounded-card shadow-card p-5">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-7 w-20 mt-4" />
      <Skeleton className="h-3 w-28 mt-4" />
    </div>);

}

export function SkeletonChart({ className }: {className?: string;}) {
  const heights = ['h-16', 'h-28', 'h-20', 'h-32', 'h-24', 'h-36', 'h-28'];
  return (
    <div className={cn('flex items-end gap-3 h-40 px-2', className)}>
      {heights.map((h, i) =>
      <Skeleton key={i} className={cn('flex-1', h)} />
      )}
    </div>);

}