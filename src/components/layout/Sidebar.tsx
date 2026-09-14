import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  AlertTriangleIcon,
  BarChart3Icon,
  ChevronDownIcon,
  CreditCardIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  SettingsIcon,
  TruckIcon,
  UserCheckIcon,
  UserIcon,
  UsersIcon } from
'lucide-react';
import { cn } from '../../utils/cn';
import { CountBadge } from '../ui/StatusChip';
import { Tooltip } from '../ui/Menu';

export interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{className?: string;}>;
  badge?: number;
  badgeTone?: 'danger' | 'info';
}

export const navItems: NavItem[] = [
{ to: '/', label: 'لوحة التحكم', icon: LayoutDashboardIcon },
{ to: '/trips', label: 'الرحلات', icon: TruckIcon },
{ to: '/drivers', label: 'السائقون', icon: UserCheckIcon },
{ to: '/customers', label: 'العملاء', icon: UsersIcon },
{ to: '/disputes', label: 'النزاعات', icon: AlertTriangleIcon, badge: 7 },
{ to: '/payments', label: 'المدفوعات', icon: CreditCardIcon, badge: 5 },
{ to: '/reports', label: 'التقارير', icon: BarChart3Icon },
{ to: '/settings', label: 'الإعدادات', icon: SettingsIcon }];


export function WediMark({ collapsed, className }: {collapsed?: boolean; className?: string;}) {
  return (
    <img 
      src={collapsed ? "/assets/Fav icon.png" : "/assets/light logo.png"} 
      alt="WEDI" 
      className={cn("object-contain shrink-0", collapsed ? "w-10 h-10" : "h-9", className)} 
    />
  );
}

export function Sidebar({ collapsed, onLogout }: {collapsed: boolean;onLogout: () => void;}) {
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

  return (
    <aside
      className={cn(
        'shrink-0 bg-navy text-white flex flex-col h-screen sticky top-0 transition-[width] duration-200 ease-out',
        collapsed ? 'w-[84px]' : 'w-[264px]'
      )}>
      
      <div className={cn('flex items-center h-[72px] border-b border-white/10', collapsed ? 'justify-center' : 'px-5')}>
        <WediMark collapsed={collapsed} />
      </div>

      <nav className="flex-1 overflow-y-auto wedi-scroll py-4 px-3" aria-label="التنقل الرئيسي">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const link =
            <NavLink
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
              cn(
                'group relative flex items-center gap-3 rounded-[10px] h-11 px-3 text-[14px] transition-colors duration-150 ease-out',
                collapsed && 'justify-center px-0',
                isActive ? 'bg-white/10 text-white font-bold' : 'text-white/70 hover:bg-white/[0.06] hover:text-white'
              )
              }>
              
                {({ isActive }) =>
              <>
                    {isActive && <span className="absolute right-0 top-2 bottom-2 w-1 rounded-full bg-orange" aria-hidden />}
                    <item.icon className="w-[18px] h-[18px] shrink-0" aria-hidden />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                    {!collapsed && item.badge ?
                <span className="mr-auto">
                        <CountBadge value={item.badge} />
                      </span> :
                null}
                    {collapsed && item.badge ?
                <span className="absolute top-1.5 left-2 w-2 h-2 rounded-full bg-orange" aria-hidden /> :
                null}
                  </>
              }
              </NavLink>;

            return (
              <li key={item.to}>
                {collapsed ?
                <Tooltip className="block w-full" label={item.badge ? `${item.label} (${item.badge})` : item.label}>{link}</Tooltip> :

                link
                }
              </li>);

          })}
        </ul>
      </nav>

    </aside>);

}