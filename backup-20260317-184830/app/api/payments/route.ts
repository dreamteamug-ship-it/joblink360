import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { amount, phone, type } = await req.json();
    
    // Mock M-Pesa payment processing
    const paymentResult = {
      success: true,
      transactionId: 'MP' + Date.now(),
      amount: amount,
      phone: phone,
      status: 'completed',
      message: 'Payment processed successfully',
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json(paymentResult);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Payment failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return payment history
  return NextResponse.json({
    success: true,
    payments: [
      { id: 1, amount: 15000, date: '2026-03-15', status: 'completed' },
      { id: 2, amount: 5000, date: '2026-03-10', status: 'completed' }
    ]
  });
}
