import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Contact Nandawula Regine — Poetry, Bookings & Collaboration',
  description:
    'Get in touch with Nandawula Regine Kabali-Kagwa — South African poet, performer and AI engineer from KuGompo City. For poetry and performances, collaborations, speaking invitations, press, or business enquiries via Mirembe Muse.',
  path: '/contact',
  keywords: [
    'contact Nandawula Regine', 'book a poet South Africa', 'spoken word booking Eastern Cape',
    'hire poet performer', 'poetry collaboration South Africa', 'speaking invitation poet',
    'KuGompo City South Africa poet', 'creativelynanda contact', 'Mirembe Muse contact',
    'African poet booking', 'commission a poem',
  ],
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
