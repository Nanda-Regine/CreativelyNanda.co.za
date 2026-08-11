'use client';

/**
 * 🧱 The Commit Wall — /forge/commits
 *
 * `docs/THE_FORGE.md` §5.6 files this room as **Phase B**, blocked on a private
 * database bridge, on the grounds that the prose corpus only yields 44 SHAs.
 * That premise was wrong: the commits are in GitHub, and a read-only token
 * reads them. `scripts/forge-github.mjs` pulls them, gates them and commits the
 * result, so the room ships in Phase A and the site never holds a credential for
 * anything private.
 *
 * ── THE ROOM'S ARGUMENT ───────────────────────────────────────────────────────
 * Three thousand commits is a log file. The wall shows the fraction of them that
 * are sentences — a subject, a verb, and a turn — because that is the only part
 * that reads as writing rather than as bookkeeping. The header states the true
 * total, so a selection is being shown and said to be a selection.
 *
 * ⚠️ Props only. `lib/data/forge-github.json` is small and already gated, but it
 * is still read on the server so that both data sources are joined in one place.
 */

import { useState, useMemo } from 'react';
import TexturedSection, { TEXTURES } from '@/components/ui/TexturedSection';
import RoomBackdrop from '@/components/room/RoomBackdrop';
import { PAGE_BACKDROPS } from '@/lib/house-assets';
import { track } from '@/lib/analytics';
import { FadeUp, Figures, RoomHeader, Doors, GOLD, NAVY, ink } from './ForgeChrome';

export interface WallRow {
  build: string;
  title: string;
  date: string;
  /** Precomputed on the server. Nothing here formats a date. */
  when: string;
  sha: string;
  /** The conventional-commit prefix, stripped off. */
  prefix: string | null;
  /** The sentence itself. */
  line: string;
  accent: string;
}

export interface CommitWallProps {
  rows: WallRow[];
  builds: { key: string; title: string; commits: number; accent: string; kept: number }[];
  figures: { value: string; label: string }[];
  languages: { name: string; pct: number }[];
  activity: number[];
  totalCommits: string;
  generatedAt: string;
  withheld: string;
}

