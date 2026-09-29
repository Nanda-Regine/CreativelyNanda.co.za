'use client';

/**
 * The App Studio, going deeper than the screens.
 *
 * A gallery answers "what does it look like?". A studio should answer the two
 * questions after that: "what is it like to use?" and "why is it like that?".
 *
 * - **Journeys** answer the first. A real flow through a product, played like a
 *   story: one phone, one line of narration per screen, advancing on its own
 *   (unless the reader prefers reduced motion) and steerable by tap or key.
 * - **Anatomy** answers the second. One screen, read closely, with numbered
 *   pins on the parts that were decided. Where a build journal records the
 *   reason, the note says which one. It is the Forge's "decisions made visible"
 *   applied to pixels.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, X } from 'lucide-react';
import { track } from '@/lib/analytics';
import { ANATOMY, APP_BY_KEY, JOURNEYS, SCREEN_BY_ID, type Journey } from '@/lib/data/app-screens';
import StudioPhone from './StudioPhone';
import { FadeUp, GOLD, ink } from './ForgeChrome';

const STEP_MS = 6500;

// ─────────────────────────────────────────────────────────────────────────────
// Journeys
// ─────────────────────────────────────────────────────────────────────────────

export function Journeys() {
  const [open, setOpen] = useState<Journey | null>(null);
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: GOLD }}>
            Journeys
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl italic leading-tight text-white md:text-5xl">
            Watch it being used.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] font-light leading-relaxed" style={{ color: ink(0.62) }}>
            Five real flows, played screen by screen in the order a person moves through them.
          </p>
        </FadeUp>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {JOURNEYS.map((j, k) => {
            const app = APP_BY_KEY[j.app];
            const first = SCREEN_BY_ID[j.steps[0].id];
            const second = SCREEN_BY_ID[j.steps[1].id];
            return (
              <FadeUp key={j.slug} delay={Math.min(k * 0.06, 0.24)} className="h-full">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(j);
                    track('forge_studio_open', { app: j.app, chapter: `journey:${j.slug}` });
                  }}
                  className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border p-6 text-left transition-colors hover:bg-white/[0.03]"
                  style={{ borderColor: `${app.accent}33`, background: `linear-gradient(160deg, ${app.accent}12, transparent 60%)` }}
                >
                  <div className="relative mb-6 flex h-[210px] items-end justify-center">
                    <StudioPhone screen={second} width={112} accent={app.accent} className="absolute bottom-0 left-1/2 -translate-x-[82%] rotate-[-7deg] opacity-70 transition-transform duration-500 group-hover:-translate-x-[95%]" />
                    <StudioPhone screen={first} width={120} accent={app.accent} className="relative z-10 translate-x-[12%] rotate-[4deg] transition-transform duration-500 group-hover:-translate-y-2" />
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: app.accent }}>
                    {app.name} · {j.steps.length} screens
                  </p>
                  <h3 className="mt-2 font-display text-2xl italic leading-snug text-white">{j.title}</h3>
                  <p className="mt-2 text-[14px] font-light leading-relaxed" style={{ color: ink(0.6) }}>
                    {j.line}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: GOLD }}>
                    <Play className="h-3 w-3" /> Play the journey
                  </span>
                </button>
              </FadeUp>
            );
          })}
        </div>
      </div>
      {open ? <StoryPlayer journey={open} onClose={() => setOpen(null)} /> : null}
    </section>
  );
}

function StoryPlayer({ journey, onClose }: { journey: Journey; onClose: () => void }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(!reduce);
  const [mounted, setMounted] = useState(false);
  const [armed, setArmed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const app = APP_BY_KEY[journey.app];
  const step = journey.steps[i];
  const screen = SCREEN_BY_ID[step.id];
  const last = journey.steps.length - 1;

  const go = useCallback((n: number) => setI(Math.max(0, Math.min(last, n))), [last]);

  useEffect(() => {
    setMounted(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
  useEffect(() => {
    if (mounted) closeRef.current?.focus();
  }, [mounted]);

  // Start each progress segment empty, then let it fill over the step's duration.
  useEffect(() => {
    setArmed(false);
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setArmed(true)));
    return () => cancelAnimationFrame(r);
  }, [i, playing]);

  useEffect(() => {
    if (!playing) return;
    if (i === last) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => go(i + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [i, playing, last, go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(i + 1);
      if (e.key === 'ArrowLeft') go(i - 1);
      if (e.key === ' ') {
        e.preventDefault();
        setPlaying((p) => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [i, go, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={`Journey: ${journey.title}`} className="fixed inset-0 z-[90] flex flex-col" style={{ background: '#05070f' }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(55% 45% at 50% 42%, ${app.accent}26, transparent 70%)` }} />

      {/* progress, one segment per screen */}
      <div className="relative z-10 flex gap-1.5 px-5 pt-4">
        {journey.steps.map((s, k) => (
          <button key={s.id} type="button" onClick={() => go(k)} aria-label={`Screen ${k + 1}`} className="h-1 flex-1 overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.14)' }}>
            <span
                            className="block h-full rounded-full"
              style={{
                background: app.accent,
                width: k < i ? '100%' : k > i ? '0%' : playing && armed ? '100%' : playing ? '0%' : '50%',
                transition: k === i && playing && armed ? `width ${STEP_MS}ms linear` : 'none',
              }}
            />
          </button>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-between px-5 py-4">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.24em]" style={{ color: ink(0.55) }}>
          <span style={{ color: app.accent }}>{app.name}</span> · {journey.title}
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause' : 'Play'} className="flex h-10 w-10 items-center justify-center rounded-full border hover:bg-white/5" style={{ borderColor: ink(0.2), color: ink(0.8) }}>
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="flex h-10 w-10 items-center justify-center rounded-full border hover:bg-white/5" style={{ borderColor: ink(0.2), color: ink(0.8) }}>
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center gap-6 px-5 pb-8 md:flex-row md:gap-16">
        <div className="relative flex min-h-0 items-center" style={{ height: 'min(66vh, 700px)' }}>
          {/* tap zones, like a story */}
          <button type="button" aria-label="Previous screen" onClick={() => go(i - 1)} className="absolute inset-y-0 left-0 z-20 w-1/3" />
          <button type="button" aria-label="Next screen" onClick={() => go(i + 1)} className="absolute inset-y-0 right-0 z-20 w-1/3" />
          <StudioPhone key={screen.id} screen={screen} width={320} accent={app.accent} eager className="h-full" style={{ width: 'auto', height: '100%', aspectRatio: '9.9 / 21.1' }} />
        </div>
        <div className="max-w-sm text-center md:text-left" aria-live="polite">
          <p className="font-display text-6xl font-bold italic leading-none" style={{ color: app.accent }}>
            {String(i + 1).padStart(2, '0')}
          </p>
          <p className="mt-4 font-display text-2xl italic leading-snug text-white md:text-3xl">{step.say}</p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: ink(0.4) }}>
            {screen.chapter} · {i + 1} of {journey.steps.length}
          </p>
          <div className="mt-6 hidden gap-2 md:flex">
            <button type="button" onClick={() => go(i - 1)} disabled={i === 0} className="flex h-10 w-10 items-center justify-center rounded-full border disabled:opacity-25" style={{ borderColor: ink(0.2), color: ink(0.8) }} aria-label="Previous">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => go(i + 1)} disabled={i === last} className="flex h-10 w-10 items-center justify-center rounded-full border disabled:opacity-25" style={{ borderColor: ink(0.2), color: ink(0.8) }} aria-label="Next">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Anatomy
