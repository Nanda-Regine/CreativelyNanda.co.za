'use client';

/**
 * ⚙️ /forge — the threshold.
 *
 * ── REBUILT, AUGUST 2026 ──────────────────────────────────────────────────────
 *
 * The first version of this room was navy on navy on navy: `#0A1128` ground, a
 * navy-tinted backdrop at 0.4 veil, a navy texture behind the principles, and a
 * single gold hairline asked to carry all of it. Nanda's note was exact — the
 * scrim had become the main character, and the photography was nowhere.
 *
 * What changed:
 *
 * 1. **Real photographs, at full strength.** The hero is her at a laptop at
 *    night beside a printer; the rooms sit over a camping chair on a lawn under
 *    a palm. Both were in the archive the whole time. The page previously ran on
 *    a torn-paper texture and nothing else.
 * 2. **Five grounds, not one.** garden → bone → ink → parchment → midnight.
 *    Navy now appears once, at the end, as the closing colour rather than the
 *    paper — see `components/ui/Ground.tsx`.
 * 3. **The column breaks.** Offset figures, a rotated margin note, figures set
 *    at display scale, slanted section edges. See `components/ui/Editorial.tsx`.
 * 4. **The principles are a spread, not a list.** Nine numbered lines in a
 *    centred `<ol>` is a document. They are now set two-up on parchment with the
 *    numerals oversized, which is how a manifesto is actually printed.
 */

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Ground, { PhotoBleed, groundTokens } from '@/components/ui/Ground';
import { Reveal, OffsetFigure, BigFigure, PullQuote, Rule, MarginNote, VideoTile } from '@/components/ui/Editorial';
import { FAMILY } from '@/lib/data/asset-atlas';
import { THROUGHLINE } from '@/lib/data/forge-origins';

const ROOMS: { name: string; line: string; href?: string }[] = [
  { name: 'Where It Started', line: 'Nine foundation projects. The sequence is the argument.', href: '/forge/origins' },
  { name: 'The Workshop Floor', line: 'Every build, one dossier each — the problem, the decisions, the cost.', href: '/forge/floor' },
  { name: 'The Scar Room', line: 'What broke. How it was found. Why the system allowed it.', href: '/forge/scars' },
  { name: 'The Long Night', line: 'The diary. Night by night, newest first.', href: '/forge/nights' },
  { name: 'The Commit Wall', line: 'A year of commit messages, read as sentences.', href: '/forge/commits' },
  { name: 'The Making', line: 'The career feature — zero to eight live products in a year.', href: '/engineer' },
  { name: 'The Poet Who Codes', line: 'The doorway between this wing and the garden.', href: '/poetry/poet-who-codes' },
  { name: 'The Bench', line: 'Live vitals — apps breathing, deploys landing.' },
  { name: 'The Dojo', line: 'Drills. Guess the bug. Read the trace.' },
];

export interface ForgeStats {
  apps: number;
  words: number;
  sessions: number;
  projects: number;
  commits: string;
  repos: number;
}

