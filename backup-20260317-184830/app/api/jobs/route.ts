// app/api/jobs/route.ts
import { NextResponse } from 'next/server';
import { jobScraper } from '@/lib/scrapers/job-scraper';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const skills = searchParams.get('skills')?.split(',') || [];
    const location = searchParams.get('location') || '';
    const type = searchParams.get('type') || '';
    
    // Scan for jobs
    const jobs = await jobScraper.scanJobs({ skills, location, type });
    
    // Match with user skills if provided
    const matchedJobs = skills.length > 0 
      ? await jobScraper.matchJobs(skills, jobs)
      : jobs;
    
    return NextResponse.json({
      success: true,
      total: matchedJobs.length,
      jobs: matchedJobs,
      filters: { skills, location, type },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const job = await request.json();
    
    // Save job to database (mock)
    const savedJob = {
      id: `JOB${Date.now()}`,
      ...job,
      postedAt: new Date().toISOString(),
      status: 'open'
    };
    
    return NextResponse.json({
      success: true,
      job: savedJob,
      message: 'Job posted successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to post job' },
      { status: 500 }
    );
  }
}
