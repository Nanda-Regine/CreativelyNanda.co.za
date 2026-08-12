'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import RoomBackdrop from '@/components/room/RoomBackdrop';
import TexturedSection, { TEXTURES } from '@/components/ui/TexturedSection';
import { PAGE_BACKDROPS } from '@/lib/house-assets';
import { ORIGINS, LAYERS, THROUGHLINE, DEMO_GALLERY, type OriginProject } from '@/lib/data/forge-origins';

const GOLD = '#C9943A';
const CREAM = '#F5F0E8';
const ease = [0.22, 1, 0.36, 1] as const;

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: GOLD }}>
      {children}
    </p>
  );
}

function Project({ p }: { p: OriginProject }) {
  const flip = p.n % 2 === 0;

  return (
    <FadeUp className="relative">
      <article className="relative mx-auto max-w-5xl border-t pt-12 md:pt-16" style={{ borderColor: 'rgba(201,148,58,0.22)' }}>
        {/* number + layer rail */}
        <div className={`mb-7 flex items-baseline gap-5 ${flip ? 'md:flex-row-reverse md:text-right' : ''}`}>
          <span
            className="font-display text-5xl italic leading-none md:text-6xl"
            style={{ color: 'rgba(201,148,58,0.55)' }}
          >
            {String(p.n).padStart(2, '0')}
          </span>
          <div className={flip ? 'md:ml-auto' : ''}>
            <Kicker>
              Layer {p.layer} · {p.type}
              {p.built ? ` · ${p.built}` : ''}
            </Kicker>
            <h2 className="mt-2 font-display text-3xl font-bold italic leading-[1.05] text-white md:text-5xl">
              {p.title}
            </h2>
            <p className="mt-2 font-display text-lg italic md:text-xl" style={{ color: 'rgba(245,240,232,0.55)' }}>
              {p.subtitle}
            </p>
          </div>
        </div>

        {/* stack */}
        <ul className={`mb-8 flex flex-wrap gap-2 ${flip ? 'md:justify-end' : ''}`}>
          {p.stack.map((s) => (
            <li
              key={s}
              className="rounded-full border px-3 py-1 font-mono text-[10.5px] tracking-wide"
              style={{ borderColor: 'rgba(201,148,58,0.3)', color: 'rgba(245,240,232,0.62)' }}
            >
              {s}
            </li>
          ))}
        </ul>

        {/* the three movements */}
        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          {([
            ['The brief', p.brief],
            ['The build', p.build],
          ] as const).map(([label, text]) => (
            <div key={label} className="md:col-span-1">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: 'rgba(201,148,58,0.75)' }}>
                {label}
              </p>
              <p className="text-[15px] font-light leading-relaxed" style={{ color: 'rgba(245,240,232,0.72)' }}>
                {text}
              </p>
            </div>
          ))}

          {/* The lesson — the doorway line every card ends on */}
          <div className="md:col-span-1">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: GOLD }}>
              The lesson
            </p>
            <p className="font-display text-[17px] italic leading-relaxed md:text-lg" style={{ color: 'rgba(245,240,232,0.94)' }}>
              {p.lesson}
            </p>
          </div>
        </div>

        {p.outcome && (
          <p
            className="mt-8 border-l-2 pl-5 font-display text-lg italic md:text-xl"
            style={{ borderColor: GOLD, color: 'rgba(245,240,232,0.85)' }}
          >
            {p.outcome}
          </p>
        )}

        {/* links */}
        <div className={`mt-9 flex flex-wrap items-center gap-3 ${flip ? 'md:justify-end' : ''}`}>
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] tracking-wide transition-colors hover:bg-white/5"
            style={{ borderColor: 'rgba(245,240,232,0.22)', color: 'rgba(245,240,232,0.75)' }}
          >
            <Github className="h-3.5 w-3.5" /> Source
          </a>

          {p.demo?.status === 'live' && (
            <a
              href={p.demo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] tracking-wide transition-opacity hover:opacity-90"
              style={{ background: GOLD, color: '#0A1128' }}
            >
              Open it <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}

          {/* A dead demo is stated, never linked. */}
          {p.demo?.status === 'archived' && (
            <span
              className="inline-flex items-center gap-2 rounded-full border border-dashed px-4 py-2 font-mono text-[11px] tracking-wide"
              style={{ borderColor: 'rgba(245,240,232,0.18)', color: 'rgba(245,240,232,0.4)' }}
            >
              Deployment archived
            </span>
          )}

          {/* ...but the work continued somewhere that is alive. Sent to the
              gallery rather than dressed up as this project still running. */}
          {p.demo?.supersededByGallery && (
            <a
              href={DEMO_GALLERY.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] tracking-wide transition-colors hover:bg-white/5"
              style={{ borderColor: 'rgba(245,240,232,0.22)', color: 'rgba(245,240,232,0.75)' }}
            >
              {DEMO_GALLERY.label} <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </article>
    </FadeUp>
  );
}

export default function OriginsFeature() {
  return (
    <main className="min-h-screen" style={{ background: '#0A1128', color: CREAM }}>
      {/* ═══ THRESHOLD ═══════════════════════════════════════════════════════ */}
      <section className="relative -mt-20 flex min-h-[88vh] items-end overflow-hidden px-6 pb-20 pt-40">
        <RoomBackdrop image={PAGE_BACKDROPS.forge} wash="#0A1128" intensity={0.9} veil={0.42} />
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <FadeUp>
            <Link
              href="/forge"
              className="mb-10 inline-flex items-center gap-2 text-sm transition-colors hover:text-white"
              style={{ color: 'rgba(245,240,232,0.55)' }}
            >
              <ArrowLeft className="h-4 w-4" /> Back to the Forge
            </Link>
          </FadeUp>

          <FadeUp delay={0.05}>
            <Kicker>The Forge · Nine projects · One sequence</Kicker>
          </FadeUp>

          <FadeUp delay={0.12}>
            <h1 className="mt-6 font-display text-6xl font-bold italic leading-[0.92] text-white md:text-8xl">
              Where it<br />started.
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
              Before eight live applications. Before a registered company, before the commits
              ran into four figures. There were these. Each one a targeted lesson — and each
              lesson kept.
            </p>
          </FadeUp>

          <FadeUp delay={0.28}>
            <p className="mt-6 max-w-2xl font-display text-xl italic leading-relaxed md:text-2xl" style={{ color: 'rgba(245,240,232,0.6)' }}>
              This is not a portfolio showcase. It is a build chronicle — the answer to the
              question every technical interview eventually asks: <span className="text-white">where did you learn to build?</span>
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══ THE LEARNING ARCHITECTURE ═══════════════════════════════════════ */}
      <TexturedSection texture={TEXTURES.regalNavy} tone="navy" className="px-6 py-24 md:py-28">
        <div className="mx-auto max-w-5xl">
          <FadeUp>
            <Kicker>The learning architecture</Kicker>
            <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold italic leading-tight text-white md:text-5xl">
              The projects were not random. They were sequenced.
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] font-light leading-relaxed" style={{ color: 'rgba(245,240,232,0.65)' }}>
              Six layers, each built directly on the one before it. Read in order, the
              sequence is the argument.
            </p>
          </FadeUp>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border md:grid-cols-2" style={{ borderColor: 'rgba(201,148,58,0.2)', background: 'rgba(201,148,58,0.18)' }}>
            {Object.entries(LAYERS).map(([n, label], i) => (
              <FadeUp key={n} delay={i * 0.05}>
                <li className="flex h-full items-baseline gap-4 p-6" style={{ background: '#0A1128' }}>
                  <span className="font-display text-2xl italic" style={{ color: GOLD }}>{n}</span>
                  <span className="text-[15px] font-light leading-relaxed" style={{ color: 'rgba(245,240,232,0.8)' }}>
                    {label}
                  </span>
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>
      </TexturedSection>

      {/* ═══ THE NINE ════════════════════════════════════════════════════════ */}
      <section className="relative px-6 py-24 md:py-32">
        <div className="space-y-20 md:space-y-28">
          {ORIGINS.map((p) => (
            <Project key={p.slug} p={p} />
          ))}
        </div>
      </section>

      {/* ═══ THE THROUGHLINE ═════════════════════════════════════════════════ */}
      <TexturedSection texture={TEXTURES.marble} tone="wine" className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-4xl">
          <FadeUp>
            <Kicker>The throughline</Kicker>
            <h2 className="mt-4 font-display text-3xl font-bold italic leading-tight text-white md:text-5xl">
              Nine principles that now govern every build.
            </h2>
            <p className="mt-6 max-w-2xl text-[15px] font-light leading-relaxed" style={{ color: 'rgba(245,240,232,0.65)' }}>
              This is the intellectual property no repository can fully contain. It lives in
              the decisions made on every line written since.
            </p>
          </FadeUp>

          <ol className="mt-12 space-y-5">
            {THROUGHLINE.map((line, i) => (
              <FadeUp key={line} delay={i * 0.04}>
                <li className="flex items-baseline gap-5 border-b pb-5" style={{ borderColor: 'rgba(245,240,232,0.09)' }}>
                  <span className="font-mono text-[11px] tracking-widest" style={{ color: GOLD }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-lg italic leading-relaxed md:text-xl" style={{ color: 'rgba(245,240,232,0.92)' }}>
                    {line}
                  </span>
                </li>
              </FadeUp>
            ))}
          </ol>

          <FadeUp delay={0.2}>
            <div className="mt-16 flex flex-wrap gap-3">
              <Link
                href="/engineer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-[11px] tracking-widest uppercase transition-opacity hover:opacity-90"
                style={{ background: GOLD, color: '#0A1128' }}
              >
                The making of an engineer <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/poetry/poet-who-codes"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3 font-mono text-[11px] uppercase tracking-widest transition-colors hover:bg-white/5"
                style={{ borderColor: 'rgba(245,240,232,0.25)', color: 'rgba(245,240,232,0.8)' }}
              >
                The poet who codes
              </Link>
            </div>
          </FadeUp>
        </div>
      </TexturedSection>
    </main>
  );
}
