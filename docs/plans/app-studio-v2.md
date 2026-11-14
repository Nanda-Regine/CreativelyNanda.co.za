# App Studio v2: the front door to all product proof

Status: plan, 14 Nov 2026. Owner brief: "Make it the best app studio design, it's already looking awesome." Evolve, do not replace.
Branch: `feat/app-studio-v2` off `feat/cloudflare-workers` (staging). Production only after staging sign-off.

Read before building: `components/forge/AppStudio.tsx`, `StudioPhone.tsx`, `StudioDeep.tsx`, `lib/data/app-screens.ts`, `lib/data/evidence/*`, `components/forge/evidence/DeskFrame.tsx`, `VideoPlayer.tsx`, `scripts/evidence/*.mjs`, `docs/plans/evidence-wing-adminos.md`.

Hard constraint for every phase: no local `next dev`, `next build` or `tsc` (laptop has ~0.4 GB free RAM). Local gate = esbuild syntax/bundle check of touched files + `node scripts/evidence/check-content.mjs` + the new `node scripts/studio/check-roster.mjs`. Render gate = Playwright against the STAGING deploy at 360 / 768 / 1280 (screenshots, console errors, broken images, horizontal overflow).

---

## 1. User outcome

A recruiter, client or fellow builder on a mid-range Android phone can open one room, see all 17 live Mirembe Muse products (and the two in development) honestly labelled by relationship, and walk from a shelf card to real screens, short recordings and a public case file for each, so the proof behind "17 live apps" is one tap away and costs as little data as possible.

## 2. Acceptance criteria

Grouped by phase. Each phase ships alone and is checked on staging.

### Phase 1: Roster, shelf, public case files

1. Given `lib/data/roster.ts`, when `node scripts/studio/check-roster.mjs` runs, then it exits 0 only if: every entry passes `RosterAppSchema`; the count of `status: 'live'` equals the value of claim `studio.live-count` (17); WatchSankofa and SankofaSessions are `in-development`; True Access is `relationship: 'co-venture'`; no key contains a hyphen; every `accentInk` has contrast >= 4.5:1 on its `paper`; the sorted live names equal the dated `MIREMBE_PORTFOLIO_NAMES` list in the same file.
2. Given `/forge/studio` at 360px, when the page loads, then the shelf lists exactly 17 live products in three bands (Own products, Client platforms and partners, Internal), plus an "On the bench" lane with exactly WatchSankofa and SankofaSessions marked "In development", and the masthead live figure reads 17.
3. Given any shelf card, then it shows: name, relationship stamp (Own product / Client platform / Co-venture / Internal), one line, and an evidence row listing only what exists (screens with count, recording with chapter count, case file, live link). A card with no screens shows a typeset plate and "Live link" only, never an empty frame.
4. Given the True Access card, then the word "client" does not appear in it (Playwright text assertion).
5. Given `/forge/cases`, `/forge/cases/adminos`, `/forge/cases/jarvis`, `/forge/cases/sanyu` on staging, then the HTML has no `noindex` robots meta, each has a canonical to its own path, a BreadcrumbList and a SoftwareApplication JSON-LD whose `creator` is `personRef()`, and all four appear in `/sitemap.xml`.
6. Given the shelf cards for AdminOS, Jarvis and Sanyu, then each links to its case file; given each case file, then it links back to `/forge/studio` (and in phase 2 to its floor).
7. Given `/forge` (threshold), then the Studio line no longer says "three live products" and names the 17.
8. Given `/forge/studio` at 360 / 768 / 1280 on staging, then: 0 console errors, 0 failed image requests, `document.documentElement.scrollWidth <= innerWidth`, every interactive element >= 44x44 px, and the existing floor, journeys, anatomy and phone-to-stage transition still work (regression screenshots match phase 0 layout).
9. Given the shelf links, then none prefetch (`prefetch={false}`), verified by no RSC requests for card targets until tap.

### Phase 2: Per-app floors, phone and desk on one floor

