import { NextResponse } from 'next/server';

// Mock job data from various sources
const jobSources = {
  linkedin: [
    { id: 'li_1', title: 'Senior React Developer', company: 'Safaricom', location: 'Nairobi', salary: '350k', type: 'Full-time' },
    { id: 'li_2', title: 'Product Manager', company: 'M-KOPA', location: 'Nairobi', salary: '400k', type: 'Full-time' },
  ],
  remoteok: [
    { id: 'ro_1', title: 'Remote Full Stack Dev', company: 'African Tech', location: 'Remote', salary: '300k', type: 'Remote' },
  ],
  upwork: [
    { id: 'up_1', title: 'Mobile App Developer', company: 'Client', location: 'Contract', salary: '200k', type: 'Contract' },
  ],
  local: [
    { id: 'ke_1', title: 'IT Support Specialist', company: 'Equity Bank', location: 'Kisumu', salary: '150k', type: 'Full-time' },
    { id: 'ke_2', title: 'Data Analyst', company: 'KRA', location: 'Nairobi', salary: '250k', type: 'Full-time' },
  ]
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const skills = searchParams.get('skills')?.split(',') || [];
    const location = searchParams.get('location') || '';
    
    // Simulate scanning different job boards
    const allJobs = [
      ...jobSources.linkedin,
      ...jobSources.remoteok,
      ...jobSources.upwork,
      ...jobSources.local
    ];
    
    // Add scanning metadata
    const scanResult = {
      success: true,
      timestamp: new Date().toISOString(),
      sources: {
        linkedin: { status: 'active', count: jobSources.linkedin.length },
        remoteok: { status: 'active', count: jobSources.remoteok.length },
        upwork: { status: 'active', count: jobSources.upwork.length },
        local: { status: 'active', count: jobSources.local.length }
      },
      total_jobs: allJobs.length,
      jobs: allJobs.map(job => ({
        ...job,
        match_score: Math.floor(Math.random() * 30 + 70), // 70-100% match
        matched_skills: skills.filter(s => 
          job.title.toLowerCase().includes(s.toLowerCase())
        ),
        scanned_at: new Date().toISOString()
      })).sort((a, b) => b.match_score - a.match_score),
      filters_applied: {
        skills: skills,
        location: location
      }
    };
    
    return NextResponse.json(scanResult);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to scan jobs' },
      { status: 500 }
    );
  }
}
