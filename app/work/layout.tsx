import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Work Experience',
  description: 'Professional journey from retail leadership to creative technology - team management, event coordination, restaurant operations, and full-stack development.',
  path: '/work',
  keywords: ['work experience', 'career', 'team management', 'full-stack developer', 'South Africa'],
});

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
