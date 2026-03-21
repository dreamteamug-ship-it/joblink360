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
  const products = [
    { id:"1", name:"AI Prompt Engineering Course", price:5000, category:"Courses", icon:"🤖" },
    { id:"2", name:"Data Annotation Mastery", price:5000, category:"Courses", icon:"📊" },
    { id:"3", name:"Virtual Sales Elite", price:5000, category:"Courses", icon:"💼" },
    { id:"4", name:"Grant Writing with AI", price:3500, category:"Courses", icon:"📝" },
    { id:"5", name:"Premium Membership", price:2500, category:"Membership", icon:"⭐" },
    { id:"6", name:"Business Plan Bundle", price:1500, category:"Templates", icon:"📋" },
    { id:"7", name:"ERP Consultation", price:15000, category:"Services", icon:"⚙️" },
    { id:"8", name:"Pan-African Trade AI", price:5000, category:"Courses", icon:"🌍" },
  ];
  return NextResponse.json({ products, count: products.length });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    return NextResponse.json({ success: true, received: body, timestamp: new Date().toISOString() });
  } catch(e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
