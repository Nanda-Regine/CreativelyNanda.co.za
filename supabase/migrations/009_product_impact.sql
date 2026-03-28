-- Add impact field to products table
-- Short positioning line shown on product cards, e.g. "Built for 500K+ aspiring writers"
ALTER TABLE products ADD COLUMN IF NOT EXISTS impact text DEFAULT NULL;

-- Update the 6 Mirembe Muse templates
UPDATE products SET impact = 'Built for 500K+ aspiring African writers'             WHERE slug = 'writers-sanctuary';
UPDATE products SET impact = 'Designed for Africa''s 2M+ content creators'          WHERE slug = 'creators-studio';
UPDATE products SET impact = 'Built for 50K+ independent South African artists'     WHERE slug = 'music-artist-career-command-center';
UPDATE products SET impact = 'Serving 500K+ matric students nationwide'             WHERE slug = 'high-school-academic-excellence';
UPDATE products SET impact = 'Built for 1M+ South African university students'      WHERE slug = 'varsity-academic-excellence';
UPDATE products SET impact = 'Designed for 2M+ African entrepreneurs and SMEs'      WHERE slug = 'sme-command-center';
