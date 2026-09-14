import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader } from '../ui/Card';
import { driverActivity } from '../../data/drivers';
import { toneDot } from '../../utils/status';
import { cn } from '../../utils/cn';

export function DriverActivityPanel() {
  const total = driverActivity.reduce((a, b) => a + b.value, 0);

  return (
    <Card className="h-full">
      <CardHeader
        title="نشاط السائقين"
        description={`${total} سائق مسجل في المنصة`}
        action={
        <Link to="/drivers" className="text-[13px] font-medium text-purple hover:text-purple-700 transition-colors duration-150 ease-out">
            عرض السائقين
          </Link>
        } />
      
      <div className="px-6 pb-6 space-y-4">
        {driverActivity.map((item) =>
        <div key={item.label}>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className={cn('w-2.5 h-2.5 rounded-full', toneDot[item.tone])} aria-hidden />
              <span className="text-[13px] text-ink-muted">{item.label}</span>
              <span className="mr-auto text-sm font-bold text-navy tabular">{item.value}</span>
            </div>
            <div className="h-1.5 rounded-full bg-navy-50 overflow-hidden">
              <div
              className={cn('h-full rounded-full', toneDot[item.tone])}
              style={{ width: `${Math.round(item.value / total * 100)}%` }} />
            
            </div>
          </div>
        )}
      </div>
    </Card>);

}