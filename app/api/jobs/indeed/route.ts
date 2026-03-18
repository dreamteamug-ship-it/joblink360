// app/api/jobs/indeed/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q') || 'developer';
  const location = searchParams.get('location') || 'Kenya';
  
  try {
    const response = await fetch(
      `https://indeed-jobs-api.p.rapidapi.com/indeed-${encodeURIComponent(query)}-jobs`,
      {
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || 'f37a5cd52amshc8fd70928a4d9d7p12af38jsn9a8f5a5e9e5f',
          'X-RapidAPI-Host': 'indeed-jobs-api.p.rapidapi.com'
        }
      }
    );

    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      jobs: data.jobs || [],
      source: 'indeed'
    });

  } catch (error) {
    // Fallback to mock
    return NextResponse.json({
      success: true,
      jobs: getMockIndeedJobs(query, location),
      source: 'mock'
    });
  }
}

function getMockIndeedJobs(query: string, location: string) {
  return [
    {
      title: `Senior ${query}`,
      company: 'Safaricom',
      location: location,
      salary: 'KES 350k - 500k',
      description: 'Lead development team...',
      posted: '2d ago'
    },
    {
      title: `${query} Specialist`,
      company: 'M-KOPA',
      location: location,
      salary: 'KES 280k - 420k',
      description: 'Build innovative solutions...',
      posted: '3d ago'
    }
  ];
}
