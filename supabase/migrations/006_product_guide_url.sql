-- Add guide_url column to products table
-- This stores an optional quick-start guide PDF URL per product
-- Customers receive this link in their purchase confirmation email

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS guide_url TEXT DEFAULT NULL;

COMMENT ON COLUMN products.guide_url IS 'Optional URL to a quick-start guide PDF included in purchase confirmation emails';
