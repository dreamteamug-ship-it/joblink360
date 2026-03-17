// app/api/swarm/status/route.ts
import { NextResponse } from 'next/server';
import { EAST_AFRICA_SADC_COUNTRIES } from '@/lib/data/countries-config';
import { INTERNATIONAL_OPPORTUNITIES } from '@/lib/data/international-config';

export async function GET() {
  return NextResponse.json({
    success: true,
    agents: [
      { name: 'amanda', role: 'Chief AI Officer', focus: ['africa', 'global', 'strategy'] },
      { name: 'kwame', role: 'Skills Development', focus: ['training', 'certifications'] },
      { name: 'zola', role: 'Job Matching', focus: ['job_search', 'applications'] },
      { name: 'global_agent', role: 'International Specialist', focus: ['visa', 'relocation'] }
    ],
    total: 15,
    countryCoverage: {
      totalCountries: EAST_AFRICA_SADC_COUNTRIES.length,
      countries: EAST_AFRICA_SADC_COUNTRIES.map(c => c.code)
    },
    internationalCoverage: {
      totalRegions: Object.keys(INTERNATIONAL_OPPORTUNITIES).length,
      regions: Object.keys(INTERNATIONAL_OPPORTUNITIES)
    },
    timestamp: new Date().toISOString()
  });
}
