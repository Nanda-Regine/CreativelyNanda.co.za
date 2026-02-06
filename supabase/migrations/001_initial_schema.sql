-- CreativelyNanda Database Schema
-- Run this in your Supabase SQL Editor

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  price INTEGER NOT NULL, -- In cents (R149 = 14900)
  original_price INTEGER, -- For discounts
  category TEXT NOT NULL CHECK (category IN ('student', 'business', 'creative', 'wellness')),
  type TEXT NOT NULL CHECK (type IN ('template', 'saas', 'ebook', 'service')),
  thumbnail TEXT,
  images TEXT[] DEFAULT '{}',
  features JSONB DEFAULT '[]',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'live', 'coming-soon', 'archived')),
  is_featured BOOLEAN DEFAULT false,
  payfast_item_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  user_email TEXT NOT NULL,
  user_name TEXT,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'ZAR',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payfast_payment_id TEXT,
  payfast_transaction_id TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Subscribers Table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  source TEXT CHECK (source IN ('homepage', 'blog', 'mirembe', 'product_page', 'poetry')),
  interests TEXT[] DEFAULT '{}',
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ,
  metadata JSONB
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  author_name TEXT NOT NULL,
  author_title TEXT,
  author_avatar TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Poems Table
CREATE TABLE IF NOT EXISTS poems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  collection TEXT,
  mood TEXT,
  theme TEXT,
  audio_url TEXT,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  heart_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  published_at TIMESTAMPTZ
);

-- Poem Hearts Table
CREATE TABLE IF NOT EXISTS poem_hearts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poem_id UUID REFERENCES poems(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  user_id UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(poem_id, session_id)
);

-- Poem Roses (Comments) Table
CREATE TABLE IF NOT EXISTS poem_roses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poem_id UUID REFERENCES poems(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (char_length(content) <= 280),
  author_name TEXT,
  author_email TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'featured', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  category TEXT NOT NULL CHECK (category IN ('dev', 'writing', 'business')),
  tags TEXT[] DEFAULT '{}',
  reading_time INTEGER,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_orders_user_email ON orders(user_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_poems_slug ON poems(slug);
CREATE INDEX IF NOT EXISTS idx_poems_published ON poems(is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE poems ENABLE ROW LEVEL SECURITY;
ALTER TABLE poem_hearts ENABLE ROW LEVEL SECURITY;
ALTER TABLE poem_roses ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Products (public read for live products)
CREATE POLICY "Public can view live products" ON products
  FOR SELECT USING (status = 'live' OR status = 'coming-soon');

-- RLS Policies for Orders (users can only view their own orders by email)
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (true); -- Will be restricted by API

-- RLS Policies for Testimonials (public read for approved)
CREATE POLICY "Public can view approved testimonials" ON testimonials
  FOR SELECT USING (is_approved = true);

-- RLS Policies for Poems (public read for published)
CREATE POLICY "Public can view published poems" ON poems
  FOR SELECT USING (is_published = true);

-- RLS Policies for Poem Hearts (public can insert)
CREATE POLICY "Anyone can heart a poem" ON poem_hearts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can view poem hearts" ON poem_hearts
  FOR SELECT USING (true);

-- RLS Policies for Poem Roses (public can insert, view approved)
CREATE POLICY "Anyone can leave a rose" ON poem_roses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can view approved roses" ON poem_roses
  FOR SELECT USING (status = 'approved' OR status = 'featured');

-- RLS Policies for Blog Posts (public read for published)
CREATE POLICY "Public can view published posts" ON blog_posts
  FOR SELECT USING (is_published = true);

-- RLS Policies for Subscribers (API only)
CREATE POLICY "API can manage subscribers" ON subscribers
  FOR ALL USING (true); -- Restricted by API/service role

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to increment poem heart count
CREATE OR REPLACE FUNCTION increment_poem_hearts()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE poems SET heart_count = heart_count + 1 WHERE id = NEW.poem_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_poem_heart_insert
  AFTER INSERT ON poem_hearts
  FOR EACH ROW
  EXECUTE FUNCTION increment_poem_hearts();
