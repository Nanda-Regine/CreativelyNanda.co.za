'use client';

import { useState, useEffect } from 'react';

const STREAK_KEY = 'cn_poetry_streak';
const LAST_VISIT_KEY = 'cn_poetry_last_visit';

// Local calendar day as YYYY-MM-DD (reader's own timezone)
function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = a.split('-').map(Number);
  const [by, bm, bd] = b.split('-').map(Number);
  const da = Date.UTC(ay, am - 1, ad);
  const db = Date.UTC(by, bm - 1, bd);
  return Math.round((db - da) / 86_400_000);
}

/**
 * Tracks how many consecutive days the reader has visited the garden.
 * Returns 0 until hydrated on the client. Purely local — no account needed.
 */
export function useVisitStreak(): number {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const now = today();
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    const stored = Number(localStorage.getItem(STREAK_KEY) || '0');

    let next: number;
    if (!lastVisit) {
      next = 1;
    } else {
      const gap = daysBetween(lastVisit, now);
      if (gap === 0) next = Math.max(stored, 1); // already counted today
      else if (gap === 1) next = stored + 1;     // consecutive day
      else next = 1;                             // streak broken
    }

    localStorage.setItem(STREAK_KEY, String(next));
    localStorage.setItem(LAST_VISIT_KEY, now);
    setStreak(next);
  }, []);

  return streak;
}
