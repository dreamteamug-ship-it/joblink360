// app/api/agents/amanda/ultimate/route.ts
import { NextResponse } from 'next/server';
import { agentSystem } from '@/lib/ai/agents/system';

export async function POST(request: Request) {
  try {
    const { message, userId, country, targetCountry } = await request.json();

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    const result = await agentSystem.processRequest(message, userId, country, targetCountry);

    return NextResponse.json({
      success: true,
      ...result,
      model: 'deepseek-swarm',
      version: '3.0.0'
    });

  } catch (error) {
    console.error('Ultimate Amanda error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
