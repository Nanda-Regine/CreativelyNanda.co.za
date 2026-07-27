'use client';

import { useEffect, useRef, useState } from 'react';

const BANK = [
  'i', 'you', 'her', 'the', 'a', 'of', 'and', 'in', 'my', 'we', 'is', 'are',
  'rose', 'roses', 'bloom', 'whisper', 'midnight', 'honey', 'garden', 'ache',
  'tender', 'wild', 'gold', 'breathe', 'longing', 'skin', 'verse', 'moon',
  'thorn', 'sweet', 'quiet', 'becoming', 'soft', 'fire', 'home', 'petal',
  'unfold', 'between', 'her own', 'light',
];

type Tile = { id: number; word: string; x: number; y: number };

export default function MagneticPoetry() {
  const boardRef = useRef<HTMLDivElement>(null);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [drag, setDrag] = useState<{ id: number; dx: number; dy: number } | null>(null);

  const scatter = () => {
    const el = boardRef.current;
    const w = el?.clientWidth ?? 800;
    const h = el?.clientHeight ?? 420;
    setTiles(
      BANK.map((word, id) => ({
        id,
        word,
        x: 12 + Math.random() * Math.max(40, w - 110),
        y: 12 + Math.random() * Math.max(40, h - 60),
      }))
    );
  };

  // client-only init to avoid hydration mismatch
  useEffect(() => { scatter(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  const onDown = (e: React.PointerEvent, t: Tile) => {
    const rect = boardRef.current!.getBoundingClientRect();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDrag({ id: t.id, dx: e.clientX - rect.left - t.x, dy: e.clientY - rect.top - t.y });
    setTiles((ts) => [...ts.filter((x) => x.id !== t.id), t]); // bring to front
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag) return;
    const rect = boardRef.current!.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width - 40, e.clientX - rect.left - drag.dx));
    const y = Math.max(0, Math.min(rect.height - 30, e.clientY - rect.top - drag.dy));
    setTiles((ts) => ts.map((t) => (t.id === drag.id ? { ...t, x, y } : t)));
  };
  const onUp = () => setDrag(null);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#C9943A]">Magnetic poetry</p>
          <p className="mt-1 text-sm text-white/50">Drag the words. Make a line worth keeping.</p>
        </div>
        <button onClick={scatter} className="rounded-full border border-white/25 px-5 py-2 text-sm font-medium text-white transition-all hover:border-[#C9943A] hover:text-[#C9943A]">
          Shuffle
        </button>
      </div>
      <div
        ref={boardRef}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        className="relative h-[440px] w-full touch-none overflow-hidden rounded-xl ring-1 ring-[#C9943A]/25"
        style={{ background: 'linear-gradient(160deg, #11173a 0%, #0A1128 100%)' }}
      >
        {/* faint ruled lines, like a page */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 43px, #C9943A 43px, #C9943A 44px)' }} />
        {tiles.map((t) => (
          <button
            key={t.id}
            onPointerDown={(e) => onDown(e, t)}
            className="absolute cursor-grab touch-none rounded-[3px] px-2.5 py-1 text-[15px] shadow-md active:cursor-grabbing"
            style={{
              left: t.x, top: t.y,
              fontFamily: 'var(--font-display, Georgia, serif)',
              background: '#F5F0E8', color: '#1a1226',
              boxShadow: drag?.id === t.id ? '0 8px 24px rgba(0,0,0,0.5)' : '0 2px 6px rgba(0,0,0,0.35)',
              transform: drag?.id === t.id ? 'scale(1.06)' : 'none',
            }}
          >
            {t.word}
          </button>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-white/35">Tip: a whole poem hides in forty words. Screenshot the one you love.</p>
    </div>
  );
}
