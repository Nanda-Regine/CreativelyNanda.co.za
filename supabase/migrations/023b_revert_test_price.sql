-- Migration 023b: Revert Writers' Sanctuary price back to R299 after testing
UPDATE products SET price = 29900 WHERE slug = 'writers-sanctuary';
