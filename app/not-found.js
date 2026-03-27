import Link from 'next/link';

export const metadata = {
  title: '404 — Page Not Found | Creatively Nanda',
  description: "This page doesn't exist, but there's plenty more to explore.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Large 404 */}
        <div className="font-display text-[12rem] font-bold leading-none text-cherry/20 select-none">
          404
        </div>

        <h1 className="font-display text-4xl md:text-5xl font-bold text-beige mt-[-2rem] mb-6">
          Lost in the <span className="text-cherry">archive</span>
        </h1>

        <p className="text-beige/60 text-lg mb-12 leading-relaxed">
          This page wandered off. Perhaps it became a poem, or a Notion template —
          either way, it&apos;s not here. Let&apos;s get you somewhere real.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 bg-cherry text-white rounded-xl font-medium hover:bg-cherry/90 transition-all hover:shadow-lg hover:shadow-cherry/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cherry"
          >
            Back to Home
          </Link>
          <Link
            href="/projects"
            className="px-8 py-4 bg-white/10 text-beige rounded-xl font-medium hover:bg-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-beige/40"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 bg-white/10 text-beige rounded-xl font-medium hover:bg-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-beige/40"
          >
            Contact Me
          </Link>
        </div>

        {/* Subtle brand line */}
        <p className="mt-16 text-beige/20 text-sm tracking-widest uppercase">
          Creatively Nanda · Mirembe Muse
        </p>
      </div>
    </div>
  );
}
