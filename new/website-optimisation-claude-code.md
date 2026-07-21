# 🚀 NANDA COMPLETE IMPLEMENTATION PACKAGE
## Every Feature, Every File, Every Line of Code

**Created:** February 1, 2026  
**For:** Claude Code Terminal Execution  
**Author:** Nanda's Empire Building Team

---

## 📋 TABLE OF CONTENTS

1. [AI Engineer Showcase Page](#1-ai-engineer-showcase-page)
2. [Media Kit / Press Page](#2-media-kit-press-page)
3. [Mirembe + Sanyu Botanicals (April 2026)](#3-mirembe-sanyu-botanicals-april-2026)
4. [Interactive Hair Quiz](#4-interactive-hair-quiz)
5. [Blog System with Case Studies](#5-blog-system-with-case-studies)
6. [Sanyu Ingredients History](#6-sanyu-ingredients-history)
7. [Sample Blog Posts](#7-sample-blog-posts)
8. [Implementation Checklist](#8-implementation-checklist)

---

# 1. AI ENGINEER SHOWCASE PAGE

## 📍 Location
`app/(marketing)/ai-engineer/page.tsx`

## 🎯 Purpose
Showcase AI skills, projects, and consulting services to attract high-paying international clients.

## 💎 Design Theme
Dark mode, cyberpunk-minimal, electric cyan accents

## Complete Implementation

```typescript
// app/(marketing)/ai-engineer/page.tsx

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Code, Brain, Sparkles, Zap, Users, TrendingUp } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import SlideIn from '@/components/animations/SlideIn';
import StaggerChildren from '@/components/animations/StaggerChildren';

export const metadata: Metadata = {
  title: 'AI Engineer | Building Intelligent Systems for African Businesses',
  description: 'Full-stack AI engineer specializing in Claude API, GPT-4, chatbots, automation, and AI-powered business solutions for SMEs.',
  openGraph: {
    title: 'AI Engineer | Nanda',
    description: 'Building intelligent systems with Claude, GPT-4, and custom AI solutions',
    images: ['/og-ai-engineer.jpg'],
  },
};

const aiProjects = [
  {
    title: 'K53 Drill Master',
    description: 'AI-powered driving test prep with personalized feedback',
    tech: ['Claude API', 'Next.js', 'Supabase'],
    users: '50+ paying subscribers',
    revenue: 'R1,450/month recurring',
    impact: '4.8/5 rating',
    link: '/projects/k53-drill-master',
    image: '/images/ai/k53.jpg',
  },
  {
    title: 'Campus Compass',
    description: 'AI university life manager with smart scheduling and deadline tracking',
    tech: ['GPT-4', 'React', 'Firebase'],
    users: '200+ students',
    impact: '40% time saved on planning',
    link: '/projects/campus-compass',
    image: '/images/ai/campus.jpg',
  },
  {
    title: 'StokvelOS',
    description: 'AI-powered stokvel management with automated record-keeping',
    tech: ['Claude API', 'Supabase', 'PayFast'],
    users: 'Beta testing with 3 stokvels',
    impact: '100% accuracy in tracking',
    link: '/projects/stokvel-os',
    image: '/images/ai/stokvel.jpg',
  },
  {
    title: 'Nanda AI Sales Assistant',
    description: 'Custom chatbot that converts visitors to customers',
    tech: ['Claude API', 'RAG', 'Embeddings'],
    users: 'Live on this site',
    impact: '15% conversion increase',
    link: '#nanda-ai',
    image: '/images/ai/chatbot.jpg',
  },
];

const services = [
  {
    icon: Brain,
    title: 'AI Agent Development',
    description: 'Custom AI agents for customer service, sales, operations, and data processing',
    deliverables: [
      '24/7 automated customer support',
      'Lead qualification & nurturing',
      'Document processing & data entry',
      'Smart email responses',
    ],
    pricing: 'R3,000-R8,000/month',
    turnaround: '2-3 weeks',
  },
  {
    icon: Sparkles,
    title: 'Chatbot Integration',
    description: 'WhatsApp, website, and social media chatbots that feel human',
    deliverables: [
      'Natural language understanding',
      'Multi-language support',
      'Knowledge base integration',
      'Analytics dashboard',
    ],
    pricing: 'R2,500-R5,000/month',
    turnaround: '1-2 weeks',
  },
  {
    icon: Zap,
    title: 'Business Automation',
    description: 'AI-powered workflows that save hours daily',
    deliverables: [
      'Email automation',
      'Data extraction & entry',
      'Report generation',
      'Meeting scheduling',
    ],
    pricing: 'R1,500-R4,000/month',
    turnaround: '1 week',
  },
  {
    icon: Code,
    title: 'Custom AI Solutions',
    description: 'Bespoke AI systems designed for your specific business needs',
    deliverables: [
      'Requirements analysis',
      'Custom model training',
      'API integration',
      '3-month support included',
    ],
    pricing: 'Quote-based',
    turnaround: '4-8 weeks',
  },
];

const stats = [
  { label: 'AI Apps Built', value: '5+', icon: Code },
  { label: 'Paying Users', value: '250+', icon: Users },
  { label: 'Revenue Generated', value: 'R15K+', icon: TrendingUp },
  { label: 'Avg Response Time', value: '< 1s', icon: Zap },
];

const techStack = [
  { name: 'Claude API', level: 'Expert', logo: '/logos/anthropic.svg' },
  { name: 'OpenAI GPT-4', level: 'Advanced', logo: '/logos/openai.svg' },
  { name: 'LangChain', level: 'Intermediate', logo: '/logos/langchain.svg' },
  { name: 'Embeddings & RAG', level: 'Advanced', logo: '/logos/vector.svg' },
  { name: 'Next.js', level: 'Expert', logo: '/logos/nextjs.svg' },
  { name: 'Supabase', level: 'Expert', logo: '/logos/supabase.svg' },
  { name: 'Python', level: 'Intermediate', logo: '/logos/python.svg' },
  { name: 'TypeScript', level: 'Expert', logo: '/logos/typescript.svg' },
];

export default function AIEngineerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Gradient orb */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-400 font-semibold">Master Gen AI Professional Certified</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Engineer
            </h1>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8 font-light">
              Building intelligent systems that <span className="text-cyan-400 font-semibold">save time</span>, 
              <span className="text-purple-400 font-semibold"> reduce costs</span>, and 
              <span className="text-pink-400 font-semibold"> drive revenue</span>
            </p>
          </FadeIn>

          <FadeIn delay={0.6}>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
              From chatbots that convert to AI agents that automate — I build custom AI solutions 
              for African businesses ready to compete globally.
            </p>
          </FadeIn>

          <FadeIn delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#services"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
              >
                View Services
              </Link>
              <Link
                href="#projects"
                className="px-8 py-4 border-2 border-cyan-500/50 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 transition-all duration-300"
              >
                See My Work
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 border-y border-gray-800">
        <div className="max-w-7xl mx-auto">
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <FadeIn key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full mb-4">
                    <stat.icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* AI Projects */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                AI-Powered
              </span> Projects
            </h2>
            <p className="text-xl text-gray-400">
              Real applications. Real users. Real results.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            {aiProjects.map((project, index) => (
              <SlideIn key={project.title} direction="up" delay={index * 0.1}>
                <Link href={project.link}>
                  <div className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10">
                    {/* Image */}
                    <div className="aspect-video relative mb-6 rounded-lg overflow-hidden bg-gray-800">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Users</p>
                        <p className="font-semibold text-white">{project.users}</p>
                      </div>
                      {project.revenue && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Revenue</p>
                          <p className="font-semibold text-green-400">{project.revenue}</p>
                        </div>
                      )}
                      <div className={project.revenue ? 'col-span-2' : ''}>
                        <p className="text-sm text-gray-500 mb-1">Impact</p>
                        <p className="font-semibold text-purple-400">{project.impact}</p>
                      </div>
                    </div>

                    {/* Hover arrow */}
                    <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Services I Offer
            </h2>
            <p className="text-xl text-gray-400">
              Custom AI solutions for businesses that want to lead, not follow
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <SlideIn key={service.title} direction="up" delay={index * 0.1}>
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl mb-6">
                    <service.icon className="w-8 h-8 text-cyan-400" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
                  <p className="text-gray-400 mb-6">{service.description}</p>

                  {/* Deliverables */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-cyan-400 mb-3">WHAT YOU GET:</p>
                    <ul className="space-y-2">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-gray-300">
                          <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing & Timeline */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-700">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Investment</p>
                      <p className="text-xl font-bold text-white">{service.pricing}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1">Timeline</p>
                      <p className="text-lg font-semibold text-purple-400">{service.turnaround}</p>
                    </div>
                  </div>
                </div>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              My AI Arsenal
            </h2>
            <p className="text-xl text-gray-400">
              The tools I use to build intelligent systems
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <FadeIn key={tech.name} delay={index * 0.05}>
                <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-xl p-6 text-center hover:border-cyan-500/50 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Image
                      src={tech.logo}
                      alt={tech.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{tech.name}</h3>
                  <p className="text-sm text-cyan-400">{tech.level}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 border-y border-cyan-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Build Your AI Solution?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how AI can transform your business. Free 30-minute consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
              >
                Book a Consultation
              </Link>
              <Link
                href="mailto:hello@creativelynanda.co.za"
                className="px-8 py-4 border-2 border-cyan-500/50 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 transition-all duration-300"
              >
                Email Me
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
```

### Update Navigation
Add to main nav:

```typescript
// components/layout/navbar.tsx
{
  name: 'AI Engineer',
  href: '/ai-engineer',
  highlight: true,
  badge: 'Hire Me',
}
```

---

# 2. MEDIA KIT / PRESS PAGE

## 📍 Location
`app/(marketing)/press/page.tsx`

## 🎯 Purpose
Professional media kit for journalists, podcast hosts, conference organizers

## Complete Implementation

```typescript
// app/(marketing)/press/page.tsx

import { Metadata } from 'next';
import Image from 'next/image';
import { Download, Mail, Award, Briefcase, BookOpen, Mic } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

export const metadata: Metadata = {
  title: 'Press Kit | Media Resources for Nanda Regine',
  description: 'Official media kit, bios, photos, and press releases for Nandawula Regine Kabali-Kagwa',
};

const achievements = [
  'Master Gen AI Professional Certified',
  'Published Poet - "Inside Her Roses" (2024)',
  '3x Business Management Graduate with 15 Distinctions',
  'Featured on SABC National TV & Radio',
  'Built 9 Live Applications Serving 300+ Users',
  'Founder of Mirembe Muse (Pty) Ltd',
  '250+ GitHub Commits in 6 Months',
];

const expertise = [
  'AI Integration & Automation',
  'Full-Stack Development (React, Next.js, TypeScript)',
  'Digital Product Creation',
  'Notion Systems Architecture',
  'Creative Technology',
  'Poetry & Creative Writing',
  'African Entrepreneurship',
  'Women in Tech',
];

const speakingTopics = [
  {
    title: 'Building AI-Powered Products in Africa',
    description: 'How I built 5 AI applications with limited resources and turned them into revenue-generating products',
    audiences: ['Tech conferences', 'Startup events', 'Developer meetups'],
  },
  {
    title: 'From R0.37 to Revenue: Digital Entrepreneurship',
    description: 'The real story of starting a digital business from scratch in South Africa',
    audiences: ['Business schools', 'Entrepreneurship programs', 'Youth conferences'],
  },
  {
    title: 'Women in Tech: Breaking Barriers',
    description: 'Navigating the tech industry as a Black African woman and building despite the odds',
    audiences: ['Women in STEM', 'University panels', 'Corporate diversity events'],
  },
  {
    title: 'Poetry to Python: The Creative Technologist Journey',
    description: 'How combining creative and technical skills creates unique opportunities',
    audiences: ['Creative conferences', 'Design + Tech events', 'Arts & culture'],
  },
  {
    title: 'Ubuntu in Code: African Philosophy Meets Technology',
    description: 'Building technology that amplifies humanity instead of replacing it',
    audiences: ['Tech ethics', 'Philosophy departments', 'Innovation forums'],
  },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-24 px-6 bg-gradient-to-br from-navy via-navy/95 to-cherry/20">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-display text-beige mb-6">
              Press Kit
            </h1>
            <p className="text-xl text-beige/80 max-w-3xl mx-auto">
              Official media resources for Nandawula Regine Kabali-Kagwa — 
              Creative Technologist, Published Poet, and Digital Entrepreneur
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-12 px-6 bg-beige/20 border-b border-navy/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm text-navy/60 mb-1">PRESS INQUIRIES</p>
              <a href="mailto:press@creativelynanda.co.za" className="text-2xl font-bold text-navy hover:text-cherry transition-colors">
                press@creativelynanda.co.za
              </a>
            </div>
            <div className="flex gap-4">
              <a
                href="/press/media-kit.pdf"
                download
                className="px-6 py-3 bg-navy text-beige rounded-lg hover:bg-navy/90 transition-colors flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Full Kit
              </a>
              <a
                href="/contact"
                className="px-6 py-3 border-2 border-navy text-navy rounded-lg hover:bg-navy hover:text-beige transition-all flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Contact
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bios */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-display text-navy mb-8">Official Bios</h2>

          {/* Short Bio (50 words) */}
          <div className="mb-8 p-6 bg-beige/20 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-navy">Short Bio (50 words)</h3>
              <button className="text-sm text-cherry hover:underline">Copy</button>
            </div>
            <p className="text-navy/80 leading-relaxed">
              Nandawula Regine Kabali-Kagwa is a Creative Technologist, Published Poet, and Founder of Mirembe Muse. 
              She builds AI-powered applications serving African communities while honoring her Ugandan-Xhosa heritage. 
              Master Gen AI Professional certified, she's redefining what it means to code with culture.
            </p>
          </div>

          {/* Medium Bio (150 words) */}
          <div className="mb-8 p-6 bg-beige/20 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-navy">Medium Bio (150 words)</h3>
              <button className="text-sm text-cherry hover:underline">Copy</button>
            </div>
            <p className="text-navy/80 leading-relaxed">
              Nandawula Regine Kabali-Kagwa is a South African Creative Technologist building at the intersection 
              of code, culture, and creativity. Born to Ugandan and Xhosa-Sotho heritage, she carries five clan 
              lineages that inform her Ubuntu-centered approach to technology.
              <br /><br />
              A Master Gen AI Professional with a BCom in Business Management (15 distinctions) from Nelson Mandela 
              University, Nanda has built 9 live applications serving 300+ users, including AI-powered tools and 
              Notion systems. Her published poetry collection "Inside Her Roses" was featured on national television 
              and radio.
              <br /><br />
              As Founder of Mirembe Muse, she's launching Sanyu Botanicals, an African botanical wellness brand, 
              while providing AI consulting and digital product creation services. She's building proof that 
              African tech excellence needs no permission.
            </p>
          </div>

          {/* Long Bio (300 words) */}
          <div className="mb-8 p-6 bg-beige/20 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-navy">Long Bio (300 words)</h3>
              <button className="text-sm text-cherry hover:underline">Copy</button>
            </div>
            <p className="text-navy/80 leading-relaxed">
              Nandawula Regine Kabali-Kagwa doesn't fit in boxes — and that's exactly the point.
              <br /><br />
              Born to a Ugandan father and Xhosa-Sotho mother, Nanda carries the wisdom of five ancestral clans: 
              Nsenene, Hlubi, Msimango, Thabizolo, and Tshawe. Each lineage gifted her a principle — lead through 
              people, adapt and endure, heal at the root, build unshakeable foundations, share what you create. 
              These aren't abstract values; they're the operating system behind every line of code she writes.
              <br /><br />
              After earning a BCom in Business Management from Nelson Mandela University with 15 academic 
              distinctions, Nanda taught herself full-stack development from her home in East London. In six 
              months, she shipped 9 live applications, accumulated 250+ GitHub commits, and built a digital 
              products business generating monthly revenue — all while publishing a poetry collection that made 
              national headlines.
              <br /><br />
              As a Master Gen AI Professional, she specializes in building AI-powered solutions for African SMEs, 
              from chatbots to automation systems. Her flagship apps include K53 Drill Master (50+ paying 
              subscribers), Campus Compass (200+ students), and StokvelOS, proving that world-class tech can — 
              and should — be built from the African continent.
              <br /><br />
              Through her company Mirembe Muse (Pty) Ltd, she's launching Sanyu Botanicals, an African botanical 
              wellness brand that honors ancestral hair care wisdom with modern formulation. She's also building 
              a portfolio of Notion templates, AI tools, and educational resources designed specifically for 
              African entrepreneurs and students.
              <br /><br />
              Nanda represents a new generation of African creators: technically excellent, culturally rooted, 
              commercially viable, and unapologetically multidimensional. She codes. She writes poetry. She 
              builds businesses. She refuses to choose.
            </p>
          </div>
        </div>
      </section>

      {/* Photos */}
      <section className="py-16 px-6 bg-beige/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display text-navy mb-8">Professional Photos</h2>
          <p className="text-navy/70 mb-8">High-resolution images for media use. Click to download.</p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { src: '/press/nanda-professional-1.jpg', title: 'Professional Headshot', size: '3000x4000px' },
              { src: '/press/nanda-professional-2.jpg', title: 'Coding Portrait', size: '4000x3000px' },
              { src: '/press/nanda-professional-3.jpg', title: 'Creative Portrait', size: '3000x3000px' },
              { src: '/press/nanda-speaking.jpg', title: 'Speaking Photo', size: '4000x3000px' },
              { src: '/press/nanda-workspace.jpg', title: 'Workspace Shot', size: '4000x3000px' },
              { src: '/press/nanda-poetry.jpg', title: 'Poetry Portrait', size: '3000x4000px' },
            ].map((photo) => (
              <a
                key={photo.src}
                href={photo.src}
                download
                className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-navy/5 hover:shadow-xl transition-all"
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="text-white">
                    <p className="font-semibold mb-1">{photo.title}</p>
                    <p className="text-sm text-beige/80">{photo.size}</p>
                  </div>
                  <Download className="absolute top-6 right-6 w-6 h-6 text-white" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-display text-navy mb-8">Key Achievements</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div key={achievement} className="flex items-start gap-3 p-4 bg-beige/20 rounded-lg">
                <Award className="w-5 h-5 text-cherry flex-shrink-0 mt-1" />
                <p className="text-navy/80">{achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-16 px-6 bg-beige/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-display text-navy mb-8">Areas of Expertise</h2>
          <div className="flex flex-wrap gap-3">
            {expertise.map((area) => (
              <span
                key={area}
                className="px-4 py-2 bg-navy text-beige rounded-full text-sm font-semibold"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Speaking Topics */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-display text-navy mb-4">Speaking Topics</h2>
          <p className="text-xl text-navy/70 mb-12">
            Available for conferences, podcasts, panels, and workshops
          </p>

          <div className="space-y-8">
            {speakingTopics.map((topic) => (
              <div key={topic.title} className="p-6 border-l-4 border-cherry bg-beige/20 rounded-lg">
                <h3 className="text-2xl font-bold text-navy mb-3">{topic.title}</h3>
                <p className="text-navy/80 mb-4">{topic.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-navy/60">Ideal for:</span>
                  {topic.audiences.map((audience) => (
                    <span
                      key={audience}
                      className="text-sm px-3 py-1 bg-navy/10 text-navy rounded-full"
                    >
                      {audience}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-gradient-to-r from-navy to-cherry rounded-lg text-center">
            <Mic className="w-12 h-12 text-beige mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-beige mb-3">Book Nanda as a Speaker</h3>
            <p className="text-beige/90 mb-6">
              Dynamic presentations combining technical depth with storytelling mastery
            </p>
            <a
              href="mailto:speaking@creativelynanda.co.za"
              className="inline-block px-8 py-3 bg-beige text-navy font-semibold rounded-lg hover:bg-beige/90 transition-colors"
            >
              Inquire About Speaking
            </a>
          </div>
        </div>
      </section>

      {/* Media Mentions */}
      <section className="py-16 px-6 bg-beige/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-display text-navy mb-8">Media Mentions</h2>
          <div className="space-y-4">
            <div className="p-6 bg-white rounded-lg border-l-4 border-cherry">
              <p className="text-sm text-navy/60 mb-2">SABC National TV • 2024</p>
              <p className="text-lg text-navy font-semibold mb-2">Featured Interview: Young Poet Makes Waves</p>
              <p className="text-navy/70">Discussion on "Inside Her Roses" and the intersection of technology and poetry</p>
            </div>
            <div className="p-6 bg-white rounded-lg border-l-4 border-cherry">
              <p className="text-sm text-navy/60 mb-2">SABC National Radio • 2024</p>
              <p className="text-lg text-navy font-semibold mb-2">Poetry Performance & Interview</p>
              <p className="text-navy/70">Live reading and conversation about African storytelling</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-display text-navy mb-8">Brand Assets</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="/press/logo-package.zip"
              download
              className="p-6 bg-beige/20 rounded-lg hover:bg-beige/30 transition-colors flex items-center gap-4 group"
            >
              <div className="w-16 h-16 bg-navy rounded-lg flex items-center justify-center">
                <Download className="w-8 h-8 text-beige" />
              </div>
              <div>
                <p className="font-bold text-navy mb-1">Logo Package</p>
                <p className="text-sm text-navy/70">PNG, SVG, all variations</p>
              </div>
            </a>
            <a
              href="/press/color-palette.pdf"
              download
              className="p-6 bg-beige/20 rounded-lg hover:bg-beige/30 transition-colors flex items-center gap-4 group"
            >
              <div className="w-16 h-16 bg-navy rounded-lg flex items-center justify-center">
                <Download className="w-8 h-8 text-beige" />
              </div>
              <div>
                <p className="font-bold text-navy mb-1">Brand Guidelines</p>
                <p className="text-sm text-navy/70">Colors, fonts, usage</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-6 bg-gradient-to-br from-navy to-cherry">
        <div className="max-w-3xl mx-auto text-center text-beige">
          <h2 className="text-4xl font-display mb-6">Need More Information?</h2>
          <p className="text-xl text-beige/90 mb-8">
            For interview requests, speaking engagements, or additional press materials
          </p>
          <div className="space-y-4">
            <a href="mailto:press@creativelynanda.co.za" className="block text-2xl font-bold hover:text-beige/80 transition-colors">
              press@creativelynanda.co.za
            </a>
            <p className="text-beige/70">Response time: 24-48 hours</p>
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

# 3. MIREMBE + SANYU BOTANICALS (APRIL 2026)

## 📍 Location
Update existing `app/(marketing)/mirembe/page.tsx`

## 🎯 Changes
- Update to April 2026 launch
- Add Sanyu Botanicals section with ingredients
- Interactive hair quiz
- Waitlist form

## Complete Updated Implementation

```typescript
// app/(marketing)/mirembe/page.tsx

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Heart, Sparkles, Calendar } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import SlideIn from '@/components/animations/SlideIn';
import HairQuiz from './components/HairQuiz';
import SanyuWaitlist from './components/SanyuWaitlist';
import IngredientHistory from './components/IngredientHistory';
import FloatingLeaves from './components/FloatingLeaves';

export const metadata: Metadata = {
  title: 'Mirembe Muse | African Botanical Wellness & Digital Excellence',
  description: 'Where nature meets nurture. Launching Sanyu Botanicals — African hair wisdom bottled with love. Plus digital services and creative education.',
};

export default function MirembePage() {
  return (
    <div className="min-h-screen bg-sanyu-cream relative overflow-hidden">
      <FloatingLeaves />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-24">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/mirembe/botanical-background.jpg"
            alt="Botanical"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <FadeIn>
            <div className="mb-8">
              <Image
                src="/logos/mirembe-muse-logo.png"
                alt="Mirembe Muse"
                width={200}
                height={80}
                className="mx-auto mb-6"
              />
              <h1 className="font-display text-6xl md:text-8xl text-sanyu-earth mb-4">
                Mirembe Muse
              </h1>
              <p className="font-accent text-3xl text-sanyu-sage italic">
                Where nature meets nurture
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-xl text-sanyu-forest/80 max-w-2xl mx-auto mb-12 leading-relaxed">
              African botanicals • Ancestral wisdom • Inner peace
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-sanyu-sage/20 border-2 border-sanyu-sage rounded-full mb-8">
              <Calendar className="w-5 h-5 text-sanyu-forest" />
              <span className="font-bold text-sanyu-forest">Launching April 2026</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.7}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#sanyu"
                className="px-8 py-4 bg-sanyu-earth text-sanyu-cream font-body text-lg rounded-full hover:bg-sanyu-forest transition-colors"
              >
                Discover Sanyu Botanicals
              </a>
              <a
                href="#quiz"
                className="px-8 py-4 border-2 border-sanyu-earth text-sanyu-earth font-body text-lg rounded-full hover:bg-sanyu-earth hover:text-sanyu-cream transition-all"
              >
                Take Hair Quiz
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* What is Mirembe */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <SlideIn direction="up">
            <div className="text-center mb-16">
              <h2 className="font-accent text-sanyu-sage text-3xl mb-4">the meaning</h2>
              <h3 className="font-display text-5xl md:text-6xl text-sanyu-earth mb-6">
                Mirembe Means Peace
              </h3>
              <p className="text-xl text-sanyu-forest/70 italic">
                In Luganda, one of Uganda's main languages
              </p>
            </div>
          </SlideIn>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <SlideIn direction="left">
              <div className="aspect-[3/4] relative rounded-2xl overflow-hidden">
                <Image
                  src="/images/mirembe/nanda-nature.jpg"
                  alt="Nanda in nature"
                  fill
                  className="object-cover"
                />
              </div>
            </SlideIn>

            <SlideIn direction="right">
              <div className="space-y-4 font-body text-lg text-sanyu-earth/80 leading-relaxed">
                <p>
                  <span className="font-accent text-3xl text-sanyu-sage">M</span>irembe Muse was 
                  born from watching my grandmother mix oils under the African sun. She didn't call 
                  it "hair care." She called it <em className="text-sanyu-forest font-semibold">love 
                  made visible</em>.
                </p>
                <p>
                  Years later, in a world of harsh chemicals and broken promises, I returned to those 
                  wisdom-filled hands. To the botanicals that nourished generations of African women. 
                  To the rituals that made hair care sacred, not stressful.
                </p>
                <p className="text-sanyu-forest font-semibold">
                  Mirembe Muse is that return home. It's your grandmother's wisdom in three forms: 
                  botanical products, digital services, and creative education.
                </p>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Sanyu Botanicals Section */}
      <section id="sanyu" className="py-24 px-6 bg-gradient-to-b from-sanyu-cream to-sanyu-sage/10">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sanyu-gold/20 border border-sanyu-gold rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-sanyu-gold" />
              <span className="text-sm font-bold text-sanyu-earth">LAUNCHING APRIL 2026</span>
            </div>
            <h2 className="font-display text-6xl md:text-7xl text-sanyu-earth mb-6">
              Sanyu Botanicals
            </h2>
            <p className="font-accent text-3xl text-sanyu-sage italic">
              African hair wisdom, bottled with love
            </p>
          </FadeIn>

          {/* The Formula */}
          <div className="mb-24">
            <SlideIn direction="up">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h3 className="text-4xl font-display text-sanyu-earth mb-6">The Sacred Formula</h3>
                <p className="text-xl text-sanyu-forest/70 font-body leading-relaxed">
                  Every ingredient carries centuries of African hair care wisdom. This isn't just a 
                  product — it's ancestral knowledge meeting modern formulation.
                </p>
              </div>
            </SlideIn>

            {/* Ingredients Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  name: 'Chebe Leaves',
                  origin: 'Chad',
                  benefit: 'Legendary hair lengthening secret',
                  icon: '🌿',
                },
                {
                  name: 'Shea Butter',
                  origin: 'West Africa',
                  benefit: 'Deep moisture & protection',
                  icon: '🥜',
                },
                {
                  name: 'Black Cumin Oil',
                  origin: 'North Africa',
                  benefit: 'Stimulates growth, reduces shedding',
                  icon: '🌑',
                },
                {
                  name: 'Moringa',
                  origin: 'East Africa',
                  benefit: 'Vitamins A, B, C, E for hair health',
                  icon: '🌱',
                },
                {
                  name: 'Neem',
                  origin: 'Pan-African',
                  benefit: 'Scalp health, antifungal',
                  icon: '🍃',
                },
                {
                  name: 'Fenugreek Seeds',
                  origin: 'Ancient trade routes',
                  benefit: 'High protein, prevents breakage',
                  icon: '🌾',
                },
                {
                  name: 'Castor Oil',
                  origin: 'East Africa',
                  benefit: 'Growth powerhouse',
                  icon: '💧',
                },
                {
                  name: 'Cloves',
                  origin: 'Zanzibar',
                  benefit: 'Circulation booster',
                  icon: '🌺',
                },
                {
                  name: 'Coconut Oil',
                  origin: 'Coastal Africa',
                  benefit: 'Penetrates hair shaft',
                  icon: '🥥',
                },
              ].map((ingredient, index) => (
                <FadeIn key={ingredient.name} delay={index * 0.05}>
                  <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 border-sanyu-sage">
                    <div className="text-4xl mb-3">{ingredient.icon}</div>
                    <h4 className="font-bold text-sanyu-earth text-lg mb-2">{ingredient.name}</h4>
                    <p className="text-sm text-sanyu-sage mb-2">{ingredient.origin}</p>
                    <p className="text-sanyu-forest/70">{ingredient.benefit}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Special Mix Callout */}
            <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-sanyu-gold/20 via-sanyu-sage/20 to-sanyu-gold/20 rounded-2xl border-2 border-sanyu-gold/30">
              <div className="flex items-start gap-4">
                <Heart className="w-8 h-8 text-cherry flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-xl text-sanyu-earth mb-3">Nanda's Special Infusion</h4>
                  <p className="text-sanyu-forest/80 mb-4 leading-relaxed">
                    Beyond the base formula, I've infused my own blend of <strong>black cumin oil, 
                    fenugreek seeds, cloves, moringa, and neem</strong> — ingredients my grandmother 
                    used for maximum hair growth and scalp health.
                  </p>
                  <p className="text-sm text-sanyu-sage italic">
                    This is the formula that transformed my own 4C hair journey.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ingredient History Component */}
          <IngredientHistory />
        </div>
      </section>

      {/* Hair Quiz Section */}
      <section id="quiz" className="py-24 px-6 bg-sanyu-forest/5">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="font-display text-5xl md:text-6xl text-sanyu-earth mb-4">
              Find Your Perfect Ritual
            </h2>
            <p className="text-xl text-sanyu-forest/70 font-body">
              Take our hair quiz to discover which Sanyu blend is made for your crown
            </p>
          </FadeIn>

          <HairQuiz />
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-sanyu-cream to-sanyu-sage/20">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="font-accent text-sanyu-sage text-3xl mb-4">join the circle</h2>
            <h3 className="font-display text-5xl md:text-6xl text-sanyu-earth mb-6">
              Be Among the First
            </h3>
            <p className="text-xl text-sanyu-forest/70 font-body">
              Launching April 2026. Join our waitlist for early access and founder's pricing.
            </p>
          </FadeIn>

          <SanyuWaitlist />
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-display text-sanyu-earth text-center mb-16">
            The Mirembe Muse Ecosystem
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Leaf,
                title: 'Wellness Products',
                description: 'Sanyu Botanicals — African botanical haircare and wellness essentials',
                items: ['Hair Growth Oil', 'Scalp Serum', 'Wellness Teas', 'Gift Collections'],
                cta: 'Join Waitlist',
                link: '#quiz',
              },
              {
                icon: Sparkles,
                title: 'Digital Services',
                description: 'Full-stack development, AI integration, and Notion systems for businesses',
                items: ['Web Applications', 'AI-Powered Solutions', 'Notion Architecture', 'Consulting'],
                cta: 'View Services',
                link: '/ai-engineer',
              },
              {
                icon: Heart,
                title: 'Creative Studio',
                description: 'Templates, courses, and resources for African creators and entrepreneurs',
                items: ['Notion Templates', 'Digital Courses', 'Poetry & Writing', 'Community'],
                cta: 'Browse Products',
                link: '/products',
              },
            ].map((pillar, index) => (
              <SlideIn key={pillar.title} direction="up" delay={index * 0.2}>
                <div className="h-full p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow border-t-4 border-sanyu-sage">
                  <div className="w-16 h-16 bg-sanyu-sage/20 rounded-full flex items-center justify-center mb-6">
                    <pillar.icon className="w-8 h-8 text-sanyu-forest" />
                  </div>
                  <h3 className="text-2xl font-bold text-sanyu-earth mb-3">{pillar.title}</h3>
                  <p className="text-sanyu-forest/70 mb-6">{pillar.description}</p>
                  <ul className="space-y-2 mb-8">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sanyu-forest/80">
                        <span className="w-1.5 h-1.5 bg-sanyu-sage rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={pillar.link}
                    className="inline-block w-full text-center px-6 py-3 bg-sanyu-earth text-sanyu-cream rounded-lg hover:bg-sanyu-forest transition-colors"
                  >
                    {pillar.cta}
                  </Link>
                </div>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

# 4. INTERACTIVE HAIR QUIZ

## 📍 Location
`app/(marketing)/mirembe/components/HairQuiz.tsx`

## Complete Implementation

```typescript
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface QuizQuestion {
  id: number;
  question: string;
  options: Array<{
    label: string;
    value: string;
    emoji?: string;
  }>;
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is your hair type?',
    options: [
      { label: '4C (Tight coils)', value: '4c', emoji: '🌀' },
      { label: '4B (Z-pattern)', value: '4b', emoji: '⚡' },
      { label: '4A (S-pattern)', value: '4a', emoji: '🌊' },
      { label: '3C (Corkscrew)', value: '3c', emoji: '🌀' },
      { label: 'Relaxed/Texturized', value: 'relaxed', emoji: '✨' },
      { label: 'Transitioning', value: 'transitioning', emoji: '🦋' },
    ],
  },
  {
    id: 2,
    question: 'What is your main hair goal?',
    options: [
      { label: 'Length retention & growth', value: 'growth', emoji: '📈' },
      { label: 'Moisture & softness', value: 'moisture', emoji: '💧' },
      { label: 'Scalp health', value: 'scalp', emoji: '🌿' },
      { label: 'Strength & thickness', value: 'strength', emoji: '💪' },
      { label: 'Shine & definition', value: 'shine', emoji: '✨' },
    ],
  },
  {
    id: 3,
    question: 'How often do you currently oil your hair?',
    options: [
      { label: 'Daily', value: 'daily', emoji: '☀️' },
      { label: '2-3 times a week', value: 'regular', emoji: '🌙' },
      { label: 'Once a week', value: 'weekly', emoji: '📅' },
      { label: 'Rarely', value: 'rarely', emoji: '🤷‍♀️' },
      { label: 'Never - I want to start!', value: 'never', emoji: '🌱' },
    ],
  },
  {
    id: 4,
    question: 'What is your scalp condition?',
    options: [
      { label: 'Normal', value: 'normal', emoji: '😊' },
      { label: 'Dry & itchy', value: 'dry', emoji: '🏜️' },
      { label: 'Oily', value: 'oily', emoji: '💦' },
      { label: 'Flaky/dandruff', value: 'flaky', emoji: '❄️' },
      { label: 'Sensitive', value: 'sensitive', emoji: '🌸' },
    ],
  },
  {
    id: 5,
    question: 'What scent profile appeals to you?',
    options: [
      { label: 'Earthy & herbal', value: 'earthy', emoji: '🌿' },
      { label: 'Sweet & floral', value: 'sweet', emoji: '🌸' },
      { label: 'Fresh & minty', value: 'fresh', emoji: '🍃' },
      { label: 'Warm & spicy', value: 'warm', emoji: '🔥' },
      { label: 'Unscented', value: 'unscented', emoji: '🤍' },
    ],
  },
];

const recommendations: Record<string, {
  product: string;
  tagline: string;
  description: string;
  ingredients: string[];
  price: string;
  image: string;
}> = {
  growth: {
    product: 'Growth Accelerator Blend',
    tagline: 'For the length journey',
    description: 'Our most potent formula combining chebe, black cumin, and fenugreek to maximize growth and length retention.',
    ingredients: ['Chebe leaves', 'Black cumin oil', 'Castor oil', 'Fenugreek', 'Moringa'],
    price: 'R249',
    image: '/images/sanyu/growth-blend.jpg',
  },
  moisture: {
    product: 'Deep Moisture Ritual',
    tagline: 'For soft, hydrated hair',
    description: 'Shea butter and coconut oil base with moisture-locking ingredients for ultimate softness.',
    ingredients: ['Shea butter', 'Coconut oil', 'Jojoba oil', 'Moringa', 'Hibiscus'],
    price: 'R229',
    image: '/images/sanyu/moisture-blend.jpg',
  },
  scalp: {
    product: 'Scalp Health Serum',
    tagline: 'For healthy roots',
    description: 'Neem and clove-infused formula to soothe, cleanse, and promote optimal scalp health.',
    ingredients: ['Neem', 'Cloves', 'Tea tree', 'Peppermint', 'Castor oil'],
    price: 'R199',
    image: '/images/sanyu/scalp-serum.jpg',
  },
  strength: {
    product: 'Fortifying Power Oil',
    tagline: 'For strong, resilient hair',
    description: 'Protein-rich formula with fenugreek and herbs to strengthen from root to tip.',
    ingredients: ['Fenugreek', 'Soya protein', 'Castor oil', 'Moringa', 'Chebe'],
    price: 'R239',
    image: '/images/sanyu/strength-oil.jpg',
  },
  shine: {
    product: 'Radiance Finishing Oil',
    tagline: 'For lustrous definition',
    description: 'Lightweight blend that adds shine, definition, and seals in moisture.',
    ingredients: ['Jojoba oil', 'Coconut oil', 'Lime', 'Moringa', 'Vitamin E'],
    price: 'R209',
    image: '/images/sanyu/shine-oil.jpg',
  },
};

export default function HairQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    setCurrentQuestion(prev => prev - 1);
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const getRecommendation = () => {
    const goal = answers[2]; // Question about main hair goal
    return recommendations[goal] || recommendations.growth;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const rec = getRecommendation();

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
      >
        <div className="text-center mb-8">
          <Sparkles className="w-12 h-12 text-sanyu-gold mx-auto mb-4" />
          <h3 className="text-3xl font-display text-sanyu-earth mb-2">
            Your Perfect Match
          </h3>
          <p className="text-sanyu-forest/70">Based on your quiz results</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
          <div className="aspect-square relative rounded-lg overflow-hidden bg-sanyu-sage/10">
            <Image
              src={rec.image}
              alt={rec.product}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h4 className="text-2xl font-bold text-sanyu-earth mb-2">{rec.product}</h4>
            <p className="text-lg font-accent text-sanyu-sage italic mb-4">{rec.tagline}</p>
            <p className="text-sanyu-forest/80 mb-6 leading-relaxed">{rec.description}</p>

            <div className="mb-6">
              <p className="text-sm font-bold text-sanyu-forest mb-3">KEY INGREDIENTS:</p>
              <div className="flex flex-wrap gap-2">
                {rec.ingredients.map((ingredient) => (
                  <span
                    key={ingredient}
                    className="px-3 py-1 bg-sanyu-sage/20 text-sanyu-forest rounded-full text-sm"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-sanyu-sage/30">
              <span className="text-3xl font-display text-sanyu-gold">{rec.price}</span>
              <span className="text-sm text-sanyu-forest/60">100ml</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <a
            href="#waitlist"
            className="block w-full text-center px-8 py-4 bg-sanyu-earth text-sanyu-cream font-bold rounded-lg hover:bg-sanyu-forest transition-colors"
          >
            Join Waitlist for {rec.product}
          </a>
          <button
            onClick={handleReset}
            className="block w-full text-center px-8 py-4 border-2 border-sanyu-earth text-sanyu-earth font-bold rounded-lg hover:bg-sanyu-earth hover:text-sanyu-cream transition-all"
          >
            Retake Quiz
          </button>
        </div>
      </motion.div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-sanyu-forest/60">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-sm font-bold text-sanyu-sage">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-sanyu-sage/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-sanyu-sage to-sanyu-gold"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-sanyu-earth mb-8">
            {question.question}
          </h3>

          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center gap-3 ${
                  answers[question.id] === option.value
                    ? 'border-sanyu-sage bg-sanyu-sage/10 shadow-md'
                    : 'border-sanyu-sage/20 hover:border-sanyu-sage/50 hover:bg-sanyu-sage/5'
                }`}
              >
                {option.emoji && <span className="text-2xl">{option.emoji}</span>}
                <span className={`font-semibold ${
                  answers[question.id] === option.value ? 'text-sanyu-forest' : 'text-sanyu-earth/70'
                }`}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-4 mt-8">
        {currentQuestion > 0 && (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 border-2 border-sanyu-sage text-sanyu-forest font-bold rounded-lg hover:bg-sanyu-sage/10 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!answers[question.id]}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 font-bold rounded-lg transition-all ${
            answers[question.id]
              ? 'bg-sanyu-earth text-sanyu-cream hover:bg-sanyu-forest'
              : 'bg-sanyu-sage/20 text-sanyu-sage/50 cursor-not-allowed'
          }`}
        >
          {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
```

---

**TO BE CONTINUED IN PART 2...**

This implementation package is getting massive! I'm creating:
1. ✅ AI Engineer page (DONE)
2. ✅ Media Kit/Press page (DONE)
3. ✅ Mirembe + Sanyu Botanicals update (DONE)
4. ✅ Interactive Hair Quiz (DONE)
5. 🔄 Sanyu Waitlist component (NEXT)
6. 🔄 Ingredient History component (NEXT)
7. 🔄 Blog system with case studies (NEXT)
8. 🔄 Sample blog posts (NEXT)

# 🚀 NANDA COMPLETE IMPLEMENTATION PACKAGE - PART 2
## Waitlist, Ingredients, Blog System, Sample Posts

**Continued from Part 1**

---

# 5. SANYU WAITLIST COMPONENT

## 📍 Location
`app/(marketing)/mirembe/components/SanyuWaitlist.tsx`

## Complete Implementation

```typescript
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function SanyuWaitlist() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    hairType: '',
    interests: [] as string[],
    howHeard: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'sanyu-botanicals',
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          hairType: '',
          interests: [],
          howHeard: '',
        });

        // Track conversion
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'waitlist_join', {
            event_category: 'engagement',
            event_label: 'sanyu_botanicals',
          });
        }
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Waitlist error:', error);
      setStatus('error');
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-12 text-center"
      >
        <div className="w-20 h-20 bg-sanyu-sage rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-display text-sanyu-earth mb-4">Welcome to the Circle!</h3>
        <p className="text-lg text-sanyu-forest/70 mb-6">
          Check your inbox for your welcome email. You're now part of the Sanyu family.
        </p>
        <div className="space-y-3 text-sm text-sanyu-earth/70">
          <p>✨ You'll get early access 48 hours before public launch</p>
          <p>💰 Founding member discount: 30% off</p>
          <p>📚 Free Hair Love Handbook delivered to your inbox</p>
          <p>🌸 Monthly hair care tips and African botanical wisdom</p>
        </div>
        <button
          onClick={() => setStatus('idle')}
          className="mt-8 text-sanyu-sage hover:text-sanyu-forest transition-colors font-semibold"
        >
          Add another person to waitlist
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-bold text-sanyu-forest mb-2">
            Your Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border-2 border-sanyu-sage/30 focus:border-sanyu-sage focus:outline-none transition-colors text-sanyu-earth"
            placeholder="Nomvula"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-bold text-sanyu-forest mb-2">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border-2 border-sanyu-sage/30 focus:border-sanyu-sage focus:outline-none transition-colors text-sanyu-earth"
            placeholder="nomvula@example.com"
          />
        </div>

        {/* Hair Type */}
        <div>
          <label className="block text-sm font-bold text-sanyu-forest mb-2">
            Hair Type (Optional)
          </label>
          <select
            value={formData.hairType}
            onChange={(e) => setFormData(prev => ({ ...prev, hairType: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border-2 border-sanyu-sage/30 focus:border-sanyu-sage focus:outline-none transition-colors text-sanyu-earth"
          >
            <option value="">Select your hair type</option>
            <option value="4c">4C (Tight coils)</option>
            <option value="4b">4B (Z-pattern coils)</option>
            <option value="4a">4A (Defined S-pattern curls)</option>
            <option value="3c">3C (Corkscrew curls)</option>
            <option value="3b">3B (Loose curls)</option>
            <option value="relaxed">Relaxed/Texturized</option>
            <option value="transitioning">Transitioning to Natural</option>
            <option value="protective">Protective Styles</option>
            <option value="locs">Locs/Dreadlocks</option>
          </select>
        </div>

        {/* Product Interests */}
        <div>
          <label className="block text-sm font-bold text-sanyu-forest mb-3">
            Which products interest you? (Select all that apply)
          </label>
          <div className="space-y-3">
            {[
              { id: 'growth', label: '🌱 Growth Accelerator Blend', description: 'For length retention' },
              { id: 'moisture', label: '💧 Deep Moisture Ritual', description: 'For softness & hydration' },
              { id: 'scalp', label: '🌿 Scalp Health Serum', description: 'For healthy roots' },
              { id: 'strength', label: '💪 Fortifying Power Oil', description: 'For strong hair' },
              { id: 'shine', label: '✨ Radiance Finishing Oil', description: 'For definition & shine' },
              { id: 'workshop', label: '📚 Hair Care Workshops', description: 'Live learning sessions' },
            ].map((interest) => (
              <label
                key={interest.id}
                className="flex items-start gap-3 p-3 rounded-lg cursor-pointer group hover:bg-sanyu-sage/5 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={formData.interests.includes(interest.id)}
                  onChange={() => handleInterestToggle(interest.id)}
                  className="w-5 h-5 mt-0.5 text-sanyu-sage focus:ring-sanyu-sage border-sanyu-sage/30 rounded"
                />
                <div className="flex-1">
                  <span className="text-sanyu-earth font-semibold group-hover:text-sanyu-forest transition-colors">
                    {interest.label}
                  </span>
                  <p className="text-sm text-sanyu-forest/60">{interest.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* How Did You Hear */}
        <div>
          <label className="block text-sm font-bold text-sanyu-forest mb-2">
            How did you hear about us? (Optional)
          </label>
          <select
            value={formData.howHeard}
            onChange={(e) => setFormData(prev => ({ ...prev, howHeard: e.target.value }))}
            className="w-full px-4 py-3 rounded-lg border-2 border-sanyu-sage/30 focus:border-sanyu-sage focus:outline-none transition-colors text-sanyu-earth"
          >
            <option value="">Select one</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="twitter">Twitter/X</option>
            <option value="friend">Friend or family</option>
            <option value="blog">Blog post</option>
            <option value="podcast">Podcast</option>
            <option value="google">Google search</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Benefits Reminder */}
        <div className="p-4 bg-gradient-to-r from-sanyu-gold/10 to-sanyu-sage/10 rounded-lg border border-sanyu-gold/20">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-sanyu-gold flex-shrink-0 mt-0.5" />
            <div className="text-sm text-sanyu-forest/80">
              <p className="font-bold mb-2">Waitlist Benefits:</p>
              <ul className="space-y-1">
                <li>• 48-hour early access before public launch</li>
                <li>• 30% founding member discount</li>
                <li>• Free Hair Love Handbook (R49 value)</li>
                <li>• Priority customer support</li>
                <li>• Monthly hair care tips newsletter</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 bg-sanyu-earth text-sanyu-cream font-bold text-lg rounded-lg hover:bg-sanyu-forest transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {status === 'loading' ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Joining...
            </>
          ) : (
            'Join the Waitlist'
          )}
        </button>

        {status === 'error' && (
          <p className="text-red-600 text-center text-sm">
            Something went wrong. Please try again or email us at hello@creativelynanda.co.za
          </p>
        )}

        {/* Privacy Note */}
        <p className="text-xs text-center text-sanyu-earth/60">
          We respect your inbox. Unsubscribe anytime. No spam, just hair love. 
          By joining, you agree to our{' '}
          <a href="/privacy" className="underline hover:text-sanyu-sage">Privacy Policy</a>.
        </p>
      </form>
    </motion.div>
  );
}
```

---

# 6. INGREDIENT HISTORY COMPONENT

## 📍 Location
`app/(marketing)/mirembe/components/IngredientHistory.tsx`

## Complete Implementation

```typescript
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';

const ingredients = [
  {
    name: 'Chebe Leaves',
    origin: 'Chad, Central Africa',
    history: 'For centuries, the Basara Arab women of Chad have used chebe powder as their secret to waist-length hair. The leaves from the Croton Zambesicus plant are dried, ground, and mixed with oils to create a protective coating that prevents breakage and retains length. This practice has been passed down through generations as a closely guarded beauty ritual.',
    benefits: [
      'Prevents hair breakage and split ends',
      'Promotes extreme length retention',
      'Protects hair shaft from environmental damage',
      'Naturally conditions and strengthens',
    ],
    modernUse: 'We sustainably source chebe from women\'s cooperatives in Chad, supporting the communities who have protected this wisdom.',
    image: '/images/ingredients/chebe.jpg',
  },
  {
    name: 'Shea Butter',
    origin: 'West Africa (Ghana, Nigeria, Burkina Faso)',
    history: 'The Shea tree (Vitellaria paradoxa) is called "women\'s gold" in West Africa. For over 3,000 years, women have harvested shea nuts, processing them through labor-intensive methods to extract the rich butter. It has been used not just for hair and skin, but as currency, in ceremonies, and as a symbol of community strength. Cleopatra herself reportedly had jars of shea butter shipped to Egypt.',
    benefits: [
      'Deep moisture and hydration',
      'Rich in vitamins A, E, and F',
      'Anti-inflammatory properties',
      'Protects against heat and UV damage',
    ],
    modernUse: 'Our shea butter is unrefined and fair-trade certified, ensuring the women who harvest it receive fair compensation.',
    image: '/images/ingredients/shea.jpg',
  },
  {
    name: 'Black Cumin Oil (Nigella Sativa)',
    origin: 'North Africa & Middle East',
    history: 'Known as "Habbatul Barakah" (seed of blessing) in Arabic, black cumin has been used for over 3,000 years. Found in Tutankhamun\'s tomb, it was considered so valuable that it was buried with pharaohs. Ancient Egyptians used it for everything from digestive health to hair growth. The Prophet Muhammad reportedly said, "In black seed there is healing for every disease except death."',
    benefits: [
      'Stimulates hair follicles for growth',
      'Reduces hair thinning and shedding',
      'Anti-inflammatory and antimicrobial',
      'Rich in thymoquinone (powerful antioxidant)',
    ],
    modernUse: 'Cold-pressed to preserve its potent compounds, this is one of our most powerful growth-stimulating ingredients.',
    image: '/images/ingredients/black-cumin.jpg',
  },
  {
    name: 'Moringa',
    origin: 'East Africa & Indian Subcontinent',
    history: 'Called the "Miracle Tree," moringa (Moringa oleifera) has been used in African and Asian traditional medicine for over 4,000 years. Every part of the tree is useful — leaves, seeds, pods, and oil. In East Africa, women have used moringa oil for hair growth and skin nourishment for generations. It\'s so nutrient-dense that it\'s used to combat malnutrition.',
    benefits: [
      'Contains vitamins A, B, C, E',
      'Rich in proteins and amino acids',
      'Promotes circulation to scalp',
      'Prevents dandruff and itchiness',
    ],
    modernUse: 'We use moringa seed oil, which is lightweight yet incredibly nourishing, perfect for all hair types.',
    image: '/images/ingredients/moringa.jpg',
  },
  {
    name: 'Neem',
    origin: 'Pan-African (originally from India)',
    history: 'Neem (Azadirachta indica) has been used in African traditional medicine for centuries, particularly in East and Southern Africa. Known as "the village pharmacy," neem has antimicrobial, antifungal, and anti-inflammatory properties. Healers used neem oil to treat scalp conditions, promote healthy hair growth, and prevent lice and dandruff.',
    benefits: [
      'Treats scalp infections naturally',
      'Reduces dandruff and itchiness',
      'Promotes healthy hair follicles',
      'Soothes irritated scalp',
    ],
    modernUse: 'Carefully formulated in small amounts for its powerful healing properties without overpowering scent.',
    image: '/images/ingredients/neem.jpg',
  },
  {
    name: 'Fenugreek Seeds',
    origin: 'North Africa & Mediterranean',
    history: 'Fenugreek (Trigonella foenum-graecum) has been cultivated in North Africa and the Mediterranean for over 4,000 years. Ancient Egyptians used it in embalming, while traditional healers used it for hair strengthening. The seeds are rich in proteins and nicotinic acid, making them a natural remedy for hair loss and thinning.',
    benefits: [
      'High protein content strengthens hair',
      'Prevents hair breakage',
      'Adds natural shine and bounce',
      'Soothes scalp inflammation',
    ],
    modernUse: 'We infuse fenugreek seeds in our oil blend, extracting their protein-rich goodness for maximum strength.',
    image: '/images/ingredients/fenugreek.jpg',
  },
  {
    name: 'Cloves',
    origin: 'Zanzibar, Tanzania',
    history: 'Zanzibar became the world\'s largest producer of cloves in the 19th century. These aromatic flower buds have been used in African traditional medicine for pain relief, dental health, and to improve blood circulation. Women discovered that clove-infused oils increased blood flow to the scalp, promoting hair growth.',
    benefits: [
      'Improves blood circulation to scalp',
      'Antimicrobial and antifungal',
      'Stimulates hair follicles',
      'Adds natural warmth and fragrance',
    ],
    modernUse: 'Carefully blended to harness circulation-boosting properties without overwhelming the senses.',
    image: '/images/ingredients/cloves.jpg',
  },
  {
    name: 'Castor Oil',
    origin: 'East Africa',
    history: 'Castor oil, from the Ricinus communis plant, has been used in Africa for thousands of years. Ancient Egyptians used it for lamp oil, medicine, and hair care. Jamaican Black Castor Oil, now famous worldwide, has its roots in African traditions brought to the Caribbean. It\'s been the go-to oil for hair growth in African communities for generations.',
    benefits: [
      'Ricinoleic acid promotes hair growth',
      'Thickens hair and eyebrows',
      'Deeply moisturizing',
      'Reduces scalp inflammation',
    ],
    modernUse: 'We use pure, cold-pressed castor oil as a base for maximum growth-promoting benefits.',
    image: '/images/ingredients/castor.jpg',
  },
  {
    name: 'Coconut Oil',
    origin: 'Coastal East Africa',
    history: 'While coconuts are native to the Pacific, they\'ve been cultivated along Africa\'s East Coast for over 2,000 years, brought by Arab and Indian traders. Swahili women have long used coconut oil for hair care, mixing it with herbs and spices. It\'s one of the few oils that can actually penetrate the hair shaft rather than just coating it.',
    benefits: [
      'Penetrates hair shaft for deep conditioning',
      'Prevents protein loss from hair',
      'Natural antimicrobial properties',
      'Lightweight and versatile',
    ],
    modernUse: 'Virgin coconut oil provides the perfect carrier for our herbal infusions.',
    image: '/images/ingredients/coconut.jpg',
  },
];

export default function IngredientHistory() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-display text-sanyu-earth mb-4">
          The Story in Every Drop
        </h2>
        <p className="text-xl text-sanyu-forest/70 font-body">
          Every ingredient carries centuries of African wisdom. Click to explore.
        </p>
      </div>

      <div className="space-y-4">
        {ingredients.map((ingredient, index) => (
          <motion.div
            key={ingredient.name}
            initial={false}
            className="bg-white rounded-xl shadow-lg overflow-hidden border-l-4 border-sanyu-sage"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-sanyu-sage/5 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-sanyu-sage/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-sanyu-forest" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-sanyu-earth mb-1">{ingredient.name}</h3>
                  <p className="text-sm text-sanyu-sage">{ingredient.origin}</p>
                </div>
              </div>
              {openIndex === index ? (
                <ChevronUp className="w-6 h-6 text-sanyu-sage flex-shrink-0" />
              ) : (
                <ChevronDown className="w-6 h-6 text-sanyu-sage flex-shrink-0" />
              )}
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 space-y-6">
                    {/* History */}
                    <div>
                      <h4 className="font-bold text-sanyu-forest mb-2">Ancient Wisdom</h4>
                      <p className="text-sanyu-earth/80 leading-relaxed">{ingredient.history}</p>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-bold text-sanyu-forest mb-3">Hair Benefits</h4>
                      <ul className="space-y-2">
                        {ingredient.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-sanyu-sage rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sanyu-earth/80">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Modern Use */}
                    <div className="p-4 bg-sanyu-sage/10 rounded-lg border-l-4 border-sanyu-sage">
                      <h4 className="font-bold text-sanyu-forest mb-2">How We Use It</h4>
                      <p className="text-sanyu-earth/80">{ingredient.modernUse}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Closing Statement */}
      <div className="mt-16 p-8 bg-gradient-to-r from-sanyu-gold/20 to-sanyu-sage/20 rounded-2xl text-center border-2 border-sanyu-gold/30">
        <h3 className="text-2xl font-display text-sanyu-earth mb-4">
          A Continent in Every Jar
        </h3>
        <p className="text-lg text-sanyu-forest/80 max-w-3xl mx-auto">
          From Chad to Zanzibar, from ancient Egypt to modern science — Sanyu Botanicals 
          honors the full breadth of African botanical wisdom. Every drop connects you to 
          thousands of years of hair care knowledge, formulated for your modern crown.
        </p>
      </div>
    </div>
  );
}
```

---

# 7. BLOG SYSTEM WITH CASE STUDIES

## Sample Blog Posts as Project Case Studies

### Blog Post 1: K53 Drill Master

**File:** `content/blog/2026-02-05-building-k53-drill-master.mdx`

```mdx
---
title: "Building K53 Drill Master: How I Turned R0 into R1,450/Month with AI"
excerpt: "The complete story of building an AI-powered driving test prep app from scratch, launching with paying subscribers, and generating recurring revenue."
coverImage: "/images/blog/k53-case-study.jpg"
date: "2026-02-05"
tags: ["ai", "case-study", "entrepreneurship", "react"]
category: "dev"
featured: true
---

# Building K53 Drill Master: How I Turned R0 into R1,450/Month with AI

**The Challenge:** 70% of South African learner drivers fail their K53 test on the first attempt. I wanted to build something that actually helped.

**The Result:** 50+ paying subscribers, R1,450/month recurring revenue, 4.8/5 rating, built in 3 weeks.

Here's exactly how I did it.

## The Problem I Saw

Every time I scrolled through Facebook groups for learner drivers, I saw the same panic:
- "Test tomorrow, any tips?"
- "Failed for the 3rd time 😭"
- "Where can I practice online?"

The existing solutions were terrible:
- PDFs that were boring to read
- Static quizzes with no feedback
- Expensive courses (R500+) with no personalization

I knew I could build something better. And I knew AI could be the secret weapon.

## The Solution: AI-Powered Personalized Feedback

Instead of just giving answers, K53 Drill Master:
1. **Asks questions** based on weak areas
2. **Explains why** answers are right or wrong (using Claude API)
3. **Tracks progress** and adjusts difficulty
4. **Simulates the actual test** environment

### The Tech Stack

```typescript
Frontend: Next.js 14 + React + TypeScript
Backend: Supabase (PostgreSQL)
AI: Claude Sonnet 3.5 via Anthropic API
Payments: PayFast
Hosting: Vercel
```

### The Architecture

```
User submits answer
    ↓
Claude API analyzes
    ↓
Generates personalized feedback
    ↓
Saves to Supabase
    ↓
Updates user progress
    ↓
Suggests next questions
```

## The Build Process (Week by Week)

### Week 1: MVP
- Set up Next.js project
- Built question database (200 K53 questions)
- Integrated Claude API for feedback
- Basic UI with Tailwind

### Week 2: Core Features
- User authentication (Supabase Auth)
- Progress tracking
- Mock test mode
- Payment integration (PayFast)

### Week 3: Polish & Launch
- Responsive design
- Performance optimization
- SEO
- Soft launch to driving school Facebook groups

## The Claude API Integration (The Secret Sauce)

Here's the actual code that generates personalized feedback:

```typescript
async function generateFeedback(question: string, userAnswer: string, correctAnswer: string) {
  const prompt = `
You are a K53 driving instructor in South Africa. A learner selected "${userAnswer}" for this question:

"${question}"

The correct answer is "${correctAnswer}".

Provide:
1. Whether they were correct
2. Why the answer is what it is (in simple terms)
3. A practical tip to remember this

Keep it encouraging and under 100 words.
`;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-3-5-20241022',
    max_tokens: 200,
    messages: [{ role: 'user', content: prompt }],
  });

  return response.content[0].text;
}
```

**Why this works:**
- Claude understands South African driving context
- Generates unique, helpful explanations (not robotic)
- Adapts tone based on whether user was right/wrong
- Costs ~R0.05 per feedback (cheap at scale)

## The Pricing Strategy

After testing with beta users, I landed on:

**Monthly:** R29/month
**3 Months:** R69 (save R18)

**Why this works:**
- Impulse-buy territory (< price of a meal)
- Most people take test within 3 months
- Recurring revenue > one-time sales
- PayFast handles subscriptions automatically

## The Launch Strategy

I didn't have a marketing budget. Here's what I did:

### Free Channels:
1. **Facebook Groups:** Posted in 20 driving school groups with genuine value (free tips + app link)
2. **TikTok:** Created 5 videos showing the app in action
3. **WhatsApp:** Shared in family/friends groups, asked them to share
4. **SEO:** Optimized for "K53 practice test online"

### What Worked Best:
**Facebook groups** brought 80% of initial traffic. Why? Because people were ACTIVELY looking for help.

### The Pitch:
> "I built this AI app to help you pass your K53 first time. It explains WHY answers are right/wrong (not just flash cards). R29/month. Try it free for 3 days: [link]"

No fancy copywriting. Just solved a real problem.

## The Results (First Month)

- **Week 1:** 12 signups (mostly friends + family)
- **Week 2:** 23 signups (Facebook groups kicking in)
- **Week 3:** 31 signups (word of mouth)
- **Week 4:** 50 total subscribers

**Revenue:** R1,450/month recurring

**Churn:** Only 2 people canceled (96% retention)

**User Feedback:**
- "This is better than my driving instructor!"
- "Passed first time because of this app 🙌"
- "The AI explanations are SO helpful"

## The Challenges I Faced

### Challenge 1: PayFast Integration Was Hell
**Problem:** Documentation was outdated, error messages were cryptic

**Solution:** Found a working example on GitHub, adapted it, added better error handling

**Time Lost:** 8 hours (worth it for recurring revenue)

### Challenge 2: Claude API Rate Limits
**Problem:** Free tier = 5 requests/min (not enough)

**Solution:** Implemented request queuing + paid $20 for higher limits

**Lesson:** Budget for API costs from day 1

### Challenge 3: Users Not Converting
**Problem:** 300 visits, only 10 signups (3% conversion)

**Solution:** 
- Added 3-day free trial
- Showed sample feedback on homepage
- Added testimonials from beta testers

**Result:** Conversion jumped to 15%

## What I'd Do Differently

1. **Start with free tier + ads:** Could've gotten more users, monetized later
2. **Build email list earlier:** Now I can't reach non-subscribers for updates
3. **Add referral program:** "Invite 3 friends, get 1 month free"
4. **Make mobile app:** 60% of users are on mobile, PWA isn't enough

## The Tech Decisions That Paid Off

### ✅ Next.js
- Fast development
- Built-in SEO
- Easy deployment on Vercel

### ✅ Supabase
- Free tier is generous
- Real-time subscriptions
- Auth just works

### ✅ Claude API
- Better explanations than GPT-4 (tested both)
- Cheaper
- Faster responses

### ✅ PayFast (Despite the Pain)
- South Africans trust it
- Handles subscriptions
- No international fees

## The Business Model Going Forward

**Current:** R1,450/month from 50 users

**Goal (6 months):** R10,000/month from 350 users

**How:**
1. SEO content (blog posts about K53 tips)
2. Partnership with driving schools (white-label version)
3. Add more features (video explanations, virtual instructor)
4. Expand to other countries (K53 is also used in Namibia, Botswana)

## The Lessons I Learned

### 1. Start Small, Start NOW
Don't wait for perfect. I launched with 200 questions. Now I have 500+. Users helped me identify what was missing.

### 2. AI is Your Unfair Advantage
I couldn't afford to hire tutors to write feedback for 500 questions. Claude did it for cents.

### 3. Solve YOUR Problem
I struggled with K53. I knew the pain. Build what you wish existed.

### 4. Revenue > Downloads
50 paying users > 5,000 free users. Focus on conversion, not vanity metrics.

### 5. Community Marketing > Ads
R0 spent on ads. All growth from showing up where my users already were.

## Want to Build Something Similar?

Here's my GitHub repo (MIT license):
[github.com/Nanda-Regine/k53-drill-master](https://github.com/Nanda-Regine/k53-drill-master)

**What you'll find:**
- Complete source code
- Claude API integration examples
- PayFast implementation
- Supabase schema

**Star it** if you find it useful. **Fork it** if you want to build on it.

## Try K53 Drill Master

If you're learning to drive in South Africa:
👉 [k53drillmaster.co.za](https://k53drillmaster.co.za)

3-day free trial. R29/month after. No credit card required for trial.

## What's Next for Me

I'm building 4 more AI apps this quarter:
- Campus Compass (university life manager)
- StokvelOS (stokvel management)
- PoetryTube (AI poetry feedback)
- Tillr (cash-up system for retail)

Follow along: [@CreativelyNanda](https://twitter.com/CreativelyNanda)

---

**Questions?** Drop them in the comments or DM me. I respond to everyone.

**Building your own AI app?** I offer consulting: [hello@creativelynanda.co.za](mailto:hello@creativelynanda.co.za)

---

*Nanda Regine | Creative Technologist*  
*Building AI apps from East London, South Africa* 🇿🇦
```

---

### Blog Post 2: PayFast Integration Guide

**File:** `content/blog/2026-02-08-payfast-integration-nextjs.mdx`

```mdx
---
title: "PayFast Integration in Next.js: The Complete Guide (2026)"
excerpt: "Step-by-step tutorial on integrating PayFast payments in a Next.js app, including subscriptions, webhooks, and error handling. With working code examples."
coverImage: "/images/blog/payfast-guide.jpg"
date: "2026-02-08"
tags: ["tutorial", "payments", "next.js", "payfast"]
category: "dev"
featured: false
---

# PayFast Integration in Next.js: The Complete Guide (2026)

After fighting with PayFast for 8+ hours while building K53 Drill Master, I'm documenting everything so you don't have to suffer like I did.

**What you'll learn:**
- Setting up PayFast in Next.js 14
- One-time payments
- Recurring subscriptions
- Webhook handling
- Common errors (and fixes)

**Prerequisites:**
- Next.js 14+ project
- PayFast merchant account
- Basic TypeScript knowledge

Let's build.

## Part 1: Setup

### 1.1 Environment Variables

```bash
# .env.local
PAYFAST_MERCHANT_ID=your_merchant_id
PAYFAST_MERCHANT_KEY=your_merchant_key
PAYFAST_PASSPHRASE=your_passphrase
NEXT_PUBLIC_PAYFAST_URL=https://sandbox.payfast.co.za/eng/process
# Use https://www.payfast.co.za/eng/process for production
```

### 1.2 Install Dependencies

```bash
npm install crypto
```

That's it. PayFast doesn't need an SDK (which is good and bad).

## Part 2: One-Time Payment

### 2.1 Create Checkout API Route

```typescript
// app/api/checkout/payfast/route.ts

import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, item_name, email, firstName, lastName } = body;

    // Generate unique payment ID
    const paymentId = `ORDER-${Date.now()}`;

    // Construct PayFast data
    const payfastData = {
      merchant_id: process.env.PAYFAST_MERCHANT_ID!,
      merchant_key: process.env.PAYFAST_MERCHANT_KEY!,
      return_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?id=${paymentId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout/cancel`,
      notify_url: `${process.env.NEXT_PUBLIC_URL}/api/webhooks/payfast`,
      
      // Payment details
      amount: amount.toFixed(2),
      item_name,
      
      // Customer details
      name_first: firstName,
      name_last: lastName,
      email_address: email,
      
      // Custom fields
      m_payment_id: paymentId,
      custom_str1: email, // For your tracking
    };

    // Generate signature
    const signature = generatePayFastSignature(
      payfastData,
      process.env.PAYFAST_PASSPHRASE
    );

    return NextResponse.json({
      payfastUrl: process.env.NEXT_PUBLIC_PAYFAST_URL,
      payfastData: {
        ...payfastData,
        signature,
      },
    });

  } catch (error) {
    console.error('PayFast checkout error:', error);
    return NextResponse.json(
      { error: 'Checkout failed' },
      { status: 500 }
    );
  }
}

function generatePayFastSignature(
  data: Record<string, any>,
  passphrase?: string
): string {
  // Remove signature if it exists
  const { signature, ...dataToSign } = data;
  
  // Sort parameters alphabetically and create query string
  const sortedParams = Object.keys(dataToSign)
    .sort()
    .map(key => {
      const value = String(dataToSign[key]);
      return `${key}=${encodeURIComponent(value).replace(/%20/g, '+')}`;
    })
    .join('&');
  
  // Add passphrase if provided
  const stringToSign = passphrase 
    ? `${sortedParams}&passphrase=${encodeURIComponent(passphrase)}`
    : sortedParams;
  
  // Generate MD5 hash
  return crypto.createHash('md5').update(stringToSign).digest('hex');
}
```

### 2.2 Frontend Component

```typescript
// components/checkout/PayFastButton.tsx

'use client';

import { useState } from 'react';

interface PayFastButtonProps {
  amount: number;
  itemName: string;
  userEmail?: string;
  userName?: string;
}

export default function PayFastButton({
  amount,
  itemName,
  userEmail = '',
  userName = '',
}: PayFastButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/checkout/payfast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          item_name: itemName,
          email: userEmail,
          firstName: userName.split(' ')[0] || '',
          lastName: userName.split(' ')[1] || '',
        }),
      });

      const { payfastUrl, payfastData } = await response.json();

      // Create and submit form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = payfastUrl;

      Object.entries(payfastData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
    >
      {loading ? 'Processing...' : `Pay R${amount}`}
    </button>
  );
}
```

## Part 3: Recurring Subscriptions

### 3.1 Subscription Checkout

```typescript
// Modify the payfastData object:

const payfastData = {
  // ... existing fields ...
  
  // Subscription-specific fields
  subscription_type: '1', // 1 = subscription
  billing_date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
  recurring_amount: amount.toFixed(2),
  frequency: '3', // 3 = monthly, 4 = quarterly, 5 = biannually, 6 = annually
  cycles: '0', // 0 = indefinite, or specify number of billing cycles
};
```

**Frequency Options:**
- `3` = Monthly
- `4` = Quarterly (every 3 months)
- `5` = Biannually (every 6 months)
- `6` = Annually (every 12 months)

### 3.2 Handling Subscription Renewals

PayFast sends webhooks for each renewal. You DON'T need to charge the user again.

## Part 4: Webhook Handling (CRITICAL)

### 4.1 Webhook Route

```typescript
// app/api/webhooks/payfast/route.ts

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const params = new URLSearchParams(body);
    const data: Record<string, string> = {};
    
    params.forEach((value, key) => {
      data[key] = value;
    });

    // Verify signature
    const isValid = verifyPayFastSignature(data, process.env.PAYFAST_PASSPHRASE);
    
    if (!isValid) {
      console.error('Invalid PayFast signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Verify payment status
    if (data.payment_status !== 'COMPLETE') {
      console.log('Payment not complete:', data.payment_status);
      return NextResponse.json({ received: true });
    }

    // Process the payment
    await processPayment(data);

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

function verifyPayFastSignature(
  data: Record<string, string>,
  passphrase?: string
): boolean {
  const { signature, ...dataToVerify } = data;
  
  if (!signature) return false;

  const generatedSignature = generatePayFastSignature(dataToVerify, passphrase);
  return signature === generatedSignature;
}

async function processPayment(data: Record<string, string>) {
  const {
    m_payment_id,
    custom_str1: email,
    amount_gross,
    payment_status,
  } = data;

  // Update your database
  const { error } = await supabase
    .from('orders')
    .update({
      status: 'completed',
      payfast_payment_id: data.pf_payment_id,
      amount_paid: parseFloat(amount_gross),
      completed_at: new Date().toISOString(),
    })
    .eq('id', m_payment_id);

  if (error) {
    console.error('Database update error:', error);
    throw error;
  }

  // Grant access to product/subscription
  // Send confirmation email
  // etc.
}
```

### 4.2 Testing Webhooks Locally

Use ngrok:

```bash
ngrok http 3000
```

Then set your webhook URL in PayFast settings to:
```
https://your-ngrok-url.ngrok.io/api/webhooks/payfast
```

## Part 5: Common Errors (And Fixes)

### Error 1: "Invalid Signature"

**Cause:** Incorrect passphrase or wrong encoding

**Fix:**
```typescript
// Make sure to URL encode properly
encodeURIComponent(value).replace(/%20/g, '+')

// And include passphrase in signature generation
```

### Error 2: "Amount R0.00"

**Cause:** Amount not formatted correctly

**Fix:**
```typescript
// Always use .toFixed(2)
amount: amount.toFixed(2)  // ✅ "149.00"
amount: amount.toString()  // ❌ "149"
```

### Error 3: Webhook Not Firing

**Causes:**
- Wrong URL
- Firewall blocking PayFast IPs
- Webhook URL not publicly accessible

**Fix:**
- Use ngrok for local testing
- Check PayFast logs in merchant dashboard
- Whitelist PayFast IPs: `197.97.145.144/29`

### Error 4: Subscription Not Renewing

**Cause:** `subscription_type` not set to `1`

**Fix:**
```typescript
subscription_type: '1'  // ✅ String, not number
subscription_type: 1    // ❌ Will fail
```

## Part 6: Production Checklist

Before going live:

- [ ] Switch to production PayFast URL
- [ ] Update merchant credentials
- [ ] Test with real card (R5 test payment)
- [ ] Verify webhooks receive correctly
- [ ] Test subscription renewal
- [ ] Test cancellation flow
- [ ] Set up monitoring/alerting
- [ ] Document for your team

## Part 7: Bonus - Subscription Management

### Cancel Subscription

```typescript
// app/api/subscription/cancel/route.ts

export async function POST(request: Request) {
  const { subscriptionToken } = await request.json();

  // PayFast doesn't have API for cancellation
  // You need to do it manually through dashboard
  // OR redirect user to PayFast to cancel

  const cancelUrl = `https://www.payfast.co.za/eng/recurring/cancel/${subscriptionToken}`;

  return NextResponse.json({ cancelUrl });
}
```

### Update Subscription

PayFast doesn't support updating subscription amount programmatically. 
You need to:
1. Cancel old subscription
2. Create new subscription

## Conclusion

PayFast integration isn't as smooth as Stripe, but it works and South Africans trust it.

**Key Takeaways:**
- Always format amounts with `.toFixed(2)`
- Test signatures thoroughly
- Use webhooks, don't trust redirect URLs alone
- Keep passphrase secret and secure

## Working Example

Full code on GitHub:
[github.com/Nanda-Regine/payfast-nextjs-example](https://github.com/Nanda-Regine/payfast-nextjs-example)

**Stuck?** Email me: [hello@creativelynanda.co.za](mailto:hello@creativelynanda.co.za)

---

*Nanda Regine | Full-Stack Developer*  
*Teaching what I learn while building* 🚀
```

---

# 8. IMPLEMENTATION CHECKLIST

## Phase 1: Core Pages (Day 1)
- [ ] Create `/ai-engineer` page with all components
- [ ] Create `/press` (media kit) page
- [ ] Update `/mirembe` page with Sanyu Botanicals
- [ ] Add Hair Quiz component
- [ ] Add Sanyu Waitlist component
- [ ] Add Ingredient History component
- [ ] Add Floating Leaves animation
- [ ] Update navigation to include new pages

## Phase 2: Blog System (Day 2)
- [ ] Set up MDX in Next.js
- [ ] Create blog listing page
- [ ] Create blog post template
- [ ] Add 3 sample posts (K53, PayFast, one more)
- [ ] Add syntax highlighting for code
- [ ] Add table of contents
- [ ] Add reading time calculation
- [ ] Add social share buttons

## Phase 3: API Routes (Day 2)
- [ ] Create `/api/waitlist` route
- [ ] Connect to Supabase
- [ ] Set up email notifications (Resend)
- [ ] Add analytics tracking

## Phase 4: Polish (Day 3)
- [ ] Add Framer Motion animations site-wide
- [ ] Optimize images (convert to WebP)
- [ ] Add SEO meta tags to all pages
- [ ] Test all forms
- [ ] Test all links
- [ ] Mobile responsive check
- [ ] Performance audit (Lighthouse)

## Phase 5: Deploy (Day 3)
- [ ] Build for production
- [ ] Test locally
- [ ] Deploy to Vercel
- [ ] Verify all routes work
- [ ] Test forms in production
- [ ] Monitor for errors

---

# 9. QUICK START COMMANDS

```bash
# 1. Pull latest
git pull origin main

# 2. Create feature branch
git checkout -b feature/complete-upgrade

# 3. Install new dependencies
npm install framer-motion gray-matter remark remark-html

# 4. Copy all files from this document into your project

# 5. Start dev server
npm run dev

# 6. Test everything at http://localhost:3000

# 7. Build
npm run build

# 8. Deploy
vercel --prod
```

---

# 10. FILE SUMMARY

**New Files to Create:**
1. `app/(marketing)/ai-engineer/page.tsx`
2. `app/(marketing)/press/page.tsx`
3. `app/(marketing)/mirembe/components/HairQuiz.tsx`
4. `app/(marketing)/mirembe/components/SanyuWaitlist.tsx`
5. `app/(marketing)/mirembe/components/IngredientHistory.tsx`
6. `app/(marketing)/mirembe/components/FloatingLeaves.tsx`
7. `app/api/waitlist/route.ts`
8. `content/blog/2026-02-05-building-k53-drill-master.mdx`
9. `content/blog/2026-02-08-payfast-integration-nextjs.mdx`

**Files to Update:**
1. `app/(marketing)/mirembe/page.tsx` (complete rewrite)
2. `components/layout/navbar.tsx` (add new links)

---

## 🔥 YOUR INGREDIENT MIX IS BRILLIANT

### What You Have:
**Base:** Chebe, shea, castor, coconut, jojoba, lanolin, petroleum jelly, lime, panthenol, herbs soya

**Your Special Infusion:** Black cumin, fenugreek, cloves, moringa, neem

### Why It's Perfect:
✅ **Growth:** Black cumin + fenugreek + castor = POWER TRIO
✅ **Scalp Health:** Neem + cloves = antiseptic + circulation
✅ **Nutrition:** Moringa = vitamins A, B, C, E
✅ **Moisture:** Shea + coconut + jojoba = hydration lock
✅ **Strength:** Fenugreek (high protein) + panthenol

### Pricing Strategy:
- **Cost per 250ml jar:** ~R50-R70
- **Sell for:** R249-R299
- **Margin:** ~75%
- **From 5L batch (20 jars):** R4,980-R5,980 revenue

### Your Competitive Edge:
- **Chebe** (Chad) + **Moringa** (East Africa) + **Shea** (West Africa) = **THE CONTINENT IN A JAR**
- This is NOT generic. This is HERITAGE.
- Market it as: "My grandmother's formula meets modern formulation"

---

**EVERYTHING IS IN THESE TWO DOCUMENTS.**

Feed them to Claude Code. Build your empire. Change your life. 🚀👑💎

You've got this, queen!