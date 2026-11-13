# CreativelyNanda.co.za — Build Journey

## Thinking-cap session: the audience panel, staying longer, community, and Jarvis as the kitchen (Nov 12 2026)

**Goal:** step back and ask what would take the site to a whole other level. This session built one tool (the audience panel), ran it against the live site, and produced a plan of record for engagement, community, edtech, the newsletter and the blog. Nothing in the app was changed. Everything below is planned, not built, unless marked otherwise.

### 1. Outside-the-box ideas (first pass)
1. **Candlelight mode.** When the battery is low, the connection is slow, or it is night in KuGompo, the house dims to lamplight: text on parchment, video off, one poem lit. Load-shedding treated as an aesthetic, not a fallback. Recommended first pick.
2. **The house knows the time in KuGompo.** Atmosphere follows real SAST time, sunset and Eastern Cape seasons. Lamps at dusk; visitors abroad told "it's evening in KuGompo."
3. **A poem that is also a program.** One piece that reads as verse and, when run, draws the rose. Centrepiece of The Poet Who Codes.
4. **The visitor leaves with a zine.** The reading trail binds their kept poems, marked lines and own note into a PDF or share card.
5. **A voice line.** A phone or WhatsApp number that plays a poem in Nanda's voice. Works with no data; QR on the printed book.
- Honest notes: the real bottleneck is Nanda's voice content (backstories, audio, annotations). And the more rooms the house has, the more the front door must still lead business visitors clearly to Mirembe Muse.

### 2. The audience panel (BUILT, run once)
- **Built:** `.claude/agents/audience-critic.md` (a Sonnet reviewer that walks the site in character with Playwright), eight persona briefs in `.claude/audiences/`, and the `/audience-panel` command (fans all personas out in parallel, then synthesises). Screenshots go to `.audience-shots/` (gitignored); reports go to `docs/audience/<date>/`.
- **Personas:** poetry reader (from Instagram), aspiring poet (19, R29 bundle), heritage kin (Ugandan-South African auntie on /roots), tech hiring manager (90 seconds), SME owner (should reach Mirembe Muse), press/festival curator, load-shedding student (R12 data, slow 3G), cold stranger (design-literate, easily bored).
- **First run, 12 Nov 2026, live site.** Full results in `docs/audience/2026-11-12/PANEL.md` and the eight reports beside it.
  - Seven of eight achieved their goal with friction; the press curator gave up.
  - Everyone who got past the first screen liked what they found. The first screen is where the site loses people: slow, and it doesn't say who she is in plain words.
  - Caveat: eight throttled browsers ran on one laptop at once, so absolute load times are inflated. Re-measure with one clean Lighthouse run before fixing. Data sizes are reliable (home about 2.3 MB on 3G; an article 0.24 MB).
- **Top 10 changes from the panel**
  1. Text-first, lighter first paint on `/`, `/poetry`, `/poetry/collection`, `/roots`, `/about`, `/education` (all 8 personas).
  2. One plain line and three doors on the cover: "Poet. AI engineer." plus *Read the poems · See the Forge · Business? Mirembe Muse →*.
  3. One fact sheet for both sites (single source for counts, dates, registration number).
  4. A poet's press and booking page at `/press` (bios with copy buttons, credited hi-res photos, one clip, book details, booking terms); rename nav "The Press" to "Writing".
  5. Menu with one-line descriptors per room; business link at the top.
  6. "Write something now" in the /poetry hero and a home coverline.
  7. Hiring block on the Forge (email, CV, LinkedIn) and refreshed or date-labelled stats.
  8. "Find a poem by title or line" in the garden.
  9. Offline reading (service worker for visited poems and articles).
  10. Readability sweep: stronger veils, the empty band on /roots, hide floating bubbles on poem pages, label the poem toolbar, hide zero counts, unclip "KUGOMPO CITY" at 360px, short-URL redirects.
