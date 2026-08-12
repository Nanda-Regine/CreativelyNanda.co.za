/**
 * THE ASSET ATLAS — what she actually has, and where it belongs.
 *
 * ── WHY THIS EXISTS ───────────────────────────────────────────────────────────
 *
 * A full visual pass over every photograph and video in the archive, August 2026.
 * It replaced a habit rather than a file: pages were reaching for the same five
 * or six images because those were the ones anybody had ever looked at, and the
 * rest of a large, genuinely good archive sat unseen. The Forge shipped using
 * five portraits. There are ninety-six.
 *
 * The second thing the pass found is more important than any individual image:
 *
 * > **The archive is not navy.** It is teal studio walls and orange radio
 * > branding, cobalt step-and-repeat, magenta bougainvillea, terracotta beer
 * > pots, Basotho ochre, mountain grey-green, blush-and-cherry botanical cards,
 * > deep red roses, burgundy serum labels, and a great deal of South African
 * > sky. A navy ground with a navy scrim over a navy texture throws all of that
 * > away and then asks the gold rule to carry the whole page.
 *
 * So the atlas records the DOMINANT COLOUR of each family, and pages are
 * expected to take their ground from the photograph rather than impose one on
 * it. Navy is a punctuation colour here, not the paper.
 *
 * ── WHAT COUNTS AS A FAMILY ───────────────────────────────────────────────────
 *
 * Her own folder names were the best curation in the archive and Cloudinary
 * flattened them on upload — `nanda-portraits/nanda-lesotho/` became ninety-six
 * files called `IMG_2025…` in one bucket. The families below restore that
 * structure by public_id, so the meaning she encoded in a folder name is not
 * lost a second time.
 *
 * ── HOW TO USE ────────────────────────────────────────────────────────────────
 *
 *   import { FAMILY, familyIds, cldImg } from '@/lib/data/asset-atlas';
 *   FAMILY.truFm.ids            // the ids, in her order
 *   FAMILY.truFm.ground         // the page colour this family wants behind it
 *
 * Every id is a Cloudinary public_id under `creativelynanda/` unless `local` is
 * set, in which case it is a path under `/public`. Local files are ones that
 * were never uploaded — see `TODO_UPLOAD` at the bottom.
 */

export type Ground = {
  /** The page background this family sits well on. */
  bg: string;
  /** Ink colour that holds 4.5:1 on that background. */
  ink: string;
  /** The accent pulled from the photographs themselves. */
  accent: string;
  /** Human note on where the colour comes from. */
  from: string;
};

/**
 * The grounds, taken from the photographs rather than from a brand deck.
 *
 * `parchment` and `bone` are the two that the site is short of — almost every
 * room currently opens on `midnight`, which is why the wing reads as one long
 * navy corridor. A magazine alternates its paper.
 */
export const GROUND = {
  parchment: { bg: '#F5F0E8', ink: '#1A1A2E', accent: '#C21E56', from: 'the blush-and-cherry botanical cards she already uses for performances and radio' },
  bone:      { bg: '#EFE9E1', ink: '#22201D', accent: '#B4653A', from: 'the terracotta wall behind the beer brewing; Basotho ochre' },
  studio:    { bg: '#0E3B3E', ink: '#F2EDE4', accent: '#E8590C', from: 'the TRU FM studio — teal walls, orange station branding' },
  cobalt:    { bg: '#123A8A', ink: '#F4F7FF', accent: '#F5C518', from: 'the Nelson Mandela Bay Arts Festival step-and-repeat' },
  garden:    { bg: '#14361F', ink: '#F1F5EC', accent: '#E8B4C8', from: 'bougainvillea against green — the magenta/green pairing that recurs everywhere' },
  rose:      { bg: '#2A0E1A', ink: '#F7EDF1', accent: '#C21E56', from: 'Inside Her Roses on deep red roses' },
  ink:       { bg: '#12131A', ink: '#EDEDF2', accent: '#7B2FBE', from: 'the RGB-lit coding photographs — magenta, teal and green ambient on a dark room' },
  midnight:  { bg: '#0A1128', ink: '#F5F0E8', accent: '#C9943A', from: 'the existing house navy — kept, but as ONE ground among seven' },
} as const satisfies Record<string, Ground>;

