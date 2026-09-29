# CreativelyNanda.co.za — Transformation Build Journey

**Author:** Nandawula Regine Kabali-Kagwa
**Project:** CreativelyNanda.co.za
**Company:** Mirembe Muse (Pty) Ltd
**Build Period:** Mid-2025 to present (2026)
**Deployed at:** https://creativelynanda.co.za

---

## March 2026 — Launch Sprint

### What was built
- Full site visual overhaul: grain texture propagated from /work page across all 7 core pages
- Homepage hero image (nanda-professional-2-transparent) fixed — was loading nanda-cover.png (non-existent file), now uses the correct transparent photo
- About page timeline corrected: 2019 (Sportsmans Warehouse) through February-March 2026 (6 apps in 6 weeks)
- Ancestral lineages corrected: Kabali-Kagwa (Uganda), Tshawe/Hlubi/Msimango (Xhosa, Eastern Cape), Thabizolo (Sotho)
- Product pages rebuilt: shop-themes.ts migrated from pink/rose/purple palette to navy/cherry, sticky desktop sidebar ready via theme system
- AI Engineer page rebuilt as services/conversion page (not project showcase)
- Education page redesigned with asymmetric cards, certifications grid, philosophy quote
- Mirembe page rebuilt with Mirembe Muse logo, asymmetric clip-path sections, cherry tagline section
- SEO: strengthened metadata across all pages, robots.ts, sitemap.ts priority hierarchy
- Integrations: Upstash rate limiting on /api/chat (10 req/min sliding window), Sentry on all environments, Cloudflare security headers added to next.config.js
- Poetry interlude section added to homepage between hero and editorial intro
- Footer: updated to "Mirembe Muse (Pty) Ltd · East London, South Africa"
- Professional photography assets used: nanda-professional-2-transparent (homepage hero), nanda-professional (about), nanda-coding (AI engineer page)
- Consulting and contact pages: grain texture, cream gradient, cherry CTAs replacing off-brand gold
- Press page: off-brand purple/amber/pink → cherry, stats corrected to 7 apps / 400+ commits
- Global color audit: pink, rose, purple, violet, amber removed from user-facing pages
- Schema.org JSON-LD: alumniOf city corrected to Gqeberha, sameAs expanded to include LinkedIn/Twitter/Instagram, worksFor URL updated

### Architecture decisions
- Grain texture implemented as fixed overlay (not sticky) to prevent repaints during scroll
- Product description toggle deferred — theme system rewrite was higher priority
- Shop themes completely replaced: all category themes now use navy gradient + cherry accent instead of individual color-coded gradients
- Sentry configs created as minimal stubs — DSN reads from env at runtime
- Upstash rate limiting uses sliding window (10 req/min per IP) with graceful 429 response

### Stats at close of March 2026
- 7 live SaaS apps
- 300+ active users across portfolio
- 400+ GitHub commits
- 6 Notion templates across 6 marketplaces
- 1 registered South African company: Mirembe Muse (Pty) Ltd
- 1 published poetry collection: Inside Her Roses (October 2021)

---

## June 2026 — Portfolio Upgrade Sprint

### What was built

**Stats and headline refresh**
- Homepage headline updated: "Seven apps. Nine months." → "Eight apps. One year."
- Stats grid updated: 7→8+ apps, 550+→1,000+ commits, 9 months→1 Year, Africa→3+ Paying Clients
- MagazineCover: Issue 001 Apr 2026 → Issue 002 Jun 2026; coverlines updated; ticker expanded with JarvisOS and paying clients items

**JarvisOS added to portfolio**
- JarvisOS added as first entry in `lib/data/projects.ts` — 15-wing personal AI OS, 1,194 RAG chunks via Upstash Vector, Redis wing-to-wing signal protocol, Claude Sonnet + Haiku model routing (85% cost reduction), offline PWA, 6+ months dev
- JarvisOS and Sanyu Botanicals case study pages added to `/projects/[slug]` with full build timeline, tech stack, impact metrics, SEO metadata
- AI Engineer page: updated capabilities (RAG added), social proof strip updated to mention JarvisOS

**Navigation redesign**
- Added Consulting, Testimonials, AI Engineer to desktop and mobile link lists
- Split navigation: `desktopLinks` (9 primary items) vs `links` (14 full list for mobile drawer)
- Mobile drawer redesigned: dark navy (`#0A1128`) background replacing plain beige; four grouped sections — DISCOVER (Home, About, Work, Education), BUILD (Projects, AI Engineer, Consulting), CREATE (Poetry, Blog, Shop), CONNECT (Mirembe, Testimonials, Press, Contact); ancestral gold (`#C9943A`) section labels; cherry active states; cream link text

**Homepage testimonials — mobile fix**
- Removed `min-h-[220px]` fixed-height wrapper and `absolute inset-0` + `h-full` positioning from the AnimatePresence motion div
- Cards now size naturally on mobile — long quotes no longer clip

**Mirembe page — website links**
- AdminOS, Sanyu Botanicals, True Access cards changed from `upgrading: true` to live links
- Sanyu: `https://sanyubotanicals.vercel.app`, True Access: `https://true-access-app.vercel.app`, AdminOS: `https://adminos.co.za`

**Blog fixes**
- Blog article titles: em-dashes (`—`) replaced with commas throughout seed data and BLOG_PREVIEW array
- Blog posts re-seeded to push title changes to Supabase
- Individual post API (`/api/blog/posts/[slug]`): removed JOIN on `contributors` and `blog_reviews` that caused some posts to 404; added `!post.content` check before seed fallback
- List API (`/api/blog/posts`): removed `contributors(*)` JOIN for consistency and to prevent FK failures
- `/blog/dev` and `/blog/business` category pages: replaced hardcoded placeholder articles (fake slugs, consulting photo as cover image on every card) with real API data + seed fallback, matching the working `/blog/writing` pattern

**Poetry roses — auto-seed fix**
- `app/api/poetry/poems/[slug]/rose/route.ts`: added `resolvePoem()` function that auto-seeds a poem into Supabase from `lib/poems-data.ts` if not found, preventing `{ error: 'Poem not found' }` responses on first visit
- GET handler now returns `[]` instead of 404 for unknown slugs

**Nanda AI knowledge base**
- `app/api/chat/route.ts` system prompt fully rewritten: 8+ apps (was 7), added JarvisOS (15-wing AI OS, 1,194 RAG chunks, Redis signal protocol), Sanyu Botanicals (3 formulations, Angel loyalty QR card, hair AI consultation), True Access (4.2M disabled SA, SANS 10400-S, Expo SDK 52, 7 phases in 2 days); updated timeline to June 2026, 1 year, 1,000+ commits, 3+ paying clients; live URLs for all apps; correct template pricing throughout

**PayFast universal hub — K53 and AdminOS improvements**
- `phpUrlencode()`: encodes `~` as `%7E` to match PHP `urlencode()` exactly
- `verifySignature()`: sorts params alphabetically before building signature string (matches PHP `ksort()` behaviour)
- K53 Drill Master handler: added to universal PayFast hub; `SUBSCR_PAYMENT` renewals now update the `subscribers` table
- AdminOS handler: upgraded with full add-on support and `payment_events` logging

### Architecture decisions
- Mobile nav grouped sections chosen over flat list: 14 links in a flat list is cognitively heavy on mobile; grouping by intent (discover / build / create / connect) reduces scan time
- No JOIN pattern for blog API: Supabase FK relationships can vary between projects; removing joins from the public-facing blog routes makes the API resilient to schema differences and easier to reason about
- `resolvePoem` auto-seed pattern: mirrors the `resolvePost` pattern used in blog; ensures any poem in `lib/poems-data.ts` is accessible via the API without a manual DB insert step
- AI knowledge stays in system prompt (not a vector DB): the knowledge set is small enough (~2KB) that a vector RAG layer would add latency and complexity for no gain

### Stats at close of June 2026
- 8+ live production apps
- 1,000+ GitHub commits across all projects
- 3+ paying clients
- 6 Notion templates in marketplace
- 1 registered South African company: Mirembe Muse (Pty) Ltd
- 1 published poetry collection: Inside Her Roses (October 2021)
- 1 year from first line of code to 8 apps

---

## The Vision

The project began with a simple insight: a personal website should not be a static brochure. The goal was to transform CreativelyNanda.co.za into what the master build document calls "a cultural destination" — combining the professional credibility of LinkedIn, the seamless commerce of Amazon, the artisan storytelling of Etsy, the literary community of AllPoetry, the editorial luxury of Vogue, and the long-form authority of Medium. That ambition shaped every technical decision that followed.

Nanda's starting point was a basic Next.js portfolio deployed on Vercel. It had no e-commerce, no blog system, no animations, and no community features. The build journey from that starting point to a full-stack revenue-generating platform is documented here.

---

## 1. Project Foundation and Stack Choices

### Next.js 14 App Router

The project was built on Next.js 14 using the App Router (not Pages Router). This was a deliberate choice over the Pages Router for several reasons. The App Router enables nested layouts, which allows each section of the site — blog, poetry, products, admin — to have its own shell without re-rendering the root. Server Components reduce JavaScript shipped to the client, which matters for a content-heavy site where SEO and first-load performance are critical. The App Router's built-in metadata API also allows per-page OpenGraph and Twitter card generation without third-party libraries.

The alternative, sticking with Pages Router, would have been faster to start but would have required retrofitting as the site grew. Given the ambition of the project from day one, App Router was the right foundation.

### TypeScript

TypeScript was chosen for the entire codebase. This became especially important during the payment integration, where a type error in the PayFast signature function would have caused silent revenue loss. The `PayfastPaymentData` interface in `lib/payfast/index.ts` ensures every field passed to the signature generator is accounted for. TypeScript also caught the price formatting bug early (see the Bugs section).

### Tailwind CSS

Tailwind was chosen over CSS Modules or styled-components for its utility-first approach. The design system uses CSS custom properties for the brand palette (navy `#1a1a2e`, beige `#E8DCC4`, cherry `#C1292E`, parchment `#F5F0E8`) but Tailwind for all layout and spacing. This separation means brand tokens live in globals.css while structural code lives inline in JSX — a pattern that makes rapid iteration on layouts faster without touching style files.

### Framer Motion

Every page was designed to "come alive". Framer Motion was chosen over CSS animations or GSAP because it integrates natively with React's component model, supports server-component-safe exports, and has first-class support for `useReducedMotion`. This last point was important: the animation system needed to be accessible from the start, not patched later.

### Supabase over Firebase

