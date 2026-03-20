import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    gemini_key_exists: !!process.env.GEMINI_API_KEY,
    gemini_key_length: process.env.GEMINI_API_KEY?.length || 0,
    node_env: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
}