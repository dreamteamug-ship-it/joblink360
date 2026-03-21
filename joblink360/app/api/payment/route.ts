export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server';

export async function POST(request) {
  const { method, amount, currency } = await request.json();
  
  if (method === 'mpesa') {
    return NextResponse.json({ 
      success: true, 
      message: "M-PESA STK Push initiated", 
      checkoutRequestId: "ws_CO_" + Date.now() 
    });
  }
  return NextResponse.json({ success: true, url: "/stripe-checkout" });
}
