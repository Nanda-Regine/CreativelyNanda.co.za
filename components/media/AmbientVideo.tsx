'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * AmbientVideo — a muted, looping clip used AS a section background (not a click-to-play box).
 * - Autoplays muted + inline (allowed on mobile), loops seamlessly.
 * - Only plays while in the viewport (IntersectionObserver) to save battery/CPU.
 * - Honors prefers-reduced-motion: renders the poster still instead of the video.
 * - Always shows the poster first for instant paint, then the video fades in.
 */
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  // Reduced motion → still image only.
  if (reduced) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={poster}
        alt={alt}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
        style={{ objectPosition }}
      />
    );
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt={alt}
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          ready ? 'opacity-0' : 'opacity-100'
        } ${className}`}
        style={{ objectPosition }}
      />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        poster={poster}
        onPlaying={() => setReady(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          ready ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={{ objectPosition }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </>
  );
}
