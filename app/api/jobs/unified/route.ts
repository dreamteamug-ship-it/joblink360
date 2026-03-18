export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { COUNTRIES } from '@/lib/countries/data';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get('q') || 'developer';
  const location = searchParams.get('location') || 'Remote';
  const country = searchParams.get('country') || 'all';

  const sources = [];

  // Fetch from all job sources in parallel
  const [glassdoor, indeed, upwork, linkedin, remote] = await Promise.allSettled([
    fetch(`${req.nextUrl.origin}/api/jobs/glassdoor/ppr?q=${keyword}&location=${location}`),
    fetch(`${req.nextUrl.origin}/api/jobs/indeed?q=${keyword}&location=${location}`),
    fetch(`${req.nextUrl.origin}/api/jobs/upwork?q=${keyword}`),
    fetch(`${req.nextUrl.origin}/api/jobs/linkedin?q=${keyword}&location=${location}`),
    fetch(`${req.nextUrl.origin}/api/jobs/remote?q=${keyword}`)
  ]);

  let allJobs = [];

  // Process Glassdoor
  if (glassdoor.status === 'fulfilled') {
    const data = await glassdoor.value.json();
    allJobs.push(...(data.jobs || []).map(j => ({ ...j, source: 'glassdoor' })));
    sources.push('glassdoor');
  }

  // Process Indeed
  if (indeed.status === 'fulfilled') {
    const data = await indeed.value.json();
    allJobs.push(...(data.jobs || []).map(j => ({ ...j, source: 'indeed' })));
    sources.push('indeed');
  }

  // Process Upwork
  if (upwork.status === 'fulfilled') {
    const data = await upwork.value.json();
    allJobs.push(...(data.jobs || []).map(j => ({ ...j, source: 'upwork' })));
    sources.push('upwork');
  }

  // Process LinkedIn
  if (linkedin.status === 'fulfilled') {
    const data = await linkedin.value.json();
    allJobs.push(...(data.jobs || []).map(j => ({ ...j, source: 'linkedin' })));
    sources.push('linkedin');
  }

  // Process Remote
  if (remote.status === 'fulfilled') {
    const data = await remote.value.json();
    allJobs.push(...(data.jobs || []).map(j => ({ ...j, source: 'remote' })));
    sources.push('remote');
  }

  // Filter by country if specified
  if (country !== 'all') {
    const countryInfo = COUNTRIES[country];
    allJobs = allJobs.filter(job => 
      job.location?.includes(countryInfo.name) || 
      job.location?.includes(country)
    );
  }

  // Remove duplicates
  const uniqueJobs = Array.from(
    new Map(allJobs.map(job => [`${job.company}-${job.title}`, job])).values()
  );

  return NextResponse.json({
    success: true,
    total: uniqueJobs.length,
    jobs: uniqueJobs,
    sources: sources.reduce((acc, src) => ({ ...acc, [src]: true }), {}),
    country: country
  });
}
