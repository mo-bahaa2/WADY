import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PhoneIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { Card, CardHeader, DataRow } from '../components/ui/Card';
import { Badge, StatusChip } from '../components/ui/StatusChip';
import { Avatar } from '../components/ui/Avatar';
import { DataTable, TableShell, Td, Thead, Tr } from '../components/ui/Table';
import { EmptyState } from '../components/ui/States';
import { customers } from '../data/customers';
import { trips } from '../data/trips';
import { transactions } from '../data/payments';
import { disputes } from '../data/disputes';
import { disputeStatusMeta, paymentStatusMeta, tripStateMeta } from '../utils/status';
import { egp, formatPhone } from '../utils/format';
import { useToast } from '../components/ui/Toast';

const tabs = [
{ key: 'personal', label: 'البيانات الشخصية' },
{ key: 'trips', label: 'الرحلات' },
{ key: 'payments', label: 'سجل المدفوعات' },
{ key: 'disputes', label: 'النزاعات' },
{ key: 'activity', label: 'النشاط' }];


const activityLog = [
{ title: 'أنشأ طلب رحلة #WDI-1048', time: 'اليوم، 04:12 م' },
{ title: 'اختار السائق محمد علي', time: 'اليوم، 04:19 م' },
{ title: 'وثّق حالة الحمولة بالصور', time: 'اليوم، 04:51 م' },
{ title: 'أكد تسليم الرحلة #WDI-1043', time: 'اليوم، 12:04 م' },
{ title: 'أبلغ عن مشكلة في الرحلة #WDI-1016', time: 'قبل 3 أيام' }];


