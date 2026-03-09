'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Download, Mail, Award, Mic, Copy, Check, ExternalLink, BookOpen, Code, Sparkles, Users } from 'lucide-react';

// Note: Copy buttons require client component — metadata exported from layout.tsx

const achievements = [
  { icon: Award, text: 'Master Gen AI Professional Certified' },
  { icon: BookOpen, text: 'Published Poet — "Inside Her Roses" (2024), SABC National TV & Radio' },
  { icon: Award, text: 'BCom Business Management — 15 Academic Distinctions, Nelson Mandela University' },
  { icon: Code, text: '9 Live Applications Built — 300+ Users Served' },
  { icon: Sparkles, text: 'Founder of Mirembe Muse (Pty) Ltd & Sanyu Botanicals (launching 2026)' },
  { icon: Users, text: '250+ GitHub Commits in 6 months — Solo Developer' },
];

const mediaMentions = [
  { outlet: 'SABC National TV', topic: 'Inside Her Roses — Poetry Book Launch', type: 'Television' },
  { outlet: 'SABC Radio', topic: 'Published Poet Feature', type: 'Radio' },
];

const speakingTopics = [
  {
    title: 'Building AI-Powered Products in Africa',
    description: 'How I built 5 AI applications with limited resources and turned them into revenue-generating products serving African communities.',
    audiences: ['Tech conferences', 'Startup events', 'Developer meetups'],
  },
  {
    title: 'From Zero to Revenue: Digital Entrepreneurship',
    description: 'The real, unfiltered story of starting a digital business from scratch in South Africa as a self-taught developer.',
    audiences: ['Business schools', 'Entrepreneurship programs', 'Youth conferences'],
  },
  {
    title: 'Women in Tech: Breaking Barriers',
    description: 'Navigating the tech industry as a Black African woman — and building world-class technology despite systemic barriers.',
    audiences: ["Women in STEM", 'University panels', 'Corporate diversity events'],
  },
  {
    title: 'Poetry to Python: The Creative Technologist Journey',
    description: 'How combining creative and technical mastery creates unique career and business opportunities that neither discipline offers alone.',
    audiences: ['Creative conferences', 'Design + Tech events', 'Arts & culture'],
  },
  {
    title: 'Ubuntu in Code: African Philosophy Meets Technology',
    description: 'Building technology that amplifies humanity instead of replacing it — lessons from African philosophy for the AI era.',
    audiences: ['Tech ethics panels', 'Philosophy departments', 'Innovation forums'],
  },
];

const bios = {
  short: `Nandawula Regine Kabali-Kagwa is a Creative Technologist, Published Poet, and Founder of Mirembe Muse. She builds AI-powered applications serving African communities while honoring her Ugandan-Xhosa heritage. Master Gen AI Professional certified, she's redefining what it means to code with culture.`,

  medium: `Nandawula Regine Kabali-Kagwa is a South African Creative Technologist building at the intersection of code, culture, and creativity. Born to Ugandan and Xhosa-Sotho heritage, she carries five clan lineages that inform her Ubuntu-centered approach to technology.

A Master Gen AI Professional with a BCom in Business Management (15 distinctions) from Nelson Mandela University, Nanda has built 9 live applications serving 300+ users, including AI-powered tools and Notion productivity systems. Her published poetry collection "Inside Her Roses" was featured on national television and radio.

As Founder of Mirembe Muse, she's launching Sanyu Botanicals — an African botanical wellness brand — while providing AI consulting and digital product creation services to businesses across Africa.`,

  long: `Nandawula Regine Kabali-Kagwa doesn't fit in boxes — and that's exactly the point.

Born to a Ugandan father and Xhosa-Sotho mother, Nanda carries the wisdom of five ancestral clans: Nsenene, Hlubi, Msimango, Thabizolo, and Tshawe. Each lineage gifted her a principle — lead through people, adapt and endure, heal at the root, build unshakeable foundations, share what you create. These aren't abstract values; they're the operating system behind every line of code she writes.

After earning a BCom in Business Management from Nelson Mandela University with 15 academic distinctions, Nanda taught herself full-stack development from her home in East London. In six months, she shipped 9 live applications, accumulated 250+ GitHub commits, and built a digital products business generating monthly revenue — all while publishing a poetry collection that made national headlines.

As a Master Gen AI Professional, she specializes in building AI-powered solutions for African SMEs, from chatbots and automation systems to custom AI agents. Her flagship apps include K53 Drill Master (50+ paying subscribers), Campus Compass (200+ students), and StokvelOS — proving that world-class technology can, and should, be built from the African continent.

Through her company Mirembe Muse (Pty) Ltd, she's launching Sanyu Botanicals, an African botanical wellness brand that honors ancestral hair care wisdom with modern formulation. She's also building a portfolio of Notion templates, AI tools, and educational resources designed specifically for African entrepreneurs and students.

Nanda represents a new generation of African creators: technically excellent, culturally rooted, commercially viable, and unapologetically multidimensional. She codes. She writes poetry. She builds businesses. She refuses to choose.`,
};

