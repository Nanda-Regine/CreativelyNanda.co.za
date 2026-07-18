# 🌹 The House of Roses — Creatively Nanda Build Spec

> The plan to turn `creativelynanda.co.za` from a portfolio-with-a-shop into an
> **immersive creative studio you wander** — a custom-built Wattpad × Tumblr for
> Nanda's writing, with unique review systems, writing games, immersive reading,
> and beautiful commerce around the craft.
>
> **Author:** drafted with Claude (Opus 4.8) · **Status:** spec, ready to build ticket-by-ticket
> **Repo:** `nanda-portfolio` (Next.js 14 App Router · Supabase · Upstash · OpenAI · Resend · PayFast)

---

## 0. The one idea

You don't *visit* Creatively Nanda. You **enter a house**. Each section you asked for
becomes a **room**; the whole estate is lush, hand-illustrated, alive — and it **changes
with the time of day, the season, and the moon**. The unifying mechanic:

> **Every poem ends on a doorway word that opens the next room.**
> "…crowned." → opens **The Crown** (the hair journey → Sanyu). That's how the House is stitched: reading is *wayfinding*.

This is an evolution of *Inside Her Roses* — we promote "rooms" from one feature to the
**site's entire architecture**.

---

## 1. The Map of the House → your real routes

We **reuse** what exists. Nothing below is greenfield unless marked 🆕.

| Room | What it is | Maps to existing | Work |
|---|---|---|---|
| 🚪 **The Atrium** | Arrival; "reader / writer / curious / build-with-me?" — the house responds | `app/page.tsx` | rebuild hero into a path-chooser |
| 📖 **The Library** | All writing, read like Wattpad (serialized, followable) | `app/blog` (The Current), `lib/poems-data.ts`, `components/ui/PoemCard.tsx` | unify poems + prose into one shelf |
| 🌙 **The Reading Rooms** | Immersive single-piece reading (the flagship) | `components/poetry/RoseCard.tsx`, `components/poetry/PoemAudio.tsx`, `lib/moods-atmosphere.ts` | 🆕 `app/library/[slug]/room` |
| 🌸 **The Salon** | Unique reviews: **petals**, **feelings**, **marginalia** | `poem_roses` (migration 003), `ReaderReviews.tsx`, `send-poem-bloomed.ts` | evolve reviews → 3 mechanics |
| 🖋️ **The Playground** | Writing games: blackout, Rose Prompt, renga, sprints | `lib/data/prompts.ts`, `app/admin/guest-poems` | 🆕 games + submissions |
| 🪡 **The Atelier** | The shop — journals, prints, digital | `app/products`, `app/checkout`, `lib/products.ts`, `api/downloads/[token]` | add **Journal Builder** |
| 🌿 **The Roots** | Ugandan–Xhosa lineage, memoir | `lib/data/lineage.ts` (already!), `app/about` | build the immersive room |
| ⚙️ **The Forge** | The poet who codes; build-in-public | `app/ai-engineer`, `app/projects`, `public/build-journeys/*` | reframe as a room |
| 👑 **The Crown** | Hair journey → how Sanyu was born | `app/sanyu` (already!) | narrative + bridge to shop |
| 💐 **The Guest Garden** | Community, fans, guest writers, belonging | `app/admin/guest-poems`, guest-poems actions | public submission + curation |

---

## 2. The Mirembe split, the 370 users & SEO (do this FIRST — it's foundational)

CN was creative **+** agency. Mirembe now lives at `mirembemuse.co.za`. We keep every
ounce of domain authority and the existing GA4 history, and route agency intent away.

**2.1 — 301 redirect the agency-intent routes → Mirembe.** These already exist in CN:
```
app/mirembe      → 301 https://mirembemuse.co.za
app/consulting   → 301 https://mirembemuse.co.za/services
app/upgrades     → 301 https://mirembemuse.co.za/pricing   (confirm mapping)
```
Add to `next.config.js` `redirects()` (permanent: true). Link equity + agency leads flow to the right house. **Do not delete** — redirect.

**2.2 — Keep the GA4 property.** Same property = the ~370 users + history stay. We only
**add events** (see §4.9). Continuity, not reset.

**2.3 — Preserve every creative URL.** 301 old creative paths to new room paths so no
indexed link 404s:
```
/poetry/:slug  → /library/:slug         (+ ?room=1 for the immersive open)
/blog          → /library?shelf=prose
/about         → /roots
```
Keep `next-sitemap` output fresh; resubmit sitemap in Search Console after launch.

