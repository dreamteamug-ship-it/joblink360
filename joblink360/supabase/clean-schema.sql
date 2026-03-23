-- =====================================================
-- JOBLINKS AFRICA - CLEAN DATABASE SCHEMA
-- All tables properly structured for production
-- =====================================================

-- Drop existing tables if needed (use with caution)
-- DROP TABLE IF EXISTS order_items CASCADE;
-- DROP TABLE IF EXISTS orders CASCADE;
-- DROP TABLE IF EXISTS cart_items CASCADE;
-- DROP TABLE IF EXISTS products CASCADE;
-- DROP TABLE IF EXISTS tenders CASCADE;
-- DROP TABLE IF EXISTS funding_opportunities CASCADE;
-- DROP TABLE IF EXISTS jobs CASCADE;
-- DROP TABLE IF EXISTS enrollments CASCADE;
-- DROP TABLE IF EXISTS courses CASCADE;
-- DROP TABLE IF EXISTS profiles CASCADE;

-- =====================================================
-- 1. PROFILES TABLE (extends auth.users)
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
-- 7. PRODUCTS TABLE (Shop)
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
-- 8. CART ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS cart_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- =====================================================
-- 9. ORDERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 10. ORDER ITEMS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price_at_time DECIMAL(10,2) NOT NULL
);

-- =====================================================
-- 11. AMANDA AI AGENTS TABLE
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
-- CREATE INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_courses_published ON courses(is_published) WHERE is_published = true;
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON jobs(location);
CREATE INDEX IF NOT EXISTS idx_jobs_type ON jobs(job_type);
CREATE INDEX IF NOT EXISTS idx_funding_deadline ON funding_opportunities(deadline);
CREATE INDEX IF NOT EXISTS idx_tenders_deadline ON tenders(deadline);
CREATE INDEX IF NOT EXISTS idx_tenders_country ON tenders(country);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

-- =====================================================
-- ENABLE ROW LEVEL SECURITY
-- =====================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE funding_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenders ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE amanda_agents ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- CREATE PUBLIC READ POLICIES
-- =====================================================
DROP POLICY IF EXISTS "public_read_courses" ON courses;
CREATE POLICY "public_read_courses" ON courses FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "public_read_jobs" ON jobs;
CREATE POLICY "public_read_jobs" ON jobs FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "public_read_funding" ON funding_opportunities;
CREATE POLICY "public_read_funding" ON funding_opportunities FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "public_read_tenders" ON tenders;
CREATE POLICY "public_read_tenders" ON tenders FOR SELECT USING (status = 'active');

DROP POLICY IF EXISTS "public_read_products" ON products;
CREATE POLICY "public_read_products" ON products FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "public_read_amanda_agents" ON amanda_agents;
CREATE POLICY "public_read_amanda_agents" ON amanda_agents FOR SELECT USING (true);

-- =====================================================
-- USER POLICIES
-- =====================================================
DROP POLICY IF EXISTS "users_own_profile" ON profiles;
CREATE POLICY "users_own_profile" ON profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "users_own_enrollments" ON enrollments;
CREATE POLICY "users_own_enrollments" ON enrollments FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "users_own_cart" ON cart_items;
CREATE POLICY "users_own_cart" ON cart_items FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "users_own_orders" ON orders;
CREATE POLICY "users_own_orders" ON orders FOR SELECT USING (auth.uid() = user_id);

-- =====================================================
-- INSERT SAMPLE DATA
-- =====================================================

-- Insert sample courses
INSERT INTO courses (title, slug, description, level, duration_hours, price, is_published, featured, rating) VALUES
('AI Fundamentals for Beginners', 'ai-fundamentals', 'Learn the basics of Artificial Intelligence, machine learning, and neural networks.', 'beginner', 20, 0, true, true, 4.8),
('Prompt Engineering Mastery', 'prompt-engineering', 'Master the art of crafting effective prompts for AI models.', 'intermediate', 15, 99, true, true, 4.9),
('Full-Stack Web Development', 'fullstack-web', 'Learn React, Node.js, and MongoDB to build complete web applications.', 'intermediate', 60, 129, true, true, 4.8),
('Data Science with Python', 'data-science', 'Master pandas, numpy, and machine learning with Python.', 'intermediate', 35, 89, true, true, 4.7),
('Cybersecurity Fundamentals', 'cybersecurity', 'Learn ethical hacking, network security, and threat prevention.', 'beginner', 30, 79, true, false, 4.5)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample jobs
INSERT INTO jobs (title, company, location, job_type, description, salary_min, salary_max, currency, is_active) VALUES
('Frontend Developer', 'TechCorp Africa', 'Nairobi, Kenya', 'full-time', 'Build responsive web applications with React and Next.js.', 80000, 120000, 'KES', true),
('Data Analyst', 'DataSolutions', 'Remote', 'remote', 'Analyze data and provide insights for African businesses.', 2000, 3500, 'USD', true),
('AI Engineer', 'AIAfrica', 'Nairobi, Kenya', 'full-time', 'Build AI solutions for healthcare and agriculture.', 150000, 200000, 'KES', true)
ON CONFLICT DO NOTHING;

