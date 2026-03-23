// app/api/jobs/scrape/route.ts
import { NextResponse } from 'next/server';
import { jobScraper } from '@/lib/scrapers/jobs/job-scraper';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'recent';
    const source = searchParams.get('source');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    let jobs;
    
    switch(action) {
      case 'top':
        jobs = await jobScraper.getTopJobs(limit);
        break;
      case 'source':
        if (!source) {
          return NextResponse.json({ error: 'Source parameter required' }, { status: 400 });
        }
        jobs = await jobScraper.getJobsBySource(source, limit);
        break;
      case 'recent':
      default:
        jobs = await jobScraper.getRecentJobs(limit);
        break;
    }
    
    return NextResponse.json({
      success: true,
      count: jobs.length,
      jobs: jobs,
      timestamp: new Date().toISOString(),
      message: jobs.length === 0 ? 'No jobs found. Try running a scrape first.' : undefined
    });
    
  } catch (error: any) {
    console.error('Job scraper API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { action } = await request.json();
    
    if (action === 'scrape') {
      const jobs = await jobScraper.scrapeAllSources();
      return NextResponse.json({
        success: true,
        message: `Scraped ${jobs.length} jobs from all sources`,
        count: jobs.length,
        jobs: jobs.slice(0, 10) // Return first 10 as preview
      });
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    
  } catch (error: any) {
    console.error('Job scraper API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