10. Given `/forge/studio/[app]`, then a static page exists for every roster app with `phone` or `desk` screens (VarsityOS, K53, Sanyu, AdminOS, Jarvis, Green Diaspora, The Selves of Us, Amanda Ibezim, ISD Membership, ECDC Symposium) and returns 404 for any other key (`dynamicParams = false`).
11. Given `/forge/studio/sanyu`, then phone chapters (Cloudinary) and desk chapters (R2) appear on one floor with a device filter "All / Phone / Desk"; the filter appears only on floors that have both devices.
12. Given a desk screen is tapped, then it opens in the same stage as phones via the shared-element (`layoutId`) transition, arrow keys and Escape work, focus returns to the tapped element on close.
13. Given the stage shows a desk screen at 360px, when the user taps the image, then it zooms to 2.2x at the tap point and can be dragged; a second tap returns to fit. `aria-pressed` reflects zoom state.
14. Given any floor page, then the client JS payload contains only that app's screen manifests (no other app's ids appear in the route's JS or RSC payload; Playwright response-body search).
15. Given every new desk screen (Green Diaspora 12, Selves 10, Amanda 3-4, ISD 3, ECDC 2), then it has a `reviewed` date in its `screens.json` and appears in a signed review sheet; ISD screens show no member names, emails or phone numbers.
16. Given `/forge/studio` (main), then the old single floor is replaced by the shelf leading to floors, the masthead fan shows mixed devices, and Journeys and Anatomy remain.
17. Given each floor, then it ends in doors: Case file (if any), Open the live app (if public), How it was built (if dossier).

### Phase 3: Watch it run

18. Given the five recordings, then each is cut into 30 to 60 second chapter files; the AdminOS file starts after the event interview (no frame of the interview exists in any uploaded file, verified by the signed contact sheet of the first 10 s of chapter 1).
19. Given any chapter file, then: H.264 MP4, `+faststart`, no metadata (`-map_metadata -1`), no audio track unless the manifest says `audio: 'narration'`, 960w file <= 7 MB per 60 s and 640w file <= 3.5 MB per 60 s (script fails otherwise).
20. Given a reel on staging, when the page loads, then no `.mp4` request is made (network log) and the poster image is shown with duration and size ("0:42, 4.1 MB").
21. Given a normal connection, when the user taps a chapter poster, then only that chapter's file loads (640w under 768px viewport, else 960w) and plays with native controls; nothing ever autoplays.
22. Given `navigator.connection.saveData === true` or `effectiveType` in `slow-2g`, `2g`, `3g`, then no `<video>` element is rendered at all; each chapter shows a flipbook of 4 stills plus its text summary.
23. Given `curl -r 0-1023` on a chapter URL on `media.creativelynanda.co.za`, then the response is 206 with `Content-Type: video/mp4` and `Cache-Control` containing `immutable`.
24. Given a reel, then every chapter has a text summary visible next to it (text alternative for video-only media, WCAG 1.2.1), and the page has a `VideoObject` JSON-LD per recording with `thumbnailUrl`, `uploadDate`, ISO 8601 `duration`.
25. Given each case file with a recording (AdminOS, Sanyu), then its "Recording pending" shell is replaced by the real reel.

### Phase 4: Fill the empty frames

26. Given StokvelOS, ICSA Summit OS, BB MotherShip, True Access, mirembemuse.co.za and CreativelyNanda, then each either has reviewed screens (public pages, or sample-data accounts only) and a floor, or stays a plate with a live link; no screen shows real customer, member, staff or guest personal information.

## 3. Scope

**In:** single roster file for 17 live + 2 in-development; shelf on `/forge/studio`; per-app floors at `/forge/studio/[app]`; generalised stage (phone + desk, loupe); DeskFrame props refactor; desk screens for five client platforms through the existing derivatives + review + R2 pipeline; chaptered recordings on R2 with posters and flipbook fallback; case files public (noindex removal, sitemap, metadata, JSON-LD, links); threshold and `llms.txt` copy; capture plan for six apps without screens.

