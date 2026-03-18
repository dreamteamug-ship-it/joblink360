export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const company = searchParams.get('company') || 'Google';
    
    const input = {
        "companyUrls": [
            `https://www.glassdoor.com/Overview/Working-at-${company}-EI_IE9079.htm`
        ],
        "maxReviews": 25,
        "includeSalaries": true,
        "proxyConfiguration": {
            "useApifyProxy": true,
            "apifyProxyGroups": ["RESIDENTIAL"]
        }
    };

    const run = await client.actor("sovereigntaylor/glassdoor-scraper").call(input);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    
    const companyData = items.map((item: any) => ({
        company: item.companyName || company,
        rating: item.overallRating || 0,
        reviews: item.reviews?.slice(0, 10) || [],
        salaries: item.salaries?.slice(0, 10) || [],
        ceoApproval: item.ceoApproval || 'N/A',
        recommendToFriend: item.recommendToFriend || 0,
        businessOutlook: item.businessOutlook || 'N/A'
    }));
    
    return NextResponse.json({ 
        success: true, 
        data: companyData[0] || {},
        source: 'glassdoor-intelligence',
        includes: ['company', 'reviews', 'salaries']
    });
    
  } catch (error) {
    console.error('Glassdoor Intelligence error:', error);
    return NextResponse.json({ 
        success: false, 
        data: {},
        error: error.message 
    }, { status: 500 });
  }
}

