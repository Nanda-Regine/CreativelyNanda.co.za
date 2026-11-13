'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * AmbientVideo: a muted, looping clip used AS a section background (not a click-to-play box).
 * Text first, media after (audience panel, Nov 2026):
 * - The poster still paints first and loads lazily.
 * - The <video> is not in the DOM until the section is near the viewport, so nothing downloads early.
 * - On Data Saver or a slow connection (2G/3G) the video never loads; the still stays.
 * - Honors prefers-reduced-motion: still image only.
 * - Plays only while visible, to save battery and CPU.
 */

type NetInfo = { saveData?: boolean; effectiveType?: string };

function connectionAllowsVideo(): boolean {
  const c = (navigator as Navigator & { connection?: NetInfo }).connection;
  if (!c) return true;
  if (c.saveData) return false;
  return !['slow-2g', '2g', '3g'].includes(c.effectiveType ?? '');
}

export default function AmbientVideo({
  src,
  poster,
  className = '',
  objectPosition = 'center',
  alt = '',
}: {
  src: string;
  poster: string;
  className?: string;
  objectPosition?: string;
  alt?: string;
}) {
  const posterRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  // Decide whether to load the clip at all, once the section comes near the viewport.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!connectionAllowsVideo()) return;
    const el = posterRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Once loaded, play only while visible.
  useEffect(() => {
    const el = videoRef.current;
    if (!load || !el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [load]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={posterRef}
        src={poster}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          ready ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        style={{ objectPosition }}
      />
      {load && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          onPlaying={() => setReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            ready ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          style={{ objectPosition }}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </>
  );
}
