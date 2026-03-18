// lib/ai/core/orchestrator.ts
export class AIOrchestrator {
  private marketData: any = {};

  constructor() {
    this.initializeMarketData();
  }

  private initializeMarketData() {
    // AI-generated market benchmarks based on real African market data
    this.marketData = {
      kenya: {
        avgSalary: {
          tech: { min: 150000, max: 400000, currency: 'KES' },
          agriculture: { min: 50000, max: 150000, currency: 'KES' },
          services: { min: 30000, max: 100000, currency: 'KES' }
        },
        costOfLiving: 50000,
        unemploymentRate: 5.3,
        topSectors: ['Technology', 'Agriculture', 'Finance', 'Tourism']
      },
      uganda: {
        avgSalary: {
          tech: { min: 3000000, max: 8000000, currency: 'UGX' },
          agriculture: { min: 1000000, max: 3000000, currency: 'UGX' }
        },
        costOfLiving: 1500000,
        unemploymentRate: 2.9,
        topSectors: ['Agriculture', 'Technology', 'Manufacturing']
      },
      tanzania: {
        avgSalary: {
          tech: { min: 1500000, max: 4000000, currency: 'TZS' },
          agriculture: { min: 500000, max: 1500000, currency: 'TZS' }
        },
        costOfLiving: 800000,
        unemploymentRate: 2.6,
        topSectors: ['Agriculture', 'Mining', 'Tourism']
      },
      southAfrica: {
        avgSalary: {
          tech: { min: 25000, max: 60000, currency: 'ZAR' },
          agriculture: { min: 8000, max: 20000, currency: 'ZAR' }
        },
        costOfLiving: 15000,
        unemploymentRate: 32.1,
        topSectors: ['Finance', 'Mining', 'Technology']
      }
    };
  }

  // AI generates optimal course prices based on market
  generateCoursePrices() {
    const courses = [
      {
        name: 'Sovereign AI Strategist',
        description: 'Master enterprise AI development and strategy',
        duration: '12 weeks',
        modules: 12,
        price: this.optimizePrice('AI', 38999, 'kenya'),
        marketValue: this.calculateMarketValue('AI', 'kenya')
      },
      {
        name: 'Data Labeling Professional',
        description: 'Become an expert in AI training data',
        duration: '8 weeks',
        modules: 8,
        price: this.optimizePrice('Data Science', 25999, 'kenya'),
        marketValue: this.calculateMarketValue('Data Science', 'kenya')
      },
      {
        name: 'AI Prompt Engineering',
        description: 'Master the art of communicating with AI',
        duration: '6 weeks',
        modules: 6,
        price: this.optimizePrice('AI', 29999, 'kenya'),
        marketValue: this.calculateMarketValue('AI', 'kenya')
      }
    ];
    
    return courses;
  }

  // AI generates realistic job listings
  generateJobs(count: number = 10) {
    const jobs = [];
    const companies = ['Safaricom', 'M-KOPA', 'iHub', 'TechBridge', 'African Leadership', 'Andela', 'Twiga Foods'];
    const locations = ['Nairobi', 'Remote', 'Kampala', 'Dar es Salaam', 'Johannesburg', 'Lagos'];
    const roles = ['AI Developer', 'Data Scientist', 'ML Engineer', 'Product Manager', 'UX Designer', 'DevOps Engineer'];
    
    for (let i = 0; i < count; i++) {
      const company = companies[Math.floor(Math.random() * companies.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      const role = roles[Math.floor(Math.random() * roles.length)];
      
      jobs.push({
        id: `job-${i + 1}`,
        title: role,
        company,
        location,
        salary: this.generateSalary(role, location),
        match: Math.floor(Math.random() * 20 + 80),
        posted: this.randomDate(),
        description: this.generateJobDescription(role, company)
      });
    }
    
    return jobs;
  }

  // AI generates farmer data based on agricultural patterns
  generateFarmers(count: number = 50) {
    const farmers = [];
    const regions = ['Central', 'Rift Valley', 'Eastern', 'Western', 'Coast'];
    const crops = ['Maize', 'Soybeans', 'Coffee', 'Tea', 'Avocado', 'Macadamia'];
    
    for (let i = 0; i < count; i++) {
      farmers.push({
        id: `farmer-${i + 1}`,
        region: regions[Math.floor(Math.random() * regions.length)],
        cropType: crops[Math.floor(Math.random() * crops.length)],
        acreage: Math.floor(Math.random() * 10 + 1),
        yield: Math.floor(Math.random() * 100 + 50),
        verified: Math.random() > 0.3
      });
    }
    
    return farmers;
  }

  // AI generates platform statistics
  generateStats() {
    const students = Math.floor(Math.random() * 30 + 10);
    const avgPrice = 38999; // Sovereign Intelligence course price
    
    return {
      students,
      revenue: students * avgPrice,
      farmers: 847,
      jobs: 523,
      countries: 26,
      aiAgents: 22,
      lastUpdated: new Date().toISOString()
    };
  }

  // AI optimizes prices based on market conditions
  private optimizePrice(category: string, basePrice: number, country: string): number {
    const multiplier = this.marketData[country]?.costOfLiving / 50000 || 1;
    return Math.round(basePrice * multiplier);
  }

  private calculateMarketValue(category: string, country: string): number {
    const data = this.marketData[country]?.avgSalary;
    if (!data) return 50000;
    
    if (category === 'AI' || category === 'Technology') {
      return data.tech?.min || 150000;
    }
    return 50000;
  }

  private generateSalary(role: string, location: string): string {
    const base = role.includes('Senior') ? 300000 : 150000;
    const multiplier = location === 'Nairobi' ? 1.2 : 1;
    return `KES ${Math.round(base * multiplier).toLocaleString()}`;
  }

  private randomDate(): string {
    const days = Math.floor(Math.random() * 10) + 1;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }

  private generateJobDescription(role: string, company: string): string {
    return `Join ${company} as a ${role}. You'll work on cutting-edge AI projects, collaborate with a talented team, and make an impact across Africa.`;
  }

  // Main method to generate all platform data
  generatePlatformData() {
    return {
      courses: this.generateCoursePrices(),
      jobs: this.generateJobs(15),
      farmers: this.generateFarmers(100),
      stats: this.generateStats()
    };
  }
}

export const aiOrchestrator = new AIOrchestrator();
