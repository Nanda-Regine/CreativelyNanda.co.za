'use client';

/**
 * 🌙 The Long Night — /forge/nights
 *
 * `docs/THE_FORGE.md` §5.4. The diary, newest first. Build-in-public as it
 * actually happened, rather than as it would be summarised afterwards.
 *
 * ── TWO CONSTRAINTS THIS ROOM IS BUILT AROUND ─────────────────────────────────
 *
 * 1. **Titles only, never bodies.** A session heading is a line she wrote as a
 *    title — `THE NIGHT OF THE SILENT FAILURES`, `INNGEST COST SURGERY`, `The
 *    statement card — the layout built by subtraction`. A session body is a work
 *    log written at 2am for an audience of one, and 219 of them cannot be read
 *    by a human before publication. So the room is a ledger of nights, which is
 *    the most that can be published honestly, and it turns out to be the better
 *    room anyway: the titles are the writing.
 *
 * 2. **Dated sessions only.** §5.4 is emphatic that a full-history timeline
 *    would imply the record starts when the dates start. It doesn't — the first
 *    line of code is 2025 and lives in Origins, in prose. So this room states
 *    its own span rather than pretending to be complete, and links out for the
 *    beginning.
 *
 * ⚠️ Props only. The corpus is reduced to `Night[]` on the server — see
 * `getNights()` in `lib/forge-data.ts`.
 */

import { useState, useMemo } from 'react';
import TexturedSection, { TEXTURES } from '@/components/ui/TexturedSection';
import RoomBackdrop from '@/components/room/RoomBackdrop';
import { PAGE_BACKDROPS } from '@/lib/house-assets';
import { track } from '@/lib/analytics';
import { FadeUp, Figures, RoomHeader, Doors, GOLD, NAVY, ink } from './ForgeChrome';

export interface NightRow {
  date: string;
  /** Precomputed on the server — nothing here formats a date. */
  day: string;
  month: string;
  app: string;
  title: string;
  words: number;
  headline: boolean;
}

export interface LongNightProps {
  months: { month: string; nights: NightRow[] }[];
  apps: { name: string; count: number; accent: string }[];
  figures: { value: string; label: string }[];
  span: { from: string; to: string };
  undated: number;
}

