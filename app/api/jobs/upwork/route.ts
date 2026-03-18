import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || 'developer';
    
    // Upwork public RSS feeds by category
    const rssFeeds = {
      'web-dev': 'https://www.upwork.com/ab/feed/jobs/rss?category=web-mobile-software-dev&sort=recency',
      'data-science': 'https://www.upwork.com/ab/feed/jobs/rss?category=data-science-analytics&sort=recency',
      'design': 'https://www.upwork.com/ab/feed/jobs/rss?category=design-creative&sort=recency',
      'writing': 'https://www.upwork.com/ab/feed/jobs/rss?category=writing-translation&sort=recency'
    };
    
    // Use the appropriate feed based on query
    let feedUrl = rssFeeds['web-dev']; // default
    if (query.includes('data') || query.includes('science')) feedUrl = rssFeeds['data-science'];
    if (query.includes('design')) feedUrl = rssFeeds['design'];
    if (query.includes('write') || query.includes('content')) feedUrl = rssFeeds['writing'];
    
    const feed = await parser.parseURL(feedUrl);
    
    const jobs = feed.items.slice(0, 20).map(item => ({
      id: item.guid,
      title: item.title,
      company: 'Upwork Client',
      location: 'Remote',
      description: item.contentSnippet?.substring(0, 200),
      postedDate: item.pubDate,
      applyUrl: item.link,
      source: 'upwork',
      salary: extractBudget(item.contentSnippet)
    }));
    
    return NextResponse.json({ jobs });
  } catch (error) {
    console.error('Upwork RSS error:', error);
    return NextResponse.json({ jobs: [] });
  }
}

function extractBudget(text: string = ''): string {
  const budgetMatch = text.match(/Budget:?\s*\$(\d+(?:,\d+)?)/i);
  if (budgetMatch) return `$${budgetMatch[1]}`;
  const hourlyMatch = text.match(/Hourly.*?\$(\d+(?:\.\d+)?)/i);
  if (hourlyMatch) return `$${hourlyMatch[1]}/hr`;
  return 'Competitive';
}