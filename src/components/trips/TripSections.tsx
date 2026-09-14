import React from 'react';
import { Link } from 'react-router-dom';
import {
  BadgeCheckIcon,
  CheckCircle2Icon,
  ClockIcon,
  MapPinIcon,
  PackageIcon,
  PhoneIcon,
  QrCodeIcon,
  ShieldAlertIcon,
  StarIcon,
  TruckIcon } from
'lucide-react';
import { Card, CardHeader, DataRow } from '../ui/Card';
import { StatusChip, Badge } from '../ui/StatusChip';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { MapPanel } from '../ui/MapPanel';
import { Timeline } from '../ui/Timeline';
import { EvidenceTimeline } from '../ui/EvidenceGallery';
import { EmptyState } from '../ui/States';
import { tripEvidence, IMG_LOAD_BEFORE_1, IMG_LOAD_BEFORE_2 } from '../../data/evidence';
import { tripTimeline } from '../../data/trips';
import { disputes } from '../../data/disputes';
import { paymentStatusMeta, tripStateMeta, disputeStatusMeta, disputePriorityMeta } from '../../utils/status';
import { egp, formatPhone } from '../../utils/format';
import type { Trip } from '../../types';
import { useStore } from '../../contexts/StoreContext';
import { useToast } from '../ui/Toast';

export function TripSummaryCards({ trip }: {trip: Trip;}) {
  const driverAmount = trip.price - trip.commission;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <Card className="p-5">
        <p className="text-[12.5px] text-ink-muted mb-3">العميل</p>
        <div className="flex items-center gap-3">
          <Avatar name={trip.customer} />
          <div className="min-w-0">
            <Link
              to={`/customers/${trip.customerId}`}
              className="text-[15px] font-bold text-navy hover:text-purple transition-colors duration-150 ease-out">
              
              {trip.customer}
            </Link>
            <p className="text-[12.5px] text-ink-muted tabular flex items-center gap-1.5 mt-0.5">
              <PhoneIcon className="w-3.5 h-3.5" aria-hidden />
              {formatPhone(trip.customerPhone)}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <p className="text-[12.5px] text-ink-muted mb-3">السائق</p>
        {trip.driver ?
        <div className="flex items-center gap-3">
            <Avatar name={trip.driver} />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <Link
                to={`/drivers/${trip.driverId}`}
                className="text-[15px] font-bold text-navy hover:text-purple transition-colors duration-150 ease-out">
                
                  {trip.driver}
                </Link>
                <BadgeCheckIcon className="w-4 h-4 text-success" aria-label="تم التحقق" />
              </div>
              <p className="text-[12.5px] text-ink-muted tabular flex items-center gap-2 mt-0.5">
                <span className="inline-flex items-center gap-1">
                  <StarIcon className="w-3.5 h-3.5 text-orange" aria-hidden />
                  4.8
                </span>
                <span>ربع نقل · ن ص ر 4821</span>
              </p>
            </div>
          </div> :

        <p className="text-sm text-ink-subtle">لم يتم اختيار سائق بعد</p>
        }
      </Card>

      <Card className="p-5">
        <p className="text-[12.5px] text-ink-muted mb-2">السعر</p>
        <p className="text-[24px] font-bold text-navy tabular leading-8">{egp(trip.price)}</p>
        <div className="flex items-center gap-4 mt-2 text-[12.5px]">
          <span className="text-ink-muted">
            العمولة <span className="text-purple font-medium tabular">{egp(trip.commission)}</span>
          </span>
          <span className="text-ink-muted">
            مستحق السائق <span className="text-ink font-medium tabular">{egp(driverAmount)}</span>
          </span>
        </div>
      </Card>

      <Card className="p-5">
        <p className="text-[12.5px] text-ink-muted mb-2">حالة الرحلة</p>
        <StatusChip meta={tripStateMeta[trip.state]} size="md" />
        <p className="text-[12.5px] text-ink-subtle tabular mt-3 flex items-center gap-1.5">
          <ClockIcon className="w-3.5 h-3.5" aria-hidden />
          آخر تحديث {trip.updatedAt}
        </p>
      </Card>
    </div>);

}

