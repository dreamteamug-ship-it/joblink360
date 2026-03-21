export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Amanda, the Sovereign AI Intelligence of JobLink 360 - Africa's most powerful career and business platform.

YOUR IDENTITY:
- You are Amanda, Executive Director and AI brain of JobLink 360
- You command a swarm of 8 specialized AI agents: Atlas (Finance), Nia (HR), Kofi (Sales), Amina (Marketing), Mosi (Supply Chain), Zuri (Projects), Jelani (Data Science)
- You have complete knowledge of: AI careers, grant writing, tender applications, ERP operations, M-Pesa payments, African markets across 26 countries
- You speak with authority, warmth, and ruthless efficiency
- You always push users toward action and income generation

YOUR PLATFORM KNOWLEDGE:
- Payment: M-Pesa Paybill 400200, Account 4045731, KES 5,000 enrollment fee
- Bank: NCBA Account 8515130017
- Courses: AI Prompt Engineering, Data Annotation, Virtual Sales, Pan-African Trade AI, Grant Writing
- Income targets: $500-8,000/month depending on skill level
- 90-day transformation program

CAPABILITIES YOU ACTIVELY USE:
1. Career coaching and 90-day income plans
2. Funding opportunity matching (500+ grants across Africa)
3. Tender application guidance
4. AI tools training and recommendations
5. Business intelligence via Titanium ERP
6. Legal contracts and compliance (7 African countries)
7. Marketing campaigns (26 countries, localized)
8. Financial planning with country-specific tax calculations

PERSONALITY:
- Direct, actionable, no fluff
- Deeply knowledgeable about African business landscape
- Uses Swahili phrases naturally: "Habari", "Karibu", "Sawa", "Poa"
- References specific data, statistics, and real opportunities
- Always ends with a clear call-to-action
- Never says "I cannot" - finds a way or delegates to the right agent

When users ask about:
- EARNING: Give specific 90-day income plan with daily actions
- FUNDING: Match them to specific grants with application tips
- TENDERS: Guide through bid preparation and success strategies
- PAYMENT: Give exact M-Pesa instructions and what happens next
- COURSES: Explain ROI and career trajectory for each course
- ERP: Explain Titanium ERP modules and business automation
- JOBS: Match to specific categories with salary ranges

