'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSessionId } from '@/hooks/useSessionId';

/**
 * Leave a petal on a fellow writer's poem — the recognition loop that makes
 * the Guest Garden feel alive. Session-based, optimistic, no account needed.
 */
export default function PetalButton({ guestPoemId }: { guestPoemId: string }) {
  const sessionId = useSessionId();
  const [count, setCount] = useState(0);
  const [petaled, setPetaled] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const url = `/api/poetry/guest-poems/${guestPoemId}/petal${sessionId ? `?sessionId=${sessionId}` : ''}`;
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.count === 'number') setCount(d.count);
        setPetaled(!!d.hasPetaled);
      })
      .catch(() => {});
  }, [guestPoemId, sessionId]);

  const toggle = async () => {
    if (!sessionId || busy) return;
    setBusy(true);
    const wasPetaled = petaled;
    // optimistic
    setPetaled(!wasPetaled);
    setCount((c) => Math.max(0, c + (wasPetaled ? -1 : 1)));
    try {
      const res = await fetch(`/api/poetry/guest-poems/${guestPoemId}/petal`, {
        method: wasPetaled ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });
      const d = await res.json();
      if (typeof d.count === 'number') {
        setCount(d.count);
        setPetaled(!!d.hasPetaled);
      }
    } catch {
      // revert on failure
      setPetaled(wasPetaled);
      setCount((c) => Math.max(0, c + (wasPetaled ? 1 : -1)));
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={!sessionId}
      aria-pressed={petaled}
      title={petaled ? 'Take your petal back' : 'Leave a petal'}
      className={`inline-flex items-center gap-1.5 text-sm rounded-full px-3 py-1.5 border transition-colors ${
        petaled
          ? 'border-cherry/40 bg-cherry/10 text-cherry'
          : 'border-white/10 text-cream/55 hover:text-cream hover:border-white/25'
      }`}
    >
      <motion.span animate={petaled ? { scale: [1, 1.4, 1] } : {}} transition={{ duration: 0.35 }}>
        🌸
      </motion.span>
      <span>{count}</span>
      <span className="text-xs opacity-70">{count === 1 ? 'petal' : 'petals'}</span>
    </button>
  );
}
