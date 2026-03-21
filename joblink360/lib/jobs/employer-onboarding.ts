// lib/jobs/employer-onboarding.ts
import { supabase } from '@/lib/supabase/client';
import { JobCategories, EmployerTiers, CredibleEmployers } from './categories';

export class EmployerOnboarding {
  
  async onboardEmployer(employerData: any): Promise<any> {
    // Step 1: Verify employer credentials
    const verified = await this.verifyEmployer(employerData);
    if (!verified) {
      return { success: false, message: 'Employer verification failed' };
    }
    
    // Step 2: Assign tier based on employer type
    const tier = this.determineTier(employerData);
    
    // Step 3: Create employer profile
    const { data, error } = await supabase
      .from('employers')
      .insert([{
        name: employerData.name,
        email: employerData.email,
        website: employerData.website,
        category: employerData.category,
        tier: tier,
        verification_status: 'verified',
        onboarded_at: new Date().toISOString()
      }])
      .select();
    
    if (error) throw error;
    
    // Step 4: Notify admin
    await fetch('/api/admin/notify', {
      method: 'POST',
      body: JSON.stringify({
        message: `New employer onboarded: ${employerData.name} (${tier})`,
        type: 'employer_onboarded'
      })
    });
    
    return { success: true, employer: data[0] };
  }
  
  async postJob(jobData: any): Promise<any> {
    // Step 1: Verify employer exists
    const { data: employer } = await supabase
      .from('employers')
      .select('*')
      .eq('id', jobData.employer_id)
      .single();
    
    if (!employer) {
      return { success: false, message: 'Employer not found' };
    }
    
    // Step 2: Create job posting
    const { data, error } = await supabase
      .from('jobs')
      .insert([{
        employer_id: jobData.employer_id,
        title: jobData.title,
        category: jobData.category,
        description: jobData.description,
        requirements: jobData.requirements,
        salary_range: jobData.salary_range,
        location: jobData.location || 'Remote',
        deadline: jobData.deadline,
        posted_at: new Date().toISOString(),
        status: 'active'
      }])
      .select();
    
    if (error) throw error;
    
    // Step 3: Notify qualified candidates
    await this.notifyCandidates(jobData);
    
    return { success: true, job: data[0] };
  }
  
  private async verifyEmployer(employer: any): Promise<boolean> {
    // Check against credible employers list
    const credible = CredibleEmployers.find(e => e.name.toLowerCase() === employer.name.toLowerCase());
    if (credible) return true;
    
    // For new employers, require additional verification
    // In production, this would involve email verification, business registration check, etc.
    return true;
  }
  
  private determineTier(employer: any): string {
    if (employer.category === 'DEV_INGO') return 'NGO';
    if (employer.category === 'GOVERNMENT') return 'GOVERNMENT';
    if (employer.employee_count > 1000) return 'ENTERPRISE';
    return 'PREMIUM';
  }
  
  private async notifyCandidates(job: any): Promise<void> {
    // Find qualified candidates based on skills and training
    const { data: candidates } = await supabase
      .from('user_profiles')
      .select('*')
      .contains('skills', job.requirements);
    
    for (const candidate of candidates || []) {
      await fetch('/api/notifications/send', {
        method: 'POST',
        body: JSON.stringify({
          user_id: candidate.user_id,
          message: `New job opportunity: ${job.title} at ${job.employer_name}`,
          job_id: job.id
        })
      });
    }
  }
}

export const employerOnboarding = new EmployerOnboarding();