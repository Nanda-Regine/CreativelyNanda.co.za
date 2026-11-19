'use client';

/**
 * One product's floor: /forge/studio/[app].
 *
 * Laid out as a magazine issue, not a gallery. A masthead with the product's
 * own paper tint and "the bench" (a desk screen with two phones overlapping
 * it), a sticky chapter index, chapters that alternate between a lead screen
 * with marginalia and a contact strip, and a light-table stage that every
 * screen, phone or desk, flies into (Framer Motion layoutId).
 *
 * Data arrives already resolved on the server (lib/data/studio-floor.ts), so
 * this route's JS carries only this product's screens. Bands rotate navy,
 * cherry and parchment; the product's accent appears only on hairlines,
 * counters and the stamp. Reduced motion: MotionConfig strips every transform.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { track, trackOutbound } from '@/lib/analytics';
import type { Floor, FloorApp, FloorChapter, Shot, DeskShot, PhoneShot } from '@/lib/data/studio-floor';
import StudioPhone, { screenSrc } from '@/components/forge/StudioPhone';
import DeskView from '@/components/forge/evidence/DeskView';
import Stock, { rhythm } from '@/components/ui/Stock';
import { EASE, GOLD, ink } from '@/components/forge/ForgeChrome';
import Reel, { type ReelData } from './Reel';
import { screenUrl } from '@/lib/data/evidence/media';

const FLY = { duration: 0.62, ease: EASE };
const STAMP: Record<FloorApp['relationship'], string> = {
  own: 'Own product',
  client: 'Client platform',
  'co-founded': 'Co-founded',
  internal: 'Internal',
  venture: 'Venture',
};

export interface NextDoor {
  key: string;
  name: string;
  paper: string;
  accentInk: string;
  shot: Shot;
  host: string;
}

function paperVars(app: FloorApp): React.CSSProperties {
  return {
    ['--stock' as string]: app.paper,
    ['--veil' as string]: `linear-gradient(180deg, ${app.paper}EB, ${app.paper}F5)`,
    ['--gold-ink' as string]: app.accentInk,
  };
}

const pad = (n: number) => String(n).padStart(2, '0');
const phoneOf = (s: PhoneShot): PhoneShot => s;
const deskEntry = (s: DeskShot) => ({ w: s.w, h: s.h, widths: s.widths, avif: s.avif, color: s.color, blur: s.blur });

// ─────────────────────────────────────────────────────────────────────────────
// A shot, phone or desk
// ─────────────────────────────────────────────────────────────────────────────

function ShotView({ shot, app, lead, priority = false, zoomable = false, phoneClass }: { shot: Shot; app: FloorApp; lead?: boolean; priority?: boolean; zoomable?: boolean; phoneClass?: string }) {
  if (shot.kind === 'phone') {
    return (
      <StudioPhone
        screen={phoneOf(shot)}
        width={lead ? 258 : 190}
        accent={app.accent}
        eager={priority}
        className={phoneClass ?? (lead ? 'w-[210px] md:w-[258px]' : 'w-[150px] md:w-[180px]')}
        style={{ width: undefined }}
      />
    );
  }
  return <DeskView id={shot.id} entry={deskEntry(shot)} alt={shot.alt} caption={shot.caption} path={app.host} priority={priority} zoomable={zoomable} sizes={lead ? '(min-width: 768px) 58vw, 100vw' : '(min-width: 768px) 400px, 78vw'} />;
}

function Settle({ children, i = 0, className = '' }: { children: React.ReactNode; i?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ y: 24, rotate: 1.5 }}
      whileInView={{ y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, ease: EASE, delay: Math.min(i, 6) * 0.06 }}
    >
      {children}
    </motion.div>
  );
}

function Tile({ shot, app, lead, hidden, onOpen, wide }: { shot: Shot; app: FloorApp; lead?: boolean; hidden: boolean; onOpen: (s: Shot, el: HTMLElement) => void; wide?: boolean }) {
  return (
    <button
      type="button"
      onClick={(e) => onOpen(shot, e.currentTarget)}
      aria-label={`Open: ${shot.caption}`}
      className={`group block rounded-[2.2rem] text-left outline-none focus-visible:ring-2 ${wide ? 'w-full' : ''}`}
      style={{ ['--tw-ring-color' as string]: 'var(--gold-ink)' }}
    >
      <motion.div layoutId={`floor-${shot.id}`} transition={FLY} style={{ opacity: hidden ? 0 : 1 }} className="transition-transform duration-500 motion-safe:group-hover:-translate-y-1">
        <ShotView shot={shot} app={app} lead={lead} />
      </motion.div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// A chapter: lead + marginalia, or contact strip
// ─────────────────────────────────────────────────────────────────────────────

function Marginalia({ n, chapter, shot, app, className = '' }: { n: number; chapter: FloorChapter; shot: Shot; app: FloorApp; className?: string }) {
  return (
    <aside className={className}>
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] t-gold">Ch. {pad(n)}</p>
      <span aria-hidden className="mt-3 block h-px w-14" style={{ background: GOLD }} />
      <p className="mt-4 font-display text-xl italic leading-snug t-head md:text-2xl">{shot.caption}</p>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] t-soft">
        {chapter.shots.length} {chapter.shots.length === 1 ? 'screen' : 'screens'} · {chapter.device === 'desk' ? 'on the desk' : 'on the phone'}
      </p>
      <span className="sr-only">{app.name}</span>
    </aside>
  );
}

function Strip({ shots, app, hiddenId, onOpen, startAt = 0 }: { shots: Shot[]; app: FloorApp; hiddenId: string | null; onOpen: (s: Shot, el: HTMLElement) => void; startAt?: number }) {
  return (
    <ul className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden m-0 flex snap-x snap-mandatory items-end gap-5 overflow-x-auto p-0 pb-4 pt-2 md:gap-7" role="list">
      {shots.map((s, i) => (
        <li key={s.id} className={`shrink-0 snap-start list-none ${s.kind === 'desk' ? 'w-[78vw] max-w-[420px] md:w-[400px]' : ''}`}>
          <Settle i={i + startAt}>
            <figure className="m-0">
              <Tile shot={s} app={app} hidden={hiddenId === s.id} onOpen={onOpen} wide={s.kind === 'desk'} />
              <figcaption className="mt-3 max-w-[16rem] text-[13px] font-light leading-relaxed t-ink">{s.caption}</figcaption>
            </figure>
          </Settle>
        </li>
      ))}
    </ul>
  );
}

function Chapter({ c, n, ci, app, hiddenId, onOpen }: { c: FloorChapter; n: number; ci: number; app: FloorApp; hiddenId: string | null; onOpen: (s: Shot, el: HTMLElement) => void }) {
  const paper = rhythm(ci, 1);
  const lead = c.shots[0];
  const rest = c.shots.slice(1);
  const asStrip = ci % 2 === 1 && c.shots.length > 1;
  const stage = { ['--numeral' as string]: paper === 'parchment' ? app.accentInk : app.accent } as React.CSSProperties;
  return (
    <Stock as="div" paper={paper} className="py-14 md:py-20" style={paper === 'parchment' ? { ...paperVars(app), ...stage } : stage}>
      <div id={`ch-${c.id}`} className="mx-auto max-w-6xl scroll-mt-36 px-6">
        <div className="mb-8 flex items-end gap-5">
          <span className="numeral-outline font-display text-6xl font-bold italic leading-[0.8] md:text-7xl">{pad(n)}</span>
          <div className="pb-1">
            <h3 className="font-display text-3xl italic leading-none t-head md:text-4xl">{c.name}</h3>
            <span aria-hidden className="mt-3 block h-px w-24" style={{ background: app.accent }} />
          </div>
        </div>

        {asStrip ? (
          <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-6">
            <Marginalia n={n} chapter={c} shot={lead} app={app} className="md:col-span-5 md:pr-8" />
            <div className="-mr-6 md:col-span-7 md:mr-0">
              <Strip shots={c.shots} app={app} hiddenId={hiddenId} onOpen={onOpen} />
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-6">
              <div className={`md:col-span-7 ${lead.kind === 'phone' ? 'flex justify-center md:justify-start' : ''}`}>
                <Settle>
                  <Tile shot={lead} app={app} lead hidden={hiddenId === lead.id} onOpen={onOpen} wide={lead.kind === 'desk'} />
                </Settle>
              </div>
              <Marginalia n={n} chapter={c} shot={lead} app={app} className="md:col-span-4 md:col-start-9 md:pb-8" />
            </div>
            {rest.length ? (
              <div className="-mr-6 mt-10 md:mr-0">
                <Strip shots={rest} app={app} hiddenId={hiddenId} onOpen={onOpen} startAt={1} />
              </div>
            ) : null}
          </>
        )}
      </div>
    </Stock>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// The light table
// ─────────────────────────────────────────────────────────────────────────────

function Stage({ shots, app, index, openerId, onClose, onGo }: { shots: Shot[]; app: FloorApp; index: number; openerId: string; onClose: () => void; onGo: (i: number) => void }) {
  const sc = shots[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const touch = useRef<number | null>(null);

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
      if (e.key === 'ArrowRight') onGo(Math.min(shots.length - 1, index + 1));
      if (e.key === 'ArrowLeft') onGo(Math.max(0, index - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, shots.length, onClose, onGo]);

  if (typeof document === 'undefined') return null;
  const navBtn = 'flex h-11 w-11 items-center justify-center rounded-full border text-[#F5F0E8] hover:bg-white/5 disabled:opacity-25';
  const edge = { borderColor: 'rgba(245,240,232,0.25)' };
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${app.name}: ${sc.caption}`}
      className="fixed inset-0 z-[80] flex flex-col"
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null || sc.kind === 'desk') return;
        const dx = e.changedTouches[0].clientX - touch.current;
        touch.current = null;
        if (Math.abs(dx) > 50) onGo(index + (dx < 0 ? 1 : -1));
      }}
    >
      <motion.div aria-hidden className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ background: `radial-gradient(60% 50% at 50% 42%, ${app.accent}22, transparent 70%), #070b1c` }} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 flex items-center justify-between px-4 py-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: 'rgba(245,240,232,0.7)' }}>
          {app.name} · {sc.chapter}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className={navBtn} style={edge}>
          <X className="h-4 w-4" />
        </button>
      </motion.div>

      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-4">
        {sc.kind === 'phone' ? (
          <motion.div layoutId={`floor-${openerId}`} transition={FLY} style={{ height: '100%', maxHeight: 'min(70vh, 780px)', aspectRatio: '9.9 / 21.1', maxWidth: '100%' }}>
            <StudioPhone key={sc.id} screen={phoneOf(sc)} width={340} accent={app.accent} eager className="h-full w-auto" style={{ width: 'auto', height: '100%', aspectRatio: '9.9 / 21.1' }} />
          </motion.div>
        ) : (
          <motion.div layoutId={`floor-${openerId}`} transition={FLY} className="w-full max-w-[1100px]">
            <DeskView key={sc.id} id={sc.id} entry={deskEntry(sc)} alt={sc.alt} caption={sc.caption} path={app.host} priority zoomable sizes="(min-width: 1100px) 1100px, 100vw" />
          </motion.div>
        )}
      </div>

      <motion.div key={sc.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35, delay: 0.1 }} className="relative z-10 mx-auto flex w-full max-w-3xl items-center gap-3 px-4 pb-4 pt-3">
        <button type="button" onClick={() => onGo(index - 1)} disabled={index === 0} aria-label="Previous screen" className={navBtn} style={edge}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="min-w-0 flex-1 text-center">
          <p className="font-display text-base italic leading-snug text-[#F5F0E8] md:text-xl">{sc.caption}</p>
          <p className="mt-1 font-mono text-[11px] tracking-[0.24em]" style={{ color: 'rgba(245,240,232,0.7)' }}>
            {pad(index + 1)} / {pad(shots.length)}
            {sc.kind === 'desk' ? <span className="sr-only"> Tap the screen to zoom in.</span> : null}
          </p>
        </div>
        <button type="button" onClick={() => onGo(index + 1)} disabled={index === shots.length - 1} aria-label="Next screen" className={navBtn} style={edge}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </motion.div>
    </div>,
    document.body
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// The floor
// ─────────────────────────────────────────────────────────────────────────────

function Bench({ floor }: { floor: Floor }) {
  const { app } = floor;
  const desk = floor.shots.find((s) => s.kind === 'desk');
  const phones = floor.shots.filter((s) => s.kind === 'phone').slice(0, desk ? 2 : 3);
  return (
    <div aria-hidden className="relative mx-auto mt-12 max-w-5xl md:mt-16" style={{ paddingBottom: phones.length && desk ? '5rem' : 0 }}>
      {desk ? (
        <div className="w-[90%] md:w-[80%]" style={{ transform: 'rotate(-1deg)' }}>
          <ShotView shot={desk} app={app} lead priority />
        </div>
      ) : (
        <div className="flex items-end justify-center">
          {phones.map((p, i) => (
            <div key={p.id} className={i ? '-ml-8' : ''} style={{ transform: `rotate(${(i - 1) * 2}deg) translateY(${i === 1 ? 0 : 18}px)` }}>
              <ShotView shot={p} app={app} priority={i === 0} phoneClass="w-[120px] md:w-[210px]" lead />
            </div>
          ))}
        </div>
      )}
      {desk && phones.length ? (
        <div className="absolute bottom-0 right-0 flex items-end">
          {phones.map((p, i) => (
            <div key={p.id} className={i ? '-ml-6' : ''} style={{ transform: `rotate(${i ? -1.5 : 2}deg) translateY(${i ? 0 : 14}px)` }}>
              <ShotView shot={p} app={app} phoneClass="w-[96px] md:w-[170px]" />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function StudioFloor({ floor, next, reel, mediaBase }: { floor: Floor; next: NextDoor | null; reel: ReelData | null; mediaBase: string }) {
  const { app } = floor;
  const [device, setDevice] = useState<'all' | 'phone' | 'desk'>('all');
  const [open, setOpen] = useState<{ index: number; opener: string } | null>(null);
  const [current, setCurrent] = useState<string>(floor.chapters[0]?.id ?? '');
  const openerEl = useRef<HTMLElement | null>(null);

  const chapters = useMemo(() => floor.chapters.filter((c) => device === 'all' || c.device === device), [floor.chapters, device]);
  const shots = useMemo(() => chapters.flatMap((c) => c.shots), [chapters]);
  const both = floor.hasPhone && floor.hasDesk;

  const openShot = useCallback(
    (s: Shot, el: HTMLElement) => {
      openerEl.current = el;
      setOpen({ index: shots.findIndex((x) => x.id === s.id), opener: s.id });
      track('forge_studio_open', { app: app.key, chapter: s.chapter });
    },
    [shots, app.key]
  );
  const close = useCallback(() => {
    setOpen(null);
    setTimeout(() => openerEl.current?.focus(), 0);
  }, []);
  const go = useCallback((i: number) => setOpen((o) => (o ? { ...o, index: Math.max(0, Math.min(shots.length - 1, i)) } : o)), [shots.length]);

  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(`ch-${c.id}`)).filter((e): e is HTMLElement => e !== null);
    if (!els.length || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setCurrent(hit.target.id.replace('ch-', ''));
      },
      { rootMargin: '-20% 0px -65% 0px' }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [chapters]);

  const doorCls = 'group flex min-h-[44px] items-center justify-between gap-4 border-b py-4 font-display text-2xl italic t-head';

  return (
    <MotionConfig reducedMotion="user">
      <main className="stock-parchment min-h-screen overflow-x-clip">
        {/* ═══ MASTHEAD ═══════════════════════════════════════════════════════ */}
        <Stock paper="parchment" as="header" className="-mt-20 px-6 pb-16 pt-32 md:pb-24 md:pt-40" style={paperVars(app)}>
          <div className="mx-auto max-w-6xl">
            <nav aria-label="Where you are" className="font-mono text-[11px] uppercase tracking-[0.2em] t-soft">
              <ol className="m-0 flex flex-wrap items-center gap-x-2 p-0">
                <li className="list-none">
                  <Link href="/forge/studio#shelf" prefetch={false} className="inline-flex min-h-[44px] items-center underline underline-offset-4">
                    Shelf
                  </Link>
                </li>
                <li aria-hidden className="list-none">/</li>
                <li className="list-none" aria-current="page">
                  <span className="t-gold">Floor</span>
                </li>
                {app.caseFile ? (
                  <>
                    <li aria-hidden className="list-none">/</li>
                    <li className="list-none">
                      <Link href={`/forge/cases/${app.caseFile}`} prefetch={false} className="inline-flex min-h-[44px] items-center underline underline-offset-4">
                        Case file
                      </Link>
                    </li>
                  </>
                ) : null}
              </ol>
            </nav>
            <h1 className="font-display font-bold italic leading-[0.92] t-head" style={{ fontSize: 'clamp(3rem, 12vw, 9rem)' }}>
              {app.name}
            </h1>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] t-gold">
              {STAMP[app.relationship]} · {app.host}
            </p>
            <span aria-hidden className="mt-4 block h-px w-full max-w-md" style={{ background: GOLD }} />
            <p className="mt-6 max-w-2xl font-display text-xl italic leading-relaxed t-ink md:text-2xl">{app.line}</p>
            {app.partner ? (
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] t-ink">
                {app.partner.role}: <span className="t-gold">{app.partner.name}</span>
              </p>
            ) : null}
            {app.liveUrl ? (
              <a
                href={app.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackOutbound(app.liveUrl, 'forge_live_app_click', { app: app.key, from: 'floor' })}
                className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-sm underline underline-offset-4 t-gold"
              >
                Open the live product <ArrowUpRight aria-hidden className="h-4 w-4" />
              </a>
            ) : null}
            <Bench floor={floor} />
          </div>
        </Stock>

        {/* ═══ INDEX AND FILTER ═══════════════════════════════════════════════ */}
        <div className="sticky top-16 z-30 border-y backdrop-blur-md md:top-20" style={{ borderColor: 'var(--rule)', background: `${app.paper}EE` }}>
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-6">
            <nav aria-label="Chapters" className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-w-0 flex-1 overflow-x-auto">
              <ol className="m-0 flex gap-1 p-0">
                {chapters.map((c, i) => (
                  <li key={c.id} className="list-none">
                    <a
                      href={`#ch-${c.id}`}
                      aria-current={current === c.id ? 'location' : undefined}
                      className="inline-flex min-h-[44px] items-center whitespace-nowrap px-3 font-mono text-[11px] uppercase tracking-[0.16em]"
                      style={{ color: ink(current === c.id ? 0.95 : 0.62), borderBottom: `2px solid ${current === c.id ? app.accentInk : 'transparent'}` }}
                    >
                      {pad(i + 1)} {c.name}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            {both ? (
              <div role="group" aria-label="Device" className="flex shrink-0 gap-1">
                {(['all', 'phone', 'desk'] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    aria-pressed={device === d}
                    onClick={() => setDevice(d)}
                    className="min-h-[44px] rounded-full px-3 font-mono text-[11px] uppercase tracking-[0.14em]"
                    style={{ background: device === d ? '#0A1128' : 'transparent', color: device === d ? '#F5F0E8' : ink(0.7) }}
                  >
                    {d === 'all' ? 'All' : d === 'phone' ? 'Phone' : 'Desk'}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* ═══ CHAPTERS ═══════════════════════════════════════════════════════ */}
        <LayoutGroup>
          <div>
            {chapters.map((c, i) => (
              <Chapter key={`${device}-${c.id}`} c={c} n={i + 1} ci={i} app={app} hiddenId={open ? open.opener : null} onOpen={openShot} />
            ))}
          </div>
          <AnimatePresence>{open !== null && shots[open.index] ? <Stage key="stage" shots={shots} app={app} index={open.index} openerId={open.opener} onClose={close} onGo={go} /> : null}</AnimatePresence>
        </LayoutGroup>

        {reel ? (
          <Stock paper="navy" className="px-6 py-16 md:py-24">
            <Reel reel={reel} base={mediaBase} name={app.name} />
          </Stock>
        ) : null}

        {/* ═══ DOORS ══════════════════════════════════════════════════════════ */}
        <Stock paper="parchment" className="px-6 py-16 md:py-24" style={paperVars(app)}>
          <div className="mx-auto max-w-3xl">
            <p className="max-w-xl text-[15px] font-light leading-[1.8] t-ink">These are screenshots of the running product, not designs.</p>
            <ul className="m-0 mt-8 p-0">
              {app.caseFile ? (
                <li className="list-none">
                  <Link href={`/forge/cases/${app.caseFile}`} prefetch={false} className={doorCls} style={{ borderColor: 'var(--rule)' }}>
                    The case file <ArrowUpRight aria-hidden className="h-5 w-5" />
                  </Link>
                </li>
              ) : null}
              {app.dossier ? (
                <li className="list-none">
                  <Link href={`/forge/floor/${app.dossier}`} prefetch={false} className={doorCls} style={{ borderColor: 'var(--rule)' }}>
                    How it was built <ArrowUpRight aria-hidden className="h-5 w-5" />
                  </Link>
                </li>
              ) : null}
              {app.liveUrl ? (
                <li className="list-none">
                  <a href={app.liveUrl} target="_blank" rel="noopener noreferrer" className={doorCls} style={{ borderColor: 'var(--rule)' }}>
                    Open the live product <ArrowUpRight aria-hidden className="h-5 w-5" />
                  </a>
                </li>
              ) : null}
              <li className="list-none">
                <Link href="/forge/studio#shelf" prefetch={false} className={doorCls} style={{ borderColor: 'var(--rule)' }}>
                  Back to the shelf <ArrowUpRight aria-hidden className="h-5 w-5" />
                </Link>
              </li>
            </ul>
          </div>
        </Stock>

        {next ? (
          <Link href={`/forge/studio/${next.key}`} prefetch={false} className="group relative block overflow-hidden px-6 py-14 md:py-20" style={{ background: next.paper, color: '#1A1A2E' }}>
            <div className="mx-auto flex max-w-6xl items-end justify-between gap-6">
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: next.accentInk }}>Next floor</p>
                <p className="mt-2 font-display text-4xl font-bold italic leading-none md:text-6xl">{next.name}</p>
                <p className="mt-3 inline-flex min-h-[44px] items-center gap-1 text-sm underline underline-offset-4" style={{ color: next.accentInk }}>
                  Walk in <ArrowUpRight aria-hidden className="h-4 w-4" />
                </p>
              </div>
              <div aria-hidden className="relative -mb-24 h-36 w-36 shrink-0 translate-y-0 transition-transform duration-500 motion-safe:group-hover:-translate-y-2 md:h-44 md:w-56">
                {next.shot.kind === 'phone' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={screenSrc(phoneOf(next.shot), 360)} alt="" width={360} height={800} loading="lazy" decoding="async" className="mx-auto h-auto w-24 rounded-[1.6rem] border-4 border-[#15151c] md:w-32" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={screenUrl(next.shot.id, 480)} alt="" width={480} height={220} loading="lazy" decoding="async" className="h-auto w-full rounded-md border-2 border-[#15151c]" />
                )}
              </div>
            </div>
          </Link>
        ) : null}
      </main>
    </MotionConfig>
  );
}
