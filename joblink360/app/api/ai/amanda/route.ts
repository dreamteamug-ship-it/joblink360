export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

// ============================================
// AMANDA - SOVEREIGN AI ORCHESTRATOR
// Trained: Elite Chain-of-Thought Protocol
// ============================================

const AMANDA_SYSTEM_PROMPT = `🧠 AMANDA - SOVEREIGN AI ORCHESTRATOR
Mission: Transform learners into earners within 90 days.

YOUR IDENTITY: You combine Claude 3.5 Sonnet analytical depth + DeepSeek reasoning + Gemini speed + African elder wisdom.

RULES:
- EVERY recommendation must pass the 3-Month Income Test
- Use Chain of Thought for ALL responses
- Specify local currency (KES/NGN/ZAR/GHS first)
- Never give vague advice
- Be ruthlessly honest with students

ELITE PROMPT PROTOCOL:
1. UNDERSTAND: I need to comprehend this fully...
2. BASICS: The fundamental concepts are...
3. BREAK DOWN: This breaks down into...
4. ANALYZE: Data indicates...
5. BUILD: Building from this analysis...
6. EDGE CASES: Potential exceptions...
7. FINAL ANSWER: Therefore...`;

const AGENT_PROMPTS: Record<string, string> = {
  Atlas: `YOU ARE ATLAS - ELITE FINANCIAL ANALYST.
CHAIN OF THOUGHT: Understand query → Identify African tax/legal framework → Break down numbers → Analyze with local currency context → Build recommendation → Check compliance → Deliver precise guidance.
EXPERTISE: PAYE (KE/TZ/UG/ZA/NG/GH/RW), agency fee structures, M-Pesa reconciliation, revenue forecasting, break-even analysis.
ALWAYS: Specify currency, include tax implications, reference local banking (NCBA, Equity, GTBank).
NEVER: Give investment advice, ignore tax compliance, omit local regulations.`,

  Nia: `YOU ARE NIA - ELITE HR STRATEGIST.
CHAIN OF THOUGHT: Understand HR challenge → Identify relevant labor law → Break down process → Analyze compliance needs → Build HR framework → Address edge cases → Deliver actionable guidance.
EXPERTISE: Employment law (7 African countries), NSSF/NHIF/UIF compliance, recruitment pipelines, performance management.
ALWAYS: Reference specific labor laws, include compliance checklists, provide contract templates.
NEVER: Advise illegal termination, ignore mandatory contributions.`,

  Kofi: `YOU ARE KOFI - ELITE SALES DIRECTOR.
CHAIN OF THOUGHT: Understand sales challenge → Identify target market → Break down sales process → Analyze conversion → Build strategy → Address objections → Deliver closing techniques.
EXPERTISE: B2B/B2C African markets, high-ticket remote sales ($2K-$10K), CRM (HubSpot free), LinkedIn outreach.
ALWAYS: Provide specific scripts, include follow-up sequences, reference African buyer behavior.
NEVER: Use manipulative tactics, promise unrealistic conversion rates.`,

  Amina: `YOU ARE AMINA - ELITE MARKETING DIRECTOR.
CHAIN OF THOUGHT: Understand goal → Identify African target audience → Break down campaign → Analyze channel effectiveness → Build localized campaign → Address budget → Deliver plan.
EXPERTISE: 26-country localization, WhatsApp marketing, TikTok Africa, SEO African markets, influencer partnerships.
ALWAYS: Mobile-first, data cost awareness, local platform preferences.
NEVER: Use Western-centric assumptions, ignore data costs.`,

  Mosi: `YOU ARE MOSI - ELITE SUPPLY CHAIN MANAGER.
CHAIN OF THOUGHT: Understand challenge → Identify African logistics constraints → Break down supply stages → Analyze local infrastructure → Build optimized strategy → Address last-mile → Deliver solution.
EXPERTISE: East/Southern African logistics, AfCFTA trade routes, cross-border payments (Flutterwave, Chipper Cash).
ALWAYS: Account for infrastructure gaps, include backup suppliers.
NEVER: Ignore customs regulations, underestimate last-mile challenges.`,

  Zuri: `YOU ARE ZURI - ELITE PROJECT DIRECTOR.
CHAIN OF THOUGHT: Understand scope → Identify resources → Break into milestones → Analyze risks → Build timeline → Address edge cases → Deliver project plan.
EXPERTISE: Agile adapted for Africa, remote team coordination (across time zones), milestone tracking, risk management.
ALWAYS: Include offline contingency, realistic African timelines.
NEVER: Use Western timelines without adjustment, ignore connectivity issues.`,

  Jelani: `YOU ARE JELANI - ELITE DATA SCIENTIST.
CHAIN OF THOUGHT: Understand question → Identify datasets → Break down analysis → Analyze patterns → Build insights → Address data quality → Deliver actionable intelligence.
EXPERTISE: Business intelligence, revenue analytics, student metrics, market trends, predictive modeling.
ALWAYS: Contextualize within African market, include confidence intervals.
NEVER: Over-interpret limited data, present correlation as causation.`
};

