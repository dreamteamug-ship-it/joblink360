-- =====================================================
-- COMPREHENSIVE DATA POPULATION FOR ALL PORTALS
-- =====================================================

-- Create tenders table if not exists
CREATE TABLE IF NOT EXISTS tenders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    country VARCHAR(100),
    category VARCHAR(100),
    description TEXT,
    budget VARCHAR(100),
    deadline DATE,
    reference_number VARCHAR(100),
    source_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clear existing data to avoid duplicates (optional - comment out if you want to keep existing)
-- TRUNCATE courses CASCADE;
-- TRUNCATE jobs CASCADE;
-- TRUNCATE funding_opportunities CASCADE;
-- TRUNCATE tenders CASCADE;

-- =====================================================
-- COURSES PORTAL
-- =====================================================
INSERT INTO courses (title, slug, description, level, duration_hours, price, is_published, featured, enrollment_count, rating) VALUES
('AI & Machine Learning Fundamentals', 'ai-ml-fundamentals', 'Master AI concepts, neural networks, and ML algorithms from scratch', 'beginner', 40, 89.99, true, true, 320, 4.8),
('Full-Stack Web Development', 'fullstack-web-dev', 'Learn React, Node.js, Express, and MongoDB to build complete web apps', 'intermediate', 60, 129.99, true, true, 450, 4.9),
('Mobile App Development with React Native', 'react-native-mobile', 'Build cross-platform mobile apps for iOS and Android', 'intermediate', 50, 109.99, true, true, 280, 4.7),
('Blockchain & Web3 Development', 'blockchain-web3', 'Learn Solidity, Smart Contracts, and DeFi applications', 'advanced', 45, 149.99, true, false, 180, 4.6),
('Data Science with Python', 'data-science-python', 'Pandas, NumPy, Matplotlib, and machine learning with scikit-learn', 'intermediate', 55, 119.99, true, true, 380, 4.8),
('Cybersecurity Fundamentals', 'cybersecurity-fundamentals', 'Learn ethical hacking, network security, and threat prevention', 'beginner', 35, 79.99, true, false, 210, 4.5),
('Cloud Computing with AWS', 'aws-cloud-computing', 'Master AWS services, EC2, S3, Lambda, and cloud architecture', 'intermediate', 48, 139.99, true, true, 290, 4.7),
('UI/UX Design Masterclass', 'ui-ux-design', 'Learn Figma, user research, prototyping, and design systems', 'beginner', 42, 99.99, true, true, 260, 4.6),
('DevOps & CI/CD Pipeline', 'devops-ci-cd', 'Docker, Kubernetes, Jenkins, and automated deployment', 'advanced', 52, 159.99, true, false, 190, 4.8),
('Digital Marketing Strategy', 'digital-marketing', 'SEO, social media, content marketing, and analytics', 'beginner', 38, 89.99, true, true, 310, 4.5)
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- JOBS PORTAL
-- =====================================================
INSERT INTO jobs (title, company, location, job_type, description, salary_min, salary_max, currency, source_url) VALUES
('Senior Frontend Developer', 'TechInnovate Inc.', 'Remote', 'Full-time', 'Lead frontend development using React, TypeScript, and modern frameworks', 90000, 140000, 'USD', 'https://example.com/job/senior-frontend'),
('Backend Engineer (Node.js)', 'DataFlow Systems', 'San Francisco, CA', 'Full-time', 'Build scalable APIs and microservices with Node.js and PostgreSQL', 95000, 150000, 'USD', 'https://example.com/job/backend-node'),
('Data Scientist', 'AnalyticsCorp', 'New York, NY', 'Full-time', 'Apply machine learning models to solve business problems', 100000, 160000, 'USD', 'https://example.com/job/data-scientist'),
('Mobile App Developer', 'AppMasters', 'Remote', 'Contract', 'Develop iOS/Android apps with React Native and Swift', 80000, 120000, 'USD', 'https://example.com/job/mobile-dev'),
('DevOps Engineer', 'CloudScale', 'Austin, TX', 'Full-time', 'Manage cloud infrastructure and CI/CD pipelines on AWS', 95000, 145000, 'USD', 'https://example.com/job/devops'),
('UX/UI Designer', 'DesignStudio', 'Los Angeles, CA', 'Full-time', 'Create beautiful interfaces and user experiences for web and mobile', 75000, 110000, 'USD', 'https://example.com/job/ux-ui'),
('Blockchain Developer', 'CryptoVentures', 'Remote', 'Full-time', 'Develop smart contracts and DeFi applications on Ethereum', 110000, 180000, 'USD', 'https://example.com/job/blockchain'),
('Cloud Architect', 'InfraTech', 'Seattle, WA', 'Full-time', 'Design and implement cloud solutions on Azure and AWS', 120000, 190000, 'USD', 'https://example.com/job/cloud-architect'),
('AI Research Engineer', 'AILabs', 'Boston, MA', 'Full-time', 'Research and implement cutting-edge AI algorithms', 130000, 200000, 'USD', 'https://example.com/job/ai-research'),
('Full Stack Developer', 'StartupHub', 'Remote', 'Full-time', 'Build end-to-end web applications with modern stack', 85000, 130000, 'USD', 'https://example.com/job/fullstack')
ON CONFLICT DO NOTHING;

