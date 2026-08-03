'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { CartIcon } from '@/components/cart';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { PWAInstallButton } from '@/components/ui/PWAInstallButton';

// Every real CreativelyNanda page, grouped. (Business/tech pages — /projects,
// /ai-engineer, /consulting, /press, /work, /mirembe — 301-redirect to
// mirembemuse.co.za, so they live behind the "Mirembe Muse ↗" button, not here.)
type Item = { href: string; label: string; hint: string };

const STORY: Item[] = [
  { href: '/about', label: 'About', hint: 'The woman' },
  { href: '/engineer', label: 'The Engineer', hint: 'The making of' },
  { href: '/roots', label: 'Roots & Lineage', hint: 'Where I come from' },
  { href: '/education', label: 'Education', hint: '15 distinctions' },
];

const POETRY_ROOMS: Item[] = [
  { href: '/poetry', label: 'Enter the World', hint: 'The poetry home' },
  { href: '/poetry/collection', label: 'The Garden', hint: 'All the poems' },
  { href: '/poetry/wall', label: 'The Wall', hint: 'Poems, page by page' },
  { href: '/poetry/stage', label: 'The Stage', hint: 'The voice behind the verse' },
  { href: '/poetry/lineage', label: 'The Lineage Room', hint: 'Where I come from' },
  { href: '/poetry/poet-who-codes', label: 'The Poet Who Codes', hint: 'Two tongues, one mind' },
  { href: '/poetry/games', label: 'Poetry Games', hint: 'The play room' },
  { href: '/poetry/community', label: 'The Circle', hint: 'Write with us' },
  { href: '/poetry/my-garden', label: 'My Garden', hint: 'Your own plot' },
];

const SHOP: Item[] = [
  { href: '/products', label: 'Marketplace', hint: 'Notion templates' },
  { href: '/testimonials', label: 'Testimonials', hint: 'What people say' },
];

const GROUPS = [
  { label: 'Story', href: '/about', items: STORY },
  { label: 'Poetry', href: '/poetry', items: POETRY_ROOMS },
  { label: 'Shop', href: '/products', items: SHOP },
];

const SIMPLE: Item[] = [
  { href: '/gallery', label: 'Gallery', hint: '' },
  { href: '/blog', label: 'Writing', hint: '' },
  { href: '/contact', label: 'Contact', hint: '' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mGroup, setMGroup] = useState<string | null>('Poetry');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => setMobileMenuOpen(false);
  const groupActive = (g: (typeof GROUPS)[number]) =>
    g.items.some((i) => pathname === i.href) || (g.href !== '/' && pathname.startsWith(g.href));

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
        <div className="hidden lg:flex gap-6 items-center xl:gap-7">
          <NavLink href="/" label="Home" pathname={pathname} />

          {GROUPS.map((g) => (
            <div
              key={g.label}
              className="relative"
              onMouseEnter={() => setOpenGroup(g.label)}
              onMouseLeave={() => setOpenGroup(null)}
            >
              <Link
                href={g.href}
                className={`inline-flex items-center gap-1 text-sm font-medium transition-all duration-300 relative ${
                  groupActive(g) ? 'text-cherry' : 'text-beige hover:text-cherry'
                }`}
              >
                {g.label}
                <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${openGroup === g.label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-cherry transition-all duration-300 ${groupActive(g) ? 'w-full' : 'w-0'}`} />
              </Link>

              {openGroup === g.label && (
                <div className="absolute left-1/2 top-full -translate-x-1/2 pt-4">
                  <div className="w-72 rounded-2xl border border-white/10 bg-navy/98 backdrop-blur-md p-2 shadow-2xl">
                    {g.items.map((r) => (
                      <Link
                        key={r.href}
                        href={r.href}
                        onClick={() => setOpenGroup(null)}
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
              )}
            </div>
          ))}

          {SIMPLE.map((l) => (
            <NavLink key={l.href} href={l.href} label={l.label} pathname={pathname} />
          ))}

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
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#0A1128]/10">
            <span className="font-display text-2xl font-bold text-[#0A1128]">Nanda</span>
            <button onClick={closeMobile} className="text-[#0A1128] hover:text-cherry transition-colors p-1" aria-label="Close menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-1 overflow-y-auto flex-1 pb-4">
            <MobileLink href="/" label="Home" pathname={pathname} onClick={closeMobile} />

            {GROUPS.map((g) => (
              <div key={g.label} className="mb-1">
                <button
                  onClick={() => setMGroup(mGroup === g.label ? null : g.label)}
                  className="flex w-full items-center justify-between py-3 px-3 text-lg font-medium rounded-lg text-[#0A1128]"
                >
                  {g.label}
                  <svg className={`w-4 h-4 text-cherry transition-transform ${mGroup === g.label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`ml-3 border-l border-[#0A1128]/10 pl-3 overflow-hidden transition-all ${mGroup === g.label ? 'max-h-[560px]' : 'max-h-0'}`}>
                  {g.items.map((r) => (
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
              </div>
            ))}

            {SIMPLE.map((l) => (
              <MobileLink key={l.href} href={l.href} label={l.label} pathname={pathname} onClick={closeMobile} />
            ))}
          </div>

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
