import React, { useMemo, useState } from 'react';
import { DownloadIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { SearchInput, Select } from '../components/ui/Field';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { Pagination } from '../components/ui/Table';
import { TripsTable } from '../components/trips/TripsTable';
import type { TripState } from '../types';
import { useToast } from '../components/ui/Toast';
import { useStore } from '../contexts/StoreContext';

const activeStates: TripState[] = [
  'REQUESTED',
  'BIDDING',
  'DRIVER_SELECTED',
  'DRIVER_ON_ROUTE',
  'DRIVER_ARRIVED',
  'LOAD_REVIEW',
  'IN_TRANSIT',
  'ARRIVED',
  'DELIVERY_PENDING'
];

export function Trips() {
  const [tab, setTab] = useState('all');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [driver, setDriver] = useState('all');
  const [region, setRegion] = useState('all');
  const [range, setRange] = useState('today');
  const [page, setPage] = useState(1);
  const toast = useToast();
  const { trips, drivers } = useStore();

  const counts = useMemo(
    () => ({
      all: trips.length,
      active: trips.filter((t) => activeStates.includes(t.state)).length,
      completed: trips.filter((t) => t.state === 'COMPLETED').length,
      cancelled: trips.filter((t) => t.state === 'CANCELLED').length,
      issues: trips.filter((t) => t.hasIssue).length
    }),
    [trips]
  );

  const filtered = useMemo(() => {
    return trips.filter((t) => {
      if (tab === 'active' && !activeStates.includes(t.state)) return false;
      if (tab === 'completed' && t.state !== 'COMPLETED') return false;
      if (tab === 'cancelled' && t.state !== 'CANCELLED') return false;
      if (tab === 'issues' && !t.hasIssue) return false;
      if (status !== 'all' && t.state !== status) return false;
      if (driver !== 'all' && t.driverId !== driver) return false;
      if (region !== 'all' && t.region !== region) return false;
      if (query.trim()) {
        const q = query.trim();
        const hay = `${t.id} ${t.customer} ${t.driver ?? ''}`;
        if (!hay.includes(q) && !t.id.includes(q.toUpperCase())) return false;
      }
      return true;
    });
  }, [trips, tab, status, driver, region, query]);

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader
        title="الرحلات"
        description="إدارة ومتابعة جميع رحلات وِدي"
        actions={
          <Button
            variant="outline"
            icon={<DownloadIcon className="w-4 h-4" />}
            onClick={() => toast('success', 'جاري تجهيز الملف', 'هيتم تنزيل تقرير الرحلات خلال لحظات.')}
          >
            تصدير
          </Button>
        }
      />

      <div className="bg-white border border-line rounded-card shadow-card mb-6">
        <div className="p-4 flex flex-wrap items-center gap-3">
          <SearchInput
            className="w-full lg:w-[340px]"
            placeholder="ابحث برقم الرحلة أو اسم العميل أو السائق"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="بحث في الرحلات"
          />
          <Select
            aria-label="الحالة"
            className="w-[170px]"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">كل الحالات</option>
            <option value="IN_TRANSIT">جارية</option>
            <option value="DRIVER_ON_ROUTE">السائق في الطريق</option>
            <option value="DELIVERY_PENDING">بانتظار التأكيد</option>
            <option value="DISPUTED">متنازع عليها</option>
            <option value="COMPLETED">مكتملة</option>
            <option value="CANCELLED">ملغاة</option>
          </Select>
          <Select aria-label="التاريخ" className="w-[150px]" value={range} onChange={(e) => setRange(e.target.value)}>
            <option value="today">اليوم</option>
            <option value="week">هذا الأسبوع</option>
            <option value="month">هذا الشهر</option>
            <option value="custom">مخصص</option>
          </Select>
          <Select aria-label="السائق" className="w-[170px]" value={driver} onChange={(e) => setDriver(e.target.value)}>
            <option value="all">كل السائقين</option>
            {drivers.slice(0, 8).map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </Select>
          <Select aria-label="المنطقة" className="w-[150px]" value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="all">كل المناطق</option>
            <option value="القاهرة">القاهرة</option>
            <option value="الجيزة">الجيزة</option>
          </Select>
          {(status !== 'all' || driver !== 'all' || region !== 'all' || query) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setStatus('all');
                setDriver('all');
                setRegion('all');
                setQuery('');
              }}
            >
              مسح الفلاتر
            </Button>
          )}
        </div>
        <Tabs
          className="px-4"
          value={tab}
          onChange={(k) => {
            setTab(k);
            setPage(1);
          }}
          items={[
            { key: 'all', label: 'كل الرحلات', count: counts.all },
            { key: 'active', label: 'نشطة', count: counts.active },
            { key: 'completed', label: 'مكتملة', count: counts.completed },
            { key: 'cancelled', label: 'ملغاة', count: counts.cancelled },
            { key: 'issues', label: 'بها مشاكل', count: counts.issues }
          ]}
        />
      </div>

      <TripsTable
        trips={filtered}
        variant="full"
        footer={
          <Pagination
            page={page}
            pageCount={Math.max(1, Math.ceil(filtered.length / 10))}
            total={filtered.length}
            onChange={setPage}
          />
        }
      />
    </div>
  );
}