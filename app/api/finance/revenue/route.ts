// app/api/finance/revenue/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const revenue = {
      total: 4920000,
      breakdown: {
        training: 120000,
        placement: 150000,
        agriculture: 4200000,
        parking: 450000
      },
      historical: [
        { date: "2026-03-01", amount: 1440000 },
        { date: "2026-03-08", amount: 1600000 },
        { date: "2026-03-15", amount: 1880000 }
      ]
    };

    return NextResponse.json(revenue);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch revenue' }, { status: 500 });
  }
}