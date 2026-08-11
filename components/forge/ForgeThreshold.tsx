'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import RoomBackdrop from '@/components/room/RoomBackdrop';
import TexturedSection, { TEXTURES } from '@/components/ui/TexturedSection';
import { PAGE_BACKDROPS } from '@/lib/house-assets';
import { THROUGHLINE } from '@/lib/data/forge-origins';

const GOLD = '#C9943A';
const ease = [0.22, 1, 0.36, 1] as const;

// Rooms are declared with their real state. A room that isn't built says so —
// a door that opens onto nothing is worse than a door marked "not yet".
const ROOMS: { name: string; line: string; href?: string }[] = [
  { name: 'Where It Started', line: 'Nine foundation projects. The sequence is the argument.', href: '/forge/origins' },
  { name: 'The Workshop Floor', line: 'Every build, one dossier each — the problem, the decisions, the cost.', href: '/forge/floor' },
  { name: 'The Scar Room', line: 'What broke. How it was found. Why the system allowed it.', href: '/forge/scars' },
  { name: 'The Long Night', line: 'The diary. Night by night, newest first.', href: '/forge/nights' },
  { name: 'The Commit Wall', line: 'A year of commit messages, read as sentences.', href: '/forge/commits' },
  { name: 'The Making', line: 'The career feature — zero to eight live products in a year.', href: '/engineer' },
  { name: 'The Poet Who Codes', line: 'The doorway between this wing and the garden.', href: '/poetry/poet-who-codes' },
  // Still shut, and labelled as shut. A door that opens onto nothing is worse
  // than a door marked "not yet" — and the honest reason each is closed is that
  // it needs a live data source this site does not have. See THE_FORGE.md §5.6.
  { name: 'The Bench', line: 'Live vitals — apps breathing, deploys landing.' },
  { name: 'The Dojo', line: 'Drills. Guess the bug. Read the trace.' },
];

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export interface ForgeStats {
  apps: number;
  words: number;
  sessions: number;
  projects: number;
  /** Measured from the GitHub API by scripts/forge-github.mjs. Pre-formatted. */
  commits: string;
  repos: number;
}

export default function ForgeThreshold({ stats }: { stats: ForgeStats }) {
  // Nothing here calls toLocaleString — the server already formatted it. Server
  // and client can disagree on that call, which is precisely the hydration bug
  // written up in the Scar Room.
  const figures: [string, string][] = [
    [stats.commits, 'commits, measured'],
    [stats.apps.toString(), 'builds journalled'],
    [`${Math.round(stats.words / 1000)}k`, 'words of build journal'],
    [stats.projects.toString(), 'foundation projects'],
  ];

  return (
    <main className="min-h-screen" style={{ background: '#0A1128', color: '#F5F0E8' }}>
      {/* ═══ THE THRESHOLD ═══════════════════════════════════════════════════ */}
      <section className="relative -mt-20 flex min-h-[92vh] items-end overflow-hidden px-6 pb-24 pt-40">
        <RoomBackdrop image={PAGE_BACKDROPS.forge} wash="#0A1128" intensity={0.92} veil={0.4} />
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <FadeUp>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em]" style={{ color: GOLD }}>
              A wing of the house
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="mt-6 font-display text-6xl font-bold italic leading-[0.9] text-white md:text-[8.5rem]">
              The Forge
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mt-8 max-w-2xl font-display text-xl italic leading-relaxed md:text-3xl" style={{ color: 'rgba(255,255,255,0.82)' }}>
              The garden is where she writes. This is where she builds.
            </p>
          </FadeUp>

          <FadeUp delay={0.28}>
            <p className="mt-7 max-w-2xl text-[15px] font-light leading-relaxed md:text-lg" style={{ color: 'rgba(255,255,255,0.62)' }}>
              Not a portfolio. A workshop — the drafts, the wrong turns, the nights something
              broke at two in the morning and the reason it broke. Code here is a medium,
              the same way a poem is.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ THE FIGURES ═════════════════════════════════════════════════════ */}
      <section className="border-y px-6 py-14" style={{ borderColor: 'rgba(201,148,58,0.2)', background: 'rgba(201,148,58,0.04)' }}>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
          {figures.map(([n, label], i) => (
            <FadeUp key={label} delay={i * 0.06}>
              <p className="font-display text-4xl font-bold italic md:text-5xl" style={{ color: GOLD }}>{n}</p>
              <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.2em]" style={{ color: 'rgba(245,240,232,0.5)' }}>
                {label}
              </p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ═══ THE ROOMS ═══════════════════════════════════════════════════════ */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <FadeUp>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: GOLD }}>The rooms</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold italic leading-tight text-white md:text-5xl">
              Nine doors. Seven of them open.
            </h2>
          </FadeUp>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border md:grid-cols-3" style={{ borderColor: 'rgba(201,148,58,0.2)', background: 'rgba(201,148,58,0.16)' }}>
            {ROOMS.map((r, i) => {
              const inner = (
                <div className="flex h-full flex-col p-7 transition-colors" style={{ background: '#0A1128' }}>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl italic text-white md:text-2xl">{r.name}</h3>
                    {r.href ? (
                      <ArrowUpRight className="h-4 w-4 shrink-0" style={{ color: GOLD }} />
                    ) : (
                      <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: 'rgba(245,240,232,0.3)' }}>
                        in the fire
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-light leading-relaxed" style={{ color: r.href ? 'rgba(245,240,232,0.68)' : 'rgba(245,240,232,0.35)' }}>
                    {r.line}
                  </p>
                </div>
              );

              return (
                <FadeUp key={r.name} delay={i * 0.04} className="h-full">
                  {r.href ? (
                    <Link href={r.href} className="group block h-full hover:[&>div]:bg-[#0d1631]">
                      {inner}
                    </Link>
                  ) : (
                    inner
                  )}
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ THE PRINCIPLES ══════════════════════════════════════════════════ */}
      <TexturedSection texture={TEXTURES.regalNavy} tone="navy" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <FadeUp>
            <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: GOLD }}>
              Carved into the wall
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold italic leading-tight text-white md:text-5xl">
              Nine principles.
            </h2>
          </FadeUp>

          <ol className="mt-12 space-y-4">
            {THROUGHLINE.map((line, i) => (
              <FadeUp key={line} delay={i * 0.035}>
                <li className="flex items-baseline gap-5 border-b pb-4" style={{ borderColor: 'rgba(245,240,232,0.08)' }}>
                  <span className="font-mono text-[11px] tracking-widest" style={{ color: GOLD }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-lg italic leading-relaxed md:text-xl" style={{ color: 'rgba(245,240,232,0.9)' }}>
                    {line}
                  </span>
                </li>
              </FadeUp>
            ))}
          </ol>

          <FadeUp delay={0.2}>
            <Link
              href="/forge/origins"
              className="mt-14 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-mono text-[11px] uppercase tracking-widest transition-opacity hover:opacity-90"
              style={{ background: GOLD, color: '#0A1128' }}
            >
              Where they came from <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </FadeUp>
        </div>
      </TexturedSection>
    </main>
  );
}
