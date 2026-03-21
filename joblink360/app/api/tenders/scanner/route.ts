export const dynamic = 'force-dynamic'

// app/api/tenders/scanner/route.ts
import { NextResponse } from 'next/server';
import { tenderScanner } from '@/lib/scrapers/tenders/tender-scanner';

export async function GET() {
  try {
    const tenders = await tenderScanner.scanAll();
    return NextResponse.json({
      success: true,
      count: tenders.length,
      tenders: tenders
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
