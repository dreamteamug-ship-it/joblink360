// lib/ai/ultimate-amanda.ts
export class UltimateAmanda {
  private apiKey: string;
  
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || '';
  }
  
  async getResponse(message: string, context: any = {}): Promise<string> {
    if (!this.apiKey) {
      return "⚠️ Amanda's brain is not configured. Please contact support.";
    }
    
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://joblink360-gamma.vercel.app',
          'X-Title': 'JobLink 360 - Amanda AI'
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3.5-sonnet',
          messages: [
            { 
              role: 'system', 
              content: `You are AMANDA, the Sovereign AI of JobLink 360. You are a ruthless mentor and expert in AI, careers, and the JobLink 360 platform. Be direct, honest, and helpful.` 
            },
            { role: 'user', content: message }
          ],
          temperature: 0.7,
          max_tokens: 2048
        })
      });
      
      const data = await response.json();
      return data.choices[0]?.message?.content || "I'm processing your question. Please try again.";
    } catch (error) {
      console.error('Amanda error:', error);
      return "I'm experiencing high cognitive load. Please ask again.";
    }
  }
}

export const amanda = new UltimateAmanda();
