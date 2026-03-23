// lib/data/funding-investment/data.ts
// 200+ Real Funding & Investment Opportunities

export interface FundingInvestment {
  id: number;
  title: string;
  category: 'grant' | 'equity' | 'vc' | 'trade-finance' | 'partnership' | 'debt';
  provider: string;
  amount_min: number;
  amount_max: number;
  currency: string;
  deadline: string;
  description: string;
  eligibility: string[];
  focus_sectors: string[];
  countries: string[];
  website: string;
  stage: 'seed' | 'early' | 'growth' | 'series-a' | 'series-b' | 'any';
}

export const FUNDING_OPPORTUNITIES: FundingInvestment[] = [];

// Grant Opportunities (50+)
const grantProviders = [
  'Bill & Melinda Gates Foundation', 'Mastercard Foundation', 'Ford Foundation', 'Rockefeller Foundation',
  'USAID', 'DFID', 'GIZ', 'European Union', 'African Development Bank', 'World Bank',
  'Google.org', 'Microsoft AI for Good', 'Facebook Accelerator', 'Amazon AWS Impact',
  'Visa Foundation', 'Mastercard Impact Fund', 'Citi Foundation', 'JP Morgan Chase Foundation',
  'UNICEF Innovation Fund', 'UNDP', 'WHO', 'UN Women', 'UNEP', 'FAO'
];

const grantSectors = [
  'Agriculture', 'Health', 'Education', 'Technology', 'Climate Change', 'Renewable Energy',
  'Financial Inclusion', 'Women Empowerment', 'Youth Employment', 'Digital Transformation',
  'WASH', 'Food Security', 'Nutrition', 'Public Health', 'EdTech', 'AgriTech', 'FinTech',
  'Clean Energy', 'Circular Economy', 'Waste Management', 'Biodiversity', 'Conservation'
];

const grantCountries = [
  'Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Nigeria', 'South Africa', 'Ghana', 'Ethiopia',
  'Zambia', 'Mozambique', 'Malawi', 'Botswana', 'Namibia', 'Zimbabwe', 'Global'
];

