import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Code, Brain, Sparkles, Zap, Users, TrendingUp, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Engineer | Nandawula Regine — Building Intelligent Systems for African Businesses',
  description:
    'Nandawula Regine Kabali-Kagwa is a certified AI engineer and full-stack developer building custom AI agents, chatbots, and automation systems for African businesses. Expert in Claude API, OpenAI, Next.js, and Supabase.',
  keywords: [
    'AI engineer South Africa',
    'African AI engineer',
    'AI developer Africa',
    'chatbot development South Africa',
    'OpenAI developer Africa',
    'Claude API developer',
    'AI agent development',
    'business automation South Africa',
    'full-stack AI developer',
    'Nandawula Regine',
    'AI consulting Africa',
    'machine learning South Africa',
    'LangChain developer',
    'RAG developer Africa',
    'AI solutions African businesses',
  ],
  openGraph: {
    title: 'AI Engineer | Nandawula Regine — Intelligent Systems for African Businesses',
    description:
      'Certified AI engineer specializing in Claude API, OpenAI, chatbots, automation, and AI-powered business solutions. Based in South Africa, building for Africa and the world.',
    images: ['/og-ai-engineer.jpg'],
    type: 'profile',
    url: 'https://creativelynanda.co.za/ai-engineer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Engineer | Nandawula Regine',
    description: 'Building intelligent AI systems for African businesses. Claude API, OpenAI, automation, and custom AI agents.',
    images: ['/og-ai-engineer.jpg'],
  },
  alternates: {
    canonical: 'https://creativelynanda.co.za/ai-engineer',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Nandawula Regine Kabali-Kagwa',
  jobTitle: 'AI Engineer & Full-Stack Developer',
  description:
    'Certified AI engineer specializing in building intelligent systems, AI agents, chatbots, and automation for African businesses.',
  url: 'https://creativelynanda.co.za/ai-engineer',
  sameAs: [
    'https://github.com/Nanda-Regine',
    'https://creativelynanda.co.za',
  ],
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'Claude API',
    'OpenAI GPT-4',
    'LangChain',
    'RAG Systems',
    'Next.js',
    'TypeScript',
    'Supabase',
    'PayFast',
  ],
  offers: {
    '@type': 'Offer',
    description: 'AI engineering services including chatbot development, AI agent creation, and business automation',
  },
};

const aiProjects = [
  {
    title: 'K53 Drill Master',
    description: 'AI-powered driving test prep platform with adaptive learning. Tackling South Africa\'s 60% K53 failure rate.',
    tech: ['OpenAI', 'Next.js', 'Supabase', 'TypeScript'],
    users: '50+ paying users',
    impact: '4.8/5 rating',
    status: 'Live',
    link: 'https://nanda-k53-drill-master.vercel.app/',
  },
  {
    title: 'Campus Compass',
    description: 'AI university companion platform with smart scheduling, deadline tracking, and campus navigation.',
    tech: ['OpenAI', 'Mapbox', 'Next.js', 'Supabase', 'PWA'],
    users: '200+ students',
    impact: '40% time saved on planning',
    status: 'Beta',
    link: 'https://github.com/Nanda-Regine/campus-compass',
  },
  {
    title: 'StokvelOS',
    description: 'AI-powered stokvel management platform for South Africa\'s 11M stokvel participants. Automated record-keeping and financial tracking.',
    tech: ['Claude API', 'Supabase', 'PayFast', 'TypeScript'],
    users: 'Beta — 3 stokvels',
    impact: '100% accuracy in tracking',
    status: 'Beta',
    link: '/projects/stokvel-os',
  },
  {
    title: 'Nanda AI Assistant',
    description: 'Custom AI sales assistant that converts website visitors into customers using RAG and embeddings.',
    tech: ['Claude API', 'RAG', 'Embeddings', 'Next.js'],
    users: 'Live on this site',
    impact: '15% conversion lift',
    status: 'Live',
    link: '/#ai-assistant',
  },
];

