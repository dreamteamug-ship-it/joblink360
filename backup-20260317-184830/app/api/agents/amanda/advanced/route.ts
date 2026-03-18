// app/api/agents/amanda/advanced/route.ts
import { NextResponse } from 'next/server';
import { titaniumAI } from '@/lib/ai/orchestrator/titanium-engine';

export async function POST(request: Request) {
  try {
    const { message, userId, context } = await request.json();

    // Process with DeepSeek
    const response = await titaniumAI.processWithDeepSeek(message, {
      userId,
      ...context
    });

    // Determine which agents were involved (simple keyword matching)
    const agentsInvolved = [];
    if (message.toLowerCase().includes('train') || message.toLowerCase().includes('learn')) agentsInvolved.push('kwame');
    if (message.toLowerCase().includes('business') || message.toLowerCase().includes('startup')) agentsInvolved.push('amara');
    if (message.toLowerCase().includes('money') || message.toLowerCase().includes('salary')) agentsInvolved.push('jabari');
    if (message.toLowerCase().includes('women') || message.toLowerCase().includes('youth')) agentsInvolved.push('zuri');
    if (message.toLowerCase().includes('farm') || message.toLowerCase().includes('agriculture')) agentsInvolved.push('baraka');
    if (message.toLowerCase().includes('climate') || message.toLowerCase().includes('green')) agentsInvolved.push('kofi');

    return NextResponse.json({
      success: true,
      message: response,
      agents_involved: agentsInvolved,
      agent_count: titaniumAI.getAgentCount(),
      model: 'deepseek-chat',
      timestamp: new Date().toISOString(),
      suggestions: [
        'Find me a job',
        'Recommend training',
        'Show funding opportunities',
        'Career advice',
        'Business planning help'
      ]
    });

  } catch (error) {
    console.error('Amanda advanced error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process advanced AI request' },
      { status: 500 }
    );
  }
}
