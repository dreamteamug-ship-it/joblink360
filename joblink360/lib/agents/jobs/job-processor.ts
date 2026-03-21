// lib/agents/jobs/job-processor.ts
import { supabase } from '@/lib/supabase/client';

export class JobProcessor {
  private openRouterKey: string;
  
  constructor() {
    this.openRouterKey = process.env.OPENROUTER_API_KEY || '';
  }

  async processJobs(jobs: any[]): Promise<any[]> {
    const processed = [];
    
    for (const job of jobs) {
      try {
        const cleaned = this.cleanJobData(job);
        const enriched = await this.enrichWithAI(cleaned);
        const mapped = await this.mapToCourse(enriched);
        const content = this.generateTrainingContent(mapped);
        
        processed.push({
          ...mapped,
          training_content: content,
          processed_at: new Date().toISOString(),
          status: 'ready'
        });
      } catch (error) {
        console.error(`Failed to process job ${job.id}:`, error);
        processed.push({ ...job, status: 'failed', error: error.message });
      }
    }
    
    return processed;
  }

  private cleanJobData(job: any): any {
    return {
      id: job.id,
      title: job.title?.substring(0, 200) || 'Untitled Position',
      company: job.company?.substring(0, 100) || 'Unknown Company',
      location: job.location || 'Remote',
      description: job.description?.substring(0, 2000) || '',
      url: job.url || '',
      posted_date: job.posted_date || new Date().toISOString(),
      source: job.source || 'Unknown',
      category: job.category || 'TECH_SOFTWARE'
    };
  }

  private async enrichWithAI(job: any): Promise<any> {
    if (!this.openRouterKey) return job;
    
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.openRouterKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3.5-sonnet',
          messages: [{
            role: 'user',
            content: `Analyze this job and provide: 1) Key skills needed (5 max), 2) Experience level, 3) Salary range estimate for Africa. Job: ${job.title} - ${job.description.substring(0, 500)}`
          }],
          temperature: 0.5,
          max_tokens: 500
        })
      });
      
      const data = await response.json();
      const analysis = data.choices[0]?.message?.content || '';
      
      return {
        ...job,
        skills_required: this.extractSkillsFromAnalysis(analysis),
        experience_level: this.extractExperienceLevel(analysis),
        salary_estimate: this.extractSalaryEstimate(analysis)
      };
    } catch (error) {
      console.error('AI enrichment failed:', error);
      return job;
    }
  }

  private extractSkillsFromAnalysis(analysis: string): string[] {
    const skills = [];
    const skillKeywords = ['Python', 'JavaScript', 'React', 'Node.js', 'AI', 'ML', 'Data', 'Cloud', 'AWS', 'Docker'];
    for (const skill of skillKeywords) {
      if (analysis.toLowerCase().includes(skill.toLowerCase())) {
        skills.push(skill);
      }
    }
    return skills.slice(0, 5);
  }

  private extractExperienceLevel(analysis: string): string {
    if (analysis.toLowerCase().includes('senior') || analysis.toLowerCase().includes('5+')) return 'Senior';
    if (analysis.toLowerCase().includes('mid') || analysis.toLowerCase().includes('3-5')) return 'Mid-Level';
    if (analysis.toLowerCase().includes('junior') || analysis.toLowerCase().includes('entry')) return 'Junior';
    return 'Not Specified';
  }

  private extractSalaryEstimate(analysis: string): any {
    const patterns = [/\$(\d{2,3}(?:,\d{3})?)\s*-\s*\$(\d{2,3}(?:,\d{3})?)/];
    for (const pattern of patterns) {
      const match = analysis.match(pattern);
      if (match) {
        return { min: parseInt(match[1].replace(/,/g, '')), max: parseInt(match[2].replace(/,/g, '')), currency: 'USD' };
      }
    }
    return { min: 0, max: 0, currency: 'USD' };
  }

  private async mapToCourse(job: any): Promise<any> {
    return {
      ...job,
      matched_courses: this.findMatchingCourses(job.skills_required),
      learning_path: this.generateLearningPath(job.skills_required)
    };
  }

  private findMatchingCourses(skills: string[]): any[] {
    const courses = [
      { id: 1, title: 'AI Engineering', skills: ['Python', 'AI', 'ML'] },
      { id: 2, title: 'Full Stack Development', skills: ['JavaScript', 'React', 'Node.js'] },
      { id: 3, title: 'Cloud Architecture', skills: ['AWS', 'Cloud', 'Docker'] }
    ];
    
    return courses.filter(course => 
      course.skills.some(skill => skills.includes(skill))
    );
  }

  private generateLearningPath(skills: string[]): string[] {
    const path = [];
    if (skills.includes('Python')) path.push('Python Fundamentals');
    if (skills.includes('JavaScript')) path.push('JavaScript Basics');
    if (skills.includes('React')) path.push('React Development');
    if (skills.includes('AI')) path.push('AI Fundamentals');
    return path.slice(0, 3);
  }

  private generateTrainingContent(job: any): any {
    return {
      summary: `Learn to become a ${job.title} with JobLink 360`,
      modules: job.learning_path.map((course, i) => ({
        week: i + 1,
        title: course,
        duration: '2-3 hours/week'
      })),
      certification: `JobLink 360 Certified ${job.title}`,
      income_potential: job.salary_estimate
    };
  }
}

export const jobProcessor = new JobProcessor();