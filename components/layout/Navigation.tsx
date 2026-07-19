'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { CartIcon } from '@/components/cart';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { PWAInstallButton } from '@/components/ui/PWAInstallButton';

// The rooms of the poetry world — surfaced directly in the nav.
const POETRY_ROOMS = [
  { href: '/poetry/collection', label: 'The Garden', hint: 'All the poems' },
  { href: '/poetry/stage', label: 'The Stage', hint: 'The voice behind the verse' },
  { href: '/poetry/lineage', label: 'The Roots', hint: 'Where I come from' },
  { href: '/poetry/poet-who-codes', label: 'The Poet Who Codes', hint: 'Two tongues, one mind' },
  { href: '/poetry/community', label: 'The Circle', hint: 'Write with us' },
  { href: '/poetry/erasure', label: 'The Erasure Studio', hint: 'Carve a poem from a poem' },
  { href: '/poetry/my-garden', label: 'My Garden', hint: 'Your own plot' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => setMobileMenuOpen(false);

  // Flat links (Poetry is rendered separately as a dropdown).
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/blog', label: 'Writing' },
    { href: '/contact', label: 'Contact' },
  ];

  const poetryActive = pathname.startsWith('/poetry');

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-navy/98 backdrop-blur-md py-4 shadow-lg' : 'bg-navy/95 backdrop-blur-sm py-6 shadow-md'
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
          <NavLink href="/" label="Home" pathname={pathname} />
          <NavLink href="/about" label="About" pathname={pathname} />

          {/* Poetry dropdown */}
          <div className="relative group">
            <Link
              href="/poetry"
              className={`inline-flex items-center gap-1 text-sm font-medium transition-all duration-300 relative ${
                poetryActive ? 'text-cherry' : 'text-beige group-hover:text-cherry'
              }`}
            >
              Poetry
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-cherry transition-all duration-300 ${poetryActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>

            {/* dropdown panel (pt-4 keeps a hover bridge) */}
            <div className="absolute left-1/2 top-full -translate-x-1/2 pt-4 opacity-0 invisible translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
              <div className="w-72 rounded-2xl border border-white/10 bg-navy/98 backdrop-blur-md p-2 shadow-2xl">
                {POETRY_ROOMS.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className={`block rounded-xl px-4 py-2.5 transition-colors ${
                      pathname === r.href ? 'bg-cherry/15' : 'hover:bg-white/5'
                    }`}
                  >
                    <span className={`block text-sm font-medium ${pathname === r.href ? 'text-cherry' : 'text-beige'}`}>{r.label}</span>
                    <span className="block text-xs text-beige/45">{r.hint}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <NavLink href="/gallery" label="Gallery" pathname={pathname} />
          <NavLink href="/blog" label="Writing" pathname={pathname} />
          <NavLink href="/contact" label="Contact" pathname={pathname} />

          <CartIcon className="text-beige hover:text-cherry [&_svg]:text-beige [&_svg]:hover:text-cherry" />
          <LanguageSelector />
          <PWAInstallButton variant="compact" />

          <a
            href="https://mirembemuse.co.za"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
            style={{ background: '#C9943A', color: '#0A1128' }}
          >
            Mirembe Muse ↗
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          <CartIcon className="text-beige hover:text-cherry [&_svg]:text-beige [&_svg]:hover:text-cherry" />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-beige hover:text-cherry transition-colors"
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
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/60 z-[60]" onClick={closeMobile} />
      )}

      {/* Mobile Menu - Left Side Drawer */}
      <div
        className={`lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-[#F5F0E8] z-[70] transform transition-transform duration-300 ease-in-out shadow-2xl ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ height: '100vh', minHeight: '100%' }}
      >
        <div className="px-6 py-6 h-full flex flex-col bg-[#F5F0E8]">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#0A1128]/10">
            <span className="font-display text-2xl font-bold text-[#0A1128]">Nanda</span>
            <button onClick={closeMobile} className="text-[#0A1128] hover:text-cherry transition-colors p-1" aria-label="Close menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1 overflow-y-auto flex-1 pb-4">
            <MobileLink href="/" label="Home" pathname={pathname} onClick={closeMobile} />
            <MobileLink href="/about" label="About" pathname={pathname} onClick={closeMobile} />

            {/* Poetry + its rooms */}
            <MobileLink href="/poetry" label="Poetry" pathname={pathname} onClick={closeMobile} />
            <div className="ml-3 mb-1 border-l border-[#0A1128]/10 pl-3">
              {POETRY_ROOMS.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  onClick={closeMobile}
                  className={`block py-2 px-2 text-sm rounded-lg transition-all ${
                    pathname === r.href ? 'text-cherry' : 'text-[#0A1128]/75 hover:text-cherry'
                  }`}
                >
                  {r.label}
                </Link>
              ))}
            </div>

            <MobileLink href="/gallery" label="Gallery" pathname={pathname} onClick={closeMobile} />
            <MobileLink href="/blog" label="Writing" pathname={pathname} onClick={closeMobile} />
            <MobileLink href="/contact" label="Contact" pathname={pathname} onClick={closeMobile} />
          </div>

          {/* Mirembe Muse and Install App - Fixed at bottom */}
          <div className="pt-4 border-t border-[#0A1128]/10 mt-auto space-y-3">
            <PWAInstallButton variant="default" />
            <p className="text-[10px] tracking-widest text-[#0A1128]/40 px-1">FOR BUSINESS &amp; TECH</p>
            <a
              href="https://mirembemuse.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-6 py-4 rounded-full font-semibold transition-all text-center text-lg hover:opacity-90"
              style={{ background: '#C9943A', color: '#0A1128' }}
            >
              Visit Mirembe Muse ↗
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, label, pathname }: { href: string; label: string; pathname: string }) {
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`text-sm font-medium transition-all duration-300 relative group ${active ? 'text-cherry' : 'text-beige hover:text-cherry'}`}
    >
      {label}
      <span className={`absolute -bottom-1 left-0 h-0.5 bg-cherry transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
    </Link>
  );
}

function MobileLink({ href, label, pathname, onClick }: { href: string; label: string; pathname: string; onClick: () => void }) {
  const active = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block py-3 px-3 text-lg font-medium rounded-lg transition-all ${
        active ? 'text-cherry bg-[#0A1128]/5' : 'text-[#0A1128] hover:text-cherry hover:bg-[#0A1128]/5'
      }`}
    >
      {label}
    </Link>
  );
}
