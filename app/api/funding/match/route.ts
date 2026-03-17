import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'startup';
    const amount = parseInt(searchParams.get('amount') || '0');
    
    // Mock funding opportunities
    const funding = [
      {
        id: 'fund_1',
        name: 'SME Growth Fund',
        provider: 'KCB Bank',
        type: 'Loan',
        amount_min: 100000,
        amount_max: 5000000,
        interest_rate: '12% p.a.',
        tenure: '1-3 years',
        requirements: ['Business Registration', 'Bank statements'],
        match_score: 94,
        deadline: '2026-05-30',
        region: 'Kenya'
      },
      {
        id: 'fund_2',
        name: 'Women in Tech Grant',
        provider: 'UN Women',
        type: 'Grant',
        amount_min: 500000,
        amount_max: 2000000,
        interest_rate: '0%',
        tenure: 'N/A',
        requirements: ['Women-led', 'Tech focused'],
        match_score: 67,
        deadline: '2026-04-15',
        region: 'East Africa'
      },
      {
        id: 'fund_3',
        name: 'Green Energy Investment',
        provider: 'AfDB',
        type: 'Equity',
        amount_min: 5000000,
        amount_max: 50000000,
        interest_rate: 'Equity stake',
        tenure: '5-7 years',
        requirements: ['Environmental license', 'Feasibility study'],
        match_score: 45,
        deadline: '2026-07-20',
        region: 'Africa'
      }
    ];

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      total_opportunities: funding.length,
      funding: funding.map(f => ({
        ...f,
        matched_at: new Date().toISOString(),
        application_status: 'open'
      })),
      filters_applied: { type, amount }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to find funding' },
      { status: 500 }
    );
  }
}
