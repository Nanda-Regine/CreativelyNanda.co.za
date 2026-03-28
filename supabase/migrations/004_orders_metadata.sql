-- Add metadata JSONB column to orders table
-- This stores cart items for GA4 e-commerce tracking
ALTER TABLE orders ADD COLUMN IF NOT EXISTS metadata JSONB;

-- Add user_name column (used by checkout but missing from original schema)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS user_name VARCHAR(255);
