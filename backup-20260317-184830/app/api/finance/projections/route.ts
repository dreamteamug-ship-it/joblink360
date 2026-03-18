// app/api/finance/projections/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const projections = {
      monthly: [
        { month: "2026-03", revenue: 4920000, profit: 3444000 },
        { month: "2026-04", revenue: 6150000, profit: 4305000 },
        { month: "2026-05", revenue: 7687500, profit: 5381250 },
        { month: "2026-06", revenue: 9609375, profit: 6726563 }
      ],
      quarterly: [
        { quarter: "Q1 2026", revenue: 14760000, profit: 10332000 },
        { quarter: "Q2 2026", revenue: 23449219, profit: 16414453 }
      ],
      annual: [
        { year: 2026, revenue: 85000000, profit: 59500000 },
        { year: 2027, revenue: 250000000, profit: 175000000 }
      ]
    };

    return NextResponse.json(projections);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projections' }, { status: 500 });
  }
}