import React from 'react';
import { MapPinOffIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface MapPanelProps {
  from: string;
  to: string;
  driverLabel?: string;
  progress?: number; // 0 - 1 position of driver along the route
  unavailable?: boolean;
  className?: string;
  height?: string;
}

export function MapPanel({
  from,
  to,
  driverLabel,
  progress = 0.55,
  unavailable = false,
  className,
  height = 'h-[300px]'
}: MapPanelProps) {
  if (unavailable) {
    return (
      <div
        className={cn(
          'rounded-xl border border-warn-200 bg-warn-100/50 flex flex-col items-center justify-center text-center gap-2',
          height,
          className
        )}>
        
        <MapPinOffIcon className="w-6 h-6 text-warn" aria-hidden />
        <p className="text-sm font-bold text-navy">لا تتوفر بيانات موقع حالية</p>
        <p className="text-[13px] text-ink-muted max-w-xs">
          آخر تحديث للموقع كان منذ أكثر من 20 دقيقة. تواصل مع السائق للتأكد من حالة الرحلة.
        </p>
      </div>);

  }

  // Route path in a 800x360 viewBox (RTL: pickup on the right, destination on the left)
  const path = 'M 700 92 L 560 92 L 560 200 L 380 200 L 380 274 L 120 274';
  const driverOffset = `${Math.round(progress * 100)}%`;

  return (
    <div className={cn('relative rounded-xl border border-line overflow-hidden bg-[#EDF0F6]', height, className)}>
      <svg viewBox="0 0 800 360" className="w-full h-full" role="img" aria-label={`مسار الرحلة من ${from} إلى ${to}`}>
        <defs>
          <pattern id="wedi-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#DFE3EC" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="800" height="360" fill="url(#wedi-grid)" />
        {/* main roads */}
        <rect x="0" y="86" width="800" height="12" fill="#E2E6EF" />
        <rect x="0" y="268" width="800" height="12" fill="#E2E6EF" />
        <rect x="554" y="0" width="12" height="360" fill="#E2E6EF" />
        <rect x="374" y="0" width="12" height="360" fill="#E2E6EF" />
        {/* blocks */}
        <rect x="90" y="130" width="220" height="90" rx="6" fill="#E7EAF2" />
        <rect x="600" y="150" width="150" height="80" rx="6" fill="#E7EAF2" />
        <rect x="420" y="300" width="180" height="46" rx="6" fill="#E7EAF2" />
        {/* route */}
        <path d={path} fill="none" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <path d={path} fill="none" stroke="#1A1F3D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {/* pickup */}
        <circle cx="700" cy="92" r="11" fill="#FF6835" stroke="#FFFFFF" strokeWidth="4" />
        {/* destination */}
        <circle cx="120" cy="274" r="11" fill="#1A1F3D" stroke="#FFFFFF" strokeWidth="4" />
        {/* driver */}
        {driverLabel &&
        <g>
            <circle cx="380" cy="236" r="13" fill="#6C63FF" stroke="#FFFFFF" strokeWidth="4" />
            <circle cx="380" cy="236" r="24" fill="#6C63FF" opacity="0.12" />
          </g>
        }
      </svg>

      <div className="absolute top-3 right-3 bg-white/95 border border-line rounded-lg px-3 py-2 shadow-card">
        <div className="flex items-center gap-2 text-[12px]">
          <span className="w-2.5 h-2.5 rounded-full bg-orange" aria-hidden />
          <span className="text-ink-muted">نقطة التحميل</span>
          <span className="font-medium text-ink">{from}</span>
        </div>
        <div className="flex items-center gap-2 text-[12px] mt-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-navy" aria-hidden />
          <span className="text-ink-muted">نقطة التسليم</span>
          <span className="font-medium text-ink">{to}</span>
        </div>
        {driverLabel &&
        <div className="flex items-center gap-2 text-[12px] mt-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple" aria-hidden />
            <span className="text-ink-muted">موقع السائق</span>
            <span className="font-medium text-ink">{driverLabel}</span>
          </div>
        }
      </div>

      {driverLabel &&
      <div className="absolute bottom-3 right-3 left-3 bg-white/95 border border-line rounded-lg px-3 py-2 shadow-card flex items-center gap-3">
          <span className="text-[12px] text-ink-muted shrink-0">تقدم الرحلة</span>
          <span className="h-1.5 flex-1 rounded-full bg-navy-100 overflow-hidden">
            <span className="block h-full bg-orange rounded-full" style={{ width: driverOffset }} />
          </span>
          <span className="text-[12px] font-medium text-navy tabular shrink-0">{driverOffset}</span>
        </div>
      }
    </div>);

}