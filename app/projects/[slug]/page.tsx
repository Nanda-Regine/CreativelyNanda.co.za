import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Users, Zap, Globe, ArrowRight } from 'lucide-react';
import { JsonLd, SITE_URL, AUTHOR_NAME } from '@/lib/seo';

// ============================================================
// PROJECT DATA
// ============================================================

const projects: Record<string, ProjectData> = {
  'stokvel-os': {
    slug: 'stokvel-os',
    title: 'StokvelOS',
    tagline: 'Revolutionary Community Finance Platform for 11M South Africans',
    description:
      'AI-powered stokvel management platform digitalizing South Africa\'s R50 billion informal savings economy. Built to serve 11 million South Africans in stokvels with automated record-keeping, contribution tracking, and fraud detection.',
    category: 'Community Impact · AI/ML · SaaS',
    status: 'Beta',
    year: '2025',
    problem:
      '11 million South Africans participate in stokvels — community savings groups — but 95% operate manually with paper records, cash handling, and zero audit trails. This leads to disputes, fraud, and financial loss in communities that can least afford it.',
    solution:
      'A full-stack SaaS platform with AI-powered fraud detection, automated contribution tracking, member management, and digital financial records. Designed from the ground up for South African community structures.',
    techStack: [
      { name: 'Next.js 14', reason: 'App Router for SEO + SSR' },
      { name: 'TypeScript', reason: 'Type safety for financial data' },
      { name: 'Supabase (PostgreSQL + RLS)', reason: 'Row-Level Security for member privacy' },
      { name: 'OpenAI', reason: 'AI fraud pattern detection' },
      { name: 'PayFast', reason: 'South African payment gateway' },
      { name: 'Tailwind CSS', reason: 'Rapid UI development' },
    ],
    impact: {
      potential: '11M South Africans in stokvels',
      economy: 'R50B+ informal stokvel economy',
      problem: '95% of stokvels operate manually',
      metric: '100% accuracy in automated tracking',
    },
    liveUrl: null,
    githubUrl: null,
    images: [],
    metaTitle: 'StokvelOS — AI-Powered Stokvel Management for 11M South Africans | Nandawula Regine',
    metaDescription:
      'StokvelOS is a revolutionary AI-powered stokvel management platform designed to digitalize South Africa\'s R50 billion informal savings economy. Built by Nandawula Regine using Next.js, Supabase, OpenAI, and PayFast.',
    keywords: [
      'stokvel management app',
      'stokvel software South Africa',
      'digital stokvel platform',
      'StokvelOS',
      'community savings app Africa',
      'AI fraud detection stokvel',
      'informal economy digitalization South Africa',
    ],
  },
  'k53-drill-master': {
    slug: 'k53-drill-master',
    title: 'K53 Drill Master',
    tagline: 'AI-Powered Driving Test Prep Tackling South Africa\'s 60% Failure Rate',
    description:
      'Adaptive AI learning platform for South Africa\'s K53 driving test. Gamified preparation with personalized feedback, progress tracking, and real-time performance analytics — turning a 60% failure rate into confident drivers.',
    category: 'AI/ML · Education · Community Impact',
    status: 'Live',
    year: '2025',
    problem:
      'Over 60% of South Africans fail the K53 learner\'s licence test due to lack of accessible, quality preparation resources. This creates barriers to employment, mobility, and economic participation for millions.',
    solution:
      'An AI-driven preparation platform with adaptive question selection, detailed explanations, progress analytics, and a gamified learning experience. The AI adapts difficulty based on individual performance patterns.',
    techStack: [
      { name: 'Next.js 14', reason: 'Fast, SEO-optimized study platform' },
      { name: 'TypeScript', reason: 'Robust adaptive learning logic' },
      { name: 'OpenAI API', reason: 'Adaptive learning & personalized feedback' },
      { name: 'Supabase', reason: 'User progress & question database' },
      { name: 'Tailwind CSS', reason: 'Mobile-first responsive design' },
    ],
    impact: {
      potential: '500K+ learner drivers annually',
      economy: '60%+ K53 failure rate addressed',
      problem: 'Lack of quality prep resources',
      metric: '50+ paying subscribers, 4.8/5 rating',
    },
    liveUrl: 'https://nanda-k53-drill-master.vercel.app/',
    githubUrl: 'https://github.com/Nanda-Regine/nanda-k53-drill-master',
    images: [],
    metaTitle: 'K53 Drill Master — AI-Powered Driving Test Prep | Nandawula Regine',
    metaDescription:
      'K53 Drill Master uses adaptive AI to help South Africans pass their driving test. 50+ paying subscribers, 4.8/5 rating. Built by Nandawula Regine with Next.js, OpenAI, and Supabase.',
    keywords: [
      'K53 learner licence app',
      'K53 driving test South Africa',
      'K53 Drill Master',
      'AI driving test prep',
      'learner driver app South Africa',
      'K53 practice questions app',
      'South Africa driving test preparation',
    ],
  },
  'true-access-app': {
    slug: 'true-access-app',
    title: 'True Access App',
    tagline: 'Geolocation Accessibility Mapping for 2.8M Disabled South Africans',
    description:
      'Community-driven accessibility mapping platform for disabled users in South Africa. Real-time venue ratings, photos, and accessibility reviews powered by Mapbox — built in 50 days to map 10,000+ venues.',
    category: 'Accessibility · Community Impact · Web App · PWA',
    status: 'Live',
    year: '2025',
    problem:
      '2.8 million disabled South Africans lack reliable, current information about accessible venues. Existing resources are outdated, incomplete, or simply non-existent — creating daily barriers to independence and participation.',
    solution:
      'A Progressive Web App with Mapbox geolocation, real-time community reviews, accessibility photo uploads, and venue rating systems. The community-driven model ensures data stays current and trustworthy.',
    techStack: [
      { name: 'Next.js 14', reason: 'PWA support + SSR for performance' },
      { name: 'Mapbox API', reason: 'Chosen over Google Maps for developer-friendly pricing + African coverage' },
      { name: 'Supabase', reason: 'Real-time venue updates & user contributions' },
      { name: 'TypeScript', reason: 'Reliable geolocation data handling' },
      { name: 'PWA', reason: 'Offline-first for users with unreliable connectivity' },
      { name: 'Tailwind CSS', reason: 'Accessibility-first, keyboard-navigable UI' },
    ],
    impact: {
      potential: '2.8M disabled South Africans',
      economy: '10,000+ accessible venues mapped',
      problem: 'Zero reliable accessibility data',
      metric: 'Built in 50 days',
    },
    liveUrl: 'https://true-access-app.vercel.app/',
    githubUrl: null,
    images: [],
    metaTitle: 'True Access App — Accessibility Mapping for Disabled South Africans | Nandawula Regine',
    metaDescription:
      'True Access App is a Mapbox-powered PWA mapping accessible venues for South Africa\'s 2.8 million disabled people. Community-driven ratings and reviews. Built in 50 days by Nandawula Regine.',
    keywords: [
      'accessibility app South Africa',
      'True Access App',
      'disability accessibility map',
      'accessible venues South Africa',
      'Mapbox accessibility',
      'PWA disability app',
      'wheelchair accessible venues South Africa',
    ],
  },
  'campus-compass': {
    slug: 'campus-compass',
    title: 'Campus Compass',
    tagline: 'AI University Companion for 1M+ South African Students',
    description:
      'AI-powered student companion platform with academic tracking, campus navigation, deadline management, and a 24/7 AI assistant. Designed to address South Africa\'s 50%+ university dropout rate through intelligent support.',
    category: 'Education · AI/ML · SaaS · PWA',
    status: 'Beta',
    year: '2025',
    problem:
      'South Africa has a 50%+ university dropout rate, largely driven by poor academic planning, campus navigation challenges, and lack of accessible support. Students need a 24/7 intelligent companion, not just a timetable app.',
    solution:
      'An AI companion platform with OpenAI-powered chatbot, Mapbox campus navigation, academic deadline tracking, resource discovery, and offline PWA capabilities for students with data constraints.',
    techStack: [
      { name: 'Next.js 14', reason: 'PWA + SSR for campus application' },
      { name: 'OpenAI (ChatGPT)', reason: '24/7 AI academic assistant' },
      { name: 'Mapbox', reason: 'Campus map navigation' },
      { name: 'Supabase', reason: 'Student data, schedules, and progress' },
      { name: 'TypeScript', reason: 'Reliable academic data handling' },
      { name: 'PWA', reason: 'Works offline for data-constrained students' },
    ],
    impact: {
      potential: '1M+ South African university students',
      economy: 'Addressing 50%+ dropout rate',
      problem: 'Academic planning & support gap',
      metric: '200+ active student users',
    },
    liveUrl: null,
    githubUrl: 'https://github.com/Nanda-Regine/campus-compass',
    images: [],
    metaTitle: 'Campus Compass — AI University App for South African Students | Nandawula Regine',
    metaDescription:
      'Campus Compass is an AI-powered student companion app with OpenAI chatbot, Mapbox navigation, and academic tracking — designed for South Africa\'s 1M+ university students. By Nandawula Regine.',
    keywords: [
      'university student app South Africa',
      'Campus Compass app',
      'AI student companion',
      'university dropout rate South Africa',
      'student academic planner app',
      'OpenAI student assistant',
      'university navigation app South Africa',
    ],
  },
  'cortex-hub': {
    slug: 'cortex-hub',
    title: 'Cortex Hub',
    tagline: 'Multi-Industry SaaS Booking Platform for South African SMEs',
    description:
      'Intelligent booking and business management platform serving multiple industries — salons, restaurants, campus services, and enterprises. AI-powered scheduling with South African PayFast payment integration.',
    category: 'SaaS · AI/ML · Enterprise',
    status: 'Live',
    year: '2025',
    problem:
      'South African SMEs use fragmented, expensive, or paper-based booking systems. 50,000+ small businesses lack affordable, intelligent scheduling and management tools.',
    solution:
      'A multi-vertical SaaS platform transforming booking across salons, restaurants, campus services, and enterprises. AI-powered scheduling recommendations and PayFast-enabled South African payments.',
    techStack: [
      { name: 'Next.js 14', reason: 'Multi-tenant SaaS architecture' },
      { name: 'TypeScript', reason: 'Enterprise-grade type safety' },
      { name: 'OpenAI', reason: 'AI scheduling optimization' },
      { name: 'Supabase', reason: 'Multi-tenant database with RLS' },
      { name: 'PayFast', reason: 'Local SA payment processing' },
      { name: 'Tailwind CSS', reason: 'Consistent multi-brand UI' },
    ],
    impact: {
      potential: '50K+ South African SMEs',
      economy: 'Multiple industry verticals',
      problem: 'Fragmented SME booking systems',
      metric: 'MVP live, active development',
    },
    liveUrl: 'https://cortex-hub-booking-5e35.vercel.app/',
    githubUrl: null,
    videoUrl: '/assets/project-screen-record/cortexhub-booking-system.mp4',
    images: [],
    metaTitle: 'Cortex Hub — Multi-Industry SaaS Booking Platform for SA SMEs | Nandawula Regine',
    metaDescription:
      'Cortex Hub is an AI-powered multi-industry booking SaaS for South African SMEs — salons, restaurants, campus services. Built with Next.js, Supabase, and PayFast by Nandawula Regine.',
    keywords: [
      'salon booking app South Africa',
      'SME management software South Africa',
      'business booking system South Africa',
      'Cortex Hub',
      'multi-industry SaaS Africa',
      'PayFast booking system',
    ],
  },
  'poetry-tube': {
    slug: 'poetry-tube',
    title: 'PoetryTube',
    tagline: 'Video Poetry Platform Amplifying African and Diaspora Poets',
    description:
      'A dedicated video platform celebrating African and diaspora poets — bringing spoken word poetry to the digital stage with a community-first approach.',
    category: 'Creative · Web App',
    status: 'Live',
    year: '2025',
    problem:
      'African poets lack dedicated digital platforms for their work. Mainstream video platforms deprioritize literary content, leaving thousands of African voices unheard.',
    solution:
      'A purpose-built video poetry platform with Cloudflare Stream for smooth video delivery, community features, and an African-first design aesthetic.',
    techStack: [
      { name: 'Next.js 14', reason: 'Fast video content delivery' },
      { name: 'TypeScript', reason: 'Reliable media application' },
      { name: 'Cloudflare Stream', reason: 'High-quality video hosting' },
      { name: 'Supabase', reason: 'Poet profiles & content database' },
      { name: 'Tailwind CSS', reason: 'Artistic, expressive UI' },
    ],
    impact: {
      potential: '1,000+ African poets',
      economy: 'African creative digital economy',
      problem: 'African poetry digital gap',
      metric: 'Community growing',
    },
    liveUrl: null,
    githubUrl: 'https://github.com/Nanda-Regine/PoetryTube',
    images: [],
    metaTitle: 'PoetryTube — Video Poetry Platform for African Poets | Nandawula Regine',
    metaDescription:
      'PoetryTube is a dedicated video platform for African and diaspora poets. Built with Next.js, Cloudflare Stream, and Supabase by Nandawula Regine.',
    keywords: [
      'African poetry platform',
      'spoken word video platform Africa',
      'PoetryTube',
      'African diaspora poets',
      'online poetry video platform',
    ],
  },
  'green-vault': {
    slug: 'green-vault',
    title: 'Green Vault eCommerce',
    tagline: 'Modern eCommerce Template with Full PayFast Integration',
    description:
      'A complete modern eCommerce platform template with PayFast payment integration, inventory management, admin dashboard, and a beautiful responsive UI — purpose-built for African businesses.',
    category: 'eCommerce · SaaS Template',
    status: 'Live',
    year: '2025',
    problem:
      'African businesses lack affordable, locally-integrated eCommerce solutions. Most platforms don\'t support South African payment gateways or are priced for international markets.',
    solution:
      'A ready-to-deploy eCommerce template with full PayFast integration, inventory management, and admin dashboard. Built for the South African market from day one.',
    techStack: [
      { name: 'Next.js 14', reason: 'Performance + SEO for eCommerce' },
      { name: 'TypeScript', reason: 'Reliable payment and inventory logic' },
      { name: 'PayFast', reason: 'Native SA payment gateway' },
      { name: 'Supabase', reason: 'Product & order database' },
      { name: 'Tailwind CSS', reason: 'Professional store UI' },
    ],
    impact: {
      potential: 'African eCommerce market',
      economy: 'R1.5T SA eCommerce opportunity',
      problem: 'No SA-native eCommerce templates',
      metric: 'Template live on Vercel',
    },
    liveUrl: 'https://green-valut-e-commerce-store-demo.vercel.app/',
    githubUrl: 'https://github.com/Nanda-Regine/GreenValut-eCommerce-store-demo',
    videoUrl: '/assets/project-screen-record/GreenVault.mp4',
    images: [],
    metaTitle: 'Green Vault eCommerce — PayFast Integrated Store Template | Nandawula Regine',
    metaDescription:
      'Green Vault is a full eCommerce platform with PayFast integration, inventory management, and admin dashboard. Built for African businesses with Next.js, TypeScript, and Supabase.',
    keywords: [
      'eCommerce template South Africa',
      'PayFast eCommerce integration',
      'Next.js eCommerce template',
      'South African online store',
      'Green Vault eCommerce',
    ],
  },
  'weather-app': {
    slug: 'weather-app',
    title: 'Weather App',
    tagline: 'Real-Time Weather App Showcasing API Mastery',
    description:
      'Clean, responsive real-time weather application using OpenWeather API. A SheCodes Plus project demonstrating clean API integration, dynamic UI updates, and mobile-first design.',
    category: 'Web App · API Integration',
    status: 'Live',
    year: '2024',
    problem:
      'A foundational project to demonstrate API integration mastery and clean JavaScript application architecture.',
    solution:
      'A beautifully designed weather application with real-time data, location-based forecasts, and a smooth, responsive interface.',
    techStack: [
      { name: 'HTML/CSS', reason: 'Clean semantic markup' },
      { name: 'JavaScript', reason: 'Dynamic DOM manipulation' },
      { name: 'OpenWeather API', reason: 'Real-time weather data' },
      { name: 'Tailwind CSS', reason: 'Responsive design' },
    ],
    impact: {
      potential: 'Learner developers',
      economy: 'SheCodes certification',
      problem: 'API integration learning',
      metric: 'SheCodes Plus certified project',
    },
    liveUrl: 'https://my-weather-app-rho-lyart.vercel.app/',
    githubUrl: 'https://github.com/Nanda-Regine/my-weather-app',
    images: [],
    metaTitle: 'Weather App — Real-Time Weather with OpenWeather API | Nandawula Regine',
    metaDescription:
      'Real-time weather application built with JavaScript and OpenWeather API. SheCodes Plus project by Nandawula Regine demonstrating clean API integration and responsive design.',
    keywords: [
      'weather app JavaScript',
      'OpenWeather API project',
      'SheCodes project',
      'JavaScript weather application',
    ],
  },
  creativelynanda: {
    slug: 'creativelynanda',
    title: 'CreativelyNanda.co.za',
    tagline: 'Portfolio & Digital HQ — The Website That Builds Itself',
    description:
      'My personal portfolio, digital headquarters, and product platform — a magazine-inspired, AI-integrated website with a Notion template shop, poetry collection, blog, and AI assistant. Built with Next.js, Supabase, and PayFast.',
    category: 'Web App · Personal Brand · Full-Stack',
    status: 'Live',
    year: '2025',
    problem:
      'Generic developer portfolios fail to capture multidimensional creatives. I needed a platform that simultaneously showcases technical excellence, creative identity, and functions as a revenue-generating business.',
    solution:
      'A full-stack personal brand platform with editorial design aesthetics, a functional Notion template shop (PayFast integrated), published poetry collection, AI sales assistant, blog CMS, and PWA capabilities.',
    techStack: [
      { name: 'Next.js 14', reason: 'App Router, SEO, PWA' },
      { name: 'TypeScript', reason: 'Type safety across all features' },
      { name: 'Supabase', reason: 'Products, orders, blog, poetry database' },
      { name: 'PayFast', reason: 'South African payment gateway for template sales' },
      { name: 'Resend', reason: 'Transactional email delivery' },
      { name: 'Framer Motion', reason: 'Editorial animation system' },
      { name: 'Tailwind CSS', reason: 'Brand-consistent design system' },
    ],
    impact: {
      potential: 'African creative technologists',
      economy: 'Monthly recurring revenue',
      problem: 'Generic portfolio problem',
      metric: '6 Notion templates live, R15K+ revenue',
    },
    liveUrl: 'https://creativelynanda.co.za',
    githubUrl: 'https://github.com/Nanda-Regine/CreativelyNanda.co.za',
    videoUrl: '/assets/project-screen-record/creativelynanda.mp4',
    images: [],
    metaTitle: 'CreativelyNanda.co.za — Portfolio & Digital HQ | Nandawula Regine',
    metaDescription:
      'CreativelyNanda.co.za is a full-stack personal brand platform with Notion template shop, poetry collection, blog, and AI assistant. Built with Next.js, Supabase, and PayFast by Nandawula Regine.',
    keywords: [
      'creative technologist portfolio',
      'African developer portfolio',
      'Nanda portfolio website',
      'Next.js portfolio with shop',
      'PayFast portfolio website',
    ],
  },
};

