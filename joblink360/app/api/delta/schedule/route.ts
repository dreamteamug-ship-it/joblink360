export const dynamic = 'force-dynamic'

// app/api/delta/schedule/route.ts
// Delta SMM - Auto Post Scheduler

import { NextResponse } from 'next/server';

const scheduledPosts = [];

export async function GET() {
  return NextResponse.json({
    scheduler: "Delta Auto-Post",
    status: "ACTIVE",
    schedule: [
      { time: "09:00", platform: "whatsapp", message: "Morning motivation + payment link" },
      { time: "12:00", platform: "linkedin", message: "Professional career content" },
      { time: "15:00", platform: "twitter", message: "Quick tips + funding opportunities" },
      { time: "18:00", platform: "instagram", message: "Visual success stories" },
      { time: "21:00", platform: "whatsapp", message: "Evening engagement + offers" }
    ],
    next_post: "Coming soon - manual trigger for now"
  });
}

export async function POST(request: Request) {
  try {
    const { platform, customMessage } = await request.json();
    
    const post = {
      id: Date.now(),
      platform: platform || "all",
      message: customMessage || null,
      scheduled_for: new Date().toISOString(),
      status: "pending"
    };
    
    scheduledPosts.push(post);
    
    return NextResponse.json({
      success: true,
      post_scheduled: post,
      total_scheduled: scheduledPosts.length,
      instruction: "Copy the generated content from /api/delta and post manually, or use the content below"
    });
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
