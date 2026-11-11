'use client';

/**
 * Walkthrough video. With no recording (src null) it is a poster frame, a
 * "Recording pending" label and the chapter list as plain text: no play button
 * and no video element, so no media request. With a recording it is a native
 * video with preload none, never autoplaying, and chapters that seek.
 */

import { useRef } from 'react';
import { screenUrl } from '@/lib/data/evidence/media';
import DeskFrame from './DeskFrame';
import { GOLD_INK, ink } from '../ForgeChrome';

interface Props {
  poster: string;
  src: string | null;
  chapters: { label: string; t: number }[];
  title: string;
}

function stamp(t: number): string {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

export default function VideoPlayer({ poster, src, chapters, title }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  const seek = (t: number) => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = t;
  };

  return (
    <section aria-label={title} className="w-full">
      {src === null ? (
        <div className="relative">
          <DeskFrame screenId={poster} />
          <span
            className="absolute bottom-3 left-3 rounded px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em]"
            style={{ background: '#0A1128', color: '#F5F0E8' }}
          >
            Recording pending
          </span>
        </div>
      ) : (
        <video
          ref={ref}
          controls
          preload="none"
          playsInline
          poster={screenUrl(poster, 960, 'webp')}
          aria-label={title}
          className="block h-auto w-full rounded-lg"
          style={{ border: `1px solid ${ink(0.14)}`, background: '#0A1128' }}
        >
          <source src={src} />
        </video>
      )}

      {chapters.length > 0 ? (
        src === null ? (
          <ol className="m-0 mt-3 list-none p-0">
            {chapters.map((c) => (
              <li key={c.label} className="py-1 text-sm" style={{ color: ink(0.82) }}>
                <span className="mr-2 font-mono text-xs" style={{ color: GOLD_INK }}>
                  {stamp(c.t)}
                </span>
                {c.label}
              </li>
            ))}
          </ol>
        ) : (
          <ul className="m-0 mt-3 flex list-none flex-wrap gap-2 p-0">
            {chapters.map((c) => (
              <li key={c.label}>
                <button
                  type="button"
                  onClick={() => seek(c.t)}
                  className="min-h-[44px] rounded-md px-3 text-left text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-ink)]"
                  style={{ border: `1px solid ${ink(0.25)}`, color: ink(0.9) }}
                >
                  <span className="mr-2 font-mono text-xs" style={{ color: GOLD_INK }}>
                    {stamp(c.t)}
                  </span>
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
        )
      ) : null}
    </section>
  );
}
