# ⚙️ The Forge — Build Spec

> Companion to `HOUSE_OF_ROSES.md`. That doc built the garden. This one builds
> the workshop on the other side of the same house.

**Status:** spec. Corpus built and verified (`scripts/forge-ingest.mjs`).
Rooms not yet built.

---

## 0. The one idea

Engineering on this site was **one page inside the "Story" dropdown** while poetry
had a top-level group with **nine rooms**. That is not a design decision, it is an
accident of how the site grew — and it reads as though the engineering is a
footnote to the poetry.

It isn't. Measured in words, **the engineering corpus is larger than the poetry
corpus**: 98,974 words of build journal against 67 poems.

> **The Forge is a wing, not a page.** Sibling to Poetry, not a child of Story.

### The rule that keeps the two sites apart

| | Mirembe Muse | CreativelyNanda |
|---|---|---|
| Code is a | **service** | **medium** |
| Reads as | case study, ROI, hire me | studio practice — like poetry, like photography |
| Answers | *Can you build this for me?* | *What is it like to be her when she builds?* |

**If a room starts arguing _for_ her, it belongs on mirembemuse.** Every room below
is process, failure, texture and play. None is a sales page. This is the discipline
that stops the two sites becoming rivals — and it is why the Forge can be more
intimate than anything a client-facing site could host.

---

## 1. The map of the wing → real routes

| Room | Route | What it is | Fed by | Phase |
|---|---|---|---|---|
| ⚙️ **The Forge** | `/forge` | Threshold. Heat, anvil, the nine principles. | written | **A** |
| 🌱 **Where It Started** | `/forge/origins` | The 9 foundation projects. Every one with a **live link you can still click**. | `Foundations` — 43 sections | **A** |
| 🔨 **The Workshop Floor** | `/forge/floor` | Every build, one dossier each. | 10 apps, 21–274 sections each | **A** |
| 🌙 **The Long Night** | `/forge/nights` | The diary. Newest-first, session by session. | 219 sessions, 251 dated | **A** |
| 🩹 **The Scar Room** | `/forge/scars` | What broke. What hour. What it cost. | curated, ~20 | **A** |
| 📟 **The Bench** | `/forge/bench` | **Live.** Apps breathing, deploys landing. | JarvisOS pulse bridge | B |
| 🧱 **The Commit Wall** | `/forge/commits` | 1,384 commits as found poetry. | JarvisOS `engineering_commits` + `git_translations` | B |
| 🥋 **The Dojo** | `/forge/dojo` | Drills. Guess the bug. Read the trace. | JarvisOS `engineering_dojo_drills` (74) | B |

**Two rooms that do not move:**

- `/engineer` — Issue 003, the career feature. Keeps its URL (it is well-optimised
  and indexed) but **lists inside the Forge group** as *The Making*. Do not redirect it.
- `/poetry/poet-who-codes` — stays in the poetry wing. It is **the doorway between
  the two wings** and must be linked from both sides. The thesis of the whole site
  stands in that one room; moving it into the Forge would break the symmetry.

---

## 2. The nav restructure — do this first

This is the actual fix to the imbalance, and it is nearly free.

```
BEFORE  Home · Story(About, The Engineer, Roots, Education) · Poetry(9) · Shop · Gallery · Writing · Contact
AFTER   Home · Story(About, Roots, Education) · Poetry(9) · The Forge(8) · Shop · Gallery · Writing · Contact
```

Story sheds *The Engineer* and becomes purely **the woman**. Poetry and The Forge
stand as equals. Edit `components/layout/Navigation.tsx` — add a `FORGE_ROOMS`
array and a fourth entry to `GROUPS`.

> ⚠️ **Known constraint:** that is a 4th dropdown on an already-wide desktop bar
> (`lg:flex gap-6`), which also carries cart, language, PWA button and the Mirembe
> CTA. Fold `Gallery · Writing · Contact` into a fifth group ("More" / "The Rest")
> or the bar will wrap at `lg`. Do not ship the 4th group without solving this.

---

## 3. The corpus

`scripts/forge-ingest.mjs` → `lib/data/forge-corpus.json`.

**1,062 sections · 98,974 words · 12 apps · 86% classified · 1.21 MB**

### Sources (14 journals, 3 genres)

| Genre | Shape | Sources |
|---|---|---|
| **diary** | `## SESSION (date)` newest-first, war log | JarvisOS (145 sessions), AdminOS, BB MotherShip, K53, Sankofa Sessions |
| **dossier** | Vision / Stack Decisions / Architecture / Phase N | AdminOS, CreativelyNanda, K53, WatchSankofa, StokvelOS, TrueAccess, Campus Compass |
| **chronicle** | Brief / Build / Lesson ×9 | `project-docs/BUILD_JOURNEY_WhereItStarted.md` |

