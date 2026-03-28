import { NextResponse } from 'next/server';
import { config } from '@/lib/amanda-config';

export const dynamic = 'force-dynamic';

export async function GET() {
  const key = config.geminiKey;
  const status = key ? "CONNECTED" : "DISCONNECTED";
  const partialKey = key ? *** : "NONE";

  return NextResponse.json({
    service: "Amanda AI Core",
    status: status,
    env: process.env.NODE_ENV,
    key_check: partialKey,
    timestamp: new Date().toISOString()
  });
}
