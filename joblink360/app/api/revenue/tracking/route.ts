export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

export async function GET() {
  // Return live revenue data structure
  // In production this pulls from Supabase payments table
  return NextResponse.json({
    daily: 0,
    weekly: 0,
    monthly: 0,
    target: 10000,
    conversionRate: 3.2,
    currency: "USD",
    paybill: "400200",
    account: "4045731",
    lastUpdated: new Date().toISOString()
  });
}
