# K53 Drill Master — Technical README

> Adaptive learning platform targeting SA's 60%+ K53 learner licence failure rate · Built by Nandawula Regine Kabali-Kagwa · Mirembe Muse (Pty) Ltd

[![Live](https://img.shields.io/badge/Live-Production-green)](https://k53drillmaster.co.za)
[![Stack](https://img.shields.io/badge/Stack-React%2018%20%2B%20Vite-black)]()
[![License](https://img.shields.io/badge/License-Proprietary-red)]()

## Overview

K53 Drill Master is a mobile-first adaptive learning platform built to solve South Africa's K53 learner licence failure epidemic. Phase 0 — a working MVP with Road Rules gauntlet mode, Pattern Trainer, and all vehicle codes — was built in a single day. The key insight: people don't fail K53 because they can't drive, they fail because they've never drilled the question formats under timed pressure. K53 Drill Master fixes exactly that.

The tech stack is deliberately minimal. React 18 + Vite + localStorage. No database needed for drill mode. Georgia serif font — chosen to feel like a printed test booklet, not an app. Built for 360px budget Android screens on 3G.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     K53 DRILL MASTER                        │
│              React 18 + Vite SPA — Mobile First             │
└─────────────────────────────────────────────────────────────┘

Browser (360px Android) ──► Vite SPA
                                │
                    ┌───────────┼───────────┐
                    ▼           ▼           ▼
             Road Rules    Road Signs   Vehicle Controls
             (120 Q's)    (38 SVG signs)  (30 Q's)
                    │           │           │
                    └───────────┼───────────┘
                                ▼
                        Question Engine
                        ├── Gauntlet Mode (sequential)
                        ├── Pattern Trainer (category drill)
                        ├── Mock Test (timed, DLTC scoring)
                        └── Adaptive Engine
                                │
                                ▼
                        localStorage
                        ├── weakAreas: { questionId: missCount }
                        ├── sessionHistory: QuizResult[]
                        └── subscription: { tier, expiry }

                        PayFast ──► /api/payment
                        (R0 free / R49 paid)
```

## Tech Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| Frontend | React 18 | 18.x | Hooks-based, fast, well-understood |
| Build | Vite | 5.x | Sub-second HMR, optimised production bundle |
| Language | TypeScript | 5.x | Type-safe question bank, prevents scoring bugs |
| Styling | Custom CSS | — | Tailwind was overkill; raw CSS = smaller bundle |
| Typography | Georgia serif | System | Intentional: feels like printed K53 test booklet |
| State | React state + localStorage | — | No Zustand/Redux needed for this problem scope |
| Payments | PayFast | — | ZAR-native, R49 price point, SA standard |
| Monitoring | PostHog + Sentry + GA4 | — | Drill analytics, error tracking, search visibility |

## Data Architecture — The Question Bank

No database. Questions are TypeScript arrays. This was an explicit architectural decision.

```typescript
interface Question {
  id: string
  category: 'road_rules' | 'road_signs' | 'vehicle_controls'
  vehicleCode: 'B' | 'C' | 'C1' | 'EB'
  text: string
  options: string[]
  correct: number  // index
  explanation: string
  svgSignId?: string  // for road_signs category
}

// 600+ questions total
// road_rules: 120 questions × 4 vehicle codes
// road_signs: 38 signs × multiple question variants
// vehicle_controls: 30 questions
```

Road signs are rendered as inline SVGs — not images. This means they work offline, render crisply at any size, and load instantly on 3G. Each sign is an SVG component matching the actual DLTC sign specifications.

## Adaptive Engine

```typescript
// After each incorrect answer:
weakAreas[questionId] = (weakAreas[questionId] || 0) + 1
localStorage.setItem('weakAreas', JSON.stringify(weakAreas))

// When generating a drill session:
const weightedPool = questions.map(q => ({
  q,
  weight: 1 + (weakAreas[q.id] || 0) * 2  // missed twice = 5x likely to appear
}))

// Select questions with weighted random sampling
const session = weightedSample(weightedPool, sessionSize)
```

Simple, effective. No external service needed. Works offline. Personalises silently.

## Mock Test Engine

Mirrors the actual DLTC K53 test structure:
- Time limit: 60 minutes (configurable)
- Pass mark: 75% (matching DLTC requirement)
- Vehicle code selection (Code B, EB, C, C1)
- Section breakdown: Road Rules / Road Signs / Vehicle Controls
- Instant results with section-by-section breakdown
- "Where you would have failed" analysis

## Environment Variables

```
NEXT_PUBLIC_PAYFAST_MERCHANT_ID=
NEXT_PUBLIC_PAYFAST_MERCHANT_KEY=
PAYFAST_PASSPHRASE=
NEXT_PUBLIC_PAYFAST_SANDBOX=
NEXT_PUBLIC_POSTHOG_KEY=
SENTRY_DSN=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

## Local Development

```bash
git clone https://github.com/Nanda-Regine/nanda-k53-drill-master
cd nanda-k53-drill-master
npm install
cp .env.example .env.local
# Fill in your environment variables
npm run dev
```

## Key Technical Decisions

1. **No database for drill mode** — localStorage is sufficient for user progress, weak area tracking, and session history. Adding a database would require auth, which adds friction for users who just want to drill. Free tier works entirely offline.

2. **React + Vite over Next.js** — This is a client-side drill app. Server-side rendering adds complexity with no benefit. Vite produces a smaller, faster bundle. On 3G, bundle size matters more than SSR.

3. **Georgia serif typography** — Every other K53 app uses modern sans-serif fonts. The DLTC test booklet uses serif. Georgia on the screen feels like the actual test. Psychological familiarity under exam conditions matters.

4. **SVG signs over images** — 38 signs as inline SVGs: zero network requests, pixel-perfect at any size, work offline. The alternative (PNG images) would require hosting, CDN costs, and break when offline.

5. **Phase 0 in one day** — The MVP was not a rough prototype. It was a fully deployed product with real questions, real scoring, real PayFast integration. Shipped in 9 hours. This forced ruthless scope prioritisation.

6. **360px first design** — Not "mobile responsive" — specifically designed for the cheapest Android devices most SA learner drivers actually own. Every element tested on a 360px viewport before desktop.

## Build Log — Phase 0 (Single Day)

```
09:00 — Problem defined. "People fail K53 because they've never drilled."
10:30 — Question bank structure designed. First 30 Road Rules questions written.
12:00 — Gauntlet mode working. Basic scoring. No styling.
13:30 — Pattern Trainer mode added. Category selection working.
15:00 — All vehicle codes (B, EB, C, C1). 120 Road Rules questions.
16:30 — Road Signs with SVG rendering. 38 signs.
18:00 — Vehicle Controls. 30 questions.
19:30 — Georgia serif styling. Mobile layout. Score screen.
21:00 — PayFast payment flow. Deployed to Vercel.
21:47 — Live at k53drillmaster.co.za. Phase 0 complete.
```

## Deployment

- **Platform:** Vercel
- **Build:** `npm run build` (Vite production build)
- **CDN:** Vercel Edge Network
- **PWA:** Service worker for offline drill access (Phase 2)

## Known Issues & Roadmap

- [ ] isiXhosa / isiZulu question translations
- [ ] Video explanations for complex road signs
- [ ] Instructor mode (share results with driving school)
- [ ] Spaced repetition algorithm (SM-2) for long-term retention
- [ ] Code 10 / Code 14 (truck/bus) vehicle codes

## License

Proprietary · Mirembe Muse (Pty) Ltd · © 2026 · All rights reserved.

---
*Built by The Poet Who Codes — where Ubuntu becomes architecture.*
