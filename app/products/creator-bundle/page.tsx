import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "The Creator Stack Bundle | Mirembe Muse",
  description:
    "Get The Writer's Sanctuary and The Creator's Studio for R549. Save R149.",
};

export default function CreatorBundle() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-4">
          Best Value Bundle
        </p>
        <h1 className="font-display text-5xl font-bold text-[#1A1A1A] mb-4">
          The Creator Stack
        </h1>
        <p className="text-[#6B6B6B] text-lg italic mb-8">
          For content creators building a writing or creator business.
        </p>

        <div className="bg-[#F2F0EB] border-2 border-[#C9A84C]/40 rounded-2xl p-8 mb-8 text-left">
          <h2 className="font-display text-xl font-bold text-[#1A1A1A] mb-4">
            What&apos;s included:
          </h2>
          <ul className="space-y-3 mb-6">
            {[
              "The Writer's Sanctuary — R299",
              "The Creator's Studio — R399",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 text-[#1A1A1A]">
                <span className="text-[#C9A84C] font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex items-end gap-3 pt-4 border-t border-[#C9A84C]/20">
            <span className="font-display text-5xl font-bold text-[#C4613A]">R549</span>
            <span className="text-[#9B9B9B] line-through text-xl mb-1">R698</span>
            <span className="bg-[#C9A84C] text-[#1A1A1A] text-xs font-bold px-3 py-1 rounded-full ml-auto">
              SAVE R149
            </span>
          </div>
        </div>

        <p className="text-[#6B6B6B] text-sm mb-8 leading-relaxed">
          To purchase the bundle at the discounted rate, buy both templates individually and
          email <a href="mailto:hello@mirembemuse.co.za" className="text-[#C9A84C] hover:underline">hello@mirembemuse.co.za</a>{' '}
          with your order numbers — we&apos;ll refund the difference immediately.
          <br /><br />
          Combined total if bought separately: R698. Bundle price: <strong>R549</strong>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products/writers-sanctuary"
            className="px-6 py-3 bg-[#C9A84C] text-[#1A1A1A] rounded-lg font-semibold hover:bg-[#C9A84C]/90 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
          >
            Buy Writer&apos;s Sanctuary — R299
          </Link>
          <Link
            href="/products/creators-studio"
            className="px-6 py-3 border border-[#C9A84C]/40 text-[#1A1A1A] rounded-lg font-semibold hover:border-[#C9A84C] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]"
          >
            Buy Creator&apos;s Studio — R399
          </Link>
        </div>
      </div>
    </main>
  );
}
