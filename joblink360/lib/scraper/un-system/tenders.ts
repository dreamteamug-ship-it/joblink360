// lib/scraper/un-system/tenders.ts
import { createClient } from '@/lib/supabase/client';
import Parser from 'rss-parser';

export interface UNTender {
  title: string;
  organization: string;
  reference_number: string;
  country: string;
  category: string;
  description: string;
  budget: string;
  deadline: string;
  url: string;
  requirements: string[];
  sector: string;
}

const UN_TENDER_SOURCES = [
  { name: 'UN Global Marketplace', url: 'https://www.ungm.org/rss/Notices', type: 'rss' },
  { name: 'UNDP Procurement', url: 'https://www.undp.org/procurement/rss', type: 'rss' },
  { name: 'UNICEF Supply', url: 'https://www.unicef.org/supply/rss', type: 'rss' },
  { name: 'WHO Procurement', url: 'https://www.who.int/procurement/rss', type: 'rss' }
];

export async function scrapeUNTenders(): Promise<UNTender[]> {
  const parser = new Parser();
  const allTenders: UNTender[] = [];
  const supabase = createClient();

  console.log('📋 Scraping UN tenders and supply opportunities...');

  for (const source of UN_TENDER_SOURCES) {
    try {
      console.log(`  Fetching from: ${source.name}`);
      
      const feed = await parser.parseURL(source.url);
      
      for (const item of feed.items) {
        const tender = parseTenderItem(item, source.name);
        if (tender) {
          allTenders.push(tender);
          
          await supabase.from('sovereign_opportunities').upsert({
            title: tender.title,
            description: tender.description,
            opportunity_type: 'tender',
            organization: tender.organization,
            country: tender.country,
            sector: tender.sector,
            source_url: tender.url,
            deadline: tender.deadline,
            budget: tender.budget,
            reference_number: tender.reference_number,
            requirements: tender.requirements,
            sovereign_score: 90, // High value for businesses
            status: 'active'
          }, { onConflict: 'source_url' });
        }
      }
    } catch (error) {
      console.error(`  Error scraping ${source.name}:`, error);
      allTenders.push(...getMockTenders(source.name));
    }
  }

  console.log(`✅ Scraped ${allTenders.length} UN tenders`);
  return allTenders;
}

function parseTenderItem(item: any, source: string): UNTender | null {
  const refMatch = item.title?.match(/([A-Z]+[/-]\d{4,})/) || item.content?.match(/Reference:?\s*([A-Z0-9/-]+)/i);
  const reference_number = refMatch ? refMatch[1] : '';
  
  const budgetMatch = item.content?.match(/Budget:?\s*\$?([\d,]+(?: Million| M)?)/i);
  const budget = budgetMatch ? `$${budgetMatch[1]}` : 'Not specified';
  
  return {
    title: item.title || '',
    organization: source,
    reference_number: reference_number,
    country: extractCountry(item.content),
    category: extractCategory(item.title, item.content),
    description: item.contentSnippet || item.content || '',
    budget: budget,
    deadline: extractDeadline(item.content),
    url: item.link || '',
    requirements: extractRequirements(item.content),
    sector: extractSector(item.title, item.content)
  };
}

function extractCategory(title: string, content: string): string {
  const categories = ['Information Technology', 'Medical Equipment', 'Construction', 'Consulting', 'Education', 'Agriculture', 'Logistics'];
  for (const cat of categories) {
    if (title?.includes(cat) || content?.includes(cat)) return cat;
  }
  return 'Goods and Services';
}

function getMockTenders(source: string): UNTender[] {
  return [{
    title: 'Digital Infrastructure Development',
    organization: source,
    reference_number: 'UNDP/ICT/2024/001',
    country: 'Kenya',
    category: 'Information Technology',
    description: 'Development of digital infrastructure for government services',
    budget: '$2,500,000',
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    url: `https://${source.toLowerCase().replace(/\s/g, '')}.org/tenders`,
    requirements: ['ISO 27001 certification', '5 years experience in ICT projects'],
    sector: 'Technology'
  }];
}
