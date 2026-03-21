-- Create the missing Funding Opportunities table for the 26-Country Mesh
CREATE TABLE IF NOT EXISTS public.funding_opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor TEXT NOT NULL,
  amount TEXT,
  country TEXT NOT NULL,
  status TEXT DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Crucial: Reload the API schema cache so Vercel stops throwing PGRST205 errors
NOTIFY pgrst, 'reload schema';
