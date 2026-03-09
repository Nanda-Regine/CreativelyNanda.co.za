'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Download, Mail, Award, Mic, Copy, Check, ExternalLink, BookOpen, Code, Sparkles, Users, Zap, Globe } from 'lucide-react';

const achievements = [
  {
    icon: Sparkles,
    text: 'Master Gen AI Professional Certified — Generative AI, Prompt Engineering & AI Product Development',
    color: 'from-cherry to-pink-600',
    bg: 'bg-cherry/8',
    accent: '#C1292E',
    number: '01',
  },
  {
    icon: BookOpen,
    text: 'Published Poet — "Inside Her Roses" (2021), featured on Showmax & Gqeberha: The Empire · 5 live poetry performances',
    color: 'from-purple-500 to-violet-600',
    bg: 'bg-purple-500/8',
    accent: '#7C3AED',
    number: '02',
  },
  {
    icon: Award,
    text: 'Advanced Diploma in Business Management (NQF 7) — 15 Academic Distinctions, Nelson Mandela University',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-500/8',
    accent: '#F59E0B',
    number: '03',
  },
  {
    icon: Code,
    text: '9 Live Applications Built — 300+ Users Served · Graphic Design & Digital Marketing Certified',
    color: 'from-electric-cyan to-blue-500',
    bg: 'bg-blue-500/8',
    accent: '#00D4FF',
    number: '04',
  },
  {
    icon: Globe,
    text: 'Founder of Mirembe Muse (Pty) Ltd — Notion templates, AI services & Sanyu Botanicals wellness brand',
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-500/8',
    accent: '#10B981',
    number: '05',
  },
  {
    icon: Zap,
    text: '250+ GitHub Commits in 6 months — Solo Developer · SheCodes Certified Full-Stack Developer',
    color: 'from-gold to-amber-400',
    bg: 'bg-yellow-500/8',
    accent: '#B8860B',
    number: '06',
  },
];

const mediaMentions = [
  {
    outlet: 'Showmax / Gqeberha: The Empire',
    topic: 'Inside Her Roses — Poetry Book Launch & Feature',
    type: 'Television',
    color: '#C1292E',
    bg: 'bg-cherry/10',
    border: 'border-cherry/30',
    emoji: '📺',
  },
  {
    outlet: 'Madiba FM',
    topic: 'Published Poet & Entrepreneur Feature',
    type: 'Radio',
    color: '#7C3AED',
    bg: 'bg-purple-500/10',
    border: 'border-purple-400/30',
    emoji: '📻',
  },
  {
    outlet: 'TRU FM',
    topic: 'Creative Technologist & Poetry Interview',
    type: 'Radio',
    color: '#00D4FF',
    bg: 'bg-blue-500/10',
    border: 'border-blue-400/30',
    emoji: '🎙️',
  },
  {
    outlet: 'Live Poetry Performances',
    topic: '5 spoken word performances — East London & Port Elizabeth',
    type: 'Stage',
    color: '#10B981',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-400/30',
    emoji: '🎤',
  },
];

const speakingTopics = [
  {
    title: 'Building AI-Powered Products in Africa',
    description: 'How I built 5 AI applications with limited resources and turned them into revenue-generating products serving African communities.',
    audiences: ['Tech conferences', 'Startup events', 'Developer meetups'],
    color: '#C1292E',
  },
  {
    title: 'From Zero to Revenue: Digital Entrepreneurship',
    description: 'The real, unfiltered story of starting a digital business from scratch in South Africa as a self-taught developer.',
    audiences: ['Business schools', 'Entrepreneurship programs', 'Youth conferences'],
    color: '#7C3AED',
  },
  {
    title: 'Women in Tech: Breaking Barriers',
    description: 'Navigating the tech industry as a Black African woman — and building world-class technology despite systemic barriers.',
    audiences: ["Women in STEM", 'University panels', 'Corporate diversity events'],
    color: '#F59E0B',
  },
  {
    title: 'Poetry to Python: The Creative Technologist Journey',
    description: 'How combining creative and technical mastery creates unique career and business opportunities that neither discipline offers alone.',
    audiences: ['Creative conferences', 'Design + Tech events', 'Arts & culture'],
    color: '#10B981',
  },
  {
    title: 'Ubuntu in Code: African Philosophy Meets Technology',
    description: 'Building technology that amplifies humanity instead of replacing it — lessons from African philosophy for the AI era.',
    audiences: ['Tech ethics panels', 'Philosophy departments', 'Innovation forums'],
    color: '#00D4FF',
  },
];