**2.4 — The relaunch IS your Month-1 "Reveal."** Email the list + those 370 via Resend:
*"Creatively Nanda is becoming a place."* Turn migration into a launch.

**2.5 — One bridge, not a merger.** CN feeds Mirembe through a **single** funnel: The Forge
→ "want me to build for you?" → Mirembe. Creatives stay; founders click through.

---

## 3. 🌙 FLAGSHIP — The Immersive Reading Room

> Build this first. It's the "whoa." A working prototype exists (Claude artifact) — this is
> how it becomes real, reusing your `poem_roses`, `moods-atmosphere`, and `PoemAudio`.

### 3.1 Route & shell
```
app/library/[slug]/room/page.tsx     # the immersive experience (server component fetches poem)
app/library/[slug]/page.tsx          # "read plain" canonical (SEO-indexed; full text in DOM)
```
- The **plain page is the SEO surface** (full poem text server-rendered, JSON-LD `CreativeWork`).
- The **room** is a client experience layered on top. Always offer "read plain" + honor
  `prefers-reduced-motion` (instant reveal, static petals).

### 3.2 Data model — extend the poem record
Add a migration `022_reading_rooms.sql`. If poems are file-based in `lib/poems-data.ts`,
mirror these as fields there; if DB-backed (admin/poetry), add columns.
```sql
alter table poems add column if not exists room_theme   jsonb;   -- { ground, accent, blush, vignette }
alter table poems add column if not exists tempo_ms      int default 760;  -- breath between lines
alter table poems add column if not exists ambient       text default 'petals'; -- petals | ink | light | none
alter table poems add column if not exists voice_url     text;    -- ElevenLabs / recorded recitation
alter table poems add column if not exists annotations   jsonb default '[]'; -- [{ line_index, quote, story }]
alter table poems add column if not exists doorway_room  text;    -- 'crown' | 'roots' | 'forge' ...
alter table poems add column if not exists doorway_word  text;    -- the last word that links onward
alter table poems add column if not exists mood          text;    -- longing|softness|defiance|hope|grief (default aura)
```
`room_theme` derives sensibly from `lib/moods-atmosphere.ts` when null — one source of truth for palettes.

### 3.3 Component breakdown
```
components/room/ReadingRoom.tsx      # orchestrator (client)
components/room/LineReveal.tsx       # paced line-by-line reveal engine
components/room/AmbientCanvas.tsx    # petals/ink/light — Canvas (no deps) or Rive
components/room/DepthToggle.tsx      # Plain · Room · Annotated
components/room/Marginalia.tsx       # tap a line → the story behind it (uses annotations[])
components/room/VoicePlayer.tsx      # wraps existing PoemAudio.tsx; voice_url
components/room/PetalEnding.tsx      # leave a petal (poem_roses) + tag a feeling
```

### 3.4 The reveal engine
- Lines split on newline; each revealed after `i * tempo_ms + lead`.
- Tempo is the poem's **breath** — short lines faster, stanza breaks add a beat. Store per-poem `tempo_ms`; optionally scale by line length.
- `prefers-reduced-motion` → reveal all at once, no drift.

### 3.5 Depth modes
- **Plain** — pure typography, everything visible, no motion. (Same DOM as SEO page.)
- **Room** — paced reveal + ambient + optional voice. The default "enter."
- **Annotated** — annotated lines get a ✦; tap → `Marginalia` slides in with `{quote, story}`.
  This is your **director's commentary** — where the poet meets the engineer (the making-of).

### 3.6 The ending → seeds The Salon
On completion: `PetalEnding` shows **Leave a petal** (writes to `poem_roses`, fires
`send-poem-bloomed` at milestones), then **"How did it leave you?"** feeling tags → writes the
reader's mood, which grows the poem's **aura** (see §4). Then the **doorway**: "the last word was
*crowned* — enter **The Crown** →".

### 3.7 Accessibility & perf
- Full text in server DOM (room hydrates over it) → SEO + screen-reader safe.
- Canvas caps at ~26 particles; pause when tab hidden (`visibilitychange`).
- Keyboard: `→`/space advance, `Esc` to plain, focus-visible rings.

---

## 4. 🌸 The Salon — three review mechanics (not stars)

You already have `poem_roses` + reviews. We shape them into something no one else has.

**4.1 Petals** (evolve `poem_roses`) — a reader leaves a petal; the poem **visibly blooms**
(petal count → fuller rose in `RoseCard`). Milestone blooms fire `send-poem-bloomed.ts`.

