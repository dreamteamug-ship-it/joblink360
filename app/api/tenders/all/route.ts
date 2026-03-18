export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { COUNTRIES, getAllCountries } from '@/lib/countries/data';
import Parser from 'rss-parser';

const parser = new Parser();

const TENDER_SOURCES = {
  // African Development Bank (All countries)
  afdb: 'https://www.afdb.org/en/projects-and-operations/procurement/feed',
  
  // World Bank (All countries)
  worldbank: 'https://search.worldbank.org/api/projects/feed',
  
  // UNGM (All countries)
  ungm: 'https://www.ungm.org/Public/Notice/RssFeeds',
  
  // Country-specific
  KE: 'https://tenders.go.ke/feed',
  UG: 'https://ppda.go.ug/feed',
  TZ: 'https://ppra.go.tz/feed',
  ZA: 'https://etenders.gov.za/feed',
  // ... add all 26 countries
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const country = searchParams.get('country') || 'all';
  const category = searchParams.get('category') || 'all';

  const allTenders = [];
  const sources = country === 'all' ? TENDER_SOURCES : { [country]: TENDER_SOURCES[country] };

  for (const [code, url] of Object.entries(sources)) {
    try {
      const feed = await parser.parseURL(url as string);
      const countryInfo = COUNTRIES[code] || { name: code, currency: 'USD' };
      
      const tenders = feed.items.map(item => ({
        id: item.guid,
        title: item.title,
        description: item.contentSnippet,
        organization: item.creator || 'Government',
        country: countryInfo.name,
        countryCode: code,
        value: extractValue(item.contentSnippet),
        currency: countryInfo.currency,
        deadline: extractDeadline(item.contentSnippet),
        category: detectCategory(item.title + ' ' + item.contentSnippet),
        url: item.link,
        source: code,
        postedDate: item.pubDate
      }));
      
      allTenders.push(...tenders);
    } catch (e) {
      console.log(`Failed to fetch ${code} tenders`);
    }
  }

  return NextResponse.json({ 
    success: true,
    total: allTenders.length,
    tenders: allTenders,
    countries: getAllCountries().map(c => c.code)
  });
}

function extractValue(text: string): string {
  const match = text.match(/(?:USD|KES|UGX|TZS|ZAR)\s*[\d,]+/);
  return match ? match[0] : 'Contact for pricing';
}

function extractDeadline(text: string): string {
  const match = text.match(/\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : 'TBD';
}

function detectCategory(text: string): string {
  const categories = {
    'health': ['medical', 'health', 'hospital', 'pharma'],
    'infrastructure': ['road', 'bridge', 'construction', 'building'],
    'technology': ['it', 'software', 'computer', 'digital'],
    'agriculture': ['farm', 'agriculture', 'crop', 'livestock'],
    'education': ['school', 'university', 'education', 'training']
  };

  for (const [cat, keywords] of Object.entries(categories)) {
    if (keywords.some(k => text.toLowerCase().includes(k))) {
      return cat;
    }
  }
  return 'other';
}
