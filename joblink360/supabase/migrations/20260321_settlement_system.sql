-- ============================================
-- SETTLEMENT LEDGER SYSTEM MIGRATION
-- Run this in Supabase SQL Editor
-- Migration ID: 20260321_settlement_system
-- ============================================

-- 1. PAYMENTS TABLE (Core transaction record)
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    transaction_id VARCHAR(255) UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    
    -- Payment details
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) NOT NULL CHECK (currency IN ('KES', 'NGN', 'ZAR', 'GHS', 'USD', 'TZS', 'UGX')),
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('mpesa', 'equity_bank', 'afripesa', 'paypal', 'flutterwave', 'paystack', 'pesalink')),
    
    -- Status tracking
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded', 'disputed')),
    
    -- For manual verification (Hustle Mode)
    manual_verified_by UUID REFERENCES auth.users(id),
    manual_verified_at TIMESTAMPTZ,
    verification_notes TEXT,
    
    -- AfriPesa specific
    afripesa_reference VARCHAR(255),
    afripesa_settlement_date DATE,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb
);

-- 2. SETTLEMENT_LEDGER (Daily reconciliation)
CREATE TABLE IF NOT EXISTS settlement_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    settlement_date DATE NOT NULL,
    
    -- Totals by currency
    currency VARCHAR(3) NOT NULL,
    total_payments DECIMAL(15,2) DEFAULT 0,
    total_fees DECIMAL(15,2) DEFAULT 0,
    total_settled DECIMAL(15,2) DEFAULT 0,
    
    -- Breakdown by method
    mpesa_amount DECIMAL(15,2) DEFAULT 0,
    equity_amount DECIMAL(15,2) DEFAULT 0,
    afripesa_amount DECIMAL(15,2) DEFAULT 0,
    paypal_amount DECIMAL(15,2) DEFAULT 0,
    flutterwave_amount DECIMAL(15,2) DEFAULT 0,
    paystack_amount DECIMAL(15,2) DEFAULT 0,
    pesalink_amount DECIMAL(15,2) DEFAULT 0,
    
    -- Reconciliation
    bank_statement_reference VARCHAR(255),
    reconciled_by UUID REFERENCES auth.users(id),
    reconciled_at TIMESTAMPTZ,
    reconciliation_notes TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(settlement_date, currency)
);

-- 3. COMMISSIONS TABLE (For agent fees)
CREATE TABLE IF NOT EXISTS commissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id UUID REFERENCES payments(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    
    -- Commission details
    amount DECIMAL(12,2) NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    tier VARCHAR(20) CHECK (tier IN ('professional', 'premium', 'enterprise')),
    
    -- Distribution
    platform_share DECIMAL(12,2) NOT NULL,
    agent_share DECIMAL(12,2) NOT NULL,
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed')),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    paid_at TIMESTAMPTZ
);

-- 4. VERIFICATION_QUEUE (For manual Hustle Mode)
CREATE TABLE IF NOT EXISTS verification_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id UUID REFERENCES payments(id) ON DELETE CASCADE,
    
    -- Evidence
    mpesa_confirmation_code VARCHAR(50),
    bank_slip_url TEXT,
    sender_phone VARCHAR(20),
    sender_name VARCHAR(255),
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected', 'escalated')),
    
    -- Assignment
    assigned_to UUID REFERENCES auth.users(id),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    verified_at TIMESTAMPTZ,
    
    notes TEXT
);

-- 5. AFRI_PESA_WEBHOOK_LOG (For debugging)
CREATE TABLE IF NOT EXISTS afripesa_webhook_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    webhook_id VARCHAR(255),
    event_type VARCHAR(100),
    
    -- Payload
    raw_payload JSONB,
    parsed_data JSONB,
    
    -- Processing
    status VARCHAR(20) DEFAULT 'received' CHECK (status IN ('received', 'processed', 'failed')),
    error_message TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    processed_at TIMESTAMPTZ
);

-- 6. USER_ROLES (For admin access)
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'finance', 'support', 'user')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, role)
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);
CREATE INDEX IF NOT EXISTS idx_payments_transaction_id ON payments(transaction_id);
CREATE INDEX IF NOT EXISTS idx_settlement_ledger_date ON settlement_ledger(settlement_date);
CREATE INDEX IF NOT EXISTS idx_commissions_payment_id ON commissions(payment_id);
CREATE INDEX IF NOT EXISTS idx_verification_queue_status ON verification_queue(status);
CREATE INDEX IF NOT EXISTS idx_afripesa_webhook_created ON afripesa_webhook_log(created_at);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_payments_updated_at ON payments;
CREATE TRIGGER update_payments_updated_at 
    BEFORE UPDATE ON payments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_settlement_ledger_updated_at ON settlement_ledger;
