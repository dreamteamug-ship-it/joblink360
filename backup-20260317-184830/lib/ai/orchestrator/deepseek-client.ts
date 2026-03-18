// lib/ai/orchestrator/deepseek-client.ts
export class DeepSeekClient {
  private apiKey: string;
  private baseUrl = 'https://api.deepseek.com/v1';

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY || '';
  }

  async chat(messages: any[], temperature = 0.7) {
    try {
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
          max_tokens: 4000
        })
      });

      if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('DeepSeek chat error:', error);
      // Fallback to a simple response
      return {
        choices: [{
          message: {
            content: "I'm experiencing a connection issue with DeepSeek. Using standard mode. How can I help you today?"
          }
        }]
      };
    }
  }

  async stream(messages: any[], temperature = 0.7) {
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
        max_tokens: 4000,
        stream: true
      })
    });

    return response.body;
  }
}

export const deepseek = new DeepSeekClient();
