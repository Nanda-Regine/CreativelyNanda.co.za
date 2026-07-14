// Nanda's spoken-word / live performance archive.
// Single source of truth for the poetry landing and the Spoken Word stage.

export interface Performance {
  id: string;
  title: string;
  cover: string;
  embedUrl: string;
  note?: string; // optional caption / where it was performed
}

export const PERFORMANCES: Performance[] = [
  {
    id: 'nmb-perform',
    title: 'NMB Performance',
    cover: '/assets/performance/nmb-perform-vid-cover.jpg',
    embedUrl: 'https://drive.google.com/file/d/1hQatcwjUYIqDcYynf_oyA8VO-i0PWDRR/preview',
    note: 'Live in Nelson Mandela Bay',
  },
  {
    id: 'poetry-night',
    title: 'Poetry Night',
    cover: '/assets/performance/poetry-night-perform-vid-cover.jpg',
    embedUrl: 'https://drive.google.com/file/d/1rM5ZRctQttTxGopEWDTkzsxN--876BBY/preview',
    note: 'An evening of open-mic verse',
  },
  {
    id: 'performance-3',
    title: 'Spoken Word',
    cover: '/assets/performance/performance-vid-3-cover.jpg',
    embedUrl: 'https://drive.google.com/file/d/10HvShdmM0GLekvcNFLj3IY-JHtISS9-r/preview',
    note: 'The voice, unaccompanied',
  },
  {
    id: 'cinema-garden',
    title: 'Garden Cinema',
    cover: '/assets/performance/cinema-vid-garden-cover.jpg',
    embedUrl: 'https://drive.google.com/file/d/1ibbHOAYpYjLP5GSwj6Nof281V_9t9JZd/preview',
    note: 'Poetry, filmed among the green',
  },
];

// Performance stills — the Xhosa-beadwork stage photography.
export const PERFORMANCE_STILLS: { src: string; alt: string }[] = [
  { src: '/assets/performance/nmb-perform-1.jpg', alt: 'Nanda performing spoken word in Xhosa beadwork' },
  { src: '/assets/performance/nmb-perform-2.jpg', alt: 'Nanda mid-performance, arms raised' },
];
