// app/api/tenders/scan/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const tenders = [
      {
        id: "TND-001",
        title: "Medical Supply Chain Infrastructure",
        source: "World Bank",
        country: "Kenya",
        deadline: "2026-06-15",
        value: 2500000,
        currency: "USD",
        sector: "Health",
        requirements: [
          "ISO 13485 Certification",
          "Cold Chain Logistics",
          "Last-Mile Delivery Network"
        ],
        matchScore: 98,
        matchedProjects: ["Project Emerald Health Initiative"]
      },
      {
        id: "TND-002",
        title: "Climate-Smart Agriculture Training",
        source: "UN FAO",
        country: "Tanzania",
        deadline: "2026-07-01",
        value: 1800000,
        currency: "USD",
        sector: "Agriculture",
        requirements: [
          "Farmer Training Experience",
          "AgTech Integration",
          "Sustainability Reporting"
        ],
        matchScore: 94,
        matchedProjects: ["1,500 Farmer Network"]
      },
      {
        id: "TND-003",
        title: "AI Youth Employment Program",
        source: "UAE Government",
        country: "UAE",
        deadline: "2026-05-30",
        value: 5000000,
        currency: "AED",
        sector: "AI/Tech",
        requirements: [
          "AI Training Curriculum",
          "Youth Mentorship",
          "Job Placement Record"
        ],
        matchScore: 87,
        matchedProjects: ["Sovereign 100 AI Graduates"]
      }
    ];

    return NextResponse.json({
      success: true,
      tenders,
      total: tenders.length,
      scannedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Tender scan error:', error);
    return NextResponse.json(
      { error: 'Failed to scan tenders' },
      { status: 500 }
    );
  }
}