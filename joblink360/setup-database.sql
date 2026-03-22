-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    level VARCHAR(50) CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    duration_hours INTEGER DEFAULT 0,
    price DECIMAL(10,2) DEFAULT 0.00,
    is_published BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    enrollment_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    progress_percent INTEGER DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
    certificate_issued BOOLEAN DEFAULT false,
    UNIQUE(user_id, course_id)
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    job_type VARCHAR(50),
    description TEXT,
    salary_min DECIMAL(10,2),
    salary_max DECIMAL(10,2),
    currency VARCHAR(10) DEFAULT 'USD',
    source_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create funding_opportunities table
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);
CREATE INDEX IF NOT EXISTS idx_courses_published ON courses(is_published) WHERE is_published = true;
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON jobs(location);
CREATE INDEX IF NOT EXISTS idx_funding_deadline ON funding_opportunities(deadline);

-- Enable Row Level Security (RLS)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE funding_opportunities ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (read-only for anonymous users)
CREATE POLICY "Allow public read access to courses" ON courses
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to jobs" ON jobs
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to funding" ON funding_opportunities
    FOR SELECT USING (true);

-- Enrollment policies (users can only see their own enrollments)
CREATE POLICY "Users can view their own enrollments" ON enrollments
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own enrollments" ON enrollments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own enrollments" ON enrollments
    FOR UPDATE USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO courses (title, slug, description, level, duration_hours, price, is_published, featured, enrollment_count, rating) VALUES
('Web Development 101', 'web-development-101', 'Learn the fundamentals of web development with HTML, CSS, and JavaScript', 'beginner', 20, 49.99, true, true, 125, 4.8),
('React Masterclass', 'react-masterclass', 'Master React.js with hooks, context, and modern best practices', 'intermediate', 30, 79.99, true, true, 89, 4.9),
('Node.js Backend Development', 'nodejs-backend-development', 'Build scalable backend APIs with Node.js, Express, and MongoDB', 'advanced', 40, 99.99, true, false, 42, 4.7),
('Python for Data Science', 'python-for-data-science', 'Learn Python, Pandas, and machine learning for data analysis', 'intermediate', 35, 89.99, true, true, 156, 4.6),
('AI Fundamentals for Beginners', 'ai-fundamentals-for-beginners', 'Introduction to artificial intelligence and machine learning concepts', 'beginner', 25, 59.99, true, true, 78, 4.5);

INSERT INTO jobs (title, company, location, job_type, description, salary_min, salary_max, currency, source_url) VALUES
('Frontend Developer', 'TechCorp Inc.', 'Remote', 'Full-time', 'We are looking for a skilled Frontend Developer to join our team...', 60000, 90000, 'USD', 'https://example.com/job/123'),
('Backend Engineer', 'DataSystems LLC', 'New York, NY', 'Full-time', 'Join our backend team to build scalable APIs and services...', 80000, 120000, 'USD', 'https://example.com/job/124'),
('Data Analyst', 'AnalyticsPro', 'San Francisco, CA', 'Contract', 'Analyze data and provide insights for business decisions...', 70000, 95000, 'USD', 'https://example.com/job/125'),
('UX Designer', 'CreativeMinds', 'Remote', 'Part-time', 'Design user interfaces and experiences for our products...', 55000, 80000, 'USD', 'https://example.com/job/126');

INSERT INTO funding_opportunities (title, donor, amount, deadline, country, category, description, source_url, probability) VALUES
('Small Business Innovation Grant', 'National Science Foundation', '$50,000 - $250,000', '2024-06-30', '{"US"}', 'Technology', 'Funding for innovative small businesses in technology sectors', 'https://example.com/grant/1', 'High'),
('Women in Tech Scholarship', 'Women Tech Council', '$10,000', '2024-05-15', '{"Global"}', 'Education', 'Scholarship for women pursuing technology degrees', 'https://example.com/grant/2', 'Medium'),
('Startup Accelerator Program', 'TechStars', '$100,000', '2024-07-31', '{"Global"}', 'Startup', 'Equity-free funding and mentorship for early-stage startups', 'https://example.com/grant/3', 'High'),
('Green Energy Innovation Fund', 'Global Green Initiative', '$500,000', '2024-08-15', '{"Global"}', 'Environment', 'Funding for innovative green energy projects', 'https://example.com/grant/4', 'Medium');

-- Display success message
SELECT '? Database tables created and sample data inserted successfully!' as message;
