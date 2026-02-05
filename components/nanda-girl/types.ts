export type NandaGirlContext =
  | 'home'
  | 'about'
  | 'projects'
  | 'poetry'
  | 'work'
  | 'education'
  | 'mirembe'
  | 'notion'
  | 'contact'
  | 'default';

export interface NandaGirlImage {
  src: string;
  alt: string;
}

export const contextImages: Record<NandaGirlContext, NandaGirlImage> = {
  home: {
    src: '/assets/nanda-girl/navy-suit-transparent.png',
    alt: 'Nanda in navy suit',
  },
  about: {
    src: '/assets/nanda-girl/beige-suit-transparent.png',
    alt: 'Nanda in beige suit',
  },
  projects: {
    src: '/assets/nanda-girl/working-desk-transparent.png',
    alt: 'Nanda at her desk',
  },
  poetry: {
    src: '/assets/nanda-girl/pink-suit.png',
    alt: 'Nanda in pink suit',
  },
  work: {
    src: '/assets/nanda-girl/grey-suit-transparent.png',
    alt: 'Nanda in grey suit',
  },
  education: {
    src: '/assets/nanda-girl/smart-casual-transparent.png',
    alt: 'Nanda in smart casual',
  },
  mirembe: {
    src: '/assets/nanda-girl/smart-casual-transparent.png',
    alt: 'Nanda in smart casual',
  },
  notion: {
    src: '/assets/nanda-girl/working-desk-transparent.png',
    alt: 'Nanda at her desk',
  },
  contact: {
    src: '/assets/nanda-girl/speaking-mic-transparent.png',
    alt: 'Nanda with microphone',
  },
  default: {
    src: '/assets/nanda-girl/navy-suit-transparent.png',
    alt: 'Nanda',
  },
};

export function getContextFromPath(pathname: string): NandaGirlContext {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/about')) return 'about';
  if (pathname.startsWith('/projects')) return 'projects';
  if (pathname.startsWith('/poetry')) return 'poetry';
  if (pathname.startsWith('/work')) return 'work';
  if (pathname.startsWith('/education')) return 'education';
  if (pathname.startsWith('/mirembe')) return 'mirembe';
  if (pathname.startsWith('/notion')) return 'notion';
  if (pathname.startsWith('/contact')) return 'contact';
  return 'default';
}
