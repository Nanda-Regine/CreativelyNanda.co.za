-- Migration 013: Make product-images bucket publicly readable
-- Without this policy, Next.js image optimisation returns 400 (can't fetch private bucket)

CREATE POLICY "Public read product-images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'product-images');
