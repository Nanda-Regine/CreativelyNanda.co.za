import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPoemBySlug } from '@/lib/poems-data';
import ReadingRoom from '@/components/room/ReadingRoom';

// The Reading Room is an immersive experience layered on top of the plain
// poem page at /poetry/collection/[slug]. It is crawlable and indexable, and its
// canonical points back to the poem, so search engines fold the two into one
// result instead of seeing duplicate content. (Until 2026-09-29 it was also
// noindex, which with a canonical sends mixed signals.)

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const poem = getPoemBySlug(params.slug);
  if (!poem) return { title: 'The Reading Room · Inside Her Roses' };
  return {
    title: `${poem.title} · The Reading Room · Nanda Regine`,
    description: poem.excerpt,
    alternates: { canonical: `https://creativelynanda.co.za/poetry/collection/${poem.slug}` },
  };
}

export default function RoomPage({ params }: { params: { slug: string } }) {
  const poem = getPoemBySlug(params.slug);
  if (!poem) notFound();
  return <ReadingRoom poem={poem} />;
}