export function RouteSection({ trip, withTracking = false }: {trip: Trip;withTracking?: boolean;}) {
  const isActive = ['DRIVER_ON_ROUTE', 'IN_TRANSIT', 'ARRIVED'].includes(trip.state);
  return (
    <Card>
      <CardHeader
        title="المسار"
        description={`${trip.distanceKm} كم · ${trip.region}`}
        action={
        isActive ?
        <Badge tone="active">
              <TruckIcon className="w-3.5 h-3.5" aria-hidden />
              السائق يتحرك الآن
            </Badge> :
        undefined
        } />
      
      <div className="px-6 pb-6">
        <MapPanel
          from={trip.from}
          to={trip.to}
          driverLabel={isActive ? 'الطريق الدائري' : undefined}
          progress={0.62}
          height={withTracking ? 'h-[360px]' : 'h-[280px]'} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="border border-line rounded-xl p-4">
            <p className="text-[12.5px] text-ink-muted flex items-center gap-1.5">
              <MapPinIcon className="w-3.5 h-3.5 text-orange" aria-hidden />
              نقطة التحميل
            </p>
            <p className="text-sm font-medium text-ink mt-1">{trip.from} — شارع مصطفى النحاس، عمارة 14</p>
          </div>
          <div className="border border-line rounded-xl p-4">
            <p className="text-[12.5px] text-ink-muted flex items-center gap-1.5">
              <MapPinIcon className="w-3.5 h-3.5 text-navy" aria-hidden />
              نقطة التسليم
            </p>
            <p className="text-sm font-medium text-ink mt-1">{trip.to} — الحي الثاني، فيلا 22</p>
          </div>
        </div>
      </div>
    </Card>);

}

export function TrackingSection({ trip }: {trip: Trip;}) {
  const live = ['DRIVER_ON_ROUTE', 'IN_TRANSIT', 'ARRIVED'].includes(trip.state);
  return (
    <Card>
      <CardHeader title="التتبع" description="موقع السائق وتقدم الرحلة" />
      <div className="px-6 pb-6">
        <MapPanel
          from={trip.from}
          to={trip.to}
          driverLabel={live ? 'الطريق الدائري' : undefined}
          progress={0.62}
          unavailable={!live}
          height="h-[320px]" />
        
        {live &&
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {[
          { label: 'الموقع الحالي', value: 'الطريق الدائري - المهندسين' },
          { label: 'آخر تحديث للموقع', value: 'منذ دقيقتين' },
          { label: 'المسافة المتبقية', value: '14 كم' },
          { label: 'الوصول المتوقع', value: 'خلال 26 دقيقة' }].
          map((i) =>
          <div key={i.label} className="border border-line rounded-xl p-4">
                <dt className="text-[12.5px] text-ink-muted">{i.label}</dt>
                <dd className="text-sm font-medium text-ink mt-1 tabular">{i.value}</dd>
              </div>
          )}
          </dl>
        }
      </div>
    </Card>);

}

