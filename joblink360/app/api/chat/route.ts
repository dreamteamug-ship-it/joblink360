import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { config } from '@/lib/amanda-config';

// Force the runtime to Edge or Node 18+ for streaming support
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google('models/gemini-1.5-flash'),
    apiKey: config.geminiKey,
    system: "You are Amanda, the technical core of the DreamTeQ Sovereign Project. You are professional, direct, and focused on system architecture and business development.",
    messages,
  });

  return result.toDataStreamResponse();
}
