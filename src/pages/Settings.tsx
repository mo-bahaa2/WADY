import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LaptopIcon, LogOutIcon, SmartphoneIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Tabs } from '../components/ui/Tabs';
import { Card, CardHeader, DataRow } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FieldLabel, TextInput, Toggle } from '../components/ui/Field';
import { Modal } from '../components/ui/Modal';
import { Badge } from '../components/ui/StatusChip';
import { useToast } from '../components/ui/Toast';

const tabs = [
{ key: 'account', label: 'الحساب' },
{ key: 'system', label: 'إعدادات النظام' },
{ key: 'notifications', label: 'الإشعارات' },
{ key: 'security', label: 'الأمان' }];


const notificationSettings = [
{ key: 'disputes', label: 'نزاعات جديدة', description: 'تنبيه فور فتح نزاع على أي رحلة' },
{ key: 'payments', label: 'مدفوعات فاشلة', description: 'تنبيه عند فشل أي عملية دفع' },
{ key: 'drivers', label: 'سائقون بانتظار التحقق', description: 'تنبيه عند وصول طلب تسجيل جديد' },
{ key: 'trips', label: 'مشكلات الرحلات', description: 'تنبيه عند تأخر رحلة أو انقطاع التتبع' },
{ key: 'system', label: 'تنبيهات النظام', description: 'حالة بوابة الدفع وخدمات المنصة' }];


const sessions = [
{ device: 'Chrome — Windows', location: 'القاهرة، مصر', time: 'الجلسة الحالية', icon: LaptopIcon, current: true },
{ device: 'Safari — iPhone', location: 'الجيزة، مصر', time: 'منذ 3 ساعات', icon: SmartphoneIcon, current: false },
{ device: 'Chrome — MacBook', location: 'القاهرة، مصر', time: 'أمس، 09:12 م', icon: LaptopIcon, current: false }];


