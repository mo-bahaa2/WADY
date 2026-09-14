import type { Payout, Transaction } from '../types';

export const transactions: Transaction[] = [
{
  id: 'TXN-83421',
  tripId: 'WDI-1043',
  customer: 'خالد عبد الله',
  driver: 'أحمد محمد',
  amount: 700,
  commission: 105,
  driverAmount: 595,
  method: 'Visa',
  status: 'SUCCESS',
  date: 'اليوم، 12:06 م'
},
{
  id: 'TXN-83420',
  tripId: 'WDI-1041',
  customer: 'ياسمين طارق',
  driver: 'عمر حسن',
  amount: 320,
  commission: 48,
  driverAmount: 272,
  method: 'Mastercard',
  status: 'SUCCESS',
  date: 'اليوم، 09:55 ص'
},
{
  id: 'TXN-83419',
  tripId: 'WDI-1045',
  customer: 'مصطفى إبراهيم',
  driver: 'كريم سمير',
  amount: 480,
  commission: 72,
  driverAmount: 408,
  method: 'Visa',
  status: 'FAILED',
  date: 'اليوم، 12:41 م',
  failureReason: 'رصيد غير كافٍ',
  retryState: 'قيد المحاولة'
},
{
  id: 'TXN-83418',
  tripId: 'WDI-1039',
  customer: 'إسلام رمضان',
  driver: 'حسام الدين',
  amount: 910,
  commission: 137,
  driverAmount: 773,
  method: 'Visa',
  status: 'PROCESSING',
  date: 'اليوم، 05:01 م'
},
{
  id: 'TXN-83417',
  tripId: 'WDI-1036',
  customer: 'سارة إبراهيم',
  driver: 'محمود علي',
  amount: 540,
  commission: 81,
  driverAmount: 459,
  method: 'محفظة إلكترونية',
  status: 'SUCCESS',
  date: 'اليوم، 11:20 ص'
},
{
  id: 'TXN-83416',
  tripId: 'WDI-1034',
  customer: 'أحمد محمد',
  driver: 'محمد علي',
  amount: 780,
  commission: 117,
  driverAmount: 663,
  method: 'ميزة',
  status: 'FAILED',
  date: 'اليوم، 10:48 ص',
  failureReason: 'رفض من البنك المُصدر',
  retryState: 'فشل'
},
{
  id: 'TXN-83415',
  tripId: 'WDI-1033',
  customer: 'ندى فتحي',
  driver: 'يوسف خالد',
  amount: 410,
  commission: 62,
  driverAmount: 348,
  method: 'محفظة إلكترونية',
  status: 'SUCCESS',
  date: 'اليوم، 10:02 ص'
},
{
  id: 'TXN-83414',
  tripId: 'WDI-1032',
  customer: 'هبة سيد',
  driver: 'طارق منير',
  amount: 620,
  commission: 93,
  driverAmount: 527,
  method: 'Visa',
  status: 'PENDING',
  date: 'اليوم، 09:14 ص'
},
{
  id: 'TXN-83413',
  tripId: 'WDI-1030',
  customer: 'عمر حسن',
  driver: 'وليد صابر',
  amount: 350,
  commission: 53,
  driverAmount: 297,
  method: 'Mastercard',
  status: 'FAILED',
  date: 'أمس، 08:33 م',
  failureReason: 'انتهاء صلاحية البطاقة',
  retryState: 'تمت إعادة المحاولة'
},
{
  id: 'TXN-83412',
  tripId: 'WDI-1029',
  customer: 'دينا عادل',
  driver: 'كريم سمير',
  amount: 460,
  commission: 69,
  driverAmount: 391,
  method: 'Visa',
  status: 'SUCCESS',
  date: 'أمس، 07:12 م'
},
{
  id: 'TXN-83411',
  tripId: 'WDI-1027',
  customer: 'شريف جابر',
  driver: 'محمد أحمد',
  amount: 880,
  commission: 132,
  driverAmount: 748,
  method: 'Visa',
  status: 'FAILED',
  date: 'أمس، 05:47 م',
  failureReason: 'خطأ في التحقق 3D Secure',
  retryState: 'قيد المحاولة'
},
{
  id: 'TXN-83410',
  tripId: 'WDI-1026',
  customer: 'خالد عبد الله',
  driver: 'عمر حسن',
  amount: 1250,
  commission: 188,
  driverAmount: 1062,
  method: 'محفظة إلكترونية',
  status: 'SUCCESS',
  date: 'أمس، 03:25 م'
},
{
  id: 'TXN-83409',
  tripId: 'WDI-1025',
  customer: 'ياسمين طارق',
  driver: 'محمود علي',
  amount: 2400,
  commission: 360,
  driverAmount: 2040,
  method: 'Visa',
  status: 'SUCCESS',
  date: 'أمس، 01:10 م'
},
{
  id: 'TXN-83408',
  tripId: 'WDI-1023',
  customer: 'إسلام رمضان',
  driver: 'حسام الدين',
  amount: 530,
  commission: 80,
  driverAmount: 450,
  method: 'ميزة',
  status: 'FAILED',
  date: 'أمس، 11:02 ص',
  failureReason: 'انقطاع الاتصال ببوابة الدفع',
  retryState: 'نجح'
}];


