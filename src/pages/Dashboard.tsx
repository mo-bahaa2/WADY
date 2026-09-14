import React from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangleIcon,
  CreditCardIcon,
  TruckIcon,
  UserCheckIcon
} from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { KpiCard } from '../components/ui/KpiCard';
import { SectionTitle } from '../components/ui/Card';
import { AttentionPanel } from '../components/dashboard/AttentionPanel';
import { TripStatusChart } from '../components/dashboard/TripStatusChart';
import { DriverActivityPanel } from '../components/dashboard/DriverActivityPanel';
import { FinancialPanel } from '../components/dashboard/FinancialPanel';
import { TripsTable } from '../components/trips/TripsTable';
import { SkeletonCard } from '../components/ui/States';
import { useDataState } from '../contexts/DataStateContext';
import { useStore } from '../contexts/StoreContext';

const activeStates = new Set([
  'REQUESTED',
  'BIDDING',
  'DRIVER_SELECTED',
  'DRIVER_ON_ROUTE',
  'DRIVER_ARRIVED',
  'LOAD_REVIEW',
  'IN_TRANSIT',
  'ARRIVED',
  'DELIVERY_PENDING'
]);

export function Dashboard() {
  const state = useDataState();
  const { trips } = useStore();
  const activeTrips = trips.filter((t) => activeStates.has(t.state));

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader
        title="لوحة التحكم"
        description="نظرة سريعة على حالة التشغيل اليوم"
        meta={
          <span className="text-[12.5px] text-ink-subtle bg-white border border-line rounded-full px-3 h-7 inline-flex items-center tabular">
            آخر تحديث: منذ دقيقة
          </span>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {state === 'loading' ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            <KpiCard
              label="الرحلات النشطة"
              value={activeTrips.length.toString()}
              support="جارية الآن"
              accent="orange"
              icon={TruckIcon}
              to="/trips"
              emphasis
            />
            <KpiCard
              label="رحلات اليوم"
              value={trips.length.toString()}
              trend={{ direction: 'up', value: '+12% مقارنة بالأمس' }}
              icon={TruckIcon}
              to="/trips"
            />
            <KpiCard
              label="السائقون المتاحون"
              value="86"
              support="متصلون الآن"
              accent="purple"
              icon={UserCheckIcon}
              to="/drivers"
            />
            <KpiCard
              label="نزاعات مفتوحة"
              value="7"
              support="تحتاج مراجعة"
              accent="danger"
              icon={AlertTriangleIcon}
              to="/disputes"
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-2">
          <AttentionPanel empty={state === 'empty'} />
        </div>
        <TripStatusChart />
      </div>

      <section className="mb-6">
        <SectionTitle
          description="الرحلات الجارية الآن على المنصة"
          action={
            <Link
              to="/trips"
              className="text-[13px] font-medium text-purple hover:text-purple-700 transition-colors duration-150 ease-out"
            >
              عرض كل الرحلات
            </Link>
          }
        >
          الرحلات النشطة
        </SectionTitle>
        <TripsTable
          trips={activeTrips}
          variant="active"
          emptyTitle="لا توجد رحلات نشطة"
          emptyDescription="مفيش رحلات جارية على المنصة في اللحظة دي."
        />
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <FinancialPanel loading={state === 'loading'} />
        </div>
        <div className="space-y-6">
          <DriverActivityPanel />
          <div className="grid grid-cols-2 gap-4">
            <KpiCard label="مدفوعات فاشلة" value="5" support="تحتاج مراجعة" accent="danger" icon={CreditCardIcon} to="/payments" />
            <KpiCard
              label="بانتظار التحقق"
              value="12"
              support="طلبات سائقين"
              accent="orange"
              icon={UserCheckIcon}
              to="/drivers"
            />
          </div>
        </div>
      </div>
    </div>
  );
}