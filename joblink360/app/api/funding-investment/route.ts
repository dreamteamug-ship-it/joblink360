// app/api/funding-investment/route.ts
import { NextResponse } from 'next/server';
import { FUNDING_OPPORTUNITIES } from '@/lib/data/funding-investment/data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'all';
    const sector = searchParams.get('sector') || 'all';
    const stage = searchParams.get('stage') || 'all';
    const minAmount = parseInt(searchParams.get('minAmount') || '0');
    const maxAmount = parseInt(searchParams.get('maxAmount') || '10000000');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10;
    const offset = (page - 1) * limit;
    
    let filtered = [...FUNDING_OPPORTUNITIES];
    
    if (category !== 'all') {
      filtered = filtered.filter(f => f.category === category);
    }
    
    if (sector !== 'all') {
      filtered = filtered.filter(f => f.focus_sectors.includes(sector));
    }
    
    if (stage !== 'all') {
      filtered = filtered.filter(f => f.stage === stage || f.stage === 'any');
    }
    
    filtered = filtered.filter(f => f.amount_max >= minAmount && f.amount_min <= maxAmount);
    
    filtered.sort((a, b) => b.amount_max - a.amount_max);
    
    const total = filtered.length;
    const paginated = filtered.slice(offset, offset + limit);
    
    return NextResponse.json({
      success: true,
      opportunities: paginated,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      filters: {
        category,
        sector,
        stage,
        minAmount,
        maxAmount
      }
    });
    
  } catch (error: any) {
    console.error('Funding API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
