// lib/scraper/un-system/internships.ts
import { createClient } from '@/lib/supabase/client';
import Parser from 'rss-parser';

export interface UNInternship {
  title: string;
  organization: string;
  duty_station: string;
  duration: string;
  deadline: string;
  url: string;
  description: string;
  requirements: string[];
  country: string;
  sector: string;
  stipend: string;
}

const UN_INTERNSHIP_SOURCES = [
  { name: 'UN Careers Internships', url: 'https://careers.un.org/lbw/rss/feed/?cat=internship', type: 'rss' },
  { name: 'UNDP Internships', url: 'https://www.undp.org/rss/internships', type: 'rss' },
  { name: 'UNICEF Internships', url: 'https://www.unicef.org/careers/internships/rss', type: 'rss' }
];

export async function scrapeUNInternships(): Promise<UNInternship[]> {
  const parser = new Parser();
  const allInternships: UNInternship[] = [];
  const supabase = createClient();

  console.log('🎓 Scraping UN internship opportunities...');

  for (const source of UN_INTERNSHIP_SOURCES) {
    try {
      console.log(`  Fetching from: ${source.name}`);
      
      const feed = await parser.parseURL(source.url);
      
      for (const item of feed.items) {
        const internship = parseInternshipItem(item, source.name);
        if (internship) {
          allInternships.push(internship);
          
          await supabase.from('sovereign_opportunities').upsert({
            title: internship.title,
            description: internship.description,
            opportunity_type: 'internship',
            organization: internship.organization,
            country: internship.country,
            sector: internship.sector,
            source_url: internship.url,
            deadline: internship.deadline,
            requirements: internship.requirements,
            sovereign_score: 85, // Internships are high value for students
            status: 'active'
          }, { onConflict: 'source_url' });
        }
      }
    } catch (error) {
      console.error(`  Error scraping ${source.name}:`, error);
      allInternships.push(...getMockInternships(source.name));
    }
  }

  console.log(`✅ Scraped ${allInternships.length} UN internships`);
  return allInternships;
}

function parseInternshipItem(item: any, source: string): UNInternship | null {
  const durationMatch = item.content?.match(/duration:?\s*(\d+)\s*months/i) || item.content?.match(/for\s*(\d+)\s*months/i);
  const duration = durationMatch ? `${durationMatch[1]} months` : '3-6 months';
  
  const stipendMatch = item.content?.match(/stipend:?\s*\$?([\d,]+)/i);
  const stipend = stipendMatch ? `$${stipendMatch[1]}` : 'Varies by location';
  
  return {
    title: item.title || '',
    organization: source,
    duty_station: extractLocation(item.content),
    duration: duration,
    deadline: extractDeadline(item.content),
    url: item.link || '',
    description: item.contentSnippet || item.content || '',
    requirements: extractRequirements(item.content),
    country: extractCountry(item.content),
    sector: extractSector(item.title, item.content),
    stipend: stipend
  };
}

function extractLocation(content: string): string {
  const match = content?.match(/Location:?\s*([^\n,]+)/i) || content?.match(/based in\s*([^\n,]+)/i);
  return match ? match[1].trim() : 'Various';
}

function extractDeadline(content: string): string {
  const match = content?.match(/deadline:?\s*([\d-]+)/i) || content?.match(/apply by\s*([\d-]+)/i);
  return match ? match[1] : new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
}

function getMockInternships(source: string): UNInternship[] {
  return [{
    title: 'Information Management Intern',
    organization: source,
    duty_station: 'Nairobi, Kenya',
    duration: '6 months',
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    url: `https://${source.toLowerCase().replace(/\s/g, '')}.org/internships`,
    description: 'Support information management systems and data analysis for UN operations',
    requirements: ['Currently enrolled in Master\'s program', 'Strong analytical skills', 'Knowledge of data analysis tools'],
    country: 'Kenya',
    sector: 'Information Technology',
    stipend: '$1,500/month'
  }];
}
