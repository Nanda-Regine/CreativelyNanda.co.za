import { assetUrl } from '@/lib/house-assets';

// PlacedPortrait — one of Nanda's photographs, placed (not decorative) inside a
// narrative room: an editorial figure with a kicker + caption, an accent seam,
// and a soft frame. No hooks / no 'use client' — usable from both the client
// poetry rooms and the server-rendered /sanyu page.

interface Props {
  file: string;         // path from lib/house-assets PORTRAITS
  alt: string;
  kicker?: string;      // small mono label (e.g. "The Roots")
  caption?: string;     // the line under the photograph
  side?: 'left' | 'right';
  accent?: string;      // seam + kicker colour
}

export default function PlacedPortrait({
  file,
  alt,
  kicker,
  caption,
  side = 'left',
  accent = '#C9A84C',
}: Props) {
  return (
    <figure
      className={`mx-auto flex max-w-4xl flex-col items-center gap-8 md:items-stretch ${
        side === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      <div className="relative w-full max-w-sm shrink-0">
        <span
          className="absolute -left-3 top-6 z-10 h-16 w-1 rounded-full"
          style={{ background: accent }}
          aria-hidden="true"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetUrl(file)}
          alt={alt}
          loading="lazy"
          className="w-full rounded-[1.75rem] border border-white/10 object-cover shadow-2xl"
        />
        <span
          className="pointer-events-none absolute inset-0 rounded-[1.75rem]"
          style={{ boxShadow: 'inset 0 -60px 80px -40px rgba(0,0,0,0.6)' }}
          aria-hidden="true"
        />
      </div>

      {(kicker || caption) && (
        <figcaption className="flex flex-col justify-center text-center md:text-left">
          {kicker && (
            <span
              className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.3em]"
              style={{ color: accent }}
            >
              {kicker}
            </span>
          )}
          {caption && (
            <p className="font-display text-xl italic leading-relaxed text-cream/80 md:text-2xl">
              {caption}
            </p>
          )}
        </figcaption>
      )}
    </figure>
  );
}
