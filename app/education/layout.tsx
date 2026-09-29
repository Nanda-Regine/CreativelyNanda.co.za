import type { Metadata } from 'next';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Education',
  description: 'Three Nelson Mandela University qualifications in Business Management (NQF 5–7, 15 distinctions) and every certificate since (SheCodes, Great Learning, Canva Design School) each shown in full and verifiable. Learning drawn against a year of shipping code.',
  path: '/education',
  keywords: ['education', 'Nelson Mandela University', 'business management', 'Advanced Diploma NQF 7', '15 distinctions', 'certifications', 'SheCodes', 'SheCodes Plus', 'Great Learning', 'Master Generative AI', 'Canva Design School', 'verified certificates', 'Nandawula Kabali-Kagwa', 'Nandawula Regine', 'honours hall'],
});

export default function EducationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
