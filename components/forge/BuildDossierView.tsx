'use client';

/**
 * 🔨 One build's dossier — /forge/floor/[app]
 *
 * The reading order is fixed across every build, because a dossier that
 * reorders itself per subject is a set of pages rather than a series:
 *
 *   the problem  →  the decisions  →  what generalises  →  what it cost
 *
 * `docs/THE_FORGE.md` §5.3 specifies vision → architecture → phase → receipts.
 * This keeps the spirit and drops the phase timeline, because the phase sections
 * in the corpus are build-order scaffolding rather than narrative, and a
 * timeline of "Phase 17, Phase 18" is the changelog the curation policy in §4
 * explicitly says a CTO closes the tab on.
 *
 * ⚠️ Props only — no corpus import. See `lib/forge-data.ts`.
 */

import Link from 'next/link';
import { ArrowUpRight, Lock, GitBranch, Calendar } from 'lucide-react';
import TexturedSection, { TEXTURES } from '@/components/ui/TexturedSection';
import RoomBackdrop from '@/components/room/RoomBackdrop';
import { PAGE_BACKDROPS } from '@/lib/house-assets';
import type { BuildDossier } from '@/lib/data/forge-builds';
import { trackOutbound } from '@/lib/analytics';
import { FadeUp, BrandMark, Doors, Artefact, Rule, GOLD, NAVY, ink } from './ForgeChrome';

export interface DossierProps {
  dossier: BuildDossier;
  meta: {
    commitsLabel: string;
    span: string | null;
    lastCommit: string | null;
    languages: { name: string; pct: number }[];
    activity: number[];
    live: string | null;
    isPrivate: boolean;
    repo: string | null;
    sections: number;
    nights: number;
  };
  /** Scars produced by this build, resolved by the server. */
  scars: { slug: string; title: string; summary: string }[];
  /** Previous / next along the floor, so a reader can walk it. */
  neighbours: { prev: { slug: string; name: string } | null; next: { slug: string; name: string } | null };
}