**Out (deliberately):**
- Moving the 100 phone screens from Cloudinary to R2 (works today; no user value; cost and risk of 100 broken images).
- New case files beyond AdminOS, Jarvis, Sanyu.
- Cloudflare Stream or HLS adaptive streaming (short chapters + two renditions are enough; no player library).
- Autoplay, background video, muted hero loops.
- A CMS, database tables, Supabase, analytics beyond existing `track()` events.
- Cross-route shared-element transitions (View Transitions API) between shelf and floor; the in-page `layoutId` stage stays the signature motion.
- Search or filtering across all 17 on the shelf (17 items do not need search).
- Any DNS change. `media.creativelynanda.co.za` is already connected (BUILD_JOURNEY line 31).

## 4. Data model

**No database.** All data is static, typed, build-time TypeScript/JSON, exactly like `lib/data/app-screens.ts` and `lib/data/evidence/`. There are no new tables and therefore no RLS surface. Nothing in this feature reads or writes Supabase.

### 4.1 `lib/data/roster.ts` (new, the single source)

Field names mirror mirembemuse.co.za `lib/data/portfolio.ts` where they overlap (name, relationship, status, url, line). It lives in the MirembeApp repo (GitHub Nanda-Regine/MirembeApp, branch master, local C:Users
andaOneDriveMirembeApp); the builder copies the 17 names into `MIREMBE_PORTFOLIO_NAMES` with an `asOf` date.

```ts
export type Relationship = 'own' | 'internal' | 'client' | 'co-venture';
export type RosterStatus = 'live' | 'in-development';
export type DeskKey = 'adminos' | 'jarvis' | 'sanyu' | 'greendiaspora' | 'selves' | 'amanda' | 'isd' | 'ecdc';

export interface RosterApp {
  key: string;                 // /^[a-z0-9]+$/  (no hyphens: screenUrl() splits ids on '-')
  name: string;                // brand name only; never a private person's name beyond the brand
  relationship: Relationship;
  status: RosterStatus;
  band: 'own' | 'client' | 'internal';  // shelf band; co-venture True Access sits in 'client' band, labelled Co-venture
  order: number;
  line: string;                // one sentence, no price, no em dash
  liveUrl?: string;            // https only; omitted for owner-only (Jarvis)
  host: string;                // text in the DeskFrame top bar, e.g. 'adminos.co.za', 'Jarvis OS, owner login'
  access: 'public' | 'login' | 'owner-only';
  paper: string; accent: string; accentInk: string;   // hex
  cover: { kind: 'phone'; id: string } | { kind: 'desk'; id: string } | { kind: 'plate' };
  phone?: AppKey;              // lib/data/app-screens.ts
  desk?: DeskKey;              // lib/data/evidence/<desk>/screens.json + manifest.json
  caseFile?: EvidenceApp;      // /forge/cases/<caseFile>
  recording?: string;          // id in lib/data/recordings.ts
  dossier?: string;            // /forge/floor/<dossier>
}
export const ROSTER: RosterApp[];
export const LIVE = ROSTER.filter((a) => a.status === 'live');
export const hasFloor = (a: RosterApp) => Boolean(a.phone || a.desk || a.recording);
export const MIREMBE_PORTFOLIO_NAMES: { asOf: string; names: string[] };
```

Bands (17 live): Own (6) AdminOS, VarsityOS, K53 Drill Master, Sanyu Botanicals, CreativelyNanda, StokvelOS. Client platforms and partners (9) The Selves of Us, BB MotherShip, ICSA Summit OS, ECDC Symposium, ISD Membership, Green Diaspora, Amanda Ibezim, True Access (Co-venture), Taek Two Studios (Venture: a media studio that sits under Mirembe Muse). Internal (2) JarvisOS, mirembemuse.co.za. Bench: WatchSankofa, SankofaSessions.

Claim added to `lib/data/evidence/claims.ts`: `studio.live-count`, value `'17'`, source "mirembemuse.co.za portfolio roster", asOf `2026-11-14`, status `verified`. The masthead and threshold read this claim; the check script asserts it equals `LIVE.length`.

### 4.2 How the existing stores relate

