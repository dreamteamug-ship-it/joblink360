import { NextResponse } from 'next/server';
import { runScoutAgent } from '@/lib/scout-agent';

export async function GET() {
  const targets = ['https://kenyajobs.com', 'https://ugandajobs.com'];
  try {
    const results = await Promise.all(targets.map(url => runScoutAgent(url).catch(e => ({ error: e.message }))));
    return NextResponse.json({ status: 'success', agents_active: results.length });
  } catch (error) {
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
