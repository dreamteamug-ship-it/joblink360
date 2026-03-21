// src/app/api/admin/payouts/calculate/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const supabase = createClient();
  
  // Logic: 60% Vendor | 30% Platform | 10% Infrastructure/Fees [cite: 3982, 5094]
  const { data: pending } = await supabase
    .from('commissions')
    .select('*')
    .eq('status', 'pending');

  const payouts = pending?.map(c => ({
    agent_id: c.user_id,
    amount_kes: c.amount * 0.7, // 70% of commission to agent
    platform_fee: c.amount * 0.3
  }));

  return NextResponse.json({ 
    success: true, 
    payout_cycle: "Weekly",
    total_disbursement: payouts?.reduce((a, b) => a + b.amount_kes, 0)
  });
}
