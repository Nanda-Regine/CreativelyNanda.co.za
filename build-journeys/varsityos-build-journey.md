# Campus Compass — Build Journey

> The story of building South Africa's most ambitious student super-app.
> Built by **Nanda Regine** · Mirembe Muse Pty Ltd
> Started: 2025 · Target: 100k SA students by 2026

---

## Vision

Campus Compass is not just an app — it is infrastructure for South African student success.
Every feature is built around one question: **what does a first-generation SA university student
actually need to survive and thrive?** NSFAS budgeting, load-shedding awareness, 11 languages,
crisis support, part-time work balancing — all woven together with an AI companion named Nova.

---

## Phase 1 — Foundation (Early 2025)

### What was built
- Initial Next.js 14 App Router project setup
- Supabase authentication (email + password)
- Basic profile and onboarding flow
- Core database schema: profiles, budgets, expenses, tasks, modules

### Decisions made
- **Next.js App Router** over Pages Router — future-proof, server components, streaming
- **Supabase** over Firebase — open source, PostgreSQL, native RLS, SA-friendly pricing
- **Tailwind CSS** — rapid iteration, consistent design tokens (teal/coral brand)
- **TypeScript strict mode** — catch errors at build time, not in production

### Challenges
- Structuring the App Router correctly (server vs client components)
- Setting up Supabase SSR cookies properly for session persistence

---

## Phase 2 — Core Features (Mid 2025)

### Study Planner
- Tasks tab: assignment tracking with priority, due dates, module links
- Timetable tab: weekly lecture grid
- Exams tab: exam countdown with venue tracking
- Modules tab: full module management with colour coding

### Budget & NSFAS Tracker
- Animated spending ring (live percentage indicator)
- NSFAS allowance breakdown (living, accommodation, books)
- Expense logging by category
- CSV export for NSFAS records

### Meal Prep Module
- 7-day meal planner
- Grocery list with price tracking
- Budget-aware meal suggestions

### Database
- 15 tables with full RLS policies
- Auto-triggers: profile creation, updated_at, task done_at
- Dashboard summary SQL view for performance
- 14 strategic indexes

---

## Phase 3 — Nova AI Companion (Late 2025)

### The breakthrough
This is where Campus Compass became something unprecedented in African EdTech.
Nova is not a generic chatbot — she is purpose-built for SA students.

### Architecture
- **Anthropic claude-sonnet-4-6** as the model
- **Prompt caching**: 5000-line knowledge base cached (~90% API cost savings)
- **Dynamic context injection**: student's actual budget, tasks, exams, mood fed each call
- **Crisis detection**: keyword matching triggers emergency resource display
- **Usage metering**: 10 free messages/month, unlimited for premium

### Nova Knowledge Base covers
- SA university system (25+ institutions)
- NSFAS rules and appeal processes
- Load-shedding study strategies
- Mental health resources (SADAG, university counselling)
- Learning science (spaced repetition, Pomodoro, retrieval practice)
- 11 official SA languages awareness
- Student finance (bursaries, part-time work rights)

### AI Features across the app
- Budget Coach: spending pattern analysis + personalised tips
- Study Assist: AI study plans, exam prep, grade calculator
- Recipe Generator: budget-aware recipes with cost breakdown
- Proactive Insights: Nova notices stress signals and nudges proactively
- Daily Check-in: morning AI-generated snapshot

---

## Phase 4 — Work Module + PWA (Early 2026)

### Part-Time Work Hub
- Job tracking (employer, type, hourly rate, status)
- Shift logging with clock-in/out
- Earnings history and projections
- **Conflict detector**: AI checks if shift clashes with lectures or exams

### PWA (Progressive Web App)
- Service worker for offline support
- Cached pages when no network (common with SA data costs)
- Install-to-homescreen for app-like experience
- Background sync ready

### Payments — PayFast Integration
- ZAR-native (R49/month premium)
- ITN webhook for real-time payment confirmation
- Subscription token storage for recurring billing
- Full payment audit log

---

## Phase 5 — Production Hardening (March 2026)

### Build status
- `npm run build` → PASSES — zero TypeScript errors
- 22 routes, all correctly classified (static vs dynamic)
- CSP headers, image optimisation, security headers in next.config.js

