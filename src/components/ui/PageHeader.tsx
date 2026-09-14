import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from 'lucide-react';

export interface Crumb {
  label: string;
  to?: string;
}

export function PageHeader({
  title,
  description,
  crumbs,
  actions,
  meta






}: {title: string;description?: string;crumbs?: Crumb[];actions?: React.ReactNode;meta?: React.ReactNode;}) {
  return (
    <header className="mb-6">
      {crumbs && crumbs.length > 0 &&
      <nav aria-label="مسار التنقل" className="flex items-center gap-1.5 mb-2 text-[13px] text-ink-muted">
          {crumbs.map((c, i) =>
        <span key={c.label} className="flex items-center gap-1.5">
              {c.to ?
          <Link to={c.to} className="hover:text-navy transition-colors duration-150 ease-out">
                  {c.label}
                </Link> :

          <span className="text-navy font-medium">{c.label}</span>
          }
              {i < crumbs.length - 1 && <ChevronLeftIcon className="w-3.5 h-3.5 text-navy-300" aria-hidden />}
            </span>
        )}
        </nav>
      }
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div className="min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-[28px] leading-10 font-bold text-navy">{title}</h1>
            {meta}
          </div>
          {description && <p className="text-sm text-ink-muted mt-1">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
      </div>
    </header>);

}