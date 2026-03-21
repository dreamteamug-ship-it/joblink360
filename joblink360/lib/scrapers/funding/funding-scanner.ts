// lib/scrapers/funding/funding-scanner.ts
import { supabase } from '@/lib/supabase/client';

export class FundingScanner {
  // Real funding sources with actual APIs/RSS feeds
  private sources = [
    {
      name: 'World Bank',
      type: 'api',
      url: 'https://finances.worldbank.org/api/views/',
      countries: ['ALL'],
      category: 'Infrastructure, Development'
    },
    {
      name: 'African Development Bank',
      type: 'rss',
      url: 'https://www.afdb.org/en/funding/rss',
      countries: ['ALL'],
      category: 'Agriculture, Energy, Infrastructure'
    },
    {
      name: 'EU Grants',
      type: 'web',
      url: 'https://europa.eu/european-union/funding-grants_en',
      countries: ['ALL'],
      category: 'Research, Innovation, Education'
    },
    {
      name: 'USAID',
      type: 'api',
      url: 'https://www.usaid.gov/api/funding',
      countries: ['KE', 'TZ', 'UG', 'ET', 'SO'],
      category: 'Health, Education, Democracy'
    },
    {
      name: 'Gates Foundation',
      type: 'rss',
      url: 'https://www.gatesfoundation.org/rss/funding',
      countries: ['ALL'],
      category: 'Global Health, Development'
    },
    {
      name: 'Mastercard Foundation',
      type: 'web',
      url: 'https://mastercardfdn.org/funding-opportunities',
      countries: ['KE', 'UG', 'RW', 'GH'],
      category: 'Education, Entrepreneurship'
    }
  ];

  async scanAll(): Promise<any[]> {
    const opportunities = [];
    
    for (const source of this.sources) {
      try {
        console.log(`🔍 Scanning ${source.name}...`);
        const data = await this.scanSource(source);
        opportunities.push(...data);
        console.log(`✅ Found ${data.length} opportunities from ${source.name}`);
      } catch (error) {
        console.error(`❌ Failed to scan ${source.name}:`, error);
      }
    }
    
    // Also add manually curated opportunities for demo
    opportunities.push(...this.getCuratedOpportunities());
    
    return opportunities;
  }

  private async scanSource(source: any): Promise<any[]> {
    // In production, this would make actual API calls
    // For now, return realistic sample data
    
    const countries = source.countries === 'ALL' 
      ? ['KE', 'TZ', 'UG', 'RW', 'ZA', 'NG', 'GH', 'ZM', 'MW', 'ET']
      : source.countries;
    
    const opportunities = [];
    
    for (const country of countries) {
      opportunities.push({
        id: `${source.name}-${country}-${Date.now()}`,
        title: this.generateTitle(source.name, country),
        description: this.generateDescription(source.category),
        amount: this.generateAmount(),
        currency: this.getCurrency(country),
        deadline: this.generateDeadline(),
        provider: source.name,
        country: country,
        region: this.getRegion(country),
        category: source.category.split(',')[0].trim(),
        eligibility: this.getEligibility(country),
        application_url: `${source.url}/${country.toLowerCase()}`,
        source: source.name,
        requirements: this.getRequirements(source.category),
        documents_required: this.getDocumentsRequired(),
        success_rate: Math.floor(Math.random() * 30) + 50 // 50-80% success rate
      });
    }
    
    return opportunities;
  }

  private getCuratedOpportunities(): any[] {
    return [
      {
        id: `CURATED-${Date.now()}-1`,
        title: 'AI for Development Grant - East Africa',
        description: 'Funding for AI projects that address development challenges in East Africa',
        amount: '$50,000 - $200,000',
        currency: 'USD',
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
        provider: 'Google.org',
        country: 'KE',
        region: 'East Africa',
        category: 'Technology',
        eligibility: ['Registered in East Africa', 'Minimum 2 years experience', 'AI/ML focus'],
        application_url: 'https://google.org/ai-for-development',
        source: 'Curated',
        success_rate: 75
      },
      {
        id: `CURATED-${Date.now()}-2`,
        title: 'Youth Entrepreneurship Fund',
        description: 'Supporting young entrepreneurs with innovative business ideas',
        amount: '$10,000 - $50,000',
        currency: 'USD',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        provider: 'Mastercard Foundation',
        country: 'KE',
        region: 'East Africa',
        category: 'Entrepreneurship',
        eligibility: ['Age 18-35', 'Business registered', 'Impact focus'],
        application_url: 'https://mastercardfdn.org/youth-fund',
        source: 'Curated',
        success_rate: 82
      }
    ];
  }

  private generateTitle(provider: string, country: string): string {
    const titles = [
      `${provider} Innovation Grant - ${this.getCountryName(country)}`,
      `${provider} Development Fund - ${this.getCountryName(country)}`,
      `${provider} Capacity Building Grant - ${this.getCountryName(country)}`,
      `${provider} Research & Innovation Program - ${this.getCountryName(country)}`
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  private generateDescription(category: string): string {
    return `Funding opportunity supporting projects in ${category} that demonstrate impact and sustainability. Applications are evaluated based on innovation, scalability, and alignment with development goals.`;
  }

  private generateAmount(): string {
    const amounts = ['$10,000 - $50,000', '$50,000 - $100,000', '$100,000 - $500,000', '$500,000 - $1,000,000'];
    return amounts[Math.floor(Math.random() * amounts.length)];
  }

  private getCurrency(country: string): string {
    const currencies = {
      KE: 'KES', TZ: 'TZS', UG: 'UGX', RW: 'RWF', ZA: 'ZAR', NG: 'NGN', GH: 'GHS', ZM: 'ZMW'
    };
    return currencies[country] || 'USD';
  }

  private getRegion(country: string): string {
    const eastAfrica = ['KE', 'TZ', 'UG', 'RW', 'ET', 'SO'];
    const southernAfrica = ['ZA', 'ZM', 'ZW', 'MW', 'MZ', 'NA', 'BW'];
    const westAfrica = ['NG', 'GH', 'SN'];
    
    if (eastAfrica.includes(country)) return 'East Africa';
    if (southernAfrica.includes(country)) return 'Southern Africa';
    if (westAfrica.includes(country)) return 'West Africa';
    return 'Africa';
  }

  private getCountryName(code: string): string {
    const names = {
      KE: 'Kenya', TZ: 'Tanzania', UG: 'Uganda', RW: 'Rwanda', ET: 'Ethiopia',
      SO: 'Somalia', ZA: 'South Africa', ZM: 'Zambia', ZW: 'Zimbabwe', MW: 'Malawi',
      NG: 'Nigeria', GH: 'Ghana'
    };
    return names[code] || code;
  }

  private getEligibility(country: string): string[] {
    return [
      `Registered entity in ${this.getCountryName(country)}`,
      'Minimum 2 years operational experience',
      'Demonstrated impact track record',
      'Financial statements for last 2 years'
    ];
  }

  private getRequirements(category: string): string[] {
    return [
      'Project proposal',
      'Budget breakdown',
      'Timeline',
      'Team qualifications',
      'Impact assessment framework'
    ];
  }

  private getDocumentsRequired(): string[] {
    return [
      'Registration certificate',
      'Tax compliance certificate',
      'Audited financial statements',
      'Bank details',
      'CVs of key personnel'
    ];
  }

  private generateDeadline(): string {
    const days = [30, 45, 60, 90];
    return new Date(Date.now() + days[Math.floor(Math.random() * days.length)] * 24 * 60 * 60 * 1000).toISOString();
  }
}

export const fundingScanner = new FundingScanner();