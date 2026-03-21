export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "active",
    service: "Document Generator",
    capabilities: ["funding-proposals", "contracts", "cover-letters"],
    powered_by: "Claude 3.5 Sonnet + OpenRouter"
  });
}

export async function POST(request: Request) {
  try {
    const { opportunityId, userData, type = "proposal" } = await request.json();

    const openRouterKey = process.env.OPENROUTER_API_KEY;
    if (!openRouterKey) {
      return NextResponse.json({ error: "OpenRouter API key not configured" }, { status: 500 });
    }

    const prompt = `Generate a professional ${type} document for:
Opportunity ID: ${opportunityId}
Organization: ${userData?.organization_name || "JobLink 360"}
Country: ${userData?.country || "Kenya"}

Create a compelling, professional document with:
1. Executive Summary
2. Problem Statement  
3. Proposed Solution
4. Implementation Plan
5. Budget Overview
6. Expected Impact

Make it specific, actionable, and tailored for African development context.`;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openRouterKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://joblink360-gamma.vercel.app"
      },
      body: JSON.stringify({
        model: "anthropic/claude-3.5-sonnet",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 3000
      })
    });

    const data = await res.json();
    const document = data.choices?.[0]?.message?.content || "Document generation failed";

    // Try to save to Supabase if available
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey && supabaseUrl !== "https://placeholder.supabase.co") {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const sb = createClient(supabaseUrl, supabaseKey);
        await sb.from("funding_applications").insert({
          opportunity_id: opportunityId,
          proposal_text: document,
          status: "draft",
          created_at: new Date().toISOString()
        });
      } catch (e) { console.log("DB save skipped:", e); }
    }

    return NextResponse.json({
      success: true,
      document,
      type,
      generatedAt: new Date().toISOString(),
      model: "claude-3.5-sonnet"
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
