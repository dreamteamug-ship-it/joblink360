// lib/agents/funding/funding-processor.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from '@/lib/supabase/client';

export class FundingProcessor {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENROUTER_API_KEY;
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async processOpportunity(opportunity: any): Promise<any> {
    // Step 1: Enrich with AI
    const enriched = await this.enrichWithAI(opportunity);
    
    // Step 2: Extract key information
    const extracted = await this.extractKeyInfo(enriched);
    
    // Step 3: Score opportunity
    const scored = await this.scoreOpportunity(extracted);
    
    // Step 4: Categorize
    const categorized = await this.categorizeOpportunity(scored);
    
    // Step 5: Generate summary
    const summary = await this.generateSummary(categorized);
    
    return {
      ...opportunity,
      enriched_data: enriched,
      extracted_info: extracted,
      score: scored,
      category: categorized,
      summary: summary,
      processed_at: new Date().toISOString()
    };
  }

  private async enrichWithAI(opportunity: any): Promise<any> {
    const prompt = `Enrich this funding opportunity with additional context:
    
Title: ${opportunity.title}
Provider: ${opportunity.provider}
Country: ${opportunity.country}
Amount: ${opportunity.amount}
Category: ${opportunity.category}

Provide:
1. Historical success rate for similar grants
2. Key decision factors
3. Common pitfalls
4. Tips for application success
5. Similar past winners

Return as JSON.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text()) || {};
    } catch (error) {
      return {
        success_rate: opportunity.success_rate || 65,
        tips: ['Highlight impact', 'Show sustainability', 'Clear budget justification']
      };
    }
  }

  private async extractKeyInfo(opportunity: any): Promise<any> {
    return {
      deadline: opportunity.deadline,
      amount_range: opportunity.amount,
      min_amount: parseInt(opportunity.amount.split('-')[0]?.replace(/[^0-9]/g, '') || '10000'),
      max_amount: parseInt(opportunity.amount.split('-')[1]?.replace(/[^0-9]/g, '') || '50000'),
      currency: opportunity.currency,
      eligibility: opportunity.eligibility,
      documents_needed: opportunity.documents_required || []
    };
  }

  private async scoreOpportunity(opportunity: any): Promise<any> {
    // Calculate score based on multiple factors
    let score = 0;
    
    // Provider reputation (0-20)
    const providerScores = {
      'World Bank': 20,
      'African Development Bank': 19,
      'Gates Foundation': 20,
      'Mastercard Foundation': 18,
      'USAID': 17,
      'EU Grants': 18,
      'Google.org': 19
    };
    score += providerScores[opportunity.provider] || 15;
    
    // Amount score (0-20)
    const maxAmount = opportunity.extracted_info?.max_amount || 500000;
    if (maxAmount >= 500000) score += 20;
    else if (maxAmount >= 200000) score += 15;
    else if (maxAmount >= 50000) score += 10;
    else score += 5;
    
    // Deadline urgency (0-20)
    const daysUntilDeadline = Math.ceil((new Date(opportunity.deadline) - new Date()) / (1000 * 60 * 60 * 24));
    if (daysUntilDeadline > 60) score += 5;
    else if (daysUntilDeadline > 30) score += 15;
    else if (daysUntilDeadline > 14) score += 20;
    else score += 10;
    
    // Category alignment (0-20)
    const highValueCategories = ['Technology', 'AI', 'Digital', 'Innovation'];
    if (highValueCategories.some(cat => opportunity.category.includes(cat))) score += 20;
    else if (opportunity.category.includes('Education')) score += 15;
    else if (opportunity.category.includes('Health')) score += 15;
    else score += 10;
    
    // Success probability (0-20)
    score += opportunity.success_rate / 5;
    
    return {
      total: Math.min(100, Math.max(0, score)),
      breakdown: {
        provider_reputation: providerScores[opportunity.provider] || 15,
        amount_value: maxAmount >= 500000 ? 20 : maxAmount >= 200000 ? 15 : maxAmount >= 50000 ? 10 : 5,
        deadline_urgency: daysUntilDeadline > 60 ? 5 : daysUntilDeadline > 30 ? 15 : daysUntilDeadline > 14 ? 20 : 10,
        category_alignment: highValueCategories.some(cat => opportunity.category.includes(cat)) ? 20 : opportunity.category.includes('Education') ? 15 : 10,
        success_probability: opportunity.success_rate / 5
      }
    };
  }

  private async categorizeOpportunity(opportunity: any): Promise<any> {
    const categories = ['Technology', 'Education', 'Health', 'Agriculture', 'Infrastructure', 'Entrepreneurship', 'Climate', 'Arts'];
    const mainCategory = categories.find(c => opportunity.category.includes(c)) || 'General';
    
    return {
      primary: mainCategory,
      secondary: opportunity.category,
      difficulty: opportunity.score?.total > 70 ? 'High' : opportunity.score?.total > 50 ? 'Medium' : 'Low',
      priority: opportunity.score?.total > 70 ? 'High' : 'Medium'
    };
  }

  private async generateSummary(categorized: any): Promise<string> {
    return `This ${categorized.difficulty.toLowerCase()} difficulty opportunity in ${categorized.primary} sector has a ${categorized.priority} priority rating. Recommended for organizations with proven track record in similar projects.`;
  }
}

export const fundingProcessor = new FundingProcessor();