**4.2 Read by feeling** (use `moods-atmosphere.ts`) — instead of rating quality, readers tag a
**feeling**. Each poem accrues an **emotional aura** (a color/weight). New table:
```sql
create table poem_feelings ( poem_slug text, feeling text, count int default 0, primary key(poem_slug, feeling) );
```
Then the Library gets **"browse by feeling"** — wander shelves by *longing*, *defiance*, *softness*.

**4.3 Marginalia** 🆕 — line-anchored whispers (like Genius/Medium highlights). Public ones
become collective art; the most-whispered line **glows**.
```sql
create table poem_marginalia ( id uuid default gen_random_uuid() primary key,
  poem_slug text, line_index int, body text, author text, visibility text default 'public',
  created_at timestamptz default now(), deleted_at timestamptz );
```

---

## 5. The other rooms (specs)

**🚪 Atrium** (`app/page.tsx`) — replace the portfolio hero with a **path chooser**: Reader /
Writer / Curious / Build-with-me. Ambient garden reacts to time-of-day + moon. Each path pre-lights the relevant rooms.

**📖 Library** — one shelf, two shelves-in-one (poems + prose/The Current). Filters: **by feeling**,
by collection (*Inside Her Roses*), by "most bloomed," newest. `PoemCard`/`RoseCard` show bloom state.
Wattpad soul: **follow**, **reading progress** (store in Supabase per your no-localStorage rule), **serialized drops**.

**🌿 Roots** (`lib/data/lineage.ts` + `app/about` → `/roots`) — immersive lineage: Ugandan–Xhosa
heritage, the Nseenene lineage, the monthly memoir. Scrollytelling with a family/heritage timeline;
optional Mapbox "where we come from."

**⚙️ Forge** (`app/ai-engineer` + `app/projects` + `public/build-journeys/*` → `/forge`) — the poet who
codes. Live-ish build-in-public feed, the 8 apps, "first line of code June 2025." **The single Mirembe
bridge lives here.** Embed ray.so snippets; pull GitHub activity (see §6).

**👑 Crown** (`app/sanyu` → `/crown`) — the hair journey → how **Sanyu** was born. Before/after,
the ritual, the origin. CTA bridges to `sanyubotanicals.co.za`. This is the poem-doorway target for "Grown."

**💐 Guest Garden** (`app/admin/guest-poems` public side) — readers submit poems/echoes; you curate;
featured pieces bloom in a communal bed. Reader-of-the-month. Belonging = retention.

**🖋️ Playground** — see §7.

**🪡 Atelier** — see §8.

---

## 6. 🧠 Genius engineering & the cool APIs

This is where CN becomes unforgettable. Priorities marked ⭐ = highest wow-per-effort.

### 6.1 ⭐ Voice — ElevenLabs recitation pipeline
`PoemAudio.tsx` already exists — feed it. **Inngest/route job:** on poem publish → ElevenLabs TTS
(your cloned voice) → store `voice_url` in Supabase Storage → the Room's `VoicePlayer` plays *you*
reading. Bonus: **multilingual** (isiXhosa / Luganda) via ElevenLabs multilingual — ties The Roots.
*Env:* `ELEVENLABS_API_KEY`, `ELEVENLABS_VOICE_ID`.

### 6.2 ⭐ Semantic mood search — Upstash Vector
You have Upstash Redis; **add Upstash Vector**. Embed every poem (OpenAI `text-embedding-3-small`).
Then: **"I feel like ___" → open the right poem**, and **"poems like this one."** The "browse by
feeling" becomes true semantic wander, not tag-matching.
*Env:* `UPSTASH_VECTOR_REST_URL`, `UPSTASH_VECTOR_REST_TOKEN`.

### 6.3 ⭐ "Talk to the Poet" — RAG over the corpus
Upgrade `app/api/chat` (currently OpenAI) into a **RAG** over Nanda's body of work (poems, blog,
lineage, memoir). Readers converse with the *work*. (JarvisOS already ingested `nanda_corpus` — reuse
that soul namespace, or embed CN content into Upstash Vector.) Rate-limit via the Upstash Ratelimit you already have.

### 6.4 ⭐ Dynamic share cards — Satori / `@vercel/og`
Auto-generate a **beautiful share image** for any poem, any blackout creation, any "petal left."
Native to Next, zero external calls. This is your **viral engine** — every share is branded art.
Pair with the **Web Share API** on mobile.

### 6.5 Room-to-room nav — View Transitions API
Native cross-document/route transitions so wandering the House *feels* continuous — petals carry
between rooms. Progressive-enhanced; falls back cleanly.

