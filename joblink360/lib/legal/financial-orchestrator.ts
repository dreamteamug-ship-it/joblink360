// lib/legal/financial-orchestrator.ts
import { supabase } from '@/lib/supabase/client';
import { calculateTax, CountryTaxConfig } from './country-tax';
import { legalAgent } from './legal-agent';

export class FinancialOrchestrator {
  
  async processPayment(params: {
    worker_id: string;
    employer_id: string;
    job_id: string;
    amount: number;
    currency: string;
    country_code: string;
    contract_id: string;
  }): Promise<any> {
    const { worker_id, employer_id, job_id, amount, currency, country_code, contract_id } = params;
    
    // Step 1: Calculate agency fee (15-30% based on job tier)
    const agencyFee = await this.calculateAgencyFee(job_id, amount);
    
    // Step 2: Calculate country-specific taxes
    const taxCalculation = calculateTax(country_code, amount);
    
    // Step 3: Calculate worker net pay
    const workerNet = amount - agencyFee - taxCalculation.total_deductions;
    
    // Step 4: Create payment record
    const { data: payment, error } = await supabase
      .from('payments')
      .insert([{
        worker_id,
        employer_id,
        job_id,
        contract_id,
        gross_amount: amount,
        agency_fee: agencyFee,
        tax_amount: taxCalculation.tax,
        social_security: taxCalculation.social_security,
        health_insurance: taxCalculation.health,
        net_amount: workerNet,
        currency,
        country_code,
        status: 'pending',
        created_at: new Date().toISOString()
      }])
      .select();
    
    if (error) throw error;
    
    // Step 5: Initiate payment via appropriate gateway
    await this.initiatePayment(payment[0]);
    
    // Step 6: Generate tax receipt
    await this.generateTaxReceipt(payment[0]);
    
    // Step 7: Update Titanium ERP
    await this.updateERP(payment[0]);
    
    return {
      success: true,
      payment: payment[0],
      breakdown: {
        gross: amount,
        agency_fee: agencyFee,
        tax: taxCalculation.tax,
        social_security: taxCalculation.social_security,
        health: taxCalculation.health,
        net_to_worker: workerNet,
        effective_rate: (agencyFee + taxCalculation.total_deductions) / amount
      }
    };
  }
  
  private async calculateAgencyFee(jobId: string, amount: number): Promise<number> {
    // Get job tier
    const { data: job } = await supabase
      .from('jobs')
      .select('tier, category')
      .eq('id', jobId)
      .single();
    
    const rates = {
      'standard': 0.15,
      'premium': 0.20,
      'executive': 0.25,
      'international': 0.30
    };
    
    return amount * (rates[job?.tier] || 0.20);
  }
  
  private async initiatePayment(payment: any): Promise<void> {
    // Route payment based on country and amount
    if (payment.country_code === 'KE' && payment.amount < 500000) {
      await fetch('/api/payments/mpesa', {
        method: 'POST',
        body: JSON.stringify({ payment_id: payment.id })
      });
    } else {
      await fetch('/api/payments/bank-transfer', {
        method: 'POST',
        body: JSON.stringify({ payment_id: payment.id })
      });
    }
  }
  
  private async generateTaxReceipt(payment: any): Promise<void> {
    const receipt = {
      payment_id: payment.id,
      worker_id: payment.worker_id,
      employer_id: payment.employer_id,
      gross: payment.gross_amount,
      tax_paid: payment.tax_amount,
      social_security: payment.social_security,
      health: payment.health_insurance,
      period: new Date().toISOString(),
      country: payment.country_code
    };
    
    await supabase
      .from('tax_receipts')
      .insert([receipt]);
  }
  
  private async updateERP(payment: any): Promise<void> {
    await fetch('/api/titanium-erp/finance/transactions', {
      method: 'POST',
      body: JSON.stringify({
        type: 'payment',
        sub_type: 'worker_payout',
        amount: payment.net_amount,
        fee: payment.agency_fee,
        tax: payment.tax_amount,
        worker_id: payment.worker_id,
        employer_id: payment.employer_id,
        reference: payment.id
      })
    });
  }
  
  async generateFinancialReport(period: { start: Date; end: Date }): Promise<any> {
    const { data: payments } = await supabase
      .from('payments')
      .select('*')
      .gte('created_at', period.start.toISOString())
      .lte('created_at', period.end.toISOString());
    
    const summary = {
      total_gross: payments.reduce((sum, p) => sum + p.gross_amount, 0),
      total_agency_fees: payments.reduce((sum, p) => sum + p.agency_fee, 0),
      total_taxes: payments.reduce((sum, p) => sum + p.tax_amount, 0),
      total_social_security: payments.reduce((sum, p) => sum + p.social_security, 0),
      total_health: payments.reduce((sum, p) => sum + p.health_insurance, 0),
      total_net_to_workers: payments.reduce((sum, p) => sum + p.net_amount, 0),
      by_country: {},
      by_employer: {}
    };
    
    return summary;
  }
}

export const financialOrchestrator = new FinancialOrchestrator();