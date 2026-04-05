# AfriFlix — Build Journal & Technical Documentation

> A living document chronicling the full build journey: every decision, every upgrade, every collaboration between Nanda Regine and Claude.

---

## Table of Contents

1. [Vision & Mission](#vision--mission)
2. [Collaborators](#collaborators)
3. [Phase 1 — The Foundation](#phase-1--the-foundation)
4. [Phase 2 — The Full Platform Build](#phase-2--the-full-platform-build)
   - [Architecture Decisions](#architecture-decisions)
   - [Design System](#design-system)
   - [File Map](#file-map)
   - [AI Features Built](#ai-features-built)
   - [Database Schema](#database-schema)
   - [Fixes & TypeScript Hardening](#fixes--typescript-hardening)
5. [Phase 3 — Optimisation & Scale](#phase-3--optimisation--scale)
   - [Upgrade Strategy](#upgrade-strategy)
   - [Community Layer](#community-layer)
   - [AI Agent Architecture](#ai-agent-architecture)
6. [Africa at Scale — Engineering Considerations](#africa-at-scale--engineering-considerations)
7. [Update Log](#update-log)

---

## Vision & Mission

**AfriFlix** is a pan-African creative content platform — a space where African filmmakers, musicians, poets, writers, and storytellers distribute their work, build audiences, and earn. Not a clone of anything Western. Built from the ground up for the continent: its connectivity realities, its 2,000+ languages, its crew-based creative culture, and its mobile-first majority.

**Core belief:** African creative content deserves its own infrastructure.

**Target:** Every country on the African continent. 1.4B people. 54 nations. Thousands of languages. One platform.

---

## Collaborators

| Role | Name |
|---|---|
| Founder & Product Vision | Nanda Regine |
| AI Engineering Partner | Claude (Anthropic — `claude-sonnet-4-6`) |

This is not a conventional client/developer relationship. Claude functions as an embedded technical co-founder — architecting systems, writing production code, identifying failure modes, challenging assumptions, and pushing the product forward alongside Nanda.

---

## Phase 1 — The Foundation

**Status:** Complete. Superseded by Phase 2.

**What existed:**
- Static HTML/CSS/JS site (`index.html`, `app.js`, `general.css`, `header.css`, `main.css`, `chat.css`)
- Basic landing page for AfriFlix concept
- No database, no auth, no dynamic content
- `AFRIFLIX_MASTER_PROMPT.md` — the product specification document that seeded Phase 2

**Phase 1 files deleted on:** 2026-03-18 (superseded by the Next.js app)

---

## Phase 2 — The Full Platform Build

**Started:** 2026-03-18
**Status:** Production-ready foundation. Upgrades ongoing.

**Stack:**
```
Framework:    Next.js 16.1.7 (App Router, Turbopack)
Language:     TypeScript (strict mode)
Styling:      Tailwind CSS with custom design tokens
Database:     Supabase (Postgres + RLS + Realtime + Auth)
AI:           Anthropic Claude claude-sonnet-4-6 via @anthropic-ai/sdk
State:        Zustand with persist middleware
Video:        Cloudflare Stream (wiring in progress)
Storage:      Cloudflare R2 (images, audio)
Payments:     PayFast / Flutterwave / Stripe
PWA:          Web Share Target, Media Session API
Deployment:   Vercel (target)
```

---

### Architecture Decisions

**Why Next.js App Router over Pages Router?**
Server Components allow data fetching at the component level without prop drilling. For a content platform where most pages are read-heavy (browsing, watching, reading), server rendering with selective client islands is optimal. The audio player and video player are client islands; everything around them is server-rendered.

**Why Supabase?**
- Postgres-native with Row Level Security — no separate permissions layer needed
- Built-in auth handles email/password + magic link out of the box
- Realtime subscriptions ready for live features (comments, activity feed)
- African startup economics: generous free tier, predictable pricing as we scale

**Why Zustand over Redux or Context?**
The audio player must persist across navigation without remounting. Zustand's `persist` middleware handles this cleanly with `localStorage`. Redux would be overkill; Context re-renders the entire tree on every state change — catastrophic for a media player.

**Why a custom video player over react-player or Video.js?**
Control. AfriFlix branding in the player, keyboard shortcuts that feel native, fullscreen that works with the container (not the viewport), and the ability to swap the underlying source to Cloudflare Stream's HLS without rewriting the UI.

**Why Claude claude-sonnet-4-6 specifically?**
Best balance of reasoning quality, speed, and cost for production AI features. The model understands African cultural context better than alternatives, which matters when generating descriptions and recommendations for African creative content.

---

### Design System

The entire UI is built on four base colours — chosen to feel African without being a cliché:

```
--black:  #0A0A0A   (near-black backgrounds)
--gold:   #C9A84C   (primary accent — warmth, value, Africa)
--terra:  #C4622D   (secondary accent — earth, energy)
--ivory:  #F2ECD9   (text — warm white, not harsh)
```

**Supporting tokens:**
```
--black-card:   #111111   (card backgrounds)
--black-mid:    #161616   (elevated surfaces)
--black-hover:  #1A1A1A   (hover states)
--ivory-mid:    #C8BFA8   (secondary text)
--ivory-dim:    #8A8070   (tertiary text / metadata)
--gold-light:   #DDB96A   (gold hover state)
--terra-light:  #D4724D   (terra hover state)
```

**Typography:**
- **Syne** — Display / headings. Geometric, modern, distinct.
- **Libre Baskerville** — Long-form reading. Serif warmth for poetry and writing.
- **DM Mono** — Data, metadata, timestamps, counts. Keeps UI readable.

**Tailwind custom utilities:**
- `kente-bg` — Subtle kente-inspired geometric pattern overlay
- `bg-shimmer-gradient` — Loading skeleton shimmer animation
- `shadow-gold` — Gold glow for featured content
- `rounded-pill` — Full pill radius for buttons
- `font-syne`, `font-serif`, `font-mono` — Font class aliases

---

### File Map

```
afriflix-v2/
├── proxy.ts                          Auth-guarded routing (Next.js 16 proxy)
├── middleware → proxy migration      Renamed for Next.js 16 convention
│
├── types/
│   └── index.ts                      All TS interfaces: Creator, Work, Series,
│                                     Album, TasteProfile, Collab, Tip + more
│
├── lib/
│   ├── claude.ts                     Anthropic client, rate limiter, safeParseJSON
│   ├── utils.ts                      cn, formatDuration, formatCount, formatCurrency,
│   │                                 timeAgo, categoryToSlug, getPlayerType, etc.
│   └── supabase/
│       ├── client.ts                 Browser Supabase client
│       └── server.ts                 Server + service role clients
│
├── store/
│   ├── audio-player.ts               Full Zustand audio store with persist
│   └── auth.ts                       User/creator/tasteProfile state
│
├── components/
│   ├── ui/
│   │   ├── button.tsx                Variants: gold, terra, ghost, outline, dark
│   │   ├── badge.tsx                 Variants: gold, terra, dark, trophy
│   │   ├── input.tsx                 With label, error, hint
│   │   ├── textarea.tsx              With label, error
│   │   └── shimmer.tsx               Skeleton loaders: WorkCard, CreatorCard
│   ├── layout/
│   │   ├── providers.tsx             Auth listener, creator fetch, MiniPlayer mount
│   │   ├── header.tsx                Fixed header, search, mobile drawer
│   │   └── footer.tsx                Links, copyright
│   ├── cards/
│   │   ├── work-card.tsx             Hover AI description, audio player trigger
│   │   ├── browse-row.tsx            Horizontal scroll row with arrows
│   │   ├── creator-card.tsx          Avatar, stats, categories
│   │   └── collab-card.tsx           Type, compensation, skills, deadline
│   ├── players/
│   │   ├── film-player.tsx           Custom video: keyboard shortcuts, fullscreen
│   │   ├── mini-player.tsx           Persistent audio bar + expanded view
│   │   └── writing-reader.tsx        Dark/sepia/light theme, font controls
│   └── ai/
│       ├── mood-recommender.tsx      6 mood pills → Claude → styled results
│       ├── chat-assistant.tsx        Floating AI chat (discovery mode)
│       └── creator-assistant.tsx     Dashboard AI chat (creator mode)
│
├── app/
│   ├── globals.css                   Google Fonts, animations, scrollbar
│   ├── layout.tsx                    Root layout with OG metadata + PWA
│   ├── page.tsx                      Landing: hero, browse rows, moods, CTA
│   ├── (auth)/
│   │   ├── login/page.tsx            Password + magic link tabs
│   │   └── signup/page.tsx           2-step: credentials → account type
│   ├── onboarding/page.tsx           5-question taste quiz → Claude profile
│   ├── explore/page.tsx              Category + mood filters, rising creators
│   ├── search/page.tsx               Full-text search across works + creators
│   ├── category/[slug]/page.tsx      Featured/trending/recent per category
│   ├── work/[id]/page.tsx            Video/audio/writing player + creator sidebar
│   ├── creator/[username]/page.tsx   Profile: banner, bio, works by category
│   ├── series/[id]/
│   │   ├── page.tsx                  Series hero, episode count, runtime
│   │   └── episode-list.tsx          Season grouping, inline player, play bars
│   ├── album/[id]/
│   │   ├── page.tsx                  Album header: cover art, type, duration
│   │   └── track-list.tsx            Play all/shuffle, Zustand integration
│   ├── collabs/
│   │   ├── page.tsx                  Collab listings with type filter
│   │   └── [id]/page.tsx             Detail + apply form
│   ├── dashboard/
│   │   ├── layout.tsx                Sidebar + mobile nav
│   │   ├── page.tsx                  Stats, quick actions, recent works
│   │   ├── upload/page.tsx           6-step upload wizard with AI enrichment
│   │   ├── ai-assistant/page.tsx     Creator Pro AI chat (paywalled)
│   │   ├── analytics/page.tsx        Stats + top works table
│   │   └── earnings/page.tsx         Tips history + plan upgrade cards
│   ├── auth/callback/route.ts        OAuth code exchange
│   └── api/ai/
│       ├── taste-profile/route.ts    Onboarding → Claude → Supabase upsert
│       ├── enrich/route.ts           Upload → Claude → tags + summary
│       ├── discover/route.ts         Mood → Claude → ranked work IDs
│       ├── creator-assistant/route.ts  Dual-mode chat (discovery + creator)
│       └── card-description/route.ts   Hover → Claude → evocative sentence
│
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql    15 tables, 12 indexes, RLS, triggers
│
└── public/
    └── manifest.json                 PWA: Web Share Target on /dashboard/upload
```

---

### AI Features Built

| Feature | Trigger | Claude's Job | Rate Limit |
|---|---|---|---|
| **Taste Profile** | Onboarding quiz | Generate JSON profile from 5 answers | Once per user |
| **Content Enrichment** | Upload step 4 | Generate summary, mood/theme tags, cultural context | 20/min by IP |
| **Mood Discovery** | Mood pill click | Rank works list for current mood + user history | 10/min by user |
| **Card Description** | Work card hover | One evocative sentence about the work | 60/min by IP |
| **Creator Assistant** | Dashboard chat | Two modes: discovery help OR creator growth advice | 30/min (Pro only) |

**Rate limiting architecture (current):**
In-memory Map with sliding window. Works on a single server instance. **Must be replaced with Redis before production** — dies on restart and doesn't work across multiple serverless function instances.

---

### Database Schema

15 tables across the platform:

```sql
creators          — profiles, plan, verification, stats
works             — all content (films, music, poetry, writing, photography)
series            — grouped episode containers
albums            — grouped track containers
tips              — fan-to-creator payments
follows           — creator follow graph
hearts            — content reactions
history           — watch/listen/read history
taste_profiles    — AI-generated user taste data
collabs           — collaboration listings
collab_applications — applications to collab listings
comments          — [PLANNED Phase 3]
activity_feed     — [PLANNED Phase 3]
notifications     — [PLANNED Phase 3]
creator_notes     — [PLANNED Phase 3]
```

**RLS Policies:**
All tables have Row Level Security. Creators can only modify their own rows. Public read access is granted on published content. Tips are private between sender/receiver.

**Triggers (auto-maintained counts):**
- `heart_count` on works — increments/decrements on hearts insert/delete
- `follower_count` on creators — maintained by follows table
- `works_count` on creators — maintained by works table
- `application_count` on collabs — maintained by collab_applications table

---

### Fixes & TypeScript Hardening

All TypeScript errors resolved before the dev server was started:

| File | Issue | Fix Applied |
|---|---|---|
| `film-player.tsx:24` | `useRef<typeof setTimeout>(null)` — null not assignable | Changed to `useRef<ReturnType<typeof setTimeout> \| null>(null)` |
| `episode-list.tsx:19` | Unused `season` variable computed then overridden | Removed dead assignment, kept `seasonKey` directly |
| `earnings/page.tsx` | Local `cn()` duplicating `@/lib/utils` import | Added `cn` to import, deleted local function |
| `discover/route.ts` | `getTasteProfile` with unresolvable nested generic type | Removed unused function entirely |
| `album/[id]/page.tsx:64` | `[...new Set()]` fails at ES2015 target | Changed to `Array.from(new Set(...))` |
| `supabase/server.ts` | `cookiesToSet` implicitly `any` | Added explicit `{ name: string; value: string; options?: Record<string, unknown> }[]` type |
| `middleware.ts` | Same implicit any in cookie callback | Same fix applied |
| `middleware.ts` (whole file) | Next.js 16 deprecated `middleware` file convention | Renamed to `proxy.ts`, export renamed from `middleware` to `proxy` |

**Final `tsc --noEmit` result:** 0 errors.

---

## Phase 3 — Optimisation & Scale

### Upgrade Strategy

Prioritised by impact:

```
Priority  Feature                          Why
────────────────────────────────────────────────────────────────
  1       Cloudflare Stream wiring         Mobile connectivity — Africa is mobile-first
  2       Service Worker / offline cache   3G users need resilience
  3       Comments system                  Community is nothing without conversation
  4       Activity feed                    Retention: "people you follow liked X"
  5       Upstash Redis rate limiting      Replace in-memory — production-safe
  6       pgvector semantic search         Discovery at scale (20M+ works)
  7       Multi-language subtitle agent    2,000+ African languages — huge moat
  8       Creator growth agent             Weekly analytics narrative per creator
  9       Collab matchmaking agent         Proactive match suggestions
  10      Moderation agent                 Content policy enforcement at scale
```

---

### Community Layer

**What's missing vs what real community needs:**

| Gap | Why It Matters for Africa |
|---|---|
| Comments with replies | Content feels one-way without response. Communities form around conversation. |
| Activity feed | "Ama you follow just dropped a track" is the single highest-retention mechanic |
| Creator notes | Short-form updates between content drops — keeps followers warm |
| Listening rooms | Real-time listening together — mirrors how African communities already gather |
| Live events | Premieres, listening parties, live sessions |
| Crew/collective pages | African music/art is crew-based. Solo profiles miss the culture. |
| Cultural calendar | AFCON, Eid, Kwanzaa, local festivals tied to content — relevance engine |
| Fan memberships | Patreon-style inner circles — sustainable creator income beyond tips |
| Challenges | "Write a poem about home this week" — viral, participatory, distinctly African |
| DMs | Collabs happen in conversation, not via application forms |

---

### AI Agent Architecture

**Upgrading from single-shot calls to persistent agents:**

```
Current:  User action → Claude API call → response → done
Future:   Persistent agents with memory, tools, and scheduled runs
```

**Agent 1: Content Intelligence Agent**
```
Trigger:  Every new upload (webhook on works INSERT)
Tools:    Read work metadata, read audio/video transcript, write tags
Output:   ai_summary, mood_tags, theme_tags, cultural_context,
          language detection, content warnings, thumbnail crop suggestion
Value:    Zero-effort enrichment for every creator
```

**Agent 2: Discovery Agent (personalised)**
```
Trigger:  User opens app / requests feed refresh
Tools:    Read user history, read follow graph, read taste profile,
          read trending data, read time/location context
Output:   Ranked personalised feed with reasoning
Value:    Netflix-quality discovery without a 200-person ML team
```

**Agent 3: Creator Growth Agent**
```
Trigger:  Weekly cron per Creator Pro user
Tools:    Read analytics, read follower growth, read engagement rates,
          read comparable creators, write growth report
Output:   Personalised weekly memo: "Your Afrobeats drops perform best
          Tuesday evenings in Lagos — schedule your next one for Tue 8pm WAT"
Value:    Every creator gets a data analyst in their pocket
```

**Agent 4: Collab Matchmaking Agent**
```
Trigger:  New creator joins / new collab posted / weekly batch
Tools:    Read creator profiles, read collab listings, read past collabs,
          read style/genre tags, write match suggestions
Output:   "Ama in Accra makes Afrofusion beats, you make spoken word —
           3 of her works match your themes. Open collab available."
Value:    The LinkedIn of African creative collaboration
```

**Agent 5: Translation / Subtitle Agent**
```
Trigger:  New video/audio upload with no subtitles
Tools:    Transcribe audio, detect language, translate to 6 target languages
          (Swahili, Hausa, Yoruba, Zulu, Amharic, French, Portuguese)
Output:   SRT subtitle files attached to work record
Value:    Pan-African reach — content crosses language borders automatically
          No other platform does this. Massive competitive moat.
```

**Agent 6: Moderation Agent**
```
Trigger:  Every new upload before status = published
Tools:    Analyse content metadata, check against policy rules,
          flag for human review if uncertain
Output:   approve / flag / reject with reasoning
Value:    Safe platform at scale without a large trust & safety team
```

---

## Africa at Scale — Engineering Considerations

### Connectivity Reality
- **65%+ of African users** are on mobile data
- Average connection speeds vary enormously: Johannesburg ≠ rural DRC
- **Strategy:** Adaptive bitrate by default (Cloudflare Stream), `Save-Data` header detection, audio-first fallback for video, aggressive caching

### Latency Strategy
```
Problem:   Single Supabase region adds 200-400ms for users far from it
Solution:
  - Supabase multi-region read replicas (West Africa + East Africa + South Africa)
  - Cloudflare edge caching for public content (works, creator profiles)
  - ISR (Incremental Static Regeneration) on all browse/category pages
  - stale-while-revalidate on API responses
```

### Languages
Africa has **2,000+ languages** across 54 countries. The platform must:
1. Detect content language automatically (AI agent)
2. Serve UI in French for Francophone Africa (18 countries)
3. Serve UI in Portuguese for Lusophone Africa (6 countries)
4. Auto-subtitle content in regional languages (competitive moat)

### Payment Reality
```
Region          Preferred Method      Integration
────────────────────────────────────────────────
South Africa    Card, EFT             PayFast ✓ (in spec)
Nigeria, Ghana  Mobile money, card    Flutterwave ✓ (in spec)
East Africa     M-Pesa                Flutterwave (supports M-Pesa)
Francophone     Orange Money, Wave    Flutterwave
Global          Card                  Stripe ✓ (in spec)
```

### Database at Scale
```
Works table will be the hottest table. Mitigations:
  - Partition by category (category is the most common filter)
  - Materialized views for trending_works (refresh every 15min)
  - pgvector index on ai_embedding for semantic search
  - Read replica for all SELECT queries on browse paths
  - Upstash Redis for: rate limiting, session cache, trending scores
```

---

## Update Log

> Every significant change, upgrade, or decision gets logged here.

---

### 2026-03-18 — Phase 2 Complete + Dev Server Live

**Session summary:**

Nanda and Claude built the entire Phase 2 platform from scratch in a single session — ~55 files, ~4,000 lines of production TypeScript.

**Built:**
- Full Next.js 16 App Router application
- Complete design system (Tailwind + custom tokens)
- Supabase auth + RLS database schema (15 tables)
- 5 AI features powered by Claude claude-sonnet-4-6
- Custom video player, audio mini-player, writing reader
- Creator dashboard (upload, analytics, earnings, AI assistant)
- Series, Album, Collab, and Explore pages
- PWA manifest with Web Share Target

**Fixed before launch:**
- 7 TypeScript errors resolved
- `middleware.ts` → `proxy.ts` migration for Next.js 16

**Cleaned:**
- Deleted Phase 1 static files (index.html, app.js, *.css)

**Dev server:** Running on http://localhost:3000 — Next.js 16.1.7 + Turbopack, 0 compile errors.

**Decided (Phase 3 roadmap):**
- Wire Cloudflare Stream for adaptive bitrate video
- Build comments system
- Build activity feed
- Replace in-memory rate limiting with Upstash Redis
- Build 6 AI agents (content intelligence, discovery, growth, matchmaking, translation, moderation)
- Add crew/collective pages, listening rooms, creator notes, live events
- Multi-region Supabase for continent-wide latency

---

---

### 2026-03-18 — Phase 3 Community Layer + Git History Established

**Session focus:** Optimisation strategy, community layer, AI agent architecture, git setup.

**Built:**

| File | What |
|---|---|
| `supabase/migrations/002_community_layer.sql` | 4 new tables + 4 triggers for community |
| `lib/redis.ts` | Upstash Redis client with in-memory fallback for dev |
| `lib/claude.ts` | Updated — `checkRateLimit` now async, delegates to Redis |
| `app/api/comments/route.ts` | GET/POST/DELETE threaded comments |
| `app/api/hearts/route.ts` | Toggle heart with optimistic response |
| `app/api/follows/route.ts` | Toggle follow, triggers notifications |
| `app/api/activity/route.ts` | Paginated activity feed with cursor |
| `components/community/heart-button.tsx` | Optimistic heart toggle with live count |
| `components/community/follow-button.tsx` | Follow/Unfollow with hover state |
| `components/community/comments.tsx` | Threaded comments with Supabase Realtime |
| `components/community/activity-feed.tsx` | Paginated feed with unread indicators |
| `app/dashboard/feed/page.tsx` | Creator feed dashboard page |
| `app/work/[id]/page.tsx` | Wired HeartButton + FollowButton + Comments |
| `app/dashboard/layout.tsx` | Added "My Feed" nav item |
| `.env.example` | Added Upstash Redis env vars |
| `AFRIFLIX_BUILD_JOURNAL.md` | This document — first entry |

**Git history established:** 11 commits across the full build, logically grouped by layer. Both the `afriflix-v2` app and the root `AfriFlix/` docs repo are now git-tracked.

**Next session targets:**
- Service Worker for offline/low-bandwidth (PWA upgrade)
- Creator Notes feature (short-form posts)
- Notifications bell in header
- Crew/Collective profile pages
- Wire Cloudflare Stream for adaptive video (requires Cloudflare credentials)

*This document is maintained by Claude in collaboration with Nanda Regine.*
*Updated after every meaningful build session.*

---

### 2026-03-21 — Phase 3 Session 2: Landing Page, Live Chat, Analytics, SEO, Security Audit

**Session focus:** Creator-first sales landing page, realtime live chat, visual analytics upgrade, OG image API, pgvector migration, custom 404, JSON-LD, README overhaul, security audit.

**Context:** afriflix-v2 was entirely untracked (embedded .git had to be removed). All code committed this session. Frequent commits adopted as working style.

---

#### What Was Built

| File | What |
|---|---|
| `app/page.tsx` | Full creator-first landing page (10 sections, no placeholders) |
| `app/browse/page.tsx` | Browse experience moved here — logged-in users redirect from `/` |
| `components/live/live-chat.tsx` | Realtime live chat using Supabase Realtime channels |
| `app/live/[id]/page.tsx` | Replaced chat placeholder with `<LiveChat>` component |
| `app/api/og/route.tsx` | Edge OG image API — branded 1200×630 cards for works + creators |
| `app/opengraph-image.tsx` | Next.js default OG image (ImageResponse, no deps) |
| `app/not-found.tsx` | Custom branded 404 — with links to home, browse, pricing |
| `app/layout.tsx` | SoftwareApplication JSON-LD, upgraded metadata, themeColor to gold |
| `app/dashboard/analytics/page.tsx` | Visual analytics — per-work bar charts, category breakdown, engagement % |
| `app/creator/[username]/page.tsx` | OG image now points to `/api/og?type=creator&id={username}` |
| `app/work/[id]/page.tsx` | OG image now points to `/api/og?type=work&id={id}` |
| `supabase/migrations/010_live_chat_semantic_search.sql` | Live chat table + pgvector + `search_works_semantic()` RPC |
| `README.md` | Complete rewrite — badges, feature table, tech stack, getting started, deployment |
| `.gitignore` | Root gitignore added (was missing) |

---

#### Architecture Decisions

**Landing page strategy — creator-first, not viewer-first:**
The first audience for AfriFlix is creators (supply). Without content supply, there's no demand. The home `/` route is now a full sales page targeting African filmmakers, musicians, poets, and storytellers. Logged-in users redirect to `/browse` (the Netflix-style discovery experience).

**10-section structure:**
Hero → Social Proof → Problem → Solution → Features → How It Works → Pricing (3 tiers) → Testimonials → FAQ (`<details>`) → Final CTA.

**Pricing tiers:**
- Free (R0): 3 uploads, basic analytics, 5 AfriBrain uses/month
- Creator Pro (R149/mo): unlimited uploads, 85% rev share, full AI, live streaming 10h/month
- Studio (R499/mo): team accounts, unlimited live, priority support, brand partnerships
Founding creators get 12 months of Creator Pro free.

**Live chat architecture:**
Used Supabase Realtime `postgres_changes` on `live_chat_messages` table (new migration 010). Creator ID set server-side via a `BEFORE INSERT` trigger from `auth.uid()` — clients never send creator_id directly (prevents spoofing).

**pgvector:**
Migration 010 adds `vector(384)` column to works table + `search_works_semantic()` RPC for cosine similarity search. Uses 384 dimensions (paraphrase-multilingual) rather than 1536 (OpenAI) to reduce storage and allow free Supabase tier to handle it. Embedding generation can be added as a Supabase Edge Function later.

**OG image strategy:**
`/api/og` edge route generates branded cards for individual works and creator profiles. The thumbnail image is used as a dark background overlay. Category accent color is applied per-discipline. Default `app/opengraph-image.tsx` handles the site-level OG card (no external deps, Next.js built-in).

---

#### Security Audit Results

- `ANTHROPIC_API_KEY` — not found in any `.tsx` or `.ts` client files ✅
- All 7 AI routes have `checkRateLimit()` ✅
- `next.config.ts` — full CSP, HSTS 2yr, CORP, COEP, no eval, no powered-by ✅
- Supabase RLS enabled on all tables ✅
- Dashboard auth-guarded via middleware + page-level redirect ✅
- Admin panel gated by `ADMIN_EMAILS` env var ✅

---

#### Commits This Session

```
chore: add root .gitignore
feat(platform): initial Next.js 15 platform — full AfriFlix v2 codebase (184 files)
feat(landing): creator-first sales landing page — 10-section full build
feat(seo): OG image generation, JSON-LD structured data, custom 404
```

(Live chat, analytics, migration 010, works-manager and admin-panel img→next/image fixes were part of the platform commit)

---

#### What Remains / Next Targets

- **Push notifications** — ✅ DONE (this session)
- **Semantic search embeddings** — ✅ DONE (this session)
- **Admin dashboard upgrade** — ✅ DONE (this session)
- **Autocomplete search** — ✅ DONE (this session)
- **Mobile app** — React Native (separate repo, future)

---

### Session 2026-03-21 — Phase 4: Notifications, Search, Admin, Email

**Context:** Continuing after the Phase 3 build. All major platform pages exist. This session focused on the remaining feature gaps identified in the audit.

#### Features Built

**Push Notifications (complete chain):**
- `public/sw.js` — `push` event handler, `notificationclick` with tab focus/open logic
- `supabase/migrations/011_push_subscriptions.sql` — table, RLS, service_role read policy
- `app/api/push/subscribe/route.ts` — POST (subscribe) + DELETE (unsubscribe), HTTPS endpoint validation, rate-limited 10/min per user
- `components/layout/push-notifications.tsx` — `PushNotificationButton` client component (idle/subscribed/denied/unsupported states)
- `app/settings/page.tsx` — Notifications tab now includes push toggle row
- `.env.example` — `NEXT_PUBLIC_VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_MAILTO`

**Loading Skeletons:**
- Added `loading.tsx` to: `/browse`, `/live`, `/collections`, `/leaderboard`, `/originals`

**ShareButton Component:**
- `components/works/share-button.tsx` — Web Share API with clipboard fallback
- Added to work detail page action bar and creator profile page

**Autocomplete Search:**
- `app/api/search/suggestions/route.ts` — edge route, queries works + creators by prefix, 30 req/min per IP
- `components/layout/header.tsx` — debounced typeahead dropdown, keyboard nav (↑↓ Enter Esc), outside-click dismiss

**Edge Functions (Supabase Deno):**
- `supabase/functions/embed-work/` — auto-embeds works into pgvector (384-dim) via Claude Haiku on publish webhook
- `supabase/functions/send-push/` — VAPID-signed Web Push delivery, auto-removes expired (410) subscriptions, no external dependencies

**Admin: User Ban Management:**
- `app/api/admin/users/route.ts` — GET (search creators) + PATCH (ban: set flag, remove works, revoke session; unban: clear flag)
- `supabase/migrations/012_creator_ban.sql` — `is_banned`, `banned_at`, `ban_reason` columns; RLS policy preventing banned creators from publishing
- `app/dashboard/admin/admin-panel.tsx` — new Users tab with debounced search, ban/unban with toast, ban reason input

**Email System (Resend):**
- `lib/email.ts` — `sendEmail()` wrapper + `weeklyDigestHtml()`, `newFollowerHtml()`, `tipReceivedHtml()` dark-theme responsive templates
- `app/api/cron/weekly-digest/route.ts` — Monday 08:00 UTC cron, per-creator stats, skips inactive weeks
- `vercel.json` — added weekly-digest schedule
- Follow route — sends new-follower email on follow (fire-and-forget)
- PayFast webhook — sends tip-received email on COMPLETE (fire-and-forget)

#### Architecture Decisions

- **Email provider:** Resend (not SendGrid or AWS SES) — cleaner API, Next.js-native, better DX for indie projects. `lib/email.ts` wraps the raw Fetch API so no SDK dependency.
- **Edge Function for push delivery:** No external `web-push` npm package in Deno. Implemented VAPID JWT signing from scratch using `crypto.subtle` (native Deno). Falls back to PKCS8 key format if raw import fails.
- **Autocomplete: edge runtime** — `/api/search/suggestions` runs on edge for global low-latency. Simple `ilike` prefix match is fast enough with existing indexes; semantic search is reserved for the full `/search` page.
- **Ban system:** Banned creators' sessions are revoked via `supabase.auth.admin.signOut(userId, 'others')` using service role — they can't just re-login on another device.

#### Commits This Session

```
feat(push): Web Push notifications — subscribe, service worker, settings UI
feat(ux): add loading skeletons for browse, live, collections, leaderboard, originals
feat(ux): ShareButton component + header autocomplete search
feat(ai): Supabase Edge Function embed-work for pgvector semantic search
feat(push): send-push Edge Function — VAPID-signed Web Push delivery
feat(admin): user ban management — search, ban/unban, work removal
feat(ux): ShareButton on creator profiles; add ADMIN_EMAILS + CRON_SECRET to env.example
feat(email): Resend email service + weekly digest cron + follower notification template
feat(email): send new-follower notification email on follow
feat(email): tip-received email notification + tipReceivedHtml template
```
- **Toast notifications** — all form submissions and actions (react-hot-toast or custom)
- **Form validation** — react-hook-form + zod on upload + settings forms

*This document is maintained by Claude in collaboration with Nanda Regine.*
*Updated after every meaningful build session.*
