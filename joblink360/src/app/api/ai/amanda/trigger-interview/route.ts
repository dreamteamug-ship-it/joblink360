// src/app/api/ai/amanda/trigger-interview/route.ts
import { NextResponse } from 'next/server';
import { amanda } from '@/lib/ai/ultimate-amanda';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { paymentId, hardened } = await request.json();
    
    if (!hardened) return NextResponse.json({ error: 'Payment not hardened' }, { status: 400 });

    const supabase = createClient();
    
    // Get user details associated with the payment
    const { data: payment } = await supabase
      .from('payments')
      .select('user_id, amount, currency')
      .eq('id', paymentId)
      .single();

    if (!payment) throw new Error('Payment record not found');

    // AMANDA MISSION: Transform learner into earner
    const amandaMessage = `Jambo! I have verified your payment of ${payment.currency} ${payment.amount}. 
    Your account is now HARDENED on the NCBA 8515130017 node. 
    I am ready for our Day 1 Interview to build your 90-day income plan. 
    When are you ready to start?`;

    // Log the automated interaction in the Swarm Dashboard
    console.log(`[Swarm] Amanda triggering interview for User: ${payment.user_id}`);

    return NextResponse.json({ 
      success: true, 
      message: amandaMessage,
      status: 'INTERVIEW_PENDING' 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
