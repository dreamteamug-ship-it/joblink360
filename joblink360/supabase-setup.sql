-- =====================================================
-- JOBLINK 360 DATABASE TABLES
-- Run this in Supabase SQL Editor
-- =====================================================

-- 1. PROFILES TABLE (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
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

-- 2. COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    long_description TEXT,
    instructor TEXT,
    level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    category TEXT,
    thumbnail_url TEXT,
    video_url TEXT,
    duration_hours INTEGER,
    price DECIMAL(10,2) DEFAULT 0,
    is_published BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE,
    enrollment_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ENROLLMENTS TABLE
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    progress_percent INTEGER DEFAULT 0,
    certificate_issued BOOLEAN DEFAULT FALSE,
    last_accessed TIMESTAMPTZ,
    UNIQUE(user_id, course_id)
);

-- 4. FUNDING OPPORTUNITIES TABLE
CREATE TABLE IF NOT EXISTS public.funding_opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    donor TEXT NOT NULL,
    amount TEXT,
    deadline DATE,
    country TEXT[],
    category TEXT,
    description TEXT,
    source_url TEXT,
    probability TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. JOBS TABLE
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT,
    job_type TEXT CHECK (job_type IN ('full-time', 'part-time', 'remote', 'contract', 'internship')),
    description TEXT,
    salary_min DECIMAL(10,2),
    salary_max DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'USD',
    source_url TEXT,
    posted_date TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. INSERT SAMPLE COURSES
INSERT INTO public.courses (title, slug, description, level, duration_hours, price, is_published, featured) VALUES
('AI Fundamentals for Beginners', 'ai-fundamentals', 'Learn the basics of Artificial Intelligence including machine learning, neural networks, and real-world applications.', 'beginner', 20, 0, true, true),
('Prompt Engineering Mastery', 'prompt-engineering', 'Master the art of crafting effective prompts for AI models like ChatGPT, Claude, and DeepSeek.', 'intermediate', 15, 99, true, true),
('Digital Marketing for African SMEs', 'digital-marketing-africa', 'Grow your business with social media, SEO, and content marketing strategies tailored for Africa.', 'beginner', 12, 0, true, false),
('Data Analysis with Python', 'python-data-analysis', 'Master data analysis using Python, pandas, numpy, and visualization libraries.', 'intermediate', 30, 199, true, true),
('Freelancing Success Guide', 'freelancing-success', 'Build a successful freelancing career, find clients, set rates, and deliver excellent work.', 'beginner', 10, 0, true, false)
ON CONFLICT DO NOTHING;

-- 7. INSERT SAMPLE FUNDING OPPORTUNITIES
INSERT INTO public.funding_opportunities (title, donor, amount, deadline, country, category, description, source_url, probability) VALUES
('Digital Economy for Africa', 'World Bank', '$50 Million', '2025-06-30', ARRAY['Kenya', 'Nigeria', 'South Africa'], 'Technology', 'Funding for digital infrastructure and skills development across Africa.', 'https://www.worldbank.org', 'High'),
('Youth Entrepreneurship Program', 'African Development Bank', '$15 Million', '2025-07-30', ARRAY['Kenya', 'Nigeria', 'Ghana'], 'Entrepreneurship', 'Supporting young entrepreneurs across Africa.', 'https://www.afdb.org', 'Medium'),
('EU-Africa Digital Bridge', 'European Union', '€40 Million', '2025-09-15', ARRAY['Kenya', 'Nigeria', 'South Africa'], 'Technology', 'Digital transformation projects for African countries.', 'https://ec.europa.eu', 'High')
ON CONFLICT DO NOTHING;

-- 8. INSERT SAMPLE JOBS
INSERT INTO public.jobs (title, company, location, job_type, description, salary_min, salary_max, currency, source_url) VALUES
('Frontend Developer', 'Tech Corp Africa', 'Nairobi, Kenya', 'full-time', 'Join our team building modern web applications with React and Next.js.', 80000, 120000, 'KES', 'https://example.com'),
('Data Analyst', 'Data Solutions Ltd', 'Remote', 'remote', 'Analyze data and provide insights for African businesses.', 2000, 3500, 'USD', 'https://example.com'),
('AI Engineer', 'AI Africa', 'Nairobi, Kenya', 'full-time', 'Build AI solutions for healthcare and agriculture.', 150000, 200000, 'KES', 'https://example.com')
ON CONFLICT DO NOTHING;

-- 9. Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

-- 10. Create Policies
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Published courses are viewable by all" ON public.courses
    FOR SELECT USING (is_published = true);

CREATE POLICY "Users can view their own enrollments" ON public.enrollments
    FOR SELECT USING (auth.uid() = user_id);

-- 11. Create function to handle new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 12. Trigger for new users
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
