// app/api/training/certify/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId, courseId, score } = await request.json();
    
    // Verify completion (mock)
    const passed = score >= 75;
    
    if (!passed) {
      return NextResponse.json({
        success: false,
        message: 'Certificate requires 75% or higher',
        score
      });
    }
    
    // Generate certificate
    const certificateId = `CERT${Date.now()}`;
    
    const certificate = {
      id: certificateId,
      userId,
      courseId,
      issueDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      score,
      grade: score >= 90 ? 'Distinction' : score >= 75 ? 'Merit' : 'Pass',
      seal: 'golden',
      blockchain: `https://verify.joblink360.com/${certificateId}`,
      download: {
        pdf: `/api/certificates/${certificateId}/pdf`,
        image: `/api/certificates/${certificateId}/image`
      }
    };
    
    return NextResponse.json({
      success: true,
      certificate,
      message: 'Certificate generated successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to generate certificate' },
      { status: 500 }
    );
  }
}
