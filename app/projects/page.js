'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Projects Data
const projects = [
  {
    id: 'creativelynanda',
    title: 'CreativelyNanda',
    subtitle: 'Portfolio & Digital Headquarters',
    category: 'Full-Stack',
    status: 'Live',
    year: '2025',
    coverColor: 'from-[#C1292E] to-[#8B1E22]',
    accentColor: '#C1292E',
    description: 'My personal portfolio and digital headquarters — a magazine-inspired showcase of my work as a Creative Technologist, featuring AI chatbot integration, editorial design aesthetics, and seamless user experience.',
    videoUrl: '/assets/project-screen-record/creativelynanda.mp4',
    githubUrl: 'https://github.com/creativelynanda/portfolio',
    liveUrl: 'https://creativelynanda.co.za',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'OpenAI API', 'Vercel'],
    caseStudy: {
      challenge: 'Create a portfolio that stands out in a sea of generic developer portfolios — one that authentically represents my dual identity as a technologist and poet, while showcasing technical excellence.',
      approach: 'Designed with a Vogue-inspired editorial aesthetic, moving away from conventional portfolio layouts. Implemented organic shapes, flowing animations, and a sophisticated color palette of navy, beige, cherry, and gold.',
      solution: 'Built a fully responsive Next.js application with AI chatbot integration, smooth page transitions, and magazine-style layouts. Each section tells a story while demonstrating technical capabilities.',
      results: [
        'Achieved 95+ Lighthouse performance scores',
        'AI chatbot handles visitor inquiries 24/7',
        'Editorial design receives consistent positive feedback',
        'Mobile-first approach ensures seamless experience across devices'
      ]
    },
    readme: `# CreativelyNanda Portfolio

A magazine-inspired portfolio showcasing my work as a Creative Technologist.

## Features
- 🎨 Editorial magazine design aesthetic
- 🤖 AI-powered chatbot assistant
- ⚡ Optimized for performance (95+ Lighthouse)
- 📱 Fully responsive design
- ✨ Smooth Framer Motion animations

## Tech Stack
- Next.js 14 with App Router
- React 18
- Tailwind CSS
- Framer Motion
- OpenAI API Integration

## Getting Started
\`\`\`bash
npm install
npm run dev
\`\`\`

## License
MIT © Nanda`
  },
  {
    id: 'true-access',
    title: 'True Access',
    subtitle: 'Location-Based Service Platform',
    category: 'Full-Stack',
    status: 'Completed',
    year: '2025',
    coverColor: 'from-[#0A1128] to-[#1a2744]',
    accentColor: '#B8860B',
    description: 'A full-stack location-based service platform with real-time mapping, user authentication, and geospatial visualization. Built from scratch to connect users with local services.',
    videoUrl: null,
    githubUrl: 'https://github.com/creativelynanda/true-access',
    liveUrl: 'https://true-access.vercel.app',
    tech: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Supabase', 'Mapbox GL JS', 'Geolocation API'],
    caseStudy: {
      challenge: 'Build a platform that helps users discover and connect with local services based on their real-time location, with secure authentication and intuitive mapping.',
      approach: 'Leveraged Supabase for backend infrastructure including authentication, real-time database, and serverless functions. Integrated Mapbox GL for beautiful, interactive maps.',
      solution: 'Created a mobile-first responsive design with custom map markers, geospatial queries, and real-time updates. Implemented secure user authentication with role-based access.',
      results: [
        'Real-time location tracking with 99% accuracy',
        'Sub-second database queries for nearby services',
        'Secure authentication with Supabase Auth',
        'Interactive map with custom styling and markers'
      ]
    },
    readme: `# True Access App

Location-based service platform connecting users with local services.

## Features
- 📍 Real-time geolocation tracking
- 🗺️ Interactive Mapbox GL maps
- 🔐 Secure Supabase authentication
- ⚡ Real-time database updates
- 📱 Mobile-first responsive design

## Tech Stack
- Vanilla JavaScript (ES6+)
- Supabase (Auth, Database, Functions)
- Mapbox GL JS
- HTML5 & CSS3

## Setup
\`\`\`bash
# Clone the repository
git clone https://github.com/creativelynanda/true-access

# Add your API keys to .env
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
MAPBOX_TOKEN=your_token
\`\`\`

## License
MIT © Nanda`
  },
  {
    id: 'greenvault',
    title: 'GreenVault',
    subtitle: 'Token-Based E-Commerce Platform',
    category: 'Full-Stack',
    status: 'Completed',
    year: '2025',
    coverColor: 'from-[#10B981] to-[#059669]',
    accentColor: '#10B981',
    description: 'A modern token-based e-commerce platform where users earn and spend tokens for purchases. Features a gamified shopping experience with rewards, achievements, and a sleek green-themed interface.',
    videoUrl: '/assets/project-screen-record/GreenVault.mp4',
    githubUrl: 'https://github.com/creativelynanda/greenvault',
    liveUrl: 'https://greenvault.vercel.app',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS', 'JWT Authentication'],
    caseStudy: {
      challenge: 'Create an engaging e-commerce experience that rewards customer loyalty through a token-based system, making shopping more interactive and rewarding.',
      approach: 'Designed a gamified shopping experience with token rewards for purchases, reviews, and referrals. Built a sleek green-themed UI that reinforces the eco-friendly brand identity.',
      solution: 'Developed a full-stack application with user authentication, token wallet system, product catalog, and checkout flow. Implemented reward tiers and achievement badges.',
      results: [
        'Token-based loyalty system increases user engagement',
        'Gamified shopping with achievements and rewards',
        'Secure JWT authentication for user accounts',
        'Responsive design with modern UI/UX'
      ]
    },
    readme: `# GreenVault

Token-based e-commerce platform with gamified shopping experience.

## Features
- 🪙 Token-based currency system
- 🛒 Full e-commerce functionality
- 🏆 Achievements and rewards
- 👤 User accounts with JWT auth
- 📱 Responsive green-themed design

## Tech Stack
- React (Frontend)
- Node.js & Express (Backend)
- MongoDB (Database)
- Tailwind CSS (Styling)
- JWT (Authentication)

## Installation
\`\`\`bash
npm install
npm run dev
\`\`\`

## License
MIT © Nanda`
  },
  {
    id: 'cortex-hub',
    title: 'Cortex Hub',
    subtitle: 'Booking & Management System',
    category: 'Full-Stack',
    status: 'Completed',
    year: '2024',
    coverColor: 'from-[#B8860B] to-[#8B6914]',
    accentColor: '#0A1128',
    description: 'A comprehensive booking and management system designed for service-based businesses. Features appointment scheduling, client management, and analytics dashboard.',
    videoUrl: '/assets/project-screen-record/cortexhub-booking-system.mp4',
    githubUrl: 'https://github.com/creativelynanda/cortex-hub',
    liveUrl: 'https://cortex-hub.vercel.app',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS', 'Chart.js'],
    caseStudy: {
      challenge: 'Service businesses needed a modern, intuitive booking system that could handle scheduling, client management, and provide business insights — all in one platform.',
      approach: 'Built a full MERN stack application with focus on user experience. Implemented calendar-based booking, automated reminders, and comprehensive analytics.',
      solution: 'Delivered a production-ready booking system with real-time availability, client profiles, payment integration readiness, and business intelligence dashboards.',
      results: [
        'Reduced booking time by 70% for end users',
        'Automated reminder system decreased no-shows by 40%',
        'Analytics dashboard provides actionable business insights',
        'Scalable architecture ready for multi-location businesses'
      ]
    },
    readme: `# Cortex Hub Booking System

Modern booking and management system for service businesses.

## Features
- 📅 Calendar-based appointment scheduling
- 👥 Client management & profiles
- 📊 Analytics dashboard
- 🔔 Automated reminders
- 💳 Payment integration ready

## Tech Stack
- React (Frontend)
- Node.js & Express (Backend)
- MongoDB (Database)
- Tailwind CSS (Styling)
- Chart.js (Analytics)

## Installation
\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
\`\`\`

## License
MIT © Nanda`
  },
  {
    id: 'netflix-clone',
    title: 'Netflix Landing',
    subtitle: 'Pixel-Perfect Recreation',
    category: 'Frontend',
    status: 'Completed',
    year: '2024',
    coverColor: 'from-[#E50914] to-[#831010]',
    accentColor: '#E50914',
    description: 'A pixel-perfect recreation of Netflix\'s landing page, demonstrating mastery of HTML and CSS fundamentals, responsive design principles, and attention to detail.',
    videoUrl: '/assets/project-screen-record/netflix-clone.mp4',
    githubUrl: 'https://github.com/creativelynanda/netflix-landing',
    liveUrl: 'https://netflix-landing-nanda.vercel.app',
    tech: ['HTML5', 'CSS3', 'Flexbox', 'CSS Grid', 'Media Queries', 'CSS Animations'],
    caseStudy: {
      challenge: 'Recreate the Netflix landing page with pixel-perfect accuracy using only HTML and CSS, demonstrating strong foundational web development skills.',
      approach: 'Studied the original design meticulously, breaking down each section into components. Used modern CSS techniques including Flexbox, Grid, and custom properties.',
      solution: 'Built a fully responsive landing page that matches Netflix\'s design language, complete with hover effects, smooth animations, and mobile optimization.',
      results: [
        '100% responsive across all device sizes',
        'Pixel-perfect recreation of Netflix design',
        'Smooth CSS-only animations and transitions',
        'Clean, semantic HTML structure'
      ]
    },
    readme: `# Netflix Landing Page Clone

Pixel-perfect recreation of Netflix's landing page.

## Features
- 🎬 Accurate Netflix design recreation
- 📱 Fully responsive layout
- ✨ CSS animations & hover effects
- 🎨 Custom CSS properties
- ♿ Semantic HTML structure

## Technologies
- HTML5
- CSS3 (Flexbox, Grid, Animations)
- No JavaScript required!

## View Project
\`\`\`bash
# Simply open index.html in your browser
# Or use Live Server extension in VS Code
\`\`\`

## Learning Outcomes
- Advanced CSS layout techniques
- Responsive design principles
- CSS custom properties
- Animation & transitions

## License
MIT © Nanda`
  },
  {
    id: 'youtube-clone',
    title: 'YouTube Clone',
    subtitle: 'Interface Recreation',
    category: 'Frontend',
    status: 'Completed',
    year: '2024',
    coverColor: 'from-[#FF0000] to-[#CC0000]',
    accentColor: '#FF0000',
    description: 'A faithful recreation of YouTube\'s interface using HTML and CSS, showcasing layout skills, component-based thinking, and responsive design mastery.',
    videoUrl: '/assets/project-screen-record/youtube-clone.mp4',
    githubUrl: 'https://github.com/creativelynanda/youtube-clone',
    liveUrl: 'https://youtube-clone-nanda.vercel.app',
    tech: ['HTML5', 'CSS3', 'Flexbox', 'CSS Grid', 'BEM Methodology', 'Responsive Design'],
    caseStudy: {
      challenge: 'Recreate YouTube\'s complex interface layout including the sidebar, video grid, and header navigation using only HTML and CSS.',
      approach: 'Adopted BEM methodology for CSS organization. Used CSS Grid for the video card layout and Flexbox for component alignment. Prioritized mobile-first development.',
      solution: 'Delivered a responsive YouTube interface clone with functional sidebar, video grid, search bar, and navigation — all without JavaScript.',
      results: [
        'Complex grid layout with CSS Grid',
        'Collapsible sidebar design',
        'Responsive video card grid',
        'Clean BEM-structured CSS'
      ]
    },
    readme: `# YouTube Clone

Interface recreation of YouTube using HTML & CSS.

## Features
- 🎥 Video grid layout
- 📱 Responsive sidebar
- 🔍 Search bar design
- 🎨 YouTube color scheme
- 📐 BEM CSS methodology

## Technologies
- HTML5
- CSS3 (Grid, Flexbox)
- BEM Naming Convention

## Project Structure
\`\`\`
youtube-clone/
├── index.html
├── styles/
│   ├── main.css
│   ├── sidebar.css
│   ├── header.css
│   └── video-grid.css
└── assets/
    └── images/
\`\`\`

## Run Locally
Open index.html in any modern browser.

## License
MIT © Nanda`
  },
  {
    id: 'notion-systems',
    title: 'Notion Systems',
    subtitle: 'Business Operating Systems',
    category: 'Full-Stack',
    status: 'Live',
    year: '2025',
    coverColor: 'from-[#191919] to-[#2D2D2D]',
    accentColor: '#0A1128',
    description: 'Custom Notion operating systems designed for businesses and creatives — from CRM pipelines to financial dashboards and project management. Each system is tailored to streamline workflows and reduce administrative overhead.',
    videoUrl: '/assets/project-screen-record/Notion-building.mp4',
    githubUrl: null,
    liveUrl: 'https://creativelynanda.co.za/services',
    tech: ['Notion', 'Database Architecture', 'Workflow Automation', 'AI Integration', 'Template Design', 'Systems Thinking'],
    caseStudy: {
      challenge: 'Businesses struggle with scattered tools, manual processes, and inefficient workflows. They need unified systems that grow with them without requiring technical expertise to maintain.',
      approach: 'Design comprehensive Notion workspaces using relational databases, automated workflows, and intuitive interfaces. Focus on reducing friction and making information accessible.',
      solution: 'Delivered custom operating systems including CRM with pipeline tracking, financial management with dashboards, project trackers, and knowledge bases — all interconnected and automated.',
      results: [
        'Reduced client administrative time by 40–60%',
        'Created 15+ productized templates for various use cases',
        'Scalable systems adaptable to growing teams',
        'Integrated AI-powered automation for repetitive tasks'
      ]
    },
    readme: `# Notion Systems

Custom business operating systems built in Notion.

## Services
- 🏢 CRM Systems with pipeline tracking
- 💰 Financial Management dashboards
- 📊 Project Management systems
- 📚 Knowledge Base architecture
- 🤖 AI-powered automation integration

## Featured Systems
- Student Life OS
- Freelancer Hub
- SME Operating System
- Creative Project Tracker
- Content Calendar

## Process
1. Discovery call to understand needs
2. System architecture design
3. Database and workflow setup
4. Training and documentation
5. Ongoing support

## Contact
Book a consultation at creativelynanda.co.za/contact

## Templates Available
15+ ready-to-use templates for students,
freelancers, and small businesses.

© Nanda Kabali-Kagwa`
  },
  {
    id: 'mirembe-muse',
    title: 'Mirembe Muse',
    subtitle: 'African Botanical Wellness',
    category: 'E-Commerce',
    status: 'Coming Soon',
    year: '2026',
    coverColor: 'from-[#2D5A27] to-[#1a3a17]',
    accentColor: '#2D5A27',
    description: 'An e-commerce platform for African botanical wellness products — combining traditional African ingredients with modern wellness practices. Launching February 2026.',
    videoUrl: null,
    githubUrl: 'https://github.com/creativelynanda/mirembe-muse',
    liveUrl: 'https://mirembemuse.co.za',
    tech: ['Next.js', 'React', 'Stripe', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
    caseStudy: {
      challenge: 'Build a premium e-commerce platform that authentically represents African botanical wellness while providing seamless shopping experience and business scalability.',
      approach: 'Designing with African aesthetic influences while maintaining modern e-commerce best practices. Implementing Stripe for payments and Supabase for inventory management.',
      solution: 'Creating a full-featured e-commerce platform with product catalog, shopping cart, secure checkout, order management, and customer accounts.',
      results: [
        'Premium brand experience design',
        'Secure Stripe payment integration',
        'Inventory management system',
        'Customer account portal'
      ]
    },
    readme: `# Mirembe Muse

African botanical wellness e-commerce platform.

## Coming February 2026

### Planned Features
- 🌿 African botanical product catalog
- 🛒 Shopping cart & secure checkout
- 💳 Stripe payment integration
- 👤 Customer accounts & order history
- 📦 Inventory management
- 📊 Business analytics dashboard

## Tech Stack
- Next.js 14
- React 18
- Supabase
- Stripe
- Tailwind CSS
- Framer Motion

## Status
🚧 Currently in development

## Contact
For inquiries: hello@mirembemuse.co.za

## License
© Mirembe Muse (Pty) Ltd`
  }
];

