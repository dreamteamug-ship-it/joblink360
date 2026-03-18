export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { ApifyClient } from 'apify-client';

// Initialize the ApifyClient with your API token
const client = new ApifyClient({
    token: process.env.APIFY_TOKEN || '', // Get from apify.com/integrations
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('q') || 'Software Engineer';
    const location = searchParams.get('location') || 'United States';
    
    // Prepare Actor input for pay-per-result scraper ($2.45 per 1000 jobs) [citation:9]
    const input = {
        "keyword": keyword,
        "location": location,
        "maxResults": 50 // Limit results to control costs
    };

    // Run the Glassdoor Jobs Scraper
    const run = await client.actor("silentflow/glassdoor-jobs-scraper-ppr").call(input);
        
    // Fetch results from the run's dataset
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    
    // Transform Glassdoor data to match your app's format
    const jobs = items.map((job: any) => ({
        id: job.id || `glassdoor-${Date.now()}-${Math.random()}`,
        title: job.title || 'Position',
        company: job.companyName || 'Company',
        location: job.location || 'Remote',
        salary: formatSalary(job.salary),
        description: job.description || '',
        postedDate: job.postedDate || 'Recently',
        applyUrl: job.url || '#',
        source: 'glassdoor',
        match: calculateMatch(job) // 70-95% range
    }));
    
    return NextResponse.json({ 
        success: true, 
        jobs,
        source: 'glassdoor'
    });
    
  } catch (error) {
    console.error('Glassdoor API error:', error);
    return NextResponse.json({ 
        success: false, 
        jobs: [],
        error: 'Failed to fetch Glassdoor jobs' 
    });
  }
}

function formatSalary(salary: any): string {
    if (!salary) return 'Competitive';
    if (salary.min && salary.max) {
        return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()}`;
    }
    return salary.text || 'Competitive';
}

function calculateMatch(job: any): number {
    // Simple match score based on job age (simulated)
    // In production, this would use actual candidate-job matching
    return Math.floor(Math.random() * 20 + 75); // 75-95%
}
