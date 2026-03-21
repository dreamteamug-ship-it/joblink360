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
  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return NextResponse.json({ error: "No Gemini key" }, { status: 500 });
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${key}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: "Say hello from JobLink 360 in 1 sentence." }] }] })
    });
    const data = await res.json();
    return NextResponse.json({ response: data.candidates?.[0]?.content?.parts?.[0]?.text, status: "ok" });
  } catch(e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    return NextResponse.json({ success: true, received: body, timestamp: new Date().toISOString() });
  } catch(e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
