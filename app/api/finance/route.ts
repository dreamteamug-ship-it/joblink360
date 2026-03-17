// app/api/finance/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const financialData = {
      revenue: {
        total: 4920000,
        mrr: 4920000,
        arr: 59040000,
        byStream: {
          training: 120000,
          placement: 150000,
          agriculture: 4200000,
          parking: 450000
        }
      },
      metrics: {
        cac: 25000,
        ltv: 600000,
        ltvCacRatio: 24,
        churnRate: 5,
        burnRate: 1500000,
        runway: 24
      },
      projections: {
        monthly: [
          { month: "2026-03", revenue: 4920000, profit: 3444000, students: 12, farmers: 847 },
          { month: "2026-04", revenue: 6150000, profit: 4305000, students: 18, farmers: 950 }
        ]
      },
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(financialData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch financial data' }, { status: 500 });
  }
}