export function LoadSection({ trip }: {trip: Trip;}) {
  return (
    <Card>
      <CardHeader title="تفاصيل الحمولة" description="ما الذي يتم نقله في هذه الرحلة" />
      <div className="px-6 pb-6">
        <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-line rounded-xl p-4">
            <dt className="text-[12.5px] text-ink-muted flex items-center gap-1.5">
              <PackageIcon className="w-3.5 h-3.5" aria-hidden />
              نوع الحمولة
            </dt>
            <dd className="text-sm font-bold text-navy mt-1">{trip.loadType}</dd>
          </div>
          <div className="border border-line rounded-xl p-4 md:col-span-2">
            <dt className="text-[12.5px] text-ink-muted">وصف الحمولة</dt>
            <dd className="text-sm text-ink mt-1">{trip.loadDescription}</dd>
          </div>
        </dl>
        <p className="text-[13px] text-ink-muted mt-4 mb-2 font-medium">صور الحمولة</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[IMG_LOAD_BEFORE_1, IMG_LOAD_BEFORE_2].map((src, i) =>
          <img
            key={src}
            src={src}
            alt={`صورة الحمولة ${i + 1}`}
            loading="lazy"
            className="w-full h-32 object-cover rounded-lg border border-line" />

          )}
        </div>
        <div className="border border-line rounded-xl p-4 mt-4 bg-navy-50/50">
          <p className="text-[12.5px] text-ink-muted">ملاحظات العميل</p>
          <p className="text-sm text-ink mt-1 leading-6">
            برجاء الحرص على الدولاب، وفيه خدش قديم من الجهة اليمنى موثق بالصور. الدور الرابع بدون أسانسير.
          </p>
        </div>
      </div>
    </Card>);

}

export function ConditionEvidenceSection() {
  return (
    <Card>
      <CardHeader
        title="حالة الحمولة"
        description="أدلة موثقة قبل النقل وأثناءه وعند التسليم"
        action={<Badge tone="info">4 عناصر أدلة</Badge>} />
      
      <div className="px-6 pb-6">
        <EvidenceTimeline items={tripEvidence} />
      </div>
    </Card>);

}

export function TripTimelineSection() {
  return (
    <Card>
      <CardHeader title="الجدول الزمني للرحلة" description="كل خطوة حصلت في الرحلة بالتوقيت والمسؤول" />
      <div className="px-6 pb-6">
        <Timeline events={tripTimeline} currentIndex={6} />
      </div>
    </Card>);

}

export function DeliverySection({ trip }: {trip: Trip;}) {
  const delivered = ['DELIVERED', 'PAYMENT_PROCESSING', 'COMPLETED', 'PAYMENT_FAILED'].includes(trip.state);
  const { confirmDelivery } = useStore();
  const [isConfirming, setIsConfirming] = React.useState(false);
  const toast = useToast();
  return (
    <Card>
      <CardHeader
        title="تأكيد التسليم"
        description="الوصول للوجهة شيء، وتأكيد العميل لاستلام الحمولة شيء آخر" />
      
      <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-line rounded-xl p-5">
          <p className="text-[12.5px] text-ink-muted">حالة التسليم</p>
          {delivered ?
          <>
              <p className="text-[18px] font-bold text-success mt-1 flex items-center gap-2">
                <CheckCircle2Icon className="w-5 h-5" aria-hidden />
                تم التسليم
              </p>
              <p className="text-[12.5px] text-ink-subtle tabular mt-2">اليوم، 06:42 م · بواسطة العميل</p>
            </> :

          <>
              <p className="text-[18px] font-bold text-warn mt-1 flex items-center gap-2">
                <ClockIcon className="w-5 h-5" aria-hidden />
                بانتظار تأكيد العميل
              </p>
              <p className="text-[12.5px] text-ink-subtle mt-2">
                السائق لم يصل للوجهة بعد، أو العميل لم يؤكد استلام الحمولة.
              </p>
              <Button 
                size="sm" 
                variant="outline" 
                className="mt-3" 
                disabled={isConfirming}
                onClick={async () => {
                  setIsConfirming(true);
                  await confirmDelivery(trip.id);
                  setIsConfirming(false);
                  toast('success', 'تم التأكيد', 'تم تأكيد التسليم يدوياً');
                }}
              >
                {isConfirming ? 'جاري التأكيد...' : 'تأكيد التسليم يدوياً'}
              </Button>
            </>
          }
        </div>
        <div className="border border-line rounded-xl p-5">
          <p className="text-[12.5px] text-ink-muted">طريقة التأكيد</p>
          <p className="text-[15px] font-bold text-navy mt-1 flex items-center gap-2">
            <QrCodeIcon className="w-4 h-4 text-purple" aria-hidden />
            {delivered ? 'تم التأكيد باستخدام QR' : 'QR (احتياطي: OTP)'}
          </p>
          <dl className="mt-3">
            <DataRow label="وصول السائق للوجهة" value={delivered ? 'اليوم، 06:31 م' : 'لم يصل بعد'} />
            <DataRow label="تأكيد العميل" value={delivered ? 'اليوم، 06:42 م' : 'بانتظار التأكيد'} />
          </dl>
        </div>
      </div>
    </Card>);

}

