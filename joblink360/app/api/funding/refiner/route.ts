export const dynamic = 'force-dynamic'

// app/api/funding/refiner/route.ts
import { NextResponse } from 'next/server';
import { fundingRefiner } from '@/lib/agents/funding/funding-refiner';

export async function POST(request: Request) {
  try {
    const { opportunities } = await request.json();
    const refined = await fundingRefiner.refineOpportunities(opportunities);
    
    return NextResponse.json({
      success: true,
      count: refined.length,
      opportunities: refined
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