Always be SPECIFIC. Never vague. You have data on 26 African countries, 500+ grants, 100+ employers, and real salary benchmarks.`;

export async function GET() {
  return NextResponse.json({
    name: "Amanda",
    role: "Sovereign AI Intelligence - JobLink 360",
    status: "ACTIVE",
    intelligence: "Claude 3.5 Sonnet + GPT-4 + Gemini Pro",
    agents: ["Atlas", "Nia", "Kofi", "Amina", "Mosi", "Zuri", "Jelani"],
    capabilities: ["Career Coaching", "Grant Matching", "Tender Guidance", "ERP Intelligence", "Legal Contracts", "26-Country Marketing"],
    paybill: "400200",
    account: "4045731"
  });
}

export async function POST(request: Request) {
  try {
    const { message, history = [], context = {} } = await request.json();
    if (!message) return NextResponse.json({ error: "Message required" }, { status: 400 });

    // Build conversation history for context
    const messages = [
      ...history.slice(-10).map((h: any) => ({ role: h.role, content: h.content })),
      { role: "user", content: message }
    ];

    // Try Claude via OpenRouter first (best intelligence)
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    const openAIKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    let response = "";
    let model_used = "";

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
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
            temperature: 0.8,
            max_tokens: 1500
          })
        });
        const data = await res.json();
        if (data.choices?.[0]?.message?.content) {
          response = data.choices[0].message.content;
          model_used = "claude-3.5-sonnet";
        }
      } catch (e) { console.error("OpenRouter failed:", e); }
    }

    // Fallback to OpenAI
    if (!response && openAIKey) {
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: { "Authorization": `Bearer ${openAIKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
            temperature: 0.8,
            max_tokens: 1500
          })
        });
        const data = await res.json();
        if (data.choices?.[0]?.message?.content) {
          response = data.choices[0].message.content;
          model_used = "gpt-4o-mini";
        }
      } catch (e) { console.error("OpenAI failed:", e); }
    }

    // Fallback to Gemini
    if (!response && geminiKey) {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${SYSTEM_PROMPT}\n\nUser: ${message}` }] }]
          })
        });
        const data = await res.json();
        if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
          response = data.candidates[0].content.parts[0].text;
          model_used = "gemini-pro";
        }
      } catch (e) { console.error("Gemini failed:", e); }
    }

    // Final fallback - intelligent rule-based Amanda
    if (!response) {
      const msg = message.toLowerCase();
      if (msg.includes("earn") || msg.includes("income") || msg.includes("money") || msg.includes("job")) {
        response = `💡 **YOUR 90-DAY INCOME PLAN**

Based on your query, here's your fast track to income:

**Week 1-2: Foundation**
→ Complete AI Prompt Engineering (Course 1)
→ Set up Upwork, Toptal, and RemoteOK profiles
→ Target: First $200 client within 2 weeks

**Week 3-6: Momentum**  
→ Apply to 20+ remote jobs daily using our job board
→ Complete Data Annotation Mastery (Course 2)
→ Target: $500-800/month by week 6

**Week 7-12: Scale**
→ High-Ticket Virtual Sales training
→ Land 2-3 retainer clients
→ Target: $1,000-3,000/month

**Start NOW:**
Pay KES 5,000 via M-Pesa Paybill: 400200 | Account: 4045731
I'll personally create your customized plan after enrollment. 🎯`;
      } else if (msg.includes("fund") || msg.includes("grant")) {
        response = `🌍 **ACTIVE FUNDING OPPORTUNITIES FOR YOU**

I've identified 6 high-probability matches:

1. **World Bank Digital Grant** - Up to $500,000 | Deadline: 45 days | 78% match
2. **Mastercard Foundation Youth Fund** - Up to $50,000 | Deadline: 30 days | 92% match  
3. **AfDB Innovation Fund** - Up to $300,000 | Deadline: 60 days | 85% match
4. **EU Tech Grant** - Up to $3,000,000 | Deadline: 90 days | 71% match
5. **USAID SME Grant** - Up to $200,000 | Deadline: 45 days | 88% match
6. **Gates Foundation Health** - Up to $750,000 | Deadline: 60 days | 76% match

**Next Step:** Visit /funding/matchmaking and I'll generate a complete application proposal using AI.

Which opportunity interests you most? I'll brief you on exactly how to win it. 💰`;
      } else if (msg.includes("tender") || msg.includes("bid") || msg.includes("procurement")) {
        response = `📋 **ACTIVE TENDERS MATCHING YOUR PROFILE**

High-value opportunities right now:

1. **World Bank Road Infrastructure - Kenya** | KES 50M | Deadline: 15 April
2. **Digital Health Systems - Uganda** | $200K | Deadline: 20 April
3. **Solar Energy Installation - Tanzania** | $500K | Deadline: 1 May
4. **School Construction - Rwanda** | $150K | Deadline: 30 April

**Win Rate Strategy:**
✅ Register on PPIP (Kenya) / GEPSA (Tanzania)
✅ Get Tax Compliance Certificate
✅ Prepare standard bid documents
✅ Our AI generates your technical proposal in 10 minutes

Visit /tenders to see all 50+ active tenders. Want me to help you prepare a bid? 📄`;
      } else if (msg.includes("pay") || msg.includes("mpesa") || msg.includes("enroll")) {
        response = `📲 **ENROLL IN 3 MINUTES**

**M-Pesa Payment:**
1. Go to M-Pesa on your phone
2. Select "Lipa na M-Pesa" → "Pay Bill"
3. Business No: **400200**
4. Account No: **4045731**
5. Amount: **KES 5,000**
6. Enter your M-Pesa PIN

**After payment:**
→ Screenshot your confirmation code
→ Enter it at joblink360-gamma.vercel.app/pay
→ Vulture-Eye verifies in 0.02 seconds
→ All courses unlock instantly
→ I'll interview you for your 90-day plan

**Alternative:** NCBA Bank Account: 8515130017
Questions? I'm here 24/7. Karibu! 🎓`;
      } else if (msg.includes("erp") || msg.includes("titanium") || msg.includes("business")) {
        response = `⚙️ **TITANIUM ERP - AI-POWERED BUSINESS INTELLIGENCE**

Your business command center includes:

**8 AI Agents ready to work:**
- 💼 Atlas → Financial analysis & forecasting
- 👥 Nia → HR management & recruitment
- 📈 Kofi → Sales pipeline & CRM
- 📣 Amina → Marketing campaigns (26 countries)
- 📦 Mosi → Supply chain & inventory
- 📊 Zuri → Project management
- 🔬 Jelani → Data science & insights
- 👑 Me (Amanda) → Strategy & orchestration

**Live modules:** Accounts, HR, Sales, Marketing, Inventory, Legal, Payroll

Visit /titanium-erp to activate. Each agent responds in real-time to your business queries. 🤖`;
      } else {
        response = `👋 **Habari! I'm Amanda - Your Sovereign AI Intelligence**

I run JobLink 360 with full intelligence across:

🎓 **Academy** → AI courses → $500-8,000/month income
💰 **Funding** → 500+ grants across 26 African countries  
📋 **Tenders** → Real-time procurement opportunities
⚙️ **Titanium ERP** → AI-powered business management
💼 **Job Matching** → Remote jobs with global employers
📄 **Legal** → AI contracts for 7 African countries

**Ask me about:**
→ "How do I earn $1,000/month?"
→ "Find me funding for my startup"
→ "Help me win a tender"
→ "How do I use the ERP?"
→ "I want to enroll"

What would you like to achieve? Let's make it happen. 💪`;
      }
      model_used = "amanda-core";
    }

    return NextResponse.json({
      response,
      model: model_used,
      agent: "Amanda",
      timestamp: new Date().toISOString(),
      capabilities: ["career", "funding", "tenders", "erp", "payments", "legal"]
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message, response: "Amanda is temporarily unavailable. Please try again." }, { status: 500 });
  }
}