export function PaymentSection({ trip }: {trip: Trip;}) {
  const failed = trip.paymentStatus === 'FAILED';
  return (
    <Card>
      <CardHeader
        title="الدفع"
        description="الدفع يبدأ بعد تأكيد العميل لاستلام الحمولة"
        action={
        failed ?
        <Link to="/payments">
              <Button size="sm">مراجعة الدفع</Button>
            </Link> :
        undefined
        } />
      
      <div className="px-6 pb-6">
        {failed &&
        <div className="flex items-start gap-3 border border-danger-200 bg-danger-100/60 rounded-xl p-4 mb-4">
            <ShieldAlertIcon className="w-5 h-5 text-danger shrink-0 mt-0.5" aria-hidden />
            <div>
              <p className="text-sm font-bold text-danger">فشل الدفع — التسليم مؤكد</p>
              <p className="text-[13px] text-ink-muted mt-0.5">
                سبب الفشل: رصيد غير كافٍ. الحمولة وصلت للعميل بالفعل ومستحق السائق لسه معلق.
              </p>
            </div>
          </div>
        }
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <dl>
            <DataRow label="قيمة الرحلة" value={egp(trip.price)} />
            <DataRow label="عمولة المنصة" value={egp(trip.commission)} />
            <DataRow label="مستحق السائق" value={egp(trip.price - trip.commission)} />
          </dl>
          <dl>
            <DataRow label="طريقة الدفع" value={trip.paymentMethod} />
            <DataRow label="حالة الدفع" value={<StatusChip meta={paymentStatusMeta[trip.paymentStatus]} />} />
            <DataRow label="رقم المعاملة" value="#TXN-83419" />
            <DataRow label="توقيت المعاملة" value="اليوم، 12:41 م" />
          </dl>
        </div>
      </div>
    </Card>);

}

export function IssuesSection({ trip }: {trip: Trip;}) {
  const dispute = disputes.find((d) => d.id === trip.disputeId);
  return (
    <Card>
      <CardHeader title="المشكلات" description="أي بلاغات أو نزاعات مرتبطة بهذه الرحلة" />
      {dispute ?
      <div className="px-6 pb-6">
          <div className="border border-line rounded-xl p-5">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-bold text-navy tabular">#{dispute.id}</span>
                <StatusChip meta={disputeStatusMeta[dispute.status]} />
                <StatusChip meta={disputePriorityMeta[dispute.priority]} withIcon={false} />
              </div>
              <Link to={`/disputes/${dispute.id}`}>
                <Button size="sm" variant="outline">
                  مراجعة الأدلة
                </Button>
              </Link>
            </div>
            <dl className="grid grid-cols-1 md:grid-cols-3 gap-x-8 mt-3">
              <DataRow label="نوع المشكلة" value={dispute.type} />
              <DataRow label="أبلغ عنها" value={dispute.reportedBy} />
              <DataRow label="تاريخ البلاغ" value={dispute.reportedAt} />
            </dl>
            <p className="text-[13px] text-ink-muted mt-3 leading-6">{dispute.description}</p>
          </div>
        </div> :

      <EmptyState title="لا توجد مشكلات مرتبطة بهذه الرحلة" description="الرحلة سارت بدون أي بلاغات من العميل أو السائق." />
      }
    </Card>);

}