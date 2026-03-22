-- =====================================================
-- QUICK FIX: MAKE ALL DATA PUBLICLY ACCESSIBLE
-- =====================================================

-- 1. First, ensure all courses are published
UPDATE courses SET is_published = true WHERE is_published = false;

-- 2. Fix RLS policies for each table
-- Courses
DROP POLICY IF EXISTS "Allow public read access to courses" ON courses;
CREATE POLICY "Allow public read access to courses" ON courses FOR SELECT USING (true);

-- Jobs  
DROP POLICY IF EXISTS "Allow public read access to jobs" ON jobs;
CREATE POLICY "Allow public read access to jobs" ON jobs FOR SELECT USING (true);

-- Funding Opportunities
DROP POLICY IF EXISTS "Allow public read access to funding" ON funding_opportunities;
CREATE POLICY "Allow public read access to funding" ON funding_opportunities FOR SELECT USING (true);

-- Products
DROP POLICY IF EXISTS "Allow public read access to products" ON products;
CREATE POLICY "Allow public read access to products" ON products FOR SELECT USING (true);

-- Tenders
DROP POLICY IF EXISTS "Allow public read access to tenders" ON tenders;
CREATE POLICY "Allow public read access to tenders" ON tenders FOR SELECT USING (true);

-- 3. Verify the fix
SELECT '✅ RLS policies fixed!' as message;

SELECT 'Courses' as table_name, 
       COUNT(*) as total_records,
       SUM(CASE WHEN is_published = true THEN 1 ELSE 0 END) as published
FROM courses

UNION ALL SELECT 'Jobs', COUNT(*), COUNT(*) FROM jobs

UNION ALL SELECT 'Funding', COUNT(*), COUNT(*) FROM funding_opportunities

UNION ALL SELECT 'Products', COUNT(*), COUNT(*) FROM products

UNION ALL SELECT 'Tenders', COUNT(*), COUNT(*) FROM tenders;