const services = [
  {
    icon: Brain,
    title: 'AI Agent Development',
    description: 'Custom AI agents that handle customer service, sales, data processing, and operations — 24/7 without you lifting a finger.',
    deliverables: [
      '24/7 automated customer support',
      'Lead qualification & nurturing',
      'Document processing & data entry',
      'Smart email responses',
    ],
    pricing: 'R3,000–R8,000/month',
    turnaround: '2–3 weeks',
  },
  {
    icon: Sparkles,
    title: 'Chatbot Integration',
    description: 'WhatsApp, website, and social media chatbots that feel human and convert like your best salesperson.',
    deliverables: [
      'Natural language understanding',
      'Multi-language support (inc. Zulu, Xhosa)',
      'Knowledge base integration',
      'Analytics dashboard',
    ],
    pricing: 'R2,500–R5,000/month',
    turnaround: '1–2 weeks',
  },
  {
    icon: Zap,
    title: 'Business Automation',
    description: 'AI-powered workflows that eliminate repetitive tasks and save your team hours every day.',
    deliverables: [
      'Email automation',
      'Data extraction & entry',
      'Report generation',
      'Meeting scheduling & follow-ups',
    ],
    pricing: 'R1,500–R4,000/month',
    turnaround: '1 week',
  },
  {
    icon: Code,
    title: 'Custom AI Solutions',
    description: 'Bespoke AI systems designed from the ground up for your specific business problem.',
    deliverables: [
      'Requirements analysis & scoping',
      'Custom model fine-tuning',
      'API integration & deployment',
      '3-month support included',
    ],
    pricing: 'Quote-based',
    turnaround: '4–8 weeks',
  },
];

const stats = [
  { label: 'AI Apps Built', value: '5+', icon: Code },
  { label: 'Paying Users', value: '250+', icon: Users },
  { label: 'Revenue Generated', value: 'R15K+', icon: TrendingUp },
  { label: 'Avg Response Time', value: '< 1s', icon: Zap },
];

const techStack = [
  { name: 'Claude API', level: 'Expert', color: 'cherry' },
  { name: 'OpenAI GPT-4', level: 'Advanced', color: 'cherry' },
  { name: 'LangChain', level: 'Intermediate', color: 'electric-cyan' },
  { name: 'Embeddings & RAG', level: 'Advanced', color: 'electric-cyan' },
  { name: 'Next.js', level: 'Expert', color: 'cherry' },
  { name: 'TypeScript', level: 'Expert', color: 'cherry' },
  { name: 'Supabase', level: 'Expert', color: 'cherry' },
  { name: 'Python', level: 'Intermediate', color: 'electric-cyan' },
];

const statusColors: Record<string, string> = {
  Live: 'bg-emerald/20 text-emerald border border-emerald/30',
  Beta: 'bg-amber/20 text-amber border border-amber/30',
  'In Development': 'bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/30',
};