The sources live **outside this repo** — other GitHub repos plus
`OneDrive/build-journeys/`. Ingest therefore runs **locally** (where `gh` is
authed and OneDrive is mounted) and the output JSON is **committed**. Same pattern
as `scripts/upload-poem-wall.mjs`. Vercel never reaches for a source.

> **`OneDrive/build-journeys/` is not disposable.** Git holds the updated copies —
> dedup dropped 53-of-54 sections from `k53-build-journey.md` and 37-of-43 from
> `adminos-build-journey.md` as stale mirrors. But that folder is still the **only**
> source for StokvelOS, WatchSankofa, Campus Compass, TrueAccess and CreativelyNanda
> — **159 sections**. Do not clean it up.

### Entry schema

```ts
{
  id, app, source, priority, journalKind,   // provenance
  session, heading, level, date,            // position
  class, words, commits[], ownerQuote,      // derived
  sensitive: boolean,                       // curation probe
  review: 'pending' | 'approved' | 'never', // the gate
  body: string,
}
```

### 🔴 Hard constraint — the corpus never reaches the browser

1.21 MB of JSON. Importing it into a client component ships the entire build
journal — including every `sensitive` and `review: 'pending'` section — to any
visitor who opens devtools. **The gate is worthless if the raw file is in the bundle.**

- Read it in **server components / `generateStaticParams`** only.
- Rooms receive **curated, redacted subsets** as props.
- Never `import` it from a `'use client'` file, directly or transitively.
- Consider splitting to `lib/data/forge/{app}.json` at ingest time if per-room
  build memory becomes a problem.

### Section classes

| Class | n | Use |
|---|---|---|
| `session` | 219 | The Long Night spine |
| `entry` | 149 | Distinctive story titles — **correctly** unclassified |
| `manifest` | 122 | 🚫 **Scaffolding. Excluded from the wing.** |
| `shipped` | 104 | Workshop Floor |
| `architecture` | 81 | Workshop Floor |
| `decision` | 71 | Threaded everywhere |
| `security` | 65 | 🚫 **Excluded by default** (31% sensitive) |
| `phase` | 65 | Build timelines |
| `verified` | 53 | Receipts |
| `vision` `audit` `scar` `open` `lesson` | 34 · 31 · 30 · 21 · 17 | Origins, Scars |

**Do not chase 100% classification.** The 149 `entry` sections are titles like
*"VelvetFist — the missing half"* and *"The pipe that had never run"*. Those are
real story sections with distinctive names; bucketing them would destroy the thing
that makes them good.

---

## 4. The curation gate

**166 sections (16%) tripped the sensitivity probe** — API keys, live exposures,
client names, salary and invoice figures. The Scar Room is the best idea in this
wing and the most dangerous one.

### The policy — decided 2026-08-07

**Brief: the wing must impress CTOs.** That sharpens curation considerably,
because the material a CTO respects is nearly the inverse of the material that
fills a build log.

> ### Publish the reasoning. Withhold the inventory.

| A CTO reads on | A CTO closes the tab on |
|---|---|
| Root cause — *why the system allowed it*, not "fixed a bug" | Changelogs and file lists |
| Trade-offs under real constraint (cost, load shedding, ZAR, one developer) | Feature marketing |
| **How you knew it worked** — the verification step | Unverifiable claims |
| Honest negative results — *"assessed, intentionally left alone"* | Security theatre |
| Measured numbers at real scale | Round numbers with no method |

This is why `manifest` is excluded on quality grounds as well as safety grounds:
`API Routes` and `Required env vars` are the single least impressive thing an
engineer can publish. They read as a directory listing, not as judgment.

**Written default-deny, so getting it wrong fails closed.**

1. **Default deny.** Nothing renders unless `review === 'approved'`. The ingest
   writes `'pending'` on every entry, always.
2. **Never publish, no review needed** — drop wholesale:
   - `class === 'manifest'` (122) — env vars, DB config, route lists
   - `class === 'security'` (65) — live exposure write-ups
   - anything `sensitive === true` in any class (166)
   - Overlap accounted for, that drops **315** and leaves exactly **747 sections
     eligible for review** (of which 183 are `session` containers, so ~564 are
     actual prose to read).
