# 🚀 THE NANDA EMPIRE - MASTER BUILD DOCUMENT
## Claude Code Implementation Guide for CreativelyNanda.co.za

**Version:** 2.0  
**Last Updated:** January 31, 2026  
**Author:** Nandawula Regine Kabali-Kagwa  
**Project URL:** https://creatively-nanda-co-za.vercel.app/

---

# 📋 TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Nanda's Story & Biography](#2-nandas-story--biography)
3. [Brand Identity & Design System](#3-brand-identity--design-system)
4. [Tech Stack](#4-tech-stack)
5. [Project Structure](#5-project-structure)
6. [Page Specifications](#6-page-specifications)
7. [Animation System](#7-animation-system)
8. [Component Library](#8-component-library)
9. [Nanda Girl AI Character](#9-nanda-girl-ai-character)
10. [Nanda AI Sales Assistant](#10-nanda-ai-sales-assistant)
11. [Triple Blog Empire](#11-triple-blog-empire)
12. [Poetry Sanctuary](#12-poetry-sanctuary)
13. [Creative Marketplace](#13-creative-marketplace)
14. [Products Catalog](#14-products-catalog)
15. [Database Schema](#15-database-schema)
16. [Admin CMS](#16-admin-cms)
17. [Multi-Language Support](#17-multi-language-support)
18. [Email Templates](#18-email-templates)
19. [PWA Configuration](#19-pwa-configuration)
20. [SEO & Performance](#20-seo--performance)
21. [Implementation Order](#21-implementation-order)

---

# 1. PROJECT OVERVIEW

## The Vision
Transform CreativelyNanda.co.za from a portfolio into a **cultural destination** that combines:
- **LinkedIn** → Professional credibility + thought leadership
- **Amazon** → Seamless commerce + checkout
- **Etsy** → Creative marketplace + artisan story
- **AllPoetry/Wattpad** → Literary community + reading experience
- **Vogue Magazine** → Editorial luxury + visual storytelling
- **Medium** → Long-form content + authority building

## Core Principles
1. **Every page comes ALIVE** with Framer Motion animations
2. **Magazine-quality design** with editorial aesthetics
3. **Revenue-generating** from Day 1 with Stripe integration
4. **Multi-language** support (English, Xhosa, Afrikaans, Zulu)
5. **PWA-enabled** for mobile installation + offline access
6. **Ubuntu philosophy** - community over competition
7. **Accessibility** - WCAG 2.1 compliant

## Current State
- Basic Next.js portfolio deployed on Vercel
- Some sections exist but need enhancement
- No e-commerce integration
- No blog system
- Basic design without full animation system

## Target State
- Full magazine-style editorial experience
- Complete e-commerce with Stripe
- Triple blog system (Dev, Poetry, Business)
- Poetry Sanctuary with community features
- AI chatbot (Nanda AI) for sales assistance
- Nanda Girl character as visual guide
- Multi-language support
- PWA with offline capability
- Admin CMS for content management

---

# 2. NANDA'S STORY & BIOGRAPHY

## Personal Information
- **Full Name:** Nandawula Regine Kabali-Kagwa
- **Nickname:** Nanda
- **Heritage:** Half Ugandan, Half Sotho/Xhosa
- **Clan:** Nsenene clan, Hlubi, Thabizolo, Tshawe
- **Location:** East London, Eastern Cape, South Africa

## Timeline (ACCURATE)
| Year | Event |
|------|-------|
| 2019 | Gap year. Started at Sportsmans Warehouse |
| 2020 | Higher Certificate |
| 2021-2023 | Diploma (worked Sportsmans during holidays) |
| 2023-2024 | Balkan Burger (2 years) |
| 2024 | Advanced Diploma. Moved back home to East London |
| June 2025 | Started tech journey from home with laptop |
| 2025-Present | Building the Nanda Empire |

## Professional Profile
- **Title:** Creative Technologist, Published Poet, Founder
- **Company:** Mirembe Muse (Pty) Ltd
- **Education:** Bachelor of Commerce in Business Management, Nelson Mandela University (15 academic distinctions)
- **Skills:** Full-stack developer (self-taught), React, Next.js, TypeScript, Supabase, AI integration

## Published Work
- **Book:** "Inside Her Roses" - A Poetry Collection (2021)
- Featured on South African national TV and radio

## Philosophy
- **Ubuntu:** "I am because we are"
- Focus on affordable, accessible technology for African communities
- Community over competition

## Voice & Tone
- Professional but warm
- "I've been there" energy (empathy)
- Data-driven but human
- Ubuntu philosophy infused
- No corporate jargon
- Conversational but polished

---

# 3. BRAND IDENTITY & DESIGN SYSTEM

## Primary Colors
```css
:root {
  /* Core Brand */
  --navy: #0A1128;        /* Primary - deep, professional */
  --beige: #E8DCC4;       /* Secondary - warm, organic */
  --cherry: #C1292E;      /* Accent - bold, action */
  
  /* Extended Palette */
  --rose-deep: #8B0A1A;   /* Deep burgundy rose */
  --rose-blush: #D4A5A5;  /* Soft blush */
  --parchment: #F5F0E8;   /* Aged paper */
  --ink: #1A1A2E;         /* Deep ink black */
  --gold-leaf: #C9A961;   /* Gold accents */
  
  /* Mirembe Muse (Sanctuary Theme) */
  --forest-green: #2D5016;
  --sage-green: #9CAF88;
  --cream: #F5F1E8;
  --terracotta: #D4A373;
  --gold-accent: #C9A961;
  
  /* Dev Blog (Dark Mode) */
  --charcoal: #1e1e1e;
  --midnight-blue: #0d1117;
  --electric-cyan: #00d4ff;
  --code-green: #50fa7b;
  --amber: #ffb86c;
  --mint-green: #8be9fd;
  
  /* Writing Sanctuary (Soft) */
  --lavender: #e6d5f0;
  --gentle-rose: #ffd6e8;
  --warm-coral: #ff9a8b;
  --sunset-gold: #ffeaa7;
  --sage: #a8d5ba;
  --sky-blue: #c7ecee;
  
  /* Business Blog (Professional) */
  --professional-navy: #1e3a5f;
  --trust-blue: #2c5f8d;
  --emerald: #059669;
  --success-gold: #f59e0b;
}
```

## Typography
```css
/* Display/Headings - Elegant, literary */
font-family: 'Cormorant Garamond', serif;

/* Body Text - Clean, readable */
font-family: 'Inter', sans-serif;

/* Poetry/Literary Content */
font-family: 'Lora', serif;

/* Code Blocks */
font-family: 'Fira Code', 'JetBrains Mono', monospace;

/* Handwritten Accents */
font-family: 'Satisfy', cursive;
```

## Typography Scale
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */
```

## Spacing System
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

## Visual Elements
- **Organic shapes** - flowing curves, asymmetric frames
- **Grain texture overlay** - magazine/editorial feel (subtle)
- **Soft shadows** - modern depth
- **Rounded corners** - friendly, approachable
- **Watercolor-style backgrounds** - for poetry sections
- **Paper grain textures** - for literary content

## Photography Style
- Natural light
- Authentic (not stock photo vibes)
- Diverse representation
- Behind-the-scenes welcome
- Grain texture for editorial feel

---

# 4. TECH STACK

## Core Framework
- **Next.js 15** - App Router
- **React 19** - UI library
- **TypeScript** - Type safety

## Styling
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **CSS Variables** - Theming

## Backend & Database
- **Supabase** - Auth, Database, Storage, Realtime
- **PostgreSQL** - Database (via Supabase)

## Payments
- **PayFast** - Checkout, subscriptions, webhooks

## Email
- **Resend** - Transactional emails
- **React Email** - Email templates

## AI Integration
- **Anthropic Claude API** - Nanda AI chatbot
- **OpenAI API** - Embeddings for RAG

## Content
- **MDX** - Blog posts with React components
- **Sanity** (optional) - Headless CMS alternative

## Analytics
- **Vercel Analytics** - Built-in
- **Google Analytics 4** - Detailed tracking
- **PostHog** (optional) - Product analytics

## Hosting
- **Vercel** - Deployment, edge functions

## Other
- **Zustand** - Client state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **date-fns** - Date utilities
- **Lucide React** - Icons

---

# 5. PROJECT STRUCTURE

```
creatively-nanda-co-za/
├── app/
│   ├── (marketing)/
│   │   ├── about/
│   │   │   ├── page.tsx                    # About overview
│   │   │   ├── journey/page.tsx            # Interactive timeline
│   │   │   ├── heritage/page.tsx           # Nanda's heritage story
│   │   │   └── mission/page.tsx            # Ubuntu philosophy
│   │   ├── projects/
│   │   │   ├── page.tsx                    # Case studies gallery
│   │   │   └── [slug]/page.tsx             # Individual case study
│   │   ├── experience/
│   │   │   └── page.tsx                    # Work experience timeline
│   │   └── connect/
│   │       └── page.tsx                    # QR code & vCard page
│   │
│   ├── (commerce)/
│   │   ├── marketplace/
│   │   │   ├── page.tsx                    # Main marketplace home
│   │   │   ├── notion-templates/page.tsx
│   │   │   ├── ai-prompts/page.tsx
│   │   │   ├── operations-manuals/page.tsx
│   │   │   ├── code-snippets/page.tsx
│   │   │   ├── website-templates/page.tsx
│   │   │   └── bundles/page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx                    # All products
│   │   │   └── [slug]/page.tsx             # Product detail/sales page
│   │   ├── checkout/
│   │   │   ├── page.tsx                    # Checkout flow
│   │   │   └── success/page.tsx            # Order confirmation
│   │   └── cart/
│   │       └── page.tsx                    # Full cart view
│   │
│   ├── (content)/
│   │   ├── blog/
│   │   │   ├── page.tsx                    # Blog home (all categories)
│   │   │   ├── dev/
│   │   │   │   ├── page.tsx                # Dev blog listing
│   │   │   │   └── [slug]/page.tsx         # Dev article
│   │   │   ├── writing/
│   │   │   │   ├── page.tsx                # Writing blog listing
│   │   │   │   └── [slug]/page.tsx         # Writing article
│   │   │   └── business/
│   │   │       ├── page.tsx                # Business blog listing
│   │   │       └── [slug]/page.tsx         # Business article
│   │   └── poetry/
│   │       ├── page.tsx                    # Poetry Sanctuary home
│   │       ├── collection/page.tsx         # Browse all poems
│   │       ├── collection/[slug]/page.tsx  # Individual poem reader
│   │       ├── books/page.tsx              # Published works
│   │       ├── books/[slug]/page.tsx       # Book detail page
│   │       ├── community/page.tsx          # Community hub
│   │       ├── submit/page.tsx             # Submit poetry
│   │       ├── contests/page.tsx           # Monthly contests
│   │       └── prompts/page.tsx            # Writing prompts
│   │
│   ├── (landing)/
│   │   ├── mirembe/page.tsx                # Mirembe Muse sanctuary landing
│   │   ├── nsfas-tracker/page.tsx          # NSFAS Tracker sales page
│   │   ├── first-year/page.tsx             # First Year Survival sales page
│   │   ├── salon-saas/page.tsx             # Salon SaaS sales page
│   │   ├── freelancer-hub/page.tsx         # Freelancer Hub sales page
│   │   └── poetry-hub/page.tsx             # Poetry Hub sales page
│   │
│   ├── admin/
│   │   ├── page.tsx                        # Admin dashboard
│   │   ├── posts/
│   │   │   ├── page.tsx                    # Manage all posts
│   │   │   ├── new/page.tsx                # Create new post
│   │   │   └── [id]/page.tsx               # Edit post
│   │   ├── products/
│   │   │   ├── page.tsx                    # Manage products
│   │   │   ├── new/page.tsx                # Create product
│   │   │   └── [id]/page.tsx               # Edit product
│   │   ├── poetry/
│   │   │   ├── page.tsx                    # Manage poems
│   │   │   ├── submissions/page.tsx        # Moderate submissions
│   │   │   └── roses/page.tsx              # Moderate roses (comments)
│   │   ├── orders/page.tsx                 # View orders
│   │   ├── subscribers/page.tsx            # Manage subscribers
│   │   ├── testimonials/page.tsx           # Manage testimonials
│   │   ├── emails/page.tsx                 # Email campaigns
│   │   └── settings/page.tsx               # Site settings
│   │
│   ├── api/
│   │   ├── stripe/
│   │   │   ├── create-checkout/route.ts
│   │   │   └── webhook/route.ts
│   │   ├── subscribe/route.ts
│   │   ├── contact/route.ts
│   │   ├── nanda-ai/route.ts               # AI chatbot endpoint
│   │   ├── poetry/
│   │   │   ├── submit/route.ts
│   │   │   ├── heart/route.ts
│   │   │   └── rose/route.ts
│   │   └── admin/
│   │       ├── posts/route.ts
│   │       ├── products/route.ts
│   │       └── upload/route.ts
│   │
│   ├── page.tsx                            # Homepage (Magazine cover)
│   ├── layout.tsx                          # Root layout
│   ├── globals.css                         # Global styles
│   ├── not-found.tsx                       # 404 page
│   └── error.tsx                           # Error boundary
│
├── components/
│   ├── ui/                                 # Base UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── modal.tsx
│   │   ├── dropdown.tsx
│   │   ├── tabs.tsx
│   │   ├── accordion.tsx
│   │   └── toast.tsx
│   │
│   ├── layout/
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── mobile-nav.tsx
│   │   └── page-transition.tsx
│   │
│   ├── animations/
│   │   ├── fade-in.tsx
│   │   ├── slide-up.tsx
│   │   ├── scale-in.tsx
│   │   ├── stagger-children.tsx
│   │   ├── parallax.tsx
│   │   ├── magnetic-button.tsx
│   │   ├── text-reveal.tsx
│   │   ├── counter.tsx
│   │   └── scroll-progress.tsx
│   │
│   ├── effects/
│   │   ├── grain-overlay.tsx
│   │   ├── floating-particles.tsx
│   │   ├── gradient-blob.tsx
│   │   ├── spotlight.tsx
│   │   └── confetti.tsx
│   │
│   ├── nanda-girl/
│   │   ├── NandaGirl.tsx                   # Main character component
│   │   ├── CharacterDisplay.tsx
│   │   ├── OutfitManager.tsx
│   │   ├── ExpressionEngine.tsx
│   │   ├── SpeechBubble.tsx
│   │   ├── ChatWidget.tsx
│   │   ├── AnimationController.tsx
│   │   ├── ContextDetector.tsx
│   │   └── types.ts
│   │
│   ├── nanda-ai/
│   │   ├── ChatWidget.tsx                  # Floating chat widget
│   │   ├── ChatMessage.tsx
│   │   ├── TypingIndicator.tsx
│   │   ├── QuickActions.tsx
│   │   └── AIProvider.tsx
│   │
│   ├── products/
│   │   ├── product-card.tsx
│   │   ├── product-grid.tsx
│   │   ├── pricing-card.tsx
│   │   ├── feature-block.tsx
│   │   ├── buy-button.tsx
│   │   ├── quick-view-modal.tsx
│   │   └── related-products.tsx
│   │
│   ├── cart/
│   │   ├── cart-provider.tsx               # Zustand store
│   │   ├── cart-drawer.tsx                 # Slide-out cart
│   │   ├── cart-icon.tsx                   # Floating icon with badge
│   │   ├── cart-item.tsx
│   │   └── checkout-button.tsx
│   │
│   ├── blog/
│   │   ├── article-card.tsx
│   │   ├── article-hero.tsx
│   │   ├── article-body.tsx
│   │   ├── code-block.tsx
│   │   ├── pull-quote.tsx
│   │   ├── table-of-contents.tsx
│   │   ├── author-box.tsx
│   │   └── share-buttons.tsx
│   │
│   ├── poetry/
│   │   ├── poem-card.tsx
│   │   ├── poem-reader.tsx
│   │   ├── reading-mode-toggle.tsx         # zen/gallery/classic
│   │   ├── heart-button.tsx
│   │   ├── rose-form.tsx                   # Leave a comment
│   │   ├── audio-player.tsx
│   │   ├── book-showcase.tsx
│   │   └── contest-banner.tsx
│   │
│   ├── testimonials/
│   │   ├── testimonial-card.tsx
│   │   ├── testimonials-carousel.tsx
│   │   └── testimonials-grid.tsx
│   │
│   ├── forms/
│   │   ├── newsletter-signup.tsx
│   │   ├── contact-form.tsx
│   │   ├── waitlist-form.tsx
│   │   └── submission-form.tsx
│   │
│   ├── seo/
│   │   ├── meta-tags.tsx
│   │   └── json-ld.tsx
│   │
│   └── admin/
│       ├── sidebar.tsx
│       ├── data-table.tsx
│       ├── rich-text-editor.tsx
│       ├── image-uploader.tsx
│       └── stats-card.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── admin.ts
│   ├── stripe/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── nanda-ai/
│   │   ├── config.ts
│   │   ├── knowledge-base.ts
│   │   ├── conversation-engine.ts
│   │   └── actions.ts
│   ├── email/
│   │   └── resend.ts
│   ├── i18n/
│   │   ├── config.ts
│   │   ├── dictionaries/
│   │   │   ├── en.json
│   │   │   ├── xh.json
│   │   │   ├── af.json
│   │   │   └── zu.json
│   │   └── use-translation.ts
│   ├── utils.ts
│   ├── constants.ts
│   └── validations.ts
│
├── content/
│   ├── blog/
│   │   ├── dev/
│   │   ├── writing/
│   │   └── business/
│   └── poetry/
│
├── emails/
│   ├── welcome.tsx
│   ├── purchase-confirmation.tsx
│   ├── newsletter.tsx
│   ├── poetry-delivery.tsx
│   └── order-receipt.tsx
│
├── public/
│   ├── fonts/
│   ├── images/
│   │   ├── nanda-girl/                     # Character assets
│   │   ├── products/
│   │   ├── blog/
│   │   └── poetry/
│   ├── manifest.json                       # PWA manifest
│   ├── sw.js                               # Service worker
│   └── robots.txt
│
├── styles/
│   └── themes/
│       ├── dev-blog.css
│       ├── writing-sanctuary.css
│       └── business-blog.css
│
├── types/
│   ├── database.ts
│   ├── products.ts
│   ├── blog.ts
│   └── poetry.ts
│
├── .env.local.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

# 6. PAGE SPECIFICATIONS

## 6.1 Homepage (Magazine Cover)

**File:** `app/page.tsx`

**Purpose:** First impression - a magazine cover that sells the entire experience

### Layout Structure
```
HOMEPAGE
│
├── GRAIN OVERLAY (subtle, always present)
│
├── NAVIGATION (sticky, transparent → solid on scroll)
│   ├── Logo (left)
│   ├── Links: About | Work | Products | Poetry | Blog
│   ├── Cart icon with badge
│   ├── Language switcher (EN | XH | AF | ZU)
│   └── CTA: "Let's Work Together"
│
├── HERO SECTION (100vh, magazine cover style)
│   ├── Background: Dramatic gradient or editorial photo
│   ├── "ISSUE 2026" badge (top left)
│   ├── Main Headline: "CREATIVE TECHNOLOGIST"
│   ├── Subheadline: "Poetry to Python • 14 Products • Building Africa's Digital Future"
│   ├── Key Stats Row:
│   │   ├── "15 Academic Distinctions"
│   │   ├── "14 Products Built"
│   │   ├── "50K+ Students Served"
│   │   └── 
│   ├── Scroll indicator: "Explore my work ↓"
│   └── Nanda Girl character (appears after 2 seconds)
│
├── ABOUT TEASER (snap section)
│   ├── Photo (editorial, professional)
│   ├── "Meet Nanda"
│   ├── Short bio (3-4 sentences highlighting heritage)
│   ├── CTA: "Read My Story →"
│   └── Ubuntu quote: "I am because we are"
│
├── FEATURED PRODUCTS (snap section)
│   ├── "Digital Products & Templates"
│   ├── 3 featured product cards (NSFAS Tracker, Salon SaaS, First Year Survival)
│   ├── Each card: image, title, tagline, price, status badge
│   └── "View All Products →"
│
├── CASE STUDIES PREVIEW
│   ├── "Selected Work"
│   ├── 3 featured case studies (horizontal scroll on mobile)
│   ├── Each: hero image, title, impact metrics
│   └── "See All Projects →"
│
├── LATEST FROM THE BLOG
│   ├── "The Fine Print"
│   ├── 1 featured post (large card)
│   ├── 3 recent posts (small cards)
│   └── "Read More Articles →"
│
├── POETRY HIGHLIGHT
│   ├── "Inside Her Roses"
│   ├── Featured poem (beautifully typeset)
│   ├── Book cover 3D mockup
│   └── "Enter the Sanctuary →"
│
├── TESTIMONIALS CAROUSEL
│   ├── "What People Are Saying"
│   ├── 3-5 rotating testimonials
│   ├── Auto-play with manual controls
│   └── Pause on hover
│
├── NEWSLETTER SIGNUP
│   ├── "Join 500+ Subscribers"
│   ├── Email input (inline)
│   ├── Value prop: "Templates, launches, and stories delivered weekly"
│   └── Privacy assurance
│
├── FOOTER
│   ├── Logo + tagline
│   ├── Navigation links
│   ├── Social media links
│   ├── Contact info
│   ├── Language selector
│   └── © 2026 Mirembe Muse (Pty) Ltd
│
└── NANDA AI WIDGET (floating, bottom right)
    ├── Chat bubble icon
    ├── "Chat with Nanda" tooltip
    └── Proactive message after 3 minutes
```

### Animations for Homepage
```typescript
// Page load sequence
1. Grain overlay fades in instantly
2. Navigation fades in (0.3s delay)
3. Hero content staggers in:
   - Issue badge (0.2s)
   - Main headline (0.4s) - text reveal
   - Subheadline (0.6s)
   - Stats counter animation (0.8s)
   - Scroll indicator (1.2s) - floating
4. Nanda Girl enters (2s delay)

// Scroll animations
- Each section fades + slides up on viewport entry
- Stats use counting animation when visible
- Parallax on hero background
- Cards lift on hover
```

---

## 6.2 About Page (4 Sections)

**Files:** 
- `app/(marketing)/about/page.tsx` - Overview
- `app/(marketing)/about/journey/page.tsx` - Timeline
- `app/(marketing)/about/heritage/page.tsx` - Cultural story
- `app/(marketing)/about/mission/page.tsx` - Ubuntu philosophy

### 6.2.1 About Overview
```
/about
│
├── HERO
│   ├── "About Nanda"
│   ├── Professional photo (editorial style)
│   └── Brief intro (2-3 sentences)
│
├── SECTION CARDS (4 cards linking to sub-pages)
│   ├── The Journey → /about/journey
│   ├── My Heritage → /about/heritage
│   ├── Ubuntu Mission → /about/mission
│   └── Download CV → PDF download
│
├── QUICK FACTS
│   ├── Location: East London, SA
│   ├── Education: BCom Business Management, NMU
│   ├── Started Tech: June 2025
│   └── Published: "Inside Her Roses" (2024)
│
└── TESTIMONIALS (professional references)
```

### 6.2.2 The Journey (Interactive Timeline)
```
/about/journey
│
├── HERO: "The Journey"
│
├── INTERACTIVE TIMELINE (vertical, animated)
│   ├── 2019 - Gap Year
│   │   ├── Started at Sportsmans Warehouse
│   │   └── Learning about retail, customer service
│   │
│   ├── 2020 - Higher Certificate
│   │   └── Academic foundations
│   │
│   ├── 2021-2023 - Diploma Years
│   │   ├── Continued at Sportsmans (holidays)
│   │   └── Business management studies
│   │
│   ├── 2023-2024 - Balkan Burger
│   │   ├── 2 years experience
│   │   └── Operations, management skills
│   │
│   ├── 2024 - Advanced Diploma
│   │   ├── Completed qualification
│   │   ├── Moved back to East London
│   │   └── Published "Inside Her Roses"
│   │
│   └── June 2025 - Tech Journey Begins
│       ├── Self-taught development
│       ├── Built from home with laptop
│       └── Started building the empire
│
└── CTA: "See My Work →"
```

### 6.2.3 Heritage Page
```
/about/heritage
│
├── HERO: "My Roots"
│   └── Powerful image representing heritage
│
├── THE BLEND
│   ├── "Half Ugandan, Half Sotho/Xhosa"
│   ├── Uganda section (maternal)
│   └── South Africa section (paternal)
│
├── CLAN & LINEAGE
│   ├── Nsenene Clan
│   ├── Hlubi
│   ├── Thabizolo
│   ├── Tshawe
│   └── Significance of each
│
├── HOW IT SHAPES MY WORK
│   ├── Ubuntu philosophy
│   ├── Community focus
│   └── African-first solutions
│
└── VISUAL ELEMENTS
    ├── Traditional patterns
    ├── Family photos (if available)
    └── Cultural imagery
```

### 6.2.4 Mission Page
```
/about/mission
│
├── HERO: "Ubuntu - I Am Because We Are"
│
├── THE PHILOSOPHY
│   ├── What Ubuntu means
│   ├── How it guides my work
│   └── Community over competition
│
├── WHY AFRICA-FIRST
│   ├── The problems I see
│   ├── Why solutions need local context
│   └── Affordability and accessibility focus
│
├── THE VISION
│   ├── 5-year goals
│   ├── Impact targets
│   └── Giving back plans
│
└── JOIN THE MISSION
    ├── Newsletter signup
    └── Ways to collaborate
```

---

## 6.3 Projects → Case Studies

**Files:**
- `app/(marketing)/projects/page.tsx` - Gallery
- `app/(marketing)/projects/[slug]/page.tsx` - Case study detail

### Case Studies Gallery
```
/projects
│
├── HERO
│   ├── "The Work"
│   ├── Dramatic headline
│   └── Filter bar: By Impact | By Tech | By Industry
│
├── CASE STUDY GRID
│   ├── True Access Foundation (Full-stack app)
│   ├── Balkan Burger (Notion OS)
│   ├── NSFAS Tracker (Template + App)
│   ├── Salon Management SaaS
│   └── More projects...
│
└── Each card:
    ├── Hero image
    ├── Title
    ├── Category tags
    ├── 1-line impact: "Saved 40% admin time"
    └── "View Case Study →"
```

### Individual Case Study Template
```
/projects/[slug]
│
├── HERO (full-width)
│   ├── Hero image/video
│   ├── Project title
│   ├── Tagline
│   └── Quick stats bar
│
├── THE CHALLENGE
│   ├── What problem existed
│   ├── Why it mattered
│   └── The cost of inaction
│
├── MY ROLE
│   ├── What I specifically did
│   ├── Technologies used
│   └── Duration
│
├── THE PROCESS
│   ├── Week-by-week breakdown
│   ├── Architecture diagrams
│   └── Screenshots of progress
│
├── THE SOLUTION
│   ├── What I built
│   ├── Key features
│   └── Demo video/screenshots
│
├── THE IMPACT
│   ├── Metrics (with animation)
│   │   ├── "40% time saved"
│   │   ├── "2,000+ users"
│   │   └── "R50K revenue generated"
│   └── Before/after comparison
│
├── TESTIMONIAL
│   ├── Client quote
│   ├── Client name & title
│   └── Company logo
│
├── TECH DEEP-DIVE (expandable)
│   ├── Architecture diagram
│   ├── Tech stack details
│   └── Code snippets
│
├── RELATED PROJECTS
│   └── 3 related case studies
│
└── CTA
    ├── "Need something similar?"
    └── Contact button
```

---

## 6.4 Work Experience (Timeline)

**File:** `app/(marketing)/experience/page.tsx`

```
/experience
│
├── HERO
│   ├── "Professional Experience"
│   └── "From retail to tech - every step mattered"
│
├── INTERACTIVE TIMELINE
│   │
│   ├── SPORTSMANS WAREHOUSE (2019-2023)
│   │   ├── Role: Sales Associate (during studies)
│   │   ├── What I learned:
│   │   │   ├── Customer service excellence
│   │   │   ├── Inventory systems
│   │   │   └── Team collaboration
│   │   └── Photo essay style (3-4 images)
│   │
│   ├── BALKAN BURGER (2023-2024)
│   │   ├── Role: Operations/Management
│   │   ├── Duration: 2 years
│   │   ├── What I learned:
│   │   │   ├── Restaurant operations
│   │   │   ├── Staff management
│   │   │   └── Systems thinking
│   │   ├── Case study link: "How I built their Notion OS"
│   │   └── Impact metrics
│   │
│   └── CREATIVELYNANDA (June 2025 - Present)
│       ├── Role: Founder, Creative Technologist
│       ├── Location: East London (remote)
│       ├── What I built:
│       │   ├── 14 digital products
│       │   ├── Full-stack applications
│       │   └── AI integrations
│       └── Featured projects carousel
│
├── EDUCATION SECTION
│   ├── Nelson Mandela University
│   ├── BCom Business Management
│   ├── 15 Academic Distinctions
│   └── Timeline: 2019-2024
│
├── SKILLS MATRIX
│   ├── Technical: React, Next.js, TypeScript, etc.
│   ├── Business: Operations, Management, Strategy
│   └── Creative: Writing, Poetry, Design
│
└── DOWNLOAD OPTIONS
    ├── Traditional CV (PDF)
    ├── One-page resume (PDF)
    └── vCard download
```

---

## 6.5 Mirembe Muse Landing Page

**File:** `app/(landing)/mirembe/page.tsx`

**Theme:** Sanctuary fairy garden - ethereal, botanical, peaceful

```
/mirembe
│
├── AMBIENT ELEMENTS
│   ├── Floating leaves animation (CSS/Framer Motion)
│   ├── Soft nature sounds toggle (birds, water)
│   └── Parallax botanical images
│
├── HERO (100vh)
│   ├── Background: Video loop OR large botanical image
│   ├── Overlay: Semi-transparent cream (#F5F1E8 at 85%)
│   ├── Logo: "Mirembe Muse" (Cormorant Garamond, large)
│   ├── Tagline: "Where nature meets nurture"
│   ├── Subtitle: "African botanicals • Ancestral wisdom • Inner peace"
│   ├── Launch date: "Coming February 2026"
│   ├── Countdown timer (days, hours, minutes)
│   └── CTA: "Join the Waitlist"
│
├── WHAT IS MIREMBE
│   ├── "Mirembe means peace in Luganda"
│   ├── Origin story (3-4 paragraphs, beautifully typeset)
│   ├── Your photo in nature (circular, soft edges)
│   └── Emotional connection
│
├── THE SANCTUARY (3 Pillars)
│   ├── Products
│   │   ├── Icon: Leaf/plant
│   │   ├── "Botanical Wellness"
│   │   └── "Hair oils, body care, wellness teas"
│   ├── Education
│   │   ├── Icon: Book
│   │   ├── "Ancient Wisdom"
│   │   └── "Traditions our grandmothers knew"
│   └── Community
│       ├── Icon: People/circle
│       ├── "The Circle"
│       └── "2,000+ souls on their wellness journey"
│
├── SNEAK PEEK
│   ├── "A glimpse of what's coming"
│   ├── Gallery: 4-6 product images (slightly blurred, teaser)
│   └── Caption: "Castor oil • Rosemary oil • Wellness teas • Ritual kits"
│
├── JOIN THE WAITLIST
│   ├── "Be the first to enter the sanctuary"
│   ├── Benefits:
│   │   ├── Early access (24 hours before public)
│   │   ├── Founding member discount (30% off)
│   │   └── Free Hair Love Handbook
│   ├── Email + name form
│   ├── Interest checkboxes: hair care, body care, teas, all
│   └── Current count: "[X] souls have joined"
│
├── FOLLOW THE JOURNEY
│   ├── Instagram feed embed
│   └── Social links
│
├── PROGRESS BAR
│   ├── "The sanctuary is 78% ready"
│   ├── Animated progress bar
│   └── Milestones: "Sourcing ✓" "Designing ✓" "Building ⏳"
│
└── FOOTER (Mirembe-styled)
```

---

## 6.6 Connect Page (QR Code & vCard)

**File:** `app/(marketing)/connect/page.tsx`

```
/connect
│
├── HERO
│   ├── "Let's Connect"
│   └── Professional photo
│
├── QR CODE SECTION
│   ├── Large scannable QR code
│   ├── Contains vCard data
│   └── "Scan to save my contact"
│
├── VCARD DOWNLOAD
│   ├── Download button
│   └── Preview of what's saved:
│       ├── Name: Nandawula Kabali-Kagwa
│       ├── Title: Creative Technologist
│       ├── Company: Mirembe Muse (Pty) Ltd
│       ├── Email: hello@creativelynanda.co.za
│       ├── Website: creativelynanda.co.za
│       └── Location: East London, South Africa
│
├── SOCIAL LINKS
│   ├── LinkedIn
│   ├── GitHub
│   ├── Twitter/X
│   ├── Instagram
│   └── TikTok
│
├── DIRECT CONTACT
│   ├── Email: hello@creativelynanda.co.za
│   └── Book a call: Cal.com link
│
└── NFC INFO
    └── "Physical cards available at events"
```

---

# 7. ANIMATION SYSTEM

## Page Load Sequence
```typescript
// Consistent across all pages
const pageLoadSequence = {
  1: { element: 'grain-overlay', animation: 'fadeIn', duration: 0, delay: 0 },
  2: { element: 'navigation', animation: 'fadeIn', duration: 0.3, delay: 0 },
  3: { element: 'hero-content', animation: 'staggerUp', duration: 0.5, stagger: 0.1 },
  4: { element: 'main-content', animation: 'fadeIn', duration: 0.4, delay: 0.6 },
};
```

## Scroll Animations
```typescript
const scrollAnimations = {
  // Sections fade + slide up on viewport entry
  section: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  
  // Cards stagger
  cardGrid: {
    parent: { staggerChildren: 0.1 },
    child: {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
    },
  },
  
  // Parallax for images
  parallax: {
    offset: 0.1, // 10% parallax effect
  },
  
  // Progress indicators
  progressBar: {
    initial: { scaleX: 0 },
    animate: { scaleX: 1 },
    transition: { duration: 1, ease: 'easeOut' },
  },
};
```

## Interaction Animations
```typescript
const interactionAnimations = {
  // Buttons
  button: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 400 },
  },
  
  // Cards
  card: {
    whileHover: { 
      y: -4, 
      boxShadow: '0 10px 40px rgba(0,0,0,0.15)' 
    },
    transition: { duration: 0.2 },
  },
  
  // Links
  link: {
    // Underline animation
    initial: { width: 0 },
    whileHover: { width: '100%' },
  },
  
  // Form inputs
  input: {
    whileFocus: { borderColor: 'var(--cherry)' },
    transition: { duration: 0.2 },
  },
};
```

## Page Transitions
```typescript
const pageTransitions = {
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
  enter: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};
```

## Micro-interactions
```typescript
const microInteractions = {
  // Heart button (poetry)
  heartBurst: {
    scale: [1, 1.3, 1],
    transition: { duration: 0.3 },
  },
  
  // Add to cart
  cartBounce: {
    y: [0, -8, 0],
    transition: { duration: 0.4 },
  },
  
  // Success checkmark
  checkDraw: {
    pathLength: [0, 1],
    transition: { duration: 0.5 },
  },
  
  // Loading spinner
  spin: {
    rotate: 360,
    transition: { duration: 1, repeat: Infinity, ease: 'linear' },
  },
  
  // Notification badge
  badgePop: {
    scale: [0, 1.2, 1],
    transition: { type: 'spring', stiffness: 500 },
  },
};
```

## Special Animations
```typescript
// Text reveal for headlines
const textReveal = {
  parent: {
    initial: { opacity: 1 },
    animate: { opacity: 1 },
  },
  child: {
    initial: { y: '100%' },
    animate: { y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Counter animation for stats
const counter = {
  from: 0,
  duration: 2,
  useGrouping: true, // Adds commas
  decimals: 0,
  onComplete: () => {},
};

// Floating animation (Nanda Girl, particles)
const float = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

// Typing indicator
const typingDots = {
  scale: [1, 1.2, 1],
  transition: {
    duration: 0.4,
    repeat: Infinity,
    staggerChildren: 0.1,
  },
};
```

---

# 8. COMPONENT LIBRARY

## Core UI Components

### Button
```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}
```

### Card
```tsx
interface CardProps {
  variant: 'default' | 'elevated' | 'outlined' | 'glass';
  padding: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean; // Lift on hover
  grain?: boolean; // Grain texture overlay
  children: React.ReactNode;
}
```

### Product Card
```tsx
interface ProductCardProps {
  product: {
    slug: string;
    name: string;
    tagline: string;
    price: number;
    originalPrice?: number;
    thumbnail: string;
    category: string;
    rating?: number;
    reviewCount?: number;
    badge?: 'NEW' | 'BESTSELLER' | 'POPULAR' | 'LAUNCHING';
    status?: 'live' | 'beta' | 'coming-soon';
  };
  variant?: 'default' | 'featured' | 'compact';
  showQuickView?: boolean;
}
```

### Testimonial Card
```tsx
interface TestimonialCardProps {
  testimonial: {
    author_name: string;
    author_title: string;
    author_avatar: string;
    content: string;
    rating: number;
    product?: string;
  };
  variant?: 'default' | 'featured' | 'compact';
}
```

### Article Card (Blog)
```tsx
interface ArticleCardProps {
  article: {
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    category: 'dev' | 'writing' | 'business';
    publishedAt: string;
    readingTime: number;
    author: {
      name: string;
      avatar: string;
    };
  };
  variant?: 'default' | 'featured' | 'horizontal';
}
```

### Poem Card
```tsx
interface PoemCardProps {
  poem: {
    id: string;
    slug: string;
    title: string;
    excerpt: string; // First few lines
    collection: string;
    mood?: string;
    hasAudio: boolean;
    heartCount: number;
    roseCount: number;
  };
  variant?: 'default' | 'featured' | 'minimal';
}
```

---

# 9. NANDA GIRL AI CHARACTER

## Overview
An illustrated character based on Nanda that guides visitors through the website. Context-aware, with different outfits and expressions based on the page.

## Character Assets (Need to Generate/Commission)
1. **Base character** - illustrated style based on reference photos
2. **3 hairstyles:**
   - Professional Sleek (straight, middle part)
   - Natural Volume (full curls/afro)
   - Styled Natural (defined curls)
3. **6 outfits:**
   - Professional Tech (blazer, smart)
   - Student Casual (hoodie, jeans)
   - Creative Soul (artsy, bohemian)
   - Mirembe Muse Brand (elegant, natural hair REQUIRED)
   - Celebration Mode (festive)
   - Ubuntu Traditional (cultural elements)
4. **8 expressions:**
   - Welcome/Happy
   - Thinking/Processing
   - Celebrating/Excited
   - Encouraging
   - Explaining/Teaching
   - Surprised/Discovery
   - Concerned/Urgent
   - Casual Chat

## Context Mapping
| Page | Outfit | Hair | Expression | Message |
|------|--------|------|------------|---------|
| Homepage | Professional Tech | Professional Sleek | Welcome | "Hey! 👋 I'm Nanda. Welcome to my digital home. What brings you here today?" |
| About | Ubuntu Traditional | Natural Volume | Warm | "Thanks for wanting to know more about me!" |
| NSFAS Tracker | Student Casual | Styled Natural | Concerned | "NSFAS deadline in [X] days! ⏰ Ready to get organized?" |
| First Year | Student Casual | Styled Natural | Encouraging | "First year can feel overwhelming - I've got your back! 💪" |
| Salon SaaS | Professional Tech | Professional Sleek | Professional | "Managing a salon is tough. Let me show you how we can help." |
| Poetry | Creative Soul | Professional Sleek | Inspired | "Welcome to the poetry corner! ✨" |
| Mirembe | Mirembe Muse | Natural Volume (REQUIRED) | Warm | "Natural hair is beautiful, powerful, and uniquely yours! 🌸" |
| Checkout | Celebration Mode | Styled Natural | Celebrating | "You're about to do something amazing! 🎉" |

## Animation Specifications
```typescript
const nandaGirlAnimations = {
  idle: {
    // Gentle floating (5-10px up/down)
    y: [0, -8, 0],
    duration: 3,
    repeat: Infinity,
    // Subtle breathing motion
    // Occasional blink
  },
  entrance: {
    // Slides in from edge OR fades with bounce
    x: [100, 0],
    opacity: [0, 1],
    duration: 0.8,
  },
  thinking: {
    // Tilt to side
    rotate: [-5, 5, -5],
    duration: 2,
    // Hand to chin motion
  },
  celebration: {
    // Jump with arms up
    y: [0, -20, 0],
    scale: [1, 1.1, 1],
    duration: 0.5,
    // Confetti particles
  },
  waving: {
    // Hand wave motion
    duration: 1.5,
  },
};
```

## Technical Implementation
```typescript
// components/nanda-girl/NandaGirl.tsx
interface NandaGirlProps {
  page: string; // Current page route
  forceOutfit?: OutfitType;
  forceExpression?: ExpressionType;
  minimized?: boolean;
}

// Auto-detects context and displays appropriate version
// Can be manually overridden for specific scenarios
// Remembers user preferences (minimized state)
// Respects reduced motion preferences
```

---

# 10. NANDA AI SALES ASSISTANT

## Overview
AI-powered chatbot that acts as a sales assistant and personal assistant. Trained on all product knowledge, FAQs, and Nanda's voice.

## Capabilities
1. **Product Inquiry** - Answer questions about any product
2. **Pricing Questions** - Explain pricing, discounts, bundles
3. **Purchase Assistance** - Guide to checkout, apply coupons
4. **Booking Consultation** - Schedule meetings via Cal.com
5. **Support Ticket** - Create escalation for complex issues
6. **Lead Capture** - Collect emails for follow-up
7. **Content Recommendation** - Suggest relevant blog posts, products
8. **FAQ Answering** - Handle common questions

## Personality Configuration
```typescript
export const NANDA_AI_CONFIG = {
  model: "claude-sonnet-4-20250514",
  temperature: 0.7,
  maxTokens: 1000,
  personality: {
    name: "Nanda AI",
    role: "Sales Assistant & Personal Assistant",
    traits: [
      "Warm and professional",
      "Big sister energy - encouraging, not condescending",
      "Confident but humble",
      "Ubuntu philosophy infused",
      "South African context aware"
    ],
    languageStyle: {
      usesEmoji: true, // But not excessively
      formality: "adaptive", // Matches user's tone
      currency: "ZAR", // Always use Rands
    }
  }
};
```

## Knowledge Base (RAG System)
```
NANDA AI BRAIN
│
├── PRODUCT KNOWLEDGE
│   ├── All Notion templates (features, benefits, pricing)
│   ├── All SaaS apps (features, pricing, status)
│   ├── All services (consulting, speaking)
│   ├── Pricing strategies and discount rules
│   └── Bundle options and upsell paths
│
├── PERSONAL KNOWLEDGE
│   ├── Nanda's story and background
│   ├── Education and certifications
│   ├── Work experience
│   ├── Published works
│   └── Social media presence
│
├── COMPANY KNOWLEDGE
│   ├── Mirembe Muse mission and values
│   ├── Ubuntu philosophy
│   ├── Brand voice and tone
│   ├── Policies (refunds, support)
│   └── Contact information
│
├── FAQ DATABASE
│   ├── Product-specific FAQs
│   ├── Technical support FAQs
│   ├── Payment and delivery FAQs
│   └── Customization questions
│
├── BLOG CONTENT
│   └── All blog posts (embedded for search)
│
└── CALENDAR & AVAILABILITY
    ├── Consulting availability
    └── Booking protocols
```

## Sample Conversation Flows

### Product Inquiry
```
User: "What's the NSFAS Tracker?"

Nanda AI: "Great question! 🎓 The NSFAS Tracker is my most popular template - it's a Notion system that helps students stay organized during the stressful NSFAS application process.

It includes:
• Complete document checklist
• Deadline countdown timers
• Application status tracker
• Appeal letter templates
• Tips to avoid common mistakes

It's R149 once-off, lifetime access. Over 500 students have used it!

Want to see a demo, or ready to grab it?"
```

### Booking Meeting
```
User: "Can I book a consultation?"

Nanda AI: "Absolutely! Nanda offers consulting sessions for:

📱 Tech & Development — Building apps, websites, SaaS
📊 Business Systems — Notion, automation, operations
🌿 Brand & Wellness — Mirembe Muse, product development

Sessions are R1,500/hour.

What area would you like help with? Once I know, I can show you Nanda's available slots!"
```

## Proactive Engagement Triggers
```typescript
const proactiveEngagement = {
  timeOnPage: 180000, // 3 minutes - "Need help finding something?"
  scrollDepth: 80, // 80% scroll - "Interested in [product]?"
  exitIntent: true, // "Before you go, grab our free guide!"
  returningVisitor: true, // "Welcome back! Picked up where you left off?"
  cartAbandonment: 60000, // 1 minute - "Your cart is waiting!"
};
```

---

# 11. TRIPLE BLOG EMPIRE

## Overview
Three distinct blog experiences under one publishing house, each with its own voice, design, and audience.

## Blog 1: Dev Documentation Hub

**URL:** `/blog/dev`
**Name:** "Code Deep with Nanda"
**Tagline:** "Where Code Meets Clarity"

### Design
- Dark mode by default
- Colors: Charcoal #1e1e1e, Midnight Blue #0d1117, Electric Cyan #00d4ff
- Fonts: Space Grotesk (headers), Inter (body), Fira Code (code)
- Wide reading area (800px)
- Syntax highlighted code blocks
- Interactive code playgrounds

### Content Strategy
- 5-post deep dive series
- 15-25 min reads, 30-60 min code-along
- Example series:
  - "Building Production-Ready Next.js Apps"
  - "Supabase Authentication Deep Dive"
  - "AI Integration with Claude API"

### Features
- Copy code button on every block
- "Run in browser" for applicable code
- Difficulty badges (Beginner/Intermediate/Advanced)
- Time to read + time to code estimates
- GitHub repo links
- Prerequisites section
- Series navigation

---

## Blog 2: Writing Sanctuary

**URL:** `/blog/writing`
**Name:** "The Poet's Corner"
**Tagline:** "Where Words Find Their Power"

### Design
- Light, soft aesthetic
- Colors: Lavender #e6d5f0, Gentle Rose #ffd6e8, Warm Coral #ff9a8b
- Fonts: Playfair Display (headers), Crimson Text (body), Satisfy (accents)
- Narrow reading width (600px - like a book page)
- Watercolor-style backgrounds
- Handwritten annotations

### Content Strategy
- Writing craft tutorials
- Author interviews
- Poetry workshops
- Writing prompts
- Publishing guides

### Features
- Mood-based theming
- Writing prompts throughout
- Community submissions
- Reading lists
- Monthly poetry challenges

---

## Blog 3: Business Evolution Stories

**URL:** `/blog/business`
**Name:** "Building Together"
**Tagline:** "Real Businesses, Real Growth, Real Impact"

### Design
- Professional magazine layout
- Colors: Navy #1e3a5f, Trust Blue #2c5f8d, Emerald #059669
- Fonts: Montserrat (headers), Open Sans (body), Roboto Mono (data)
- Data visualizations
- Before/after comparisons
- Photo-heavy (real businesses)

### Content Strategy
- Client transformation stories (5-part series)
- Business education (primary school to entrepreneur)
- Case studies with real metrics
- ROI calculators

### Features
- Interactive charts
- Before/after photo sliders
- Timeline infographics
- Downloadable business templates
- Video interviews

---

# 12. POETRY SANCTUARY

## Overview
A dedicated space for poetry that goes beyond just displaying poems. A community, a reading experience, and a commerce platform for "Inside Her Roses."

## URL Structure
```
/poetry
├── /poetry/collection          # Browse all poems
├── /poetry/collection/[slug]   # Individual poem reader
├── /poetry/books               # Published works
├── /poetry/books/[slug]        # Book detail page
├── /poetry/community           # Community hub
├── /poetry/submit              # Submit your poetry
├── /poetry/contests            # Monthly contests
└── /poetry/prompts             # Writing prompts
```

## Design Language
```css
:root {
  --rose-deep: #8B0A1A;
  --rose-blush: #D4A5A5;
  --parchment: #F5F0E8;
  --ink: #1A1A2E;
  --gold-leaf: #C9A961;
}
```

## Features

### 1. Reading Modes
```typescript
const readingModes = {
  zen: {
    // Fullscreen, dark background, just the poem
    background: 'radial-gradient(circle, #1A1A2E 0%, #0A0A14 100%)',
    textColor: '#F5F0E8',
    ambientSound: true, // Optional
  },
  gallery: {
    // Poem on atmospheric image background
    background: 'dynamic', // Changes based on poem mood
    overlay: 'rgba(0,0,0,0.4)',
  },
  classic: {
    // Clean, traditional reading
    background: '#F5F0E8',
    textColor: '#1A1A2E',
    paperTexture: true,
  },
};
```

### 2. Heart System
- Anonymous hearts allowed
- Animated heart burst on click
- "You and 233 others loved this"
- Rate limiting for spam prevention

### 3. Rose (Comment) System
- "Leaving a rose" = leaving an appreciation comment
- 280 character limit (tweet-sized)
- Moderation queue (you approve before public)
- Feature best roses on poem page

### 4. Audio Narration
- Your voice reading poems
- Custom audio player with waveform
- Speed control (0.75x, 1x, 1.25x)
- Auto-advance to next poem

### 5. Collections & Filtering
```typescript
const filterOptions = {
  mood: ['Reflective', 'Passionate', 'Melancholic', 'Empowering', 'Playful'],
  theme: ['Love', 'Loss', 'Identity', 'Growth', 'Nature', 'Family'],
  length: ['Micro (< 10 lines)', 'Short (10-20)', 'Medium (20-40)', 'Long (40+)'],
  collection: ['Inside Her Roses', 'Untitled Feelings', 'New Work'],
  hasAudio: [true, false],
};
```

### 6. Book Showcase
```
BOOK DETAIL PAGE (/poetry/books/inside-her-roses)
│
├── 3D BOOK COVER (CSS transform)
│
├── BOOK INFO
│   ├── Title: "Inside Her Roses"
│   ├── Subtitle: "A Poetry Collection"
│   ├── Author: Nandawula Regine Kabali-Kagwa
│   ├── Rating: 4.9★ (47 reviews)
│   └── "Featured on SABC TV"
│
├── PURCHASE OPTIONS
│   ├── eBook: R99 (instant download)
│   ├── Paperback: R199 (ships in 3-5 days)
│   └── Signed Copy: R299 (limited edition)
│
├── SAMPLE POEMS
│   └── 3-5 featured poems from the book
│
├── REVIEWS
│   └── Reader testimonials
│
└── RELATED
    └── Poetry subscription CTA
```

---

# 13. CREATIVE MARKETPLACE

## Overview
A curated shopping experience for digital products. Not a boring grid - each category feels like its own boutique.

## URL Structure
```
/marketplace
├── /marketplace/notion-templates
├── /marketplace/ai-prompts
├── /marketplace/operations-manuals
├── /marketplace/code-snippets
├── /marketplace/website-templates
└── /marketplace/bundles
```

## Categories

### Notion Templates
- Student Life (NSFAS, Varsity, Matric)
- Business & Productivity
- Creative & Content
- Life Management

### AI Prompts
- Writing & Content
- Business & Marketing
- Coding & Development
- Creative & Design
- Prompt Packs (bundles)

### Operations Manuals
- Small Business
- Salons & Beauty
- Restaurants & Food
- Freelancers
- Startups

### Code Snippets
- React Components
- Next.js Templates
- API Integrations
- Animations & Effects
- Full Starter Kits

### Website Templates
- Portfolio Sites
- Landing Pages
- E-commerce
- Blogs & Content
- SaaS Dashboards

### Bundles
- The Student Empire (all student tools)
- The Entrepreneur Stack (business suite)
- The Creator Toolkit (content + prompts)
- The Full Empire (everything at 60% off)

## Sales Page Template
Every product gets a dedicated sales page with:

```
/products/[slug]
│
├── HERO (Above fold)
│   ├── Large product mockup (60% width)
│   ├── Category badge
│   ├── Product name (Cormorant Garamond)
│   ├── Star rating + review count
│   ├── Tagline
│   ├── Price (with strikethrough if discounted)
│   ├── "Buy Now - R[price]" (primary CTA)
│   └── Trust badges: "Instant access | 30-day guarantee | Lifetime updates"
│
├── STICKY SIDEBAR (Desktop)
│   └── Mini buy box that follows scroll
│
├── WHAT'S INCLUDED
│   └── Grid of features with icons
│
├── DEMO VIDEO
│   └── YouTube/Vimeo embed or screenshot carousel
│
├── BENEFITS SECTION
│   ├── "How This Solves Your Problems"
│   └── Before/After comparison
│
├── TESTIMONIALS
│   └── 3-4 customer reviews with results
│
├── DETAILED FEATURES
│   └── Accordion sections with screenshots
│
├── FAQ
│   └── Product-specific questions
│
├── RELATED PRODUCTS
│   └── 3-4 upsell/cross-sell cards
│
├── FINAL CTA
│   └── Repeat buy button
│
└── GUARANTEE
    ├── 30-day money-back guarantee
    └── Support information
```

---

# 14. PRODUCTS CATALOG

## Digital Products (Notion Templates)

| Product | Price | Category | Status |
|---------|-------|----------|--------|
| NSFAS Tracker | R149 | Student | Live |
| Varsity Survival | R249 | Student | Live |
| Matric Survival | R149 | Student | Coming Soon |
| Academic Excellence | R199 | Student | Coming Soon |
| SME Hub | R499 | Business | Live |
| Freelancer Hub | R349 | Business | Live |
| Creatives HQ | R299 | Creative | Coming Soon |
| Poetry Companion | R199 | Creative | Coming Soon |
| Salon Management | R399 | Business | Beta |
| Restaurant OS | R399 | Business | Coming Soon |

## SaaS Products

| Product | Price | Status |
|---------|-------|--------|
| Salon Pro | R499/month | Beta (3 salons waiting) |
| NSFAS Tracker App | R99/year | Development |
| First Year Survival PWA | R199/year | Development |
| Hair Growth Tracker | Free | Development |

## Services

| Service | Price |
|---------|-------|
| Consulting (hourly) | R1,500/hour |
| Consulting (10-hour package) | R12,000 |
| Speaking engagement | Quote-based |
| Custom development | Quote-based |

## Book

| Format | Price |
|--------|-------|
| eBook (PDF) | R99 |
| Paperback | R199 |
| Signed Copy | R299 |
| Audiobook | R149 |

---

# 15. DATABASE SCHEMA

## Supabase Tables

### products
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  price INTEGER NOT NULL, -- In cents (R149 = 14900)
  original_price INTEGER, -- For discounts
  category TEXT NOT NULL, -- 'student', 'business', 'creative'
  type TEXT NOT NULL, -- 'template', 'saas', 'ebook', 'service'
  thumbnail TEXT,
  images TEXT[], -- Array of image URLs
  features JSONB, -- Array of feature objects
  status TEXT DEFAULT 'draft', -- 'draft', 'live', 'coming-soon', 'archived'
  is_featured BOOLEAN DEFAULT false,
  stripe_price_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### orders
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  user_email TEXT NOT NULL,
  user_name TEXT,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'ZAR',
  status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
  stripe_session_id TEXT,
  stripe_payment_intent TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### subscribers
```sql
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  source TEXT, -- 'homepage', 'blog', 'mirembe', 'product_page'
  interests TEXT[], -- ['student', 'business', 'poetry', 'wellness']
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ,
  metadata JSONB
);
```

### testimonials
```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id), -- NULL for general
  author_name TEXT NOT NULL,
  author_title TEXT, -- "UCT Student", "Small Business Owner"
  author_avatar TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### poems
```sql
CREATE TABLE poems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT, -- First few lines
  collection TEXT, -- 'inside-her-roses', 'new-work'
  mood TEXT, -- 'reflective', 'passionate', etc.
  theme TEXT, -- 'love', 'loss', etc.
  audio_url TEXT,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  heart_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  published_at TIMESTAMPTZ
);
```

### poem_hearts
```sql
CREATE TABLE poem_hearts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poem_id UUID REFERENCES poems(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  user_id UUID, -- Optional, if logged in
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(poem_id, session_id)
);
```

### poem_roses
```sql
CREATE TABLE poem_roses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poem_id UUID REFERENCES poems(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (char_length(content) <= 280),
  author_name TEXT,
  author_email TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'featured', 'rejected'
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### blog_posts
```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL, -- MDX content
  cover_image TEXT,
  category TEXT NOT NULL, -- 'dev', 'writing', 'business'
  tags TEXT[],
  reading_time INTEGER, -- In minutes
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### nanda_ai_knowledge
```sql
CREATE TABLE nanda_ai_knowledge (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  metadata JSONB, -- source, category, product_id, etc.
  embedding vector(1536), -- OpenAI embedding
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable vector similarity search
CREATE INDEX ON nanda_ai_knowledge USING ivfflat (embedding vector_cosine_ops);

-- Function for semantic search
CREATE OR REPLACE FUNCTION match_knowledge(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  content text,
  similarity float,
  metadata jsonb
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    nanda_ai_knowledge.content,
    1 - (nanda_ai_knowledge.embedding <=> query_embedding) as similarity,
    nanda_ai_knowledge.metadata
  FROM nanda_ai_knowledge
  WHERE 1 - (nanda_ai_knowledge.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;
```

---

# 16. ADMIN CMS

## Dashboard Overview
```
/admin
│
├── SIDEBAR
│   ├── Dashboard
│   ├── Posts (with sub-nav: Dev, Writing, Business)
│   ├── Products
│   ├── Poetry
│   ├── Orders
│   ├── Subscribers
│   ├── Testimonials
│   ├── Emails
│   └── Settings
│
└── MAIN CONTENT AREA
```

## Key Features

### Post Management
- Create/edit/delete for all 3 blog categories
- Rich text editor (Tiptap or TipTap-based)
- MDX support for React components
- Image upload to Supabase Storage
- Draft/published states
- Schedule publishing
- SEO fields (meta title, description, OG image)

### Product Management
- Full CRUD for all products
- Image gallery management
- Pricing configuration
- Stripe price ID linking
- Status management (draft, live, coming-soon)
- Feature list builder

### Poetry Management
- Add/edit poems
- Upload audio narrations
- Moderate submissions (approve/reject)
- Moderate roses (comments)
- Feature poems
- Manage collections

### Order Tracking
- View all orders
- Filter by product, date, status
- Export to CSV
- Process refunds

### Subscriber Management
- View all subscribers
- Filter by source, interests
- Export for email campaigns
- Unsubscribe management

### Email Campaigns
- Create and send newsletters
- Use React Email templates
- Segment by interests
- Track opens/clicks

---

# 17. MULTI-LANGUAGE SUPPORT

## Supported Languages
1. **English (en)** - Default
2. **isiXhosa (xh)** - Nanda's heritage
3. **Afrikaans (af)** - SA official language
4. **isiZulu (zu)** - SA's most spoken language

## Implementation
```
lib/i18n/
├── config.ts
├── dictionaries/
│   ├── en.json
│   ├── xh.json
│   ├── af.json
│   └── zu.json
└── use-translation.ts
```

### Translation Structure
```json
{
  "common": {
    "welcome": "Welcome",
    "about": "About",
    "products": "Products",
    "poetry": "Poetry",
    "blog": "Blog",
    "contact": "Contact",
    "buyNow": "Buy Now",
    "addToCart": "Add to Cart",
    "viewMore": "View More"
  },
  "home": {
    "heroTitle": "Creative Technologist",
    "heroSubtitle": "Poetry to Python • 14 Products • Building Africa's Digital Future"
  },
  "products": {
    "title": "Digital Products & Templates",
    "filterAll": "All",
    "filterStudent": "Student",
    "filterBusiness": "Business"
  },
  "poetry": {
    "title": "The Poetry Sanctuary",
    "leaveHeart": "Leave a Heart",
    "leaveRose": "Leave a Rose"
  }
}
```

### Language Switcher UI
- Dropdown in navigation
- Flags + language names
- Persists preference in localStorage
- URL-based routing optional (`/xh/about`)

## Translation Priority
1. **Phase 1:** Navigation, common UI, CTAs
2. **Phase 2:** Product pages, checkout flow
3. **Phase 3:** Blog content, poetry (community-contributed)

---

# 18. EMAIL TEMPLATES

## Template Library

### 1. Welcome Email
**Trigger:** Newsletter signup
```
Subject: "Welcome to the Nanda fam! 🌟"

- Personal greeting
- What to expect
- Quick links to best content
- Social links
- Unsubscribe
```

### 2. Purchase Confirmation
**Trigger:** Order completed
```
Subject: "Your [Product Name] is ready! 🎉"

- Order details
- Access link/instructions
- Getting started tips
- Support info
- Related products
```

### 3. Weekly Newsletter
**Trigger:** Scheduled (Fridays 9am)
```
Subject: "The Fine Print | Week of [Date]"

- Featured article
- Product spotlight
- Poetry piece
- Community highlights
- Upcoming events
```

### 4. Poetry Delivery (Subscription)
**Trigger:** Weekly for subscribers
```
Subject: "Your weekly poem: [Title] 🌹"

- Featured poem (beautifully formatted)
- Audio link if available
- Reflection prompt
- Community roses
```

### 5. Abandoned Cart
**Trigger:** 1 hour after cart created
```
Subject: "Still thinking about it? 🤔"

- Cart contents reminder
- Product benefits
- Limited-time discount code
- Clear CTA
```

## Design Guidelines
- Brand colors (Navy, Beige, Cherry)
- Cormorant Garamond for headlines
- Inter for body
- Clean, minimal design
- Mobile-responsive
- Dark mode friendly

---

# 19. PWA CONFIGURATION

## Manifest
```json
{
  "name": "CreativelyNanda",
  "short_name": "Nanda",
  "description": "Digital products, poetry, and African-first tech solutions",
  "theme_color": "#0A1128",
  "background_color": "#E8DCC4",
  "display": "standalone",
  "orientation": "portrait",
  "scope": "/",
  "start_url": "/",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

## Service Worker Features
- Cache critical assets
- Offline homepage
- Offline poetry reading
- Background sync for forms
- Push notifications (opt-in)

## Install Prompt
- Show after 2 visits
- "Add to Home Screen" banner
- Benefits: "Access offline, get notifications"
- Track installation rate

---

# 20. SEO & PERFORMANCE

## SEO Checklist
- [ ] Meta tags for every page (title, description)
- [ ] OpenGraph images (1200x630px)
- [ ] Twitter Card tags
- [ ] JSON-LD structured data (Organization, Product, Article, Person)
- [ ] Sitemap.xml (auto-generated)
- [ ] Robots.txt
- [ ] Canonical URLs
- [ ] Hreflang tags for multi-language

## Target Keywords
```
Student Success:
- "NSFAS application guide 2026"
- "how to apply for NSFAS"
- "first year university tips south africa"
- "matric study timetable template"

Notion/Productivity:
- "notion templates for students south africa"
- "freelancer notion setup"
- "small business notion template"

Tech/Code:
- "next.js tutorial for beginners"
- "supabase authentication guide"
- "how to build a saas south africa"

Wellness:
- "natural hair growth tips 4c"
- "african botanical hair care"
```

## Performance Targets
| Metric | Target |
|--------|--------|
| Performance (Lighthouse) | 90+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Cumulative Layout Shift | < 0.1 |

## Performance Optimizations
- Next.js Image optimization
- WebP with JPEG fallback
- Critical CSS inlined
- Font optimization (next/font)
- Code splitting (dynamic imports)
- Lazy load below-fold images
- Service worker caching

---

# 21. IMPLEMENTATION ORDER

## Phase 1: Foundation (Day 1)

### Hour 1: Setup
```bash
# Clone repo, create branches
git clone [repo]
git checkout -b feature/empire-upgrade

# Install dependencies
npm install framer-motion zustand @stripe/stripe-js resend

# Setup environment variables
cp .env.example .env.local
```

### Hour 2-3: Core Layout
- Grain overlay component
- Navigation (mobile + desktop)
- Footer
- Page transition wrapper
- Animation components (FadeIn, SlideUp, Stagger)

### Hour 4: Database Setup
- Run Supabase migrations
- Create all tables
- Set up RLS policies
- Seed initial data (products, poems)

---

## Phase 2: Commerce Core (Day 1-2)

### Hour 5-6: Product System
- Product card component
- Product grid with filters
- Product detail page template
- Sales page layout

### Hour 7-8: Cart & Checkout
- Cart provider (Zustand)
- Cart drawer component
- Stripe integration
- Checkout flow
- Success page

### Hour 9-10: Supabase Integration
- Products API routes
- Orders API routes
- Webhook handling

---

## Phase 3: Content Systems (Day 2)

### Hour 11-12: Blog System
- MDX setup
- Article card component
- Blog listing pages (dev, writing, business)
- Article detail template
- Code block with syntax highlighting

### Hour 13-14: Poetry Sanctuary
- Poem card component
- Poem reader with reading modes
- Heart system
- Rose (comment) system
- Book showcase

### Hour 15-16: Newsletter
- Signup form components
- Resend integration
- Email templates
- Subscriber management

---

## Phase 4: Experience Polish (Day 3)

### Hour 17-18: Homepage
- Magazine cover hero
- All sections with animations
- Testimonials carousel
- Featured content integration

### Hour 19-20: About Pages
- Overview page
- Journey timeline
- Heritage page
- Mission page

### Hour 21-22: Mirembe Landing
- Sanctuary theme
- Waitlist form
- Countdown timer
- Ambient elements

### Hour 23-24: Nanda AI
- Chat widget component
- API route for AI
- Knowledge base setup
- Proactive engagement triggers

---

## Phase 5: Admin & Launch (Day 3-4)

### Hour 25-26: Admin CMS
- Dashboard layout
- Post management
- Product management
- Order viewing

### Hour 27-28: Final Polish
- SEO optimization
- Performance audit
- Mobile testing
- Bug fixes

### Hour 29-30: Launch Prep
- Production build
- Final review
- Deploy to Vercel
- Smoke testing

---

# 🚀 READY TO BUILD

This document contains everything Claude Code needs to build the complete Nanda Empire. Feed it section by section, or reference specific sections when building individual features.

**Key Files to Generate First:**
1. `components/animations/` - All animation wrappers
2. `components/ui/` - Base UI components
3. `lib/supabase/` - Database client setup
4. `app/layout.tsx` - Root layout with providers

**Token-Saving Tips:**
- Reference this document instead of re-explaining
- Use specific section numbers ("Build according to Section 6.1")
- Build in logical order (foundation → features → polish)
- Review and approve before moving to next section

---

**Document Version:** 2.0  
**Created:** January 31, 2026  
**For:** Claude Code Implementation  
**Author:** Compiled from project documentation + past conversations

*"The more specific your instructions, the faster and cheaper Claude Code works."*
