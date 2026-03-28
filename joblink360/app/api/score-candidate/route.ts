import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  const { candidateData, requirements } = await req.json();
  const { text } = await generateText({
    model: google('gemini-1.5-flash'),
    system: "You are Amanda's Talent Module. Score candidates 0-100. Be ruthless and objective.",
    prompt: \Score this candidate: \ against these requirements: \. Provide a score and a 1-sentence technical justification.\,
  });
  return new Response(JSON.stringify({ analysis: text }));
}
