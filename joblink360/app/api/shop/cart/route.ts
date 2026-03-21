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
  if (!sb) return NextResponse.json({ items: [], total: 0 });
  return NextResponse.json({ items: [], total: 0, currency: "KES" });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const sb = db();
    if (sb) { try { await sb.from("cart_items").upsert(body); } catch(e) {} }
    return NextResponse.json({ success: true, cart: body });
  } catch(e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
