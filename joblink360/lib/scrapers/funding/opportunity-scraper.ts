// lib/scrapers/funding/opportunity-scraper.ts
// COMPLETE MOCK - Does nothing during build

export class OpportunityScraper {
  private supabase: any;

  constructor(supabaseClient: any) {
    this.supabase = supabaseClient;
  }

  async scrape(): Promise<any[]> {
    // Return empty array - do nothing during build
    console.log('🛑 Mock scraper - returning empty array (no DB operations)');
    return [];
  }

  async saveOpportunity(opportunity: any): Promise<void> {
    // Do absolutely nothing
    console.log('🛑 Mock scraper - skipping save');
    return;
  }

  async scrapeAll(): Promise<any[]> {
    return [];
  }

  async getOpportunities(): Promise<any[]> {
    return [];
  }
}

export default OpportunityScraper;