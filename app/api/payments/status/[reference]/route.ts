// app/api/payments/status/[reference]/route.ts
import { NextResponse } from 'next/server';

// Mock payment status storage (in production, use your database)
const payments: Record<string, any> = {};

export async function GET(
  req: Request,
  { params }: { params: { reference: string } }
) {
  try {
    const { reference } = params;
    
    // Simulate payment lookup
    const payment = payments[reference] || {
      reference,
      status: 'pending',
      amount: 38900,
      currency: 'KES',
      method: 'mpesa',
      timestamp: new Date().toISOString(),
      message: 'Payment is being processed'
    };
    
    return NextResponse.json({ 
      success: true,
      payment 
    });
  } catch (error) {
    console.error('Payment status error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get payment status' },
      { status: 500 }
    );
  }
}

// Allow updating payment status (for webhooks)
export async function POST(
  req: Request,
  { params }: { params: { reference: string } }
) {
  try {
    const { reference } = params;
    const body = await req.json();
    
    payments[reference] = {
      ...payments[reference],
      ...body,
      reference,
      updatedAt: new Date().toISOString()
    };
    
    return NextResponse.json({ 
      success: true,
      payment: payments[reference]
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update payment' },
      { status: 500 }
    );
  }
}