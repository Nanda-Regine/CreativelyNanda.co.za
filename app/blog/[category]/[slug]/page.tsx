'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  ChevronUp,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { ArticleCard, Button, Badge } from '@/components/ui';
import type { Article } from '@/components/ui/ArticleCard';

// Sample article database - will be fetched from Supabase/MDX in production
const ARTICLES_DB: Record<string, {
  article: Article;
  content: string;
  tableOfContents: { id: string; title: string; level: number }[];
}> = {
  'nextjs-14-app-router-guide': {
    article: {
      slug: 'nextjs-14-app-router-guide',
      title: 'Next.js 14 App Router: A Practical Guide',
      excerpt: 'Everything you need to know about the App Router, Server Components, and building modern React apps.',
      coverImage: '/assets/professional/nanda-consulting.jpg',
      category: 'dev',
      publishedAt: '2024-01-28',
      readingTime: 12,
      author: { name: 'Nanda Kabali-Kagwa', avatar: '/assets/professional/nanda-professional.jpg' },
    },
    content: `
## Introduction

The Next.js 14 App Router represents a paradigm shift in how we build React applications. Moving away from the pages directory, the App Router embraces React Server Components by default, offering better performance and a more intuitive mental model.

In this guide, I'll walk you through everything you need to know to get started with the App Router, based on my experience building several production applications with it.

## Understanding the App Router

The App Router uses a file-system based router where folders define routes. Each folder represents a route segment that maps to a URL segment.

### Key Concepts

- **Layouts**: Shared UI between routes that preserve state on navigation
- **Templates**: Similar to layouts but create a new instance on navigation
- **Loading States**: Built-in loading UI with React Suspense
- **Error Handling**: Error boundaries at the route level

## Server Components vs Client Components

By default, all components in the App Router are Server Components. This means they render on the server and send HTML to the client.

\`\`\`tsx
// This is a Server Component by default
export default function Page() {
  return <h1>Hello, World!</h1>
}
\`\`\`

To make a component interactive (useState, useEffect, event handlers), add the 'use client' directive:

\`\`\`tsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
\`\`\`

## Data Fetching

One of the biggest improvements in the App Router is how data fetching works. You can fetch data directly in Server Components using async/await:

\`\`\`tsx
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{data.title}</div>
}
\`\`\`

## Best Practices

1. **Keep Client Components small** - Only add 'use client' where you need interactivity
2. **Use Server Components for data fetching** - Avoid waterfalls by fetching at the top
3. **Leverage parallel routes** - For complex layouts with independent loading states
4. **Use Route Handlers for APIs** - Replace API routes with route.ts files

## Conclusion

The App Router is a significant step forward for Next.js. While there's a learning curve, the benefits in performance and developer experience are worth it. Start small, migrate gradually, and embrace the new patterns.

Happy coding!
    `,
    tableOfContents: [
      { id: 'introduction', title: 'Introduction', level: 2 },
      { id: 'understanding-the-app-router', title: 'Understanding the App Router', level: 2 },
      { id: 'key-concepts', title: 'Key Concepts', level: 3 },
      { id: 'server-components-vs-client-components', title: 'Server vs Client Components', level: 2 },
      { id: 'data-fetching', title: 'Data Fetching', level: 2 },
      { id: 'best-practices', title: 'Best Practices', level: 2 },
      { id: 'conclusion', title: 'Conclusion', level: 2 },
    ],
  },
  'poetry-as-therapy': {
    article: {
      slug: 'poetry-as-therapy',
      title: 'Poetry as Therapy: Writing Through Pain',
      excerpt: 'How writing poetry helped me process grief, trauma, and find healing through words.',
      coverImage: '/assets/poetry-book/book-cover-1.jpg',
      category: 'writing',
      publishedAt: '2024-01-20',
      readingTime: 6,
      author: { name: 'Nanda Kabali-Kagwa', avatar: '/assets/professional/nanda-professional.jpg' },
    },
    content: `
## The Weight of Unspoken Words

There are moments in life when the weight of what we carry becomes unbearable. For me, those moments came in waves — loss, heartbreak, the quiet ache of existing in a world that doesn't always see you.

I didn't set out to become a poet. Poetry found me in the dark, when speaking felt impossible but writing felt like breathing.

## Finding Voice in Verse

My first poems were raw, unpolished, desperate. They weren't meant for anyone's eyes but my own. Late nights, tear-stained pages, words that tumbled out like confessions.

> "She writes because silence is too loud,
> because the words need somewhere to go,
> because healing happens in the telling."

These early pieces became the foundation of what would later become "Inside Her Roses."

## The Healing Process

Writing poetry isn't about finding the right words — it's about finding YOUR words. The ones that live in your chest, that keep you up at night, that demand to be released.

### What I Learned

1. **There's no wrong way to grieve** - Your process is yours alone
2. **Poetry doesn't have to be perfect** - Raw is real, and real heals
3. **Sharing is optional** - Write for yourself first
4. **Pain transforms** - What hurts today becomes wisdom tomorrow

## The Gift of Expression

Today, when I perform my poetry, I see tears in the audience. Not because my pain is unique, but because it's universal. We all carry weight. We all need release.

If you're struggling, I encourage you to write. Not for publication, not for praise — but for you. Let the words flow. Let them be messy. Let them heal you.

## Your Turn

You don't need permission to be a poet. You just need a pen, paper, and the courage to be honest with yourself.

Start with this prompt: *"The thing I've never told anyone is..."*

See where it takes you.
    `,
    tableOfContents: [
      { id: 'the-weight-of-unspoken-words', title: 'The Weight of Unspoken Words', level: 2 },
      { id: 'finding-voice-in-verse', title: 'Finding Voice in Verse', level: 2 },
      { id: 'the-healing-process', title: 'The Healing Process', level: 2 },
      { id: 'what-i-learned', title: 'What I Learned', level: 3 },
      { id: 'the-gift-of-expression', title: 'The Gift of Expression', level: 2 },
      { id: 'your-turn', title: 'Your Turn', level: 2 },
    ],
  },
  'building-notion-templates-that-sell': {
    article: {
      slug: 'building-notion-templates-that-sell',
      title: 'Building Notion Templates That Actually Sell',
      excerpt: 'A deep dive into creating Notion templates that solve real problems and generate passive income.',
      coverImage: '/assets/professional/nanda-consulting.jpg',
      category: 'business',
      publishedAt: '2024-02-01',
      readingTime: 8,
      author: { name: 'Nanda Kabali-Kagwa', avatar: '/assets/professional/nanda-professional.jpg' },
    },
    content: `
## Why Notion Templates?

The Notion template market has exploded. What started as a productivity tool has become a platform for digital entrepreneurs to build sustainable income streams.

I've sold over 1,000 templates in the past year, and I want to share what I've learned about creating templates that actually sell.

## Understanding Your Audience

Before you design anything, you need to understand who you're building for. The biggest mistake I see is building templates that solve YOUR problems, not your customer's problems.

### Ask Yourself

- Who is struggling with this problem?
- What have they already tried?
- What would their ideal solution look like?
- How much time/money would they save?

## Design Principles That Sell

### 1. First Impressions Matter

Your template thumbnail is your storefront. Invest time in making it look professional. Use consistent colors, clean typography, and show the template in action.

### 2. Solve One Problem Well

Don't try to build an "everything" template. The most successful templates solve one specific problem exceptionally well.

### 3. Include Instructions

Never assume your customers know how to use your template. Include a "Getting Started" section with clear steps.

## Pricing Strategy

Pricing is more art than science, but here's my framework:

- **$5-15**: Simple templates, single-page solutions
- **$19-49**: Multi-database systems, comprehensive solutions
- **$49-99**: Complex systems, business solutions
- **$99+**: Enterprise-grade, includes support

## Marketing Your Templates

Building is only half the battle. Here's how I market:

1. **Create a landing page** - Use Gumroad, Lemonsqueezy, or your own site
2. **Show, don't tell** - Video walkthroughs convert better than screenshots
3. **Leverage social proof** - Reviews and testimonials build trust
4. **Build in public** - Share your creation process on Twitter/X

## The Long Game

Template income isn't overnight success. It's about building a catalog, iterating on feedback, and consistently showing up.

Start with one template. Make it excellent. Then build the next one.

You've got this.
    `,
    tableOfContents: [
      { id: 'why-notion-templates', title: 'Why Notion Templates?', level: 2 },
      { id: 'understanding-your-audience', title: 'Understanding Your Audience', level: 2 },
      { id: 'design-principles-that-sell', title: 'Design Principles That Sell', level: 2 },
      { id: 'pricing-strategy', title: 'Pricing Strategy', level: 2 },
      { id: 'marketing-your-templates', title: 'Marketing Your Templates', level: 2 },
      { id: 'the-long-game', title: 'The Long Game', level: 2 },
    ],
  },
  'freelancing-in-south-africa': {
    article: {
      slug: 'freelancing-in-south-africa',
      title: 'Freelancing in South Africa: The Real Talk',
      excerpt: 'Navigating load-shedding, payments, and building a sustainable freelance career in SA.',
      coverImage: '/assets/professional/nanda-consulting.jpg',
      category: 'business',
      publishedAt: '2024-01-15',
      readingTime: 10,
      author: { name: 'Nanda Kabali-Kagwa', avatar: '/assets/professional/nanda-professional.png' },
    },
    content: `
## The Reality of Freelancing in SA

Let's be honest — freelancing in South Africa comes with unique challenges that our international peers don't fully understand. Load-shedding, fluctuating exchange rates, and payment difficulties are just the beginning.

But here's the thing: it's absolutely possible to build a thriving freelance career here. I've done it, and I want to share what I've learned.

## Dealing with Load-Shedding

### The Essentials

1. **Invest in a UPS** - A basic UPS gives you 2-4 hours of laptop power
2. **Get mobile data backup** - When WiFi goes down, LTE/5G saves the day
3. **Use the EskomSePush app** - Plan your high-focus work around load-shedding schedules
4. **Coffee shops and co-working spaces** - Know your backup locations

### Planning Your Day

I've learned to structure my work around load-shedding stages. High-focus work (coding, writing) happens during guaranteed power times. Admin tasks, emails, and planning can happen on mobile during outages.

## Payment Solutions for SA Freelancers

### Getting Paid from International Clients

- **Payoneer** - Lower fees, works well with most platforms
- **Wise (TransferWise)** - Great exchange rates, fast transfers
- **PayPal** - Universal but higher fees, withdrawal limitations
- **Direct bank transfer** - SWIFT transfers work but are slow and expensive

### Local Payment Methods

- **Instant EFT** - Fast for local clients
- **SnapScan/Zapper** - Good for small projects
- **PayFast** - Great for product sales

## Building Your Client Base

### Start Local, Go Global

Don't underestimate local clients. South African businesses need good freelancers, and you can build lasting relationships here before expanding internationally.

### Leverage the Time Zone

Working with European clients? You're only 1-2 hours ahead. US East Coast? 6-7 hours ahead means you can deliver overnight while they sleep.

## Pricing Your Services

### The Rand Reality

Price in USD or EUR for international clients. Your South African cost of living means you can be competitive while earning well.

### Local Market Rates

Don't undervalue yourself locally either. Quality work deserves fair compensation, even in Rands.

## The Mindset Shift

Freelancing in SA requires resilience. You'll face challenges that international freelancers don't. But you'll also develop problem-solving skills that make you incredibly adaptable.

Every load-shedding stage survived, every payment issue navigated, makes you stronger. That's the real freelancer skill.

## You've Got This

South African freelancers are some of the most resourceful professionals I know. We make things work. We find solutions. We build careers despite the obstacles.

Welcome to the journey.
    `,
    tableOfContents: [
      { id: 'the-reality-of-freelancing-in-sa', title: 'The Reality of Freelancing in SA', level: 2 },
      { id: 'dealing-with-load-shedding', title: 'Dealing with Load-Shedding', level: 2 },
      { id: 'payment-solutions-for-sa-freelancers', title: 'Payment Solutions', level: 2 },
      { id: 'building-your-client-base', title: 'Building Your Client Base', level: 2 },
      { id: 'pricing-your-services', title: 'Pricing Your Services', level: 2 },
      { id: 'the-mindset-shift', title: 'The Mindset Shift', level: 2 },
    ],
  },
  'typescript-for-beginners': {
    article: {
      slug: 'typescript-for-beginners',
      title: 'TypeScript for JavaScript Developers',
      excerpt: 'A gentle introduction to TypeScript that will make you wonder why you waited so long.',
      coverImage: '/assets/professional/nanda-consulting.jpg',
      category: 'dev',
      publishedAt: '2024-01-10',
      readingTime: 15,
      author: { name: 'Nanda Kabali-Kagwa', avatar: '/assets/professional/nanda-professional.png' },
    },
    content: `
## Why TypeScript?

I resisted TypeScript for years. "It's just JavaScript with extra steps," I told myself. I was wrong. TypeScript has made me a better developer, and it can do the same for you.

## What is TypeScript?

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. In simple terms: it's JavaScript with superpowers.

\`\`\`typescript
// JavaScript
function greet(name) {
  return "Hello, " + name;
}

// TypeScript
function greet(name: string): string {
  return "Hello, " + name;
}
\`\`\`

## Getting Started

### Installation

\`\`\`bash
npm install -g typescript
\`\`\`

### Your First TypeScript File

Create a file called \`hello.ts\`:

\`\`\`typescript
const message: string = "Hello, TypeScript!";
console.log(message);
\`\`\`

Compile it: \`tsc hello.ts\`

## Basic Types

### Primitives

\`\`\`typescript
let name: string = "Nanda";
let age: number = 28;
let isAwesome: boolean = true;
\`\`\`

### Arrays

\`\`\`typescript
let numbers: number[] = [1, 2, 3];
let names: string[] = ["Alice", "Bob"];
\`\`\`

### Objects

\`\`\`typescript
interface User {
  name: string;
  age: number;
  email?: string; // optional
}

const user: User = {
  name: "Nanda",
  age: 28
};
\`\`\`

## Why Types Matter

### Catch Errors Early

TypeScript catches errors at compile time, not runtime:

\`\`\`typescript
function multiply(a: number, b: number): number {
  return a * b;
}

multiply("2", 3); // Error! Type 'string' is not assignable
\`\`\`

### Better IDE Support

With types, your editor knows exactly what's available:

- Autocomplete that actually works
- Inline documentation
- Refactoring confidence

### Self-Documenting Code

Types serve as documentation:

\`\`\`typescript
interface BlogPost {
  title: string;
  content: string;
  author: User;
  publishedAt: Date;
  tags: string[];
}
\`\`\`

## Common Patterns

### Union Types

\`\`\`typescript
type Status = "loading" | "success" | "error";
let currentStatus: Status = "loading";
\`\`\`

### Generics

\`\`\`typescript
function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

const firstNumber = getFirst([1, 2, 3]); // number
const firstString = getFirst(["a", "b"]); // string
\`\`\`

## Start Small

You don't have to type everything at once. TypeScript supports gradual adoption:

1. Rename \`.js\` to \`.ts\`
2. Add types to function parameters
3. Create interfaces for objects
4. Enable strict mode when ready

## The Payoff

After two weeks with TypeScript, you'll wonder how you ever coded without it. The confidence, the tooling, the self-documenting nature — it's worth the learning curve.

Welcome to typed JavaScript.
    `,
    tableOfContents: [
      { id: 'why-typescript', title: 'Why TypeScript?', level: 2 },
      { id: 'what-is-typescript', title: 'What is TypeScript?', level: 2 },
      { id: 'getting-started', title: 'Getting Started', level: 2 },
      { id: 'basic-types', title: 'Basic Types', level: 2 },
      { id: 'why-types-matter', title: 'Why Types Matter', level: 2 },
      { id: 'common-patterns', title: 'Common Patterns', level: 2 },
      { id: 'start-small', title: 'Start Small', level: 2 },
    ],
  },
  'inside-her-roses-journey': {
    article: {
      slug: 'inside-her-roses-journey',
      title: 'The Journey of "Inside Her Roses"',
      excerpt: 'From late-night scribbles to a published book — the story behind my debut poetry collection.',
      coverImage: '/assets/poetry-book/book-cover-1.jpg',
      category: 'writing',
      publishedAt: '2024-01-05',
      readingTime: 7,
      author: { name: 'Nanda Kabali-Kagwa', avatar: '/assets/professional/nanda-professional.png' },
    },
    content: `
## The First Words

"Inside Her Roses" didn't start as a book. It started as survival.

2019 was one of the hardest years of my life. I was navigating loss, identity questions, and the weight of existing in spaces that didn't always see me. Poetry became my refuge.

## Writing in the Dark

My first poems were written at 2am, tears blurring the screen, words tumbling out faster than I could type. They weren't polished. They weren't meant for anyone's eyes.

> "Some roses bloom in darkness,
> not despite the lack of light,
> but because of it."

These raw, desperate verses became the seeds of something bigger.

## Finding the Theme

As months passed and poems accumulated, I noticed themes emerging:

- **Growth through pain** - Roses that bloom in unlikely places
- **Black womanhood** - Celebrating identity and heritage
- **Love in all forms** - Self-love, romantic love, community love
- **Healing as a journey** - Not a destination

The rose became my central metaphor — beauty that comes with thorns, growth that requires both sunshine and rain.

## The Collection Takes Shape

I spent six months organizing, editing, and sequencing the poems. Each section represents a stage of growth:

1. **Soil** - The foundation, the pain, the buried parts
2. **Roots** - Finding grounding, connecting to heritage
3. **Stems** - Rising up, building strength
4. **Blooms** - Celebration, beauty, arrival

## Publishing the Book

Self-publishing was intentional. I wanted control over every aspect — the words, the design, the message. Working with local artists for the cover art meant the book was authentically South African.

The launch night at a local bookstore was surreal. Seeing people hold something that started as private pain transformed into shared healing... there are no words.

## What It Taught Me

Writing this book taught me that:

- **Our stories matter** - Your pain is valid, and sharing it can help others
- **Vulnerability is strength** - The poems people connected with most were my most honest ones
- **Art is healing** - Both in the creation and the sharing

## The Ongoing Journey

"Inside Her Roses" isn't the end. It's a beginning. I continue to write, perform, and share. Each poem is another petal, another piece of a larger bloom.

If you're holding onto words that need release, I encourage you to write them. They might become something you never expected.

Your roses are waiting to bloom.
    `,
    tableOfContents: [
      { id: 'the-first-words', title: 'The First Words', level: 2 },
      { id: 'writing-in-the-dark', title: 'Writing in the Dark', level: 2 },
      { id: 'finding-the-theme', title: 'Finding the Theme', level: 2 },
      { id: 'the-collection-takes-shape', title: 'The Collection Takes Shape', level: 2 },
      { id: 'publishing-the-book', title: 'Publishing the Book', level: 2 },
      { id: 'what-it-taught-me', title: 'What It Taught Me', level: 2 },
      { id: 'the-ongoing-journey', title: 'The Ongoing Journey', level: 2 },
    ],
  },
  'react-server-components-deep-dive': {
    article: {
      slug: 'react-server-components-deep-dive',
      title: 'React Server Components: A Deep Dive',
      excerpt: 'Understanding the paradigm shift in React development and how RSC changes everything.',
      coverImage: null,
      category: 'dev',
      publishedAt: '2024-01-02',
      readingTime: 18,
      author: { name: 'Nanda Kabali-Kagwa', avatar: '/assets/professional/nanda-professional.png' },
    },
    content: `
## The Paradigm Shift

React Server Components (RSC) represent the biggest change to React since hooks. They fundamentally alter how we think about rendering, data fetching, and application architecture.

Let me break it down.

## What Are Server Components?

Server Components are React components that render exclusively on the server. They:

- Never ship JavaScript to the client
- Can directly access backend resources (databases, files)
- Stream their output to the client

\`\`\`tsx
// This is a Server Component (default in Next.js App Router)
async function UserList() {
  const users = await db.query('SELECT * FROM users');
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
\`\`\`

## Server vs Client Components

### Server Components (Default)

- Run only on the server
- Can use async/await
- Direct database access
- No interactivity (no useState, useEffect)
- Zero client-side JavaScript

### Client Components

- Run on both server and client
- Can use hooks
- Handle user interactions
- Require 'use client' directive

\`\`\`tsx
'use client';

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
\`\`\`

## The Mental Model

Think of it like this:

- **Server Components** = Static content, data fetching, heavy lifting
- **Client Components** = Interactivity, user events, state management

The key insight: most of your app doesn't need interactivity. RSC lets you ship zero JavaScript for those parts.

## Composition Patterns

### Server Component as Parent

\`\`\`tsx
// Server Component
async function Dashboard() {
  const data = await fetchDashboardData();

  return (
    <div>
      <h1>Dashboard</h1>
      <StaticChart data={data} />      {/* Server */}
      <InteractiveFilter />             {/* Client */}
    </div>
  );
}
\`\`\`

### Passing Server Data to Client

\`\`\`tsx
// Server Component
async function ProductPage({ id }) {
  const product = await getProduct(id);

  return (
    <div>
      <h1>{product.name}</h1>
      <AddToCartButton product={product} />  {/* Pass as props */}
    </div>
  );
}
\`\`\`

## Performance Benefits

### Bundle Size

Server Components don't add to your JavaScript bundle. A complex data grid with 50KB of dependencies? Zero KB shipped to client.

### Streaming

React 18's streaming allows components to render progressively:

\`\`\`tsx
import { Suspense } from 'react';

function Page() {
  return (
    <div>
      <Header />                      {/* Immediate */}
      <Suspense fallback={<Spinner />}>
        <SlowContent />              {/* Streams when ready */}
      </Suspense>
    </div>
  );
}
\`\`\`

## Common Mistakes

### 1. Over-using 'use client'

Don't make everything a Client Component. Only add 'use client' when you need interactivity.

### 2. Importing Server Components into Client Components

This doesn't work:

\`\`\`tsx
'use client';
import ServerComponent from './ServerComponent'; // ❌
\`\`\`

Instead, pass as children:

\`\`\`tsx
<ClientComponent>
  <ServerComponent />  {/* ✅ */}
</ClientComponent>
\`\`\`

### 3. Forgetting the Boundary

Everything imported by a Client Component becomes a Client Component. Be mindful of your component tree.

## When to Use What

| Use Server Components For | Use Client Components For |
|--------------------------|--------------------------|
| Data fetching | User interactions |
| Static content | Hooks (useState, useEffect) |
| Backend access | Browser APIs |
| Large dependencies | Animations |

## The Future is Hybrid

RSC isn't replacing Client Components — it's complementing them. The future of React is a hybrid model where you use the right tool for each job.

Embrace the shift. Your users (and their bandwidth) will thank you.
    `,
    tableOfContents: [
      { id: 'the-paradigm-shift', title: 'The Paradigm Shift', level: 2 },
      { id: 'what-are-server-components', title: 'What Are Server Components?', level: 2 },
      { id: 'server-vs-client-components', title: 'Server vs Client Components', level: 2 },
      { id: 'the-mental-model', title: 'The Mental Model', level: 2 },
      { id: 'composition-patterns', title: 'Composition Patterns', level: 2 },
      { id: 'performance-benefits', title: 'Performance Benefits', level: 2 },
      { id: 'common-mistakes', title: 'Common Mistakes', level: 2 },
      { id: 'when-to-use-what', title: 'When to Use What', level: 2 },
    ],
  },
  'black-girl-magic-poetry': {
    article: {
      slug: 'black-girl-magic-poetry',
      title: 'Writing Black Girl Magic: Celebrating Identity',
      excerpt: 'Exploring themes of identity, heritage, and empowerment through contemporary African poetry.',
      coverImage: '/assets/poetry-book/book-cover-1.jpg',
      category: 'writing',
      publishedAt: '2023-12-28',
      readingTime: 5,
      author: { name: 'Nanda Kabali-Kagwa', avatar: '/assets/professional/nanda-professional.png' },
    },
    content: `
## What is Black Girl Magic?

Black Girl Magic isn't just a hashtag. It's a movement, a recognition, a celebration of the excellence that Black women carry in our DNA.

In poetry, Black Girl Magic becomes a lens through which we explore identity, heritage, and the unique experience of being a Black woman in this world.

## Finding My Voice

Growing up in South Africa, I straddled multiple worlds — Ugandan heritage, African identity, global aspirations. My poetry became a space to reconcile these layers.

> "I am my grandmother's prayers
> and my mother's dreams,
> wrapped in melanin and magic,
> stitching seams where worlds collide."

## Themes I Explore

### Ancestral Connection

Our grandmothers survived so we could thrive. Their stories live in our bones.

### Body Politics

Celebrating the Black female form in a world that hasn't always valued it.

### Code-Switching

The exhausting dance of adapting to different spaces while staying true to yourself.

### Joy as Resistance

Choosing happiness, choosing celebration, choosing ourselves.

## The Power of Representation

When I perform poems about Black womanhood, young Black girls come up to me afterwards. "I've never heard someone say the things I feel," they tell me.

This is why representation matters. This is why we write.

## Writing Your Own Magic

You don't need permission to write about your identity. Some tips:

1. **Write what you know** - Your experience is valid
2. **Don't explain** - Write for those who understand
3. **Be specific** - Universal truths hide in specific details
4. **Celebrate** - Not every poem needs to be about struggle

## A Poem for You

> **Melanin**
>
> They called my skin too dark
> before I knew what dark meant,
> before I knew that darkness
> is where stars are born,
> where seeds become forests,
> where rest becomes revival.
>
> Now I know: my darkness
> is not absence of light.
> It is light so concentrated,
> so dense with brilliance,
> that it appears to absorb
> rather than reflect.
>
> I am not dark.
> I am everything light wants to be
> when it grows up.

## Your Turn

Write a poem about your identity. Don't edit, don't judge. Just let the words flow. Your magic is waiting to be named.
    `,
    tableOfContents: [
      { id: 'what-is-black-girl-magic', title: 'What is Black Girl Magic?', level: 2 },
      { id: 'finding-my-voice', title: 'Finding My Voice', level: 2 },
      { id: 'themes-i-explore', title: 'Themes I Explore', level: 2 },
      { id: 'the-power-of-representation', title: 'The Power of Representation', level: 2 },
      { id: 'writing-your-own-magic', title: 'Writing Your Own Magic', level: 2 },
      { id: 'a-poem-for-you', title: 'A Poem for You', level: 2 },
    ],
  },
  'digital-products-passive-income': {
    article: {
      slug: 'digital-products-passive-income',
      title: 'Digital Products: Building Passive Income Streams',
      excerpt: 'How I built multiple revenue streams through digital products while working a full-time job.',
      coverImage: null,
      category: 'business',
      publishedAt: '2023-12-20',
      readingTime: 12,
      author: { name: 'Nanda Kabali-Kagwa', avatar: '/assets/professional/nanda-professional.png' },
    },
    content: `
## The Passive Income Promise

Let's get something straight: "passive income" is a misnomer. Nothing is truly passive. But digital products come close — you create once, sell forever.

I built my first digital product revenue stream while working full-time. Here's how.

## My Digital Product Portfolio

After three years of building, my portfolio includes:

- **Notion Templates** - Productivity systems, planners, databases
- **Code Components** - React UI kits, animation libraries
- **Digital Art** - Downloadable prints, phone wallpapers
- **eBooks** - Poetry collection, guides

Each product generates revenue while I sleep.

## Choosing Your First Product

### Start with What You Know

What problems do you solve daily? What do people ask you for help with? There's a product hiding in your expertise.

### Validate Before Building

Before spending weeks on a product:

1. Post about the idea on social media
2. Create a waitlist landing page
3. Ask potential customers what they'd pay
4. Research existing competition

## Building in Public

One of my best decisions was building in public. I shared:

- Work-in-progress screenshots
- Challenges and solutions
- Revenue numbers (transparently)
- Lessons learned

This built an audience before the product launched.

## Pricing Strategies

### The Three-Tier Model

I use tiered pricing for most products:

- **Basic ($15-25)** - The core product
- **Pro ($35-49)** - Core + extras (templates, tutorials)
- **Bundle ($79-149)** - Everything, all updates

### Launch Pricing

I always launch at 30-40% off, then increase to full price after a week. This creates urgency and rewards early supporters.

## Platforms I Use

### For Notion Templates

- **Gumroad** - Simple, low fees, international payments
- **Lemonsqueezy** - Great for EU compliance
- **Own website** - Higher margins, full control

### For Code Products

- **Gumroad** - Works well for code downloads
- **GitHub Sponsors** - For open-source with premium features
- **Direct sales** - For higher-priced items

## Marketing Without Burning Out

### Content Marketing

I create free content that leads to paid products:

- Twitter threads → Notion templates
- Blog posts → Code tutorials → UI kits
- Instagram posts → Digital art → Print sales

### Email List

Your email list is your most valuable asset. I offer a free mini-template to grow my list, then nurture subscribers with weekly value.

## The Numbers

After 3 years of building digital products:

- **Total products**: 15
- **Monthly revenue**: R15,000 - R25,000 (varies)
- **Hours per week**: 5-10 (maintenance + marketing)

It's not retire-early money, but it's meaningful supplemental income that grows over time.

## Getting Started Today

1. **Pick one product idea** - Don't overthink it
2. **Build an MVP** - Minimum viable product
3. **Launch to 10 people** - Friends, family, Twitter followers
4. **Iterate based on feedback**
5. **Repeat**

Your first product won't be perfect. Mine wasn't. But it taught me more than any course could.

Start building.
    `,
    tableOfContents: [
      { id: 'the-passive-income-promise', title: 'The Passive Income Promise', level: 2 },
      { id: 'my-digital-product-portfolio', title: 'My Digital Product Portfolio', level: 2 },
      { id: 'choosing-your-first-product', title: 'Choosing Your First Product', level: 2 },
      { id: 'building-in-public', title: 'Building in Public', level: 2 },
      { id: 'pricing-strategies', title: 'Pricing Strategies', level: 2 },
      { id: 'platforms-i-use', title: 'Platforms I Use', level: 2 },
      { id: 'marketing-without-burning-out', title: 'Marketing Without Burning Out', level: 2 },
      { id: 'the-numbers', title: 'The Numbers', level: 2 },
      { id: 'getting-started-today', title: 'Getting Started Today', level: 2 },
    ],
  },
};

