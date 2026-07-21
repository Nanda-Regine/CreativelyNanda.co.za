'use client';

import { useCallback, useEffect, useState } from 'react';

const SIZE = 12;
const WORDS = ['ROSE', 'BLOOM', 'VERSE', 'MUSE', 'PETAL', 'STANZA', 'GARDEN', 'POET', 'THORN', 'HONEY', 'DAWN', 'INK'];
const DIRS = [[0, 1], [1, 0], [1, 1], [1, -1], [0, -1], [-1, 0], [-1, -1], [-1, 1]];
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const key = (r: number, c: number) => `${r},${c}`;

type Grid = string[][];

function generate(): { grid: Grid; placed: string[] } {
  const grid: Grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(''));
  const placedWords: string[] = [];
  for (const word of WORDS) {
    let done = false;
    for (let t = 0; t < 120 && !done; t++) {
      const [dr, dc] = DIRS[Math.floor(Math.random() * DIRS.length)];
      const r0 = Math.floor(Math.random() * SIZE);
      const c0 = Math.floor(Math.random() * SIZE);
      const cells: [number, number][] = [];
      let ok = true;
      for (let i = 0; i < word.length; i++) {
        const r = r0 + dr * i, c = c0 + dc * i;
        if (r < 0 || r >= SIZE || c < 0 || c >= SIZE) { ok = false; break; }
        if (grid[r][c] && grid[r][c] !== word[i]) { ok = false; break; }
        cells.push([r, c]);
      }
      if (ok) {
        cells.forEach(([r, c], i) => { grid[r][c] = word[i]; });
        placedWords.push(word);
        done = true;
      }
    }
  }
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      if (!grid[r][c]) grid[r][c] = ALPHA[Math.floor(Math.random() * 26)];
  return { grid, placed: placedWords };
}

function lineCells(a: [number, number], b: [number, number]): [number, number][] | null {
  const [r0, c0] = a, [r1, c1] = b;
  const dr = r1 - r0, dc = c1 - c0;
  if (!(dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc))) return null;
  const len = Math.max(Math.abs(dr), Math.abs(dc));
  const sr = Math.sign(dr), sc = Math.sign(dc);
  const out: [number, number][] = [];
  for (let i = 0; i <= len; i++) out.push([r0 + sr * i, c0 + sc * i]);
  return out;
}

export default function WordSearch() {
  const [grid, setGrid] = useState<Grid | null>(null);
  const [placed, setPlaced] = useState<string[]>([]);
  const [found, setFound] = useState<Set<string>>(new Set());
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set());
  const [start, setStart] = useState<[number, number] | null>(null);
  const [cur, setCur] = useState<[number, number] | null>(null);
  const [flash, setFlash] = useState<string>('');

  const reset = useCallback(() => {
    const g = generate();
    setGrid(g.grid); setPlaced(g.placed);
    setFound(new Set()); setFoundCells(new Set());
    setStart(null); setCur(null); setFlash('');
  }, []);

  useEffect(() => { reset(); }, [reset]);

  const sel = start && cur ? lineCells(start, cur) : null;
  const selSet = new Set((sel ?? []).map(([r, c]) => key(r, c)));

  const finish = () => {
    if (grid && sel && sel.length > 1) {
      const word = sel.map(([r, c]) => grid[r][c]).join('');
      const rev = word.split('').reverse().join('');
      const hit = placed.find((w) => (w === word || w === rev) && !found.has(w));
      if (hit) {
        setFound((f) => new Set(f).add(hit));
        setFoundCells((fc) => { const n = new Set(fc); sel.forEach(([r, c]) => n.add(key(r, c))); return n; });
        setFlash(hit);
        setTimeout(() => setFlash(''), 1200);
      }
    }
    setStart(null); setCur(null);
  };

  if (!grid) return <div className="py-20 text-center text-white/40">Setting the garden…</div>;

  const won = found.size === placed.length;

  return (
    <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center">
      <div
        className="select-none touch-none rounded-xl bg-[#0d1330] p-2 ring-1 ring-[#C9943A]/25 shadow-2xl"
        style={{ display: 'grid', gridTemplateColumns: `repeat(${SIZE}, minmax(0,1fr))` }}
        onPointerLeave={() => { if (start) finish(); }}
      >
        {grid.map((row, r) =>
          row.map((letter, c) => {
            const k = key(r, c);
            const isFound = foundCells.has(k);
            const isSel = selSet.has(k);
            return (
              <div
                key={k}
                onPointerDown={(e) => { (e.target as HTMLElement).releasePointerCapture?.(e.pointerId); setStart([r, c]); setCur([r, c]); }}
                onPointerEnter={() => { if (start) setCur([r, c]); }}
                onPointerUp={finish}
                className={`flex aspect-square w-7 items-center justify-center text-[13px] font-semibold transition-colors sm:w-9 sm:text-base md:w-10
                  ${isFound ? 'rounded-full bg-[#C9943A] text-[#0A1128]' : isSel ? 'rounded-full bg-[#C1292E] text-white' : 'text-white/80'}`}
                style={{ cursor: 'pointer', fontFamily: 'var(--font-mono, monospace)' }}
              >
                {letter}
              </div>
            );
          })
        )}
      </div>

      <div className="w-full max-w-xs">
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#C9943A]">Find the garden’s words</p>
        <p className="mb-4 mt-1 text-sm text-white/50">Drag across the letters — any direction.</p>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {WORDS.map((w) => (
            <li key={w} className={`font-display text-lg italic transition-all ${found.has(w) ? 'text-[#C9943A] line-through opacity-60' : 'text-white/85'}`}>
              {w.toLowerCase()}
            </li>
          ))}
        </ul>
        <div className="mt-5 h-6">
          {flash && <p className="font-display text-lg italic text-[#E4572E]">“{flash.toLowerCase()}” — found.</p>}
          {won && <p className="font-display text-xl italic text-[#C9943A]">Every word, gathered. 🌹</p>}
        </div>
        <button onClick={reset} className="mt-4 rounded-full border border-white/25 px-6 py-2.5 text-sm font-medium text-white transition-all hover:border-[#C9943A] hover:text-[#C9943A]">
          New garden
        </button>
      </div>
    </div>
  );
}
