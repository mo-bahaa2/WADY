import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardHeader } from '../ui/Card';
import { tripStatusBreakdown } from '../../data/trips';

export function TripStatusChart() {
  const total = tripStatusBreakdown.reduce((a, b) => a + b.value, 0);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader title="حالة الرحلات" description="توزيع رحلات اليوم حسب الحالة" />
      <div className="px-6 pb-6 flex-1 flex flex-col">
        <div className="relative h-[188px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={tripStatusBreakdown}
                dataKey="value"
                nameKey="name"
                innerRadius={62}
                outerRadius={88}
                paddingAngle={2}
                stroke="none">
                
                {tripStatusBreakdown.map((s) =>
                <Cell key={s.name} fill={s.color} />
                )}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: '1px solid #E4E7EF',
                  fontFamily: 'Tajawal',
                  fontSize: 13,
                  direction: 'rtl'
                }}
                formatter={(value: number, name: string) => [`${value} رحلة`, name]} />
              
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[26px] font-bold text-navy tabular leading-8">{total}</span>
            <span className="text-[12px] text-ink-muted">إجمالي اليوم</span>
          </div>
        </div>
        <ul className="mt-4 space-y-2">
          {tripStatusBreakdown.map((s) =>
          <li key={s.name} className="flex items-center gap-2.5 text-[13px]">
              <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: s.color }} aria-hidden />
              <span className="text-ink-muted">{s.name}</span>
              <span className="mr-auto font-medium text-ink tabular">{s.value}</span>
              <span className="text-ink-subtle tabular w-12 text-left">
                {Math.round(s.value / total * 100)}%
              </span>
            </li>
          )}
        </ul>
      </div>
    </Card>);

}