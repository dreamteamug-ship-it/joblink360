-- =====================================================
-- CORRECT RLS FIX FOR JOBLINK360 - BASED ON ACTUAL TABLES
-- =====================================================

-- Fix RLS for tables that actually exist in your database
-- Enable RLS on all tables
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE funding_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenders ENABLE ROW LEVEL SECURITY;

-- Remove any existing policies
DROP POLICY IF EXISTS "Allow public read access to courses" ON courses;
DROP POLICY IF EXISTS "Allow public read access to jobs" ON jobs;
DROP POLICY IF EXISTS "Allow public read access to funding" ON funding_opportunities;
DROP POLICY IF EXISTS "Allow public read access to products" ON products;
DROP POLICY IF EXISTS "Allow public read access to tenders" ON tenders;

DROP POLICY IF EXISTS "courses_read_all" ON courses;
DROP POLICY IF EXISTS "jobs_read_all" ON jobs;
DROP POLICY IF EXISTS "funding_read_all" ON funding_opportunities;
DROP POLICY IF EXISTS "products_read_all" ON products;
DROP POLICY IF EXISTS "tenders_read_all" ON tenders;

-- Create simple public read policies
CREATE POLICY "public_courses_read" ON courses FOR SELECT USING (true);
CREATE POLICY "public_jobs_read" ON jobs FOR SELECT USING (true);
CREATE POLICY "public_funding_read" ON funding_opportunities FOR SELECT USING (true);
CREATE POLICY "public_products_read" ON products FOR SELECT USING (true);
CREATE POLICY "public_tenders_read" ON tenders FOR SELECT USING (true);

-- Ensure all courses are published
UPDATE courses SET is_published = true WHERE is_published = false;

-- Verify the fix
SELECT '✅ RLS policies fixed for actual tables!' as result;

SELECT 
    'courses' as table_name,
    COUNT(*) as total_records,
    SUM(CASE WHEN is_published = true THEN 1 ELSE 0 END) as published
FROM courses
UNION ALL
SELECT 'jobs', COUNT(*), COUNT(*) FROM jobs
UNION ALL
SELECT 'funding_opportunities', COUNT(*), COUNT(*) FROM funding_opportunities
UNION ALL
SELECT 'products', COUNT(*), COUNT(*) FROM products
UNION ALL
SELECT 'tenders', COUNT(*), COUNT(*) FROM tenders;
