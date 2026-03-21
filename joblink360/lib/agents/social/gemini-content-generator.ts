// lib/agents/social/gemini-content-generator.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiSocialContentGenerator {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY || '';
    if (!apiKey) {
      console.error('❌ GEMINI_API_KEY is missing!');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async generatePost(platform: string, topic: string, contentType: string): Promise<any> {
    try {
      const prompt = this.buildPrompt(platform, topic, contentType);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const content = response.text();
      
      return this.parseContent(content, platform);
    } catch (error) {
      console.error('Gemini generation error:', error);
      return this.getFallbackContent(platform, topic);
    }
  }

  private buildPrompt(platform: string, topic: string, contentType: string): string {
    return `Create engaging social media content for JobLink 360 on ${platform}.

Platform Context:
- ${platform}: ${this.getPlatformContext(platform)}

Content Type: ${contentType}
Topic: ${topic}

Target Audience: African youth (18-35), professionals, career seekers
Brand Voice: Professional, aspirational, African-focused, ultra-luxury

Key Messages:
- AI-powered career development
- 512+ courses across 26 African countries
- Real jobs, real results
- 90-day income guarantee
- Amanda AI career mentor

Generate:
1. Headline (attention-grabbing, max 60 chars)
2. Main Content (150-200 words, engaging, includes CTA)
3. 5 Relevant Hashtags (including #JobLink360)
4. Visual Description (for image/video creation)
5. Suggested Best Time to Post (based on platform)

Make it authentic, engaging, and conversion-focused. Include African context and examples.`;

  }

  private getPlatformContext(platform: string): string {
    const contexts = {
      LinkedIn: 'Professional networking, career development, B2B connections',
      Twitter: 'Real-time updates, industry trends, short-form engagement',
      Instagram: 'Visual storytelling, lifestyle, aspirational content',
      Facebook: 'Community building, longer-form content, groups',
      TikTok: 'Short-form video, trends, viral content, younger audience'
    };
    return contexts[platform] || 'General social media engagement';
  }

  private parseContent(content: string, platform: string): any {
    // Extract sections from Gemini response
    const headlineMatch = content.match(/Headline:?\s*(.+?)(?=\n\n|\n#|$)/is);
    const bodyMatch = content.match(/Main Content:?\s*([\s\S]+?)(?=\n\nHashtags:|$)/i);
    const hashtagMatch = content.match(/Hashtags:?\s*(.+?)(?=\n\nVisual|$)/i);
    const visualMatch = content.match(/Visual Description:?\s*(.+?)(?=\n\nSuggested|$)/i);
    const timeMatch = content.match(/Best Time:?\s*(.+?)(?=\n\n|$)/i);

    return {
      headline: headlineMatch?.[1]?.trim() || `New Opportunity on JobLink 360!`,
      body: bodyMatch?.[1]?.trim() || content.substring(0, 500),
      hashtags: hashtagMatch?.[1]?.split(',').map(t => t.trim()) || ['#JobLink360', '#AfricanTech', '#CareerGrowth'],
      visualPrompt: visualMatch?.[1]?.trim() || 'African professional using AI technology, modern office setting',
      bestTime: timeMatch?.[1]?.trim() || this.getDefaultBestTime(platform),
      platform
    };
  }

  private getDefaultBestTime(platform: string): string {
    const times = {
      LinkedIn: 'Tuesday-Thursday, 8-10am or 12-1pm EAT',
      Twitter: 'Weekdays, 9am-12pm EAT',
      Instagram: 'Monday-Thursday, 11am-2pm EAT',
      Facebook: 'Wednesday-Friday, 1-3pm EAT',
      TikTok: 'Evenings, 6-9pm EAT'
    };
    return times[platform] || 'Weekdays, 10am-2pm EAT';
  }

  private getFallbackContent(platform: string, topic: string): any {
    return {
      headline: `Master ${topic} with JobLink 360`,
      body: `Ready to transform your career? JobLink 360 offers 512+ AI-powered courses across 26 African countries. Start your journey to sovereignty today! #JobLink360 #AfricanTech`,
      hashtags: ['#JobLink360', '#AfricanTech', '#CareerGrowth', '#AIJobs', '#RemoteWork'],
      visualPrompt: 'African professionals in tech hub, modern workspace',
      bestTime: this.getDefaultBestTime(platform),
      platform
    };
  }

  async generateWeeklyBatch(platforms: string[] = ['LinkedIn', 'Twitter', 'Instagram', 'Facebook', 'TikTok']): Promise<any[]> {
    const batch = [];
    const topics = ['AI Careers', 'Remote Work', 'Digital Skills', 'African Success Stories', 'Course Launch'];
    
    for (const platform of platforms) {
      for (let i = 0; i < 7; i++) {
        const topic = topics[Math.floor(Math.random() * topics.length)];
        const contentTypes = ['educational', 'promotional', 'testimonial', 'engagement'];
        const contentType = contentTypes[Math.floor(Math.random() * contentTypes.length)];
        
        const post = await this.generatePost(platform, topic, contentType);
        batch.push({
          ...post,
          scheduled_date: this.getScheduleDate(i),
          status: 'pending_approval',
          generated_by: 'gemini-1.5-flash',
          timestamp: new Date().toISOString()
        });
      }
    }
    
    return batch;
  }

  private getScheduleDate(dayOffset: number): Date {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    date.setHours(9, 0, 0, 0);
    return date;
  }
}

export const geminiSocialGenerator = new GeminiSocialContentGenerator();