'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="page-transition">
      {/* ===== HERO: VOGUE COVER SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A1128]">
        
        {/* Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
             }} />

        {/* Decorative Background Shapes - Softer, more gold/beige */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#D4A574]/20 via-[#D4A574]/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-beige/15 via-beige/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-gradient-to-r from-[#D4A574]/10 to-transparent rounded-full blur-2xl" />

        {/* Magazine Masthead */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-20">
          <div className="font-display text-beige/40 text-xs tracking-[0.5em] uppercase mb-2">
            Portfolio Issue • 2026
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20 lg:py-0">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[80vh]">
            
            {/* Left Side: Editorial Headlines */}
            <div className="lg:col-span-5 space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1">

              {/* Main Title */}
              <div className="space-y-4">
                <div className="text-reveal" style={{ '--index': 1 }}>
                  <span className="text-beige/60 text-sm font-medium tracking-[0.3em] uppercase">
                    Introducing
                  </span>
                </div>

                <h1 className="font-display font-bold text-beige leading-[0.9] text-reveal"
                    style={{ '--index': 2 }}>
                  <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">Nandawula</span>
                  <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#D4A574] mt-1">Regine Kabali-Kagwa</span>
                </h1>
                
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start text-reveal" style={{ '--index': 3 }}>
                  <span className="px-4 py-2 border border-[#D4A574] text-[#D4A574] text-sm font-medium tracking-wider">
                    CREATIVE
                  </span>
                  <span className="px-4 py-2 bg-[#D4A574] text-navy text-sm font-medium tracking-wider">
                    TECHNOLOGIST
                  </span>
                </div>
              </div>

              {/* Tagline */}
              <p className="font-display text-lg md:text-xl lg:text-2xl text-beige/70 leading-relaxed max-w-md mx-auto lg:mx-0 text-reveal" 
                 style={{ '--index': 4 }}>
                Bridging imagination and innovation through 
                <span className="text-[#D4A574] font-semibold"> code</span>, 
                <span className="text-beige font-semibold"> design</span>, and 
                <span className="text-[#D4A574] font-semibold"> storytelling</span>.
              </p>

              {/* Magazine-style Feature List */}
              <div className="space-y-2 lg:space-y-3 text-reveal" style={{ '--index': 5 }}>
                <div className="flex items-center gap-4 text-beige/60 text-xs lg:text-sm justify-center lg:justify-start">
                  <span className="w-6 lg:w-8 h-px bg-[#D4A574]"></span>
                  <span className="tracking-wider">PUBLISHED POET</span>
                </div>
                <div className="flex items-center gap-4 text-beige/60 text-xs lg:text-sm justify-center lg:justify-start">
                  <span className="w-6 lg:w-8 h-px bg-[#D4A574]"></span>
                  <span className="tracking-wider">FULL-STACK DEVELOPER</span>
                </div>
                <div className="flex items-center gap-4 text-beige/60 text-xs lg:text-sm justify-center lg:justify-start">
                  <span className="w-6 lg:w-8 h-px bg-[#D4A574]"></span>
                  <span className="tracking-wider">NOTION ARCHITECT</span>
                </div>
                <div className="flex items-center gap-4 text-beige/60 text-xs lg:text-sm justify-center lg:justify-start">
                  <span className="w-6 lg:w-8 h-px bg-[#D4A574]"></span>
                  <span className="tracking-wider">FOUNDER, MIREMBE MUSE</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start text-reveal" style={{ '--index': 6 }}>
                <Link 
                  href="/projects"
                  className="group px-8 py-4 bg-[#D4A574] text-navy rounded-full font-medium hover:bg-[#C49464] transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <span>Explore My Work</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <Link 
                  href="/about"
                  className="px-8 py-4 border-2 border-beige/40 text-beige rounded-full font-medium hover:bg-beige hover:text-navy transition-all flex items-center justify-center"
                >
                  Read My Story
                </Link>
              </div>
            </div>

            {/* Right Side: Photo in Organic Frame */}
            <div className="lg:col-span-7 relative flex justify-center order-1 lg:order-2">
              
              {/* Floating Highlight Words - Hidden on mobile, better positioned on desktop */}
              <div className="hidden lg:block absolute -top-8 right-12 xl:right-24 z-20 text-reveal" style={{ '--index': 2 }}>
                <span className="font-display text-4xl xl:text-5xl font-bold text-[#D4A574]/70 italic">
                  Visionary
                </span>
              </div>
              
              <div className="hidden lg:block absolute top-1/3 -left-8 xl:left-4 z-20 text-reveal" style={{ '--index': 3 }}>
                <span className="font-display text-3xl xl:text-4xl font-bold text-beige/50 -rotate-12">
                  Poet
                </span>
              </div>
              
              <div className="hidden lg:block absolute bottom-1/3 -right-4 xl:right-4 z-20 text-reveal" style={{ '--index': 4 }}>
                <span className="font-display text-3xl xl:text-4xl font-bold text-[#D4A574]/60 rotate-6">
                  Builder
                </span>
              </div>
              
              <div className="hidden xl:block absolute bottom-16 left-16 z-20 text-reveal" style={{ '--index': 5 }}>
                <span className="font-display text-3xl font-bold text-beige/40 -rotate-6">
                  Dreamer
                </span>
              </div>

              {/* Main Photo Container - Organic Blob Shape */}
              <div className="relative">
                {/* Background blob layers */}
                <div 
                  className="absolute -inset-6 lg:-inset-8 bg-gradient-to-br from-[#D4A574]/30 via-[#D4A574]/10 to-transparent blur-sm"
                  style={{ borderRadius: '60% 40% 55% 45% / 55% 60% 40% 45%' }}
                />
                <div 
                  className="absolute -inset-3 lg:-inset-4 bg-gradient-to-tr from-beige/20 via-beige/5 to-transparent"
                  style={{ borderRadius: '55% 45% 60% 40% / 45% 55% 45% 55%' }}
                />
                
                {/* Photo Frame - Elegant Oval/Organic */}
                <div 
                  className="relative w-[260px] h-[340px] sm:w-[300px] sm:h-[400px] md:w-[350px] md:h-[470px] lg:w-[400px] lg:h-[540px] xl:w-[450px] xl:h-[600px] overflow-hidden shadow-2xl text-reveal"
                  style={{ 
                    borderRadius: '47% 53% 43% 57% / 54% 46% 54% 46%',
                    '--index': 1
                  }}
                >
                  {/* Gradient Overlay on Photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-[#D4A574]/10 z-10 pointer-events-none" />
                  
                  {/* Actual Photo */}
                  <img 
                    src="/assets/professional/nanda-pic-1.png"
                    alt="Nanda - Creative Technologist"
                    className="w-full h-full object-cover object-top"
                  />
                  
                  {/* Inner glow - softer */}
                  <div 
                    className="absolute inset-0 shadow-[inset_0_0_60px_rgba(212,165,116,0.15)] pointer-events-none z-20"
                    style={{ borderRadius: 'inherit' }}
                  />
                </div>

                {/* Decorative Ring */}
                <div 
                  className="absolute -inset-10 lg:-inset-12 border border-beige/10 pointer-events-none"
                  style={{ borderRadius: '50% 50% 45% 55% / 55% 45% 55% 45%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Magazine Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy via-navy/80 to-transparent py-6 lg:py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-4 lg:gap-6 text-beige/50 text-[10px] lg:text-xs tracking-widest uppercase">
              <span>Port Elizabeth, South Africa</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Inside Her Roses — Published Author</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Building Africa's Tech Future</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Just the line, no text */}
        <div className="absolute bottom-20 lg:bottom-24 left-1/2 -translate-x-1/2">
          <div className="w-px h-10 lg:h-12 bg-gradient-to-b from-beige/30 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ===== FEATURED QUOTE SECTION ===== */}
      <section className="relative py-20 lg:py-32 px-6 bg-beige overflow-hidden">
        {/* Decorative elements - softer colors */}
        <div className="absolute top-0 left-0 w-64 lg:w-96 h-64 lg:h-96 bg-gradient-to-br from-[#D4A574]/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-56 lg:w-80 h-56 lg:h-80 bg-gradient-to-tl from-navy/10 to-transparent rounded-full blur-3xl" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-6 lg:mb-8">
            <span className="text-[#B8860B] text-xs lg:text-sm font-medium tracking-[0.3em] uppercase">The Philosophy</span>
          </div>
          
          <blockquote className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight mb-6 lg:mb-8 px-4">
            "Technology should amplify 
            <span className="text-[#B8860B]"> humanity</span>, 
            not replace it."
          </blockquote>
          
          <p className="text-navy/60 text-base lg:text-lg max-w-2xl mx-auto px-4">
            Every line of code, every design decision, every word I write — 
            it's all in service of connection, creativity, and meaningful impact.
          </p>
        </div>
      </section>

      {/* ===== EXPLORE SECTION - Magazine Spread ===== */}
      <section className="py-16 lg:py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-4 lg:gap-6 mb-12 lg:mb-16">
            <div className="w-12 lg:w-20 h-px bg-navy" />
            <span className="text-navy text-xs lg:text-sm font-medium tracking-[0.2em] uppercase">Inside This Issue</span>
            <div className="flex-1 h-px bg-navy/10" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-12 lg:mb-16 text-center">
            Explore My <span className="text-[#B8860B]">World</span>
          </h2>
          
          {/* Magazine Grid - Asymmetric Layout */}
          <div className="grid md:grid-cols-12 gap-4 lg:gap-6">
            
            {/* Large Feature Card - Projects */}
            <Link 
              href="/projects"
              className="md:col-span-7 group relative overflow-hidden bg-navy p-8 lg:p-14 hover:scale-[1.02] transition-all duration-500"
              style={{ borderRadius: '40px 16px 40px 16px' }}
            >
              <div className="absolute top-0 right-0 w-48 lg:w-64 h-48 lg:h-64 bg-gradient-to-bl from-[#D4A574]/30 to-transparent rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
              
              <div className="relative z-10">
                <span className="text-[#D4A574] text-xs lg:text-sm font-medium tracking-[0.2em] uppercase">Featured</span>
                <h3 className="font-display text-3xl lg:text-5xl font-bold text-beige mt-3 lg:mt-4 mb-4 lg:mb-6 group-hover:text-[#D4A574] transition-colors">
                  Projects
                </h3>
                <p className="text-beige/70 text-base lg:text-lg max-w-md mb-6 lg:mb-8">
                  Full-stack applications, AI integrations, and digital experiences built with intention.
                </p>
                <span className="text-[#D4A574] font-medium group-hover:translate-x-2 inline-block transition-transform">
                  View Collection →
                </span>
              </div>
            </Link>

            {/* Stacked Cards - Right Column */}
            <div className="md:col-span-5 space-y-4 lg:space-y-6">
              {/* Poetry Card */}
              <Link 
                href="/poetry"
                className="group block relative overflow-hidden bg-gradient-to-br from-[#8B4513] to-[#654321] p-6 lg:p-8 hover:scale-[1.02] transition-all duration-500"
                style={{ borderRadius: '16px 40px 16px 40px' }}
              >
                <div className="absolute bottom-0 left-0 w-24 lg:w-32 h-24 lg:h-32 bg-white/10 rounded-full blur-xl" />
                <span className="text-white/70 text-xs tracking-[0.2em] uppercase">Published Author</span>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mt-2 mb-2 lg:mb-3 group-hover:translate-x-1 transition-transform">
                  Poetry & Performance
                </h3>
                <p className="text-white/70 text-sm">Words that move. Stories that heal.</p>
              </Link>

              {/* Notion Card */}
              <Link 
                href="/notion"
                className="group block relative overflow-hidden bg-beige p-6 lg:p-8 hover:scale-[1.02] transition-all duration-500"
                style={{ borderRadius: '40px 16px 16px 40px' }}
              >
                <div className="absolute top-0 right-0 w-20 lg:w-24 h-20 lg:h-24 bg-navy/10 rounded-full blur-xl" />
                <span className="text-[#B8860B] text-xs tracking-[0.2em] uppercase">Systems Architecture</span>
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-navy mt-2 mb-2 lg:mb-3 group-hover:translate-x-1 transition-transform">
                  Notion Systems
                </h3>
                <p className="text-navy/60 text-sm">Transforming chaos into clarity.</p>
              </Link>
            </div>

            {/* Bottom Row - Three Equal Cards */}
            <Link 
              href="/mirembe"
              className="md:col-span-4 group relative overflow-hidden bg-gradient-to-br from-[#2D5A3D] to-[#1E3F2A] p-6 lg:p-8 hover:scale-[1.02] transition-all duration-500"
              style={{ borderRadius: '16px 16px 40px 16px' }}
            >
              <span className="text-white/70 text-xs tracking-[0.2em] uppercase">Coming 2026</span>
              <h3 className="font-display text-xl lg:text-2xl font-bold text-white mt-2 mb-2 group-hover:translate-x-1 transition-transform">
                Mirembe Muse
              </h3>
              <p className="text-white/60 text-sm">African botanical wellness.</p>
            </Link>

            <Link 
              href="/work"
              className="md:col-span-4 group relative overflow-hidden bg-navy/5 p-6 lg:p-8 hover:scale-[1.02] transition-all duration-500 border border-navy/10"
              style={{ borderRadius: '16px 16px 16px 40px' }}
            >
              <span className="text-[#B8860B] text-xs tracking-[0.2em] uppercase">Experience</span>
              <h3 className="font-display text-xl lg:text-2xl font-bold text-navy mt-2 mb-2 group-hover:translate-x-1 transition-transform">
                Work Journey
              </h3>
              <p className="text-navy/60 text-sm">From hospitality to full-stack.</p>
            </Link>

            <Link 
              href="/contact"
              className="md:col-span-4 group relative overflow-hidden bg-[#D4A574]/15 p-6 lg:p-8 hover:scale-[1.02] transition-all duration-500"
              style={{ borderRadius: '40px 16px 16px 16px' }}
            >
              <span className="text-[#B8860B] text-xs tracking-[0.2em] uppercase">Connect</span>
              <h3 className="font-display text-xl lg:text-2xl font-bold text-navy mt-2 mb-2 group-hover:translate-x-1 transition-transform">
                Get in Touch
              </h3>
              <p className="text-navy/60 text-sm">Let's create something amazing.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CLOSING STATEMENT ===== */}
      <section className="relative py-16 lg:py-24 px-6 bg-navy overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4A574]/5 via-transparent to-[#D4A574]/5" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="font-display text-xl sm:text-2xl lg:text-3xl text-beige/80 leading-relaxed mb-6 lg:mb-8 px-4">
            I'm building at the intersection of technology, creativity, and African innovation — 
            proving that you can speak both <span className="text-[#D4A574] font-semibold">boardroom</span> and 
            <span className="text-[#D4A574] font-semibold"> JavaScript</span>.
          </p>
          
          <Link 
            href="/about"
            className="inline-flex items-center gap-2 text-[#D4A574] font-medium hover:gap-4 transition-all"
          >
            <span>Read the full story</span>
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}