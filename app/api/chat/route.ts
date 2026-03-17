// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { deepseek } from '@/lib/api/deepseek-client';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.DEEPSEEK_API_KEY && !process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        role: 'assistant',
        content: 'Please configure either DEEPSEEK_API_KEY or OPENAI_API_KEY in your environment variables.'
      });
    }

    const response = await deepseek.chat(messages);
    
    return NextResponse.json({
      role: 'assistant',
      content: response
    });

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat' },
      { status: 500 }
    );
  }
}