- `lib/data/app-screens.ts` stays as is (phone screens, Cloudinary, JOURNEYS, ANATOMY). `STUDIO_APPS` paper/accent move into the roster; `STUDIO_APPS` becomes a thin derived view (`ROSTER.filter(a => a.phone)`) so nothing that imports it breaks.
- `lib/data/evidence/` stays the home of desk screens and case files. `EvidenceApp` stays the 3 case files. New `DeskKey` type covers all desk screen sets. `build-derivatives.mjs` FOLDERS key `green-diaspora` is renamed `greendiaspora` (ids become `greendiaspora-HHMMSS`, which `screenUrl()` resolves correctly; today it would resolve to folder `green`).
- `lib/data/evidence/screens.ts` becomes server-only (`import 'server-only'`) and exposes `getDeskScreens(key: DeskKey): DeskItem[]`, where `DeskItem = ScreenEntry & { m: ManifestEntry }`. Pages resolve on the server and pass only the needed items to client components.

### 4.3 `lib/data/recordings.ts` (new)

```ts
export interface RecordingSegment {
  n: number;                 // 1-based
  label: string;             // chapter title
  summary: string;           // text alternative, 1-2 sentences
  durationS: number;         // 30..60
  files: { w: 640 | 960; bytes: number; key: string }[];  // key: 'video/adminos/adminos-run-01-v1-960.mp4'
  poster: string;            // key stem: 'video/adminos/adminos-run-01-v1-poster' (+ '-480.webp', '-960.webp', '-960.avif')
  stills: string[];          // 4 key stems for the flipbook
  captions?: string;         // 'video/<app>/<id>.vtt', only when audio === 'narration'
}
export interface Recording {
  id: string;                // 'adminos-run'
  app: string;               // roster key
  device: 'desk' | 'phone';
  w: number; h: number;      // source aspect after crop
  audio: 'none' | 'narration';
  uploadDate: string;        // 'YYYY-MM-DD', fixed string (hydration-safe, JSON-LD)
  reviewed: string;          // date the contact sheet was signed
  segments: RecordingSegment[];
}
```

R2 layout in bucket `creativelynanda-media`, served at `https://media.creativelynanda.co.za`:
- `/<deskKey>/<id>-<w>.(webp|avif)` desk screens (existing convention)
- `/video/<app>/<recId>-<nn>-v<k>-<w>.mp4`, `...-poster-<w>.(webp|avif)`, `...-still-<i>-480.webp`, optional `.vtt`
- Version suffix `v<k>` changes whenever bytes change (objects are `immutable`).

`CaseFile.video` type changes from `{ src: null }` to `{ posterScreen: string; recording?: string }`.

## 5. Interfaces

All routes are statically generated Server Components; no server actions, no API routes, no user input. Zod is used at build/check time to validate static data (the only "boundary" in this feature).

### 5.1 Zod schemas (in `lib/data/roster.schema.ts`, used by `scripts/studio/check-roster.mjs` via an esbuild bundle)

```ts
const hex = z.string().regex(/^#[0-9A-Fa-f]{6}$/);
const https = z.string().url().startsWith('https://');
const noDash = z.string().min(1).refine((s) => !s.includes('—'), 'em dash');
export const RosterAppSchema = z.object({
  key: z.string().regex(/^[a-z0-9]+$/),
  name: noDash.max(40), relationship: z.enum(['own','internal','client','co-venture']),
  status: z.enum(['live','in-development']), band: z.enum(['own','client','internal']),
  order: z.number().int().nonnegative(), line: noDash.max(180),
  liveUrl: https.optional(), host: noDash.max(48), access: z.enum(['public','login','owner-only']),
  paper: hex, accent: hex, accentInk: hex,
  cover: z.discriminatedUnion('kind', [
    z.object({ kind: z.literal('phone'), id: z.string() }),
    z.object({ kind: z.literal('desk'), id: z.string().regex(/^[a-z0-9]+-\d{6}$/) }),
    z.object({ kind: z.literal('plate') }) ]),
  phone: z.enum(['varsityos','k53','sanyu']).optional(),
  desk: z.enum(['adminos','jarvis','sanyu','greendiaspora','selves','amanda','isd','ecdc']).optional(),
  caseFile: z.enum(['adminos','jarvis','sanyu']).optional(),
  recording: z.string().optional(), dossier: z.string().optional(),
}).refine((a) => a.access === 'owner-only' || a.liveUrl, 'public/login apps need liveUrl')
  .refine((a) => a.status === 'live' || !a.caseFile, 'bench apps have no case file');
export const RecordingSchema = z.object({ /* mirrors 4.3; durationS 30..60; bytes caps per w; keys start 'video/' */ });
```
Cross-checks in the script: cover ids exist in their store; `desk`/`phone` keys have screens; `recording` ids exist; live count equals claim; names equal `MIREMBE_PORTFOLIO_NAMES`; contrast check.

