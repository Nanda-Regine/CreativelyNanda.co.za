'use client';

/**
 * A real desk screen in minimal browser chrome drawn in CSS (three dots and a
 * URL pill, never a laptop mock-up). Presentational: it takes its manifest
 * entry as props, so a floor route ships only its own app's data. DeskFrame is
 * the lookup wrapper the case files use.
 *
 * `zoomable` adds the loupe: tap to 2.2x at the tap point, drag or scroll to
 * read, tap again to return. The box is sized from the manifest and filled
 * with the screen's own colour and blur until the image arrives, so nothing
 * shifts.
 */

import { useRef, useState } from 'react';
import { screenUrl } from '@/lib/data/evidence/media';
import { ink } from '../ForgeChrome';

export interface DeskViewEntry {
  w: number;
  h: number;
  widths: number[];
  avif: number[];
  color: string;
  blur: string;
}

interface Props {
  id: string;
  entry: DeskViewEntry;
  alt: string;
  caption: string;
  path: string;
  tilt?: boolean;
  priority?: boolean;
  zoomable?: boolean;
  sizes?: string;
  className?: string;
}

const SIZES = '(min-width: 1024px) 720px, (min-width: 768px) 60vw, 100vw';
const SHADOW = '0 1px 2px rgb(60 40 20 / 0.14), 0 10px 22px -10px rgb(60 40 20 / 0.32), 0 30px 54px -28px rgb(80 50 20 / 0.42)';

export default function DeskView({ id, entry, alt, caption, path, tilt = false, priority = false, zoomable = false, sizes, className = '' }: Props) {
  const [failed, setFailed] = useState(false);
  const [zoom, setZoom] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; sl: number; st: number; moved: boolean } | null>(null);

  const webp = entry.widths.map((w) => `${screenUrl(id, w, 'webp')} ${w}w`).join(', ');
  const avif = entry.avif.map((w) => `${screenUrl(id, w, 'avif')} ${w}w`).join(', ');
  const largest = entry.widths[entry.widths.length - 1];

  const toggle = (cx?: number, cy?: number) => {
    const el = box.current;
    if (!el) return;
    if (zoom) return setZoom(false);
    const r = el.getBoundingClientRect();
    const fx = cx === undefined ? 0.5 : (cx - r.left) / r.width;
    const fy = cy === undefined ? 0.5 : (cy - r.top) / r.height;
    setZoom(true);
    requestAnimationFrame(() => {
      el.scrollLeft = fx * el.scrollWidth - el.clientWidth / 2;
      el.scrollTop = fy * el.scrollHeight - el.clientHeight / 2;
    });
  };

  const tiltClass = tilt
    ? 'motion-safe:md:[transform:rotate(1.5deg)] motion-safe:md:transition-transform motion-safe:md:duration-500 motion-safe:md:hover:[transform:rotate(0deg)] motion-safe:md:focus-within:[transform:rotate(0deg)]'
    : '';

  const sz = zoom ? '220vw' : sizes ?? SIZES;
  const img = (
    <picture>
      {avif ? <source type="image/avif" srcSet={avif} sizes={sz} /> : null}
      <source type="image/webp" srcSet={webp} sizes={sz} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={screenUrl(id, largest, 'webp')}
        alt={alt}
        width={entry.w}
        height={entry.h}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        onError={() => setFailed(true)}
        className="block h-auto w-full select-none"
      />
    </picture>
  );

  const loupe = zoomable
    ? {
        role: 'button' as const,
        tabIndex: 0,
        'aria-pressed': zoom,
        'aria-label': zoom ? 'Zoomed in. Press to fit the screen again.' : 'Zoom in to read the small text',
        onClick: (e: React.MouseEvent) => {
          if (drag.current?.moved) return;
          toggle(e.clientX, e.clientY);
        },
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        },
        onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
          if (!zoom || e.pointerType !== 'mouse') return;
          const el = e.currentTarget;
          drag.current = { x: e.clientX, y: e.clientY, sl: el.scrollLeft, st: el.scrollTop, moved: false };
          el.setPointerCapture(e.pointerId);
        },
        onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => {
          const d = drag.current;
          if (!d) return;
          const dx = e.clientX - d.x;
          const dy = e.clientY - d.y;
          if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
          e.currentTarget.scrollLeft = d.sl - dx;
          e.currentTarget.scrollTop = d.st - dy;
        },
        onPointerUp: () => {
          setTimeout(() => {
            drag.current = null;
          }, 0);
        },
      }
    : {};

  return (
    <figure
      className={`m-0 w-full overflow-hidden rounded-lg ${tiltClass} ${className}`}
      style={{ background: 'var(--card, #fff)', border: `1px solid ${ink(0.14)}`, boxShadow: SHADOW }}
      tabIndex={tilt ? 0 : undefined}
      aria-label={tilt ? alt : undefined}
    >
      <div className="flex items-center gap-2 px-3 py-1.5" style={{ borderBottom: `1px solid ${ink(0.12)}`, background: ink(0.05) }}>
        <span aria-hidden className="flex shrink-0 gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="block h-1.5 w-1.5 rounded-full" style={{ background: ink(0.28) }} />
          ))}
        </span>
        <span className="block min-w-0 flex-1 truncate rounded-full px-2.5 py-0.5 text-center font-mono text-[11px] leading-tight" style={{ color: ink(0.78), background: ink(0.06) }}>
          {path}
        </span>
        <span aria-hidden className="w-[18px] shrink-0" />
      </div>

      {failed ? (
        <div role="img" aria-label={alt} className="flex items-center justify-center p-4 text-center" style={{ aspectRatio: `${entry.w} / ${entry.h}`, background: entry.color }}>
          <p className="m-0 max-w-md text-sm leading-snug" style={{ color: '#F5F0E8' }}>
            {caption}
          </p>
        </div>
      ) : (
        <div
          ref={box}
          {...loupe}
          className={zoomable ? `${zoom ? 'cursor-grab overflow-auto' : 'cursor-zoom-in overflow-hidden'} focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2` : ''}
          style={{
            backgroundColor: entry.color,
            backgroundImage: `url("${entry.blur}")`,
            backgroundSize: 'cover',
            aspectRatio: zoom ? undefined : `${entry.w} / ${entry.h}`,
            maxHeight: zoom ? '68vh' : undefined,
            touchAction: zoom ? 'pan-x pan-y' : undefined,
          }}
        >
          <div style={{ width: zoom ? '220%' : '100%' }}>{img}</div>
        </div>
      )}
    </figure>
  );
}
