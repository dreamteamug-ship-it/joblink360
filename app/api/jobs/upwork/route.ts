// app/api/jobs/upwork/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || 'developer';
  const limit = searchParams.get('limit') || '20';

  try {
    // Using Upwork RSS feeds (public, no API key required)
    const response = await fetch(
      `https://www.upwork.com/ab/feed/jobs/rss?q=${encodeURIComponent(query)}&sort=recency&paging=0%3B${limit}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; JobLink360/1.0)'
        }
      }
    );

    const xml = await response.text();
    
    // Parse RSS feed (simplified - in production use xml2js)
    const jobs = parseUpworkXML(xml);
    
    return NextResponse.json({
      success: true,
      jobs,
      source: 'upwork'
    });

  } catch (error) {
    console.error('Upwork API error:', error);
    return NextResponse.json({
      success: true,
      jobs: getMockUpworkJobs(query),
      source: 'mock'
    });
  }
}

function parseUpworkXML(xml: string): any[] {
  // Simple parsing - in production use proper XML parser
  const jobs: any[] = [];
  const items = xml.split('<item>');
  
  for (let i = 1; i < items.length; i++) {
    const item = items[i];
    const title = item.match(/<title>(.*?)<\/title>/)?.[1] || '';
    const link = item.match(/<link>(.*?)<\/link>/)?.[1] || '';
    const description = item.match(/<description>(.*?)<\/description>/)?.[1] || '';
    const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
    
    jobs.push({
      title,
      company: 'Upwork Client',
      location: 'Remote',
      salary: extractBudget(description),
      description: description.replace(/<[^>]*>/g, '').substring(0, 200),
      postedDate: new Date(pubDate).toLocaleDateString(),
      applyUrl: link,
      type: 'Freelance',
      source: 'upwork'
    });
  }
  
  return jobs.slice(0, 10);
}

function extractBudget(description: string): string {
  const budgetMatch = description.match(/Budget:?\s*\$(\d+(?:,\d+)?)/i);
  if (budgetMatch) {
    return `$${budgetMatch[1]}`;
  }
  const hourlyMatch = description.match(/Hourly Rate:?\s*\$(\d+(?:\.\d+)?)/i);
  if (hourlyMatch) {
    return `$${hourlyMatch[1]}/hr`;
  }
  return 'Competitive';
}

function getMockUpworkJobs(query: string) {
  return [
    {
      title: `Senior ${query} needed for long-term project`,
      company: 'Tech Startup',
      location: 'Remote',
      salary: '$40-60/hr',
      description: 'Looking for experienced developer for ongoing work...',
      postedDate: '2 days ago',
      applyUrl: '#',
      type: 'Freelance',
      source: 'upwork'
    },
    {
      title: `Part-time ${query} for mobile app`,
      company: 'App Agency',
      location: 'Remote',
      salary: '$3,000',
      description: 'Need help with React Native development...',
      postedDate: '3 days ago',
      applyUrl: '#',
      type: 'Freelance',
      source: 'upwork'
    }
  ];
}
