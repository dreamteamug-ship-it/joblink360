export const dynamic = 'force-dynamic'

// app/api/funding/processor/route.ts
import { NextResponse } from 'next/server';
import { fundingProcessor } from '@/lib/agents/funding/funding-processor';

export async function POST(request: Request) {
  try {
    const { opportunity } = await request.json();
    const processed = await fundingProcessor.processOpportunity(opportunity);
    
    return NextResponse.json({
      success: true,
      processed
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