// Category filter options
const categories = ['All', 'Full-Stack', 'Frontend', 'E-Commerce'];

// Slug map → links to /projects/[slug] case study pages
const slugMap = {
  'creativelynanda': 'creativelynanda',
  'true-access': 'true-access-app',
  'greenvault': 'green-vault',
  'cortex-hub': 'cortex-hub',
};

const statusStyle = {
  Live: 'bg-emerald-100 text-emerald-700',
  Beta: 'bg-amber-100 text-amber-700',
  Completed: 'bg-[#0A1128]/10 text-[#0A1128]/70',
  'Coming Soon': 'bg-purple-100 text-purple-700',
};

// Clean grid card
function ProjectCard({ project, index }) {
  const slug = slugMap[project.id];
  const caseStudyUrl = slug ? `/projects/${slug}` : null;
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group h-full"
    >
      {/* Clean link card */}
      <div className="h-full bg-white rounded-3xl overflow-hidden border border-[#0A1128]/8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
        {/* Gradient top bar */}
        <div className={`h-1.5 bg-gradient-to-r ${project.coverColor} flex-shrink-0`} />

        <div className="p-6 flex flex-col flex-1">
          {/* Number + status + year */}
          <div className="flex items-start justify-between mb-5">
            <span
              className="font-display text-5xl font-bold leading-none"
              style={{
                background: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor}88)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col items-end gap-1.5">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyle[project.status] || 'bg-[#0A1128]/10 text-[#0A1128]/70'}`}>
                {project.status}
              </span>
              <span className="text-xs text-[#0A1128]/40">{project.year}</span>
            </div>
          </div>

          {/* Title & subtitle */}
          <h3 className="font-display text-xl font-bold text-[#0A1128] mb-1 group-hover:text-[#C1292E] transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-[#0A1128]/55 text-sm mb-3">{project.subtitle}</p>

          {/* Description — 3 lines max */}
          <p className="text-[#0A1128]/70 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
            {project.description}
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="px-2.5 py-1 bg-[#0A1128]/5 text-[#0A1128]/65 text-xs rounded-full font-mono">
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-2.5 py-1 bg-[#0A1128]/5 text-[#0A1128]/40 text-xs rounded-full">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t border-[#0A1128]/8">
            {project.liveUrl && project.status !== 'Coming Soon' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 px-3 text-xs font-semibold text-[#0A1128] bg-[#0A1128]/6 rounded-full hover:bg-[#0A1128] hover:text-white transition-all duration-200"
              >
                Live Demo ↗
              </a>
            )}
            {caseStudyUrl && (
              <Link
                href={caseStudyUrl}
                className="flex-1 text-center py-2.5 px-3 text-xs font-semibold text-white rounded-full hover:opacity-90 transition-all duration-200"
                style={{ backgroundColor: project.accentColor }}
              >
                Case Study →
              </Link>
            )}
            {project.status === 'Coming Soon' && (
              <span className="flex-1 text-center py-2.5 px-3 text-xs font-medium text-[#0A1128]/40 bg-[#0A1128]/5 rounded-full">
                Coming April 2026
              </span>
            )}
            {project.githubUrl && !caseStudyUrl && project.status !== 'Coming Soon' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 px-3 text-xs font-semibold text-[#0A1128]/70 bg-[#0A1128]/5 rounded-full hover:bg-[#0A1128]/10 transition-all duration-200"
              >
                GitHub →
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All'
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8DCC4] via-[#F5EFE6] to-[#E8DCC4]">
      {/* Texture overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative background elements */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#C1292E]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#B8860B]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Editorial header */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-6 mb-8"
          >
            <div className="w-20 md:w-32 h-px bg-[#C1292E]" />
            <span className="text-[#C1292E] text-xs md:text-sm font-medium tracking-[0.3em] uppercase">
              Selected Works
            </span>
            <div className="flex-1 h-px bg-[#C1292E]/20" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-[#0A1128] mb-6">
                Projects
              </h1>
              <p className="text-lg md:text-xl text-[#0A1128]/70 leading-relaxed max-w-xl">
                A curated collection of digital experiences from full-stack applications 
                to pixel-perfect frontends. Each project tells a story of problem-solving, 
                creativity, and technical excellence.
              </p>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div 
                className="bg-[#0A1128] p-8 md:p-10 relative overflow-hidden"
                style={{ borderRadius: '40px 16px 40px 16px' }}
              >
                {/* Decorative accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C1292E]/30 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#B8860B]/20 rounded-full blur-xl" />
                
                <div className="relative z-10 grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="font-display text-4xl md:text-5xl font-bold text-[#C1292E]">
                      {projects.length}
                    </div>
                    <div className="text-[#E8DCC4]/70 text-sm mt-1">Projects</div>
                  </div>
                  <div>
                    <div className="font-display text-4xl md:text-5xl font-bold text-[#B8860B]">
                      {projects.filter(p => p.status !== 'Coming Soon').length}
                    </div>
                    <div className="text-[#E8DCC4]/70 text-sm mt-1">Completed</div>
                  </div>
                  <div>
                    <div className="font-display text-4xl md:text-5xl font-bold text-[#E8DCC4]">
                      {new Set(projects.flatMap(p => p.tech)).size}+
                    </div>
                    <div className="text-[#E8DCC4]/70 text-sm mt-1">Technologies</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FILTER SECTION ===== */}
      <section className="relative py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <span className="text-[#0A1128]/60 text-sm font-medium">Filter by:</span>
            <div className="flex flex-wrap gap-2 p-1.5 bg-white/60 backdrop-blur-sm rounded-2xl">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`
                    px-5 py-2.5 rounded-xl text-sm font-medium transition-all
                    ${activeFilter === category 
                      ? 'bg-[#0A1128] text-white shadow-lg' 
                      : 'text-[#0A1128]/70 hover:bg-white hover:text-[#0A1128]'
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== PROJECTS GRID ===== */}
      <section className="relative py-12 md:py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Decorative card */}
            <div 
              className="relative bg-gradient-to-br from-[#0A1128] via-[#1a2744] to-[#0A1128] p-8 md:p-12 lg:p-16 overflow-hidden text-center"
              style={{ borderRadius: '48px 16px 48px 16px' }}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-gradient-to-b from-[#C1292E]/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#B8860B]/20 rounded-full blur-2xl" />
              
              {/* Content */}
              <div className="relative z-10">
                <span className="text-[#B8860B] text-sm font-medium tracking-[0.3em] uppercase">Let's Build Together</span>
                
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#E8DCC4] mt-4 mb-6">
                  Have a Project in Mind?
                </h2>
                
                <p className="text-[#E8DCC4]/70 text-lg max-w-xl mx-auto mb-8">
                  I'm always excited to work on new challenges. Whether it's a full-stack application, 
                  a beautiful frontend, or a complete digital transformation — let's create something amazing.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/contact"
                    className="px-8 py-3.5 rounded-full bg-[#C1292E] text-white text-sm font-semibold hover:bg-[#a82228] transition-colors duration-200"
                  >
                    Start a Project
                  </Link>
                  <a
                    href="https://github.com/Nanda-Regine"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3.5 rounded-full border border-[#E8DCC4]/30 text-[#E8DCC4] text-sm font-semibold hover:bg-[#E8DCC4]/10 transition-colors duration-200"
                  >
                    View GitHub
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER DECORATION ===== */}
      <div className="relative h-32 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C1292E]/30 to-transparent" />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="w-2 h-2 rounded-full bg-[#C1292E]"
              style={{ opacity: 0.3 + (i * 0.15) }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}