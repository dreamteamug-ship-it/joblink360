import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();
  const { data } = await supabase.from('tenders').select('*');
  return NextResponse.json(data);
}
