export const dynamic = 'force-dynamic';

// app/api/jobs/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || 'software developer';
  const location = searchParams.get('location') || 'Kenya';
  
  try {
    // Fetch from multiple sources in parallel
    const [linkedinRes, remoteRes] = await Promise.allSettled([
      fetch(`${req.nextUrl.origin}/api/jobs/linkedin?q=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`),
      fetch(`${req.nextUrl.origin}/api/jobs/remote?q=${encodeURIComponent(query)}`)
    ]);

    let allJobs: any[] = [];

    // Process LinkedIn results
    if (linkedinRes.status === 'fulfilled') {
      const data = await linkedinRes.value.json();
      allJobs = [...allJobs, ...(data.jobs || [])];
    }

    // Process Remote results
    if (remoteRes.status === 'fulfilled') {
      const data = await remoteRes.value.json();
      allJobs = [...allJobs, ...(data.jobs || [])];
    }

    // Deduplicate by company + title
    const uniqueJobs = Array.from(
      new Map(allJobs.map(job => [`${job.company}-${job.title}`, job])).values()
    );

    return NextResponse.json({
      success: true,
      jobs: uniqueJobs,
      total: uniqueJobs.length,
      sources: {
        linkedin: linkedinRes.status === 'fulfilled',
        remote: remoteRes.status === 'fulfilled'
      }
    });

  } catch (error) {
    console.error('Jobs API error:', error);
    return NextResponse.json({
      success: true,
      jobs: getMockJobs(query, location),
      sources: { mock: true }
    });
  }
}

function getMockJobs(query: string, location: string) {
  return [
    {
      id: '1',
      title: `Senior ${query}`,
      company: 'Safaricom',
      location,
      salary: 'KES 350,000 - 500,000',
      description: 'Lead AI development for mobile money platform',
      postedDate: '2 days ago',
      applyUrl: 'https://safaricom.com/careers',
      match: 94
    },
    {
      id: '2',
      title: `${query} Specialist`,
      company: 'M-KOPA',
      location,
      salary: 'KES 280,000 - 420,000',
      description: 'Build fintech solutions for Africa',
      postedDate: '3 days ago',
      applyUrl: 'https://m-kopa.com/careers',
      match: 87
    },
    {
      id: '3',
      title: `Junior ${query}`,
      company: 'iHub',
      location,
      salary: 'KES 150,000 - 250,000',
      description: 'Entry-level position with great growth potential',
      postedDate: '1 week ago',
      applyUrl: 'https://ihub.co.ke/careers',
      match: 82
    }
  ];
}



