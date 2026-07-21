'use client';

import { useEffect, useState } from 'react';

const PROMPTS = [
  'She keeps her softness where',
  'In the language of longing, I',
  'The rose does not apologise for',
  'Between the code and the ache, there is',
  'At midnight, the garden becomes',
  'I come from nine generations of',
  'Grief is only love with',
  'The sea keeps turning me toward',
  'Some hungers are holy —',
  'Before I had words, I had',
  'My name is a woman who',
  'Teach me to hold the thorn like',
];

type Kept = { prompt: string; line: string };
const LS = 'ftl_kept_v1';

export default function FinishTheLine() {
  const [idx, setIdx] = useState(0);
  const [line, setLine] = useState('');
  const [kept, setKept] = useState<Kept[]>([]);

  useEffect(() => {
    try { const raw = localStorage.getItem(LS); if (raw) setKept(JSON.parse(raw)); } catch { /* ignore */ }
    setIdx(Math.floor(Math.random() * PROMPTS.length));
  }, []);

  const persist = (next: Kept[]) => { setKept(next); try { localStorage.setItem(LS, JSON.stringify(next)); } catch { /* ignore */ } };

  const another = () => { setIdx((i) => (i + 1 + Math.floor(Math.random() * (PROMPTS.length - 1))) % PROMPTS.length); setLine(''); };
  const keep = () => {
    if (!line.trim()) return;
    persist([{ prompt: PROMPTS[idx], line: line.trim() }, ...kept].slice(0, 30));
    setLine('');
    another();
  };
  const remove = (i: number) => persist(kept.filter((_, j) => j !== i));

  return (
    <div className="mx-auto max-w-2xl">
      <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#C9943A]">Finish the line</p>
      <p className="mb-6 mt-1 text-sm text-white/50">A first line is given. The rest is yours.</p>

      <div className="rounded-2xl border border-[#C9943A]/25 bg-white/[0.03] p-6 md:p-8">
        <p className="font-display text-2xl italic leading-snug text-white md:text-3xl">
          {PROMPTS[idx]} <span className="text-[#C9943A]">…</span>
        </p>
        <textarea
          value={line}
          onChange={(e) => setLine(e.target.value)}
          rows={3}
          placeholder="…finish it in your own hand"
          className="mt-4 w-full resize-none rounded-lg border border-white/15 bg-[#0d1330] p-4 font-display text-xl italic text-white/90 outline-none transition-colors placeholder:text-white/25 focus:border-[#C9943A]/60"
        />
        <div className="mt-4 flex gap-3">
          <button onClick={keep} className="rounded-full bg-[#C1292E] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105">
            Keep it
          </button>
          <button onClick={another} className="rounded-full border border-white/25 px-6 py-2.5 text-sm font-medium text-white transition-all hover:border-[#C9943A] hover:text-[#C9943A]">
            Another line
          </button>
        </div>
      </div>

      {kept.length > 0 && (
        <div className="mt-8">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#C9943A] mb-4">Your kept lines</p>
          <ul className="space-y-4">
            {kept.map((k, i) => (
              <li key={i} className="group border-l-2 border-[#C9943A]/40 pl-4">
                <p className="font-display text-lg italic leading-snug text-white/90">
                  {k.prompt} {k.line}
                </p>
                <button onClick={() => remove(i)} className="mt-1 text-[11px] uppercase tracking-wider text-white/30 opacity-0 transition-opacity hover:text-[#E4572E] group-hover:opacity-100">
                  remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
