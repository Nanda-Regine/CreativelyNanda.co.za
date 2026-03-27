'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      slug: 'true-access-app',
      title: 'True Access App',
      category: 'web',
      status: 'Completed',
      description: 'Full-stack location-based service platform with real-time mapping and authentication',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Supabase', 'Mapbox GL'],
      features: ['User Auth', 'Real-time Updates', 'Geospatial Queries', 'Mobile-First'],
      image: '📍',
    },
    {
      id: 2,
      slug: 'creativelynanda-portfolio',
      title: 'CreativelyNanda Portfolio',
      category: 'web',
      status: 'Live',
      description: 'This portfolio — modern Next.js site with AI chatbot assistant (Claude API), Framer Motion animations, and Supabase backend.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Claude API', 'Framer Motion'],
      features: ['AI Assistant', 'Animations', 'SEO Optimized', 'PWA'],
      image: '🎨',
    },
    {
      id: 3,
      slug: 'mirembe-muse-platform',
      title: 'Mirembe Muse Platform',
      category: 'ecommerce',
      status: 'Live',
      description: 'African wellness digital marketplace — 6 Notion productivity templates, PayFast ZAR checkout, and Supabase backend.',
      tech: ['Next.js', 'PayFast', 'Supabase', 'Resend'],
      features: ['E-commerce', 'ZAR Payments', 'Email Automation', 'Admin Dashboard'],
      image: '🌿',
      liveUrl: 'https://creativelynanda.co.za/products',
    },
    {
      id: 4,
      slug: 'visionboard-pro',
      title: 'VisionBoard Pro',
      category: 'web',
      status: 'In Development',
      description: 'Goal-setting SaaS application with visual tracking dashboards and community features.',
      tech: ['React', 'Next.js', 'Supabase', 'Analytics'],
      features: ['Goal Tracking', 'Progress Dashboards', 'Community Features'],
      image: '🎯',
    },
    {
      id: 5,
      slug: 'poetrytube-platform',
      title: 'PoetryTube Platform',
      category: 'creative',
      status: 'In Development',
      description: 'Interactive poetry and spoken word platform with multimedia integration and community reviews.',
      tech: ['Next.js', 'Video API', 'Supabase', 'Audio Processing'],
      features: ['Video Integration', 'Community', 'Performance Showcase'],
      image: '📝',
    },
    {
      id: 6,
      slug: 'notion-template-systems',
      title: 'Notion Template Systems',
      category: 'systems',
      status: 'Live — 6 Templates',
      description: 'Productized Notion systems for students, SMEs, and African creatives. Sold via the Mirembe Muse store.',
      tech: ['Notion API', 'Database Architecture', 'Automation'],
      features: ['CRM Systems', 'Project Management', 'Financial Tracking'],
      image: '🗂️',
      liveUrl: 'https://creativelynanda.co.za/products',
    },
  ];

  const categories = ['all', 'web', 'ecommerce', 'creative', 'systems'];

  return (
    <div className="page-transition min-h-screen bg-navy py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="font-display text-6xl md:text-8xl font-bold text-beige mb-6">
            Projects
          </h1>
          <p className="text-beige/70 text-lg md:text-xl max-w-3xl">
            Building at the intersection of technology, creativity, and business. 
            From full-stack web apps to AI-powered systems to African wellness e-commerce.
          </p>
        </div>

        <div className="flex gap-3 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all text-sm md:text-base ${
                filter === cat
                  ? 'bg-cherry text-white'
                  : 'bg-white/10 text-beige hover:bg-white/20'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects
            .filter(p => filter === 'all' || p.category === filter)
            .map((project, i) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group relative bg-white/5 backdrop-blur rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cherry"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="aspect-video bg-gradient-to-br from-cherry/20 to-beige/20 flex items-center justify-center text-6xl md:text-8xl">
                  {project.image}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3 gap-2">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-beige group-hover:text-cherry transition-colors">
                      {project.title}
                    </h3>
                    <span className="px-3 py-1 bg-cherry/20 text-cherry text-xs rounded-full shrink-0 mt-1">
                      {project.status}
                    </span>
                  </div>

                  <p className="text-beige/70 mb-4 text-sm md:text-base">{project.description}</p>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech, j) => (
                        <span key={j} className="px-2.5 py-1 bg-beige/10 text-beige text-xs rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.features.slice(0, 2).map((feature, j) => (
                        <span key={j} className="text-cherry text-xs">• {feature}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-cherry/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 pointer-events-none">
                  <span className="text-white font-medium text-base md:text-lg">View Details →</span>
                  {project.liveUrl && (
                    <span className="text-white/70 text-sm">Live Project</span>
                  )}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}