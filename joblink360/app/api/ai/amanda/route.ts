// app/api/ai/amanda/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message, context, voiceMode } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    
    console.log(`🎙️ Amanda processing: "${message}"`);
    
    // Use OpenRouter API with Claude 3.5 Sonnet
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://joblink360-gamma.vercel.app',
        'X-Title': 'JobLink 360 - Amanda AI'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          { 
            role: 'system', 
            content: `You are AMANDA, the Sovereign AI of JobLink 360. You are a ruthless mentor, career strategist, and ultra-intelligent AI assistant. You have complete knowledge of the JobLink 360 platform including the LMS at /lms, ERP at /titanium-erp, and Deal Room at /deal-room. Be direct, honest, and helpful.`
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 2048
      })
    });
    
    const data = await response.json();
    const aiResponse = data.choices[0]?.message?.content || "I'm processing your question. Please try again.";
    
    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('Amanda API error:', error);
    return NextResponse.json({ 
      response: "I'm experiencing high cognitive load. Please ask again." 
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'Amanda AI is ONLINE',
    intelligence: 'Claude 3.5 Sonnet via OpenRouter',
    voiceEnabled: true,
    platform: 'JobLink 360'
  });
}