-- ============================================================
-- Product Images Update — Mirembe Muse Templates
-- Run in Supabase SQL Editor after uploading images to Storage.
--
-- Assumes images were uploaded to the `product-images` bucket
-- in the folder structure shown below. Adjust folder names
-- if you used different names.
-- ============================================================

-- Base URL: https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/

-- ============================================================
-- 1. WRITER'S SANCTUARY
-- Folder: product-images/writers-sanctuary/
-- ============================================================
UPDATE products SET
  thumbnail = 'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/writers-sanctuary/cover-page.png',
  images = ARRAY[
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/writers-sanctuary/cover-page.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/writers-sanctuary/Screenshot%202026-03-03%20130244.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/writers-sanctuary/Screenshot%202026-03-03%20130614.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/writers-sanctuary/Screenshot%202026-03-03%20131706.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/writers-sanctuary/Screenshot%202026-03-03%20132036.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/writers-sanctuary/Screenshot%202026-03-03%20132755.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/writers-sanctuary/Screenshot%202026-03-03%20133454.png'
  ]
WHERE slug = 'writers-sanctuary';

-- ============================================================
-- 2. CREATOR'S STUDIO
-- Folder: product-images/creators-studio/
-- ============================================================
UPDATE products SET
  thumbnail = 'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/creators-studio/cover-page.png',
  images = ARRAY[
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/creators-studio/cover-page.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/creators-studio/Screenshot%202026-03-03%20091539.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/creators-studio/Screenshot%202026-03-03%20091654.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/creators-studio/Screenshot%202026-03-03%20091937.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/creators-studio/Screenshot%202026-03-03%20092117.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/creators-studio/Screenshot%202026-03-03%20092244.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/creators-studio/Screenshot%202026-03-03%20092400.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/creators-studio/Screenshot%202026-03-03%20092519.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/creators-studio/Screenshot%202026-03-03%20092604.png'
  ]
WHERE slug = 'creators-studio';

-- ============================================================
-- 3. MUSIC ARTIST CAREER COMMAND CENTER
-- Folder: product-images/music-artist/
-- ============================================================
UPDATE products SET
  thumbnail = 'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/music-artist/cover-page.png',
  images = ARRAY[
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/music-artist/cover-page.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/music-artist/Screenshot%202026-03-03%20164146.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/music-artist/Screenshot%202026-03-03%20164230.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/music-artist/Screenshot%202026-03-03%20165033.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/music-artist/Screenshot%202026-03-03%20165055.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/music-artist/Screenshot%202026-03-03%20171354.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/music-artist/Screenshot%202026-03-03%20171514.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/music-artist/Screenshot%202026-03-03%20171547.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/music-artist/Screenshot%202026-03-03%20171625.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/music-artist/Screenshot%202026-03-03%20171651.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/music-artist/Screenshot%202026-03-03%20171722.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/music-artist/Screenshot%202026-03-03%20171746.png'
  ]
WHERE slug = 'music-artist-career-command-center';

-- ============================================================
-- 4. HIGH SCHOOL ACADEMIC EXCELLENCE ENGINE
-- Folder: product-images/high-school/
-- Note: cover file is named cover-photo.png (not cover-page.png)
-- ============================================================
UPDATE products SET
  thumbnail = 'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/high-school/cover-photo.png',
  images = ARRAY[
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/high-school/cover-photo.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/high-school/Screenshot%202026-03-03%20032825.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/high-school/Screenshot%202026-03-03%20032939.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/high-school/Screenshot%202026-03-03%20033025.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/high-school/Screenshot%202026-03-03%20033125.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/high-school/Screenshot%202026-03-03%20033304.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/high-school/Screenshot%202026-03-03%20033401.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/high-school/Screenshot%202026-03-03%20033513.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/high-school/Screenshot%202026-03-03%20033646.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/high-school/Screenshot%202026-03-03%20033739.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/high-school/Screenshot%202026-03-03%20033856.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/high-school/Screenshot%202026-03-03%20034011.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/high-school/Screenshot%202026-03-03%20034120.png'
  ]
WHERE slug = 'high-school-academic-excellence';

-- ============================================================
-- 5. VARSITY ACADEMIC EXCELLENCE ENGINE
-- Folder: product-images/varsity/
-- ============================================================
UPDATE products SET
  thumbnail = 'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/varsity/cover-page.png',
  images = ARRAY[
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/varsity/cover-page.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/varsity/Screenshot%202026-03-03%20011609.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/varsity/Screenshot%202026-03-03%20011634.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/varsity/Screenshot%202026-03-03%20011655.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/varsity/Screenshot%202026-03-03%20011804.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/varsity/Screenshot%202026-03-03%20012018.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/varsity/Screenshot%202026-03-03%20012608.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/varsity/Screenshot%202026-03-03%20013029.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/varsity/Screenshot%202026-03-03%20013252.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/varsity/Screenshot%202026-03-03%20013839.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/varsity/Screenshot%202026-03-03%20014134.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/varsity/Screenshot%202026-03-03%20014216.png'
  ]
WHERE slug = 'varsity-academic-excellence';

-- ============================================================
-- 6. SME COMMAND CENTER
-- Folder: product-images/sme/
-- ============================================================
UPDATE products SET
  thumbnail = 'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/sme/cover-page.png',
  images = ARRAY[
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/sme/cover-page.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/sme/Screenshot%202026-03-02%20235736.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/sme/Screenshot%202026-03-02%20235813.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/sme/Screenshot%202026-03-02%20235843.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/sme/Screenshot%202026-03-02%20235911.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/sme/Screenshot%202026-03-03%20000003.png',
    'https://bemgnttmaqpmsaosdisc.supabase.co/storage/v1/object/public/product-images/sme/Screenshot%202026-03-03%20000057.png'
  ]
WHERE slug = 'sme-command-center';

-- ============================================================
-- Verify all 6 products updated
-- ============================================================
SELECT slug, name, thumbnail IS NOT NULL AS has_thumbnail, array_length(images, 1) AS image_count
FROM products
WHERE slug IN (
  'writers-sanctuary', 'creators-studio', 'music-artist-career-command-center',
  'high-school-academic-excellence', 'varsity-academic-excellence', 'sme-command-center'
)
ORDER BY slug;
