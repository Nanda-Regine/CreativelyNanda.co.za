import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

// The page is a client component, so its metadata lives here. Without it the
// page inherited the root layout's canonical and declared itself a duplicate
// of the homepage.
export const metadata: Metadata = createMetadata({
  title: 'Testimonials · What People Say About Nanda',
  description:
    'LinkedIn recommendations from the people who have worked with Nandawula Regine Kabali-Kagwa, and letters from the readers of her poetry who never met her.',
  path: '/testimonials',
  keywords: ['Nandawula Regine testimonials', 'LinkedIn recommendations', 'Nandawula Kabali-Kagwa', 'reader letters', 'Inside Her Roses readers'],
});

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
