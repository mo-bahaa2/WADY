import React, { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis } from
'recharts';
import { StarIcon } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { SegmentedControl, Tabs } from '../components/ui/Tabs';
import { KpiCard } from '../components/ui/KpiCard';
import { Card, CardHeader, DataRow } from '../components/ui/Card';
import { SkeletonChart } from '../components/ui/States';
import { activeDriversSeries, cancellationBreakdown, ratingTrend, tripsOverTime } from '../data/reports';
import { revenueSeries } from '../data/payments';
import { egp } from '../utils/format';
import { useDataState } from '../contexts/DataStateContext';

const periods = [
{ key: 'day', label: 'اليوم' },
{ key: 'week', label: 'هذا الأسبوع' },
{ key: 'month', label: 'هذا الشهر' },
{ key: 'custom', label: 'مخصص' }];


const tabs = [
{ key: 'overview', label: 'نظرة عامة' },
{ key: 'trips', label: 'الرحلات' },
{ key: 'revenue', label: 'الإيرادات' },
{ key: 'drivers', label: 'السائقون' },
{ key: 'ratings', label: 'التقييمات' }];


const axisTick = { fontFamily: 'Tajawal', fontSize: 12, fill: '#5F657C' };
const tooltipStyle = {
  borderRadius: 10,
  border: '1px solid #E4E7EF',
  fontFamily: 'Tajawal',
  fontSize: 13,
  direction: 'rtl' as const
};