CREATE TRIGGER update_settlement_ledger_updated_at 
    BEFORE UPDATE ON settlement_ledger 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Auto-calculate commission on payment completion
CREATE OR REPLACE FUNCTION calculate_commission()
RETURNS TRIGGER AS $$
DECLARE
    user_tier VARCHAR(20);
    commission_percentage DECIMAL(5,2);
    cap_amount DECIMAL(12,2);
    commission_amount DECIMAL(12,2);
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        -- Get user's subscription tier
        SELECT tier INTO user_tier 
        FROM user_subscriptions 
        WHERE user_id = NEW.user_id AND status = 'active'
        ORDER BY created_at DESC LIMIT 1;
        
        -- Set commission rate based on tier
        CASE user_tier
            WHEN 'professional' THEN
                commission_percentage := 3;
                cap_amount := 500000;
            WHEN 'premium' THEN
                commission_percentage := 2.5;
                cap_amount := 750000;
            WHEN 'enterprise' THEN
                commission_percentage := 2;
                cap_amount := 1000000;
            ELSE
                commission_percentage := 3;
                cap_amount := 500000;
        END CASE;
        
        -- Calculate commission (capped)
        commission_amount := LEAST(NEW.amount * commission_percentage / 100, cap_amount);
        
        -- Insert commission record
        INSERT INTO commissions (
            payment_id, user_id, amount, percentage, tier,
            platform_share, agent_share, status
        ) VALUES (
            NEW.id, NEW.user_id, commission_amount, commission_percentage, user_tier,
            commission_amount * 0.3, commission_amount * 0.7, 'pending'
        );
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS calculate_commission_on_payment ON payments;
CREATE TRIGGER calculate_commission_on_payment
    AFTER UPDATE ON payments
    FOR EACH ROW
    EXECUTE FUNCTION calculate_commission();

-- Get settlement stats function
CREATE OR REPLACE FUNCTION get_settlement_stats()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result JSONB;
    today DATE := CURRENT_DATE;
BEGIN
    WITH today_stats AS (
        SELECT 
            COALESCE(SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END), 0) as total_today,
            COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_count,
            COALESCE(jsonb_object_agg(payment_method, SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END)), '{}'::jsonb) as by_method,
            COALESCE(jsonb_object_agg(currency, SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END)), '{}'::jsonb) as by_currency
        FROM payments
        WHERE DATE(created_at) = today
        GROUP BY payment_method, currency
    ),
    pending_count AS (
        SELECT COUNT(*) as pending
        FROM verification_queue
        WHERE status IN ('pending', 'escalated')
    ),
    weekly_trend AS (
        SELECT 
            CASE 
                WHEN SUM(CASE WHEN DATE(created_at) BETWEEN today - INTERVAL '14 days' AND today - INTERVAL '7 days' THEN amount ELSE 0 END) > 0
                THEN (SUM(CASE WHEN DATE(created_at) >= today - INTERVAL '7 days' THEN amount ELSE 0 END)::float /
                     SUM(CASE WHEN DATE(created_at) BETWEEN today - INTERVAL '14 days' AND today - INTERVAL '7 days' THEN amount ELSE 0 END) - 1) * 100
                ELSE 0
            END as growth
        FROM payments
        WHERE status = 'completed'
    )
    SELECT jsonb_build_object(
        'today_total', COALESCE((SELECT total_today FROM today_stats), 0),
        'pending_verification', COALESCE((SELECT pending FROM pending_count), 0),
        'completed_today', COALESCE((SELECT completed_count FROM today_stats), 0),
        'weekly_growth', COALESCE((SELECT growth FROM weekly_trend), 0),
        'by_method', COALESCE((SELECT by_method FROM today_stats), '{}'::jsonb),
        'by_currency', COALESCE((SELECT by_currency FROM today_stats), '{}'::jsonb)
    ) INTO result;
    
    RETURN result;
END;
$$;

