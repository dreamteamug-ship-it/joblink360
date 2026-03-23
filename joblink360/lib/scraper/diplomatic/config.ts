// lib/scraper/diplomatic/config.ts

export const DIPLOMATIC_ORGANIZATIONS = [
  { name: 'Bill & Melinda Gates Foundation', type: 'Foundation', region: 'Global' },
  { name: 'Mastercard Foundation', type: 'Foundation', region: 'Africa' },
  { name: 'Ford Foundation', type: 'Foundation', region: 'Global' },
  { name: 'Rockefeller Foundation', type: 'Foundation', region: 'Global' },
  { name: 'Acumen', type: 'ImpactInvestor', region: 'Global' },
  { name: 'Oxfam International', type: 'NGO', region: 'Global' },
  { name: 'World Wildlife Fund', type: 'NGO', region: 'Global' },
  { name: 'Echoing Green', type: 'SocialEnterprise', region: 'Global' },
  { name: 'Ashoka', type: 'SocialEnterprise', region: 'Global' },
  { name: 'Open Society Foundations', type: 'Foundation', region: 'Global' }
];

export const OPPORTUNITY_TYPES = [
  { id: 'job', label: 'Jobs', icon: '💼' },
  { id: 'grant', label: 'Grants', icon: '💰' },
  { id: 'fellowship', label: 'Fellowships', icon: '🎓' },
  { id: 'partnership', label: 'Partnerships', icon: '🤝' },
  { id: 'consultancy', label: 'Consultancy', icon: '📊' }
];

export const FOCUS_AREAS = [
  'Health', 'Education', 'Agriculture', 'Climate Change', 'Youth Employment',
  'Gender Equality', 'Economic Justice', 'Social Justice', 'Financial Inclusion',
  'Technology', 'Water & Sanitation', 'Democracy', 'Human Rights'
];
