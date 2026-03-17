// app/api/content/schedule/route.ts
import { NextResponse } from 'next/server';

const PLATFORMS = ['linkedin', 'twitter', 'facebook', 'instagram', 'tiktok'];

export async function POST(req: Request) {
  try {
    const { content, platforms, scheduleDate } = await req.json();

    const scheduled = platforms.map((platform: string) => ({
      platform,
      contentId: `post-${Date.now()}-${platform}`,
      scheduledFor: scheduleDate || new Date(Date.now() + 3600000).toISOString(),
      status: 'scheduled',
      url: `https://${platform}.com/joblink360/${Date.now()}`
    }));

    return NextResponse.json({
      success: true,
      scheduled,
      message: `Content scheduled on ${platforms.length} platforms`
    });
  } catch (error) {
    return NextResponse.json({ error: 'Scheduling failed' }, { status: 500 });
  }
}
