-- Fix stats tracking for poems and blog posts
-- Run this in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/bemgnttmaqpmsaosdisc/sql/new

-- 1. Add missing view_count column to poems table
ALTER TABLE poems ADD COLUMN IF NOT EXISTS view_count integer NOT NULL DEFAULT 0;

-- 2. Ensure unique indexes on tracking tables (prevent duplicate counts)
CREATE UNIQUE INDEX IF NOT EXISTS poem_views_unique_session ON poem_views (poem_id, session_id);
CREATE UNIQUE INDEX IF NOT EXISTS poem_hearts_unique_session ON poem_hearts (poem_id, session_id);
CREATE UNIQUE INDEX IF NOT EXISTS blog_views_unique_session ON blog_views (post_id, session_id);
CREATE UNIQUE INDEX IF NOT EXISTS blog_likes_unique_session ON blog_likes (post_id, session_id);
