// src/types/index.ts
// Global type definitions for Vulture-Eye

export interface Payment {
  id: string;
  transaction_id: string;
  user_id: string;
  amount: number;
  currency: string;
  payment_method: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'disputed' | 'hardened';
  manual_verified_by?: string;
  manual_verified_at?: string;
  verification_notes?: string;
  afripesa_reference?: string;
  afripesa_settlement_date?: string;
  reconciled_at?: string;
  reconciled_by?: string;
  bank_reference?: string;
  reconciliation_method?: string;
  metadata?: any;
  created_at: string;
  updated_at: string;
}

export interface VerificationQueue {
  id: string;
  payment_id: string;
  mpesa_confirmation_code?: string;
  bank_slip_url?: string;
  sender_phone?: string;
  sender_name?: string;
  status: 'pending' | 'verified' | 'rejected' | 'escalated';
  assigned_to?: string;
  created_at: string;
  verified_at?: string;
  notes?: string;
  payments?: Payment;
}

export interface ReconciliationResult {
  status: 'HARDENED' | 'PENDING' | 'FAILED' | 'DUPLICATE';
  latency: number;
  paymentId?: string;
  error?: string;
  bankReference?: string;
  apiLatency?: number;
}

export interface SettlementStats {
  today_total: number;
  pending_verification: number;
  completed_today: number;
  weekly_growth: number;
  by_method: Record<string, number>;
  by_currency: Record<string, number>;
}