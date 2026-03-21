// app/api/hello/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'JobLink 360 API is working!',
    status: 'active',
    paybill: '400200',
    account: '4045731',
    bank: 'NCBA 8515130017',
    timestamp: new Date().toISOString()
  });
}