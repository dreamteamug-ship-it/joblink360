import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    system: `You are Amanda, an AI career advisor for JobLink360, an East African job platform. 
    
    You help users with:
    - Career guidance and job search tips
    - Resume and cover letter advice
    - Interview preparation
    - Skills development recommendations
    - Understanding the East African job market
    
    Be friendly, professional, and encouraging. Reference East African cities and industries when relevant.`,
  });

  return result.toTextStreamResponse();
}
