// Blog Category Theme System
// Following the RoseCard pattern from poetry collection

export const blogCategoryThemes = {
  dev: {
    name: 'Development',
    bg: 'from-blue-50 to-cyan-100',
    bgDark: 'from-blue-900 via-blue-800 to-cyan-900',
    text: 'text-blue-700',
    textLight: 'text-blue-400',
    accent: 'bg-blue-500',
    accentHover: 'hover:bg-blue-600',
    gradient: 'from-blue-500 to-cyan-500',
    gradientText: 'from-blue-400 to-cyan-400',
    border: 'border-blue-200',
    ring: 'ring-blue-500/20',
    icon: 'Code',
    emoji: '💻',
    description: 'Deep dives into code, tech tutorials, and developer insights',
  },
  writing: {
    name: 'Writing & Poetry',
    bg: 'from-purple-50 to-violet-100',
    bgDark: 'from-purple-900 via-purple-800 to-pink-900',
    text: 'text-purple-700',
    textLight: 'text-purple-400',
    accent: 'bg-purple-500',
    accentHover: 'hover:bg-purple-600',
    gradient: 'from-purple-500 to-pink-500',
    gradientText: 'from-purple-400 to-pink-400',
    border: 'border-purple-200',
    ring: 'ring-purple-500/20',
    icon: 'Feather',
    emoji: '✨',
    description: 'Creative writing, poetry craft, and literary explorations',
  },
  business: {
    name: 'Business & Growth',
    bg: 'from-emerald-50 to-teal-100',
    bgDark: 'from-emerald-900 via-emerald-800 to-teal-900',
    text: 'text-emerald-700',
    textLight: 'text-emerald-400',
    accent: 'bg-emerald-500',
    accentHover: 'hover:bg-emerald-600',
    gradient: 'from-emerald-500 to-teal-500',
    gradientText: 'from-emerald-400 to-teal-400',
    border: 'border-emerald-200',
    ring: 'ring-emerald-500/20',
    icon: 'TrendingUp',
    emoji: '📈',
    description: 'Entrepreneurship, digital products, and career wisdom',
  },
} as const;

export type BlogCategory = keyof typeof blogCategoryThemes;

export function getCategoryTheme(category: string) {
  return blogCategoryThemes[category as BlogCategory] || blogCategoryThemes.dev;
}

// Organic border radius patterns (alternating for visual interest)
export const organicBorderRadius = [
  '60% 40% 55% 45% / 55% 60% 40% 45%',
  '47% 53% 43% 57% / 54% 46% 54% 46%',
  '40% 60% 50% 50% / 50% 40% 60% 50%',
  '55% 45% 60% 40% / 45% 55% 45% 55%',
];

export function getOrganicRadius(index: number) {
  return organicBorderRadius[index % organicBorderRadius.length];
}

// Magazine-style card border radius (alternating corners)
export const magazineCardRadius = [
  '32px 8px 32px 8px',
  '8px 32px 8px 32px',
  '24px 12px 24px 12px',
  '12px 24px 12px 24px',
];

export function getMagazineRadius(index: number) {
  return magazineCardRadius[index % magazineCardRadius.length];
}