// Related articles by category
const RELATED_ARTICLES: Record<string, Article[]> = {
  dev: [
    {
      slug: 'typescript-for-beginners',
      title: 'TypeScript for JavaScript Developers',
      excerpt: 'A gentle introduction to TypeScript.',
      coverImage: '/assets/professional/nanda-consulting.jpg',
      category: 'dev',
      publishedAt: '2024-01-10',
      readingTime: 15,
      author: { name: 'Nanda Kabali-Kagwa' },
    },
    {
      slug: 'framer-motion-animations',
      title: 'Beautiful Animations with Framer Motion',
      excerpt: 'Create smooth animations in React.',
      coverImage: '/assets/professional/nanda-consulting.jpg',
      category: 'dev',
      publishedAt: '2024-01-05',
      readingTime: 10,
      author: { name: 'Nanda Kabali-Kagwa' },
    },
  ],
  writing: [
    {
      slug: 'inside-her-roses-journey',
      title: 'The Journey of "Inside Her Roses"',
      excerpt: 'The story behind my poetry collection.',
      coverImage: '/assets/poetry-book/book-cover-1.jpg',
      category: 'writing',
      publishedAt: '2024-01-05',
      readingTime: 7,
      author: { name: 'Nanda Kabali-Kagwa' },
    },
    {
      slug: 'finding-your-voice',
      title: 'Finding Your Voice as a Writer',
      excerpt: 'Discovering your unique style.',
      coverImage: '/assets/poetry-book/book-cover-1.jpg',
      category: 'writing',
      publishedAt: '2023-12-28',
      readingTime: 8,
      author: { name: 'Nanda Kabali-Kagwa' },
    },
  ],
  business: [
    {
      slug: 'freelancing-in-south-africa',
      title: 'Freelancing in South Africa',
      excerpt: 'Building a sustainable freelance career.',
      coverImage: '/assets/professional/nanda-consulting.jpg',
      category: 'business',
      publishedAt: '2024-01-15',
      readingTime: 10,
      author: { name: 'Nanda Kabali-Kagwa' },
    },
    {
      slug: 'pricing-digital-products',
      title: 'How to Price Your Digital Products',
      excerpt: 'Stop undercharging for your work.',
      coverImage: '/assets/professional/nanda-consulting.jpg',
      category: 'business',
      publishedAt: '2024-01-08',
      readingTime: 7,
      author: { name: 'Nanda Kabali-Kagwa' },
    },
  ],
};

