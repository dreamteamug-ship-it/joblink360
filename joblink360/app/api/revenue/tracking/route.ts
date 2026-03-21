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
  if (!sb) return NextResponse.json({ daily:0, weekly:0, monthly:0, target:10000, conversionRate:3.2 });
  try {
    const { data } = await sb.from("payments").select("amount,created_at").eq("status","verified");
    const payments = data || [];
    const now = new Date(); const day = new Date(now - 86400000); const week = new Date(now - 604800000); const month = new Date(now - 2592000000);
    return NextResponse.json({
      daily: payments.filter((p: any) => new Date(p.created_at) > day).reduce((s: number,p: any) => s+(p.amount||0),0),
      weekly: payments.filter((p: any) => new Date(p.created_at) > week).reduce((s: number,p: any) => s+(p.amount||0),0),
      monthly: payments.filter((p: any) => new Date(p.created_at) > month).reduce((s: number,p: any) => s+(p.amount||0),0),
      target: 10000, conversionRate: 3.2
    });
  } catch(e: any) { return NextResponse.json({ daily:0,weekly:0,monthly:0,target:10000,conversionRate:3.2 }); }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    return NextResponse.json({ success: true, received: body, timestamp: new Date().toISOString() });
  } catch(e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
