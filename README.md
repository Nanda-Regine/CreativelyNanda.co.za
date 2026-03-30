# CreativelyNanda.co.za

[![Live Site](https://img.shields.io/badge/live-creativelynanda.co.za-C1292E?style=flat-square)](https://creativelynanda.co.za)
[![Next.js](https://img.shields.io/badge/Next.js-14-000?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?style=flat-square&logo=vercel)](https://vercel.com)

Full-stack digital platform for Nanda Regine — creative technologist, software developer, and published author. Features a digital product marketplace with PayFast payments, a multi-language blog engine, poetry collection with community engagement, and a Supabase-powered admin dashboard.

## Architecture

```
Next.js 14 App Router
├── Server Components        → SEO metadata, JSON-LD structured data
├── Client Components        → Framer Motion animations, interactive UI
├── API Routes               → PayFast webhooks, engagement tracking, downloads
├── Server Actions           → Admin CRUD operations
└── Supabase (PostgreSQL)    → Products, orders, blog, poetry, analytics
```

### Key Technical Decisions

- **Per-route `layout.tsx` files** for SEO — all pages use `'use client'`, so metadata is exported from server-side layouts
- **Session-based engagement** — likes, views, and hearts tracked via `localStorage` session IDs (no auth required)
- **Database triggers** — `like_count`, `view_count`, `heart_count` auto-synced via PostgreSQL triggers on INSERT/DELETE
- **Token-based downloads** — purchase confirmation emails contain unique download tokens that resolve to signed Supabase Storage URLs

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | Supabase (PostgreSQL + Storage + RLS) |
| Payments | PayFast (ZAR) |
| Email | Resend + React Email |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| State | Zustand |
| Analytics | Google Analytics 4 + GTM |
| SEO | JSON-LD (Product, BlogPosting, BreadcrumbList, WebSite, Person) |
| Hosting | Vercel |

## Features

### Digital Marketplace
- 8 digital products (Notion templates, eBooks) with PayFast checkout
- Supabase Storage for secure file delivery via signed URLs
- Token-based download links with 7-day expiry
- Purchase confirmation emails in English, Afrikaans, and Zulu
- Google Shopping-compatible Product schema with `Offer` and `AggregateRating`

### Blog — The Current
- Supabase-backed articles with seed data fallback
- Category-based routing (`/blog/dev`, `/blog/writing`, `/blog/business`)
- Like, view, and review tracking with auto-synced counters
- Guest contributor system with featured people mentions
- `BlogPosting` JSON-LD for Google article indexing

### Poetry — Inside Her Roses
- 100+ poems with collection browsing and search
- Heart and view engagement tracking
- Community roses (moderated reviews)
- `CreativeWork` JSON-LD per poem

### Admin Dashboard
- Revenue, orders, products, and poetry metrics
- Order management with status updates
- Blog post CRUD with publish/unpublish
- Product and poetry management
- All data served from Supabase with RLS + service role

## Project Structure

```
app/
├── (pages)/          # 12 public routes with per-route SEO layouts
├── admin/            # Dashboard, orders, blog, products, poetry management
├── api/
│   ├── payfast/      # create-checkout, webhook (ITN handler)
│   ├── downloads/    # Token-based signed URL downloads
│   ├── blog/         # Like, view, review endpoints
│   ├── poetry/       # Heart, view endpoints
│   └── orders/       # Order lookup for success page
├── checkout/         # Success + cancelled pages
lib/
├── payfast/          # Signature generation, IP validation, config
├── email/            # Resend client, purchase confirmation, welcome
├── supabase/         # Server + admin clients
├── seo.tsx           # createMetadata(), JSON-LD generators
├── storage.ts        # Signed URL generation, download token validation
├── products-data.ts  # Product catalog (shared across pages + layouts)
├── poems-data.ts     # Poetry collection data
components/
├── animations/       # ScrollTrigger, ParallaxScroll, Card3DTilt, MagneticButton
├── ui/               # Button, Badge, Input, Modal, etc.
├── blog/             # LikeButton, ViewCounter, ReaderReviews
├── marketplace/      # ProductCard, CartDrawer, CheckoutForm
├── poetry/           # PoemCard, HeartButton, RoseForm
emails/
├── purchase-confirmation.tsx   # Multi-language order confirmation
├── welcome.tsx                 # Welcome email
supabase/migrations/
├── 001_blog_and_poetry_engagement.sql
├── 002_products_orders_storage.sql
```

## Getting Started

```bash
git clone https://github.com/Nanda-Regine/CreativelyNanda.co.za.git
cd CreativelyNanda.co.za
npm install
cp .env.local.example .env.local   # Fill in your keys
npm run dev                         # http://localhost:3000
```

### Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# PayFast
PAYFAST_MERCHANT_ID=
PAYFAST_MERCHANT_KEY=
PAYFAST_PASSPHRASE=
NEXT_PUBLIC_PAYFAST_SANDBOX=true

# Email
RESEND_API_KEY=
RESEND_FROM_EMAIL=hello@creativelynanda.co.za

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Database Setup

Run the SQL migrations in order via Supabase Dashboard > SQL Editor:

1. `supabase/migrations/001_blog_and_poetry_engagement.sql`
2. `supabase/migrations/002_products_orders_storage.sql`

## Deployment

Deployed on [Vercel](https://vercel.com) with automatic deploys on push to `main`. Environment variables are configured in the Vercel dashboard.

```bash
npm run build    # Builds Next.js + generates sitemap
```

## Author

**Nanda Regine**
Creative Technologist — Port Elizabeth, South Africa
[creativelynanda.co.za](https://creativelynanda.co.za) | [hello@creativelynanda.co.za](mailto:hello@creativelynanda.co.za)

## License

Copyright 2025-2026 Nanda Regine. All rights reserved.
