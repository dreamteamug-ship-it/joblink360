export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/supabase';

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const { plan, paymentMethod } = await request.json();
  
  // M-PESA STK Push simulation
  if (paymentMethod === 'mpesa') {
    // Call your M-PESA service
    const response = await fetch('https://mpesa-service.vercel.app/api/mpesa/stkpush', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: user.user_metadata?.phone || '254718554383',
        amount: plan === 'monthly' ? 1500 : 12000,
        reference: `SUB-${user.id}`
      })
    });
    const data = await response.json();
    return NextResponse.json(data);
  }
  
  // Stripe checkout
  if (paymentMethod === 'stripe') {
    // Initialize Stripe checkout
    return NextResponse.json({ url: '/stripe-checkout' });
  }
  
  return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 });
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Get subscription status from database
  // For now, return mock data
  return NextResponse.json({
    active: true,
    plan: 'monthly',
    next_billing: '2026-04-20',
    price: 1500,
    currency: 'KES'
  });
}
