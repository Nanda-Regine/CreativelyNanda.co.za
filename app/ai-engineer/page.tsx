import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hire AI Engineer | Nandawula Regine Kabali-Kagwa — Claude API & Multi-Agent Systems',
  description:
    'Hire Nandawula Regine — AI Engineer specialising in Claude API agents, multi-agent systems, and production TypeScript. 7 live AI products. Remote-available from South Africa. Available for contract, fractional, and full-time engagements.',
  keywords: [
    // Hire-intent — what recruiters and tech leads type
    'hire AI engineer',
    'AI engineer for hire',
    'AI engineer remote work',
    'remote AI engineer Africa',
    'senior AI engineer',
    'freelance AI engineer',
    'contract AI engineer',
    // LLM / agent specific
    'Claude API developer',
    'Anthropic Claude engineer',
    'Claude API integration',
    'LLM engineer',
    'LLM developer for hire',
    'multi-agent AI systems',
    'multi-agent developer',
    'AI agent developer',
    'prompt engineer',
    'RAG developer',
    // Full-stack signals
    'TypeScript developer for hire',
    'Next.js developer for hire',
    'full-stack AI developer',
    'production TypeScript developer',
    'Supabase architect',
    'Supabase developer',
    // WhatsApp / Africa-specific
    'WhatsApp AI automation',
    'Meta WhatsApp Cloud API developer',
    'AI engineer South Africa',
    'African AI engineer',
    'East London South Africa developer',
    'PayFast developer South Africa',
    'business automation South Africa',
    'fractional AI officer Africa',
    // Identity
    'Nandawula Regine',
    'CreativelyNanda',
    'Mirembe Muse',
    'AI consulting Africa',
  ],
  openGraph: {
    title: 'Hire AI Engineer | Nandawula Regine — Claude API & Multi-Agent Systems',
    description:
      'AI Engineer for hire. Custom Claude agents, multi-agent systems, production TypeScript. Available for remote engagements from East London, South Africa.',
    images: [{ url: 'https://creativelynanda.co.za/og-image.png', width: 1200, height: 630 }],
    type: 'website',
    url: 'https://creativelynanda.co.za/ai-engineer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Engineer | Nandawula Regine Kabali-Kagwa',
    description: 'Building AI for Africa. Custom Claude agents, WhatsApp workflows, production TypeScript. East London, South Africa.',
    images: ['https://creativelynanda.co.za/og-image.png'],
  },
  alternates: { canonical: 'https://creativelynanda.co.za/ai-engineer' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
};

const CAPABILITIES = [
  {
    title: 'Claude API Integration',
    body: 'Custom AI agents, prompt caching, multi-agent architectures — built for production.',
  },
  {
    title: 'Supabase + RLS Architecture',
    body: 'PostgreSQL, Row Level Security, real-time subscriptions, and auth flows at scale.',
  },
  {
    title: 'WhatsApp-Native AI',
    body: 'Meta WhatsApp Cloud API integration, business messaging, automated conversation flows.',
  },
  {
    title: 'Multi-Agent Systems',
    body: 'Specialist agents, tool use, cron-triggered workflows, and agent orchestration.',
  },
  {
    title: 'PayFast + Payments',
    body: 'ZAR payment flows, webhook handling, subscription billing — live in production.',
  },
  {
    title: 'Production TypeScript',
    body: 'Strict mode, Zod validation, zero-error deployments. No shortcuts.',
  },
];

const DOSSIERS = [
  {
    title: 'AI Integration Project',
    body: 'Custom Claude/OpenAI agents embedded in your product or business workflow.',
    zar: 'From R45,000',
    usd: '~$2,432 USD',
    proven: '7 live AI products in production',
    signature: true,
  },
  {
    title: 'Fractional AI Officer',
    body: 'Monthly AI strategy, prototyping, and advisory. Embedded in your team.',
    zar: 'From R18,000/month',
    usd: '~$973 USD/mo',
    proven: null,
    signature: false,
  },
  {
    title: 'Business Automation',
    body: 'WhatsApp workflows via Meta WhatsApp Cloud API, automated reporting, debt recovery pipelines.',
    zar: 'From R8,000/month',
    usd: '~$432 USD/mo',
    proven: 'AdminOS-proven',
    signature: false,
  },
];