### 5.2 Routes

| Route | Render | Data in | Out |
|---|---|---|---|
| `/forge/studio` | SSG | `ROSTER`, claim, cover items resolved server-side | Masthead (mixed-device fan), ledger, Shelf, Journeys, Anatomy, doors |
| `/forge/studio/[app]` (phase 2) | SSG, `dynamicParams=false`, params = `ROSTER.filter(hasFloor)` | phone screens + `getDeskScreens(desk)` + recording | Floor for one app; metadata via `createMetadata`; Breadcrumb + SoftwareApplication JSON-LD |
| `/forge/cases`, `/forge/cases/[app]` | SSG | unchanged | `noIndex` removed; links to studio/floor |
| `/sitemap.xml` | existing | adds `/forge/cases`, each case file, each `/forge/studio/<key>` with a floor | |
| `/llms.txt` | existing | copy from roster | |

### 5.3 Components

- `Shelf` (Server Component, `components/forge/studio/Shelf.tsx`): props `{ bands: { band, apps: ShelfCardData[] }[], bench: ShelfCardData[] }`. Hover/focus tint is CSS only (no client JS).
- `ShelfCard` (Server): `ShelfCardData = { key, name, relationship, line, cover: PhoneCover | DeskCover | Plate, evidence: { screens?: number; chapters?: number; caseFile?: string; liveUrl?: string }, floorHref?: string }`. Links use `prefetch={false}`.
- `StudioFloor` (client, extracted from `AppStudio.tsx`): props `{ app: RosterApp; items: FloorItem[]; chapters: string[]; recording?: Recording }` where `FloorItem = { kind: 'phone'; screen: Screen } | { kind: 'desk'; item: DeskItem; chapter: string }`.
- `Stage` (client, generalised): props `{ items: FloorItem[]; index; openerId; onClose; onGo }`; renders `StudioPhone` or `DeskFrame`; desk adds the loupe.
- `DeskFrame` (client): props change to `{ item: DeskItem; host: string; tilt?; priority?; className? }` (no global manifest import).
- `Reel` (client, replaces `VideoPlayer` body): props `{ recording: Recording; mediaBase: string; title: string }`; uses `useConstrainedNetwork()` (reads `navigator.connection` in `useEffect`, returns `'unknown' | 'ok' | 'constrained'`; server render and first client render are identical: posters only).
- `useConstrainedNetwork` (`components/forge/studio/useConstrainedNetwork.ts`).

## 6. Threat surface

No auth, no database, no user input, no AI. The real exposure is what the pixels and files reveal.

- **Information disclosure (highest).** Client platform screens may show third parties' personal information (ISD members, BB MotherShip staff or guests, summit attendees, Selves of Us users). Jarvis becomes public and contains private wings (finance, cycle, sanctuary). Recordings can show typed credentials, email addresses in login forms, tokens in the address bar, notification toasts, or (AdminOS) a person interviewed at an event. MP4 containers carry metadata (device, location, creation time). Mitigation: only manifest-listed files leave the work folder; redaction baked into pixels (never CSS blur); contact-sheet review signed for every image and every 2 s of video; `-map_metadata -1`; interview cut before any derivative exists; Jarvis screens re-reviewed at public standard before noindex is removed.
- **Spoofing / misrepresentation.** Mislabelling a relationship (True Access as client), counting in-development apps as live, or stating unverified numbers. Mitigation: roster schema + check script; numbers only through claims with source and date.
- **Tampering.** A bad `NEXT_PUBLIC_EVIDENCE_MEDIA_BASE` pointing media at a foreign host. Existing allowlist in `media.ts` stays; Reel builds URLs only through it.
- **Abuse / cost.** Hotlinking video. R2 has no egress fee; chapters are small; requests are Class B. Accept. On the visitor side the cost is their data: no autoplay, no preload, no video on constrained networks, sizes printed.
- **Elevation.** None (static pages, no privileged code paths). `server-only` on the screens registry stops accidental client bundling of all manifests.
- **Prompt injection.** Not applicable (no AI in this feature).

