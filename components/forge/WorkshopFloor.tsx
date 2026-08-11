'use client';

/**
 * 🔨 The Workshop Floor — /forge/floor
 *
 * Every build, one dossier each. `docs/THE_FORGE.md` §5.3.
 *
 * The index deliberately leads with MEASURED figures — commits, languages, a
 * year of weekly activity — because the spec's curation policy (§4) is that a
 * CTO reads for verification and closes the tab on feature marketing. Every
 * number on this page came out of the GitHub API this morning rather than out
 * of a sentence somebody typed eight months ago.
 *
 * ⚠️ Props only. This component must not import `lib/forge-data.ts` — the page
 * does that on the server and hands down the reduced shape.
 */

import Link from 'next/link';
import { ArrowUpRight, Lock, GitBranch } from 'lucide-react';
import TexturedSection, { TEXTURES } from '@/components/ui/TexturedSection';
import RoomBackdrop from '@/components/room/RoomBackdrop';
import { PAGE_BACKDROPS } from '@/lib/house-assets';
import { track } from '@/lib/analytics';
import { FadeUp, Figures, RoomHeader, BrandMark, Doors, Rule, GOLD, NAVY, ink } from './ForgeChrome';

export interface FloorCard {
  slug: string;
  name: string;
  kicker: string;
  standfirst: string;
  accent: string;
  logo: string | null;
  commits: number;
  commitsLabel: string;
  language: string | null;
  live: string | null;
  isPrivate: boolean;
  span: string | null;
  sections: number;
  nights: number;
  decisions: number;
}

export interface FloorProps {
  cards: FloorCard[];
  figures: { value: string; label: string }[];
  languages: { name: string; pct: number }[];
  activity: number[];
  generatedAt: string;
}

/**
 * A year of commits as a week histogram.
 *
 * Rendered as plain divs rather than a chart library: it is fifty-two bars with
 * no axes, no tooltip and no interaction, and the smallest charting dependency
 * costs more than the entire component. The same reasoning K53 uses to refuse a
 * router, applied to a decoration.
 */
function ActivityBars({ weeks, accent = GOLD }: { weeks: number[]; accent?: string }) {
  const peak = Math.max(1, ...weeks);
  return (
    <div className="flex h-16 items-end gap-[3px]" aria-hidden>
      {weeks.map((n, i) => (
        <span
          key={i}
          className="flex-1 rounded-sm transition-opacity"
          style={{
            height: `${Math.max(2, (n / peak) * 100)}%`,
            background: accent,
            opacity: n === 0 ? 0.12 : 0.35 + (n / peak) * 0.65,
          }}
        />
      ))}
    </div>
  );
}

