// app/api/finance/route.ts
import { NextResponse } from 'next/server';
import { financeService } from '@/lib/finance/services/finance-service';

export async function GET() {
  try {
    const snapshot = await financeService.getFinancialSnapshot();
    return NextResponse.json(snapshot);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch financial data' }, { status: 500 });
  }
}