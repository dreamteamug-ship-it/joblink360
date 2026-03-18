// app/api/jobs/linkedin/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get('q') || 'software developer';
  const location = searchParams.get('location') || 'Kenya';
  
  try {
    // Using RapidAPI LinkedIn Jobs API (free tier available)
    const response = await fetch(
      `https://linkedin-jobs-scraper-api.p.rapidapi.com/jobs?` +
      `search=${encodeURIComponent(keyword)}&` +
      `location=${encodeURIComponent(location)}`,
      {
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || 'f37a5cd52amshc8fd70928a4d9d7p12af38jsn9a8f5a5e9e5f',
          'X-RapidAPI-Host': 'linkedin-jobs-scraper-api.p.rapidapi.com'
        }
      }
    );

    if (!response.ok) {
      // Fallback to mock data if API fails
      return NextResponse.json({
        success: true,
        jobs: getMockJobs(keyword, location),
        source: 'mock'
      });
    }

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      jobs: data.jobs || [],
      source: 'linkedin'
    });

  } catch (error) {
    // Return mock data on error
    return NextResponse.json({
      success: true,
      jobs: getMockJobs(keyword, location),
      source: 'mock-fallback'
    });
  }
}

function getMockJobs(keyword: string, location: string) {
  return [
    {
      id: '1',
      title: `Senior ${keyword}`,
      company: 'Safaricom',
      location: location,
      salary: 'KES 350,000 - 500,000',
      description: 'Leading mobile money platform seeking experienced professional',
      postedDate: '2 days ago',
      applyUrl: 'https://safaricom.com/careers',
      match: 94
    },
    {
      id: '2',
      title: `${keyword} Specialist`,
      company: 'M-KOPA',
      location: location,
      salary: 'KES 280,000 - 420,000',
      description: 'Fintech company looking for talented individual',
      postedDate: '3 days ago',
      applyUrl: 'https://m-kopa.com/careers',
      match: 87
    },
    {
      id: '3',
      title: `Junior ${keyword}`,
      company: 'iHub',
      location: location,
      salary: 'KES 150,000 - 250,000',
      description: 'Tech hub seeking entry-level talent',
      postedDate: '1 week ago',
      applyUrl: 'https://ihub.co.ke/careers',
      match: 82
    }
  ];
}
