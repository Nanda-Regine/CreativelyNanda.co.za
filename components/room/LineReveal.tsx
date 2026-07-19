'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

// LineReveal — the poem arrives in the reader's own breath. Each line fades up
// after the last, stanza breaks holding a longer beat. In "instant" mode
// (Plain / Annotated / reduced-motion) the whole poem is present at once.
// Space / → advance a line; Enter reveals the rest.

interface Props {
  lines: string[];
  tempoMs: number;
  instant?: boolean;
  onComplete?: () => void;
  renderLine: (line: string, index: number, revealed: boolean) => ReactNode;
}

export default function LineReveal({ lines, tempoMs, instant = false, onComplete, renderLine }: Props) {
  const [revealed, setRevealed] = useState(instant ? lines.length : 0);
  const completedRef = useRef(false);
  const revealedRef = useRef(revealed);
  revealedRef.current = revealed;

  const fireComplete = () => {
    if (!completedRef.current) {
      completedRef.current = true;
      onComplete?.();
    }
  };

  // Instant mode: everything present immediately.
  useEffect(() => {
    if (instant) {
      setRevealed(lines.length);
      fireComplete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instant, lines.length]);

  // Paced reveal.
  useEffect(() => {
    if (instant) return;
    if (revealed >= lines.length) {
      fireComplete();
      return;
    }
    // A blank line (stanza break) holds a longer beat.
    const isBreak = (lines[revealed] ?? '').trim().length === 0;
    const delay = revealed === 0 ? 320 : tempoMs * (isBreak ? 1.8 : 1);
    const t = setTimeout(() => setRevealed((n) => n + 1), delay);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed, instant, tempoMs, lines.length]);

  // Keyboard: advance / reveal-all.
  useEffect(() => {
    if (instant) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setRevealed((n) => Math.min(n + 1, lines.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        setRevealed(lines.length);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [instant, lines.length]);

  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="block">
          {renderLine(line, i, i < revealed)}
        </span>
      ))}
    </>
  );
}
