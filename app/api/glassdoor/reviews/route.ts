export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const company = searchParams.get('company') || 'Google';
    
    const input = {
        "startItems": [
            `https://www.glassdoor.com/Overview/Working-at-${company}-EI_IE9079.11,17.htm`
        ],
        "proxyConfiguration": {
            "useApifyProxy": true,
            "apifyProxyGroups": ["RESIDENTIAL"]
        }
    };

    const run = await client.actor("scrapio/glassdoor-reviews-scraper").call(input);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    
    const reviews = items.map((item: any) => ({
        company: item.companyName || company,
        rating: item.overallRating || 0,
        reviewCount: item.reviewCount || 0,
        pros: item.pros || '',
        cons: item.cons || '',
        advice: item.adviceToManagement || '',
        date: item.datePosted || new Date().toISOString(),
        jobTitle: item.jobTitle || 'Employee'
    }));
    
    return NextResponse.json({ 
        success: true, 
        reviews,
        total: reviews.length,
        source: 'glassdoor-reviews',
        pricing: '$14.99/month + usage'
    });
    
  } catch (error) {
    console.error('Glassdoor Reviews error:', error);
    return NextResponse.json({ 
        success: false, 
        reviews: [],
        error: error.message 
    }, { status: 500 });
  }
}

