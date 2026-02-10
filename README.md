# CreativelyNanda.co.za

A portfolio and digital platform for Nanda — creative technologist, developer, and writer — built at the intersection of technology, creativity, and business.

---

## Design Philosophy

**"Editorial Technologist"** — Magazine-quality layouts meet tech sophistication.

### Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Base | Navy | `#0A1128` |
| Neutral | Beige | `#E8DCC4` |
| Accent | Cherry | `#C1292E` |
| Clean | White | `#FEFEFE` |

### Typography

- **Display**: Cormorant Garamond (elegant serif for headers)
- **Body**: Manrope (clean sans-serif for readability)

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **State Management** | Zustand |
| **Database** | Supabase |
| **AI Integration** | OpenAI API |
| **Email** | Resend |
| **Icons** | Lucide React |
| **PWA** | next-pwa |
| **Hosting** | Vercel |

---

## Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Hero section, featured work, quick links |
| **About** | `/about` | Bio, heritage, skills, values, philosophy |
| **Projects** | `/projects` | Filterable project showcase with case studies |
| **Work** | `/work` | Career timeline with highlights and demo videos |
| **Education** | `/education` | Nelson Mandela University degrees and technical certifications |
| **Blog (The Current)** | `/blog` | Digital magazine with long-form articles |
| **Poetry** | `/poetry` | "Inside Her Roses" book, performances, and community work |
| **Mirembe Muse** | `/mirembe` | Multi-vertical business showcase |
| **Notion Systems** | `/notion` | Template products and custom system design |
| **Products** | `/products` | Digital marketplace |
| **Contact** | `/contact` | Contact form and social links |

---

## Project Structure

```
CreativelyNanda.co.za/
├── app/                        # Pages (Next.js App Router)
│   ├── layout.js               # Root layout with nav & footer
│   ├── globals.css             # Global styles & animations
│   ├── page.js                 # Home
│   ├── about/                  # About
│   ├── projects/               # Projects showcase
│   ├── work/                   # Work experience
│   ├── education/              # Education & certifications
│   ├── blog/                   # The Current digital magazine
│   ├── poetry/                 # Poetry & performances
│   ├── mirembe/                # Mirembe Muse business
│   ├── notion/                 # Notion systems
│   ├── products/               # Digital marketplace
│   ├── contact/                # Contact
│   ├── checkout/               # Checkout flow
│   ├── admin/                  # Admin dashboard
│   ├── api/                    # API routes (chat, blog, payfast, poetry)
│   └── data/                   # Data modules
│
├── components/                 # Reusable components
│   ├── animations/             # Animation wrappers (Framer Motion)
│   ├── effects/                # Visual effects (grain, particles)
│   ├── ui/                     # Base UI components
│   ├── layout/                 # Layout components
│   ├── blog/                   # Blog components
│   ├── marketplace/            # Product marketplace components
│   ├── cart/                   # Shopping cart
│   ├── gallery/                # Gallery components
│   ├── poetry/                 # Poetry components
│   ├── nanda-ai/               # AI assistant components
│   ├── Navigation.tsx          # Site navigation
│   └── Footer.tsx              # Site footer
│
├── public/                     # Static assets
│   ├── assets/                 # Images, videos, media
│   ├── cv.pdf                  # Downloadable CV
│   └── sw.js                   # Service worker (PWA)
│
├── tailwind.config.js          # Tailwind customization
├── next.config.js              # Next.js configuration
└── tsconfig.json               # TypeScript configuration
```

---

## Quick Start

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```
OPENAI_API_KEY=your_openai_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
RESEND_API_KEY=your_resend_key
```

---

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import the repository at [vercel.com](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy

Vercel auto-deploys on every push to the `main` branch.

### Alternative Platforms

- **Netlify** — Works with Next.js via the Next.js plugin
- **Railway** — Good for full-stack deployments
- **Self-hosted** — Run `npm run build` followed by `npm start`

---

## Troubleshooting

**Port already in use?**

```bash
npx kill-port 3000
```

**Styles not loading?**

```bash
rm -rf .next
npm run dev
```

**Module not found?**

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Contact

**Nanda**
Creative Technologist
Port Elizabeth, South Africa
hello@creativelynanda.co.za

---

## License

Copyright 2025 Nanda. All rights reserved.