-- Insert sample funding
INSERT INTO funding_opportunities (title, donor, amount, deadline, country, category, description, is_active) VALUES
('Digital Economy for Africa', 'World Bank', '$50 Million', '2025-06-30', ARRAY['Kenya', 'Nigeria', 'South Africa'], 'Technology', 'Funding for digital infrastructure and skills development.', true),
('Youth Entrepreneurship Program', 'African Development Bank', '$15 Million', '2025-07-30', ARRAY['Kenya', 'Nigeria', 'Ghana'], 'Entrepreneurship', 'Supporting young entrepreneurs across Africa.', true),
('EU-Africa Digital Bridge', 'European Union', '€40 Million', '2025-09-15', ARRAY['Kenya', 'Nigeria', 'South Africa'], 'Technology', 'Digital transformation projects for African countries.', true)
ON CONFLICT DO NOTHING;

-- Insert sample tenders
INSERT INTO tenders (title, organization, reference_number, country, category, description, budget, deadline, status) VALUES
('Digital Infrastructure Development', 'Government of Kenya', 'GOK/ICT/2024/001', 'Kenya', 'Technology', 'Development of national digital infrastructure.', '$50,000,000', '2025-06-30', 'active'),
('Solar Power Plant Construction', 'World Bank', 'WB/ENERGY/2024/045', 'Uganda', 'Energy', 'Construction of 100MW solar power plant.', '$120,000,000', '2025-08-30', 'active'),
('Smart City Development', 'African Development Bank', 'AFDB/URBAN/2024/023', 'Rwanda', 'Urban Development', 'Smart city infrastructure in Kigali.', '$80,000,000', '2025-09-20', 'active')
ON CONFLICT DO NOTHING;

-- Insert sample products
INSERT INTO products (name, slug, description, price, category, stock_quantity, is_published) VALUES
('Premium Course Bundle', 'premium-bundle', 'Access all premium courses with lifetime updates.', 299.99, 'Courses', 100, true),
('Career Coaching Session', 'career-coaching', 'One-on-one career coaching with industry experts.', 149.99, 'Services', 50, true),
('Resume Template Pack', 'resume-templates', 'Professional resume templates for all industries.', 49.99, 'Templates', 200, true)
ON CONFLICT (slug) DO NOTHING;

-- Insert Amanda AI agents
INSERT INTO amanda_agents (name, specialty, company, status, llm, tasks_completed, success_rate) VALUES
('Amanda-Finance', 'Financial Analysis', 'all', 'active', 'deepseek', 1243, 98.5),
('Amanda-Recruit', 'AI Talent Acquisition', 'delite', 'active', 'claude', 567, 94.2),
('Amanda-Lori', 'Logistics Optimization', 'altovex', 'active', 'deepseek', 345, 92.5),
('Amanda-Marketing', 'Marketing Automation', 'all', 'active', 'gemini', 2345, 92.5)
ON CONFLICT DO NOTHING;

-- Show final counts
SELECT '? Database Setup Complete!' as status;
SELECT 'Courses' as table_name, COUNT(*) as count FROM courses
UNION ALL
SELECT 'Jobs', COUNT(*) FROM jobs
UNION ALL
SELECT 'Funding', COUNT(*) FROM funding_opportunities
UNION ALL
SELECT 'Tenders', COUNT(*) FROM tenders
UNION ALL
SELECT 'Products', COUNT(*) FROM products
UNION ALL
SELECT 'AI Agents', COUNT(*) FROM amanda_agents;
