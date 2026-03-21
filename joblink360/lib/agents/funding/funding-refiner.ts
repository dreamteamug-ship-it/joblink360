// lib/agents/funding/funding-refiner.ts
import { supabase } from '@/lib/supabase/client';

export class FundingRefiner {
  
  async refineOpportunities(opportunities: any[]): Promise<any[]> {
    const refined = [];
    
    for (const opp of opportunities) {
      // Remove duplicates
      const unique = await this.removeDuplicates(opp, opportunities);
      if (!unique) continue;
      
      // Validate data
      const validated = await this.validateData(opp);
      if (!validated) continue;
      
      // Standardize format
      const standardized = await this.standardizeFormat(opp);
      
      // Add metadata
      const withMetadata = await this.addMetadata(standardized);
      
      refined.push(withMetadata);
    }
    
    return refined;
  }

  private async removeDuplicates(opportunity: any, allOpportunities: any[]): Promise<boolean> {
    const duplicates = allOpportunities.filter(o => 
      o.title === opportunity.title && 
      o.provider === opportunity.provider &&
      Math.abs(new Date(o.deadline).getTime() - new Date(opportunity.deadline).getTime()) < 24 * 60 * 60 * 1000
    );
    return duplicates[0] === opportunity;
  }

  private async validateData(opportunity: any): Promise<boolean> {
    const required = ['title', 'provider', 'deadline', 'amount', 'country'];
    for (const field of required) {
      if (!opportunity[field]) return false;
    }
    return true;
  }

  private async standardizeFormat(opportunity: any): Promise<any> {
    return {
      id: opportunity.id,
      title: opportunity.title.trim(),
      description: opportunity.description?.trim() || '',
      amount_min: this.parseAmount(opportunity.amount, 'min'),
      amount_max: this.parseAmount(opportunity.amount, 'max'),
      amount_display: opportunity.amount,
      currency: opportunity.currency,
      deadline: new Date(opportunity.deadline).toISOString(),
      provider: opportunity.provider.trim(),
      country: opportunity.country,
      region: opportunity.region,
      category: opportunity.category,
      eligibility: opportunity.eligibility || [],
      application_url: opportunity.application_url,
      source: opportunity.source,
      requirements: opportunity.requirements || [],
      documents_required: opportunity.documents_required || [],
      success_rate: opportunity.success_rate || 0,
      score: opportunity.score || 0
    };
  }

  private parseAmount(amount: string, type: 'min' | 'max'): number {
    const numbers = amount.match(/\d[\d,]*/g);
    if (!numbers) return 0;
    const parsed = numbers.map(n => parseInt(n.replace(/,/g, '')));
    return type === 'min' ? Math.min(...parsed) : Math.max(...parsed);
  }

  private async addMetadata(opportunity: any): Promise<any> {
    return {
      ...opportunity,
      metadata: {
        processed_at: new Date().toISOString(),
        version: '1.0',
        confidence: this.calculateConfidence(opportunity),
        tags: this.generateTags(opportunity)
      }
    };
  }

  private calculateConfidence(opportunity: any): number {
    let confidence = 80;
    if (!opportunity.description) confidence -= 20;
    if (!opportunity.requirements.length) confidence -= 10;
    if (!opportunity.documents_required.length) confidence -= 10;
    if (opportunity.source === 'Curated') confidence += 10;
    return Math.min(100, Math.max(0, confidence));
  }

  private generateTags(opportunity: any): string[] {
    const tags = [];
    if (opportunity.amount_max > 500000) tags.push('high-value');
    if (opportunity.category.includes('Technology')) tags.push('tech');
    if (opportunity.category.includes('Education')) tags.push('education');
    if (opportunity.category.includes('Health')) tags.push('health');
    if (opportunity.success_rate > 70) tags.push('high-success-rate');
    return tags;
  }
}

export class FundingRater {
  
  async rateOpportunity(opportunity: any): Promise<any> {
    const rating = {
      overall: 0,
      criteria: {
        value: 0,
        urgency: 0,
        accessibility: 0,
        relevance: 0,
        probability: 0
      },
      recommendation: ''
    };
    
    // Value rating (amount)
    if (opportunity.amount_max >= 500000) rating.criteria.value = 100;
    else if (opportunity.amount_max >= 200000) rating.criteria.value = 80;
    else if (opportunity.amount_max >= 50000) rating.criteria.value = 60;
    else rating.criteria.value = 40;
    
    // Urgency rating (deadline)
    const daysLeft = Math.ceil((new Date(opportunity.deadline) - new Date()) / (1000 * 60 * 60 * 24));
    if (daysLeft <= 14) rating.criteria.urgency = 100;
    else if (daysLeft <= 30) rating.criteria.urgency = 80;
    else if (daysLeft <= 60) rating.criteria.urgency = 60;
    else rating.criteria.urgency = 40;
    
    // Accessibility rating (eligibility)
    rating.criteria.accessibility = opportunity.eligibility.length <= 3 ? 80 : 60;
    
    // Relevance rating
    rating.criteria.relevance = opportunity.score?.total || 50;
    
    // Probability rating
    rating.criteria.probability = opportunity.success_rate || 50;
    
    // Calculate overall
    rating.overall = Math.round(
      (rating.criteria.value * 0.25) +
      (rating.criteria.urgency * 0.2) +
      (rating.criteria.accessibility * 0.15) +
      (rating.criteria.relevance * 0.2) +
      (rating.criteria.probability * 0.2)
    );
    
    // Generate recommendation
    if (rating.overall >= 80) rating.recommendation = 'High priority - Strong match. Apply immediately.';
    else if (rating.overall >= 60) rating.recommendation = 'Good opportunity. Worth pursuing with strong application.';
    else if (rating.overall >= 40) rating.recommendation = 'Moderate opportunity. Consider if resources allow.';
    else rating.recommendation = 'Low priority. Focus on better-aligned opportunities.';
    
    return rating;
  }
}

export const fundingRefiner = new FundingRefiner();
export const fundingRater = new FundingRater();