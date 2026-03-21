// app/api/funding/scrape/route.ts
import { NextResponse } from 'next/server';
import { fundingScraper } from '@/lib/scrapers/funding/funding-scraper';

export async function GET() {
  try {
    const opportunities = await fundingScraper.scrapeAllCountries();
    await fundingScraper.saveOpportunities(opportunities);
    
    return NextResponse.json({
      success: true,
      count: opportunities.length,
      opportunities: opportunities.slice(0, 10),
      message: `Scraped ${opportunities.length} funding opportunities across 26 countries`
    });
  } catch (error) {
    console.error('Funding scrape error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}