// lib/scrapers/global-scraper.ts
// Mock global scraper

export class GlobalScraper {
  constructor() {}

  async scrapeAll(): Promise<any[]> {
    console.log('🛑 Global scraper - skipping during build');
    return [];
  }

  async scrapeFunding(): Promise<any[]> {
    return [];
  }

  async scrapeTenders(): Promise<any[]> {
    return [];
  }

  async scrapeJobs(): Promise<any[]> {
    return [];
  }
}

export default GlobalScraper;