export default function AIEngineerPage() {
  return (
    <main className="min-h-screen">

      {/* ── HERO — dark navy + grain ─────────────────────────────────────── */}
      <section className="relative bg-[#0A1128] py-28 px-6 overflow-hidden">
        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <p className="text-[#B8860B] text-xs tracking-[0.3em] uppercase mb-6 font-sans">
              AI Engineer · East London, South Africa
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-[0.9] mb-6">
              Africa&apos;s AI Engineer.{' '}
              <span className="text-[#C1292E]">Available for select engagements.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
              Custom Claude agents. WhatsApp-native workflows. Production-grade TypeScript.
              Built for the continent.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/consulting"
                className="px-8 py-4 bg-[#C1292E] text-white rounded-full font-semibold hover:bg-[#C1292E]/90 transition-all hover:scale-105"
              >
                View consulting packages →
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border border-white/30 text-white rounded-full font-semibold hover:border-white transition-all"
              >
                Send a brief →
              </Link>
            </div>
          </div>
          <div className="hidden md:flex justify-end">
            <div className="relative w-80 h-96">
              <Image
                src="/assets/professional/nanda-coding.jpg"
                alt="Nanda — AI Engineer"
                fill
                className="object-cover"
                style={{ borderRadius: '8px 32px 8px 32px' }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITY GRID — cream ──────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[#B8860B] text-xs tracking-[0.3em] uppercase mb-4 font-sans">What I build</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0A1128]">
              Six capabilities. One engineer.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {CAPABILITIES.map((c, i) => (
              <div
                key={c.title}
                className="bg-gradient-to-r from-[#0A1128] to-[#1a2744] rounded-xl p-7 group relative overflow-hidden"
                style={{ borderRadius: '32px 12px 32px 12px' }}
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#B8860B]/10 group-hover:bg-[#C1292E]/15 transition-colors" style={{ borderRadius: '0 12px 0 100%' }} />
                <h3 className="font-display text-xl font-bold text-white mb-3">{c.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY AFRICA — dark ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0A1128]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#B8860B] text-xs tracking-[0.3em] uppercase mb-6 font-sans">Built for the continent</p>
          <p className="font-display text-3xl md:text-4xl italic text-white/90 leading-relaxed">
            I don&apos;t build for Silicon Valley and export to Africa. I build for the continent —
            in the context of load shedding, PayFast, isiXhosa, stokvels, and NSFAS.
            Every architecture decision I make has been tested against South African infrastructure realities.
          </p>
        </div>
      </section>

      {/* ── ENGAGEMENTS — cream ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#F5EFE6] via-[#FAF8F4] to-[#F0E8DC]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-[#B8860B] text-xs tracking-[0.3em] uppercase mb-4 font-sans">
              How we work together
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0A1128]">
              Three ways to engage.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {DOSSIERS.map((dossier) => (
              <div
                key={dossier.title}
                className="flex flex-col bg-white rounded-2xl p-7 shadow-sm"
                style={{
                  borderTop: `3px solid ${dossier.signature ? '#B8860B' : '#C1292E'}`,
                }}
              >
                {/* Service name */}
                <h3 className="font-display text-2xl font-bold text-[#0A1128] mb-3 leading-tight">
                  {dossier.title}
                </h3>

                <p className="text-sm leading-relaxed text-[#0A1128]/60 flex-1 mb-6">
                  {dossier.body}
                </p>

                {/* Price block */}
                <div className="border-t border-[#0A1128]/8 pt-4 mb-5">
                  <p className="font-display text-2xl font-bold text-[#0A1128] mb-0.5">
                    {dossier.zar}
                  </p>
                  <p className="text-xs text-[#0A1128]/40 font-mono">{dossier.usd}</p>
                  {dossier.proven && (
                    <p className="font-display italic text-xs text-[#B8860B]/70 mt-2">
                      Proven by {dossier.proven}
                    </p>
                  )}
                </div>

                {/* CTA */}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#C1292E] hover:gap-3 transition-all"
                >
                  Start the conversation →
                </Link>
              </div>
            ))}
          </div>

          {/* Full pricing link */}
          <div className="mt-10 text-center">
            <Link
              href="/consulting"
              className="text-[#0A1128]/50 text-xs tracking-widest uppercase font-mono hover:text-[#0A1128] transition-colors"
            >
              View full pricing breakdown →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP — white ──────────────────────────────────── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-display text-2xl md:text-3xl italic text-[#0A1128]">
            7 AI SaaS products. All self-funded. All production.
            This is what I build for clients.
          </p>
          <Link href="/projects" className="inline-block mt-6 text-[#C1292E] font-medium hover:underline">
            View the full portfolio →
          </Link>
        </div>
      </section>

      {/* ── CTA — cherry ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#C1292E]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-5xl font-bold italic text-white mb-6">
            Ready to build? Let&apos;s talk.
          </h2>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-white text-[#C1292E] rounded-full font-semibold hover:bg-white/90 transition-all hover:scale-105"
          >
            Start the conversation →
          </Link>
        </div>
      </section>
    </main>
  );
}
