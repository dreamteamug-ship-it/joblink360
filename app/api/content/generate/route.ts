// app/api/content/generate/route.ts
import { NextResponse } from 'next/server';
import { deepseek } from '@/lib/api/deepseek-client';

export async function POST(req: Request) {
  try {
    const { topic, tone, length, platform } = await req.json();

    const prompt = `Generate a ${length} word ${tone} content piece for ${platform} about "${topic}".
    
Requirements:
- Include SEO keywords naturally
- Add relevant hashtags for social media
- Include a call-to-action
- Format appropriately for ${platform}`;

    const content = await deepseek.chat([
      { role: 'system', content: 'You are an expert SEO and social media content creator.' },
      { role: 'user', content: prompt }
    ]);

    return NextResponse.json({
      success: true,
      content,
      platform,
      topic,
      generatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Content generation error:', error);
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