export default function AIEngineerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-midnight-blue text-beige">
        {/* Hero */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-24">
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(to right, #00d4ff22 1px, transparent 1px), linear-gradient(to bottom, #00d4ff22 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />

          {/* Glow orbs */}
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-cherry/15 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-electric-cyan/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />

          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-electric-cyan/10 border border-electric-cyan/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-electric-cyan" />
              <span className="text-sm text-electric-cyan font-semibold tracking-wide">Master Gen AI Professional Certified</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-display font-bold mb-6">
              <span className="text-beige">AI</span>{' '}
              <span className="text-cherry">Engineer</span>
            </h1>

            <p className="text-2xl md:text-3xl text-beige/80 mb-6 font-light leading-relaxed">
              Building intelligent systems that{' '}
              <span className="text-electric-cyan font-semibold">save time</span>,{' '}
              <span className="text-cherry font-semibold">reduce costs</span>, and{' '}
              <span className="text-gold font-semibold">drive revenue</span>
            </p>

            <p className="text-lg text-beige/60 max-w-3xl mx-auto mb-12 leading-relaxed">
              From chatbots that convert to AI agents that automate — I build custom AI solutions
              for African businesses ready to compete globally. Nandawula Regine Kabali-Kagwa,
              Africa&apos;s Creative Technologist.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#services"
                className="px-8 py-4 bg-cherry text-white font-semibold rounded-full hover:bg-cherry-dark hover:shadow-glow-cherry transition-all duration-300"
              >
                View Services
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border-2 border-electric-cyan/50 text-electric-cyan font-semibold rounded-full hover:bg-electric-cyan/10 transition-all duration-300"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 px-6 border-y border-beige/10">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-cherry/15 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-cherry" />
                </div>
                <p className="text-4xl md:text-5xl font-display font-bold text-electric-cyan mb-2">
                  {stat.value}
                </p>
                <p className="text-beige/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* AI Projects */}
        <section id="projects" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-4 text-beige">
                AI-Powered{' '}
                <span className="text-cherry">Projects</span>
              </h2>
              <p className="text-xl text-beige/60">
                Real applications. Real users. Real results across Africa.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {aiProjects.map((project) => (
                <Link
                  key={project.title}
                  href={project.link}
                  target={project.link.startsWith('http') ? '_blank' : '_self'}
                  rel={project.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group block bg-charcoal/60 border border-beige/10 rounded-2xl p-8 hover:border-cherry/40 hover:shadow-glow-cherry transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[project.status]}`}>
                      {project.status}
                    </span>
                    <ExternalLink className="w-5 h-5 text-beige/30 group-hover:text-electric-cyan transition-colors" />
                  </div>

                  <h3 className="text-2xl font-display font-bold mb-3 text-beige group-hover:text-cherry transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-beige/60 mb-5 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan text-xs rounded-full font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-beige/10">
                    <div>
                      <p className="text-xs text-beige/40 mb-1">Users</p>
                      <p className="font-semibold text-beige text-sm">{project.users}</p>
                    </div>
                    <div>
                      <p className="text-xs text-beige/40 mb-1">Impact</p>
                      <p className="font-semibold text-gold text-sm">{project.impact}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 border border-beige/20 text-beige rounded-full hover:border-cherry hover:text-cherry transition-all duration-300"
              >
                View All 9 Projects <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24 px-6 bg-charcoal/30 border-y border-beige/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-4 text-beige">
                Services I <span className="text-cherry">Offer</span>
              </h2>
              <p className="text-xl text-beige/60">
                Custom AI solutions for businesses that want to lead, not follow
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="bg-midnight-blue border border-beige/10 rounded-2xl p-8 hover:border-cherry/30 transition-all duration-300 hover:shadow-glow-cherry"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-cherry/15 rounded-2xl mb-6">
                    <service.icon className="w-8 h-8 text-cherry" />
                  </div>

                  <h3 className="text-2xl font-display font-bold mb-3 text-beige">{service.title}</h3>
                  <p className="text-beige/60 mb-6 leading-relaxed">{service.description}</p>

                  <div className="mb-6">
                    <p className="text-xs font-semibold text-electric-cyan mb-3 tracking-widest uppercase">What you get:</p>
                    <ul className="space-y-2">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-beige/80 text-sm">
                          <CheckCircle className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-beige/10">
                    <div>
                      <p className="text-xs text-beige/40 mb-1">Investment</p>
                      <p className="text-xl font-bold text-beige">{service.pricing}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-beige/40 mb-1">Timeline</p>
                      <p className="text-lg font-semibold text-gold">{service.turnaround}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-4 text-beige">
                My AI <span className="text-electric-cyan">Arsenal</span>
              </h2>
              <p className="text-xl text-beige/60">
                The tools I use to build intelligent systems that scale
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="group bg-charcoal/60 border border-beige/10 rounded-xl p-6 text-center hover:border-cherry/40 hover:shadow-glow-cherry transition-all duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-4 bg-cherry/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Code className="w-6 h-6 text-cherry" />
                  </div>
                  <h3 className="font-semibold text-beige mb-2 font-mono text-sm">{tech.name}</h3>
                  <p className="text-xs text-electric-cyan">{tech.level}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 bg-gradient-to-r from-cherry/10 to-electric-cyan/5 border-y border-cherry/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-beige">
              Ready to Build Your <span className="text-cherry">AI Solution</span>?
            </h2>
            <p className="text-xl text-beige/70 mb-8 leading-relaxed">
              Let&apos;s discuss how AI can transform your business. Free 30-minute strategy call.
              No jargon. Just results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-cherry text-white font-semibold rounded-full hover:bg-cherry-dark hover:shadow-glow-cherry transition-all duration-300"
              >
                Book a Free Consultation
              </Link>
              <Link
                href="mailto:hello@creativelynanda.co.za"
                className="px-8 py-4 border-2 border-beige/30 text-beige font-semibold rounded-full hover:border-beige hover:bg-beige/5 transition-all duration-300"
              >
                Email Me Directly
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
