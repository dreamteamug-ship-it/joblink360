import { NextResponse } from 'next/server';

// Sample job data
const jobs = [
  {
    id: 1,
    title: 'Senior Software Engineer',
    company: 'TechCorp Kenya',
    location: 'Nairobi',
    type: 'Full-time',
    salary: 'KES 250k - 350k',
    posted: '2 days ago',
    description: 'We are looking for a senior software engineer to lead our development team...'
  },
  {
    id: 2,
    title: 'AI/ML Specialist',
    company: 'Innovate Africa',
    location: 'Remote',
    type: 'Contract',
    salary: 'KES 300k - 400k',
    posted: '1 day ago',
    description: 'Join our AI team to develop cutting-edge machine learning solutions...'
  },
  {
    id: 3,
    title: 'Product Manager',
    company: 'FinTech Solutions',
    location: 'Nairobi',
    type: 'Full-time',
    salary: 'KES 200k - 280k',
    posted: '3 days ago',
    description: 'Lead product development for our mobile banking platform...'
  },
  {
    id: 4,
    title: 'UX/UI Designer',
    company: 'Creative Labs',
    location: 'Mombasa',
    type: 'Full-time',
    salary: 'KES 150k - 200k',
    posted: '5 days ago',
    description: 'Design beautiful and intuitive interfaces for our clients...'
  },
  {
    id: 5,
    title: 'Data Analyst',
    company: 'Analytics Kenya',
    location: 'Kisumu',
    type: 'Internship',
    salary: 'KES 50k - 70k',
    posted: '1 week ago',
    description: 'Great opportunity for recent graduates to start their career in data...'
  }
];

export async function GET(request: Request) {
  // Get query parameters for filtering
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  const location = searchParams.get('location')?.toLowerCase() || '';
  const type = searchParams.get('type')?.toLowerCase() || '';

  // Filter jobs based on query parameters
  let filteredJobs = [...jobs];

  if (query) {
    filteredJobs = filteredJobs.filter(job => 
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query)
    );
  }

  if (location) {
    filteredJobs = filteredJobs.filter(job => 
      job.location.toLowerCase().includes(location)
    );
  }

  if (type) {
    filteredJobs = filteredJobs.filter(job => 
      job.type.toLowerCase().includes(type)
    );
  }

  return NextResponse.json({
    jobs: filteredJobs,
    total: filteredJobs.length,
    page: 1,
    pageSize: 10
  });
}

// Also handle POST for job applications
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Here you would save the application to a database
    console.log('Job application received:', body);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully',
      applicationId: 'APP-' + Date.now()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
