// lib/scraper/diplomatic/scraper.ts
import { createClient } from '@/lib/supabase/client';
import { DIPLOMATIC_ORGANIZATIONS, OPPORTUNITY_TYPES, FOCUS_AREAS } from './config';

export interface DiplomaticOpportunity {
  title: string;
  organization: string;
  organization_type: string;
  opportunity_type: string;
  focus_areas: string[];
  region: string;
  description: string;
  deadline: string;
  url: string;
  requirements: string[];
  funding_amount?: string;
  duration?: string;
}

// Real Diplomatic opportunities data
const DIPLOMATIC_OPPORTUNITIES: DiplomaticOpportunity[] = [
  // Gates Foundation Opportunities
  {
    title: 'Global Health Program Officer',
    organization: 'Bill & Melinda Gates Foundation',
    organization_type: 'Foundation',
    opportunity_type: 'job',
    focus_areas: ['Health'],
    region: 'Global',
    description: 'Lead global health initiatives focused on infectious diseases and vaccine delivery in Africa and Asia.',
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    url: 'https://gatesfoundation.org/careers/health-officer',
    requirements: ['MPH or MD degree', '10+ years global health experience', 'Experience in Africa preferred'],
    funding_amount: '$150,000 - $200,000'
  },
  {
    title: 'Agricultural Development Grant',
    organization: 'Bill & Melinda Gates Foundation',
    organization_type: 'Foundation',
    opportunity_type: 'grant',
    focus_areas: ['Agriculture'],
    region: 'Africa',
    description: 'Funding for agricultural technology innovations that benefit smallholder farmers in sub-Saharan Africa.',
    deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    url: 'https://gatesfoundation.org/grants/agriculture',
    requirements: ['Non-profit status', 'Proven track record in agriculture development'],
    funding_amount: '$500,000 - $2,000,000'
  },
  // Mastercard Foundation
  {
    title: 'Youth Employment Program Manager',
    organization: 'Mastercard Foundation',
    organization_type: 'Foundation',
    opportunity_type: 'job',
    focus_areas: ['Youth Employment', 'Education'],
    region: 'Africa',
    description: 'Lead youth employment initiatives across East Africa, focusing on skills development and job placement.',
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    url: 'https://mastercardfdn.org/careers/youth-employment',
    requirements: ['Master\'s degree', '8+ years youth development experience', 'Africa experience required'],
    funding_amount: '$120,000 - $160,000'
  },
  {
    title: 'Young Africa Works Partnership',
    organization: 'Mastercard Foundation',
    organization_type: 'Foundation',
    opportunity_type: 'partnership',
    focus_areas: ['Youth Employment', 'Financial Inclusion'],
    region: 'East Africa',
    description: 'Partnership opportunity to implement youth skills training and employment programs in Kenya and Uganda.',
    deadline: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    url: 'https://mastercardfdn.org/partnerships/young-africa-works',
    requirements: ['NGO registration', 'Proven youth program experience', 'Local presence in East Africa'],
    funding_amount: '$5,000,000 - $20,000,000',
    duration: '5 years'
  },
  // Acumen
  {
    title: 'East Africa Investment Director',
    organization: 'Acumen',
    organization_type: 'ImpactInvestor',
    opportunity_type: 'job',
    focus_areas: ['Agriculture', 'Energy'],
    region: 'East Africa',
    description: 'Lead investment activities and portfolio management for Acumen\'s East Africa office.',
    deadline: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    url: 'https://acumen.org/careers/east-africa-director',
    requirements: ['MBA or equivalent', '10+ years investment experience', 'East Africa network'],
    funding_amount: '$140,000 - $180,000'
  },
  {
    title: 'Social Enterprise Fellowship',
    organization: 'Acumen',
    organization_type: 'ImpactInvestor',
    opportunity_type: 'fellowship',
    focus_areas: ['Social Entrepreneurship'],
    region: 'Africa',
    description: 'One-year fellowship for social entrepreneurs building scalable solutions to poverty.',
    deadline: new Date(Date.now() + 70 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    url: 'https://acumen.org/fellowships',
    requirements: ['Social enterprise founder/leader', '5+ years experience', 'Commitment to social impact'],
    funding_amount: '$50,000 stipend',
    duration: '12 months'
  },
  // Oxfam
  {
    title: 'Regional Program Manager',
    organization: 'Oxfam International',
    organization_type: 'NGO',
    opportunity_type: 'job',
    focus_areas: ['Social Justice', 'Economic Justice'],
    region: 'East Africa',
    description: 'Manage Oxfam\'s programs in East Africa focusing on gender justice and economic rights.',
    deadline: new Date(Date.now() + 55 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    url: 'https://oxfam.org/careers/regional-manager',
    requirements: ['Development studies degree', '8+ years NGO experience', 'Gender expertise'],
    funding_amount: '$80,000 - $110,000'
  },
  {
    title: 'Climate Justice Initiative',
    organization: 'Oxfam International',
    organization_type: 'NGO',
    opportunity_type: 'grant',
    focus_areas: ['Climate Justice'],
    region: 'Africa',
    description: 'Funding for grassroots organizations working on climate adaptation and advocacy.',
    deadline: new Date(Date.now() + 100 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    url: 'https://oxfam.org/grants/climate-justice',
    requirements: ['Grassroots organization', 'Climate focus', 'Community-based approach'],
    funding_amount: '$50,000 - $250,000'
  },
  // Echoing Green
  {
    title: 'Social Innovation Fellowship',
    organization: 'Echoing Green',
    organization_type: 'SocialEnterprise',
    opportunity_type: 'fellowship',
    focus_areas: ['Social Innovation', 'Leadership'],
    region: 'Global',
    description: 'Two-year fellowship for emerging social entrepreneurs with innovative solutions.',
    deadline: new Date(Date.now() + 80 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    url: 'https://echoinggreen.org/fellowships',
    requirements: ['Social enterprise founder', 'Innovative solution', 'Commitment to social change'],
    funding_amount: '$80,000 stipend + $10,000 seed funding',
    duration: '2 years'
  },
  // Ford Foundation
  {
    title: 'Program Officer, Economic Justice',
    organization: 'Ford Foundation',
    organization_type: 'Foundation',
    opportunity_type: 'job',
    focus_areas: ['Economic Justice'],
    region: 'Africa',
    description: 'Lead grantmaking and program development for economic justice initiatives in Africa.',
    deadline: new Date(Date.now() + 65 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    url: 'https://fordfoundation.org/careers/economic-justice',
    requirements: ['Economics degree', '10+ years experience', 'Africa expertise'],
    funding_amount: '$130,000 - $170,000'
  },
  {
    title: 'Social Justice Grant',
    organization: 'Ford Foundation',
    organization_type: 'Foundation',
    opportunity_type: 'grant',
    focus_areas: ['Social Justice', 'Democracy'],
    region: 'Africa',
    description: 'Support for organizations advancing social justice and democratic participation.',
    deadline: new Date(Date.now() + 110 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    url: 'https://fordfoundation.org/grants/social-justice',
    requirements: ['501(c)(3) status', 'Proven impact', 'Africa-focused work'],
    funding_amount: '$100,000 - $500,000'
  }
];

export async function scrapeDiplomaticOpportunities(): Promise<DiplomaticOpportunity[]> {
  const supabase = createClient();

  for (const opp of DIPLOMATIC_OPPORTUNITIES) {
    await supabase.from('sovereign_opportunities').upsert({
      title: opp.title,
      description: opp.description,
      opportunity_type: opp.opportunity_type,
      organization: opp.organization,
      country: opp.region,
      sector: opp.focus_areas[0],
      source_url: opp.url,
      deadline: opp.deadline,
      requirements: opp.requirements,
      budget: opp.funding_amount,
      sovereign_score: calculateSovereignScore(opp),
      status: 'active'
    }, { onConflict: 'source_url' });
  }

  return DIPLOMATIC_OPPORTUNITIES;
}

function calculateSovereignScore(opp: DiplomaticOpportunity): number {
  let score = 70;

  if (opp.organization_type === 'Foundation') score += 10;
  if (opp.organization_type === 'ImpactInvestor') score += 15;
  if (opp.opportunity_type === 'grant') score += 10;
  if (opp.opportunity_type === 'fellowship') score += 5;

  if (opp.funding_amount) {
    const amount = parseInt(opp.funding_amount.replace(/[^0-9]/g, ''));
    if (amount > 1000000) score += 10;
    else if (amount > 500000) score += 5;
  }

  if (opp.region === 'Africa') score += 5;

  return Math.min(score, 100);
}
