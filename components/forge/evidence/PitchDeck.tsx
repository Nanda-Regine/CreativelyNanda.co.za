'use client';

/**
 * Evidence Wing: the pitch deck.
 *
 * Native CSS scroll-snap, one idea per slide. Swipe is the browser's own
 * scroll, so it costs nothing on a mid-range phone. JS only does three jobs:
 * keyboard stepping, the progress dots, and reporting which slide is current.
 * Nothing ever advances by itself.
 *
 * Hydration: the current index starts at 0 on server and client. The observer
 * only exists after mount.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { track } from '@/lib/analytics';
import type { Slide } from '@/lib/data/evidence/types';
import { GOLD, GOLD_INK, ink } from '../ForgeChrome';
import DeskFrame from './DeskFrame';
import { ClaimFigure, ClaimsFootnote } from './ClaimFigure';

// Fixed event name: only the slide index is ever sent, never text.
const SLIDE_EVENT = 'evidence_slide';

const KEY_STEP: Record<string, number | 'home' | 'end'> = {
  ArrowRight: 1,
  PageDown: 1,
  ArrowLeft: -1,
  PageUp: -1,
  Home: 'home',
  End: 'end',
};

export default function PitchDeck({ slides, title, app = 'adminos' }: { slides: Slide[]; title: string; app?: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  const slideEls = useRef<(HTMLElement | null)[]>([]);
  const lastTracked = useRef(0);
  const [index, setIndex] = useState(0);
  const total = slides.length;

  useEffect(() => {
    const root = scroller.current;
    if (!root || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.6) {
            const i = slideEls.current.indexOf(e.target as HTMLElement);
            if (i >= 0) setIndex(i);
          }
        }
      },
      { root, threshold: [0.6] },
    );
    slideEls.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [total]);

  useEffect(() => {
    if (index === lastTracked.current) return;
    lastTracked.current = index;
    track(SLIDE_EVENT, { app, slide: index });
  }, [index, app]);

  const goTo = useCallback(
    (i: number) => {
      const root = scroller.current;
      if (!root) return;
      const next = Math.max(0, Math.min(total - 1, i));
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      root.scrollTo({ left: next * root.clientWidth, behavior: reduce ? 'auto' : 'smooth' });
    },
    [total],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    const step = KEY_STEP[e.key];
    if (step === undefined) return;
    e.preventDefault();
    if (step === 'home') goTo(0);
    else if (step === 'end') goTo(total - 1);
    else goTo(index + step);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={title}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{ ['--tw-ring-color' as string]: GOLD_INK }}
    >
      <div
        ref={scroller}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
        style={{ scrollbarWidth: 'none' }}
      >
        {slides.map((s, i) => (
          <section
            key={s.id}
            ref={(el) => {
              slideEls.current[i] = el;
            }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${total}`}
            className="w-full shrink-0 snap-start px-5 py-8 md:px-10 md:py-12"
          >
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-12 md:items-center">
              <div className={s.screen ? 'md:col-span-7' : 'md:col-span-10'}>
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.22em]"
                  style={{ color: GOLD_INK }}
                >
                  {s.kicker}
                </p>
                <h3
                  className="mt-3 font-display text-3xl leading-[1.08] md:text-5xl"
                  style={{ color: ink(0.95) }}
                >
                  {s.title}
                </h3>
                <div className="mt-5 space-y-3 text-base leading-relaxed md:text-lg" style={{ color: ink(0.8) }}>
                  {s.body.map((p, k) => (
                    <p key={k}>{p}</p>
                  ))}
                </div>
                {s.claimIds && s.claimIds.length > 0 && (
                  <div className="mt-6">
                    <ul className="flex flex-wrap gap-x-8 gap-y-3">
                      {s.claimIds.map((id) => (
                        <li key={id} className="font-display text-2xl" style={{ color: ink(0.95) }}>
                          <ClaimFigure id={id} />
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 text-sm" style={{ color: ink(0.7) }}>
                      <ClaimsFootnote ids={s.claimIds} />
                    </div>
                  </div>
                )}
              </div>
              {s.screen && (
                <div className="mx-auto w-full max-w-[18rem] md:col-span-5 md:max-w-none">
                  <DeskFrame screenId={s.screen} priority={i === 0} />
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-0 pb-2" role="group" aria-label={`${title} progress`}>
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <button
              key={s.id}
              type="button"
              aria-label={`Slide ${i + 1} of ${total}`}
              aria-current={active ? 'true' : undefined}
              onClick={() => goTo(i)}
              className="flex h-11 w-11 items-center justify-center rounded-full outline-none focus-visible:ring-2"
              style={{ ['--tw-ring-color' as string]: GOLD_INK }}
            >
              <span
                aria-hidden="true"
                className="block h-2.5 rounded-full transition-[width,background-color] motion-reduce:transition-none"
                style={{
                  width: active ? 24 : 10,
                  background: active ? GOLD : ink(0.3),
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
