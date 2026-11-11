# Plan: Evidence Wing, phase 0+1, AdminOS case file

Status: PLAN. Branch `feat/evidence-wing`. Governing UX: `docs/EVIDENCE_WING.md` (approved, not re-litigated here).
This repo is public: no credentials, no private names. Prices appear only in lib/data/evidence/adminos/pricing.ts and PriceLadder.tsx (live list from adminos.co.za, dated 11 Nov 2026).

## 1. User outcome

A hirer, funder or peer who is given the unlisted link `/forge/cases/adminos` can, in 30 seconds to 30 minutes, see that AdminOS is real, how it is built and that every number on the page carries a source and a date, so Nanda's engineering claims are believable without a sales call.

## 2. Acceptance criteria

1. Given a dev server, when GET `/forge/cases` and `/forge/cases/adminos`, then both return 200; `/forge/cases/<anything-else>` returns 404 (via `notFound()`).
2. Given either route, then the HTML has `<meta name="robots" content="noindex, nofollow">` (from `createMetadata({ noIndex: true })`), the routes are absent from `app/sitemap.*` output, absent from `components/layout/Navigation.tsx`, and no other page links to them (grep for `/forge/cases` outside `app/forge/cases/` and `components/forge/evidence/` returns nothing).
3. Given the built page HTML and every file under `lib/data/evidence/` and `components/forge/evidence/`, when scanned by `scripts/evidence/check-content.mjs`, then there are zero matches for: the demo login email/password patterns (`@` in any copy string, `password`, `demo@`, `login:`), `R\s?\d` price patterns, the em dash `U+2014`, and the phrases `partner(ed)? with FNB` / `FNB partner`.
4. Given any FNB mention, then its text equals one of exactly two strings: "accepted into FNB App Academy 2026" or "submitted to the FNB App of the Year hackathon (Youth Entrepreneurship & Small Business Growth, 23-25 Oct 2026)".
5. Given `lib/data/evidence/claims.ts`, when the node:test suite runs, then every claim has non-empty `value`, ISO `asOf`, non-empty `source`, and `status` in the allowed set; every `claimId` referenced from case data resolves; no claim with status `retired` is referenced.
6. Given a rendered claim, then the number is followed by a footnote marker linking (keyboard reachable) to a `ClaimsFootnote` entry showing source text and the date as "as of 6 Oct 2026" format.
7. Given `screens.json`/`manifest.json`, when the node:test suite runs, then every screen referenced by the case file exists in the manifest with width, height and `redacted: true` (or a `reviewed` flag), and every derivative path exists under `public/evidence-dev/` (dev) .
8. Given a screen whose derivative is missing at runtime, then `DeskFrame` renders a sized placeholder with the caption, not a broken image, and layout does not shift (width/height from manifest).
9. Given `NEXT_PUBLIC_EVIDENCE_MEDIA_BASE` unset, then media URLs start with `/evidence-dev`; given a value that is not `/...` path or `https://media.creativelynanda.co.za`, then `mediaUrl()` throws at build in production and falls back to `/evidence-dev` in dev with a console warning (unit tested).
10. Given the PitchDeck, when focused, then ArrowRight/ArrowLeft/PageDown/PageUp/Home/End move one slide, progress dots are buttons with `aria-label="Slide n of N"` and `aria-current`, and swipe works via native scroll-snap.
11. Given the ArchitectureExplorer, when tabbing, then each node is a focusable `button` (in SVG via `<foreignObject>`-free `role="button" tabIndex=0` on `<g>`), Enter/Space opens its detail panel, Escape closes it and returns focus to the node.
12. Given `prefers-reduced-motion: reduce`, then no tilt, fan, auto-advance or scroll animation runs (framer `useReducedMotion`), and VideoPlayer shows poster only.
13. Given VideoPlayer with no `src`, then it shows the poster and a "Recording pending" label, has no play button that does nothing, and makes no network request for video.
14. Given viewport widths 360, 768, 1280, then `document.documentElement.scrollWidth <= innerWidth` on both routes and asymmetric layouts collapse to one column under `md` (screenshot check).
15. Given a fresh load in dev, then the console shows no React hydration warnings (#418/#425/#422): no `Date.now()`, `Math.random()` or locale date formatting during render; dates are pre-formatted strings in data.
16. Given axe-equivalent manual checks, then text contrast is at least 4.5:1, touch targets at least 44x44px, all images have `alt` from screens.json.
17. Given the page, then no price, no analytics event carries free text or PII (`track()` only with fixed event names + slide index / node id).
18. Gates pass: `node scripts/forge-preflight.mjs`, `next lint` on changed files, esbuild syntax check, `node --test scripts/evidence/*.test.mjs`.

## 3. Scope

In: `/forge/cases` cover (AdminOS as the only lead story), `/forge/cases/[app]` with app=adminos; components DeskFrame, DeskStack, Plate, Reel, VideoPlayer (shell), PitchDeck, JourneyWeek, ArchitectureExplorer, DecisionCards, ProofWall, ClaimsFootnote; claims registry; AdminOS case data; content check script and node:test tests.

Out (deliberately): R2 bucket, Cloudflare Stream, DNS, custom domain, deploy, any upload; real video URLs; Hotspots, Loupe, Compare, WingMap, trust-ladder toggle, cost calculator; depth rail bottom sheet (phase 2); other apps; Jarvis `/forge/os`, `/forge/field`; nav, sitemap, homepage door, Person JSON-LD launch wiring; annual billing terms (the live site contradicts itself); PDF download of the deck; Supabase (no new tables, no DB access).

## 4. Data model

No database. Static, typed, build-time data. (No tables, so no RLS; nothing reads Supabase.)

Files:
- `lib/data/evidence/types.ts`
- `lib/data/evidence/claims.ts` (registry, shared by all apps)
- `lib/data/evidence/media.ts` (`mediaUrl()`, base validation)
- `lib/data/evidence/cases.ts` (registry `CASES: Record<string, CaseFile>`, `getCase(app)`)
- `lib/data/evidence/adminos/case.ts` (slides, journey, arch, decisions, proof)
- `lib/data/evidence/adminos/screens.json`, `manifest.json` (exist, 20 screens)

```ts
type ClaimStatus = 'verified' | 'self-reported' | 'pending-source' | 'retired';
interface Claim {
  id: string;                 // 'adminos.tests'
  value: string;              // '238' (string: no locale formatting at render)
  label: string;              // 'automated tests'
  asOf: string;               // ISO '2026-10-06'
  asOfLabel: string;          // '6 Oct 2026' (pre-formatted, hydration-safe)
  source: string;             // 'CI run, AdminOS repo' (plain text)
  sourceUrl?: string;         // https only, optional
  status: ClaimStatus;
}
interface CaseFile {
  app: 'adminos'; name: string; promise: string; liveUrl: string;
  status: { label: 'Live'; asOfLabel: string };
  paper: 'parchment' | 'bone' | 'navy' | 'cherry';
  heroScreens: string[];      // screen ids, 3 to 5
  coverClaims: [string, string, string];  // claim ids
  slides: Slide[]; journey: JourneyStop[]; arch: ArchNode[];
  decisions: DecisionCard[]; proof: ProofItem[];
  video: { posterScreen: string; src: null; chapters: { label: string; t: number }[] };
}
interface Slide { id: string; kicker: string; title: string; body: string[]; claimIds?: string[]; screen?: string; }
interface JourneyStop { day: 'Mon'|'Tue'|'Wed'|'Thu'|'Fri'; title: string; body: string; screen: string; figure?: string; sampleData: true; }
type ArchLayer = 'clients' | 'edge' | 'data' | 'ai' | 'jobs' | 'ops';
interface ArchNode { id: string; layer: ArchLayer; label: string; what: string; why: string; alternative: string; cost?: string; wentWrong?: string; claimIds?: string[]; edges?: string[]; }
interface DecisionCard { id: string; decision: string; alternatives: string[]; why: string; cost: string; receipt: string; } // receipt = journal date or short commit
type ProofItem =
  | { kind: 'claim'; claimId: string }
  | { kind: 'quote'; text: string; attribution: string; consent: 'given' | 'anonymised'; asOfLabel: string }
  | { kind: 'event'; text: string; asOfLabel: string }; // the two FNB strings live here only
```

Seed claims (all with source and date): 50+ dashboard screens; 238 automated tests; 122/122 persona checks across 7 personas (6 Oct 2026); 40+ automations / Inngest jobs; RLS on all 110 tables (checked 26 Oct 2026); FNB hackathon panel 2 of 2 "can use" and "can buy"; first beta founder, Johannesburg, since Aug 2026. Hackathon quote is attributed "FNB hackathon panel, Oct 2026", consent `anonymised`.

Slides (about 9): Problem (cash trapped; deadlines nobody warned them about; no records so no funding; five apps they cannot afford), The loop (get paid, stay compliant, know your numbers, grow), Product, Architecture summary, Responsible AI (A/B/C trust; only courteous reminder stages 1 to 3 send themselves; stages 4 to 6 and anything money-moving wait for the owner; model has zero direct DB access; inputs sanitised), Proof, Trust, Bank path (live: invoices/receipts, compliance+payroll, bank reconcile; next: pay-from-invoice, credit-readiness profile), Validation. No pricing slide. No last "try the demo" slide.

Arch nodes: Next.js 16 + React 19 PWA; Expo staff app; Cloudflare Workers API (session, tenant lookup, role check, Zod, server-only data, rate limit, signed webhooks); Supabase Postgres+Auth with RLS; Inngest; Claude (Haiku light, Sonnet reasoning, per-tenant budget caps); Upstash Redis; Paystack; PostHog after consent; Sentry; CI type-check+tests.

## 5. Interfaces

Routes (server components, `generateStaticParams` returns `[{app:'adminos'}]`, `dynamicParams = false`):
- `app/forge/cases/page.tsx`: `createMetadata({ title, description, path: '/forge/cases', noIndex: true })`, breadcrumb JsonLd with `personRef()`.
- `app/forge/cases/[app]/page.tsx`: `params` validated by `z.enum(['adminos'])`; failure calls `notFound()`; `generateMetadata` with `noIndex: true`.
- No server actions, no API routes, no forms.

Components (`components/forge/evidence/`, client only where interaction needs it):
| Component | Props | Notes |
|---|---|---|
| `DeskFrame` | `{ screenId; path?: string; tilt?: boolean; priority?: boolean }` | thin bar with path text; `next/image` `unoptimized` with manifest w/h; placeholder on error |
| `DeskStack` | `{ screenIds: string[] }` (3 to 5) | fan on md+, single frame stack under md |
| `Plate` | `{ src; alt; caption; credit?; consent: 'given'|'none' }` | refuses render if consent none and `faces` flagged |
| `Reel` | `{ items: {poster; alt; caption}[] }` | horizontal snap rail, contained width (no page overflow) |
| `VideoPlayer` | `{ poster: string; src: string \| null; chapters; captionsSrc?: null }` | `src null` gives poster + "Recording pending" |
| `PitchDeck` | `{ slides: Slide[] }` | scroll-snap, keyboard, dots, IntersectionObserver for index |
| `JourneyWeek` | `{ stops: JourneyStop[] }` | "A week with Thabo"; "Sample data" label on each stop |
| `ArchitectureExplorer` | `{ nodes: ArchNode[] }` | SVG layers, focusable nodes, side panel (bottom panel under md) |
| `DecisionCards` | `{ cards: DecisionCard[] }` | asymmetric, not three identical |
| `ProofWall` | `{ items: ProofItem[] }` | |
| `ClaimFigure` / `ClaimsFootnote` | `{ id }` / `{ ids: string[] }` | single renderer for every number |

Validation: a Zod schema per type in `lib/data/evidence/schema.ts` (zod already installed) used by the node tests only; render path trusts typed data. All strings rendered as React text, never `dangerouslySetInnerHTML`. `sourceUrl`/`liveUrl` must match `^https://`.

## 6. Threat surface

- Info disclosure, credentials: the pitch's last slide has a live demo login. It is never transcribed; content check script fails on email/password patterns. Nanda to rotate it regardless (EVIDENCE_WING 9.6).
- Info disclosure, screenshots: only derivatives from the redacted copies built by `build-derivatives.mjs` sit in `public/evidence-dev/`; no CSS blur anywhere; test asserts every manifest entry is marked redacted/reviewed and that no file in `public/evidence-dev/` lacks a manifest entry. Originals stay outside the repo (`C:\Users\nanda\evidence-work\`), `.gitignore` covers any local originals folder.
- Secrets: only `NEXT_PUBLIC_EVIDENCE_MEDIA_BASE` is new and it is a public URL, not a secret. No R2/Stream tokens in this build.
- Tampering, media base: `mediaUrl()` allowlists `/`-relative paths and `https://media.creativelynanda.co.za`; rejects `javascript:`, `http:`, other hosts.
- XSS: data is static TS/JSON, rendered as text; no HTML strings; URLs scheme-checked.
- Spoofing/over-claim (reputational): FNB wording locked to two strings; claims need source+date; quote anonymised.
- Discovery before launch: noindex+nofollow, absent from sitemap and nav, no inbound links. Note: unlisted is not private; nothing on the page may be secret.
- Analytics: `track()` events use fixed names (`evidence_slide`, `evidence_arch_node`) with index/id only; no PII, no free text.
- Abuse/cost: static pages, no API, no AI calls; nothing to abuse. Not AI-driven, so no prompt-injection surface.

## 7. Risk register

| Risk | Cause | Impact | Test that proves mitigation |
|---|---|---|---|
| Demo credential leak | Copy transcribed from pitch last slide | Live account exposed in public repo | `check-content.mjs` fails on email/password/demo patterns across data, components and built HTML; CI-style run in gates |
| Redaction bypass | Unredacted derivative or CSS blur | Client data exposed | node:test: every file in `public/evidence-dev/adminos` has a manifest entry with `redacted|reviewed`; grep for `blur(` in evidence components returns 0 |
| Stale or unsourced claim | Number typed inline | Credibility loss | node:test: all claims have value/asOf/source/status; grep for digits followed by "tests|tables|screens" in components fails; numbers only via `ClaimFigure` |
| Price shown | Pitch slide or copy reuse | Shows an unresolved price | `check-content.mjs` rejects `R\s?\d` and "per month" in data and built HTML |
| FNB over-claim | Loose wording | Reputational/legal | content check: any "FNB" string must equal one of the two allowed strings |
| Em dash in copy | Habit, pasted text | Breaks writing rule | content check rejects U+2014 (and ` -- `) in data and components |
| Missing image 404 | Derivative not built / base wrong | Broken frames, CLS | node:test: every referenced screen has derivative files; manual: delete one locally, frame shows placeholder |
| Hydration mismatch | Date/random/locale in render, inline style | React #425 errors | dev console clean on both routes at 3 widths; grep for `Date.now|Math.random|toLocale` in evidence code returns 0 |
| Keyboard failure on deck/explorer | Div click handlers | WCAG fail | manual keyboard script per AC 10, 11 recorded in PR; lint `jsx-a11y` clean |
| Reduced motion ignored | framer variants always on | Vestibular harm | emulate reduce in devtools: no tilt/fan/animation, video poster only |
| 360px overflow | Fanned stack, SVG width, Reel | Horizontal scroll on Android | screenshot at 360 + `scrollWidth<=innerWidth` snippet on both routes |
| Media base misconfigured in prod | Env unset or wrong host | Broken images or third-party host | node:test on `mediaUrl()` for valid, unset, `http:`, foreign host, `javascript:` |
| Route indexed / in sitemap | Sitemap auto-collects routes, link added | Premature public launch | test: sitemap module output has no `/forge/cases`; curl page shows noindex meta; grep inbound links = 0 |

## 8. Task breakdown

Independent tracks marked [P]. Agents: engineer (Sonnet), reviewer/QA (Sonnet), scribe (Haiku).

1. engineer: `types.ts`, `schema.ts`, `media.ts`, `claims.ts`, `cases.ts` skeleton. Blocks everything else.
2. [P] engineer A: `adminos/case.ts` content (slides, journey, arch, decisions, proof) from the pitch facts in this plan; no prices, no credentials, no em dashes.
3. [P] engineer B: `DeskFrame`, `DeskStack`, `Plate`, `Reel`, `VideoPlayer` shell.
4. [P] engineer C: `PitchDeck`, `JourneyWeek`.
5. [P] engineer D: `ArchitectureExplorer`, `DecisionCards`, `ProofWall`, `ClaimFigure`/`ClaimsFootnote`.
6. [P] QA: `scripts/evidence/check-content.mjs` and `scripts/evidence/*.test.mjs` (node:test, zero deps); add `components/forge/evidence/` to preflight TARGETS if not auto-scanned.
7. engineer: routes `app/forge/cases/page.tsx`, `app/forge/cases/[app]/page.tsx` composing 2 to 5; verify sitemap exclusion.
8. QA: gates (preflight, lint, esbuild, node tests, content check), screenshots at 360/768/1280, keyboard + reduced-motion pass, hydration console check.
9. scribe: BUILD_JOURNEY entry (no prices, no credentials).

## 9. Simplest viable design

Chosen: static TS/JSON data plus server components, client islands only for deck, explorer and stack; scroll-snap native for the deck instead of a carousel library; hand-built SVG for architecture instead of a diagram library; one claims registry with pre-formatted dates. Rejected: Supabase-backed claims table (adds RLS, network and a public anon surface for content that changes monthly), MDX (new dependency), and a generic "section renderer" abstraction across apps (only one app exists; extract when the second arrives). Video stays a shell: no Stream until Nanda approves.

## Decisions for Nanda

1. Pricing: RESOLVED 11 Nov 2026 by owner. Use the live list on adminos.co.za (Solo, Grow, Operate, Scale, Partner). The older R2,500+ list is retired.
2. Rotate the AdminOS demo password from the pitch's last slide, whatever ships.
3. Hackathon quote: publish anonymised as "FNB hackathon panel, Oct 2026" (default) or seek named consent.
4. Beta founder: "first beta founder in Johannesburg since August 2026" with no name or business (default) or with consent.
5. Production media base (R2 + `media.creativelynanda.co.za`) and Stream: later, ask-first; not in this build.
