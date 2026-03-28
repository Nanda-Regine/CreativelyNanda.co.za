import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Poetry - Inside Her Roses',
  description: 'Inside Her Roses - a poetry collection by Nanda Regine exploring love, identity, healing, and Black womanhood. Published author featured on Gqeberha: The Empire.',
  path: '/poetry',
  keywords: ['poetry', 'Inside Her Roses', 'Nanda Regine', 'South African poetry', 'published poet'],
});

export default function PoetryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
