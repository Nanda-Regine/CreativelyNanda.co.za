import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPoemBySlug } from '@/lib/poems-data';
import ReadingRoom from '@/components/room/ReadingRoom';

// The Reading Room is an immersive experience layered on top of the plain,
// SEO-indexed poem page at /poetry/collection/[slug]. We point the canonical
// back there and keep the room itself out of the index (no duplicate content).

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const poem = getPoemBySlug(params.slug);
  if (!poem) return { title: 'The Reading Room · Inside Her Roses' };
  return {
    title: `${poem.title} — The Reading Room · Nanda Regine`,
    description: poem.excerpt,
    robots: { index: false, follow: true },
    alternates: { canonical: `/poetry/collection/${poem.slug}` },
  };
}

export default function RoomPage({ params }: { params: { slug: string } }) {
  const poem = getPoemBySlug(params.slug);
  if (!poem) notFound();
  return <ReadingRoom poem={poem} />;
}