export default function ForgeThreshold({ stats }: { stats: ForgeStats }) {
  const garden = groundTokens('garden');
  const bone = groundTokens('bone');
  const ink = groundTokens('ink');
  const parchment = groundTokens('parchment');
  const midnight = groundTokens('midnight');

  const [night, stoep, lawn, , lobby] = FAMILY.coding.ids;

  return (
    <main className="min-h-screen">
      {/* ═══ THE THRESHOLD — her, at 10pm, next to the printer ═══════════════ */}
      <PhotoBleed image={night} ground="garden" focus="60% 40%" from="bottom" minH="94vh" className="-mt-20 pt-28">
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20">
          <Reveal>
            {/* The garden accent (#E8B4C8) is a pale pink and vanished against
                the grey curtain behind her. On a photograph the kicker needs its
                own contrast, not the section's decorative colour. */}
            <p className="font-mono text-[11px] uppercase tracking-[0.35em]" style={{ color: '#FFD9A0' }}>
              A wing of the house
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              className="mt-5 font-display font-bold italic leading-[0.84]"
              style={{ fontSize: 'clamp(3.6rem, 15vw, 11rem)', color: '#FBF8F3', textShadow: '0 2px 40px rgba(0,0,0,0.45)' }}
            >
              The Forge
            </h1>
          </Reveal>

          {/* The standfirst sits off-axis, to the right of centre — the first
              signal that this page is set rather than stacked. */}
          <div className="mt-8 grid gap-8 md:grid-cols-12">
            <Reveal delay={0.2} className="md:col-span-6 md:col-start-6">
              <p className="font-display text-xl italic leading-relaxed md:text-3xl" style={{ color: '#FBF8F3' }}>
                The garden is where she writes. This is where she builds.
              </p>
              <p className="mt-6 max-w-xl text-[15px] font-light leading-relaxed md:text-base" style={{ color: 'rgba(251,248,243,0.82)' }}>
                Not a portfolio. A workshop — the drafts, the wrong turns, and the night something broke at two in
                the morning along with the reason it broke. Code here is a medium, the same way a poem is.
              </p>
            </Reveal>
          </div>
        </div>
      </PhotoBleed>

      {/* ═══ THE FIGURES — on bone, set as display objects ═══════════════════ */}
      <Ground ground="bone" className="px-6 py-20 md:py-28" edge="slant">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Rule label="Measured, not stated" accent={bone.accent} />
          </Reveal>

          <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-12">
            <div className="md:col-span-3">
              <BigFigure value={stats.commits} label="commits" accent={bone.accent} note="Read from the GitHub API when the site is built, across twelve repositories." />
            </div>
            <div className="md:col-span-3 md:pt-16">
              <BigFigure value={String(stats.apps)} label="builds journalled" accent={bone.accent} />
            </div>
            <div className="md:col-span-3">
              <BigFigure value={`${Math.round(stats.words / 1000)}k`} label="words of build journal" accent={bone.accent} note="Longer than the poetry collection." />
            </div>
            <div className="md:col-span-3 md:pt-16">
              <BigFigure value={String(stats.projects)} label="foundation projects" accent={bone.accent} />
            </div>
          </div>
        </div>
      </Ground>

      {/* ═══ WHERE THE WORK HAPPENS — photographs carry this section ═════════ */}
      <Ground ground="ink" className="px-6 py-24 pb-16 md:py-32 md:pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <OffsetFigure
                image={stoep}
                alt="Working on a stoep overlooking a garden and fountain"
                caption="The office is a camping chair, a stoep, a hotel lobby, and a desk beside a printer at ten at night."
                bleed="left"
                ratio="4 / 5"
              />
            </div>

            <div className="relative md:col-span-6 md:col-start-7 md:pt-20">
              <Reveal>
                <Rule label="Where it happens" accent={ink.accent} />
                <h2 className="mt-7 font-display font-bold italic leading-[1.05]" style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}>
                  There is no studio.
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-6 text-[16px] font-light leading-[1.85]" style={{ color: `${ink.ink}B8` }}>
                  Eight products, three thousand commits, and not one of them written in an office. The photographs
                  on this page are the actual working conditions: a laptop on a camp chair in the middle of a lawn,
                  a stoep with a view of a fountain, a hotel lobby between other things, a printer and a notebook at
                  an hour when nobody replies to anything.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-5 text-[16px] font-light leading-[1.85]" style={{ color: `${ink.ink}B8` }}>
                  It matters because it is the constraint the whole practice is shaped around. Load shedding is not
                  a translation string here. Mobile data has a price. A build that assumes a stable desk and a fast
                  line is a build for somewhere else.
                </p>
              </Reveal>

              <MarginNote accent={ink.accent} side="right">
                Every number in this wing is measured from the repositories at build time — never typed into a
                sentence and left to drift.
              </MarginNote>
            </div>
          </div>

          {/* Two large plates and a tall clip, un-levelled. The first version
              used three small tiles in a 12-column grid, which left the row
              short and a slab of dead ground underneath it. Bigger images, less
              gutter, and the section closes right after. */}
          <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-24 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-5">
              <OffsetFigure image={lawn} alt="A laptop on a camping chair on a lawn under a palm tree" ratio="4 / 3" bleed="right" parallax={false} />
            </div>
            <div className="md:col-span-3 md:pt-14">
              <VideoTile id="work/learning-to-code" label="learning to code" ratio="9 / 16" />
            </div>
            <div className="sm:col-span-2 md:col-span-4 md:pt-4">
              <OffsetFigure
                image={FAMILY.screens.ids[0]}
                alt="Code on screen, lit magenta"
                ratio="4 / 3"
                bleed="right"
                parallax={false}
                caption="Two in the morning, and the compiler is the only thing still answering."
              />
            </div>
          </div>
        </div>
      </Ground>

      {/* ═══ THE PRINCIPLES — a spread on parchment ══════════════════════════ */}
      <Ground ground="parchment" className="px-6 py-24 md:py-32" edge="slant-reverse">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: parchment.accent }}>
              Carved into the wall
            </p>
            <h2 className="mt-4 max-w-3xl font-display font-bold italic leading-[1.02]" style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)' }}>
              Nine principles, learned the expensive way.
            </h2>
          </Reveal>

          {/* Two columns, numerals oversized and set outside the text. */}
          <ol className="mt-16 grid gap-x-14 gap-y-10 md:grid-cols-2">
            {THROUGHLINE.map((line, i) => (
              <Reveal key={line} delay={Math.min(i * 0.05, 0.4)}>
                <li className="flex items-start gap-5 border-t pt-5" style={{ borderColor: `${parchment.ink}1F` }}>
                  <span
                    className="shrink-0 font-display font-bold italic leading-none"
                    style={{ color: parchment.accent, fontSize: 'clamp(2rem, 4vw, 3rem)', opacity: 0.55 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-lg italic leading-snug md:text-xl">{line}</span>
                </li>
              </Reveal>
            ))}
          </ol>

          <div className="mt-4 md:-mb-6">
            <PullQuote accent={parchment.accent} attribution="The rule this whole wing is built on">
              If a room starts arguing for her, it belongs on the other site.
            </PullQuote>
          </div>
        </div>
      </Ground>

      {/* ═══ THE ROOMS — navy, once, at the close ════════════════════════════ */}
      {/* The code shot behind this section is texture, not reading matter — the
          first pass ran a transcript legible enough to compete with the copy.
          The magenta plate reads as colour and grain at this veil. */}
      <Ground ground="midnight" image={FAMILY.screens.ids[0]} veil={0.55} focus="30% 60%" parallax className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: midnight.accent }}>
              The rooms
            </p>
            <h2 className="mt-4 max-w-2xl font-display font-bold italic leading-[1.05]" style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)' }}>
              Nine doors. Seven of them open.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border md:grid-cols-3" style={{ borderColor: `${midnight.accent}33`, background: `${midnight.accent}26` }}>
            {ROOMS.map((r, i) => {
              const inner = (
                <div className="flex h-full flex-col p-7 transition-colors" style={{ background: midnight.bg }}>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl italic md:text-2xl" style={{ color: midnight.ink }}>{r.name}</h3>
                    {r.href ? (
                      <ArrowUpRight className="h-4 w-4 shrink-0" style={{ color: midnight.accent }} />
                    ) : (
                      <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: `${midnight.ink}4D` }}>
                        in the fire
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-light leading-relaxed" style={{ color: r.href ? `${midnight.ink}AD` : `${midnight.ink}59` }}>
                    {r.line}
                  </p>
                </div>
              );
              return (
                <Reveal key={r.name} delay={Math.min(i * 0.04, 0.3)} className="h-full">
                  {r.href ? (
                    <Link href={r.href} className="group block h-full hover:[&>div]:bg-[#0d1631]">{inner}</Link>
                  ) : inner}
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.15}>
            <Link
              href="/forge/origins"
              className="mt-14 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-mono text-[11px] uppercase tracking-widest transition-opacity hover:opacity-90"
              style={{ background: midnight.accent, color: midnight.bg }}
            >
              Where they came from <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>
      </Ground>
    </main>
  );
}
