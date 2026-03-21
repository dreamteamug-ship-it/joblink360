-- ============================================
-- SETUP ADMIN USER ROLES
-- Run this in Supabase SQL Editor AFTER migration
-- ============================================

-- Step 1: Find your user ID
-- Run this query to get your user ID from email:
SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';

-- Step 2: Replace 'YOUR_USER_ID_HERE' with your actual UUID and run:
-- INSERT INTO user_roles (user_id, role) VALUES ('YOUR_USER_ID_HERE', 'admin');

-- Step 3: Verify admin was created:
SELECT u.email, r.role, r.created_at
FROM user_roles r
JOIN auth.users u ON u.id = r.user_id
WHERE r.role = 'admin';

-- Optional: Add finance team members
-- INSERT INTO user_roles (user_id, role) VALUES ('ANOTHER_USER_ID', 'finance');