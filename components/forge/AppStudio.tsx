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
 * ── THE ANSWER: THREE DISTANCES ───────────────────────────────────────────────
 * 1. **The fan.** Three phones in the hero, one per product. Seen from across
 *    the room.
 * 2. **The screening.** Choose a product, and its screens play as filmstrips,
 *    one strip per chapter (Study, Money, Safety…). Each strip scrolls sideways
 *    and snaps, so a chapter of nineteen screens costs one row of height.
 * 3. **The wall.** One switch turns the product into a contact sheet of every
 *    screen at once. This is the view that answers "how much is there?".
 * Any phone opens **the stage**: one screen, full height, arrows and keys to
 * walk the whole product, and a strip of thumbnails to jump.
 *
 * Phones are drawn in CSS, not as a PNG frame, so they scale to any size with a
 * crisp bezel and cost no download. Screenshots come from Cloudinary at twice
 * their rendered width, lazily.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ChevronLeft, ChevronRight, X, LayoutGrid, Film } from 'lucide-react';
import { track, trackOutbound } from '@/lib/analytics';
import { STUDIO_APPS, SCREENS, APP_BY_KEY, chaptersOf, type AppKey, type Screen } from '@/lib/data/app-screens';
import { createPortal } from 'react-dom';
import StudioPhone, { screenSrc } from './StudioPhone';
import { Journeys, AnatomyRoom } from './StudioDeep';
import { FadeUp, Figures, RoomHeader, Doors, GOLD, NAVY, ink } from './ForgeChrome';

// ─────────────────────────────────────────────────────────────────────────────

