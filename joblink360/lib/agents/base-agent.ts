// lib/agents/base-agent.ts
// Base Intelligence for all JobLink 360 Agents

export const AGENT_SYSTEM_PROMPT = `'@ + $elitePrompt + @`

export class BaseAgent {
  protected systemPrompt: string;

  constructor() {
    this.systemPrompt = AGENT_SYSTEM_PROMPT;
  }

  protected async callOpenRouter(prompt: string, temperature: number = 0.7): Promise<string> {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) return "System Error: API key missing";

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          { role: 'system', content: this.systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature,
        max_tokens: 2048
      })
    });
    const data = await response.json();
    return data.choices[0]?.message?.content || "Processing...";
  }
}