The database choice came down to Supabase versus Firebase. Supabase was chosen for three reasons. First, it provides a full PostgreSQL database, meaning complex queries (filtering products by status, joining orders to products) are straightforward SQL without custom NoSQL workarounds. Second, Row Level Security (RLS) allows fine-grained access control at the database layer rather than in application code — critical for an e-commerce site where orders must be readable by the buyer but not by other users. Third, Supabase Storage handles both private (product download files) and public (product images) buckets with signed URLs for the former, solving the digital delivery problem natively.

Firebase was considered but rejected primarily because Firestore's document model would have required denormalising the product-order relationship that Postgres handles naturally with foreign keys and indexes.

### PayFast over Stripe

Stripe is the global default but it is not optimised for the South African market. PayFast is the dominant SA gateway, supports EFT and instant EFT (common payment methods in ZA), and processes in ZAR natively without conversion fees. For a site targeting South African students and entrepreneurs (NSFAS context, varsity templates, SME templates), using Stripe would have added friction and currency confusion. PayFast was always the correct choice for this market.

### Resend for Transactional Email

Resend was chosen over SendGrid or Mailchimp transactional for its clean Next.js integration and React Email template support. The `lib/email.ts` module uses Resend's API with React Email components for the purchase confirmation email, allowing the email template to be built and previewed as a React component rather than raw HTML strings. The environment variable is `RESEND_API_KEY` (a rename from the original `RESEND_KEY` that caused failures early on).

### Zustand for Cart State

The cart needed to persist across page navigations (App Router does not persist React state between full navigations) and survive browser refreshes. Zustand with the `persist` middleware and `createJSONStorage(() => localStorage)` was the right choice. Redux would have been over-engineered; React Context would have caused re-render cascades across the layout. The cart store (`components/cart/cart-store.ts`) uses `skipHydration: true` to prevent SSR/client mismatch and calls `rehydrate()` after mount — a pattern that prevents the "cart flicker" problem common with SSR applications.

### Arcjet for Security

Rather than writing custom rate-limiting middleware, Arcjet was integrated at `@arcjet/next@1.3.0`. Arcjet runs as a Next.js middleware and provides bot detection, shield protection, and sliding window rate limiting from a single composable API. The middleware defines two Arcjet instances: a standard one (60 requests/minute) for all routes, and a stricter one (10 requests/minute) for AI/chat API routes at `/api/chat` and `/api/ai`.

---

## 2. Architecture Decisions

### App Router Layout Nesting

The site uses nested layouts extensively. `app/layout.js` is the root (Navigation, Footer, Analytics, Crisp, Hotjar, GTM). Sub-sections have their own layouts:

- `app/blog/layout.tsx` — Blog shell with category navigation
- `app/poetry/layout.tsx` — Poetry sanctuary shell
- `app/products/layout.tsx` — Marketplace shell with cart drawer
- `app/admin/layout.tsx` — Admin shell (separate from public navigation)
- `app/about/layout.tsx`, `app/work/layout.tsx`, `app/projects/layout.tsx` — Section shells with their own SEO metadata

Each layout file also exports a `metadata` object, meaning every section has its own canonical URL, OG title, and description without any global configuration to manage.

### Two Supabase Clients

The codebase distinguishes between two Supabase client types:

- `lib/supabase/client.ts` — Browser client using `NEXT_PUBLIC_SUPABASE_ANON_KEY`, subject to RLS
- `lib/supabase/server.ts` — Server-side admin client using `SUPABASE_SERVICE_ROLE_KEY`, bypasses RLS for webhook handlers and admin operations

This separation is critical. The webhook handler (`app/api/payfast/webhook/route.ts`) uses `createAdminClient()` to update order status, because the RLS policy on orders would otherwise block the write. The public `GET /api/orders` route uses the same admin client but explicitly selects only safe fields, intentionally excluding `download_token`.

### Server Components vs Client Components

The pattern throughout is: fetch data in Server Components, pass to Client Components for interactivity. Product listing pages (`app/products/page.tsx`) are Server Components that fetch from Supabase at request time. The cart drawer, animations, and interactive elements are Client Components (`'use client'`). This keeps the JavaScript bundle small while enabling full interactivity where needed.

---

## 3. Every Major Page Built

### Homepage — Magazine Cover Experience

The homepage was rebuilt from a basic portfolio into what the commit history describes as a "magazine cover experience". The design is editorial: full-viewport hero with Cormorant Garamond display typography, Framer Motion entrance animations sequenced with `PageLoadSequence`, and a grain texture overlay that gives the page an analogue editorial quality. The NandaGirl character appears in the bottom corner with context-aware speech bubbles. The homepage hero communicates identity in a single frame: poet, developer, founder.

### /products — Marketplace

The products page was rebuilt as a "premium ecosystem layout". It fetches all live products from Supabase and renders them through `ProductCoverCard` components. The page includes filtering by category (student, business, creative) and a featured products section at the top. Product images are served from the `product-images` Supabase Storage bucket.

### /products/[slug] — Product Detail Page

The product detail page is a conversion-focused layout. It includes the product name and tagline, price (formatted from cents using `/ 100`), features list (rendered from the `features` JSONB column), FAQ accordion (from the `faqs` JSONB column), and an "Add to Cart" button that fires a Zustand cart action. The page also renders `generateProductJsonLd()` structured data for Google rich results, including `AggregateRating` when review data is present.

### /checkout — PayFast Integration

The checkout page reads from the Zustand cart, creates an order record in Supabase, then renders a PayFast form with hidden inputs. The form POSTs directly to PayFast's hosted payment page. On successful payment, PayFast redirects to `/checkout/success` and fires a webhook to `/api/payfast/webhook`.

### /checkout/success — Order Confirmation

Reads the `order_id` query parameter passed back by PayFast, fetches the order from `/api/orders?id=`, and displays the order summary. Crucially, `download_token` is never exposed here — download links are sent by email only.

### /blog — Triple Blog

The blog system supports three categories: `dev` (dark midnight-blue theme, code-green accents), `writing` (soft lavender and rose palette), and `business` (professional navy and emerald). Each category has its own listing page and individual article pages. Blog posts are stored in Supabase with `is_published`, `published_at`, `cover_image`, `tags`, and `reading_time` fields. The blog article route renders `generateBlogPostingJsonLd()` for Schema.org `BlogPosting` structured data.

### /poetry — Poetry Sanctuary

The Poetry Sanctuary houses Nanda's published work from "Inside Her Roses" (2021). The collection page lists all published poems. Individual poem pages (`/poetry/collection/[slug]`) display the poem with a heart system (`poem_hearts` table, unique per `session_id`) and a roses/reviews system (`poem_roses` table, moderated before display). The poetry section was important personally and commercially — it builds brand identity and connects directly to the published book available on Amazon.

### /admin — Admin CMS

The admin section covers: products (create/edit/publish), blog posts (create/edit/publish), poetry (create/edit poems, moderate roses), and orders (view status). All admin routes are protected by the middleware auth check (`isAdminAuthorized`) using a `SECURITY_TOKEN` environment variable, checked via Bearer token (for API routes) or an `admin_token` httpOnly cookie (for UI routes). The admin login page at `/admin/login` posts to `/api/admin/auth` to set the cookie.

### /projects/[slug] — Case Studies

9 portfolio projects were seeded in migration 018 with full structured data: title, tagline, tech stack (JSONB array with reasons), impact metrics, GitHub/live URLs, and SEO metadata fields. Each project has its own SEO-optimised page with `generateBreadcrumbJsonLd()` and keywords targeting "African AI engineer", "South African developer", and the specific domain (stokvel finance, K53 driving test, accessibility mapping, etc.).

### /ai-engineer — AI Engineer Showcase

A dedicated dark-theme page (midnight-blue, charcoal, electric-cyan `#00d4ff`) showcasing the AI engineering work. Uses a different visual vocabulary from the main brand — more technical, code-aesthetic — to speak to a different audience (hiring managers, collaborators) while remaining within the overall Nanda brand.

### /press — Media Press Kit

A press kit page with copy-to-clipboard buttons (a `'use client'` component using the Clipboard API). Includes bio variants, headshots, media mentions, and contact details. The page has `layout.tsx` for its own metadata.

### /sanyu — Sanyu Botanicals Coming Soon

A coming-soon page for the Sanyu Botanicals brand. Notably, this page is not in the navigation — it is only accessible from `/mirembe`. This was a deliberate decision to avoid diluting the main brand while the sub-brand is still in development.

---

## 4. Payment Integration Journey

### Initial Setup

PayFast integration began with the `lib/payfast/` module. The `config.ts` file reads `PAYFAST_MERCHANT_ID`, `PAYFAST_MERCHANT_KEY`, `PAYFAST_PASSPHRASE`, and `NEXT_PUBLIC_PAYFAST_SANDBOX` from environment variables. The `sandbox` flag controls which PayFast URL is used — `sandbox.payfast.co.za` vs `www.payfast.co.za`. As of live launch, `NEXT_PUBLIC_PAYFAST_SANDBOX=false` with live merchant ID `17030173`.

### Signature Generation and the Sort Bug

PayFast authentication relies on an MD5 signature of all form fields. The original implementation of `generateSignature()` in `lib/payfast/index.ts` sorted the keys alphabetically before building the parameter string:

```typescript
// BROKEN — sorted alphabetically
const params = Object.keys(data)
  .sort()
  .filter(key => key !== 'signature' && data[key] !== '')
  .map(key => `${key}=${phpUrlencode(data[key])}`)
  .join('&');
```

PayFast verifies the signature using the POST field order it receives from the browser, which matches insertion order in the JavaScript object, not alphabetical order. The `.sort()` call caused a field order mismatch, generating an incorrect signature and resulting in payment failures.

The fix was to remove `.sort()` entirely. The current `createPaymentData()` function builds the data object in PayFast's canonical field order (merchant details, URLs, buyer details, transaction details) and `generateSignature()` preserves that insertion order. This was the single most critical bug fix in the entire project.

### PHP URL Encoding

