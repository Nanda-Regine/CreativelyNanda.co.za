'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/work', label: 'Work' },
    { href: '/education', label: 'Education' },
    { href: '/notion', label: 'Notion' },
    { href: '/mirembe', label: 'Mirembe' },
    { href: '/poetry', label: 'Poetry' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-navy/95 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link 
          href="/" 
          className="font-display text-2xl md:text-3xl font-bold text-beige hover:text-cherry transition-colors"
        >
          Nanda
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-8 items-center">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-all duration-300 relative group ${
                pathname === link.href ? 'text-cherry' : 'text-beige hover:text-cherry'
              }`}
            >
              {link.label}
              <span 
                className={`absolute -bottom-1 left-0 h-0.5 bg-cherry transition-all duration-300 ${
                  pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} 
              />
            </Link>
          ))}
          
          <a 
            href="/assets/work/Nanda-cv.pdf"
            download="Nanda-CV.pdf"
            className="px-5 py-2.5 bg-cherry text-white rounded-full text-sm font-medium hover:bg-cherry-dark transition-all hover:scale-105"
          >
            Download CV
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-beige hover:text-cherry transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-navy/98 backdrop-blur-md border-t border-beige/10">
          <div className="px-6 py-8 space-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-lg font-medium transition-colors ${
                  pathname === link.href ? 'text-cherry' : 'text-beige hover:text-cherry'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
             <a href="/assets/work/Nanda-cv.pdf"
              download="Nanda-CV.pdf"
              className="block w-full text-center px-5 py-3 bg-cherry text-white rounded-full font-medium hover:bg-cherry-dark transition-all mt-6"
            >
              Download CV
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}