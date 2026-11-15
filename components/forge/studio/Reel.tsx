'use client';

/**
 * Watch it run: a contact strip of chapter posters, each labelled with its
 * duration and size. Tapping one loads only that chapter (a native video,
 * preload none, 640 or 960 wide chosen at tap time). On Save-Data or a 2G/3G
 * connection no video element is ever rendered: the chapter shows four stills
 * and its text summary instead. Every chapter prints its summary (WCAG 1.2.1).
 * The server render and first client render are identical: posters only.
 */

import { useEffect, useState } from 'react';

export interface ReelSegment {
  n: number;
  label: string;
  summary: string;
  durationS: number;
  files: { w: number; bytes: number; key: string }[];
  poster: string;
  stills: string[];
}
export interface ReelData {
  id: string;
  w: number;
  h: number;
  segments: ReelSegment[];
}

type Net = 'unknown' | 'ok' | 'constrained';

function useConstrainedNetwork(): Net {
  const [net, setNet] = useState<Net>('unknown');
  useEffect(() => {
    const c = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    setNet(c && (c.saveData === true || ['slow-2g', '2g', '3g'].includes(c.effectiveType ?? '')) ? 'constrained' : 'ok');
  }, []);
  return net;
}

const mb = (b: number) => `${(b / 1_000_000).toFixed(1)} MB`;
const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;

function Chapter({ seg, base, w, h, net }: { seg: ReelSegment; base: string; w: number; h: number; net: Net }) {
  const [playing, setPlaying] = useState<string | null>(null);
  const sizes = seg.files.map((f) => f.bytes);
  const lo = Math.min(...sizes);
  const hi = Math.max(...sizes);
  const size = sizes.length ? (lo === hi ? mb(lo) : `${mb(lo)} to ${mb(hi)}`) : '';
  const poster = `${base}/${seg.poster}`;

  const play = () => {
    const want = window.innerWidth < 768 ? 640 : 960;
    const file = seg.files.find((f) => f.w === want) ?? seg.files[0];
    if (file) setPlaying(`${base}/${file.key}`);
  };

  return (
    <li className="m-0 w-[78vw] max-w-[420px] shrink-0 snap-start list-none p-0 md:w-auto md:max-w-none md:shrink">
      <div className="overflow-hidden rounded-md" style={{ aspectRatio: `${w} / ${h}`, background: '#0b0d16' }}>
        {net === 'constrained' ? (
          <div className="grid h-full grid-cols-2 gap-px">
            {seg.stills.slice(0, 4).map((s) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={s} src={`${base}/${s}-480.webp`} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            ))}
          </div>
        ) : playing ? (
          <video src={playing} poster={`${poster}-960.webp`} controls autoPlay playsInline preload="none" className="h-full w-full" aria-label={`${seg.label}, recording`} />
        ) : (
          <button
            type="button"
            onClick={play}
            aria-label={`Play chapter ${seg.n}: ${seg.label}, ${clock(seg.durationS)}, ${size}`}
            className="relative block h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#C9943A]"
          >
            <picture>
              <source type="image/avif" srcSet={`${poster}-960.avif`} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${poster}-480.webp`}
                srcSet={`${poster}-480.webp 480w, ${poster}-960.webp 960w`}
                sizes="(min-width: 768px) 30vw, 78vw"
                alt=""
                width={w}
                height={h}
                loading="lazy"
                decoding="async"
                className="block h-full w-full object-cover"
              />
            </picture>
            <span aria-hidden className="absolute left-2 top-2 rounded px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em]" style={{ background: '#0A1128', color: '#F5F0E8' }}>
              Play
            </span>
          </button>
        )}
      </div>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] t-gold">
        Ch. {String(seg.n).padStart(2, '0')} · {clock(seg.durationS)}, {size}
      </p>
      <h4 className="mt-1 font-display text-xl italic t-head">{seg.label}</h4>
      <p className="mt-1 max-w-sm text-[13px] font-light leading-relaxed t-ink">{seg.summary}</p>
    </li>
  );
}

export default function Reel({ reel, base, name }: { reel: ReelData; base: string; name: string }) {
  const net = useConstrainedNetwork();
  return (
    <div className="mx-auto max-w-6xl">
      <p className="kicker t-gold">Watch it run</p>
      <h3 className="display-l mt-3 font-display italic t-head" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
        {name}, in motion.
      </h3>
      <p className="mt-3 max-w-xl t-ink">
        Short chapters. Nothing plays until you tap, and only the chapter you tap is downloaded.
        {net === 'constrained' ? ' You are on a slow or data-saving connection, so each chapter shows stills instead of video.' : ''}
      </p>
      <ul className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden m-0 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto p-0 md:grid md:grid-cols-3 md:overflow-visible">
        {reel.segments.map((s) => (
          <Chapter key={s.n} seg={s} base={base} w={reel.w} h={reel.h} net={net} />
        ))}
      </ul>
    </div>
  );
}