export const payouts: Payout[] = [
{
  id: 'PYT-5510',
  driver: 'محمود علي',
  driverId: 'DRV-2013',
  tripId: 'WDI-1036',
  amount: 459,
  status: 'TRANSFERRED',
  date: 'اليوم، 01:00 م',
  reference: 'REF-99120'
},
{
  id: 'PYT-5509',
  driver: 'أحمد محمد',
  driverId: 'DRV-2014',
  tripId: 'WDI-1043',
  amount: 595,
  status: 'PROCESSING',
  date: 'اليوم، 12:30 م',
  reference: 'REF-99119'
},
{
  id: 'PYT-5508',
  driver: 'عمر حسن',
  driverId: 'DRV-2019',
  tripId: 'WDI-1041',
  amount: 272,
  status: 'DUE',
  date: 'اليوم، 10:00 ص',
  reference: '—'
},
{
  id: 'PYT-5507',
  driver: 'يوسف خالد',
  driverId: 'DRV-2015',
  tripId: 'WDI-1033',
  amount: 348,
  status: 'TRANSFERRED',
  date: 'اليوم، 09:20 ص',
  reference: 'REF-99114'
},
{
  id: 'PYT-5506',
  driver: 'كريم سمير',
  driverId: 'DRV-2017',
  tripId: 'WDI-1029',
  amount: 391,
  status: 'FAILED',
  date: 'أمس، 08:00 م',
  reference: 'REF-99110'
},
{
  id: 'PYT-5505',
  driver: 'محمد علي',
  driverId: 'DRV-2011',
  tripId: 'WDI-1026',
  amount: 1062,
  status: 'TRANSFERRED',
  date: 'أمس، 06:40 م',
  reference: 'REF-99108'
},
{
  id: 'PYT-5504',
  driver: 'محمد أحمد',
  driverId: 'DRV-2012',
  tripId: 'WDI-1025',
  amount: 2040,
  status: 'PROCESSING',
  date: 'أمس، 04:15 م',
  reference: 'REF-99105'
},
{
  id: 'PYT-5503',
  driver: 'حسام الدين',
  driverId: 'DRV-2020',
  tripId: 'WDI-1023',
  amount: 450,
  status: 'DUE',
  date: 'أمس، 12:05 م',
  reference: '—'
},
{
  id: 'PYT-5502',
  driver: 'وليد صابر',
  driverId: 'DRV-2022',
  tripId: 'WDI-1021',
  amount: 297,
  status: 'TRANSFERRED',
  date: 'قبل يومين',
  reference: 'REF-99098'
},
{
  id: 'PYT-5501',
  driver: 'طارق منير',
  driverId: 'DRV-2021',
  tripId: 'WDI-1018',
  amount: 527,
  status: 'DUE',
  date: 'قبل يومين',
  reference: '—'
}];


export const revenueSeries = [
{ label: 'السبت', revenue: 96400, commission: 14460 },
{ label: 'الأحد', revenue: 104200, commission: 15630 },
{ label: 'الإثنين', revenue: 88900, commission: 13335 },
{ label: 'الثلاثاء', revenue: 115300, commission: 17295 },
{ label: 'الأربعاء', revenue: 121800, commission: 18270 },
{ label: 'الخميس', revenue: 134600, commission: 20190 },
{ label: 'الجمعة', revenue: 128450, commission: 19260 }];


export const commissionSeries = [
{ label: 'الأسبوع 1', commission: 82400 },
{ label: 'الأسبوع 2', commission: 91200 },
{ label: 'الأسبوع 3', commission: 87600 },
{ label: 'الأسبوع 4', commission: 104300 }];