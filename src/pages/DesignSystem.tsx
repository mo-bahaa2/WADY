import React, { useState } from 'react';
import { AlertTriangleIcon, EyeIcon, PlusIcon, TruckIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card, CardHeader, DataRow, SectionTitle } from '../components/ui/Card';
import { Button, IconButton } from '../components/ui/Button';
import { FieldLabel, SearchInput, Select, TextInput, Textarea, Toggle } from '../components/ui/Field';
import { SegmentedControl, Tabs } from '../components/ui/Tabs';
import { Badge, CountBadge, StatusChip } from '../components/ui/StatusChip';
import { DataTable, Pagination, TableShell, Td, Thead, Tr } from '../components/ui/Table';
import { EmptyState, ErrorState, Skeleton, SkeletonCard, SkeletonChart } from '../components/ui/States';
import { Modal } from '../components/ui/Modal';
import { Drawer } from '../components/ui/Drawer';
import { RowActions, Tooltip } from '../components/ui/Menu';
import { KpiCard } from '../components/ui/KpiCard';
import { Timeline, StepFlow } from '../components/ui/Timeline';
import { EvidenceBlock } from '../components/ui/EvidenceGallery';
import { MapPanel } from '../components/ui/MapPanel';
import { Avatar, PersonCell } from '../components/ui/Avatar';
import { useToast } from '../components/ui/Toast';
import { tripTimeline } from '../data/trips';
import { tripEvidence } from '../data/evidence';
import { disputeSteps } from '../data/disputes';
import {
  disputePriorityMeta,
  disputeStatusMeta,
  documentStatusMeta,
  driverStatusMeta,
  paymentStatusMeta,
  payoutStatusMeta,
  tripStateMeta } from
'../utils/status';

const colors = [
{ name: 'Primary Navy', hex: '#1A1F3D', role: 'الهوية، الشريط الجانبي، العناوين' },
{ name: 'Primary Orange', hex: '#FF6835', role: 'الإجراءات الأساسية والتنبيهات' },
{ name: 'Secondary Purple', hex: '#6C63FF', role: 'التحليلات والحالات المعلوماتية' },
{ name: 'Background', hex: '#F2F4F8', role: 'خلفية الصفحات' },
{ name: 'Text', hex: '#1E1E1E', role: 'النص الأساسي' },
{ name: 'Line', hex: '#E4E7EF', role: 'الحدود والفواصل' },
{ name: 'Success', hex: '#12805C', role: 'حالات النجاح' },
{ name: 'Danger', hex: '#C0392B', role: 'حالات الفشل والخطر' },
{ name: 'Warn', hex: '#A96A0B', role: 'حالات الانتظار والتحذير' }];


const typeScale = [
{ name: 'Display', size: '34px / Bold', cls: 'text-[34px] font-bold' },
{ name: 'عنوان الصفحة', size: '28px / Bold', cls: 'text-[28px] font-bold' },
{ name: 'عنوان قسم', size: '20px / Bold', cls: 'text-xl font-bold' },
{ name: 'عنوان بطاقة', size: '17px / Bold', cls: 'text-[17px] font-bold' },
{ name: 'النص الأساسي', size: '14px / Regular', cls: 'text-sm' },
{ name: 'نص ثانوي', size: '13px / Regular', cls: 'text-[13px] text-ink-muted' },
{ name: 'الجداول', size: '13.5px', cls: 'text-[13.5px]' },
{ name: 'تسميات صغيرة', size: '12px', cls: 'text-[12px] text-ink-subtle' }];


const spacing = [8, 12, 16, 20, 24, 32, 40, 48];

