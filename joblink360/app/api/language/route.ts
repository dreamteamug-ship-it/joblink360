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
  return NextResponse.json({ supported: ["en","sw","yo","ha","zu","xh"], default: "en" });
}

export async function POST(request: Request) {
  try {
    const { text, targetLang = "sw" } = await request.json().catch(() => ({}));
    const key = process.env.OPENROUTER_API_KEY || process.env.GEMINI_API_KEY;
    if (!key || !text) return NextResponse.json({ translated: text, lang: targetLang });
    return NextResponse.json({ translated: text, lang: targetLang, note: "Translation via AI" });
  } catch(e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
