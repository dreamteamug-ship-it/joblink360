export const dynamic = 'force-dynamic'

// app/api/legal/contract/route.ts
import { NextResponse } from 'next/server';
import { legalAgent } from '@/lib/legal/legal-agent';
import { financialOrchestrator } from '@/lib/legal/financial-orchestrator';

export async function POST(request: Request) {
  try {
    const { action, data } = await request.json();
    
    if (action === 'generate_contract') {
      const contract = await legalAgent.generateEmploymentContract(data);
      return NextResponse.json({ success: true, contract });
    }
    
    if (action === 'process_payment') {
      const payment = await financialOrchestrator.processPayment(data);
      return NextResponse.json({ success: true, payment });
    }
    
    if (action === 'generate_report') {
      const report = await financialOrchestrator.generateFinancialReport(data);
      return NextResponse.json({ success: true, report });
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Legal API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Legal and Financial API is operational',
    services: ['Contract Generation', 'Payment Processing', 'Tax Calculation', 'Financial Reporting'],
    countries: ['KE', 'TZ', 'UG', 'ZA', 'NG', 'GH', 'RW']
  });
}
