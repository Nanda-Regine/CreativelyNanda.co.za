-- Poem Roses (Reviews) Migration
-- Run this in your Supabase SQL Editor

-- Poem Roses (Reviews from readers)
CREATE TABLE IF NOT EXISTS poem_roses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  poem_id UUID REFERENCES poems(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author_name VARCHAR(255),
  author_email VARCHAR(255),
  is_anonymous BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'pending', -- pending, approved, featured, rejected
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE poem_roses ENABLE ROW LEVEL SECURITY;
ALTER TABLE poem_hearts ENABLE ROW LEVEL SECURITY;

-- Policies for poem_roses
CREATE POLICY "Public view approved roses" ON poem_roses
  FOR SELECT USING (status IN ('approved', 'featured'));

CREATE POLICY "Anyone can insert roses" ON poem_roses
  FOR INSERT WITH CHECK (true);

-- Policies for poem_hearts
CREATE POLICY "Anyone can insert hearts" ON poem_hearts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view hearts" ON poem_hearts
  FOR SELECT USING (true);

CREATE POLICY "Anyone can delete own hearts" ON poem_hearts
  FOR DELETE USING (true);

-- Update poems policy to allow reading heart_count
DROP POLICY IF EXISTS "Public view poems" ON poems;
CREATE POLICY "Public view poems" ON poems
  FOR SELECT USING (is_published = true);
