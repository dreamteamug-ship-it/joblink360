import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    summary: "Abim-Nyanza Corridor Analysis",
    metrics: {
      landed_cost: "92.45",
      market_wholesale: 165,
      potential_margin_percent: "32.5",
      status: "HIGHLY_VIABLE"
    },
    intel: "Abim district production is stable. Logistics remains the primary margin lever."
  });
}
