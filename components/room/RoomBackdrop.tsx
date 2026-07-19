'use client';

import { GRAIN_SVG } from '@/lib/moods-atmosphere';
import { assetUrl, backdropForTone, type Tone } from '@/lib/house-assets';

// RoomBackdrop — the premium, editorial full-bleed image layer the House uses
// behind narrative rooms (Atrium, Roots, Crown, Library shelves…). The Mirembe
// move: a photograph doing the emotional work, held back by a colour scrim + a
// vignette + grain so text stays legible and the mood stays regal. Fixed and
// non-interactive; content sits above it.

interface Props {
  tone: Tone;
  seed?: number;         // deterministic pick from the tone pool
  wash?: string;         // colour scrim (defaults to a deep navy)
  intensity?: number;    // 0..1 how much the photograph shows through (default 0.5)
  vignette?: boolean;    // darken the edges for focus (default true)
  fixed?: boolean;       // fixed to the viewport vs absolute to the parent
  className?: string;
}

export default function RoomBackdrop({
  tone,
  seed = 0,
  wash = '#0A0F2C',
  intensity = 0.5,
  vignette = true,
  fixed = false,
  className = '',
}: Props) {
  const src = assetUrl(backdropForTone(tone, seed));

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none ${fixed ? 'fixed' : 'absolute'} inset-0 overflow-hidden ${className}`}
      style={{ background: wash }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity: intensity }}
        loading="lazy"
      />
      {/* colour scrim — keeps the mood and protects the type */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(160deg, ${wash}cc 0%, ${wash}f2 100%)` }}
      />
      {vignette && (
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(120% 100% at 50% 0%, transparent 40%, rgba(0,0,0,0.55) 100%)' }}
        />
      )}
      <div className="absolute inset-0 opacity-[0.12] mix-blend-soft-light" style={{ backgroundImage: GRAIN_SVG }} />
    </div>
  );
}
