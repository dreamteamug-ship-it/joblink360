// app/api/finance/profit-loss/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const pl = {
      revenue: 4920000,
      expenses: {
        operational: 1476000,
        marketing: 492000,
        salaries: 738000,
        infrastructure: 246000,
        total: 2952000
      },
      grossProfit: 1968000,
      netProfit: 1476000,
      margins: {
        gross: 40,
        net: 30
      }
    };

    return NextResponse.json(pl);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch P&L' }, { status: 500 });
  }
}