export function CustomerProfile() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [tab, setTab] = useState('personal');
  const customer = customers.find((c) => c.id === customerId) ?? customers[0];

  const customerTrips = trips.filter((t) => t.customerId === customer.id);
  const customerTx = transactions.filter((t) => t.customer === customer.name);
  const customerDisputes = disputes.filter((d) => d.customer === customer.name);

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader
        crumbs={[{ label: 'العملاء', to: '/customers' }, { label: customer.name }]}
        title="ملف العميل"
        description={`${customer.id} · مسجل منذ ${customer.registeredAt}`}
        actions={
        <Button
          variant="outline"
          icon={<PhoneIcon className="w-4 h-4" />}
          onClick={() => toast('info', 'جاري الاتصال بالعميل', customer.name)}>
          
            اتصال بالعميل
          </Button>
        } />
      

      <Card className="p-6 mb-6">
        <div className="flex items-center gap-5 flex-wrap">
          <Avatar name={customer.name} size="lg" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[22px] font-bold text-navy">{customer.name}</h2>
              <Badge tone={customer.active ? 'success' : 'neutral'}>{customer.active ? 'نشط' : 'غير نشط'}</Badge>
            </div>
            <p className="text-[13px] text-ink-muted tabular mt-1">{formatPhone(customer.phone)}</p>
          </div>
          <dl className="mr-auto flex items-center gap-8 flex-wrap">
            <div>
              <dt className="text-[12px] text-ink-muted">الرحلات</dt>
              <dd className="text-[20px] font-bold text-navy tabular">{customer.trips}</dd>
            </div>
            <div>
              <dt className="text-[12px] text-ink-muted">مكتملة</dt>
              <dd className="text-[20px] font-bold text-success tabular">{customer.completed}</dd>
            </div>
            <div>
              <dt className="text-[12px] text-ink-muted">ملغاة</dt>
              <dd className="text-[20px] font-bold text-navy-400 tabular">{customer.cancelled}</dd>
            </div>
            <div>
              <dt className="text-[12px] text-ink-muted">النزاعات</dt>
              <dd className="text-[20px] font-bold text-danger tabular">{customer.disputes}</dd>
            </div>
          </dl>
        </div>
      </Card>

      <Tabs items={tabs} value={tab} onChange={setTab} className="bg-white border border-line rounded-t-card px-4" />

      <div className="mt-6">
        {tab === 'personal' &&
        <Card>
            <CardHeader title="البيانات الشخصية" description="بيانات حساب العميل" />
            <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-x-10">
              <dl>
                <DataRow label="الاسم" value={customer.name} />
                <DataRow label="رقم الهاتف" value={formatPhone(customer.phone)} />
              </dl>
              <dl>
                <DataRow label="تاريخ التسجيل" value={customer.registeredAt} />
                <DataRow label="الحالة" value={customer.active ? 'نشط' : 'غير نشط'} />
              </dl>
            </div>
          </Card>
        }

        {tab === 'trips' &&
        <TableShell>
            <DataTable>
              <Thead columns={['رقم الرحلة', 'السائق', 'المسار', 'الحالة', 'السعر', 'التاريخ']} />
              <tbody>
                {customerTrips.map((t) =>
              <Tr key={t.id} onClick={() => navigate(`/trips/${t.id}`)}>
                    <Td className="font-bold text-navy tabular">#{t.id}</Td>
                    <Td>{t.driver ?? '—'}</Td>
                    <Td className="whitespace-nowrap">
                      {t.from} ← {t.to}
                    </Td>
                    <Td>
                      <StatusChip meta={tripStateMeta[t.state]} />
                    </Td>
                    <Td className="tabular">{egp(t.price)}</Td>
                    <Td className="text-ink-muted">{t.createdAt}</Td>
                  </Tr>
              )}
              </tbody>
            </DataTable>
            {customerTrips.length === 0 && <EmptyState title="لا توجد رحلات" description="العميل لسه ما طلبش أي رحلة." />}
          </TableShell>
        }

        {tab === 'payments' &&
        <TableShell>
            <DataTable>
              <Thead columns={['رقم المعاملة', 'رقم الرحلة', 'المبلغ', 'طريقة الدفع', 'حالة الدفع', 'التاريخ']} />
              <tbody>
                {customerTx.map((t) =>
              <Tr key={t.id}>
                    <Td className="font-bold text-navy tabular">#{t.id}</Td>
                    <Td className="tabular">#{t.tripId}</Td>
                    <Td className="tabular">{egp(t.amount)}</Td>
                    <Td>{t.method}</Td>
                    <Td>
                      <StatusChip meta={paymentStatusMeta[t.status]} />
                    </Td>
                    <Td className="text-ink-muted">{t.date}</Td>
                  </Tr>
              )}
              </tbody>
            </DataTable>
            {customerTx.length === 0 &&
          <EmptyState title="لا يوجد سجل مدفوعات" description="مفيش معاملات دفع مسجلة لهذا العميل." />
          }
          </TableShell>
        }

        {tab === 'disputes' &&
        <TableShell>
            <DataTable>
              <Thead columns={['رقم النزاع', 'رقم الرحلة', 'نوع المشكلة', 'تاريخ البلاغ', 'الحالة']} />
              <tbody>
                {customerDisputes.map((d) =>
              <Tr key={d.id} onClick={() => navigate(`/disputes/${d.id}`)}>
                    <Td className="font-bold text-navy tabular">#{d.id}</Td>
                    <Td className="tabular">#{d.tripId}</Td>
                    <Td>{d.type}</Td>
                    <Td className="text-ink-muted">{d.reportedAt}</Td>
                    <Td>
                      <StatusChip meta={disputeStatusMeta[d.status]} />
                    </Td>
                  </Tr>
              )}
              </tbody>
            </DataTable>
            {customerDisputes.length === 0 &&
          <EmptyState title="لا توجد نزاعات" description="مفيش أي بلاغات مسجلة من أو على هذا العميل." />
          }
          </TableShell>
        }

        {tab === 'activity' &&
        <Card>
            <CardHeader title="سجل النشاط" description="آخر الأحداث المسجلة على حساب العميل" />
            <ul className="px-6 pb-6 divide-y divide-line">
              {activityLog.map((a) =>
            <li key={a.title} className="py-3 flex items-center justify-between gap-4">
                  <span className="text-[13.5px] text-ink">{a.title}</span>
                  <span className="text-[12.5px] text-ink-subtle tabular shrink-0">{a.time}</span>
                </li>
            )}
            </ul>
          </Card>
        }
      </div>
    </div>);

}