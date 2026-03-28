-- Migration 023: Set Writers' Sanctuary to R5 for purchase flow testing
-- REMEMBER TO REVERT after testing with migration 023b_revert_test_price.sql

UPDATE products SET price = 500 WHERE slug = 'writers-sanctuary';

-- To revert after testing:
-- UPDATE products SET price = 29900 WHERE slug = 'writers-sanctuary';
