/**
 * Evidence Wing: shared types. Static, typed, build-time data. No database.
 * Plan: docs/plans/evidence-wing-adminos.md
 *
 * Rules that apply to every string in any CaseFile:
 *  - no em dashes, no prices, no credentials, no names of private people
 *  - numbers are NEVER typed inline in components: they come from a Claim through ClaimFigure
 *  - dates are pre-formatted strings (asOfLabel) so render is hydration-safe
 */

export type EvidenceApp = 'adminos' | 'jarvis' | 'sanyu';

export type ClaimStatus = 'verified' | 'self-reported' | 'pending-source' | 'retired';

export interface Claim {
  /** e.g. 'adminos.tests' */
  id: string;
  /** string on purpose: no locale formatting at render. e.g. '238', '122/122', '50+' */
  value: string;
  /** what the number counts, e.g. 'automated tests passing' */
  label: string;
  /** ISO date 'YYYY-MM-DD', or month 'YYYY-MM' when the day is not known */
  asOf: string;
  /** pre-formatted for display, e.g. '6 Oct 2026' or 'Oct 2026' */
  asOfLabel: string;
  /** plain-text source, e.g. 'AdminOS CI run' */
  source: string;
  /** https only, optional */
  sourceUrl?: string;
  status: ClaimStatus;
}

export type PaperName = 'parchment' | 'bone' | 'navy' | 'cherry';

export interface Slide {
  id: string;
  kicker: string;
  title: string;
  body: string[];
  claimIds?: string[];
  /** screen id from screens.json */
  screen?: string;
}

export interface JourneyStop {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
  /** e.g. '07:30 Command Center' */
  where: string;
  title: string;
  body: string;
  screen: string;
  /** a figure shown with the stop. */
  figure?: string;
  /** true: invented sample data (labelled as such). false: the owner's own live screen. */
  sampleData: boolean;
}

export type ArchLayer = 'clients' | 'edge' | 'data' | 'ai' | 'jobs' | 'ops';

export interface ArchNode {
  id: string;
  layer: ArchLayer;
  label: string;
  what: string;
  why: string;
  alternative: string;
  cost?: string;
  wentWrong?: string;
  claimIds?: string[];
  /** ids of nodes this one talks to (drawn as lines) */
  edges?: string[];
}

export interface DecisionCard {
  id: string;
  decision: string;
  alternatives: string[];
  why: string;
  cost: string;
  /** journal date or short reference, so the decision has a receipt */
  receipt: string;
}

export type ProofItem =
  | { kind: 'claim'; claimId: string }
  | { kind: 'quote'; text: string; attribution: string; consent: 'given' | 'anonymised'; asOfLabel: string }
  | { kind: 'event'; text: string; asOfLabel: string };

export interface VideoChapter {
  label: string;
  /** seconds from start */
  t: number;
}

/** one room of a multi-part product, shown in the clickable WingMap */
export interface Wing {
  id: string;
  name: string;
  /** the room's own name inside the product, e.g. 'The Architect' */
  room: string;
  what: string;
  screen: string;
}

export interface CaseFile {
  app: EvidenceApp;
  /** heading above the journey section, e.g. 'A week with Thabo' */
  journeyTitle: string;
  wings?: Wing[];
  name: string;
  /** one line, no price */
  promise: string;
  /** https only. Omitted for private products with no public site. */
  liveUrl?: string;
  status: { label: 'Live'; asOfLabel: string };
  paper: PaperName;
  accent: string;
  /** screen ids, 3 to 5, for the cover fan */
  heroScreens: string[];
  coverClaims: [string, string, string];
  slides: Slide[];
  journey: JourneyStop[];
  arch: ArchNode[];
  decisions: DecisionCard[];
  proof: ProofItem[];
  video: { posterScreen: string; src: null; chapters: VideoChapter[] };
}

/** one entry of lib/data/evidence/<app>/screens.json */
export interface ScreenEntry {
  id: string;
  chapter: string;
  caption: string;
  alt: string;
  /** date a person looked at the redacted derivative, 'YYYY-MM-DD' */
  reviewed: string;
}

/** one entry of lib/data/evidence/<app>/manifest.json (written by scripts/evidence/build-derivatives.mjs) */
export interface ManifestEntry {
  w: number;
  h: number;
  widths: number[];
  avif: number[];
  color: string;
  blur: string;
  redacted: boolean;
}
