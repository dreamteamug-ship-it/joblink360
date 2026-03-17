// app/api/payments/process/route.ts
import { NextResponse } from 'next/server';
import { PAYMENT_CHANNELS } from '@/lib/payments/payment-config';

export async function POST(req: Request) {
  try {
    const { channel, amount, currency, country } = await req.json();
    const paymentChannel = PAYMENT_CHANNELS[channel];
    
    if (!paymentChannel) {
      return NextResponse.json({ error: 'Invalid payment channel' }, { status: 400 });
    }

    const reference = `PAY-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    let qrCode = null;
    if (channel === 'CHINA_SILK_ROAD') {
      qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=china-silk-${reference}`;
    }

    return NextResponse.json({
      success: true,
      reference,
      channel: paymentChannel.name,
      instructions: paymentChannel.instructions,
      qrCode,
      amount,
      currency,
      status: 'pending',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json({ error: 'Payment processing failed' }, { status: 500 });
  }
}
