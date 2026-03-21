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
  return NextResponse.json({ status: "active", methods: ["mpesa", "bank"], paybill: "400200", account: "4045731" });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const sb = db();
    if (sb) {
      try {
        await sb.from("payments").insert({ ...body, status: "pending", created_at: new Date().toISOString() });
      } catch(e) {}
    }
    return NextResponse.json({ success: true, status: "pending", paybill: "400200", account: "4045731" });
  } catch(e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
