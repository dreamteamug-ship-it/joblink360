import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      stream: true,
      messages,
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    return new Response('Error connecting to AI', { status: 500 });
  }
}
