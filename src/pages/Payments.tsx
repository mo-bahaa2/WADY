import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip as RTooltip, XAxis, YAxis } from 'recharts';
import { CreditCardIcon, DownloadIcon, EyeIcon, RefreshCwIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { SearchInput, Select } from '../components/ui/Field';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { KpiCard } from '../components/ui/KpiCard';
import { Card, CardHeader, DataRow } from '../components/ui/Card';
import { DataTable, Pagination, TableShell, Td, Thead, Tr } from '../components/ui/Table';
import { StatusChip, Badge } from '../components/ui/StatusChip';
import { Drawer } from '../components/ui/Drawer';
import { RowActions } from '../components/ui/Menu';
import { EmptyState, ErrorState, SkeletonRows } from '../components/ui/States';
import { commissionSeries, payouts, transactions } from '../data/payments';
import { payoutStatusMeta, paymentStatusMeta } from '../utils/status';
import { egp } from '../utils/format';
import type { Transaction } from '../types';
import { useDataState } from '../contexts/DataStateContext';
import { useToast } from '../components/ui/Toast';

const txColumns = [
'رقم المعاملة',
'رقم الرحلة',
'العميل',
'المبلغ',
'طريقة الدفع',
'حالة الدفع',
'العمولة',
'مستحق السائق',
'التاريخ',
'الإجراء'];


const failedColumns = [
'رقم المعاملة',
'رقم الرحلة',
'العميل',
'المبلغ',
'طريقة الدفع',
'سبب الفشل',
'الحالة',
'التاريخ',
'الإجراء'];


const payoutColumns = ['السائق', 'رقم الرحلة', 'المبلغ', 'حالة التحويل', 'تاريخ التحويل', 'مرجع المعاملة', 'الإجراء'];

export function Payments() {
  const [tab, setTab] = useState('transactions');
  const [query, setQuery] = useState('');
  const [method, setMethod] = useState('all');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Transaction | null>(null);
  const state = useDataState();
  const toast = useToast();

  const failed = useMemo(() => transactions.filter((t) => t.status === 'FAILED'), []);
  const filteredTx = useMemo(
    () =>
    transactions.filter((t) => {
      if (method !== 'all' && t.method !== method) return false;
      if (query.trim() && !`${t.id} ${t.tripId} ${t.customer}`.includes(query.trim().toUpperCase()) && !t.customer.includes(query.trim()))
      return false;
      return true;
    }),
    [method, query]
  );

  const totalTripsValue = transactions.reduce((a, b) => a + b.amount, 0);
  const totalCommission = transactions.reduce((a, b) => a + b.commission, 0);

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader
        title="المدفوعات"
        description="متابعة معاملات العملاء، العمولة، المدفوعات الفاشلة، ومستحقات السائقين"
        actions={
        <Button variant="outline" icon={<DownloadIcon className="w-4 h-4" />} onClick={() => toast('success', 'جاري تجهيز الملف')}>
            تصدير
          </Button>
        } />
      

      <div className="bg-white border border-line rounded-card shadow-card mb-6">
        <Tabs
          className="px-4"
          value={tab}
          onChange={(k) => {
            setTab(k);
            setPage(1);
          }}
          items={[
          { key: 'transactions', label: 'المعاملات', count: transactions.length },
          { key: 'failed', label: 'مدفوعات فاشلة', count: failed.length },
          { key: 'commission', label: 'العمولة' },
          { key: 'payouts', label: 'مستحقات السائقين', count: payouts.length }]
          } />
        
        {(tab === 'transactions' || tab === 'failed') &&
        <div className="p-4 flex flex-wrap items-center gap-3">
            <SearchInput
            className="w-full lg:w-[320px]"
            placeholder="ابحث برقم المعاملة أو رقم الرحلة"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="بحث في المدفوعات" />
          
            <Select aria-label="طريقة الدفع" className="w-[190px]" value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="all">كل طرق الدفع</option>
              <option value="Visa">Visa</option>
              <option value="Mastercard">Mastercard</option>
              <option value="محفظة إلكترونية">محفظة إلكترونية</option>
              <option value="ميزة">ميزة</option>
            </Select>
          </div>
        }
      </div>

      {state === 'error' ?
      <TableShell>
          <ErrorState onRetry={() => undefined} />
        </TableShell> :

      <>
          {tab === 'transactions' &&
        <TableShell>
              <DataTable>
                <Thead columns={txColumns} />
                {state === 'loading' ?
            <SkeletonRows rows={8} cols={txColumns.length} /> :

            <tbody>
                    {(state === 'empty' ? [] : filteredTx).map((t) =>
              <Tr key={t.id} onClick={() => setSelected(t)}>
                        <Td className="font-bold text-navy tabular whitespace-nowrap">#{t.id}</Td>
                        <Td className="tabular whitespace-nowrap">
                          <Link to={`/trips/${t.tripId}`} className="hover:text-purple transition-colors duration-150 ease-out">
                            #{t.tripId}
                          </Link>
                        </Td>
                        <Td>{t.customer}</Td>
                        <Td className="tabular font-medium">{egp(t.amount)}</Td>
                        <Td>{t.method}</Td>
                        <Td>
                          <StatusChip meta={paymentStatusMeta[t.status]} />
                        </Td>
                        <Td className="tabular text-purple">{egp(t.commission)}</Td>
                        <Td className="tabular">{egp(t.driverAmount)}</Td>
                        <Td className="text-ink-muted whitespace-nowrap">{t.date}</Td>
                        <Td>
                          <div className="flex items-center gap-1 justify-end">
                            <Button
                      size="sm"
                      variant="outline"
                      icon={<EyeIcon className="w-3.5 h-3.5" />}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(t);
                      }}>
                      
                              عرض المعاملة
                            </Button>
                            <RowActions
                      actions={[
                      { label: 'عرض التفاصيل', icon: EyeIcon, onSelect: () => setSelected(t) },
                      { label: 'عرض الرحلة', icon: EyeIcon, onSelect: () => undefined }]
                      } />
                    
                          </div>
                        </Td>
                      </Tr>
              )}
                  </tbody>
            }
              </DataTable>
              {(state === 'empty' || state === 'ready' && filteredTx.length === 0) &&
          <EmptyState title="لا توجد معاملات" description="لا توجد معاملات تطابق الفلاتر الحالية." icon={CreditCardIcon} />
          }
              {state === 'ready' && filteredTx.length > 0 &&
          <Pagination page={page} pageCount={Math.max(1, Math.ceil(filteredTx.length / 10))} total={filteredTx.length} onChange={setPage} />
          }
            </TableShell>
        }

          {tab === 'failed' &&
        <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <KpiCard label="مدفوعات فاشلة" value={String(failed.length)} support="تحتاج مراجعة" accent="danger" emphasis />
                <KpiCard label="قيمة المدفوعات الفاشلة" value={egp(failed.reduce((a, b) => a + b.amount, 0))} accent="orange" />
                <KpiCard label="نجحت بعد إعادة المحاولة" value="1" support="آخر 24 ساعة" accent="purple" />
              </div>
              <TableShell>
                <DataTable>
                  <Thead columns={failedColumns} />
                  {state === 'loading' ?
              <SkeletonRows rows={5} cols={failedColumns.length} /> :

              <tbody>
                      {(state === 'empty' ? [] : failed).map((t) =>
                <Tr key={t.id} onClick={() => setSelected(t)}>
                          <Td className="font-bold text-navy tabular whitespace-nowrap">#{t.id}</Td>
                          <Td className="tabular whitespace-nowrap">#{t.tripId}</Td>
                          <Td>{t.customer}</Td>
                          <Td className="tabular font-medium">{egp(t.amount)}</Td>
                          <Td>{t.method}</Td>
                          <Td className="text-danger">{t.failureReason}</Td>
                          <Td>
                            <Badge tone={t.retryState === 'نجح' ? 'success' : t.retryState === 'فشل' ? 'danger' : 'warn'}>
                              {t.retryState}
                            </Badge>
                          </Td>
                          <Td className="text-ink-muted whitespace-nowrap">{t.date}</Td>
                          <Td>
                            <div className="flex items-center gap-1 justify-end">
                              <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(t);
                        }}>
                        
                                عرض التفاصيل
                              </Button>
                              <Button
                        size="sm"
                        icon={<RefreshCwIcon className="w-3.5 h-3.5" />}
                        onClick={(e) => {
                          e.stopPropagation();
                          toast('info', 'تمت إعادة المحاولة', `المعاملة #${t.id} قيد المعالجة.`);
                        }}>
                        
                                إعادة المحاولة
                              </Button>
                            </div>
                          </Td>
                        </Tr>
                )}
                    </tbody>
              }
                </DataTable>
                {(state === 'empty' || state === 'ready' && failed.length === 0) &&
            <EmptyState title="لا توجد مدفوعات فاشلة" description="كل المعاملات الحالية تمت بنجاح." icon={CreditCardIcon} />
            }
              </TableShell>
            </>
        }

          {tab === 'commission' &&
        <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-6">
                <KpiCard label="إجمالي قيمة الرحلات" value={egp(totalTripsValue)} />
                <KpiCard label="إجمالي العمولة" value={egp(totalCommission)} accent="purple" emphasis />
                <KpiCard label="متوسط العمولة" value="15%" support="من قيمة الرحلة" />
                <KpiCard label="العمولة اليوم" value={egp(19260)} accent="orange" />
                <KpiCard label="العمولة هذا الشهر" value={egp(365500)} />
              </div>
              <Card className="mb-6">
                <CardHeader title="العمولة عبر الوقت" description="آخر 4 أسابيع" />
                <div className="px-6 pb-6 h-[280px]" dir="ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={commissionSeries} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EF" vertical={false} />
                      <XAxis dataKey="label" reversed tick={{ fontFamily: 'Tajawal', fontSize: 12, fill: '#5F657C' }} axisLine={false} tickLine={false} />
                      <YAxis orientation="right" tick={{ fontFamily: 'Tajawal', fontSize: 12, fill: '#8A90A5' }} axisLine={false} tickLine={false} width={64} tickFormatter={(v: number) => `${v / 1000}k`} />
                      <RTooltip
                    contentStyle={{ borderRadius: 10, border: '1px solid #E4E7EF', fontFamily: 'Tajawal', fontSize: 13, direction: 'rtl' }}
                    formatter={(v: number) => [egp(v), 'العمولة']} />
                  
                      <Line type="monotone" dataKey="commission" stroke="#6C63FF" strokeWidth={2.5} dot={{ r: 3, fill: '#6C63FF' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              <TableShell>
                <DataTable>
                  <Thead columns={['رقم الرحلة', 'إجمالي السعر', 'العمولة', 'مستحق السائق', 'التاريخ']} />
                  <tbody>
                    {transactions.slice(0, 10).map((t) =>
                <Tr key={t.id}>
                        <Td className="font-bold text-navy tabular">#{t.tripId}</Td>
                        <Td className="tabular">{egp(t.amount)}</Td>
                        <Td className="tabular text-purple font-medium">{egp(t.commission)}</Td>
                        <Td className="tabular">{egp(t.driverAmount)}</Td>
                        <Td className="text-ink-muted">{t.date}</Td>
                      </Tr>
                )}
                  </tbody>
                </DataTable>
              </TableShell>
            </>
        }

          {tab === 'payouts' &&
        <TableShell>
              <DataTable>
                <Thead columns={payoutColumns} />
                {state === 'loading' ?
            <SkeletonRows rows={8} cols={payoutColumns.length} /> :

            <tbody>
                    {(state === 'empty' ? [] : payouts).map((p) =>
              <Tr key={p.id}>
                        <Td>
                          <Link to={`/drivers/${p.driverId}`} className="font-medium hover:text-purple transition-colors duration-150 ease-out">
                            {p.driver}
                          </Link>
                        </Td>
                        <Td className="tabular">#{p.tripId}</Td>
                        <Td className="tabular font-medium">{egp(p.amount)}</Td>
                        <Td>
                          <StatusChip meta={payoutStatusMeta[p.status]} />
                        </Td>
                        <Td className="text-ink-muted whitespace-nowrap">{p.date}</Td>
                        <Td className="tabular text-ink-muted">{p.reference}</Td>
                        <Td>
                          <Button size="sm" variant="outline" onClick={() => toast('info', 'تفاصيل التحويل', `${p.id} · ${p.driver}`)}>
                            عرض التفاصيل
                          </Button>
                        </Td>
                      </Tr>
              )}
                  </tbody>
            }
              </DataTable>
              {state === 'empty' && <EmptyState title="لا توجد مستحقات" description="مفيش مستحقات سائقين في الفترة دي." />}
            </TableShell>
        }
        </>
      }

      <Drawer
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title="تفاصيل المعاملة"
        description={selected ? `#${selected.id}` : undefined}
        footer={
        <div className="flex items-center gap-2">
            <Button className="flex-1" onClick={() => toast('info', 'تمت إعادة المحاولة', 'المعاملة قيد المعالجة.')} disabled={selected?.status !== 'FAILED'}>
              إعادة المحاولة
            </Button>
            <Button variant="outline" onClick={() => setSelected(null)}>
              إغلاق
            </Button>
          </div>
        }>
        
        {selected &&
        <div className="p-6">
            <div className="flex items-center justify-between gap-3 mb-4">
              <p className="text-[24px] font-bold text-navy tabular">{egp(selected.amount)}</p>
              <StatusChip meta={paymentStatusMeta[selected.status]} size="md" />
            </div>
            <dl>
              <DataRow label="رقم الرحلة" value={`#${selected.tripId}`} />
              <DataRow label="العميل" value={selected.customer} />
              <DataRow label="السائق" value={selected.driver} />
              <DataRow label="طريقة الدفع" value={selected.method} />
              <DataRow label="عمولة المنصة" value={egp(selected.commission)} />
              <DataRow label="مستحق السائق" value={egp(selected.driverAmount)} />
              <DataRow label="توقيت المعاملة" value={selected.date} />
              {selected.failureReason && <DataRow label="سبب الفشل" value={<span className="text-danger">{selected.failureReason}</span>} />}
              {selected.retryState && <DataRow label="حالة إعادة المحاولة" value={selected.retryState} />}
            </dl>
            {selected.status === 'FAILED' &&
          <div className="mt-4 border border-line rounded-xl p-4 bg-navy-50/50">
                <p className="text-[13px] text-ink leading-6">
                  التسليم مؤكد لهذه الرحلة. فشل الدفع لا يعني عدم وصول الحمولة — راجع سبب الفشل وأعد المحاولة أو تواصل مع
                  العميل.
                </p>
              </div>
          }
          </div>
        }
      </Drawer>
    </div>);

}