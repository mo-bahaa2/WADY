import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlertTriangleIcon, PhoneIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { StatusChip } from '../components/ui/StatusChip';
import { Modal } from '../components/ui/Modal';
import { Textarea } from '../components/ui/Field';
import { EmptyState, ErrorState, Skeleton } from '../components/ui/States';
import {
  ConditionEvidenceSection,
  DeliverySection,
  IssuesSection,
  LoadSection,
  PaymentSection,
  RouteSection,
  TrackingSection,
  TripSummaryCards,
  TripTimelineSection
} from '../components/trips/TripSections';
import { tripStateMeta } from '../utils/status';
import { useToast } from '../components/ui/Toast';
import { useDataState } from '../contexts/DataStateContext';
import { useStore } from '../contexts/StoreContext';

const tabs = [
  { key: 'overview', label: 'نظرة عامة' },
  { key: 'timeline', label: 'الجدول الزمني' },
  { key: 'tracking', label: 'المسار والتتبع' },
  { key: 'evidence', label: 'الحمولة والأدلة' },
  { key: 'delivery', label: 'التسليم' },
  { key: 'payment', label: 'الدفع' },
  { key: 'issues', label: 'المشكلات' }
];

export function TripDetails() {
  const { tripId } = useParams();
  const [tab, setTab] = useState('overview');
  const [disputeOpen, setDisputeOpen] = useState(false);
  const toast = useToast();
  const state = useDataState();
  const { trips, updateTripState } = useStore();
  
  const trip = trips.find((t) => t.id === tripId) ?? trips[0];

  if (state === 'error') {
    return <ErrorState onRetry={() => undefined} />;
  }

  if (state === 'loading') {
    return (
      <div className="max-w-[1600px] mx-auto space-y-6">
        <Skeleton className="h-9 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
        <Skeleton className="h-[420px]" />
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader
        crumbs={[{ label: 'الرحلات', to: '/trips' }, { label: `#${trip.id}` }]}
        title="تفاصيل الرحلة"
        description={`${trip.from} ← ${trip.to} · أُنشئت ${trip.createdAt}`}
        meta={
          <span className="flex items-center gap-2.5">
            <span className="text-[18px] font-bold text-navy-500 tabular">#{trip.id}</span>
            <StatusChip meta={tripStateMeta[trip.state]} size="md" />
          </span>
        }
        actions={
          <>
            <Button
              variant="outline"
              icon={<PhoneIcon className="w-4 h-4" />}
              onClick={() => toast('info', 'جاري الاتصال بالعميل', trip.customer)}
            >
              اتصال بالعميل
            </Button>
            <Button
              variant="outline"
              icon={<PhoneIcon className="w-4 h-4" />}
              disabled={!trip.driver}
              onClick={() => toast('info', 'جاري الاتصال بالسائق', trip.driver ?? '')}
            >
              اتصال بالسائق
            </Button>
            <Button
              variant="primary"
              icon={<AlertTriangleIcon className="w-4 h-4" />}
              onClick={() => setDisputeOpen(true)}
            >
              {trip.disputeId ? 'متابعة النزاع' : 'فتح نزاع'}
            </Button>
          </>
        }
      />

      <Tabs items={tabs} value={tab} onChange={setTab} className="bg-white border border-line rounded-t-card px-4" />

      <div className="mt-6 space-y-6">
        {tab === 'overview' && (
          <>
            <TripSummaryCards trip={trip} />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 space-y-6">
                <RouteSection trip={trip} />
                <LoadSection trip={trip} />
              </div>
              <div className="space-y-6">
                <TripTimelineSection />
                <DeliverySection trip={trip} />
              </div>
            </div>
            <PaymentSection trip={trip} />
            <IssuesSection trip={trip} />
          </>
        )}

        {tab === 'timeline' && (
          <>
            <TripSummaryCards trip={trip} />
            <TripTimelineSection />
          </>
        )}

        {tab === 'tracking' && (
          <>
            <RouteSection trip={trip} withTracking />
            <TrackingSection trip={trip} />
          </>
        )}

        {tab === 'evidence' && (
          <>
            <LoadSection trip={trip} />
            <ConditionEvidenceSection />
          </>
        )}

        {tab === 'delivery' && <DeliverySection trip={trip} />}

        {tab === 'payment' && <PaymentSection trip={trip} />}

        {tab === 'issues' && <IssuesSection trip={trip} />}

        {state === 'empty' && tab === 'overview' && (
          <EmptyState title="لا توجد بيانات لهذه الرحلة" description="لم يتم تسجيل أي أحداث على هذه الرحلة بعد." />
        )}
      </div>

      <Modal
        open={disputeOpen}
        onClose={() => setDisputeOpen(false)}
        title={trip.disputeId ? 'متابعة النزاع' : 'فتح نزاع على الرحلة'}
        description={
          trip.disputeId
            ? `النزاع #${trip.disputeId} مفتوح بالفعل على هذه الرحلة.`
            : `سيتم إنشاء نزاع جديد مرتبط بالرحلة #${trip.id} مع كل الأدلة المسجلة.`
        }
        tone="warning"
        confirmLabel={trip.disputeId ? 'مراجعة الأدلة' : 'فتح النزاع'}
        onConfirm={async () => {
          setDisputeOpen(false);
          if (!trip.disputeId) {
            await updateTripState(trip.id, 'DISPUTED');
          }
          toast('success', 'تم تسجيل الإجراء', 'تم تحويل الحالة لفريق مراجعة النزاعات.');
        }}
      >
        {!trip.disputeId && (
          <div>
            <label htmlFor="dispute-note" className="block text-[13px] font-medium text-navy-600 mb-1.5">
              سبب فتح النزاع
            </label>
            <Textarea id="dispute-note" placeholder="اكتب وصفًا مختصرًا للمشكلة كما وردت من العميل أو السائق..." />
          </div>
        )}
      </Modal>
    </div>
  );
}