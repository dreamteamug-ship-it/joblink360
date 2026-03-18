// app/api/v1/finance/revenue-summary/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const summary = {
      total: 1440000,
      weeklyTarget: 3000000,
      weeklyActual: 1440000,
      students: 12,
      farmers: 847,
      dispatches: 23,
      yields: {
        soybeans: 312,
        maize: 528,
        total: 840
      },
      yieldValue: 42000000
    };

    return NextResponse.json(summary);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch revenue' }, { status: 500 });
  }
}