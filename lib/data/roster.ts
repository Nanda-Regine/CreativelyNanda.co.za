/**
 * The roster: the single source for every Mirembe Muse product shown on the
 * Forge. 17 live, 2 in development. Owner-confirmed 14 Nov 2026 and mirrored
 * from the mirembemuse.co.za portfolio list (MIREMBE_PORTFOLIO_NAMES below).
 *
 * Relationships are honest labels: True Access is co-founded, never a client.
 * Keys are lowercase letters and digits only, because screenUrl() splits ids
 * on a hyphen. Validated by lib/data/roster.schema.ts via
 * `node scripts/studio/check-roster.mjs`.
 */
import type { AppKey } from './app-screens';
import type { EvidenceApp } from './evidence/types';

export type Relationship = 'own' | 'internal' | 'client' | 'co-founded' | 'venture';
export type RosterStatus = 'live' | 'in-development';
export type DeskKey = 'adminos' | 'jarvis' | 'sanyu' | 'greendiaspora' | 'selves' | 'amanda' | 'isd' | 'ecdc';

export interface RosterApp {
  /** /^[a-z0-9]+$/ */
  key: string;
  /** Brand name only. */
  name: string;
  relationship: Relationship;
  status: RosterStatus;
  /** Shelf band. True Access (co-founded) and Taek Two Studios (venture) sit in the client band, labelled as what they are. */
  band: 'own' | 'client' | 'internal';
  order: number;
  /** One sentence. No price, no em dash. */
  line: string;
  /** https only. Omitted for owner-only products and where the address is not confirmed yet. */
  liveUrl?: string;
  host: string;
  access: 'public' | 'login' | 'owner-only';
  paper: string;
  accent: string;
  /** The accent darkened for text on `paper` (contrast >= 4.5:1, checked). */
  accentInk: string;
  cover: { kind: 'phone'; id: string } | { kind: 'desk'; id: string } | { kind: 'plate' };
  /** lib/data/app-screens.ts */
  phone?: AppKey;
  /** lib/data/evidence/<desk>/screens.json */
  desk?: DeskKey;
  caseFile?: EvidenceApp;
  recording?: string;
  /** /forge/floor/<dossier> */
  dossier?: string;
}