export default function CommitWall({
  rows,
  builds,
  figures,
  languages,
  activity,
  totalCommits,
  generatedAt,
  withheld,
}: CommitWallProps) {
  const [filter, setFilter] = useState<string | null>(null);
  const shown = useMemo(() => (filter ? rows.filter((r) => r.build === filter) : rows), [rows, filter]);
  const peak = Math.max(1, ...activity);

  return (
    <main className="min-h-screen" style={{ background: NAVY, color: '#F5F0E8' }}>
      {/* ═══ HEADER ══════════════════════════════════════════════════════════ */}
      <section className="relative -mt-20 flex min-h-[74vh] items-end overflow-hidden px-6 pb-20 pt-40">
        <RoomBackdrop image={PAGE_BACKDROPS.forge} wash="#0A1128" intensity={0.86} veil={0.5} />
        <RoomHeader
          kicker="A room in the Forge"
          title="The Commit Wall"
          standfirst="Commit messages, read as sentences — because most of hers are."
          note={
            <>
              {totalCommits} commits across twelve repositories. This wall holds {rows.length} of them: the ones
              that are a sentence rather than a label, scored for having a subject, a verb and a turn. The rest
              are real work and unremarkable prose, which is what most commits are and should be.
            </>
          }
        />
      </section>

      <Figures items={figures} />

      {/* ═══ THE YEAR + LANGUAGES ════════════════════════════════════════════ */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <FadeUp>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: GOLD }}>
              Fifty-two weeks
            </p>
            <div className="mt-6 flex h-20 items-end gap-[3px]" aria-hidden>
              {activity.map((n, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${Math.max(2, (n / peak) * 100)}%`,
                    background: GOLD,
                    opacity: n === 0 ? 0.12 : 0.32 + (n / peak) * 0.68,
                  }}
                />
              ))}
            </div>
            <p className="mt-4 text-[14px] font-light leading-relaxed" style={{ color: ink(0.55) }}>
              Commits per week, summed across every repository. Read from the GitHub API on {generatedAt} and
              committed as data — the site does not call GitHub while serving a page, so this cannot fail in
              production and cannot silently drift.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: GOLD }}>
              By language
            </p>
            <ul className="mt-6 space-y-3">
              {languages.slice(0, 5).map((l) => (
                <li key={l.name}>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-mono text-[12px]" style={{ color: ink(0.82) }}>{l.name}</span>
                    <span className="font-mono text-[11px]" style={{ color: GOLD }}>{l.pct}%</span>
                  </div>
                  <div className="mt-1.5 h-px w-full" style={{ background: ink(0.1) }}>
                    <div className="h-px" style={{ width: `${Math.max(1, l.pct)}%`, background: GOLD }} />
                  </div>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* ═══ THE WALL ════════════════════════════════════════════════════════ */}
      <TexturedSection texture={TEXTURES.regalNavy} tone="navy" className="px-6 py-16 md:py-24">
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
                Everything
              </button>
              {builds.map((b) => {
                const on = filter === b.key;
                return (
                  <button
                    key={b.key}
                    onClick={() => {
                      setFilter(on ? null : b.key);
                      if (!on) track('forge_filter', { room: 'commits', build: b.key });
                    }}
                    className="rounded-full border px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.18em] transition-colors"
                    style={{
                      borderColor: on ? b.accent : 'rgba(245,240,232,0.14)',
                      background: on ? `${b.accent}22` : 'transparent',
                      color: on ? b.accent : ink(0.55),
                    }}
                  >
                    {b.title} <span style={{ opacity: 0.6 }}>{b.kept}</span>
                  </button>
                );
              })}
            </div>
          </FadeUp>

          <div className="mt-12 space-y-7">
            {shown.map((r, i) => (
              <FadeUp key={`${r.sha}-${i}`} delay={Math.min(i * 0.02, 0.3)} y={14}>
                <figure className="group border-l-2 pl-6 transition-colors" style={{ borderColor: `${r.accent}55` }}>
                  <blockquote>
                    <p className="font-display text-xl italic leading-[1.45] text-white md:text-[1.6rem]">
                      {r.line}
                    </p>
                  </blockquote>
                  <figcaption className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: ink(0.38) }}>
                    <span style={{ color: r.accent, opacity: 0.85 }}>{r.title}</span>
                    <span>{r.when}</span>
                    {r.prefix ? <span>{r.prefix}</span> : null}
                    <span style={{ color: ink(0.24) }}>{r.sha}</span>
                  </figcaption>
                </figure>
              </FadeUp>
            ))}
          </div>

          {shown.length === 0 ? (
            <p className="py-16 text-center font-display text-xl italic" style={{ color: ink(0.5) }}>
              Nothing on the wall from that build — its commit messages are labels, not sentences.
            </p>
          ) : null}
        </div>
      </TexturedSection>

      {/* ═══ HOW THE WALL WAS BUILT ══════════════════════════════════════════ */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: GOLD }}>
              How this wall was built
            </p>
            <h2 className="mt-5 font-display text-2xl font-bold italic leading-tight text-white md:text-3xl">
              Nine of these repositories are private.
            </h2>
            <p className="mt-6 text-[15.5px] font-light leading-[1.85]" style={{ color: ink(0.7) }}>
              So every line above passed the same gate as the build journals before it reached this page. A
              credential shape drops the message entirely rather than redacting it — a subject line is one
              sentence and there is nothing left worth reading. A live security disclosure drops, because those
              applications are still running. A named individual drops. Ordinary engineering vocabulary does
              not: <span className="font-mono text-[13px]" style={{ color: ink(0.85) }}>RLS</span>,{' '}
              <span className="font-mono text-[13px]" style={{ color: ink(0.85) }}>passphrase</span> and{' '}
              <span className="font-mono text-[13px]" style={{ color: ink(0.85) }}>token</span> are what the work
              is made of, and an earlier version of this filter threw all of them away.
            </p>
            <p className="mt-5 text-[15.5px] font-light leading-[1.85]" style={{ color: ink(0.7) }}>
              {withheld} messages were withheld by a safety rule. The ingest can print every one of them with the
              rule that caught it, which is how the{' '}
              <a href="/forge/scars#the-filter-that-deleted-the-room" className="underline decoration-dotted underline-offset-4 hover:opacity-80" style={{ color: GOLD }}>
                filter that was deleting the room
              </a>{' '}
              was found — a regex that looked strict and was quietly discarding four out of every five good
              lines. A filter nobody can inspect is a filter nobody should trust.
            </p>
          </FadeUp>
        </div>
      </section>

      <Doors
        doors={[
          { href: '/forge/nights', label: 'The Long Night', line: 'The same year, night by night.' },
          { href: '/forge/floor', label: 'The Workshop Floor', line: 'What all of it was for.' },
          { href: '/forge/scars', label: 'The Scar Room', line: 'The commits that came after something broke.' },
        ]}
      />
    </main>
  );
}
