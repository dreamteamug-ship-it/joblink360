export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { COUNTRIES } from '@/lib/countries/data';

// M-PESA (Kenya, Tanzania, Uganda)
async function processMpesa(amount: number, phone: string, country: string) {
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString('base64');

  const tokenRes = await fetch('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    headers: { Authorization: `Basic ${auth}` }
  });
  const { access_token } = await tokenRes.json();

  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
  const password = Buffer.from(
    `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
  ).toString('base64');

  const payload = {
    BusinessShortCode: process.env.MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: 'CustomerPayBillOnline',
    Amount: amount,
    PartyA: phone,
    PartyB: process.env.MPESA_SHORTCODE,
    PhoneNumber: phone,
    CallBackURL: `${process.env.NEXTAUTH_URL}/api/payments/callback/mpesa`,
    AccountReference: 'JobLink360',
    TransactionDesc: `Payment from ${country}`
  };

  const res = await fetch('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  return res.json();
}

// Airtel Money (Uganda, Rwanda, Zambia)
async function processAirtel(amount: number, phone: string, country: string) {
  // Airtel Money API integration
  return { success: true, message: 'Airtel Money processing' };
}

// TigoPesa (Tanzania)
async function processTigoPesa(amount: number, phone: string, country: string) {
  // TigoPesa API integration
  return { success: true, message: 'TigoPesa processing' };
}

// PayFast (South Africa)
async function processPayFast(amount: number, country: string) {
  // PayFast API integration
  return { success: true, redirect: 'https://payfast.co.za/engage' };
}

// China Silk Road (International)
async function processChinaSilk(amount: number, currency: string) {
  // China Silk Road / Alipay integration
  return { 
    success: true, 
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=chinasilk',
    message: 'Scan with Alipay/WeChat'
  };
}

// Stripe (All countries)
async function processStripe(amount: number, currency: string, country: string) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: currency.toLowerCase(),
    payment_method_types: ['card'],
    metadata: { country }
  });

  return { 
    success: true, 
    clientSecret: paymentIntent.client_secret 
  };
}

export async function POST(req: Request) {
  try {
    const { amount, phone, country, method } = await req.json();
    const countryInfo = COUNTRIES[country];

    let result;
    switch (method) {
      case 'mpesa':
        result = await processMpesa(amount, phone, country);
        break;
      case 'airtel':
        result = await processAirtel(amount, phone, country);
        break;
      case 'tigopesa':
        result = await processTigoPesa(amount, phone, country);
        break;
      case 'payfast':
        result = await processPayFast(amount, country);
        break;
      case 'chinasilk':
        result = await processChinaSilk(amount, countryInfo.currency);
        break;
      case 'stripe':
        result = await processStripe(amount, countryInfo.currency, country);
        break;
      default:
        return NextResponse.json({ error: 'Unsupported payment method' }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      ...result,
      country,
      currency: countryInfo.currency
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
