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
  { href: '/roots', label: 'Roots', hint: 'Three nations, nine generations' },
  { href: '/education', label: 'Education', hint: '15 distinctions' },
];

// The Forge — the engineering wing, sibling to Poetry. Only built rooms are
// listed; the rest live in docs/THE_FORGE.md until their routes exist. A nav
// entry pointing at an unbuilt room is a 404 with good intentions.
const FORGE_ROOMS: Item[] = [
  { href: '/forge', label: 'Enter the Forge', hint: 'The workshop' },
  { href: '/forge/origins', label: 'Where It Started', hint: 'The nine foundation projects' },
  { href: '/forge/floor', label: 'The Workshop Floor', hint: 'Every build, one dossier each' },
  { href: '/forge/scars', label: 'The Scar Room', hint: 'What broke, and why it was allowed to' },
  { href: '/forge/nights', label: 'The Long Night', hint: 'The diary, night by night' },
  { href: '/forge/commits', label: 'The Commit Wall', hint: 'A year of commits, as sentences' },
  { href: '/engineer', label: 'The Making', hint: 'Zero to eight apps in a year' },
  { href: '/poetry/poet-who-codes', label: 'The Poet Who Codes', hint: 'Two tongues, one mind' },
];

const POETRY_ROOMS: Item[] = [
  { href: '/poetry', label: 'Enter the World', hint: 'The poetry home' },
  { href: '/poetry/collection', label: 'The Garden', hint: 'All the poems' },
  { href: '/poetry/wall', label: 'The Wall', hint: 'Poems, page by page' },
  { href: '/poetry/stage', label: 'The Stage', hint: 'The voice behind the verse' },
  { href: '/poetry/lineage', label: 'The Lineage Room', hint: 'The soil the poems grew from' },
  { href: '/poetry/poet-who-codes', label: 'The Poet Who Codes', hint: 'Two tongues, one mind' },
  { href: '/poetry/games', label: 'Poetry Games', hint: 'The play room' },
  { href: '/poetry/community', label: 'The Circle', hint: 'Write with us' },
  { href: '/poetry/my-garden', label: 'My Garden', hint: 'Your own plot' },
];

// Everything else the studio makes and sells. Folding Gallery/Writing/Contact
// in here is what pays for the fourth dropdown — the bar carries fewer top-level
// items than it did before The Forge existed, not more.
const STUDIO: Item[] = [
  { href: '/gallery', label: 'Gallery', hint: 'The visual work' },
  { href: '/blog', label: 'Writing', hint: 'Essays and articles' },
  { href: '/products', label: 'Marketplace', hint: 'Notion templates' },
  { href: '/testimonials', label: 'Testimonials', hint: 'What people say' },
  { href: '/contact', label: 'Contact', hint: 'Reach her' },
];

const GROUPS = [
  { label: 'Story', href: '/about', items: STORY },
  { label: 'Poetry', href: '/poetry', items: POETRY_ROOMS },
  { label: 'The Forge', href: '/forge', items: FORGE_ROOMS },
  { label: 'Studio', href: '/gallery', items: STUDIO },
];

// The shipped products, hanging off the Mirembe Muse button — the business side
// of the split. External domains, so these are <a> not <Link>, and each opens in
// a new tab: a visitor sent to VarsityOS should not lose the room they were in.
// All four verified 200 on 2026-08-08. Re-check before adding a fifth; a dead
// app link on the nav bar is the most expensive dead link on the site.
type AppLink = { href: string; label: string; hint: string };

const MIREMBE_APPS: AppLink[] = [
  { href: 'https://mirembemuse.co.za', label: 'Mirembe Muse', hint: 'The studio — business & tech' },
  { href: 'https://varsityos.co.za', label: 'VarsityOS', hint: 'The student operating system' },
  { href: 'https://k53drillmaster.co.za', label: 'K53 Drill Master', hint: 'Learner licence, drilled' },
  { href: 'https://sanyubotanicals.co.za', label: 'Sanyu Botanicals', hint: 'Skin, made deliberately' },
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

          <CartIcon className="text-beige hover:text-cherry [&_svg]:text-beige [&_svg]:hover:text-cherry" />
          <LanguageSelector />
          <PWAInstallButton variant="compact" />

          {/* The gold button keeps its job — one click still lands on Mirembe
              Muse. Hovering reveals the apps underneath it rather than adding a
              fifth item to an already-wide bar. */}
          <div
            className="relative"
            onMouseEnter={() => setOpenGroup('Mirembe')}
            onMouseLeave={() => setOpenGroup(null)}
          >
            <a
              href="https://mirembemuse.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
              style={{ background: '#C9943A', color: '#0A1128' }}
            >
              Mirembe Muse ↗
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-300 ${openGroup === 'Mirembe' ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>

            {openGroup === 'Mirembe' && (
              <div className="absolute right-0 top-full pt-4">
                <div className="w-72 rounded-2xl border border-white/10 bg-navy/98 backdrop-blur-md p-2 shadow-2xl">
                  <p className="px-4 pb-1.5 pt-2 text-[10px] tracking-widest text-beige/40">THE APPS</p>
                  {MIREMBE_APPS.map((a) => (
                    <a
                      key={a.href}
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpenGroup(null)}
                      className="block rounded-xl px-4 py-2.5 transition-colors hover:bg-white/5"
                    >
                      <span className="block text-sm font-medium text-beige">
                        {a.label} <span className="text-beige/40">↗</span>
                      </span>
                      <span className="block text-xs text-beige/45">{a.hint}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
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

          </div>

          <div className="pt-4 border-t border-[#0A1128]/10 mt-auto space-y-3">
            <PWAInstallButton variant="default" />
            <p className="text-[10px] tracking-widest text-[#0A1128]/40 px-1">FOR BUSINESS &amp; TECH</p>

            {/* The apps, listed rather than hidden behind a hover — there is no
                hover on a phone. Mirembe Muse keeps the gold button below. */}
            <div className="space-y-0.5">
              {MIREMBE_APPS.filter((a) => a.href !== 'https://mirembemuse.co.za').map((a) => (
                <a
                  key={a.href}
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobile}
                  className="block rounded-lg px-2 py-2 text-sm text-[#0A1128]/75 transition-colors hover:text-cherry"
                >
                  {a.label} <span className="text-[#0A1128]/35">↗</span>
                </a>
              ))}
            </div>

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