const bios = {
  short: `Nandawula Regine Kabali-Kagwa is a Creative Technologist, Published Poet, and Founder of Mirembe Muse. She builds AI-powered applications serving African communities while honoring her Ugandan-Xhosa heritage. Master Gen AI Professional certified, she's redefining what it means to code with culture.`,

  medium: `Nandawula Regine Kabali-Kagwa is a South African Creative Technologist building at the intersection of code, culture, and creativity. Born to Ugandan and Xhosa-Sotho heritage, she carries five clan lineages that inform her Ubuntu-centered approach to technology.

A Master Gen AI Professional with an Advanced Diploma in Business Management (NQF 7, 15 distinctions) from Nelson Mandela University, Nanda has built 9 live applications serving 300+ users, including AI-powered tools and Notion productivity systems. Her published poetry collection "Inside Her Roses" was featured on Showmax's Gqeberha: The Empire — she has performed at 5 live spoken word events across the Eastern Cape.

As Founder of Mirembe Muse, she offers AI consulting, digital product creation, and is building Sanyu Botanicals — an African botanical wellness brand — for businesses across Africa.`,

  long: `Nandawula Regine Kabali-Kagwa doesn't fit in boxes — and that's exactly the point.

Born to a Ugandan father and Xhosa-Sotho mother, Nanda carries the wisdom of five ancestral clans: Nsenene, Hlubi, Msimango, Thabizolo, and Tshawe. Each lineage gifted her a principle — lead through people, adapt and endure, heal at the root, build unshakeable foundations, share what you create. These aren't abstract values; they're the operating system behind every line of code she writes.

After earning an Advanced Diploma in Business Management (NQF 7) from Nelson Mandela University with 15 academic distinctions, Nanda taught herself full-stack development from her home in East London. In six months, she shipped 9 live applications, accumulated 250+ GitHub commits, and built a digital products business generating monthly revenue — all while performing her poetry at 5 live events across the Eastern Cape.

Certified in Master Gen AI Professional, Prompt Engineering, Graphic Design, and Digital Marketing, she specialises in building AI-powered solutions for African SMEs, from chatbots and automation systems to custom AI agents. Her flagship apps include K53 Drill Master (50+ paying subscribers), Campus Compass (200+ students), and StokvelOS — proving that world-class technology can, and should, be built from the African continent.

Her poetry collection "Inside Her Roses" was featured on Showmax's hit series Gqeberha: The Empire, and she has been interviewed on Madiba FM and TRU FM. Through her company Mirembe Muse (Pty) Ltd, she is building Sanyu Botanicals, an African botanical wellness brand honouring ancestral hair care wisdom with modern formulation, alongside a portfolio of Notion templates, AI tools, and educational resources designed specifically for African entrepreneurs and students.

Nanda represents a new generation of African creators: technically excellent, culturally rooted, commercially viable, and unapologetically multidimensional. She codes. She writes poetry. She builds businesses. She refuses to choose.`,
};

function CopyBio({ text, label, accent }: { text: string; label: string; accent: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-6 rounded-2xl overflow-hidden border border-navy/10 shadow-sm">
      <div className="flex items-center justify-between px-5 py-3 border-b border-navy/8" style={{ backgroundColor: `${accent}10` }}>
        <h3 className="font-display font-bold text-navy text-sm">{label}</h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all"
          style={{ borderColor: `${accent}40`, color: accent }}
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="p-5 bg-white">
        <p className="text-navy/75 leading-relaxed whitespace-pre-line text-sm">{text}</p>
      </div>
    </div>
  );
}

