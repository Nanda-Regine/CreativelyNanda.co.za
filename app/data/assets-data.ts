// assets-data.ts - Complete asset structure with Google Drive videos

export interface MediaAsset {
  id: string;
  type: 'video' | 'image';
  title: string;
  description?: string;
  videoFile?: string;
  coverImage: string;
  category: 'performance' | 'radio-interview' | 'book-launch' | 'creative';
  featured?: boolean;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: 'performance' | 'radio' | 'professional' | 'book-launch';
}

export interface Review {
  id: string;
  image: string;
  source?: string;
  quote?: string;
  date?: string;
}

// ======================
// PERFORMANCE VIDEOS (Google Drive)
// ======================
export const performanceVideos: MediaAsset[] = [
  {
    id: 'poetry-night-perform',
    type: 'video',
    title: 'Poetry Night Performance',
    description: 'Live poetry performance showcasing spoken word artistry',
    videoFile: 'https://drive.google.com/uc?export=download&id=1rM5ZRctQttTxGopEWDTkzsxN--876BBY',
    coverImage: '/assets/performance/poetry-night-perform-vid-cover.jpg',
    category: 'performance',
    featured: true
  },
  {
    id: 'nmb-perform-vid',
    type: 'video',
    title: 'NMB Poetry Performance',
    description: 'Powerful performance at NMB venue',
    videoFile: 'https://drive.google.com/uc?export=download&id=1hQatcwjUYIqDcYynf_oyA8VO-i0PWDRR',
    coverImage: '/assets/performance/nmb-perform-vid-cover.jpg',
    category: 'performance'
  },
  {
    id: 'performance-vid-3',
    type: 'video',
    title: 'Live Poetry Performance',
    description: 'Poetry and storytelling performance',
    videoFile: 'https://drive.google.com/uc?export=download&id=10HvShdmM0GLekvcNFLj3IY-JHtISS9-r',
    coverImage: '/assets/performance/performance-vid-3-cover.jpg',
    category: 'performance'
  }
];

// ======================
// RADIO INTERVIEWS (Google Drive)
// ======================
export const radioInterviews: MediaAsset[] = [
  {
    id: 'madiba-radio-vid',
    type: 'video',
    title: 'Madiba FM Interview',
    description: 'Radio interview discussing poetry, creativity, and business',
    videoFile: 'https://drive.google.com/uc?export=download&id=13jEDG0UZKJuA3NbmMfgi0JRzzDtTIMRU',
    coverImage: '/assets/radio/madiba-radio-vid-cover.jpg',
    category: 'radio-interview',
    featured: true
  },
  {
    id: 'tru-fm-vid',
    type: 'video',
    title: 'TRU FM Interview',
    description: 'In-depth conversation about creative technology and entrepreneurship',
    videoFile: 'https://drive.google.com/uc?export=download&id=1GgGPYiSbFLOHettVbr8GEh9qP_PU2Yn2',
    coverImage: '/assets/radio/tru-fm-vid-cover.jpg',
    category: 'radio-interview',
    featured: true
  }
];

// ======================
// BOOK LAUNCH VIDEOS (Google Drive)
// ======================
export const bookLaunchVideos: MediaAsset[] = [
  {
    id: 'book-launch-vid-2',
    type: 'video',
    title: 'Inside Her Roses - Book Launch',
    description: 'Book launch celebration and reading',
    videoFile: 'https://drive.google.com/uc?export=download&id=1W_Fl3icucStjOQtZJcTFolVrCnl4OXgL',
    coverImage: '/assets/poetry-book/book-picture-2.jpeg',
    category: 'book-launch',
    featured: true
  },
  {
    id: 'book-launch-vid-3',
    type: 'video',
    title: 'Book Launch Highlights',
    description: 'Special moments from the book launch event',
    videoFile: 'https://drive.google.com/uc?export=download&id=1pbXh7u5KXcZoIcytMhRl-8auIhXGAZ8K',
    coverImage: '/assets/poetry-book/book-picture-3.jpeg',
    category: 'book-launch'
  },
  {
    id: 'book-vid',
    type: 'video',
    title: 'Poetry Reading',
    description: 'Reading from Inside Her Roses',
    videoFile: 'https://drive.google.com/uc?export=download&id=1pbXh7u5KXcZoIcytMhRl-8auIhXGAZ8K',
    coverImage: '/assets/poetry-book/book-picture.jpeg',
    category: 'book-launch'
  }
];

// ======================
// CREATIVE/CINEMA (Google Drive)
// ======================
export const creativeVideos: MediaAsset[] = [
  {
    id: 'cinema-vid-garden',
    type: 'video',
    title: 'Garden Cinema',
    description: 'Creative visual storytelling',
    videoFile: 'https://drive.google.com/uc?export=download&id=1ibbHOAYpYjLP5GSwj6Nof281V_9t9JZd',
    coverImage: '/assets/performance/cinema-vid-garden-cover.jpg',
    category: 'creative',
    featured: true
  }
];