## 7. Risk register

| Risk | Cause | Impact | Likelihood | Mitigation | Test that proves it |
|---|---|---|---|---|---|
| Personal data of a client's users goes public | Unreviewed client screen or recording frame | POPIA breach, client trust lost | Medium | Manifest-only pipeline, baked redaction, signed contact sheets | `check-roster` fails if any desk screen lacks `reviewed`; build-derivatives refuses unlisted ids; signed review sheet attached to proof doc |
| AdminOS interview subject appears | Cut point wrong or untrimmed source uploaded | Third-party image published without consent | Medium | Trim before any derivative; uploader accepts only files listed in recordings manifest | Contact sheet of first 10 s of chapter 1 signed; upload script dry-run lists no file outside manifest; test: unlisted mp4 in out folder is refused |
| Credentials visible in a recording | Login typed on camera | Account compromise | Medium | Start segments after login; check-content credential patterns on captions; frame review | Contact sheet review; `check-content` self-test includes 'password', 'login:' in a summary string |
| Jarvis private wings exposed once indexed | Screens reviewed under "unlisted" standard | Private health/finance data public and cached by search | Medium | Re-review all Jarvis screens before removing noindex (phase 1 gate) | Signed Jarvis re-review sheet dated after 14 Nov 2026 exists before the noindex commit |
| Wrong live count or mislabelled relationship | Hand-edited copy in components | Credibility damage | Medium | Count derived from roster; claim asserted equal | `check-roster`: live === 17 === claim; True Access relationship co-venture; Playwright: no "client" text in True Access card |
| Desk ids break URLs | Hyphenated key (`green-diaspora`) split by `screenUrl()` | Broken images | High if not fixed | Keys `/^[a-z0-9]+$/`, FOLDERS rename | Schema test rejects hyphen key; Playwright broken-image count = 0 on Green Diaspora floor |
| Prepaid users burn data | Video preload, autoplay, or prefetch of 17 links | Users leave, cost to them | Medium | `preload="none"`, posters only, tap per chapter, `prefetch={false}`, constrained-network fallback | Playwright: no `.mp4` request on load; emulate Save-Data header + `navigator.connection` override: no `<video>` in DOM; no RSC prefetch for shelf targets |
| Page JS grows with 17 apps | Global manifest import in client DeskFrame | Slow first load on mid-range Android | High | Server-only registry, per-route props | Response-body search: floor route for `amanda` contains no `adminos-` ids; record route JS size before/after in proof |
| Horizontal scroll or tiny targets at 360 | Wide desk frames, tab strip of 17 | Broken mobile layout, WCAG fail | Medium | Bottom-sheet index instead of tabs; desk items max 86vw | Playwright at 360: `scrollWidth <= innerWidth`; all buttons/links >= 44x44 |
| Hydration mismatch | Network check or dates at render | React #418/#425, broken interactivity | Medium | Network read in `useEffect`; fixed date strings | Playwright console errors = 0 on staging for all studio and case routes |
| Shared-element transition breaks for desk | `layoutId` across different element shapes | Janky or stuck stage | Medium | Same wrapper element, aspect from manifest | Playwright: open desk screen, Escape, focus returns to opener; screenshot of stage at 360/1280 |
| Video not seekable or slow to start | Missing faststart, R2 range | Long wait, no seeking | Low | `+faststart`, check 206 | `curl -r 0-1023` returns 206 + immutable cache header |
| Oversized video files | Encoder settings drift | Data cost | Medium | Size caps enforced in transcode script and schema | Script exits 1 when a file exceeds its cap (unit self-test with a fake large size) |
| Case file pages indexed with pending claims | `pending-source` claims rendered | Unverified numbers in search | Medium | Public pages render only `verified` or `self-reported` (labelled) claims | `check-roster` lists claims referenced by case files; fails on `pending-source` |
| Video inaccessible | No text alternative | WCAG 1.2.1 fail | Low | Chapter summaries always visible | Playwright: each chapter card has non-empty summary text |
| Em dashes or prices leak into new copy | Writing habits | Breaks house rules and price allowlist | Medium | `check-content` scans `lib/data/roster.ts`, `recordings.ts`, new components | `check-content` exits 0 |