### Type system
- 522 lines of strict TypeScript types
- SA-specific enums: SALanguage (11), SAUniversity (25+), ExpenseCategories
- Full API response typing

### Security
- RLS on all 15 tables
- Service role client isolated to webhook-only routes
- Anthropic API key never reaches browser
- Next.js CSP headers configured

---

## Current Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14.2.5 (App Router) |
| Language | TypeScript (strict) |
| UI | React 18.3.1 + Tailwind CSS 3.4.6 |
| Database | Supabase (PostgreSQL + RLS) |
| Auth | Supabase Auth (email + Google OAuth) |
| AI | Anthropic claude-sonnet-4-6 |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Payments | PayFast (ZAR) |
| Hosting | Vercel |
| Analytics | Vercel Analytics + Speed Insights |

---

## Phase 6 — Scale & Security (March 2026) — IN PROGRESS

### Security hardening
- [x] Rate limiting on all AI routes — sliding window, 429 with graceful UI
- [x] PayFast IP whitelist validation on ITN webhook
- [x] Input length caps on all AI prompt inputs (prevent prompt injection)
- [x] Nova proactive insights use pre-built templates (no API call, no race)
- [ ] Concurrent request mutex for nova_usage (Supabase advisory lock)
- [ ] API abuse detection: flag unusually high message bursts

### Nova Intelligence Upgrades
- [x] Pre-built response library — breathing, Pomodoro, sleep, crisis (zero API cost)
- [x] Topic resource map — 13 subjects mapped to free SA-specific resources
- [x] Nova capabilities menu — 6 categories, 25+ quick-start prompts
- [x] Resource link cards in chat — YouTube, websites, helplines rendered as tappable cards
- [x] Crisis detection 100% local — no API call for safety responses

### Group Assignment Manager
- [x] Full CRUD for group assignments with member management
- [x] Task assignment to specific members with done tracking + progress bar
- [x] Shareable invite links (WhatsApp-friendly, 7-day expiry)
- [x] Non-app users get join page that sends to signup preserving invite
- [x] RLS: members only see their own groups