function Filmstrip({ screens, accent, onOpen }: { screens: Screen[]; accent: string; onOpen: (s: Screen) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const nudge = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: 'smooth' });
  return (
    <div className="relative">
      <div ref={ref} className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex snap-x snap-mandatory gap-7 overflow-x-auto px-6 pb-6 pt-2 md:px-[max(1.5rem,calc((100vw-72rem)/2))]">
        {screens.map((sc) => (
          <figure key={sc.id} className="w-[180px] shrink-0 snap-start md:w-[210px]">
            <button type="button" onClick={() => onOpen(sc)} className="group block rounded-[2rem] outline-none focus-visible:ring-2" style={{ ['--tw-ring-color' as string]: accent }} aria-label={`Open: ${sc.caption}`}>
              <StudioPhone screen={sc} width={210} accent={accent} className="w-[180px] transition-transform duration-500 group-hover:-translate-y-2 md:w-[210px]" style={{ width: undefined }} />
            </button>
            <figcaption className="mt-4 text-[13px] font-light leading-relaxed" style={{ color: ink(0.62) }}>
              {sc.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      {screens.length > 3 ? (
        <div className="pointer-events-none absolute -top-14 right-6 hidden gap-2 md:flex md:right-[max(1.5rem,calc((100vw-72rem)/2))]">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => nudge(d)}
              aria-label={d < 0 ? 'Scroll back' : 'Scroll forward'}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:bg-white/5"
              style={{ borderColor: ink(0.2), color: ink(0.75) }}
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

function Stage({ screens, index, onClose, onGo }: { screens: Screen[]; index: number; onClose: () => void; onGo: (i: number) => void }) {
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

  if (typeof document === "undefined") return null;
  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={`${app.name}: ${sc.caption}`} className="fixed inset-0 z-[80] flex flex-col" style={{ background: '#05070f' }}>
      <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(60% 50% at 50% 40%, ${app.accent}22, transparent 70%)` }} />

      <div className="relative z-10 flex items-center justify-between px-5 py-4">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.24em]" style={{ color: ink(0.55) }}>
          <span style={{ color: app.accent }}>{app.name}</span> · {sc.chapter} · {index + 1} / {screens.length}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="flex h-10 w-10 items-center justify-center rounded-full border hover:bg-white/5" style={{ borderColor: ink(0.2), color: ink(0.8) }}>
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center gap-4 px-3 md:gap-12">
        <button type="button" onClick={() => onGo(index - 1)} disabled={index === 0} aria-label="Previous screen" className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border disabled:opacity-20 sm:flex" style={{ borderColor: ink(0.2), color: ink(0.85) }}>
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex h-full min-h-0 flex-col items-center justify-center md:flex-row md:gap-14">
          <div className="flex h-full min-h-0 items-center" style={{ maxHeight: 'min(74vh, 780px)' }}>
            <StudioPhone key={sc.id} screen={sc} width={340} accent={app.accent} eager className="h-full w-auto" style={{ width: 'auto', height: '100%', aspectRatio: '9.9 / 21.1' }} />
          </div>
          <div className="mt-5 max-w-xs text-center md:mt-0 md:text-left">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: app.accent }}>
              {sc.chapter}
            </p>
            <p className="mt-3 font-display text-xl italic leading-snug text-white md:text-2xl">{sc.caption}</p>
            <div className="mt-6 hidden flex-col gap-3 md:flex">
              <a href={app.live} target="_blank" rel="noopener noreferrer" onClick={trackOutbound(app.live, 'forge_live_app_click', { app: app.key, from: 'studio-stage' })} className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] underline decoration-dotted underline-offset-4" style={{ color: GOLD }}>
                Open the live app <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        <button type="button" onClick={() => onGo(index + 1)} disabled={index === screens.length - 1} aria-label="Next screen" className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border disabled:opacity-20 sm:flex" style={{ borderColor: ink(0.2), color: ink(0.85) }}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div ref={thumbs} className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden relative z-10 flex gap-2 overflow-x-auto px-5 py-4">
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
      </div>
    </div>,
    document.body
  );
}

// ─────────────────────────────────────────────────────────────────────────────

export default function AppStudio({ figures }: { figures: { value: string; label: string }[] }) {
  const [appKey, setAppKey] = useState<AppKey>('varsityos');
  const [mode, setMode] = useState<'screening' | 'wall'>('screening');
  const [open, setOpen] = useState<number | null>(null);
  const app = APP_BY_KEY[appKey];
  const screens = useMemo(() => SCREENS.filter((s) => s.app === appKey), [appKey]);
  const chapters = useMemo(() => chaptersOf(appKey), [appKey]);

  const openScreen = useCallback(
    (sc: Screen) => {
      const i = screens.findIndex((x) => x.id === sc.id);
      setOpen(i);
      track('forge_studio_open', { app: sc.app, chapter: sc.chapter });
    },
    [screens]
  );
  const go = useCallback((i: number) => setOpen(Math.max(0, Math.min(screens.length - 1, i))), [screens.length]);

  const choose = (k: AppKey) => {
    setAppKey(k);
    setOpen(null);
    track('forge_studio_app', { app: k });
    document.getElementById('studio-floor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const covers = STUDIO_APPS.map((a) => ({ app: a, screen: SCREENS.find((s) => s.app === a.key && s.id === a.cover)! }));

  return (
    <main className="min-h-screen overflow-x-clip" style={{ background: NAVY, color: '#F5F0E8' }}>
      {/* ═══ HEADER + THE FAN ════════════════════════════════════════════════ */}
      <section className="relative -mt-20 overflow-hidden px-6 pb-16 pt-36 md:pb-24">
        <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(70% 60% at 75% 45%, ${GOLD}22, transparent 65%), radial-gradient(50% 40% at 15% 90%, #2EC4B622, transparent 70%)` }} />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
          <RoomHeader
            kicker="A room in the Forge"
            title="The App Studio"
            standfirst="A hundred real screens from three live products. Pick one up."
            note={<>Shot on a phone, in a browser, on one afternoon in August. Nothing here is a mock-up.</>}
          />
          <FadeUp delay={0.2}>
            <div className="relative mx-auto flex h-[430px] w-full max-w-[520px] items-center justify-center md:h-[520px]" style={{ perspective: 1400 }}>
              {covers.map(({ app: a, screen }, i) => {
                const pos = [
                  { x: '-34%', r: -9, z: 1, s: 0.86 },
                  { x: '0%', r: 0, z: 3, s: 1 },
                  { x: '34%', r: 9, z: 2, s: 0.86 },
                ][i];
                return (
                  <button
                    key={a.key}
                    type="button"
                    onClick={() => choose(a.key)}
                    aria-label={`Open ${a.name}`}
                    className="absolute transition-transform duration-700 hover:-translate-y-2"
                    style={{ zIndex: pos.z, transform: `translateX(${pos.x}) rotate(${pos.r}deg) scale(${pos.s})` }}
                  >
                    <StudioPhone screen={screen} width={210} accent={a.accent} eager className="md:!w-[240px]" />
                    <span className="mt-4 block text-center font-mono text-[10px] uppercase tracking-[0.24em]" style={{ color: a.accent }}>
                      {a.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </FadeUp>
        </div>
      </section>

      <Figures items={figures} />

      {/* ═══ DEEPER: what it is like to use, and why it is like that ════════ */}
      <Journeys />
      <AnatomyRoom />

      {/* ═══ THE FLOOR: every screen ═════════════════════════════════════════ */}
      <section className="px-6 pt-20">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: GOLD }}>
            The floor
          </p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl italic leading-tight text-white md:text-5xl">Every screen, by chapter.</h2>
        </div>
      </section>

      {/* ═══ THE SWITCHER ════════════════════════════════════════════════════ */}
      <div id="studio-floor" className="sticky top-16 z-30 scroll-mt-16 border-b backdrop-blur-md md:top-20" style={{ borderColor: 'rgba(201,148,58,0.18)', background: 'rgba(10,17,40,0.88)' }}>
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
                  style={{ background: active ? `${a.accent}24` : 'transparent', color: active ? a.accent : ink(0.55), boxShadow: active ? `inset 0 0 0 1px ${a.accent}66` : 'none' }}
                >
                  {a.name} <span style={{ opacity: 0.7 }}>{n}</span>
                </button>
              );
            })}
          </div>
          <div className="flex gap-1 rounded-full p-1" style={{ background: 'rgba(255,255,255,0.05)' }}>
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
                style={{ background: mode === m ? 'rgba(255,255,255,0.1)' : 'transparent', color: mode === m ? '#fff' : ink(0.5) }}
              >
                <Icon className="h-3.5 w-3.5" /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ THE PRODUCT ═════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px]" style={{ background: `radial-gradient(60% 100% at 50% 0%, ${app.accent}1c, transparent 70%)` }} />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: app.accent }}>
                {screens.length} screens · {chapters.length} {chapters.length === 1 ? 'chapter' : 'chapters'}
              </p>
              <h2 className="mt-3 font-display text-5xl font-bold italic leading-none text-white md:text-7xl">{app.name}</h2>
              <p className="mt-5 max-w-2xl font-display text-lg italic leading-relaxed md:text-xl" style={{ color: ink(0.72) }}>
                {app.line}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:flex-col md:items-end">
              <a
                href={app.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackOutbound(app.live, 'forge_live_app_click', { app: app.key, from: 'studio' })}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#0A1128]"
                style={{ background: app.accent }}
              >
                Open the live app <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <Link href={`/forge/floor/${app.dossier}`} className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.2em] underline decoration-dotted underline-offset-4" style={{ color: GOLD }}>
                How it was built <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {mode === 'screening' ? (
          <div className="mt-14 space-y-16">
            {chapters.map((c, ci) => {
              const cs = screens.filter((s) => s.chapter === c);
              return (
                <div key={`${appKey}-${c}`}>
                  <div className="mx-auto mb-6 flex max-w-6xl items-baseline gap-4 px-6">
                    <span className="font-display text-3xl font-bold italic" style={{ color: app.accent }}>
                      {String(ci + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-2xl italic text-white md:text-3xl">{c}</h3>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: ink(0.4) }}>
                      {cs.length} {cs.length === 1 ? 'screen' : 'screens'}
                    </span>
                  </div>
                  <Filmstrip screens={cs} accent={app.accent} onOpen={openScreen} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mx-auto mt-14 max-w-6xl px-6">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(92px,1fr))] gap-x-4 gap-y-6 md:grid-cols-[repeat(auto-fill,minmax(118px,1fr))]">
              {screens.map((sc) => (
                <button key={sc.id} type="button" onClick={() => openScreen(sc)} aria-label={`Open: ${sc.caption}`} className="group block">
                  <StudioPhone screen={sc} width={130} className="!w-full transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:scale-[1.03]" style={{ width: '100%' }} />
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ═══ A NOTE ON THE SCREENS ═══════════════════════════════════════════ */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl rounded-xl border p-6" style={{ borderColor: ink(0.1), background: 'rgba(255,255,255,0.02)' }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: ink(0.4) }}>
            On what you are looking at
          </p>
          <p className="mt-3 text-[14.5px] font-light leading-[1.8]" style={{ color: ink(0.62) }}>
            These are screenshots, not designs. The VarsityOS screens come from my own student account, so the budget, the
            burnout score and the overdue tasks are real, and so is the week they describe. The Feedback button in the corner
            of most screens is the real one too. Every product here is live, and the button above each one opens it.
          </p>
        </div>
      </section>

      {open !== null ? <Stage screens={screens} index={open} onClose={() => setOpen(null)} onGo={go} /> : null}

      <Doors
        doors={[
          { href: '/forge/floor', label: 'The Workshop Floor', line: 'The dossier behind each of these builds.' },
          { href: '/forge/scars', label: 'The Scar Room', line: 'What broke while they were being made.' },
          { href: '/forge', label: 'The Forge', line: 'Back to the threshold.' },
        ]}
      />
    </main>
  );
}
