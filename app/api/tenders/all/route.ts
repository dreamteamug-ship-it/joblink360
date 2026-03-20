export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const country = searchParams.get('country') || 'KE';
  
  // Mock tender data for now - replace with real sources later
  const tenders = [
    {
      id: 1,
      title: 'Medical Equipment Supply',
      organization: 'Ministry of Health',
      country: 'Kenya',
      countryCode: 'KE',
      value: 'KES 50M',
      currency: 'KES',
      deadline: '2026-04-15',
      category: 'health',
      postedDate: '2026-03-01'
    },
    {
      id: 2,
      title: 'Road Construction',
      organization: 'KURA',
      country: 'Kenya',
      countryCode: 'KE',
      value: 'KES 120M',
      currency: 'KES',
      deadline: '2026-05-20',
      category: 'infrastructure',
      postedDate: '2026-03-10'
    }
  ];

  // Filter by country
  const filtered = tenders.filter(t => t.countryCode === country);

  return NextResponse.json({
    success: true,
    total: filtered.length,
    tenders: filtered,
    country
  });
}
