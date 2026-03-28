import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { config } from '@/lib/amanda-config';

export async function POST(req: Request) {
  const { candidateData, requirements } = await req.json();

  const { text } = await generateText({
    model: google('gemini-1.5-flash'),
    apiKey: config.geminiKey,
    system: "You are Amanda's Talent Module. Score candidates from 0-100 based on technical fit. Be ruthless and objective.",
    prompt: `Score this candidate: ${JSON.stringify(candidateData)} against these requirements: ${requirements}. Provide a score and a 1-sentence technical justification.`,
  });

  return new Response(JSON.stringify({ analysis: text }));
}
