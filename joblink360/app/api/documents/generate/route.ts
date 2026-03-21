export const dynamic = 'force-dynamic'

// app/api/documents/generate/route.ts
import { NextResponse } from 'next/server';
import { documentGenerator } from '@/lib/documents/ultra-luxury-doc';

export async function POST(request: Request) {
  try {
    const { opportunityId, userData } = await request.json();
    
    // Get opportunity from database
    const { data: opportunity } = await supabase
      .from('funding_opportunities')
      .select('*')
      .eq('id', opportunityId)
      .single();
    
    if (!opportunity) {
      return NextResponse.json({ error: 'Opportunity not found' }, { status: 404 });
    }
    
    const result = await documentGenerator.generateProposalDocument(opportunity, userData, []);
    
    return NextResponse.json({
      success: true,
      documentUrl: result.pdfUrl,
      successProbability: result.successProbability,
      needsReview: result.needsReview,
      applicationId: result.applicationId
    });
  } catch (error) {
    console.error('Document generation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
