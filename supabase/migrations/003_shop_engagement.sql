-- ============================================================
-- CreativelyNanda.co.za - Shop Engagement (Likes, Views, Purchase Count)
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- Safe to re-run: uses IF NOT EXISTS and DROP IF EXISTS
-- ============================================================

-- ============================================================
-- 1. PRODUCT LIKES TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS product_likes (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  session_id  text NOT NULL,
  created_at  timestamptz DEFAULT now(),
  UNIQUE(product_id, session_id)
);

CREATE INDEX IF NOT EXISTS idx_product_likes_product ON product_likes(product_id);
CREATE INDEX IF NOT EXISTS idx_product_likes_session ON product_likes(product_id, session_id);

-- ============================================================
-- 2. PRODUCT VIEWS TABLE
-- ============================================================

CREATE TABLE IF NOT EXISTS product_views (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  session_id  text NOT NULL,
  created_at  timestamptz DEFAULT now(),
  UNIQUE(product_id, session_id)
);

CREATE INDEX IF NOT EXISTS idx_product_views_product ON product_views(product_id);
CREATE INDEX IF NOT EXISTS idx_product_views_session ON product_views(product_id, session_id);

-- ============================================================
-- 3. ADD ENGAGEMENT COLUMNS TO PRODUCTS
-- ============================================================

ALTER TABLE products ADD COLUMN IF NOT EXISTS like_count integer DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS view_count integer DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS purchase_count integer DEFAULT 0;

-- ============================================================
-- 4. AUTO-APPROVE TESTIMONIALS (reviews visible immediately)
-- ============================================================

ALTER TABLE testimonials ALTER COLUMN is_approved SET DEFAULT true;

-- ============================================================
-- 5. TRIGGERS - Auto-sync engagement counts
-- ============================================================

-- 5a. Product like_count trigger
CREATE OR REPLACE FUNCTION sync_product_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE products SET like_count = like_count + 1 WHERE id = NEW.product_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE products SET like_count = GREATEST(0, like_count - 1) WHERE id = OLD.product_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_product_like_count ON product_likes;
CREATE TRIGGER trg_product_like_count
  AFTER INSERT OR DELETE ON product_likes
  FOR EACH ROW EXECUTE FUNCTION sync_product_like_count();

-- 5b. Product view_count trigger
CREATE OR REPLACE FUNCTION sync_product_view_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE products SET view_count = view_count + 1 WHERE id = NEW.product_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_product_view_count ON product_views;
CREATE TRIGGER trg_product_view_count
  AFTER INSERT ON product_views
  FOR EACH ROW EXECUTE FUNCTION sync_product_view_count();

-- 5c. Auto-sync review_count and rating on testimonials insert
CREATE OR REPLACE FUNCTION sync_product_review_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE products SET
    review_count = (SELECT COUNT(*) FROM testimonials WHERE product_id = NEW.product_id AND is_approved = true),
    rating = COALESCE(
      (SELECT ROUND(AVG(rating)::numeric, 1) FROM testimonials WHERE product_id = NEW.product_id AND is_approved = true AND rating IS NOT NULL),
      0
    )
  WHERE id = NEW.product_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_product_review_stats ON testimonials;
CREATE TRIGGER trg_product_review_stats
  AFTER INSERT OR UPDATE OR DELETE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION sync_product_review_stats();

-- ============================================================
-- 6. ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE product_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_views ENABLE ROW LEVEL SECURITY;

-- Product Likes: public insert/delete/select
DROP POLICY IF EXISTS "product_likes_public_read" ON product_likes;
CREATE POLICY "product_likes_public_read" ON product_likes
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "product_likes_public_insert" ON product_likes;
CREATE POLICY "product_likes_public_insert" ON product_likes
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "product_likes_public_delete" ON product_likes;
CREATE POLICY "product_likes_public_delete" ON product_likes
  FOR DELETE USING (true);

-- Product Views: public insert/select
DROP POLICY IF EXISTS "product_views_public_read" ON product_views;
CREATE POLICY "product_views_public_read" ON product_views
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "product_views_public_insert" ON product_views;
CREATE POLICY "product_views_public_insert" ON product_views
  FOR INSERT WITH CHECK (true);
