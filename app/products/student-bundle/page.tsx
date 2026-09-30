import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Student Stack Bundle | Mirembe Muse',
  description:
    'Get both the Varsity Academic Excellence Engine and High School Academic Excellence Engine for R420. Save R108.',
  alternates: { canonical: 'https://creativelynanda.co.za/products/student-bundle' },
};

export default function StudentBundle() {
  return (
    // A beige card on a navy page, closing on cherry (the balance rule).
    <main className="min-h-screen">
      <div className="bg-[#0A1128] px-4 pb-20 pt-32 md:px-6">
      <div className="mx-auto max-w-2xl rounded-sm bg-[#FAFAF8] px-6 py-14 text-center shadow-2xl md:px-12">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
          Best Value Bundle
        </p>
        <h1 className="font-display text-5xl font-bold text-[#1A1A1A] mb-4">
          The Student Stack
        </h1>
        <p className="text-[#6B6B6B] text-lg italic mb-8">
          For families with students at both matric and varsity.
        </p>

        <div className="bg-[#F2F0EB] border-2 border-[#C9A84C]/40 rounded-2xl p-8 mb-8 text-left">
          <h2 className="font-display text-xl font-bold text-[#1A1A1A] mb-4">
            What&apos;s included:
          </h2>
          <ul className="space-y-3 mb-6">
            {[
              'Varsity Academic Excellence Engine · R279',
              'High School Academic Excellence Engine · R249',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-[#1A1A1A]">
                <span className="text-[#C9A84C] font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex items-end gap-3 pt-4 border-t border-[#C9A84C]/20">
            <span className="font-display text-5xl font-bold text-[#C4613A]">R420</span>
            <span className="text-[#9B9B9B] line-through text-xl mb-1">R528</span>
            <span className="bg-[#C9A84C] text-[#1A1A1A] text-xs font-bold px-3 py-1 rounded-full ml-auto">
              SAVE R108
            </span>
          </div>
        </div>

        <p className="text-[#6B6B6B] text-sm mb-8 leading-relaxed">
          To purchase the bundle at the discounted rate, buy both templates individually and
          email <a href="mailto:hello@mirembemuse.co.za" className="text-[#C9A84C] hover:underline">hello@mirembemuse.co.za</a>{' '}
          with your order numbers: we&apos;ll refund the difference immediately.
          <br /><br />
          Combined total if bought separately: R528. Bundle price: <strong>R420</strong>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products/varsity-academic-excellence"
            className="px-6 py-3 bg-[#C9A84C] text-[#1A1A1A] rounded-lg font-semibold hover:bg-[#C9A84C]/90 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
          >
            Buy Varsity Engine, R279
          </Link>
          <Link
            href="/products/high-school-academic-excellence"
            className="px-6 py-3 border border-[#C9A84C]/40 text-[#1A1A1A] rounded-lg font-semibold hover:border-[#C9A84C] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
          >
            Buy High School Engine · R249
          </Link>
        </div>
      </div>
      </div>
      <div className="bg-[#7A1236] px-6 py-16 text-center">
        <p className="font-display text-xl italic text-[#FAEEF0]">Every template, one shop.</p>
        <Link href="/products" className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.3em] text-[#F2C77A] hover:opacity-70">
          See them all &rarr;
        </Link>
      </div>
    </main>
  );
}
