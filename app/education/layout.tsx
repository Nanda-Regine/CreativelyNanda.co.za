import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Education',
  description: 'Academic background - Advanced Diploma in Business Management with Distinction from Nelson Mandela University. 15 academic distinctions and technical certifications.',
  path: '/education',
  keywords: ['education', 'Nelson Mandela University', 'business management', 'certifications', 'SheCodes'],
});

export default function EducationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
