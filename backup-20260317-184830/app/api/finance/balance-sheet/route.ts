// app/api/finance/balance-sheet/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const balanceSheet = {
      assets: {
        current: 25000000,
        fixed: 15000000,
        total: 40000000
      },
      liabilities: {
        current: 5000000,
        longTerm: 10000000,
        total: 15000000
      },
      equity: {
        shareCapital: 20000000,
        retainedEarnings: 5000000,
        total: 25000000
      }
    };

    return NextResponse.json(balanceSheet);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch balance sheet' }, { status: 500 });
  }
}