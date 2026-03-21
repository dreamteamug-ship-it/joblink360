export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || url === "https://placeholder.supabase.co") return null;
  const { createClient } = require("@supabase/supabase-js");
  return createClient(url, key);
}

export async function GET() {
  return NextResponse.json({ status: "active", service: "Funding Response Handler" });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const sb = getSupabase();
    if (sb) {
      try {
        await sb.from("funding_responses").insert({ ...body, created_at: new Date().toISOString() });
      } catch (e) { console.log("DB insert skipped:", e); }
    }
    return NextResponse.json({ success: true, processed: true, timestamp: new Date().toISOString() });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
