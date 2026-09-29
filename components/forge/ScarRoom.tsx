'use client';

/**
 * 🩹 The Scar Room — /forge/scars
 *
 * `docs/THE_FORGE.md` §5.5. The highest-trust room on the site, and the only one
 * mirembemuse could never host, because a services site cannot admit failure.
 *
 * Two design rules, both of which are really editorial rules:
 *
 * 1. **Every entry answers the same five questions in the same order** — what
 *    broke, how it was found, the cause, the fix, what it cost. A postmortem
 *    that reorders itself per incident is an anecdote. The fixed order is what
 *    lets a reader skim to `cause` on the third one and still understand it.
 *
 * 2. **No moral at the end.** The spec is explicit: "The absence of a lesson is
 *    the point — some nights are just expensive." Where something generalises it
 *    is said inside the cause, in that entry's own words, rather than bolted on
 *    as a takeaway to every one of them.
 *
 * The room ships nine entries and does not pad to twenty (§9 Q6).
 *
 * ⚠️ Props only — no corpus import.
 */

import { useEffect, useRef } from 'react';
import Stock from '@/components/ui/Stock';
import { PhotoBleed } from '@/components/ui/Ground';
import Link from 'next/link';
import { ArrowUpRight, PenLine } from 'lucide-react';
import { track } from '@/lib/analytics';
import { PAGE_BACKDROPS } from '@/lib/house-assets';
import type { Scar } from '@/lib/data/forge-scars';
import { FadeUp, Figures, RoomHeader, Doors, Artefact, GOLD, NAVY, ink, GOLD_INK, CARD } from './ForgeChrome';
import IncidentReplay from './IncidentReplay';

/** The room's own colour. Not the wing's gold — a scar is not a highlight. */
const WOUND = '#8B1E3F';
/** The wound, as text: pink on navy, deep cherry on paper (app/stock.css). */
const WOUND_INK = 'var(--cherry-ink)';

const STEPS: { key: keyof Pick<Scar, 'broke' | 'found' | 'cause' | 'fix' | 'cost'>; label: string }[] = [
  { key: 'broke', label: 'What broke' },
  { key: 'found', label: 'How it was found' },
  { key: 'cause', label: 'The actual cause' },
  { key: 'fix', label: 'The fix' },
  { key: 'cost', label: 'What it cost' },
];

/**
 * Which postmortems actually get read.
 *
 * A long single-page room reports one pageview whether somebody read the first
 * entry or all nine, so scroll depth is the only honest engagement signal here.
 * Each article reports once, the first time half of it is on screen — an
 * observer rather than a scroll listener, so it costs nothing on a phone, and
 * it disconnects itself after firing so a reader scrolling back up does not
 * inflate the count.
 */
function useScarReadTracking(slugs: string[]) {
  const fired = useRef<Set<string>>(new Set());
  // `slugs` is a fresh array on every render, so depending on it directly would
  // tear down and rebuild the observer each time. The list is static in
  // practice; key the effect on its contents rather than its identity.
  const key = slugs.join('|');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const list = key.split('|').filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const slug = entry.target.id;
          if (!entry.isIntersecting || fired.current.has(slug)) continue;
          fired.current.add(slug);
          track('forge_scar_read', { scar: slug, position: list.indexOf(slug) + 1 });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    for (const slug of list) {
      const el = document.getElementById(slug);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [key]);
}

