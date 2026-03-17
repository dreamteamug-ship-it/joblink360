import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || '';
    
    // Mock tender data
    const tenders = [
      {
        id: 'tender_1',
        title: 'Supply of Medical Equipment',
        organization: 'Ministry of Health',
        location: 'Nairobi',
        deadline: '2026-04-15',
        value: 'KES 50M',
        category: 'Medical',
        description: 'Supply of hospital equipment to county hospitals',
        requirements: ['KRA PIN', 'Tax Compliance'],
        source: 'PPRA',
        match_score: 92,
        posted_date: '2026-03-01'
      },
      {
        id: 'tender_2',
        title: 'Road Construction - Phase 3',
        organization: 'KURA',
        location: 'Mombasa',
        deadline: '2026-05-20',
        value: 'KES 120M',
        category: 'Infrastructure',
        description: 'Construction of 15km road network',
        requirements: ['NCA 1', 'Insurance'],
        source: 'AfDB',
        match_score: 78,
        posted_date: '2026-03-10'
      },
      {
        id: 'tender_3',
        title: 'IT Security Audit',
        organization: 'Central Bank',
        location: 'Nairobi',
        deadline: '2026-04-30',
        value: 'KES 15M',
        category: 'Technology',
        description: 'Security audit of banking systems',
        requirements: ['ISO 27001', 'CISA'],
        source: 'UNGM',
        match_score: 88,
        posted_date: '2026-03-05'
      }
    ];

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      sources: ['PPRA', 'UNGM', 'AfDB', 'World Bank'],
      total_tenders: tenders.length,
      tenders: tenders.map(t => ({
        ...t,
        scanned_at: new Date().toISOString()
      })),
      filters_applied: { category }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to scan tenders' },
      { status: 500 }
    );
  }
}
