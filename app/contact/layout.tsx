import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Contact',
  description: 'Get in touch with Nanda for freelance projects, collaboration, consulting, or custom Notion system design. Based in East London, South Africa.',
  path: '/contact',
  keywords: ['contact', 'freelance', 'consulting', 'hire developer', 'South Africa'],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