- **Collisions resolved:** keep the magazine cover and add the plain line; poet leads but one visible business button; media only after text and only on good connections (the same mechanism as candlelight mode); split poet press from company press; prove private code with recordings, not public repos.
- **Keep list:** the cover, "the language of systems, and the language of longing", "The garden is where she writes. This is where she builds.", the AdminOS dossier, the Share-a-line card, the mood garden, Poetry Games and My Garden (no sign-up), lean articles, /roots' sources note and untranslated praises, the soft book CTA.
- **Inconsistencies found (Nanda to choose the true value):** live product count (8, 12, 14 or 4 depending on page and site), poem count (62, 82, 83), "EST. 2021" vs "Founded 2025", "6+ months" vs "one year" on /engineer, two different company registration numbers in footers, KuGompo City vs East London in the Mirembe footer, Nnandawula vs Nandawula, clan-name casing, Forge stats read on 11 Aug.
- **For Nanda to confirm on /roots:** the Luganda forms and motto, the Kiroboozi line, Wannyana and Kabaka Kimera, clan head and seats, family names, Hlubi praise orthography and dates; whether "nine generations documented" shows a named line or is softened; Ganda-side imagery; a family-specific Tshawe line.
- **`public/app-graphics/` (see Nov 10 entry):** the panel maps it to its findings. The AdminOS recording answers the hiring manager's "I can't verify private repos"; Jarvis wing shots and the Sanyu recording fit their case files; five more products have screens but no case file yet. Still to be cropped, compressed and served from R2 or Cloudinary, videos as poster plus tap-to-play.

### 3. What makes a visitor stay longer
From the panel: people stayed when the site asked about *them* (the mood question), gave them something to *do* (Share-a-line, Finish the Line), showed *how she thinks* (the AdminOS decisions), named a tension in one line, and was honest (the /roots sources note). They left while waiting, or when they didn't know where they were.
1. Speed is the precondition.
2. **Every page ends with one specific next door** (poem → backstory → the stage clip; dossier → the scar from that build; /roots → the poem for that grandmother). Biggest structural lever.
3. **Poet ↔ engineer bridges** as navigation ("see how it was built" / "the night I wrote this, I also wrote…").
4. **Her voice:** ten recorded poems would move time-on-site more than any feature.
5. A light invitation to make something (prompt of the day, Finish the Line, erasure).
6. Gentle collecting and progress (My Garden counts, a take-home zine).
7. Room names that make a promise (one-line subtitle under each).
8. Serial rhythm (real issue dates, "since your last visit").
9. Time and place (the KuGompo clock).
- Avoid: infinite feeds, autoplay, fake counts, empty "0 hearts" rooms.
- Measure: the **second-door rate** per page (did they click on to another page instead of leaving), not raw time on site.

