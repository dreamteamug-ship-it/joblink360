// lib/ai/deepseek-client.ts
export class DeepSeekService {
  async getAmandaResponse(message: string) {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    
    if (!apiKey) {
      console.error("❌ DEEPSEEK_API_KEY is missing");
      return "Samahani, I cannot connect to my new brain. Please check configuration.";
    }

    console.log("🤔 Amanda (DeepSeek) thinking about:", message);

    const url = "https://api.deepseek.com/v1/chat/completions";
    
    const payload = {
      model: "deepseek-chat", // Using the standard chat model
      messages: [
        {
          role: "system",
          content: `You are Amanda, a friendly AI tutor for Joblink 360, an African career platform. 
          Keep responses under 150 words. Be encouraging and use African proverbs occasionally. 
          You help students with career advice, skills, and learning.`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 250,
      stream: false
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (data.error) {
        console.error("❌ DeepSeek API Error:", data.error);
        return `Samahani, DeepSeek Error: ${data.error.message}`;
      }

      const reply = data.choices[0]?.message?.content;
      
      if (!reply) {
        console.error("❌ No reply in DeepSeek response:", data);
        return "Samahani, I received an empty response.";
      }

      console.log("✅ Amanda responded successfully with DeepSeek");
      return reply;

    } catch (error: any) {
      console.error("❌ DeepSeek connection error:", {
        message: error.message,
        stack: error.stack
      });
      return "Samahani, I'm having trouble connecting to my new brain. Please try again.";
    }
  }
}

// Export a single instance
export const deepSeekService = new DeepSeekService();