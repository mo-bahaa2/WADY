import type {
  DisputePriority,
  DisputeStatus,
  DocumentStatus,
  DriverStatus,
  PaymentStatus,
  PayoutStatus,
  TripState } from
'../types';

export type Tone = 'neutral' | 'info' | 'active' | 'success' | 'warn' | 'danger';

export interface StatusMeta {
  label: string;
  tone: Tone;
}

export const tripStateMeta: Record<TripState, StatusMeta> = {
  REQUESTED: { label: 'مطلوبة', tone: 'neutral' },
  BIDDING: { label: 'استقبال العروض', tone: 'info' },
  DRIVER_SELECTED: { label: 'تم اختيار السائق', tone: 'info' },
  DRIVER_ON_ROUTE: { label: 'السائق في الطريق', tone: 'active' },
  DRIVER_ARRIVED: { label: 'السائق وصل', tone: 'active' },
  LOAD_REVIEW: { label: 'تمت مراجعة الحمولة', tone: 'active' },
  IN_TRANSIT: { label: 'جارية', tone: 'active' },
  ARRIVED: { label: 'وصلت الوجهة', tone: 'active' },
  DELIVERY_PENDING: { label: 'بانتظار التأكيد', tone: 'warn' },
  DELIVERED: { label: 'تم التسليم', tone: 'success' },
  DISPUTED: { label: 'متنازع عليها', tone: 'danger' },
  PAYMENT_PROCESSING: { label: 'قيد الدفع', tone: 'info' },
  COMPLETED: { label: 'مكتملة', tone: 'success' },
  PAYMENT_FAILED: { label: 'فشل الدفع', tone: 'danger' },
  CANCELLED: { label: 'ملغاة', tone: 'neutral' }
};

export const tripStateOrder: TripState[] = [
'REQUESTED',
'BIDDING',
'DRIVER_SELECTED',
'DRIVER_ON_ROUTE',
'DRIVER_ARRIVED',
'LOAD_REVIEW',
'IN_TRANSIT',
'ARRIVED',
'DELIVERY_PENDING',
'DELIVERED',
'PAYMENT_PROCESSING',
'COMPLETED'];


export const driverStatusMeta: Record<DriverStatus, StatusMeta> = {
  ONLINE: { label: 'متصل', tone: 'success' },
  OFFLINE: { label: 'غير متصل', tone: 'neutral' },
  ON_TRIP: { label: 'في رحلة', tone: 'active' },
  PENDING_VERIFICATION: { label: 'بانتظار التحقق', tone: 'warn' },
  VERIFIED: { label: 'تم التحقق', tone: 'success' },
  SUSPENDED: { label: 'موقوف', tone: 'danger' }
};

export const paymentStatusMeta: Record<PaymentStatus, StatusMeta> = {
  SUCCESS: { label: 'ناجح', tone: 'success' },
  PROCESSING: { label: 'قيد المعالجة', tone: 'info' },
  FAILED: { label: 'فاشل', tone: 'danger' },
  PENDING: { label: 'معلق', tone: 'warn' }
};

export const payoutStatusMeta: Record<PayoutStatus, StatusMeta> = {
  DUE: { label: 'مستحق', tone: 'warn' },
  PROCESSING: { label: 'قيد المعالجة', tone: 'info' },
  TRANSFERRED: { label: 'تم التحويل', tone: 'success' },
  FAILED: { label: 'فشل', tone: 'danger' }
};

export const disputeStatusMeta: Record<DisputeStatus, StatusMeta> = {
  OPEN: { label: 'مفتوح', tone: 'danger' },
  IN_REVIEW: { label: 'قيد المراجعة', tone: 'warn' },
  RESOLVED: { label: 'تم الحل', tone: 'success' },
  CLOSED: { label: 'مغلق', tone: 'neutral' }
};

export const disputePriorityMeta: Record<DisputePriority, StatusMeta> = {
  NORMAL: { label: 'عادي', tone: 'neutral' },
  HIGH: { label: 'مرتفع', tone: 'info' },
  URGENT: { label: 'عاجل', tone: 'danger' }
};

export const documentStatusMeta: Record<DocumentStatus, StatusMeta> = {
  VALID: { label: 'ساري', tone: 'success' },
  EXPIRED: { label: 'منتهي', tone: 'danger' },
  IN_REVIEW: { label: 'قيد المراجعة', tone: 'info' },
  REJECTED: { label: 'مرفوض', tone: 'danger' },
  NEEDS_UPDATE: { label: 'يحتاج تحديث', tone: 'warn' }
};

export const toneClasses: Record<Tone, string> = {
  neutral: 'bg-navy-50 text-navy-600 border-navy-100',
  info: 'bg-purple-50 text-purple-700 border-purple-100',
  active: 'bg-orange-50 text-orange-700 border-orange-100',
  success: 'bg-success-100 text-success border-success-200',
  warn: 'bg-warn-100 text-warn border-warn-200',
  danger: 'bg-danger-100 text-danger border-danger-200'
};

export const toneDot: Record<Tone, string> = {
  neutral: 'bg-navy-300',
  info: 'bg-purple',
  active: 'bg-orange',
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger'
};