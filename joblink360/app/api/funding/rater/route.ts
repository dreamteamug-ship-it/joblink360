// app/api/funding/rater/route.ts
import { NextResponse } from 'next/server';
import { fundingRater } from '@/lib/agents/funding/funding-refiner';

export async function POST(request: Request) {
  try {
    const { opportunity } = await request.json();
    const rating = await fundingRater.rateOpportunity(opportunity);
    
    return NextResponse.json({
      success: true,
      rating
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}