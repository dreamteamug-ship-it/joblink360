// lib/jobs/categories.ts
export const JobCategories = {
  // Tech & Digital
  TECH_AI: {
    id: 'TECH_AI',
    name: 'AI & Machine Learning',
    description: 'AI Engineers, ML Specialists, Prompt Engineers, Data Scientists',
    sectors: ['Tech', 'AI', 'Data Science'],
    remote_level: 'FULLY_REMOTE',
    typical_clients: ['Tech Companies', 'Startups', 'Research Labs', 'AI Agencies'],
    salary_range: { min: 3000, max: 15000, currency: 'USD' }
  },
  TECH_SOFTWARE: {
    id: 'TECH_SOFTWARE',
    name: 'Software Development',
    description: 'Full Stack, Frontend, Backend, Mobile, DevOps, Cloud Architects',
    sectors: ['Tech', 'Software', 'SaaS'],
    remote_level: 'FULLY_REMOTE',
    typical_clients: ['Tech Companies', 'Startups', 'Enterprises', 'SaaS Platforms'],
    salary_range: { min: 2500, max: 12000, currency: 'USD' }
  },
  
  // International Development & NGOs
  DEV_INGO: {
    id: 'DEV_INGO',
    name: 'International Development & NGO',
    description: 'Program Managers, Project Officers, Grant Writers, M&E Specialists',
    sectors: ['NGO', 'INGO', 'Development', 'Humanitarian'],
    remote_level: 'HYBRID_REMOTE',
    typical_clients: ['UN Agencies', 'World Bank', 'USAID', 'DFID', 'Save the Children', 'Oxfam', 'Red Cross'],
    salary_range: { min: 3500, max: 9000, currency: 'USD' }
  },
  
  // Research & Analytics
  RESEARCH_MONITORING: {
    id: 'RESEARCH_MONITORING',
    name: 'Research, Monitoring & Evaluation',
    description: 'Research Analysts, M&E Specialists, Data Collectors, Survey Specialists, Impact Evaluators',
    sectors: ['Research', 'M&E', 'Data Collection', 'Evaluation'],
    remote_level: 'REMOTE_WITH_FIELD',
    typical_clients: ['Research Firms', 'Universities', 'World Bank', 'UNICEF', 'NGOs', 'Government Agencies'],
    salary_range: { min: 2800, max: 8000, currency: 'USD' }
  },
  
  // Due Diligence & Compliance
  DUE_DILIGENCE: {
    id: 'DUE_DILIGENCE',
    name: 'Due Diligence & Compliance',
    description: 'Due Diligence Analysts, Compliance Officers, Risk Assessors, Background Checkers',
    sectors: ['Compliance', 'Risk', 'Legal', 'Finance'],
    remote_level: 'FULLY_REMOTE',
    typical_clients: ['Banks', 'Investment Firms', 'Private Equity', 'Law Firms', 'Due Diligence Agencies'],
    salary_range: { min: 4000, max: 12000, currency: 'USD' }
  },
  
  // Fundraising & Grant Management
  FUNDRAISING_GRANTS: {
    id: 'FUNDRAISING_GRANTS',
    name: 'Fundraising & Grant Management',
    description: 'Grant Writers, Fundraising Specialists, Proposal Developers, Donor Relations',
    sectors: ['Fundraising', 'Grants', 'Donor Relations', 'Philanthropy'],
    remote_level: 'FULLY_REMOTE',
    typical_clients: ['NGOs', 'Foundations', 'Donor Agencies', 'Social Enterprises'],
    salary_range: { min: 3000, max: 10000, currency: 'USD' }
  },
  
  // Digital Marketing & Communications
  MARKETING_COMMS: {
    id: 'MARKETING_COMMS',
    name: 'Digital Marketing & Communications',
    description: 'Social Media Managers, Content Creators, SEO Specialists, Digital Marketers, PR Experts',
    sectors: ['Marketing', 'Communications', 'PR', 'Digital Media'],
    remote_level: 'FULLY_REMOTE',
    typical_clients: ['Agencies', 'Brands', 'Tech Companies', 'NGOs', 'Startups'],
    salary_range: { min: 2000, max: 7000, currency: 'USD' }
  },
  
  // Virtual Assistance & Administration
  VIRTUAL_ASSISTANT: {
    id: 'VIRTUAL_ASSISTANT',
    name: 'Virtual Assistance & Administration',
    description: 'Executive Assistants, Virtual Assistants, Admin Support, Project Coordinators',
    sectors: ['Administration', 'Support', 'Operations'],
    remote_level: 'FULLY_REMOTE',
    typical_clients: ['Executives', 'Entrepreneurs', 'Small Businesses', 'Agencies'],
    salary_range: { min: 1500, max: 4000, currency: 'USD' }
  },
  
  // Creative & Design
  CREATIVE_DESIGN: {
    id: 'CREATIVE_DESIGN',
    name: 'Creative & Design',
    description: 'UI/UX Designers, Graphic Designers, Video Editors, Animators, Illustrators',
    sectors: ['Design', 'Creative', 'Media'],
    remote_level: 'FULLY_REMOTE',
    typical_clients: ['Agencies', 'Brands', 'Media Houses', 'Startups'],
    salary_range: { min: 2000, max: 6000, currency: 'USD' }
  },
  
  // Business Development & Sales
  BUSINESS_SALES: {
    id: 'BUSINESS_SALES',
    name: 'Business Development & Sales',
    description: 'B2B Sales, Account Managers, Business Development, Partnership Managers',
    sectors: ['Sales', 'Business Development', 'Partnerships'],
    remote_level: 'FULLY_REMOTE',
    typical_clients: ['Tech Companies', 'SaaS', 'Agencies', 'Consulting Firms'],
    salary_range: { min: 2500, max: 10000, currency: 'USD' }
  },
  
  // Finance & Accounting
  FINANCE_ACCOUNTING: {
    id: 'FINANCE_ACCOUNTING',
    name: 'Finance & Accounting',
    description: 'Accountants, Financial Analysts, Bookkeepers, Auditors, Tax Specialists',
    sectors: ['Finance', 'Accounting', 'Auditing'],
    remote_level: 'FULLY_REMOTE',
    typical_clients: ['Accounting Firms', 'Corporations', 'NGOs', 'Startups'],
    salary_range: { min: 2000, max: 8000, currency: 'USD' }
  },
  
  // HR & Recruitment
  HR_RECRUITMENT: {
    id: 'HR_RECRUITMENT',
    name: 'HR & Recruitment',
    description: 'Recruiters, HR Generalists, Talent Acquisition, HR Operations',
    sectors: ['HR', 'Recruitment', 'Talent'],
    remote_level: 'FULLY_REMOTE',
    typical_clients: ['Recruitment Agencies', 'Corporations', 'Startups', 'Tech Companies'],
    salary_range: { min: 2000, max: 7000, currency: 'USD' }
  },
  
  // Legal & Compliance
  LEGAL_COMPLIANCE: {
    id: 'LEGAL_COMPLIANCE',
    name: 'Legal & Compliance',
    description: 'Paralegals, Legal Assistants, Compliance Officers, Contract Managers',
    sectors: ['Legal', 'Compliance', 'Contracts'],
    remote_level: 'FULLY_REMOTE',
    typical_clients: ['Law Firms', 'Corporations', 'NGOs', 'Startups'],
    salary_range: { min: 3000, max: 10000, currency: 'USD' }
  }
};