// ─────────────────────────────────────────────────────────────────────────────

export function AnatomyRoom() {
  const [a, setA] = useState(0);
  const [pin, setPin] = useState(0);
  const item = ANATOMY[a];
  const screen = SCREEN_BY_ID[item.id];
  const app = APP_BY_KEY[screen.app];

  const choose = (k: number) => {
    setA(k);
    setPin(0);
  };

  return (
    <section className="border-y px-6 py-20 md:py-28" style={{ borderColor: 'rgba(201,148,58,0.16)', background: 'rgba(255,255,255,0.015)' }}>
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: GOLD }}>
            Anatomy
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl italic leading-tight text-white md:text-5xl">Read a screen closely.</h2>
          <p className="mt-4 max-w-2xl text-[15px] font-light leading-relaxed" style={{ color: ink(0.62) }}>
            Every screen is a stack of decisions. Tap a number to see one. Where the reason is written in a build journal, the note
            says which.
          </p>
        </FadeUp>

        {/* the six screens */}
        <div role="tablist" aria-label="Screens to read" className="mt-10 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {ANATOMY.map((x, k) => {
            const sc = SCREEN_BY_ID[x.id];
            const ap = APP_BY_KEY[sc.app];
            const active = k === a;
            return (
              <button
                key={x.id}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => choose(k)}
                className="shrink-0 rounded-full px-4 py-2 text-left font-mono text-[10px] uppercase tracking-[0.16em] transition-colors"
                style={{ background: active ? `${ap.accent}22` : 'rgba(255,255,255,0.04)', color: active ? ap.accent : ink(0.55), boxShadow: active ? `inset 0 0 0 1px ${ap.accent}66` : 'none' }}
              >
                {ap.name.split(' ')[0]} · {x.title}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid items-start gap-12 md:grid-cols-[minmax(0,340px)_1fr] md:gap-16">
          <div className="mx-auto w-full max-w-[300px] md:sticky md:top-40">
            <StudioPhone key={item.id} screen={screen} width={300} accent={app.accent} className="!w-full">
              {item.pins.map((p, k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setPin(k)}
                  aria-label={`${k + 1}: ${p.title}`}
                  className="absolute z-10 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-mono text-[11px] font-bold transition-transform hover:scale-110"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    background: k === pin ? app.accent : 'rgba(5,7,15,0.82)',
                    color: k === pin ? '#0A1128' : '#fff',
                    boxShadow: `0 0 0 2px ${app.accent}, 0 0 0 ${k === pin ? 8 : 0}px ${app.accent}33`,
                  }}
                >
                  {k + 1}
                </button>
              ))}
            </StudioPhone>
            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: ink(0.4) }}>
              {app.name} · {screen.chapter}
            </p>
          </div>

          <ol className="space-y-3">
            {item.pins.map((p, k) => {
              const active = k === pin;
              return (
                <li key={k}>
                  <button
                    type="button"
                    onClick={() => setPin(k)}
                    aria-expanded={active}
                    className="flex w-full gap-5 rounded-xl border p-5 text-left transition-colors"
                    style={{ borderColor: active ? `${app.accent}66` : ink(0.08), background: active ? `${app.accent}10` : 'transparent' }}
                  >
                    <span className="font-display text-3xl font-bold italic leading-none" style={{ color: active ? app.accent : ink(0.3) }}>
                      {k + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-xl italic text-white">{p.title}</span>
                      {active ? (
                        <>
                          <span className="mt-2 block text-[15px] font-light leading-relaxed" style={{ color: ink(0.72) }}>
                            {p.note}
                          </span>
                          {p.source ? (
                            <span className="mt-3 inline-block rounded-full px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.16em]" style={{ background: 'rgba(201,148,58,0.12)', color: GOLD }}>
                              From the {p.source}
                            </span>
                          ) : null}
                        </>
                      ) : null}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
