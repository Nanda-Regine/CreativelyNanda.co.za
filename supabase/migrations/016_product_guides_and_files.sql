-- Migration 016: Set file_path to public PDF paths and ensure guide_url is correct
-- PDFs are served directly from /assets/products/guides/{slug}.pdf (public/)
-- Notion template links are the actual product delivered after purchase

UPDATE products SET
  file_path = '/assets/products/guides/writers-sanctuary.pdf',
  guide_url  = 'https://shard-purchase-279.notion.site/THE-WRITER-S-SANCTUARY-2f41f72e5a638090bfdfc077c606f3a4?source=copy_link',
  updated_at = NOW()
WHERE slug = 'writers-sanctuary';

UPDATE products SET
  file_path = '/assets/products/guides/creators-studio.pdf',
  guide_url  = 'https://shard-purchase-279.notion.site/THE-CREATOR-S-STUDIO-2f51f72e5a63805ca573ec90016fdabb?source=copy_link',
  updated_at = NOW()
WHERE slug = 'creators-studio';

UPDATE products SET
  file_path = '/assets/products/guides/music-artist-career-command-center.pdf',
  guide_url  = 'https://shard-purchase-279.notion.site/Music-Artist-Career-Command-Center-30c1f72e5a6380daa090e924bf747628?source=copy_link',
  updated_at = NOW()
WHERE slug = 'music-artist-career-command-center';

UPDATE products SET
  file_path = '/assets/products/guides/high-school-academic-excellence.pdf',
  guide_url  = 'https://shard-purchase-279.notion.site/HIGH-SCHOOL-ACADEMIC-EXCELLENCE-ENGINE-2f11f72e5a638042bcb5e169eafc4de0?source=copy_link',
  updated_at = NOW()
WHERE slug = 'high-school-academic-excellence';

UPDATE products SET
  file_path = '/assets/products/guides/varsity-academic-excellence.pdf',
  guide_url  = 'https://shard-purchase-279.notion.site/VARSITY-ACADEMIC-EXCELLENCE-ENGINE-4d61f72e5a638387b8b40111d1dcefa2?source=copy_link',
  updated_at = NOW()
WHERE slug = 'varsity-academic-excellence';

UPDATE products SET
  file_path = '/assets/products/guides/sme-command-center.pdf',
  guide_url  = 'https://shard-purchase-279.notion.site/SME-COMMAND-CENTER-5011f72e5a63821b840581fdc6174d7f?source=copy_link',
  updated_at = NOW()
WHERE slug = 'sme-command-center';
