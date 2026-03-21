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
  return NextResponse.json({ status: "active", service: "AI Course Generator" });
}

export async function POST(request: Request) {
  try {
    const { topic, level = "beginner", weeks = 4 } = await request.json().catch(() => ({}));
    const key = process.env.OPENROUTER_API_KEY;
    if (!key) return NextResponse.json({ error: "API key required" }, { status: 500 });
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "anthropic/claude-3.5-sonnet", messages: [{ role: "user", content: `Create a ${weeks}-week ${level} course on "${topic}" for African learners. JSON format: { title, modules: [{week, title, objectives, assignment}], income_potential }` }], max_tokens: 2000 })
    });
    const data = await res.json();
    return NextResponse.json({ course: data.choices?.[0]?.message?.content, generated: true });
  } catch(e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
