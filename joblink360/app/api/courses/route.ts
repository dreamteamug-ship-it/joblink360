export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

function db() {
  const u = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const k = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!u || u.includes('placeholder')) return null;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { createClient } = require('@supabase/supabase-js');
  return createClient(u, k);
}

export async function GET(request: Request) {
  const courses = [
    { id:"1", title:"AI Prompt Engineering", level:"Beginner", price:5000, income:"$500-1000/mo" },
    { id:"2", title:"Data Annotation Mastery", level:"Intermediate", price:5000, income:"$800-1500/mo" },
    { id:"3", title:"High-Ticket Virtual Sales", level:"Advanced", price:5000, income:"$2000-5000/mo" },
    { id:"4", title:"Pan-African Trade AI", level:"Expert", price:5000, income:"$3000-8000/mo" },
  ];
  return NextResponse.json({ courses, count: courses.length });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    return NextResponse.json({ success: true, received: body, timestamp: new Date().toISOString() });
  } catch(e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
