// lib/scrapers/job-scraper.ts
export class JobScraper {
  private sources = [
    'linkedin',
    'remoteok',
    'upwork',
    'africa-jobs',
    'brighter-monday'
  ];

  async scanJobs(filters: any = {}): Promise<any[]> {
    console.log(`Scanning ${this.sources.length} job sources...`);
    
    // Simulate scraping different sources
    const jobs = [];
    
    for (const source of this.sources) {
      const sourceJobs = await this.scrapeSource(source, filters);
      jobs.push(...sourceJobs);
    }
    
    return jobs;
  }

  private async scrapeSource(source: string, filters: any): Promise<any[]> {
    // Mock job data for each source
    const mockJobs = {
      linkedin: [
        {
          id: `li_${Date.now()}_1`,
          title: 'Senior AI Developer',
          company: 'Safaricom',
          location: 'Nairobi',
          salary: { min: 350000, max: 500000, currency: 'KES' },
          type: 'full-time',
          skills: ['Python', 'TensorFlow', 'NLP'],
          description: 'Lead AI development for mobile money...',
          posted: new Date().toISOString()
        },
        {
          id: `li_${Date.now()}_2`,
          title: 'Data Labeling Specialist',
          company: 'iHub',
          location: 'Remote',
          salary: { min: 80000, max: 120000, currency: 'KES' },
          type: 'contract',
          skills: ['Annotation', 'Quality Control'],
          description: 'Label training data for African languages...',
          posted: new Date().toISOString()
        }
      ],
      remoteok: [
        {
          id: `ro_${Date.now()}_1`,
          title: 'Remote React Developer',
          company: 'African Tech',
          location: 'Remote',
          salary: { min: 200000, max: 300000, currency: 'KES' },
          type: 'full-time',
          skills: ['React', 'TypeScript', 'Node.js'],
          description: 'Build platforms for African markets...',
          posted: new Date().toISOString()
        }
      ],
      upwork: [
        {
          id: `up_${Date.now()}_1`,
          title: 'Swahili Translator for AI',
          company: 'AI Training Co',
          location: 'Remote',
          salary: { min: 50000, max: 80000, currency: 'KES' },
          type: 'freelance',
          skills: ['Swahili', 'English', 'Translation'],
          description: 'Translate training materials to Swahili...',
          posted: new Date().toISOString()
        }
      ],
      'africa-jobs': [
        {
          id: `af_${Date.now()}_1`,
          title: 'IT Project Manager',
          company: 'Equity Bank',
          location: 'Nairobi',
          salary: { min: 400000, max: 600000, currency: 'KES' },
          type: 'full-time',
          skills: ['Project Management', 'Agile', 'Banking'],
          description: 'Lead digital transformation projects...',
          posted: new Date().toISOString()
        }
      ],
      'brighter-monday': [
        {
          id: `bm_${Date.now()}_1`,
          title: 'Digital Marketer',
          company: 'M-KOPA',
          location: 'Nairobi',
          salary: { min: 150000, max: 250000, currency: 'KES' },
          type: 'full-time',
          skills: ['Digital Marketing', 'SEO', 'Social Media'],
          description: 'Drive user acquisition for fintech...',
          posted: new Date().toISOString()
        }
      ]
    };

    return mockJobs[source] || [];
  }

  async matchJobs(userSkills: string[], jobs: any[]): Promise<any[]> {
    return jobs.map(job => {
      const matchScore = this.calculateMatch(userSkills, job.skills);
      return {
        ...job,
        matchScore,
        matchReasons: this.generateMatchReasons(matchScore, job)
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }

  private calculateMatch(userSkills: string[], jobSkills: string[]): number {
    if (!jobSkills.length) return 50;
    const matches = jobSkills.filter(skill => 
      userSkills.some(us => us.toLowerCase().includes(skill.toLowerCase()))
    );
    return Math.min(100, Math.round((matches.length / jobSkills.length) * 100));
  }

  private generateMatchReasons(score: number, job: any): string[] {
    const reasons = [];
    if (score > 80) reasons.push('Excellent skill match');
    if (job.location === 'Remote') reasons.push('Remote position available');
    if (score > 60) reasons.push('Good career progression opportunity');
    return reasons;
  }
}

export const jobScraper = new JobScraper();
