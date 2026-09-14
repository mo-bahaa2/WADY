import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangleIcon, ArrowLeftIcon, EyeIcon, TruckIcon } from 'lucide-react';
import { DataTable, Td, TableShell, Thead, Tr } from '../ui/Table';
import { StatusChip } from '../ui/StatusChip';
import { PersonCell } from '../ui/Avatar';
import { RowActions } from '../ui/Menu';
import { Button } from '../ui/Button';
import { EmptyState, ErrorState, SkeletonRows } from '../ui/States';
import { tripStateMeta } from '../../utils/status';
import { egp } from '../../utils/format';
import type { Trip } from '../../types';
import { useDataState } from '../../contexts/DataStateContext';

const activeColumns = [
'رقم الرحلة',
'العميل',
'السائق',
'من',
'إلى',
'الحالة',
'السعر',
'آخر تحديث',
'إجراء'];


const fullColumns = [
'رقم الرحلة',
'العميل',
'السائق',
'المسار',
'الحالة',
'السعر',
'وقت الإنشاء',
'آخر تحديث',
'الإجراء'];


export function TripsTable({
  trips,
  variant = 'full',
  footer,
  emptyTitle = 'لا توجد رحلات',
  emptyDescription = 'لا توجد رحلات تطابق الفلاتر الحالية.'






}: {trips: Trip[];variant?: 'active' | 'full';footer?: React.ReactNode;emptyTitle?: string;emptyDescription?: string;}) {
  const navigate = useNavigate();
  const state = useDataState();
  const columns = variant === 'active' ? activeColumns : fullColumns;

  if (state === 'error') {
    return (
      <TableShell>
        <ErrorState onRetry={() => undefined} />
      </TableShell>);

  }

  return (
    <TableShell>
      <DataTable>
        <Thead columns={columns} />
        {state === 'loading' ?
        <SkeletonRows rows={8} cols={columns.length} /> :

        <tbody>
            {(state === 'empty' ? [] : trips).map((t) =>
          <Tr key={t.id} onClick={() => navigate(`/trips/${t.id}`)}>
                <Td className="font-bold text-navy tabular whitespace-nowrap">#{t.id}</Td>
                <Td>
                  <PersonCell name={t.customer} />
                </Td>
                <Td>
                  {t.driver ?
              <PersonCell name={t.driver} /> :

              <span className="text-[13px] text-ink-subtle">لم يتم الاختيار</span>
              }
                </Td>
                {variant === 'active' ?
            <>
                    <Td className="whitespace-nowrap">{t.from}</Td>
                    <Td className="whitespace-nowrap">{t.to}</Td>
                  </> :

            <Td className="whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 text-[13px]">
                      {t.from}
                      <ArrowLeftIcon className="w-3.5 h-3.5 text-navy-300" aria-hidden />
                      {t.to}
                    </span>
                  </Td>
            }
                <Td>
                  <div className="flex items-center gap-1.5">
                    <StatusChip meta={tripStateMeta[t.state]} />
                    {t.hasIssue && t.state !== 'DISPUTED' &&
                <AlertTriangleIcon className="w-4 h-4 text-danger" aria-label="بها مشكلة" />
                }
                  </div>
                </Td>
                <Td className="tabular font-medium whitespace-nowrap">{egp(t.price)}</Td>
                {variant === 'full' && <Td className="tabular text-ink-muted whitespace-nowrap">{t.createdAt}</Td>}
                <Td className="tabular text-ink-muted whitespace-nowrap">{t.updatedAt}</Td>
                <Td>
                  <div className="flex items-center gap-1 justify-end">
                    <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/trips/${t.id}`);
                  }}
                  icon={<EyeIcon className="w-3.5 h-3.5" />}>
                  
                      {variant === 'active' ? 'عرض الرحلة' : 'عرض التفاصيل'}
                    </Button>
                    <RowActions
                  actions={[
                  { label: 'عرض التفاصيل', icon: EyeIcon, onSelect: () => navigate(`/trips/${t.id}`) },
                  {
                    label: t.disputeId ? 'عرض النزاع' : 'فتح نزاع',
                    icon: AlertTriangleIcon,
                    onSelect: () => navigate(t.disputeId ? `/disputes/${t.disputeId}` : '/disputes')
                  },
                  {
                    label: 'مراجعة السائق',
                    icon: TruckIcon,
                    onSelect: () => navigate(t.driverId ? `/drivers/${t.driverId}` : '/drivers')
                  },
                  { label: 'عرض الدفع', icon: EyeIcon, onSelect: () => navigate('/payments') }]
                  } />
                
                  </div>
                </Td>
              </Tr>
          )}
          </tbody>
        }
      </DataTable>
      {state === 'empty' && <EmptyState title={emptyTitle} description={emptyDescription} icon={TruckIcon} />}
      {state === 'ready' && trips.length === 0 &&
      <EmptyState title={emptyTitle} description={emptyDescription} icon={TruckIcon} />
      }
      {state === 'ready' && trips.length > 0 && footer}
    </TableShell>);

}