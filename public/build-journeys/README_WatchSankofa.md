# WatchSankofa — Sankofa TV · Technical README

> Pan-African creative content platform · Built by Nandawula Regine Kabali-Kagwa · Mirembe Muse (Pty) Ltd

[![Live](https://img.shields.io/badge/Live-Production-green)](https://watchsankofa.co.za)
[![Stack](https://img.shields.io/badge/Stack-Next.js%2014-black)]()
[![License](https://img.shields.io/badge/License-Proprietary-red)]()

## Overview

WatchSankofa (formerly AfriFlix) is a pan-African creative content platform for filmmakers, musicians, poets, writers, and storytellers across 54 African nations. Built from the ground up for the continent — its connectivity realities, 2,000+ languages, and mobile-first majority. Not a Netflix clone. An original infrastructure layer for African creative expression. The name "Sankofa" (Akan: "go back and fetch it") reflects the mission: reclaiming African creative sovereignty.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      WATCHSANKOFA                           │
│           Pan-African Creative Content Platform             │
└─────────────────────────────────────────────────────────────┘

Creator ──► Upload Interface ──► Supabase Storage / Cloudflare Stream
                                           │
                                           ▼
                                  Content Processing
                                  ├── Video transcoding (Cloudflare)
                                  ├── Thumbnail generation (Cloudinary)
                                  └── Metadata extraction

Viewer ──► Next.js App Router
              ├── /watch/[slug]   — video player (adaptive bitrate)
              ├── /creator/[id]   — creator profile
              ├── /discover       — content discovery
              └── /[category]     — genre/language browse

                         ┌────────────────────┐
                         │    Supabase DB      │
                         │  ├── creators       │
                         │  ├── content        │
                         │  ├── views          │
                         │  ├── comments       │
                         │  └── collections    │
                         └────────────────────┘
```

## Tech Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| Frontend | Next.js App Router | 14 | Server components for fast initial load on slow connections |
| Language | TypeScript | 5.x | Type-safe across content management and streaming |
| Styling | Tailwind CSS + custom design system | 3.x | Black/Gold/Terracotta/Ivory cinematic palette |
| Typography | Syne display font | — | Bold, contemporary, culturally modern |
| State | Zustand + custom hooks | — | Content feed, player state, creator dashboard |
| Streaming | Cloudflare Stream | — | Adaptive bitrate, African PoPs, affordable |
| Storage | Supabase Storage + Cloudinary | — | Assets + image transforms |
| Database | Supabase PostgreSQL + RLS | — | Creator isolation, content access control |
| Auth | Supabase Auth | — | Creator and viewer accounts |
| Monitoring | PostHog + Sentry | — | Engagement analytics, error tracking |
| Hosting | Vercel | — | Global CDN, Edge Functions |

## Database Schema

```sql
creators        (id, name, bio, location, languages[], social_links jsonb, verified)
content         (id, creator_id, title, description, type, genre, language, 
                 cloudflare_uid, thumbnail_url, duration, published_at, access_tier)
collections     (id, creator_id, title, description, cover_url)
collection_items(id, collection_id, content_id, position)
views           (id, content_id, viewer_id, watched_seconds, completed, created_at)
comments        (id, content_id, author_id, text, created_at)
follows         (id, follower_id, creator_id, created_at)
```

### Content Access Tiers
- `free` — available to all viewers
- `subscriber` — requires active subscription
- `premium` — creator's paid content (revenue split)

## Design System — Cinematic African Visual Language

The design system was built to express African visual culture, not imitate Western streaming platforms.

```
Palette:
  --onyx: #0A0A0A          (cinema black)
  --gold: #C9943A          (ancestral gold)
  --terracotta: #C4613A    (earth warmth)
  --ivory: #F5F0E8         (natural cream)
  --forest: #2D4A22        (savanna green)

Typography:
  Display: Syne (bold, contemporary, pan-African feel)
  Body: Inter (neutral, readable at all sizes)
  Captions: IBM Plex Mono (technical, clean)

Motion:
  Slow reveals: 0.8s ease-out (cinematic pacing)
  Content cards: subtle lift on hover
  Player controls: fade in/out (invisible when watching)
```

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_STREAM_SIGNING_KEY=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
SENTRY_DSN=
NEXT_PUBLIC_POSTHOG_KEY=
```

## Local Development

```bash
git clone https://github.com/Nanda-Regine/AfriFlix
cd AfriFlix
npm install
cp .env.example .env.local
# Fill in your environment variables
npm run dev
```

## Key Technical Decisions

1. **Cloudflare Stream over AWS/Mux** — Cloudflare has edge PoPs across Africa (Johannesburg, Lagos, Nairobi, Cairo). AWS video delivery to African viewers routes through European or US nodes. Cloudflare Stream delivers at African edge = significantly lower latency for our core audience.

2. **RLS-based content access control** — Content tiers (free/subscriber/premium) enforced at the database level. A compromised API route cannot serve paid content to unpaid viewers. Supabase RLS handles this without application-level code.

3. **Syne typography over standard sans-serif** — This was a cultural decision. Syne has a bold, contemporary energy that feels pan-African modern — not corporate Western. Typography communicates identity before any content loads.

4. **Phase 1 as static HTML (AfriFlix)** — Before writing a single line of Next.js, the concept was validated as a static HTML/CSS/JS landing page. This confirmed the visual identity, creator proposition, and audience response before any infrastructure investment.

5. **Mobile-first at 360px, bandwidth-aware** — African streaming is mobile-first. Adaptive bitrate streaming automatically drops to 480p on slow connections. Thumbnails are Cloudinary-transformed to WebP at appropriate sizes. The app is usable on a R100 data bundle.

6. **Rebrand from AfriFlix → WatchSankofa** — "AfriFlix" was descriptive but derivative (Netflix echo). "WatchSankofa" is original, culturally rooted, and immediately communicates the platform's philosophy. The Sankofa bird (looking backward while moving forward) is the perfect metaphor for reclaiming African creative heritage in the digital age.

## Deployment

- **Platform:** Vercel
- **Video Processing:** Cloudflare Stream (automatic transcoding on upload)
- **Image CDN:** Cloudinary (on-demand transforms)
- **Build:** `npm run build`

## Known Issues & Roadmap

- [ ] Creator monetisation / revenue split system
- [ ] Multi-language subtitle support (54 languages roadmap)
- [ ] Mobile app (React Native) for Android-first African markets
- [ ] Creator analytics dashboard
- [ ] Content recommendation engine (collaborative filtering)
- [ ] Offline download (for low-connectivity viewing)

## License

Proprietary · Mirembe Muse (Pty) Ltd · © 2026 · All rights reserved.

---
*Built by The Poet Who Codes — where Ubuntu becomes architecture.*
