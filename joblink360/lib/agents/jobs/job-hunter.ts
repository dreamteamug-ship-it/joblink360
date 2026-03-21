// lib/agents/jobs/job-hunter.ts
import { supabase } from '@/lib/supabase/client';
import { jobScraper } from '@/lib/scrapers/job-scraper';
import { jobProcessor } from './job-processor';

export class JobHunter {
  private isRunning: boolean = false;
  private lastRun: Date | null = null;
  private intervalId: NodeJS.Timeout | null = null;

  async startHunting(intervalMinutes: number = 60): Promise<void> {
    if (this.isRunning) {
      console.log('Job hunter already running');
      return;
    }
    
    this.isRunning = true;
    console.log('🕵️‍♂️ Job Hunter activated');
    
    await this.hunt();
    
    this.intervalId = setInterval(async () => {
      await this.hunt();
    }, intervalMinutes * 60 * 1000);
  }

  stopHunting(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
  }

  private async hunt(): Promise<void> {
    try {
      console.log(`🔍 Starting job hunt at ${new Date().toISOString()}`);
      
      const rawJobs = await jobScraper.scrapeAllSources();
      console.log(`📥 Scraped ${rawJobs.length} raw jobs`);
      
      const processedJobs = await jobProcessor.processJobs(rawJobs);
      console.log(`⚙️ Processed ${processedJobs.length} jobs`);
      
      await this.saveJobs(processedJobs);
      await this.deployToLMS(processedJobs);
      
      this.lastRun = new Date();
      console.log(`✅ Job hunt complete. ${processedJobs.length} jobs ready`);
    } catch (error) {
      console.error('❌ Job hunt failed:', error);
    }
  }

  private async saveJobs(jobs: any[]): Promise<void> {
    for (const job of jobs) {
      if (job.status === 'failed') continue;
      
      const { error } = await supabase
        .from('jobs')
        .upsert({
          id: job.id,
          title: job.title,
          company: job.company,
          location: job.location,
          description: job.description,
          source: job.source,
          category: job.category,
          skills_required: job.skills_required,
          experience_level: job.experience_level,
          salary_estimate: job.salary_estimate,
          matched_courses: job.matched_courses,
          learning_path: job.learning_path,
          training_content: job.training_content,
          status: 'active',
          created_at: new Date().toISOString()
        }, { onConflict: 'id' });
      
      if (error) console.error('Failed to save job:', error);
    }
  }

  private async deployToLMS(jobs: any[]): Promise<void> {
    for (const job of jobs.slice(0, 10)) {
      if (job.status === 'failed') continue;
      
      try {
        await fetch('/api/lms/courses/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: `Career Track: ${job.title}`,
            description: job.training_content?.summary || `Learn to become a ${job.title}`,
            modules: job.learning_path || [],
            certification: job.training_content?.certification,
            income_potential: job.salary_estimate,
            source_job_id: job.id
          })
        });
      } catch (error) {
        console.error(`Failed to deploy job ${job.id}:`, error);
      }
    }
  }

  getStatus(): any {
    return {
      isRunning: this.isRunning,
      lastRun: this.lastRun,
      interval: this.intervalId ? 'Active' : 'Inactive'
    };
  }
}

export const jobHunter = new JobHunter();