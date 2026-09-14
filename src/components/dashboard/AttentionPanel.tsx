import React from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangleIcon,
  ClockIcon,
  CreditCardIcon,
  FileWarningIcon,
  UserCheckIcon } from
'lucide-react';
import { Card, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { EmptyState } from '../ui/States';
import { cn } from '../../utils/cn';

interface AttentionItem {
  key: string;
  icon: React.ComponentType<{className?: string;}>;
  title: string;
  description: string;
  count: number;
  action: string;
  to: string;
  severity: 'urgent' | 'high' | 'normal';
}

const items: AttentionItem[] = [
{
  key: 'disputes',
  icon: AlertTriangleIcon,
  title: 'نزاعات مفتوحة',
  description: '7 نزاعات تحتاج مراجعة، منها 2 عاجلة',
  count: 7,
  action: 'مراجعة النزاعات',
  to: '/disputes',
  severity: 'urgent'
},
{
  key: 'payments',
  icon: CreditCardIcon,
  title: 'مدفوعات فاشلة',
  description: '5 عمليات تحتاج مراجعة بعد تأكيد التسليم',
  count: 5,
  action: 'عرض المدفوعات',
  to: '/payments',
  severity: 'urgent'
},
{
  key: 'verification',
  icon: UserCheckIcon,
  title: 'سائقون بانتظار التحقق',
  description: '12 طلب تسجيل جديد بانتظار مراجعة المستندات',
  count: 12,
  action: 'مراجعة الطلبات',
  to: '/drivers',
  severity: 'high'
},
{
  key: 'documents',
  icon: FileWarningIcon,
  title: 'مستندات سائقين منتهية',
  description: '3 مستندات انتهت صلاحيتها لسائقين نشطين',
  count: 3,
  action: 'عرض السائقين',
  to: '/drivers',
  severity: 'high'
},
{
  key: 'late',
  icon: ClockIcon,
  title: 'رحلات متأخرة',
  description: 'رحلتان تجاوزتا الوقت المتوقع للوصول',
  count: 2,
  action: 'عرض الرحلات',
  to: '/trips',
  severity: 'normal'
}];


const severityStyle = {
  urgent: 'bg-danger-100 text-danger border-danger-200',
  high: 'bg-orange-50 text-orange-700 border-orange-100',
  normal: 'bg-navy-50 text-navy-600 border-navy-100'
} as const;

export function AttentionPanel({ empty = false }: {empty?: boolean;}) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader
        title="يحتاج انتباهك"
        description="أهم المشكلات التشغيلية المفتوحة الآن"
        action={
        <span className="text-[12px] text-ink-subtle tabular">
            {items.reduce((a, b) => a + b.count, 0)} عنصر
          </span>
        } />
      
      {empty ?
      <EmptyState title="مفيش حاجة تحتاج انتباهك" description="كل الحالات التشغيلية الحالية تمت مراجعتها." /> :

      <ul className="divide-y divide-line border-t border-line">
          {items.map((item) =>
        <li key={item.key} className="flex items-center gap-4 px-6 py-3.5">
              <span
            className={cn(
              'w-10 h-10 rounded-xl border flex items-center justify-center shrink-0',
              severityStyle[item.severity]
            )}>
            
                <item.icon className="w-[18px] h-[18px]" aria-hidden />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-navy">{item.title}</p>
                  <span
                className={cn(
                  'text-[11px] font-bold tabular rounded-full px-2 h-5 inline-flex items-center border',
                  severityStyle[item.severity]
                )}>
                
                    {item.count}
                  </span>
                </div>
                <p className="text-[13px] text-ink-muted mt-0.5">{item.description}</p>
              </div>
              <Link to={item.to} className="shrink-0">
                <Button size="sm" variant={item.severity === 'urgent' ? 'primary' : 'outline'}>
                  {item.action}
                </Button>
              </Link>
            </li>
        )}
        </ul>
      }
    </Card>);

}