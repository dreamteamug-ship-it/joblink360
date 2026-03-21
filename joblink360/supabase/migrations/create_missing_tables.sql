-- CREATE FUNDING OPPORTUNITIES TABLE
-- Run this in Supabase SQL Editor IMMEDIATELY

CREATE TABLE IF NOT EXISTS public.funding_opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    opportunity_id VARCHAR(255) UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    donor VARCHAR(100),
    country VARCHAR(100),
    category VARCHAR(100),
    deadline TIMESTAMPTZ,
    amount DECIMAL(15,2),
    currency VARCHAR(3),
    status VARCHAR(50) DEFAULT 'new',
    probability DECIMAL(5,2),
    source_url TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_funding_opportunities_donor ON funding_opportunities(donor);
CREATE INDEX IF NOT EXISTS idx_funding_opportunities_country ON funding_opportunities(country);
CREATE INDEX IF NOT EXISTS idx_funding_opportunities_status ON funding_opportunities(status);

-- Enable RLS
ALTER TABLE funding_opportunities ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for now)
CREATE POLICY "Allow public read access" ON funding_opportunities
    FOR SELECT USING (true);

-- Create commissions table if not exists
CREATE TABLE IF NOT EXISTS public.commissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id UUID REFERENCES payments(id),
    user_id UUID REFERENCES auth.users(id),
    amount DECIMAL(12,2) NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    tier VARCHAR(20),
    platform_share DECIMAL(12,2),
    agent_share DECIMAL(12,2),
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    paid_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_commissions_user_id ON commissions(user_id);

-- Create tenders table
CREATE TABLE IF NOT EXISTS public.tenders (
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

-- Create user_subscriptions table
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
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
SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename IN ('funding_opportunities', 'commissions', 'tenders', 'user_subscriptions');