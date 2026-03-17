// app/api/international/opportunities/route.ts
import { NextResponse } from 'next/server';
import { INTERNATIONAL_OPPORTUNITIES, INTERNATIONAL_REGIONS } from '@/lib/data/international-config';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get('region');

    let opportunities = Object.entries(INTERNATIONAL_OPPORTUNITIES).map(([key, value]) => ({
      id: key,
      ...value
    }));

    if (region) {
      opportunities = opportunities.filter(opp => 
        opp.region.toLowerCase().includes(region.toLowerCase())
      );
    }

    return NextResponse.json({
      success: true,
      opportunities,
      total: opportunities.length,
      regions: INTERNATIONAL_REGIONS,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('International opportunities error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch international opportunities' },
      { status: 500 }
    );
  }
}
