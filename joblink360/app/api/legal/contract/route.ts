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
  return NextResponse.json({ status: "active", service: "Legal Contract Generator", countries: ["KE","TZ","UG","ZA","NG","GH"] });
}

export async function POST(request: Request) {
  try {
    const { worker_id, employer_id, country_code = "KE", salary = 0 } = await request.json().catch(() => ({}));
    const key = process.env.OPENROUTER_API_KEY;
    if (!key) return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "anthropic/claude-3.5-sonnet", messages: [{ role: "user", content: `Generate a professional employment contract for ${country_code}. Salary: ${salary}. Include local labor law compliance, tax deductions, termination clauses.` }], max_tokens: 2000 })
    });
    const data = await res.json();
    const contract = data.choices?.[0]?.message?.content || "Contract generation failed";
    const sb = db();
    if (sb) { try { await sb.from("legal_contracts").insert({ worker_id, employer_id, country_code, contract_text: contract, created_at: new Date().toISOString() }); } catch(e) {} }
    return NextResponse.json({ success: true, contract, country: country_code });
  } catch(e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
