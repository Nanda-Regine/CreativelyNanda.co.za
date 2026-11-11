'use client';

/**
 * A real screen shown in a thin desktop frame: one top bar with the live path,
 * nothing else. Sized from the manifest so the page never shifts, and a quiet
 * caption card if the file cannot load.
 */

import { useState } from 'react';
import { screenUrl } from '@/lib/data/evidence/media';
import { MANIFEST_BY_ID, SCREEN_BY_ID } from '@/lib/data/evidence/screens';
import { ink } from '../ForgeChrome';

interface Props {
  screenId: string;
  path?: string;
  tilt?: boolean;
  priority?: boolean;
  className?: string;
}

const SIZES = '(min-width: 1024px) 720px, (min-width: 768px) 60vw, 100vw';

export default function DeskFrame({ screenId, path, tilt = false, priority = false, className = '' }: Props) {
  const [failed, setFailed] = useState(false);
  const entry = MANIFEST_BY_ID[screenId];
  const screen = SCREEN_BY_ID[screenId];
  if (!entry || !screen) return null;

  const app = screenId.split('-')[0];
  const shownPath = path ?? `${app}.co.za`;
  const webp = entry.widths.map((w) => `${screenUrl(screenId, w, 'webp')} ${w}w`).join(', ');
  const avif = entry.avif.map((w) => `${screenUrl(screenId, w, 'avif')} ${w}w`).join(', ');
  const largest = entry.widths[entry.widths.length - 1];

  const tiltClass = tilt
    ? 'motion-safe:md:[transform:rotate(1.5deg)] motion-safe:md:transition-transform motion-safe:md:duration-500 motion-safe:md:hover:[transform:rotate(0deg)] motion-safe:md:focus-within:[transform:rotate(0deg)]'
    : '';

  return (
    <figure
      className={`m-0 w-full overflow-hidden rounded-lg ${tiltClass} ${className}`}
      style={{
        background: 'var(--card, #fff)',
        border: `1px solid ${ink(0.14)}`,
        boxShadow: '0 18px 40px -22px rgb(10 17 40 / 0.45), 0 3px 10px -4px rgb(10 17 40 / 0.18)',
      }}
      tabIndex={tilt ? 0 : undefined}
      aria-label={tilt ? screen.alt : undefined}
    >
      <div
        className="flex items-center px-3 py-1.5"
        style={{ borderBottom: `1px solid ${ink(0.12)}`, background: ink(0.05) }}
      >
        <span className="block truncate font-mono text-[11px] leading-tight" style={{ color: ink(0.78) }}>
          {shownPath}
        </span>
      </div>

      {failed ? (
        <div
          role="img"
          aria-label={screen.alt}
          className="flex items-center justify-center p-4 text-center"
          style={{ aspectRatio: `${entry.w} / ${entry.h}`, background: entry.color }}
        >
          <p className="m-0 max-w-md text-sm leading-snug" style={{ color: '#F5F0E8' }}>
            {screen.caption}
          </p>
        </div>
      ) : (
        <div style={{ backgroundColor: entry.color, backgroundImage: `url("${entry.blur}")`, backgroundSize: 'cover' }}>
          <picture>
            {avif ? <source type="image/avif" srcSet={avif} sizes={SIZES} /> : null}
            <source type="image/webp" srcSet={webp} sizes={SIZES} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={screenUrl(screenId, largest, 'webp')}
              alt={screen.alt}
              width={entry.w}
              height={entry.h}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              onError={() => setFailed(true)}
              className="block h-auto w-full"
            />
          </picture>
        </div>
      )}
    </figure>
  );
}
