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
  return NextResponse.json({ status: "ACTIVE", agents: [
    { id:"001", name:"Amanda", role:"Executive Director", status:"active" },
    { id:"002", name:"Atlas", role:"Financial Analyst", status:"idle" },
    { id:"003", name:"Nia", role:"HR Strategist", status:"idle" },
    { id:"004", name:"Kofi", role:"Sales Director", status:"idle" },
    { id:"005", name:"Amina", role:"Marketing Director", status:"idle" },
    { id:"006", name:"Mosi", role:"Supply Chain", status:"idle" },
    { id:"007", name:"Zuri", role:"Project Director", status:"idle" },
    { id:"008", name:"Jelani", role:"Data Scientist", status:"idle" },
  ] });
}

export async function POST(request: Request) {
  try {
    const { task } = await request.json().catch(() => ({}));
    if (!task) return NextResponse.json({ error: "task required" }, { status: 400 });
    const key = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY;
    if (!key) return NextResponse.json({ result: `Task received: ${task}. Amanda is processing.`, agent: "Amanda" });
    const taskLower = task.toLowerCase();
    const agent = taskLower.includes("financ") || taskLower.includes("account") ? "Atlas" :
                  taskLower.includes("hr") || taskLower.includes("employ") ? "Nia" :
                  taskLower.includes("sale") || taskLower.includes("crm") ? "Kofi" :
                  taskLower.includes("market") ? "Amina" :
                  taskLower.includes("inventor") || taskLower.includes("supply") ? "Mosi" : "Amanda";
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "deepseek/deepseek-chat", messages: [
        { role: "system", content: `You are ${agent}, an expert AI business agent at JobLink 360. Provide concise, actionable business advice.` },
        { role: "user", content: task }
      ], max_tokens: 800 })
    });
    const data = await res.json();
    return NextResponse.json({ result: data.choices?.[0]?.message?.content || "Processing...", agent });
  } catch(e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