interface ProjectData {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  status: string;
  year: string;
  problem: string;
  solution: string;
  techStack: { name: string; reason: string }[];
  impact: { potential: string; economy: string; problem: string; metric: string };
  liveUrl: string | null;
  githubUrl: string | null;
  videoUrl?: string | null;
  images: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  readme?: string;
  architecture?: string[];
  challenges?: string[];
}

// ============================================================
// METADATA
// ============================================================

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const project = projects[params.slug];
  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.metaTitle,
    description: project.metaDescription,
    keywords: project.keywords,
    openGraph: {
      title: project.metaTitle,
      description: project.metaDescription,
      type: 'article',
      url: `${SITE_URL}/projects/${project.slug}`,
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.metaTitle,
      description: project.metaDescription,
    },
    alternates: { canonical: `${SITE_URL}/projects/${project.slug}` },
  };
}

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

// ============================================================
// PAGE
// ============================================================

const statusColors: Record<string, string> = {
  Live: 'bg-emerald/20 text-emerald border border-emerald/30',
  Beta: 'bg-gold/20 text-gold border border-gold/30',
  'In Development': 'bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/30',
};

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects[params.slug];
  if (!project) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    url: project.liveUrl || `${SITE_URL}/projects/${project.slug}`,
    author: { '@type': 'Person', name: AUTHOR_NAME, url: SITE_URL },
    applicationCategory: project.category,
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      availability: project.status === 'Live'
        ? 'https://schema.org/InStock'
        : 'https://schema.org/PreOrder',
    },
    ...(project.liveUrl && { sameAs: [project.liveUrl] }),
  };

  const otherProjects = Object.values(projects)
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
      <JsonLd data={jsonLd} />

      <main className="min-h-screen bg-beige">
        {/* Hero */}
        <section className="py-28 px-6 bg-gradient-to-br from-navy via-navy/95 to-cherry/10">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-beige/60 hover:text-beige transition-colors mb-8 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              All Projects
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${statusColors[project.status] || 'bg-beige/10 text-beige/60'}`}>
                {project.status}
              </span>
              <span className="text-xs text-beige/50">{project.year}</span>
              <span className="text-xs text-beige/50">{project.category}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold text-beige mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-cherry font-semibold mb-6">{project.tagline}</p>
            <p className="text-lg text-beige/70 max-w-3xl leading-relaxed mb-8">{project.description}</p>

            <div className="flex flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cherry text-white rounded-full font-semibold hover:bg-cherry-dark transition-all"
                >
                  <Globe className="w-4 h-4" />
                  View Live
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-beige/30 text-beige rounded-full font-semibold hover:border-beige/60 transition-all"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Video Demo */}
        {project.videoUrl && (
          <section className="py-12 px-6 bg-[#0d1117]">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs font-bold text-[#D4A574] tracking-[0.3em] uppercase">Demo Recording</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                <video
                  src={project.videoUrl}
                  controls
                  autoPlay={false}
                  muted
                  playsInline
                  className="w-full aspect-video object-cover"
                  preload="metadata"
                />
              </div>
            </div>
          </section>
        )}

        {/* Impact Bar */}
        <section className="py-0 px-6 bg-[#0A1128]">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-beige/10">
              {[
                { label: 'Serving', value: project.impact.potential, color: 'text-[#D4A574]' },
                { label: 'Market', value: project.impact.economy, color: 'text-emerald-400' },
                { label: 'Problem', value: project.impact.problem, color: 'text-cherry' },
                { label: 'Result', value: project.impact.metric, color: 'text-electric-cyan' },
              ].map((stat) => (
                <div key={stat.label} className="py-8 px-6 text-center">
                  <p className="text-xs font-semibold text-beige/40 tracking-widest uppercase mb-2">{stat.label}</p>
                  <p className={`font-display font-bold text-sm leading-tight ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem & Solution — full narrative, shown once */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cherry via-cherry/40 to-transparent" />
                <span className="text-xs font-bold text-cherry tracking-[0.3em] uppercase mb-4 block">The Problem</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-navy mb-5 leading-tight">
                  What needed solving
                </h2>
                <p className="text-navy/70 leading-relaxed text-[15px]">{project.problem}</p>
              </div>
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-emerald-400/40 to-transparent" />
                <span className="text-xs font-bold text-emerald-600 tracking-[0.3em] uppercase mb-4 block">The Solution</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-navy mb-5 leading-tight">
                  How I built it
                </h2>
                <p className="text-navy/70 leading-relaxed text-[15px]">{project.solution}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack — once, visually rich */}
        <section className="py-16 px-6 bg-[#0A1128] relative overflow-hidden">
          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(to right, #D4A574 1px, transparent 1px), linear-gradient(to bottom, #D4A574 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="flex items-center gap-4 mb-10">
              <span className="text-xs font-bold text-[#D4A574] tracking-[0.3em] uppercase">Tech Stack & Decision Rationale</span>
              <div className="flex-1 h-px bg-beige/10" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {project.techStack.map((tech, i) => (
                <div key={tech.name} className="group relative bg-white/[0.03] border border-white/10 p-4 hover:border-[#D4A574]/40 hover:bg-white/[0.06] transition-all duration-200">
                  <div className="flex items-start gap-3">
                    <span className="text-[#D4A574]/40 font-mono text-xs mt-0.5 flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-bold text-beige text-sm mb-1 group-hover:text-[#D4A574] transition-colors">{tech.name}</h3>
                      <p className="text-beige/50 text-xs leading-relaxed">{tech.reason}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* README — developer artifact with unique content */}
        <section className="py-16 px-6 bg-[#0d1117]">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-[#8b949e] text-xs ml-2 font-mono">README.md — {project.slug}</span>
            </div>
            <div className="border border-[#30363d] rounded-lg overflow-hidden">
              <div className="bg-[#161b22] border-b border-[#30363d] px-4 py-2 flex items-center gap-2">
                <span className="text-[#8b949e] text-xs font-mono">📄 README.md</span>
              </div>
              <div className="p-6 md:p-8 overflow-x-auto">
                <pre className="text-[#e6edf3] text-sm font-mono whitespace-pre-wrap leading-relaxed">
{`# ${project.title}
> ${project.tagline}

## Project Context
**Category:** ${project.category}
**Status:** ${project.status} · ${project.year}
**Author:** Nandawula Regine Kabali-Kagwa — East London, South Africa

## Stack
\`\`\`
${project.techStack.map(t => `${t.name.padEnd(30)} # ${t.reason}`).join('\n')}
\`\`\`

## Architecture Notes
- All data mutations validated server-side via Next.js API routes
- Row-Level Security enforced at database level (Supabase)
- Mobile-first, PWA-ready, offline-tolerant where connectivity is unreliable
- PayFast integration for ZAR-native payments (no USD conversion)
- SEO-optimised: metadata, JSON-LD, canonical URLs, sitemap

## Environment Variables
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
NEXT_PUBLIC_PAYFAST_MERCHANT_ID=
NEXT_PUBLIC_PAYFAST_MERCHANT_KEY=
RESEND_API_KEY=
\`\`\`

## Links
${project.liveUrl ? `- 🌐 Live:   ${project.liveUrl}` : '- 🌐 Live:   Coming soon'}
${project.githubUrl ? `- 🐙 GitHub: ${project.githubUrl}` : '- 🐙 GitHub: Private repository'}
- 🏗️ Portfolio: https://creativelynanda.co.za/projects/${project.slug}

---
Built from East London, South Africa · 5th Industrial Revolution`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* More Projects */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-navy mb-10">More Projects</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {otherProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group p-6 bg-white rounded-2xl border border-navy/10 hover:border-cherry/30 hover:shadow-soft transition-all"
                >
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full mb-3 inline-block ${statusColors[p.status] || 'bg-navy/10 text-navy/60'}`}>
                    {p.status}
                  </span>
                  <h3 className="font-display font-bold text-navy text-xl mb-2 group-hover:text-cherry transition-colors">{p.title}</h3>
                  <p className="text-sm text-navy/60 line-clamp-2 mb-3">{p.tagline}</p>
                  <span className="text-cherry text-sm font-medium flex items-center gap-1">
                    View project <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-navy/20 text-navy rounded-full hover:border-cherry hover:text-cherry transition-all"
              >
                View All Projects <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-navy">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold text-beige mb-4">
              Interested in similar work?
            </h2>
            <p className="text-beige/70 mb-8 text-lg">
              Let&apos;s discuss how I can build something like this for your business.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cherry text-white rounded-full font-semibold hover:bg-cherry-dark transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              Let&apos;s Talk
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