const categoryMeta = {
  dev: { label: 'Development', color: 'bg-blue-100 text-blue-700', gradient: 'from-blue-900 to-cyan-900' },
  writing: { label: 'Writing', color: 'bg-purple-100 text-purple-700', gradient: 'from-purple-900 to-pink-900' },
  business: { label: 'Business', color: 'bg-emerald-100 text-emerald-700', gradient: 'from-emerald-900 to-teal-900' },
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = params.category as 'dev' | 'writing' | 'business';

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const articleData = ARTICLES_DB[slug];
  const meta = categoryMeta[category] || categoryMeta.dev;
  const relatedArticles = RELATED_ARTICLES[category] || [];

  if (!articleData) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-navy mb-4">Article Not Found</h1>
          <p className="text-navy/60 mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button variant="primary" className="rounded-full">
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const { article, content, tableOfContents } = articleData;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-beige">
      {/* Hero */}
      <section className={`relative py-20 px-4 bg-gradient-to-br ${meta.gradient} overflow-hidden`}>
        <div className="absolute inset-0 opacity-20">
          <Image
            src={article.coverImage}
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href={`/blog/${category}`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {meta.label}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" size="sm" pill className={`mb-6 ${meta.color}`}>
              {meta.label}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
              {article.title}
            </h1>

            <p className="text-lg text-white/80 mb-8 max-w-2xl">
              {article.excerpt}
            </p>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                {article.author.avatar ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                    <Image
                      src={article.author.avatar}
                      alt={article.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-medium">
                    {article.author.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-medium text-white">{article.author.name}</p>
                  <p className="text-sm text-white/60">Author</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white/70 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(article.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {article.readingTime} min read
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_250px] gap-12">
            {/* Article Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg prose-navy max-w-none"
            >
              {/* Render content as HTML (in production, use MDX) */}
              <div
                className="article-content"
                dangerouslySetInnerHTML={{
                  __html: content
                    .replace(/## (.*)/g, '<h2 id="$1">$1</h2>')
                    .replace(/### (.*)/g, '<h3 id="$1">$1</h3>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/`{3}(\w+)?\n([\s\S]*?)`{3}/g, '<pre><code class="language-$1">$2</code></pre>')
                    .replace(/`([^`]+)`/g, '<code>$1</code>')
                    .replace(/> (.*)/g, '<blockquote>$1</blockquote>')
                    .replace(/^\d+\. (.*)/gm, '<li>$1</li>')
                    .replace(/^- (.*)/gm, '<li>$1</li>')
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/^/, '<p>')
                    .replace(/$/, '</p>')
                }}
              />
            </motion.article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-8">
                {/* Table of Contents */}
                <div className="bg-cream rounded-xl p-6 shadow-sm border border-navy/5">
                  <h3 className="font-display font-semibold text-navy mb-4">On This Page</h3>
                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${slugify(item.title)}`}
                        className={`block text-sm text-navy/60 hover:text-cherry transition-colors ${
                          item.level === 3 ? 'pl-4' : ''
                        }`}
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Share */}
                <div className="bg-cream rounded-xl p-6 shadow-sm border border-navy/5">
                  <h3 className="font-display font-semibold text-navy mb-4 flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </h3>
                  <div className="flex gap-2">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-navy/5 rounded-lg hover:bg-navy/10 transition-colors"
                    >
                      <Twitter className="w-5 h-5 text-navy" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-navy/5 rounded-lg hover:bg-navy/10 transition-colors"
                    >
                      <Linkedin className="w-5 h-5 text-navy" />
                    </a>
                    <button
                      onClick={handleCopyLink}
                      className="p-3 bg-navy/5 rounded-lg hover:bg-navy/10 transition-colors relative"
                    >
                      <LinkIcon className="w-5 h-5 text-navy" />
                      {copied && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-navy text-white px-2 py-1 rounded">
                          Copied!
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 px-4 bg-cream/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-display font-bold text-navy mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedArticles.map((related, i) => (
                <motion.div
                  key={related.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <ArticleCard article={related} variant="horizontal" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Scroll to Top */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-cherry text-white rounded-full shadow-lg hover:bg-cherry-dark transition-colors z-50"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}

      {/* Article Styles */}
      <style jsx global>{`
        .article-content h2 {
          font-family: var(--font-display);
          font-size: 1.75rem;
          font-weight: 700;
          color: #0A1128;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .article-content h3 {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          color: #0A1128;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .article-content p {
          color: #0A1128;
          opacity: 0.8;
          line-height: 1.8;
          margin-bottom: 1.25rem;
        }
        .article-content blockquote {
          border-left: 4px solid #C41E3A;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #0A1128;
          opacity: 0.9;
        }
        .article-content pre {
          background: #0A1128;
          color: #F5F0E8;
          padding: 1.5rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .article-content code {
          background: #0A1128;
          color: #F5F0E8;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }
        .article-content pre code {
          background: none;
          padding: 0;
        }
        .article-content ul, .article-content ol {
          margin: 1rem 0 1.5rem 1.5rem;
        }
        .article-content li {
          color: #0A1128;
          opacity: 0.8;
          margin-bottom: 0.5rem;
          line-height: 1.7;
        }
        .article-content strong {
          color: #0A1128;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