## 8. Task breakdown

Owner agent in brackets. `||` = can run in parallel with the previous task.

**Phase 1 (roster, shelf, public case files)**
1. [scout] Map imports of `STUDIO_APPS`, `APP_BY_KEY`, `SCREEN_BY_ID`, `MANIFEST_BY_ID`, `DeskFrame`, `VideoPlayer`; locate mirembe `lib/data/portfolio.ts`.
2. [backend-engineer] `lib/data/roster.ts`, `roster.schema.ts`, claim `studio.live-count`, `STUDIO_APPS` derived view, `scripts/studio/check-roster.mjs` (esbuild bundle + Zod), extend `check-content` scan paths.
3. [backend-engineer] || Jarvis public re-review sheet generated with `build-derivatives --review`; Nanda signs. Blocks task 6 only.
4. [frontend-engineer] Shelf + ShelfCard (Server Components), masthead copy from claim, threshold line, keep existing floor untouched.
5. [frontend-engineer] || Case files: remove `noIndex`, header comments, back links, SoftwareApplication JSON-LD; `/forge/cases` index restyled lightly to match.
6. [backend-engineer] Sitemap + `llms.txt` entries (after 3 is signed).
7. [qa-engineer] Playwright staging suite: AC 1 to 9 + regression of current floor/stage.
8. [security-auditor] || [compliance-officer] || [ux-reviewer] || [performance-engineer] review diff.
9. [verifier] then [scribe] proof doc `docs/proof/app-studio-v2-p1.md`, CHANGELOG, BUILD_JOURNEY.

**Phase 2 (floors)**
10. [backend-engineer] Rename `green-diaspora` key; add `screens.json` for greendiaspora, selves, amanda, isd, ecdc; run derivatives + review sheets; Nanda signs; upload via `upload-r2.mjs --apps ...`.
11. [backend-engineer] || `screens.ts` server-only + `getDeskScreens`; `DeskFrame` props refactor; update case-file components that use it.
12. [frontend-engineer] Extract `StudioFloor`, generalise `Stage` (desk + loupe), device filter, bottom-sheet index, `/forge/studio/[app]` route with metadata and JSON-LD; mixed-device masthead fan; main page links through.
13. [qa-engineer] AC 10 to 17 at 360/768/1280; payload isolation test.
14. Reviews, verifier, scribe as phase 1.

**Phase 3 (watch it run)**
15. [backend-engineer] `scripts/studio/recordings.mjs`: contact sheets (1 frame per 2 s), cut list from `recordings.ts`, transcode, posters/stills, size caps. Runs ffmpeg with `-threads 2` to respect laptop memory.
16. Nanda signs contact sheets (all five; AdminOS cut point).
17. [backend-engineer] Extend `upload-r2.mjs` with `--video`: only manifest-listed `.mp4`/`.vtt`/poster/still files, `Content-Type`, `Cache-Control: public, max-age=31536000, immutable`, size cap, dry-run first.
18. [frontend-engineer] || `Reel` + `useConstrainedNetwork`; mount on floors and case files; VideoObject JSON-LD.
19. [qa-engineer] AC 18 to 25 incl. network emulation and curl range check. Reviews, verifier, scribe.

**Phase 4 (fill the empty frames)**
20. [scout] Capture checklist per app (public pages vs sample-data login).
21. [qa-engineer] Playwright capture at 1366x626 of public pages (mirembemuse, CreativelyNanda, public pages of others) against live sites; Nanda captures login-only apps with sample data.
22. [backend-engineer] Review, derivatives, upload, roster cover change from plate to desk. Reviews, verifier, scribe.

## 9. Simplest viable design

**Chosen:** one static roster file that points at the two existing screen stores, server-resolved per-route props, per-app static floor pages, and short per-chapter MP4 files on the existing R2 bucket played by the native `<video>` element.

