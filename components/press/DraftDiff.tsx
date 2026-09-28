'use client';

/**
 * ✍️ Draft Diff — an essay's revisions, played as diffs.
 *
 * BUILD_JOURNEY §19.3: "version control for prose". The diffs are computed on
 * the server (`getRevisions` in lib/press.ts); this component only chooses
 * which one to show. It renders nothing unless real drafts exist, and the
 * article page does not mount it otherwise.
 *
 * Deletions are struck through in cherry, insertions underlined in gold, so
 * the change reads without colour too.
 */

import { useState } from 'react';
import type { Revision } from '@/lib/press';

export default function DraftDiff({ revisions }: { revisions: Revision[] }) {
  const [i, setI] = useState(revisions.length - 1);
  const r = revisions[i];

  return (
    <section aria-labelledby="drafts-title" className="mt-16 border-t border-[#0A1128]/15 pt-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C9943A]">Version control for prose</p>
      <h2 id="drafts-title" className="mt-2 font-display text-3xl italic text-[#0A1128]">
        The drafts
      </h2>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#0A1128]/65">
        This piece went through {revisions.length - 1} {revisions.length - 1 === 1 ? 'draft' : 'drafts'} before it was published.
        Slide through them. Struck words were cut, underlined words were added.
      </p>

      <div className="mt-7">
        <input
          type="range"
          min={0}
          max={revisions.length - 1}
          value={i}
          onChange={(e) => setI(Number(e.target.value))}
          aria-label="Choose a version"
          aria-valuetext={r.label}
          className="w-full accent-[#C9943A]"
        />
        <div className="mt-2 flex justify-between gap-2 font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#0A1128]/50">
          {revisions.map((v, j) => (
            <button key={v.label} type="button" onClick={() => setI(j)} className={j === i ? 'text-[#C1292E]' : 'hover:text-[#0A1128]'}>
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-[#0A1128]/60" aria-live="polite">
        <span className="text-[#0A1128]">{r.label}</span>
        {r.date ? <span>{r.date}</span> : null}
        <span>{r.words.toLocaleString('en-ZA')} words</span>
        {i > 0 ? (
          <span>
            +{r.added} / −{r.removed}
          </span>
        ) : null}
      </div>
      {r.note ? <p className="mt-3 font-display text-lg italic text-[#6B0F20]">{r.note}</p> : null}

      <div className="mt-6 max-h-[32rem] overflow-y-auto whitespace-pre-wrap rounded-sm border border-[#0A1128]/10 bg-[#FFFDF8] p-6 text-[15px] leading-[1.85] text-[#0A1128]/80">
        {r.segments.map((s, k) =>
          s.op === 'same' ? (
            <span key={k}>{s.text}</span>
          ) : s.op === 'del' ? (
            <del key={k} className="text-[#C1292E] decoration-[#C1292E]">
              {s.text}
            </del>
          ) : (
            <ins key={k} className="bg-[#C9943A]/15 text-[#0A1128] decoration-[#C9943A] underline-offset-4">
              {s.text}
            </ins>
          )
        )}
      </div>
    </section>
  );
}
