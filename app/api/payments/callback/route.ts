import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('M-Pesa Callback Received:', body)

    // Update your database/payment status here
    // Example: await db.payment.update({ 
    //   where: { checkoutRequestID: body.Body.stkCallback.CheckoutRequestID },          //   data: { status: 'success' } 
    // })

    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' })
  } catch (error) {
    console.error('M-Pesa Callback Error:', error)
    return NextResponse.json(
      { ResultCode: 1, ResultDesc: 'Rejected' },
      { status: 500 }
    )
  }
}
export const dynamic = 'force-dynamic';
