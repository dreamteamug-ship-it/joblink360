// lib/commission/tracker.ts
import { supabase } from '@/lib/supabase/client';
import { calculateCommission } from '@/lib/subscription/enterprise/tiers';

export class CommissionTracker {
  
  async recordFundingMatch(opportunityId: string, userId: string, fundingAmount: number): Promise<any> {
    const { data: subscription } = await supabase
      .from('user_subscriptions')
      .select('tier')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();
    
    const tier = subscription?.tier || 'professional';
    const commission = calculateCommission(tier, fundingAmount, 'funding');
    
    const { data, error } = await supabase
      .from('commissions')
      .insert({
        user_id: userId,
        opportunity_id: opportunityId,
        type: 'funding_match',
        transaction_value: fundingAmount,
        commission_rate: commission.rate,
        commission_calculated: commission.calculated,
        commission_final: commission.capped,
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select();
    
    if (error) throw error;
    return { success: true, commission: data[0], breakdown: commission };
  }
  
  async recordTenderClosure(tenderId: string, userId: string, tenderValue: number): Promise<any> {
    const { data: subscription } = await supabase
      .from('user_subscriptions')
      .select('tier')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();
    
    const tier = subscription?.tier || 'professional';
    const commission = calculateCommission(tier, tenderValue, 'tender');
    
    const { data, error } = await supabase
      .from('commissions')
      .insert({
        user_id: userId,
        tender_id: tenderId,
        type: 'tender_closure',
        transaction_value: tenderValue,
        commission_rate: commission.rate,
        commission_calculated: commission.calculated,
        commission_final: commission.capped,
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select();
    
    if (error) throw error;
    return { success: true, commission: data[0], breakdown: commission };
  }
  
  async getUserCommissionSummary(userId: string): Promise<any> {
    const { data: commissions } = await supabase
      .from('commissions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    const summary = {
      total_pending: 0,
      total_paid: 0,
      total_earned: 0,
      by_type: {
        funding: { pending: 0, paid: 0, total: 0 },
        tender: { pending: 0, paid: 0, total: 0 }
      }
    };
    
    commissions?.forEach(c => {
      if (c.status === 'pending') {
        summary.total_pending += c.commission_final;
        summary.by_type[c.type === 'funding_match' ? 'funding' : 'tender'].pending += c.commission_final;
      } else if (c.status === 'paid') {
        summary.total_paid += c.commission_final;
        summary.by_type[c.type === 'funding_match' ? 'funding' : 'tender'].paid += c.commission_final;
      }
      summary.total_earned += c.commission_final;
      summary.by_type[c.type === 'funding_match' ? 'funding' : 'tender'].total += c.commission_final;
    });
    
    return summary;
  }
}

export const commissionTracker = new CommissionTracker();