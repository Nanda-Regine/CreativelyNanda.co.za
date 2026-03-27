import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Contact | Nandawula Regine — AI Engineer & Creative Technologist',
  description:
    'Get in touch with Nandawula Regine for consulting engagements, AI integration projects, speaking invitations, and press inquiries. Based in East London, South Africa. Available globally.',
  path: '/contact',
  keywords: [
    'contact Nanda AI engineer',
    'hire AI consultant South Africa',
    'consulting enquiry Africa',
    'speaking invitation tech Africa',
    'press inquiry creative technologist',
    'AI integration project South Africa',
    'Nandawula Regine contact',
    'Mirembe Muse contact',
  ],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
