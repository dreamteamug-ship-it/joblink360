-- ============================================
-- VULTURE-EYE DATABASE UPDATE
-- Add HARDENED status and reconciliation tracking
-- ============================================

-- Add 'hardened' status to payments table
ALTER TABLE payments 
DROP CONSTRAINT IF EXISTS payments_status_check;

ALTER TABLE payments 
ADD CONSTRAINT payments_status_check 
CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded', 'disputed', 'hardened'));

-- Add reconciliation tracking fields
ALTER TABLE payments 
ADD COLUMN IF NOT EXISTS reconciled_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS reconciled_by VARCHAR(255),
ADD COLUMN IF NOT EXISTS bank_reference VARCHAR(255),
ADD COLUMN IF NOT EXISTS reconciliation_method VARCHAR(50) DEFAULT 'manual';

-- Create reconciliation_logs table for audit
CREATE TABLE IF NOT EXISTS reconciliation_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id UUID REFERENCES payments(id) ON DELETE CASCADE,
    confirmation_code VARCHAR(50) NOT NULL,
    bank_reference VARCHAR(255),
    reconciliation_status VARCHAR(20) NOT NULL,
    latency_ms INTEGER,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    processed_at TIMESTAMPTZ
);

-- Create index for fast lookup
CREATE INDEX IF NOT EXISTS idx_reconciliation_logs_code ON reconciliation_logs(confirmation_code);
CREATE INDEX IF NOT EXISTS idx_payments_hardened ON payments(status) WHERE status = 'hardened';

-- Create function to auto-update settlement ledger on hardened status
CREATE OR REPLACE FUNCTION update_settlement_on_harden()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'hardened' AND OLD.status != 'hardened' THEN
        -- Trigger settlement ledger update
        PERFORM auto_create_settlement_ledger();
        
        -- Log the hardening event
        INSERT INTO reconciliation_logs (payment_id, confirmation_code, reconciliation_status, processed_at)
        VALUES (
            NEW.id, 
            COALESCE(NEW.metadata->>'confirmation_code', 'AUTO'), 
            'HARDENED',
            NOW()
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_settlement_on_harden ON payments;
CREATE TRIGGER trigger_settlement_on_harden
    AFTER UPDATE ON payments
    FOR EACH ROW
    EXECUTE FUNCTION update_settlement_on_harden();

-- Enhanced verification function with hardening
CREATE OR REPLACE FUNCTION verify_and_harden_payment(
    p_verification_id UUID,
    p_payment_id UUID,
    p_confirmation_code VARCHAR(50),
    p_bank_reference VARCHAR(255) DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_admin_id UUID;
    v_result JSONB;
BEGIN
    -- Get current admin ID
    v_admin_id := auth.uid();
    
    -- Update verification queue
    UPDATE verification_queue
    SET 
        status = 'verified',
        verified_at = NOW(),
        assigned_to = v_admin_id,
        notes = COALESCE(notes, 'Auto-verified by Vulture-Eye')
    WHERE id = p_verification_id;
    
    -- Update payment to hardened status
    UPDATE payments
    SET 
        status = 'hardened',
        manual_verified_by = v_admin_id,
        manual_verified_at = NOW(),
        reconciled_at = NOW(),
        reconciled_by = v_admin_id::text,
        bank_reference = p_bank_reference,
        metadata = metadata || jsonb_build_object(
            'confirmation_code', p_confirmation_code,
            'reconciliation_method', 'vulture-eye',
            'hardened_at', NOW()
        )
    WHERE id = p_payment_id;
    
    -- Return success with metadata
    SELECT jsonb_build_object(
        'status', 'HARDENED',
        'payment_id', p_payment_id,
        'verification_id', p_verification_id,
        'timestamp', NOW()
    ) INTO v_result;
    
    RETURN v_result;
END;
$$;

-- Additional: Access Logs Table
-- Add access_logs table if not exists
CREATE TABLE IF NOT EXISTS access_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    payment_id UUID REFERENCES payments(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_access_logs_user_id ON access_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_access_logs_payment_id ON access_logs(payment_id);
CREATE INDEX IF NOT EXISTS idx_access_logs_created_at ON access_logs(created_at);

-- Enable RLS
ALTER TABLE access_logs ENABLE ROW LEVEL SECURITY;

-- Admins can view all access logs
CREATE POLICY admins_view_access_logs ON access_logs
    FOR ALL USING (auth.uid() IN (SELECT user_id FROM user_roles WHERE role IN ('admin', 'finance')));

-- Users can view their own access logs
CREATE POLICY users_view_own_access_logs ON access_logs
    FOR SELECT USING (auth.uid() = user_id);
