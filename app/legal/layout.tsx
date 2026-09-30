import type { Metadata } from 'next';
import Link from 'next/link';
import Stock from '@/components/ui/Stock';

export const metadata: Metadata = {
  robots: { index: true, follow: true },
};

// The legal pages are one long document, so the balance rule (navy, beige and
// cherry in equal measure) is met by the frame: the document is a beige sheet
// laid on a two-tone desk, navy above and cherry below, closing on navy.
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* A two-tone desk: navy above, cherry below, the sheet across both. */}
      <Stock paper="navy" texture={false} className="-mt-20 px-3 pb-16 pt-28 md:px-6 md:pb-24" style={{ background: 'linear-gradient(180deg, #0A1128 0%, #0A1128 50%, #7A1236 50%, #7A1236 100%)' }}>
        <div className="mx-auto max-w-4xl rounded-sm bg-[#F5F1E8] shadow-2xl">{children}</div>
      </Stock>
      <Stock paper="navy" className="px-6 py-16">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4">
          <p className="t-ink font-display text-xl italic">A question about any of this?</p>
          <Link href="/contact" className="t-gold font-mono text-[11px] uppercase tracking-[0.3em] hover:opacity-70">
            Write to Nanda &rarr;
          </Link>
        </div>
      </Stock>
    </>
  );
}
