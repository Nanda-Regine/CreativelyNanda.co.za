'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const PRIMARY = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/roots', label: 'Roots' },
  { href: '/gallery', label: 'Gallery' },
];

const POETRY = [
  { href: '/poetry/collection', label: 'The Collection', hint: 'Inside Her Roses' },
  { href: '/poetry/stage', label: 'The Stage', hint: 'Spoken word' },
  { href: '/poetry/poet-who-codes', label: 'The Poet Who Codes', hint: 'Two tongues' },
  { href: '/poetry/games', label: 'Poetry Games', hint: 'The play room' },
  { href: '/poetry/community', label: 'The Circle', hint: 'Write with us' },
  { href: '/poetry/my-garden', label: 'My Garden', hint: 'Your kept lines' },
  { href: '/poetry/lineage', label: 'The Lineage Room', hint: 'Where I come from' },
];

const AFTER = [
  { href: '/blog', label: 'Writing' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);        // mobile drawer
  const [poetryOpen, setPoetryOpen] = useState(false);   // desktop dropdown
  const [mPoetry, setMPoetry] = useState(false);  // mobile poetry accordion

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const active = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0A0F2C]/98 py-3 shadow-lg backdrop-blur-md' : 'bg-[#0A0F2C]/90 py-5 backdrop-blur-sm'}`}
      style={{ borderBottom: '1px solid rgba(201,148,58,0.14)' }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-display text-2xl md:text-3xl font-bold tracking-wide text-[#F5F0E8] transition-colors hover:text-[#C9943A]">
          Nandawula
        </Link>

        {/* ── desktop ── */}
        <div className="hidden items-center gap-7 lg:flex">
          {PRIMARY.map((l) => (
            <NavLink key={l.href} href={l.href} label={l.label} active={active(l.href)} />
          ))}

          {/* Poetry dropdown */}
          <div className="relative" onMouseEnter={() => setPoetryOpen(true)} onMouseLeave={() => setPoetryOpen(false)}>
            <Link href="/poetry" className={`flex items-center gap-1 text-sm font-medium transition-colors ${active('/poetry') ? 'text-[#C9943A]' : 'text-[#F5F0E8] hover:text-[#C9943A]'}`}>
              Poetry
              <span className={`text-[9px] transition-transform ${poetryOpen ? 'rotate-180' : ''}`}>▾</span>
            </Link>
            {poetryOpen && (
              <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-4">
                <div className="overflow-hidden rounded-xl border border-[#C9943A]/25 bg-[#0A0F2C]/98 p-2 shadow-2xl backdrop-blur-md">
                  {POETRY.map((p) => (
                    <Link key={p.href} href={p.href} onClick={() => setPoetryOpen(false)}
                      className="flex flex-col rounded-lg px-4 py-2.5 transition-colors hover:bg-white/5">
                      <span className="font-display text-base italic text-[#F5F0E8]">{p.label}</span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#C9943A]">{p.hint}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {AFTER.map((l) => (
            <NavLink key={l.href} href={l.href} label={l.label} active={active(l.href)} />
          ))}

          <a href="https://mirembemuse.co.za" target="_blank" rel="noopener noreferrer"
            className="rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:scale-105"
            style={{ background: '#C9943A', color: '#0A0F2C' }}>
            Mirembe Muse ↗
          </a>
        </div>

        {/* mobile button */}
        <button onClick={() => setOpen(!open)} className="text-[#F5F0E8] transition-colors hover:text-[#C9943A] lg:hidden" aria-label="Toggle menu">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* ── mobile drawer ── */}
      {open && <div className="fixed inset-0 z-[60] bg-black/60 lg:hidden" onClick={() => setOpen(false)} />}
      <div className={`fixed bottom-0 left-0 top-0 z-[70] w-[300px] transform shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${open ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ background: '#0A0F2C', height: '100dvh' }}>
        <div className="flex h-full flex-col overflow-y-auto px-5 py-5">
          <div className="mb-6 flex items-center justify-between border-b pb-4" style={{ borderColor: 'rgba(245,240,232,0.1)' }}>
            <span className="font-display text-2xl font-bold text-[#F5F0E8]">Nandawula</span>
            <button onClick={() => setOpen(false)} className="p-1 text-[#F5F0E8]" aria-label="Close">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <MobileGroup label="The Person" links={[{ href: '/', label: 'Home' }, { href: '/about', label: 'About' }, { href: '/roots', label: 'Roots & Lineage' }, { href: '/contact', label: 'Contact' }]} pathname={pathname} onNav={() => setOpen(false)} />
          <MobileGroup label="The Art" links={[{ href: '/gallery', label: 'Gallery' }, { href: '/blog', label: 'Writing' }]} pathname={pathname} onNav={() => setOpen(false)} />

          {/* poetry accordion */}
          <div className="mb-5">
            <button onClick={() => setMPoetry(!mPoetry)} className="flex w-full items-center justify-between px-2">
              <span className="font-mono text-[10px] font-semibold tracking-widest text-[#C9943A]">THE POETRY WORLD</span>
              <span className={`text-[10px] text-[#C9943A] transition-transform ${mPoetry ? 'rotate-180' : ''}`}>▾</span>
            </button>
            <div className={`space-y-0.5 overflow-hidden transition-all ${mPoetry ? 'mt-2 max-h-[420px]' : 'max-h-0'}`}>
              <Link href="/poetry" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-[15px] font-medium text-[#F5F0E8]">Enter the collection</Link>
              {POETRY.map((p) => (
                <Link key={p.href} href={p.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-[14px] text-[#F5F0E8]/80">{p.label}</Link>
              ))}
            </div>
          </div>

          <div className="mt-auto border-t pt-4" style={{ borderColor: 'rgba(245,240,232,0.1)' }}>
            <p className="mb-2 px-1 text-[10px] tracking-widest" style={{ color: 'rgba(245,240,232,0.4)' }}>FOR BUSINESS & TECH</p>
            <a href="https://mirembemuse.co.za" target="_blank" rel="noopener noreferrer" className="block w-full rounded-full py-3 text-center text-sm font-semibold transition-all hover:opacity-90" style={{ background: '#C9943A', color: '#0A0F2C' }}>
              Visit Mirembe Muse ↗
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link href={href} className={`group relative text-sm font-medium transition-colors ${active ? 'text-[#C9943A]' : 'text-[#F5F0E8] hover:text-[#C9943A]'}`}>
      {label}
      <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#C9943A] transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
    </Link>
  );
}

function MobileGroup({ label, links, pathname, onNav }: {
  label: string; links: { href: string; label: string }[]; pathname: string; onNav: () => void;
}) {
  return (
    <div className="mb-5">
      <p className="mb-2 px-2 font-mono text-[10px] font-semibold tracking-widest text-[#C9943A]">{label.toUpperCase()}</p>
      <div className="space-y-0.5">
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={onNav}
            className="block rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors"
            style={{ color: pathname === l.href ? '#C9943A' : '#F5F0E8', background: pathname === l.href ? 'rgba(201,148,58,0.1)' : 'transparent' }}>
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
