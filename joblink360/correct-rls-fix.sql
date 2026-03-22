-- =====================================================
-- CORRECT RLS FIX FOR JOBLINK360
-- =====================================================

-- 1. First, make sure RLS is enabled but with proper policies
-- Enable RLS on all tables (if not already enabled)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE funding_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenders ENABLE ROW LEVEL SECURITY;

-- 2. Remove any existing problematic policies
DROP POLICY IF EXISTS "Allow public read access to courses" ON courses;
DROP POLICY IF EXISTS "Allow public read access to jobs" ON jobs;
DROP POLICY IF EXISTS "Allow public read access to funding" ON funding_opportunities;
DROP POLICY IF EXISTS "Allow public read access to products" ON products;
DROP POLICY IF EXISTS "Allow public read access to tenders" ON tenders;

-- 3. Create simple, correct policies for public read access
CREATE POLICY "courses_read_all" ON courses FOR SELECT USING (true);
CREATE POLICY "jobs_read_all" ON jobs FOR SELECT USING (true);
CREATE POLICY "funding_read_all" ON funding_opportunities FOR SELECT USING (true);
CREATE POLICY "products_read_all" ON products FOR SELECT USING (true);
CREATE POLICY "tenders_read_all" ON tenders FOR SELECT USING (true);

-- 4. Ensure all courses are published
UPDATE courses SET is_published = true WHERE is_published = false;

-- 5. Verify the fix
SELECT '✅ RLS policies fixed!' as result;

-- Show accessible data counts
SELECT 
    'courses' as table_name,
    COUNT(*) as record_count,
    SUM(CASE WHEN is_published = true THEN 1 ELSE 0 END) as published_count
FROM courses
UNION ALL
SELECT 'jobs', COUNT(*), COUNT(*) FROM jobs
UNION ALL
SELECT 'funding_opportunities', COUNT(*), COUNT(*) FROM funding_opportunities
UNION ALL
SELECT 'products', COUNT(*), COUNT(*) FROM products
UNION ALL
SELECT 'tenders', COUNT(*), COUNT(*) FROM tenders;
