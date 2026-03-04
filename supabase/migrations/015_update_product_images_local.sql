-- Migration 015: Update product image URLs to local /assets/products/ paths
-- Images are now served directly from Next.js public/ folder, no Supabase Storage needed

UPDATE products SET
  thumbnail = '/assets/products/writers-sanctuary/cover.png',
  images = ARRAY[
    '/assets/products/writers-sanctuary/cover.png',
    '/assets/products/writers-sanctuary/screenshot-1.png',
    '/assets/products/writers-sanctuary/screenshot-2.png',
    '/assets/products/writers-sanctuary/screenshot-3.png',
    '/assets/products/writers-sanctuary/screenshot-4.png',
    '/assets/products/writers-sanctuary/screenshot-5.png',
    '/assets/products/writers-sanctuary/screenshot-6.png'
  ],
  updated_at = NOW()
WHERE slug = 'writers-sanctuary';

UPDATE products SET
  thumbnail = '/assets/products/creators-studio/cover.png',
  images = ARRAY[
    '/assets/products/creators-studio/cover.png',
    '/assets/products/creators-studio/screenshot-1.png',
    '/assets/products/creators-studio/screenshot-2.png',
    '/assets/products/creators-studio/screenshot-3.png',
    '/assets/products/creators-studio/screenshot-4.png',
    '/assets/products/creators-studio/screenshot-5.png',
    '/assets/products/creators-studio/screenshot-6.png',
    '/assets/products/creators-studio/screenshot-7.png',
    '/assets/products/creators-studio/screenshot-8.png'
  ],
  updated_at = NOW()
WHERE slug = 'creators-studio';

UPDATE products SET
  thumbnail = '/assets/products/music-artist/cover.png',
  images = ARRAY[
    '/assets/products/music-artist/cover.png',
    '/assets/products/music-artist/screenshot-1.png',
    '/assets/products/music-artist/screenshot-2.png',
    '/assets/products/music-artist/screenshot-3.png',
    '/assets/products/music-artist/screenshot-4.png',
    '/assets/products/music-artist/screenshot-5.png',
    '/assets/products/music-artist/screenshot-6.png',
    '/assets/products/music-artist/screenshot-7.png',
    '/assets/products/music-artist/screenshot-8.png',
    '/assets/products/music-artist/screenshot-9.png',
    '/assets/products/music-artist/screenshot-10.png',
    '/assets/products/music-artist/screenshot-11.png'
  ],
  updated_at = NOW()
WHERE slug = 'music-artist-career-command-center';

UPDATE products SET
  thumbnail = '/assets/products/high-school/cover.png',
  images = ARRAY[
    '/assets/products/high-school/cover.png',
    '/assets/products/high-school/screenshot-1.png',
    '/assets/products/high-school/screenshot-2.png',
    '/assets/products/high-school/screenshot-3.png',
    '/assets/products/high-school/screenshot-4.png',
    '/assets/products/high-school/screenshot-5.png',
    '/assets/products/high-school/screenshot-6.png',
    '/assets/products/high-school/screenshot-7.png',
    '/assets/products/high-school/screenshot-8.png',
    '/assets/products/high-school/screenshot-9.png',
    '/assets/products/high-school/screenshot-10.png',
    '/assets/products/high-school/screenshot-11.png',
    '/assets/products/high-school/screenshot-12.png'
  ],
  updated_at = NOW()
WHERE slug = 'high-school-academic-excellence';

UPDATE products SET
  thumbnail = '/assets/products/varsity/cover.png',
  images = ARRAY[
    '/assets/products/varsity/cover.png',
    '/assets/products/varsity/screenshot-1.png',
    '/assets/products/varsity/screenshot-2.png',
    '/assets/products/varsity/screenshot-3.png',
    '/assets/products/varsity/screenshot-4.png',
    '/assets/products/varsity/screenshot-5.png',
    '/assets/products/varsity/screenshot-6.png',
    '/assets/products/varsity/screenshot-7.png',
    '/assets/products/varsity/screenshot-8.png',
    '/assets/products/varsity/screenshot-9.png',
    '/assets/products/varsity/screenshot-10.png',
    '/assets/products/varsity/screenshot-11.png'
  ],
  updated_at = NOW()
WHERE slug = 'varsity-academic-excellence';

UPDATE products SET
  thumbnail = '/assets/products/sme/cover.png',
  images = ARRAY[
    '/assets/products/sme/cover.png',
    '/assets/products/sme/screenshot-1.png',
    '/assets/products/sme/screenshot-2.png',
    '/assets/products/sme/screenshot-3.png',
    '/assets/products/sme/screenshot-4.png',
    '/assets/products/sme/screenshot-5.png',
    '/assets/products/sme/screenshot-6.png'
  ],
  updated_at = NOW()
WHERE slug = 'sme-command-center';
