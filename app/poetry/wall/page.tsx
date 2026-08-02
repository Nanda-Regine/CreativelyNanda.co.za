'use client';

/**
 * THE WALL — a pinned-paper gallery of Nanda's poems as they lived on Instagram.
 * Each poem is a cluster (an IG carousel = one poem told page by page). Tapping a
 * card opens an immersive reader that flips through the poem's pages, preserving
 * the original page-by-page pacing. Painted art+verse cards sit among them.
 *
 * Hydration-safe: card rotations are derived from the index (deterministic),
 * never Math.random — so server and client render identically.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { POEM_WALL, type WallPoem } from '@/lib/poem-wall-data';
import { cldImg } from '@/lib/cloudinary';

// ── palette ───────────────────────────────────────────────────────────────
const NAVY = '#0A0F2C';
const GOLD = '#C9943A';
const CHERRY = '#C1292E';
const CREAM = '#F5F0E8';

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// deterministic slight tilt per card (no random → no hydration mismatch)
const TILTS = [-2.4, 1.6, -1.1, 2.2, -1.8, 0.9, 2.6, -2.1, 1.2, -0.7];
const tiltFor = (i: number) => TILTS[i % TILTS.length];

export default function PoemWall() {
  const [active, setActive] = useState<number | null>(null); // index into POEM_WALL
  const poem = active !== null ? POEM_WALL[active] : null;

  return (
    <main className="relative min-h-screen" style={{ background: 'radial-gradient(120% 80% at 50% -10%, #EAE0CC 0%, #E4D8BE 45%, #D8CBAC 100%)' }}>
      {/* plaster grain */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ backgroundImage: GRAIN, opacity: 0.16, mixBlendMode: 'multiply' }} />

      {/* ── header ─────────────────────────────────────────────── */}
      <header className="relative z-10 px-6 pt-28 pb-10 text-center">
        <p className="font-mono uppercase mb-4" style={{ color: CHERRY, fontSize: '11px', letterSpacing: '0.34em' }}>
          The House of Roses · A Room
        </p>
        <h1 className="font-display font-bold italic" style={{ color: NAVY, fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', lineHeight: 0.95 }}>
          The Wall
        </h1>
        <p className="mx-auto mt-6 max-w-xl font-light" style={{ color: 'rgba(10,15,44,0.7)', fontSize: '1.1rem', lineHeight: 1.7 }}>
          Every poem the way it first lived — pinned to the wall, told
          <span style={{ color: CHERRY }}> page by page</span>. Tap a card to turn through it.
        </p>
        <div className="mx-auto mt-8 h-px w-24" style={{ background: `${GOLD}` }} />
      </header>

      {/* ── the wall (masonry) ─────────────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-28 sm:px-8">
        <div className="[column-fill:_balance] columns-2 gap-4 sm:columns-3 sm:gap-6 lg:columns-4">
          {POEM_WALL.map((p, i) => (
            <PinnedCard key={p.id} poem={p} index={i} onOpen={() => setActive(i)} />
          ))}
        </div>
      </section>

      {/* ── the reader ─────────────────────────────────────────── */}
      <AnimatePresence>
        {poem && (
          <Reader
            key={poem.id}
            poem={poem}
            onClose={() => setActive(null)}
            onPrevPoem={active! > 0 ? () => setActive(active! - 1) : undefined}
            onNextPoem={active! < POEM_WALL.length - 1 ? () => setActive(active! + 1) : undefined}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

// ── a single pinned paper card ───────────────────────────────────────────────
function PinnedCard({ poem, index, onOpen }: { poem: WallPoem; index: number; onOpen: () => void }) {
  const tilt = tiltFor(index);
  const multi = poem.pages.length > 1;
  return (
    <div className="mb-5 break-inside-avoid sm:mb-7" style={{ transform: `rotate(${tilt}deg)` }}>
      <button
        onClick={onOpen}
        className="group relative block w-full text-left transition-transform duration-300 hover:-translate-y-1 hover:rotate-0"
        aria-label={`Open poem ${index + 1}${multi ? ` (${poem.pages.length} pages)` : ''}`}
      >
        {/* stacked-paper shadow layers for multi-page poems */}
        {multi && (
          <>
            <span className="absolute inset-0 -z-10 translate-x-1.5 translate-y-1.5 rounded-[3px] bg-white/70 shadow" style={{ transform: 'translate(6px,6px) rotate(1.5deg)' }} />
            <span className="absolute inset-0 -z-10 rounded-[3px] bg-white/85" style={{ transform: 'translate(3px,3px) rotate(-1deg)' }} />
          </>
        )}
        {/* the paper */}
        <div className="relative rounded-[3px] bg-[#FCFAF4] p-2 shadow-[0_10px_30px_rgba(10,15,44,0.18)] ring-1 ring-black/5">
          {/* gold pin */}
          <span className="absolute left-1/2 top-1.5 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full shadow" style={{ background: GOLD, boxShadow: `0 0 0 2px #FCFAF4, 0 2px 4px rgba(0,0,0,0.35)` }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cldImg(poem.pages[0], 640)}
            alt={poem.kind === 'art' ? 'A painted poem card by Nandawula Regine' : 'A poem by Nandawula Regine'}
            loading="lazy"
            className="block w-full rounded-[2px]"
            style={{ height: 'auto' }}
          />
          {/* page-count ribbon */}
          {multi && (
            <span className="absolute bottom-3 right-3 rounded-full px-2.5 py-1 font-mono text-[10px] tracking-wider text-white shadow" style={{ background: `${NAVY}cc` }}>
              {poem.pages.length} pages
            </span>
          )}
          {/* hover veil */}
          <div className="pointer-events-none absolute inset-2 rounded-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `linear-gradient(to top, ${NAVY}44, transparent 55%)` }} />
        </div>
      </button>
    </div>
  );
}

// ── immersive page-flip reader ───────────────────────────────────────────────
function Reader({
  poem, onClose, onPrevPoem, onNextPoem,
}: {
  poem: WallPoem; onClose: () => void; onPrevPoem?: () => void; onNextPoem?: () => void;
}) {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(0);
  const total = poem.pages.length;
  const touch = useRef<number | null>(null);

  const go = useCallback((d: number) => {
    setPage((p) => {
      const next = p + d;
      if (next < 0 || next >= total) return p;
      setDir(d);
      return next;
    });
  }, [total]);

  // keyboard nav + lock scroll
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [go, onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ background: `${NAVY}f7`, backdropFilter: 'blur(6px)' }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="fixed inset-0 pointer-events-none opacity-[0.14]" style={{ backgroundImage: GRAIN }} />

      {/* top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 py-4" onClick={(e) => e.stopPropagation()}>
        <span className="font-mono uppercase" style={{ color: GOLD, fontSize: '10px', letterSpacing: '0.28em' }}>
          {poem.kind === 'art' ? 'Painted verse' : `Poem · ${total} ${total === 1 ? 'page' : 'pages'}`}
        </span>
        <button onClick={onClose} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/10" style={{ color: CREAM }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" /></svg>
        </button>
      </div>

      {/* stage */}
      <div
        className="relative z-10 flex flex-1 items-center justify-center px-4 pb-4"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touch.current === null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          if (dx < -40) go(1); else if (dx > 40) go(-1);
          touch.current = null;
        }}
      >
        {/* prev page */}
        {total > 1 && (
          <button onClick={() => go(-1)} disabled={page === 0} aria-label="Previous page"
            className="absolute left-2 z-20 flex h-11 w-11 items-center justify-center rounded-full transition-all disabled:opacity-25 sm:left-6"
            style={{ background: `${CREAM}14`, color: CREAM }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}

        <AnimatePresence mode="wait" custom={dir}>
          <motion.img
            key={page}
            src={cldImg(poem.pages[page], 1400)}
            alt={`Page ${page + 1} of ${total}`}
            custom={dir}
            variants={{
              enter: (d: number) => ({ opacity: 0, x: d >= 0 ? 60 : -60 }),
              center: { opacity: 1, x: 0 },
              exit: (d: number) => ({ opacity: 0, x: d >= 0 ? -60 : 60 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[78vh] max-w-[92vw] rounded-sm object-contain shadow-2xl sm:max-w-[560px]"
            style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.55)' }}
          />
        </AnimatePresence>

        {/* next page */}
        {total > 1 && (
          <button onClick={() => go(1)} disabled={page === total - 1} aria-label="Next page"
            className="absolute right-2 z-20 flex h-11 w-11 items-center justify-center rounded-full transition-all disabled:opacity-25 sm:right-6"
            style={{ background: `${CREAM}14`, color: CREAM }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        )}
      </div>

      {/* footer: page dots + poem nav */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-5 pb-7" onClick={(e) => e.stopPropagation()}>
        {total > 1 && (
          <div className="flex items-center gap-2">
            {poem.pages.map((_, i) => (
              <button key={i} onClick={() => { setDir(i > page ? 1 : -1); setPage(i); }} aria-label={`Go to page ${i + 1}`}
                className="h-1.5 rounded-full transition-all"
                style={{ width: i === page ? 22 : 6, background: i === page ? GOLD : `${CREAM}44` }} />
            ))}
          </div>
        )}
        <div className="flex items-center gap-6">
          <button onClick={onPrevPoem} disabled={!onPrevPoem} className="font-mono text-[11px] uppercase tracking-[0.2em] transition-opacity disabled:opacity-25" style={{ color: `${CREAM}aa` }}>
            ← Prev poem
          </button>
          <span className="font-mono text-[11px] tracking-[0.2em]" style={{ color: GOLD }}>
            {total > 1 ? `${page + 1} / ${total}` : '·'}
          </span>
          <button onClick={onNextPoem} disabled={!onNextPoem} className="font-mono text-[11px] uppercase tracking-[0.2em] transition-opacity disabled:opacity-25" style={{ color: `${CREAM}aa` }}>
            Next poem →
          </button>
        </div>
      </div>
    </motion.div>
  );
}
