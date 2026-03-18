import { NextResponse } from 'next/server';
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('q') || 'Software Engineer';
    const location = searchParams.get('location') || 'United States';
    
    const input = {
        "keyword": keyword,
        "location": location,
        "maxResults": 50
    };

    const run = await client.actor("silentflow/glassdoor-jobs-scraper-ppr").call(input);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    
    const jobs = items.map((job: any) => ({
        id: job.id || `gd-${Date.now()}-${Math.random()}`,
        title: job.title || 'Position',
        company: job.companyName || 'Company',
        location: job.location || location,
        salary: job.salary?.text || 'Competitive',
        description: job.description || '',
        postedDate: job.postedDate || 'Recently',
        applyUrl: job.url || '#',
        source: 'glassdoor-ppr',
        match: Math.floor(Math.random() * 20 + 75)
    }));
    
    return NextResponse.json({ 
        success: true, 
        jobs,
        total: jobs.length,
        source: 'glassdoor-ppr',
        pricing: '$2.45/1000 jobs'
    });
    
  } catch (error) {
    console.error('Glassdoor PPR error:', error);
    return NextResponse.json({ 
        success: false, 
        jobs: [],
        error: error.message 
    }, { status: 500 });
  }
}
