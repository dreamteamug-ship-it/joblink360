// lib/api/deepseek-client.ts
export class DeepSeekClient {
  private apiKey: string;
  private baseUrl = 'https://api.deepseek.com/v1';

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY || '';
  }

  async chat(messages: any[], temperature = 0.7) {
    try {
      if (!this.apiKey) {
        return this.getFallbackResponse(messages);
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
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('DeepSeek API error:', error);
      return this.getFallbackResponse(messages);
    }
  }

  private getFallbackResponse(messages: any[]): string {
    const lastMessage = messages[messages.length - 1]?.content || '';
    
    if (lastMessage.includes('job')) {
      return "I can help with your job search! We have opportunities across 26 African countries and globally. What role interests you?";
    }
    if (lastMessage.includes('train')) {
      return "We offer free AI training. Check out our data labeling and prompt engineering courses available regionally.";
    }
    if (lastMessage.includes('fund')) {
      return "I can help find funding. There are 50+ active grants across Africa and international opportunities.";
    }
    return "I'm Amanda, your AI assistant for African and global opportunities. How can I help you today?";
  }
}

export const deepseek = new DeepSeekClient();
