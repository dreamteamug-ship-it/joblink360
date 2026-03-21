export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { tenderScanner } from "@/lib/scrapers/tenders/tender-scanner";

export async function GET() {
  try {
    const tenders = await tenderScanner.scanAll();
    return NextResponse.json({
      status: "active",
      count: tenders.length,
      tenders: tenders.slice(0, 50),
      lastScanned: new Date().toISOString(),
      sources: ["World Bank Procurement", "AfDB", "UNDP", "UNOPS"]
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
