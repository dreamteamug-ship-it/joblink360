export const dynamic = 'force-dynamic'

// app/api/commission/summary/route.ts
// Fixed commission route with proper Supabase client

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get commissions for the user
    const { data: commissions, error } = await supabase
      .from('commissions')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const totalEarned = commissions?.reduce((sum, c) => sum + c.amount, 0) || 0;
    const pendingPayout = commissions?.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.agent_share, 0) || 0;
    const paidPayout = commissions?.filter(c => c.status === 'paid').reduce((sum, c) => sum + c.agent_share, 0) || 0;

    return NextResponse.json({
      success: true,
      data: {
        totalEarned,
        pendingPayout,
        paidPayout,
        commissions: commissions || []
      }
    });
  } catch (error: any) {
    console.error('Commission summary error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { paymentId, amount, percentage } = await request.json();

    if (!paymentId) {
      return NextResponse.json({ error: 'Payment ID required' }, { status: 400 });
    }

    const { data: commission, error } = await supabase
      .from('commissions')
      .insert({
        payment_id: paymentId,
        user_id: session.user.id,
        amount: amount || 0,
        percentage: percentage || 3,
        status: 'pending',
        platform_share: (amount || 0) * 0.3,
        agent_share: (amount || 0) * 0.7
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data: commission
    });
  } catch (error: any) {
    console.error('Commission tracking error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
