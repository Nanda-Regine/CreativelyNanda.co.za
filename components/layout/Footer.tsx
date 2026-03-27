'use client';
import Link from 'next/link';
import { Linkedin, Github, Twitter, Instagram, Mail, Star } from 'lucide-react';
import { PWAInstallButton } from '@/components/ui';

// Replace with actual Mirembe Muse Google Business review URL
const GOOGLE_REVIEW_URL =
  'https://g.page/r/REPLACE_WITH_YOUR_GOOGLE_BUSINESS_PLACE_ID/review';

const SOCIALS = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/nandawula-kabali-kagwa-584bb0262/', icon: Linkedin },
  { name: 'GitHub', href: 'https://github.com/Nanda-Regine', icon: Github },
  { name: 'Twitter/X', href: 'https://x.com/CreativelyNanda', icon: Twitter },
  { name: 'Instagram', href: 'https://www.instagram.com/nanda.regine/', icon: Instagram },
  { name: 'Email', href: 'mailto:hello@creativelynanda.co.za', icon: Mail },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-beige py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-3xl font-bold text-cherry">Nanda</h3>
            <p className="text-beige/70 text-sm">
              Creative Technologist building at the intersection of code, design, and storytelling.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl font-bold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-beige/70 hover:text-cherry transition-colors">About</Link></li>
              <li><Link href="/projects" className="text-beige/70 hover:text-cherry transition-colors">Projects</Link></li>
              <li><Link href="/work" className="text-beige/70 hover:text-cherry transition-colors">Work Experience</Link></li>
              <li><Link href="/poetry" className="text-beige/70 hover:text-cherry transition-colors">Poetry</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-xl font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/projects" className="text-beige/70 hover:text-cherry transition-colors">Web Development</Link></li>
              <li><Link href="/notion" className="text-beige/70 hover:text-cherry transition-colors">Notion Systems</Link></li>
              <li><Link href="/mirembe" className="text-beige/70 hover:text-cherry transition-colors">Mirembe Muse</Link></li>
              <li><Link href="/contact" className="text-beige/70 hover:text-cherry transition-colors">Get in Touch</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display text-xl font-bold mb-4">Connect</h4>
            <ul className="space-y-3 text-sm">
              {SOCIALS.map(({ name, href, icon: Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target={name === 'Email' ? undefined : '_blank'}
                    rel={name === 'Email' ? undefined : 'noopener noreferrer'}
                    className="inline-flex items-center gap-2 text-beige/70 hover:text-cherry transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cherry/50 rounded"
                  >
                    <Icon className="w-4 h-4" />
                    {name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Google Review CTA */}
            <div className="mt-4 pt-4 border-t border-beige/10">
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-beige/60 hover:text-cherry transition-colors text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-cherry/50 rounded"
              >
                <Star className="w-4 h-4" />
                Leave a Google Review
              </a>
            </div>

            {/* PWA Install Button */}
            <div className="mt-3">
              <PWAInstallButton variant="footer" />
            </div>
          </div>
        </div>

        {/* Payment Methods Row */}
        <div className="border-t border-beige/10 pt-8 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="text-beige/40 text-xs uppercase tracking-wider shrink-0">We accept</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1.5 bg-[#0079C1]/15 text-[#6ec6f5] text-xs font-semibold rounded-full border border-[#0079C1]/20">
              PayFast · ZAR
            </span>
            <span className="px-3 py-1.5 bg-[#00B9FF]/15 text-[#7de8ff] text-xs font-semibold rounded-full border border-[#00B9FF]/20">
              Wise · USD · EUR · GBP · KES
            </span>
            <span className="text-beige/30 text-xs">EFT · Credit Card · SnapScan</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-beige/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-beige/60 text-sm">
            © {currentYear} Nanda. Built with React, Next.js &amp; creativity.
          </p>

          <div className="flex items-center gap-4">
            {/* Social icons row */}
            <div className="flex gap-3">
              {SOCIALS.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target={name === 'Email' ? undefined : '_blank'}
                  rel={name === 'Email' ? undefined : 'noopener noreferrer'}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-beige/10 text-beige/60 hover:bg-cherry hover:text-white transition-all"
                  aria-label={name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <span className="text-beige/20">|</span>

            <div className="flex gap-6 text-sm">
              <Link href="/legal/privacy" className="text-beige/60 hover:text-cherry transition-colors">
                Privacy
              </Link>
              <Link href="/legal/terms" className="text-beige/60 hover:text-cherry transition-colors">
                Terms
              </Link>
              <Link href="/legal/returns" className="text-beige/60 hover:text-cherry transition-colors">
                Refunds
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
