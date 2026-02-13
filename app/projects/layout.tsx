import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Projects',
  description: 'Featured projects and technical case studies - full-stack applications, AI integrations, Notion systems, and digital experiences built with intention.',
  path: '/projects',
  keywords: ['projects', 'portfolio', 'full-stack', 'Next.js', 'React', 'AI', 'web development'],
});

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
