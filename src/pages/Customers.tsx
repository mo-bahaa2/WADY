import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangleIcon, EyeIcon, UsersIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { SearchInput, Select } from '../components/ui/Field';
import { Button } from '../components/ui/Button';
import { DataTable, Pagination, TableShell, Td, Thead, Tr } from '../components/ui/Table';
import { Badge } from '../components/ui/StatusChip';
import { PersonCell } from '../components/ui/Avatar';
import { RowActions } from '../components/ui/Menu';
import { EmptyState, ErrorState, SkeletonRows } from '../components/ui/States';
import { customers } from '../data/customers';
import { formatPhone } from '../utils/format';
import { useDataState } from '../contexts/DataStateContext';

const columns = [
'العميل',
'رقم الهاتف',
'عدد الرحلات',
'الرحلات المكتملة',
'الرحلات الملغاة',
'النزاعات',
'آخر نشاط',
'الحالة',
'الإجراء'];


export function Customers() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [withDisputes, setWithDisputes] = useState('all');
  const [range, setRange] = useState('month');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const state = useDataState();

  const filtered = useMemo(
    () =>
    customers.filter((c) => {
      if (status === 'active' && !c.active) return false;
      if (status === 'inactive' && c.active) return false;
      if (withDisputes === 'yes' && c.disputes === 0) return false;
      if (query.trim() && !`${c.name} ${c.phone}`.includes(query.trim())) return false;
      return true;
    }),
    [query, status, withDisputes]
  );

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader title="العملاء" description="متابعة نشاط العملاء ورحلاتهم ونزاعاتهم" />

      <div className="bg-white border border-line rounded-card shadow-card mb-6 p-4 flex flex-wrap items-center gap-3">
        <SearchInput
          className="w-full lg:w-[320px]"
          placeholder="ابحث باسم العميل أو رقم الهاتف"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="بحث في العملاء" />
        
        <Select aria-label="الحالة" className="w-[160px]" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">كل الحالات</option>
          <option value="active">نشط</option>
          <option value="inactive">غير نشط</option>
        </Select>
        <Select aria-label="التاريخ" className="w-[150px]" value={range} onChange={(e) => setRange(e.target.value)}>
          <option value="month">هذا الشهر</option>
          <option value="week">هذا الأسبوع</option>
          <option value="custom">مخصص</option>
        </Select>
        <Select
          aria-label="النزاعات"
          className="w-[170px]"
          value={withDisputes}
          onChange={(e) => setWithDisputes(e.target.value)}>
          
          <option value="all">كل العملاء</option>
          <option value="yes">لديهم نزاعات</option>
        </Select>
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
                {(state === 'empty' ? [] : filtered).map((c) =>
            <Tr key={c.id} onClick={() => navigate(`/customers/${c.id}`)}>
                    <Td>
                      <PersonCell name={c.name} sub={c.id} />
                    </Td>
                    <Td className="tabular whitespace-nowrap">{formatPhone(c.phone)}</Td>
                    <Td className="tabular">{c.trips}</Td>
                    <Td className="tabular text-success">{c.completed}</Td>
                    <Td className="tabular text-ink-muted">{c.cancelled}</Td>
                    <Td>
                      {c.disputes > 0 ?
                <span className="inline-flex items-center gap-1.5 text-danger font-medium tabular">
                          <AlertTriangleIcon className="w-3.5 h-3.5" aria-hidden />
                          {c.disputes}
                        </span> :

                <span className="text-ink-subtle tabular">0</span>
                }
                    </Td>
                    <Td className="text-ink-muted whitespace-nowrap">{c.lastActive}</Td>
                    <Td>
                      <Badge tone={c.active ? 'success' : 'neutral'}>{c.active ? 'نشط' : 'غير نشط'}</Badge>
                    </Td>
                    <Td>
                      <div className="flex items-center gap-1 justify-end">
                        <Button
                    size="sm"
                    variant="outline"
                    icon={<EyeIcon className="w-3.5 h-3.5" />}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/customers/${c.id}`);
                    }}>
                    
                          عرض الملف
                        </Button>
                        <RowActions
                    actions={[
                    { label: 'عرض الملف', icon: EyeIcon, onSelect: () => navigate(`/customers/${c.id}`) },
                    { label: 'عرض النزاعات', icon: AlertTriangleIcon, onSelect: () => navigate('/disputes') }]
                    } />
                  
                      </div>
                    </Td>
                  </Tr>
            )}
              </tbody>
          }
          </DataTable>
          {(state === 'empty' || state === 'ready' && filtered.length === 0) &&
        <EmptyState title="لا يوجد عملاء" description="لا يوجد عملاء يطابقون الفلاتر الحالية." icon={UsersIcon} />
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