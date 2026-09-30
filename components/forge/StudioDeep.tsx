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
 *   On the page they are laid out as a magazine contents spread: one lead
 *   story large, the other four as a column beside it.
 * - **Anatomy** answers the second. One screen, read closely. The active part
 *   is lit and the rest of the screen dims; the numbered pins sit on the edge
 *   of the phone on leader lines, so they never cover the words they explain.
 *   Where a build journal records the reason, the note says which one.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, X } from 'lucide-react';
import { track } from '@/lib/analytics';
import { ANATOMY, APP_BY_KEY, JOURNEYS, SCREEN_BY_ID, type Journey } from '@/lib/data/app-screens';
import StudioPhone from './StudioPhone';
import { FadeUp, GOLD, GOLD_INK, ink } from './ForgeChrome';
import Stock from '@/components/ui/Stock';

const STEP_MS = 6500;

// ─────────────────────────────────────────────────────────────────────────────
// Journeys
// ─────────────────────────────────────────────────────────────────────────────

export function Journeys() {
  const [open, setOpen] = useState<Journey | null>(null);
  const play = (j: Journey) => {
    setOpen(j);
    track('forge_studio_open', { app: j.app, chapter: `journey:${j.slug}` });
  };
  const [lead, ...rest] = JOURNEYS;
  const leadApp = APP_BY_KEY[lead.app];

  return (
    <Stock paper="navy" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <FadeUp>
            <p className="kicker t-gold">Journeys</p>
            <h2 className="display-l mt-4 max-w-2xl font-display italic t-head">Watch it being used.</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="max-w-xs font-display text-lg italic leading-relaxed t-ink md:text-right">
              Five real flows, played screen by screen in the order a person moves through them.
            </p>
          </FadeUp>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* The lead story */}
          <FadeUp className="lg:col-span-7">
            <button type="button" onClick={() => play(lead)} className="group block w-full text-left">
              <div className="shape-arch-soft relative flex h-[420px] items-end justify-center overflow-hidden md:h-[520px]" style={{ background: leadApp.paper }}>
                <div aria-hidden className="absolute inset-0" style={{ background: `radial-gradient(70% 60% at 50% 70%, ${leadApp.accent}33, transparent 70%)` }} />
                {[2, 0, 1].map((k, n) => {
                  const sc = SCREEN_BY_ID[lead.steps[k]?.id];
                  if (!sc) return null;
                  const pos = [
                    { x: '-78%', r: -8, s: 0.82, z: 1 },
                    { x: '-50%', r: 0, s: 1, z: 3 },
                    { x: '-22%', r: 8, s: 0.82, z: 2 },
                  ][n];
                  return (
                    <div
                      key={sc.id}
                      className="absolute bottom-[-12%] left-1/2 transition-transform duration-700 ease-out group-hover:-translate-y-4"
                      style={{ zIndex: pos.z, transform: `translateX(${pos.x}) rotate(${pos.r}deg) scale(${pos.s})`, transformOrigin: 'bottom center' }}
                    >
                      <StudioPhone screen={sc} width={220} accent={leadApp.accent} className="md:!w-[250px]" />
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="kicker" style={{ color: GOLD_INK }}>
                    The lead · {leadApp.name} · {lead.steps.length} screens
                  </p>
                  <h3 className="mt-3 font-display text-4xl italic leading-tight t-head md:text-5xl">{lead.title}</h3>
                  <p className="mt-3 max-w-lg text-[15px] font-light leading-relaxed t-ink">{lead.line}</p>
                </div>
                <span className="inline-flex items-center gap-2.5 self-start rounded-full px-6 py-3 font-mono text-[10.5px] uppercase tracking-[0.2em] transition-transform group-hover:-translate-y-0.5 md:self-end" style={{ background: 'rgb(var(--head-rgb))', color: 'var(--stock)' }}>
                  <Play className="h-3.5 w-3.5" style={{ color: GOLD }} /> Play the journey
                </span>
              </div>
            </button>
          </FadeUp>

          {/* The contents column */}
          <ol className="border-t lg:col-span-5 lg:mt-10" style={{ borderColor: 'var(--rule)' }}>
            {rest.map((j, k) => {
              const app = APP_BY_KEY[j.app];
              const first = SCREEN_BY_ID[j.steps[0].id];
              return (
                <li key={j.slug} className="border-b" style={{ borderColor: 'var(--rule)' }}>
                  <FadeUp delay={Math.min(k * 0.06, 0.24)}>
                    <button type="button" onClick={() => play(j)} className="group flex w-full items-center gap-6 py-6 text-left">
                      <span className="relative block w-[74px] shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-3deg]">
                        <StudioPhone screen={first} width={74} accent={app.accent} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="kicker block" style={{ color: GOLD_INK }}>
                          {String(k + 2).padStart(2, '0')} · {app.name}
                        </span>
                        <span className="mt-2 block font-display text-2xl italic leading-snug t-head transition-transform duration-500 group-hover:translate-x-1">{j.title}</span>
                        <span className="mt-1.5 block text-[14px] font-light leading-relaxed t-soft">{j.line}</span>
                      </span>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors group-hover:bg-[rgb(var(--head-rgb))] group-hover:text-[var(--stock)]" style={{ borderColor: 'var(--rule)', color: ink(0.7) }}>
                        <Play className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  </FadeUp>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <AnimatePresence>{open ? <StoryPlayer key={open.slug} journey={open} onClose={() => setOpen(null)} /> : null}</AnimatePresence>
    </Stock>
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

/** How far the numbered badges sit outside the phone, on their leader lines. */
const REACH = 22;

export function AnatomyRoom() {
  const [a, setA] = useState(0);
  const [pin, setPin] = useState(0);
  const item = ANATOMY[a];
  const screen = SCREEN_BY_ID[item.id];
  const app = APP_BY_KEY[screen.app];
  const active = item.pins[pin];

  const choose = (k: number) => {
    setA(k);
    setPin(0);
  };

  return (
    <Stock paper="cherry" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeUp>
          <p className="kicker t-gold">Anatomy</p>
          <h2 className="display-l mt-4 max-w-3xl font-display italic t-head">Read a screen closely.</h2>
          <p className="mt-5 max-w-2xl text-[15px] font-light leading-relaxed t-ink">
            Every screen is a stack of decisions. Choose a number and that part of the screen is lit. Where the reason is written in a build journal, the note
            says which.
          </p>
        </FadeUp>

        {/* the six screens: wrapped, never clipped */}
        <div role="tablist" aria-label="Screens to read" className="mt-10 flex flex-wrap gap-2">
          {ANATOMY.map((x, k) => {
            const sc = SCREEN_BY_ID[x.id];
            const ap = APP_BY_KEY[sc.app];
            const on = k === a;
            return (
              <button
                key={x.id}
                role="tab"
                aria-selected={on}
                type="button"
                onClick={() => choose(k)}
                className="rounded-full border px-4 py-2 text-left font-mono text-[10px] uppercase tracking-[0.16em] transition-colors"
                style={{ background: on ? 'rgb(var(--head-rgb))' : 'transparent', color: on ? 'var(--stock)' : ink(0.6), borderColor: on ? 'rgb(var(--head-rgb))' : 'var(--rule)' }}
              >
                <span style={{ color: on ? 'inherit' : GOLD_INK }}>{ap.name.split(' ')[0]}</span> · {x.title}
              </button>
            );
          })}
        </div>

        <div className="mt-14 grid items-start gap-14 md:grid-cols-[minmax(0,360px)_1fr] md:gap-20">
          <div className="mx-auto w-full max-w-[250px] md:sticky md:top-40 md:max-w-[290px]" style={{ marginRight: REACH + 30 }}>
            <div className="relative">
              <StudioPhone key={item.id} screen={screen} width={300} accent={app.accent} className="!w-full">
                {/* The spotlight: the screen dims except where the active pin is. */}
                <AnimatePresence>
                  {active ? (
                    <motion.span
                      key={`${item.id}-${pin}`}
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      style={{
                        background: 'rgba(7,11,28,0.6)',
                        WebkitMaskImage: `radial-gradient(ellipse 34% 15% at ${active.x}% ${active.y}%, transparent 55%, black 100%)`,
                        maskImage: `radial-gradient(ellipse 34% 15% at ${active.x}% ${active.y}%, transparent 55%, black 100%)`,
                      }}
                    />
                  ) : null}
                </AnimatePresence>
                {item.pins.map((p, k) => (
                  <span
                    key={k}
                    aria-hidden
                    className="pointer-events-none absolute z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{ left: `${p.x}%`, top: `${p.y}%`, background: k === pin ? app.accent : '#F5F0E8', boxShadow: `0 0 0 2px ${k === pin ? '#0A1128' : app.accent}` }}
                  >
                    {k === pin ? <span className="absolute inset-0 animate-ping rounded-full" style={{ background: app.accent }} /> : null}
                  </span>
                ))}
              </StudioPhone>

              {/* Leader lines and badges live outside the screen's clip. The
                  padding matches the bezel (3.5% of width, and CSS resolves
                  vertical padding percentages against width too), so this box
                  is exactly the screen. */}
              <div className="pointer-events-none absolute inset-0" style={{ padding: '3.5%' }}>
                <div className="relative h-full w-full">
                  {item.pins.map((p, k) => {
                    const on = k === pin;
                    return (
                      <div key={k} className="absolute" style={{ top: `${p.y}%`, left: `${p.x}%`, right: -REACH }}>
                        <span className="absolute left-0 right-0 top-0 h-px transition-colors" style={{ background: on ? 'rgb(var(--head-rgb))' : ink(0.22) }} />
                        <button
                          type="button"
                          onClick={() => setPin(k)}
                          aria-label={`${k + 1}: ${p.title}`}
                          aria-pressed={on}
                          className="pointer-events-auto absolute right-0 top-0 flex h-7 w-7 -translate-y-1/2 translate-x-full items-center justify-center rounded-full font-mono text-[11px] font-bold transition-all"
                          style={{ background: on ? '#0A1128' : '#FBF8F2', color: on ? '#F5F0E8' : '#0A1128', boxShadow: on ? `0 0 0 3px ${app.accent}` : '0 0 0 1px rgba(10,17,40,0.25)' }}
                        >
                          {k + 1}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <p className="kicker mt-5 text-center t-soft">
              {app.name} · {screen.chapter}
            </p>
          </div>

          <ol className="border-t" style={{ borderColor: 'var(--rule)' }}>
            {item.pins.map((p, k) => {
              const on = k === pin;
              return (
                <li key={k} className="border-b" style={{ borderColor: 'var(--rule)' }}>
                  <button type="button" onClick={() => setPin(k)} onMouseEnter={() => setPin(k)} onFocus={() => setPin(k)} aria-expanded={on} className="flex w-full gap-6 py-6 text-left">
                    <span className="w-8 shrink-0 font-display text-4xl font-bold italic leading-none transition-colors" style={{ color: on ? GOLD_INK : ink(0.22) }}>
                      {k + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-2xl italic leading-snug t-head">{p.title}</span>
                      <AnimatePresence initial={false}>
                        {on ? (
                          <motion.span
                            className="block overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          >
                            <span className="mt-3 block max-w-xl text-[15px] font-light leading-relaxed t-ink">{p.note}</span>
                            {p.source ? (
                              <span className="kicker mt-4 inline-block rounded-full px-3 py-1.5" style={{ background: 'rgba(201,148,58,0.14)', color: GOLD_INK }}>
                                From the {p.source}
                              </span>
                            ) : null}
                          </motion.span>
                        ) : null}
                      </AnimatePresence>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Stock>
  );
}
