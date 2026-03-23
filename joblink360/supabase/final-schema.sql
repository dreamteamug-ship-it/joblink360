-- =====================================================
-- JOBLINKS AFRICA - FINAL PRODUCTION SCHEMA
-- All tables, RLS policies, and sample data
-- =====================================================

-- Drop existing policies first (safe approach)
DO $$ 
DECLARE
    pol record;
BEGIN
    FOR pol IN (SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public') LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I', pol.policyname, pol.tablename);
    END LOOP;
END $$;

-- =====================================================
-- 1. PROFILES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'learner' CHECK (role IN ('learner', 'mentor', 'employer', 'admin')),
    qualification_tier TEXT CHECK (qualification_tier IN ('low', 'medium', 'high')),
    country TEXT,
    phone TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2. COURSES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    long_description TEXT,
    instructor VARCHAR(255),
    level VARCHAR(50) CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    category VARCHAR(100),
    thumbnail_url TEXT,
    video_url TEXT,
    duration_hours INTEGER,
    price DECIMAL(10,2) DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    enrollment_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 3. ENROLLMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    progress_percent INTEGER DEFAULT 0,
    certificate_issued BOOLEAN DEFAULT false,
    last_accessed TIMESTAMPTZ,
    UNIQUE(user_id, course_id)
);

-- =====================================================
-- 4. JOBS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    job_type VARCHAR(50) CHECK (job_type IN ('full-time', 'part-time', 'remote', 'contract', 'internship')),
    description TEXT,
    requirements TEXT[],
    salary_min DECIMAL(10,2),
    salary_max DECIMAL(10,2),
    currency VARCHAR(10) DEFAULT 'USD',
    source_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 5. FUNDING OPPORTUNITIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS funding_opportunities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    donor VARCHAR(255),
    amount VARCHAR(100),
    deadline DATE,
    country TEXT[],
    category VARCHAR(100),
    description TEXT,
    source_url TEXT,
    probability VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 6. TENDERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS tenders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    reference_number VARCHAR(100),
    country VARCHAR(100),
    category VARCHAR(100),
    description TEXT,
    budget VARCHAR(100),
    deadline DATE,
    requirements TEXT,
    source_url TEXT,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 7. PRODUCTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    category VARCHAR(100),
    stock_quantity INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 8. AMANDA AGENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS amanda_agents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialty VARCHAR(100),
    company VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active',
    llm VARCHAR(50),
    tasks_completed INTEGER DEFAULT 0,
    success_rate DECIMAL(5,2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- CREATE INDEXES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_courses_published ON courses(is_published);
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON jobs(location);
CREATE INDEX IF NOT EXISTS idx_jobs_active ON jobs(is_active);
CREATE INDEX IF NOT EXISTS idx_funding_deadline ON funding_opportunities(deadline);
CREATE INDEX IF NOT EXISTS idx_tenders_deadline ON tenders(deadline);
CREATE INDEX IF NOT EXISTS idx_products_published ON products(is_published);

-- =====================================================
-- ENABLE RLS
-- =====================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE funding_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenders ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE amanda_agents ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- PUBLIC READ POLICIES
-- =====================================================
CREATE POLICY "public_read_courses" ON courses FOR SELECT USING (is_published = true);
CREATE POLICY "public_read_jobs" ON jobs FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_funding" ON funding_opportunities FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_tenders" ON tenders FOR SELECT USING (status = 'active');
CREATE POLICY "public_read_products" ON products FOR SELECT USING (is_published = true);
CREATE POLICY "public_read_agents" ON amanda_agents FOR SELECT USING (true);

-- =====================================================
-- USER POLICIES
-- =====================================================
CREATE POLICY "users_own_profile" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "users_own_enrollments" ON enrollments FOR ALL USING (auth.uid() = user_id);

-- =====================================================
-- INSERT SAMPLE DATA
-- =====================================================

-- Courses
INSERT INTO courses (title, slug, description, level, duration_hours, price, is_published, featured, rating) VALUES
('AI Fundamentals', 'ai-fundamentals', 'Learn AI basics', 'beginner', 20, 0, true, true, 4.8),
('Web Development', 'web-dev', 'Learn HTML, CSS, JS', 'beginner', 25, 49, true, true, 4.7),
('React Masterclass', 'react-masterclass', 'Master React', 'intermediate', 30, 79, true, true, 4.9)
ON CONFLICT (slug) DO NOTHING;

-- Jobs
INSERT INTO jobs (title, company, location, job_type, description, salary_min, salary_max, currency, is_active) VALUES
('Frontend Developer', 'TechCorp', 'Remote', 'full-time', 'Build React apps', 60000, 90000, 'USD', true),
('Backend Engineer', 'DataFlow', 'Nairobi', 'full-time', 'Build APIs', 80000, 120000, 'KES', true),
('Data Analyst', 'AnalyticsPro', 'Remote', 'remote', 'Analyze data', 50000, 80000, 'USD', true)
ON CONFLICT DO NOTHING;

-- Funding
INSERT INTO funding_opportunities (title, donor, amount, deadline, country, category, description, is_active) VALUES
('Digital Economy Grant', 'World Bank', '$500,000', '2025-12-31', ARRAY['Global'], 'Technology', 'Digital innovation', true),
('Youth Empowerment', 'AfDB', '$2,000,000', '2025-10-31', ARRAY['Africa'], 'Youth', 'Youth entrepreneurship', true)
ON CONFLICT DO NOTHING;

-- Tenders
INSERT INTO tenders (title, organization, reference_number, country, category, description, budget, deadline, status) VALUES
('Digital Infrastructure', 'Govt Kenya', 'GOK/ICT/001', 'Kenya', 'Technology', 'Digital infrastructure', '$50M', '2025-06-30', 'active'),
('Solar Power', 'World Bank', 'WB/ENERGY/045', 'Uganda', 'Energy', 'Solar plant', '$120M', '2025-08-30', 'active')
ON CONFLICT DO NOTHING;

-- Products
INSERT INTO products (name, slug, description, price, category, stock_quantity, is_published) VALUES
('Premium Bundle', 'premium-bundle', 'All courses', 299, 'Courses', 100, true),
('Career Coaching', 'career-coaching', '1-on-1 coaching', 149, 'Services', 50, true)
ON CONFLICT (slug) DO NOTHING;

-- Amanda Agents
INSERT INTO amanda_agents (name, specialty, company, status, llm, tasks_completed, success_rate) VALUES
('Amanda-Finance', 'Financial Analysis', 'all', 'active', 'deepseek', 1243, 98.5),
('Amanda-Recruit', 'Talent Acquisition', 'delite', 'active', 'claude', 567, 94.2),
('Amanda-Lori', 'Logistics', 'altovex', 'active', 'deepseek', 345, 92.5),
('Amanda-Marketing', 'Marketing', 'all', 'active', 'gemini', 2345, 92.5)
ON CONFLICT DO NOTHING;

-- Final verification
SELECT '? DATABASE READY!' as status;
SELECT 'Courses: ' || COUNT(*) FROM courses
UNION ALL
SELECT 'Jobs: ' || COUNT(*) FROM jobs
UNION ALL
SELECT 'Funding: ' || COUNT(*) FROM funding_opportunities
UNION ALL
SELECT 'Tenders: ' || COUNT(*) FROM tenders
UNION ALL
SELECT 'Products: ' || COUNT(*) FROM products
UNION ALL
SELECT 'AI Agents: ' || COUNT(*) FROM amanda_agents;
