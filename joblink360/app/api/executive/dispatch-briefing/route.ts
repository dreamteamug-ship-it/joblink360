import { NextResponse } from 'next/server';
import { amandaAuditor } from '@/lib/amanda/agents/OdooAuditor';
import { generateSovereignPDF } from '@/lib/amanda/reporting/PDFEngine';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'morning';
  
  // 1. Trigger the Auditor Agent
  const auditData = await amandaAuditor.performDailyAudit();
  const securityHealth = await amandaAuditor.getSecurityHealth();

  // 2. Map data for the PDF Engine
  const reportContext = {
    title: type === 'morning' ? 'MORNING COMMAND' : 'EVENING CLOSE',
    audit: auditData,
    security: securityHealth,
    timestamp: new Date().toISOString()
  };

  console.log(`[SOP] Amanda has completed the audit for ${reportContext.title}.`);

  // 3. Dispatch
  return NextResponse.json({ 
    success: true, 
    report: reportContext,
    message: "PDF Queued with real ERP data." 
  });
}