export default function PressPage() {
  return (
    <main className="min-h-screen bg-[#0A1128] overflow-x-hidden">

      {/* ===== HERO — textured, not gradient ===== */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
          }}
        />
        {/* Halftone dot pattern */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #D4A574 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Asymmetric color blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #C1292E 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
        />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, #D4A574 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
        />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
        />

        {/* Asymmetric decorative shapes */}
        <div className="absolute top-16 left-8 w-24 h-24 border border-[#D4A574]/20 rotate-12"
          style={{ borderRadius: '30% 70% 60% 40% / 40% 50% 50% 60%' }}
        />
        <div className="absolute bottom-20 right-12 w-16 h-16 bg-cherry/15 -rotate-6"
          style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
        />
        <div className="absolute top-1/3 right-8 w-8 h-32 bg-[#D4A574]/10 rotate-45 rounded-full" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cherry/15 border border-cherry/25 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-cherry" />
            <span className="text-sm text-beige/80 font-medium tracking-wide">Official Media Resources</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-display font-bold text-beige mb-6 leading-[0.9]">
            Press <span className="text-transparent bg-clip-text bg-gradient-to-r from-cherry via-[#D4A574] to-cherry">Kit</span>
          </h1>

          <p className="text-xl text-beige/65 max-w-3xl mx-auto leading-relaxed mb-10">
            Official media resources for{' '}
            <strong className="text-beige">Nandawula Regine Kabali-Kagwa</strong> —
            Creative Technologist, AI Engineer, Published Poet, and African Entrepreneur.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {[
              { value: '9', label: 'Live Apps' },
              { value: '300+', label: 'Users Served' },
              { value: '5', label: 'Performances' },
              { value: '15', label: 'Distinctions' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl font-bold text-[#D4A574]">{s.value}</div>
                <div className="text-beige/50 text-xs tracking-widest uppercase">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 bg-cherry text-white rounded-full hover:bg-cherry-dark transition-all flex items-center gap-2 font-semibold text-sm"
            >
              <Mail className="w-4 h-4" />
              Book for Speaking
            </Link>
            <a
              href="mailto:hello@creativelynanda.co.za"
              className="px-6 py-3 border border-beige/25 text-beige rounded-full hover:bg-beige/10 transition-all flex items-center gap-2 font-medium text-sm"
            >
              hello@creativelynanda.co.za
            </a>
            <a
              href="/assets/work/Nanda-cv.pdf"
              download
              className="px-6 py-3 border border-[#D4A574]/40 text-[#D4A574] rounded-full hover:bg-[#D4A574]/10 transition-all flex items-center gap-2 font-medium text-sm"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </div>
        </div>
      </section>

      {/* ===== AT A GLANCE — colorful achievement cards ===== */}
      <section className="py-20 px-6 bg-beige relative overflow-hidden">
        {/* Asymmetric top cut */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-[#0A1128]"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 40%)' }}
        />
        <div className="max-w-7xl mx-auto relative z-10 mt-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-px bg-navy" />
            <span className="text-navy text-xs font-bold tracking-[0.3em] uppercase">At a Glance</span>
            <div className="flex-1 h-px bg-navy/15" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {achievements.map((item, i) => (
              <div key={i} className="group relative overflow-hidden bg-white rounded-3xl border border-navy/8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Colored top bar */}
                <div className={`h-1.5 bg-gradient-to-r ${item.color} w-full`} />

                {/* Large watermark number */}
                <span className="absolute top-2 right-4 font-display text-6xl font-bold leading-none select-none pointer-events-none text-navy/[0.05]">
                  {item.number}
                </span>

                <div className="p-6 relative z-10">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                    style={{ backgroundColor: `${item.accent}15` }}>
                    <item.icon className="w-5 h-5" style={{ color: item.accent }} />
                  </div>
                  <p className="text-navy/80 text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OFFICIAL BIOS ===== */}
      <section className="py-20 px-6 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1a0a0a 0%, #0A1128 50%, #0a1a0a 100%)',
        }}
      >
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #D4A574 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Asymmetric shape */}
        <div className="absolute -right-20 top-1/4 w-96 h-96 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-px bg-[#D4A574]" />
            <span className="text-[#D4A574] text-xs font-bold tracking-[0.3em] uppercase">Official Bios</span>
          </div>
          <h2 className="text-4xl font-display font-bold text-beige mb-3">
            Ready-to-Use <span className="text-cherry">Media Copy</span>
          </h2>
          <p className="text-beige/50 mb-10 text-sm">Copy with one click. Use freely for programs, websites, and features.</p>

          <CopyBio label="Short Bio — 50 words" text={bios.short} accent="#C1292E" />
          <CopyBio label="Medium Bio — 150 words" text={bios.medium} accent="#7C3AED" />
          <CopyBio label="Full Bio — 300 words" text={bios.long} accent="#D4A574" />
        </div>
      </section>

      {/* ===== FAST FACTS ===== */}
      <section className="py-20 px-6 bg-parchment relative overflow-hidden">
        {/* Asymmetric organic shape top */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-[#0A1128]"
          style={{ clipPath: 'ellipse(55% 100% at 25% 0%)' }}
        />
        <div className="max-w-7xl mx-auto relative z-10 mt-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-px bg-navy" />
            <span className="text-navy text-xs font-bold tracking-[0.3em] uppercase">Fast Facts</span>
            <div className="flex-1 h-px bg-navy/15" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'Full Name', value: 'Nandawula Regine Kabali-Kagwa', accent: '#C1292E' },
              { label: 'Based In', value: 'East London, South Africa', accent: '#10B981' },
              { label: 'Heritage', value: 'Ugandan (Kabali-Kagwa clan) + Xhosa-Sotho (Hlubi, Msimango, Tshawe, Thabizolo)', accent: '#7C3AED' },
              { label: 'Education', value: 'Advanced Diploma in Business Management (NQF 7) — Nelson Mandela University (15 Distinctions)', accent: '#F59E0B' },
              { label: 'Certifications', value: 'Master Gen AI Professional · Prompt Engineering · Graphic Design · Digital Marketing · SheCodes Full-Stack', accent: '#00D4FF' },
              { label: 'Applications Built', value: '9 live apps, 300+ users, R15K+ revenue generated', accent: '#C1292E' },
              { label: 'Published Work', value: '"Inside Her Roses" poetry collection — featured on Showmax / Gqeberha: The Empire · 5 live performances', accent: '#7C3AED' },
              { label: 'Company', value: 'Mirembe Muse (Pty) Ltd', accent: '#10B981' },
              { label: 'Tech Stack', value: 'Next.js, TypeScript, Supabase, OpenAI, Claude API, Mapbox, PayFast', accent: '#00D4FF' },
              { label: 'Languages', value: 'English, isiXhosa (conversational), Luganda (heritage)', accent: '#D4A574' },
            ].map((fact) => (
              <div key={fact.label} className="flex gap-0 bg-white rounded-2xl overflow-hidden border border-navy/8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-1.5 flex-shrink-0" style={{ backgroundColor: fact.accent }} />
                <div className="flex gap-4 p-5 flex-1">
                  <div className="min-w-28">
                    <p className="text-[10px] font-bold tracking-widest uppercase mt-0.5" style={{ color: fact.accent }}>{fact.label}</p>
                  </div>
                  <p className="text-navy/80 text-sm leading-relaxed">{fact.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MEDIA FEATURES ===== */}
      <section className="py-20 px-6 bg-[#0A1128] relative overflow-hidden">
        {/* Halftone pattern */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #C1292E 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Asymmetric blob */}
        <div className="absolute bottom-0 right-0 w-80 h-80 opacity-10"
          style={{
            background: 'radial-gradient(circle, #C1292E 0%, transparent 70%)',
            transform: 'translate(30%, 30%)',
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-px bg-cherry" />
            <span className="text-cherry text-xs font-bold tracking-[0.3em] uppercase">Media Features</span>
            <div className="flex-1 h-px bg-beige/10" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {mediaMentions.map((mention, i) => (
              <div key={i}
                className={`group relative rounded-3xl overflow-hidden p-6 border ${mention.border} ${mention.bg} hover:scale-[1.02] transition-all duration-300`}
              >
                {/* Asymmetric shape watermark */}
                <div className="absolute -right-6 -bottom-6 text-6xl opacity-20 select-none">
                  {mention.emoji}
                </div>
                <span className="text-xs font-bold tracking-widest uppercase mb-3 block" style={{ color: mention.color }}>
                  {mention.type}
                </span>
                <h3 className="font-display font-bold text-beige text-xl mb-2">{mention.outlet}</h3>
                <p className="text-beige/60 text-sm">{mention.topic}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPEAKING TOPICS ===== */}
      <section className="py-20 px-6 bg-white relative overflow-hidden">
        {/* Asymmetric top cut */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-[#0A1128]"
          style={{ clipPath: 'polygon(0 0, 60% 0, 45% 100%, 0 100%)' }}
        />
        <div className="max-w-7xl mx-auto relative z-10 mt-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-navy" />
            <span className="text-navy text-xs font-bold tracking-[0.3em] uppercase">Speaking Topics</span>
            <div className="flex-1 h-px bg-navy/15" />
          </div>
          <p className="text-navy/50 text-sm mb-12 ml-16">
            Available for conferences, panels, podcasts, workshops, and corporate events.
          </p>

          <div className="space-y-4">
            {speakingTopics.map((topic, i) => (
              <div key={i}
                className="group flex gap-0 rounded-2xl overflow-hidden border border-navy/10 hover:border-navy/20 hover:shadow-md transition-all bg-white"
              >
                {/* Left color stripe */}
                <div className="w-1.5 flex-shrink-0 transition-all duration-300" style={{ backgroundColor: topic.color }} />
                <div className="flex flex-col md:flex-row md:items-center gap-4 p-6 flex-1">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs font-bold" style={{ color: topic.color }}>0{i + 1}</span>
                      <h3 className="font-display font-bold text-navy text-lg group-hover:text-cherry transition-colors">{topic.title}</h3>
                    </div>
                    <p className="text-navy/60 text-sm leading-relaxed">{topic.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 md:max-w-[220px] md:flex-shrink-0">
                    {topic.audiences.map((a) => (
                      <span key={a} className="px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: topic.color }}>
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== KEY LINKS ===== */}
      <section className="py-20 px-6 bg-parchment relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-px bg-navy" />
            <span className="text-navy text-xs font-bold tracking-[0.3em] uppercase">Key Links</span>
            <div className="flex-1 h-px bg-navy/15" />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: 'Portfolio', href: '/', desc: 'CreativelyNanda.co.za', color: '#C1292E' },
              { label: 'AI Engineer', href: '/ai-engineer', desc: 'Services & AI projects', color: '#00D4FF' },
              { label: 'Projects', href: '/projects', desc: '9 live applications', color: '#7C3AED' },
              { label: 'Poetry', href: '/poetry', desc: '"Inside Her Roses" collection', color: '#D4A574' },
              { label: 'Shop', href: '/products', desc: 'Mirembe Muse Notion templates', color: '#10B981' },
              { label: 'GitHub', href: 'https://github.com/Nanda-Regine', desc: '250+ commits', color: '#F59E0B' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : '_self'}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-navy/10 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: link.color }} />
                  <div>
                    <p className="font-semibold text-navy text-sm group-hover:text-cherry transition-colors">{link.label}</p>
                    <p className="text-xs text-navy/45">{link.desc}</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-navy/25 group-hover:text-cherry transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 px-6 relative overflow-hidden bg-[#0A1128]">
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
          }}
        />
        {/* Color orbs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #C1292E 0%, transparent 70%)' }}
        />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, #D4A574 0%, transparent 70%)' }}
        />
        {/* Asymmetric border shape */}
        <div className="absolute left-8 top-12 w-32 h-32 border border-[#D4A574]/15 rotate-12"
          style={{ borderRadius: '50% 30% 60% 40% / 40% 60% 30% 70%' }}
        />
        <div className="absolute right-12 bottom-12 w-20 h-20 border-2 border-cherry/20 -rotate-6"
          style={{ borderRadius: '30% 60% 40% 70% / 60% 30% 70% 40%' }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-beige mb-4">
            Let&apos;s Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-cherry to-[#D4A574]">Together</span>
          </h2>
          <p className="text-beige/60 mb-10 text-lg max-w-xl mx-auto">
            For press inquiries, speaking invitations, interviews, or collaborations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cherry text-white rounded-full font-semibold hover:bg-cherry-dark transition-all duration-300 shadow-lg"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </Link>
            <a
              href="mailto:hello@creativelynanda.co.za"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#D4A574]/40 text-[#D4A574] rounded-full font-semibold hover:bg-[#D4A574]/10 transition-all duration-300"
            >
              hello@creativelynanda.co.za
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
