-- Migration 014: Set product-images bucket to public
-- The /object/public/ URL path only works when bucket.public = true
-- The RLS policy alone (migration 013) is not sufficient

UPDATE storage.buckets
SET public = true
WHERE id = 'product-images';
