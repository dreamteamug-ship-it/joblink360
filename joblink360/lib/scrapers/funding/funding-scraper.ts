// lib/scrapers/funding/funding-scraper.ts
import { supabase } from '@/lib/supabase/client';

export interface FundingOpportunity {
  id: string;
  title: string;
  description: string;
  amount: string;
  currency: string;
  deadline: Date;
  provider: string;
  country: string;
  region: string;
  category: string;
  eligibility: string[];
  application_url: string;
  source: string;
  success_probability: number;
}

export class FundingScraper {
  private sources = [
    { name: 'World Bank', url: 'https://www.worldbank.org/en/projects-operations/products-and-services', countries: ['KE', 'TZ', 'UG', 'ZA', 'NG', 'GH'] },
    { name: 'African Development Bank', url: 'https://www.afdb.org/en/funding', countries: ['ALL'] },
    { name: 'EU Grants', url: 'https://europa.eu/european-union/funding-grants_en', countries: ['ALL'] },
    { name: 'USAID', url: 'https://www.usaid.gov/work-usaid/funding-opportunities', countries: ['KE', 'TZ', 'UG', 'ET', 'SO'] },
    { name: 'DFID/FCDO', url: 'https://www.gov.uk/international-development-funding', countries: ['ALL'] },
    { name: 'Gates Foundation', url: 'https://www.gatesfoundation.org/how-we-work/funding-opportunities', countries: ['ALL'] },
    { name: 'Mastercard Foundation', url: 'https://mastercardfdn.org/funding', countries: ['KE', 'UG', 'RW', 'GH'] },
    { name: 'Ford Foundation', url: 'https://www.fordfoundation.org/work/grants', countries: ['ALL'] },
    { name: 'Open Society Foundations', url: 'https://www.opensocietyfoundations.org/grants', countries: ['ALL'] },
    { name: 'Google.org', url: 'https://www.google.org/grants', countries: ['ALL'] }
  ];

  private countries = {
    KE: { name: 'Kenya', currency: 'KES', region: 'East Africa' },
    TZ: { name: 'Tanzania', currency: 'TZS', region: 'East Africa' },
    UG: { name: 'Uganda', currency: 'UGX', region: 'East Africa' },
    RW: { name: 'Rwanda', currency: 'RWF', region: 'East Africa' },
    ET: { name: 'Ethiopia', currency: 'ETB', region: 'East Africa' },
    SO: { name: 'Somalia', currency: 'SOS', region: 'East Africa' },
    ZA: { name: 'South Africa', currency: 'ZAR', region: 'Southern Africa' },
    ZM: { name: 'Zambia', currency: 'ZMW', region: 'Southern Africa' },
    ZW: { name: 'Zimbabwe', currency: 'USD', region: 'Southern Africa' },
    MW: { name: 'Malawi', currency: 'MWK', region: 'Southern Africa' },
    MZ: { name: 'Mozambique', currency: 'MZN', region: 'Southern Africa' },
    NA: { name: 'Namibia', currency: 'NAD', region: 'Southern Africa' },
    BW: { name: 'Botswana', currency: 'BWP', region: 'Southern Africa' },
    NG: { name: 'Nigeria', currency: 'NGN', region: 'West Africa' },
    GH: { name: 'Ghana', currency: 'GHS', region: 'West Africa' }
  };

  async scrapeAllCountries(): Promise<FundingOpportunity[]> {
    const allOpportunities: FundingOpportunity[] = [];
    
    for (const source of this.sources) {
      for (const [countryCode, country] of Object.entries(this.countries)) {
        if (source.countries.includes('ALL') || source.countries.includes(countryCode)) {
          try {
            console.log(`ðŸ•·ï¸ Scraping ${source.name} for ${country.name}...`);
            const opportunities = await this.scrapeSource(source, countryCode);
            allOpportunities.push(...opportunities);
            console.log(`âœ… Found ${opportunities.length} opportunities in ${country.name}`);
          } catch (error) {
            console.error(`âŒ Failed to scrape ${source.name} for ${country.name}:`, error);
          }
        }
      }
    }
    
    return allOpportunities;
  }

  private async scrapeSource(source: any, countryCode: string): Promise<FundingOpportunity[]> {
    // AI-powered scraping simulation
    // In production, this would use Puppeteer/Cheerio with AI analysis
    
    const opportunities: FundingOpportunity[] = [];
    const country = this.countries[countryCode];
    
    // Generate sample opportunities for demo
    const categories = ['Education', 'Health', 'Agriculture', 'Technology', 'Entrepreneurship', 'Infrastructure', 'Climate Change'];
    const amounts = ['$10,000 - $50,000', '$50,000 - $100,000', '$100,000 - $500,000', '$500,000 - $1,000,000', '$1M+'];
    
    for (let i = 0; i < 3; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const amount = amounts[Math.floor(Math.random() * amounts.length)];
      
      opportunities.push({
        id: `${source.name}-${countryCode}-${Date.now()}-${i}`,
        title: `${category} Innovation Grant - ${country.name}`,
        description: `Supporting innovative projects in ${category} that benefit local communities in ${country.name}.`,
        amount: amount,
        currency: country.currency,
        deadline: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000),
        provider: source.name,
        country: countryCode,
        region: country.region,
        category: category,
        eligibility: [`Registered in ${country.name}`, `Minimum 2 years experience`, `Demonstrated impact`],
        application_url: `${source.url}/${countryCode.toLowerCase()}`,
        source: source.name,
        success_probability: Math.random() * 30 + 50 // 50-80% probability
      });
    }
    
    return opportunities;
  }

  async saveOpportunities(opportunities: FundingOpportunity[]): Promise<void> {
    for (const opp of opportunities) {
      const { error } = await supabase
        .from('funding_opportunities')
        .upsert({
          id: opp.id,
          title: opp.title,
          description: opp.description,
          amount: opp.amount,
          currency: opp.currency,
          deadline: opp.deadline,
          provider: opp.provider,
          country: opp.country,
          region: opp.region,
          category: opp.category,
          eligibility: opp.eligibility,
          application_url: opp.application_url,
          source: opp.source,
          success_probability: opp.success_probability,
          scraped_at: new Date().toISOString()
        });
      
      if (error) console.error('Failed to save opportunity:', error);
    }
  }
}

export const fundingScraper = new FundingScraper();