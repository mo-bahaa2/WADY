export interface EvidenceItem {
  id: string;
  phase: 'قبل النقل' | 'أثناء الرحلة' | 'عند التسليم';
  source: 'العميل' | 'السائق' | 'النظام';
  title: string;
  time: string;
  note?: string;
  images: string[];
}

export const IMG_LOAD_BEFORE_1 = "/b7170059-18b1-497f-84c3-2883b4564520.jpg";

export const IMG_LOAD_BEFORE_2 = "/3dc0397d-b5aa-47d6-8794-13a69e814f0c.jpg";

export const IMG_LOAD_AFTER = "/d271565b-6179-4be7-b657-c814222b36b7.jpg";

export const IMG_DAMAGE = "/444fae30-4810-4f4f-8514-356bff8befaf.jpg";

export const IMG_VEHICLE = "/0f253aab-3414-4bf9-81b5-314a705e2a98.jpg";


export const tripEvidence: EvidenceItem[] = [
{
  id: 'EV-01',
  phase: 'قبل النقل',
  source: 'العميل',
  title: 'صور حالة الحمولة قبل التحميل',
  time: 'اليوم، 04:51 م',
  note: 'الدولاب عليه خدش قديم من الجهة اليمنى، تم تصويره قبل التحميل.',
  images: [IMG_LOAD_BEFORE_1, IMG_LOAD_BEFORE_2]
},
{
  id: 'EV-02',
  phase: 'قبل النقل',
  source: 'السائق',
  title: 'تأكيد السائق على حالة الحمولة',
  time: 'اليوم، 04:56 م',
  note: 'السائق أكد مطابقة الحمولة للوصف وحالتها قبل بدء النقل.',
  images: []
},
{
  id: 'EV-03',
  phase: 'أثناء الرحلة',
  source: 'النظام',
  title: 'سجل التتبع أثناء النقل',
  time: 'اليوم، 05:03 م — الآن',
  note: 'تحديث الموقع كل دقيقتين، لا توجد توقفات غير معتادة.',
  images: []
},
{
  id: 'EV-04',
  phase: 'عند التسليم',
  source: 'السائق',
  title: 'صور التسليم في الوجهة',
  time: 'بانتظار التسليم',
  note: 'لم يتم رفع صور التسليم بعد.',
  images: []
}];


export const disputeEvidence: EvidenceItem[] = [
{
  id: 'DEV-01',
  phase: 'قبل النقل',
  source: 'العميل',
  title: 'صور الحمولة قبل التحميل',
  time: 'اليوم، 01:12 م',
  note: '30 شيكارة سليمة ومرصوصة، بدون أي قطع ظاهر.',
  images: [IMG_LOAD_BEFORE_2, IMG_LOAD_BEFORE_1]
},
{
  id: 'DEV-02',
  phase: 'قبل النقل',
  source: 'السائق',
  title: 'تأكيد السائق على الحمولة',
  time: 'اليوم، 01:18 م',
  note: 'تم التأكيد على عدد الشكاير وحالتها قبل التحميل.',
  images: []
},
{
  id: 'DEV-03',
  phase: 'أثناء الرحلة',
  source: 'النظام',
  title: 'سجل التتبع',
  time: 'اليوم، 01:26 م — 02:02 م',
  note: 'توقف غير مجدول لمدة 9 دقائق في منطقة الهرم.',
  images: []
},
{
  id: 'DEV-04',
  phase: 'عند التسليم',
  source: 'العميل',
  title: 'صور التلف بعد التسليم',
  time: 'اليوم، 02:08 م',
  note: '3 شكاير مقطوعة وفقد جزئي في الكمية.',
  images: [IMG_DAMAGE]
},
{
  id: 'DEV-05',
  phase: 'عند التسليم',
  source: 'السائق',
  title: 'صور السائق عند التسليم',
  time: 'اليوم، 02:04 م',
  note: 'السائق يذكر أن القطع كان موجودًا في شيكارتين قبل التحميل.',
  images: [IMG_LOAD_AFTER]
}];