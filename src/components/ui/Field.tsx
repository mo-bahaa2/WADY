import React from 'react';
import { ChevronDownIcon, SearchIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

const base =
'w-full h-10 rounded-[10px] border bg-white text-sm text-ink placeholder:text-ink-subtle transition-colors duration-150 ease-out disabled:bg-navy-50 disabled:text-ink-subtle';

export function TextInput({
  className,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {error?: boolean;}) {
  return (
    <input
      className={cn(
        base,
        'px-3.5',
        error ? 'border-danger-200 bg-danger-100/40' : 'border-line-strong hover:border-navy-200',
        className
      )}
      {...props} />);


}

export function SearchInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn('relative', className)}>
      <SearchIcon
        className="w-4 h-4 text-ink-subtle absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden />
      
      <input type="search" className={cn(base, 'pr-10 pl-3.5 border-line-strong hover:border-navy-200')} {...props} />
    </div>);

}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={cn('relative', className)}>
      <select
        className={cn(base, 'appearance-none pr-3.5 pl-9 border-line-strong hover:border-navy-200 cursor-pointer')}
        {...props}>
        
        {children}
      </select>
      <ChevronDownIcon
        className="w-4 h-4 text-ink-subtle absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden />
      
    </div>);

}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'w-full rounded-[10px] border border-line-strong bg-white p-3.5 text-sm text-ink placeholder:text-ink-subtle',
        'hover:border-navy-200 transition-colors duration-150 ease-out resize-y min-h-[96px]',
        className
      )}
      {...props} />);


}

export function FieldLabel({
  children,
  hint,
  htmlFor




}: {children: React.ReactNode;hint?: string;htmlFor?: string;}) {
  return (
    <label htmlFor={htmlFor} className="block text-[13px] font-medium text-navy-600 mb-1.5">
      {children}
      {hint && <span className="text-ink-subtle font-normal mr-1.5">{hint}</span>}
    </label>);

}

export function Toggle({
  checked,
  onChange,
  label




}: {checked: boolean;onChange: (v: boolean) => void;label: string;}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative w-11 h-6 rounded-full transition-colors duration-150 ease-out shrink-0',
        checked ? 'bg-orange' : 'bg-navy-200'
      )}>
      
      <span
        className={cn(
          'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-150 ease-out',
          checked ? 'right-0.5 -translate-x-5' : 'right-0.5'
        )} />
      
    </button>);

}