# The Evidence Wing: UX and media plan

Status: PLAN, nothing built. Written 2026-11-10 after a full review of the three intake folders (see BUILD_JOURNEY.md, "Evidence intake"). This repo is public: no names of private people, no credentials, no health data in this file.

## 0. The one idea

The App Studio answers "what does it look like?". The Evidence Wing answers the three questions a hirer, funder or peer asks next:

1. **Is it real?** (production, numbers, dates, events, other people's words)
2. **How does it work?** (architecture, decisions, diagrams, the hard parts)
3. **Can she do this again?** (the loop from problem to shipped to measured)

Rule of the wing: **every claim sits next to the thing that proves it.** A number never appears without a source and a date. A screen never appears without what it is for.

Governing brief stays [[editorial-magazine-vision]]: a premium magazine, not a gallery. Each app is a feature story with a depth ladder, not a folder of images.

## 1. Where it lives

| Surface | Job | Notes |
|---|---|---|
| `/forge/studio` (exists) | The phone-first screen gallery for K53, VarsityOS, Sanyu | Keep. Becomes the "Screens" chapter of each case file. |
| `/forge/cases` (new) | Cover: all case files as a magazine contents spread | One lead story, others in a column. Same pattern as Journeys. |
| `/forge/cases/[app]` (new) | One case file per product | The main build. Template section 3. |
| `/forge/os` (new) | Jarvis OS as a walkable floor plan of wings | Section 6. |
| `/forge/field` (new) | Events and field proof: summit, DiBETSA, ECDC, radio, Belize | Section 7. Photos and video led, light on text. |

Positioning split ([[site-positioning-split]]): CreativelyNanda shows the **making** (decisions, scars, method, the OS). Outcome pages (hire me, pricing, client results) stay on mirembemuse. Case files link across with one clear door, never duplicate the sales page.

## 2. The depth ladder (every case file obeys it)

A visitor chooses their own depth, and the page never forces the deep end.

- **30 seconds:** cover plate, one-line promise, 3 proof numbers, one looping clip.
- **2 minutes:** the pitch deck (scroll-snap, 8 to 12 slides): problem, loop, product, proof, what is next.
- **10 minutes:** journeys and walkthrough, architecture diagram, decision cards.
- **30 minutes:** anatomy rooms (one screen read closely), scars (what broke), full recording.

A sticky "depth" rail on the left lists the rungs. On mobile it becomes a bottom sheet.

## 3. The case-file template

One template, one data file per app (`lib/data/cases/<app>.ts`), so adding an app is data, not layout work.

1. **Cover plate.** Product name, one line, live link, status chip ("Live", dated), one hero desktop frame on the app's own paper tint (existing `StudioApp.paper`). Three proof numbers with source and date on hover.
2. **The pitch.** Scroll-snap deck, one idea per slide, rebuilt as web content from the PDFs. Keyboard and swipe. Progress dots. "Open full screen" and "Download as PDF" only for decks cleared for publishing (AdminOS deck must be rebuilt without the demo login).
3. **Watch it run.** The screen recording, streamed, with chapter markers (for AdminOS: Command Center, Cash Cockpit, Bank reconcile, Payroll, Compliance, Autonomy). Click a chapter to jump. Captions on.
4. **The walkthrough.** Journeys, reusing the existing StoryPlayer, with a desktop frame variant for the web products. AdminOS: "A week with Thabo", six stops Monday to Friday, each stop is a real screen.
5. **Architecture, interactive.** Layered diagram (clients, edge, data, AI, jobs). Click a node: what it is, why it was chosen over the alternative, what it cost, what went wrong. Built as SVG with Framer Motion, not an image. Section 5.
6. **Decision cards.** 6 to 10 per app. Format: Decision, Alternatives, Why, Cost, Receipt (journal date or commit). Sourced from the app journals, written as prose in her voice, no em dashes ([[no-em-dashes-in-writing]]).
7. **Anatomy.** One screen read closely with numbered pins (existing AnatomyRoom, extended to desktop frames).
8. **Scars.** What broke and what it taught (existing `forge-scars` pattern; link, do not duplicate).
9. **Proof wall.** Numbers, dated; partner and event photos; quotes with attribution and consent status; the Report-Back moments that concern this app.
10. **Try it.** Live link; where a safe public demo exists, an interactive demo (section 5).

## 4. Showing the screens beautifully

Raw material problems solved first:

- **All 204 screenshots are now cropped** to 1366x626 (browser tabs and address bar removed, taskbar removed). Originals untouched. Output sits outside the repo at `C:\Users\nanda\evidence-work\shots\`.
- Dark product UIs on a light parchment ground is the strongest contrast available to us. Per [[nanda-design-language]]: no heavy navy scrim, warm paper, gold seams, grain, serif display.

Display components (new, all in `components/forge/evidence/`):

| Component | Use |
|---|---|
| `DeskFrame` | Desktop screenshot in a minimal frame (no fake browser chrome with tabs; a thin top bar with the live path only, e.g. `adminos.co.za/dashboard/payroll`). Soft shadow, 1.5 degree tilt on rest, flat on hover. |
| `DeskStack` | 3 to 5 frames fanned like a magazine spread. Hero treatment. |
| `Hotspots` | Pins on a frame (reuse anatomy pin logic, % coordinates). |
| `Loupe` | Hover or long-press magnifier at 2x for dense dashboards. Needs 2x derivatives. |
| `Compare` | Before/after slider (AdminOS landing v1 vs now, once we have both). |
| `WingMap` | Jarvis floor plan (section 6). |
| `Reel` | Vertical video rail for portrait event clips. |
| `Plate` | Event photo with caption, photographer credit, consent flag. |

Layout rules: asymmetry over grids; every grid collapses to one column under `md`; no three-up identical cards; at most one hero per viewport; frames never upscale beyond native width.

### Redaction (the important engineering decision)

You are happy to show Jarvis as-is and blur what should not show. **Blur must be baked into the pixels, never done with CSS.** A CSS blur over a normal image leaves the original data in the file anyone can open from DevTools.

Pipeline:
1. `redactions.json` per screenshot: list of rectangles in % of image, with a mode (`blur`, `pixelate`, `block`).
2. A build script burns them into a copy, then derivatives are made from the copy only. The un-redacted original is never uploaded.
3. A review sheet is generated after every run for a human eyeball check before upload.
4. Default policy per wing is a decision for you (section 9), but the mechanism supports all three: show, redact regions, or describe-only.

I can pre-select likely rectangles (client names, amounts, emails, health values) as a proposal for you to correct. You approve; nothing publishes from my guess alone.

## 5. Interactive features (the part that proves engineering, not just design)

Priority by evidence value per hour of work:

1. **Architecture explorer** (all apps). Click-through layered diagram; data comes straight from the decisions and journals.
2. **AdminOS: "A week with Thabo".** Six stops, each opens the real screen and the number it produced (R14 134 stuck in collections, EMP201 due on the 7th, one-tap reconcile). Sample data only, labelled as such.
3. **AdminOS: trust ladder.** The A/B/C autonomy model as a toggle: pick a task (send a polite reminder, send a firm notice, move money) and see which level applies and why. Mirrors the real autonomy settings screen.
4. **ISD: province map.** Nine provinces, member counts as of the dashboard date, tooltip with the source. Eight of nine active, Northern Cape next.
5. **Jarvis: wing map** (section 6).
6. **Cost and scale calculator** (AdminOS, optional). AI budget caps per tenant, to show the economics were designed, not hoped for.
7. **Sanyu: "jar to cart".** Already a journey; add the inventory guarantee (cannot sell the same jar twice) as a small animated reserve/commit/release.

Each interactive shows its data source and date in a footer line. No fake live data.

## 6. Jarvis OS: the design-engineering showpiece

107 screens across the dashboard and nine wings, plus the engineering story (container deploys, the tini fix, 392+ tables in Core, satellites isolated by blast radius, the Cloudflare migration, wiring gate in CI).

Experience: **`/forge/os` is a floor plan.** A top-down plan of a house with nine rooms (CEO, Finance, Cycle, Body, Marketing, Engineering, Sanctuary, Scholar, plus the Dashboard as the hall). Hover lights a room; click opens the wing as a mini-case: what it does, what runs without her (autonomy audit numbers), 3 to 6 screens, and one decision card.

Sections within a wing room: Purpose, Screens (DeskStack), The engineering (a decision card), What it does by itself.

Privacy handling is per wing, defaults proposed in section 9. The point of the wing is the **design and system thinking**, so even a heavily redacted screen still reads: layout, hierarchy, density, atmosphere are all visible when the words are blurred.

## 7. Field proof (events)

`/forge/field`: one scrolling reel per event, light on text, with a strong date and place line.

- **Connected Africa Summit, Johannesburg (14 to 15 Oct 2026):** stand photos, the sponsors page listing Banking Innovator, floor clips.
- **DiBETSA, UJ (21 Oct 2026):** the ISD stand, the pitch videos, a booth reel.
- **ECDC Export Symposium (Aug 2026):** the stand, the radio interview.
- **Green Diaspora Forum, Belize (9 to 11 Nov 2026):** the digital-support page, the live site, the staff control room.
- **At her desk:** the build-in-progress photos and clips (App Studio and the Workshop Floor visible on her own monitor). This is the "I really build these" layer.

Consent rule: faces of third parties (attendees, hosts, customers, learners in school uniform) are blurred or cropped out unless there is consent. Minors in uniform appear in at least one DiBETSA clip, so those clips are excluded or masked by default.

## 8. Media architecture on Cloudflare

**R2** for images, documents and short loops. **Stream** for anything longer than about 20 seconds.

- Bucket `cn-evidence` behind a custom domain `media.creativelynanda.co.za` (public, cached at the edge). Private bucket `cn-evidence-originals` for un-redacted sources if she wants them kept (never public).
- Image derivatives generated locally, then uploaded: AVIF and WebP at 480, 960, 1600 (and 2x for Loupe screens). A manifest stores width, height, dominant colour and a tiny blur placeholder, so layout never shifts.
- **Stream** for: five screen recordings (about 19 minutes total), the ECDC interview (4K source, 146 MB to 900 MB, do not upload originals), the ISD pitch, the vlog, the longer summit and DiBETSA clips. Adaptive bitrate, captions (VTT), chapters from a manifest. Custom thumbnails chosen by me from the contact sheets.
- **R2 short loops** (under 15 seconds, muted): hero loops, Sanyu product clips, desk clips. H.264 plus WebM, 720p, under 2 MB each.
- Estimated total video runtime is about 40 minutes. At Stream's published rates (verify current pricing before committing) this is a small monthly figure.
- Playback: a small custom player (poster first, no autoplay with sound, reduced-motion respects poster-only, keyboard controls, captions toggle) over the Stream HLS URL. No heavy iframe by default; iframe only as fallback.
- Hosting-independent: because media is on its own domain, the site can move from Vercel to Workers on its own schedule (CreativelyNanda is fifth in the migration order) without touching any media URL.
- Security: signed URLs for anything private (Stream signing for any clip held back); R2 token scoped to the single bucket, kept out of the repo and CI, per the global rule on the account-wide token.

Replaces the Cloudinary path for this wing only. Existing site imagery stays on Cloudinary until a deliberate move ([[cloudinary-media]]).

## 9. Decisions I need from you

1. **Wing defaults.** For each of Cycle, Body, Sanctuary, CEO, Finance: show with blur, show with heavy redaction, or describe-only? My proposal: show all with blur (you said the design is the point), but keep any value that is a medical reading or a therapy transcript fully blocked.
2. **Third parties.** Do you have consent (or want to seek it) for: the radio host, the two customers, Zee, Sibu, the forum participants? Until then: crop or blur.
3. **Minors.** Confirm the DiBETSA school-uniform clips stay out.
4. **AdminOS pricing.** R349 / R899 / R1,999 / R3,999 (pitch and Report-Back) or the older R2,500 / R4,500 / R8,500 / R14,999?
5. **Founding Circle.** "11 people who believed first", no names (my recommendation), or names with each person's consent.
6. **Demo credential.** The AdminOS pitch PDF holds a live demo login on its last slide. Please rotate that password regardless of what we publish.
7. **Order.** Proposed: Template + AdminOS first, then Jarvis OS, ISD, Sanyu, then the Selves of Us, Green Diaspora, ECDC, Amanda, then Field.

## 10. Build phases

0. **Prep (can start now, no site code).** Done: 204 crops. Next: derivatives, `redactions.json` proposals, review sheets, video transcodes, thumbnails, captions.
1. **Foundation.** R2 bucket and domain, Stream account check, manifest schema, `DeskFrame`, `Plate`, `Reel`, player, case-file template shell on `/forge/cases/[app]` behind an unlinked URL.
2. **AdminOS case file** end to end (pitch, run, Thabo week, architecture, decisions, proof).
3. **Jarvis OS** floor plan.
4. **ISD, Sanyu**, then the client products.
5. **Field.**
6. **Cross-links and discovery:** nav, homepage door, sitemap, JSON-LD (`personRef()`), metadata via `createMetadata` for every new route ([[canonical-inheritance]]).

Gates per phase: `scripts/forge-preflight.mjs`, a visual pass on 360, 768 and 1280 widths, hydration check ([[hydration-patterns]]), contrast and reduced-motion check, every claim has source and date, no un-redacted file in any upload manifest.

## 11. Risks

- **Size:** 2.5 GB of source. Mitigation: only manifest-listed files upload; nothing in the repo.
- **Stale numbers:** every figure dated; a `lib/data/claims.ts` registry with `asOf` and `source`, rendered by one component, so one edit updates the page.
- **Privacy slip:** baked redaction plus human review sheet before every upload; no CSS-only blur anywhere.
- **Scope:** 15 products is a lot. The template is the multiplier; ship AdminOS first and measure.
- **Local build on OneDrive is slow** ([[local-build-onedrive-fix]]); `tsc` is not the gate here, use the repo's existing preflight and the visual loop.
