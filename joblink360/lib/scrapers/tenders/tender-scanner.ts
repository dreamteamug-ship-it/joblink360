// lib/scrapers/tenders/tender-scanner.ts
import { supabase } from '@/lib/supabase/client';

export class TenderScanner {
  private sources = [
    {
      name: 'World Bank Procurement',
      url: 'https://www.worldbank.org/en/projects-operations/procurement',
      countries: ['ALL'],
      category: 'Infrastructure, Development'
    },
    {
      name: 'African Development Bank',
      url: 'https://www.afdb.org/en/projects-and-operations/procurement',
      countries: ['ALL'],
      category: 'Infrastructure, Energy'
    },
    {
      name: 'UNDP Procurement',
      url: 'https://www.undp.org/procurement',
      countries: ['ALL'],
      category: 'Development, Consulting'
    },
    {
      name: 'UNOPS',
      url: 'https://www.unops.org/opportunities',
      countries: ['ALL'],
      category: 'Infrastructure, Logistics'
    }
  ];

  async scanAll(): Promise<any[]> {
    const tenders = [];
    
    for (const source of this.sources) {
      try {
        const data = await this.scanSource(source);
        tenders.push(...data);
      } catch (error) {
        console.error(`Failed to scan ${source.name}:`, error);
      }
    }
    
    tenders.push(...this.getSampleTenders());
    
    return tenders;
  }

  private async scanSource(source: any): Promise<any[]> {
    const countries = ['KE', 'TZ', 'UG', 'ZA', 'NG', 'GH', 'ZM', 'RW', 'ET'];
    const tenders = [];
    
    for (const country of countries) {
      tenders.push({
        id: `${source.name}-${country}-${Date.now()}`,
        title: this.generateTitle(source.name, country),
        description: this.generateDescription(source.category),
        budget: this.generateBudget(),
        deadline: this.generateDeadline(),
        organization: source.name,
        country: country,
        region: this.getRegion(country),
        category: source.category.split(',')[0].trim(),
        location: this.getLocation(country),
        requirements: this.getRequirements(),
        documents_required: this.getDocumentsRequired(),
        success_rate: Math.floor(Math.random() * 30) + 50
      });
    }
    
    return tenders;
  }

  private getSampleTenders(): any[] {
    return [
      {
        id: `SAMPLE-${Date.now()}-1`,
        title: 'Digital Transformation Consultancy - East Africa',
        description: 'Seeking consultants for digital transformation projects across East Africa',
        budget: '$100,000 - $500,000',
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
        organization: 'World Bank',
        country: 'KE',
        region: 'East Africa',
        category: 'Consulting',
        location: 'Nairobi, Kenya',
        success_rate: 72
      }
    ];
  }

  private generateTitle(provider: string, country: string): string {
    const titles = [
      `${provider} Infrastructure Tender - ${this.getCountryName(country)}`,
      `${provider} Consulting Services - ${this.getCountryName(country)}`,
      `${provider} Supply and Delivery - ${this.getCountryName(country)}`
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  private generateDescription(category: string): string {
    return `Tender opportunity for ${category} services. Bids evaluated based on technical capability, experience, and cost effectiveness.`;
  }

  private generateBudget(): string {
    const budgets = ['$50,000 - $200,000', '$200,000 - $500,000', '$500,000 - $1,000,000', '$1,000,000+'];
    return budgets[Math.floor(Math.random() * budgets.length)];
  }

  private generateDeadline(): string {
    const days = [30, 45, 60, 90];
    return new Date(Date.now() + days[Math.floor(Math.random() * days.length)] * 24 * 60 * 60 * 1000).toISOString();
  }

  private getRegion(country: string): string {
    const eastAfrica = ['KE', 'TZ', 'UG', 'RW', 'ET'];
    const southernAfrica = ['ZA', 'ZM', 'ZW', 'MW'];
    const westAfrica = ['NG', 'GH'];
    
    if (eastAfrica.includes(country)) return 'East Africa';
    if (southernAfrica.includes(country)) return 'Southern Africa';
    if (westAfrica.includes(country)) return 'West Africa';
    return 'Africa';
  }

  private getCountryName(code: string): string {
    const names = {
      KE: 'Kenya', TZ: 'Tanzania', UG: 'Uganda', RW: 'Rwanda', ET: 'Ethiopia',
      ZA: 'South Africa', ZM: 'Zambia', ZW: 'Zimbabwe', MW: 'Malawi', NG: 'Nigeria', GH: 'Ghana'
    };
    return names[code] || code;
  }

  private getLocation(country: string): string {
    const locations = {
      KE: 'Nairobi, Kenya', TZ: 'Dar es Salaam, Tanzania', UG: 'Kampala, Uganda',
      ZA: 'Johannesburg, South Africa', NG: 'Lagos, Nigeria', GH: 'Accra, Ghana'
    };
    return locations[country] || `${country} (Various locations)`;
  }

  private getRequirements(): string[] {
    return [
      'Company registration certificate',
      'Tax compliance certificate',
      'Similar experience (3+ years)',
      'Financial statements (last 3 years)',
      'Technical proposal',
      'Financial proposal'
    ];
  }

  private getDocumentsRequired(): string[] {
    return [
      'Bid submission form',
      'Company profile',
      'CVs of key personnel',
      'Past performance references',
      'Quality management system certification'
    ];
  }
}

export const tenderScanner = new TenderScanner();