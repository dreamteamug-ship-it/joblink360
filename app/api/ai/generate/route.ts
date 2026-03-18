export const dynamic = 'force-dynamic';

// app/api/ai/generate/route.ts
import { NextResponse } from 'next/server';
import { aiOrchestrator } from '@/lib/ai/core/orchestrator';

export async function GET() {
  try {
    const data = aiOrchestrator.generatePlatformData();
    
    return NextResponse.json({
      success: true,
      message: 'AI-generated platform data',
      data,
      timestamp: new Date().toISOString(),
      aiVersion: '1.0.0'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'AI generation failed' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { type, count } = await req.json();
    
    let result;
    switch (type) {
      case 'jobs':
        result = aiOrchestrator.generateJobs(count || 10);
        break;
      case 'farmers':
        result = aiOrchestrator.generateFarmers(count || 50);
        break;
      case 'courses':
        result = aiOrchestrator.generateCoursePrices();
        break;
      default:
        result = aiOrchestrator.generatePlatformData();
    }
    
    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'AI generation failed' },
      { status: 500 }
    );
  }
}