export default function LongNight({ months, apps, figures, span, undated }: LongNightProps) {
  const [filter, setFilter] = useState<string | null>(null);

  const shown = useMemo(() => {
    if (!filter) return months;
    return months
      .map((m) => ({ ...m, nights: m.nights.filter((n) => n.app === filter) }))
      .filter((m) => m.nights.length > 0);
  }, [months, filter]);

  const accentFor = (app: string) => apps.find((a) => a.name === app)?.accent ?? GOLD;
  const total = shown.reduce((a, m) => a + m.nights.length, 0);

  return (
    <main className="min-h-screen" style={{ background: NAVY, color: '#F5F0E8' }}>
      {/* ═══ HEADER ══════════════════════════════════════════════════════════ */}
      <section className="relative -mt-20 flex min-h-[74vh] items-end overflow-hidden px-6 pb-20 pt-40">
        <RoomBackdrop image={PAGE_BACKDROPS.forge} wash="#060A1C" intensity={0.8} veil={0.58} />
        <RoomHeader
          kicker="A room in the Forge"
          title="The Long Night"
          standfirst="The diary, newest first — every working session that has a date on it, in the order it happened."
          note={
            <>
              Titles only. A session body is a work log written at two in the morning for a reader who already
              has all the context; a session title is a line she wrote on purpose. This room runs{' '}
              <span style={{ color: ink(0.8) }}>{span.from} to {span.to}</span> because that is where the dated
              record runs — it is not where the work starts. The beginning is in{' '}
              <a href="/forge/origins" className="underline decoration-dotted underline-offset-4 hover:opacity-80" style={{ color: GOLD }}>
                Where It Started
              </a>
              , in prose, because the first year has no machine-readable dates and a timeline that started here
              would be telling you something untrue.
            </>
          }
        />
      </section>

      <Figures items={figures} />

      {/* ═══ THE FILTER ══════════════════════════════════════════════════════ */}
      <section className="px-6 pt-16">
        <div className="mx-auto max-w-4xl">
          <FadeUp>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setFilter(null)}
                className="rounded-full border px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.18em] transition-colors"
                style={{
                  borderColor: filter === null ? GOLD : 'rgba(245,240,232,0.14)',
                  background: filter === null ? 'rgba(201,148,58,0.14)' : 'transparent',
                  color: filter === null ? GOLD : ink(0.55),
                }}
              >
                Every night
              </button>
              {apps.map((a) => {
                const on = filter === a.name;
                return (
                  <button
                    key={a.name}
                    onClick={() => {
                      setFilter(on ? null : a.name);
                      if (!on) track('forge_filter', { room: 'nights', build: a.name });
                    }}
                    className="rounded-full border px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.18em] transition-colors"
                    style={{
                      borderColor: on ? a.accent : 'rgba(245,240,232,0.14)',
                      background: on ? `${a.accent}22` : 'transparent',
                      color: on ? a.accent : ink(0.55),
                    }}
                  >
                    {a.name} <span style={{ opacity: 0.6 }}>{a.count}</span>
                  </button>
                );
              })}
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: ink(0.32) }}>
              showing {total} {total === 1 ? 'night' : 'nights'}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ THE LEDGER ══════════════════════════════════════════════════════ */}
      <TexturedSection texture={TEXTURES.dark} tone="navy" className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          {shown.map((m) => (
            <section key={m.month} className="mb-14 md:mb-16">
              <FadeUp>
                <div className="sticky top-20 z-10 -mx-2 flex items-baseline gap-4 px-2 py-3 backdrop-blur-sm" style={{ background: 'rgba(10,17,40,0.86)' }}>
                  <h2 className="font-display text-2xl font-bold italic text-white md:text-3xl">{m.month}</h2>
                  <span className="h-px flex-1" style={{ background: 'rgba(201,148,58,0.22)' }} />
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                    {m.nights.length} {m.nights.length === 1 ? 'night' : 'nights'}
                  </span>
                </div>
              </FadeUp>

              <ol className="mt-5">
                {m.nights.map((n, i) => (
                  <FadeUp key={`${n.date}-${n.title}`} delay={Math.min(i * 0.015, 0.2)} y={12}>
                    <li
                      className="group grid gap-x-5 gap-y-1 border-b py-4 md:grid-cols-[4.5rem_1fr_auto] md:items-baseline"
                      style={{ borderColor: 'rgba(245,240,232,0.07)' }}
                    >
                      <time
                        dateTime={n.date}
                        className="font-mono text-[11px] uppercase tracking-[0.14em]"
                        style={{ color: ink(0.4) }}
                      >
                        {n.day}
                      </time>

                      <h3
                        className={
                          n.headline
                            ? 'font-display text-lg font-bold italic leading-snug text-white md:text-xl'
                            : 'text-[15px] font-light leading-snug'
                        }
                        style={n.headline ? undefined : { color: ink(0.78) }}
                      >
                        {n.title}
                      </h3>

                      <span
                        className="justify-self-start font-mono text-[9.5px] uppercase tracking-[0.16em] md:justify-self-end"
                        style={{ color: accentFor(n.app), opacity: 0.75 }}
                      >
                        {n.app}
                      </span>
                    </li>
                  </FadeUp>
                ))}
              </ol>
            </section>
          ))}

          {shown.length === 0 ? (
            <p className="py-16 text-center font-display text-xl italic" style={{ color: ink(0.5) }}>
              No nights under that build.
            </p>
          ) : null}
        </div>
      </TexturedSection>

      {/* ═══ WHAT IS NOT HERE ════════════════════════════════════════════════ */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: GOLD }}>
              What is not on this page
            </p>
            <p className="mt-6 text-[15.5px] font-light leading-[1.85]" style={{ color: ink(0.68) }}>
              A further {undated} logged sessions carry no parseable date. They are not missing and they are not
              hidden — they are the dossier journals, which are organised by phase rather than by night, and
              they are what the{' '}
              <a href="/forge/floor" className="underline decoration-dotted underline-offset-4 hover:opacity-80" style={{ color: GOLD }}>
                Workshop Floor
              </a>{' '}
              is written from. Putting them on a timeline would mean inventing dates for them, and an invented
              date is worse than no date.
            </p>
            <p className="mt-5 text-[15.5px] font-light leading-[1.85]" style={{ color: ink(0.68) }}>
              Nor are the session bodies here. Every night below the title is a work log — abbreviations, table
              names, half-sentences, the occasional client. Publishing 219 of them would mean either reading all
              219 first or trusting a filter to do it, and the{' '}
              <a href="/forge/scars#the-filter-that-deleted-the-room" className="underline decoration-dotted underline-offset-4 hover:opacity-80" style={{ color: GOLD }}>
                filter has already been caught
              </a>{' '}
              getting that judgment badly wrong in both directions.
            </p>
          </FadeUp>
        </div>
      </section>

      <Doors
        doors={[
          { href: '/forge/floor', label: 'The Workshop Floor', line: 'What these nights added up to.' },
          { href: '/forge/commits', label: 'The Commit Wall', line: 'The same year, in her own one-liners.' },
          { href: '/forge/scars', label: 'The Scar Room', line: 'The nights that cost something.' },
        ]}
      />
    </main>
  );
}