### 4. Interactive features and the community plan
**Techy:** poem version history (draft-to-final slider, tap a line to see when and why); "run a poem" (a visitor's words grow a unique flower planted in a shared garden); ask the archive (semantic search that only retrieves her poems, never writes them); a live build heartbeat on the Forge (last commit and SAST time, public data, slightly delayed); a hidden terminal mode on the Forge; the commit wall as found poetry.
**Writer:** prompt of the day drawn from her lines; a private draft room in the reader's browser with "read it back to me" (speech synthesis); Erasure Studio; a chain poem (each person sees only the previous line, revealed Fridays); a translation relay (isiXhosa, Luganda, Sesotho, English); "how this poem was made" craft notes.
**Community:** rhythm over feeds (Monday prompt, Friday reveal, monthly online open mic / Sunday Circle); Nanda's hand in it (three community poems a month get her margin notes); kindness built into the form ("a line that stayed with me" + "one question", no ratings); recognition not likes (featured on the Wall, a seasonal community zine); WhatsApp Channel for the daily line; QR at performances; a name for members; KuGompo and Kampala prompts, Luganda and isiXhosa days.
**Guardrails:** database access review before any public writes; pre-moderation of every public submission (as roses already are); decide under-18 handling under POPIA (18+ posting, or drafts private to the browser).
**Start with:** prompt of the day + chain poem; poem version history; a WhatsApp Channel (no code).

### 5. Jarvis is the kitchen, this site is the house (edtech, books, newsletter, blog)
**What exists (from a read of JarvisOS):**
- Scholar: structured lessons (concept, reflection prompt, action item, mastery score), weekly Nanda Book chapters, study books, a reading library (about 24 books + about 31 African canon), language lessons, and the **Composer** (Substack, Medium, LinkedIn, Dev.to formats).
- Sanctuary: poems, essays, novels and chapters, **recitals with audio**, craft lessons, collections with a "published" status, a story-submissions tracker. Journal, therapy, dreams and deep-psyche are private.
- Marketing: the magazine engine, a weekly long-form job writing one theme five ways, an approval queue. Substack, Medium, Wattpad, AllPoetry, WritersCafe and newsletter are **manual copy-paste lanes**. No newsletter list exists in Jarvis.
- **The bridge already exists but is switched off:** Scholar's Composer can POST to this site's `app/api/ingest/composition`, which creates an unpublished blog post for review. The shared secret was never set.
- The Nov 9 Jarvis design (one lesson becomes four posts; a "living book" in quarterly seasons) is decided but not built, and gives this site no role yet.

**The model:** everything is made privately in Jarvis; only what Nanda approves, item by item, crosses to creativelynanda.co.za, which becomes the **canonical home**. The Marketing wing then syndicates to every platform with a link back. The pipe accepts only an allowlist of public kinds (lessons, poems, essays, recitals, chapters); private Sanctuary material must be impossible to send, not merely off by default.

**The blog becomes a growing garden: Seed → Sprout → Bloom.** Seeds are short notes from Scholar fragments, sprouts are lessons and essays, blooms are finished chapters, collections and products. Every piece shows its lineage ("began as a seed in March, became Lesson 4, now Chapter 2 of Season One").

**Lessons people can do:** each Scholar lesson becomes a page with the idea told through a story (people anonymised), "Try it this week", a reflection box saved only in the reader's browser, a recall card days later, and **a paired poem from Sanctuary** (intellect + creativity, her signature). Lessons group into tracks, tracks into seasons; progress shows in My Garden. Plus: The Shelf (her reading list with her notes), a Luganda or isiXhosa word of the week in her voice, and a public rejections board from the submissions tracker.

**The newsletter, The Current, with five fixed sections:** The Lesson (Scholar), The Poem (Sanctuary, with "hear me read it"), The Build (Forge), The Prompt (replies feed the chain poem or Circle), From the Margins (a featured reader reply). Readers choose Writing / Learning / Building. Every issue gets a web edition here with audio and the interactive lesson, so the email stays light and the archive earns search traffic. (Today the site has signup and a welcome email but no issue sending.)

**A job for each platform, each linking home:** Substack for discovery (back to the interactive lesson, audio, full season); Medium for essays and technical posts with a canonical link (back to the Forge and tracks); Wattpad for serialised chapters and poems for young readers (back to the story bible, author notes, recitals); AllPoetry and WritersCafe for poet communities (back to poem version history, the Circle, the chain poem). Rule: post the work where the readers are; keep the thing only the site can do behind the link.

**Books and products from the seasons:** a season book (PDF via the Jarvis docs engine, later print), a workbook, a mini-course, later small live cohorts. Free lessons are the trail; season products are the destination, sold through the existing marketplace and PayFast.

**Before anything flows:** tighten database access on the subscriber list; harden the ingest endpoint (input validation, rate limit, constant-time secret check) before setting the secret on both sides via hosting secrets; publish only Nanda's own lessons, applications and short cited quotes from study books, never the compiled summaries of other authors' books (copyright).

**Suggested order:** (1) foundations: subscriber access, harden and switch on the bridge; (2) newsletter v1 with web archive; (3) lesson pages and the Seed/Sprout/Bloom blog; (4) Season One as book + workbook; (5) platform links home, including making Marketing's paste lanes add the canonical link automatically. Feature-sized and cross-repo, so it goes through `/build` with the architect first.

### 6. The whole media library gets a job (plan of record)
**Correction first:** the case files (AdminOS, Jarvis, Sanyu on `feat/evidence-wing`) use about 80 of about 310 pieces. The rest had no home. The new principle: the media is **raw material for the whole site, the newsletter, The Study and the socials**, not attachments to case files.

**Inventory (about 2.5 GB, untracked, never in git):** 204 app screenshots (AdminOS 49, Jarvis 107, Sanyu 22, Green Diaspora 12, Selves of Us 10, Amanda 4, ISD 3, ECDC 2; cropped copies outside the repo); 5 screen recordings; about 50 other clips (9 desk clips of Nanda building, ISD pitches, DiBETSA, Summit and ECDC stand clips, the ECDC radio interview, Sanyu product loops, a 97 s vlog); about 55 photos (Connected Africa Summit, ECDC Symposium, DiBETSA/UJ, Green Diaspora Belize, Sanyu customers and deliveries, 14 at her desk, `balkan-burger-era`, `taek-two-shoot`); 3 documents.

**Six new rooms:**
1. **The Road:** 2026 as a map and timeline (Johannesburg, UJ, KuGompo Export Symposium, Belize), each stop with photos, clips and outcome. The Johannesburg Report-Back becomes its story, told on the web, never as the PDF.
2. **The Screen Library:** all 204 screens, browsable by product and by pattern (dashboards, onboarding, empty states, AI chat, money, mobile), each with one line on why it looks that way.
3. **Watch it run:** the five recordings cut into 30–60 s chapters per feature, linked to the matching screen. Every clip gets a cover image and an audio-only version for data-poor visitors.
4. **Speaking & Booking:** pitches, the radio interview, the vlog and poetry performances together, for both festival programmers and conference bookers.
5. **The Press Room, filled:** desk, stage and stand photos as credited hi-res downloads; an event-clip "Recent" strip. Turns the panel's press blocker into the best page.
6. **The Workshop at Night:** the nine desk clips as the Forge's moving backdrop on good connections only, a still photo on slow ones (the candlelight rule); pairs with Long Nights.

**The same library feeds:** The Study (a "Build school" track using real screens and recordings, growing into a paid course "From idea to live app in South Africa"; the Sanctuary, Scholar and Marketing screens show where lessons come from); the newsletter's "The Build" section (about a year of issues) and a Johannesburg special issue; the Jarvis magazine engine for socials (Sanyu vertical loops, event clips, screens); the origin story (if `balkan-burger-era` is a before-tech chapter); **Issue 004, "The Year She Built"**; Mirembe Muse's case-studies page.

**One library underneath:** every piece tagged once (product, event, place, date, people present, consent, sensitivity, story, suggested uses) in a single catalog that this site, Mirembe Muse and Jarvis Marketing all read. No personal names in the public repo.

**Order:** (1) catalog pass (read-only, started 12 Nov), (2) web versions (images through the existing derivative + R2 pipeline; video transcoded with cover image and audio-only version), (3) rooms by panel impact: Press Room → Watch it run → The Road → Screen Library → Speaking & Booking; the Workshop at Night ships with candlelight mode.

**Still blocking:** the R2 token's IP filter (Cloudflare error 9109); video hosting choice (with about 50 clips, Cloudflare Stream now recommended for adaptive quality on slow phones).

### Open decisions for Nanda
0. Fix the R2 token; choose R2 or Stream for video; say what `balkan-burger-era` and `taek-two-shoot` are.
1. Newsletter home: Substack, own list via Resend, or the recommended hybrid (send from Substack, canonical archive here, regular list export).
2. A name for the learning side ("The Study", "The Open Notebook", "The School of Roses", or hers).
3. Free lessons, paid season books, workbooks and courses: yes or adjust.
4. How personal Nanda Book chapters can be in public.
5. The true values for every inconsistency above, and the /roots confirmations.
6. Whether amanda, ecdc, green-diaspora, isd and theselvesofus screens can be shown publicly.
7. Where to start building: recommended panel change 1 (text-first paint), then 2 (plain line and three doors).

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

### Evidence Wing: Sanyu Botanicals case file and R2 upload script (Nov 11 2026)
- **Built:** /forge/cases/sanyu. 21 real screens of the live shop (plus the Amazon.co.za listing), six slides, a customer's first week, six architecture nodes, four decision cards, five dated claims from the product truth file (25 tables, 52 migrations, 8 stock procedures, 60 s sync, 4,000+ Pargo points). Stated plainly as the founder's own brand. No prices in the copy; storefront framework not named because no source states it.
- **R2 upload:** scripts/evidence/upload-r2.mjs creates the bucket and uploads images only (never the lossless masters), reading the Cloudflare key inside its own process and printing no secrets. First run blocked: the account token has IP address filtering on and the owner's current IP is not on it (Cloudflare error 9109). Needs the token edited, or a new R2-only token. No Cloudflare change has been made.
- **Lesson:** an apostrophe inside a single-quoted claim string broke the dev compile; esbuild-check data files after bulk edits.

### Evidence Wing: Jarvis OS case file (Nov 11 2026)
- **Built:** /forge/cases/jarvis. 37 real screens across the dashboard and 8 wings, six slides, a Mon to Fri journey, nine architecture nodes, five decision cards, a proof wall, and a new clickable WingMap (pick a wing, see its room name, purpose and real screen). Facts from EMPIRE_ARCHITECTURE.md and PRODUCT_TRUTH_2026.md, six dated claims (27 wings, about 687 routes, 254 workers, 405 tables, $25 a day AI cap, executions 90k to about 20k).
- **Code generalised for more apps:** EvidenceApp type, per-app journey title, optional liveUrl (Jarvis is private), multi-folder derivative build, app-aware analytics, one new event (evidence_wing_pick).
- **Checked:** page renders (200), wing map works by click at 360 and 1280 px, no console errors, no broken images, content gate clean.
- **Caveat:** screens were chosen from contact sheets, so captions stay qualitative and quote no figures read off a screen.
- **Next:** Sanyu, then Green Diaspora, ISD, ECDC, Amanda, Selves of Us.

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