export const EmployerTiers = {
  PREMIUM: { name: 'Premium Partner', badge: '⭐', benefits: ['Priority Job Posting', 'Verified Badge', 'Dedicated Support'] },
  ENTERPRISE: { name: 'Enterprise Client', badge: '🏢', benefits: ['Bulk Hiring', 'Custom Training', 'API Access'] },
  NGO: { name: 'NGO Partner', badge: '🌍', benefits: ['Discounted Rates', 'Impact Reporting', 'Volunteer Opportunities'] },
  GOVERNMENT: { name: 'Government Agency', badge: '🏛️', benefits: ['Compliance Guarantee', 'Formal Contracts', 'Audit Ready'] }
};

export const CredibleEmployers = [
  { name: 'World Bank Group', category: 'DEV_INGO', tier: 'ENTERPRISE', active_jobs: 45, rating: 4.9 },
  { name: 'United Nations Development Programme', category: 'DEV_INGO', tier: 'ENTERPRISE', active_jobs: 62, rating: 4.8 },
  { name: 'USAID', category: 'DEV_INGO', tier: 'ENTERPRISE', active_jobs: 38, rating: 4.7 },
  { name: 'Bill & Melinda Gates Foundation', category: 'FUNDRAISING_GRANTS', tier: 'PREMIUM', active_jobs: 25, rating: 4.9 },
  { name: 'Google', category: 'TECH_AI', tier: 'PREMIUM', active_jobs: 120, rating: 4.9 },
  { name: 'Microsoft', category: 'TECH_SOFTWARE', tier: 'PREMIUM', active_jobs: 95, rating: 4.8 },
  { name: 'Amazon Web Services', category: 'TECH_SOFTWARE', tier: 'PREMIUM', active_jobs: 85, rating: 4.8 },
  { name: 'KPMG', category: 'DUE_DILIGENCE', tier: 'ENTERPRISE', active_jobs: 32, rating: 4.7 },
  { name: 'Deloitte', category: 'DUE_DILIGENCE', tier: 'ENTERPRISE', active_jobs: 45, rating: 4.7 },
  { name: 'Save the Children International', category: 'DEV_INGO', tier: 'NGO', active_jobs: 28, rating: 4.6 },
  { name: 'Oxfam International', category: 'DEV_INGO', tier: 'NGO', active_jobs: 22, rating: 4.6 },
  { name: 'International Rescue Committee', category: 'DEV_INGO', tier: 'NGO', active_jobs: 31, rating: 4.7 },
  { name: 'African Development Bank', category: 'DEV_INGO', tier: 'ENTERPRISE', active_jobs: 41, rating: 4.8 },
  { name: 'Mastercard Foundation', category: 'FUNDRAISING_GRANTS', tier: 'PREMIUM', active_jobs: 18, rating: 4.9 },
  { name: 'Andela', category: 'TECH_SOFTWARE', tier: 'PREMIUM', active_jobs: 200, rating: 4.8 },
  { name: 'Flutterwave', category: 'TECH_SOFTWARE', tier: 'PREMIUM', active_jobs: 35, rating: 4.7 },
  { name: 'Paystack', category: 'TECH_SOFTWARE', tier: 'PREMIUM', active_jobs: 28, rating: 4.7 },
  { name: 'I&M Bank', category: 'FINANCE_ACCOUNTING', tier: 'ENTERPRISE', active_jobs: 15, rating: 4.5 }
];