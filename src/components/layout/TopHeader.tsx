import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BellIcon, ChevronDownIcon, PanelRightCloseIcon, PanelRightOpenIcon, UserIcon, LogOutIcon } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { SearchInput } from '../ui/Field';
import { IconButton } from '../ui/Button';
import { trips } from '../../data/trips';
import { drivers } from '../../data/drivers';
import { customers } from '../../data/customers';
import { disputes } from '../../data/disputes';

interface Result {
  label: string;
  sub: string;
  to: string;
}

export function TopHeader({
  onToggleSidebar,
  collapsed,
  onOpenNotifications,
  onLogout,
  unread
}: {onToggleSidebar: () => void;collapsed: boolean;onOpenNotifications: () => void;onLogout: () => void;unread: number;}) {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const results = useMemo<Result[]>(() => {
    const q = query.trim();
    if (q.length < 2) return [];
    const out: Result[] = [];
    trips.
    filter((t) => t.id.includes(q.toUpperCase()) || t.customer.includes(q) || (t.driver ?? '').includes(q)).
    slice(0, 3).
    forEach((t) => out.push({ label: `#${t.id}`, sub: `${t.customer} · ${t.from} ← ${t.to}`, to: `/trips/${t.id}` }));
    drivers.
    filter((d) => d.name.includes(q) || d.phone.includes(q)).
    slice(0, 3).
    forEach((d) => out.push({ label: d.name, sub: `سائق · ${d.phone}`, to: `/drivers/${d.id}` }));
    customers.
    filter((c) => c.name.includes(q) || c.phone.includes(q)).
    slice(0, 3).
    forEach((c) => out.push({ label: c.name, sub: `عميل · ${c.phone}`, to: `/customers/${c.id}` }));
    disputes.
    filter((d) => d.id.includes(q.toUpperCase())).
    slice(0, 2).
    forEach((d) => out.push({ label: `#${d.id}`, sub: `نزاع · ${d.type}`, to: `/disputes/${d.id}` }));
    return out.slice(0, 7);
  }, [query]);

  return (
    <header className="h-[72px] bg-white border-b border-line sticky top-0 z-30 flex items-center gap-4 px-6">
      <IconButton
        label={collapsed ? 'توسيع القائمة' : 'طي القائمة'}
        onClick={onToggleSidebar}
        className="w-9 h-9 border-0 bg-transparent hover:bg-navy-50">
        
        {collapsed ? <PanelRightOpenIcon className="w-[18px] h-[18px]" /> : <PanelRightCloseIcon className="w-[18px] h-[18px]" />}
      </IconButton>

      <div className="relative w-full max-w-[420px]">
        <SearchInput
          placeholder="ابحث عن رحلة، سائق، عميل..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="بحث شامل" />
        
        {results.length > 0 &&
        <div className="absolute top-12 right-0 left-0 bg-white border border-line rounded-xl shadow-pop py-1.5 z-40">
            {results.map((r) =>
          <button
            key={r.to + r.label}
            onClick={() => {
              setQuery('');
              navigate(r.to);
            }}
            className="w-full text-right px-4 py-2.5 hover:bg-navy-50 transition-colors duration-150 ease-out">
            
                <span className="block text-[13.5px] font-medium text-ink">{r.label}</span>
                <span className="block text-[12px] text-ink-subtle">{r.sub}</span>
              </button>
          )}
          </div>
        }
      </div>

      <div className="mr-auto flex items-center gap-3">
        <div className="relative">
          <IconButton label="الإشعارات" onClick={onOpenNotifications} className="w-9 h-9">
            <BellIcon className="w-[18px] h-[18px]" />
          </IconButton>
          {unread > 0 &&
          <span className="absolute -top-1 -left-1 min-w-[18px] h-[18px] px-1 rounded-full bg-orange text-white text-[10px] font-bold inline-flex items-center justify-center tabular">
              {unread}
            </span>
          }
        </div>
        <div className="h-8 w-px bg-line" aria-hidden />
        <div className="relative" ref={ref}>
          <button 
            onClick={() => setMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="flex items-center gap-2.5 rounded-[10px] px-2 py-1.5 hover:bg-navy-50 transition-colors duration-150 ease-out"
          >
            <span className="w-9 h-9 rounded-full bg-purple text-white text-[12px] font-bold inline-flex items-center justify-center">
              م ب
            </span>
            <span className="text-right hidden lg:block">
              <span className="block text-[13.5px] font-medium text-ink leading-5">محمد بهاء</span>
              <span className="block text-[11.5px] text-ink-subtle leading-4">مسؤول النظام</span>
            </span>
            <ChevronDownIcon className="w-4 h-4 text-navy-300" aria-hidden />
          </button>
          
          {menuOpen && (
            <div role="menu" className="absolute top-full mt-1 left-0 w-48 bg-white rounded-xl shadow-pop border border-line py-1.5 z-40">
              <button
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/settings');
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-ink hover:bg-navy-50 transition-colors duration-150 ease-out"
              >
                <UserIcon className="w-4 h-4" aria-hidden />
                الملف الشخصي
              </button>
              <button
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2 text-[13px] text-danger hover:bg-danger-100 transition-colors duration-150 ease-out"
              >
                <LogOutIcon className="w-4 h-4" aria-hidden />
                تسجيل الخروج
              </button>
            </div>
          )}
        </div>
      </div>
    </header>);

}