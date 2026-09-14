import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangleIcon,
  CreditCardIcon,
  ServerIcon,
  TruckIcon,
  UserCheckIcon } from
'lucide-react';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { SegmentedControl } from '../ui/Tabs';
import { EmptyState } from '../ui/States';
import { notifications } from '../../data/notifications';
import type { AppNotification } from '../../types';
import { cn } from '../../utils/cn';

const categoryIcon: Record<AppNotification['category'], React.ComponentType<{className?: string;}>> = {
  نزاعات: AlertTriangleIcon,
  مدفوعات: CreditCardIcon,
  سائقون: UserCheckIcon,
  رحلات: TruckIcon,
  النظام: ServerIcon
};

const categoryTone: Record<AppNotification['category'], string> = {
  نزاعات: 'bg-danger-100 text-danger border-danger-200',
  مدفوعات: 'bg-orange-50 text-orange-700 border-orange-100',
  سائقون: 'bg-purple-50 text-purple-700 border-purple-100',
  رحلات: 'bg-navy-50 text-navy-600 border-navy-100',
  النظام: 'bg-navy-50 text-navy-500 border-navy-100'
};

const routeFor: Record<AppNotification['category'], string> = {
  نزاعات: '/disputes',
  مدفوعات: '/payments',
  سائقون: '/drivers',
  رحلات: '/trips',
  النظام: '/settings'
};

const filters = [
{ key: 'الكل', label: 'الكل' },
{ key: 'نزاعات', label: 'نزاعات' },
{ key: 'مدفوعات', label: 'مدفوعات' },
{ key: 'سائقون', label: 'سائقون' },
{ key: 'رحلات', label: 'رحلات' }];


export function NotificationsDrawer({ open, onClose }: {open: boolean;onClose: () => void;}) {
  const [filter, setFilter] = useState('الكل');
  const navigate = useNavigate();
  const list = filter === 'الكل' ? notifications : notifications.filter((n) => n.category === filter);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="الإشعارات"
      description={`${notifications.filter((n) => n.unread).length} إشعارات غير مقروءة`}
      footer={
      <Button variant="outline" className="w-full" onClick={onClose}>
          تعليم الكل كمقروء
        </Button>
      }>
      
      <div className="px-6 py-4 border-b border-line">
        <SegmentedControl items={filters} value={filter} onChange={setFilter} />
      </div>
      {list.length === 0 ?
      <EmptyState title="لا توجد إشعارات" description="مفيش تنبيهات في هذا التصنيف حاليًا." /> :

      <ul className="divide-y divide-line">
          {list.map((n) => {
          const Icon = categoryIcon[n.category];
          return (
            <li key={n.id}>
                <button
                onClick={() => {
                  onClose();
                  navigate(routeFor[n.category]);
                }}
                className={cn(
                  'w-full text-right flex items-start gap-3 px-6 py-4 transition-colors duration-150 ease-out hover:bg-navy-50/60',
                  n.unread && 'bg-orange-50/40'
                )}>
                
                  <span className={cn('w-9 h-9 rounded-lg border flex items-center justify-center shrink-0', categoryTone[n.category])}>
                    <Icon className="w-4 h-4" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="text-[13.5px] font-bold text-navy">{n.title}</span>
                      {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-orange" aria-hidden />}
                    </span>
                    <span className="block text-[13px] text-ink-muted mt-0.5 leading-6">{n.description}</span>
                    <span className="block text-[11.5px] text-ink-subtle mt-1 tabular">{n.time}</span>
                  </span>
                </button>
              </li>);

        })}
        </ul>
      }
    </Drawer>);

}