export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || 'developer';
    const location = searchParams.get('location') || 'Kenya';
    
    // Try to use Apify if available, otherwise return mock data
    if (process.env.APIFY_TOKEN) {
      try {
        const { ApifyClient } = await import('apify-client');
        const client = new ApifyClient({ token: process.env.APIFY_TOKEN });
        
        const input = {
          "searchTerms": [query],
          "location": location,
          "maxResults": 20
        };
        
        const run = await client.actor("voyager/indeed-scraper").call(input);
        const { items } = await client.dataset(run.defaultDatasetId).listItems();
        
        return NextResponse.json({ jobs: items, source: 'indeed' });
      } catch (e) {
        console.log('Apify failed, using mock data');
      }
    }
    
    // Mock data fallback
    return NextResponse.json({ 
      jobs: [
        {
          id: 1,
          title: `Senior ${query}`,
          company: 'Tech Company',
          location: location,
          salary: 'Competitive',
          description: 'Great opportunity...',
          postedDate: '2 days ago',
          source: 'indeed-mock'
        }
      ]
    });
    
  } catch (error) {
    return NextResponse.json({ jobs: [] });
  }
}
