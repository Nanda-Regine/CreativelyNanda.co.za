// ─────────────────────────────────────────────────────────────────────────────
// The writer's own plot — a light, on-device identity for poets in the garden.
// No accounts: a pen name + how many poems they've planted, kept in localStorage.
// Powers the poet card and the botanical milestone badges in /poetry/my-garden.
// ─────────────────────────────────────────────────────────────────────────────

export interface PoetProfile {
  penName: string;
  planted: number;
}

export interface PlantBadge {
  threshold: number;
  id: string;
  emoji: string;
  label: string;
  hint: string;
}

export const PLANT_BADGES: PlantBadge[] = [
  { threshold: 1, id: 'seed', emoji: '🌱', label: 'Seed', hint: 'Planted your first poem' },
  { threshold: 3, id: 'sprout', emoji: '🌿', label: 'Sprout', hint: 'Three poems planted' },
  { threshold: 5, id: 'bud', emoji: '🌸', label: 'Bud', hint: 'Five poems planted' },
  { threshold: 10, id: 'bloom', emoji: '🌺', label: 'Bloom', hint: 'Ten poems planted' },
  { threshold: 20, id: 'rose', emoji: '🌹', label: 'Rose', hint: 'Twenty poems planted' },
];

const KEY = 'poetProfile';

export function getPoetProfile(): PoetProfile {
  if (typeof window === 'undefined') return { penName: '', planted: 0 };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { penName: parsed.penName || '', planted: parsed.planted || 0 };
    }
  } catch {
    /* ignore */
  }
  return { penName: '', planted: 0 };
}

function save(profile: PoetProfile) {
  try {
    localStorage.setItem(KEY, JSON.stringify(profile));
  } catch {
    /* ignore */
  }
}

export function setPenName(penName: string): PoetProfile {
  const profile = { ...getPoetProfile(), penName };
  save(profile);
  return profile;
}

export function recordPlanted(): PoetProfile {
  const current = getPoetProfile();
  const profile = { ...current, planted: current.planted + 1 };
  save(profile);
  return profile;
}

export function earnedBadges(planted: number): PlantBadge[] {
  return PLANT_BADGES.filter((b) => planted >= b.threshold);
}

export function nextBadge(planted: number): PlantBadge | null {
  return PLANT_BADGES.find((b) => planted < b.threshold) ?? null;
}
