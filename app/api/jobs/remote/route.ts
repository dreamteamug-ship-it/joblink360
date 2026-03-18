// app/api/jobs/remote/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get('q') || 'developer';
  
  try {
    // Use Remotive API (completely free, no key required)
    const response = await fetch(
      `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(keyword)}&limit=20`
    );

    const data = await response.json();
    
    const jobs = data.jobs.map((job: any) => ({
      id: job.id,
      title: job.title,
      company: job.company_name,
      location: 'Remote',
      salary: job.salary || 'Competitive',
      description: job.description,
      postedDate: job.publication_date,
      applyUrl: job.url,
      source: 'remotive'
    }));
    
    return NextResponse.json({
      success: true,
      jobs,
      source: 'remote'
    });

  } catch (error) {
    return NextResponse.json({
      success: true,
      jobs: [],
      source: 'error'
    });
  }
}
