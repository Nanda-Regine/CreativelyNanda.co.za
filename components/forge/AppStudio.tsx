'use client';

/**
 * 📱 The App Studio — /forge/studio
 *
 * A hundred real screens from three live products, hung like a studio shows
 * its work. The Revolution Plan filed this as the Screening Room, "when the
 * recordings land" (§19.2). The screenshots landed first, and there are enough
 * of them that the problem became the opposite one: how do you show a hundred
 * screens without making a hundred-screen scroll?
 *
 * ── THREE DISTANCES ───────────────────────────────────────────────────────────
 * 1. **The fan.** Three phones in the masthead, one per product. They spread
 *    when you reach for them and lean toward the pointer.
 * 2. **The screening.** Choose a product and its screens play as filmstrips,
 *    one per chapter. Each chapter opens on a larger lead screen, so the rhythm
 *    changes every row instead of repeating one phone size a hundred times.
 * 3. **The wall.** One switch turns the product into a contact sheet.
 * Any phone on the floor opens **the stage**, and it is the same phone: it
 * lifts out of the strip and grows into the stage (a shared-element transition,
 * Framer Motion `layoutId`), then settles back into its slot when you close.
 *
 * ── PAPER ─────────────────────────────────────────────────────────────────────
 * Navy is the masthead and the stage, nothing else. The page is house
 * parchment, and each product prints on its own tint of it (`paper` in
 * lib/data/app-screens.ts), so you can tell whose room you are in. Phones are
 * dark objects; on paper they read like product photography.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { AnimatePresence, LayoutGroup, MotionConfig, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, X, LayoutGrid, Film } from 'lucide-react';
import { track, trackOutbound } from '@/lib/analytics';
import { STUDIO_APPS, SCREENS, APP_BY_KEY, chaptersOf, type AppKey, type Screen, type StudioApp } from '@/lib/data/app-screens';
import StudioPhone, { screenSrc } from './StudioPhone';
import { Journeys, AnatomyRoom } from './StudioDeep';
import { FadeUp, GOLD, GOLD_INK, EASE, Doors, ink } from './ForgeChrome';
import Stock, { rhythm } from '@/components/ui/Stock';

const FLY = { duration: 0.62, ease: EASE };

/** The CSS variables that re-tint the house parchment for one product. */
function paperVars(app: StudioApp): React.CSSProperties {
  return {
    ['--stock' as string]: app.paper,
    ['--veil' as string]: `linear-gradient(180deg, ${app.paper}EB, ${app.paper}F5)`,
    ['--gold-ink' as string]: app.accentInk,
    ['--numeral' as string]: app.accentInk,
    transition: 'background-color 700ms ease',
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// The fan
// ─────────────────────────────────────────────────────────────────────────────

function Fan({ onChoose }: { onChoose: (k: AppKey) => void }) {
  const reduce = useReducedMotion();
  const [spread, setSpread] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 });

  const covers = STUDIO_APPS.map((a) => ({ app: a, screen: SCREENS.find((s) => s.app === a.key && s.id === a.cover)! }));
  const slots = spread
    ? [
        { x: '-62%', r: -13, z: 1, s: 0.9 },
        { x: '0%', r: 0, z: 3, s: 1.02 },
        { x: '62%', r: 13, z: 2, s: 0.9 },
      ]
    : [
        { x: '-34%', r: -8, z: 1, s: 0.86 },
        { x: '0%', r: 0, z: 3, s: 1 },
        { x: '34%', r: 8, z: 2, s: 0.86 },
      ];

  return (
    <div
      className="relative mx-auto flex h-[420px] w-full max-w-[560px] items-center justify-center md:h-[560px]"
      style={{ perspective: 1400 }}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setSpread(true)}
      onPointerLeave={() => {
        setSpread(false);
        mx.set(0);
        my.set(0);
      }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse') return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
    >
      <motion.div className="relative flex h-full w-full items-center justify-center" style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry, transformStyle: 'preserve-3d' }}>
        {covers.map(({ app: a, screen }, i) => {
          const pos = slots[i];
          return (
            <motion.button
              key={a.key}
              type="button"
              onClick={() => onChoose(a.key)}
              aria-label={`Open ${a.name}`}
              className="group absolute outline-none"
              animate={{ x: pos.x, rotate: pos.r, scale: pos.s }}
              transition={{ type: 'spring', stiffness: 140, damping: 20 }}
              style={{ zIndex: pos.z }}
            >
              <StudioPhone screen={screen} width={210} accent={a.accent} eager className="transition-transform duration-500 group-hover:-translate-y-3 md:!w-[240px]" />
              <span className="mt-4 block text-center font-mono text-[10px] uppercase tracking-[0.26em] transition-opacity" style={{ color: a.accent, opacity: spread ? 1 : 0.75 }}>
                {a.name}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// The floor
// ─────────────────────────────────────────────────────────────────────────────

function FloorPhone({ sc, app, lead, hidden, onOpen, width }: { sc: Screen; app: StudioApp; lead?: boolean; hidden: boolean; onOpen: (s: Screen) => void; width: number }) {
  return (
    <button type="button" onClick={() => onOpen(sc)} className="group block rounded-[2rem] outline-none focus-visible:ring-2" style={{ ['--tw-ring-color' as string]: app.accentInk }} aria-label={`Open: ${sc.caption}`}>
      <motion.div layoutId={`floor-${sc.id}`} transition={FLY} style={{ opacity: hidden ? 0 : 1 }}>
        <StudioPhone
          screen={sc}
          width={width}
          accent={app.accent}
          className={`transition-transform duration-500 group-hover:-translate-y-2 ${lead ? 'w-[210px] md:w-[258px]' : 'w-[168px] md:w-[196px]'}`}
          style={{ width: undefined }}
        />
      </motion.div>
    </button>
  );
}

/** The column edge, so strips start where the text starts and bleed off to the right only. */
const COLUMN = 'max(1.5rem, calc((100vw - 72rem) / 2 + 1.5rem))';

function Filmstrip({ screens, app, hiddenId, onOpen }: { screens: Screen[]; app: StudioApp; hiddenId: string | null; onOpen: (s: Screen) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const nudge = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.7, behavior: 'smooth' });
  return (
    <div className="relative">
      <div
        ref={ref}
        className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex snap-x snap-mandatory items-end gap-6 overflow-x-auto pb-6 pr-6 pt-3 md:gap-8"
        // Snap aligns to the scrollport edge unless told otherwise, which is
        // why the first phone used to sit at x = 0 while the heading sat on
        // the column. scroll-padding moves the snap line onto the column.
        style={{ paddingLeft: COLUMN, scrollPaddingLeft: COLUMN }}
      >
        {screens.map((sc, i) => (
          <figure key={sc.id} className={`shrink-0 snap-start ${i === 0 ? 'w-[210px] md:w-[258px]' : 'w-[168px] md:w-[196px]'}`}>
            <FloorPhone sc={sc} app={app} lead={i === 0} hidden={hiddenId === sc.id} onOpen={onOpen} width={i === 0 ? 258 : 196} />
            <figcaption className={`mt-4 font-light leading-relaxed ${i === 0 ? 'font-display text-[17px] italic' : 'text-[13px]'}`} style={{ color: ink(i === 0 ? 0.82 : 0.62) }}>
              {sc.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      {screens.length > 3 ? (
        <div className="pointer-events-none absolute -top-[4.25rem] hidden gap-2 md:flex" style={{ right: 'max(1.5rem, calc((100vw - 72rem) / 2 + 1.5rem))' }}>
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => nudge(d)}
              aria-label={d < 0 ? 'Scroll back' : 'Scroll forward'}
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border transition-colors hover:bg-black/5"
              style={{ borderColor: 'var(--rule)', color: ink(0.75) }}
            >
              {d < 0 ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// The stage
// ─────────────────────────────────────────────────────────────────────────────

function Stage({ screens, index, openerId, onClose, onGo }: { screens: Screen[]; index: number; openerId: string; onClose: () => void; onGo: (i: number) => void }) {
  const sc = screens[index];
  const app = APP_BY_KEY[sc.app];
  const closeRef = useRef<HTMLButtonElement>(null);
  const thumbs = useRef<HTMLDivElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onGo(Math.min(screens.length - 1, index + 1));
      if (e.key === 'ArrowLeft') onGo(Math.max(0, index - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, screens.length, onClose, onGo]);

  useEffect(() => {
    thumbs.current?.querySelector<HTMLElement>(`[data-i="${index}"]`)?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [index]);

  if (typeof document === 'undefined') return null;
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={`${app.name}: ${sc.caption}`} className="fixed inset-0 z-[80] flex flex-col">
      <motion.div
        aria-hidden
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{ background: `radial-gradient(60% 50% at 50% 42%, ${app.accent}26, transparent 70%), #070b1c` }}
      />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="relative z-10 flex items-center justify-between px-5 py-4">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.24em]" style={{ color: 'rgba(245,240,232,0.55)' }}>
          <span style={{ color: app.accent }}>{app.name}</span> · {sc.chapter} · {index + 1} / {screens.length}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="flex h-10 w-10 items-center justify-center rounded-full border text-[#F5F0E8] hover:bg-white/5" style={{ borderColor: 'rgba(245,240,232,0.2)' }}>
          <X className="h-4 w-4" />
        </button>
      </motion.div>

      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center gap-4 px-3 md:gap-12">
        <button type="button" onClick={() => onGo(index - 1)} disabled={index === 0} aria-label="Previous screen" className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border text-[#F5F0E8] disabled:opacity-20 sm:flex" style={{ borderColor: 'rgba(245,240,232,0.2)' }}>
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex h-full min-h-0 flex-col items-center justify-center md:flex-row md:gap-14">
          <div className="flex h-full min-h-0 items-center" style={{ maxHeight: 'min(74vh, 780px)' }}>
            {/* The same phone that was tapped: it flies here from its slot on the floor. */}
            <motion.div layoutId={`floor-${openerId}`} transition={FLY} className="h-full" style={{ aspectRatio: '9.9 / 21.1' }}>
              <StudioPhone key={sc.id} screen={sc} width={340} accent={app.accent} eager className="h-full w-auto" style={{ width: 'auto', height: '100%', aspectRatio: '9.9 / 21.1' }} />
            </motion.div>
          </div>
          <motion.div key={sc.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="mt-5 max-w-xs text-center md:mt-0 md:text-left">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: app.accent }}>
              {sc.chapter}
            </p>
            <p className="mt-3 font-display text-xl italic leading-snug text-[#F5F0E8] md:text-3xl">{sc.caption}</p>
            <div className="mt-6 hidden flex-col gap-3 md:flex">
              <a href={app.live} target="_blank" rel="noopener noreferrer" onClick={trackOutbound(app.live, 'forge_live_app_click', { app: app.key, from: 'studio-stage' })} className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] underline decoration-dotted underline-offset-4" style={{ color: GOLD }}>
                Open the live app <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        </div>

        <button type="button" onClick={() => onGo(index + 1)} disabled={index === screens.length - 1} aria-label="Next screen" className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border text-[#F5F0E8] disabled:opacity-20 sm:flex" style={{ borderColor: 'rgba(245,240,232,0.2)' }}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <motion.div ref={thumbs} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden relative z-10 flex gap-2 overflow-x-auto px-5 py-4">
        {screens.map((t, i) => (
          <button
            key={t.id}
            data-i={i}
            type="button"
            onClick={() => onGo(i)}
            aria-label={`Screen ${i + 1}: ${t.caption}`}
            aria-current={i === index}
            className="shrink-0 overflow-hidden rounded-md transition-opacity"
            style={{ width: 38, aspectRatio: '9 / 20', opacity: i === index ? 1 : 0.45, boxShadow: i === index ? `0 0 0 2px ${app.accent}` : 'none' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={screenSrc(t, 80)} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
          </button>
        ))}
      </motion.div>
    </div>,
    document.body
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function AppStudio({ figures }: { figures: { value: string; label: string }[] }) {
  const [appKey, setAppKey] = useState<AppKey>('varsityos');
  const [mode, setMode] = useState<'screening' | 'wall'>('screening');
  const [open, setOpen] = useState<{ index: number; opener: string } | null>(null);
  const app = APP_BY_KEY[appKey];
  const screens = useMemo(() => SCREENS.filter((s) => s.app === appKey), [appKey]);
  const chapters = useMemo(() => chaptersOf(appKey), [appKey]);

  const openScreen = useCallback(
    (sc: Screen) => {
      const i = screens.findIndex((x) => x.id === sc.id);
      setOpen({ index: i, opener: sc.id });
      track('forge_studio_open', { app: sc.app, chapter: sc.chapter });
    },
    [screens]
  );
  const go = useCallback((i: number) => setOpen((o) => (o ? { ...o, index: Math.max(0, Math.min(screens.length - 1, i)) } : o)), [screens.length]);

  const choose = (k: AppKey) => {
    setAppKey(k);
    setOpen(null);
    track('forge_studio_app', { app: k });
    document.getElementById('studio-floor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <main className="stock-parchment min-h-screen overflow-x-clip">
        {/* ═══ MASTHEAD: the one navy band, and the fan ═══════════════════════ */}
        <Stock paper="navy" as="header" className="-mt-20 px-6 pb-20 pt-32 md:pb-24 md:pt-40">
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(60% 60% at 78% 45%, ${GOLD}26, transparent 65%), radial-gradient(40% 40% at 10% 100%, #C21E5626, transparent 70%)` }} />
          <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <FadeUp>
                <Link href="/forge" className="kicker inline-flex items-center gap-2 transition-opacity hover:opacity-70" style={{ color: GOLD_INK }}>
                  <ChevronLeft className="h-3 w-3" /> The Forge
                </Link>
              </FadeUp>
              <FadeUp delay={0.08}>
                <h1 className="display-xxl mt-6 font-display font-bold italic t-head">
                  The App
                  <br />
                  <span className="pl-[0.6em]">Studio</span>
                </h1>
              </FadeUp>
              <FadeUp delay={0.16}>
                <p className="mt-7 max-w-md font-display text-xl italic leading-relaxed t-ink md:text-2xl">A hundred real screens from three live products. Pick one up.</p>
              </FadeUp>
              <FadeUp delay={0.24}>
                {/* The index: the three products, as a contents list rather than buttons. */}
                <ol className="mt-10 max-w-md border-t" style={{ borderColor: 'var(--rule)' }}>
                  {STUDIO_APPS.map((a, i) => (
                    <li key={a.key} className="border-b" style={{ borderColor: 'var(--rule)' }}>
                      <button type="button" onClick={() => choose(a.key)} className="group flex w-full items-baseline gap-5 py-3.5 text-left">
                        <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: a.accent }}>
                          0{i + 1}
                        </span>
                        <span className="flex-1 font-display text-2xl italic t-head transition-transform duration-500 group-hover:translate-x-1.5">{a.name}</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] t-soft">{SCREENS.filter((s) => s.app === a.key).length} screens</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </FadeUp>
            </div>
            <FadeUp delay={0.2}>
              <Fan onChoose={choose} />
            </FadeUp>
          </div>
        </Stock>

        {/* ═══ THE LEDGER: measured, then a note in the margin ═══════════════ */}
        <Stock paper="parchment" edge="slant-r" className="px-6 pb-4">
          <div className="mx-auto grid max-w-6xl gap-10 pt-16 md:grid-cols-[1.4fr_1fr] md:items-end md:pt-20">
            <dl className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4">
              {figures.map((f) => (
                <div key={f.label} className="sd-rise">
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="font-display text-5xl font-bold italic md:text-6xl" style={{ color: GOLD_INK }}>
                    {f.value}
                  </dd>
                  <p aria-hidden className="kicker mt-2 t-soft">
                    {f.label}
                  </p>
                </div>
              ))}
            </dl>
            <p className="border-l-2 pl-5 font-display text-lg italic leading-relaxed t-ink" style={{ borderColor: GOLD }}>
              Shot on a phone, in a browser, on one afternoon in August. Nothing here is a mock-up.
            </p>
          </div>
        </Stock>

        {/* ═══ WHAT IT IS LIKE TO USE, AND WHY IT IS LIKE THAT ════════════════ */}
        <Journeys />
        <AnatomyRoom />

        {/* ═══ THE FLOOR ══════════════════════════════════════════════════════ */}
        <LayoutGroup>
          <Stock paper="parchment" className="pb-10" style={paperVars(app)}>
            <div className="mx-auto max-w-6xl px-6 pt-24 md:pt-32">
              <p className="kicker t-gold">The floor</p>
              <h2 className="display-l mt-4 max-w-3xl font-display italic t-head">Every screen, by chapter.</h2>
            </div>

            {/* the switcher */}
            <div id="studio-floor" className="sticky top-16 z-30 mt-10 scroll-mt-16 border-y backdrop-blur-md md:top-20" style={{ borderColor: 'var(--rule)', background: `${app.paper}E6` }}>
              <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3">
                <div role="tablist" aria-label="Product" className="flex gap-1 overflow-x-auto">
                  {STUDIO_APPS.map((a) => {
                    const active = a.key === appKey;
                    const n = SCREENS.filter((s) => s.app === a.key).length;
                    return (
                      <button
                        key={a.key}
                        role="tab"
                        aria-selected={active}
                        type="button"
                        onClick={() => choose(a.key)}
                        className="whitespace-nowrap rounded-full px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.18em] transition-colors"
                        style={{ background: active ? '#0A1128' : 'transparent', color: active ? '#F5F0E8' : ink(0.6) }}
                      >
                        {a.name} <span style={{ opacity: 0.6 }}>{n}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-1 rounded-full p-1" style={{ background: 'rgba(10,17,40,0.06)' }}>
                  {(
                    [
                      ['screening', 'Screening', Film],
                      ['wall', 'The wall', LayoutGrid],
                    ] as const
                  ).map(([m, label, Icon]) => (
                    <button
                      key={m}
                      type="button"
                      aria-pressed={mode === m}
                      onClick={() => setMode(m)}
                      className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors"
                      style={{ background: mode === m ? '#FBF8F2' : 'transparent', color: mode === m ? '#0A1128' : ink(0.55), boxShadow: mode === m ? '0 1px 3px rgba(10,17,40,0.12)' : 'none' }}
                    >
                      <Icon className="h-3.5 w-3.5" /> {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* the product */}
            <div className="mx-auto max-w-6xl px-6 pt-16 md:pt-20">
              <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="kicker t-gold">
                    {screens.length} screens · {chapters.length} {chapters.length === 1 ? 'chapter' : 'chapters'}
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.h2 key={app.key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45, ease: EASE }} className="display-xl mt-3 font-display font-bold italic t-head">
                      {app.name}
                    </motion.h2>
                  </AnimatePresence>
                  <p className="mt-5 max-w-2xl font-display text-lg italic leading-relaxed t-ink md:text-xl">{app.line}</p>
                </div>
                <div className="flex flex-wrap gap-3 md:flex-col md:items-end">
                  <a
                    href={app.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={trackOutbound(app.live, 'forge_live_app_click', { app: app.key, from: 'studio' })}
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#F5F0E8] transition-transform hover:-translate-y-0.5"
                    style={{ background: '#0A1128' }}
                  >
                    Open the live app <ArrowUpRight className="h-3.5 w-3.5" style={{ color: app.accent }} />
                  </a>
                  <Link href={`/forge/floor/${app.dossier}`} className="kicker inline-flex items-center gap-2 underline decoration-dotted underline-offset-4 t-gold">
                    How it was built <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {mode === 'screening' ? (
              <div className="mt-16">
                {/* Each chapter on its own band, navy / cherry / beige in turn (the balance rule). */}
                {chapters.map((c, ci) => {
                  const cs = screens.filter((s) => s.chapter === c);
                  return (
                    <Stock as="div" key={`${appKey}-${c}`} paper={rhythm(ci, 1)} className="py-14 md:py-16" style={rhythm(ci, 1) === 'parchment' ? paperVars(app) : { ['--numeral' as string]: 'var(--gold-ink)' }}>
                      <div className="mx-auto mb-7 flex max-w-6xl items-end gap-5 px-6">
                        <span className="numeral-outline font-display text-6xl font-bold italic leading-[0.8] md:text-7xl">{String(ci + 1).padStart(2, '0')}</span>
                        <div className="pb-1">
                          <h3 className="font-display text-3xl italic leading-none t-head md:text-4xl">{c}</h3>
                          <span className="kicker mt-2 block t-soft">
                            {cs.length} {cs.length === 1 ? 'screen' : 'screens'}
                          </span>
                        </div>
                      </div>
                      <Filmstrip screens={cs} app={app} hiddenId={open ? open.opener : null} onOpen={openScreen} />
                    </Stock>
                  );
                })}
              </div>
            ) : (
              <div className="mx-auto mt-16 max-w-6xl px-6">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(92px,1fr))] gap-x-4 gap-y-6 md:grid-cols-[repeat(auto-fill,minmax(118px,1fr))]">
                  {screens.map((sc) => (
                    <button key={sc.id} type="button" onClick={() => openScreen(sc)} aria-label={`Open: ${sc.caption}`} className="group block">
                      <motion.div layoutId={`floor-${sc.id}`} transition={FLY} style={{ opacity: open?.opener === sc.id ? 0 : 1 }}>
                        <StudioPhone screen={sc} width={130} className="!w-full transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:scale-[1.03]" style={{ width: '100%' }} />
                      </motion.div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mx-auto mt-20 max-w-6xl px-6">
              <aside className="ml-auto max-w-xl border-l-2 pl-6" style={{ borderColor: GOLD }}>
                <p className="kicker t-soft">On what you are looking at</p>
                <p className="mt-3 text-[15px] font-light leading-[1.85] t-ink">
                  These are screenshots, not designs. The VarsityOS screens come from my own student account, so the budget, the burnout score and the overdue
                  tasks are real, and so is the week they describe. The Feedback button in the corner of most screens is the real one too. Every product
                  here is live, and the button above each one opens it.
                </p>
              </aside>
            </div>
          </Stock>

          <AnimatePresence>
            {open !== null ? (
              <Stage
                key="stage"
                screens={screens}
                index={open.index}
                // The stage phone keeps the id of the phone you tapped, so on close it
                // flies back to that slot, wherever you have browsed to since.
                openerId={open.opener}
                onClose={() => setOpen(null)}
                onGo={go}
              />
            ) : null}
          </AnimatePresence>
        </LayoutGroup>

        <Doors
          doors={[
            { href: '/forge/floor', label: 'The Workshop Floor', line: 'The dossier behind each of these builds.' },
            { href: '/forge/scars', label: 'The Scar Room', line: 'What broke while they were being made.' },
            { href: '/forge', label: 'The Forge', line: 'Back to the threshold.' },
          ]}
        />
      </main>
    </MotionConfig>
  );
}