### 6.6 Hand-illustrated interactivity — Rive (or Lottie)
For the "artsy, alive" florals that *respond* (garden reacts to scroll/hover/moon), **Rive** beats
CSS. Lottie (from After Effects) for simpler animated illustrations. Keeps the storybook feel without
hand-authoring SVG paths. Bundle locally (CSP-safe).

### 6.7 Generative soundscapes — Web Audio API
Per-poem ambient drone generated from `mood` (no audio files, no CDN): longing = minor drone,
hope = open fifths. Muted by default (autoplay policy); one clear control. Tone.js optional (bundle it).

### 6.8 The living garden — Canvas/WebGL + moon phase
Ambient petals ship on Canvas (in the prototype). For the Atrium's living garden, a light **WebGL
shader** that shifts with **time of day + moon phase**. Reuse JarvisOS `astro.ts getMoonPhase()` logic
(port it in) — the House literally waxes and wanes. *(Note the JarvisOS memory: getMoonPhase is the
single source of truth; don't hand-roll a new-moon window.)*

### 6.9 Serialized drops — Firebase push (already in repo!)
`lib/firebase-messaging.ts` exists. Use it: "**The next room unlocks Friday**," new-poem alerts,
Rose Society early reads. Wattpad's serialized hook, native.

### 6.10 Multilingual poems — i18n (already in repo!)
`lib/i18n/*` is wired. Offer key poems in English / isiXhosa / Luganda — heritage as feature, and
broader diaspora reach.

### 6.11 PWA offline reading — next-pwa (already in repo!)
Cache the Library so readers keep reading through load-shedding / on the plane. Offline = accessibility + retention.

---

## 7. 🖋️ The Playground — writing games

- **⭐ Blackout / erasure poetry** — render one of your prose pieces; reader taps words to black
  out → what remains is *their* poem. Export via Satori (§6.4) → share → **"make it a journal page"**
  (funnels to §8). Reading becomes making. Store creations in `guest_poems` (exists) with `type='blackout'`.
- **The Rose Prompt** — daily/weekly prompt (`lib/data/prompts.ts` exists); submissions form a
  communal garden; best surface to the Guest Garden.
- **Renga** — collaborative chained poem; community writes with you; you curate the chain.
- **Word Vault sprints** — timed constrained writing (mirror JarvisOS Sanctuary Word Vault);
  streaks + a **personal garden that blooms** as you write (public XP — reuse The Becoming pattern).

---

## 8. 🪡 The Atelier + the Journal Builder (revenue)

**8.1 ⭐ The Journal Builder** (hero product). A configurator:
1. **Cover** — pick your art, or **generate** one (Leonardo/Replicate/SDXL by prompt).
2. **Path** — Poet's journal · Healing journal · Novelist's bible · Shadow work · Gratitude.
3. **Prompts** — choose which of your prompts (`lib/data/prompts.ts`) seed the interior.
4. **Preview** → order.

**Fulfilment — print-on-demand APIs (global, this is the diaspora unlock):**
- **Lulu Direct / Lulu API** — real books & journals, ships worldwide, wholesale POD. Best fit for actual journals.
- **Gelato API** — global POD (journals, prints) with local production (low shipping, fast).
- **Printful / Printify** — prints, merch, some notebooks.
Deliver a **digital twin** (Notion template or PDF) via your existing `api/downloads/[token]`.

**8.2 Other products** — poetry **prints** (line-of-the-day as art, Satori/Leonardo backgrounds),
**Inside Her Roses** special editions, **commissioned poems** (weddings/gifts/healing — a brief form
→ you write → shareable blooming link), **Notion systems** (Writer's Sanctuary R299 etc. — already sold).

**8.3 ⭐ Global payments — the strategic gap.** PayFast (`lib/payfast`) is **SA-only**. For worldwide
journal/print/membership sales you need one of:
- **Lemon Squeezy** or **Paddle** — *merchant of record*: they handle global VAT/sales-tax for you.
  Ideal for a solo creator selling **digital** goods (journal digital twins, Notion systems, memberships) worldwide.
- **Stripe** — for physical/POD + subscriptions where you handle tax.
Recommendation: **keep PayFast for SA**, **add Lemon Squeezy for global digital + memberships**, **Stripe** if/when physical POD scales. Route by buyer geo.

---

## 9. 👑 The Rose Society — membership (recurring revenue + belonging)

Tiers echo Sanyu's Angel world for brand cohesion:
- **Seed** (free) — read, leave petals, join the Guest Garden.
- **Bloom** (paid) — early reads, voice versions, monthly **journal-prompt pack**, the writing games, shop discount.
- **Royal** (top) — everything + workshops, a signed edition, commissioned-poem credit.

Billing via Lemon Squeezy (global) / PayFast (SA). Gate content by tier (Supabase RLS + a
`memberships` table). Push drops via Firebase (§6.9). This is the compounding money layer.

---

## 10. Data model additions (summary)
```sql
-- reading rooms
alter table poems add column room_theme jsonb, add column tempo_ms int default 760,
  add column ambient text default 'petals', add column voice_url text,
  add column annotations jsonb default '[]', add column doorway_room text,
  add column doorway_word text, add column mood text;
-- salon
create table poem_feelings ( poem_slug text, feeling text, count int default 0, primary key(poem_slug,feeling) );
create table poem_marginalia ( id uuid primary key default gen_random_uuid(), poem_slug text,
  line_index int, body text, author text, visibility text default 'public',
  created_at timestamptz default now(), deleted_at timestamptz );
-- reading + community
create table reading_progress ( user_ref text, poem_slug text, position int, updated_at timestamptz default now(), primary key(user_ref,poem_slug) );
-- membership
create table memberships ( user_ref text primary key, tier text default 'seed', renews_at timestamptz, provider text, deleted_at timestamptz );
```
Guardrails (match existing `CLAUDE.md`): soft-delete only (`deleted_at`), UTC timestamps, **no
localStorage for data** (reading progress → Supabase), sanitise all user text before AI, POPIA consent on submissions.

---

## 11. Environment variables to add
```
ELEVENLABS_API_KEY=            # voice recitation
ELEVENLABS_VOICE_ID=           # your cloned voice
UPSTASH_VECTOR_REST_URL=       # semantic mood search + RAG
UPSTASH_VECTOR_REST_TOKEN=
LEONARDO_API_KEY=              # journal cover generation (or REPLICATE_API_TOKEN)
LULU_CLIENT_KEY= LULU_CLIENT_SECRET=   # journal POD  (or GELATO_API_KEY)
LEMONSQUEEZY_API_KEY= LEMONSQUEEZY_STORE_ID= LEMONSQUEEZY_WEBHOOK_SECRET=  # global checkout
# existing: SUPABASE_*, UPSTASH_REDIS_*, OPENAI_API_KEY, RESEND_API_KEY, PAYFAST_*, FIREBASE_*
```

---

## 12. Build order (tickets)

### Phase 1 — The Reading Room + the split (the foundation & the wow)
1. `next.config.js` redirects: agency routes → Mirembe; old creative URLs → new rooms (§2).
2. GA4: keep property; add events `room_enter, depth_selected, poem_completed, petal_left, feeling_tagged, voice_played` (§4.9).
3. Migration `022_reading_rooms.sql` + backfill `room_theme` from `moods-atmosphere.ts`.
4. Build `components/room/*` + `app/library/[slug]/room` + plain SEO page (§3).
5. Salon P1: petals (evolve `poem_roses`) + feelings (`poem_feelings`) on the ending (§4.1–4.2).
6. Relaunch email to the 370 + list via Resend (§2.4).

### Phase 2 — The House takes shape
7. Atrium path-chooser + living garden (Canvas + moon) (§5).
8. Roots, Forge (with the single Mirembe bridge), Crown rooms (§5).
9. Library "browse by feeling" + follow + serialized drops (Firebase) (§5, §6.9).
10. Marginalia (§4.3). View Transitions between rooms (§6.5).

### Phase 3 — Voice, intelligence, play
11. ElevenLabs voice pipeline (§6.1). Upstash Vector semantic search (§6.2). RAG "talk to the poet" (§6.3).
12. Playground: blackout poetry + Satori share cards (§6.4, §7). Rose Prompt + Guest Garden public.
13. Rose Society membership + Lemon Squeezy global checkout (§8.3, §9).

### Phase 4 — The Atelier
14. Journal Builder + POD (Lulu/Gelato) + digital twin delivery (§8).
15. Prints, commissioned poems, special editions. Generative soundscapes (§6.7). Rive florals (§6.6).

---

## 13. Definition of done (the feeling)
A stranger lands on a poem, taps **"Enter the room,"** watches your words arrive in their own
breath while petals drift, hears **you** read it, taps a line to learn it was about your
grandmother, leaves a petal, tags it *longing* — and is gently handed to **The Crown**, where they
learn how a hair ritual became Sanyu… and three rooms later they're building their own journal, or
booking you to build their app. **One founder, one house, every door open.**

---
*Ship it. Build from here.* 🌹
