'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { MoodKey } from '@/lib/poems-data';

interface MoodContextValue {
  mood: MoodKey | null;
  setMood: (m: MoodKey | null) => void;
  hydrated: boolean;
}

const MoodContext = createContext<MoodContextValue>({
  mood: null,
  setMood: () => {},
  hydrated: false,
});

const STORAGE_KEY = 'gardenMood';

/**
 * Holds the reader's chosen mood for the whole poetry section. The choice
 * washes the ambient atmosphere (via MoodAtmosphere) and filters the garden.
 * Persisted per-device so the garden remembers how they last arrived.
 */
export function MoodProvider({ children }: { children: ReactNode }) {
  const [mood, setMoodState] = useState<MoodKey | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as MoodKey | null;
      if (stored) setMoodState(stored);
    } catch {
      /* private mode / no storage — degrade silently */
    }
    setHydrated(true);
  }, []);

  const setMood = useCallback((m: MoodKey | null) => {
    setMoodState(m);
    try {
      if (m) localStorage.setItem(STORAGE_KEY, m);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <MoodContext.Provider value={{ mood, setMood, hydrated }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  return useContext(MoodContext);
}
