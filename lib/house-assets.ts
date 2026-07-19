// ─────────────────────────────────────────────────────────────────────────────
// House of Roses — the visual atlas.
// One curated source of truth for every image and film in the estate: the mood
// paintings that wash the Reading Room, the background pool that dresses the
// other rooms, Nanda's own portraits placed where they belong, and the ambient
// films. Rooms import from here so nothing generic ever appears, and so every
// asset in /public/assets is accounted for.
//
// Filenames with spaces are stored raw; call `assetUrl()` at the use-site.
// ─────────────────────────────────────────────────────────────────────────────
import type { MoodKey } from '@/lib/poems-data';

const BG = '/assets/background images';
const A = '/assets';

// Encode a public path so spaces / diacritics survive in url() and <img src>.
export function assetUrl(path: string): string {
  return path.split('/').map((seg, i) => (i === 0 ? seg : encodeURIComponent(seg))).join('/');
}

// ── The mood paintings (already tuned in lib/moods-atmosphere) ────────────────
// Kept here as the canonical mood→painting record so future rooms can reuse the
// exact wash the Reading Room uses.
export const ATMOSPHERE_ART: Record<MoodKey, string> = {
  longing: `${A}/art/petal.jpg`,
  desire: `${A}/art/bloom.jpg`,
  wonder: `${A}/art/aurora.jpg`,
  reflection: `${A}/art/water.jpg`,
  solace: `${A}/art/sapphire.jpg`,
  fire: `${A}/art/jewel.jpg`,
};

// ── The background pool ───────────────────────────────────────────────────────
// Every image in /assets/background images, sorted into tones so a room can ask
// for the *feeling* it needs. `download (N)` files are untitled abstracts and
// live in the shared abstract pool.
export type Tone =
  | 'navy-night'   // deep blue florals & minimal dark — night, longing, solace
  | 'jewel'        // sapphire + gold facets — regality, the Crown
  | 'bloom'        // palette-knife florals — warmth, desire, hope
  | 'pink-tender'  // soft pinks & rough paper — tenderness, the poetry-book skin
  | 'stained'      // stained glass & fractal — the sacred, the Roots
  | 'aurora'       // luminous greens/teals — wonder
  | 'abstract';    // untitled colour fields — flexible, any room

const DOWNLOADS = [11, 14, 15, 16, 17, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42]
  .map((n) => `${BG}/download (${n}).jpg`);

export const BACKDROPS: Record<Tone, string[]> = {
  'navy-night': [
    `${BG}/navy-floral.jpg`,
    `${BG}/50+ Best Dark Blue iPhone Wallpapers (Free 4k HD Download).jpg`,
    `${BG}/Ultra HD 4K Dark & Minimalist Wallpapers 📱.jpg`,
    `${BG}/Atmospheric reference for ALTERITAS _Explore the full board on our profile__.jpg`,
  ],
  jewel: [`${BG}/jewel.jpg`],
  bloom: [`${BG}/bloom.jpg`, `${BG}/dancer.jpg`, `${BG}/petal.jpg`],
  'pink-tender': [
    `${BG}/50 Pink Aesthetic Wallpapers That Will Melt Your___.jpg`,
    `${BG}/Download premium image of Oldrose pink rough paper wall_ about wallpaper, iphone wallpaper, mobile wallpaper, backgrounds, and texture 13895573.jpg`,
  ],
  stained: [`${BG}/Stained Glass.jpg`],
  aurora: [`${BG}/aurora.jpg`],
  abstract: [`${BG}/Vibrant colors abstract 4k mobile wallpaper.jpg`, ...DOWNLOADS],
};

// The tone each mood reaches for when a room wants a fuller backdrop than the
// tuned mood painting (e.g. the Library shelves, the Atrium).
export const MOOD_TO_TONE: Record<MoodKey, Tone> = {
  longing: 'navy-night',
  desire: 'bloom',
  wonder: 'aurora',
  reflection: 'abstract',
  solace: 'navy-night',
  fire: 'bloom', // floral, not crystal — "Inside Her Roses" is a garden, not a jewel box
};

// Deterministic pick from a tone pool (seed by e.g. a poem's id, so a room is
// stable across renders — no Math.random, which is unavailable in some runtimes).
export function backdropForTone(tone: Tone, seed = 0): string {
  const pool = BACKDROPS[tone];
  return pool[Math.abs(seed) % pool.length];
}

// ── Nanda's portraits — placed, not decorative ────────────────────────────────
// Verified, room-assigned photographs. (The chat-screenshot Snapchat image is
// deliberately excluded from every pool.)
export interface Portrait {
  file: string;
  room: 'atrium' | 'crown' | 'roots' | 'forge';
  alt: string;
}

export const PORTRAITS: Portrait[] = [
  { file: `${A}/IMG-20260620-WA0048.jpg`, room: 'atrium', alt: 'Nanda in a black-and-gold beaded dress on a staircase — the poet arriving.' },
  { file: `${A}/IMG-20260620-WA0068.jpg`, room: 'crown',  alt: 'Nanda with her natural curls — the hair journey that became Sanyu.' },
  { file: `${A}/IMG-20260620-WA0032.jpg`, room: 'roots',  alt: 'Nanda and her mother at graduation — lineage, one generation lifting the next.' },
  { file: `${A}/IMG-20260620-WA0001.jpg`, room: 'roots',  alt: 'Nanda beneath an indigenous forest canopy — where she comes from.' },
  { file: `${A}/IMG-20260620-WA0013.jpg`, room: 'forge',  alt: 'Nanda at the drums in-studio — the maker who is also a musician.' },
];

export function portraitsForRoom(room: Portrait['room']): Portrait[] {
  return PORTRAITS.filter((p) => p.room === room);
}

// ── The wider gallery pool ────────────────────────────────────────────────────
// Remaining personal photographs, held for a curated gallery / Roots memoir.
// Listed so nothing is lost; a human eye assigns them as rooms are built.
export const GALLERY_POOL: string[] = [
  '0003', '0011', '0014', '0015', '0016', '0017', '0018', '0019', '0024', '0025',
  '0034', '0040', '0041', '0042', '0043', '0044', '0045', '0046', '0047', '0049',
  '0050', '0055', '0057', '0060', '0061', '0065', '0066', '0067', '0071', '0073',
  '0074', '0075', '0076',
].map((n) => `${A}/IMG-20260620-WA${n}.jpg`).concat([
  `${A}/IMG_20260620_021148.jpg`,
  `${A}/Snapchat-1836803243.jpg`,
  `${A}/Snapchat-1952380483.jpg`,
  `${A}/Snapchat-2084727465.jpg`,
]);

// ── Ambient film — muted, looped, behind hero atmospheres ─────────────────────
export const FILM: string[] = [
  `${A}/VID-20260620-WA0021.mp4`,
  `${A}/VID-20260620-WA0052.mp4`,
  `${A}/VID-20260620-WA0053.mp4`,
  `${A}/VID-20260620-WA0077.mp4`,
  `${A}/VID-20260620-WA0078.mp4`,
  `${A}/VID-20260620-WA0079.mp4`,
  `${A}/VID-20260620-WA0080.mp4`,
  `${A}/Snapchat-1363016498.mp4`,
  `${A}/Snapchat-925574113.mp4`,
];