-- Verify manual payment function
CREATE OR REPLACE FUNCTION verify_manual_payment(
    p_verification_id UUID,
    p_payment_id UUID,
    p_action VARCHAR(20),
    p_notes TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_admin_id UUID;
BEGIN
    -- Get current admin ID
    v_admin_id := auth.uid();
    
    -- Update verification queue
    UPDATE verification_queue
    SET 
        status = CASE WHEN p_action = 'verify' THEN 'verified' ELSE 'rejected' END,
        verified_at = NOW(),
        notes = COALESCE(p_notes, notes),
        assigned_to = v_admin_id
    WHERE id = p_verification_id;
    
    -- Update payment status
    IF p_action = 'verify' THEN
        UPDATE payments
        SET 
            status = 'completed',
            manual_verified_by = v_admin_id,
            manual_verified_at = NOW(),
            verification_notes = p_notes
        WHERE id = p_payment_id;
    ELSE
        UPDATE payments
        SET 
            status = 'failed',
            verification_notes = p_notes
        WHERE id = p_payment_id;
    END IF;
END;
$$;

-- Auto create settlement ledger (run daily)
CREATE OR REPLACE FUNCTION auto_create_settlement_ledger()
RETURNS VOID
LANGUAGE plpgsql
AS $$
DECLARE
    v_date DATE := CURRENT_DATE - INTERVAL '1 day';
BEGIN
    INSERT INTO settlement_ledger (settlement_date, currency, total_payments, total_fees, total_settled, mpesa_amount, equity_amount, afripesa_amount, paypal_amount, flutterwave_amount, paystack_amount, pesalink_amount)
    SELECT 
        v_date,
        currency,
        SUM(amount) as total_payments,
        SUM(amount * 0.3) as total_fees,
        SUM(amount * 0.7) as total_settled,
        SUM(CASE WHEN payment_method = 'mpesa' THEN amount ELSE 0 END) as mpesa_amount,
        SUM(CASE WHEN payment_method = 'equity_bank' THEN amount ELSE 0 END) as equity_amount,
        SUM(CASE WHEN payment_method = 'afripesa' THEN amount ELSE 0 END) as afripesa_amount,
        SUM(CASE WHEN payment_method = 'paypal' THEN amount ELSE 0 END) as paypal_amount,
        SUM(CASE WHEN payment_method = 'flutterwave' THEN amount ELSE 0 END) as flutterwave_amount,
        SUM(CASE WHEN payment_method = 'paystack' THEN amount ELSE 0 END) as paystack_amount,
        SUM(CASE WHEN payment_method = 'pesalink' THEN amount ELSE 0 END) as pesalink_amount
    FROM payments
    WHERE DATE(created_at) = v_date
        AND status = 'completed'
    GROUP BY currency
    ON CONFLICT (settlement_date, currency) DO UPDATE SET
        total_payments = EXCLUDED.total_payments,
        total_fees = EXCLUDED.total_fees,
        total_settled = EXCLUDED.total_settled,
        mpesa_amount = EXCLUDED.mpesa_amount,
        equity_amount = EXCLUDED.equity_amount,
        afripesa_amount = EXCLUDED.afripesa_amount,
        paypal_amount = EXCLUDED.paypal_amount,
        flutterwave_amount = EXCLUDED.flutterwave_amount,
        paystack_amount = EXCLUDED.paystack_amount,
        pesalink_amount = EXCLUDED.pesalink_amount;
END;
$$;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE settlement_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE afripesa_webhook_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Users can view their own payments
DROP POLICY IF EXISTS users_view_own_payments ON payments;
CREATE POLICY users_view_own_payments ON payments
    FOR SELECT USING (auth.uid() = user_id);

-- Admins can view all payments
DROP POLICY IF EXISTS admins_view_all_payments ON payments;
CREATE POLICY admins_view_all_payments ON payments
    FOR ALL USING (auth.uid() IN (SELECT user_id FROM user_roles WHERE role IN ('admin', 'finance')));

-- Similar policies for other tables
DROP POLICY IF EXISTS admins_view_settlements ON settlement_ledger;
CREATE POLICY admins_view_settlements ON settlement_ledger
    FOR ALL USING (auth.uid() IN (SELECT user_id FROM user_roles WHERE role IN ('admin', 'finance')));

DROP POLICY IF EXISTS admins_view_commissions ON commissions;
CREATE POLICY admins_view_commissions ON commissions
    FOR ALL USING (auth.uid() IN (SELECT user_id FROM user_roles WHERE role IN ('admin', 'finance')));

DROP POLICY IF EXISTS admins_view_verification ON verification_queue;
CREATE POLICY admins_view_verification ON verification_queue
    FOR ALL USING (auth.uid() IN (SELECT user_id FROM user_roles WHERE role IN ('admin', 'finance', 'support')));
