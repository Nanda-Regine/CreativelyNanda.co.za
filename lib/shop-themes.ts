// Shop Category Theme System
// Premium digital magazine aesthetics for the marketplace

export const shopCategoryThemes = {
  student: {
    name: 'Student Life',
    bg: 'from-amber-50 to-orange-100',
    bgDark: 'from-amber-900 via-orange-800 to-red-900',
    bgMagazine: 'from-amber-500 via-orange-500 to-red-500',
    text: 'text-amber-700',
    textLight: 'text-amber-300',
    accent: 'bg-amber-500',
    accentHover: 'hover:bg-amber-600',
    gradient: 'from-amber-500 to-orange-500',
    gradientText: 'from-amber-400 to-orange-400',
    border: 'border-amber-200',
    ring: 'ring-amber-500/20',
    icon: 'GraduationCap',
    emoji: '🎓',
    pattern: 'student',
    description: 'Templates and tools for academic success',
  },
  business: {
    name: 'Business',
    bg: 'from-emerald-50 to-teal-100',
    bgDark: 'from-emerald-900 via-teal-800 to-cyan-900',
    bgMagazine: 'from-emerald-500 via-teal-500 to-cyan-500',
    text: 'text-emerald-700',
    textLight: 'text-emerald-300',
    accent: 'bg-emerald-500',
    accentHover: 'hover:bg-emerald-600',
    gradient: 'from-emerald-500 to-teal-500',
    gradientText: 'from-emerald-400 to-teal-400',
    border: 'border-emerald-200',
    ring: 'ring-emerald-500/20',
    icon: 'Briefcase',
    emoji: '💼',
    pattern: 'business',
    description: 'Professional tools for entrepreneurs',
  },
  creative: {
    name: 'Creative',
    bg: 'from-pink-50 to-rose-100',
    bgDark: 'from-pink-900 via-rose-800 to-purple-900',
    bgMagazine: 'from-pink-500 via-rose-500 to-purple-500',
    text: 'text-pink-700',
    textLight: 'text-pink-300',
    accent: 'bg-pink-500',
    accentHover: 'hover:bg-pink-600',
    gradient: 'from-pink-500 to-purple-500',
    gradientText: 'from-pink-400 to-purple-400',
    border: 'border-pink-200',
    ring: 'ring-pink-500/20',
    icon: 'Palette',
    emoji: '🎨',
    pattern: 'creative',
    description: 'Artistic tools for creators and poets',
  },
  wellness: {
    name: 'Wellness',
    bg: 'from-violet-50 to-indigo-100',
    bgDark: 'from-violet-900 via-indigo-800 to-blue-900',
    bgMagazine: 'from-violet-500 via-indigo-500 to-blue-500',
    text: 'text-violet-700',
    textLight: 'text-violet-300',
    accent: 'bg-violet-500',
    accentHover: 'hover:bg-violet-600',
    gradient: 'from-violet-500 to-indigo-500',
    gradientText: 'from-violet-400 to-indigo-400',
    border: 'border-violet-200',
    ring: 'ring-violet-500/20',
    icon: 'Heart',
    emoji: '💜',
    pattern: 'wellness',
    description: 'Self-care and mindfulness resources',
  },
} as const;

export type ShopCategory = keyof typeof shopCategoryThemes;

export function getShopTheme(category: string) {
  const normalizedCategory = category.toLowerCase() as ShopCategory;
  return shopCategoryThemes[normalizedCategory] || shopCategoryThemes.business;
}

// Magazine-style decorative shapes for product covers
export const productShapes = [
  'M20,50 Q35,30 50,50 T80,50 T110,50 L110,100 L0,100 Z',
  'M0,60 C20,40 40,80 60,60 S100,40 120,60 L120,100 L0,100 Z',
  'M0,70 Q30,50 60,70 T120,70 L120,100 L0,100 Z',
  'M10,50 C30,30 50,70 70,50 C90,30 110,70 130,50 L130,100 L0,100 Z',
];

export function getProductShape(index: number) {
  return productShapes[index % productShapes.length];
}

// Organic border radius for magazine cards
export const magazineProductRadius = [
  '40px 12px 40px 12px',
  '12px 40px 12px 40px',
  '32px 16px 32px 16px',
  '16px 32px 16px 32px',
  '48px 8px 48px 8px',
];

export function getProductRadius(index: number) {
  return magazineProductRadius[index % magazineProductRadius.length];
}
