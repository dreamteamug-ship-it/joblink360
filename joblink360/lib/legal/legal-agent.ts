// lib/legal/legal-agent.ts
import { supabase } from '@/lib/supabase/client';
import { CountryTaxConfig } from './country-tax';

export class LegalAgent {
  private openRouterKey: string;
  
  constructor() {
    this.openRouterKey = process.env.OPENROUTER_API_KEY || '';
  }

  async generateEmploymentContract(params: any): Promise<any> {
    const { worker_id, employer_id, job_id, country_code, salary, currency } = params;
    
    // Get country-specific legal requirements
    const countryLaw = await this.getCountryLaws(country_code);
    const taxConfig = CountryTaxConfig[country_code];
    
    // Generate contract using AI
    const contract = await this.aiGenerateContract({
      worker: await this.getWorkerDetails(worker_id),
      employer: await this.getEmployerDetails(employer_id),
      job: await this.getJobDetails(job_id),
      country: country_code,
      laws: countryLaw,
      salary: salary,
      currency: currency,
      taxConfig: taxConfig,
      agencyFee: this.calculateAgencyFee(salary, 'standard')
    });
    
    // Store contract
    const { data, error } = await supabase
      .from('legal_contracts')
      .insert([{
        contract_id: `CON-${Date.now()}-${worker_id}`,
        worker_id,
        employer_id,
        job_id,
        country_code,
        contract_text: contract.text,
        terms: contract.terms,
      }])
      .select();
    
    return { success: true, contract: data[0], pdfUrl: contract.pdfUrl };
  }

  private async getCountryLaws(countryCode: string): Promise<any> {
    const laws = {
      KE: {
        labor_law: 'Employment Act 2007',
        minimum_wage: 15000, // KES
        tax_rate: 0.3,
        social_security: 0.06,
        health_insurance: 0.025,
        leave_days: 21,
        termination_notice: 30,
        regulations: ['NHIF', 'NSSF', 'PAYE']
      },
      TZ: {
        labor_law: 'Employment and Labour Relations Act 2004',
        minimum_wage: 100000, // TZS
        tax_rate: 0.3,
        social_security: 0.1,
        health_insurance: 0.03,
        leave_days: 28,
        termination_notice: 28
      },
      UG: {
        labor_law: 'Employment Act 2006',
        minimum_wage: 130000, // UGX
        tax_rate: 0.3,
        social_security: 0.1,
        health_insurance: 0.04,
        leave_days: 21,
        termination_notice: 30
      },
      ZA: {
        labor_law: 'Basic Conditions of Employment Act',
        minimum_wage: 23.19, // ZAR per hour
        tax_rate: 0.45,
        social_security: 0.02,
        health_insurance: 0.08,
        leave_days: 21,
        termination_notice: 28,
        regulations: ['UIF', 'SARS', 'COIDA']
      },
      NG: {
        labor_law: 'Labour Act Cap L1 LFN 2004',
        minimum_wage: 30000, // NGN
        tax_rate: 0.24,
        social_security: 0.1,
        health_insurance: 0.05,
        leave_days: 12,
        termination_notice: 30,
        regulations: ['NSITF', 'PENCOM', 'NHIS']
      }
    };
    
    return laws[countryCode] || laws.KE;
  }

  private async aiGenerateContract(data: any): Promise<any> {
    const prompt = `Generate a legally binding employment contract for JobLink 360 between:
    
Worker: ${JSON.stringify(data.worker)}
Employer: ${JSON.stringify(data.employer)}
Job: ${JSON.stringify(data.job)}
Country: ${data.country}
Local Laws: ${JSON.stringify(data.laws)}
Salary: ${data.salary} ${data.currency}
Agency Fee: ${data.agencyFee} (15-30% margin)

Requirements:
1. Include all legal requirements for ${data.country}
2. Specify tax deductions (${data.taxConfig?.tax_rate * 100}%)
3. Include social security contributions
4. Outline agency fee structure
5. Include termination clauses
6. Specify payment terms
7. Include dispute resolution
8. Make it watertight and compliant

Generate a complete contract with:
- Contract text (full legal document)
- Terms summary
- Payment schedule
- Agency fee breakdown
- Tax calculation`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.openRouterKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 4096
      })
    });
    
    const aiResponse = await response.json();
    return {
      text: aiResponse.choices[0].message.content,
      terms: this.extractTerms(aiResponse.choices[0].message.content),
      pdfUrl: await this.generatePDF(aiResponse.choices[0].message.content)
    };
  }

  private calculateAgencyFee(salary: number, tier: string): number {
    const rates = {
      standard: 0.15,   // 15% for standard placements
      premium: 0.20,    // 20% for premium positions
      executive: 0.25,  // 25% for executive search
      international: 0.30 // 30% for international placements
    };
    return salary * rates[tier];
  }

  private extractTerms(contractText: string): any {
    // Extract key terms for summary
    return {
      effective_date: new Date().toISOString(),
      termination_notice: '30 days',
      payment_terms: 'Monthly',
      dispute_resolution: 'Arbitration in Nairobi'
    };
  }

  private async generatePDF(content: string): Promise<string> {
    // Generate PDF via API
    const response = await fetch('/api/pdf/generate', {
      method: 'POST',
      body: JSON.stringify({ content, type: 'contract' })
    });
    const data = await response.json();
    return data.pdfUrl;
  }

  private async getWorkerDetails(workerId: string): Promise<any> {
    const { data } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', workerId)
      .single();
    return data;
  }

  private async getEmployerDetails(employerId: string): Promise<any> {
    const { data } = await supabase
      .from('employers')
      .select('*')
      .eq('id', employerId)
      .single();
    return data;
  }

  private async getJobDetails(jobId: string): Promise<any> {
    const { data } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .single();
    return data;
  }
}

export const legalAgent = new LegalAgent();