'use client';

/**
 * A phone drawn in CSS, for the App Studio.
 *
 * Drawn rather than a PNG frame, so it scales to any size with a crisp bezel
 * and costs no download. The screen waits on a warm gradient in the app's own
 * accent and fades in when the image arrives, so a slow first load from the CDN
 * reads as a phone waking up rather than a black rectangle. `children` render
 * over the screen, which is how the Anatomy pins are placed.
 */

import { useEffect, useRef, useState } from 'react';
import { cldScreenId, type Screen } from '@/lib/data/app-screens';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
export const screenSrc = (sc: Pick<Screen, 'app' | 'id'>, w: number) =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_${w},c_limit/${cldScreenId(sc)}`;

export default function StudioPhone({
  screen,
  width,
  accent = '#C9943A',
  eager = false,
  className = '',
  style,
  children,
}: {
  screen: Screen;
  /** Design width in px. Bezel, radius and shadow scale from it; CSS may resize the element. */
  width: number;
  accent?: string;
  eager?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  const bezel = Math.max(4, Math.round(width * 0.035));
  const radius = Math.round(width * 0.14);

  // A cached image can finish before hydration attaches onLoad.
  useEffect(() => {
    setLoaded(false);
    if (img.current?.complete && img.current.naturalWidth > 0) setLoaded(true);
  }, [screen.id]);

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{
        width,
        padding: bezel,
        borderRadius: radius,
        background: 'linear-gradient(145deg, #2a2a33, #0c0c10 40%, #1b1b22)',
        boxShadow: `0 0 0 1px rgba(255,255,255,0.08), 0 ${width * 0.12}px ${width * 0.3}px -${width * 0.08}px rgba(0,0,0,0.75), 0 0 ${width * 0.35}px -${width * 0.12}px ${accent}55`,
        ...style,
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{ borderRadius: radius - bezel, aspectRatio: '9 / 20', background: `radial-gradient(120% 70% at 50% 0%, ${accent}33, #0b0d16 70%)` }}
      >
        {!loaded ? <span aria-hidden className="absolute inset-0 animate-pulse" style={{ background: `linear-gradient(180deg, transparent, ${accent}14, transparent)` }} /> : null}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={img}
          src={screenSrc(screen, Math.min(1080, Math.round(width * 2)))}
          alt={screen.caption}
          width={width}
          height={Math.round((width * 20) / 9)}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className="relative h-full w-full object-cover object-top transition-opacity duration-700"
          style={{ opacity: loaded ? 1 : 0 }}
        />
        <span
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black"
          style={{ top: '1%', width: '3.6%', aspectRatio: '1', boxShadow: '0 0 0 1px rgba(255,255,255,0.12)' }}
        />
        {children}
      </div>
      <span aria-hidden className="absolute rounded-r" style={{ right: -2, top: '22%', width: 2, height: '9%', background: '#2a2a33' }} />
      <span aria-hidden className="absolute rounded-r" style={{ right: -2, top: '34%', width: 2, height: '14%', background: '#2a2a33' }} />
    </div>
  );
}
