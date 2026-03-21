// lib/scrapers/job-scraper.ts
import axios from 'axios';
import * as cheerio from 'cheerio';
import Parser from 'rss-parser';

const parser = new Parser();

export class JobScraper {
  private sources = [
    { name: 'Upwork', url: 'https://www.upwork.com/ab/feed/jobs/rss', type: 'rss', enabled: true },
    { name: 'RemoteOK', url: 'https://remoteok.io/remote-dev-jobs.rss', type: 'rss', enabled: true },
    { name: 'WeWorkRemotely', url: 'https://weworkremotely.com/categories/remote-programming-jobs.rss', type: 'rss', enabled: true },
    { name: 'Indeed', url: 'https://www.indeed.com/rss?q=remote', type: 'rss', enabled: true },
    { name: 'Glassdoor', url: 'https://www.glassdoor.com/Job/rss.htm', type: 'rss', enabled: true }
  ];

  async scrapeAllSources(): Promise<any[]> {
    const allJobs = [];
    
    for (const source of this.sources.filter(s => s.enabled)) {
      try {
        console.log(`🕷️ Scraping ${source.name}...`);
        const jobs = await this.scrapeSource(source);
        allJobs.push(...jobs);
        console.log(`✅ Found ${jobs.length} jobs from ${source.name}`);
      } catch (error) {
        console.error(`❌ Failed to scrape ${source.name}:`, error.message);
      }
    }
    
    return allJobs;
  }

  private async scrapeSource(source: any): Promise<any[]> {
    try {
      if (source.type === 'rss') {
        const feed = await parser.parseURL(source.url);
        return feed.items.map(item => ({
          id: `${source.name}-${Date.now()}-${Math.random()}`,
          title: item.title || 'Untitled Position',
          company: this.extractCompany(item.title, item.content),
          location: 'Remote',
          description: item.contentSnippet || item.content || '',
          url: item.link,
          posted_date: item.pubDate ? new Date(item.pubDate) : new Date(),
          source: source.name,
          category: this.categorizeJob(item.title)
        }));
      }
      return [];
    } catch (error) {
      console.error(`Error scraping ${source.name}:`, error);
      return [];
    }
  }

  private extractCompany(title: string, content: string): string {
    const patterns = [
      /at\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/,
      /-\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+-/,
      /for\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/
    ];
    
    for (const pattern of patterns) {
      const match = title.match(pattern) || (content && content.match(pattern));
      if (match) return match[1];
    }
    return 'Unknown Company';
  }

  private categorizeJob(title: string): string {
    const categories = {
      'TECH_AI': ['AI', 'Machine Learning', 'Data Scientist', 'Prompt Engineer'],
      'TECH_SOFTWARE': ['Developer', 'Engineer', 'Programmer', 'Full Stack', 'Frontend', 'Backend'],
      'DEV_INGO': ['NGO', 'Development', 'Humanitarian', 'Program Manager'],
      'RESEARCH_MONITORING': ['Research', 'M&E', 'Data Collection', 'Analyst'],
      'MARKETING_COMMS': ['Marketing', 'Social Media', 'Content', 'SEO', 'PR'],
      'VIRTUAL_ASSISTANT': ['Assistant', 'Admin', 'Support', 'Coordinator']
    };
    
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(k => title.toLowerCase().includes(k.toLowerCase()))) {
        return category;
      }
    }
    return 'TECH_SOFTWARE';
  }
}

export const jobScraper = new JobScraper();