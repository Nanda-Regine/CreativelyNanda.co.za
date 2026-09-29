'use client';

/**
 * What readers wrote back: real screenshots, hung like papers pinned to a
 * wall, each at its own small angle. Any one opens full size.
 */

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const TILT = [-2.5, 1.8, -1.2, 2.6, -2, 1.1, -1.6, 2.2, -2.8, 1.4];

export default function ReaderWall({ images }: { images: { src: string; full: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const strip = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open === null) return;
    close.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((o) => (o === null ? o : Math.min(images.length - 1, o + 1)));
      if (e.key === 'ArrowLeft') setOpen((o) => (o === null ? o : Math.max(0, o - 1)));
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, images.length]);

  return (
    <>
      <div className="relative">
        <div
          ref={strip}
          className="[scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex snap-x items-start gap-8 overflow-x-auto pb-10 pr-6 pt-6"
          style={{ paddingLeft: 'max(1.5rem, calc((100vw - 72rem) / 2 + 1.5rem))', scrollPaddingLeft: 'max(1.5rem, calc((100vw - 72rem) / 2 + 1.5rem))' }}
        >
          {images.map((im, i) => (
            <button
              key={im.src}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open reader response ${i + 1}`}
              className="group relative w-[210px] shrink-0 snap-start bg-[#FBF8F2] p-2.5 pb-8 transition-transform duration-500 hover:z-10 hover:!rotate-0 hover:scale-[1.04] md:w-[240px]"
              style={{ transform: `rotate(${TILT[i % TILT.length]}deg)`, boxShadow: '0 22px 40px -22px rgba(58,38,12,0.45)' }}
            >
              <span aria-hidden className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C21E56] shadow" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={im.src} alt={`A reader's response to Inside Her Roses (${i + 1})`} loading="lazy" className="max-h-[320px] w-full object-cover object-top" />
            </button>
          ))}
        </div>
        <div className="mx-auto mt-2 flex max-w-6xl justify-end gap-2 px-6">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => strip.current?.scrollBy({ left: d * 520, behavior: 'smooth' })}
              aria-label={d < 0 ? 'Scroll back' : 'Scroll forward'}
              className="flex h-11 w-11 items-center justify-center rounded-full border t-head transition-colors hover:bg-black/5"
              style={{ borderColor: 'var(--rule)' }}
            >
              {d < 0 ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </div>

      {open !== null && typeof document !== 'undefined'
        ? createPortal(
            <div role="dialog" aria-modal="true" aria-label="Reader response" className="fixed inset-0 z-[90] flex items-center justify-center bg-[#070b1c]/92 p-4 backdrop-blur-sm" onClick={() => setOpen(null)}>
              <button ref={close} type="button" onClick={() => setOpen(null)} aria-label="Close" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-[#F5F0E8]">
                <X className="h-4 w-4" />
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images[open].full} alt={`A reader's response to Inside Her Roses (${open + 1})`} className="max-h-[88vh] max-w-full rounded shadow-2xl" onClick={(e) => e.stopPropagation()} />
            </div>,
            document.body
          )
        : null}
    </>
  );
}
