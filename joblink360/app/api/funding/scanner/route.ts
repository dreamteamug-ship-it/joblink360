// app/api/funding/scanner/route.ts
import { NextResponse } from 'next/server';
import { fundingScanner } from '@/lib/scrapers/funding/funding-scanner';

export async function GET() {
  try {
    const opportunities = await fundingScanner.scanAll();
    
    return NextResponse.json({
      success: true,
      count: opportunities.length,
      opportunities: opportunities,
      message: `Scanned ${opportunities.length} funding opportunities`
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}