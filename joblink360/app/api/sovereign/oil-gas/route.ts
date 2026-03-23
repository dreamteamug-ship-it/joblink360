// app/api/sovereign/oil-gas/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { scrapeOilGasOpportunities } from '@/lib/scraper/oil-gas/scraper';
import { OIL_GAS_COUNTRIES } from '@/lib/scraper/oil-gas/config';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');
    const type = searchParams.get('type') || 'all';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10;
    const offset = (page - 1) * limit;
    
    const supabase = createClient();
    
    let query = supabase
      .from('sovereign_opportunities')
      .select('*', { count: 'exact' })
      .eq('status', 'active')
      .eq('sector', 'Oil & Gas')
      .order('sovereign_score', { ascending: false })
      .order('deadline', { ascending: true });
    
    if (country) {
      query = query.eq('country', country);
    }
    
    if (type !== 'all') {
      query = query.eq('opportunity_type', type);
    }
    
    const { data: opportunities, error, count } = await query
      .range(offset, offset + limit - 1);
    
    if (error) throw error;
    
    return NextResponse.json({
      success: true,
      opportunities,
      pagination: {
        page,
        limit,
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
    
  } catch (error: any) {
    console.error('Oil & Gas API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { action, country } = await request.json();
    
    if (action === 'scrape') {
      const opportunities = await scrapeOilGasOpportunities(country);
      return NextResponse.json({
        success: true,
        message: `Scraped ${opportunities.length} oil & gas opportunities`,
        opportunities
      });
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
