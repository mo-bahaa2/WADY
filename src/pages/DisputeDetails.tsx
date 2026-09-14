import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  CheckCircle2Icon,
  ClockIcon,
  CreditCardIcon,
  FileTextIcon,
  MapPinIcon,
  PhoneIcon,
  QrCodeIcon } from
'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { Card, CardHeader, DataRow } from '../components/ui/Card';
import { StatusChip, Badge } from '../components/ui/StatusChip';
import { Avatar } from '../components/ui/Avatar';
import { Modal } from '../components/ui/Modal';
import { FieldLabel, Select, Textarea } from '../components/ui/Field';
import { StepFlow, Timeline } from '../components/ui/Timeline';
import { EvidenceTimeline } from '../components/ui/EvidenceGallery';
import { MapPanel } from '../components/ui/MapPanel';
import { disputes, disputeSteps, resolutionOptions } from '../data/disputes';
import { disputeEvidence } from '../data/evidence';
import { trips, tripTimeline } from '../data/trips';
import { disputePriorityMeta, disputeStatusMeta, paymentStatusMeta } from '../utils/status';
import { egp } from '../utils/format';
import { useToast } from '../components/ui/Toast';

const tabs = [
{ key: 'overview', label: 'نظرة عامة' },
{ key: 'evidence', label: 'الأدلة' },
{ key: 'timeline', label: 'الجدول الزمني' },
{ key: 'resolution', label: 'القرار والحل' }];