### Remaining Phase 6
- [ ] Push notifications (Web Push) — exam reminders, budget alerts
- [ ] Receipt scanning — OCR photo upload → auto-expense entry
- [ ] Pomodoro study timer with automatic study_sessions tracking
- [ ] Student noticeboard — campus events, subletting, textbook swaps
- [ ] WhatsApp bot integration (SA's primary communication channel)
- [ ] pgvector semantic search across study notes

### Performance
- [ ] Supabase Edge Functions for AI calls (lower cold start latency)
- [ ] React Query / SWR for client-side caching and stale-while-revalidate
- [ ] Bundle analysis and code splitting audit

### Monetisation roadmap
- [ ] Referral program: 1 free premium month per referral
- [ ] Campus Partner Program: white-label for universities (SRC partnerships)
- [ ] Sponsored meal suggestions (SA food brands targeting students)
- [ ] Tutoring marketplace (verified students + commission)
- [ ] Official NSFAS data integration partnership
- [ ] Annual plan at R399/year (R32.25/month equiv — saves R197)

### UX improvements
- [ ] Bottom navigation bar (mobile-first redesign)
- [ ] Swipe-to-complete tasks
- [ ] Quick-add FAB (floating action button) on all screens
- [ ] Achievement system with streaks and badges
- [ ] Confetti animation on task completion
- [ ] Onboarding tutorial overlay for new users
- [ ] Voice input for Nova on mobile

### Automation
- [ ] Supabase cron: daily exam countdown email at 07:00 SAST
- [ ] Supabase cron: weekly budget summary every Monday
- [ ] Supabase cron: auto-expire premium after billing_date + 31 days
- [ ] Auto-suggest study schedule when exam is added
- [ ] Auto-alert when budget reaches 80% used
- [ ] Auto-detect university from .ac.za email domain

---

## Metrics to Track

| Metric | Target (6 months) |
|--------|-------------------|
| Registered users | 10,000 |
| Premium conversion rate | 8% |
| Daily active users | 2,500 |
| Average session length | 4 min |
| Nova messages/day | 15,000 |
| MRR | R39,200 (800 premium × R49) |

---

## Architecture Decisions Log

| Date | Decision | Reason |
|------|----------|--------|
| 2025 | Next.js App Router | Server components = less JS shipped, better SEO |
| 2025 | Supabase over Firebase | PostgreSQL RLS = row-level security without custom middleware |
| 2025 | Anthropic claude-sonnet-4-6 | Best instruction-following + prompt caching = 90% cost reduction |
| 2025 | PayFast over Stripe | ZAR-native, SA bank cards work out of the box |
| 2026-01 | Prompt caching architecture | 5000-line knowledge base cached — massive cost savings at scale |
| 2026-02 | Zustand over Redux | Minimal boilerplate, fine for this data shape |
| 2026-03 | Service role isolated to webhooks | Security boundary — never expose service role to client code |

---

## Commit History Highlights

| Commit | Feature |
|--------|---------|
| `4b05faf` | Initial upload |
| `b688a11` | Anthropic AI integration for production |
| `4ed997a` | Terms, Privacy, PayFast once-off payments |
| `009b910` | PayFast recurring billing |
| `7cd6bb7` | PWA setup + enhanced Nova knowledge base |
| `fa22a7e` | Multilingual AI across all agents |
| `aec9d96` | Performance: Haiku for structured routes + Nova soft cap |
| `effa986` | Offline support — persisted store + improved SW |

---

## The Bigger Picture

Campus Compass is building toward being the **operating system for SA student life**.
The goal is not just an app — it is a platform:

1. **Data layer**: Students consent to anonymised insights that help universities understand student stress, budget failures, and academic risk — sold back to institutions as aggregate analytics.

2. **Marketplace layer**: Verified tutors, textbook swaps, subletting listings, campus jobs — all within one trusted platform students already use daily.

3. **Financial layer**: NSFAS optimization, bursary matching, micro-loans for emergencies — partnering with student-focused fintech.

4. **Career layer**: CV builder, internship matching, skills gap analysis based on modules — the student-to-professional pipeline.

If we capture students at Year 1 and keep them through graduation, we own the most valuable demographic in African tech: the next generation of professionals.

---

---

## Phase 6 — Production Polish (March 2026)

### Landing Page — Full Redesign
- Complete overhaul of `page.tsx` with mandatory 12-section structure:
  Navbar → Hero → Social Proof → Problem → Solution → Features → Nova
  → How It Works → Pricing → Testimonials → FAQ → Final CTA → Footer
- Aesthetic: warm African-modern (dark warm #0b0907, terracotta coral
  accents, teal primary) — moving away from cold generic dark SaaS
- Added interactive app preview mockup (budget, study, Nova chat)
- PROBLEM section: four pain points that resonate for SA students
- 3-tier pricing: Free (R0) / Student (R29) / Premium (R49)
- HOW IT WORKS: 3-step visual flow
- Student testimonials from realistic SA profiles
- Footer: clickable creativelynanda.co.za attribution
- OG image: 1200×630 edge-rendered via Next.js ImageResponse

### Security Hardening
- HSTS header added: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- Rate limiting added to `work/shift-draft` (10/min) and `insights/checkin` (5/min)
- All 6 AI-calling routes now have rate limiting applied
- ANTHROPIC_API_KEY confirmed server-side only via grep audit

### SEO
- `robots.ts`: disallow private routes, allow public, sitemap pointer
- `opengraph-image.tsx`: dynamic OG image at edge (replaces static PNG dependency)
- Both `sitemap.ts` and `robots.ts` active

### Credibility Details
- `not-found.tsx`: branded 404 page — warm aesthetic, two CTAs, quick links
- `study/sessions` API route: powers Pomodoro study session tracking

### Documentation
- README.md: full production-quality rewrite — badges, feature table,
  architecture tree, env vars, setup guide, security summary, roadmap

### API Routes Added
- `GET/POST /api/study/sessions` — save and retrieve Pomodoro study sessions

---

## Phase 7 — March 2026 Sprint: Production Standards + Pricing Restructure

### Pricing Restructure (cost audit)
- **Free**: R0 — 10 Nova messages/month (was unchanged)
- **Scholar**: R39/month — 75 Nova messages (replaced "Student R29 / 50 msgs" — 63%+ gross margin)
- **Premium**: R79/month — 200 messages hard cap (replaced "R49 unlimited" — was loss-making at high usage)
- Nova message cost: ~R0.17/message at Sonnet 4.6 rates; R49 unlimited broke even at 240 msgs/month
- PayFast upgraded to recurring subscriptions (subscription_type=1, frequency=3 monthly)

### Bug Fixes
- **iOS Safari signup blank screen**: Suspense fallback replaced with full-height form skeleton
- **Login page missing Google OAuth**: Added Google button above email form with divider

### Analytics
- PostHog client-side analytics installed and wired into Providers.tsx
- User identified on login with tier, university, year, funding_type
- Pageview capture on every route change

### Domain
- varsityos.co.za purchased and wired throughout codebase (APP_URL, sitemap, robots, JSON-LD)

### Nova Tier Enforcement
- Server-side message cap by tier: Free=10, Scholar=75, Premium=200
- `subscription_tier` column added to Profile type for granular tier tracking
- GET endpoint returns correct messageLimit per tier

### PWA
- manifest.json: start_url fixed to "/" (was "/dashboard"), background_color/theme_color per spec
- Icon entries updated with separate PNG icons and maskable purpose

### CSP
- PostHog domains added to connect-src

### DB Migration
- MIGRATION_SCHOLAR_TIER.sql created (run in Supabase SQL editor)
- profiles: subscription_tier, referral_credits, ai_language columns
- Backfill from is_premium flag

### PayFast Webhook
- Updated to parse m_payment_id as 'userId|tierId' (scholar or premium)
- Sets profiles.subscription_tier on successful payment
- Stores payfast_subscription_token for recurring billing management
- Handles CANCELLED status

### Conversion Audit Fixes
- Nova page: error code fix (limit_reached), tier-aware upgrade copy (R39/R79)
- PostHog env var corrected to NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN
- GTM hardcoded to GTM-W7R77VP9 (GOOGLE_TAG had no NEXT_PUBLIC_ prefix)

---

## Phase 8 — Production Services & Deployment (April 2026)

### Vercel Deployment (2026-04-03)
- First successful production deploy via Vercel CLI
- Fixed build-breaking bug: `'use server'` directive incorrectly placed in `src/app/referral/page.tsx`
  (Server Components never need `'use server'` — that directive is for Server Action files only)

### Search Engine Verification
- **Google Search Console**: verification token wired via Next.js `metadata.verification.google`
- **Bing Webmaster Tools**: msvalidate.01 token added via `metadata.verification.other`

### Environment Variables — Full Audit & Fix
- Discovered `ANTHROPIC_KEY` was set in Vercel but code uses `ANTHROPIC_API_KEY` — added correct key
- Added all Firebase `NEXT_PUBLIC_` variables (API key, auth domain, project ID, storage bucket, app ID)
- Added `NEXT_PUBLIC_CRISP_WEBSITE_ID` (layout used `NEXT_PUBLIC_` prefix but only `CRISP_WEBSITE_ID` was set)
- Added `NEXT_PUBLIC_SENTRY_DSN` for client-side error reporting
- `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`, `NEXT_PUBLIC_POSTHOG_HOST`, `NEXT_PUBLIC_GTM_ID` confirmed present
- All PayFast, Supabase, ArcJet, Resend vars confirmed in Vercel

### Bug Fix — Firebase VAPID Key
- `src/lib/firebase-messaging.ts` line 64 was using `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` as the
  FCM `vapidKey` (incorrect — that's the sender ID, not the VAPID key)
- Fixed to use `NEXT_PUBLIC_VAPID_PUBLIC_KEY`

### CSP Update
- Added `https://o4511111217217536.ingest.de.sentry.io` to `connect-src` so Sentry can report errors

### OG Image Refresh
- Updated bottom tags: "R0 free forever" → "Free to join" + added "varsityos.co.za" domain badge
- Updated feature card sub-text to be more descriptive and current

### Services Now Active
- PostHog analytics: page views + user identification on login (wired in Providers.tsx)
- Google Tag Manager (GTM-W7R77VP9): fires on all pages via `NEXT_PUBLIC_GTM_ID`
- Crisp live chat: wired via `NEXT_PUBLIC_CRISP_WEBSITE_ID`
- Firebase FCM: env vars wired, VAPID key corrected, ready for push notification flow
- Sentry: DSN set (full @sentry/nextjs SDK install pending)

*Last updated: 2026-04-03*
*Built with love for South African students*
