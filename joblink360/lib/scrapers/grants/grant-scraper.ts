// Mock scraper - returns empty array to prevent build errors

export class Scraper {
  constructor(supabaseClient: any) {}

  async scrape(): Promise<any[]> {
    console.log('ðŸ”„ Mock scraper running - returning empty array');
    return [];
  }
}

export default Scraper;