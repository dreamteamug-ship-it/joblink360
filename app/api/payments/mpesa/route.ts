// app/api/payments/mpesa/route.ts
import { NextResponse } from 'next/server';
import { paymentProcessor } from '@/lib/payments/processor';

export async function POST(request: Request) {
  try {
    const { phone, amount, account } = await request.json();
    
    // Validate M-PESA number
    if (!phone.match(/^254[0-9]{9}$/)) {
      return NextResponse.json(
        { success: false, error: 'Invalid M-PESA number. Use format 2547XXXXXXXX' },
        { status: 400 }
      );
    }
    
    // Process payment
    const result = await paymentProcessor.processMpesa(phone, amount, account);
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Payment failed' },
      { status: 500 }
    );
  }
}