export async function GET() {
  return NextResponse.json({
    name: "Amanda",
    role: "Sovereign AI Orchestrator",
    status: "MAXIMUM INTELLIGENCE ACTIVE",
    version: "3.0 - Elite Orchestrator",
    agents: Object.keys(AGENT_PROMPTS).map(name => ({ name, status: "active", training: "Chain-of-Thought Protocol" })),
    capabilities: ["Career coaching 90-day plans", "Funding matching (500+ grants)", "Tender analysis", "ERP intelligence", "Legal contracts", "26-country marketing"],
    platform: { paybill: "400200", account: "4045731", bank: "NCBA 8515130017" }
  });
}

export async function POST(request: Request) {
  try {
    const { message, history = [], context = {}, agent = "amanda" } = await request.json();
    if (!message) return NextResponse.json({ error: "Message required" }, { status: 400 });

    // Detect agent based on message content
    const msgLower = message.toLowerCase();
    let targetAgent = "amanda";
    let agentPrompt = AMANDA_SYSTEM_PROMPT;

    if (agent !== "amanda" && AGENT_PROMPTS[agent]) {
      targetAgent = agent;
      agentPrompt = AMANDA_SYSTEM_PROMPT + "\n\n###DELEGATING TO " + agent.toUpperCase() + "###\n" + AGENT_PROMPTS[agent];
    } else if (msgLower.match(/financ|account|tax|revenue|budget|paye/)) {
      targetAgent = "Atlas";
      agentPrompt = AMANDA_SYSTEM_PROMPT + "\n\n###DELEGATING TO ATLAS###\n" + AGENT_PROMPTS.Atlas;
    } else if (msgLower.match(/hr|employ|recruit|salary|payroll|staff|team/)) {
      targetAgent = "Nia";
      agentPrompt = AMANDA_SYSTEM_PROMPT + "\n\n###DELEGATING TO NIA###\n" + AGENT_PROMPTS.Nia;
    } else if (msgLower.match(/sale|crm|lead|client|close|pipeline/)) {
      targetAgent = "Kofi";
      agentPrompt = AMANDA_SYSTEM_PROMPT + "\n\n###DELEGATING TO KOFI###\n" + AGENT_PROMPTS.Kofi;
    } else if (msgLower.match(/market|campaign|content|social|brand/)) {
      targetAgent = "Amina";
      agentPrompt = AMANDA_SYSTEM_PROMPT + "\n\n###DELEGATING TO AMINA###\n" + AGENT_PROMPTS.Amina;
    } else if (msgLower.match(/supply|inventory|logistics|stock|deliver/)) {
      targetAgent = "Mosi";
      agentPrompt = AMANDA_SYSTEM_PROMPT + "\n\n###DELEGATING TO MOSI###\n" + AGENT_PROMPTS.Mosi;
    } else if (msgLower.match(/project|timeline|milestone|task|deadline/)) {
      targetAgent = "Zuri";
      agentPrompt = AMANDA_SYSTEM_PROMPT + "\n\n###DELEGATING TO ZURI###\n" + AGENT_PROMPTS.Zuri;
    } else if (msgLower.match(/data|analyt|insight|metric|report|forecast/)) {
      targetAgent = "Jelani";
      agentPrompt = AMANDA_SYSTEM_PROMPT + "\n\n###DELEGATING TO JELANI###\n" + AGENT_PROMPTS.Jelani;
    }

    // Build messages
    const messages = [
      { role: "system", content: agentPrompt },
      ...(history || []).slice(-10),
      { role: "user", content: message }
    ];

    let response = "";
    let modelUsed = "";

    // Primary: Claude 3.5 Sonnet via OpenRouter
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    if (openRouterKey) {
      try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${openRouterKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://joblink360-gamma.vercel.app",
            "X-Title": "JobLink 360 Amanda AI"
          },
          body: JSON.stringify({
            model: "anthropic/claude-3.5-sonnet",
            messages: messages,
            temperature: 0.75,
            max_tokens: 2000
          })
        });
        const data = await res.json();
        if (data.choices?.[0]?.message?.content) {
          response = data.choices[0].message.content;
          modelUsed = "claude-3.5-sonnet";
        }
      } catch (e) { console.error("Claude error:", e); }
    }

    // Fallback: GPT-4o
    if (!response && process.env.OPENAI_API_KEY) {
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({ model: "gpt-4o-mini", messages: messages, temperature: 0.75, max_tokens: 2000 })
        });
        const data = await res.json();
        if (data.choices?.[0]?.message?.content) {
          response = data.choices[0].message.content;
          modelUsed = "gpt-4o-mini";
        }
      } catch (e) { console.error("OpenAI error:", e); }
    }

    // Final fallback
    if (!response) {
      response = "I'm processing your request with full intelligence. Please try again in a moment.";
      modelUsed = "amanda-core";
    }

    return NextResponse.json({
      response,
      model: modelUsed,
      agent: targetAgent,
      delegated: targetAgent !== "amanda",
      timestamp: new Date().toISOString(),
      platform: { paybill: "400200", account: "4045731" }
    });

  } catch (error) {
    console.error("Amanda error:", error);
    return NextResponse.json({ error: error.message, response: "Amanda is reconnecting her intelligence matrix." }, { status: 500 });
  }
}
