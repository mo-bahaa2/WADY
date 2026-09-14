import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, FileTextIcon, StarIcon, UserCheckIcon, UserXIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { SearchInput, Select } from '../components/ui/Field';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { Card } from '../components/ui/Card';
import { DataTable, Pagination, TableShell, Td, Thead, Tr } from '../components/ui/Table';
import { StatusChip, Badge } from '../components/ui/StatusChip';
import { Avatar, PersonCell } from '../components/ui/Avatar';
import { RowActions } from '../components/ui/Menu';
import { EmptyState, ErrorState, SkeletonRows } from '../components/ui/States';
import { drivers } from '../data/drivers';
import { driverStatusMeta } from '../utils/status';
import { egp, formatPhone } from '../utils/format';
import { useDataState } from '../contexts/DataStateContext';

const columns = [
'السائق',
'رقم الهاتف',
'المركبة',
'الحالة',
'التقييم',
'الرحلات',
'الأرباح',
'آخر نشاط',
'الإجراء'];


export function Drivers() {
  const [tab, setTab] = useState('all');
  const [query, setQuery] = useState('');
  const [governorate, setGovernorate] = useState('all');
  const [rating, setRating] = useState('all');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const state = useDataState();

  const counts = useMemo(
    () => ({
      all: drivers.length,
      pending: drivers.filter((d) => d.status === 'PENDING_VERIFICATION').length,
      verified: drivers.filter((d) => d.verified && d.status !== 'SUSPENDED').length,
      suspended: drivers.filter((d) => d.status === 'SUSPENDED').length
    }),
    []
  );

  const filtered = useMemo(
    () =>
    drivers.filter((d) => {
      if (tab === 'pending' && d.status !== 'PENDING_VERIFICATION') return false;
      if (tab === 'verified' && (!d.verified || d.status === 'SUSPENDED')) return false;
      if (tab === 'suspended' && d.status !== 'SUSPENDED') return false;
      if (governorate !== 'all' && d.governorate !== governorate) return false;
      if (rating === '4plus' && d.rating < 4) return false;
      if (query.trim() && !`${d.name} ${d.phone}`.includes(query.trim())) return false;
      return true;
    }),
    [tab, governorate, rating, query]
  );

  const pendingView = tab === 'pending';

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader
        title={pendingView ? 'السائقون بانتظار التحقق' : 'السائقون'}
        description={
        pendingView ?
        'طلبات تسجيل جديدة تحتاج مراجعة المستندات قبل التفعيل' :
        'إدارة السائقين، التحقق من المستندات، ومتابعة النشاط'
        } />
      

      <div className="bg-white border border-line rounded-card shadow-card mb-6">
        <div className="p-4 flex flex-wrap items-center gap-3">
          <SearchInput
            className="w-full lg:w-[320px]"
            placeholder="ابحث باسم السائق أو رقم الهاتف"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="بحث في السائقين" />
          
          <Select
            aria-label="المحافظة"
            className="w-[170px]"
            value={governorate}
            onChange={(e) => setGovernorate(e.target.value)}>
            
            <option value="all">كل المحافظات</option>
            <option value="القاهرة">القاهرة</option>
            <option value="الجيزة">الجيزة</option>
            <option value="الإسكندرية">الإسكندرية</option>
            <option value="القليوبية">القليوبية</option>
            <option value="الشرقية">الشرقية</option>
            <option value="الدقهلية">الدقهلية</option>
          </Select>
          <Select aria-label="التقييم" className="w-[150px]" value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="all">كل التقييمات</option>
            <option value="4plus">4 نجوم فأكثر</option>
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
          { key: 'all', label: 'كل السائقين', count: counts.all },
          { key: 'pending', label: 'بانتظار التحقق', count: counts.pending },
          { key: 'verified', label: 'تم التحقق', count: counts.verified },
          { key: 'suspended', label: 'موقوفون', count: counts.suspended }]
          } />
        
      </div>

      {state === 'error' ?
      <TableShell>
          <ErrorState onRetry={() => undefined} />
        </TableShell> :
      pendingView ?
      state === 'empty' || filtered.length === 0 ?
      <TableShell>
            <EmptyState
          title="لا يوجد سائقون بانتظار التحقق"
          description="كل طلبات التسجيل الحالية تمت مراجعتها."
          icon={UserCheckIcon} />
        
          </TableShell> :

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
            {filtered.map((d) =>
        <Card key={d.id} className="p-5">
                <div className="flex items-start gap-3">
                  <Avatar name={d.name} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-bold text-navy">{d.name}</p>
                    <p className="text-[12.5px] text-ink-muted tabular">{formatPhone(d.phone)}</p>
                  </div>
                  <StatusChip meta={driverStatusMeta[d.status]} />
                </div>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-[13px]">
                  <div>
                    <dt className="text-ink-subtle text-[12px]">تاريخ التسجيل</dt>
                    <dd className="text-ink font-medium tabular">{d.registeredAt}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-subtle text-[12px]">المحافظة</dt>
                    <dd className="text-ink font-medium">{d.governorate}</dd>
                  </div>
                  <div>
                    <dt className="text-ink-subtle text-[12px]">المركبة</dt>
                    <dd className="text-ink font-medium">
                      {d.vehicle} · {d.model}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-subtle text-[12px]">المستندات</dt>
                    <dd>
                      <Badge tone={d.documentsComplete ? 'success' : 'warn'}>
                        <FileTextIcon className="w-3.5 h-3.5" aria-hidden />
                        {d.documentsComplete ? 'مكتملة' : 'ناقصة'}
                      </Badge>
                    </dd>
                  </div>
                </dl>
                <div className="flex items-center gap-2 mt-4">
                  <Button size="sm" className="flex-1" onClick={() => navigate(`/drivers/${d.id}`)}>
                    مراجعة الطلب
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => navigate(`/drivers/${d.id}`)}>
                    عرض المستندات
                  </Button>
                </div>
              </Card>
        )}
          </div> :


      <TableShell>
          <DataTable>
            <Thead columns={columns} />
            {state === 'loading' ?
          <SkeletonRows rows={8} cols={columns.length} /> :

          <tbody>
                {(state === 'empty' ? [] : filtered).map((d) =>
            <Tr key={d.id} onClick={() => navigate(`/drivers/${d.id}`)}>
                    <Td>
                      <PersonCell name={d.name} sub={d.id} />
                    </Td>
                    <Td className="tabular whitespace-nowrap">{formatPhone(d.phone)}</Td>
                    <Td className="whitespace-nowrap">
                      <span className="block">{d.vehicle}</span>
                      <span className="block text-[12px] text-ink-subtle tabular">{d.plate}</span>
                    </Td>
                    <Td>
                      <StatusChip meta={driverStatusMeta[d.status]} />
                    </Td>
                    <Td>
                      {d.rating > 0 ?
                <span className="inline-flex items-center gap-1 tabular font-medium">
                          <StarIcon className="w-3.5 h-3.5 text-orange" aria-hidden />
                          {d.rating}
                        </span> :

                <span className="text-ink-subtle text-[12.5px]">—</span>
                }
                    </Td>
                    <Td className="tabular">{d.trips}</Td>
                    <Td className="tabular whitespace-nowrap">{egp(d.earnings)}</Td>
                    <Td className="text-ink-muted whitespace-nowrap">{d.lastActive}</Td>
                    <Td>
                      <div className="flex items-center gap-1 justify-end">
                        <Button
                    size="sm"
                    variant="outline"
                    icon={<EyeIcon className="w-3.5 h-3.5" />}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/drivers/${d.id}`);
                    }}>
                    
                          عرض الملف
                        </Button>
                        <RowActions
                    actions={[
                    { label: 'عرض الملف', icon: EyeIcon, onSelect: () => navigate(`/drivers/${d.id}`) },
                    { label: 'مراجعة المستندات', icon: FileTextIcon, onSelect: () => navigate(`/drivers/${d.id}`) },
                    { label: 'إيقاف السائق', icon: UserXIcon, danger: true, onSelect: () => navigate(`/drivers/${d.id}`) }]
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
          title="لا يوجد سائقون"
          description="لا يوجد سائقون يطابقون الفلاتر الحالية."
          icon={UserCheckIcon} />

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

      {!pendingView && counts.pending > 0 && state === 'ready' &&
      <div className="mt-4 flex items-center justify-between gap-4 bg-orange-50 border border-orange-100 rounded-card px-5 py-4">
          <p className="text-[13.5px] text-navy">
            <span className="font-bold">{counts.pending} سائقين</span> بانتظار مراجعة المستندات والتحقق.
          </p>
          <Button size="sm" onClick={() => setTab('pending')}>
            مراجعة الطلبات
          </Button>
        </div>
      }
    </div>);

}