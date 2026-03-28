-- ============================================================
-- CreativelyNanda.co.za - Products, Orders & Storage
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- Safe to re-run: uses IF NOT EXISTS and DROP IF EXISTS
-- ============================================================

-- ============================================================
-- 1. PRODUCTS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS products (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text UNIQUE NOT NULL,
  name            text NOT NULL,
  tagline         text,
  description     text,
  price           integer NOT NULL,
  original_price  integer,
  category        text NOT NULL CHECK (category IN ('student', 'business', 'creative', 'wellness')),
  type            text NOT NULL DEFAULT 'template' CHECK (type IN ('template', 'saas', 'ebook', 'service')),
  thumbnail       text,
  images          text[] DEFAULT '{}',
  features        jsonb,
  status          text DEFAULT 'draft' CHECK (status IN ('draft', 'live', 'coming-soon', 'archived')),
  is_featured     boolean DEFAULT false,
  payfast_item_id text,
  file_path       text,
  rating          numeric(2,1) DEFAULT 0,
  review_count    integer DEFAULT 0,
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

-- If products table already existed, add missing columns
ALTER TABLE products ADD COLUMN IF NOT EXISTS file_path text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS rating numeric(2,1) DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS review_count integer DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS payfast_item_id text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS features jsonb;
ALTER TABLE products ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS original_price integer;
ALTER TABLE products ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured) WHERE is_featured = true;

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_products_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_products_updated_at ON products;
CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_products_updated_at();


-- ============================================================
-- 2. ORDERS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS orders (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id              uuid REFERENCES products(id) ON DELETE SET NULL,
  user_email              text NOT NULL,
  user_name               text,
  amount                  integer NOT NULL,
  currency                text DEFAULT 'ZAR',
  status                  text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payfast_payment_id      text,
  payfast_transaction_id  text,
  download_token          uuid DEFAULT gen_random_uuid(),
  download_expires_at     timestamptz DEFAULT (now() + interval '7 days'),
  download_count          integer DEFAULT 0,
  items                   jsonb,
  metadata                jsonb,
  created_at              timestamptz DEFAULT now()
);

-- If orders table already existed, add missing columns
ALTER TABLE orders ADD COLUMN IF NOT EXISTS download_token uuid DEFAULT gen_random_uuid();
ALTER TABLE orders ADD COLUMN IF NOT EXISTS download_expires_at timestamptz DEFAULT (now() + interval '7 days');
ALTER TABLE orders ADD COLUMN IF NOT EXISTS download_count integer DEFAULT 0;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS items jsonb;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payfast_payment_id text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payfast_transaction_id text;

CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(user_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_download_token ON orders(download_token);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);


-- ============================================================
-- 3. SUBSCRIBERS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS subscribers (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email           text UNIQUE NOT NULL,
  name            text,
  source          text DEFAULT 'homepage' CHECK (source IN ('homepage', 'blog', 'mirembe', 'product_page', 'poetry')),
  interests       text[] DEFAULT '{}',
  subscribed_at   timestamptz DEFAULT now(),
  unsubscribed_at timestamptz,
  metadata        jsonb
);

CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);