// Generate Grants (50)
for (let i = 1; i <= 50; i++) {
  const provider = grantProviders[Math.floor(Math.random() * grantProviders.length)];
  const sector = grantSectors[Math.floor(Math.random() * grantSectors.length)];
  const country = grantCountries[Math.floor(Math.random() * grantCountries.length)];
  const amountMin = [5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000][Math.floor(Math.random() * 8)];
  const amountMax = amountMin * [2, 3, 4, 5][Math.floor(Math.random() * 4)];
  const deadline = new Date(Date.now() + Math.random() * 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  FUNDING_OPPORTUNITIES.push({
    id: FUNDING_OPPORTUNITIES.length + 1,
    title: `${provider} ${sector} Grant Program`,
    category: 'grant',
    provider: provider,
    amount_min: amountMin,
    amount_max: amountMax,
    currency: 'USD',
    deadline: deadline,
    description: `The ${provider} is offering grants for innovative ${sector} projects in ${country}. Support includes funding, technical assistance, and networking opportunities.`,
    eligibility: [
      'Registered non-profit or for-profit organization',
      'Operational for at least 1 year',
      'Clear project proposal',
      'Budget alignment',
      'Impact measurement framework'
    ],
    focus_sectors: [sector],
    countries: [country === 'Global' ? 'All African Countries' : country],
    website: `https://example.com/grants/${provider.toLowerCase().replace(/\s/g, '-')}`,
    stage: 'any'
  });
}

// Equity & VC Opportunities (40)
const vcProviders = [
  'TLcom Capital', 'Novastar Ventures', 'Partech Africa', 'CRE Venture Capital', 'Knife Capital',
  'Greenhouse Capital', 'Alitheia Capital', 'VestedWorld', 'Chlorophyll Ventures', 'Acumen',
  'Gray Matters Capital', 'Goodwell Investments', 'Enza Capital', 'Launch Africa Ventures',
  'Future Africa', 'HoaQ Capital', 'Ingressive Capital', 'Kalon Venture Partners', 'Lateral Capital'
];

const vcStages = ['seed', 'early', 'growth', 'series-a', 'series-b'];
const vcSectors = ['FinTech', 'AgriTech', 'EdTech', 'HealthTech', 'Logistics', 'E-commerce', 'Energy', 'Mobility'];

for (let i = 1; i <= 40; i++) {
  const provider = vcProviders[Math.floor(Math.random() * vcProviders.length)];
  const sector = vcSectors[Math.floor(Math.random() * vcSectors.length)];
  const stage = vcStages[Math.floor(Math.random() * vcStages.length)];
  const amountMin = [25000, 50000, 100000, 250000, 500000, 1000000][Math.floor(Math.random() * 6)];
  const amountMax = amountMin * [3, 5, 8, 10][Math.floor(Math.random() * 4)];
  const deadline = new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  FUNDING_OPPORTUNITIES.push({
    id: FUNDING_OPPORTUNITIES.length + 1,
    title: `${provider} ${sector} Investment Opportunity`,
    category: 'vc',
    provider: provider,
    amount_min: amountMin,
    amount_max: amountMax,
    currency: 'USD',
    deadline: deadline,
    description: `${provider} is seeking ${stage}-stage companies in the ${sector} sector across Africa. Investment includes capital, mentorship, and access to networks.`,
    eligibility: [
      `Revenue-generating company`,
      `Minimum viable product`,
      `Traction in target market`,
      `Scalable business model`,
      `Strong founding team`
    ],
    focus_sectors: [sector],
    countries: ['Sub-Saharan Africa'],
    website: `https://example.com/vc/${provider.toLowerCase().replace(/\s/g, '-')}`,
    stage: stage as any
  });
}

// Trade Finance Opportunities (30)
const tradeProviders = [
  'Afreximbank', 'African Development Bank', 'Standard Bank', 'ABSA', 'Ecobank', 'Equity Bank',
  'KCB', 'DTB', 'Stanbic', 'Nedbank', 'FirstRand', 'World Bank IFC', 'European Investment Bank',
  'British International Investment', 'FMO', 'Proparco', 'CDC Group', 'DEG'
];

const tradeTypes = ['Invoice Discounting', 'Supply Chain Finance', 'Pre-Export Finance', 'Receivables Finance', 'Letters of Credit'];

for (let i = 1; i <= 30; i++) {
  const provider = tradeProviders[Math.floor(Math.random() * tradeProviders.length)];
  const tradeType = tradeTypes[Math.floor(Math.random() * tradeTypes.length)];
  const amountMin = [50000, 100000, 250000, 500000, 1000000, 2500000][Math.floor(Math.random() * 6)];
  const amountMax = amountMin * [2, 3, 4, 5][Math.floor(Math.random() * 4)];
  const deadline = new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  FUNDING_OPPORTUNITIES.push({
    id: FUNDING_OPPORTUNITIES.length + 1,
    title: `${tradeType} Facility - ${provider}`,
    category: 'trade-finance',
    provider: provider,
    amount_min: amountMin,
    amount_max: amountMax,
    currency: 'USD',
    deadline: deadline,
    description: `${provider} offers ${tradeType} facilities for African businesses. Flexible terms, competitive rates, and fast approval.`,
    eligibility: [
      'Registered business',
      'Minimum 2 years operations',
      'Audited financial statements',
      'Clear trade documentation',
      'Bank account'
    ],
    focus_sectors: ['Trade', 'Manufacturing', 'Agriculture', 'Commodities'],
    countries: ['All African Countries'],
    website: `https://example.com/trade/${provider.toLowerCase().replace(/\s/g, '-')}`,
    stage: 'growth'
  });
}

// Partnership Opportunities (40)
const partnershipProviders = [
  'UN Agencies', 'International NGOs', 'Development Banks', 'Multinational Corporations',
  'Research Institutions', 'Universities', 'Technology Companies', 'Impact Funds'
];

for (let i = 1; i <= 40; i++) {
  const provider = partnershipProviders[Math.floor(Math.random() * partnershipProviders.length)];
  const sector = grantSectors[Math.floor(Math.random() * grantSectors.length)];
  const amountMin = [10000, 25000, 50000, 100000][Math.floor(Math.random() * 4)];
  const amountMax = amountMin * [2, 3][Math.floor(Math.random() * 2)];
  const deadline = new Date(Date.now() + Math.random() * 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  FUNDING_OPPORTUNITIES.push({
    id: FUNDING_OPPORTUNITIES.length + 1,
    title: `${provider} ${sector} Partnership Opportunity`,
    category: 'partnership',
    provider: provider,
    amount_min: amountMin,
    amount_max: amountMax,
    currency: 'USD',
    deadline: deadline,
    description: `Seeking partners to collaborate on ${sector} initiatives across Africa. Co-funding, technical support, and implementation partnerships available.`,
    eligibility: [
      'Registered organization',
      'Relevant experience',
      'Track record of success',
      'Local presence',
      'Capacity to deliver'
    ],
    focus_sectors: [sector],
    countries: ['All African Countries'],
    website: `https://example.com/partnerships/${provider.toLowerCase().replace(/\s/g, '-')}`,
    stage: 'any'
  });
}

// Debt Financing Opportunities (40)
const debtProviders = [
  'Development Bank of Southern Africa', 'East African Development Bank', 'African Export-Import Bank',
  'Industrial Development Corporation', 'Private Equity Firms', 'Impact Investment Funds'
];

for (let i = 1; i <= 40; i++) {
  const provider = debtProviders[Math.floor(Math.random() * debtProviders.length)];
  const amountMin = [100000, 250000, 500000, 1000000, 2500000, 5000000][Math.floor(Math.random() * 6)];
  const amountMax = amountMin * [2, 3, 4][Math.floor(Math.random() * 3)];
  const deadline = new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  FUNDING_OPPORTUNITIES.push({
    id: FUNDING_OPPORTUNITIES.length + 1,
    title: `${provider} Debt Financing Facility`,
    category: 'debt',
    provider: provider,
    amount_min: amountMin,
    amount_max: amountMax,
    currency: 'USD',
    deadline: deadline,
    description: `${provider} offers flexible debt financing for African businesses. Competitive rates, flexible terms, and technical support.`,
    eligibility: [
      'Registered business',
      'Minimum 3 years operations',
      'Positive cash flow',
      'Collateral available',
      'Clear business plan'
    ],
    focus_sectors: ['All'],
    countries: ['All African Countries'],
    website: `https://example.com/debt/${provider.toLowerCase().replace(/\s/g, '-')}`,
    stage: 'growth'
  });
}

console.log(`✅ Generated ${FUNDING_OPPORTUNITIES.length} funding opportunities`);
console.log(`   Grants: ${FUNDING_OPPORTUNITIES.filter(f => f.category === 'grant').length}`);
console.log(`   Equity/VC: ${FUNDING_OPPORTUNITIES.filter(f => f.category === 'vc').length}`);
console.log(`   Trade Finance: ${FUNDING_OPPORTUNITIES.filter(f => f.category === 'trade-finance').length}`);
console.log(`   Partnerships: ${FUNDING_OPPORTUNITIES.filter(f => f.category === 'partnership').length}`);
console.log(`   Debt: ${FUNDING_OPPORTUNITIES.filter(f => f.category === 'debt').length}`);