3. **Two tiers, reviewed in order.** A **60-word floor** pre-filters stubs — the
   eligible median is only 55 words, because the journals are written in dense
   bursts, so this is a stub filter and *not* a quality gate. Never let word count
   stand in for judgment.

   | Tier | Classes | Queue @ ≥60w | Role |
   |---|---|---|---|
   | **1 — judgment core** | `scar` `decision` `audit` `verified` `lesson` | **91** | Scar Room, and pull-quotes everywhere |
   | **2 — build context** | `vision` `architecture` `phase` `shipped` | **132** | Workshop Floor |
   | 3 — spine only | `session` | — | dates and structure; body trimmed |

4. **Cap the rooms below the queue.** The Scar Room ships **~20 entries, not 91.**
   Twenty excellent postmortems beat ninety adequate ones, and a CTO reads the
   twenty. Curation means leaving good material out.
5. **Redaction over deletion** where a strong section carries one bad line: replace
   client names with role ("a retail client"), figures with magnitude ("a five-figure
   engagement"), never quote a key, table name or route path.
6. **On `security` — a deliberate reversal.** CTOs do respect security writing, and
   blanket-excluding all 65 sections loses genuinely impressive work ("four live
   exposures closed"). But those apps are still running; publishing exposure detail
   is real risk, and self-congratulation about finding your own holes reads badly.
   **Resolution: the raw sections stay excluded forever. Instead, hand-write one
   "Security posture" essay** for the Scar Room describing the *class* of bug and
   the systemic fix, with no live specifics. Written fresh, never generated.
7. **Tooling — built 2026-08-08.** `scripts/forge-curate.mjs`:

   ```
   node scripts/forge-curate.mjs shortlist   # corpus  → project-docs/forge-curation-shortlist.md
   node scripts/forge-curate.mjs apply       # marked md → lib/data/forge-review.json
   ```

   Nanda marks the markdown (`[x] approve` / `redact` / `never`), `apply` writes the
   sidecar. Re-running `shortlist` re-renders prior decisions pre-ticked, so a
   post-ingest re-run is a diff to review rather than the whole queue again.

   **Scar candidates are not selected by `class`.** The classifier's `scar` bucket
   is contaminated and — more importantly — the best postmortems in the corpus are
   filed under `decision`, `lesson` and `entry` (the PayFast sort bug is an `entry`).
   The script scores every Tier-1 and `entry` section for whether it explains a
   **cause**, penalises inventory/changelog headings, and caps repeated headings at
   two so one recurring section cannot eat the room.

> **Sidecar, not in-place.** `forge-corpus.json` is regenerated from source on every
> ingest. Curation decisions MUST live in a separate file keyed by a stable hash of
> `app + heading + body`, or a single re-run silently un-approves the whole wing.

---

## 5. Room specs

### 5.1 ⚙️ `/forge` — the threshold

Sibling to `/poetry`. Not a projects grid — a room you walk into.

- **Backdrop:** `PAGE_BACKDROPS.forge` (`poet-who-codes-background.jpg`, torn
  rose-gold paper) — already in `lib/house-assets.ts`.
- **Portrait:** the `room: 'forge'` entry already exists (Nanda at the drums).
- **The wall text:** the nine principles from `BUILD_JOURNEY_WhereItStarted.md`
  ("Design is an argument", "WhatsApp is the SA UX pattern", "Database primitives
  before application code" …). Carved, not listed.
- **Doors** to the other rooms + one door back to `/poetry/poet-who-codes`.
- **A live number if the bridge exists**, otherwise a static one. Never a fake one.

### 5.2 🌱 `/forge/origins` — Where It Started

The strongest Phase-A room, because the writing is already finished.

Nine projects, each already carrying **The Brief / The Build / The Lesson**, plus
six deployed demos — **verified 2026-08-07**:

| Demo | Status |
|---|---|
| `women-retreat-yellowwood-forest.vercel.app` | 200 ✅ |
| `green-valut-e-commerce-store-demo.vercel.app` | 200 ✅ |
| `poetry-tube.vercel.app` | 200 ✅ |
| `cortex-hub-booking-5e35.vercel.app` | 200 ✅ |
| `true-access-app.vercel.app` | 200 ✅ |
| `kustom-krafts.vercel.app` | **404 — dead** ❌ |

**The carpentry demo is gone — resolved 2026-08-08.** `kustom-krafts.vercel.app`
stays dead and unlinked; the card renders "Deployment archived" plus a link to
`mirembemuse.co.za/demos` (verified 200), the maintained multi-industry gallery that
supersedes it. That is also the correct side of the split — the business site sells
the service, this room only tells the story of learning to build it.

- Ordered as the **learning architecture** (Layer 1 → Layer 6), not chronologically.
  The sequence is the argument: each layer built on the last.
- Every card ends on **The Lesson** — that is the doorway word, exactly as poems
  end on one in the Reading Room.
- Close on **The Throughline** (the nine principles) → door to `/forge`.
- ⚠️ Re-verify the demo URLs at build time — one has already died since the
  chronicle was written. A dead "live demo" link is worse than no link. Degrade to
  "archived" rather than 404 the visitor.

### 5.3 🔨 `/forge/floor` — The Workshop Floor

Index + `/forge/floor/[app]`. Ten builds have enough material:

| Build | Story sections |
|---|---|
| JarvisOS | 274 |
| AdminOS | 83 |
| CreativelyNanda | 66 |
| BB MotherShip | 60 |
| StokvelOS | 56 |
| Campus Compass | 51 |
| K53 Drill Master | 41 |
| TrueAccess | 25 |
| WatchSankofa | 21 |

**Sankofa Sessions has 1 section — exclude it.** A near-empty room reads as neglect.
Either journal it properly first or leave it off the floor.

Per-build page: `vision` → `architecture` → `phase` timeline → `verified` receipts.
Dossier apps render thematically; diary apps render as a condensed arc with a link
into The Long Night.

### 5.4 🌙 `/forge/nights` — The Long Night

The diary, newest-first. This is build-in-public as it actually happened —
`THE NIGHT OF THE SILENT FAILURES`, `INNGEST COST SURGERY`,
`The one bug that killed four dashboards`.

- **219 sessions**, of which **251 entries carry a parsed date, all in 2026.**
- ⚠️ **Do not build a full-history timeline.** The dossiers are undated and the
  2025 origin story (first line of code, July 2025) has no machine-readable dates.
  A timeline UI would imply the record starts in 2026. It doesn't — Origins carries
  2025, in prose. Scope this room to the dated diary and let Origins hold the
  beginning.
- Thread `ownerQuote` through as pull-quotes — **but there are only ~8 real ones
  corpus-wide** (2 of the 10 extracted are false positives — `"Nanda Girl"` and
  `"Inside Her Roses"` are titles, not speech). A recurring texture, **not a room**.

### 5.5 🩹 `/forge/scars` — The Scar Room

The highest-trust room on the site, and the only one mirembemuse could never host —
a services site cannot admit failure.

> ⚠️ **This room cannot be auto-populated.** `class === 'scar'` has 30 entries and
> spot-checking shows real contamination: `"Commit"`, `"Staff portal"`,
> `"B1 — Red-temp auto-escalation"` are not scars — the body-fallback classifier
> over-matched on words like *broke* and *the problem*. **Hand-pick roughly 20.**
> The classifier's job here is to produce a candidate list, not the room.

Good news: **`scar` is only 7% sensitive and `lesson` is 0%** — the most narrative
material is also the safest. The gate bites hardest on `security` (31%) and
`decision` (21%), neither of which this room needs.

Known candidates already written up:

- **PayFast signature** — sorted keys alphabetically; PayFast verifies by POST
  insertion order. (`lib/payfast/index.ts`, fixed 2026-03-09)
- **React #425 / #422 hydration** — a recurring class on this site, not a one-off.
- **The silent corpus loss** — `forge-ingest.mjs` itself dropped a whole 51 KB
  journal to one TLS timeout and wrote a smaller corpus without complaint. Fixed
  with retries + refuse-to-write. *The tool that builds this room needed this room.*

Each entry: **what broke · how it was found · the actual cause · the fix · what it
cost.** No moral at the end. The absence of a lesson is the point — some nights are
just expensive.

### 5.6 Phase B rooms (need the pulse bridge)

- **`/forge/bench`** — live vitals. 9 monitored apps, 4,437 health checks, 116
  deployments, AI spend.
- **`/forge/commits`** — ⚠️ **correction to an earlier estimate:** the prose yields
  only **44 SHAs**, far too thin for a wall. This room needs
  `engineering_commits` (1,384) + `git_translations` (32) from JarvisOS. **Phase B,
  not Phase A.**
- **`/forge/dojo`** — 74 drills.

---

## 6. The bridge (Phase B prerequisite)

See the `supabase-merge-question` decision. Short version: **do not merge the
databases.** CreativelyNanda ships an anon key to every browser; JarvisOS holds
`therapy_sessions`, `cycle_logs`, `owner_salary`, `pay_slips`, `clients`.

Instead: **JarvisOS pushes a snapshot into a `site_engineering_pulse` table that
CreativelyNanda owns**, on a cron. Private → public, push not pull. The website
never holds a JarvisOS credential, so a compromise here reveals nothing there.

Nothing in Phase A depends on this.

---

## 7. Phases

**Phase A — no database, content already written**
1. Nav restructure (+ solve the 4th-dropdown crowding)
2. `/forge` threshold
3. `/forge/origins`
4. `/forge/floor` + `[app]`
5. `/forge/nights`
6. Curation pass → `/forge/scars`

**Phase B — after the bridge**
7. `/forge/bench` · `/forge/commits` · `/forge/dojo`

---

## 8. SEO

- `/engineer` keeps its URL and canonical. No redirect, ever.
- New routes are additive — nothing existing moves, so no 301s are needed.
- Each room gets `createMetadata` + JSON-LD from `lib/seo.tsx`. Origins and Floor
  pages are `TechArticle`; the wing root is `CollectionPage`.
- The business routes stay redirected to mirembemuse (`next.config.js`). The Forge
  must not resurrect `/projects` or `/ai-engineer` — different job, different site.

---

## 9. Open questions

1. ~~**Curation** — does Nanda clear the 166 herself?~~ **Closed 2026-08-08.** The §4
   default-deny stands; she reviews a shortlist. `project-docs/forge-curation-shortlist.md`
   is generated and waiting.
2. **Sankofa Sessions** — journal it, or leave it off the floor?
3. ~~**Nav crowding**~~ **Closed.** Gallery · Writing · Contact folded into a
   **Studio** group alongside Marketplace and Testimonials, so the bar carries five
   groups and no loose links — fewer top-level items than before the Forge existed.
4. **The Bench without the bridge** — static numbers, or omit the room until it
   can be honest? *(Recommended: omit. A stale "live" panel is a lie with a pulse.)*
5. **New, needs a decision — the probe now over-drops.** After the credential
   incident (§4.8) the vocabulary probe became underscore-safe, and `sensitive`
   went **166 → 295**. Because §4.2 drops `sensitive === true` *wholesale*, 129
   sections moved from "review me" to "never seen by a human" — including
   narrative prose whose only sin is the word *token*. Eligible fell 747 → 647
   and scar candidates 15 → 12.

   Fail-closed is the right default and it stands until Nanda says otherwise, but
   the two signals should probably separate: **credential SHAPE → hard drop, no
   review** (already true, and correct); **vocabulary → route to review** rather
   than auto-drop. That recovers the over-dropped sections without weakening
   anything real.

6. **The Scar Room is smaller than 20.** Scoring the whole eligible corpus for
   cause-explaining prose yields **15 candidates**, not the 91-strong Tier-1 queue the
   word-floor suggested. After Nanda's cuts the room realistically ships **10–13
   corpus entries**, and should be topped up with the hand-written scars this spec
   already names (PayFast signature, React #425 hydration, the silent corpus loss),
   which are the three best and are in no journal. **Do not pad it to hit twenty.**

---

## 10. The credential incident — 2026-08-08

GitHub push protection rejected the first Forge commit. `forge-corpus.json`
carried a live **Supabase Personal Access Token**, ingested verbatim from BB
MotherShip's build journal. The ingest had scored that section
`sensitive: false`.

A second credential — an assigned secret in a JarvisOS section — was found by the
follow-up sweep. **GitHub never flagged that one.** One automated gate caught one
of two.

### Two independent failures

1. **The probe matched vocabulary, not artefacts.** It looked for the words
   people write *around* secrets (`api_key`, `secret`, `token`). A journal that
   pastes a key without narrating it reads as clean prose.
2. **`\btoken\b` does not match `ACCESS_TOKEN`.** Underscore is a word character,
   so there is no boundary before `TOKEN` — and `NAME_TOKEN=value` is precisely
   how a build journal records a credential. The same hole existed for
   `\bsecret\b`, `\bpassword\b` and `\bpassphrase\b`.

### The fix

`scripts/lib/redact-credentials.mjs`, shared by ingest and curate so the two can
never drift:

- **Credential shapes are redacted at ingest**, before any other field is
  derived, and force `sensitive: true`. There is no review path for a raw key —
  a human approving one is a mistake, not a decision.
- The vocabulary probe is now underscore-safe.
- The ingest **reports every redaction loudly** and states that the source
  journal still holds the raw value.

### The part code cannot fix

**The corpus is clean. The source journals are not.** Both credentials are still
in their originating repositories' history. Redacting the derivative does nothing
about the original — **rotate at the provider.**

> The lesson generalises past this repo: a probe that looks for the words people
> use around secrets will always lose to a paste. Match the artefact. And note
> which gate actually caught it — the pattern sweep found both; GitHub found one;
> the hand-written probe found neither.
