import type { Dispute } from '../types';

export const disputes: Dispute[] = [
{
  id: 'DSP-1021',
  tripId: 'WDI-1046',
  customer: 'عمر حسن',
  driver: 'يوسف خالد',
  type: 'تلف في الحمولة',
  reportedBy: 'العميل',
  reportedAt: 'اليوم، 02:10 م',
  priority: 'URGENT',
  status: 'OPEN',
  description:
  'العميل أبلغ أن 3 شكاير أرز وصلت مقطوعة وفيها فقد جزئي، وطلب مراجعة صور الحمولة قبل النقل وبعد التسليم.',
  amount: 740
},
{
  id: 'DSP-1020',
  tripId: 'WDI-1035',
  customer: 'خالد عبد الله',
  driver: 'أحمد محمد',
  type: 'تأخير في التسليم',
  reportedBy: 'العميل',
  reportedAt: 'اليوم، 11:32 ص',
  priority: 'HIGH',
  status: 'IN_REVIEW',
  description: 'الرحلة تأخرت ساعة و20 دقيقة عن الوقت المتوقع بدون تحديث من السائق.',
  amount: 700
},
{
  id: 'DSP-1019',
  tripId: 'WDI-1042',
  customer: 'هبة سيد',
  driver: 'مصطفى إبراهيم',
  type: 'خلاف على السعر',
  reportedBy: 'السائق',
  reportedAt: 'اليوم، 10:05 ص',
  priority: 'HIGH',
  status: 'OPEN',
  description: 'السائق يطالب بفرق سعر بسبب زيادة حجم الحمولة عن الوصف المسجل في الطلب.',
  amount: 560
},
{
  id: 'DSP-1018',
  tripId: 'WDI-1031',
  customer: 'ياسمين طارق',
  driver: 'عمر حسن',
  type: 'حمولة ناقصة',
  reportedBy: 'العميل',
  reportedAt: 'أمس، 06:40 م',
  priority: 'URGENT',
  status: 'IN_REVIEW',
  description: 'العميل أبلغ عن نقص كرتونتين عند التسليم.',
  amount: 430
},
{
  id: 'DSP-1017',
  tripId: 'WDI-1028',
  customer: 'إسلام رمضان',
  driver: 'حسام الدين',
  type: 'سلوك غير لائق',
  reportedBy: 'العميل',
  reportedAt: 'أمس، 04:15 م',
  priority: 'NORMAL',
  status: 'OPEN',
  description: 'شكوى من طريقة التعامل أثناء التحميل.',
  amount: 910
},
{
  id: 'DSP-1016',
  tripId: 'WDI-1024',
  customer: 'أحمد محمد',
  driver: 'محمود علي',
  type: 'إلغاء بعد التحميل',
  reportedBy: 'السائق',
  reportedAt: 'أمس، 01:22 م',
  priority: 'NORMAL',
  status: 'OPEN',
  description: 'العميل ألغى الرحلة بعد تحميل نصف الحمولة.',
  amount: 380
},
{
  id: 'DSP-1015',
  tripId: 'WDI-1019',
  customer: 'سارة إبراهيم',
  driver: 'كريم سمير',
  type: 'مشكلة في الدفع',
  reportedBy: 'السائق',
  reportedAt: 'قبل يومين، 08:11 م',
  priority: 'HIGH',
  status: 'OPEN',
  description: 'المستحق لم يظهر للسائق بعد اكتمال الرحلة.',
  amount: 620
},
{
  id: 'DSP-1014',
  tripId: 'WDI-1016',
  customer: 'مصطفى إبراهيم',
  driver: 'محمد علي',
  type: 'تلف في الحمولة',
  reportedBy: 'العميل',
  reportedAt: 'قبل 3 أيام',
  priority: 'HIGH',
  status: 'RESOLVED',
  description: 'خدش في باب دولاب أثناء النقل.',
  amount: 480,
  resolution: 'تمت التسوية بشكل جزئي',
  closedAt: 'قبل يومين، 11:04 ص',
  closedBy: 'منى عبد الرحمن'
},
{
  id: 'DSP-1013',
  tripId: 'WDI-1011',
  customer: 'ندى فتحي',
  driver: 'عمر حسن',
  type: 'تأخير في التسليم',
  reportedBy: 'العميل',
  reportedAt: 'قبل 4 أيام',
  priority: 'NORMAL',
  status: 'RESOLVED',
  description: 'تأخير 40 دقيقة بسبب زحام مروري موثق بالتتبع.',
  amount: 390,
  resolution: 'لا يوجد خطأ مثبت',
  closedAt: 'قبل 3 أيام، 05:30 م',
  closedBy: 'منى عبد الرحمن'
},
{
  id: 'DSP-1012',
  tripId: 'WDI-1008',
  customer: 'خالد عبد الله',
  driver: 'محمد أحمد',
  type: 'حمولة ناقصة',
  reportedBy: 'العميل',
  reportedAt: 'قبل 5 أيام',
  priority: 'URGENT',
  status: 'RESOLVED',
  description: 'نقص صندوق أدوات عند التسليم.',
  amount: 700,
  resolution: 'تمت التسوية لصالح العميل',
  closedAt: 'قبل 4 أيام، 02:12 م',
  closedBy: 'أحمد سليم'
},
{
  id: 'DSP-1011',
  tripId: 'WDI-1004',
  customer: 'شريف جابر',
  driver: 'طارق منير',
  type: 'خلاف على السعر',
  reportedBy: 'السائق',
  reportedAt: 'قبل أسبوع',
  priority: 'NORMAL',
  status: 'RESOLVED',
  description: 'خلاف على مسافة إضافية خارج النطاق.',
  amount: 300,
  resolution: 'تمت التسوية لصالح السائق',
  closedAt: 'قبل 6 أيام، 09:45 ص',
  closedBy: 'أحمد سليم'
}];


export const disputeSteps = [
{ key: 'reported', label: 'تم الإبلاغ عن المشكلة' },
{ key: 'created', label: 'إنشاء النزاع' },
{ key: 'evidence', label: 'مراجعة الأدلة' },
{ key: 'determine', label: 'تحديد المشكلة' },
{ key: 'decision', label: 'اتخاذ القرار' },
{ key: 'document', label: 'توثيق القرار' },
{ key: 'closed', label: 'إغلاق النزاع' }];


export const resolutionOptions = [
'تمت التسوية لصالح العميل',
'تمت التسوية لصالح السائق',
'تمت التسوية بشكل جزئي',
'لا يوجد خطأ مثبت',
'يحتاج الأمر إلى دعم إضافي'];