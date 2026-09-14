import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export function TableShell({ children, className }: {children: React.ReactNode;className?: string;}) {
  return (
    <div className={cn('bg-white border border-line rounded-card shadow-card overflow-hidden', className)}>
      {children}
    </div>);

}

export function DataTable({ children, className }: {children: React.ReactNode;className?: string;}) {
  return (
    <div className="overflow-x-auto wedi-scroll">
      <table className={cn('w-full text-right border-collapse', className)}>{children}</table>
    </div>);

}

export function Thead({ columns }: {columns: string[];}) {
  return (
    <thead className="bg-navy-50/70 sticky top-0 z-10">
      <tr>
        {columns.map((c) =>
        <th
          key={c}
          scope="col"
          className="text-[12px] font-bold text-navy-500 px-5 py-3 whitespace-nowrap border-b border-line text-right">
          
            {c}
          </th>
        )}
      </tr>
    </thead>);

}

export function Tr({
  children,
  onClick,
  selected




}: {children: React.ReactNode;onClick?: () => void;selected?: boolean;}) {
  return (
    <tr
      onClick={onClick}
      className={cn(
        'border-b border-line last:border-0 transition-colors duration-150 ease-out',
        onClick && 'cursor-pointer',
        selected ? 'bg-purple-50' : 'hover:bg-navy-50/60'
      )}>
      
      {children}
    </tr>);

}

export function Td({
  children,
  className,
  colSpan




}: {children?: React.ReactNode;className?: string;colSpan?: number;}) {
  return (
    <td colSpan={colSpan} className={cn('px-5 py-3.5 text-[13.5px] text-ink align-middle', className)}>
      {children}
    </td>);

}

export function Pagination({
  page,
  pageCount,
  total,
  onChange





}: {page: number;pageCount: number;total: number;onChange: (p: number) => void;}) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1).slice(0, 5);
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-t border-line bg-white">
      <p className="text-[13px] text-ink-muted">
        عرض <span className="tabular font-medium text-ink">{Math.min(total, (page - 1) * 10 + 1)}</span> -{' '}
        <span className="tabular font-medium text-ink">{Math.min(page * 10, total)}</span> من{' '}
        <span className="tabular font-medium text-ink">{total}</span>
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page === 1}
          aria-label="الصفحة السابقة"
          className="w-8 h-8 inline-flex items-center justify-center rounded-lg border border-line text-navy-600 disabled:opacity-40 hover:bg-navy-50 transition-colors duration-150 ease-out">
          
          <ChevronRightIcon className="w-4 h-4" aria-hidden />
        </button>
        {pages.map((p) =>
        <button
          key={p}
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
          className={cn(
            'w-8 h-8 inline-flex items-center justify-center rounded-lg text-[13px] font-medium tabular transition-colors duration-150 ease-out',
            p === page ? 'bg-navy text-white' : 'text-navy-600 border border-line hover:bg-navy-50'
          )}>
          
            {p}
          </button>
        )}
        <button
          onClick={() => onChange(Math.min(pageCount, page + 1))}
          disabled={page === pageCount}
          aria-label="الصفحة التالية"
          className="w-8 h-8 inline-flex items-center justify-center rounded-lg border border-line text-navy-600 disabled:opacity-40 hover:bg-navy-50 transition-colors duration-150 ease-out">
          
          <ChevronLeftIcon className="w-4 h-4" aria-hidden />
        </button>
      </div>
    </div>);

}