export default function BuildDossierView({ dossier: d, meta, scars, neighbours }: DossierProps) {
  const peak = Math.max(1, ...meta.activity);

  return (
    <main className="min-h-screen" style={{ background: NAVY, color: '#F5F0E8' }}>
      {/* ═══ COVER ═══════════════════════════════════════════════════════════ */}
      <section className="relative -mt-20 flex min-h-[78vh] items-end overflow-hidden px-6 pb-20 pt-40">
        <RoomBackdrop image={PAGE_BACKDROPS.forge} wash={NAVY} intensity={0.88} veil={0.5} />

        <div className="relative z-10 mx-auto w-full max-w-4xl">
          <FadeUp>
            <Link
              href="/forge/floor"
              className="font-mono text-[10.5px] uppercase tracking-[0.28em] transition-opacity hover:opacity-70"
              style={{ color: GOLD }}
            >
              ← The Workshop Floor
            </Link>
          </FadeUp>

          <FadeUp delay={0.08}>
            <div className="mt-8 flex items-center gap-5">
              <BrandMark logo={d.logo} name={d.name} accent={d.accent} size={72} />
              <div>
                <h1 className="font-display text-5xl font-bold italic leading-[0.95] text-white md:text-7xl">{d.name}</h1>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: d.accent }}>
                  {d.kicker}
                </p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.16}>
            <p className="mt-9 max-w-2xl font-display text-xl italic leading-relaxed md:text-2xl" style={{ color: ink(0.82) }}>
              {d.standfirst}
            </p>
          </FadeUp>

          <FadeUp delay={0.24}>
            <dl className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-[10.5px] uppercase tracking-[0.16em]" style={{ color: ink(0.5) }}>
              <div className="flex items-center gap-1.5">
                <GitBranch className="h-3 w-3" style={{ color: GOLD }} />
                <dd>{meta.commitsLabel} commits</dd>
              </div>
              {meta.span ? (
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" style={{ color: GOLD }} />
                  <dd>{meta.span}</dd>
                </div>
              ) : null}
              {meta.languages[0] ? <dd>{meta.languages[0].name} {meta.languages[0].pct}%</dd> : null}
              {meta.isPrivate ? (
                <div className="flex items-center gap-1.5">
                  <Lock className="h-3 w-3" />
                  <dd>private repository</dd>
                </div>
              ) : null}
            </dl>
          </FadeUp>

          {meta.live ? (
            <FadeUp delay={0.3}>
              <a
                href={meta.live}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackOutbound(meta.live, 'forge_live_app_click', { build: d.slug })}
                className="mt-9 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-mono text-[11px] uppercase tracking-widest transition-opacity hover:opacity-90"
                style={{ background: d.accent, color: '#fff' }}
              >
                {meta.live.replace(/^https?:\/\//, '')} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </FadeUp>
          ) : null}
        </div>
      </section>

      {/* ═══ THE PROBLEM ═════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <Rule label="The problem" color={d.accent} />
          </FadeUp>
          <div className="mt-9 space-y-6">
            {d.problem.map((p, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <p
                  className={
                    i === 0
                      ? 'font-display text-xl italic leading-relaxed md:text-2xl'
                      : 'text-[16px] font-light leading-[1.85] md:text-[17px]'
                  }
                  style={{ color: i === 0 ? ink(0.92) : ink(0.72) }}
                >
                  {p}
                </p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THE DECISIONS ═══════════════════════════════════════════════════ */}
      <TexturedSection texture={TEXTURES.regalNavy} tone="navy" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: GOLD }}>
              {d.decisions.length} decisions
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold italic leading-tight text-white md:text-5xl">
              What the constraint forced.
            </h2>
            <p className="mt-5 text-[15px] font-light leading-relaxed" style={{ color: ink(0.55) }}>
              Each of these is a choice with a reason attached. The reason is the part worth reading — a stack
              list tells you what was used, and nothing at all about the judgment that put it there.
            </p>
          </FadeUp>

          <ol className="mt-14 space-y-14">
            {d.decisions.map((dec, i) => (
              <FadeUp key={dec.title} delay={0.04}>
                <li>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] tracking-widest" style={{ color: d.accent }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-2xl font-bold italic leading-snug text-white md:text-[1.75rem]">
                      {dec.title}
                    </h3>
                  </div>
                  <p className="mt-4 pl-0 text-[16px] font-light leading-[1.85] md:pl-10" style={{ color: ink(0.74) }}>
                    {dec.body}
                  </p>
                  {dec.code ? (
                    <div className="md:pl-10">
                      <Artefact>{dec.code}</Artefact>
                    </div>
                  ) : null}
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>
      </TexturedSection>

      {/* ═══ WHAT GENERALISES ════════════════════════════════════════════════ */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <Rule label="What generalises" color={d.accent} />
            <h2 className="mt-7 font-display text-3xl font-bold italic leading-tight text-white md:text-4xl">
              The part that survives the build.
            </h2>
          </FadeUp>

          <div className="mt-12 space-y-10">
            {d.learned.map((l) => (
              <FadeUp key={l.claim}>
                <div className="border-l-2 pl-6" style={{ borderColor: `${d.accent}66` }}>
                  <p className="font-display text-xl font-bold italic leading-snug text-white md:text-2xl">
                    {l.claim}
                  </p>
                  <p className="mt-3 text-[15.5px] font-light leading-[1.85]" style={{ color: ink(0.7) }}>
                    {l.why}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SCARS ═══════════════════════════════════════════════════════════ */}
      {scars.length ? (
        <section className="px-6 pb-8">
          <div className="mx-auto max-w-3xl">
            <FadeUp>
              <Rule label="What it cost" color="#8B1E3F" />
            </FadeUp>
            <div className="mt-8 space-y-px overflow-hidden rounded-xl border" style={{ borderColor: 'rgba(139,30,63,0.35)', background: 'rgba(139,30,63,0.28)' }}>
              {scars.map((s) => (
                <FadeUp key={s.slug}>
                  <Link href={`/forge/scars#${s.slug}`} className="group block">
                    <div className="p-6 transition-colors group-hover:bg-[#12172f]" style={{ background: NAVY }}>
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-display text-lg italic text-white md:text-xl">{s.title}</h3>
                        <ArrowUpRight className="h-4 w-4 shrink-0" style={{ color: '#C97A8C' }} />
                      </div>
                      <p className="mt-2 text-[14px] font-light leading-relaxed" style={{ color: ink(0.58) }}>
                        {s.summary}
                      </p>
                    </div>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ═══ THE RECORD ══════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <Rule label="The record" />
          </FadeUp>

          <div className="mt-9 grid gap-10 md:grid-cols-2">
            <FadeUp>
              <h3 className="font-mono text-[10.5px] uppercase tracking-[0.22em]" style={{ color: ink(0.45) }}>
                Built with
              </h3>
              <ul className="mt-4 space-y-2">
                {d.stack.map((s) => (
                  <li key={s} className="font-mono text-[12.5px]" style={{ color: ink(0.78) }}>
                    {s}
                  </li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp delay={0.08}>
              <h3 className="font-mono text-[10.5px] uppercase tracking-[0.22em]" style={{ color: ink(0.45) }}>
                Measured
              </h3>
              <dl className="mt-4 space-y-2 font-mono text-[12.5px]" style={{ color: ink(0.78) }}>
                <div className="flex justify-between gap-4"><dt>commits</dt><dd style={{ color: GOLD }}>{meta.commitsLabel}</dd></div>
                {meta.lastCommit ? <div className="flex justify-between gap-4"><dt>last commit</dt><dd style={{ color: GOLD }}>{meta.lastCommit}</dd></div> : null}
                {meta.sections ? <div className="flex justify-between gap-4"><dt>journal sections</dt><dd style={{ color: GOLD }}>{meta.sections}</dd></div> : null}
                {meta.nights ? <div className="flex justify-between gap-4"><dt>nights logged</dt><dd style={{ color: GOLD }}>{meta.nights}</dd></div> : null}
              </dl>

              {meta.activity.length ? (
                <div className="mt-6 flex h-10 items-end gap-[2px]" aria-hidden>
                  {meta.activity.map((n, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{ height: `${Math.max(3, (n / peak) * 100)}%`, background: d.accent, opacity: n === 0 ? 0.12 : 0.4 + (n / peak) * 0.6 }}
                    />
                  ))}
                </div>
              ) : null}
            </FadeUp>
          </div>

          <FadeUp delay={0.12}>
            <p className="mt-12 border-t pt-6 text-[13px] font-light leading-relaxed" style={{ borderColor: ink(0.08), color: ink(0.42) }}>
              Written from <span style={{ color: ink(0.62) }}>{d.source}</span>. The dossier is composed from the
              journal rather than quoted out of it — the raw sections stay behind the review gate described in{' '}
              <span className="font-mono text-[11.5px]">docs/THE_FORGE.md</span> §4, and every figure above is read
              from the GitHub API at build time.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ WALK THE FLOOR ══════════════════════════════════════════════════ */}
      <section className="px-6 pb-6">
        <div className="mx-auto flex max-w-3xl items-stretch justify-between gap-4">
          {neighbours.prev ? (
            <Link href={`/forge/floor/${neighbours.prev.slug}`} className="group flex-1 rounded-xl border p-5 transition-colors hover:bg-[#0d1631]" style={{ borderColor: ink(0.1) }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: ink(0.38) }}>Previous</p>
              <p className="mt-1.5 font-display text-lg italic text-white">{neighbours.prev.name}</p>
            </Link>
          ) : <span className="flex-1" />}
          {neighbours.next ? (
            <Link href={`/forge/floor/${neighbours.next.slug}`} className="group flex-1 rounded-xl border p-5 text-right transition-colors hover:bg-[#0d1631]" style={{ borderColor: ink(0.1) }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: ink(0.38) }}>Next</p>
              <p className="mt-1.5 font-display text-lg italic text-white">{neighbours.next.name}</p>
            </Link>
          ) : <span className="flex-1" />}
        </div>
      </section>

      <Doors
        doors={[
          { href: '/forge/floor', label: 'The Workshop Floor', line: 'Back to every build.' },
          { href: '/forge/commits', label: 'The Commit Wall', line: 'The messages, read as sentences.' },
          { href: '/forge/scars', label: 'The Scar Room', line: 'What broke, and why it was allowed to.' },
        ]}
      />
    </main>
  );
}
