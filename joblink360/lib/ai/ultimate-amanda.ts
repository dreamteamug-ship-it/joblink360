// lib/ai/ultimate-amanda.ts (Updated with Swarm Integration)
import { agentSwarm } from './agent-swarm';

export class UltimateAmanda {
  private apiKey: string;
  private swarmEnabled: boolean = true;
  
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || '';
  }
  
  async getResponse(message: string, context: any = {}): Promise<string> {
    // Check if this should be handled by the swarm
    if (this.shouldUseSwarm(message)) {
      console.log('🧠 Using Agent Swarm for complex task');
      const result = await agentSwarm.orchestrate(message, context);
      return this.formatSwarmResponse(result);
    }
    
    // Use direct AI for simple queries
    return this.getDirectResponse(message, context);
  }
  
  private shouldUseSwarm(message: string): boolean {
    const swarmTriggers = [
      'create', 'generate', 'build', 'develop', 'optimize',
      'analyze', 'audit', 'transform', 'repurpose', 'align',
      'course', 'curriculum', 'training', 'assessment',
      'job', 'scrape', 'scan', 'market', 'trend'
    ];
    
    const lower = message.toLowerCase();
    return swarmTriggers.some(trigger => lower.includes(trigger));
  }
  
  private async getDirectResponse(message: string, context: any): Promise<string> {
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
  
  private formatSwarmResponse(result: any): string {
    return `
**AMANDA SWARM RESPONSE**

I've orchestrated ${result.agentsUsed.length} specialized agents to handle your request.

**Agents Deployed:**
${result.agentsUsed.map((agent: string) => `- ${agent}`).join('\n')}

**Results:**
${result.result.summary}

**Confidence Score:** ${Math.round(result.confidence * 100)}%

*I am always learning. Let me know if you need more detail on any aspect.*
    `.trim();
  }
}

export const amanda = new UltimateAmanda();
