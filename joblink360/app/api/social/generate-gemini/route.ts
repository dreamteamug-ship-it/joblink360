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
  return NextResponse.json({ status: "active", platforms: ["twitter","linkedin","whatsapp"] });
}

export async function POST(request: Request) {
  try {
    const { topic, platform = "linkedin", country = "KE" } = await request.json().catch(() => ({}));
    const key = process.env.GEMINI_API_KEY;
    if (!key) return NextResponse.json({ content: `Check out JobLink 360 - ${topic}! Pay via M-Pesa Paybill 400200.` });
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${key}`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: `Create a ${platform} post about: ${topic}. African context (${country}). Include call to action for JobLink 360. Max 280 chars for twitter.` }] }] })
    });
    const data = await res.json();
    return NextResponse.json({ content: data.candidates?.[0]?.content?.parts?.[0]?.text || `${topic} - JobLink 360` });
  } catch(e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
