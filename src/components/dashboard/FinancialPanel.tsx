import React, { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardHeader } from '../ui/Card';
import { SegmentedControl } from '../ui/Tabs';
import { SkeletonChart } from '../ui/States';
import { revenueSeries } from '../../data/payments';
import { egp } from '../../utils/format';

const periods = [
{ key: 'day', label: 'اليوم' },
{ key: 'week', label: 'هذا الأسبوع' },
{ key: 'month', label: 'هذا الشهر' }];


const factor: Record<string, number> = { day: 0.16, week: 1, month: 4.2 };

export function FinancialPanel({ loading = false }: {loading?: boolean;}) {
  const [period, setPeriod] = useState('week');
  const f = factor[period];
  const data = revenueSeries.map((d) => ({
    label: d.label,
    revenue: Math.round(d.revenue * (period === 'day' ? 1 : 1)),
    commission: Math.round(d.commission * (period === 'day' ? 1 : 1))
  }));

  const revenue = Math.round(128450 * f);
  const commission = Math.round(19260 * f);
  const success = Math.round(112 * f);
  const failed = Math.round(5 * f);

  return (
    <Card>
      <CardHeader
        title="الأداء المالي"
        description="الإيرادات والعمولة وحالة المدفوعات"
        action={<SegmentedControl items={periods} value={period} onChange={setPeriod} />} />
      
      <div className="grid grid-cols-2 lg:grid-cols-4 border-y border-line">
        {[
        { label: 'الإيرادات', value: egp(revenue), tone: 'text-navy' },
        { label: 'العمولة', value: egp(commission), tone: 'text-purple' },
        { label: 'مدفوعات ناجحة', value: `${success}`, tone: 'text-success' },
        { label: 'مدفوعات فاشلة', value: `${failed}`, tone: 'text-danger' }].
        map((k) =>
        <div key={k.label} className="px-6 py-4 border-l border-line last:border-l-0">
            <p className="text-[12.5px] text-ink-muted">{k.label}</p>
            <p className={`text-[20px] font-bold tabular mt-1 ${k.tone}`}>{k.value}</p>
          </div>
        )}
      </div>
      <div className="p-6">
        {loading ?
        <SkeletonChart /> :

        <div className="h-[248px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 0 }} barGap={6}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EF" vertical={false} />
                <XAxis
                dataKey="label"
                tick={{ fontFamily: 'Tajawal', fontSize: 12, fill: '#5F657C' }}
                axisLine={false}
                tickLine={false}
                reversed />
              
                <YAxis
                orientation="right"
                tick={{ fontFamily: 'Tajawal', fontSize: 12, fill: '#8A90A5' }}
                axisLine={false}
                tickLine={false}
                width={64}
                tickFormatter={(v: number) => `${v / 1000}k`} />
              
                <Tooltip
                cursor={{ fill: 'rgba(26,31,61,0.04)' }}
                contentStyle={{
                  borderRadius: 10,
                  border: '1px solid #E4E7EF',
                  fontFamily: 'Tajawal',
                  fontSize: 13,
                  direction: 'rtl'
                }}
                formatter={(value: number, name: string) => [
                egp(value),
                name === 'revenue' ? 'الإيرادات' : 'العمولة']
                } />
              
                <Legend
                formatter={(value: string) =>
                <span style={{ fontFamily: 'Tajawal', fontSize: 12, color: '#5F657C' }}>
                      {value === 'revenue' ? 'الإيرادات' : 'العمولة'}
                    </span>
                } />
              
                <Bar dataKey="revenue" fill="#1A1F3D" radius={[4, 4, 0, 0]} maxBarSize={26} />
                <Bar dataKey="commission" fill="#6C63FF" radius={[4, 4, 0, 0]} maxBarSize={26} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        }
      </div>
    </Card>);

}