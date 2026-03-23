// app/api/sovereign/un-system/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { scrapeUNJobs } from '@/lib/scraper/un-system/jobs';
import { scrapeUNInternships } from '@/lib/scraper/un-system/internships';
import { scrapeUNTenders } from '@/lib/scraper/un-system/tenders';
import { scrapeUNPrequalification } from '@/lib/scraper/un-system/prequalification';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';
    const country = searchParams.get('country');
    const sector = searchParams.get('sector');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10;
    const offset = (page - 1) * limit;
    
    const supabase = createClient();
    
    let query = supabase
      .from('sovereign_opportunities')
      .select('*', { count: 'exact' })
      .eq('status', 'active')
      .eq('organization', 'UN')
      .order('sovereign_score', { ascending: false })
      .order('deadline', { ascending: true });
    
    if (type !== 'all') {
      query = query.eq('opportunity_type', type);
    }
    
    if (country) {
      query = query.eq('country', country);
    }
    
    if (sector) {
      query = query.eq('sector', sector);
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
    console.error('UN System API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { action } = await request.json();
    
    if (action === 'scrape') {
      // Trigger all scrapers
      const [jobs, internships, tenders, prequal] = await Promise.all([
        scrapeUNJobs(),
        scrapeUNInternships(),
        scrapeUNTenders(),
        scrapeUNPrequalification()
      ]);
      
      return NextResponse.json({
        success: true,
        message: `Scraped ${jobs.length} jobs, ${internships.length} internships, ${tenders.length} tenders, ${prequal.length} prequalification opportunities`
      });
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
