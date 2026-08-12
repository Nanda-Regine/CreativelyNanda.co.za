'use client';

/**
 * EDITORIAL — the asymmetric layout kit.
 *
 * ── WHY ───────────────────────────────────────────────────────────────────────
 *
 * The Forge shipped as a stack of centred `max-w-5xl` blocks: header, figures,
 * grid, list, grid. Every section the same width, every element on the same
 * axis, nothing overlapping anything. That is a document, not a magazine — and
 * it is the shape code produces by default, because a centred container is the
 * safest thing to write.
 *
 * Real editorial design breaks the column on purpose. An image bleeds past the
 * measure. A caption sits rotated in the margin. A number is set enormous and
 * cropped by its own frame. Two things overlap so the eye reads depth.
 *
 * These are the moves, as components, so they are used consistently rather than
 * hand-rolled per page — and so the reduced-motion and mobile behaviour is
 * decided once instead of forgotten nine times.
 *
 * ── THE MOBILE RULE ───────────────────────────────────────────────────────────
 *
 * Every asymmetry here collapses to a single readable column below `md`. An
 * offset that survives to 390px is an overflow bug, and this site has already
 * paid for one of those: `overflow-x: clip` had to go on html+body because 32 of
 * 39 pages leaked about 20px. Negative margins are therefore `md:` only.
 */

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

function cld(id: string, width: number) {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
  const full =
    id.startsWith('creativelynanda/') || id.startsWith('varsityos') || id.startsWith('sanyu/')
      ? id
      : `creativelynanda/${id}`;
  return `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto,w_${width},c_limit/${full}`;
}

// ─────────────────────────────────────────────────────────────────────────────

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * A photograph that breaks the text measure.
 *
 * `bleed="left"` pulls the image into the left margin and past it; the text
 * column stays put. This is the single most effective anti-document move —
 * it tells the eye the page has an edge the content is willing to cross.
 */
