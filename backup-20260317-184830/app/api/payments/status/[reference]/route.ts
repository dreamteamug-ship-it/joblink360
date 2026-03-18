// app/api/payments/status/[reference]/route.ts
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { reference: string } }
) {
  const { reference } = params;
  
  return NextResponse.json({
    success: true,
    reference,
    status: 'completed',
    timestamp: new Date().toISOString()
  });
}