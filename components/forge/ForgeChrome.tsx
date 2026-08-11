'use client';

/**
 * Shared furniture for the Forge wing.
 *
 * The poetry wing gets its coherence from atmosphere — a mood wash that follows
 * you between rooms. The Forge is a workshop, so its coherence comes from the
 * opposite quality: the same rules, the same gold hairline, the same monospace
 * kicker in every room, so that the wing reads as one building whoever wrote it.
 *
 * Everything here is presentational. No component in this file may import
 * `lib/forge-data.ts` or the corpus — see the constraint at the top of that file.
 */

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { track } from '@/lib/analytics';

export const GOLD = '#C9943A';
export const NAVY = '#0A1128';
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Ink at a given strength on the navy ground. */
export const ink = (a: number) => `rgba(245,240,232,${a})`;

// ─────────────────────────────────────────────────────────────────────────────

export function FadeUp({
  children,
  delay = 0,
  className = '',
  y = 24,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  // Honour the OS setting rather than approximating it — the site's animation
  // contract, documented in CLAUDE.md, is that every wrapper does this.
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * The room header. Every room in the wing opens the same way: a monospace
 * kicker in gold, an oversized italic display title, and one sentence that
 * says what the room is for before the reader has to guess.
 */
export function RoomHeader({
  kicker,
  title,
  standfirst,
  note,
}: {
  kicker: string;
  title: string;
  standfirst: string;
  note?: React.ReactNode;
}) {
  return (
    <div className="relative z-10 mx-auto w-full max-w-5xl">
      <FadeUp>
        <Link
          href="/forge"
          className="group inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.28em] transition-opacity hover:opacity-70"
          style={{ color: GOLD }}
        >
          <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
          The Forge
        </Link>
      </FadeUp>

      <FadeUp delay={0.06}>
        <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.35em]" style={{ color: ink(0.45) }}>
          {kicker}
        </p>
      </FadeUp>

      <FadeUp delay={0.12}>
        <h1 className="mt-5 font-display text-5xl font-bold italic leading-[0.92] text-white md:text-8xl">
          {title}
        </h1>
      </FadeUp>

      <FadeUp delay={0.2}>
        <p
          className="mt-7 max-w-2xl font-display text-xl italic leading-relaxed md:text-2xl"
          style={{ color: ink(0.8) }}
        >
          {standfirst}
        </p>
      </FadeUp>

      {note ? (
        <FadeUp delay={0.28}>
          <div className="mt-6 max-w-2xl text-[14px] font-light leading-relaxed" style={{ color: ink(0.55) }}>
            {note}
          </div>
        </FadeUp>
      ) : null}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * A strip of measured figures.
 *
 * Nothing in this component formats a number — every value arrives as the
 * string it should render as. That is not fussiness: `toLocaleString()` on the
 * client can disagree with the same call on the server, which is the exact
 * shape of the hydration bug written up in the Scar Room.
 */
export function Figures({ items }: { items: { value: string; label: string }[] }) {
  return (
    <section
      className="border-y px-6 py-12 md:py-14"
      style={{ borderColor: 'rgba(201,148,58,0.2)', background: 'rgba(201,148,58,0.04)' }}
    >
      <div className={`mx-auto grid max-w-5xl gap-8 grid-cols-2 ${items.length >= 5 ? 'md:grid-cols-5' : 'md:grid-cols-4'}`}>
        {items.map((f, i) => (
          <FadeUp key={f.label} delay={i * 0.05}>
            <p className="font-display text-4xl font-bold italic md:text-5xl" style={{ color: GOLD }}>
              {f.value}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em]" style={{ color: ink(0.5) }}>
              {f.label}
            </p>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * A build's own mark, in a circular gold-ringed frame.
 *
 * The logos are pulled from her own repositories by `scripts/forge-github.mjs`
 * and each arrives on its own background — Sanyu on cream, VarsityOS and K53 on
 * pale grey, Mirembe Muse on its own navy. A circular frame is what makes four
 * unrelated backgrounds sit together, and it is already the visual language of
 * the Studio page, where her photographs hang in gold-ringed circles.
 */
export function BrandMark({
  logo,
  name,
  size = 64,
  accent = GOLD,
}: {
  logo?: string | null;
  name: string;
  size?: number;
  accent?: string;
}) {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';

  if (!logo || !cloud) {
    // No mark: a monogram in the build's own colour. Never an empty circle.
    return (
      <div
        className="flex shrink-0 items-center justify-center rounded-full font-display text-lg font-bold italic"
        style={{
          width: size,
          height: size,
          background: `${accent}1F`,
          border: `1px solid ${accent}59`,
          color: accent,
        }}
        aria-hidden
      >
        {name.replace(/[^A-Za-z0-9]/g, '').slice(0, 2)}
      </div>
    );
  }

  const src = `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto,w_${size * 2},h_${size * 2},c_fill,g_center/creativelynanda/logos/${logo}`;

  return (
    <span
      className="block shrink-0 overflow-hidden rounded-full"
      style={{ width: size, height: size, border: `1px solid ${GOLD}66`, boxShadow: `0 0 0 3px ${NAVY}` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={`${name} logo`} width={size} height={size} loading="lazy" className="h-full w-full object-cover" />
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * The doors out of a room. Every room ends on one of these rather than on a
 * dead end — the House of Roses rule that a poem ends on a doorway word, kept
 * on this side of the house too.
 */
export function Doors({ doors }: { doors: { href: string; label: string; line: string }[] }) {
  return (
    <section className="px-6 pb-28 pt-4">
      <div className="mx-auto max-w-5xl">
        <FadeUp>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em]" style={{ color: GOLD }}>
            Where next
          </p>
        </FadeUp>
        <div
          className="mt-8 grid gap-px overflow-hidden rounded-2xl border md:grid-cols-3"
          style={{ borderColor: 'rgba(201,148,58,0.2)', background: 'rgba(201,148,58,0.16)' }}
        >
          {doors.map((d, i) => (
            <FadeUp key={d.href} delay={i * 0.05} className="h-full">
              <Link
                href={d.href}
                className="group block h-full"
                // Which door out of a room actually gets taken is the only
                // reliable signal about whether the wing reads as a building or
                // as a pile of pages.
                onClick={() => track('forge_room_enter', { room: d.href, from: 'doors' })}
              >
                <div className="flex h-full flex-col p-7 transition-colors group-hover:bg-[#0d1631]" style={{ background: NAVY }}>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl italic text-white">{d.label}</h3>
                    <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: GOLD }} />
                  </div>
                  <p className="text-sm font-light leading-relaxed" style={{ color: ink(0.62) }}>
                    {d.line}
                  </p>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

/** A block of source or artefact. Scrolls itself so the page never does. */
export function Artefact({ children, label }: { children: string; label?: string }) {
  return (
    <figure className="my-7 overflow-hidden rounded-xl border" style={{ borderColor: 'rgba(201,148,58,0.22)', background: 'rgba(0,0,0,0.28)' }}>
      {label ? (
        <figcaption
          className="border-b px-5 py-2.5 font-mono text-[9.5px] uppercase tracking-[0.22em]"
          style={{ borderColor: 'rgba(201,148,58,0.16)', color: ink(0.42) }}
        >
          {label}
        </figcaption>
      ) : null}
      <pre className="overflow-x-auto px-5 py-4">
        <code className="font-mono text-[12.5px] leading-relaxed" style={{ color: ink(0.82) }}>
          {children}
        </code>
      </pre>
    </figure>
  );
}

/** A gold hairline with an optional label sitting on it. */
export function Rule({ label, color = GOLD }: { label?: string; color?: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px w-10 shrink-0" style={{ background: color }} />
      {label ? (
        <span className="font-mono text-[10.5px] uppercase tracking-[0.3em]" style={{ color }}>
          {label}
        </span>
      ) : null}
      <span className="h-px flex-1" style={{ background: `${color}26` }} />
    </div>
  );
}