export function DesignSystem() {
  const [tab, setTab] = useState('tab1');
  const [segment, setSegment] = useState('day');
  const [modal, setModal] = useState<null | 'confirm' | 'warning' | 'success' | 'error'>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [page, setPage] = useState(2);
  const toast = useToast();

  return (
    <div className="max-w-[1400px] mx-auto pb-10">
      <PageHeader
        crumbs={[{ label: 'الإعدادات', to: '/settings' }, { label: 'دليل المكونات' }]}
        title="نظام التصميم — وِدي"
        description="الألوان، الخطوط، المسافات، والمكونات المستخدمة في لوحة التحكم" />
      

      <section className="mb-10">
        <SectionTitle description="لوحة ألوان وِدي وأدوارها">الألوان</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {colors.map((c) =>
          <Card key={c.hex} className="overflow-hidden">
              <div className="h-20" style={{ background: c.hex }} />
              <div className="p-4">
                <p className="text-[13.5px] font-bold text-navy">{c.name}</p>
                <p className="text-[12px] text-ink-subtle tabular" dir="ltr">
                  {c.hex}
                </p>
                <p className="text-[12px] text-ink-muted mt-1">{c.role}</p>
              </div>
            </Card>
          )}
        </div>
      </section>

      <section className="mb-10 grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader title="الخطوط" description="خط Tajawal في كل مستويات النص" />
          <div className="px-6 pb-6 divide-y divide-line">
            {typeScale.map((t) =>
            <div key={t.name} className="py-3 flex items-baseline justify-between gap-6">
                <span className={t.cls}>من هنا لهنالك</span>
                <span className="text-[12px] text-ink-subtle shrink-0 tabular">
                  {t.name} · {t.size}
                </span>
              </div>
            )}
          </div>
        </Card>
        <div className="space-y-6">
          <Card>
            <CardHeader title="المسافات" description="نظام 8px" />
            <div className="px-6 pb-6 space-y-2">
              {spacing.map((s) =>
              <div key={s} className="flex items-center gap-3">
                  <span className="text-[12px] text-ink-subtle w-8 tabular">{s}</span>
                  <span className="h-3 bg-purple-200 rounded" style={{ width: s * 4 }} />
                </div>
              )}
            </div>
          </Card>
          <Card>
            <CardHeader title="الشبكة" description="12 عمود" />
            <div className="px-6 pb-6 grid grid-cols-12 gap-1">
              {Array.from({ length: 12 }).map((_, i) =>
              <span key={i} className="h-12 bg-navy-50 border border-line rounded" />
              )}
            </div>
          </Card>
        </div>
      </section>

      <section className="mb-10">
        <SectionTitle description="الأنواع والأحجام والحالات">الأزرار</SectionTitle>
        <Card className="p-6 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <Button>أساسي</Button>
            <Button variant="secondary">ثانوي</Button>
            <Button variant="outline">محدد</Button>
            <Button variant="ghost">شفاف</Button>
            <Button variant="danger">خطر</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">صغير</Button>
            <Button size="md">متوسط</Button>
            <Button size="lg">كبير</Button>
            <Button icon={<PlusIcon className="w-4 h-4" />}>مع أيقونة</Button>
            <Button loading>جاري التحميل</Button>
            <Button disabled>معطل</Button>
            <IconButton label="عرض">
              <EyeIcon className="w-4 h-4" />
            </IconButton>
            <Tooltip label="تلميح توضيحي">
              <Button variant="outline">مع Tooltip</Button>
            </Tooltip>
          </div>
        </Card>
      </section>

      <section className="mb-10 grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="حقول الإدخال" description="الحالات: افتراضي، تركيز، خطأ، معطل، معبأ" />
          <div className="px-6 pb-6 space-y-4">
            <div>
              <FieldLabel htmlFor="ds-text">نص</FieldLabel>
              <TextInput id="ds-text" placeholder="اكتب هنا..." />
            </div>
            <div>
              <FieldLabel htmlFor="ds-search">بحث</FieldLabel>
              <SearchInput id="ds-search" placeholder="ابحث برقم الرحلة..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel htmlFor="ds-select">قائمة</FieldLabel>
                <Select id="ds-select" defaultValue="a">
                  <option value="a">كل الحالات</option>
                  <option value="b">جارية</option>
                </Select>
              </div>
              <div>
                <FieldLabel htmlFor="ds-date">تاريخ</FieldLabel>
                <TextInput id="ds-date" type="date" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FieldLabel htmlFor="ds-error">حالة خطأ</FieldLabel>
                <TextInput id="ds-error" error defaultValue="قيمة غير صحيحة" />
              </div>
              <div>
                <FieldLabel htmlFor="ds-disabled">معطل</FieldLabel>
                <TextInput id="ds-disabled" disabled defaultValue="غير قابل للتعديل" />
              </div>
            </div>
            <div>
              <FieldLabel htmlFor="ds-area">نص طويل</FieldLabel>
              <Textarea id="ds-area" placeholder="ملاحظات داخلية..." />
            </div>
            <div className="flex items-center gap-3">
              <Toggle label="مفتاح" checked={toggle} onChange={setToggle} />
              <span className="text-[13px] text-ink-muted">مفتاح تشغيل/إيقاف</span>
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader title="التبويبات والفلاتر" />
            <div className="px-6 pb-6 space-y-4">
              <Tabs
                items={[
                { key: 'tab1', label: 'كل الرحلات', count: 128 },
                { key: 'tab2', label: 'نشطة', count: 24 },
                { key: 'tab3', label: 'معطل', disabled: true }]
                }
                value={tab}
                onChange={setTab} />
              
              <SegmentedControl
                items={[
                { key: 'day', label: 'اليوم' },
                { key: 'week', label: 'هذا الأسبوع' },
                { key: 'month', label: 'هذا الشهر' }]
                }
                value={segment}
                onChange={setSegment} />
              
              <div className="flex items-center gap-3">
                <RowActions
                  actions={[
                  { label: 'عرض التفاصيل', icon: EyeIcon, onSelect: () => undefined },
                  { label: 'فتح النزاع', icon: AlertTriangleIcon, onSelect: () => undefined },
                  { label: 'إيقاف السائق', danger: true, onSelect: () => undefined }]
                  } />
                
                <span className="text-[13px] text-ink-muted">قائمة إجراءات الصف</span>
                <CountBadge value={7} />
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="بطاقات المؤشرات" />
            <div className="px-6 pb-6 grid grid-cols-2 gap-4">
              <KpiCard label="الرحلات النشطة" value="24" support="جارية الآن" accent="orange" icon={TruckIcon} />
              <KpiCard label="رحلات اليوم" value="128" trend={{ direction: 'up', value: '+12%' }} />
            </div>
          </Card>
        </div>
      </section>

      <section className="mb-10">
        <SectionTitle description="شارات الحالة المستخدمة في كل الوحدات">نظام الحالات</SectionTitle>
        <Card className="p-6 space-y-5">
          {[
          { title: 'حالات الرحلة', metas: Object.values(tripStateMeta) },
          { title: 'حالات السائق', metas: Object.values(driverStatusMeta) },
          { title: 'حالات الدفع', metas: Object.values(paymentStatusMeta) },
          { title: 'حالات مستحقات السائقين', metas: Object.values(payoutStatusMeta) },
          { title: 'حالات النزاع', metas: Object.values(disputeStatusMeta) },
          { title: 'أولوية النزاع', metas: Object.values(disputePriorityMeta) },
          { title: 'حالات المستندات', metas: Object.values(documentStatusMeta) }].
          map((g) =>
          <div key={g.title}>
              <p className="text-[13px] font-bold text-navy-500 mb-2">{g.title}</p>
              <div className="flex flex-wrap gap-2">
                {g.metas.map((m) =>
              <StatusChip key={m.label} meta={m} />
              )}
              </div>
            </div>
          )}
          <div>
            <p className="text-[13px] font-bold text-navy-500 mb-2">شارات عامة</p>
            <div className="flex flex-wrap gap-2">
              <Badge tone="success">نجاح</Badge>
              <Badge tone="warn">تحذير</Badge>
              <Badge tone="danger">خطر</Badge>
              <Badge tone="neutral">محايد</Badge>
              <Badge tone="info">معلومة</Badge>
            </div>
          </div>
        </Card>
      </section>

      <section className="mb-10">
        <SectionTitle description="الرأس، الصفوف، التحويم، الترقيم، والحالات">الجداول</SectionTitle>
        <TableShell>
          <DataTable>
            <Thead columns={['السائق', 'رقم الرحلة', 'الحالة', 'السعر', 'الإجراء']} />
            <tbody>
              {[
              { name: 'محمد علي', id: 'WDI-1048', meta: tripStateMeta.IN_TRANSIT, price: '850 ج.م' },
              { name: 'محمود علي', id: 'WDI-1047', meta: tripStateMeta.DELIVERY_PENDING, price: '620 ج.م' },
              { name: 'يوسف خالد', id: 'WDI-1046', meta: tripStateMeta.DISPUTED, price: '740 ج.م' }].
              map((r, i) =>
              <Tr key={r.id} selected={i === 1}>
                  <Td>
                    <PersonCell name={r.name} sub="ربع نقل" />
                  </Td>
                  <Td className="tabular font-bold text-navy">#{r.id}</Td>
                  <Td>
                    <StatusChip meta={r.meta} />
                  </Td>
                  <Td className="tabular">{r.price}</Td>
                  <Td>
                    <Button size="sm" variant="outline">
                      عرض التفاصيل
                    </Button>
                  </Td>
                </Tr>
              )}
            </tbody>
          </DataTable>
          <Pagination page={page} pageCount={5} total={48} onChange={setPage} />
        </TableShell>
      </section>

      <section className="mb-10 grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card>
          <CardHeader title="حالة فارغة" />
          <EmptyState title="لا توجد نزاعات مفتوحة" description="كل الحالات الحالية تمت مراجعتها." />
        </Card>
        <Card>
          <CardHeader title="حالة خطأ" />
          <ErrorState onRetry={() => toast('info', 'جاري إعادة المحاولة')} />
        </Card>
        <Card>
          <CardHeader title="حالة تحميل" />
          <div className="px-6 pb-6 space-y-4">
            <SkeletonCard />
            <SkeletonChart />
            <div className="space-y-2">
              <Skeleton className="h-3.5 w-3/4" />
              <Skeleton className="h-3.5 w-1/2" />
            </div>
          </div>
        </Card>
      </section>

      <section className="mb-10 grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card>
          <CardHeader title="الخط الزمني" description="أحداث الرحلة" />
          <div className="px-6 pb-6">
            <Timeline events={tripTimeline.slice(0, 6)} currentIndex={4} />
          </div>
        </Card>
        <Card className="xl:col-span-2">
          <CardHeader title="مسار العمل" description="خطوات قابلة للتنفيذ" />
          <div className="px-6 pb-6 space-y-6">
            <StepFlow steps={disputeSteps.slice(0, 5)} activeIndex={2} />
            <MapPanel from="مدينة نصر" to="الشيخ زايد" driverLabel="الطريق الدائري" height="h-[220px]" />
          </div>
        </Card>
      </section>

      <section className="mb-10 grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="معرض الأدلة" description="صور وملاحظات مرتبطة بمرحلة" />
          <div className="px-6 pb-6">
            <EvidenceBlock item={tripEvidence[0]} compact />
          </div>
        </Card>
        <Card>
          <CardHeader title="النوافذ والأدراج والتنبيهات" />
          <div className="px-6 pb-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => setModal('confirm')}>
                نافذة تأكيد
              </Button>
              <Button variant="outline" onClick={() => setModal('warning')}>
                نافذة تحذير
              </Button>
              <Button variant="outline" onClick={() => setModal('success')}>
                نافذة نجاح
              </Button>
              <Button variant="outline" onClick={() => setModal('error')}>
                نافذة خطأ
              </Button>
              <Button variant="outline" onClick={() => setDrawerOpen(true)}>
                درج جانبي
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={() => toast('success', 'تم حفظ التغييرات')}>
                تنبيه نجاح
              </Button>
              <Button size="sm" variant="outline" onClick={() => toast('error', 'فشل تحميل البيانات', 'حاول مرة أخرى.')}>
                تنبيه خطأ
              </Button>
              <Button size="sm" variant="outline" onClick={() => toast('warning', 'مستند منتهي', 'التأمين محتاج تحديث.')}>
                تنبيه تحذير
              </Button>
              <Button size="sm" variant="outline" onClick={() => toast('info', 'تم فتح نزاع جديد')}>
                تنبيه معلومة
              </Button>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <Avatar name="منى عبد الرحمن" />
              <Avatar name="محمد علي" size="sm" />
              <Avatar name="أحمد محمد" size="lg" />
            </div>
          </div>
        </Card>
      </section>

      <Modal
        open={modal !== null}
        onClose={() => setModal(null)}
        tone={modal ?? 'confirm'}
        title={
        modal === 'warning' ?
        'هل أنت متأكد من إيقاف هذا السائق؟' :
        modal === 'success' ?
        'تم حفظ القرار' :
        modal === 'error' ?
        'تعذر تنفيذ الإجراء' :
        'تأكيد الإجراء'
        }
        description={
        modal === 'warning' ?
        'سيتم منع السائق من استقبال رحلات جديدة.' :
        modal === 'error' ?
        'حدث خطأ أثناء الاتصال بالخادم. حاول مرة أخرى.' :
        'مثال على نافذة تأكيد داخل نظام تصميم وِدي.'
        }
        confirmLabel="تأكيد"
        confirmVariant={modal === 'warning' ? 'danger' : 'primary'}
        onConfirm={() => setModal(null)} />
      

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="درج التفاصيل"
        description="يُستخدم لتفاصيل المعاملة أو الإشعارات"
        footer={
        <Button className="w-full" onClick={() => setDrawerOpen(false)}>
            إغلاق
          </Button>
        }>
        
        <div className="p-6">
          <dl>
            <DataRow label="رقم المعاملة" value="#TXN-83421" />
            <DataRow label="المبلغ" value="700 ج.م" />
            <DataRow label="الحالة" value={<StatusChip meta={paymentStatusMeta.SUCCESS} />} />
          </dl>
        </div>
      </Drawer>
    </div>);

}