import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangleIcon, EyeIcon, ShieldCheckIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { SearchInput, Select } from '../components/ui/Field';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { KpiCard } from '../components/ui/KpiCard';
import { DataTable, Pagination, TableShell, Td, Thead, Tr } from '../components/ui/Table';
import { StatusChip } from '../components/ui/StatusChip';
import { PersonCell } from '../components/ui/Avatar';
import { RowActions } from '../components/ui/Menu';
import { EmptyState, ErrorState, SkeletonRows } from '../components/ui/States';
import { disputes } from '../data/disputes';
import { disputePriorityMeta, disputeStatusMeta } from '../utils/status';
import { useDataState } from '../contexts/DataStateContext';

const columns = [
'رقم النزاع',
'رقم الرحلة',
'العميل',
'السائق',
'نوع المشكلة',
'تاريخ البلاغ',
'الأولوية',
'الحالة',
'الإجراء'];


export function Disputes() {
  const [tab, setTab] = useState('open');
  const [query, setQuery] = useState('');
  const [priority, setPriority] = useState('all');
  const [type, setType] = useState('all');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const state = useDataState();

  const counts = useMemo(
    () => ({
      open: disputes.filter((d) => d.status === 'OPEN').length,
      review: disputes.filter((d) => d.status === 'IN_REVIEW').length,
      resolved: disputes.filter((d) => d.status === 'RESOLVED' || d.status === 'CLOSED').length
    }),
    []
  );

  const filtered = useMemo(
    () =>
    disputes.filter((d) => {
      if (tab === 'open' && d.status !== 'OPEN') return false;
      if (tab === 'review' && d.status !== 'IN_REVIEW') return false;
      if (tab === 'resolved' && !(d.status === 'RESOLVED' || d.status === 'CLOSED')) return false;
      if (priority !== 'all' && d.priority !== priority) return false;
      if (type !== 'all' && d.type !== type) return false;
      if (query.trim() && !`${d.id} ${d.tripId} ${d.customer} ${d.driver}`.includes(query.trim().toUpperCase()) && !`${d.customer} ${d.driver}`.includes(query.trim()))
      return false;
      return true;
    }),
    [tab, priority, type, query]
  );

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader
        title="النزاعات"
        description="حل مشكلات النقل بالاعتماد على أدلة الرحلة الموثقة" />
      

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <KpiCard label="نزاعات مفتوحة" value={String(counts.open)} support="تحتاج مراجعة" accent="danger" emphasis />
        <KpiCard label="قيد المراجعة" value={String(counts.review)} support="جاري جمع الأدلة" accent="orange" />
        <KpiCard label="تم حلها" value={String(counts.resolved)} support="آخر 7 أيام" accent="purple" />
        <KpiCard label="متوسط وقت الحل" value="6 ساعات" support="من الإبلاغ للإغلاق" />
      </div>

      <div className="bg-white border border-line rounded-card shadow-card mb-6">
        <div className="p-4 flex flex-wrap items-center gap-3">
          <SearchInput
            className="w-full lg:w-[320px]"
            placeholder="ابحث برقم النزاع أو رقم الرحلة"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="بحث في النزاعات" />
          
          <Select aria-label="الأولوية" className="w-[160px]" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="all">كل الأولويات</option>
            <option value="URGENT">عاجل</option>
            <option value="HIGH">مرتفع</option>
            <option value="NORMAL">عادي</option>
          </Select>
          <Select aria-label="نوع المشكلة" className="w-[190px]" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">كل أنواع المشكلات</option>
            <option value="تلف في الحمولة">تلف في الحمولة</option>
            <option value="حمولة ناقصة">حمولة ناقصة</option>
            <option value="تأخير في التسليم">تأخير في التسليم</option>
            <option value="خلاف على السعر">خلاف على السعر</option>
            <option value="مشكلة في الدفع">مشكلة في الدفع</option>
            <option value="سلوك غير لائق">سلوك غير لائق</option>
          </Select>
        </div>
        <Tabs
          className="px-4"
          value={tab}
          onChange={(k) => {
            setTab(k);
            setPage(1);
          }}
          items={[
          { key: 'open', label: 'مفتوحة', count: counts.open },
          { key: 'review', label: 'قيد المراجعة', count: counts.review },
          { key: 'resolved', label: 'تم حلها', count: counts.resolved }]
          } />
        
      </div>

      {state === 'error' ?
      <TableShell>
          <ErrorState onRetry={() => undefined} />
        </TableShell> :

      <TableShell>
          <DataTable>
            <Thead columns={columns} />
            {state === 'loading' ?
          <SkeletonRows rows={8} cols={columns.length} /> :

          <tbody>
                {(state === 'empty' ? [] : filtered).map((d) =>
            <Tr key={d.id} onClick={() => navigate(`/disputes/${d.id}`)}>
                    <Td className="font-bold text-navy tabular whitespace-nowrap">#{d.id}</Td>
                    <Td className="tabular whitespace-nowrap">#{d.tripId}</Td>
                    <Td>
                      <PersonCell name={d.customer} />
                    </Td>
                    <Td>
                      <PersonCell name={d.driver} />
                    </Td>
                    <Td className="whitespace-nowrap">{d.type}</Td>
                    <Td className="text-ink-muted whitespace-nowrap">{d.reportedAt}</Td>
                    <Td>
                      <StatusChip meta={disputePriorityMeta[d.priority]} withIcon={d.priority === 'URGENT'} />
                    </Td>
                    <Td>
                      <StatusChip meta={disputeStatusMeta[d.status]} />
                    </Td>
                    <Td>
                      <div className="flex items-center gap-1 justify-end">
                        <Button
                    size="sm"
                    variant={d.status === 'OPEN' ? 'primary' : 'outline'}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/disputes/${d.id}`);
                    }}>
                    
                          {d.status === 'OPEN' ? 'مراجعة الأدلة' : 'عرض التفاصيل'}
                        </Button>
                        <RowActions
                    actions={[
                    { label: 'عرض التفاصيل', icon: EyeIcon, onSelect: () => navigate(`/disputes/${d.id}`) },
                    { label: 'عرض الرحلة', icon: EyeIcon, onSelect: () => navigate(`/trips/${d.tripId}`) }]
                    } />
                  
                      </div>
                    </Td>
                  </Tr>
            )}
              </tbody>
          }
          </DataTable>
          {(state === 'empty' || state === 'ready' && filtered.length === 0) &&
        <EmptyState
          title={tab === 'open' ? 'لا توجد نزاعات مفتوحة' : 'لا توجد نزاعات'}
          description="كل الحالات الحالية تمت مراجعتها."
          icon={tab === 'open' ? ShieldCheckIcon : AlertTriangleIcon} />

        }
          {state === 'ready' && filtered.length > 0 &&
        <Pagination
          page={page}
          pageCount={Math.max(1, Math.ceil(filtered.length / 10))}
          total={filtered.length}
          onChange={setPage} />

        }
        </TableShell>
      }
    </div>);

}