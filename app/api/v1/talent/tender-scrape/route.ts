// app/api/v1/talent/tender-scrape/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const tenders = [
      {
        id: 'TND-001',
        title: 'AI Training for East African Youth',
        source: 'Mastercard Foundation',
        value: 2500000,
        currency: 'USD',
        deadline: '2026-05-30',
        matchScore: 94,
        requirements: ['AI Certification', 'Youth Programs', 'Job Placement']
      },
      {
        id: 'TND-002',
        title: 'Climate-Smart Agriculture Extension',
        source: 'World Bank',
        value: 1800000,
        currency: 'USD',
        deadline: '2026-06-15',
        matchScore: 87,
        requirements: ['AgTech', 'Farmer Training', 'Sustainability']
      }
    ];

    return NextResponse.json({ success: true, tenders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to scrape tenders' }, { status: 500 });
  }
}