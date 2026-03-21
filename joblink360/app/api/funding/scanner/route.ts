export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { fundingScanner } from "@/lib/scrapers/funding/funding-scanner";

export async function GET() {
  try {
    const opportunities = await fundingScanner.scanAll();
    return NextResponse.json({
      status: "active",
      count: opportunities.length,
      opportunities: opportunities.slice(0, 50),
      lastScanned: new Date().toISOString(),
      sources: ["World Bank", "AfDB", "EU Grants", "USAID", "Gates Foundation", "Mastercard Foundation"]
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { country, category, minAmount } = await request.json();
    const all = await fundingScanner.scanAll();
    let filtered = all;
    if (country) filtered = filtered.filter((o: any) => o.country === country || o.countries === "ALL");
    if (category) filtered = filtered.filter((o: any) => o.category?.toLowerCase().includes(category.toLowerCase()));
    return NextResponse.json({ opportunities: filtered, count: filtered.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
