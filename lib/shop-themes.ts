// Shop Category Theme System
// Premium digital magazine aesthetics for the marketplace

export const shopCategoryThemes = {
  student: {
    name: 'Student Life',
    bg: 'from-[#E8DCC4] to-[#F5EFE6]',
    bgDark: 'from-[#0A1128] to-[#1a2744]',
    bgMagazine: 'from-[#0A1128] via-[#1a2744] to-[#0A1128]',
    text: 'text-[#0A1128]',
    textLight: 'text-white/80',
    accent: 'bg-[#C1292E]',
    accentHover: 'hover:bg-[#a01020]',
    gradient: 'from-[#C1292E] to-[#a01020]',
    gradientText: 'from-[#C1292E] to-[#a01020]',
    border: 'border-[#C1292E]/20',
    ring: 'ring-[#C1292E]/20',
    icon: 'GraduationCap',
    emoji: '🎓',
    pattern: 'student',
    description: 'Templates and tools for academic success',
  },
  business: {
    name: 'Business',
    bg: 'from-[#E8DCC4] to-[#F5EFE6]',
    bgDark: 'from-[#0A1128] to-[#1a2744]',
    bgMagazine: 'from-[#0A1128] via-[#1a2744] to-[#0A1128]',
    text: 'text-[#0A1128]',
    textLight: 'text-white/80',
    accent: 'bg-[#C1292E]',
    accentHover: 'hover:bg-[#a01020]',
    gradient: 'from-[#C1292E] to-[#a01020]',
    gradientText: 'from-[#C1292E] to-[#a01020]',
    border: 'border-[#C1292E]/20',
    ring: 'ring-[#C1292E]/20',
    icon: 'Briefcase',
    emoji: '💼',
    pattern: 'business',
    description: 'Professional tools for entrepreneurs',
  },
  creative: {
    name: 'Creative',
    bg: 'from-[#E8DCC4] to-[#F5EFE6]',
    bgDark: 'from-[#0A1128] to-[#1a2744]',
    bgMagazine: 'from-[#0A1128] via-[#1a2744] to-[#0A1128]',
    text: 'text-[#0A1128]',
    textLight: 'text-white/80',
    accent: 'bg-[#C1292E]',
    accentHover: 'hover:bg-[#a01020]',
    gradient: 'from-[#C1292E] to-[#a01020]',
    gradientText: 'from-[#C1292E] to-[#a01020]',
    border: 'border-[#C1292E]/20',
    ring: 'ring-[#C1292E]/20',
    icon: 'Palette',
    emoji: '🎨',
    pattern: 'creative',
    description: 'Artistic tools for creators and poets',
  },
  wellness: {
    name: 'Wellness',
    bg: 'from-[#E8DCC4] to-[#F5EFE6]',
    bgDark: 'from-[#0A1128] to-[#1a2744]',
    bgMagazine: 'from-[#0A1128] via-[#1a2744] to-[#0A1128]',
    text: 'text-[#0A1128]',
    textLight: 'text-white/80',
    accent: 'bg-[#C1292E]',
    accentHover: 'hover:bg-[#a01020]',
    gradient: 'from-[#C1292E] to-[#a01020]',
    gradientText: 'from-[#C1292E] to-[#a01020]',
    border: 'border-[#C1292E]/20',
    ring: 'ring-[#C1292E]/20',
    icon: 'Heart',
    emoji: '♥',
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
