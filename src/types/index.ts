export type TripState =
'REQUESTED' |
'BIDDING' |
'DRIVER_SELECTED' |
'DRIVER_ON_ROUTE' |
'DRIVER_ARRIVED' |
'LOAD_REVIEW' |
'IN_TRANSIT' |
'ARRIVED' |
'DELIVERY_PENDING' |
'DELIVERED' |
'DISPUTED' |
'PAYMENT_PROCESSING' |
'COMPLETED' |
'PAYMENT_FAILED' |
'CANCELLED';

export type DriverStatus =
'ONLINE' |
'OFFLINE' |
'ON_TRIP' |
'PENDING_VERIFICATION' |
'VERIFIED' |
'SUSPENDED';

export type PaymentStatus = 'SUCCESS' | 'PROCESSING' | 'FAILED' | 'PENDING';

export type PayoutStatus = 'DUE' | 'PROCESSING' | 'TRANSFERRED' | 'FAILED';

export type DisputeStatus = 'OPEN' | 'IN_REVIEW' | 'RESOLVED' | 'CLOSED';

export type DisputePriority = 'NORMAL' | 'HIGH' | 'URGENT';

export type DocumentStatus = 'VALID' | 'EXPIRED' | 'IN_REVIEW' | 'REJECTED' | 'NEEDS_UPDATE';

export interface Trip {
  id: string;
  customer: string;
  customerId: string;
  customerPhone: string;
  driver: string | null;
  driverId: string | null;
  driverPhone: string | null;
  from: string;
  to: string;
  state: TripState;
  price: number;
  commission: number;
  createdAt: string;
  updatedAt: string;
  loadType: string;
  loadDescription: string;
  distanceKm: number;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  hasIssue: boolean;
  disputeId?: string;
  region: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  nationalId: string;
  governorate: string;
  vehicle: string;
  plate: string;
  model: string;
  color: string;
  capacity: string;
  status: DriverStatus;
  verified: boolean;
  rating: number;
  trips: number;
  earnings: number;
  lastActive: string;
  registeredAt: string;
  documentsComplete: boolean;
  documents: DriverDocument[];
}

export interface DriverDocument {
  name: string;
  status: DocumentStatus;
  issuedAt: string;
  expiresAt: string;
  uploadedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  trips: number;
  completed: number;
  cancelled: number;
  disputes: number;
  lastActive: string;
  registeredAt: string;
  active: boolean;
}

export interface Dispute {
  id: string;
  tripId: string;
  customer: string;
  driver: string;
  type: string;
  reportedBy: 'العميل' | 'السائق';
  reportedAt: string;
  priority: DisputePriority;
  status: DisputeStatus;
  description: string;
  amount: number;
  resolution?: string;
  closedAt?: string;
  closedBy?: string;
}

export interface Transaction {
  id: string;
  tripId: string;
  customer: string;
  driver: string;
  amount: number;
  commission: number;
  driverAmount: number;
  method: string;
  status: PaymentStatus;
  date: string;
  failureReason?: string;
  retryState?: 'فشل' | 'قيد المحاولة' | 'تمت إعادة المحاولة' | 'نجح';
}

export interface Payout {
  id: string;
  driver: string;
  driverId: string;
  tripId: string;
  amount: number;
  status: PayoutStatus;
  date: string;
  reference: string;
}

export interface TimelineEvent {
  state: TripState | 'NOTE';
  label: string;
  time: string;
  actor?: string;
  done: boolean;
}

export interface AppNotification {
  id: string;
  category: 'نزاعات' | 'مدفوعات' | 'سائقون' | 'رحلات' | 'النظام';
  title: string;
  description: string;
  time: string;
  unread: boolean;
}