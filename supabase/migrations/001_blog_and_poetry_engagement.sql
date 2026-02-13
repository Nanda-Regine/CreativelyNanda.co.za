-- ============================================================
-- CreativelyNanda.co.za - Blog & Poetry Engagement Tables
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- ============================================================
-- 1. BLOG TABLES
-- ============================================================

-- 1a. Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text UNIQUE NOT NULL,
  title         text NOT NULL,
  excerpt       text,
  content       text NOT NULL,
  cover_image   text,
  category      text NOT NULL CHECK (category IN ('dev', 'writing', 'business')),
  tags          text[] DEFAULT '{}',
  reading_time  integer,
  is_published  boolean DEFAULT false,
  is_featured   boolean DEFAULT false,
  published_at  timestamptz,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now(),
  -- Engagement counters (synced via triggers)
  view_count    integer DEFAULT 0,
  like_count    integer DEFAULT 0,
  -- Contributor relationship
  author_id     uuid REFERENCES contributors(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(is_featured) WHERE is_featured = true;

-- 1b. Blog Likes (unique per post + session)
CREATE TABLE IF NOT EXISTS blog_likes (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id     uuid NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  session_id  text NOT NULL,
  created_at  timestamptz DEFAULT now(),
  UNIQUE(post_id, session_id)
);

CREATE INDEX IF NOT EXISTS idx_blog_likes_post ON blog_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_likes_session ON blog_likes(post_id, session_id);

-- 1c. Blog Views (unique per post + session)
CREATE TABLE IF NOT EXISTS blog_views (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id     uuid NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  session_id  text NOT NULL,
  created_at  timestamptz DEFAULT now(),
  UNIQUE(post_id, session_id)
);

CREATE INDEX IF NOT EXISTS idx_blog_views_post ON blog_views(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_views_session ON blog_views(post_id, session_id);

-- 1d. Blog Reviews (moderated)
CREATE TABLE IF NOT EXISTS blog_reviews (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id       uuid NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  author_name   text NOT NULL,
  author_email  text,
  content       text NOT NULL CHECK (char_length(content) >= 10 AND char_length(content) <= 1000),
  rating        integer CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5)),
  is_approved   boolean DEFAULT false,
  is_featured   boolean DEFAULT false,
  created_at    timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_blog_reviews_post ON blog_reviews(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_reviews_approved ON blog_reviews(post_id, is_approved) WHERE is_approved = true;


-- ============================================================
-- 2. POETRY TABLES
-- ============================================================

-- 2a. Poems
CREATE TABLE IF NOT EXISTS poems (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text UNIQUE NOT NULL,
  title         text NOT NULL,
  content       text NOT NULL,
  excerpt       text,
  collection    text,
  mood          text,
  theme         text,
  audio_url     text,
  is_published  boolean DEFAULT true,
  is_featured   boolean DEFAULT false,
  -- Engagement counters (synced via triggers)
  heart_count   integer DEFAULT 0,
  view_count    integer DEFAULT 0,
  created_at    timestamptz DEFAULT now(),
  published_at  timestamptz
);

CREATE INDEX IF NOT EXISTS idx_poems_slug ON poems(slug);
CREATE INDEX IF NOT EXISTS idx_poems_published ON poems(is_published);
CREATE INDEX IF NOT EXISTS idx_poems_featured ON poems(is_featured) WHERE is_featured = true;

-- 2b. Poem Hearts / Likes (unique per poem + session)
CREATE TABLE IF NOT EXISTS poem_hearts (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  poem_id     uuid NOT NULL REFERENCES poems(id) ON DELETE CASCADE,
  session_id  text NOT NULL,
  user_id     uuid,
  created_at  timestamptz DEFAULT now(),
  UNIQUE(poem_id, session_id)
);

CREATE INDEX IF NOT EXISTS idx_poem_hearts_poem ON poem_hearts(poem_id);
CREATE INDEX IF NOT EXISTS idx_poem_hearts_session ON poem_hearts(poem_id, session_id);

-- 2c. Poem Views (unique per poem + session)
CREATE TABLE IF NOT EXISTS poem_views (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  poem_id     uuid NOT NULL REFERENCES poems(id) ON DELETE CASCADE,
  session_id  text NOT NULL,
  created_at  timestamptz DEFAULT now(),
  UNIQUE(poem_id, session_id)
);

CREATE INDEX IF NOT EXISTS idx_poem_views_poem ON poem_views(poem_id);
CREATE INDEX IF NOT EXISTS idx_poem_views_session ON poem_views(poem_id, session_id);

-- 2d. Poem Roses / Reviews (moderated)
CREATE TABLE IF NOT EXISTS poem_roses (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  poem_id       uuid NOT NULL REFERENCES poems(id) ON DELETE CASCADE,
  content       text NOT NULL CHECK (char_length(content) >= 5 AND char_length(content) <= 500),
  author_name   text,
  author_email  text,
  is_anonymous  boolean DEFAULT false,
  status        text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'featured', 'rejected')),
  created_at    timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_poem_roses_poem ON poem_roses(poem_id);
CREATE INDEX IF NOT EXISTS idx_poem_roses_status ON poem_roses(poem_id, status);


-- ============================================================
-- 3. SUPPORTING TABLES
-- ============================================================

-- 3a. Contributors (Guest Writers)
CREATE TABLE IF NOT EXISTS contributors (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text UNIQUE NOT NULL,
  name          text NOT NULL,
  title         text,
  bio           text,
  avatar        text,
  website       text,
  twitter       text,
  linkedin      text,
  instagram     text,
  specialties   text[] DEFAULT '{}',
  is_featured   boolean DEFAULT false,
  article_count integer DEFAULT 0,
  created_at    timestamptz DEFAULT now()
);

-- 3b. Featured People (Mentioned in Articles)
CREATE TABLE IF NOT EXISTS featured_people (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text UNIQUE NOT NULL,
  name        text NOT NULL,
  title       text,
  company     text,
  avatar      text,
  website     text,
  twitter     text,
  linkedin    text,
  instagram   text,
  category    text CHECK (category IS NULL OR category IN ('dev', 'writing', 'business')),
  is_featured boolean DEFAULT false,
  created_at  timestamptz DEFAULT now()
);

-- 3c. Article Mentions (Junction table)
CREATE TABLE IF NOT EXISTS article_mentions (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id      uuid NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  person_id       uuid NOT NULL REFERENCES featured_people(id) ON DELETE CASCADE,
  mention_context text,
  created_at      timestamptz DEFAULT now(),
  UNIQUE(article_id, person_id)
);


-- ============================================================
-- 4. TRIGGERS - Auto-sync engagement counts
-- ============================================================

-- 4a. Blog like_count trigger
CREATE OR REPLACE FUNCTION sync_blog_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE blog_posts SET like_count = like_count + 1 WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE blog_posts SET like_count = GREATEST(0, like_count - 1) WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_blog_like_count ON blog_likes;
CREATE TRIGGER trg_blog_like_count
  AFTER INSERT OR DELETE ON blog_likes
  FOR EACH ROW EXECUTE FUNCTION sync_blog_like_count();


-- 4b. Blog view_count trigger
CREATE OR REPLACE FUNCTION sync_blog_view_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE blog_posts SET view_count = view_count + 1 WHERE id = NEW.post_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_blog_view_count ON blog_views;
CREATE TRIGGER trg_blog_view_count
  AFTER INSERT ON blog_views
  FOR EACH ROW EXECUTE FUNCTION sync_blog_view_count();


-- 4c. Poem heart_count trigger
CREATE OR REPLACE FUNCTION sync_poem_heart_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE poems SET heart_count = heart_count + 1 WHERE id = NEW.poem_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE poems SET heart_count = GREATEST(0, heart_count - 1) WHERE id = OLD.poem_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_poem_heart_count ON poem_hearts;
CREATE TRIGGER trg_poem_heart_count
  AFTER INSERT OR DELETE ON poem_hearts
  FOR EACH ROW EXECUTE FUNCTION sync_poem_heart_count();


-- 4d. Poem view_count trigger
CREATE OR REPLACE FUNCTION sync_poem_view_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE poems SET view_count = view_count + 1 WHERE id = NEW.poem_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_poem_view_count ON poem_views;
CREATE TRIGGER trg_poem_view_count
  AFTER INSERT ON poem_views
  FOR EACH ROW EXECUTE FUNCTION sync_poem_view_count();


-- 4e. Auto-update updated_at on blog_posts
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER trg_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_blog_posts_updated_at();


-- ============================================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE poems ENABLE ROW LEVEL SECURITY;
ALTER TABLE poem_hearts ENABLE ROW LEVEL SECURITY;
ALTER TABLE poem_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE poem_roses ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributors ENABLE ROW LEVEL SECURITY;
ALTER TABLE featured_people ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_mentions ENABLE ROW LEVEL SECURITY;

-- Blog Posts: public read for published, authenticated write
CREATE POLICY "blog_posts_public_read" ON blog_posts
  FOR SELECT USING (is_published = true);

CREATE POLICY "blog_posts_service_write" ON blog_posts
  FOR ALL USING (true) WITH CHECK (true);

-- Blog Likes: public insert/delete/select (session-based, no auth required)
CREATE POLICY "blog_likes_public_read" ON blog_likes
  FOR SELECT USING (true);

CREATE POLICY "blog_likes_public_insert" ON blog_likes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "blog_likes_public_delete" ON blog_likes
  FOR DELETE USING (true);

-- Blog Views: public insert/select
CREATE POLICY "blog_views_public_read" ON blog_views
  FOR SELECT USING (true);

CREATE POLICY "blog_views_public_insert" ON blog_views
  FOR INSERT WITH CHECK (true);

-- Blog Reviews: public read for approved, public insert
CREATE POLICY "blog_reviews_public_read" ON blog_reviews
  FOR SELECT USING (is_approved = true);

CREATE POLICY "blog_reviews_public_insert" ON blog_reviews
  FOR INSERT WITH CHECK (true);

CREATE POLICY "blog_reviews_service_manage" ON blog_reviews
  FOR ALL USING (true) WITH CHECK (true);

-- Poems: public read for published
CREATE POLICY "poems_public_read" ON poems
  FOR SELECT USING (is_published = true);

CREATE POLICY "poems_service_write" ON poems
  FOR ALL USING (true) WITH CHECK (true);

-- Poem Hearts: public insert/delete/select
CREATE POLICY "poem_hearts_public_read" ON poem_hearts
  FOR SELECT USING (true);

CREATE POLICY "poem_hearts_public_insert" ON poem_hearts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "poem_hearts_public_delete" ON poem_hearts
  FOR DELETE USING (true);

-- Poem Views: public insert/select
CREATE POLICY "poem_views_public_read" ON poem_views
  FOR SELECT USING (true);

CREATE POLICY "poem_views_public_insert" ON poem_views
  FOR INSERT WITH CHECK (true);

-- Poem Roses: public read for approved/featured, public insert
CREATE POLICY "poem_roses_public_read" ON poem_roses
  FOR SELECT USING (status IN ('approved', 'featured'));

CREATE POLICY "poem_roses_public_insert" ON poem_roses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "poem_roses_service_manage" ON poem_roses
  FOR ALL USING (true) WITH CHECK (true);

-- Contributors: public read
CREATE POLICY "contributors_public_read" ON contributors
  FOR SELECT USING (true);

CREATE POLICY "contributors_service_write" ON contributors
  FOR ALL USING (true) WITH CHECK (true);

-- Featured People: public read
CREATE POLICY "featured_people_public_read" ON featured_people
  FOR SELECT USING (true);

CREATE POLICY "featured_people_service_write" ON featured_people
  FOR ALL USING (true) WITH CHECK (true);

-- Article Mentions: public read
CREATE POLICY "article_mentions_public_read" ON article_mentions
  FOR SELECT USING (true);

CREATE POLICY "article_mentions_service_write" ON article_mentions
  FOR ALL USING (true) WITH CHECK (true);


-- ============================================================
-- 6. HELPER: Recalculate counts from actual rows
--    (Run this if counts ever drift out of sync)
-- ============================================================

-- Recalculate blog like counts
-- UPDATE blog_posts SET like_count = (
--   SELECT COUNT(*) FROM blog_likes WHERE blog_likes.post_id = blog_posts.id
-- );

-- Recalculate blog view counts
-- UPDATE blog_posts SET view_count = (
--   SELECT COUNT(*) FROM blog_views WHERE blog_views.post_id = blog_posts.id
-- );

-- Recalculate poem heart counts
-- UPDATE poems SET heart_count = (
--   SELECT COUNT(*) FROM poem_hearts WHERE poem_hearts.poem_id = poems.id
-- );

-- Recalculate poem view counts
-- UPDATE poems SET view_count = (
--   SELECT COUNT(*) FROM poem_views WHERE poem_views.poem_id = poems.id
-- );