-- =====================================================
-- FUNDING OPPORTUNITIES PORTAL
-- =====================================================
INSERT INTO funding_opportunities (title, donor, amount, deadline, country, category, description, source_url, probability) VALUES
('World Bank Innovation Grant', 'World Bank', '$500,000', '2024-12-31', ARRAY['Global'], 'Technology', 'Funding for innovative tech solutions in developing countries', 'https://worldbank.org/grants/innovation', 'High'),
('EU Digital Transformation Fund', 'European Union', '€1,000,000', '2024-10-15', ARRAY['EU'], 'Digital', 'Support for digital transformation projects across Europe', 'https://ec.europa.eu/digital-fund', 'Medium'),
('Gates Foundation Health Tech Grant', 'Bill & Melinda Gates Foundation', '$750,000', '2024-11-30', ARRAY['Global'], 'Health', 'Funding for health technology innovations in Africa', 'https://gatesfoundation.org/grants', 'High'),
('USAID Education Initiative', 'USAID', '$300,000', '2024-09-30', ARRAY['Africa', 'Asia'], 'Education', 'Support for educational technology projects', 'https://usaid.gov/education-grants', 'Medium'),
('Google AI for Social Good', 'Google.org', '$250,000', '2024-08-31', ARRAY['Global'], 'AI', 'Grants for AI projects addressing social challenges', 'https://google.org/ai-grants', 'High'),
('African Development Bank SME Fund', 'AfDB', '$2,000,000', '2024-12-15', ARRAY['Africa'], 'Business', 'Funding for small and medium enterprises in Africa', 'https://afdb.org/sme-fund', 'Medium'),
('UN Sustainable Development Grant', 'United Nations', '$1,500,000', '2024-11-15', ARRAY['Global'], 'Sustainability', 'Support for projects aligned with UN SDGs', 'https://un.org/sdg-grants', 'High'),
('MasterCard Foundation Youth Fund', 'MasterCard Foundation', '$3,000,000', '2024-10-31', ARRAY['Africa'], 'Youth', 'Empowering youth through education and entrepreneurship', 'https://mastercardfdn.org/youth-fund', 'High')
ON CONFLICT DO NOTHING;

-- =====================================================
-- TENDERS PORTAL
-- =====================================================
INSERT INTO tenders (title, organization, country, category, description, budget, deadline, reference_number, source_url) VALUES
('National Digital Infrastructure Project', 'Government of Kenya', 'Kenya', 'ICT', 'Development of national digital infrastructure and e-government services', '$50,000,000', '2024-07-15', 'GOK/ICT/2024/001', 'https://tenders.go.ke/digital-infra'),
('Renewable Energy Power Plant', 'World Bank', 'Uganda', 'Energy', 'Construction of 100MW solar power plant', '$120,000,000', '2024-08-30', 'WB/ENERGY/2024/045', 'https://worldbank.org/tenders/energy'),
('Smart City Development', 'African Development Bank', 'Rwanda', 'Urban Development', 'Development of smart city infrastructure in Kigali', '$80,000,000', '2024-09-20', 'AfDB/URBAN/2024/023', 'https://afdb.org/tenders/smart-city'),
('Healthcare System Modernization', 'European Union', 'Ghana', 'Health', 'Modernization of national healthcare IT systems', '$65,000,000', '2024-08-15', 'EU/HEALTH/2024/078', 'https://ec.europa.eu/tenders/health'),
('Agricultural Technology Program', 'USAID', 'Tanzania', 'Agriculture', 'Implementation of digital agriculture solutions', '$30,000,000', '2024-07-31', 'USAID/AGRI/2024/012', 'https://usaid.gov/tenders/agriculture'),
('Education Technology Initiative', 'UNESCO', 'Nigeria', 'Education', 'Deployment of edtech solutions in public schools', '$25,000,000', '2024-09-10', 'UNESCO/EDU/2024/034', 'https://unesco.org/tenders/education'),
('Water Management System', 'Asian Development Bank', 'Philippines', 'Water', 'Smart water management and distribution system', '$45,000,000', '2024-08-25', 'ADB/WATER/2024/056', 'https://adb.org/tenders/water'),
('Transport Infrastructure Upgrade', 'World Bank', 'India', 'Transport', 'Modernization of public transportation systems', '$200,000,000', '2024-10-15', 'WB/TRANS/2024/089', 'https://worldbank.org/tenders/transport'),
('Cybersecurity Enhancement Project', 'Government of South Africa', 'South Africa', 'Security', 'National cybersecurity infrastructure upgrade', '$35,000,000', '2024-07-30', 'RSA/SEC/2024/067', 'https://tenders.gov.za/cybersecurity'),
('Digital Financial Services', 'MasterCard Foundation', 'Multiple', 'Finance', 'Expansion of digital financial services in Africa', '$75,000,000', '2024-09-30', 'MCF/FIN/2024/091', 'https://mastercardfdn.org/tenders/finance')
ON CONFLICT DO NOTHING;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);
CREATE INDEX IF NOT EXISTS idx_courses_published ON courses(is_published);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON jobs(location);
CREATE INDEX IF NOT EXISTS idx_jobs_type ON jobs(job_type);
CREATE INDEX IF NOT EXISTS idx_funding_deadline ON funding_opportunities(deadline);
CREATE INDEX IF NOT EXISTS idx_funding_donor ON funding_opportunities(donor);
CREATE INDEX IF NOT EXISTS idx_tenders_deadline ON tenders(deadline);
CREATE INDEX IF NOT EXISTS idx_tenders_country ON tenders(country);
CREATE INDEX IF NOT EXISTS idx_tenders_category ON tenders(category);

-- Enable RLS for tenders
ALTER TABLE tenders ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "Allow public read access to tenders" ON tenders FOR SELECT USING (true);

-- Show results
SELECT '✅ Data Population Complete!' as status;
SELECT 'Courses' as portal, COUNT(*) as count FROM courses
UNION ALL
SELECT 'Jobs', COUNT(*) FROM jobs
UNION ALL
SELECT 'Funding', COUNT(*) FROM funding_opportunities
UNION ALL
SELECT 'Tenders', COUNT(*) FROM tenders;
