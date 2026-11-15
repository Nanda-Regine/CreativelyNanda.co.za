/**
 * Server-side loader for the App Studio floors.
 *
 * A floor is one product's phone screens (lib/data/app-screens.ts, Cloudinary)
 * and desk screens (lib/data/evidence/<key>/screens.json + manifest.json, R2),
 * resolved here on the server so a floor route ships only its own app's data.
 * No per-app code: any roster app whose manifest exists gets a floor. The two
 * dynamic imports below make the bundler include every evidence folder as a
 * lazy server chunk; a missing folder simply resolves to null.
 *
 * Import this from Server Components only. Client components take the plain
 * data it returns, and import the types with `import type`.
 */
import { SCREENS, type AppKey } from './app-screens';
import { LIVE, type RosterApp } from './roster';
import type { ManifestEntry, ScreenEntry } from './evidence/types';

export interface PhoneShot {
  kind: 'phone';
  id: string;
  app: AppKey;
  chapter: string;
  caption: string;
}
export interface DeskShot {
  kind: 'desk';
  id: string;
  chapter: string;
  caption: string;
  alt: string;
  w: number;
  h: number;
  widths: number[];
  avif: number[];
  color: string;
  blur: string;
}
export type Shot = PhoneShot | DeskShot;

export interface FloorChapter {
  /** unique: device + name */
  id: string;
  name: string;
  device: 'phone' | 'desk';
  shots: Shot[];
}

export interface FloorApp {
  key: string;
  name: string;
  line: string;
  relationship: RosterApp['relationship'];
  host: string;
  liveUrl: string | null;
  paper: string;
  accent: string;
  accentInk: string;
  caseFile: string | null;
  dossier: string | null;
}

export interface Floor {
  app: FloorApp;
  shots: Shot[];
  chapters: FloorChapter[];
  hasPhone: boolean;
  hasDesk: boolean;
}

const KEY = /^[a-z0-9]+$/;

async function readScreens(key: string): Promise<ScreenEntry[] | null> {
  if (!KEY.test(key)) return null;
  try {
    const m = await import(`./evidence/${key}/screens.json`);
    return Array.isArray(m.default) ? (m.default as ScreenEntry[]) : null;
  } catch {
    return null;
  }
}
async function readManifest(key: string): Promise<Record<string, ManifestEntry> | null> {
  if (!KEY.test(key)) return null;
  try {
    const m = await import(`./evidence/${key}/manifest.json`);
    return m.default as Record<string, ManifestEntry>;
  } catch {
    return null;
  }
}

const toFloorApp = (a: RosterApp): FloorApp => ({
  key: a.key,
  name: a.name,
  line: a.line,
  relationship: a.relationship,
  host: a.host,
  liveUrl: a.liveUrl ?? null,
  paper: a.paper,
  accent: a.accent,
  accentInk: a.accentInk,
  caseFile: a.caseFile ?? null,
  dossier: a.dossier ?? null,
});

function groupChapters(shots: Shot[], device: 'phone' | 'desk'): FloorChapter[] {
  const out: FloorChapter[] = [];
  for (const s of shots) {
    if (s.kind !== device) continue;
    let c = out.find((x) => x.name === s.chapter);
    if (!c) {
      c = { id: `${device}-${out.length}`, name: s.chapter, device, shots: [] };
      out.push(c);
    }
    c.shots.push(s);
  }
  return out;
}