function CopyBio({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-8 p-6 bg-parchment rounded-2xl border border-navy/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-navy text-lg">{label}</h3>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-sm text-cherry hover:text-cherry-dark transition-colors px-3 py-1.5 rounded-full border border-cherry/20 hover:border-cherry/50"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <p className="text-navy/80 leading-relaxed whitespace-pre-line text-sm">{text}</p>
    </div>
  );
}

export default function PressPage() {
  return (
    <main className="min-h-screen bg-beige">
      {/* Hero */}
      <section className="py-28 px-6 bg-gradient-to-br from-navy via-navy/95 to-cherry/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, #c21e56 0%, transparent 70%)',
          }}
        />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cherry/20 border border-cherry/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-cherry" />
            <span className="text-sm text-beige/80 font-medium">Official Media Resources</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-beige mb-6">
            Press Kit
          </h1>
          <p className="text-xl text-beige/75 max-w-3xl mx-auto leading-relaxed">
            Official media resources for <strong className="text-beige">Nandawula Regine Kabali-Kagwa</strong> —
            Creative Technologist, AI Engineer, Published Poet, and African Entrepreneur.
          </p>
        </div>
      </section>

      {/* Quick Contact Bar */}
      <section className="py-8 px-6 bg-white border-b border-navy/10 shadow-soft">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold text-navy/50 tracking-widest uppercase mb-1">Press Inquiries</p>
            <a
              href="mailto:hello@creativelynanda.co.za"
              className="text-xl font-bold text-navy hover:text-cherry transition-colors"
            >
              hello@creativelynanda.co.za
            </a>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 bg-cherry text-white rounded-full hover:bg-cherry-dark transition-all flex items-center gap-2 font-medium text-sm"
            >
              <Mail className="w-4 h-4" />
              Book for Speaking
            </Link>
            <a
              href="/assets/work/Nanda-cv.pdf"
              download
              className="px-6 py-3 border-2 border-navy text-navy rounded-full hover:bg-navy hover:text-beige transition-all flex items-center gap-2 font-medium text-sm"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </div>
        </div>
      </section>

      {/* At a Glance */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-navy mb-10">At a Glance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-navy/10 shadow-soft">
                <div className="w-10 h-10 bg-cherry/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-cherry" />
                </div>
                <p className="text-navy/80 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Bios */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-navy mb-4">Official Bios</h2>
          <p className="text-navy/60 mb-10">
            Ready-to-use bios for programs, websites, and media features. Copy with one click.
          </p>

          <CopyBio label="Short Bio (50 words)" text={bios.short} />
          <CopyBio label="Medium Bio (150 words)" text={bios.medium} />
          <CopyBio label="Full Bio (300 words)" text={bios.long} />
        </div>
      </section>

      {/* Fast Facts */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-navy mb-10">Fast Facts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { label: 'Full Name', value: 'Nandawula Regine Kabali-Kagwa' },
              { label: 'Based In', value: 'East London, South Africa' },
              { label: 'Heritage', value: 'Ugandan (Kabali-Kagwa clan) + Xhosa-Sotho (Hlubi, Msimango, Tshawe, Thabizolo)' },
              { label: 'Education', value: 'BCom Business Management — Nelson Mandela University (15 Distinctions)' },
              { label: 'Certification', value: 'Master Gen AI Professional Certified' },
              { label: 'Applications Built', value: '9 live apps, 300+ users, R15K+ revenue generated' },
              { label: 'Published Work', value: '"Inside Her Roses" poetry collection — SABC featured' },
              { label: 'Company', value: 'Mirembe Muse (Pty) Ltd' },
              { label: 'Tech Stack', value: 'Next.js, TypeScript, Supabase, OpenAI, Claude API, Mapbox, PayFast' },
              { label: 'Languages', value: 'English, isiXhosa (conversational), Luganda (heritage)' },
            ].map((fact) => (
              <div key={fact.label} className="flex gap-4 p-5 bg-parchment rounded-2xl border border-navy/10">
                <div className="min-w-32">
                  <p className="text-xs font-semibold text-cherry tracking-wide uppercase">{fact.label}</p>
                </div>
                <p className="text-navy/80 text-sm leading-relaxed">{fact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Mentions */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-navy mb-10">Media Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {mediaMentions.map((mention, i) => (
              <div key={i} className="p-6 border border-navy/10 rounded-2xl hover:border-cherry/30 transition-colors">
                <span className="text-xs font-semibold text-cherry tracking-widest uppercase mb-2 block">
                  {mention.type}
                </span>
                <h3 className="font-display font-bold text-navy text-xl mb-1">{mention.outlet}</h3>
                <p className="text-navy/60 text-sm">{mention.topic}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speaking Topics */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-navy mb-4">Speaking Topics</h2>
          <p className="text-navy/60 mb-10">
            Available for conferences, panels, podcasts, workshops, and corporate events.
          </p>
          <div className="space-y-6">
            {speakingTopics.map((topic, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-navy/10 hover:border-cherry/30 transition-all hover:shadow-soft">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-display font-bold text-navy text-xl">{topic.title}</h3>
                  <span className="text-xs font-bold text-navy/30 flex-shrink-0">0{i + 1}</span>
                </div>
                <p className="text-navy/70 mb-4 leading-relaxed text-sm">{topic.description}</p>
                <div className="flex flex-wrap gap-2">
                  {topic.audiences.map((a) => (
                    <span key={a} className="px-3 py-1 bg-cherry/10 text-cherry text-xs rounded-full font-medium">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-navy mb-10">Key Links</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: 'Portfolio', href: '/', desc: 'CreativelyNanda.co.za' },
              { label: 'AI Engineer Page', href: '/ai-engineer', desc: 'Services & AI projects' },
              { label: 'Projects', href: '/projects', desc: '9 live applications' },
              { label: 'Poetry', href: '/poetry', desc: '"Inside Her Roses" collection' },
              { label: 'Shop', href: '/products', desc: 'Mirembe Muse Notion templates' },
              { label: 'GitHub', href: 'https://github.com/Nanda-Regine', desc: '250+ commits' },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : '_self'}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center justify-between p-5 border border-navy/10 rounded-2xl hover:border-cherry/40 hover:shadow-soft transition-all"
              >
                <div>
                  <p className="font-semibold text-navy group-hover:text-cherry transition-colors">{link.label}</p>
                  <p className="text-sm text-navy/50">{link.desc}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-navy/30 group-hover:text-cherry transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-navy to-navy/90">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-display font-bold text-beige mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-beige/70 mb-8 text-lg">
            For press inquiries, speaking invitations, interviews, or collaborations.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cherry text-white rounded-full font-semibold hover:bg-cherry-dark hover:shadow-glow-cherry transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
