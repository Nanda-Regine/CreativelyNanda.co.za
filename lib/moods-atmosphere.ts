// ─────────────────────────────────────────────────────────────────────────────
// Mood Atmosphere — the ambient "background vibe" that washes the whole poetry
// section. Design language (studied from mirembemuse.co.za / sanyubotanicals.co.za
// / varsityos.co.za): the PHOTOGRAPH breathes at near-full strength; the colour
// tint is light and warm, weighted to the edges so the type stays legible without
// drowning the image. Gold is the metal. Grain gives everything a material skin.
//
// To re-pair a painting with a mood, change only its `image` below.
// ─────────────────────────────────────────────────────────────────────────────
import type { MoodKey } from '@/lib/poems-data';

export interface MoodAtmosphere {
  key: MoodKey;
  image: string;        // full-bleed background painting (in /public/assets/art)
  wash: string;         // dominant colour of the mood (matches MOODS.wash)
  gradient: string;     // light colour-tint overlaid on the painting (edge-weighted)
  imageOpacity: number; // how much of the painting shows through (kept high — it breathes)
}

// A radial-then-linear tint: transparent in the middle so the image reads, a
// warm deepening at the foot + corners so headings and body stay legible.
function tint(r: number, g: number, b: number): string {
  const c = (a: number) => `rgba(${r},${g},${b},${a})`;
  return (
    `radial-gradient(120% 95% at 50% 20%, ${c(0.03)} 0%, ${c(0.16)} 62%, ${c(0.4)} 100%), ` +
    `linear-gradient(to top, ${c(0.34)} 0%, ${c(0.05)} 50%, ${c(0.02)} 100%)`
  );
}

export const MOOD_ATMOSPHERES: Record<MoodKey, MoodAtmosphere> = {
  longing: {
    key: 'longing',
    image: '/assets/art/petal.jpg',
    wash: '#5c1f38',
    gradient: tint(58, 18, 32),
    imageOpacity: 0.72,
  },
  desire: {
    key: 'desire',
    image: '/assets/art/bloom.jpg',
    wash: '#6b1330',
    gradient: tint(58, 10, 24),
    imageOpacity: 0.74,
  },
  wonder: {
    key: 'wonder',
    image: '/assets/art/aurora.jpg',
    wash: '#1f4a3f',
    gradient: tint(14, 34, 29),
    imageOpacity: 0.72,
  },
  reflection: {
    key: 'reflection',
    image: '/assets/art/water.jpg',
    wash: '#332f52',
    gradient: tint(22, 20, 40),
    imageOpacity: 0.72,
  },
  solace: {
    key: 'solace',
    image: '/assets/art/sapphire.jpg',
    wash: '#16304f',
    gradient: tint(9, 20, 36),
    imageOpacity: 0.72,
  },
  fire: {
    key: 'fire',
    image: '/assets/art/bloom.jpg',
    wash: '#6e5216',
    gradient: tint(46, 32, 10),
    imageOpacity: 0.76,
  },
};

// The neutral atmosphere before a reader has chosen a mood — the Threshold.
// A graceful dancer, now shown richly rather than buried under navy.
export const THRESHOLD_ATMOSPHERE: Omit<MoodAtmosphere, 'key'> = {
  image: '/assets/background%20images/poetry-collection-background.jpg',
  wash: '#3a1420',
  gradient: tint(46, 18, 28),
  imageOpacity: 0.85,
};

export function getAtmosphere(mood: MoodKey | null): Omit<MoodAtmosphere, 'key'> {
  return mood ? MOOD_ATMOSPHERES[mood] : THRESHOLD_ATMOSPHERE;
}

// A tileable film-grain, encoded inline so it costs no request and works offline.
export const GRAIN_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")";
