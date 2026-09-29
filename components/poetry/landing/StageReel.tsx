'use client';

/**
 * On stage and on air: the performance films and the two radio interviews.
 * One lead film large, the rest as a contact strip, and a screening overlay
 * that plays the chosen film from its Drive embed.
 */

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Play, X } from 'lucide-react';

export type Film = { id: string; title: string; kind: string; cover: string; embed: string };

function Screening({ film, onClose }: { film: Film; onClose: () => void }) {
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    close.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={film.title} className="fixed inset-0 z-[90] flex flex-col bg-[#070b1c]/95 p-4 backdrop-blur-sm md:p-10" onClick={onClose}>
      <div className="mb-4 flex items-center justify-between">
        <p className="kicker" style={{ color: '#C9943A' }}>
          {film.kind} · <span className="text-[#F5F0E8]">{film.title}</span>
        </p>
        <button ref={close} type="button" onClick={onClose} aria-label="Close" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[#F5F0E8] hover:bg-white/5">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="relative mx-auto w-full max-w-5xl flex-1" onClick={(e) => e.stopPropagation()}>
        <iframe src={film.embed} title={film.title} allow="autoplay; fullscreen" allowFullScreen className="absolute inset-0 h-full w-full rounded-lg" />
      </div>
    </div>,
    document.body
  );
}

function Tile({ film, lead, onPlay }: { film: Film; lead?: boolean; onPlay: () => void }) {
  // The covers are her own title cards, so the caption sits under the frame,
  // never on top of the title already printed in it.
  return (
    <button type="button" onClick={onPlay} className={`group flex w-full flex-col text-left ${lead ? 'md:h-full' : ''}`} aria-label={`Play: ${film.title}`}>
      <span className={`relative block w-full overflow-hidden ${lead ? 'aspect-[4/3] md:aspect-auto md:min-h-0 md:flex-1' : 'aspect-[16/10]'}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={film.cover} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className={`absolute flex items-center justify-center rounded-full bg-[#C21E56] text-white shadow-xl transition-transform duration-500 group-hover:scale-110 ${lead ? 'bottom-6 right-6 h-16 w-16' : 'bottom-3 right-3 h-10 w-10'}`}>
          <Play className={lead ? 'ml-1 h-6 w-6' : 'ml-0.5 h-4 w-4'} />
        </span>
      </span>
      <span className="mt-3 flex items-baseline gap-3">
        <span className="kicker" style={{ color: '#E7B45C', fontSize: 9.5 }}>
          {film.kind}
        </span>
        <span className={`font-display italic text-[#F5F0E8] ${lead ? 'text-2xl md:text-3xl' : 'text-lg'}`}>{film.title}</span>
      </span>
    </button>
  );
}

export default function StageReel({ films }: { films: Film[] }) {
  const [open, setOpen] = useState<Film | null>(null);
  const [lead, ...rest] = films;
  return (
    <>
      <div className="grid gap-8 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-7 md:flex">
          <Tile film={lead} lead onPlay={() => setOpen(lead)} />
        </div>
        <div className="grid grid-cols-2 gap-6 md:col-span-5 md:grid-cols-1 md:gap-5">
          {rest.slice(0, 3).map((f) => (
            <Tile key={f.id} film={f} onPlay={() => setOpen(f)} />
          ))}
        </div>
        {rest.length > 3 ? (
          <div className="grid grid-cols-2 gap-5 md:col-span-12 md:grid-cols-2 md:gap-6">
            {rest.slice(3).map((f) => (
              <Tile key={f.id} film={f} onPlay={() => setOpen(f)} />
            ))}
          </div>
        ) : null}
      </div>
      {open ? <Screening film={open} onClose={() => setOpen(null)} /> : null}
    </>
  );
}
