-- Blog Engagement Features Migration
-- Run this in your Supabase SQL Editor

-- Add engagement columns to blog_posts
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS like_count INTEGER DEFAULT 0;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author_id UUID;

-- Blog Reviews (Reader insights)
CREATE TABLE IF NOT EXISTS blog_reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  author_name VARCHAR(255) NOT NULL,
  author_email VARCHAR(255),
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_approved BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Likes (Unique likes per session)
CREATE TABLE IF NOT EXISTS blog_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  session_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, session_id)
);

-- Blog Views (Track unique views)
CREATE TABLE IF NOT EXISTS blog_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  session_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, session_id)
);

-- Contributors (Guest writers)
CREATE TABLE IF NOT EXISTS contributors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  bio TEXT,
  avatar TEXT,
  website TEXT,
  twitter TEXT,
  linkedin TEXT,
  instagram TEXT,
  specialties TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE,
  article_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key for author
ALTER TABLE blog_posts
  ADD CONSTRAINT fk_blog_posts_author
  FOREIGN KEY (author_id) REFERENCES contributors(id) ON DELETE SET NULL;

-- Enable RLS on new tables
ALTER TABLE blog_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE contributors ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public view reviews" ON blog_reviews
  FOR SELECT USING (is_approved = true);

CREATE POLICY "Anyone can insert reviews" ON blog_reviews
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert likes" ON blog_likes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view likes" ON blog_likes
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert views" ON blog_views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view views" ON blog_views
  FOR SELECT USING (true);

CREATE POLICY "Public view contributors" ON contributors
  FOR SELECT USING (true);

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE blog_posts
  SET view_count = view_count + 1
  WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for view count
CREATE TRIGGER on_blog_view_insert
  AFTER INSERT ON blog_views
  FOR EACH ROW
  EXECUTE FUNCTION increment_view_count();

-- Function to increment like count
CREATE OR REPLACE FUNCTION increment_like_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE blog_posts
  SET like_count = like_count + 1
  WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrement like count
CREATE OR REPLACE FUNCTION decrement_like_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE blog_posts
  SET like_count = GREATEST(like_count - 1, 0)
  WHERE id = OLD.post_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers for like count
CREATE TRIGGER on_blog_like_insert
  AFTER INSERT ON blog_likes
  FOR EACH ROW
  EXECUTE FUNCTION increment_like_count();

CREATE TRIGGER on_blog_like_delete
  AFTER DELETE ON blog_likes
  FOR EACH ROW
  EXECUTE FUNCTION decrement_like_count();

-- Insert default contributor (Nanda)
INSERT INTO contributors (slug, name, title, bio, avatar, twitter, linkedin, instagram, website, specialties, is_featured)
VALUES (
  'nanda-kabali-kagwa',
  'Nanda Kabali-Kagwa',
  'Creative Technologist & Poet',
  'Building beautiful digital experiences and writing poetry that heals. Author of "Inside Her Roses".',
  '/assets/professional/nanda-professional.png',
  'https://twitter.com/creativelynanda',
  'https://linkedin.com/in/nanda-kabali-kagwa',
  'https://instagram.com/creativelynanda',
  'https://creativelynanda.co.za',
  ARRAY['dev', 'writing', 'business'],
  true
) ON CONFLICT (slug) DO NOTHING;