export type GroundName = keyof typeof GROUND;

export interface Family {
  /** What this set is, in a sentence a designer can act on. */
  note: string;
  ground: GroundName;
  /** Cloudinary public_ids under creativelynanda/, in her order. */
  ids: string[];
  /** Cloudinary VIDEO public_ids (delivered via cldVideo, not cldImg). */
  videos?: string[];
  /** True when `ids` are themselves videos rather than stills. */
  video?: boolean;
  /** Radio only: the second station's stills, kept distinct from TRU FM's. */
  madibaz?: string[];
  /** Poster frames she made herself for video tiles. */
  covers?: string[];
  /** Paths under /public for anything still not on Cloudinary. */
  local?: string[];
  /** Where this family is meant to be used. */
  rooms: string[];
  /** True where the set is strong enough to carry a full-bleed hero. */
  hero?: boolean;
}

const P = 'nanda-portraits/';
/** Her own subfolder, preserved on the CDN by scripts/upload-media.mjs. */
const C = 'nanda-portraits/nanda-coding/';

export const FAMILY = {
  // ── THE ENGINEER ──────────────────────────────────────────────────────────
  /**
   * The real coding photographs, and the single most useful discovery of the
   * pass. The Forge and /engineer currently run on `professional/nanda-*`,
   * which are composited studio portraits — a navy suit against a stock office
   * window. These are the actual thing: a hooded figure at a laptop at night
   * beside a printer, a camping chair on a lawn under a palm, a stoep
   * overlooking a fountain. They are warm, specific and unfakeable.
   */
  coding: {
    note: 'Where the work actually happens. Night desk, garden stoep, camping chair on a lawn. Warm, real, and the antidote to the composite corporate portraits.',
    ground: 'garden',
    hero: true,
    ids: [
      `${C}IMG_20250607_100134`,   // night, hooded, printer, notebook — the grind
      `${C}IMG_20260102_161137`,   // stoep, headphones, garden + fountain beyond
      `${C}IMG_20260102_163239`,   // camping chair on the lawn, palm tree, big sky
      `${C}IMG_20260102_163300`,
      `${C}IMG_20260220_165913`,   // hotel lobby, Persian rug — working away from home
      `${C}IMG_20260220_170019`,
    ],
    rooms: ['/forge', '/forge/nights', '/engineer'],
  },

  /**
   * Screens with real code on them, lit by RGB ambient — magenta, teal, green.
   * These are the texture the Forge should be built from rather than a navy
   * gradient: they are literally the colour of her working nights.
   */
  screens: {
    note: 'Actual code on actual screens, lit magenta / teal / green. Use as texture and as full-bleed section grounds — never as a decorative stock "code" image.',
    ground: 'ink',
    hero: true,
    ids: [`${C}IMG_20260220_165913`, `${C}IMG_20260102_161137`],
    rooms: ['/forge', '/forge/commits', '/forge/scars'],
  },

  /** Real product UI, browser-framed. Needs cropping — see CROP below. */
  varsityos: {
    note: 'VarsityOS product screenshots — landing, Nova AI chat, study planner, Pomodoro, budget, meals. Dark UI over magenta/teal gradient mesh. Genuinely handsome; crop the browser chrome and Windows taskbar off before use.',
    ground: 'ink',
    ids: [
      'varsityos-landing-page/1',
      'varsityos-landing-page/3',
      'varsityos-dashboard/1',
      'varsityos-study-pages/1',
      'varsityos-finance-pages/1',
      'varsityos-meals-pages/1',
    ],
    rooms: ['/forge/floor/varsityos'],
  },

  /** The demo recordings behind the foundation projects. */
  demos: {
    note: 'Screen recordings of the foundation builds. These make Origins provable rather than described — a card that says "live demo" next to a moving image of the thing.',
    ground: 'bone',
    ids: [
      'project-screen-record/cortexhub-booking-system',
      'project-screen-record/GreenVault',
      'project-screen-record/youtube-clone',
      'project-screen-record/netflix-clone',
      'project-screen-record/Notion-building',
      'project-screen-record/creativelynanda',
    ],
    video: true,
    rooms: ['/forge/origins'],
  },

  // ── THE TWO RADIO INTERVIEWS ──────────────────────────────────────────────
  /**
   * ⚠️ TWO interviews, and the archive had them filed apart — the Madibaz
   * photographs in `assets/radio/`, the TRU FM photographs three folders away
   * under `nanda-portraits/tru-fm and nelson mandela bay arts festival/`. She
   * already has matching branded cards for both, which is the tell that they
   * were always meant to sit together.
   *
   * NOTE THE SPELLING: **Madibaz** Radio (NMU's station), not "Madiba".
   */
  radio: {
    note: 'TWO radio interviews — Madibaz Radio (mixing desk, "Connect. Inform. Engage." banner) and TRU FM (teal studio walls, orange station branding, Xhosa dress). Present as a pair; she has branded cards for both.',
    ground: 'studio',
    hero: true,
    ids: [
      `${P}IMG_20250301_140746`,   // TRU FM — seated at the desk, teal room
      `${P}IMG_20250301_140818`,
      `${P}IMG_20250301_140820`,
      `${P}IMG_20250301_141702`,   // TRU FM — group under the branded backdrop
    ],
    madibaz: [
      'radio/madiba-radio-1',        // at the mixing desk
      'radio/madiba-radio-2',        // arms up, celebrating
      'radio/madiba-radio-3',        // under the "Connect. Inform. Engage." banner
    ],
    covers: ['radio/madiba-radio-vid-cover', 'radio/tru-fm-vid-cover'],
    rooms: ['/press', '/about', '/gallery'],
  },

  // ── THE STAGE ─────────────────────────────────────────────────────────────
  festival: {
    note: 'Nelson Mandela Bay Arts Festival — cobalt step-and-repeat, Xhosa dress, and the mosaic plaza shot that is the single best full-bleed image in the archive.',
    ground: 'cobalt',
    hero: true,
    ids: [
      `${P}IMG_20250301_144326`,   // seated on the mosaic in Xhosa dress — hero
      `${P}IMG_20250301_145301`,
      `${P}IMG_20250301_153203`,
      `${P}IMG_20250301_153220`,
    ],
    rooms: ['/poetry/stage', '/gallery', '/about'],
  },

  performance: {
    note: 'Live poetry on stage — mic, black drape, brick, an orange rug. Plus her own blush-and-cherry event cards (NMB Arts Festival, Yellowwood Forest, Poetry Event).',
    ground: 'parchment',
    ids: [
      'performance/nmb-perform-1',
      'performance/nmb-perform-2',
      'performance/IMG-20260620-WA0024',
      'performance/IMG-20260620-WA0025',
      'performance/poetry-night-perform-vid-cover',
      'performance/nmb-perform-vid-cover',
      'performance/performance-vid-3-cover',
      'performance/cinema-vid-garden-cover',
    ],
    rooms: ['/poetry/stage', '/gallery'],
  },

  // ── HERITAGE ──────────────────────────────────────────────────────────────
  heritage: {
    note: 'Brewing African beer against a terracotta wall in Xhosa beadwork; the Sotho blanket; three generations in traditional dress. Warm ochre, indigo, rust — the richest colour in the archive.',
    ground: 'bone',
    hero: true,
    ids: [
      'nanda-culture/IMG_20260719_181316',
      'nanda-culture/IMG_20260719_181344',
      'nanda-culture/IMG_20260719_181424',
      'nanda-culture/IMG_20260719_181445',
      'nanda-culture/IMG-20260620-WA0001',
      'nanda-culture/IMG-20260620-WA0014',
      'nanda-culture/IMG-20260620-WA0015',
      'nanda-culture/IMG-20260620-WA0016',
      'nanda-culture/nanda-making-african-beer-poster',
    ],
    rooms: ['/roots', '/poetry/lineage', '/about'],
  },

  lesotho: {
    note: 'The mountain set — Sani Pass at 2,874 m, Basotho blanket, a horse on a ridge, the conical hat at a gorge lookout. Grey-green, ochre, enormous sky. Built for wide crops and parallax.',
    ground: 'bone',
    hero: true,
    ids: [
      `${P}IMG_20250322_132141`,
      `${P}IMG_20250424_095823`,
      `${P}IMG_20250424_100052`,
      `${P}IMG_20250424_100140`,
      `${P}IMG_20250424_100200`,
      `${P}IMG_20250425_142112`,
      `${P}nanda-with-a-donkey-or-horse`,
    ],
    rooms: ['/roots', '/gallery', '/about'],
  },

  // ── THE BOOK ──────────────────────────────────────────────────────────────
  book: {
    note: 'Inside Her Roses — the cover on deep red roses, the interior spreads with their line drawings, the orange launch poster, the book in gardens and beside coffee. Deep red, cream, black.',
    ground: 'rose',
    hero: true,
    ids: [
      'poetry-book/nanda-poetry-book-1',
      'poetry-book/nanda-poetry-book-2',
      'poetry-book/nanda-poetry-book-3',
    ],
    local: ['assets/poetry-book'],
    rooms: ['/poetry', '/poetry/collection', '/'],
  },

  // ── PORTRAITURE ───────────────────────────────────────────────────────────
  /**
   * The high-fashion set, and the strongest editorial images she owns. Black
   * gown on architectural stairs under a gold pendant; a red corset against a
   * cream wall; an orange fur coat with a floral headpiece; a spiral staircase
   * shot from directly above. These belong on covers and section openers, not
   * in a 200px avatar.
   */
  editorial: {
    note: 'Fashion-grade portraiture: black gown on brick-and-glass stairs, red corset on cream, orange fur + floral headpiece, an overhead spiral staircase. Full-bleed material.',
    ground: 'bone',
    hero: true,
    ids: [
      `${P}IMG-20260620-WA0041`,
      `${P}IMG-20260620-WA0043`,
      `${P}IMG-20260620-WA0044`,
      `${P}IMG-20260620-WA0045`,
      `${P}IMG-20260620-WA0046`,
      `${P}IMG-20260620-WA0048`,
      `${P}IMG-20260620-WA0049`,
      `${P}IMG-20260620-WA0050`,
      `${P}IMG-20260620-WA0055`,
      `${P}IMG-20260620-WA0057`,
      `${P}IMG-20260620-WA0060`,
      `${P}IMG-20260620-WA0061`,
      `${P}Snapchat-666021868`,
    ],
    rooms: ['/', '/about', '/gallery', '/engineer'],
  },

  bloom: {
    note: 'Magenta bougainvillea against a curly afro; the green trellis arch; a red dress in a green garden. The cherry-on-green pairing the brand palette already claims but the site never shows.',
    ground: 'garden',
    hero: true,
    ids: [
      `${P}IMG_20241107_161910`,
      `${P}IMG_20241107_161914`,
      `${P}IMG_20241107_161928`,
      `${P}IMG_20241107_162310`,
      `${P}IMG_20250926_161751`,
      `${P}IMG_20250926_161824`,
      `${P}IMG_20250926_162510`,
      `${P}IMG_20250926_163119`,
    ],
    rooms: ['/poetry', '/poetry/collection', '/gallery'],
  },

  music: {
    note: 'At the drum kit and at the piano in a foam-lined studio. The literal image of the poet-who-codes thesis: a third discipline, done seriously.',
    ground: 'ink',
    ids: [
      `${P}IMG_20250911_160854`,
      `${P}IMG_20250917_102153`,
    ],
    rooms: ['/poetry/poet-who-codes', '/about'],
  },

  // ── THE RECEIPTS ──────────────────────────────────────────────────────────
  /**
   * Fourteen images of readers reacting — WhatsApp messages and platform
   * comments with real names and real paragraphs. This is the most persuasive
   * material in the archive and it is on no page.
   */
  reviews: {
    note: 'Real reader responses — WhatsApp screenshots and platform comments with names and full paragraphs. Set on parchment with the cherry accent; do not put these on navy.',
    ground: 'parchment',
    ids: [
      'reviews/review-1','reviews/review-2','reviews/review-3','reviews/review-4','reviews/review-5',
      'reviews/review-6','reviews/review-7','reviews/review-8','reviews/review-9','reviews/review-10',
      'reviews/IMG-20260620-WA0066','reviews/IMG-20260620-WA0067',
      'reviews/IMG-20260620-WA0068','reviews/IMG-20260620-WA0071',
    ],
    rooms: ['/testimonials', '/poetry', '/'],
  },

  graduation: {
    note: 'Two graduations, on video — the auditorium, the procession, the bunting. Plus the first-graduation excitement clip. The Education page currently links to none of it.',
    ground: 'parchment',
    ids: [
      'graduation/adv-diploma-graduation',
      'graduation/diploma-graduation',
      'graduation/nanda-first-graduation-excitement',
    ],
    rooms: ['/education'],
  },

  bookLaunch: {
    note: 'The launch itself — signing, a customer buying, the workshop, the crowd. Proof that the book met people.',
    ground: 'rose',
    ids: ['book-launch/book-customer-poster'],
    videos: ['book-launch/book-customer', 'book-launch/book-signing', 'book-launch/poetry-workshop'],
    rooms: ['/poetry', '/gallery'],
  },

  work: {
    note: 'Before the code: the Balkan Burger shift, latte art, the "learning to code" and "building an app" clips. The Origins story has no images at all right now — this is it.',
    ground: 'bone',
    ids: ['work/balkanburger-cuppuccino', 'work/balkanburger-latte', 'work/working-in-tech'],
    videos: ['work/balkan-burger-shift', 'work/learning-to-code', 'work/building-app'],
    rooms: ['/forge/origins', '/engineer', '/about'],
  },

  sanyu: {
    note: 'Sanyu Botanicals — herbal balm and serum, made in a kitchen (the whisk, the dried herbs, the mixing bowl) and photographed in gardens. Cream, burgundy, deep green. Currently absent from the Workshop Floor entirely.',
    ground: 'bone',
    hero: true,
    ids: [
      'sanyu/vault/1', 'sanyu/vault/2', 'sanyu/vault/3',
      'sanyu/vault/10', 'sanyu/vault/14', 'sanyu/vault/18',
    ],
    rooms: ['/forge/floor/sanyu', '/sanyu'],
  },
} satisfies Record<string, Family>;

