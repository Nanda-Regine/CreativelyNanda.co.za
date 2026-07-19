import { Metadata } from 'next';
import Link from 'next/link';
import { Leaf, Sparkles, Heart, ArrowRight, Mail } from 'lucide-react';
import { JsonLd, SITE_URL } from '@/lib/seo';
import PlacedPortrait from '@/components/room/PlacedPortrait';
import { portraitsForRoom } from '@/lib/house-assets';

export const metadata: Metadata = {
  title: 'Sanyu Botanicals | African Botanical Wellness — Launching April 2026',
  description:
    'Sanyu Botanicals — an African botanical wellness brand rooted in ancestral hair care wisdom and modern formulation. Launching April 2026 from Mirembe Muse (Pty) Ltd.',
  keywords: [
    'Sanyu Botanicals',
    'African botanical hair care',
    'African natural hair products South Africa',
    'ancestral hair care',
    'Mirembe Muse botanicals',
    'African wellness brand',
    'natural hair South Africa',
    'botanical hair products Africa',
    'Black-owned beauty brand South Africa',
    'African botanical wellness',
  ],
  openGraph: {
    title: 'Sanyu Botanicals | African Botanical Wellness — Launching April 2026',
    description:
      'Where ancestral wisdom meets modern formulation. Sanyu Botanicals is launching April 2026.',
    images: ['/og-sanyu.jpg'],
    url: `${SITE_URL}/sanyu`,
  },
  alternates: { canonical: `${SITE_URL}/sanyu` },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sanyu Botanicals',
  description:
    'African botanical wellness brand rooted in ancestral hair care wisdom. A Mirembe Muse (Pty) Ltd brand.',
  url: `${SITE_URL}/sanyu`,
  foundingDate: '2026',
  parentOrganization: {
    '@type': 'Organization',
    name: 'Mirembe Muse (Pty) Ltd',
    url: SITE_URL,
  },
  areaServed: { '@type': 'Country', name: 'South Africa' },
  keywords: 'African botanical wellness, natural hair care, ancestral hair products',
};

const pillars = [
  {
    icon: Leaf,
    title: 'Ancestral Wisdom',
    description: 'Rooted in five clan lineages — Nsenene, Hlubi, Msimango, Thabizolo, Tshawe. Each formula carries centuries of botanical knowledge.',
  },
  {
    icon: Sparkles,
    title: 'Modern Formulation',
    description: 'Ancient ingredients, contemporary science. Every product is crafted with precision for the modern African woman.',
  },
  {
    icon: Heart,
    title: 'Ubuntu Philosophy',
    description: 'Wellness is communal. Sanyu (meaning "joy" in Luganda) is for every woman who has ever been told her hair is "too much."',
  },
];

export default function SanyuBotanicalsPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-forest-green via-sage-green/30 to-beige">
          {/* Botanical pattern overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232D5016' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Glow orbs */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-sage-green/20 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-terracotta/15 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest-green/20 border border-forest-green/30 rounded-full mb-8 backdrop-blur-sm">
              <Leaf className="w-4 h-4 text-forest-green" />
              <span className="text-sm text-forest-green font-semibold tracking-wide">A Mirembe Muse Brand</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-display font-bold text-forest-green mb-4 leading-[0.9]">
              Sanyu
            </h1>
            <h2 className="text-3xl md:text-5xl font-display font-light text-forest-green/70 mb-8 tracking-wide">
              Botanicals
            </h2>

            <p className="text-xl md:text-2xl text-forest-green/80 mb-4 font-light leading-relaxed max-w-2xl mx-auto">
              Where ancestral wisdom meets modern formulation.
            </p>

            <p className="text-base text-forest-green/60 mb-12 max-w-xl mx-auto leading-relaxed">
              African botanical wellness rooted in five clan lineages.
              Crafted for the modern African woman who knows her roots.
            </p>

            {/* Countdown */}
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-forest-green text-cream rounded-full mb-10 shadow-elevated">
              <Sparkles className="w-5 h-5 text-sage-green" />
              <span className="font-bold text-lg tracking-wide">Launching April 2026</span>
            </div>

            <div className="block">
              <p className="text-sm text-forest-green/60 mb-4 tracking-wider uppercase">Be first to know</p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-forest-green text-forest-green rounded-full font-semibold hover:bg-forest-green hover:text-cream transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                Join the Waitlist
              </Link>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="py-20 px-6 bg-cream">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs font-semibold text-forest-green tracking-widest uppercase mb-3 block">Our Foundation</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-forest-green">
                Rooted in <span className="text-terracotta">Heritage</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-8 bg-white rounded-3xl border border-forest-green/10 hover:border-forest-green/30 hover:shadow-elevated transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 bg-forest-green/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <pillar.icon className="w-8 h-8 text-forest-green" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-forest-green mb-3">{pillar.title}</h3>
                  <p className="text-forest-green/70 text-sm leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Story */}
        <section className="py-20 px-6 bg-forest-green">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-cream mb-8">
              The Name Means <span className="text-sage-green">Joy</span>
            </h2>
            <p className="text-cream/80 text-lg leading-relaxed mb-6">
              <em>Sanyu</em> is Luganda for joy. It&apos;s the feeling of running your hands through your
              properly nourished hair. It&apos;s the memory of a grandmother&apos;s kitchen, of oils and
              herbs and stories told in languages that hold your history.
            </p>
            <p className="text-cream/70 text-base leading-relaxed mb-10">
              Sanyu Botanicals is built on five ancestral lineages — each gifting a principle
              to our formulations. We don&apos;t just make hair products. We make heirlooms.
            </p>

            {portraitsForRoom('crown').map((p) => (
              <div key={p.file} className="mb-12 text-left">
                <PlacedPortrait
                  file={p.file}
                  alt={p.alt}
                  side="left"
                  kicker="Where Sanyu was born"
                  caption="It began with my own crown — the ritual of oils and patience that became a brand. The hair remembers what the hands were taught."
                  accent="#C9943A"
                />
              </div>
            ))}

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 border border-cream/30 text-cream rounded-full hover:border-cream hover:bg-cream/10 transition-all text-sm"
              >
                ← Back to Portfolio
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-sage-green text-forest-green rounded-full font-semibold hover:shadow-elevated transition-all text-sm"
              >
                Join the Waitlist <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Clan Lineages */}
        <section className="py-16 px-6 bg-beige">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-forest-green text-center mb-10">
              Five Clans. Five Principles.
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { clan: 'Nsenene', principle: 'Lead through people', nation: 'Ugandan' },
                { clan: 'Hlubi', principle: 'Adapt and endure', nation: 'Xhosa' },
                { clan: 'Msimango', principle: 'Heal at the root', nation: 'Zulu' },
                { clan: 'Thabizolo', principle: 'Build unshakeable foundations', nation: 'Sotho' },
                { clan: 'Tshawe', principle: 'Share what you create', nation: 'Xhosa' },
              ].map((item) => (
                <div key={item.clan} className="text-center p-5 bg-white rounded-2xl border border-forest-green/10">
                  <p className="font-display font-bold text-forest-green text-lg mb-1">{item.clan}</p>
                  <p className="text-xs text-terracotta font-medium mb-2">{item.nation}</p>
                  <p className="text-xs text-forest-green/60 leading-relaxed italic">&ldquo;{item.principle}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
