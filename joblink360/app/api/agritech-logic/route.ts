import { NextResponse } from 'next/server';
export async function GET() {
    return NextResponse.json({
        metrics: { potential_margin_percent: "32.5", landed_cost: "85", market_wholesale: "115" },
        intel: "Abim district production is stable. Logistics remains the primary margin lever."
    });
}
