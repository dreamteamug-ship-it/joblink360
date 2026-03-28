import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { amount, phone, reference } = await req.json();

    console.log(`[MPESA STK PUSH] Initiated → Amount: ${amount} | Phone: ${phone} | Ref: ${reference}`);

    // Simulate successful STK push (replace with real Daraja integration later)
    return NextResponse.json({
      success: true,
      CustomerMessage: "Success. Request accepted for processing",
      MerchantRequestID: "mock-" + Date.now(),
      CheckoutRequestID: "mock-checkout-" + Date.now(),
      ResponseCode: "0",
      ResponseDescription: "Success. Request accepted for processing"
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Payment initiation failed" }, { status: 500 });
  }
}
