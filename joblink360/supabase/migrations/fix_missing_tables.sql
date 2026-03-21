-- ============================================
-- CREATE MISSING TABLES FOR FUNDING OPPORTUNITIES
-- Run this in Supabase SQL Editor IMMEDIATELY
-- ============================================

-- Create the main funding opportunities table
CREATE TABLE IF NOT EXISTS funding_opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    amount TEXT,
    amount_max DECIMAL(15,2),
    currency VARCHAR(3) DEFAULT 'USD',
    deadline TIMESTAMPTZ,
    country TEXT,
    location TEXT,
    category TEXT,
    success_rate INTEGER DEFAULT 75,
    source_url TEXT,
    opportunity_id VARCHAR(255) UNIQUE,
    donor VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active',
    probability DECIMAL(5,2),
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for high-speed searching
CREATE INDEX IF NOT EXISTS idx_funding_country ON funding_opportunities(country);
CREATE INDEX IF NOT EXISTS idx_funding_organization ON funding_opportunities(organization);
CREATE INDEX IF NOT EXISTS idx_funding_deadline ON funding_opportunities(deadline);
CREATE INDEX IF NOT EXISTS idx_funding_status ON funding_opportunities(status);

-- Enable RLS
ALTER TABLE funding_opportunities ENABLE ROW LEVEL SECURITY;

-- Allow public read access (adjust as needed)
CREATE POLICY "Allow public read access" ON funding_opportunities
    FOR SELECT USING (true);

-- Create tenders table if not exists
CREATE TABLE IF NOT EXISTS tenders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tender_id VARCHAR(255) UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    country VARCHAR(100),
    deadline TIMESTAMPTZ,
    value DECIMAL(15,2),
    currency VARCHAR(3),
    category VARCHAR(100),
    source VARCHAR(255),
    url TEXT,
    probability DECIMAL(5,2),
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tenders_country ON tenders(country);
CREATE INDEX IF NOT EXISTS idx_tenders_status ON tenders(status);

-- Create user_subscriptions table if not exists
CREATE TABLE IF NOT EXISTS user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    tier VARCHAR(20) NOT NULL CHECK (tier IN ('professional', 'premium', 'enterprise')),
    status VARCHAR(20) DEFAULT 'active',
    start_date TIMESTAMPTZ DEFAULT NOW(),
    end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON user_subscriptions(user_id);

-- Verify tables were created
SELECT tablename FROM pg_tables WHERE schemaname = 'public' 
AND tablename IN ('funding_opportunities', 'tenders', 'user_subscriptions');