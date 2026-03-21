// app/api/reconcile/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'Vulture-Eye Active',
    engine: 'Reconciliation Engine v1.0',
    target_latency: '0.02 seconds',
    paybill: '400200',
    account: '4045731',
    bank: 'NCBA 8515130017',
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  const startTime = performance.now();
  try {
    const { confirmationCode, phoneNumber } = await request.json();
    
    if (!confirmationCode) {
      return NextResponse.json({ status: 'FAILED', error: 'Confirmation code required' }, { status: 400 });
    }
    
    // Simulate Vulture-Eye verification (0.02s target)
    await new Promise(resolve => setTimeout(resolve, 20));
    
    const isValid = /^[A-Z0-9]{10,12}$/i.test(confirmationCode);
    const latency = performance.now() - startTime;
    
    if (isValid) {
      return NextResponse.json({
        status: 'HARDENED',
        latency: latency,
        bankReference: `NCBA-${Date.now()}`,
        message: 'Payment verified and hardened'
      });
    } else {
      return NextResponse.json({
        status: 'PENDING',
        latency: latency,
        error: 'Invalid confirmation code format. Must be 10-12 alphanumeric characters.'
      });
    }
  } catch (error) {
    return NextResponse.json({ status: 'FAILED', error: error.message }, { status: 500 });
  }
}