export default function WorkshopFloor({ cards, figures, languages, activity, generatedAt }: FloorProps) {
  const totalWeeks = activity.filter((n) => n > 0).length;

  return (
    <main className="min-h-screen" style={{ background: NAVY, color: '#F5F0E8' }}>
      {/* ═══ HEADER ══════════════════════════════════════════════════════════ */}
      <section className="relative -mt-20 flex min-h-[72vh] items-end overflow-hidden px-6 pb-20 pt-40">
        <RoomBackdrop image={PAGE_BACKDROPS.forge} wash={NAVY} intensity={0.9} veil={0.46} />
        <RoomHeader
          kicker="A room in the Forge"
          title="The Workshop Floor"
          standfirst="Every build, one dossier each — what the problem actually was, which decisions it forced, and what they cost."
          note={
            <>
              Not a portfolio grid. Each of these is a working system with a build journal behind it, and the
              dossier is written from that journal: the constraint, the decision, the reasoning, the thing that
              turned out to be wrong. Outcomes and engagements live at{' '}
              <a href="https://mirembemuse.co.za" className="underline decoration-dotted underline-offset-4 hover:opacity-80" style={{ color: GOLD }}>
                Mirembe Muse
              </a>
              . This side is the making.
            </>
          }
        />
      </section>

      <Figures items={figures} />

      {/* ═══ THE YEAR ════════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <FadeUp>
            <Rule label="Measured, not stated" />
          </FadeUp>
          <div className="mt-10 grid gap-12 md:grid-cols-[1.35fr_1fr] md:gap-16">
            <FadeUp>
              <h2 className="font-display text-2xl font-bold italic leading-tight text-white md:text-3xl">
                A year of commits, by week
              </h2>
              <p className="mt-4 text-[15px] font-light leading-relaxed" style={{ color: ink(0.62) }}>
                Every figure in this wing is read from the GitHub API when the site is built and committed as
                data, so the site never calls GitHub while serving a page — and so no number here can quietly go
                stale the way a hand-typed one does.
              </p>
              <div className="mt-8">
                <ActivityBars weeks={activity} />
                <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: ink(0.38) }}>
                  <span>52 weeks ago</span>
                  <span>{totalWeeks} weeks with work in them</span>
                  <span>this week</span>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h2 className="font-display text-2xl font-bold italic leading-tight text-white md:text-3xl">
                What it is written in
              </h2>
              <ul className="mt-6 space-y-3">
                {languages.slice(0, 6).map((l) => (
                  <li key={l.name}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-mono text-[12px] tracking-wide" style={{ color: ink(0.82) }}>
                        {l.name}
                      </span>
                      <span className="font-mono text-[11px]" style={{ color: GOLD }}>
                        {l.pct}%
                      </span>
                    </div>
                    <div className="mt-1.5 h-px w-full" style={{ background: ink(0.1) }}>
                      <div className="h-px" style={{ width: `${Math.max(1, l.pct)}%`, background: GOLD }} />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: ink(0.34) }}>
                Read {generatedAt}
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══ THE BUILDS ══════════════════════════════════════════════════════ */}
      <TexturedSection texture={TEXTURES.regalNavy} tone="navy" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <FadeUp>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: GOLD }}>
              The floor
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold italic leading-tight text-white md:text-5xl">
              {cards.length} builds, in order of how much of her year each one took.
            </h2>
          </FadeUp>

          <div className="mt-14 space-y-px overflow-hidden rounded-2xl border" style={{ borderColor: 'rgba(201,148,58,0.2)', background: 'rgba(201,148,58,0.16)' }}>
            {cards.map((c, i) => (
              <FadeUp key={c.slug} delay={Math.min(i * 0.04, 0.3)}>
                <Link
                  href={`/forge/floor/${c.slug}`}
                  className="group block"
                  onClick={() => track('forge_build_open', { build: c.slug, position: i + 1 })}
                >
                  <article className="relative p-7 transition-colors group-hover:bg-[#0d1631] md:p-9" style={{ background: NAVY }}>
                    {/* the build's own colour, as a spine down the left edge */}
                    <span aria-hidden className="absolute inset-y-0 left-0 w-[3px]" style={{ background: c.accent }} />

                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
                      <BrandMark logo={c.logo} name={c.name} accent={c.accent} size={60} />

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          <h3 className="font-display text-2xl font-bold italic text-white md:text-3xl">{c.name}</h3>
                          <span className="font-mono text-[10.5px] uppercase tracking-[0.2em]" style={{ color: c.accent }}>
                            {c.kicker}
                          </span>
                        </div>

                        <p className="mt-3 max-w-2xl text-[15px] font-light leading-relaxed" style={{ color: ink(0.68) }}>
                          {c.standfirst}
                        </p>

                        <dl className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.16em]" style={{ color: ink(0.42) }}>
                          <div className="flex items-center gap-1.5">
                            <GitBranch className="h-3 w-3" />
                            <dd>{c.commitsLabel} commits</dd>
                          </div>
                          {c.language ? <dd>{c.language}</dd> : null}
                          {c.span ? <dd>{c.span}</dd> : null}
                          {c.decisions ? <dd>{c.decisions} decisions written up</dd> : null}
                          {c.nights ? <dd>{c.nights} nights logged</dd> : null}
                        </dl>
                      </div>

                      <ArrowUpRight
                        className="hidden h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:block"
                        style={{ color: GOLD }}
                      />
                    </div>

                    {/* Live link and repo state. A private repo's URL is a 404 for
                        a visitor, so it is stated rather than linked. */}
                    <div className="mt-6 flex flex-wrap items-center gap-4 border-t pt-4 font-mono text-[10.5px] uppercase tracking-[0.18em]" style={{ borderColor: ink(0.08) }}>
                      {c.live ? (
                        <span style={{ color: GOLD }}>{c.live.replace(/^https?:\/\//, '')}</span>
                      ) : null}
                      {c.isPrivate ? (
                        <span className="flex items-center gap-1.5" style={{ color: ink(0.3) }}>
                          <Lock className="h-3 w-3" /> private repository
                        </span>
                      ) : (
                        <span style={{ color: ink(0.3) }}>public repository</span>
                      )}
                    </div>
                  </article>
                </Link>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.15}>
            <p className="mt-10 max-w-2xl text-[13.5px] font-light leading-relaxed" style={{ color: ink(0.45) }}>
              One build is missing on purpose. Sankofa Sessions has a single section of journal behind it, and a
              near-empty room reads as neglect rather than as honesty — it goes on the floor when it has been
              written up properly, and not before.
            </p>
          </FadeUp>
        </div>
      </TexturedSection>

      <Doors
        doors={[
          { href: '/forge/scars', label: 'The Scar Room', line: 'What broke, and the reason it was allowed to.' },
          { href: '/forge/nights', label: 'The Long Night', line: 'The diary these dossiers were written from.' },
          { href: '/forge/origins', label: 'Where It Started', line: 'The nine projects before any of this.' },
        ]}
      />
    </main>
  );
}
