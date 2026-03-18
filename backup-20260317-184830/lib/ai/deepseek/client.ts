// lib/ai/deepseek/client.ts
export class DeepSeekClient {
  private apiKey: string;
  private baseUrl = 'https://api.deepseek.com/v1';

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY || '';
  }

  async chat(messages: any[], temperature = 0.7, maxTokens = 4000) {
    try {
      // If no API key, use fallback mode
      if (!this.apiKey) {
        return {
          choices: [{
            message: {
              content: this.generateFallbackResponse(messages)
            }
          }]
        };
      }

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages,
          temperature,
          max_tokens: maxTokens
        })
      });

      if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('DeepSeek chat error:', error);
      // Fallback response
      return {
        choices: [{
          message: {
            content: this.generateFallbackResponse(messages)
          }
        }]
      };
    }
  }

  private generateFallbackResponse(messages: any[]): string {
    const lastMessage = messages[messages.length - 1]?.content || '';
    const msg = lastMessage.toLowerCase();
    
    if (msg.includes('job') || msg.includes('career')) {
      return "I'd be happy to help with your job search! Our system has 2,500+ active listings. What type of role are you looking for?";
    }
    if (msg.includes('train') || msg.includes('learn') || msg.includes('course')) {
      return "We offer free AI training courses in data labeling, prompt engineering, and business Japanese. Would you like to explore these?";
    }
    if (msg.includes('fund') || msg.includes('money') || msg.includes('grant')) {
      return "I can help you find funding opportunities. There are currently 15 active grants and loans available for East African startups.";
    }
    if (msg.includes('business') || msg.includes('startup') || msg.includes('company')) {
      return "I can connect you with our entrepreneurship agents for business planning, funding, and mentorship.";
    }
    if (msg.includes('tech') || msg.includes('ai') || msg.includes('software')) {
      return "Our technology agents specialize in AI development, data engineering, and cybersecurity. How can they assist you?";
    }
    
    return "I'm Amanda, your AI career advisor. I lead a swarm of specialized agents. How can I help you today?";
  }
}

export const deepseek = new DeepSeekClient();
