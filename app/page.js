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
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy">
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-cherry/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-beige/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 stagger">
            <h1 className="font-display text-7xl md:text-8xl font-bold text-beige leading-tight text-reveal"
                style={{ '--index': 0 }}>
              Creative<br />
              <span className="text-cherry">Technologist</span>
            </h1>
            
            <p className="text-beige/80 text-lg md:text-xl max-w-lg font-light leading-relaxed text-reveal"
               style={{ '--index': 1 }}>
              Bridging imagination and innovation through code, design, and storytelling.
              Building digital experiences that resonate.
            </p>
            
            <div className="flex gap-4 text-reveal" style={{ '--index': 2 }}>
              <Link 
                href="/projects"
                className="px-8 py-4 bg-cherry text-white rounded-full font-medium hover:bg-cherry-dark transition-all hover:scale-105 hover:shadow-lg"
              >
                View Projects
              </Link>
              <Link 
                href="/about"
                className="px-8 py-4 border-2 border-beige text-beige rounded-full font-medium hover:bg-beige hover:text-navy transition-all"
              >
                About Me
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-cherry/20 to-transparent rounded-3xl backdrop-blur-sm border border-beige/10 flex items-center justify-center text-reveal"
                 style={{ '--index': 3 }}>
              <div className="text-center space-y-4 p-12">
                <div className="text-beige/60 text-sm uppercase tracking-widest font-medium">Portfolio</div>
                <div className="font-display text-6xl font-bold text-beige">2025</div>
                <div className="text-beige/80 text-lg">Creative Works &amp; Systems</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-24 px-6 bg-beige-light">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-5xl font-bold text-navy mb-16 text-center">
            Explore My World
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Projects', desc: 'Digital creations & experiments', href: '/projects', color: 'cherry' },
              { title: 'Notion Systems', desc: 'Productivity & organization', href: '/notion', color: 'navy' },
              { title: 'Poetry & Performance', desc: 'Words that move', href: '/poetry', color: 'cherry' },
              { title: 'Mirembe Muse', desc: 'Creative showcase', href: '/mirembe', color: 'navy' },
              { title: 'Work Experience', desc: 'Professional journey', href: '/work', color: 'cherry' },
              { title: 'Contact', desc: 'Let\'s connect', href: '/contact', color: 'navy' },
            ].map((item, i) => (
              <Link 
                key={item.href}
                href={item.href}
                className="group relative p-8 bg-white rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-${item.color}/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`} />
                
                <div className="relative z-10">
                  <h3 className={`font-display text-3xl font-bold text-${item.color} mb-3 group-hover:scale-105 transition-transform`}>
                    {item.title}
                  </h3>
                  <p className="text-navy/60">{item.desc}</p>
                </div>
                
                <div className={`absolute bottom-4 right-4 text-${item.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}