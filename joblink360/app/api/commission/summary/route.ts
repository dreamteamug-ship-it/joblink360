export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

function db() {
  const u = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const k = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!u || u.includes('placeholder')) return null;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { createClient } = require('@supabase/supabase-js');
  return createClient(u, k);
}

export async function GET(request: Request) {
  const sb = db();
  if (!sb) return NextResponse.json({ totalEarned: 0, pendingPayout: 0, paidPayout: 0, commissions: [] });
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });
    const { data } = await sb.from("commissions").select("*").eq("user_id", userId);
    const commissions = data || [];
    return NextResponse.json({
      totalEarned: commissions.reduce((s: number, c: any) => s + (c.amount || 0), 0),
      pendingPayout: commissions.filter((c: any) => c.status === "pending").reduce((s: number, c: any) => s + (c.agent_share || 0), 0),
      paidPayout: commissions.filter((c: any) => c.status === "paid").reduce((s: number, c: any) => s + (c.agent_share || 0), 0),
      commissions
    });
  } catch(e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    return NextResponse.json({ success: true, received: body, timestamp: new Date().toISOString() });
  } catch(e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