export function Reports() {
  const [period, setPeriod] = useState('week');
  const [tab, setTab] = useState('overview');
  const loading = useDataState() === 'loading';

  return (
    <div className="max-w-[1600px] mx-auto">
      <PageHeader
        title="التقارير"
        description="تحليل أداء التشغيل والأعمال على منصة وِدي"
        actions={<SegmentedControl items={periods} value={period} onChange={setPeriod} />} />
      

      <div className="grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7 gap-4 mb-6">
        <KpiCard label="عدد الرحلات" value="787" trend={{ direction: 'up', value: '+8.4%' }} />
        <KpiCard label="معدل إتمام الرحلات" value="87%" trend={{ direction: 'up', value: '+4.2%' }} accent="purple" />
        <KpiCard label="معدل الإلغاء" value="7.3%" trend={{ direction: 'down', value: '-1.1%' }} />
        <KpiCard label="الإيرادات" value={egp(789650)} accent="orange" />
        <KpiCard label="العمولة" value={egp(118440)} accent="purple" />
        <KpiCard label="السائقون النشطون" value="222" />
        <KpiCard label="متوسط التقييم" value="4.7 / 5" />
      </div>

      <Tabs items={tabs} value={tab} onChange={setTab} className="bg-white border border-line rounded-t-card px-4" />

      <div className="mt-6 space-y-6">
        {(tab === 'overview' || tab === 'trips') &&
        <Card>
            <CardHeader title="الرحلات عبر الوقت" description="توزيع الرحلات حسب الحالة خلال الفترة المحددة" />
            <div className="px-6 pb-6">
              {loading ?
            <SkeletonChart className="h-[300px]" /> :

            <div className="h-[300px]" dir="ltr">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={tripsOverTime} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EF" vertical={false} />
                      <XAxis dataKey="label" reversed tick={axisTick} axisLine={false} tickLine={false} />
                      <YAxis orientation="right" tick={axisTick} axisLine={false} tickLine={false} width={48} />
                      <RTooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(26,31,61,0.04)' }} />
                      <Legend
                    formatter={(v: string) =>
                    <span style={{ fontFamily: 'Tajawal', fontSize: 12, color: '#5F657C' }}>
                            {v === 'completed' ? 'مكتملة' : v === 'active' ? 'نشطة' : v === 'cancelled' ? 'ملغاة' : 'بها مشكلة'}
                          </span>
                    } />
                  
                      <Bar dataKey="completed" stackId="a" fill="#1A1F3D" maxBarSize={34} />
                      <Bar dataKey="active" stackId="a" fill="#FF6835" maxBarSize={34} />
                      <Bar dataKey="cancelled" stackId="a" fill="#C3C7D5" maxBarSize={34} />
                      <Bar dataKey="issues" stackId="a" fill="#6C63FF" radius={[4, 4, 0, 0]} maxBarSize={34} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
            }
            </div>
          </Card>
        }

        {(tab === 'overview' || tab === 'trips') &&
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card>
              <CardHeader title="معدل إتمام الرحلات" description="نسبة الرحلات المكتملة من إجمالي الرحلات" />
              <div className="px-6 pb-6">
                <p className="text-[40px] font-bold text-navy tabular leading-none">87%</p>
                <p className="text-[13px] text-success mt-2">+4.2% مقارنة بالفترة السابقة</p>
                <div className="h-2.5 rounded-full bg-navy-50 overflow-hidden mt-4">
                  <div className="h-full bg-navy rounded-full" style={{ width: '87%' }} />
                </div>
                <dl className="mt-4">
                  <DataRow label="رحلات مكتملة" value="687" />
                  <DataRow label="رحلات جارية" value="24" />
                  <DataRow label="رحلات ملغاة" value="57" />
                  <DataRow label="رحلات بها مشكلة" value="19" />
                </dl>
              </div>
            </Card>
            <Card>
              <CardHeader title="معدل الإلغاء" description="توزيع أسباب الإلغاء حسب الطرف" />
              <div className="px-6 pb-6 flex items-center gap-6 flex-wrap">
                <div className="w-[190px] h-[190px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={cancellationBreakdown} dataKey="value" nameKey="name" innerRadius={54} outerRadius={82} paddingAngle={2} stroke="none">
                        {cancellationBreakdown.map((c) =>
                      <Cell key={c.name} fill={c.color} />
                      )}
                      </Pie>
                      <RTooltip contentStyle={tooltipStyle} formatter={(v: number, n: string) => [`${v}%`, n]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 min-w-[180px]">
                  <p className="text-[32px] font-bold text-navy tabular leading-none">7.3%</p>
                  <p className="text-[13px] text-ink-muted mt-1">من إجمالي رحلات الفترة</p>
                  <ul className="mt-4 space-y-2">
                    {cancellationBreakdown.map((c) =>
                  <li key={c.name} className="flex items-center gap-2.5 text-[13px]">
                        <span className="w-2.5 h-2.5 rounded-sm" style={{ background: c.color }} aria-hidden />
                        <span className="text-ink-muted">{c.name}</span>
                        <span className="mr-auto font-medium tabular">{c.value}%</span>
                      </li>
                  )}
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        }

        {(tab === 'overview' || tab === 'revenue') &&
        <Card>
            <CardHeader
            title="الإيرادات والعمولة"
            description="إجمالي الإيرادات وعمولة المنصة ومستحقات السائقين"
            action={
            <div className="flex items-center gap-5 text-[13px]">
                  <span className="text-ink-muted">
                    الإيرادات <span className="font-bold text-navy tabular">{egp(789650)}</span>
                  </span>
                  <span className="text-ink-muted">
                    العمولة <span className="font-bold text-purple tabular">{egp(118440)}</span>
                  </span>
                  <span className="text-ink-muted">
                    مستحقات السائقين <span className="font-bold text-navy tabular">{egp(671210)}</span>
                  </span>
                </div>
            } />
          
            <div className="px-6 pb-6 h-[300px]" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueSeries} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EF" vertical={false} />
                  <XAxis dataKey="label" reversed tick={axisTick} axisLine={false} tickLine={false} />
                  <YAxis orientation="right" tick={axisTick} axisLine={false} tickLine={false} width={62} tickFormatter={(v: number) => `${v / 1000}k`} />
                  <RTooltip contentStyle={tooltipStyle} formatter={(v: number, n: string) => [egp(v), n === 'revenue' ? 'الإيرادات' : 'العمولة']} />
                  <Line type="monotone" dataKey="revenue" stroke="#1A1F3D" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="commission" stroke="#6C63FF" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        }

        {(tab === 'overview' || tab === 'drivers') &&
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <Card className="xl:col-span-2">
              <CardHeader title="السائقون النشطون" description="عدد السائقين النشطين يوميًا" />
              <div className="px-6 pb-6 h-[260px]" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={activeDriversSeries} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EF" vertical={false} />
                    <XAxis dataKey="label" reversed tick={axisTick} axisLine={false} tickLine={false} />
                    <YAxis orientation="right" tick={axisTick} axisLine={false} tickLine={false} width={48} />
                    <RTooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v} سائق`, 'السائقون النشطون']} />
                    <Line type="monotone" dataKey="drivers" stroke="#FF6835" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card>
              <CardHeader title="حالة السائقين الآن" />
              <div className="px-6 pb-6">
                <dl>
                  <DataRow label="سائقون نشطون" value="222" />
                  <DataRow label="متصلون الآن" value="86" />
                  <DataRow label="في رحلات حالية" value="24" />
                  <DataRow label="بانتظار التحقق" value="12" />
                </dl>
              </div>
            </Card>
          </div>
        }

        {(tab === 'overview' || tab === 'ratings') &&
        <Card>
            <CardHeader title="متوسط التقييم" description="اتجاه رضا العملاء عبر الأسابيع" />
            <div className="px-6 pb-6 flex flex-col lg:flex-row gap-6">
              <div className="flex flex-col justify-center min-w-[180px]">
                <p className="text-[40px] font-bold text-navy tabular leading-none flex items-center gap-2">
                  4.7
                  <StarIcon className="w-6 h-6 text-orange" aria-hidden />
                </p>
                <p className="text-[13px] text-ink-muted mt-2">من 5 · بناءً على 412 تقييم</p>
                <p className="text-[13px] text-success mt-1">+0.2 مقارنة بالشهر السابق</p>
              </div>
              <div className="flex-1 h-[220px]" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ratingTrend} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EF" vertical={false} />
                    <XAxis dataKey="label" reversed tick={axisTick} axisLine={false} tickLine={false} />
                    <YAxis orientation="right" domain={[4, 5]} tick={axisTick} axisLine={false} tickLine={false} width={40} />
                    <RTooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v} / 5`, 'متوسط التقييم']} />
                    <Line type="monotone" dataKey="rating" stroke="#6C63FF" strokeWidth={2.5} dot={{ r: 3, fill: '#6C63FF' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        }
      </div>
    </div>);

}