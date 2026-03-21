export const dynamic = 'force-dynamic'

// app/api/jobs/deploy/route.ts
import { NextResponse } from 'next/server';
import { jobHunter } from '@/lib/agents/jobs/job-hunter';

let isRunning = false;

export async function POST(request: Request) {
  try {
    const { action } = await request.json();
    
    if (action === 'start') {
      if (!isRunning) {
        isRunning = true;
        await jobHunter.startHunting(60);
        return NextResponse.json({ success: true, message: 'Job hunter activated', status: jobHunter.getStatus() });
      }
      return NextResponse.json({ success: true, message: 'Job hunter already running', status: jobHunter.getStatus() });
    }
    
    if (action === 'stop') {
      isRunning = false;
      jobHunter.stopHunting();
      return NextResponse.json({ success: true, message: 'Job hunter deactivated', status: jobHunter.getStatus() });
    }
    
    if (action === 'status') {
      return NextResponse.json({ success: true, status: jobHunter.getStatus() });
    }
    
    if (action === 'hunt') {
      await jobHunter.startHunting();
      jobHunter.stopHunting();
      return NextResponse.json({ success: true, message: 'One-time hunt completed' });
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Job deployment error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: jobHunter.getStatus(),
    message: 'Job hunter is ready',
    platforms: ['Upwork', 'RemoteOK', 'WeWorkRemotely', 'Indeed', 'Glassdoor']
  });
}
