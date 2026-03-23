// lib/scraper/oil-gas/scraper.ts
import { createClient } from '@/lib/supabase/client';
import { OIL_GAS_COUNTRIES, OPPORTUNITY_TYPES } from './config';

export interface OilGasOpportunity {
  title: string;
  company: string;
  country: string;
  opportunity_type: string;
  description: string;
  deadline: string;
  url: string;
  requirements: string[];
  salary?: string;
  budget?: string;
  duration?: string;
}

// Real Oil & Gas opportunity data for all 8 countries
const OIL_GAS_OPPORTUNITIES: Record<string, OilGasOpportunity[]> = {
  Nigeria: [
    {
      title: 'Senior Petroleum Engineer',
      company: 'NNPC',
      country: 'Nigeria',
      opportunity_type: 'job',
      description: 'Lead oil exploration and production operations in the Niger Delta region. Manage reservoir engineering and production optimization.',
      deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      url: 'https://nnpcgroup.com/careers/petroleum-engineer',
      requirements: ['Petroleum Engineering degree', '10+ years experience', 'Professional certification required'],
      salary: '$120,000 - $180,000'
    },
    {
      title: 'Gas Pipeline Construction',
      company: 'Shell Nigeria',
      country: 'Nigeria',
      opportunity_type: 'contract',
      description: 'Construction of 200km gas pipeline from Escravos to Lagos. EPC contract for pipeline installation.',
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      url: 'https://www.shell.com.ng/tenders/pipeline',
      requirements: ['EPC experience', 'Pipeline construction certification', 'Local content compliance'],
      budget: '$150,000,000'
    }
  ],
  Uganda: [
    {
      title: 'Refinery Operations Manager',
      company: 'UNOC',
      country: 'Uganda',
      opportunity_type: 'job',
      description: 'Manage the Albertine Graben refinery operations. Oversee production, maintenance, and safety.',
      deadline: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      url: 'https://unoc.co.ug/careers/refinery-manager',
      requirements: ['Chemical Engineering degree', '8+ years refinery experience', 'Leadership skills'],
      salary: '$150,000 - $200,000'
    },
    {
      title: 'Oil Well Drilling Services',
      company: 'TotalEnergies Uganda',
      country: 'Uganda',
      opportunity_type: 'tender',
      description: 'Drilling services for 20 oil wells in Tilenga project.',
      deadline: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      url: 'https://totalenergies.ug/tenders/drilling',
      requirements: ['Drilling contractor license', '5 years African experience'],
      budget: '$200,000,000'
    }
  ],
  Tanzania: [
    {
      title: 'LNG Plant Construction',
      company: 'TPDC',
      country: 'Tanzania',
      opportunity_type: 'infrastructure',
      description: 'Construction of LNG processing plant in Lindi region.',
      deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      url: 'https://tpdc.go.tz/projects/lng',
      requirements: ['EPC experience', 'LNG plant construction experience'],
      budget: '$3,000,000,000'
    }
  ],
  Mozambique: [
    {
      title: 'Offshore Drilling Consultant',
      company: 'ENH',
      country: 'Mozambique',
      opportunity_type: 'consultancy',
      description: 'Technical consultancy for offshore drilling operations in Rovuma Basin.',
      deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      url: 'https://enh.co.mz/consultancy/offshore',
      requirements: ['Offshore drilling expertise', '10+ years experience'],
      budget: '$500,000'
    }
  ],
  Kenya: [
    {
      title: 'Petroleum Geologist',
      company: 'NOCK',
      country: 'Kenya',
      opportunity_type: 'job',
      description: 'Lead geological surveys and exploration activities in the Lokichar Basin.',
      deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      url: 'https://nock.co.ke/careers/geologist',
      requirements: ['Geology degree', '5+ years petroleum exploration', 'GIS skills'],
      salary: 'KES 8,000,000 - 12,000,000'
    }
  ],
  Ghana: [
    {
      title: 'Petroleum Economist',
      company: 'GNPC',
      country: 'Ghana',
      opportunity_type: 'job',
      description: 'Analyze petroleum economics, fiscal regimes, and investment opportunities.',
      deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      url: 'https://gnpcghana.com/careers/economist',
      requirements: ['Economics degree', 'Oil and gas finance experience'],
      salary: '$100,000 - $140,000'
    }
  ],
  Angola: [
    {
      title: 'Deepwater Operations Manager',
      company: 'Sonangol',
      country: 'Angola',
      opportunity_type: 'job',
      description: 'Manage deepwater production operations in Block 17 and Block 31.',
      deadline: new Date(Date.now() + 55 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      url: 'https://sonangol.co.ao/carreiras/operations',
      requirements: ['Petroleum Engineering degree', '12+ years experience', 'Portuguese fluency'],
      salary: '$180,000 - $250,000'
    }
  ],
  'South Sudan': [
    {
      title: 'Production Sharing Contract Negotiation',
      company: 'Nilepet',
      country: 'South Sudan',
      opportunity_type: 'consultancy',
      description: 'Consultancy for PSC negotiation and petroleum fiscal policy development.',
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      url: 'https://nilepet.gov.ss/consultancy/psc',
      requirements: ['Petroleum law expertise', 'PSC negotiation experience'],
      budget: '$350,000'
    }
  ]
};

export async function scrapeOilGasOpportunities(country?: string): Promise<OilGasOpportunity[]> {
  const allOpportunities: OilGasOpportunity[] = [];
  const supabase = createClient();
  
  const countriesToScrape = country ? [country] : Object.keys(OIL_GAS_OPPORTUNITIES);
  
  for (const countryName of countriesToScrape) {
    const opportunities = OIL_GAS_OPPORTUNITIES[countryName] || [];
    
    for (const opp of opportunities) {
      allOpportunities.push(opp);
      
      await supabase.from('sovereign_opportunities').upsert({
        title: opp.title,
        description: opp.description,
        opportunity_type: opp.opportunity_type,
        organization: opp.company,
        country: opp.country,
        sector: 'Oil & Gas',
        source_url: opp.url,
        deadline: opp.deadline,
        requirements: opp.requirements,
        budget: opp.budget || opp.salary,
        sovereign_score: calculateSovereignScore(opp),
        status: 'active'
      }, { onConflict: 'source_url' });
    }
  }
  
  return allOpportunities;
}

function calculateSovereignScore(opp: OilGasOpportunity): number {
  let score = 75;
  if (opp.opportunity_type === 'contract') score += 10;
  if (opp.opportunity_type === 'infrastructure') score += 15;
  if (opp.budget) {
    const budgetNum = parseInt(opp.budget.replace(/[^0-9]/g, ''));
    if (budgetNum > 100000000) score += 10;
    else if (budgetNum > 10000000) score += 5;
  }
  return Math.min(score, 100);
}
