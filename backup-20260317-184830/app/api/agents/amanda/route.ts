// app/api/agents/amanda/route.ts
import { NextResponse } from 'next/server';
import { jobScraper } from '@/lib/scrapers/job-scraper';

export async function POST(request: Request) {
  try {
    const { message, userId, context } = await request.json();
    
    // Mock Amanda's AI responses
    const responses = {
      jobs: async () => {
        const jobs = await jobScraper.scanJobs();
        return `I found ${jobs.length} jobs matching your profile. Top match: ${jobs[0]?.title} at ${jobs[0]?.company}`;
      },
      training: () => {
        return 'Based on your skills, I recommend our "AI Data Labeling" course. It\'s free and takes 40 hours to complete.';
      },
      funding: () => {
        return 'There are 3 active funding opportunities for tech startups. The SME Growth Fund offers up to KES 5M at 12% p.a.';
      },
      career: () => {
        return 'Your profile shows strong potential for AI roles. I suggest focusing on Python and machine learning skills.';
      },
      default: () => {
        return 'I\'m Amanda, your AI career advisor. I can help with job matching, training recommendations, and funding opportunities. What would you like to explore?';
      }
    };
    
    // Simple intent matching
    let response;
    if (message.toLowerCase().includes('job')) {
      response = await responses.jobs();
    } else if (message.toLowerCase().includes('train') || message.toLowerCase().includes('course')) {
      response = responses.training();
    } else if (message.toLowerCase().includes('fund') || message.toLowerCase().includes('money')) {
      response = responses.funding();
    } else if (message.toLowerCase().includes('career')) {
      response = responses.career();
    } else {
      response = responses.default();
    }
    
    return NextResponse.json({
      success: true,
      message: response,
      timestamp: new Date().toISOString(),
      suggestions: [
        'Find me a job',
        'Recommend training',
        'Show funding opportunities',
        'Career advice'
      ]
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
