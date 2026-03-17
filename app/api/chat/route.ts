import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Check if OpenAI key is configured
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ 
          error: 'OpenAI API key not configured. Please add it in Vercel environment variables.' 
        }),
        { status: 500 }
      );
    }

    const result = await streamText({
      model: openai('gpt-4o'),
      messages: [
        {
          role: 'system',
          content: `You are Amanda, an AI career advisor for JobLink360, an East African job platform.
          
          Key information:
          - Platform serves Kenya and East Africa
          - You help with: CV reviews, job matching, interview prep, career advice
          - Be professional, encouraging, and specific to East African context
          - Reference local companies (Safaricom, M-KOPA, iHub, etc.) when relevant
          - Keep responses concise and actionable`
        },
        ...messages
      ],
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat' }),
      { status: 500 }
    );
  }
}
