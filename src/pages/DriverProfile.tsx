import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  BadgeCheckIcon,
  CheckCircle2Icon,
  EyeIcon,
  FileTextIcon,
  RefreshCwIcon,
  StarIcon,
  UserXIcon,
  XCircleIcon } from
'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { Card, CardHeader, DataRow } from '../components/ui/Card';
import { StatusChip, Badge } from '../components/ui/StatusChip';
import { Avatar } from '../components/ui/Avatar';
import { Modal } from '../components/ui/Modal';
import { Textarea } from '../components/ui/Field';
import { StepFlow } from '../components/ui/Timeline';
import { DataTable, TableShell, Td, Thead, Tr } from '../components/ui/Table';
import { EmptyState } from '../components/ui/States';
import { trips } from '../data/trips';
import { IMG_VEHICLE } from '../data/evidence';
import { documentStatusMeta, driverStatusMeta, tripStateMeta } from '../utils/status';
import { egp, formatPhone, maskNationalId } from '../utils/format';
import { useToast } from '../components/ui/Toast';
import { useStore } from '../contexts/StoreContext';
import { useDataState } from '../contexts/DataStateContext';
import { ErrorState, Skeleton } from '../components/ui/States';

const tabs = [
{ key: 'personal', label: 'البيانات الشخصية' },
{ key: 'vehicle', label: 'المركبة' },
{ key: 'documents', label: 'المستندات' },
{ key: 'verification', label: 'التحقق' },
{ key: 'rating', label: 'التقييم' },
{ key: 'trips', label: 'الرحلات' },
{ key: 'earnings', label: 'الأرباح' }];


const verificationSteps = [
{ key: 'new', label: 'سائق جديد' },
{ key: 'request', label: 'مراجعة الطلب' },
{ key: 'docs', label: 'مراجعة المستندات' },
{ key: 'check', label: 'فحص صلاحية المستندات' },
{ key: 'decision', label: 'قرار التحقق' },
{ key: 'activate', label: 'تفعيل السائق' }];


type ActionKey = 'approve' | 'update' | 'reject' | 'suspend' | 'activate' | null;

