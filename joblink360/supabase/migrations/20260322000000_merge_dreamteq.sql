-- =====================================================
-- JOBLINK 360 + DREAMTEQ LMS - COMPLETE SCHEMA
-- =====================================================
-- This migration adds missing tables and columns safely
-- without destroying existing data

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. UPDATE PROFILES TABLE (Add LMS fields)
-- =====================================================
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'qualification_tier') THEN
        ALTER TABLE public.profiles ADD COLUMN qualification_tier TEXT;
        ALTER TABLE public.profiles ADD CONSTRAINT profiles_qualification_tier_check 
            CHECK (qualification_tier IN ('low', 'medium', 'high', NULL));
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'bio') THEN
        ALTER TABLE public.profiles ADD COLUMN bio TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'country') THEN
        ALTER TABLE public.profiles ADD COLUMN country TEXT;
    END IF;
END $$;

-- =====================================================
-- 2. COURSES TABLE (LMS)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    qualification_tier TEXT NOT NULL CHECK (qualification_tier IN ('low', 'medium', 'high')),
    duration_hours INTEGER,
    price DECIMAL(10,2) DEFAULT 0,
    thumbnail_url TEXT,
    video_url TEXT,
    modules JSONB DEFAULT '[]',
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 3. ENROLLMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    progress_percent INTEGER DEFAULT 0,
    certificate_issued BOOLEAN DEFAULT FALSE,
    UNIQUE(user_id, course_id)
);

-- =====================================================
-- 4. PROGRESS LOGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.progress_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enrollment_id UUID NOT NULL REFERENCES public.enrollments(id) ON DELETE CASCADE,
    module_index INTEGER NOT NULL,
    lesson_index INTEGER NOT NULL,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    quiz_score INTEGER,
    time_spent_seconds INTEGER
);

-- =====================================================
-- 5. CERTIFICATES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    certificate_number TEXT UNIQUE NOT NULL DEFAULT uuid_generate_v4()::text,
    qr_code TEXT,
    issued_at TIMESTAMPTZ DEFAULT NOW(),
    expiry_date TIMESTAMPTZ,
    is_verified BOOLEAN DEFAULT TRUE,
    verification_count INTEGER DEFAULT 0
);

-- =====================================================
-- 6. INTERVIEWS TABLE (Amanda AI)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.interviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    interview_type TEXT NOT NULL CHECK (interview_type IN ('initial', 'qualification', 'mock', 'exit')),
    questions JSONB,
    responses JSONB,
    ai_analysis JSONB,
    recommended_tier TEXT CHECK (recommended_tier IN ('low', 'medium', 'high')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 7. QUIZ ATTEMPTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id),
    module_index INTEGER,
    questions JSONB NOT NULL,
    answers JSONB,
    score INTEGER,
    ai_feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 8. ESCALATIONS TABLE (Governance)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.escalations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id),
    issue_type TEXT NOT NULL CHECK (issue_type IN ('academic', 'technical', 'payment', 'conduct', 'other')),
    severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'resolved', 'closed')),
    assigned_to UUID REFERENCES public.profiles(id),
    description TEXT NOT NULL,
    resolution_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    audit_log JSONB DEFAULT '[]'
);

-- =====================================================
-- 9. ALUMNI PROFILES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.alumni_profiles (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    graduation_date TIMESTAMPTZ,
    current_employer TEXT,
    job_title TEXT,
    linkedin_url TEXT,
    success_story TEXT,
    success_video_url TEXT,
    testimonial TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 10. MENTORSHIP SESSIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.mentorship_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mentor_id UUID NOT NULL REFERENCES public.profiles(id),
    mentee_id UUID NOT NULL REFERENCES public.profiles(id),
    session_type TEXT CHECK (session_type IN ('study_circle', 'mock_project', 'career_guidance', 'one_on_one')),
    scheduled_at TIMESTAMPTZ NOT NULL,
    duration_minutes INTEGER,
    notes TEXT,
    feedback JSONB,
    status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'rescheduled')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 11. JOB MATCHES TABLE (Employer Dashboard)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.job_matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    employer_id UUID NOT NULL REFERENCES public.profiles(id),
    candidate_id UUID NOT NULL REFERENCES public.profiles(id),
    job_title TEXT NOT NULL,
    match_score INTEGER,
    portfolio_pack JSONB,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'interview', 'hired', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 12. AUDIT LOGS TABLE (Compliance)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id),
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    old_data JSONB,
    new_data JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- CREATE INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_tier ON public.profiles(qualification_tier);
CREATE INDEX IF NOT EXISTS idx_courses_tier ON public.courses(qualification_tier);
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_user ON public.certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_interviews_user ON public.interviews(user_id);
CREATE INDEX IF NOT EXISTS idx_job_matches_employer ON public.job_matches(employer_id);
CREATE INDEX IF NOT EXISTS idx_job_matches_candidate ON public.job_matches(candidate_id);

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================
-- Enable RLS on tables
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.escalations ENABLE ROW LEVEL SECURITY;

-- Policies for courses (published courses viewable by all)
CREATE POLICY "Published courses viewable by all" ON public.courses
    FOR SELECT USING (is_published = true);

-- Policies for enrollments (users see their own)
CREATE POLICY "Users view own enrollments" ON public.enrollments
    FOR SELECT USING (auth.uid() = user_id);

-- Policies for certificates (users see their own)
CREATE POLICY "Users view own certificates" ON public.certificates
    FOR SELECT USING (auth.uid() = user_id);

-- Policies for interviews (users see their own)
CREATE POLICY "Users view own interviews" ON public.interviews
    FOR SELECT USING (auth.uid() = user_id);

-- =====================================================
-- INSERT SAMPLE COURSE DATA
-- =====================================================
INSERT INTO public.courses (title, description, qualification_tier, duration_hours, price, is_published, modules)
VALUES 
('AI Fundamentals', 'Introduction to Artificial Intelligence concepts and applications', 'low', 20, 0, true, '[{"title": "What is AI", "lessons": ["Introduction", "History", "Applications"]}]'),
('Prompt Engineering Mastery', 'Learn to craft effective prompts for AI models', 'medium', 30, 99, true, '[{"title": "Basics of Prompting", "lessons": ["Structure", "Context", "Examples"]}]'),
('AI System Design', 'Design and deploy production AI systems', 'high', 50, 299, true, '[{"title": "System Architecture", "lessons": ["Scalability", "Monitoring", "Deployment"]}]')
ON CONFLICT DO NOTHING;
