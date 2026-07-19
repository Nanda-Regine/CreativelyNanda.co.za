// ─────────────────────────────────────────────────────────────────────────────
// The Reading Room — pure logic that turns a poem into an immersive experience.
// No React here: splitting lines, deriving the poem's breath (tempo), and
// resolving the "doorway word" that hands the reader onward to the next room.
// "Every poem ends on a doorway word that opens the next room." — House of Roses
// ─────────────────────────────────────────────────────────────────────────────
import type { Poem } from '@/lib/poems-data';
import { getRelatedPoems } from '@/lib/poems-data';

export type AmbientKind = 'petals' | 'ink' | 'light' | 'none';

// ── The rooms of the House a doorway can open into ───────────────────────────
// Only routes that exist AND are not redirected to Mirembe belong here.
export interface RoomDoor {
  key: string;
  label: string;
  href: string;
  blurb: string;
}

export const ROOMS: Record<string, RoomDoor> = {
  crown:   { key: 'crown',   label: 'The Crown',       href: '/sanyu',                  blurb: 'where a hair ritual became Sanyu' },
  roots:   { key: 'roots',   label: 'The Roots',       href: '/poetry/lineage',         blurb: 'the Ugandan–Xhosa lineage' },
  forge:   { key: 'forge',   label: 'The Poet Who Codes', href: '/poetry/poet-who-codes', blurb: 'where the poet meets the engineer' },
  stage:   { key: 'stage',   label: 'The Stage',       href: '/poetry/stage',           blurb: 'the poems, performed' },
  garden:  { key: 'garden',  label: 'The Garden',      href: '/poetry/collection',      blurb: 'the whole collection' },
  guest:   { key: 'guest',   label: 'The Guest Garden', href: '/poetry/community',      blurb: 'where readers become writers' },
};

// Split a poem's content into display lines. Stanza breaks (blank lines) are
// preserved as empty strings so the reveal engine can add a longer beat there.
export function splitLines(content: string): string[] {
  return content.replace(/\r\n/g, '\n').split('\n');
}

// Non-empty lines only (for indexing annotations/marginalia against real lines).
export function contentLines(content: string): string[] {
  return splitLines(content).filter((l) => l.trim().length > 0);
}

// The poem's breath: shorter poems linger, longer poems flow. Overridable per
// poem via `roomTempoMs`. Clamped so nothing feels broken or interminable.
export function deriveTempoMs(poem: Poem): number {
  if (poem.roomTempoMs && poem.roomTempoMs > 0) return poem.roomTempoMs;
  const lines = contentLines(poem.content).length;
  // Fewer lines → slower, more deliberate; many lines → quicker cadence.
  const base = lines <= 8 ? 900 : lines <= 20 ? 760 : 620;
  return base;
}

export function deriveAmbient(poem: Poem): AmbientKind {
  return poem.ambient ?? 'petals';
}

// Strip trailing punctuation to find the true last word — the "doorway word".
export function deriveDoorwayWord(poem: Poem): string {
  if (poem.doorwayWord) return poem.doorwayWord;
  const words = poem.content
    .replace(/["'“”‘’.,;:!?—–\-…()]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return words[words.length - 1] ?? '';
}

export interface Doorway {
  word: string;
  // Where the doorway leads. Either a curated room, or (default) the next poem.
  room?: RoomDoor;
  nextPoem?: { slug: string; title: string };
}

// Resolve the doorway: a curated room if the poem names one, otherwise the most
// kindred next poem — so the reader is always gently handed onward.
export function resolveDoorway(poem: Poem): Doorway {
  const word = deriveDoorwayWord(poem);
  if (poem.doorwayRoom && ROOMS[poem.doorwayRoom]) {
    return { word, room: ROOMS[poem.doorwayRoom] };
  }
  const related = getRelatedPoems(poem.slug, 1)[0];
  if (related) {
    return { word, nextPoem: { slug: related.slug, title: related.title } };
  }
  return { word, room: ROOMS.garden };
}