export function OffsetFigure({
  image,
  alt,
  caption,
  credit,
  bleed = 'left',
  ratio = '3 / 4',
  parallax = true,
  className = '',
}: {
  image: string;
  alt: string;
  caption?: string;
  credit?: string;
  bleed?: 'left' | 'right';
  ratio?: string;
  parallax?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  return (
    <figure
      ref={ref}
      className={`relative ${bleed === 'left' ? 'md:-ml-24 lg:-ml-40' : 'md:-mr-24 lg:-mr-40'} ${className}`}
    >
      <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: ratio }}>
        <motion.img
          src={cld(image, 1400)}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 h-[108%] w-full object-cover"
          style={{ top: '-4%', y: parallax && !reduce ? y : 0 }}
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 flex items-start gap-3">
          <span aria-hidden className="mt-2 h-px w-6 shrink-0 bg-current opacity-40" />
          <span className="text-[13px] font-light leading-relaxed opacity-70">
            {caption}
            {credit ? <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.16em] opacity-60">{credit}</span> : null}
          </span>
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * Two images that overlap, one lifted. Depth without a drop shadow.
 */
export function StackedPair({
  back,
  front,
  alt,
  accent,
  className = '',
}: {
  back: string;
  front: string;
  alt: string;
  accent: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative w-[78%] overflow-hidden rounded-sm" style={{ aspectRatio: '4 / 5' }}>
        <img src={cld(back, 1000)} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div
        className="absolute bottom-[-8%] right-0 w-[52%] overflow-hidden rounded-sm md:bottom-[-12%]"
        style={{ aspectRatio: '3 / 4', outline: `1px solid ${accent}66`, outlineOffset: 6 }}
      >
        <img src={cld(front, 800)} alt="" aria-hidden loading="lazy" className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

/**
 * A number set as a display object rather than as data.
 *
 * The Forge's figure strip rendered four values at `text-5xl` in a neat row —
 * correct, and completely inert. A statistic earns its space when it is scaled
 * like a headline and captioned like a photograph.
 */
export function BigFigure({
  value,
  label,
  note,
  accent,
  align = 'left',
}: {
  value: string;
  label: string;
  note?: string;
  accent: string;
  align?: 'left' | 'right';
}) {
  return (
    <Reveal className={align === 'right' ? 'text-right' : ''}>
      <p
        className="font-display font-bold italic leading-[0.8]"
        style={{ color: accent, fontSize: 'clamp(3.2rem, 9vw, 7.5rem)' }}
      >
        {value}
      </p>
      <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.24em] opacity-75">{label}</p>
      {note ? <p className="mt-2 max-w-[26ch] text-[13px] font-light leading-relaxed opacity-60">{note}</p> : null}
    </Reveal>
  );
}

/**
 * A note set apart from the running text, tilted slightly off-axis.
 *
 * ⚠️ The first version positioned this absolutely at `md:-right-60`, outside
 * its column. Every `Ground` is `overflow-hidden` (it has to be — the parallax
 * layer is oversized and the slanted edges clip), so the note was sliced in
 * half by the section boundary at 1440px: *"Every number i… measured from… at
 * build time —"*.
 *
 * A margin note needs a margin to live in, and a full-bleed section does not
 * have one. So it stays in flow and earns its separation with an indent, a
 * rule and a small rotation instead. The rotation is `md:` only — tilting a
 * 390px-wide paragraph just breaks the line length.
 */
export function MarginNote({ children, accent, side = 'left' }: { children: React.ReactNode; accent: string; side?: 'left' | 'right' }) {
  return (
    <Reveal className={`my-10 max-w-sm ${side === 'right' ? 'md:ml-auto' : ''}`}>
      <div
        className={`border-l-2 py-1 pl-5 ${side === 'left' ? 'md:-rotate-1' : 'md:rotate-1'}`}
        style={{ borderColor: accent }}
      >
        <p className="font-display text-[15px] italic leading-relaxed opacity-85">{children}</p>
      </div>
    </Reveal>
  );
}

/** A big display quote that interrupts the column. */
export function PullQuote({ children, attribution, accent }: { children: React.ReactNode; attribution?: string; accent: string }) {
  return (
    <Reveal className="my-14 md:my-20">
      <blockquote className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-2 -top-10 select-none font-display italic leading-none md:-left-8"
          style={{ color: accent, opacity: 0.18, fontSize: 'clamp(6rem, 14vw, 11rem)' }}
        >
          “
        </span>
        <p className="relative font-display font-bold italic leading-[1.15]" style={{ fontSize: 'clamp(1.6rem, 4.2vw, 3rem)' }}>
          {children}
        </p>
        {attribution ? (
          <footer className="mt-5 flex items-center gap-3">
            <span aria-hidden className="h-px w-8" style={{ background: accent }} />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] opacity-70">{attribution}</span>
          </footer>
        ) : null}
      </blockquote>
    </Reveal>
  );
}

/**
 * A looping muted video tile. Autoplay is `playsInline` + `muted` so iOS allows
 * it, and `preload="none"` with a poster so a page of these does not cost a
 * visitor on mobile data several megabytes before they scroll — this audience
 * pays for that data, and the whole K53 build is an argument about it.
 */
export function VideoTile({
  id,
  poster,
  label,
  ratio = '9 / 16',
  className = '',
}: {
  id: string;
  poster?: string;
  label?: string;
  ratio?: string;
  className?: string;
}) {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
  const src = `https://res.cloudinary.com/${cloud}/video/upload/f_auto,q_auto,vc_auto/creativelynanda/${id}.mp4`;
  const posterUrl = poster
    ? cld(poster, 800)
    : `https://res.cloudinary.com/${cloud}/video/upload/so_1,f_jpg,q_auto,w_800/creativelynanda/${id}.jpg`;

  return (
    <figure className={`relative overflow-hidden rounded-sm ${className}`} style={{ aspectRatio: ratio }}>
      <video
        className="h-full w-full object-cover"
        src={src}
        poster={posterUrl}
        muted
        loop
        playsInline
        autoPlay
        preload="none"
      />
      {label ? (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white">
          {label}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** A hairline rule with a label riding on it. */
export function Rule({ label, accent, className = '' }: { label?: string; accent: string; className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="h-px w-10 shrink-0" style={{ background: accent }} />
      {label ? (
        <span className="font-mono text-[10.5px] uppercase tracking-[0.3em]" style={{ color: accent }}>
          {label}
        </span>
      ) : null}
      <span className="h-px flex-1 opacity-20" style={{ background: 'currentColor' }} />
    </div>
  );
}
