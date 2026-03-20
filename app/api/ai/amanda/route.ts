import { NextResponse } from 'next/server';
import { openRouterService } from '@/lib/ai/openrouter-client';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    console.log('📥 Amanda received:', message);
    
    const response = await openRouterService.getAmandaResponse(message);
    
    return NextResponse.json({ response });
  } catch (error: any) {
    console.error('❌ Amanda API Error:', error);
    return NextResponse.json({ 
      response: `Samahani, I hit a snag. (Error: ${error.message || 'Unknown'})`
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'Amanda API is ready (Powered by OpenRouter)',
    message: 'Send a POST request with {"message": "your question"}'
  });
}
