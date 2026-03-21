// lib/commission/tracker.ts
// Commission Tracker for JobLink 360

export interface Commission {
  id: string;
  userId: string;
  amount: number;
  percentage: number;
  tier: string;
  paymentId: string;
  platformShare: number;
  agentShare: number;
  status: 'pending' | 'paid' | 'failed';
  createdAt: string;
  paidAt?: string;
}

export class CommissionTracker {
  private supabase: any;

  constructor(supabaseClient: any) {
    this.supabase = supabaseClient;
  }

  async trackCommission(paymentId: string): Promise<Commission | null> {
    try {
      const { data: payment } = await this.supabase
        .from('payments')
        .select('user_id, amount, metadata')
        .eq('id', paymentId)
        .single();

      if (!payment) return null;

      const { data: userTier } = await this.supabase
        .from('user_subscriptions')
        .select('tier')
        .eq('user_id', payment.user_id)
        .eq('status', 'active')
        .single();

      const tier = userTier?.tier || 'professional';
      let percentage = 3;
      let cap = 500000;

      switch (tier) {
        case 'premium':
          percentage = 2.5;
          cap = 750000;
          break;
        case 'enterprise':
          percentage = 2;
          cap = 1000000;
          break;
      }

      const commissionAmount = Math.min(payment.amount * percentage / 100, cap);
      const platformShare = commissionAmount * 0.3;
      const agentShare = commissionAmount * 0.7;

      const { data: commission, error } = await this.supabase
        .from('commissions')
        .insert({
          payment_id: paymentId,
          user_id: payment.user_id,
          amount: commissionAmount,
          percentage: percentage,
          tier: tier,
          platform_share: platformShare,
          agent_share: agentShare,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;
      return commission;

    } catch (error) {
      console.error('Error tracking commission:', error);
      return null;
    }
  }

  async getCommissionSummary(userId: string): Promise<{
    totalEarned: number;
    pendingPayout: number;
    paidPayout: number;
    commissions: Commission[];
  }> {
    try {
      const { data: commissions, error } = await this.supabase
        .from('commissions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const totalEarned = commissions?.reduce((sum, c) => sum + c.amount, 0) || 0;
      const pendingPayout = commissions?.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.agent_share, 0) || 0;
      const paidPayout = commissions?.filter(c => c.status === 'paid').reduce((sum, c) => sum + c.agent_share, 0) || 0;

      return {
        totalEarned,
        pendingPayout,
        paidPayout,
        commissions: commissions || []
      };
    } catch (error) {
      console.error('Error getting commission summary:', error);
      return { totalEarned: 0, pendingPayout: 0, paidPayout: 0, commissions: [] };
    }
  }
}

export default CommissionTracker;