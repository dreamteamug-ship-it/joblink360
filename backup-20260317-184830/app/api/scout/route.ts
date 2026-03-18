export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

export async function GET() {
  // Your scout logic here
  return NextResponse.json({ status: 'scout endpoint' });
}
