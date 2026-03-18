import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, phoneNumber } = body

    // 1. Get M-Pesa access token (using your secrets)
    const auth = Buffer.from(
      `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
    ).toString('base64')

    const tokenResponse = await fetch(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      { headers: { Authorization: `Basic ${auth}` } }
    )
    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token

    // 2. Initiate STK Push
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3)
    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString('base64')

    const paymentResponse = await fetch(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          BusinessShortCode: process.env.MPESA_SHORTCODE,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: amount,
          PartyA: phoneNumber,
          PartyB: process.env.MPESA_SHORTCODE,
          PhoneNumber: phoneNumber,
          CallBackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/mpesa/callback`,
          AccountReference: 'JobLink360',
          TransactionDesc: 'Payment for services',
        }),
      }
    )

    return NextResponse.json(await paymentResponse.json())
  } catch (error) {
    return NextResponse.json({ error: 'Payment initiation failed' }, { status: 500 })
  }
}