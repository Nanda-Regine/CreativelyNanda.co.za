# CreativelyNanda.co.za — Build Journey

## Evidence intake: the "show the proof" update (Nov 10 2026)

**Goal:** a major site update that puts as much evidence as possible on the page. The App Studio grows into a case file per app: pitch deck, technical decisions, diagrams, interactive features. Nothing is built yet. This entry records what was reviewed and what it means for the build.

### What arrived (untracked, in `public/`)
- `app-graphics/` (210 files, 292 MB): 204 desktop screenshots (1366x768), 5 screen recordings, the Johannesburg Report-Back PDF.
- `wetransfer_img-20261015-…/` (46 files, 1.5 GB): ECDC Export Symposium, Sanyu customers and delivery, Connected Africa Summit (Johannesburg), Uplift Institute logo, LinkedIn banner.
- `wetransfer_screenshot_20261108-…/` (54 files, 711 MB): DiBETSA (UJ), ISD pitch videos, Green Diaspora, Nanda at her desk (14 photos and 9 clips), Summit photos, the AdminOS FNB pitch PDF, the Green Diaspora programme PDF, a vlog.

Every image was reviewed on contact sheets. Every video was reviewed by keyframe only (not watched through). All four PDFs were read page by page.

### What the screenshots cover
| Product | Screens | Notes |
|---|---|---|
| AdminOS | 49 + recording | Landing, 6 AI agents, Command Center, Cash Cockpit, bank reconcile, payroll, compliance calendar, POPIA register, Langa mentor, autonomy settings |
| Jarvis OS | 107 across dashboard + 9 wings | CEO, Finance, Cycle, Body, Marketing, Engineering (CVE scanner, DORA, load tests, "Golden Bricks"), Sanctuary, Scholar |
| Sanyu Botanicals | 22 + recording | Shop, product pages, ingredients, story, journal, Amazon.co.za listing |
| Green Diaspora Forum | 12 + recording | Public site plus staff control room and build record |
| ISD, ECDC, Amanda, The Selves of Us | 3, 2, 4, 10 + recordings | Each a live product |

