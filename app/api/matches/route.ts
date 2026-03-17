import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Mock combined matches
    const matches = {
      jobs: [
        { id: 'job_1', title: 'Senior Developer', match: 94, type: 'job' },
        { id: 'job_2', title: 'Product Manager', match: 87, type: 'job' },
      ],
      tenders: [
        { id: 'tender_1', title: 'IT Services Tender', match: 92, type: 'tender' },
        { id: 'tender_2', title: 'Supply Contract', match: 78, type: 'tender' },
      ],
      funding: [
        { id: 'fund_1', name: 'Business Grant', match: 88, type: 'funding' },
        { id: 'fund_2', name: 'Equipment Loan', match: 76, type: 'funding' },
      ]
    };

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      total_matches: matches.jobs.length + matches.tenders.length + matches.funding.length,
      matches: matches,
      summary: {
        jobs: matches.jobs.length,
        tenders: matches.tenders.length,
        funding: matches.funding.length
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to get matches' },
      { status: 500 }
    );
  }
}
