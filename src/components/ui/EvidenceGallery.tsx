import React from 'react';
import { CameraOffIcon, FileTextIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { EvidenceItem } from '../../data/evidence';

const phaseTone: Record<EvidenceItem['phase'], string> = {
  'قبل النقل': 'bg-navy text-white',
  'أثناء الرحلة': 'bg-purple text-white',
  'عند التسليم': 'bg-orange text-white'
};

export function EvidenceBlock({ item, compact = false }: {item: EvidenceItem;compact?: boolean;}) {
  return (
    <article className="border border-line rounded-xl p-4 bg-white">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <span className={cn('text-[11px] font-bold rounded-full px-2.5 h-6 inline-flex items-center', phaseTone[item.phase])}>
            {item.phase}
          </span>
          <h3 className="text-sm font-bold text-navy">{item.title}</h3>
        </div>
        <p className="text-[12px] text-ink-subtle tabular">
          {item.time} · {item.source}
        </p>
      </div>
      {item.note && <p className="text-[13px] text-ink-muted mt-2 leading-6">{item.note}</p>}
      {item.images.length > 0 ?
      <div className={cn('grid gap-3 mt-3', compact ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-3')}>
          {item.images.map((src, i) =>
        <figure key={src + i} className="rounded-lg overflow-hidden border border-line bg-navy-50">
              <img
            src={src}
            alt={`${item.title} — صورة ${i + 1}`}
            loading="lazy"
            className="w-full h-36 object-cover" />
          
              <figcaption className="text-[11px] text-ink-subtle px-2.5 py-1.5 tabular border-t border-line bg-white">
                {item.source} · {item.time}
              </figcaption>
            </figure>
        )}
        </div> :

      <div className="mt-3 flex items-center gap-2 text-[12.5px] text-ink-subtle border border-dashed border-line rounded-lg px-3 py-2.5">
          {item.source === 'النظام' ?
        <FileTextIcon className="w-4 h-4" aria-hidden /> :

        <CameraOffIcon className="w-4 h-4" aria-hidden />
        }
          {item.source === 'النظام' ? 'دليل نصي / سجل نظام بدون صور' : 'لا توجد صور مرفوعة في هذه المرحلة'}
        </div>
      }
    </article>);

}

export function EvidenceTimeline({ items }: {items: EvidenceItem[];}) {
  const phases: EvidenceItem['phase'][] = ['قبل النقل', 'أثناء الرحلة', 'عند التسليم'];
  return (
    <div className="space-y-6">
      {phases.map((phase) => {
        const group = items.filter((i) => i.phase === phase);
        if (group.length === 0) return null;
        return (
          <section key={phase}>
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-[15px] font-bold text-navy">{phase}</h3>
              <span className="h-px flex-1 bg-line" aria-hidden />
              <span className="text-[12px] text-ink-subtle tabular">{group.length} أدلة</span>
            </div>
            <div className="space-y-3">
              {group.map((item) =>
              <EvidenceBlock key={item.id} item={item} />
              )}
            </div>
          </section>);

      })}
    </div>);

}