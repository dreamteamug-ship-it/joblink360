// app/api/payments/china/route.ts
import { NextResponse } from 'next/server';
import { paymentProcessor } from '@/lib/payments/processor';

export async function POST(request: Request) {
  try {
    const { amount, currency, method } = await request.json();
    
    // Validate
    if (!['CNY', 'USD'].includes(currency)) {
      return NextResponse.json(
        { success: false, error: 'Currency must be CNY or USD' },
        { status: 400 }
      );
    }
    
    if (!['alipay', 'wechat'].includes(method)) {
      return NextResponse.json(
        { success: false, error: 'Method must be alipay or wechat' },
        { status: 400 }
      );
    }
    
    // Generate payment QR code (mock)
    const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=china-silk-${Date.now()}`;
    
    const result = await paymentProcessor.processChinaSilk(amount, currency, method);
    
    return NextResponse.json({
      ...result,
      qrCode,
      instructions: `Scan QR code with ${method} app to complete payment`
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Payment failed' },
      { status: 500 }
    );
  }
}
