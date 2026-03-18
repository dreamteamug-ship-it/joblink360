import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get('q') || 'developer';
  const location = searchParams.get('location') || 'Remote';
  
  try {
    // Fetch from multiple sources in parallel
    const [glassdoorPPR, allJobs, linkedin] = await Promise.allSettled([
      fetch(`${req.nextUrl.origin}/api/jobs/glassdoor/ppr?q=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`),
      fetch(`${req.nextUrl.origin}/api/jobs/all?q=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`),
      fetch(`${req.nextUrl.origin}/api/jobs/linkedin?q=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`)
    ]);

    let allJobsList = [];
    const sources = [];

    if (glassdoorPPR.status === 'fulfilled') {
      const data = await glassdoorPPR.value.json();
      if (data.jobs) {
        allJobsList.push(...data.jobs);
        sources.push('glassdoor');
      }
    }
    
    if (allJobs.status === 'fulfilled') {
      const data = await allJobs.value.json();
      if (data.jobs) {
        allJobsList.push(...data.jobs);
        sources.push('multi-platform');
      }
    }

    if (linkedin.status === 'fulfilled') {
      const data = await linkedin.value.json();
      if (data.jobs) {
        allJobsList.push(...data.jobs);
        sources.push('linkedin');
      }
    }

    // Remove duplicates by company + title
    const uniqueJobs = Array.from(
      new Map(allJobsList.map(job => [`${job.company}-${job.title}`, job])).values()
    );

    return NextResponse.json({
      success: true,
      total: uniqueJobs.length,
      jobs: uniqueJobs,
      sources: {
        glassdoor: glassdoorPPR.status === 'fulfilled',
        multiPlatform: allJobs.status === 'fulfilled',
        linkedin: linkedin.status === 'fulfilled',
        activeSources: sources
      }
    });
    
  } catch (error) {
    console.error('Unified API error:', error);
    return NextResponse.json({ 
      success: false, 
      jobs: [],
      error: error.message 
    }, { status: 500 });
  }
}
