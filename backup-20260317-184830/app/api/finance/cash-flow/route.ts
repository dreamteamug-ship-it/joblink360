// app/api/finance/cash-flow/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cashFlow = {
      operatingCash: 3444000,
      investingCash: -500000,
      financingCash: 0,
      netCashFlow: 2944000,
      beginningCash: 15000000,
      endingCash: 17944000
    };

    return NextResponse.json(cashFlow);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cash flow' }, { status: 500 });
  }
}