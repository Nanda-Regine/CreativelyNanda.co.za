'use client';

/**
 * GROUND — the paper a section is printed on.
 *
 * ── THE PROBLEM THIS FIXES ────────────────────────────────────────────────────
 *
 * Every room in the Forge opened on `#0A1128`, laid a navy scrim over a navy
 * texture, and then asked one gold hairline to carry the entire page. Read end
 * to end the wing was a single navy corridor, and the photography — teal radio
 * studios, cobalt festival backdrops, magenta bougainvillea, terracotta beer
 * pots — was either absent or dimmed to the point of being decoration.
 *
 * A magazine does not print every spread on the same stock. It alternates:
 * a heavy coated black for the fashion story, uncoated cream for the essay, a
 * colour block for the interview. The eye needs the change to know a new
 * movement has started.
 *
 * `GROUND` in `lib/data/asset-atlas.ts` holds seven papers, each sampled from
 * the photographs rather than from a brand deck. This component prints on them.
 *
 * ── THE RULE ──────────────────────────────────────────────────────────────────
 *
 * **Take the ground from the photograph; never impose one on it.** If a section
 * carries the radio pictures it goes on `studio` teal. If it carries the beer
 * brewing it goes on `bone`. Navy is now one paper among seven — punctuation,
 * not the page.
 *
 * ── SCRIM DISCIPLINE ──────────────────────────────────────────────────────────
 *
 * `veil` defaults to 0.28 and is capped at 0.55. The old backdrop defaulted to
 * a 0.5 tint at 0.92 intensity, which is why her colours never arrived. If text
 * is not legible at 0.55, the fix is a text panel or a gradient behind the
 * words — not more scrim over the whole photograph.
 */

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { GROUND, type GroundName } from '@/lib/data/asset-atlas';

export type { GroundName };

/** Cloudinary delivery, kept local so this file has no server import. */
function cld(id: string, width: number) {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
  const full =
    id.startsWith('creativelynanda/') || id.startsWith('varsityos') || id.startsWith('sanyu/')
      ? id
      : `creativelynanda/${id}`;
  return `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto,w_${width},c_limit/${full}`;
}

export interface GroundProps {
  ground: GroundName;
  children: React.ReactNode;
  /** A photograph behind the section. Cloudinary id from the atlas. */
  image?: string;
  /** 0–0.55. How much colour sits over the photograph. Lower is braver. */
  veil?: number;
  /** Focal point for the crop, e.g. 'center', 'top', '30% 40%'. */
  focus?: string;
  /** Slow vertical drift on the photograph. Disabled under reduced-motion. */
  parallax?: boolean;
  /**
   * Cut the top edge on an angle so one ground appears to slide under the next.
   * The single cheapest way to stop a page reading as stacked rectangles.
   */
  edge?: 'none' | 'slant' | 'slant-reverse';
  className?: string;
  id?: string;
}

export default function Ground({
  ground,
  children,
  image,
  veil = 0.28,
  focus = 'center',
  parallax = false,
  edge = 'none',
  className = '',
  id,
}: GroundProps) {
  const g = GROUND[ground];
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Deliberately small. A photograph that visibly slides is a gimmick; one that
  // drifts 6% reads as depth and most people never consciously notice it.
  const y = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);

  const clip =
    edge === 'slant'
      ? 'polygon(0 3vw, 100% 0, 100% 100%, 0 100%)'
      : edge === 'slant-reverse'
        ? 'polygon(0 0, 100% 3vw, 100% 100%, 0 100%)'
        : undefined;

  const safeVeil = Math.min(0.55, Math.max(0, veil));

  return (
    <section
      ref={ref}
      id={id}
      className={`relative isolate overflow-hidden ${className}`}
      style={{
        background: g.bg,
        color: g.ink,
        ...(clip ? { clipPath: clip, marginTop: '-1px' } : {}),
      }}
    >
      {image ? (
        <>
          <motion.div
            aria-hidden
            className="absolute inset-0 -z-20"
            style={{
              y: parallax && !reduce ? y : 0,
              // Oversized so the parallax drift never exposes an edge.
              top: parallax && !reduce ? '-4%' : 0,
              bottom: parallax && !reduce ? '-4%' : 0,
              backgroundImage: `url('${cld(image, 1800)}')`,
              backgroundSize: 'cover',
              backgroundPosition: focus,
            }}
          />
          {/* One flat wash in the ground's own colour. Not a gradient stack —
              gradients over a photograph are what turned every hero grey. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{ background: g.bg, opacity: safeVeil }}
          />
        </>
      ) : null}
      {children}
    </section>
  );
}

/**
 * A full-bleed photograph that keeps its own colour, with the text sitting in a
 * legible pocket rather than under a page-wide scrim.
 *
 * This is the shape almost every hero on the site should have been: the image
 * at full strength, and a soft directional gradient only where words land.
 */
export function PhotoBleed({
  image,
  ground,
  children,
  focus = 'center',
  from = 'bottom',
  minH = '86vh',
  className = '',
}: {
  image: string;
  ground: GroundName;
  children: React.ReactNode;
  focus?: string;
  /** Which edge the text pocket grows from. */
  from?: 'bottom' | 'left' | 'right';
  minH?: string;
  className?: string;
}) {
  const g = GROUND[ground];
  const reduce = useReducedMotion();

  /**
   * ⚠️ The pocket is NEUTRAL, not the ground colour.
   *
   * The first version graded from `g.bg` at 95% alpha, which on the `garden`
   * ground laid deep green over the whole lower two-thirds of the photograph —
   * her cream puffer coat came out sage and the picture read as a colour swatch
   * with a person in it. That is the exact failure the ground system was built
   * to end, reintroduced one layer down.
   *
   * Black darkens without tinting, so the photograph keeps its own colour and
   * the text still gets its contrast. The ground colour belongs on the section
   * around the image, not on top of it.
   */
  const pocket =
    from === 'left'
      ? 'linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 32%, rgba(0,0,0,0) 66%)'
      : from === 'right'
        ? 'linear-gradient(270deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 32%, rgba(0,0,0,0) 66%)'
        : 'linear-gradient(0deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.5) 34%, rgba(0,0,0,0.12) 62%, rgba(0,0,0,0) 82%)';

  return (
    <section
      className={`relative isolate flex overflow-hidden ${from === 'bottom' ? 'items-end' : 'items-center'} ${className}`}
      style={{ minHeight: minH, background: g.bg, color: g.ink }}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-20"
        initial={reduce ? undefined : { scale: 1.06 }}
        animate={reduce ? undefined : { scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          backgroundImage: `url('${cld(image, 2000)}')`,
          backgroundSize: 'cover',
          backgroundPosition: focus,
        }}
      />
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: pocket }} />
      {children}
    </section>
  );
}

/** Read the ground tokens inside a client component. */
export const groundTokens = (name: GroundName) => GROUND[name];
