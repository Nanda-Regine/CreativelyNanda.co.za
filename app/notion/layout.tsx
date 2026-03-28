import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Notion Systems',
  description: 'Custom Notion systems and templates that save clients 40-60% admin time. CRMs, financial dashboards, project management hubs, and student planners.',
  path: '/notion',
  keywords: ['Notion templates', 'Notion systems', 'productivity', 'CRM', 'project management', 'South Africa'],
});

export default function NotionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
