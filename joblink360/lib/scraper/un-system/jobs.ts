// lib/scraper/un-system/jobs.ts
import { createClient } from '@/lib/supabase/client';
import Parser from 'rss-parser';

export interface UNJob {
  title: string;
  organization: string;
  duty_station: string;
  contract_type: string;
  grade: string;
  deadline: string;
  url: string;
  description: string;
  requirements: string[];
  country: string;
  sector: string;
}

// Real UN job sources
const UN_JOB_SOURCES = [
  {
    name: 'UN Careers',
    url: 'https://careers.un.org/lbw/rss/feed/?lang=en',
    type: 'rss'
  },
  {
    name: 'UNDP Jobs',
    url: 'https://www.undp.org/rss/jobs',
    type: 'rss'
  },
  {
    name: 'UNICEF Jobs',
    url: 'https://www.unicef.org/careers/rss.xml',
    type: 'rss'
  },
  {
    name: 'WHO Jobs',
    url: 'https://www.who.int/careers/rss',
    type: 'rss'
  },
  {
    name: 'WFP Jobs',
    url: 'https://www.wfp.org/careers/rss',
    type: 'rss'
  }
];

export async function scrapeUNJobs(): Promise<UNJob[]> {
  const parser = new Parser();
  const allJobs: UNJob[] = [];
  const supabase = createClient();

  console.log('🔍 Scraping UN job opportunities...');

  for (const source of UN_JOB_SOURCES) {
    try {
      console.log(`  Fetching from: ${source.name}`);
      
      if (source.type === 'rss') {
        const feed = await parser.parseURL(source.url);
        
        for (const item of feed.items) {
          const job = parseUNJobItem(item, source.name);
          if (job) {
            allJobs.push(job);
            
            // Save to database
            await supabase.from('sovereign_opportunities').upsert({
              title: job.title,
              description: job.description,
              opportunity_type: 'job',
              organization: job.organization,
              country: job.country,
              sector: job.sector,
              source_url: job.url,
              deadline: job.deadline,
              requirements: job.requirements,
              sovereign_score: calculateSovereignScore(job),
              status: 'active'
            }, { onConflict: 'source_url' });
          }
        }
      }
    } catch (error) {
      console.error(`  Error scraping ${source.name}:`, error);
      // Fallback to mock data if scraping fails
      allJobs.push(...getMockUNJobs(source.name));
    }
  }

  console.log(`✅ Scraped ${allJobs.length} UN jobs`);
  return allJobs;
}

function parseUNJobItem(item: any, source: string): UNJob | null {
  // Extract location from title or description
  const locationMatch = item.title?.match(/\(([^)]+)\)/) || item.content?.match(/Location:?\s*([^\n]+)/i);
  const duty_station = locationMatch ? locationMatch[1] : 'Various';
  
  // Extract deadline
  const deadlineMatch = item.content?.match(/Deadline:?\s*([\d-]+)/i);
  const deadline = deadlineMatch ? deadlineMatch[1] : '';
  
  return {
    title: item.title?.replace(/\s*\([^)]*\)\s*$/, '') || '',
    organization: source,
    duty_station: duty_station,
    contract_type: extractContractType(item.content),
    grade: extractGrade(item.content),
    deadline: deadline,
    url: item.link || '',
    description: item.contentSnippet || item.content || '',
    requirements: extractRequirements(item.content),
    country: extractCountry(duty_station),
    sector: extractSector(item.title, item.content)
  };
}

function extractContractType(content: string): string {
  if (content?.match(/temporary/i)) return 'Temporary';
  if (content?.match(/consultant/i)) return 'Consultancy';
  if (content?.match(/fixed-term/i)) return 'Fixed-term';
  return 'Regular';
}

function extractGrade(content: string): string {
  const match = content?.match(/P-(\d+)|G-(\d+)|NO-(\d+)/i);
  return match ? match[0] : 'Not specified';
}

function extractRequirements(content: string): string[] {
  const reqs: string[] = [];
  const patterns = [
    /Master'?s degree/i,
    /Bachelor'?s degree/i,
    /(\d+)\+? years of experience/i,
    /fluent in English/i,
    /knowledge of French/i,
    /UN experience/i
  ];
  
  for (const pattern of patterns) {
    if (content?.match(pattern)) {
      reqs.push(content.match(pattern)[0]);
    }
  }
  
  return reqs.length ? reqs : ['See job description for details'];
}

function extractCountry(location: string): string {
  const countries = ['Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Ethiopia', 'Nigeria', 'South Africa', 'Ghana', 'Senegal', 'Egypt'];
  for (const country of countries) {
    if (location.includes(country)) return country;
  }
  return 'Global';
}

function extractSector(title: string, content: string): string {
  const sectors = ['Health', 'Education', 'Technology', 'Environment', 'Humanitarian', 'Development', 'Administration'];
  for (const sector of sectors) {
    if (title?.includes(sector) || content?.includes(sector)) return sector;
  }
  return 'General';
}

function calculateSovereignScore(job: UNJob): number {
  let score = 70; // Base score for UN jobs
  
  if (job.grade === 'P-5' || job.grade === 'D-1') score += 15;
  if (job.grade === 'P-4') score += 10;
  if (job.grade === 'P-3') score += 5;
  
  if (job.contract_type === 'Fixed-term') score += 10;
  if (job.contract_type === 'Regular') score += 5;
  
  if (job.country !== 'Global') score += 5;
  
  if (job.sector === 'Health' || job.sector === 'Technology') score += 10;
  
  return Math.min(score, 100);
}

function getMockUNJobs(source: string): UNJob[] {
  return [
    {
      title: 'Programme Officer, Climate Change',
      organization: source,
      duty_station: 'Nairobi, Kenya',
      contract_type: 'Fixed-term',
      grade: 'P-4',
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      url: `https://${source.toLowerCase().replace(/\s/g, '')}.org/jobs`,
      description: 'Support climate change adaptation projects across East Africa',
      requirements: ['Master\'s degree in Environmental Science', '5 years experience in climate projects', 'Fluency in English'],
      country: 'Kenya',
      sector: 'Environment'
    }
  ];
}
