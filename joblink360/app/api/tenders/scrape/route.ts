export const dynamic = 'force-dynamic'

// app/api/tenders/scrape/route.ts
// Tender Scrape API Route

import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import TenderScraper from '@/lib/scrapers/tenders/tender-scraper';

export async function GET(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const scraper = new TenderScraper(supabase);
    const tenders = await scraper.scrapeTenders();

    return NextResponse.json({
      success: true,
      data: tenders,
      count: tenders.length
    });
  } catch (error: any) {
    console.error('Tender scrape error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { country, skills } = await request.json();
    const scraper = new TenderScraper(supabase);
    let tenders;

    if (country) {
      tenders = await scraper.getTendersByCountry(country);
    } else if (skills && skills.length > 0) {
      tenders = await scraper.matchTendersToUser(session.user.id, skills);
    } else {
      tenders = await scraper.getTendersByCountry('Kenya');
    }

    return NextResponse.json({
      success: true,
      data: tenders,
      count: tenders.length
    });
  } catch (error: any) {
    console.error('Tender fetch error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
