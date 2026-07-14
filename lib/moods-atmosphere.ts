// ─────────────────────────────────────────────────────────────────────────────
// Mood Atmosphere — the ambient "background vibe" that washes the whole poetry
// section (the mirembe-style layered look). Each mood pairs a painting from
// /public/assets/art with a colour-wash gradient. Choosing a mood at the
// Threshold cross-fades the entire garden into that feeling.
//
// To re-pair a painting with a mood, change only its `image` below —
// everything else (gradient, wash, opacity) stays independent.
// ─────────────────────────────────────────────────────────────────────────────
import type { MoodKey } from '@/lib/poems-data';

export interface MoodAtmosphere {
  key: MoodKey;
  image: string;        // full-bleed background painting (in /public/assets/art)
  wash: string;         // dominant colour of the mood (matches MOODS.wash)
  gradient: string;     // colour-wash overlaid on the painting
  imageOpacity: number; // how much of the painting shows through the wash
}

export const MOOD_ATMOSPHERES: Record<MoodKey, MoodAtmosphere> = {
  longing: {
    key: 'longing',
    image: '/assets/art/petal.jpg',
    wash: '#5c1f38',
    gradient: 'linear-gradient(155deg, rgba(92,31,56,0.90) 0%, rgba(43,14,28,0.96) 100%)',
    imageOpacity: 0.34,
  },
  desire: {
    key: 'desire',
    image: '/assets/art/bloom.jpg',
    wash: '#6b1330',
    gradient: 'linear-gradient(155deg, rgba(107,19,48,0.88) 0%, rgba(46,8,22,0.96) 100%)',
    imageOpacity: 0.40,
  },
  wonder: {
    key: 'wonder',
    image: '/assets/art/aurora.jpg',
    wash: '#1f4a3f',
    gradient: 'linear-gradient(155deg, rgba(31,74,63,0.88) 0%, rgba(12,32,27,0.96) 100%)',
    imageOpacity: 0.38,
  },
  reflection: {
    key: 'reflection',
    image: '/assets/art/water.jpg',
    wash: '#332f52',
    gradient: 'linear-gradient(155deg, rgba(51,47,82,0.90) 0%, rgba(20,18,36,0.96) 100%)',
    imageOpacity: 0.36,
  },
  solace: {
    key: 'solace',
    image: '/assets/art/sapphire.jpg',
    wash: '#16304f',
    gradient: 'linear-gradient(155deg, rgba(22,48,79,0.90) 0%, rgba(8,18,33,0.96) 100%)',
    imageOpacity: 0.36,
  },
  fire: {
    key: 'fire',
    image: '/assets/art/jewel.jpg',
    wash: '#6e5216',
    gradient: 'linear-gradient(155deg, rgba(110,82,22,0.86) 0%, rgba(40,28,8,0.96) 100%)',
    imageOpacity: 0.42,
  },
};

// The neutral atmosphere before a reader has chosen a mood — the Threshold.
// A graceful dancer over deep navy: the poet's stage before the feeling lands.
export const THRESHOLD_ATMOSPHERE: Omit<MoodAtmosphere, 'key'> = {
  image: '/assets/art/dancer.jpg',
  wash: '#0A0F2C',
  gradient: 'linear-gradient(155deg, rgba(10,15,44,0.84) 0%, rgba(6,9,26,0.96) 100%)',
  imageOpacity: 0.44,
};

export function getAtmosphere(mood: MoodKey | null): Omit<MoodAtmosphere, 'key'> {
  return mood ? MOOD_ATMOSPHERES[mood] : THRESHOLD_ATMOSPHERE;
}

// A tileable film-grain, encoded inline so it costs no request and works offline.
export const GRAIN_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")";
