'use client';

/**
 * The small interactive pieces of an otherwise server-rendered article:
 * the reading-progress hairline, back-to-top, and copy-link. Kept tiny so the
 * article's text never waits on JavaScript.
 */

import { useEffect, useState } from 'react';
import { ChevronUp, Link as LinkIcon, Check } from 'lucide-react';

export function ReadingProgress({ target = 'press-article' }: { target?: string }) {
  const [p, setP] = useState(0);
  const [top, setTop] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = document.getElementById(target);
        setTop(window.scrollY > 600);
        if (!el) return;
        const r = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight * 0.6;
        setP(Math.min(1, Math.max(0, -r.top / Math.max(total, 1))));
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [target]);

  return (
    <>
      <div aria-hidden className="fixed left-0 right-0 top-0 z-50 h-[3px] origin-left bg-[#C9943A]" style={{ transform: `scaleX(${p})` }} />
      {top ? (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to the top"
          className="fixed bottom-24 right-6 z-40 rounded-full bg-[#C9943A] p-3 text-[#0A1128] shadow-lg transition-transform hover:scale-105"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      ) : null}
    </>
  );
}

export function CopyLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(url).then(
          () => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          },
          () => undefined
        );
      }}
      className="inline-flex items-center gap-2 rounded-sm border border-[#0A1128]/15 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#0A1128] transition-opacity hover:opacity-70"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-[#2f6b4f]" /> : <LinkIcon className="h-3.5 w-3.5" />}
      {copied ? 'Copied' : 'Copy link'}
    </button>
  );
}