**Rejected:**
- *One giant client page with 17 tabs* (today's pattern scaled up). Ships every app's manifest to every visitor, a 17-tab strip does not fit 360px, and no app gets its own indexable URL. Per-app SSG routes are more boring and cheaper on data.
- *Migrating phone screens to R2 for one pipeline.* Uniformity is not a user outcome; 100 working images would be put at risk.
- *Cloudflare Stream / HLS player.* Adaptive streaming solves long videos; ours are 30 to 60 s chapters. Two renditions chosen at tap time do the job with zero dependency.
- *One long MP4 per recording with seek chapters.* A prepaid visitor who wants one feature would still risk pulling a 6-minute file; separate chapter files cap the cost of each tap.
- *A database or CMS for the roster.* 19 rows that change monthly belong in git with a check script.

**Design moves that make it the best studio (within the house style):**
1. **The Shelf as a three-band contents spread.** Own products on parchment, client platforms and partners on cherry, internal on navy: the equal-thirds colour rule is satisfied by structure, not by decoration. Each band has a lead card set larger and offset, and the rest step in an asymmetric stagger (left, right, inset) instead of a grid. At 360 each band becomes a contents list: a 56px real object (tiny phone, tiny desk frame or typeset plate) beside the name, stamp and evidence marks. "On the bench" sits as pencilled marginalia in italic beneath the navy band.
2. **Real objects, never empty frames.** A card's cover is the actual product: a CSS phone, a DeskFrame, or, when nothing is captured yet, a typeset plate on the app's own paper with the name in Cormorant italic and a gold rule. The evidence row prints only what exists ("34 screens, 6 chapters on film, case file, live"). Honesty is the luxury.
3. **One stage, two devices.** The beloved `layoutId` flight now carries desk frames too. Floors interleave phone and desk chapters, desk leads spanning wider so the strip rhythm changes row to row. On a 360px phone the stage gives a desk screen the full width and a loupe: tap to 2.2x at the tap point, drag to read, tap to return.
4. **Paper follows you.** Hovering or focusing a shelf card washes its band toward that app's paper tint (the existing 700 ms background transition); the floor opens on the same tint, and its chapter bands keep the navy / paper / cherry rhythm. The masthead fan becomes a mixed pile: two phones and three desk frames leaning, still spreading to the pointer on desktop and still static under reduced motion.
5. **Watch it run, priced honestly.** Each recording is a contact strip of chapter posters, each labelled with duration and size ("0:42, 4.1 MB"). Tap plays only that chapter. On Save-Data, 2G or 3G the strip turns into a flipbook of four stills with the chapter summary: the story still lands with no video at all.
6. **The depth rail.** A thin gold-seamed rail "Shelf, Floor, Case file" sits under the floor masthead and on case files, marking where you are; every floor ends in the same three doors (case file, live app, how it was built), so the depth ladder is always visible and never a dead end.

## Owner answers already given (14 Nov 2026)
- All apps shown publicly, clients included; video on R2; case files public. Live roster 17 incl. Amanda Ibezim and Taek Two Studios; WatchSankofa and SankofaSessions in development.
- Per-app story material: private studio notes extracted from every repo's build journals at `C:Users
andaevidence-workstudio-notes<app>.md` (never committed; PRIVACY FLAGS sections must never reach the site). Floors and cards draw their lines, decisions and dated numbers from these, each through the claims registry.
- Known bug to fix in phase 1: `screenUrl()` splits ids on "-", so hyphenated keys (green-diaspora) break; keys must be hyphen-free or the split fixed.

## Decisions for Nanda

1. **Login-only client platforms (ISD Membership, BB MotherShip, ICSA Summit OS, True Access, StokvelOS):** may screens be captured only from sample-data or demo accounts you provide? Default if no answer: they stay as plates with a live link.
2. ~~Taek Two~~ ANSWERED 14 Nov: Taek Two Studios is LIVE, relationship "venture", in the client platforms and partners band. Live count is 17.
3. **Sign-offs (gates, not choices):** the Jarvis public re-review sheet (blocks phase 1 indexing), the five client review sheets (phase 2) and the five recording contact sheets incl. the AdminOS cut point (phase 3).
