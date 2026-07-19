'use client';

import { GRAIN_SVG } from '@/lib/moods-atmosphere';
import { assetUrl, backdropForTone, type Tone } from '@/lib/house-assets';

// RoomBackdrop — the premium, editorial full-bleed image layer the House uses
// behind narrative rooms (Atrium, Roots, Crown, Library shelves…). The Mirembe
// move: a photograph doing the emotional work, held back by a colour scrim + a
// vignette + grain so text stays legible and the mood stays regal. Fixed and
// non-interactive; content sits above it.

interface Props {
  tone?: Tone;           // pool to pick from (ignored when `image` is given)
  image?: string;        // an explicit, art-directed background (public path)
  seed?: number;         // deterministic pick from the tone pool
  wash?: string;         // colour tint (defaults to a deep navy)
  intensity?: number;    // 0..1 how much the photograph shows through (default 0.85)
  veil?: number;         // 0..1 how heavy the colour tint is (default 0.5 — keep it light)
  vignette?: boolean;    // darken the edges for focus (default true)
  fixed?: boolean;       // fixed to the viewport vs absolute to the parent
  className?: string;
}

// Turn a 0..1 alpha into a 2-digit hex suffix for `#rrggbb + aa`.
function a(alpha: number): string {
  const clamped = Math.max(0, Math.min(1, alpha));
  return Math.round(clamped * 255).toString(16).padStart(2, '0');
}

export default function RoomBackdrop({
  tone = 'abstract',
  image,
  seed = 0,
  wash = '#0A0F2C',
  intensity = 0.95,
  veil = 0.22,
  vignette = true,
  fixed = false,
  className = '',
}: Props) {
  const src = image ? assetUrl(image) : assetUrl(backdropForTone(tone, seed));

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
      {/* Just a whisper of tint — the colours are the point. A touch more at the
          very foot only so text anchored there can breathe. */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${wash}${a(Math.min(1, veil + 0.16))} 0%, ${wash}${a(veil * 0.6)} 50%, ${wash}${a(veil * 0.3)} 100%)`,
        }}
      />
      {vignette && (
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(120% 100% at 50% 0%, transparent 62%, rgba(0,0,0,0.2) 100%)' }}
        />
      )}
      <div className="absolute inset-0 opacity-[0.08] mix-blend-soft-light" style={{ backgroundImage: GRAIN_SVG }} />
    </div>
  );
}