// ======================
// GALLERY IMAGES
// ======================
export const galleryImages: GalleryImage[] = [
  {
    id: 'nmb-perform-1',
    src: '/assets/performance/nmb-perform-1.jpg',
    alt: 'NMB Performance moment 1',
    category: 'performance'
  },
  {
    id: 'nmb-perform-2',
    src: '/assets/performance/nmb-perform-2.jpg',
    alt: 'NMB Performance moment 2',
    category: 'performance'
  },
  {
    id: 'madiba-radio-1',
    src: '/assets/radio/madiba-radio-1.jpg',
    alt: 'Madiba FM Radio interview moment 1',
    category: 'radio'
  },
  {
    id: 'madiba-radio-2',
    src: '/assets/radio/madiba-radio-2.jpg',
    alt: 'Madiba FM Radio interview moment 2',
    category: 'radio'
  },
  {
    id: 'madiba-radio-3',
    src: '/assets/radio/madiba-radio-3.jpg',
    alt: 'Madiba FM Radio interview moment 3',
    category: 'radio'
  },
  {
    id: 'nanda-pic-1',
    src: '/assets/professional/nanda-pic-1.png',
    alt: 'Nanda professional portrait - cutout',
    category: 'professional'
  },
  {
    id: 'nanda-pic-2',
    src: '/assets/professional/nanda-pic-2.png',
    alt: 'Nanda professional portrait 2',
    category: 'professional'
  },
  {
    id: 'nanda-pic-3',
    src: '/assets/professional/nanda-pic-3.png',
    alt: 'Nanda professional portrait 3',
    category: 'professional'
  },
  {
    id: 'nanda-pic-4',
    src: '/assets/professional/nanda-pic-4.png',
    alt: 'Nanda professional portrait 4',
    category: 'professional'
  },
  {
    id: 'book-picture',
    src: '/assets/poetry-book/book-picture.jpeg',
    alt: 'Inside Her Roses book cover',
    category: 'book-launch'
  },
  {
    id: 'book-picture-2',
    src: '/assets/poetry-book/book-picture-2.jpeg',
    alt: 'Book launch event moment',
    category: 'book-launch'
  },
  {
    id: 'book-picture-3',
    src: '/assets/poetry-book/book-picture-3.jpeg',
    alt: 'Book launch celebration',
    category: 'book-launch'
  }
];

// ======================
// REVIEWS (ALL 10)
// ======================
export const reviews: Review[] = [
  {
    id: 'review-1',
    image: '/assets/reviews/review-1.jpg',
    source: 'Literary Review',
    quote: 'A powerful voice in contemporary South African poetry',
    date: '2024'
  },
  {
    id: 'review-2',
    image: '/assets/reviews/review-2.jpg',
    source: 'Tech Magazine',
    quote: 'Bridging creativity and technology with elegance',
    date: '2024'
  },
  {
    id: 'review-3',
    image: '/assets/reviews/review-3.jpg',
    source: 'Business Press',
    quote: 'An innovative approach to digital entrepreneurship',
    date: '2024'
  },
  {
    id: 'review-4',
    image: '/assets/reviews/review-4.jpg',
    source: 'Arts & Culture',
    quote: 'Compelling storytelling through multiple mediums',
    date: '2024'
  },
  {
    id: 'review-5',
    image: '/assets/reviews/review-5.jpg',
    source: 'Creative Industry',
    quote: 'Setting new standards for creative technologists',
    date: '2024'
  },
  {
    id: 'review-6',
    image: '/assets/reviews/review-6.jpg',
    source: 'Innovation Weekly',
    quote: 'A unique blend of technical skill and artistic vision',
    date: '2024'
  },
  {
    id: 'review-7',
    image: '/assets/reviews/review-7.jpg',
    source: 'Digital Creators',
    quote: 'Pioneering work in AI-powered creative solutions',
    date: '2024'
  },
  {
    id: 'review-8',
    image: '/assets/reviews/review-8.jpg',
    source: 'Poetry Journal',
    quote: 'Inside Her Roses showcases profound emotional depth',
    date: '2024'
  },
  {
    id: 'review-9',
    image: '/assets/reviews/review-9.jpg',
    source: 'Entrepreneurship Today',
    quote: 'Building a multi-faceted creative enterprise with vision',
    date: '2024'
  },
  {
    id: 'review-10',
    image: '/assets/reviews/review-10.jpg',
    source: 'Design Excellence',
    quote: 'Magazine-quality aesthetic meets technical precision',
    date: '2024'
  }
];

// ======================
// COMBINED MEDIA FEEDS
// ======================
export const allMedia: MediaAsset[] = [
  ...performanceVideos,
  ...radioInterviews,
  ...bookLaunchVideos,
  ...creativeVideos
];

export const allPoetryMedia: MediaAsset[] = [
  ...performanceVideos,
  ...bookLaunchVideos,
  ...creativeVideos
];

// ======================
// HELPER FUNCTIONS
// ======================
export const getMediaByCategory = (category: MediaAsset['category']): MediaAsset[] => {
  return allMedia.filter(item => item.category === category);
};

export const getFeaturedMedia = (): MediaAsset[] => {
  return allMedia.filter(item => item.featured);
};

export const getMediaById = (id: string): MediaAsset | undefined => {
  return allMedia.find(item => item.id === id);
};

export const getPerformanceGallery = (): GalleryImage[] => {
  return galleryImages.filter(img => img.category === 'performance');
};

export const getRadioGallery = (): GalleryImage[] => {
  return galleryImages.filter(img => img.category === 'radio');
};

export const getBookLaunchGallery = (): GalleryImage[] => {
  return galleryImages.filter(img => img.category === 'book-launch');
};

export const getProfessionalPhotos = (): GalleryImage[] => {
  return galleryImages.filter(img => img.category === 'professional');
};