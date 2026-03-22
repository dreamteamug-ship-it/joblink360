-- =====================================================
-- JOBS SCANNER - Real job opportunities
-- =====================================================

-- Jobs table for storing scraped opportunities
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT,
    country TEXT,
    description TEXT,
    requirements TEXT[],
    salary_min DECIMAL(10,2),
    salary_max DECIMAL(10,2),
    salary_currency VARCHAR(3) DEFAULT 'USD',
    job_type TEXT CHECK (job_type IN ('full-time', 'part-time', 'contract', 'remote', 'internship')),
    experience_level TEXT CHECK (experience_level IN ('entry', 'mid', 'senior', 'lead', 'executive')),
    category TEXT,
    source_url TEXT NOT NULL,
    source_name TEXT,
    posted_date TIMESTAMPTZ,
    deadline TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved jobs for users
CREATE TABLE IF NOT EXISTS public.saved_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    saved_at TIMESTAMPTZ DEFAULT NOW(),
    notes TEXT,
    UNIQUE(user_id, job_id)
);

-- Job applications tracking
CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
    applied_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'interview', 'rejected', 'offered', 'accepted')),
    notes TEXT,
    UNIQUE(user_id, job_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_jobs_company ON public.jobs(company);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON public.jobs(location);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON public.jobs(category);
CREATE INDEX IF NOT EXISTS idx_jobs_job_type ON public.jobs(job_type);
CREATE INDEX IF NOT EXISTS idx_jobs_is_active ON public.jobs(is_active);
CREATE INDEX IF NOT EXISTS idx_saved_jobs_user ON public.saved_jobs(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_user ON public.job_applications(user_id);
