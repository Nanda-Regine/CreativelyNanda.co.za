'use client';

import type { ReactNode } from 'react';
import { MoodProvider } from './MoodProvider';
import MoodAtmosphere from './MoodAtmosphere';

/**
 * Client shell for the whole poetry section: provides the shared mood state
 * and renders the living atmosphere behind every poetry page. Kept separate
 * from app/poetry/layout.tsx so that layout can stay a Server Component and
 * keep exporting SEO metadata.
 */
export default function PoetryAtmosphereShell({ children }: { children: ReactNode }) {
  return (
    <MoodProvider>
      <MoodAtmosphere />
      {children}
    </MoodProvider>
  );
}