export function DriverProfile() {
  const { driverId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const state = useDataState();
  const { drivers, approveDriverDocument } = useStore();
  const driver = drivers.find((d) => d.id === driverId) ?? drivers[0];
  const [tab, setTab] = useState(driver.status === 'PENDING_VERIFICATION' ? 'verification' : 'personal');
  const [action, setAction] = useState<ActionKey>(null);
  const [isApproving, setIsApproving] = useState<string | null>(null);
  const [step, setStep] = useState(driver.status === 'PENDING_VERIFICATION' ? 3 : 5);

  const driverTrips = trips.filter((t) => t.driverId === driver.id);
  const pending = driver.status === 'PENDING_VERIFICATION';
  const expiredDocs = driver.documents.filter((d) => d.status === 'EXPIRED' || d.status === 'NEEDS_UPDATE');

  if (state === 'error') {
    return <ErrorState onRetry={() => undefined} />;
  }

  if (state === 'loading') {
    return (
      <div className="max-w-[1600px] mx-auto space-y-6">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-32" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  const actionCopy: Record<Exclude<ActionKey, null>, {title: string;description: string;cta: string;tone: 'warning' | 'confirm' | 'success';variant: 'primary' | 'danger' | 'secondary';}> = {
    approve: {
      title: 'اعتماد السائق',
      description: 'سيتم تفعيل السائق وبدء استقبال الرحلات فورًا بعد الاعتماد.',
      cta: 'اعتماد السائق',
      tone: 'success',
      variant: 'primary'
    },
    update: {
      title: 'طلب تحديث البيانات',
      description: 'هيتم إرسال إشعار للسائق بالمستندات المطلوب تحديثها قبل استكمال التحقق.',
      cta: 'إرسال الطلب',
      tone: 'confirm',
      variant: 'primary'
    },
    reject: {
      title: 'رفض طلب السائق',
      description: 'سيتم رفض طلب التسجيل ولن يتمكن السائق من استقبال رحلات. الإجراء ده بيتسجل في سجل المراجعة.',
      cta: 'رفض الطلب',
      tone: 'warning',
      variant: 'danger'
    },
    suspend: {
      title: 'هل أنت متأكد من إيقاف هذا السائق؟',
      description: 'سيتم منع السائق من استقبال رحلات جديدة، مع الاحتفاظ بسجل رحلاته ومستحقاته.',
      cta: 'إيقاف السائق',
      tone: 'warning',
      variant: 'danger'
    },
    activate: {
      title: 'إعادة تفعيل السائق',
      description: 'هيرجع السائق يستقبل رحلات جديدة على المنصة.',
      cta: 'تفعيل السائق',
      tone: 'success',
      variant: 'primary'
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader
        crumbs={[{ label: 'السائقون', to: '/drivers' }, { label: driver.name }]}
        title="ملف السائق"
        description={`${driver.id} · مسجل منذ ${driver.registeredAt}`}
        actions={
        <>
            {pending ?
          <>
                <Button variant="outline" icon={<RefreshCwIcon className="w-4 h-4" />} onClick={() => setAction('update')}>
                  طلب تحديث
                </Button>
                <Button variant="danger" icon={<XCircleIcon className="w-4 h-4" />} onClick={() => setAction('reject')}>
                  رفض الطلب
                </Button>
                <Button icon={<CheckCircle2Icon className="w-4 h-4" />} onClick={() => setAction('approve')}>
                  اعتماد السائق
                </Button>
              </> :
          driver.status === 'SUSPENDED' ?
          <Button icon={<CheckCircle2Icon className="w-4 h-4" />} onClick={() => setAction('activate')}>
                تفعيل السائق
              </Button> :

          <>
                <Button variant="outline" icon={<RefreshCwIcon className="w-4 h-4" />} onClick={() => setAction('update')}>
                  طلب تحديث البيانات
                </Button>
                <Button variant="danger" icon={<UserXIcon className="w-4 h-4" />} onClick={() => setAction('suspend')}>
                  إيقاف السائق
                </Button>
              </>
          }
          </>
        } />
      

      <Card className="p-6 mb-6">
        <div className="flex items-center gap-5 flex-wrap">
          <Avatar name={driver.name} size="lg" />
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-[22px] font-bold text-navy">{driver.name}</h2>
              {driver.verified && <BadgeCheckIcon className="w-5 h-5 text-success" aria-label="تم التحقق" />}
              <StatusChip meta={driverStatusMeta[driver.status]} size="md" />
            </div>
            <p className="text-[13px] text-ink-muted tabular mt-1">
              {formatPhone(driver.phone)} · {driver.governorate} · {driver.vehicle}
            </p>
          </div>
          <dl className="mr-auto flex items-center gap-8 flex-wrap">
            <div>
              <dt className="text-[12px] text-ink-muted">التقييم</dt>
              <dd className="text-[20px] font-bold text-navy tabular flex items-center gap-1.5">
                <StarIcon className="w-4 h-4 text-orange" aria-hidden />
                {driver.rating > 0 ? driver.rating : '—'}
              </dd>
            </div>
            <div>
              <dt className="text-[12px] text-ink-muted">الرحلات</dt>
              <dd className="text-[20px] font-bold text-navy tabular">{driver.trips}</dd>
            </div>
            <div>
              <dt className="text-[12px] text-ink-muted">إجمالي الأرباح</dt>
              <dd className="text-[20px] font-bold text-navy tabular">{egp(driver.earnings)}</dd>
            </div>
          </dl>
        </div>
        {expiredDocs.length > 0 &&
        <div className="mt-5 flex items-center gap-3 border border-warn-200 bg-warn-100/60 rounded-xl px-4 py-3">
            <FileTextIcon className="w-4 h-4 text-warn shrink-0" aria-hidden />
            <p className="text-[13px] text-navy">
              <span className="font-bold">{expiredDocs.length} مستند</span> يحتاج تحديث أو منتهي الصلاحية.
            </p>
            <Button size="sm" variant="outline" className="mr-auto" onClick={() => setTab('documents')}>
              عرض المستندات
            </Button>
          </div>
        }
      </Card>

      <Tabs items={tabs} value={tab} onChange={setTab} className="bg-white border border-line rounded-t-card px-4" />

      <div className="mt-6 space-y-6">
        {tab === 'personal' &&
        <Card>
            <CardHeader title="البيانات الشخصية" description="بيانات التسجيل الأساسية للسائق" />
            <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-x-10">
              <dl>
                <DataRow label="الاسم" value={driver.name} />
                <DataRow label="رقم الهاتف" value={formatPhone(driver.phone)} />
                <DataRow label="الرقم القومي" value={maskNationalId(driver.nationalId)} />
              </dl>
              <dl>
                <DataRow label="المحافظة" value={driver.governorate} />
                <DataRow label="تاريخ التسجيل" value={driver.registeredAt} />
                <DataRow label="آخر نشاط" value={driver.lastActive} />
              </dl>
            </div>
          </Card>
        }

        {tab === 'vehicle' &&
        <Card>
            <CardHeader
            title="بيانات المركبة"
            description="المركبة المسجلة للسائق"
            action={<Badge tone={driver.verified ? 'success' : 'warn'}>{driver.verified ? 'مركبة موثقة' : 'بانتظار التحقق'}</Badge>} />
          
            <div className="px-6 pb-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-10">
                <dl>
                  <DataRow label="نوع المركبة" value={driver.vehicle} />
                  <DataRow label="رقم اللوحة" value={driver.plate} />
                  <DataRow label="الموديل" value={driver.model} />
                </dl>
                <dl>
                  <DataRow label="اللون" value={driver.color} />
                  <DataRow label="سعة المركبة" value={driver.capacity} />
                  <DataRow
                  label="حالة التحقق"
                  value={<StatusChip meta={documentStatusMeta[driver.verified ? 'VALID' : 'IN_REVIEW']} />} />
                
                </dl>
              </div>
              <figure>
                <img
                src={IMG_VEHICLE}
                alt={`صورة مركبة السائق ${driver.name}`}
                className="w-full h-44 object-cover rounded-xl border border-line"
                loading="lazy" />
              
                <figcaption className="text-[12px] text-ink-subtle mt-2">صورة المركبة المرفوعة من السائق</figcaption>
              </figure>
            </div>
          </Card>
        }

        {tab === 'documents' &&
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
            {driver.documents.map((doc) =>
          <Card key={doc.name} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-lg bg-navy-50 border border-line flex items-center justify-center">
                      <FileTextIcon className="w-4 h-4 text-navy-500" aria-hidden />
                    </span>
                    <p className="text-sm font-bold text-navy">{doc.name}</p>
                  </div>
                  <StatusChip meta={documentStatusMeta[doc.status]} />
                </div>
                <dl className="mt-3">
                  <DataRow label="تاريخ الإصدار" value={doc.issuedAt} />
                  <DataRow label="تاريخ الانتهاء" value={doc.expiresAt} />
                  <DataRow label="تاريخ الرفع" value={doc.uploadedAt} />
                </dl>
                <div className="flex items-center gap-2 mt-4">
                  {doc.status !== 'VALID' && (
                    <Button 
                      size="sm" 
                      variant="primary" 
                      disabled={isApproving === doc.name}
                      onClick={async () => {
                        setIsApproving(doc.name);
                        await approveDriverDocument(driver.id, doc.name);
                        setIsApproving(null);
                        toast('success', 'تم اعتماد المستند', `تم اعتماد مستند ${doc.name} بنجاح.`);
                      }}
                    >
                      {isApproving === doc.name ? 'جاري الاعتماد...' : 'اعتماد'}
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    icon={<EyeIcon className="w-3.5 h-3.5" />}
                    onClick={() => toast('info', 'معاينة المستند', doc.name)}
                  >
                    معاينة
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setAction('update')}>
                    طلب تحديث
                  </Button>
                </div>
              </Card>
          )}
          </div>
        }

        {tab === 'verification' &&
        <>
            <Card>
              <CardHeader
              title="مسار التحقق"
              description="راجع كل خطوة قبل اتخاذ قرار التفعيل"
              action={<Badge tone={pending ? 'warn' : 'success'}>{pending ? 'قيد التحقق' : 'تم التحقق'}</Badge>} />
            
              <div className="px-6 pb-6">
                <StepFlow steps={verificationSteps} activeIndex={step} onSelect={setStep} />
              </div>
            </Card>

            <Card>
              <CardHeader title="فحص المستندات" description="هل المستندات مكتملة وصالحة؟" />
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-line rounded-xl p-4">
                    <p className="text-[12.5px] text-ink-muted">اكتمال المستندات</p>
                    <p className="text-sm font-bold mt-1 flex items-center gap-2">
                      {driver.documentsComplete ?
                    <>
                          <CheckCircle2Icon className="w-4 h-4 text-success" aria-hidden />
                          <span className="text-success">كل المستندات المطلوبة مرفوعة</span>
                        </> :

                    <>
                          <XCircleIcon className="w-4 h-4 text-warn" aria-hidden />
                          <span className="text-warn">في مستندات ناقصة</span>
                        </>
                    }
                    </p>
                  </div>
                  <div className="border border-line rounded-xl p-4">
                    <p className="text-[12.5px] text-ink-muted">صلاحية المستندات</p>
                    <p className="text-sm font-bold mt-1 flex items-center gap-2">
                      {expiredDocs.length === 0 ?
                    <>
                          <CheckCircle2Icon className="w-4 h-4 text-success" aria-hidden />
                          <span className="text-success">كل المستندات سارية</span>
                        </> :

                    <>
                          <XCircleIcon className="w-4 h-4 text-danger" aria-hidden />
                          <span className="text-danger">{expiredDocs.length} مستند يحتاج تحديث</span>
                        </>
                    }
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="verify-note" className="block text-[13px] font-medium text-navy-600 mb-1.5">
                    ملاحظات المراجعة (داخلية)
                  </label>
                  <Textarea id="verify-note" placeholder="سجل ملاحظاتك على الطلب قبل اتخاذ القرار..." />
                </div>
                <div className="flex items-center gap-2 mt-4 flex-wrap">
                  <Button onClick={() => setAction('approve')}>اعتماد السائق</Button>
                  <Button variant="outline" onClick={() => setAction('update')}>
                    طلب تحديث البيانات
                  </Button>
                  <Button variant="danger" onClick={() => setAction('reject')}>
                    رفض الطلب
                  </Button>
                </div>
              </div>
            </Card>
          </>
        }

        {tab === 'rating' &&
        <Card>
            <CardHeader title="التقييم" description={`متوسط تقييم السائق من ${driver.trips} رحلة`} />
            <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center justify-center border border-line rounded-xl p-6">
                <p className="text-[40px] font-bold text-navy tabular leading-none">{driver.rating || '—'}</p>
                <p className="text-[13px] text-ink-muted mt-2">من 5</p>
              </div>
              <div className="md:col-span-2 space-y-2.5">
                {[
                  { stars: 5, count: 184 },
                  { stars: 4, count: 22 },
                  { stars: 3, count: 5 },
                  { stars: 2, count: 2 },
                  { stars: 1, count: 1 }
                ].map((r) => {
                const total = 214; // hardcoded total for mock breakdown
                return (
                  <div key={r.stars} className="flex items-center gap-3">
                      <span className="text-[12.5px] text-ink-muted w-12 tabular flex items-center gap-1">
                        {r.stars}
                        <StarIcon className="w-3.5 h-3.5 text-orange" aria-hidden />
                      </span>
                      <span className="h-2 flex-1 bg-navy-50 rounded-full overflow-hidden">
                        <span className="block h-full bg-navy rounded-full" style={{ width: `${r.count / total * 100}%` }} />
                      </span>
                      <span className="text-[12.5px] text-ink-muted tabular w-10 text-left">{r.count}</span>
                    </div>);

              })}
              </div>
            </div>
          </Card>
        }

        {tab === 'trips' &&
        <TableShell>
            <DataTable>
              <Thead columns={['رقم الرحلة', 'العميل', 'المسار', 'الحالة', 'السعر', 'مستحق السائق', 'التاريخ']} />
              <tbody>
                {driverTrips.map((t) =>
              <Tr key={t.id} onClick={() => navigate(`/trips/${t.id}`)}>
                    <Td className="font-bold text-navy tabular">#{t.id}</Td>
                    <Td>{t.customer}</Td>
                    <Td className="whitespace-nowrap">
                      {t.from} ← {t.to}
                    </Td>
                    <Td>
                      <StatusChip meta={tripStateMeta[t.state]} />
                    </Td>
                    <Td className="tabular">{egp(t.price)}</Td>
                    <Td className="tabular">{egp(t.price - t.commission)}</Td>
                    <Td className="text-ink-muted">{t.createdAt}</Td>
                  </Tr>
              )}
              </tbody>
            </DataTable>
            {driverTrips.length === 0 &&
          <EmptyState title="لا توجد رحلات" description="السائق لسه ما نفذش أي رحلة على المنصة." />
          }
          </TableShell>
        }

        {tab === 'earnings' &&
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-5">
              <p className="text-[13px] text-ink-muted">إجمالي الأرباح</p>
              <p className="text-[26px] font-bold text-navy tabular mt-2">{egp(driver.earnings)}</p>
            </Card>
            <Card className="p-5">
              <p className="text-[13px] text-ink-muted">مستحقات قيد التحويل</p>
              <p className="text-[26px] font-bold text-warn tabular mt-2">{egp(1480)}</p>
            </Card>
            <Card className="p-5">
              <p className="text-[13px] text-ink-muted">آخر تحويل</p>
              <p className="text-[26px] font-bold text-navy tabular mt-2">{egp(2320)}</p>
              <p className="text-[12px] text-ink-subtle mt-1 tabular">أمس، 06:40 م · REF-99108</p>
            </Card>
          </div>
        }
      </div>

      {action &&
      <Modal
        open
        onClose={() => setAction(null)}
        title={actionCopy[action].title}
        description={actionCopy[action].description}
        tone={actionCopy[action].tone}
        confirmLabel={actionCopy[action].cta}
        confirmVariant={actionCopy[action].variant}
        onConfirm={() => {
          const label = actionCopy[action].cta;
          setAction(null);
          if (action === 'approve') setStep(5);
          toast('success', 'تم تنفيذ الإجراء', `${label} — ${driver.name}`);
        }}>
        
          {(action === 'update' || action === 'reject') &&
        <div>
              <label htmlFor="action-reason" className="block text-[13px] font-medium text-navy-600 mb-1.5">
                السبب
              </label>
              <Textarea id="action-reason" placeholder="اكتب السبب اللي هيتبعت للسائق..." />
            </div>
        }
        </Modal>
      }
    </div>);

}