export const dynamic = 'force-dynamic'

// app/api/subscription/upgrade/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { SubscriptionTiers } from '@/lib/subscription/tiers';

export async function POST(request: Request) {
  try {
    const { tier, paymentMethod } = await request.json();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const tierConfig = SubscriptionTiers[tier.toUpperCase()];
    if (!tierConfig) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }
    
    // Process payment (integrate with M-PESA/Stripe here)
    const paymentSuccess = true; // Simulate for now
    
    if (paymentSuccess) {
      // Update user subscription
      const { error } = await supabase
        .from('user_subscriptions')
        .insert({
          user_id: user.id,
          tier: tier.toLowerCase(),
          status: 'active',
          start_date: new Date().toISOString(),
          end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          payment_method: paymentMethod
        });
      
      if (error) throw error;
      
      // Update auth.users metadata
      await supabase.auth.updateUser({
        data: { subscription_tier: tier.toLowerCase() }
      });
      
      return NextResponse.json({
        success: true,
        tier: tierConfig,
        message: `Upgraded to ${tierConfig.name} tier successfully!`
      });
    }
    
    return NextResponse.json({ error: 'Payment failed' }, { status: 400 });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
