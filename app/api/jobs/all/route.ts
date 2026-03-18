import { NextResponse } from 'next/server';
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('q') || 'Software Engineer';
    const location = searchParams.get('location') || 'United States';
    
    const input = {
        "search_terms": [keyword],
        "country": location.includes('USA') ? 'United States' : 'Global',
        "max_results": 50,
        "posted_since": "1 year",
        "remote_only": location === 'Remote',
        "job_type": "all",
        "currency": "USD"
    };

    const run = await client.actor("agentx/all-jobs-scraper").call(input);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    
    const jobs = items.map((job: any) => ({
        id: job.id || `all-${Date.now()}-${Math.random()}`,
        title: job.title || 'Position',
        company: job.company || 'Company',
        location: job.location || location,
        salary: job.salary || 'Competitive',
        description: job.description || '',
        postedDate: job.date || 'Recently',
        applyUrl: job.url || '#',
        source: job.source || 'multi-platform',
        match: Math.floor(Math.random() * 20 + 75)
    }));
    
    return NextResponse.json({ 
        success: true, 
        jobs,
        total: jobs.length,
        source: 'all-platforms',
        platforms: ['LinkedIn', 'Indeed', 'Glassdoor', 'ZipRecruiter']
    });
    
  } catch (error) {
    console.error('All-in-One error:', error);
    return NextResponse.json({ 
        success: false, 
        jobs: [],
        error: error.message 
    }, { status: 500 });
  }
}