export function Settings() {
  const [tab, setTab] = useState('account');
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    disputes: true,
    payments: true,
    drivers: true,
    trips: false,
    system: true
  });
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [logoutAllOpen, setLogoutAllOpen] = useState(false);
  const toast = useToast();

  return (
    <div className="max-w-[1100px] mx-auto">
      <PageHeader title="الإعدادات" description="إدارة حسابك وتفضيلات النظام والأمان" />

      <Tabs items={tabs} value={tab} onChange={setTab} className="bg-white border border-line rounded-t-card px-4" />

      <div className="mt-6 space-y-6">
        {tab === 'account' &&
        <Card>
            <CardHeader title="حساب المسؤول" description="بيانات حسابك على لوحة تحكم وِدي" />
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <FieldLabel htmlFor="name">الاسم</FieldLabel>
                  <TextInput id="name" defaultValue="منى عبد الرحمن" />
                </div>
                <div>
                  <FieldLabel htmlFor="email">البريد الإلكتروني</FieldLabel>
                  <TextInput id="email" type="email" defaultValue="mona@wedi.eg" dir="ltr" />
                </div>
                <div>
                  <FieldLabel htmlFor="phone">رقم الهاتف</FieldLabel>
                  <TextInput id="phone" defaultValue="010 123 4567" className="tabular" />
                </div>
                <div>
                  <FieldLabel htmlFor="role">الدور</FieldLabel>
                  <TextInput id="role" defaultValue="مسؤول النظام" disabled />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-5">
                <Button onClick={() => toast('success', 'تم حفظ التغييرات', 'تم تحديث بيانات الحساب.')}>حفظ التغييرات</Button>
                <Button variant="outline" onClick={() => setPasswordOpen(true)}>
                  تغيير كلمة المرور
                </Button>
              </div>
            </div>
          </Card>
        }

        {tab === 'system' &&
        <Card>
            <CardHeader title="إعدادات النظام" description="إعدادات التشغيل العامة للمنصة" />
            <div className="px-6 pb-6">
              <dl>
                <DataRow label="العملة" value="الجنيه المصري (ج.م)" />
                <DataRow label="لغة اللوحة" value="العربية" />
                <DataRow label="المنطقة الزمنية" value="توقيت القاهرة (GMT+2)" />
                <DataRow label="نسبة العمولة الافتراضية" value="15%" />
                <DataRow label="نوع المركبة في MVP" value="ربع نقل" />
              </dl>
              <div className="flex items-center gap-2 mt-4">
                <Button variant="outline" onClick={() => toast('info', 'تعديل الإعدادات', 'الإعدادات العامة يتم تعديلها بواسطة فريق المنتج.')}>
                  طلب تعديل الإعدادات
                </Button>
                <Link to="/design-system">
                  <Button variant="ghost">دليل المكونات</Button>
                </Link>
              </div>
            </div>
          </Card>
        }

        {tab === 'notifications' &&
        <Card>
            <CardHeader title="الإشعارات" description="اختر التنبيهات التي تريد استقبالها" />
            <ul className="px-6 pb-6 divide-y divide-line">
              {notificationSettings.map((n) =>
            <li key={n.key} className="flex items-center justify-between gap-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-ink">{n.label}</p>
                    <p className="text-[12.5px] text-ink-muted mt-0.5">{n.description}</p>
                  </div>
                  <Toggle
                label={n.label}
                checked={toggles[n.key]}
                onChange={(v) => {
                  setToggles((prev) => ({ ...prev, [n.key]: v }));
                  toast('success', v ? 'تم تفعيل التنبيه' : 'تم إيقاف التنبيه', n.label);
                }} />
              
                </li>
            )}
            </ul>
          </Card>
        }

        {tab === 'security' &&
        <>
            <Card>
              <CardHeader title="كلمة المرور" description="ينصح بتغيير كلمة المرور كل 90 يوم" />
              <div className="px-6 pb-6">
                <Button variant="outline" onClick={() => setPasswordOpen(true)}>
                  تغيير كلمة المرور
                </Button>
              </div>
            </Card>
            <Card>
              <CardHeader
              title="الجلسات النشطة"
              description="الأجهزة المسجل دخولها بحسابك"
              action={
              <Button variant="danger" size="sm" icon={<LogOutIcon className="w-3.5 h-3.5" />} onClick={() => setLogoutAllOpen(true)}>
                    تسجيل الخروج من جميع الأجهزة
                  </Button>
              } />
            
              <ul className="px-6 pb-6 divide-y divide-line">
                {sessions.map((s) =>
              <li key={s.device} className="flex items-center gap-4 py-4">
                    <span className="w-10 h-10 rounded-xl bg-navy-50 border border-line flex items-center justify-center shrink-0">
                      <s.icon className="w-4 h-4 text-navy-500" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-ink flex items-center gap-2">
                        {s.device}
                        {s.current && <Badge tone="success">الجلسة الحالية</Badge>}
                      </p>
                      <p className="text-[12.5px] text-ink-muted tabular mt-0.5">
                        {s.location} · {s.time}
                      </p>
                    </div>
                  </li>
              )}
              </ul>
            </Card>
          </>
        }
      </div>

      <Modal
        open={passwordOpen}
        onClose={() => setPasswordOpen(false)}
        title="تغيير كلمة المرور"
        description="أدخل كلمة المرور الحالية ثم كلمة المرور الجديدة."
        confirmLabel="حفظ كلمة المرور"
        onConfirm={() => {
          setPasswordOpen(false);
          toast('success', 'تم تغيير كلمة المرور');
        }}>
        
        <div className="space-y-3">
          <div>
            <FieldLabel htmlFor="current">كلمة المرور الحالية</FieldLabel>
            <TextInput id="current" type="password" />
          </div>
          <div>
            <FieldLabel htmlFor="new">كلمة المرور الجديدة</FieldLabel>
            <TextInput id="new" type="password" />
          </div>
        </div>
      </Modal>

      <Modal
        open={logoutAllOpen}
        onClose={() => setLogoutAllOpen(false)}
        title="هل أنت متأكد؟"
        description="سيتم تسجيل الخروج من كل الأجهزة، وهتحتاج تسجل دخول من جديد."
        tone="warning"
        confirmLabel="تأكيد"
        confirmVariant="danger"
        onConfirm={() => {
          setLogoutAllOpen(false);
          toast('success', 'تم تسجيل الخروج من جميع الأجهزة');
        }} />
      
    </div>);

}