-- ============================================================
-- Delete old placeholder/archived products permanently.
-- Only the 6 real Mirembe Muse templates should remain.
-- Run in Supabase SQL Editor.
-- ============================================================

DELETE FROM products
WHERE slug NOT IN (
  'writers-sanctuary',
  'creators-studio',
  'music-artist-career-command-center',
  'high-school-academic-excellence',
  'varsity-academic-excellence',
  'sme-command-center'
);

-- Verify — should return exactly 6 rows
SELECT slug, name, status FROM products ORDER BY created_at;
