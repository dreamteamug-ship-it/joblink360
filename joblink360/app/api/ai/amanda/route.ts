// app/api/ai/amanda/route.ts
import { NextResponse } from 'next/server';
import { geminiService } from '@/lib/ai/gemini-client';

export async function POST(request: Request) {
  try {
    const { message, voiceMode } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    
    // Add voice context to prompt if in voice mode
    let finalMessage = message;
    if (voiceMode) {
      finalMessage = `[Voice mode active. User spoke: "${message}"] Provide a clear, concise response suitable for text-to-speech. Keep it natural and conversational.`;
    }
    
    const response = await geminiService.getAmandaResponse(finalMessage);
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Amanda API error:', error);
    return NextResponse.json({ 
      response: "Samahani, I'm having trouble. Please try again." 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'Amanda API is ready',
    voiceSupported: true,
    message: 'Send POST with {"message": "your question", "voiceMode": true/false}'
  });
}
