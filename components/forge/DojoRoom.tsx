'use client';

/**
 * 🥋 The Dojo — /forge/dojo
 *
 * The door that stood shut on the threshold since August, opened without the
 * JarvisOS bridge it was waiting for: the drills are the Scar Room's own
 * incidents, turned round (see `lib/data/forge-drills.ts`). You get the symptom
 * the way it arrived, you commit to a cause, and only then are you told.
 *
 * ── DECISIONS ─────────────────────────────────────────────────────────────────
 * - **All eight drills are on the page at once**, stacked, rather than one per
 *   screen. Deep links from the Scar Room (`/forge/dojo#payfast-signature`)
 *   then work as plain anchors, and the symptoms reach search engines and
 *   readers with no JavaScript.
 * - **The explanations are not in the DOM until you answer.** A drill whose
 *   answer is one "view source" away is still a fair drill, but one whose
 *   answer is in the accessibility tree is not: a screen reader would read it
 *   out before the question.
 * - **Every option explains itself after you answer, not just the one you
 *   picked.** The wrong answers are where the teaching is.
 * - **Only the first answer counts, and it is remembered.** Stored in this
 *   browser only (`localStorage`, try/caught — private windows throw). Read in
 *   an effect, so the server render and the first client render agree, which is
 *   the rule from the hydration drill on this very page.
 * - **Analytics carry no free text**: the drill slug, right or wrong, whether
 *   the trace was read. That is all.
 */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Eye, RotateCcw, Check, X } from 'lucide-react';
import { track } from '@/lib/analytics';
import TexturedSection, { TEXTURES } from '@/components/ui/TexturedSection';
import RoomBackdrop from '@/components/room/RoomBackdrop';
import { PAGE_BACKDROPS } from '@/lib/house-assets';
import type { Drill } from '@/lib/data/forge-drills';
import { FadeUp, Figures, RoomHeader, Doors, GOLD, NAVY, ink } from './ForgeChrome';

const RIGHT = '#8FC79A';
const WRONG = '#D98C9F';
const STORE = 'forge-dojo-v1';
const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export interface DojoItem {
  drill: Drill;
  title: string;
  build: string;
  buildSlug?: string;
}

/** First answers, by scar slug. `hinted` = the trace was read before answering. */
type Answers = Record<string, { choice: number; hinted: boolean }>;

function load(): Answers {
  try {
    const raw = window.localStorage.getItem(STORE);
    return raw ? (JSON.parse(raw) as Answers) : {};
  } catch {
    return {};
  }
}

function save(a: Answers) {
  try {
    window.localStorage.setItem(STORE, JSON.stringify(a));
  } catch {
    // Storage blocked. The drills still work for this visit.
  }
}

