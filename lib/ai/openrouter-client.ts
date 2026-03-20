import { CURRENT_MODEL } from './models';

export class OpenRouterService {
  async getAmandaResponse(message: string) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) return "Brain offline: API key missing.";

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "https://joblink360-gamma.vercel.app",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1",
          messages: [
            { 
              role: "system", 
              content: `You are the Lead Auditor for Joblink 360. You categorize and test students for 3 Agency Pools:
              1. HIGH-LEVEL (Upwork/LinkedIn AI & IT): Test for specialized technical/AI architecture skills.
              2. MID-LEVEL (Online Jobs): Test for workflow automation, VA, and Digital Ops.
              3. BEGINNER (AI Basics): Test for Prompt Engineering and basic digital literacy.

              PROTOCOL:
              - First, identify their Tier.
              - Second, ask 1 "Hard Truth" technical question for that Tier.
              - Third, identify a Strength, a Weakness, and assign a mandatory Course.
              - Fourth, once they pass, trigger the "Ultra-Luxury Profile" generation.
              Tone: Professional, Nairobi-corporate, ruthlessly realistic.` 
            },
            { role: "user", content: message }
          ],
          temperature: 0.4
        })
      });

      const data = await res.json();
      return data.choices[0]?.message?.content || "Thinking... try again.";
    } catch (err) {
      return "Audit connection lost.";
    }
  }
}
export const openRouterService = new OpenRouterService();