/** The floor for one roster key, or null when nothing has been captured for it. */
export async function getFloor(key: string): Promise<Floor | null> {
  const app = LIVE.find((a) => a.key === key);
  if (!app) return null;

  const phone: PhoneShot[] = app.phone
    ? SCREENS.filter((s) => s.app === app.phone).map((s) => ({ kind: 'phone', id: s.id, app: s.app, chapter: s.chapter, caption: s.caption }))
    : [];

  const deskKey = app.desk ?? app.key;
  const [screens, manifest] = await Promise.all([readScreens(deskKey), readManifest(deskKey)]);
  const desk: DeskShot[] = [];
  for (const s of screens ?? []) {
    const m = manifest?.[s.id];
    if (!m) continue;
    desk.push({ kind: 'desk', id: s.id, chapter: s.chapter, caption: s.caption, alt: s.alt, w: m.w, h: m.h, widths: m.widths, avif: m.avif, color: m.color, blur: m.blur });
  }
  if (!phone.length && !desk.length) return null;

  // Interleave phone and desk chapters so the floor changes device row to row.
  const pc = groupChapters(phone, 'phone');
  const dc = groupChapters(desk, 'desk');
  const chapters: FloorChapter[] = [];
  for (let i = 0; i < Math.max(pc.length, dc.length); i++) {
    if (dc[i]) chapters.push(dc[i]);
    if (pc[i]) chapters.push(pc[i]);
  }
  return { app: toFloorApp(app), shots: chapters.flatMap((c) => c.shots), chapters, hasPhone: phone.length > 0, hasDesk: desk.length > 0 };
}

/** Every live roster app that has a floor, in roster order. */
export async function getFloors(): Promise<Floor[]> {
  const all = await Promise.all([...LIVE].sort((a, b) => a.order - b.order).map((a) => getFloor(a.key)));
  return all.filter((f): f is Floor => f !== null);
}

export interface MixItem {
  key: string;
  name: string;
  accent: string;
  shot: Shot;
}

/**
 * A mixed pile for the masthead fan and the threshold: phone and desk
 * alternating, each from a different product where possible.
 */
export function mixOf(floors: Floor[], max = 5): MixItem[] {
  const cover = (f: Floor, kind: 'phone' | 'desk'): MixItem | null => {
    const list = f.shots.filter((s) => s.kind === kind);
    const rosterCover = LIVE.find((a) => a.key === f.app.key)?.cover;
    const pick = (rosterCover && 'id' in rosterCover ? list.find((s) => s.id === rosterCover.id) : undefined) ?? list[0];
    return pick ? { key: f.app.key, name: f.app.name, accent: f.app.accent, shot: pick } : null;
  };
  const phones = floors.map((f) => cover(f, 'phone')).filter((x): x is MixItem => x !== null);
  const desks = floors.map((f) => cover(f, 'desk')).filter((x): x is MixItem => x !== null);
  const used = new Set<string>();
  const out: MixItem[] = [];
  const take = (list: MixItem[]) => {
    const i = list.findIndex((x) => !used.has(x.key));
    if (i < 0) return false;
    const [x] = list.splice(i, 1);
    used.add(x.key);
    out.push(x);
    return true;
  };
  let turn: 'phone' | 'desk' = 'phone';
  while (out.length < max) {
    const ok = turn === 'phone' ? take(phones) || take(desks) : take(desks) || take(phones);
    if (!ok) break;
    turn = turn === 'phone' ? 'desk' : 'phone';
  }
  return out;
}

export interface ReelFiles {
  id: string;
  w: number;
  h: number;
  segments: {
    n: number;
    label: string;
    summary: string;
    durationS: number;
    files: { w: number; bytes: number; key: string }[];
    poster: string;
    stills: string[];
  }[];
}

const TS = '.ts';
/**
 * The chaptered recording for an app, read from lib/data/recordings.ts when
 * that file exists (owned elsewhere). The narrow suffix keeps the bundler from
 * pulling the rest of lib/data into the context. Null when absent.
 */
export async function getReel(key: string): Promise<ReelFiles | null> {
  try {
    const m = await import(`./recordings${TS}`);
    const list = (m.RECORDINGS ?? m.default ?? []) as (ReelFiles & { app: string })[];
    const rosterId = LIVE.find((a) => a.key === key)?.recording;
    const r = list.find((x) => x.id === rosterId) ?? list.find((x) => x.app === key);
    if (!r || !r.segments?.length) return null;
    return {
      id: r.id,
      w: r.w,
      h: r.h,
      segments: r.segments.map(({ n, label, summary, durationS, files, poster, stills }) => ({ n, label, summary, durationS, files, poster, stills })),
    };
  } catch {
    return null;
  }
}
