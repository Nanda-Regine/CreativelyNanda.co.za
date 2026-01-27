'use client';
import { useEffect, useState } from 'react';

export default function Mirembe() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoUrl = '/assets/logos/mirembe-muse-logo.png';

  return (
    <div className="page-transition min-h-screen bg-[#FAF7F2] overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#D4E7D4]/30 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#E8DCC4]/40 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-[#F5E6D3]/20 to-transparent rounded-full" />
      </div>

      {/* Hero Section - Magazine Cover Style */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Logo Display */}
            <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
              {/* Layered organic shapes behind logo */}
              <div className="absolute -top-6 -left-6 w-[320px] h-[320px] md:w-[380px] md:h-[380px] bg-gradient-to-br from-[#2D5A3D]/15 to-[#8B9A7D]/5 rounded-[50px] blur-sm animate-pulse"
                   style={{ animationDuration: '4s' }} />
              <div className="absolute -bottom-4 -right-4 w-[280px] h-[280px] md:w-[330px] md:h-[330px] bg-gradient-to-tl from-[#C1292E]/10 to-[#E8DCC4]/20 rounded-[45px]" />
              
              {/* Main logo container */}
              <div
                className="relative z-10 w-[300px] h-[300px] md:w-[350px] md:h-[350px] shadow-2xl overflow-hidden"
                style={{
                  borderRadius: '40px',
                  boxShadow: '0 25px 80px -20px rgba(45, 90, 61, 0.4), 0 10px 30px -10px rgba(0,0,0,0.2)'
                }}
              >
                <img
                  src="/assets/logos/mirembe-muse-logo.png"
                  alt="Mirembe Muse Logo"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating accent elements */}
              <div className="absolute -top-12 right-0 w-16 h-16 bg-gradient-to-br from-[#2D5A3D] to-[#4A7C5F] rounded-full opacity-60 animate-bounce" 
                   style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
              <div className="absolute bottom-20 -left-8 w-8 h-8 bg-[#C1292E]/70 rounded-full animate-bounce" 
                   style={{ animationDuration: '2.5s' }} />
            </div>

            {/* Right: Editorial Text */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <div className="inline-block mb-6">
                <span className="text-[#2D5A3D] text-sm font-medium tracking-[0.3em] uppercase">
                  African Botanical Wellness
                </span>
                <div className="w-full h-px bg-gradient-to-r from-[#2D5A3D] via-[#8B9A7D] to-transparent mt-2" />
              </div>

              <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-[#0A1128] mb-6 leading-[0.95]">
                Mirembe
                <span className="block text-[#2D5A3D]">Muse</span>
              </h1>

              <p className="text-xl md:text-2xl text-[#0A1128]/70 font-light leading-relaxed mb-8 max-w-xl">
                Where ancient African botanicals meet modern wellness. 
                A celebration of heritage, healing, and holistic beauty.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <div className="px-8 py-4 bg-[#2D5A3D] text-white rounded-full font-medium inline-flex items-center justify-center gap-2 hover:bg-[#1E3F2A] transition-all hover:scale-105 cursor-pointer">
                  <span>Coming February 2026</span>
                  <span className="w-2 h-2 bg-white/60 rounded-full animate-pulse" />
                </div>
                <a 
                  href="https://mirembemuse.co.za" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border-2 border-[#2D5A3D] text-[#2D5A3D] rounded-full font-medium hover:bg-[#2D5A3D] hover:text-white transition-all inline-flex items-center justify-center"
                >
                  MirembeMuse.co.za
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator - hidden on mobile to avoid overlap with logo */}
        <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[#2D5A3D]/60">
          <span className="text-xs tracking-widest uppercase">Discover</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#2D5A3D]/60 to-transparent animate-pulse" />
        </div>
      </section>

      {/* The Story Section - Magazine Editorial */}
      <section className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-6 mb-16">
            <div className="w-20 h-px bg-[#2D5A3D]" />
            <span className="text-[#2D5A3D] text-sm font-medium tracking-[0.2em] uppercase">The Story</span>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Large Quote - Magazine Pull Quote Style */}
            <div className="lg:col-span-5 relative">
              <div 
                className="bg-gradient-to-br from-[#2D5A3D] to-[#1E3F2A] p-10 md:p-14 text-white relative overflow-hidden"
                style={{ borderRadius: '100px 30px 100px 30px' }}
              >
                {/* Decorative botanical silhouette */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative z-10">
                  <span className="font-display text-8xl text-white/20 absolute -top-4 -left-2">"</span>
                  <blockquote className="font-display text-2xl md:text-3xl font-medium leading-relaxed relative z-10 pt-8">
                    Mirembe means peace in Luganda. Muse is the spark of inspiration. 
                    Together, they represent wellness that begins within.
                  </blockquote>
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <span className="text-white/80 text-sm tracking-wide">— The Philosophy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Text - Editorial Column */}
            <div className="lg:col-span-7 space-y-8">
              <p className="text-xl md:text-2xl text-[#0A1128] font-display leading-relaxed">
                Born from the intersection of African heritage and modern entrepreneurship, 
                Mirembe Muse is more than a wellness brand,it's a movement.
              </p>

              <div className="space-y-6 text-[#0A1128]/70 leading-relaxed text-lg">
                <p>
                  Africa has always held the secrets to wellness in its botanicals - Nigella Sativa, Hibiscus, 
                  Jamaican Black Castor, Shea Butter, Moringa and so much more. For generations, these ingredients have nourished communities. 
                  Mirembe Muse brings this wisdom to the world, packaged with intention and backed by 
                  the precision of modern formulation.
                </p>
                <p>
                  As a creative technologist building this brand, I'm merging two worlds: the 
                  artisanal craft of wellness product development and the digital sophistication 
                  of e-commerce. Every product tells a story. Every purchase supports a vision 
                  of African innovation leading the global wellness conversation.
                </p>
              </div>

              {/* Signature element */}
              <div className="flex items-center gap-4 pt-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#E8DCC4] to-[#D4C5A9] rounded-full flex items-center justify-center">
                  <span className="font-display text-2xl text-[#0A1128]">N</span>
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-[#0A1128]">Nanda Regine</p>
                  <p className="text-sm text-[#0A1128]/60">Founder & Creative Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Verticals - Magazine Feature Cards */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-transparent via-[#E8DCC4]/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <span className="text-[#2D5A3D] text-sm font-medium tracking-[0.3em] uppercase">Three Pillars</span>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-[#0A1128] mt-4 mb-6">
              A Multi-Vertical <span className="text-[#2D5A3D]">Empire</span>
            </h2>
            <p className="text-xl text-[#0A1128]/60 max-w-2xl mx-auto">
              Wellness products, digital services, and creative education...three streams, one vision.
            </p>
          </div>

          {/* Overlapping Editorial Cards */}
          <div className="relative">
            {/* Card 1 - Wellness Products */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12 lg:mb-0">
              <div 
                className="bg-white p-10 md:p-14 shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500"
                style={{ borderRadius: '80px 20px 80px 20px' }}
              >
                {/* Decorative corner blob */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-[#D4E7D4] to-[#A8C5A8] rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#2D5A3D] to-[#4A7C5F] rounded-[30%_70%_70%_30%/30%_30%_70%_70%] flex items-center justify-center mb-8">
                    <span className="text-4xl">🌿</span>
                  </div>
                  
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-[#0A1128] mb-4">
                    Wellness Products
                  </h3>
                  
                  <p className="text-[#0A1128]/70 text-lg leading-relaxed mb-6">
                    African botanical haircare and wellness essentials. Thoughtfully formulated, 
                    sustainably sourced, beautifully packaged.
                  </p>

                  <div className="space-y-3">
                    {['Botanical Haircare Line', 'Wellness Essentials', 'Gift Collections', 'B2B Wholesale'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-[#2D5A3D]">
                        <div className="w-2 h-2 bg-[#2D5A3D] rounded-full" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spacer for stagger effect */}
              <div className="hidden lg:block" />
            </div>

            {/* Card 2 - Digital Services (Offset) */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12 lg:mb-0 lg:-mt-32">
              <div className="hidden lg:block" />
              
              <div 
                className="bg-[#0A1128] p-10 md:p-14 shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500"
                style={{ borderRadius: '20px 80px 20px 80px' }}
              >
                {/* Decorative corner blob */}
                <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-tr from-[#C1292E]/30 to-[#E8DCC4]/20 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#C1292E] to-[#9B1F23] rounded-[70%_30%_30%_70%/30%_70%_30%_70%] flex items-center justify-center mb-8">
                    <span className="text-4xl">💻</span>
                  </div>
                  
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-[#E8DCC4] mb-4">
                    Digital Services
                  </h3>
                  
                  <p className="text-[#E8DCC4]/70 text-lg leading-relaxed mb-6">
                    Full-stack development, Notion architecture, and AI integration 
                    for businesses ready to scale with intention.
                  </p>

                  <div className="space-y-3">
                    {['Web Applications', 'Notion Systems', 'AI-Powered Solutions', 'Technical Consulting'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-[#C1292E]">
                        <div className="w-2 h-2 bg-[#C1292E] rounded-full" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - Creative Studio (Offset other direction) */}
            <div className="grid lg:grid-cols-2 gap-8 lg:-mt-32">
              <div 
                className="bg-gradient-to-br from-[#E8DCC4] to-[#D4C5A9] p-10 md:p-14 shadow-xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-500"
                style={{ borderRadius: '80px 80px 20px 20px' }}
              >
                {/* Decorative corner blob */}
                <div className="absolute -top-16 -left-16 w-48 h-48 bg-gradient-to-br from-white/50 to-white/20 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-500" />
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#0A1128] to-[#1E2749] rounded-[50%_50%_50%_50%/60%_60%_40%_40%] flex items-center justify-center mb-8">
                    <span className="text-4xl">✨</span>
                  </div>
                  
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-[#0A1128] mb-4">
                    Creative Studio
                  </h3>
                  
                  <p className="text-[#0A1128]/70 text-lg leading-relaxed mb-6">
                    Templates, courses, and mentorship designed to empower the next generation 
                    of African creators and entrepreneurs.
                  </p>

                  <div className="space-y-3">
                    {['Notion Templates', 'Digital Courses', 'Mentorship Programs', 'Community Building'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-[#0A1128]">
                        <div className="w-2 h-2 bg-[#0A1128] rounded-full" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section - Full Width Magazine Spread */}
      <section className="relative py-32 px-6 bg-[#0A1128] overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2D5A3D] to-transparent" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyIvPjwvZz48L3N2Zz4=')] opacity-50" />
        
        {/* Floating botanical accents */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-[#2D5A3D]/20 rounded-full blur-2xl" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-[#C1292E]/10 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-[#2D5A3D] text-sm font-medium tracking-[0.3em] uppercase">The Vision</span>
          
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-[#E8DCC4] mt-6 mb-10 leading-tight">
            Building an Empire from <br/>
            <span className="text-[#2D5A3D]">Code, Creativity & Conviction</span>
          </h2>

          <p className="text-xl md:text-2xl text-[#E8DCC4]/70 leading-relaxed max-w-3xl mx-auto mb-12">
            Mirembe Muse isn't just a business, it's proof of what's possible when you merge 
            technical skills with creative vision and strategic execution. This is African 
            innovation, redefined.
          </p>

          {/* Feature highlights in organic shapes */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              { label: 'E-Commerce', icon: '🛒' },
              { label: 'African Botanicals', icon: '🌱' },
              { label: 'Digital Services', icon: '⚡' },
              { label: 'Creative Education', icon: '📚' },
            ].map((item, i) => (
              <div 
                key={i}
                className="px-6 py-3 bg-[#E8DCC4]/10 backdrop-blur rounded-full border border-[#E8DCC4]/20 flex items-center gap-2 hover:bg-[#E8DCC4]/20 transition-colors"
              >
                <span>{item.icon}</span>
                <span className="text-[#E8DCC4] font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon / CTA Section */}
      <section className="relative py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Decorative frame */}
          <div className="relative inline-block">
            <div className="absolute -inset-8 border border-[#2D5A3D]/20 rounded-[60px]" />
            <div className="absolute -inset-4 border border-[#2D5A3D]/10 rounded-[50px]" />
            
            <div className="relative bg-white p-12 md:p-16 rounded-[40px] shadow-2xl">
              <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-[#D4E7D4] to-[#A8C5A8] rounded-full flex items-center justify-center">
                <span className="text-5xl">🌿</span>
              </div>

              <h3 className="font-display text-4xl md:text-5xl font-bold text-[#0A1128] mb-6">
                Launching <span className="text-[#2D5A3D]">February 2026</span>
              </h3>

              <p className="text-xl text-[#0A1128]/70 mb-10 max-w-xl mx-auto">
                Be the first to experience African botanical wellness, reimagined. 
                Join the waitlist for early access and founder's pricing.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://mirembemuse.co.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 bg-[#2D5A3D] text-white rounded-full font-medium hover:bg-[#1E3F2A] transition-all hover:scale-105 hover:shadow-xl inline-flex items-center justify-center gap-2"
                >
                  Visit MirembeMuse.co.za
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a 
                  href="/contact"
                  className="px-10 py-4 border-2 border-[#0A1128] text-[#0A1128] rounded-full font-medium hover:bg-[#0A1128] hover:text-white transition-all inline-flex items-center justify-center"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Accent */}
      <div className="h-2 bg-gradient-to-r from-[#2D5A3D] via-[#C1292E] to-[#E8DCC4]" />
    </div>
  );
}