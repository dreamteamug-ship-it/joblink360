export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

const AGENT_PROMPTS = {
  Atlas: `Atlas - Financial Analyst: Use Chain-of-Thought. Include PAYE brackets, currency, compliance. Format: Problem → Analysis → 3 Recommendations → KPIs.`,
  Nia: `Nia - HR Strategist: Reference labor laws, compliance checklists. Format: Issue → Legal Framework → 3 Actions → Timeline.`,
  Kofi: `Kofi - Sales Director: Provide scripts, follow-up sequences. Format: Challenge → Strategy → Script → Objections → Target.`,
  Amina: `Amina - Marketing Director: Mobile-first, local platforms. Format: Goal → Audience → 3 Campaign Ideas → Budget → ROI.`,
  Mosi: `Mosi - Supply Chain: Account for infrastructure gaps. Format: Problem → Map → 3 Optimizations → Risk Mitigation.`,
  Zuri: `Zuri - Project Director: Realistic African timelines. Format: Scope → Milestones → Risk Register → Resources → Metrics.`,
  Jelani: `Jelani - Data Scientist: Contextualize for African market. Format: Question → Analysis → 3 Insights → Recommendations.`
};

function detectAgent(task: string): string {
  const t = task.toLowerCase();
  if (t.match(/financ|account|tax|revenue|budget|paye/)) return "Atlas";
  if (t.match(/hr|employ|recruit|salary|payroll|staff/)) return "Nia";
  if (t.match(/sale|crm|lead|client|close|pipeline/)) return "Kofi";
  if (t.match(/market|campaign|content|social|brand/)) return "Amina";
  if (t.match(/supply|inventory|logistics|stock|deliver/)) return "Mosi";
  if (t.match(/project|timeline|milestone|task|deadline/)) return "Zuri";
  if (t.match(/data|analyt|insight|metric|report|forecast/)) return "Jelani";
  return "Amanda";
}

export async function GET() {
  return NextResponse.json({
    status: "MAXIMUM INTELLIGENCE ACTIVE",
    system: "Titanium ERP v3.0",
    agents: ["Amanda", "Atlas", "Nia", "Kofi", "Amina", "Mosi", "Zuri", "Jelani"],
    training: "Elite Chain-of-Thought Protocol",
    coverage: "26 African countries"
  });
}

export async function POST(request: Request) {
  try {
    const { task, agent: requestedAgent, context = {} } = await request.json();
    if (!task) return NextResponse.json({ error: "Task required" }, { status: 400 });

    const agentName = requestedAgent || detectAgent(task);
    const agentPrompt = AGENT_PROMPTS[agentName] || "You are an AI business consultant.";

    const systemPrompt = `${agentPrompt}\n\nPlatform: JobLink 360 | M-Pesa Paybill: 400200 | Account: 4045731`;

    let result = "";
    let modelUsed = "";

    const openRouterKey = process.env.OPENROUTER_API_KEY;
    if (openRouterKey) {
      try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: { "Authorization": `Bearer ${openRouterKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "anthropic/claude-3.5-sonnet",
            messages: [{ role: "system", content: systemPrompt }, { role: "user", content: task }],
            temperature: 0.7,
            max_tokens: 1500
          })
        });
        const data = await res.json();
        if (data.choices?.[0]?.message?.content) {
          result = data.choices[0].message.content;
          modelUsed = "claude-3.5-sonnet";
        }
      } catch (e) { console.error("ERP error:", e); }
    }

    if (!result) {
      result = `${agentName} here. I've received your task.\n\nProcessing with full analysis...\n\nFor best results, ensure your OpenRouter API key is configured.`;
      modelUsed = "core";
    }

    return NextResponse.json({ result, agent: agentName, model: modelUsed, timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
