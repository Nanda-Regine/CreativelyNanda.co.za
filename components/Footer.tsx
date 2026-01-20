'use client';
import Link from 'next/link';

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
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-beige/70 hover:text-cherry transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-beige/70 hover:text-cherry transition-colors">GitHub</a></li>
              <li><a href="#" className="text-beige/70 hover:text-cherry transition-colors">Twitter/X</a></li>
              <li><a href="mailto:hello@creativelynanda.co.za" className="text-beige/70 hover:text-cherry transition-colors">Email</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-beige/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-beige/60 text-sm">
            © {currentYear} Nanda. Built with React, Next.js & creativity.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/contact" className="text-beige/60 hover:text-cherry transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="text-beige/60 hover:text-cherry transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}