-- ============================================================
-- 4. TESTIMONIALS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS testimonials (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id      uuid REFERENCES products(id) ON DELETE SET NULL,
  author_name     text NOT NULL,
  author_title    text,
  author_avatar   text,
  content         text NOT NULL,
  rating          integer CHECK (rating >= 1 AND rating <= 5),
  is_featured     boolean DEFAULT false,
  is_approved     boolean DEFAULT false,
  created_at      timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_testimonials_product ON testimonials(product_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved) WHERE is_approved = true;


-- ============================================================
-- 5. ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Products
DROP POLICY IF EXISTS "products_public_read" ON products;
CREATE POLICY "products_public_read" ON products
  FOR SELECT USING (status = 'live');

DROP POLICY IF EXISTS "products_service_write" ON products;
CREATE POLICY "products_service_write" ON products
  FOR ALL USING (true) WITH CHECK (true);

-- Orders
DROP POLICY IF EXISTS "orders_public_insert" ON orders;
CREATE POLICY "orders_public_insert" ON orders
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "orders_service_manage" ON orders;
CREATE POLICY "orders_service_manage" ON orders
  FOR ALL USING (true) WITH CHECK (true);

-- Subscribers
DROP POLICY IF EXISTS "subscribers_public_insert" ON subscribers;
CREATE POLICY "subscribers_public_insert" ON subscribers
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "subscribers_service_manage" ON subscribers;
CREATE POLICY "subscribers_service_manage" ON subscribers
  FOR ALL USING (true) WITH CHECK (true);

-- Testimonials
DROP POLICY IF EXISTS "testimonials_public_read" ON testimonials;
CREATE POLICY "testimonials_public_read" ON testimonials
  FOR SELECT USING (is_approved = true);

DROP POLICY IF EXISTS "testimonials_public_insert" ON testimonials;
CREATE POLICY "testimonials_public_insert" ON testimonials
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "testimonials_service_manage" ON testimonials;
CREATE POLICY "testimonials_service_manage" ON testimonials
  FOR ALL USING (true) WITH CHECK (true);


-- ============================================================
-- 6. STORAGE BUCKET SETUP
-- ============================================================

-- Create the 'products' storage bucket (private - requires signed URLs)
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies (drop first to avoid conflicts)
DROP POLICY IF EXISTS "products_bucket_service_upload" ON storage.objects;
CREATE POLICY "products_bucket_service_upload" ON storage.objects
  FOR INSERT
  TO service_role
  WITH CHECK (bucket_id = 'products');

DROP POLICY IF EXISTS "products_bucket_service_read" ON storage.objects;
CREATE POLICY "products_bucket_service_read" ON storage.objects
  FOR SELECT
  TO service_role
  USING (bucket_id = 'products');

DROP POLICY IF EXISTS "products_bucket_service_manage" ON storage.objects;
CREATE POLICY "products_bucket_service_manage" ON storage.objects
  FOR ALL
  TO service_role
  USING (bucket_id = 'products')
  WITH CHECK (bucket_id = 'products');

DROP POLICY IF EXISTS "products_bucket_auth_read" ON storage.objects;
CREATE POLICY "products_bucket_auth_read" ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'products');


-- ============================================================
-- 7. SEED PRODUCTS DATA
-- ============================================================

INSERT INTO products (slug, name, tagline, price, original_price, category, type, status, is_featured, rating, review_count, file_path) VALUES
  ('nsfas-tracker', 'NSFAS Tracker', 'Track your NSFAS application, funding status, and disbursements', 14900, NULL, 'student', 'template', 'live', true, 4.9, 127, 'products/nsfas-tracker/nsfas-tracker.zip'),
  ('varsity-survival-kit', 'Varsity Survival Kit', 'Everything you need to survive and thrive at university', 24900, NULL, 'student', 'template', 'live', true, 4.8, 89, 'products/varsity-survival-kit/varsity-survival-kit.zip'),
  ('freelancer-hub', 'Freelancer Hub', 'Manage clients, projects, invoices, and finances in one place', 34900, NULL, 'business', 'template', 'live', true, 4.9, 156, 'products/freelancer-hub/freelancer-hub.zip'),
  ('sme-business-hub', 'SME Business Hub', 'Complete business management system for small and medium enterprises', 49900, NULL, 'business', 'template', 'live', true, 4.7, 203, 'products/sme-business-hub/sme-business-hub.zip'),
  ('salon-management-system', 'Salon Management System', 'Run your salon or beauty business with ease', 39900, NULL, 'business', 'template', 'live', false, 4.8, 94, 'products/salon-management-system/salon-management-system.zip'),
  ('matric-survival-kit', 'Matric Survival Kit', 'Study planners, subject trackers, and exam prep tools for matric students', 14900, NULL, 'student', 'template', 'live', false, 4.9, 312, 'products/matric-survival-kit/matric-survival-kit.zip'),
  ('inside-her-roses-ebook', 'Inside Her Roses - eBook', 'A collection of poetry exploring love, identity, and growth', 9900, NULL, 'creative', 'ebook', 'live', false, 5.0, 45, 'products/inside-her-roses-ebook/inside-her-roses.zip'),
  ('inside-her-roses-companion', 'Poetry Companion Journal', 'A guided journal companion to Inside Her Roses', 19900, NULL, 'creative', 'template', 'live', false, 4.8, 67, 'products/inside-her-roses-companion/poetry-companion.zip')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  category = EXCLUDED.category,
  type = EXCLUDED.type,
  status = EXCLUDED.status,
  is_featured = EXCLUDED.is_featured,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  file_path = EXCLUDED.file_path;
