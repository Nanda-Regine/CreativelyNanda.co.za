'use client';

/**
 * Evidence Wing: "A week with Thabo".
 *
 * Five stops laid out as an editorial column. On md+ the stops alternate
 * sides and shift their offsets so it reads as a page, not a card grid; under
 * md it is one column. Nothing plays by itself. Every stop is labelled
 * "Sample data" because every figure here is invented for the story.
 */

import { useCallback } from 'react';
import type { JourneyStop } from '@/lib/data/evidence/types';
import { FadeUp, GOLD, GOLD_INK, ink } from '../ForgeChrome';
import DeskFrame from './DeskFrame';

export default function JourneyWeek({ stops, title }: { stops: JourneyStop[]; title: string }) {
  const jump = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    el.focus({ preventScroll: true });
  }, []);

  return (
    <section aria-label={title}>
      <nav aria-label={`${title}: jump to a day`} className="mb-8 border-b pb-2" style={{ borderColor: ink(0.15) }}>
        <ul className="flex flex-wrap gap-1">
          {stops.map((s) => (
            <li key={s.day}>
              <button
                type="button"
                onClick={() => jump(`journey-${s.day}`)}
                className="min-h-[44px] min-w-[44px] rounded-sm px-4 font-mono text-xs uppercase tracking-[0.18em] outline-none focus-visible:ring-2"
                style={{ color: GOLD_INK, ['--tw-ring-color' as string]: GOLD_INK }}
              >
                {s.day}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <ol className="space-y-14 md:space-y-20">
        {stops.map((s, i) => {
          const flip = i % 2 === 1;
          const nudge = ['md:mt-0', 'md:mt-8', 'md:-mt-4', 'md:mt-6', 'md:mt-0'][i % 5];
          return (
            <li key={s.day} className={nudge}>
              <FadeUp>
                <article
                  id={`journey-${s.day}`}
                  tabIndex={-1}
                  aria-labelledby={`journey-${s.day}-title`}
                  className="grid scroll-mt-6 gap-6 outline-none focus-visible:ring-2 md:grid-cols-12 md:items-center md:gap-10"
                  style={{ ['--tw-ring-color' as string]: GOLD_INK }}
                >
                  <div
                    className={`md:col-span-7 ${flip ? 'md:order-2 md:pl-6' : 'md:pr-6'}`}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className="rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em]"
                        style={{ background: GOLD, color: '#0A1128' }}
                      >
                        {s.day}
                      </span>
                      <span className="font-mono text-xs" style={{ color: ink(0.75) }}>
                        {s.where}
                      </span>
                    </div>
                    <h3
                      id={`journey-${s.day}-title`}
                      className="mt-3 font-display text-3xl leading-[1.1] md:text-4xl"
                      style={{ color: ink(0.95) }}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed md:text-lg" style={{ color: ink(0.8) }}>
                      {s.body}
                    </p>
                    {s.figure && (
                      <p
                        className="mt-5 border-l-2 pl-4 font-display text-xl"
                        style={{ borderColor: GOLD, color: ink(0.95) }}
                      >
                        {s.figure}
                      </p>
                    )}
                    <p
                      className="mt-4 inline-block rounded-sm border px-2 py-1 font-mono text-[11px] uppercase tracking-[0.18em]"
                      style={{ borderColor: ink(0.35), color: ink(0.8) }}
                    >
                      {s.sampleData ? 'Sample data' : 'Live screen'}
                    </p>
                  </div>
                  <div
                    className={`mx-auto w-full max-w-[18rem] md:col-span-5 md:max-w-none ${flip ? 'md:order-1' : ''}`}
                  >
                    <DeskFrame screenId={s.screen} />
                  </div>
                </article>
              </FadeUp>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