export function DisputeDetails() {
  const { disputeId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const dispute = disputes.find((d) => d.id === disputeId) ?? disputes[0];
  const trip = trips.find((t) => t.id === dispute.tripId) ?? trips[0];
  const resolved = dispute.status === 'RESOLVED' || dispute.status === 'CLOSED';

  const [tab, setTab] = useState('overview');
  const [step, setStep] = useState(resolved ? 6 : 2);
  const [resolution, setResolution] = useState(dispute.resolution ?? resolutionOptions[0]);
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [closed, setClosed] = useState(resolved);

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader
        crumbs={[{ label: 'النزاعات', to: '/disputes' }, { label: `#${dispute.id}` }]}
        title="تفاصيل النزاع"
        description={`مرتبط بالرحلة #${dispute.tripId} · أُبلغ عنه ${dispute.reportedAt}`}
        meta={
        <span className="flex items-center gap-2.5">
            <span className="text-[18px] font-bold text-navy-500 tabular">#{dispute.id}</span>
            <StatusChip meta={disputeStatusMeta[closed ? 'CLOSED' : dispute.status]} size="md" />
            <StatusChip meta={disputePriorityMeta[dispute.priority]} size="md" withIcon={dispute.priority === 'URGENT'} />
          </span>
        }
        actions={
        <>
            <Button variant="outline" icon={<PhoneIcon className="w-4 h-4" />} onClick={() => toast('info', 'جاري الاتصال بالعميل', dispute.customer)}>
              اتصال بالعميل
            </Button>
            <Button variant="outline" icon={<PhoneIcon className="w-4 h-4" />} onClick={() => toast('info', 'جاري الاتصال بالسائق', dispute.driver)}>
              اتصال بالسائق
            </Button>
            <Button onClick={() => setTab('resolution')} disabled={closed}>
              توثيق القرار
            </Button>
          </>
        } />
      

      {closed &&
      <div className="flex items-center gap-3 border border-success-200 bg-success-100/60 rounded-card px-5 py-4 mb-6">
          <CheckCircle2Icon className="w-5 h-5 text-success shrink-0" aria-hidden />
          <p className="text-[13.5px] text-navy">
            <span className="font-bold">تم إغلاق النزاع</span> — {dispute.resolution ?? resolution} ·{' '}
            {dispute.closedAt ?? 'اليوم، 06:10 م'} · بواسطة {dispute.closedBy ?? 'منى عبد الرحمن'}
          </p>
        </div>
      }

      <Card className="mb-6">
        <CardHeader title="مسار حل النزاع" description="اضغط على أي خطوة للانتقال لها" />
        <div className="px-6 pb-6">
          <StepFlow steps={disputeSteps} activeIndex={closed ? 6 : step} onSelect={(i) => setStep(i)} />
        </div>
      </Card>

      <Tabs items={tabs} value={tab} onChange={setTab} className="bg-white border border-line rounded-t-card px-4" />

      <div className="mt-6 space-y-6">
        {tab === 'overview' &&
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <Card className="p-5">
                <p className="text-[12.5px] text-ink-muted mb-3">العميل</p>
                <div className="flex items-center gap-3">
                  <Avatar name={dispute.customer} />
                  <div>
                    <p className="text-[15px] font-bold text-navy">{dispute.customer}</p>
                    <p className="text-[12.5px] text-ink-muted">
                      {dispute.reportedBy === 'العميل' ? 'صاحب البلاغ' : 'الطرف الثاني'}
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-5">
                <p className="text-[12.5px] text-ink-muted mb-3">السائق</p>
                <div className="flex items-center gap-3">
                  <Avatar name={dispute.driver} />
                  <div>
                    <p className="text-[15px] font-bold text-navy">{dispute.driver}</p>
                    <p className="text-[12.5px] text-ink-muted">
                      {dispute.reportedBy === 'السائق' ? 'صاحب البلاغ' : 'الطرف الثاني'}
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="p-5">
                <p className="text-[12.5px] text-ink-muted mb-2">الرحلة</p>
                <Link to={`/trips/${trip.id}`} className="text-[18px] font-bold text-navy tabular hover:text-purple transition-colors duration-150 ease-out">
                  #{trip.id}
                </Link>
                <p className="text-[12.5px] text-ink-muted mt-1 flex items-center gap-1.5">
                  <MapPinIcon className="w-3.5 h-3.5" aria-hidden />
                  {trip.from} ← {trip.to}
                </p>
              </Card>
              <Card className="p-5">
                <p className="text-[12.5px] text-ink-muted mb-2">قيمة الرحلة</p>
                <p className="text-[24px] font-bold text-navy tabular leading-8">{egp(dispute.amount)}</p>
                <p className="text-[12.5px] text-ink-muted mt-1">
                  حالة الدفع: <StatusChip meta={paymentStatusMeta[trip.paymentStatus]} className="mr-1" />
                </p>
              </Card>
            </div>

            <Card>
              <CardHeader
              title="وصف المشكلة"
              description={`نوع المشكلة: ${dispute.type} · أبلغ عنها ${dispute.reportedBy}`}
              action={<Badge tone="neutral">{dispute.reportedAt}</Badge>} />
            
              <div className="px-6 pb-6">
                <p className="text-sm text-ink leading-7">{dispute.description}</p>
              </div>
            </Card>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <Card className="xl:col-span-2">
                <CardHeader title="المسار والتتبع وقت الرحلة" description="سجل الحركة المرتبط بالبلاغ" />
                <div className="px-6 pb-6">
                  <MapPanel from={trip.from} to={trip.to} driverLabel="نقطة التوقف غير المجدولة" progress={0.48} height="h-[260px]" />
                </div>
              </Card>
              <Card>
                <CardHeader title="التسليم والدفع" description="حالة التسليم منفصلة عن حالة الدفع" />
                <div className="px-6 pb-6">
                  <dl>
                    <DataRow
                    label="تأكيد التسليم"
                    value={
                    <span className="inline-flex items-center gap-1.5 text-success font-medium">
                          <QrCodeIcon className="w-4 h-4" aria-hidden />
                          تم بواسطة QR
                        </span>
                    } />
                  
                    <DataRow label="توقيت التسليم" value="اليوم، 02:02 م" />
                    <DataRow label="حالة الدفع" value={<StatusChip meta={paymentStatusMeta[trip.paymentStatus]} />} />
                    <DataRow label="عمولة المنصة" value={egp(trip.commission)} />
                    <DataRow label="مستحق السائق" value={egp(trip.price - trip.commission)} />
                  </dl>
                  <Link to="/payments" className="inline-block mt-3">
                    <Button size="sm" variant="outline" icon={<CreditCardIcon className="w-3.5 h-3.5" />}>
                      عرض المعاملة
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </>
        }

        {tab === 'evidence' &&
        <Card>
            <CardHeader
            title="الأدلة"
            description="مرتبة زمنيًا: قبل النقل، أثناء الرحلة، عند التسليم"
            action={<Badge tone="info">{disputeEvidence.length} عناصر</Badge>} />
          
            <div className="px-6 pb-6">
              <EvidenceTimeline items={disputeEvidence} />
            </div>
          </Card>
        }

        {tab === 'timeline' &&
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card>
              <CardHeader title="الجدول الزمني للرحلة" description="كل خطوة في الرحلة محل النزاع" />
              <div className="px-6 pb-6">
                <Timeline events={tripTimeline} currentIndex={9} />
              </div>
            </Card>
            <Card>
              <CardHeader title="سجل النزاع" description="ما تم من إجراءات على الحالة" />
              <div className="px-6 pb-6">
                <Timeline
                currentIndex={closed ? 4 : 2}
                events={[
                { state: 'NOTE', label: 'تم الإبلاغ عن المشكلة', time: dispute.reportedAt, actor: `بواسطة ${dispute.reportedBy}`, done: true },
                { state: 'NOTE', label: 'إنشاء النزاع في النظام', time: 'اليوم، 02:12 م', actor: 'تلقائي', done: true },
                { state: 'NOTE', label: 'مراجعة الأدلة', time: 'اليوم، 02:40 م', actor: 'منى عبد الرحمن', done: true },
                { state: 'NOTE', label: 'تحديد المشكلة', time: closed ? 'اليوم، 03:05 م' : '—', actor: closed ? 'منى عبد الرحمن' : undefined, done: closed },
                { state: 'NOTE', label: 'توثيق القرار وإغلاق النزاع', time: closed ? dispute.closedAt ?? 'اليوم، 03:20 م' : '—', done: closed }]
                } />
              
              </div>
            </Card>
          </div>
        }

        {tab === 'resolution' &&
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <Card className="xl:col-span-2">
              <CardHeader title="توثيق قرار النزاع" description="القرار بيتسجل في سجل الحالة ويظهر لفريق التشغيل" />
              <div className="px-6 pb-6 space-y-4">
                <div>
                  <FieldLabel htmlFor="resolution">القرار</FieldLabel>
                  <Select id="resolution" value={resolution} onChange={(e) => setResolution(e.target.value)} disabled={closed}>
                    {resolutionOptions.map((r) =>
                  <option key={r} value={r}>
                        {r}
                      </option>
                  )}
                  </Select>
                </div>
                <div>
                  <FieldLabel htmlFor="reason">سبب القرار</FieldLabel>
                  <Textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  disabled={closed}
                  placeholder="اشرح الأدلة اللي بُني عليها القرار (صور قبل النقل، تأكيد السائق، سجل التتبع...)" />
                
                </div>
                <div>
                  <FieldLabel htmlFor="notes" hint="لا تظهر للعميل أو السائق">
                    ملاحظات داخلية
                  </FieldLabel>
                  <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={closed}
                  placeholder="ملاحظات لفريق التشغيل..." />
                
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Button disabled={closed} onClick={() => setConfirmOpen(true)}>
                    حفظ القرار وإغلاق النزاع
                  </Button>
                  <Button variant="outline" onClick={() => setTab('evidence')}>
                    العودة للمراجعة
                  </Button>
                </div>
              </div>
            </Card>

            <Card>
              <CardHeader title="ملخص الأدلة" description="أهم ما تم رصده في الحالة" />
              <ul className="px-6 pb-6 space-y-3">
                {[
              { icon: FileTextIcon, text: 'صور العميل قبل النقل تُظهر 30 شيكارة سليمة.' },
              { icon: CheckCircle2Icon, text: 'السائق أكد حالة الحمولة قبل التحميل.' },
              { icon: ClockIcon, text: 'توقف غير مجدول 9 دقائق أثناء النقل.' },
              { icon: FileTextIcon, text: 'صور التسليم تُظهر 3 شكاير مقطوعة.' },
              { icon: QrCodeIcon, text: 'تم تأكيد التسليم من العميل باستخدام QR.' }].
              map((i) =>
              <li key={i.text} className="flex items-start gap-2.5">
                    <i.icon className="w-4 h-4 text-navy-400 shrink-0 mt-0.5" aria-hidden />
                    <span className="text-[13px] text-ink leading-6">{i.text}</span>
                  </li>
              )}
              </ul>
            </Card>
          </div>
        }
      </div>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="حفظ القرار وإغلاق النزاع"
        description={`سيتم إغلاق النزاع #${dispute.id} بقرار: ${resolution}. لا يمكن التراجع بعد الإغلاق.`}
        tone="warning"
        confirmLabel="حفظ وإغلاق"
        confirmVariant="primary"
        onConfirm={() => {
          setConfirmOpen(false);
          setClosed(true);
          setStep(6);
          toast('success', 'تم إغلاق النزاع', `${dispute.id} · ${resolution}`);
          navigate(`/disputes/${dispute.id}`);
        }} />
      
    </div>);

}