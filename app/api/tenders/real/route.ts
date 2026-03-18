export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

export async function GET() {
  const parser = new Parser();
  
  const sources = [
    'https://www.afdb.org/en/projects-and-operations/procurement/feed',
    'https://search.worldbank.org/api/projects/feed',
    'https://www.ungm.org/Public/Notice/RssFeeds'
  ];
  
  const allTenders = [];
  
  for (const source of sources) {
    try {
      const feed = await parser.parseURL(source);
      allTenders.push(...feed.items.map(item => ({
        title: item.title,
        organization: extractOrg(item),
        value: extractValue(item),
        deadline: extractDeadline(item),
        source: source
      })));
    } catch (e) {
      console.error(`Failed to fetch ${source}`);
    }
  }
  
  return NextResponse.json({ tenders: allTenders });
}
