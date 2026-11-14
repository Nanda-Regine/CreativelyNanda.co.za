/** /forge/cases - cover of the Evidence Wing. Public and indexed (14 Nov 2026). */
import Link from 'next/link';
import { createMetadata } from '@/lib/seo';
import { CASE_LIST } from '@/lib/data/evidence/cases';
import Stock from '@/components/ui/Stock';

export const metadata = createMetadata({
  title: 'Case files',
  description: 'Case files with the evidence behind each product.',
  path: '/forge/cases',
});

export default function CasesPage() {
  return (
    <main>
      <Stock paper="parchment" texture={false} className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.25em]" style={{ color: 'var(--gold-ink)' }}>
            The Forge / Case files
          </p>
          <h1 className="font-display mt-4 text-5xl md:text-6xl">Receipts, not promises.</h1>
          <ul className="mt-10 space-y-6">
            {CASE_LIST.map((c) => (
              <li key={c.app}>
                <Link href={`/forge/cases/${c.app}`} className="font-display inline-flex min-h-[44px] items-center text-3xl underline underline-offset-4">
                  {c.name}
                </Link>
                <p className="mt-1 max-w-xl">{c.promise}</p>
              </li>
            ))}
          </ul>
        </div>
      </Stock>
    </main>
  );
}
