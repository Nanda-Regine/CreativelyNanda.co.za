-- Migration 018: Projects table for portfolio projects
-- Run this in Supabase SQL editor

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  tagline TEXT,
  description TEXT,
  long_description TEXT,
  category TEXT, -- 'ai-ml', 'web-app', 'saas', 'community-impact', 'creative', 'education'
  tech_stack JSONB, -- [{"name": "Next.js", "reason": "SSR + SEO"}]
  impact_metrics JSONB, -- {"potential": "11M users", "problem": "...", "metric": "..."}
  github_url TEXT,
  live_url TEXT,
  demo_url TEXT,
  featured_image TEXT,
  gallery_images TEXT[],
  video_url TEXT,
  status TEXT DEFAULT 'live', -- 'live', 'beta', 'in-development', 'completed'
  is_featured BOOLEAN DEFAULT false,
  year INTEGER,
  case_study_blog_slug TEXT, -- Links to blog post case study
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[]
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "projects_public_read" ON projects
  FOR SELECT USING (true);

-- Admin write access only
CREATE POLICY "projects_admin_write" ON projects
  FOR ALL USING (auth.role() = 'service_role');

-- Seed all 9 projects
INSERT INTO projects (title, slug, tagline, description, category, tech_stack, impact_metrics, github_url, live_url, status, is_featured, year)
VALUES
  (
    'StokvelOS',
    'stokvel-os',
    'Revolutionary Community Finance Platform for 11M South Africans',
    'AI-powered stokvel management platform digitalizing South Africa''s R50B informal savings economy.',
    'community-impact',
    '[
      {"name": "Next.js 14", "reason": "App Router for SEO + SSR"},
      {"name": "TypeScript", "reason": "Type safety for financial data"},
      {"name": "Supabase (PostgreSQL + RLS)", "reason": "Row-Level Security for member privacy"},
      {"name": "OpenAI", "reason": "AI fraud pattern detection"},
      {"name": "PayFast", "reason": "South African payment gateway"},
      {"name": "Tailwind CSS", "reason": "Rapid UI development"}
    ]'::jsonb,
    '{"potential": "11M South Africans in stokvels", "economy": "R50B+ informal economy", "problem": "95% operate manually", "metric": "100% automated tracking accuracy"}'::jsonb,
    NULL,
    NULL,
    'beta',
    true,
    2025
  ),
  (
    'K53 Drill Master',
    'k53-drill-master',
    'AI-Powered Driving Test Prep Tackling South Africa''s 60% Failure Rate',
    'Adaptive AI learning platform for South Africa''s K53 driving test. 50+ paying subscribers, 4.8/5 rating.',
    'ai-ml',
    '[
      {"name": "Next.js 14", "reason": "Fast, SEO-optimized study platform"},
      {"name": "TypeScript", "reason": "Robust adaptive learning logic"},
      {"name": "OpenAI API", "reason": "Adaptive learning & personalized feedback"},
      {"name": "Supabase", "reason": "User progress & question database"},
      {"name": "Tailwind CSS", "reason": "Mobile-first responsive design"}
    ]'::jsonb,
    '{"potential": "500K+ learner drivers annually", "economy": "60%+ K53 failure rate", "problem": "Lack of quality prep resources", "metric": "50+ paying subscribers, 4.8/5 rating"}'::jsonb,
    'https://github.com/Nanda-Regine/nanda-k53-drill-master',
    'https://nanda-k53-drill-master.vercel.app/',
    'live',
    true,
    2025
  ),
  (
    'True Access App',
    'true-access-app',
    'Geolocation Accessibility Mapping for 2.8M Disabled South Africans',
    'Community-driven accessibility mapping platform built in 50 days using Mapbox API and PWA technology.',
    'community-impact',
    '[
      {"name": "Next.js 14", "reason": "PWA support + SSR for performance"},
      {"name": "Mapbox API", "reason": "Developer-friendly pricing + African coverage"},
      {"name": "Supabase", "reason": "Real-time venue updates & user contributions"},
      {"name": "TypeScript", "reason": "Reliable geolocation data handling"},
      {"name": "PWA", "reason": "Offline-first for unreliable connectivity"}
    ]'::jsonb,
    '{"potential": "2.8M disabled South Africans", "economy": "10,000+ accessible venues mapped", "problem": "Zero reliable accessibility data", "metric": "Built in 50 days"}'::jsonb,
    NULL,
    'https://true-access-app.vercel.app/',
    'live',
    true,
    2025
  ),
  (
    'Campus Compass',
    'campus-compass',
    'AI University Companion for 1M+ South African Students',
    'AI-powered student companion with OpenAI chatbot, Mapbox campus navigation, and PWA offline support.',
    'education',
    '[
      {"name": "Next.js 14", "reason": "PWA + SSR for campus application"},
      {"name": "OpenAI (ChatGPT)", "reason": "24/7 AI academic assistant"},
      {"name": "Mapbox", "reason": "Campus map navigation"},
      {"name": "Supabase", "reason": "Student data, schedules, and progress"},
      {"name": "PWA", "reason": "Works offline for data-constrained students"}
    ]'::jsonb,
    '{"potential": "1M+ South African university students", "economy": "Addressing 50%+ dropout rate", "problem": "Academic planning & support gap", "metric": "200+ active student users"}'::jsonb,
    'https://github.com/Nanda-Regine/campus-compass',
    NULL,
    'beta',
    false,
    2025
  ),
  (
    'Cortex Hub',
    'cortex-hub',
    'Multi-Industry SaaS Booking Platform for South African SMEs',
    'Intelligent multi-vertical booking and management platform with AI scheduling and PayFast integration.',
    'saas',
    '[
      {"name": "Next.js 14", "reason": "Multi-tenant SaaS architecture"},
      {"name": "TypeScript", "reason": "Enterprise-grade type safety"},
      {"name": "OpenAI", "reason": "AI scheduling optimization"},
      {"name": "Supabase", "reason": "Multi-tenant database with RLS"},
      {"name": "PayFast", "reason": "Local SA payment processing"}
    ]'::jsonb,
    '{"potential": "50K+ South African SMEs", "economy": "Multiple industry verticals", "problem": "Fragmented SME booking systems", "metric": "MVP live, active development"}'::jsonb,
    NULL,
    'https://cortex-hub-booking-5e35.vercel.app/',
    'live',
    false,
    2025
  ),
  (
    'PoetryTube',
    'poetry-tube',
    'Video Poetry Platform Amplifying African and Diaspora Poets',
    'Dedicated video platform for African and diaspora poets using Cloudflare Stream.',
    'creative',
    '[
      {"name": "Next.js 14", "reason": "Fast video content delivery"},
      {"name": "Cloudflare Stream", "reason": "High-quality video hosting"},
      {"name": "Supabase", "reason": "Poet profiles & content database"},
      {"name": "TypeScript", "reason": "Reliable media application"}
    ]'::jsonb,
    '{"potential": "1,000+ African poets", "economy": "African creative digital economy", "problem": "African poetry digital gap", "metric": "Community growing"}'::jsonb,
    'https://github.com/Nanda-Regine/PoetryTube',
    NULL,
    'live',
    false,
    2025
  ),
  (
    'Green Vault eCommerce',
    'green-vault',
    'Modern eCommerce Template with Full PayFast Integration',
    'Complete eCommerce platform template with PayFast, inventory management, and admin dashboard for African businesses.',
    'web-app',
    '[
      {"name": "Next.js 14", "reason": "Performance + SEO for eCommerce"},
      {"name": "PayFast", "reason": "Native SA payment gateway"},
      {"name": "Supabase", "reason": "Product & order database"},
      {"name": "TypeScript", "reason": "Reliable payment and inventory logic"}
    ]'::jsonb,
    '{"potential": "African eCommerce market", "economy": "R1.5T SA eCommerce opportunity", "problem": "No SA-native eCommerce templates", "metric": "Template live on Vercel"}'::jsonb,
    'https://github.com/Nanda-Regine/GreenValut-eCommerce-store-demo',
    'https://green-valut-e-commerce-store-demo.vercel.app/',
    'live',
    false,
    2025
  ),
  (
    'Weather App',
    'weather-app',
    'Real-Time Weather App Showcasing API Mastery',
    'SheCodes Plus certified project demonstrating clean API integration and responsive JavaScript design.',
    'web-app',
    '[
      {"name": "HTML/CSS", "reason": "Clean semantic markup"},
      {"name": "JavaScript", "reason": "Dynamic DOM manipulation"},
      {"name": "OpenWeather API", "reason": "Real-time weather data"},
      {"name": "Tailwind CSS", "reason": "Responsive design"}
    ]'::jsonb,
    '{"potential": "Learner developers", "economy": "SheCodes certification", "problem": "API integration learning", "metric": "SheCodes Plus certified"}'::jsonb,
    'https://github.com/Nanda-Regine/my-weather-app',
    'https://my-weather-app-rho-lyart.vercel.app/',
    'live',
    false,
    2024
  ),
  (
    'CreativelyNanda.co.za',
    'creativelynanda',
    'Portfolio & Digital HQ — The Website That Builds Itself',
    'Full-stack personal brand platform with Notion template shop, poetry collection, AI assistant, blog, and PayFast payments.',
    'web-app',
    '[
      {"name": "Next.js 14", "reason": "App Router, SEO, PWA"},
      {"name": "TypeScript", "reason": "Type safety across all features"},
      {"name": "Supabase", "reason": "Products, orders, blog, poetry database"},
      {"name": "PayFast", "reason": "South African payment gateway"},
      {"name": "Resend", "reason": "Transactional email delivery"},
      {"name": "Framer Motion", "reason": "Editorial animation system"}
    ]'::jsonb,
    '{"potential": "African creative technologists", "economy": "Monthly recurring revenue", "problem": "Generic portfolio problem", "metric": "6 templates live, R15K+ revenue"}'::jsonb,
    'https://github.com/Nanda-Regine/CreativelyNanda.co.za',
    'https://creativelynanda.co.za',
    'live',
    true,
    2025
  )
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  tech_stack = EXCLUDED.tech_stack,
  impact_metrics = EXCLUDED.impact_metrics,
  updated_at = NOW();