/** Render `backtick` spans in the drill copy as inline code. */
function Prose({ text }: { text: string }) {
  const parts = text.split('`');
  return (
    <>
      {parts.map((p, i) =>
        i % 2 ? (
          <code key={i} className="rounded px-1.5 py-0.5 font-mono text-[0.86em]" style={{ background: 'rgba(201,148,58,0.12)', color: '#F0D9A8' }}>
            {p}
          </code>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

export default function DojoRoom({ items, figures }: { items: DojoItem[]; figures: { value: string; label: string }[] }) {
  const [answers, setAnswers] = useState<Answers>({});
  const [hints, setHints] = useState<Record<string, boolean>>({});
  const wasComplete = useRef(false);

  useEffect(() => {
    const stored = load();
    wasComplete.current = items.every((it) => stored[it.drill.scar]);
    setAnswers(stored);
  }, [items]);

  const answered = items.filter((it) => answers[it.drill.scar]).length;
  const right = items.filter((it) => {
    const a = answers[it.drill.scar];
    return a && it.drill.options[a.choice]?.correct;
  }).length;
  const done = answered === items.length;

  const answer = (it: DojoItem, choice: number) => {
    const slug = it.drill.scar;
    if (answers[slug]) return;
    const hinted = !!hints[slug];
    const next = { ...answers, [slug]: { choice, hinted } };
    setAnswers(next);
    save(next);
    track('forge_drill_answer', { drill: slug, correct: !!it.drill.options[choice]?.correct, hinted });

    if (!wasComplete.current && items.every((x) => next[x.drill.scar])) {
      wasComplete.current = true;
      const score = items.filter((x) => x.drill.options[next[x.drill.scar].choice]?.correct).length;
      track('forge_dojo_complete', { score, of: items.length });
    }
  };

  const reset = () => {
    setAnswers({});
    setHints({});
    wasComplete.current = false;
    save({});
    document.getElementById('drill-1')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main className="min-h-screen" style={{ background: NAVY, color: '#F5F0E8' }}>
      {/* ═══ HEADER ══════════════════════════════════════════════════════════ */}
      <section className="relative -mt-20 flex min-h-[70vh] items-end overflow-hidden px-6 pb-20 pt-40">
        <RoomBackdrop image={PAGE_BACKDROPS.forge} wash="#0B1A1A" intensity={0.8} veil={0.56} />
        <RoomHeader
          kicker="A room in the Forge"
          title="The Dojo"
          standfirst="Here is the symptom, exactly as it arrived. What is the cause?"
          note={
            <>
              Eight real incidents from the Scar Room, turned round. Commit to an answer before you are told —
              that is the whole exercise.
            </>
          }
        />
      </section>

      <Figures items={figures} />

      {/* ═══ THE BELT — score and a way through ══════════════════════════════ */}
      <div className="sticky top-16 z-20 border-b px-6 py-3 backdrop-blur-md md:top-20" style={{ borderColor: 'rgba(201,148,58,0.18)', background: 'rgba(10,17,40,0.86)' }}>
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <nav aria-label="Drills" className="flex items-center gap-1.5">
            {items.map((it, i) => {
              const a = answers[it.drill.scar];
              const ok = a && it.drill.options[a.choice]?.correct;
              return (
                <a
                  key={it.drill.scar}
                  href={`#${it.drill.scar}`}
                  aria-label={`Drill ${i + 1}${a ? (ok ? ', answered correctly' : ', answered incorrectly') : ''}`}
                  className="flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[9px] transition-transform hover:scale-110"
                  style={{
                    borderColor: a ? (ok ? RIGHT : WRONG) : ink(0.22),
                    background: a ? (ok ? 'rgba(143,199,154,0.18)' : 'rgba(217,140,159,0.16)') : 'transparent',
                    color: a ? (ok ? RIGHT : WRONG) : ink(0.5),
                  }}
                >
                  {i + 1}
                </a>
              );
            })}
          </nav>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: ink(0.55) }} aria-live="polite">
            {answered ? (
              <>
                <span style={{ color: GOLD }}>{right}</span> of {answered} right
              </>
            ) : (
              `${items.length} drills`
            )}
          </p>
        </div>
      </div>

      {/* ═══ THE DRILLS ══════════════════════════════════════════════════════ */}
      <TexturedSection texture={TEXTURES.regalNavy} tone="navy" className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-20 md:space-y-28">
          {items.map((it, i) => {
            const d = it.drill;
            const a = answers[d.scar];
            const hint = hints[d.scar] || a?.hinted;
            const ok = a && d.options[a.choice]?.correct;
            return (
              <article key={d.scar} id={d.scar} className="scroll-mt-40">
                <span id={`drill-${i + 1}`} className="block scroll-mt-40" aria-hidden />
                <FadeUp>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="font-mono text-[11px] tracking-widest" style={{ color: GOLD }}>
                      Drill {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.2em]" style={{ color: ink(0.4) }}>
                      {it.build}
                    </span>
                  </div>

                  <h2 className="sr-only">Drill {i + 1}: the symptom</h2>
                  <p className="mt-5 font-display text-2xl italic leading-[1.35] text-white md:text-[1.9rem]">
                    <Prose text={d.symptom} />
                  </p>
                </FadeUp>

                {/* The trace — held back until asked for. */}
                <FadeUp>
                  <div className="mt-7">
                    {hint ? (
                      <div className="rounded-xl border px-5 py-4" style={{ borderColor: 'rgba(201,148,58,0.22)', background: 'rgba(0,0,0,0.28)' }}>
                        <p className="font-mono text-[9.5px] uppercase tracking-[0.22em]" style={{ color: ink(0.42) }}>
                          The trace
                        </p>
                        <p className="mt-2 text-[15px] font-light leading-[1.8]" style={{ color: ink(0.8) }}>
                          <Prose text={d.trace} />
                        </p>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setHints((h) => ({ ...h, [d.scar]: true }))}
                        className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] underline decoration-dotted underline-offset-4 transition-opacity hover:opacity-70"
                        style={{ color: GOLD }}
                      >
                        <Eye className="h-3.5 w-3.5" /> Read the trace first
                      </button>
                    )}
                  </div>
                </FadeUp>

                {/* The options. */}
                <FadeUp>
                  <fieldset className="mt-9">
                    <legend className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: ink(0.45) }}>
                      What is the cause?
                    </legend>
                    <div className="mt-4 space-y-3">
                      {d.options.map((o, j) => {
                        const chosen = a?.choice === j;
                        const tone = !a ? null : o.correct ? RIGHT : chosen ? WRONG : null;
                        return (
                          <div key={j}>
                            <button
                              type="button"
                              onClick={() => answer(it, j)}
                              disabled={!!a}
                              aria-pressed={chosen}
                              className="group flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-colors enabled:hover:bg-[#121c3d] md:p-5"
                              style={{
                                borderColor: tone ?? ink(a ? 0.08 : 0.16),
                                background: tone ? `${tone}14` : 'rgba(255,255,255,0.02)',
                                opacity: a && !tone ? 0.62 : 1,
                              }}
                            >
                              <span
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[11px]"
                                style={{ borderColor: tone ?? ink(0.28), color: tone ?? ink(0.6) }}
                              >
                                {a && o.correct ? <Check className="h-3.5 w-3.5" /> : a && chosen ? <X className="h-3.5 w-3.5" /> : LETTERS[j]}
                              </span>
                              <span className="pt-0.5 text-[15.5px] font-light leading-relaxed" style={{ color: ink(0.88) }}>
                                <Prose text={o.text} />
                              </span>
                            </button>
                            {a ? (
                              <p className="mt-2 pl-[3.25rem] text-[14px] font-light leading-[1.75] md:pl-[3.5rem]" style={{ color: ink(o.correct ? 0.82 : 0.58) }}>
                                {o.correct ? <strong className="font-medium" style={{ color: RIGHT }}>The cause. </strong> : chosen ? <strong className="font-medium" style={{ color: WRONG }}>Not this. </strong> : null}
                                <Prose text={o.why} />
                              </p>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </fieldset>
                </FadeUp>

                {a ? (
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6" style={{ borderColor: ink(0.08) }} role="status">
                    <p className="font-display text-lg italic" style={{ color: ok ? RIGHT : ink(0.75) }}>
                      {ok ? (a.hinted ? 'Found it, with the trace.' : 'Found it, cold.') : 'Most people guess the same way the first time.'}
                    </p>
                    <div className="flex flex-wrap items-center gap-5">
                      <Link
                        href={`/forge/scars#${d.scar}`}
                        className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] underline decoration-dotted underline-offset-4 hover:opacity-70"
                        style={{ color: GOLD }}
                      >
                        The full postmortem <ArrowUpRight className="h-3 w-3" />
                      </Link>
                      {i < items.length - 1 ? (
                        <a href={`#${items[i + 1].drill.scar}`} className="font-mono text-[10px] uppercase tracking-[0.18em] hover:opacity-70" style={{ color: ink(0.6) }}>
                          Next drill ↓
                        </a>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </TexturedSection>

      {/* ═══ THE RESULT ══════════════════════════════════════════════════════ */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeUp>
            {done ? (
              <div className="rounded-2xl border p-8 md:p-10" style={{ borderColor: 'rgba(201,148,58,0.3)', background: 'rgba(201,148,58,0.05)' }}>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: GOLD }}>
                  The result
                </p>
                <p className="mt-4 font-display text-4xl font-bold italic text-white md:text-5xl">
                  {right} of {items.length}
                </p>
                <p className="mt-4 max-w-xl text-[15px] font-light leading-[1.8]" style={{ color: ink(0.65) }}>
                  Every one of these was found by the engineer who built the system, usually late, and usually
                  after one wrong guess. The score isn&rsquo;t the point. Look at which wrong answers you picked:
                  they&rsquo;re the hypotheses you reach for first.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-7 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] underline decoration-dotted underline-offset-4 hover:opacity-70"
                  style={{ color: ink(0.55) }}
                >
                  <RotateCcw className="h-3 w-3" /> Clear my answers
                </button>
              </div>
            ) : (
              <p className="font-display text-xl italic leading-relaxed md:text-2xl" style={{ color: ink(0.78) }}>
                Two of these drills are the same bug in different systems. If you spot which two, you&rsquo;ve
                learned the only thing the Scar Room thinks is worth generalising.
              </p>
            )}
          </FadeUp>
        </div>
      </section>

      <Doors
        doors={[
          { href: '/forge/scars', label: 'The Scar Room', line: 'The same incidents, played back in full.' },
          { href: '/forge/floor', label: 'The Workshop Floor', line: 'The builds these came out of.' },
          { href: '/forge', label: 'The Forge', line: 'Back to the threshold.' },
        ]}
      />
    </main>
  );
}