export default function ScarRoom({ scars, figures }: { scars: Scar[]; figures: { value: string; label: string }[] }) {
  useScarReadTracking(scars.map((s) => s.slug));

  return (
    <main className="stock-parchment min-h-screen">
      {/* ═══ HEADER ══════════════════════════════════════════════════════════ */}
      <PhotoBleed image="vault/12676734d8ed" ground="midnight" focus="50% 40%" from="left" minH="74vh" className="stock-navy -mt-20 px-6 pb-20 pt-40">
        <RoomHeader
          kicker="A room in the Forge"
          title="The Scar Room"
          standfirst="What broke, how it was found, the reason the system allowed it, and what the night cost."
          note={
            <>
              Nine of them, each played back in the order it happened, with the cause withheld until you step
              to it. There were more; the room does not pad.
            </>
          }
        />
      </PhotoBleed>

      <Figures items={figures} />

      {/* ═══ THE INDEX ═══════════════════════════════════════════════════════ */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <FadeUp>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: WOUND_INK }}>
              In this room
            </p>
          </FadeUp>
          <ol className="mt-8 space-y-px overflow-hidden rounded-xl border" style={{ borderColor: 'rgba(139,30,63,0.34)', background: 'rgba(139,30,63,0.3)' }}>
            {scars.map((s, i) => (
              <FadeUp key={s.slug} delay={Math.min(i * 0.03, 0.24)}>
                <li>
                  <a href={`#${s.slug}`} className="group block">
                    <div className="flex items-baseline gap-5 p-5 transition-colors group-hover:bg-[var(--stock)] md:p-6" style={{ background: CARD }}>
                      <span className="font-mono text-[11px] tracking-widest" style={{ color: WOUND_INK }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h2 className="font-display text-lg italic leading-snug t-head md:text-xl">{s.title}</h2>
                        <p className="mt-1.5 text-[13.5px] font-light leading-relaxed" style={{ color: ink(0.55) }}>
                          {s.summary}
                        </p>
                      </div>
                      <span className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] md:block" style={{ color: ink(0.34) }}>
                        {s.build}
                      </span>
                    </div>
                  </a>
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══ THE ENTRIES ═════════════════════════════════════════════════════ */}
      <Stock paper="bone" className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-24 md:space-y-32">
          {scars.map((s, i) => (
            <article key={s.slug} id={s.slug} className="scroll-mt-28">
              <FadeUp>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="font-mono text-[11px] tracking-widest" style={{ color: WOUND_INK }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {s.buildSlug ? (
                    <Link href={`/forge/floor/${s.buildSlug}`} className="font-mono text-[10.5px] uppercase tracking-[0.2em] underline decoration-dotted underline-offset-4 transition-opacity hover:opacity-70" style={{ color: GOLD_INK }}>
                      {s.build}
                    </Link>
                  ) : (
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.2em]" style={{ color: GOLD_INK }}>
                      {s.build}
                    </span>
                  )}
                  {s.when ? (
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.2em]" style={{ color: ink(0.36) }}>
                      {s.when}
                    </span>
                  ) : null}
                  {s.written ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em]" style={{ background: 'rgba(201,148,58,0.12)', color: GOLD_INK }}>
                      <PenLine className="h-2.5 w-2.5" /> written for this room
                    </span>
                  ) : null}
                </div>

                <h2 className="mt-5 font-display text-3xl font-bold italic leading-[1.08] t-head md:text-[2.75rem]">
                  {s.title}
                </h2>
              </FadeUp>

              {!s.essay ? (
                <FadeUp>
                  <IncidentReplay scar={s} wound={WOUND} woundInk={WOUND_INK} />
                </FadeUp>
              ) : (
              <div className="mt-10 space-y-8">
                {STEPS.map((step) => (
                  <FadeUp key={step.key}>
                    <div className="grid gap-2 md:grid-cols-[9.5rem_1fr] md:gap-7">
                      <h3
                        className="pt-1 font-mono text-[10px] uppercase tracking-[0.22em]"
                        style={{ color: step.key === 'cause' ? WOUND_INK : ink(0.38) }}
                      >
                        {step.label}
                      </h3>
                      <p
                        className="text-[16px] font-light leading-[1.85]"
                        style={{ color: step.key === 'cause' ? ink(0.92) : ink(0.72) }}
                      >
                        {s[step.key]}
                      </p>
                    </div>
                  </FadeUp>
                ))}

                {s.code ? (
                  <FadeUp>
                    <div className="md:pl-[10.5rem]">
                      <Artefact label="the artefact">{s.code}</Artefact>
                    </div>
                  </FadeUp>
                ) : null}
              </div>
              )}

              {!s.essay ? (
                <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: ink(0.36) }}>
                  Think you could have found it?{' '}
                  <Link href={`/forge/dojo#${s.slug}`} className="underline decoration-dotted underline-offset-4 transition-opacity hover:opacity-70" style={{ color: GOLD_INK }}>
                    It&rsquo;s a drill in the Dojo
                  </Link>
                </p>
              ) : null}

              <div className="mt-14 h-px w-full" style={{ background: 'linear-gradient(90deg, rgba(139,30,63,0.5), rgba(139,30,63,0))' }} />
            </article>
          ))}
        </div>
      </Stock>

      {/* ═══ CLOSING NOTE ════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            <p className="font-display text-xl italic leading-relaxed md:text-2xl" style={{ color: ink(0.82) }}>
              Two of these are the same bug in different systems: a job that fails by succeeding at nothing.
            </p>
            <p className="mt-6 text-[15.5px] font-light leading-[1.85]" style={{ color: ink(0.62) }}>
              Six workers resolved the wrong owner and reported success for a month. An ingest lost a whole
              journal to one timeout and wrote a smaller file without complaint. Neither raised an error,
              because neither had failed — and a system that cannot tell the difference between doing nothing
              and having nothing to do is not monitored, however much monitoring is pointed at it. That is the
              only thing in this room that is worth generalising, and it took two separate expensive months to
              see it.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="mt-12 rounded-xl border p-6" style={{ borderColor: ink(0.1), background: 'rgb(var(--ink-rgb) / 0.02)' }}>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: ink(0.4) }}>
                On what is not here
              </p>
              <p className="mt-3 text-[14.5px] font-light leading-[1.8]" style={{ color: ink(0.62) }}>
                The build journals hold sixty-five sections of security work that this room will never carry.
                The applications are still running, and a detailed account of a hole that was closed is a map
                for the copy that has not been updated. The essay above{' '}
                <a href="#security-posture" className="underline decoration-dotted underline-offset-4 hover:opacity-80" style={{ color: GOLD_INK }}>
                  says what can honestly be said instead
                </a>
                : all of them were the same mistake, and the fix was always to move the rule down a layer.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <Doors
        doors={[
          { href: '/forge/floor', label: 'The Workshop Floor', line: 'The builds these came out of.' },
          { href: '/forge/nights', label: 'The Long Night', line: 'The nights, in the order they happened.' },
          { href: '/forge', label: 'The Forge', line: 'Back to the threshold.' },
        ]}
      />
    </main>
  );
}
