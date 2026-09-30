/**
 * An imprint's own page: Essays at /blog/writing, Field Notes at /blog/dev.
 * Server component. The pieces are grouped by the issue they appeared in,
 * newest first, so the imprint reads as a run of a publication rather than
 * a feed.
 */

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getPressCards } from '@/lib/press';
import { IMPRINT_BY_CATEGORY, ISSUES, issueLabel, PRESS_NAME } from '@/lib/data/press-issues';
import Stock, { rhythm } from '@/components/ui/Stock';

const NAVY = '#0A1128';
const GOLD = '#C9943A';
const ROSE = '#6B0F20';
const CREAM = '#F5F0E8';

const fmt = (d: string | null) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : '';

export default async function ImprintIndex({ category }: { category: string }) {
  const imprint = IMPRINT_BY_CATEGORY[category];
  const pieces = (await getPressCards()).filter((p) => p.category === category);
  const groups = [...ISSUES]
    .reverse()
    .map((i) => ({ issue: i, pieces: pieces.filter((p) => p.issue?.number === i.number) }))
    .filter((g) => g.pieces.length);
  const unfiled = pieces.filter((p) => !p.issue);

  return (
    <div className="min-h-screen" style={{ background: CREAM }}>
      <header className="relative -mt-20 overflow-hidden" style={{ background: NAVY, color: CREAM }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(100% 80% at 10% -10%, ${ROSE}66, transparent 60%)` }} />
        <div className="relative z-10 mx-auto max-w-5xl px-6 pb-16 pt-36">
          <Link href="/blog" className="group inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.3em] transition-opacity hover:opacity-70" style={{ color: `${CREAM}b3` }}>
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" /> {PRESS_NAME}
          </Link>
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.35em]" style={{ color: GOLD }}>
            An imprint · {pieces.length} {pieces.length === 1 ? 'piece' : 'pieces'}
          </p>
          <h1 className="mt-4 font-display font-bold italic leading-[0.9]" style={{ fontSize: 'clamp(3.4rem, 11vw, 8rem)' }}>
            {imprint.name}
          </h1>
          <p className="mt-6 max-w-xl font-display text-xl italic leading-relaxed md:text-2xl" style={{ color: `${CREAM}cc` }}>
            {imprint.line}
          </p>
        </div>
        <div className="h-px w-full" style={{ background: `linear-gradient(to right, transparent, ${GOLD}90, transparent)` }} />
      </header>

      {/* Each issue on its own band: cherry, beige, navy in turn (the balance rule, Stock.tsx). */}
      <main>
          {[...groups, ...(unfiled.length ? [{ issue: null, pieces: unfiled }] : [])].map((g, gi) => (
            <Stock key={g.issue?.number ?? 'unfiled'} paper={rhythm(gi, 2)} className="px-6 py-16 md:py-20">
            <section className="mx-auto max-w-5xl">
              <div className="mb-8 flex items-baseline gap-4 border-b pb-3" style={{ borderColor: 'var(--rule)' }}>
                <span className="t-gold font-display text-4xl font-bold italic">
                  {g.issue ? String(g.issue.number).padStart(3, '0') : '·'}
                </span>
                <h2 className="t-head font-display text-xl italic">
                  {g.issue ? `${g.issue.title}, ${g.issue.dated}` : 'Before the issues'}
                </h2>
              </div>
              <ol className="space-y-10">
                {g.pieces.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.category}/${p.slug}`} className="group block md:grid md:grid-cols-[1fr_9rem] md:gap-10">
                      <div>
                        <h3 className="t-head font-display text-2xl leading-snug transition-opacity group-hover:opacity-70 md:text-3xl">
                          {p.title}
                        </h3>
                        {p.excerpt ? (
                          <p className="t-ink mt-2 max-w-2xl text-[15px] leading-relaxed">
                            {p.excerpt}
                          </p>
                        ) : null}
                      </div>
                      <p className="t-soft mt-3 font-mono text-[10px] uppercase tracking-[0.2em] md:mt-2 md:text-right">
                        {fmt(p.published_at)}
                        {p.reading_time ? <span className="t-cherry block">{p.reading_time} min</span> : null}
                      </p>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
            </Stock>
          ))}
          {!pieces.length ? (
            <Stock paper="cherry" className="px-6 py-20">
              <p className="t-ink mx-auto max-w-5xl font-display text-2xl italic">
                Nothing published under this imprint yet. {issueLabel(ISSUES[ISSUES.length - 1].number)} is in preparation.
              </p>
            </Stock>
          ) : null}
          {/* The close: back to the whole press, on cherry. */}
          <Stock paper="cherry" className="px-6 py-14">
            <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
              <p className="t-ink font-display text-xl italic">Every imprint, every issue, in one place.</p>
              <Link href="/blog" className="t-gold inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] hover:opacity-70">
                <ArrowLeft className="h-3.5 w-3.5" /> {PRESS_NAME}
              </Link>
            </div>
          </Stock>
      </main>
    </div>
  );
}
