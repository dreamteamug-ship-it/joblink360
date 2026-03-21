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
  return NextResponse.json({ tiers: ["basic","professional","enterprise"], current: "basic" });
}

export async function POST(request: Request) {
  try {
    const { userId, tier } = await request.json().catch(() => ({}));
    const sb = db();
    if (sb) { try { await sb.from("subscriptions").upsert({ user_id: userId, tier, updated_at: new Date().toISOString() }); } catch(e) {} }
    return NextResponse.json({ success: true, tier, upgradedAt: new Date().toISOString() });
  } catch(e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
