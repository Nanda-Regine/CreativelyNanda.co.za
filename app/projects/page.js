'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
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
    videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
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
    id: 'cortex-hub',
    title: 'Cortex Hub',
    subtitle: 'Booking & Management System',
    category: 'Full-Stack',
    status: 'Completed',
    year: '2024',
    coverColor: 'from-[#B8860B] to-[#8B6914]',
    accentColor: '#0A1128',
    description: 'A comprehensive booking and management system designed for service-based businesses. Features appointment scheduling, client management, and analytics dashboard.',
    videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
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
    videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
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
    videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
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

// Expandable Project Card Component
function ProjectCard({ project, isExpanded, onToggle, index }) {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
    >
      {/* Project Card */}
      <div 
        className={`
          relative overflow-hidden transition-all duration-700 ease-out
          ${isExpanded 
            ? 'bg-white rounded-[48px] shadow-2xl' 
            : 'bg-white/80 backdrop-blur-sm rounded-[32px] hover:shadow-xl hover:bg-white'
          }
        `}
      >
        {/* Top gradient bar */}
        <div className={`h-2 bg-gradient-to-r ${project.coverColor}`} />
        
        {/* Card Header - Always Visible */}
        <button 
          onClick={onToggle}
          className="w-full text-left p-6 md:p-8 lg:p-10"
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            {/* Project Icon/Number */}
            <div 
              className={`
                w-20 h-20 md:w-24 md:h-24 rounded-[20px] bg-gradient-to-br ${project.coverColor}
                flex items-center justify-center flex-shrink-0 shadow-lg
              `}
            >
              <span className="text-white font-display text-3xl md:text-4xl font-bold">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            
            {/* Project Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span 
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: `${project.accentColor}20`, color: project.accentColor }}
                >
                  {project.category}
                </span>
                <span className={`
                  px-3 py-1 rounded-full text-xs font-medium
                  ${project.status === 'Coming Soon' 
                    ? 'bg-[#B8860B]/20 text-[#B8860B]' 
                    : project.status === 'Live' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-[#0A1128]/10 text-[#0A1128]'
                  }
                `}>
                  {project.status}
                </span>
                <span className="text-[#0A1128]/40 text-sm">{project.year}</span>
              </div>
              
              <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-[#0A1128] mb-1">
                {project.title}
              </h3>
              <p className="text-[#0A1128]/60 text-base md:text-lg">{project.subtitle}</p>
            </div>
            
            {/* Expand Indicator */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-wrap gap-2 max-w-[200px]">
                {project.tech.slice(0, 3).map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-[#0A1128]/5 text-[#0A1128]/60 rounded-md text-xs">
                    {tech}
                  </span>
                ))}
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.4 }}
                className={`
                  w-12 h-12 rounded-full flex items-center justify-center transition-colors
                  ${isExpanded ? 'bg-[#0A1128] text-white' : 'bg-[#0A1128]/10 text-[#0A1128]'}
                `}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </div>
          </div>
        </button>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-6 md:px-8 lg:px-10 pb-8 md:pb-10">
                {/* Divider with pattern */}
                <div className="relative py-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-dashed border-[#0A1128]/20" />
                  </div>
                  <div className="relative flex justify-center">
                    <div className="px-4 bg-white">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div 
                            key={i} 
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: project.accentColor, opacity: 0.3 + (i * 0.15) }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#0A1128]/80 text-lg leading-relaxed mb-8 max-w-4xl">
                  {project.description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-8">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0A1128] to-[#1a2744] text-white rounded-full font-medium hover:shadow-lg transition-all hover:scale-105"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      {project.status === 'Coming Soon' ? 'Coming Soon' : 'View Live'}
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-6 py-3 border-2 border-[#0A1128] text-[#0A1128] rounded-full font-medium hover:bg-[#0A1128] hover:text-white transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-6 p-1.5 bg-[#0A1128]/5 rounded-2xl w-fit">
                  {['overview', 'case-study', 'readme'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`
                        px-5 py-2.5 rounded-xl text-sm font-medium transition-all capitalize
                        ${activeTab === tab 
                          ? 'bg-white text-[#0A1128] shadow-md' 
                          : 'text-[#0A1128]/60 hover:text-[#0A1128]'
                        }
                      `}
                    >
                      {tab === 'case-study' ? 'Case Study' : tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Video Embed */}
                      {project.videoUrl ? (
                        <div 
                          className="relative overflow-hidden rounded-[24px] bg-[#0A1128]"
                          style={{ paddingBottom: '56.25%' }}
                        >
                          <iframe
                            src={project.videoUrl}
                            title={`${project.title} Demo`}
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <div 
                          className={`
                            relative overflow-hidden rounded-[24px] bg-gradient-to-br ${project.coverColor}
                            flex items-center justify-center
                          `}
                          style={{ paddingBottom: '56.25%' }}
                        >
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                            <span className="text-6xl mb-4">🚀</span>
                            <span className="font-display text-2xl font-bold">Coming February 2026</span>
                            <span className="text-white/70 mt-2">Video demo will be available at launch</span>
                          </div>
                        </div>
                      )}

                      {/* Tech Stack */}
                      <div className="p-6 bg-gradient-to-br from-[#0A1128]/5 to-transparent rounded-[20px]">
                        <h4 className="font-display text-lg font-bold text-[#0A1128] mb-4">Tech Stack</h4>
                        <div className="flex flex-wrap gap-3">
                          {project.tech.map((tech, i) => (
                            <span 
                              key={i}
                              className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-sm"
                              style={{ color: project.accentColor }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'case-study' && (
                    <motion.div
                      key="case-study"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="grid md:grid-cols-2 gap-6"
                    >
                      {/* Challenge */}
                      <div 
                        className="p-6 rounded-[20px] border-l-4"
                        style={{ backgroundColor: `${project.accentColor}08`, borderColor: project.accentColor }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">🎯</span>
                          <h4 className="font-display text-xl font-bold text-[#0A1128]">Challenge</h4>
                        </div>
                        <p className="text-[#0A1128]/70 leading-relaxed">{project.caseStudy.challenge}</p>
                      </div>

                      {/* Approach */}
                      <div 
                        className="p-6 rounded-[20px] border-l-4"
                        style={{ backgroundColor: `${project.accentColor}08`, borderColor: project.accentColor }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">💡</span>
                          <h4 className="font-display text-xl font-bold text-[#0A1128]">Approach</h4>
                        </div>
                        <p className="text-[#0A1128]/70 leading-relaxed">{project.caseStudy.approach}</p>
                      </div>

                      {/* Solution */}
                      <div 
                        className="p-6 rounded-[20px] border-l-4"
                        style={{ backgroundColor: `${project.accentColor}08`, borderColor: project.accentColor }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">⚡</span>
                          <h4 className="font-display text-xl font-bold text-[#0A1128]">Solution</h4>
                        </div>
                        <p className="text-[#0A1128]/70 leading-relaxed">{project.caseStudy.solution}</p>
                      </div>

                      {/* Results */}
                      <div 
                        className="p-6 rounded-[20px] border-l-4"
                        style={{ backgroundColor: `${project.accentColor}08`, borderColor: project.accentColor }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">🏆</span>
                          <h4 className="font-display text-xl font-bold text-[#0A1128]">Results</h4>
                        </div>
                        <ul className="space-y-2">
                          {project.caseStudy.results.map((result, i) => (
                            <li key={i} className="flex items-start gap-2 text-[#0A1128]/70">
                              <span style={{ color: project.accentColor }}>✓</span>
                              <span>{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'readme' && (
                    <motion.div
                      key="readme"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-[#0A1128] rounded-[20px] p-6 md:p-8 overflow-x-auto">
                        <pre className="text-[#E8DCC4] text-sm md:text-base font-mono whitespace-pre-wrap leading-relaxed">
                          {project.readme}
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [expandedProject, setExpandedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const toggleProject = (projectId) => {
    setExpandedProject(prev => prev === projectId ? null : projectId);
  };

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
                A curated collection of digital experiences — from full-stack applications 
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
          <div className="space-y-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                isExpanded={expandedProject === project.id}
                onToggle={() => toggleProject(project.id)}
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
                  <a 
                    href="/contact"
                    className="px-8 py-4 bg-[#C1292E] text-white rounded-full font-medium hover:bg-[#a82226] transition-all hover:scale-105 hover:shadow-lg"
                  >
                    Start a Project
                  </a>
                  <a 
                    href="https://github.com/creativelynanda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 border-2 border-[#E8DCC4]/30 text-[#E8DCC4] rounded-full font-medium hover:bg-[#E8DCC4]/10 transition-all"
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