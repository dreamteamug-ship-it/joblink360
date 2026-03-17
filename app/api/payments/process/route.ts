// app/api/payments/process/route.ts
import { NextResponse } from 'next/server';
import { PAYMENT_CHANNELS } from '@/lib/payments/payment-config';

export async function POST(req: Request) {
  try {
    const { channel, amount, currency } = await req.json();
    const paymentChannel = PAYMENT_CHANNELS[channel];
    
    if (!paymentChannel) {
      return NextResponse.json({ error: 'Invalid channel' }, { status: 400 });
    }

    const reference = `PAY-${Date.now()}`;

    return NextResponse.json({
      success: true,
      reference,
      channel: paymentChannel.name,
      instructions: paymentChannel.instructions,
      amount,
      currency,
      status: 'pending'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
  }
}