export const ROSTER: RosterApp[] = [
  // Own products
  {
    key: 'adminos', name: 'AdminOS', relationship: 'own', status: 'live', band: 'own', order: 1,
    line: 'An AI business OS for South African SMEs: specialist agents, WhatsApp-native, debt recovery and invoicing.',
    liveUrl: 'https://adminos.co.za', host: 'adminos.co.za', access: 'login',
    paper: '#E6ECF3', accent: '#3B82F6', accentInk: '#1E3F73',
    cover: { kind: 'desk', id: 'adminos-142417' }, desk: 'adminos', caseFile: 'adminos', dossier: 'adminos',
  },
  {
    key: 'varsityos', name: 'VarsityOS', relationship: 'own', status: 'live', band: 'own', order: 2,
    line: 'An AI student OS: Nova companion, NSFAS budget tracker, study planner and crisis support.',
    liveUrl: 'https://varsityos.co.za', host: 'varsityos.co.za', access: 'login',
    paper: '#E5EEEA', accent: '#2EC4B6', accentInk: '#0B6B63',
    cover: { kind: 'phone', id: '174632' }, phone: 'varsityos', dossier: 'varsityos',
  },
  {
    key: 'k53', name: 'K53 Drill Master', relationship: 'own', status: 'live', band: 'own', order: 3,
    line: 'Learner’s licence prep with spaced repetition, game modes and isiXhosa support.',
    liveUrl: 'https://k53drillmaster.co.za', host: 'k53drillmaster.co.za', access: 'public',
    paper: '#F1E6CB', accent: '#FFB81C', accentInk: '#7A4E00',
    cover: { kind: 'phone', id: '173050' }, phone: 'k53', dossier: 'k53-drill-master',
  },
  {
    key: 'sanyu', name: 'Sanyu Botanicals', relationship: 'own', status: 'live', band: 'own', order: 4,
    line: 'Our botanical brand, with oversell-proof inventory and PayFast checkout.',
    liveUrl: 'https://sanyubotanicals.co.za', host: 'sanyubotanicals.co.za', access: 'public',
    paper: '#F2E5DD', accent: '#C9943A', accentInk: '#7A2233',
    cover: { kind: 'phone', id: '174028' }, phone: 'sanyu', desk: 'sanyu', caseFile: 'sanyu', dossier: 'sanyu',
  },
  {
    key: 'creativelynanda', name: 'CreativelyNanda', relationship: 'own', status: 'live', band: 'own', order: 5,
    line: 'The founder platform: portfolio, AI assistant and a Notion template storefront.',
    liveUrl: 'https://creativelynanda.co.za', host: 'creativelynanda.co.za', access: 'public',
    paper: '#F0E4E6', accent: '#C21E56', accentInk: '#8A1240',
    cover: { kind: 'plate' }, dossier: 'creativelynanda',
  },
  {
    key: 'stokvelos', name: 'StokvelOS', relationship: 'own', status: 'live', band: 'own', order: 6,
    line: 'AI stokvel management: contribution tracking, governance reports, meeting minutes and WhatsApp reminders.',
    liveUrl: 'https://stokvelos.co.za', host: 'stokvelos.co.za', access: 'login',
    paper: '#E8EEDF', accent: '#7AA531', accentInk: '#3F5A12',
    cover: { kind: 'plate' }, dossier: 'stokvelos',
  },
  // Client platforms and partners
  {
    key: 'selves', name: 'The Selves of Us', relationship: 'client', status: 'live', band: 'client', order: 7,
    line: 'A literary media platform with AI features and a full editorial workflow.',
    liveUrl: 'https://www.theselvesofus.com', host: 'theselvesofus.com', access: 'login',
    paper: '#F0E4EA', accent: '#B0486E', accentInk: '#7A2447', cover: { kind: 'plate' },
  },
  {
    key: 'bbmothership', name: 'BB MotherShip', relationship: 'client', status: 'live', band: 'client', order: 8,
    line: 'A restaurant OS: floor operations, staff training modules and the systems behind service.',
    host: 'Client platform', access: 'login',
    paper: '#F3E7D8', accent: '#D9822B', accentInk: '#7A4210', cover: { kind: 'plate' }, dossier: 'bb-mothership',
  },
  {
    key: 'icsa', name: 'ICSA Summit OS', relationship: 'client', status: 'live', band: 'client', order: 9,
    line: 'An OS with seven portals to run multiple summits: delegates, sponsors, team and every moving part between.',
    host: 'Client platform', access: 'login',
    paper: '#E6E9F2', accent: '#5B6FD6', accentInk: '#2B3A8A', cover: { kind: 'plate' },
  },
  {
    key: 'ecdc', name: 'ECDC Symposium', relationship: 'client', status: 'live', band: 'client', order: 10,
    line: 'Event management, commitment accountability and investor matchmaking for the Eastern Cape.',
    host: 'Client platform', access: 'login',
    paper: '#E4EDEF', accent: '#2C8EA3', accentInk: '#145565', cover: { kind: 'plate' },
  },
  {
    key: 'isd', name: 'ISD Membership', relationship: 'client', status: 'live', band: 'client', order: 11,
    line: 'A digital membership platform with governed data infrastructure.',
    liveUrl: 'https://www.isd-membership-platform.co.za', host: 'isd-membership-platform.co.za', access: 'login',
    paper: '#E9ECE2', accent: '#6E8B3D', accentInk: '#3C5018', cover: { kind: 'plate' },
  },
  {
    key: 'greendiaspora', name: 'Green Diaspora', relationship: 'client', status: 'live', band: 'client', order: 12,
    line: 'Event management for the Green Diaspora Forum: pledge ledger, matchmaking, check-in and impact.',
    liveUrl: 'https://greendiaspora.mirembemuse.co.za', host: 'greendiaspora.mirembemuse.co.za', access: 'login',
    paper: '#E3EEE6', accent: '#2E9B5E', accentInk: '#125A31', cover: { kind: 'plate' },
  },
  {
    key: 'amanda', name: 'Amanda Ibezim', relationship: 'client', status: 'live', band: 'client', order: 13,
    line: 'A portfolio and booking site for a head chef and pâtissier: fine dining, pâtisserie, events and catering.',
    liveUrl: 'https://amanda.mirembemuse.co.za', host: 'amanda.mirembemuse.co.za', access: 'public',
    paper: '#F4E8E0', accent: '#C0704A', accentInk: '#7A3A1C', cover: { kind: 'plate' },
  },
  {
    key: 'trueaccess', name: 'True Access', relationship: 'co-founded', status: 'live', band: 'client', order: 14,
    line: 'An accessibility-mapping platform Nanda co-founded and built, run together with its founding partner.',
    liveUrl: 'https://trueaccess.co.za', host: 'trueaccess.co.za', access: 'login',
    paper: '#E8E6F0', accent: '#7A5BD0', accentInk: '#46298F', cover: { kind: 'plate' }, dossier: 'trueaccess',
  },
  {
    key: 'taektwo', name: 'Taek Two Studios', relationship: 'venture', status: 'live', band: 'client', order: 15,
    line: 'A media studio that sits under Mirembe Muse: its public website and the founder’s operations cockpit.',
    liveUrl: 'https://taektwo.co.za', host: 'taektwo.co.za', access: 'public',
    paper: '#EDE7DA', accent: '#B8892B', accentInk: '#6E4F0C', cover: { kind: 'plate' },
  },
  // Internal
  {
    key: 'jarvis', name: 'JarvisOS', relationship: 'internal', status: 'live', band: 'internal', order: 16,
    line: 'The private operating system that runs the studio and every product in the fleet.',
    host: 'Jarvis OS, owner login', access: 'owner-only',
    paper: '#E9E4F1', accent: '#7B2FBE', accentInk: '#4F1A82',
    cover: { kind: 'desk', id: 'jarvis-154221' }, desk: 'jarvis', caseFile: 'jarvis', dossier: 'jarvisos',
  },
  {
    key: 'mirembemuse', name: 'mirembemuse.co.za', relationship: 'internal', status: 'live', band: 'internal', order: 17,
    line: 'The public studio site, wired into JarvisOS for leads, payments and the client portal.',
    liveUrl: 'https://mirembemuse.co.za', host: 'mirembemuse.co.za', access: 'public',
    paper: '#EAE6DC', accent: '#C9943A', accentInk: '#6E4F0C', cover: { kind: 'plate' }, dossier: 'mirembe-muse',
  },
  // On the bench
  {
    key: 'watchsankofa', name: 'WatchSankofa', relationship: 'own', status: 'in-development', band: 'own', order: 18,
    line: 'Not production-ready yet. In development.',
    host: 'In development', access: 'login',
    paper: '#EFE6D6', accent: '#C9943A', accentInk: '#6E4F0C', cover: { kind: 'plate' }, dossier: 'watchsankofa',
  },
  {
    key: 'sankofasessions', name: 'SankofaSessions', relationship: 'own', status: 'in-development', band: 'own', order: 19,
    line: 'Not production-ready yet. In development.',
    host: 'In development', access: 'login',
    paper: '#EFE6D6', accent: '#C9943A', accentInk: '#6E4F0C', cover: { kind: 'plate' },
  },
];

export const LIVE = ROSTER.filter((a) => a.status === 'live');
export const BENCH = ROSTER.filter((a) => a.status === 'in-development');
export const hasFloor = (a: RosterApp) => Boolean(a.phone || a.desk || a.recording);

/** The 17 live names as published on mirembemuse.co.za (portfolio.ts, LIVE_SYSTEMS). The check script compares. */
export const MIREMBE_PORTFOLIO_NAMES: { asOf: string; names: string[] } = {
  asOf: '2026-11-14',
  names: [
    'JarvisOS', 'mirembemuse.co.za', 'AdminOS', 'VarsityOS', 'K53 Drill Master', 'Sanyu Botanicals', 'StokvelOS',
    'CreativelyNanda', 'The Selves of Us', 'BB MotherShip', 'ICSA Summit OS', 'ECDC Symposium', 'ISD Membership',
    'Green Diaspora', 'Amanda Ibezim', 'Taek Two Studios', 'True Access',
  ],
};
