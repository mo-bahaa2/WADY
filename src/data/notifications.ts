import type { AppNotification } from '../types';

export const notifications: AppNotification[] = [
{
  id: 'NTF-01',
  category: 'نزاعات',
  title: 'نزاع جديد',
  description: 'تم فتح نزاع #DSP-1021 على الرحلة #WDI-1046',
  time: 'منذ 5 دقائق',
  unread: true
},
{
  id: 'NTF-02',
  category: 'مدفوعات',
  title: 'عملية دفع فاشلة',
  description: 'المعاملة #TXN-83419 فشلت — رصيد غير كافٍ',
  time: 'منذ 12 دقيقة',
  unread: true
},
{
  id: 'NTF-03',
  category: 'رحلات',
  title: 'رحلة #WDI-1042 بها مشكلة',
  description: 'السائق أبلغ عن خلاف على السعر',
  time: 'منذ 34 دقيقة',
  unread: true
},
{
  id: 'NTF-04',
  category: 'سائقون',
  title: '3 سائقين بانتظار التحقق',
  description: 'طلبات جديدة تحتاج مراجعة المستندات',
  time: 'منذ ساعة',
  unread: false
},
{
  id: 'NTF-05',
  category: 'سائقون',
  title: 'مستند سائق منتهي',
  description: 'تأمين المركبة للسائق مصطفى إبراهيم منتهي',
  time: 'منذ ساعتين',
  unread: false
},
{
  id: 'NTF-06',
  category: 'رحلات',
  title: 'رحلة متأخرة',
  description: 'الرحلة #WDI-1035 تجاوزت الوقت المتوقع بـ 40 دقيقة',
  time: 'منذ 3 ساعات',
  unread: false
},
{
  id: 'NTF-07',
  category: 'النظام',
  title: 'تحديث بوابة الدفع',
  description: 'تمت استعادة الاتصال ببوابة الدفع بنجاح',
  time: 'أمس، 11:20 م',
  unread: false
}];