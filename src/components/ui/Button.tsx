import React from 'react';
import { Loader2Icon } from 'lucide-react';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
  'bg-orange text-white border border-orange hover:bg-orange-600 hover:border-orange-600 active:bg-orange-700',
  secondary:
  'bg-navy text-white border border-navy hover:bg-navy-700 active:bg-navy-900',
  outline:
  'bg-white text-navy border border-line-strong hover:bg-navy-50 active:bg-navy-100',
  ghost: 'bg-transparent text-navy-600 border border-transparent hover:bg-navy-50 active:bg-navy-100',
  danger: 'bg-white text-danger border border-danger-200 hover:bg-danger-100 active:bg-danger-200'
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-[13px] gap-1.5 rounded-lg',
  md: 'h-10 px-4 text-sm gap-2 rounded-[10px]',
  lg: 'h-12 px-6 text-base gap-2 rounded-[10px]'
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors duration-150 ease-out select-none',
        'disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}>
      
      {loading ? <Loader2Icon className="w-4 h-4 animate-spin" aria-hidden /> : icon}
      {children}
    </button>);

}

export function IconButton({
  label,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {label: string;}) {
  return (
    <button
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex items-center justify-center w-10 h-10 rounded-[10px] text-navy-600',
        'border border-line bg-white hover:bg-navy-50 transition-colors duration-150 ease-out',
        className
      )}
      {...props}>
      
      {children}
    </button>);

}