### What the PDFs add (source material for the case files)
- **Johannesburg Report-Back** (9 pp): the finished narrative. Banking Innovator listing at the Connected Africa Summit (stand earned by building ICSA's events app, a ticket normally ~US$2,500); DiBETSA and the ISD partnership; ISD at 240 members, 95% active, 8 of 9 provinces (figure from the live admin dashboard, Mon 9 Nov 2026 18:46 SAST); two FNB entries (VarsityOS App of the Year, AdminOS hackathon); Stories of Us with the National Arts Council; Green Diaspora Forum as Official Event Partner; five next steps.
- **AdminOS FNB pitch** (20 slides): problem, the loop (get paid, stay compliant, know your numbers, grow), "A week with Thabo" journey, architecture (Next.js 16 + React 19 PWA and Expo staff app on Cloudflare Workers; Supabase with RLS on all 110 tables; Inngest 40+ jobs; Claude Haiku for light tasks, Sonnet for reasoning; Upstash Redis), responsible-AI model (A/B/C trust levels, zero direct DB access for the model, per-tenant cost caps), POPIA and tenant isolation, proof stats (50+ screens, 238 tests, 122/122 persona checks, 40+ automations), "ready for credit" bank roadmap, pricing, validation, the ask.
- **Green Diaspora programme** (26 pp): three days in Belize City, convened by the Uplift Institute; agenda, partners, a "Forum Digital Support: Mirembe Muse" page (third-party proof of the engagement).

### Findings that change how we build
1. **Screenshots include browser chrome and the Windows taskbar** (open tabs, profile, clock). All must be cropped to the page area before use.
2. **The folders total ~2.5 GB and are untracked in a public repo.** Do not `git add` them. Add to `.gitignore`; serve via the Cloudinary pipeline like the App Studio screens (`lib/data/app-screens.ts` + `scripts/upload-app-screens.mjs`). Videos (some 4K, up to 900 MB) must be transcoded to web size first.
3. **The AdminOS pitch PDF's last slide holds a live demo login in plain text.** The PDF must never be published or linked. Rebuild the deck as web content without it. Rotating that demo password is recommended.
4. **Privacy decisions needed before anything ships:** the Jarvis Cycle, Body and Sanctuary wings (health, therapy and journal areas); CEO and Finance wings (client and pipeline names); the Report-Back's Founding Circle names (family included); faces of customers, attendees, radio hosts and forum participants.
5. **AdminOS pricing conflicts across sources.** The pitch and Report-Back say from R349/month (R349, R899, R1,999, R3,999). Older notes list R2,500 / R4,500 / R8,500 / R14,999. Current price list must be confirmed before any price appears.
6. **Every number needs a source and a date on the page** (for example ISD 240 members as of 9 Nov 2026, 122/122 checks as of 6 Oct 2026).

### Plan of record (pending decisions)
- One shared case-file template and one data file per app, extending the App Studio.
- Per app: scroll-through pitch deck, technical-decision cards, interactive architecture and data-flow diagrams, journey-grouped walkthrough with the recordings, proof wall (events, partners, quotes), and one interactive demo (AdminOS: "A week with Thabo"; ISD: province map; Jarvis: clickable wing map showing only approved wings).
- First case file: AdminOS (most evidence).
- Open decisions: Jarvis privacy treatment, third-party photo use, Founding Circle credit style (recommended: "11 people who believed first", no names), AdminOS price list, build order.

### Follow-up the same day (Nov 10, later)
- **Videos reviewed properly** (contact sheets of 6 to 9 evenly spaced frames per clip, all 46). Content: five screen recordings (AdminOS 6.5 min, Amanda 1.6, Green Diaspora 2.2, Sanyu 6.4, Selves of Us 2.2); ECDC Export Symposium (4K stand clips plus a radio interview); Sanyu balm and oil product loops (vertical, 10 to 12 s); Connected Africa Summit floor and stand clips; DiBETSA stand clips and two ISD pitch videos (the two ISD pitch `.MOV` files are near-identical but not byte-identical, 90 s each); a 97 s vlog; nine short desk clips of her building. The AdminOS recording opens with an event interview before the app (trim the first stretch).
- **Screenshots cropped.** All 204 screenshots cropped to 1366x626 (browser tabs, address bar and Windows taskbar removed), originals untouched. Output is outside the repo at `C:\Users\nanda\evidence-work\shots\`, same folder structure.
- **Build journals of the products read** (AdminOS, VarsityOS, K53, StokvelOS, AfriFlix in `build-journeys/`; JarvisOS and AdminOS master journals; JarvisOS `PRODUCT_TRUTH_2026.md` and `EMPIRE_ARCHITECTURE.md`) as source for decision cards and the architecture explorer.
- **Plan written:** `docs/EVIDENCE_WING.md` (depth ladder, case-file template, components, baked-in redaction, interactive features, R2 + Stream architecture, phases, decisions needed). Key technical rule: blur is burned into the pixels before upload, never CSS.
- Owner direction recorded: Jarvis data may be shown to display the design-engineering; sensitive regions get blurred.

### Mirembe site audit and external proof (Nov 10, evening)
- **Live audit of mirembemuse.co.za and sanyubotanicals.co.za** (HTML and text only; not visually rendered, browser extension was offline). The site is more complete than first assumed: `/status`, `/testimonials`, `/review`, `/case-studies` (8), 14 demos, legal set (POPIA, PAIA), pricing ladder in the FAQ, continuity answer, Organization and FAQ schema.
- **Gaps found:** no page names Banking Innovator, DiBETSA, FNB, ISD's member count, B-BBEE Level 1, or any Google/Cylex rating; Sanyu shop shows no reviews; `/testimonials` holds endorsements of the founder as a manager (LinkedIn), not client reviews; "Numbers That Matter" (1,384 people reached) undersells; "Fourteen systems live" counts demos while 7 products are shown; hero says "Built solo" while the FAQ says "trusted team"; `/case-studies` says "1 Country"; title tag repeats the brand; location wording says kuGompo City only (keep East London as a keyword).
- **Stale index:** `mirembemuse.vercel.app` and `creatively-nanda-co-za.vercel.app` still appear in search and return 402.
- **External proof supplied by owner:** Google Business profile for Mirembe Muse showing 5.0 from 8 reviews (clients of consulting, client portals, e-commerce admin, VarsityOS and Sanyu; two owner replies); Google profile for Sanyu Botanicals (figures not yet read); Cylex listing (fetch blocked); a Facebook video by The Voice Lounge of the 7th Eastern Cape Export Symposium interview (about 5.5K views); a Facebook post by the Eastern Cape Export Symposium featuring Mirembe Muse and Mirembe Niche; an ICSA Instagram post (20 Oct 2026) welcoming Mirembe Muse as a **Supporting Partner** of the 28th Connected Banking Summit.
- **Wording rule from this:** ICSA's own post says "Supporting Partner"; the programme page lists Mirembe Muse under "Banking Innovator". Use ICSA's published words and say "listed as Banking Innovator in the programme".
- Reviewers' names are deliberately not recorded in this public file.

### Evidence Wing: prices, consent, render proven (Nov 11 2026)
- **Owner decisions:** AdminOS screenshots are all demo data; Jarvis screens show nothing sensitive; people in the photos have consented and the school children's faces do not show. Redaction work for these is dropped.
- **Pricing resolved:** read from adminos.co.za (#pricing): Solo, Grow, Operate, Scale, Partner plus four add-ons, no setup fee, 14-day trial. The older R2,500+ list is retired. Annual billing left out: the site says both "save 2 months" and "15% on negotiated Scale and Partner contracts".
- **Built:** lib/data/evidence/adminos/pricing.ts (dated, sourced), PriceLadder.tsx, a "What it costs" section on /forge/cases/adminos. check-content.mjs allows prices in those two files only.
- **Render proven:** /forge/cases/adminos returns 200 locally; the earlier 404s were a first-compile race. At 360 and 1280 px: no horizontal scroll, no console errors.
- **Direction from owner:** less testing, more building. Formal reviews and node tests are deferred until the feature set is in.

### Evidence Wing build, phase 0+1, AdminOS (Nov 10 to 11) - IN PROGRESS, NOT VERIFIED
Branch `feat/evidence-wing`. Plan: `docs/plans/evidence-wing-adminos.md` (acceptance criteria and risk register). Nothing committed.
- **Built:** `.gitignore` now excludes the three raw media folders and `public/evidence-dev/`. `scripts/evidence/build-derivatives.mjs` makes web derivatives from the 20 chosen AdminOS screens (100 files, about 3 MB) and burns any redaction into the pixels first; it fails closed on bad rectangles. `scripts/evidence/check-content.mjs` fails on credentials, prices, em dashes, FNB over-claims, CSS blur and inline numbers.
- **Data:** `lib/data/evidence/` (types, claims registry with source and date per number, media-base validation that only allows a site path or `media.creativelynanda.co.za`, AdminOS case file: 9 slides, 5-day journey, 11 architecture nodes, 8 decision cards, 11 proof items).
- **Components** in `components/forge/evidence/`: DeskFrame, DeskStack, Plate, Reel, VideoPlayer (shell, no video yet), PitchDeck, JourneyWeek, ArchitectureExplorer, DecisionCards, ProofWall, ClaimFigure/ClaimsFootnote.
- **Routes:** `/forge/cases` and `/forge/cases/adminos`, noindex, not in sitemap or nav. `lib/analytics.ts` gained two fixed event names. `scripts/forge-preflight.mjs` now walks subfolders (it crashed on the new `evidence/` folder).
- **Editorial decisions:** no prices shown (list unresolved); the panel quote about pricing was dropped for a neutral event line; FNB wording limited to two exact sentences; demo login never transcribed.
- **Passed:** content check, forge preflight, esbuild syntax on every file.
- **Not proven:** the pages did not render in the local dev server (first compile took about nine minutes; `/forge/cases`, `/forge/cases/adminos` and the existing `/forge/studio` all returned 404, so the cause is unknown and probably not these routes). Phone-width, keyboard and console checks not done. The node tests were not finished (the test agent hit the usage limit). No linter is configured in this repo, so nothing was linted. Security, UX and performance reviews and independent verification are still to run. The manifest marks all screens as not redacted because no blur rectangles are defined yet, and the 20 screens have not been checked for sensitive data.
- **Open decisions for the owner:** which AdminOS price list is current; change the demo password on the pitch PDF; confirm the neutral event line instead of the panel quote; approve a one-time production-style build or Cloudflare preview to check rendering.
- **Loose end:** a `next dev` process on port 3111 may still be running (the tool could not stop it). Close it manually.

### Not done
No files moved into the repo, uploaded or committed. No `.gitignore` change yet. No site code written.

---

## Dev team kit + Cloudflare prep installed (Oct 16 2026)

- Installed the Mirembe dev team kit: 15 agents in `.claude/agents/` (Opus orchestrator + architect, Sonnet engineers/reviewers/verifier, Haiku scout/code-janitor/scribe) and `/build` `/fix` `/audit` `/migrate-cloudflare` commands.
- `CLAUDE.md`: kit rules on top, this app's existing notes kept under "## This app" (they win on conflict).
- `.claude/settings.json`: merged safety blocks (no .env/.dev.vars reads, no force-push, no prod db push / store submit / `vercel --prod`, no wrangler prod deploy or deletes; asks before push, npm install, any wrangler deploy or secret put). Existing settings kept.
- Cloudflare plan: this app moves Vercel → Cloudflare Workers in turn (**VarsityOS → AdminOS → True Access → K53 DrillMaster → CreativelyNanda → mirembemuse.co.za → StokvelOS → Sanyu → … → JarvisOS last** (headless Chrome, 776 routes). One app per session; Vercel stays live ≥14 days as rollback.). Nothing deployed or changed on Vercel/Supabase/DNS yet. Run `/migrate-cloudflare` when it's this app's turn.

---