A second subtlety in the signature was URL encoding. JavaScript's `encodeURIComponent()` does not encode `!'()*`, but PHP's `urlencode()` does. PayFast's reference implementation uses PHP. The `phpUrlencode()` helper in `lib/payfast/index.ts` wraps `encodeURIComponent()` and adds the missing replacements, ensuring the signature string matches exactly.

### Webhook Handler

The webhook handler at `app/api/payfast/webhook/route.ts` implements a full verification chain:

1. Parse the raw POST body as `application/x-www-form-urlencoded`
2. Validate the source IP against PayFast's known IP ranges (two subnet blocks: `197.97.145.144-147` and `41.74.179.194-197`, plus `102.216.36.3-6`)
3. Verify the signature using `verifyWebhookSignature()`
4. Fetch the order from Supabase and verify the amount matches within 1 cent
5. Idempotency check: if the order already has this `pf_payment_id` with this status, skip processing
6. Update order status in Supabase
7. On `COMPLETE`: sync `purchase_count` on the product record
8. On `COMPLETE`: send a purchase confirmation email via Resend

The webhook returns `200 null` (no body) on success, which is what PayFast expects. Email failures are logged but do not fail the webhook — email can always be retried.

### Email Delivery Chain

The purchase confirmation email sends two types of links: the Notion template URL (stored in `guide_url` on the product record at order time) and a PDF quick-start guide URL pointing to `/assets/products/guides/{slug}.pdf` in the public folder. The download token is never included in any public-facing URL or API response.

---

## 5. Security Hardening

Several security issues were identified and fixed during an audit sprint:

### Admin Authentication Middleware

Before the audit, admin routes had no authentication. The middleware was updated to gate all `/admin` and `/api/admin` routes behind `isAdminAuthorized()`, which checks either a `Bearer` token in the `Authorization` header (for API clients) or an `admin_token` httpOnly cookie (for browser sessions). The `SECURITY_TOKEN` environment variable holds the secret. Login is handled by `POST /api/admin/auth`, which sets the httpOnly cookie on success. The login and auth endpoints themselves are exempt from the gate to prevent a redirect loop.

### Debug Endpoint Disabled

A `/api/debug/products` endpoint existed that returned raw product data without authentication. This was replaced with a stub that permanently returns `{ error: 'Not found' }` with a 404 status. The comment in the file notes how to restore it locally for debugging.

### Blog POST Authentication

The blog API route's `POST` handler for creating posts was audited to ensure it checks for admin credentials before writing to the database.

### Download Token Removed from Public API

The `GET /api/orders` route originally selected `*` from the orders table, which included `download_token`. This was corrected to an explicit column list: `id, amount, currency, status, items, created_at`. The download token is a UUID used as a bearer credential for file access — exposing it publicly would allow anyone with an order ID to download any product file.

### Rate Limiting on Order Lookup

The orders lookup endpoint was reviewed for abuse potential (enumeration of order IDs). Combined with the Arcjet sliding window middleware (60 requests/minute globally), this prevents bulk scraping of order data.

### Security Headers

The middleware applies a standard set of security headers to every response:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

These headers are applied in the Arcjet middleware at `middleware.ts` before returning any response, including denied requests.

### .gitignore

The `.gitignore` was audited to ensure `.env.local` and the Firebase Admin SDK JSON file (`mirembe-muse-firebase-adminsdk-fbsvc-b6c9010502.json`) are excluded from version control. These files contain live service credentials.

---

## 6. Database Evolution — All Migrations

The Supabase migration history tells the story of the product's growth:

| Migration | What it did |
|-----------|-------------|
| `001_initial_schema.sql` | Created `products`, `orders`, `blog_posts`, `poems`, `poem_hearts`, `subscribers` with basic RLS |
| `001_blog_and_poetry_engagement.sql` | Added engagement fields to blog and poetry tables |
| `002_products_orders_storage.sql` | Rebuilt products and orders with full schema (price in cents, download_token, items JSONB, RLS policies), seeded 8 initial placeholder products |
| `002_blog_and_poetry_engagement.sql` | Blog post likes/views, poem engagement fields |
| `003_poem_roses.sql` | Created `poem_roses` table for moderated reader reviews (status: pending/approved/featured/rejected) |
| `003_shop_engagement.sql` | Shop analytics fields |
| `004_orders_metadata.sql` | Added `metadata` JSONB column to orders for PayFast response fields |
| `005_products_full_data.sql` | Extended product schema with full description, features JSONB |
| `006_product_guide_url.sql` | Added `guide_url` column for Notion template duplication links |
| `fix-stats-tracking.sql` | Fixed view/engagement tracking triggers |
| `007_mirembe_muse_templates.sql` | Archived placeholder products; inserted 6 real Mirembe Muse Notion templates with full descriptions, features, FAQs, pricing (R249-R499 in cents), and Notion duplication URLs |
| `008_product_images.sql` | Created `product-images` Supabase Storage bucket (public, 10MB limit) with upload policy |
| `009_product_impact.sql` | Added `impact` text column to products; populated positioning lines for all 6 templates |
| `010_delete_archived_products.sql` | Deleted archived placeholder products |
| `011_reset_products_clean.sql` | Clean reset of products table state |
| `012_upsert_products.sql` | Upsert pattern for safe re-running of product data migrations |
| `013_product_images_public_policy.sql` | Made product-images bucket publicly readable without auth |
| `014_make_product_images_bucket_public.sql` | Confirmed public bucket setting in storage.buckets |
| `015_update_product_images_local.sql` | Updated image URLs for local development |
| `016_product_guides_and_files.sql` | Updated file_path references for PDF quick-start guides in `products` storage bucket |
| `017_elite_product_copy.sql` | Upgraded product copy/descriptions for conversion |
| `018_projects_table.sql` | Created `projects` table with tech_stack and impact_metrics JSONB; seeded all 9 portfolio projects |
| `019_case_study_blog_posts.sql` | Added case study blog posts linked to projects |
| `020_subscribers.sql` | Rebuilt subscribers table with proper RLS (service role only) |
| `021_mirembe_muse_blog_posts.sql` | Seeded Mirembe Muse branded blog posts |
| `022_add_notion_category.sql` | Added `notion` as a valid blog category |
| `023_test_price_r5.sql` | Temporarily set a product price to R5 for PayFast live testing |
| `023b_revert_test_price.sql` | Reverted test price back to production value |

### Storage Buckets

Two Supabase Storage buckets were created:

- `products` — Private bucket for digital product files (PDFs, ZIPs). Accessible only via signed URLs generated server-side. RLS allows only `service_role` to read/write.
- `product-images` — Public bucket for product thumbnails and gallery images. Publicly readable, write restricted to service role. Organised into folders by product slug.

---

## 7. Animation System

The animation system in `components/animations/` was built as a reusable library with mobile and PWA optimisations baked in from the start. All components respect `prefers-reduced-motion` via Framer Motion's `useReducedMotion()` hook.

### Component Inventory

- `FadeIn`, `SlideUp`, `ScaleIn` — Basic entrance animations
- `TextReveal` — Masked text reveal for editorial headings
- `Counter` — Animated number counter for impact stats
- `Parallax` — Simple CSS parallax wrapper
- `PageTransition` — Route transition wrapper
- `ScrollReveal` — Scroll-triggered entrance with configurable threshold
- `StaggerContainer` / `StaggerItem` — Staggered list animations
- `PageLoadSequence` — Orchestrated page-load animation with Provider/Consumer pattern; `SequenceNavigation`, `SequenceHero`, `SequenceContent` sub-components for staged reveals
- `ScrollTrigger` — Full-featured scroll-triggered animation with `once`, `trackProgress`, `mobileAnimation` props; supports `fade`, `slideUp`, `slideDown`, `slideLeft`, `slideRight`, `scale`, and `custom` variants
- `ParallaxScroll` / `ParallaxLayer` / `ParallaxHero` / `ParallaxImage` — Layered parallax using passive scroll listeners
- `StaggerChildren` / `StaggerGrid` / `StaggerList` / `AnimatedList` — Grid and list stagger patterns
- `MagneticButton` / `MagneticIcon` / `MagneticText` / `MagneticCard` — Magnetic cursor effect, auto-disabled on touch devices
- `Card3DTilt` / `ProductCard3D` / `ImageCard3D` / `TextCard3D` / `Button3D` — 3D perspective tilt on hover; falls back to gyroscope on mobile

### Device Detection Hooks

`components/animations/hooks/useDeviceDetect.ts` exports four hooks:

- `useDeviceDetect()` — Full device info object (touch, PWA, reduced motion, mobile)
- `usePrefersReducedMotion()` — Boolean
- `useIsTouchDevice()` — Boolean
- `useIsPWA()` — Boolean (detects `display-mode: standalone`)

These hooks allow any component to adapt its behaviour based on the runtime environment without prop drilling.

### Mobile/PWA Considerations

All heavy effects (`MagneticButton`, `Card3DTilt`) default to `disableOnMobile={true}`. `ParallaxScroll` uses `mobileSpeed={0.15}` by default. All scroll animations use passive event listeners. `willChange` is set to `'auto'` when animations are disabled to free GPU memory. The iOS 13+ gyroscope permission flow was documented as a known issue — it requires a user gesture to call `DeviceOrientationEvent.requestPermission()`.

---

## 8. SEO Infrastructure

The SEO system is centralised in `lib/seo.tsx`:

### createMetadata()

A typed helper that generates Next.js `Metadata` objects with canonical URLs, OpenGraph (locale `en_ZA`, type, title, description, image 1200x630), and Twitter Card (summary_large_image). The root title for the homepage is `"Nanda | Creative Technologist"`; all other pages append `| Creatively Nanda`.

### JSON-LD Generators

Five structured data generators were built:

- `generateWebSiteJsonLd()` — Schema.org `WebSite` with `SearchAction` pointing to the blog search
- `generatePersonJsonLd()` — Schema.org `Person` for Nanda with `knowsAbout` array covering AI, ML, Claude API, OpenAI, LangChain, RAG, Next.js, TypeScript, Supabase, PayFast, Mapbox, Notion, PWA, Poetry, African Entrepreneurship
- `generateBlogPostingJsonLd()` — Schema.org `BlogPosting` with `datePublished`, `dateModified`, `author`, `publisher`, `timeRequired`
- `generateProductJsonLd()` — Schema.org `Product` with `Offer`, `AggregateRating`, and `Review` arrays for Google Shopping rich results
- `generatePoemJsonLd()` — Schema.org `CreativeWork` linked to the "Inside Her Roses" book

The root `app/layout.js` renders a `@graph` array containing `WebSite` and `Person` JSON-LD in a single script tag. Product pages add `Product` JSON-LD. Blog pages add `BlogPosting` JSON-LD.

### Sitemap and robots.txt

`next-sitemap.config.js` generates the sitemap at build time, excluding `/admin` and `/admin/*` from both the sitemap and robots.txt allowlist. All other public routes are included automatically.

---

## 9. Multi-Language Support

Three translation files were created under `locales/`:

- `locales/en/common.json` — English
- `locales/af/common.json` — Afrikaans
- `locales/zu/common.json` — Zulu (isiZulu)

The language selector component reads the current locale and allows switching between the three. The original master build document also listed Xhosa as a target language. The decision to prioritise Afrikaans and Zulu reflects the demographic reality of the Eastern Cape (isiXhosa is actually the most widely spoken language in East London, but the initial implementation covered EN/AF/ZU).

---

## 10. NandaAI Chat — Claude Haiku SSE Streaming

The chat assistant uses the Anthropic Claude API with the Haiku model (fast, cost-effective for interactive chat). The implementation uses Server-Sent Events (SSE) for streaming, meaning responses appear token by token rather than waiting for the full response.

The API route (`app/api/chat/route.ts` or equivalent) sends a `ReadableStream` response with `Content-Type: text/event-stream`. On the client, `NandaAssistant.tsx` connects to this stream and appends tokens to the displayed message in real time.

Stricter rate limiting is applied to AI routes: the `ajAI` Arcjet instance in `middleware.ts` allows only 10 requests per minute per IP (versus 60 for general routes) and blocks all bots except preview crawlers. This prevents API cost abuse.

The `NandaAssistant` component also embodies the "Nanda Girl" character — a visual AI avatar with context-aware speech bubbles that change based on the current page path. The speech bubbles are defined per-context (home, poetry, work, about, blog, contact, marketplace, education) and cycle automatically.

---

## 11. Key Bugs Fixed

### PayFast Signature Sort Bug (Critical — Revenue Impact)

As described in the Payment section: `generateSignature()` originally called `.sort()` on the keys array. PayFast verifies using insertion order, not alphabetical order. Removing `.sort()` fixed payment failures. File: `lib/payfast/index.ts`.

### Price Formatting /100 Bug

Product prices are stored in the database in cents (integer). Early implementations in several components called `price.toFixed(2)` directly on the cents value, displaying R29900 instead of R299. The fix was to divide by 100 before formatting: `(price / 100).toFixed(2)`. Files fixed: `components/marketplace/ProductCoverCard.tsx`, `components/marketplace/ProductDetailClient.tsx`, `components/cart/CartItem.tsx`, `components/cart/CartDrawer.tsx`, `app/checkout/page.tsx`.

### Brand Inconsistency — Mirembe Muse vs CreativelyNanda

Early product copy and metadata mixed the Mirembe Muse brand (the company behind the Notion templates) with the CreativelyNanda personal brand. The resolution was clear branding separation: Mirembe Muse is the product/company brand shown on templates and the `/mirembe` landing page; CreativelyNanda is the personal brand for the portfolio, blog, and poetry. The site domain remains `creativelynanda.co.za`.

### Resend API Key Rename

The original environment variable `RESEND_KEY` was renamed to `RESEND_API_KEY` to match Resend's official documentation and their SDK's default lookup. All email sending was silently failing before this fix.

### OrderItem Missing Fields Bug

The cart store's `CartItem` type was missing `slug` and `guide_url` fields that the webhook handler needed to construct download links and Notion template URLs in the confirmation email. These fields were added to the type definition and populated at checkout time.

### PAYFAST_SANDBOX Config Key

The config read `PAYFAST_SANDBOX_MODE` but the `.env.local` set `NEXT_PUBLIC_PAYFAST_SANDBOX`. The config was corrected to read `NEXT_PUBLIC_PAYFAST_SANDBOX`, ensuring sandbox/live mode switching works correctly.

---

## 12. Infrastructure and Integrations

### Arcjet Security Middleware

`middleware.ts` at the project root integrates `@arcjet/next@1.3.0` with three rule types:

- `shield({ mode: "LIVE" })` — Blocks common attack patterns
- `detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE", ...] })` — Blocks malicious bots while allowing Googlebot, Bingbot, and preview bots
- `slidingWindow({ interval: "1m", max: 60 })` — 60 req/min rate limit globally, 10 req/min for AI routes

The middleware matches all routes except `_next/static`, `_next/image`, and `favicon.ico`.

### Firebase Push Notifications

`lib/firebase-messaging.ts` implements lazy-loading Firebase Cloud Messaging. The module only imports Firebase in the browser (`typeof window !== 'undefined'` guard). Three exported functions: `subscribeToNotifications()` (requests permission, returns FCM token), `onForegroundMessage()` (registers a callback for foreground push payloads), and `getMessaging()` (internal lazy initialiser). The service worker at `public/firebase-messaging-sw.js` handles background push. All Firebase config values use `NEXT_PUBLIC_FIREBASE_*` environment variables.

### Vercel Analytics

`<Analytics />` from `@vercel/analytics/next` is included in `app/layout.js`. This provides automatic page view tracking and Web Vitals reporting without any configuration.

### Google Tag Manager

GTM (`NEXT_PUBLIC_GTM_ID=GTM-5ZMQ7H4M`) is loaded conditionally in the root layout. GTM allows adding additional tags (GA4, Hotjar, custom events) without code deployments.

### PostHog

`NEXT_PUBLIC_POSTHOG_KEY` (previously incorrectly named `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`) provides product analytics. PostHog's session recording and funnel analysis helps understand where users drop off in the checkout flow.

### Hotjar and Crisp

Hotjar (`NEXT_PUBLIC_HOTJAR_ID`) provides heatmaps and session recordings. Crisp (`NEXT_PUBLIC_CRISP_WEBSITE_ID`) provides live chat. Both are loaded conditionally in the root layout — they only initialise when the environment variable is present, making local development cleaner.

### Schema.org @graph in Root Layout

The root layout renders a single `application/ld+json` script containing a `@graph` array with `WebSite` and `Person` structured data. This is the recommended pattern for personal brand sites — Google can understand the site's identity from a single structured data block on every page.

---

## 13. What Was Learned

Building this project from a basic portfolio to a full-stack commerce platform in under a year produced several lessons:

**PayFast is specific.** The signature algorithm is well-documented but has subtle PHP-ism details (field order, URL encoding) that only become apparent when payments start failing in production. Always test with real amounts before announcing live.

**Store prices in cents.** Integer arithmetic never has floating-point errors. Every display layer divides by 100. Never store prices as decimals in a database.

**RLS is a feature, not overhead.** Supabase RLS caught several cases where a route would have accidentally exposed data. Designing the RLS policies at migration time (not patched in later) meant the security model was correct from the start.

**Middleware is the right place for security headers.** Setting headers in `next.config.js` works for static responses, but middleware runs on every request including API routes and redirects. Putting security headers in middleware ensures nothing is missed.

**Animation systems need mobile budgets from day one.** The `disableOnMobile`, `mobileSpeed`, and `respectReducedMotion` props on every animation component were designed in before they were needed. Retrofitting animation performance on mobile is much harder than designing for it upfront.

**Idempotency in webhooks is non-negotiable.** PayFast can send duplicate webhook notifications. The idempotency check (`order.payfast_payment_id === pfPaymentId && order.status === status`) prevents double-processing and double-emailing customers.

---

*Last updated: 2026-06-13. Reflects the state of the codebase at that point. Update as major features are added.*

---

## 14. The House of Roses — Phase 1: The Reading Room (2026-07-19)

The site began turning from a portfolio-with-a-shop into **a house you wander** (spec: `docs/HOUSE_OF_ROSES.md`). The unifying idea: each section becomes a *room*, and **every poem ends on a doorway word that opens the next room** — reading as wayfinding. Phase 1 delivered the flagship: **The Reading Room**.

### What was built

**The immersive layer, laid over what already existed.** The reader at `/poetry/collection/[slug]` (85 file-based poems, mood-wash, hearts, roses, audio, backstory, translations) was kept as the plain, SEO-indexed surface. The Reading Room is a new experience layered on top at `/poetry/collection/[slug]/room` — a server component (canonical → the plain page, `noindex`) rendering a client orchestrator.

- `components/room/ReadingRoom.tsx` — the orchestrator: a full-screen mood-washed overlay, three depth modes, the reveal, the ending, marginalia.
- `components/room/LineReveal.tsx` — the poem arrives line-by-line in its own *breath* (`tempoMs`, derived from length or set per-poem); stanza breaks hold a longer beat; Space/→ advance, Enter reveals all; **instant in reduced-motion / Plain / Annotated**.
- `components/room/AmbientCanvas.tsx` — drifting petals / ink / light on one Canvas (no deps, offline-safe), capped at 26 particles, paused on tab-hide and reduced-motion.
- `components/room/DepthToggle.tsx` — **Plain · Room · Annotated** (the SEO-safe read · the paced immersion · Nanda's line commentary + reader whispers).
- `components/room/Marginalia.tsx` — tap a line to read its story and leave a 280-char whisper; Nanda's own annotation pinned at top.
- `components/room/PetalEnding.tsx` — "How did it leave you?" → leave a petal + tag a **feeling**; the poem shows its bloom count and **aura**; then the **doorway word** hands the reader onward.
- `components/room/VoicePlayer.tsx` — wraps the existing `PoemAudio`; a seam for the future ElevenLabs voice pipeline.

**The Salon (unique reviews, not stars).**
- Migration `026_reading_room_salon.sql` — `poem_petals` (one petal per reader per poem, optional feeling, unique constraint, soft-delete) and `poem_marginalia` (line-anchored whispers, auto-approved, soft-delete). Service-role RLS, following the 024/025 convention.
- API: `/api/poetry/poems/[slug]/petal` (POST/DELETE/GET — leave/withdraw a petal, read the bloom + feeling aggregate) and `/api/poetry/poems/[slug]/marginalia` (POST/GET). Both mirror the proven `resolvePoem` auto-create pattern from the rose route.
- `lib/feelings.ts` — six curated feelings (longing, tender, seen, undone, emboldened, at-peace), each with an aura colour from the mood palette.
- `lib/reading-room.ts` — pure logic: line splitting, tempo, doorway-word extraction, and the `ROOMS` map that resolves a doorway to a real room (Crown → `/sanyu`, Roots → `/poetry/lineage`, Forge → `/poetry/poet-who-codes`…) or the next kindred poem.

**The visual atlas (design-system foundation).**
- `lib/house-assets.ts` — one curated source of truth: mood paintings, the full `/assets/background images` pool sorted by *tone* (navy-night, jewel, bloom, pink-tender, stained, aurora, abstract), Nanda's portraits **placed by room** (Atrium/Crown/Roots/Forge), a gallery pool for the rest, and the ambient film list. Nothing generic; every asset accounted for; the chat-screenshot deliberately excluded.
- `components/room/RoomBackdrop.tsx` — the Mirembe-style premium backdrop (photograph + colour scrim + vignette + grain) that Phase 2 rooms will use.

**Routing.** `next.config.js` gained forward-compatible `/library` → `/poetry/collection` aliases (the spec's vocabulary as URLs, without renaming 85 indexed poems). The plain reader gained an **"Enter the Reading Room"** invitation.

### What was learned

**Reuse beat greenfield, decisively.** The spec assumed a green field; recon (two parallel Explore agents + Supabase MCP) found the mood-atmosphere system, the reader, and the hearts/roses APIs already built. The Reading Room became an *enhancement layer*, not a rebuild — and the migration shrank to two tables because a petals pattern (`guest_poem_petals`) already existed.

**Keep poem content in the file, interaction in the DB.** Poems live in `lib/poems-data.ts`; Supabase holds only counts and reactions (auto-created on first touch). Room metadata (tempo, doorway, annotations) became optional fields on the file's `Poem` interface with derived defaults — so no empty DB columns violate "every backend has a working frontend."

**The local build env is not the test.** OneDrive makes `next dev` pathologically slow (261s to ready, 183s to compile one route) and leaves git-tracked binaries (`/assets/art/*`) unmaterialized locally. Verification came from `tsc` (zero new errors), a live route render (HTTP 200 with the right poem + mood), the marginalia API (200), and exercising the petal upsert/aggregate directly against the live schema via Supabase MCP. Vercel builds from git and is unaffected.

*Phase 1 shipped and verified 2026-07-19. Next: Phase 2 — the Atrium path-chooser, the living garden, and the narrative rooms (Roots, Crown, Forge) dressed from the visual atlas.*

---

## 15. The House of Roses — Phase 2a: The narrative rooms come alive (2026-07-19)

Where the visual atlas met the rooms. Nanda's own photographs and the background pool — previously catalogued in `lib/house-assets.ts` but unused — were woven into three existing rooms **without rebuilding them**.

- `components/room/PlacedPortrait.tsx` — a reusable, hook-free editorial figure (photograph + kicker + caption + accent seam + soft frame). No `'use client'`, so it renders in both the client poetry rooms and the server-rendered `/sanyu`.
- **The Roots** (`app/poetry/lineage/page.tsx`) — a `stained`-tone `RoomBackdrop` behind the hero, and both roots portraits (`portraitsForRoom('roots')`: Nanda + her mother at graduation, and the forest canopy) placed between the Kiganda naming and the four houses.
- **The Crown** (`app/sanyu/page.tsx`) — the natural-hair portrait placed inside "The Name Means Joy," at the heart of the hair-ritual → Sanyu origin. (No backdrop here — the page's forest-green botanical palette is left intact; only the portrait was added, gold-accented.)
- **The Forge** (`app/poetry/poet-who-codes/page.tsx`) — a `navy-night` `RoomBackdrop` behind the hero, and the in-studio drums portrait placed before the Mirembe bridge as "a third tongue" (rhythm, before code and verse).

**Learned:** the atlas paid off immediately — dressing three rooms was a handful of drop-in edits (`<RoomBackdrop tone=.. />` + `portraitsForRoom(room).map(...)`), because the placement decisions lived in data, not markup. Palette discipline matters per room: the poetry rooms share the navy/gold House vocabulary, but `/sanyu` has its own green botanical identity, so it got the portrait but not the navy backdrop.

*Phase 2a shipped 2026-07-19 (tsc clean). Still open in Phase 2: the Atrium path-chooser + living garden (deferred — it touches the user-built magazine-cover homepage), and Library browse-by-feeling + View Transitions.*

---

## 16. The House of Roses — Phase 2 complete + the design elevation (2026-07-19)

A long, fast, iterative session took the House from a dark first pass all the way to Nanda's premium standard, then filled in the remaining rooms and the wider site. Everything below is **live in production** on creativelynanda.co.za, shipped across PRs #2–#8 (each preview-verified green on Vercel before merge). Working branch: `feat/house-of-roses-reading-room`.

### The design elevation (the pivotal correction)
Nanda's feedback drove a full visual re-think. Her design language (studied from mirembemuse.co.za / sanyubotanicals.co.za / varsityos.co.za): **photographs breathe at near-full strength**, warm **gold** metal, serif elegance, film grain, and only a *whisper* of veil. My first pass did the opposite (heavy navy scrim) — the exact mistake to avoid, since her brand is built on imagery.

- **Textured image cards** — `RoseCard`/`FeaturedRoseCard` rewritten: each poem wears a photograph from its mood's pool (varied by id), cream type over a light mood-tinted foot-veil, slow zoom + lift on hover. No more flat colour boxes.
- **`RoomBackdrop`** gained an `image` prop (art-directed backgrounds) + a **very light veil** engine (default veil 0.22, intensity 0.95, gentle edge-weighted tint). `lib/moods-atmosphere.ts` `tint()` rewritten much lighter; the garden's resting background became Nanda's cherry-blossom sunset.
- **Legibility now rides on text-shadows + smoked-glass panels**, not blanket scrim.
- Fire mood: swapped jewel *crystals* → *bloom* florals ("a garden, not a jewel box").
- The **book cover** (`official-cover.jpg`) sits gold-framed in the garden's corner, linking to the book.

### Art-directed page backgrounds (Nanda's own labelled files)
She renamed pool images to intent-named files in `public/assets/background images/`, wired via `PAGE_BACKDROPS` in `lib/house-assets.ts`:
`poetry-collection-background` (garden), `poetry-lineage-background` (Roots, indigo feathers), `poet-who-codes-header` + `poet-who-codes-background` (Forge), `poetry-community-background` (Circle), `poetry-erasure-background` (Erasure). Plus later, `navy-floral` for **My Garden** and the navy+gold ginkgo (`download (41).jpg`) for **the Crown** story.

### Rooms finished
- **The Stage** — cinematic performance-still hero + a page→stage storyline + editorial pull-quotes.
- **My Garden** — midnight-floral background, the personal plot.
- **The Crown** (`/sanyu`) — regal navy+gold ginkgo botanical behind "The Name Means Joy" (where the hair-journey portrait lives); green brand identity kept.
- **Continuous room transitions** — `app/poetry/template.tsx` (opacity-only, so the fixed Reading Room overlay isn't re-anchored; atmosphere persists via the layout).
- **Library browse-by-feeling** — mood pills on the garden that filter + wash the atmosphere.

### Beyond the poetry world
- **Nav reshuffle** — `components/layout/Navigation.tsx` (the ACTIVE nav; `components/Navigation.tsx` is dead code): "Poetry" is now a dropdown of all rooms (desktop hover / mobile expanded), `pathname.startsWith('/poetry')` active state.
- **Gallery → "The Studio"** (`app/gallery/page.tsx`) — rebuilt with Nanda's own photographs only, in **circular gold-ringed frames** (Portraits / Culture / Performance / The Book). Removed the abstract `/assets/art/*` "Art" fillers that were never hers.
- **Poet Who Codes** — a "Beneath the code" **soul-layer** section: the *range* of the craft (RAG/multi-agent AI, RLS multi-tenancy, offline PWAs, strict TS, 11 SA languages, WhatsApp/PayFast) as the poet's technical vocabulary — deliberately **not** a project catalogue (deep details live at Mirembe). Closes: "a poem is architecture you can feel; a codebase is a poem that has to run."
- **Education** — cinematic graduation still (`mom-me-grad.jpg`, Nanda and her mother) behind the existing real NMU/tech-arc content.

### What was learned
- **Match the client's aesthetic, don't impose a default.** The navy-scrim misstep cost a round; her "I love my colours, very light veil" is now the rule (saved to memory as `nanda-design-language`).
- **The OneDrive local env can't verify** (next dev 4+ min). Trust `tsc --noEmit` + the Vercel **preview** deployment (check `gh api repos/.../commits/<sha>/status` when the Vercel MCP is flaky) → merge via `gh pr create`/`gh pr merge` → production. Verify live with `curl -o /dev/null -w '%{http_code}'`.

*Phase 2 shipped + user-approved 2026-07-19. Still open: the **Atrium** homepage path-chooser + living garden (deferred — touches the hand-built magazine-cover homepage; needs Nanda's explicit go-ahead), native shared-element View Transitions, and Phase 3 (ElevenLabs voice, Upstash Vector mood search, RAG talk-to-the-poet, Journal Builder, Rose Society membership).*

---

## 17. The Editorial Magazine — full soul-site rebuild (2026-07-21)

Nanda's brief: this is a **premium editorial magazine** — a story arc, features, journeys, felt as an
experience, curated with "the eye of an artist." Background-images are the *canvas*; her photos/videos are
the *soul* laid over it. No mass image dumps; image **families**, not single picks; all the ways a gallery
can be told. Writing in a poetic, descriptive voice.

### Media pipeline → Cloudinary
Her assets were ~490MB (273 images avg ~1MB, one 9.2MB; 28 videos 210MB) — too heavy for the repo and the
local OneDrive+sharp optimizer (2min+/image). Moved ALL site imagery/video to **Cloudinary**:
- `scripts/upload-to-cloudinary.mjs` / `upload-folder.mjs` / `upload-one.mjs` (read `.env.local`, mirror
  `public/assets` paths as `creativelynanda/<...>` public_ids). Two >10MB images were ffmpeg-downscaled to
  fit Cloudinary's 10MB upload cap.
- `lib/cloudinary.ts` — `cldVideo()` / `cldVideoPoster()` (poster frames generated on-the-fly via `so_`).
- `components/media/AmbientVideo.tsx` — muted, looping, in-view-only, reduced-motion→poster.
- Images via `<CldImage>` (next-cloudinary). Verified: 2.8MB hero→344KB, 9.2MB→1MB, AVIF/WebP per browser.

### Vision docs (in `project-docs/asset-catalog/`)
Full visual pass over every image + all 28 videos (ffmpeg frame extraction). Per-folder catalogs +
`MASTER-CATALOG-AND-PLACEMENT.md` (palette, seven movements, placement patterns), `IMAGE-FAMILIES.md`
(13 named portrait families, each with a gallery form), `ROOTS-CLAN-RESEARCH.md` (sourced clan history).

### Pages shipped (all live on production; maintenance mode turned OFF)
- **Home** — `components/home/CoverHero.tsx`: the OG magazine-cover aesthetic (gold spine, Bebas masthead,
  flanking coverlines, ticker, nebula, grain) rebuilt around the red-afro portrait as a **feathered oval**
  (elliptical mask, object-cover, responsive object-position dialed with Nanda) + seven-movement journey below.
- **Gallery** — 13 image families, each in its own form (single+marginalia, mosaic, diptych, plate+filmstrip,
  triptych, stacked spread, filmstrip, oval "vanity wall" veiled behind an opt-in). Poetic captions on
  hover/lightbox; plain `alt` kept for a11y/SEO.
- **Roots** — the Nseenene grasshopper clan of Buganda (ancestor **Nnandawula** = her namesake; motto,
  Wannyana→Kabaka Kimera, Apolo Kagwa), amaTshawe royal house, Msimango/amaHlubi izithakazelo — cultural
  imagery + umqombothi ambient video. Descent framed per Nanda's confirmation; family names as family memory.
- **About** — feature profile: the two tongues, four chapters (Poet/Stage/Turn-to-code/Woman).
- **Blog** — index → magazine contents page; article template → full-bleed feature (drop cap, gold pull-quotes).
  All Supabase data wiring preserved.
- **The Poet Who Codes** — dressed with maker imagery + code-as-poetry.
- **Poetry Games** (`/poetry/games`, replaces the erasure page which now redirects) — three real, working games:
  `WordSearch` (drag-to-find, placement algorithm, win detection), `MagneticPoetry` (free-drag word tiles),
  `FinishTheLine` (prompt + localStorage-kept lines). In `components/games/`.
- **Contact** — warm editorial rebuild; form + `/api/contact` wiring intact; business pointed to Mirembe.
- **Nav** (`components/Navigation.tsx`) — redesigned/extended: Poetry dropdown, grouped mobile drawer, brand
  "Nandawula". Removed the "PoetryTube — Coming Soon" section from `/poetry`.
- SEO: per-page metadata layouts refreshed (accurate keywords + common search terms).

### What was learned
- **Cloudinary is mandatory here** — the local env cannot optimize/serve her real photos.
- **Screenshots of the animated live pages fail** (the cover's continuous motion times out the Chrome
  capture tool; static pages are fine) — visual tuning went via Nanda's eyes + `curl` HTML checks.
- **Deploy cadence:** build against production via `vercel deploy --prod` (each increment), Nanda reviews live.

## 18. Ship the rebuild + a full front-end review pass (2026-07-27)

The editorial rebuild (§17) had been sitting on `feat/house-of-roses-reading-room` as a Vercel
**preview only** — never PR'd to `main` — so production served the old design for ~5 days. Merged it
(the new magazine cover, seven-movement journey, Cloudinary media, KuGompo City, poetry games all went
live), then did a proper full-site audit.

### The review (Playwright over all 39 public pages, desktop + mobile)
Installed `playwright` in a clean non-OneDrive dir and drove **system Chrome** (`channel: 'chrome'`, no
browser download — local npm/OneDrive is too slow). Swept every page at 1366px + 390px, measuring
horizontal overflow, broken images, and console errors. Findings → fixes:
- **Broken images (P0):** `lib/house-assets.ts` is a *local* visual atlas — `PORTRAITS` + `RoomBackdrop`
  serve `/public/assets/*.jpg` **directly** (not Cloudinary). A source-photo reorg had moved files into
  themed subfolders, so the hard-coded root paths 404'd on lineage / sanyu / the poem reader. Repointed
  the atlas + swapped a missing `50+ Best Dark Blue…` backdrop for the real `Marine Blue…` file.
  **Rule burned in: never exclude jpgs in `.vercelignore` or move `/public/assets` without updating this atlas.**
- **Mobile overflow (P1):** ~20px sideways scroll on 32/39 pages → `overflow-x: clip` on `html`+`body`
  (clip, not hidden — keeps sticky/fixed nav) + the footer bottom row set to `flex-wrap`.
- **Hydration (P2):** React #425/#422 site-wide traced to `Footer.tsx` computing `new Date().getFullYear()`
  during render → moved to `useEffect`. Re-uploaded a missing Heritage Cloudinary video; `prefetch={false}`
  on the `/upgrades` → `/projects` links (that route 308s cross-origin to Mirembe → RSC-prefetch CORS).
- **The chat overlap:** `NandaAssistant` (fixed bottom-left mascot) now starts minimized (small corner
  avatar) on the home route so it never covers the cover; full character still shows elsewhere + on click.

### The mistake worth recording
I also **recomposed the mobile magazine cover on a guess** (portrait-right / coverlines-left). It was
width-fragile — clipped the masthead at 360px and broke Nanda's symmetric composition. She called it, and
it was **reverted**. Lesson: the `CoverHero` magazine cover is the crown jewel — **no cover redesign without
Nanda's visual review first.** The original centered cover is the baseline.

### Small correction
Clan name spelling fixed site-wide: **Msimango → Msimanga** (her family's spelling) across all user-facing
pages/metadata/footer; internal source-citation doc + external URLs left as their published spelling.

### What was learned
- **Vercel PREVIEW deploys are SSO-gated** → headless Playwright captures the login wall (false-clean).
  Verify on **public production** instead.
- **`house-assets.ts` is a local atlas, not Cloudinary** — asset housekeeping must keep its paths in sync;
  real deploy-trimming needs that atlas migrated to `<CldImage>` (open follow-up).
- **Don't redesign her signature surfaces unprompted.** Fix bugs freely; treat composition/aesthetics of the
  cover as review-first.

## 19. The Revolution Plan — creative direction for every wing (2026-09-27)

A full creative-direction pass over every page and feature, answering one question Nanda posed:
*"What would someone of this calibre show, in every one of her reigns, on her own site?"*
The plan of record. Build order is at the end. **Step 1 shipped 2026-09-28 — see §20. Step 2 shipped 2026-09-28 — see §21. Step 3 (Dojo + Incident Replay) shipped 2026-09-28 — see §22. Step 4 (the press) shipped 2026-09-28 — see §23.**

### The governing idea: one mind, two languages
Most portfolios show **work**. This one should show **how she decides** — and her poetry and her
engineering already run on the same method: a line break is a design decision; an architecture
choice is a line break. Every wing becomes an **instrument the visitor uses**, not a page they read.
She is the rare poet who can build her own instruments — so the site should be full of them.

### 0. Accuracy first — the Education page does not match the certificates
Audit of `app/education/page.tsx` `CERTS` against the real files in `/public/certificates`:

| Page says | Certificate says |
|---|---|
| Human-Centered Design · IDEO · 2024 | *The Field Guide to Human-Centered Design* · Canva Design School · 30 Sep 2025 (ID b9ebd9) |
| Graphic Design Essentials · "Online Academy" · 2024 | Canva Design School · 29 Sep 2025 (ID 2ff694) · 45 min |
| SheCodes Plus · 2025 | **Three** certs: Basics *Intro to Coding* (1 Jul 2025) · Basics Add-on *Intro to Web Development* (22 Jul 2025) · **Plus *Web Development* (26 Feb 2026)** — Delac / SheDreams Foundation supported |
| Master Generative AI Professional · 2025 | *Master Generative AI* — "professional online course" · Great Learning · **13 Dec 2025** · verify `mygreatlearning.com/certificate/IEWIXPZJ` (file added 2026-09-27) |
| *(missing)* | *ChatGPT for Business Communication* · 19 Aug 2025 · verify SFBWQPHH |
| *(missing)* | *Hands-On with Google AI Studio* · 27 Aug 2025 · verify UWIVNAHO |
| *(missing)* | *Affiliate Marketing* · 23 Aug 2025 · verify YXVMXKDC |
| Google Digital Marketing & E-commerce · Coursera | **no file yet** — add the cert or remove the line |

Name on every certificate: **Nandawula Kabali-Kagwa**. Rule: nothing is listed that cannot be shown.

### 1. Education → the Honours Hall
- **Hierarchy by weight, not a flat grid.** Tier 1: three NQF qualifications + 15 distinctions
  (gold-leaf, museum-lit). Tier 2: structured programmes (FNB App Academy, SheCodes Plus). Tier 3:
  short courses in a cabinet. A 45-minute course beside an NQF 7 Advanced Diploma shrinks the diploma.
- **Gold threads.** The existing `connection` field becomes spatial: click a distinction module
  (e.g. Financial Management) → a gold thread draws to the code it became (AdminOS ZAR token budget).
- **Learning curve vs shipping curve.** Cert dates (Jul 2025 → Feb 2026) plotted on the same axis
  as real commits from `lib/data/forge-github.json`. Proof she learned *while* shipping.
- **Verifiable credentials.** Every Great Learning cert gets a live "Verify ↗" seal; certs open
  like documents lifted off a lectern, not thumbnails.

### 2. The Forge → from wall of text to workshop
The data is already structured (`Decision`, `Lesson`, `Scar` with broke/found/cause/fix/cost) — the
problem is only that it renders as prose.
- **Blueprint mode (dossiers):** each build as a live architecture diagram (Next.js · Supabase ·
  Claude · Redis · 360dialog); click a node → the decision made there.
- **Incident Replay (Scar Room):** each postmortem as a 5-step scrubber; cause withheld until you
  step to it; cost shown as a meter.
- **The Dojo (the shut room, opened):** real scars as puzzles — "here's the symptom, what's the
  cause?" — guess, then reveal. No mocked source needed: the scars ARE the drills.
- **Screening Room:** app recordings in device frames with chapter markers tied to decisions.
  Long Night → glowing 99-night heatmap. Commit Wall → 30-second timelapse of the year.
- **Room rule:** ≤ ~40 words above the fold; the full dossier lives in a drawer.
- **Media convention (set now):** `public/assets/project-screen-record/<app-slug>/01-name.mp4|png`
  → upload script → Cloudinary → manifest → the Screening Room fills itself.

### 3. The blog → a publishing house
- **An imprint with a masthead.** Retire "blog". Imprints: *Essays* (writing) · *Field Notes* (dev)
  · *Letters* (personal). Publish in **numbered issues** — the site already has Issue 002 on the
  cover and *The Engineer's Issue 003*; one issue calendar for the whole house.
- **Draft diffs.** Each essay's colophon (written in KuGompo City · N drafts) + a slider that plays
  the revision history as diffs. Version control for prose — only the poet who codes can print that.
- **Reading experience:** sidenotes, marginalia (reuse the Reading Room), drop caps, her voice
  reading the piece aloud.
- **Fact-checked.** The 10 `business` posts in `scripts/seed-blog-posts.ts` belong on Mirembe Muse
  (positioning rule). Claim-heavy titles ("cut costs by 85%") show their evidence inline.
- **Publish others** — an open contributor call with editorial standards (feeds §4 Belong).

### 4. Poetry → an institution, three pillars
- **READ — the Library.** *X-ray mode* on her poems shows the craft layer (why this break, what
  this sound is doing) — the Forge's "decisions" in the language of poetry. Curated reading paths
  through the canon and the oral traditions that made her (izibongo, Luganda forms), with commentary.
- **LEARN — the Atelier** (tools built by the poet — uncopyable): line-break playground (drag breaks,
  watch meaning shift) · live sound map (assonance/alliteration/rhyme light up as you type) · form
  library (sonnet, ghazal, praise poem as interactive templates) · apprenticeship paths that grow
  the visitor's My Garden.
- **BELONG — the Circle:** weekly prompt + shared public garden · workshop circles with structured
  rose/thorn/bud feedback · audio open mic on the Stage · real-time exquisite corpse (Supabase
  realtime) · erasure over public-domain texts · **the loop:** the best community poems are
  published in the next issue of the press. People return to be published by her.

### 5. Deeper gaps — what separates "impressive" from world-class
Found on a second, harder pass:

1. **Content debt is the #1 risk.** `lib/poems-data.ts` has **85 poems**; the backstory / audio /
   translation layers are defined in the type but **filled on none of them**. Rooms are being built
   faster than they are filled. Rule: *no new room ships without the content to fill it* — each phase
   gets a content budget (e.g. 10 X-ray poems, 12 audio readings) before the code.
2. **One name, one entity.** Certificates say *Nandawula Kabali-Kagwa*; the site leads with
   *Nandawula Regine*. Search engines and AI assistants can treat these as two people. Fix: one
   canonical name in Person JSON-LD with `alternateName`, complete `sameAs`, and a **Wikidata**
   entry → Knowledge Panel.
3. **Be legible to AI.** No `llms.txt` and no RSS/JSON feed exist. People now ask assistants
   "who is…". Add `/llms.txt` (a curated factual profile), RSS + JSON Feed per imprint, and rich
   schema: `Book`, `CreativeWork`, `Course`, `Event`, `PodcastEpisode`,
   `EducationalOccupationalCredential`.
4. **A living portfolio — "The Observatory" / `/now`.** Live, API-sourced signals: apps up (Vercel),
   commits this week (GitHub), latest poem, current issue, what she is working on this month. Every
   number measured, never typed (the Forge rule, site-wide). Fed by a private→public push bridge
   from JarvisOS, not a merged DB (see the open Supabase merge question).
5. **The seam between wings — the Chronicle.** One timeline where the Long Night calendar overlays
   poems written the same night and certs earned the same month. The most direct proof of
   "one mind, two languages".
6. **Her voice as a medium.** She performs and has radio and stage footage. A site-wide *Listen*
   layer (her narration), a radio/podcast room, and a **speaker kit** (talks, topics, reel,
   booking) — thought leadership is currently missing entirely.
7. **Built for South Africa, visibly.** *Data-lite mode* (no autoplay video, compressed imagery —
   respects SA data costs); download-an-issue-offline for load-shedding (the PWA already exists).
   Publish real Lighthouse/accessibility scores as a proof-of-craft page. WCAG AA is the floor.
8. **Community safeguarding before community launch.** POPIA consent, an age gate (minors will
   write here), authors keep copyright (clear licence on submissions), moderation queue (existing
   `poem_roses` status), soft delete only, and a crisis-resource response for poems touching
   self-harm (SADAG helpline). Emotional writing communities need this on day one.
9. **A Reader's Card.** One identity across wings (session-first, optional magic link): what you
   have read, Dojo score, poems planted, issues collected. Returning visitors resume where they left.
10. **Findability inside the house.** With 40+ rooms: a drawn house map + a ⌘K command palette
    searching poems, dossiers, scars, essays. Reposition NandaAI as the **docent** — answers only
    from site content and cites the room it came from.
11. **Patronage, not ads — "The Rose Society".** Membership tiers via PayFast subscriptions: early
    issues, a monthly workshop, critique from Nanda, signed *Inside Her Roses* editions + pre-orders
    for the next collection. Makes the community sustainable. (Creative patronage lives here;
    services stay on Mirembe Muse.)
12. **Give the ladder back.** A *Start Here* path for aspiring (especially Black women) developers —
    her real route (SheCodes → FNB App Academy → shipping) as a sequenced, honest syllabus.
13. **Show the system.** A colophon/design-system page (seven grounds, type, motion principles,
    image families) + `/uses`. Designers judge a studio by its system.
14. **Measure what matters.** Define success events before building: read-to-end, Dojo completions,
    return visits, submissions, members — as Vercel Analytics custom events.

### Build order (recommended)
1. Education accuracy fix + Honours Hall (certs are here now; accuracy is urgent)
2. Entity + AI legibility (one name, Wikidata, llms.txt, feeds, schema) — small, compounding
3. Forge: Dojo + Incident Replay → Screening Room when recordings land
4. The press: issues, reading template, draft diffs
5. Content sprint: X-ray + audio for the first 10 poems (pays down content debt)
6. Poetry Atelier tools
7. Safeguarding → the Circle community loop → the Rose Society
8. Observatory / Chronicle / Reader's Card

### Principles carried forward
- Nothing listed that cannot be shown; every number measured, never typed.
- No room without its content. Curation beats volume.
- Poetry and engineering share one design language: *decisions made visible*.
- CreativelyNanda = the making; Mirembe Muse = the outcomes.

## 20. The Honours Hall — Revolution Plan step 1 shipped (2026-09-28)

Build order step 1 from §19: fix the Education page's accuracy, then hang the certificates properly.

### One source of truth — `lib/data/credentials.ts`
Nine credentials, each transcribed from its file in `/public/certificates` (title, issuer, date and
credential ID as printed — never from memory). The hero counts, the Hall, the Ledger pins and the
page's JSON-LD all read this one file, so there is no second place a number can drift. The §19.0
audit corrections are all in: both Canva Design School courses re-credited and re-dated (Sep 2025),
the three SheCodes certificates split out, the four Great Learning courses with live verify links,
and Google Digital Marketing **removed** until its certificate exists. The file's header documents
the add-a-certificate recipe (file → entry → real pixel size → optional `crop`).

### What the page now does
- **`HonoursHall.tsx`** — hung by weight, not count. *II · The Path* (SheCodes, three steps, Jul 2025
  → Feb 2026, FNB App Academy marked "in progress"), *III · The Cabinet* (short courses, one shelf per
  issuer). Any frame opens **the Lectern**: the certificate full size beside the facts as printed,
  verify link where the issuer offers one (Canva doesn't — the page says so), ← / → / Esc, focus
  returned to the frame on close.
- **`LearningLedger.tsx`** — cert dates pinned over 52 weeks of real commits (3,085 across the 12 repos
  the Forge measures), summed server-side from `forge-github.json` so the 1.2 MB corpus never reaches
  the client.
- **`GoldThreads.tsx`** — the `DEGREE_IN_CODE` modules drawn to the code they became.
- **`app/education/page.tsx`** is now a server wrapper (the old client page moved to
  `components/education/EducationView.tsx`) emitting `ProfilePage` → `Person` JSON-LD with every
  credential as `EducationalOccupationalCredential`, and both names declared (`alternateName`:
  Kabali-Kagwa / Regine) — the first piece of §19.5 item 2.
- Tech-arc cert labels corrected to their real dates; "Hons. Cert." → "Higher Cert.".

### What was learned
- **The page was wrong in public for months and nobody noticed — because nobody could check.** The
  moment certificates became clickable documents, every mismatch became visible. Showing the proof
  is also what forces the claims to be true.
- **Local `next/image` on this laptop takes ~70 s per PNG on first request** — frames look blank in
  dev screenshots. Wait for `naturalWidth > 0` before judging; not a production issue.
- `tsc --noEmit` is clean for every new file; the repo still carries ~15 pre-existing errors
  (firebase/sentry not installed, `liveUrl`, `images`, `NandaGirl` props) — a separate cleanup.

## 21. One name, one entity — Revolution Plan step 2 shipped (2026-09-28)

Build order step 2 from §19: make the site legible to search engines and AI assistants.

### One entity — `PERSON_ID`
The audit found **15 separate `Person` objects** across the site's JSON-LD (every Forge room, the
engineer feature, education, blog and poem schema), none sharing an `@id`. To a search engine that
is fifteen unconnected people, only some called Kabali-Kagwa. Now `lib/seo.tsx` has `PERSON_ID`
(`/#person`), and every author/publisher/about points at it via `personRef()`. The full record lives
once, in the root layout. It gained `givenName`/`familyName`, "Nandawula Kabali-Kagwa" (the
certificate name) in `alternateName`, both nationalities, *Poet* as an occupation, and a description
that says she is a poet. It had only described the engineer, and it quoted typed numbers
("7 live AI products, 3,000+ commits") that had already drifted. `SAME_AS` is one list, and
`WIKIDATA_ID` joins it the moment it is set.

### Wikidata — prepared, not published
`project-docs/wikidata-entry.md`: label, aliases, the statements with property ids, and a notability
warning. A self-created item without independent references (press, ISBN, NMU) gets deleted. It is a
public edit under her identity, so Nanda creates it; then one constant changes.

### Legible to AI and to readers
- **`/llms.txt`**: a factual profile generated from the site's own data. Poem, certificate, dossier and
  scar counts are computed, so it cannot drift. It names both identities as one person and points
  business readers to Mirembe Muse.
- **Feeds**: RSS 2.0 + JSON Feed 1.1 at `/feed.xml`, `/feed.json`, and per imprint
  `/feed/{essays|field-notes}.{xml|json}`. Only the two CreativelyNanda imprints (writing → *Essays*,
  dev → *Field Notes*); `business` belongs on Mirembe Muse. Source is Supabase only. The seed file's
  dates are `new Date()`-relative and would re-date every entry on every deploy. Discovery `<link>`s
  are declared in `createMetadata` too, because a page's `alternates` replaces the root's.

### Two indexing bugs found on the way
- **8 pages canonicalised to the wrong URL.** `/roots`, `/testimonials` and the three legal pages
  inherited the root layout's `canonical: '/'`, and `/poetry/stage`, `/games` and `/my-garden`
  inherited `/poetry`'s. Each told Google it was a duplicate of another page. That hit `/roots`
  hardest, the heritage page. Fixed with explicit canonicals, plus new layouts for the two client pages
  that had no metadata at all.
- **The sitemap declared no poem and no article.** It had 46 URLs and now has 151: all 82 poems and the
  23 essays/field notes, with real modified dates, revalidated hourly.

### What was learned
- **Identity is a graph, not a string.** Writing the same name in fifteen places does not make one
  person. One `@id` that everything references does.
- **A page that sets no metadata still makes claims.** It inherits the parent's canonical. Sweep every
  sitemap URL's live canonical after any metadata change (script in this entry's commit message).
- The old dev server keeps serving hot-reloaded code after its task is stopped. A "Jest worker
  child process exceptions" 500 was memory starvation, not the route. Kill the port and restart.

## 22. The Dojo opens, and the scars replay — Revolution Plan step 3 (2026-09-28)

Build order step 3 from §19: turn the Forge from a wall of text into a workshop. The Dojo and
Incident Replay are built. The Screening Room is deliberately **not** built yet: the only recordings in
`public/assets/project-screen-record/` are the six foundation-project clips the site already uses,
and §19.5 item 1 says no room ships without its content.

### The Dojo — `/forge/dojo`, opened without the bridge
The door had been shut since August, waiting on 74 drills in JarvisOS's `engineering_dojo_drills`
behind a push bridge that doesn't exist. §19 found the way round it: **the scars are the drills.**
`lib/data/forge-drills.ts` turns eight Scar Room incidents round. Each gives the symptom exactly as it
arrived, a hidden *trace* you can ask for, and 3–4 candidate causes. Every candidate explains itself
after you answer, not only the one you picked, because the wrong answers are where the teaching is.
The writing rules are in the file's header:
- the symptom never contains the answer
- every wrong option is a hypothesis a competent engineer would actually have, and it is ruled out
  by evidence in the symptom, not by new facts about her systems
- answer positions are written, not shuffled, because a random order at render time is the
  hydration bug from drill 3

Your first answer per drill is kept in `localStorage` (`forge-dojo-v1`, try/caught), read in an
effect so server and client agree. A belt of eight pips carries the score. The essay entry
(`security-posture`) is never drilled. The page emits `Quiz` JSON-LD. Eight of nine Forge doors are
now open; only the Bench stays shut, because it needs live data, and faking it is still off the table.

### Incident Replay — the Scar Room
`components/forge/IncidentReplay.tsx`: each postmortem plays as a five-stop scrubber (broke → found
→ cause → fix → cost). The cause stays hidden until you step to it. The stops are WAI-ARIA tabs with
arrow/Home/End keys, and **Read it straight** lays all five out at once. Every panel stays in the
DOM (`hidden`, not unmounted), so search engines and no-JS readers still get the full text. The
cost step carries a **reach meter**: five notches from *Caught in the tooling* to *Every payment*.
It is an editorial rank read from each entry's own `cost`, so it is labelled in words and never as
a number. Each scar links to its drill, and each drill links back.

### Measured
New events: `forge_replay_complete`, `forge_drill_answer` (slug, correct, hinted),
`forge_dojo_complete` (score). No free text, same POPIA position as the rest of `lib/analytics.ts`.
This is §19.5 item 14's "Dojo completions", defined before launch rather than after.

### Verified
Preflight is clean (`forge-drills.ts` added to its sweep). `tsc`: no errors in any touched file
(repo total unchanged at 15, all pre-existing). Playwright desktop + 390px: answers persist across a
reload, the replay's keyboard nav works, Read it straight shows 5/5 panels, 0 px horizontal
overflow, no page or console errors.

### What was learned
- **A blocked room is sometimes blocked on the wrong premise twice.** The Commit Wall didn't need
  the bridge (§11), and neither did the Dojo. Before calling a room "Phase B", ask whether its content
  already exists in another shape on the site.
- **Withholding is the whole interaction.** The Scar Room always had the right order. Hiding the
  next step is what makes a reader stand where the engineer stood.

## 23. The House of Roses Press, and Issue 004 (2026-09-28)

Build order step 4 from §19: turn the blog into a publishing house. Decided with Nanda before
building: keep every `/blog/...` URL (indexed and in the feeds), keep the 11 business posts and 6
Notion guides live but off the masthead (Mirembe Muse has no journal yet), build the draft-diff
machinery but show it only where real drafts exist, and backfill issue numbers by date.

### The press
- **`lib/data/press-issues.ts`** holds the name, the imprints (*Essays* = `writing`, *Field Notes* =
  `dev`, *Letters* = declared and hidden until it has a piece), and **one issue calendar for the
  house**: 001 The Launch Issue (Jan to Apr), 002 Eight Apps, One Year (May to Jun), 003 The Making of
  an Engineer (the `/engineer` feature), 004 The Proof Issue (from 28 Sep). A piece belongs to the
  issue its date falls in.
- **`/blog`** is now the press's front page: masthead, the issue on the stands with its lead and
  contents, and the back issues. **`/blog/writing`** and **`/blog/dev`** are imprint pages grouped by
  issue, replacing two off-brand purple and blue templates.
- **Every reading page is server-rendered.** The old article page was a client component. The server
  sent a spinner ("Turning the page") and no text, so search engines and no-JS readers got nothing.
  The old index painted the seed file first, whose dates are relative to the build, so the server sent
  wrong dates on every request. Both now read Supabase through `lib/press.ts` (`React.cache`, so the
  layout's metadata and the page share one query), and a Supabase error throws, which under ISR keeps
  the last good page. A post requested under the wrong category 308s to its own URL.
- **`lib/press-render.ts`** replaces a browser-side regex chain (no links, and every blank line inside
  a code block became a paragraph) with a small server-side block parser. It escapes everything first
  and allowlists link schemes, so it is the whole XSS boundary. It adds **layout blocks**, so each piece
  can take its own shape: `chapter`, `statement`, `pull`, `aside` (floats into a margin column on wide
  screens), `figures`, `timeline`, `ledger`, `receipt`, `checklist`, `frames`. Styles live in
  `app/press.css`, a real stylesheet instead of the old runtime `<style jsx global>`.
- **Colophon** on every piece: imprint, issue, date, length, drafts on file, typefaces.
- **Draft Diff** (`components/press/DraftDiff.tsx`, `lib/diff-words.ts`): a word-level LCS diff between
  successive drafts, computed on the server, played with a slider. `lib/data/press-drafts.ts` is empty
  on purpose. No essay claims drafts it doesn't have. Nanda adds real drafts and the slider appears.
- JSON-LD: each piece is an `Article` with `isPartOf` → `PublicationIssue` → `Periodical`.

### Issue 004, The Proof Issue
Five pieces written from the build journals (JarvisOS, K53, True Access, Campus Compass/VarsityOS),
each with its own layout, **no em dashes** (house style from 2026-09-28, and enforced by the script):
1. *The Site Was Selling Half the Product* (Field Notes): the claim audit. **Ledger** layout.
2. *A Test Booklet in Your Pocket* (Field Notes): K53 on a budget Android. **Timeline + receipt.**
3. *Know Before You Go* (Essays): True Access and quiet failures. **Audit checklist.**
4. *What Nova Costs* (Field Notes): pricing an AI companion in rands. **Receipts.**
5. *The Index Is Not the Territory* (Essays): the Sanyu vault. **Contact sheet.**

Authored as markdown in `content/press/issue-004/`, so the text is version-controlled, and put into
Supabase by `scripts/publish-press.mjs`. It dry-runs by default, `--draft` keeps pieces unpublished
(proofread with `?preview=1`, dev only), and `--publish` keeps an existing `published_at`, so fixing a
typo never re-dates a piece into a later issue. It refuses to write if any piece contains an em dash.
Security specifics from the journals (webhooks, RLS gaps, data exposure) were deliberately left out.
Same rule as the Scar Room.

### A security hole found on the way, and closed
The live `blog_posts` table had an RLS policy `blog_posts_service_write`: `FOR ALL`, role `public`,
`USING (true)`. Anyone holding the anon key, which ships in every page, could insert, edit or delete
posts. Two unauthenticated endpoints, `POST /api/blog/posts` and `POST /api/blog/seed`, depended on it.
Both endpoints were removed (nothing called them), the policy was dropped with Nanda's go-ahead, and
it was verified: an anon insert now fails `42501`, an anon update touches 0 rows, and public reads
still return 39 posts. **A follow-up RLS audit of the other tables is the next security task.** The table-by-table findings are kept out of this public repository.

### What was learned
- **A client-rendered page makes no claims to a crawler.** The press's best writing was invisible to
  search until it rendered on the server.
- **Exports from a `'use client'` module are client references on the server.** `TEXTURES.marble` read
  from a server page became a module reference and crashed the render. Plain data used by server pages
  must live in a plain module.
- **A policy named `service_write` doesn't mean the service role.** Without `TO service_role`, a policy
  applies to everyone, and the service role bypasses RLS anyway, so the policy only ever granted anon.

## 24. The App Studio: a hundred real screens, and what they are for (2026-09-28)

§19.2 planned a Screening Room "when recordings land". The screenshots landed first: Nanda added
101 phone captures of VarsityOS, K53 Drill Master and Sanyu Botanicals (30 August 2026, a Huawei
browser, 1080×2400). She asked for mobile mock-ups and "a beautiful app studio", then asked for
something deeper than showing screens.

### Looked at before listed
Every capture was reviewed on contact sheets before anything was published. K53 and Sanyu are
clean. Many VarsityOS screens come from Nanda's own account: her name, university, budget, family
money, burnout score and lecturers' names. She chose to show them as they are. One screen, which
appears to show a home address, is left out. **`lib/data/app-screens.ts` is the hand-written
manifest** (app, chapter, caption, all 100). `scripts/upload-app-screens.mjs` uploads **only what
the manifest lists** to `creativelynanda/app-screens/<app>/<HHMMSS>`, so the excluded screen can never
leave the laptop. The source folders are git-ignored.

### `/forge/studio`: three distances, then two questions
- **The fan** (hero): one phone per product. **The screening**: per product, one horizontal
  scroll-snap filmstrip per chapter, so 19 Study screens cost one row. **The wall**: every screen at
  once, for scale. Any phone opens **the stage**: full height, arrows and keys, a thumbnail strip.
- **Journeys** answer "what is it like to use?": five real flows (*Five days of money left*, *The
  walk home*, *Will I graduate on time?*, *From wrong to right*, *From the jar to the cart*), played
  like stories with progress segments, tap zones and a narration line per screen. They auto-advance
  unless the reader prefers reduced motion. The narration describes the screen; it invents no user.
- **Anatomy** answers "why is it like that?": six screens with numbered pins on the parts that were
  decided. Where a build journal records the reason (full-fill answer feedback, code-filtered
  questions, SVG over emoji), the note cites it; otherwise it describes what the design does.
- Phones are drawn in CSS (bezel, punch-hole, buttons), so they scale crisply at no download cost.
  Screens wait on an accent gradient and fade in. Overlays render through a portal, because a
  transformed ancestor had trapped `position: fixed` in the bottom half of the page.
- Linked from the threshold (9 of 10 doors open), the nav, the sitemap, `llms.txt`, and each of the
  three dossiers. `SoftwareApplication` JSON-LD with screenshots.

### What was learned
- **A gallery answers one question. A studio answers three**: what it looks like, what it is like to
  use, and why it is like that. The screens were the easy part.
- **`trackOutbound()` returns a handler.** Wrapped in an arrow function it records nothing and throws
  nothing. Caught on review, in this room's own first draft.
