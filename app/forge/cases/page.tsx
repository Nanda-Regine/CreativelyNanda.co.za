/** /forge/cases - cover of the Evidence Wing. Public and indexed (14 Nov 2026). */
import Link from 'next/link';
import { createMetadata } from '@/lib/seo';
import { CASE_LIST } from '@/lib/data/evidence/cases';
import Stock, { rhythm } from '@/components/ui/Stock';

export const metadata = createMetadata({
  title: 'Case files',
  description: 'Case files with the evidence behind each product.',
  path: '/forge/cases',
});

export default function CasesPage() {
  return (
    <main>
      <Stock paper="parchment" texture={false} className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.25em] t-gold">The Forge / Case files</p>
          <h1 className="font-display mt-4 text-5xl md:text-6xl t-head">Receipts, not promises.</h1>
          <p className="mt-5 max-w-xl text-lg t-ink">One case file per product: the screens, the decisions and the proof, with dates.</p>
        </div>
      </Stock>
      {CASE_LIST.map((c, i) => (
        <Stock key={c.app} paper={rhythm(i + 1)} texture={false} className="px-6 py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <Link href={`/forge/cases/${c.app}`} prefetch={false} className="font-display inline-flex min-h-[44px] items-center text-3xl underline underline-offset-4 md:text-4xl t-head">
              {c.name}
            </Link>
            <p className="mt-2 max-w-xl t-ink">{c.promise}</p>
          </div>
        </Stock>
      ))}
    </main>
  );
}