export type FamilyName = keyof typeof FAMILY;

/** Cloudinary delivery for an atlas id. */
export function atlasImg(id: string, width = 1400): string {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
  const full = id.startsWith('creativelynanda/') || id.includes('/vault/') || id.startsWith('varsityos')
    ? id
    : `creativelynanda/${id}`;
  return `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto,w_${width},c_limit/${full}`;
}

/**
 * A browser screenshot with its chrome trimmed off.
 *
 * The VarsityOS captures include the browser toolbar and the Windows taskbar,
 * which instantly reads as "someone's screenshot" rather than as product
 * photography. Cropping ~7% off the top and ~5% off the bottom removes both.
 */
export function atlasScreenshot(id: string, width = 1400): string {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '';
  return `https://res.cloudinary.com/${cloud}/image/upload/c_crop,y_0.07,h_0.88,w_1.0/f_auto,q_auto,w_${width},c_limit/${id}`;
}

export const familyIds = (name: FamilyName): string[] => FAMILY[name].ids;
export const groundOf = (name: FamilyName): Ground => GROUND[FAMILY[name].ground];

/**
 * 🔴 NOT YET ON CLOUDINARY — these are referenced by `local` above and are
 * served from /public, which means they are also the files that
 * `.vercelignore` must never exclude. Uploading them is the next chore:
 *
 *   node scripts/upload-folder.mjs radio
 *   node scripts/upload-folder.mjs reviews
 *   node scripts/upload-folder.mjs work
 *   node scripts/upload-folder.mjs project-screen-record
 *   node scripts/upload-folder.mjs nandas-videos-of-her
 *
 * `nandas-videos-of-her` holds eight clips — her speaking to a group, several
 * candid pieces — and not one of them is used anywhere on the site today.
 */
export const TODO_UPLOAD = [
  'assets/radio',
  'assets/reviews',
  'assets/work',
  'assets/project-screen-record',
  'assets/nandas-videos-of-her',
  'assets/nanda-portraits/nanda-coding',
] as const;
