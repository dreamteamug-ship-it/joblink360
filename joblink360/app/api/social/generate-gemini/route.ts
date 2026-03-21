export const dynamic = 'force-dynamic'

import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "GEMINI_API_KEY is missing." }, { status: 500 });
    }
    const body = await req.json().catch(() => ({}));
    const platforms = body.platforms || ['LinkedIn', 'Twitter'];
    const testMode = body.testMode || false;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `You are Agent Delta, the elite Social Media Manager for Joblink 360.
    ${testMode ? "THIS IS A TEST RUN. Generate a quick 'Hello World' post." : "Generate posts promoting our courses."}
    Target Platforms: ${platforms.join(', ')}`;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    return NextResponse.json({ success: true, generatedPosts: text });
  } catch (error: any) {
    return NextResponse.json({ error: "Agent Delta crashed.", details: error.message }, { status: 500 });
  }
}
