// app/api/payments/callback/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reference, status, provider } = body;

    console.log(`Payment callback received: ${reference} - ${status} from ${provider}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Webhook received' 
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { success: false, error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}