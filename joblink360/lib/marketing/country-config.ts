// lib/marketing/country-config.ts
export const CountryMarketingConfig = {
  // East Africa
  KE: { name: 'Kenya', currency: 'KES', rate: 128.82, priority: 'HIGH', language: 'en,sw', timezone: 'EAT', population: 55, digital_penetration: 42 },
  TZ: { name: 'Tanzania', currency: 'TZS', rate: 2600, priority: 'HIGH', language: 'en,sw', timezone: 'EAT', population: 65, digital_penetration: 35 },
  UG: { name: 'Uganda', currency: 'UGX', rate: 3754, priority: 'HIGH', language: 'en,lg', timezone: 'EAT', population: 48, digital_penetration: 38 },
  RW: { name: 'Rwanda', currency: 'RWF', rate: 1100, priority: 'MEDIUM', language: 'en,fr,rw', timezone: 'CAT', population: 14, digital_penetration: 45 },
  BI: { name: 'Burundi', currency: 'BIF', rate: 2800, priority: 'LOW', language: 'fr,rn', timezone: 'CAT', population: 12, digital_penetration: 15 },
  ET: { name: 'Ethiopia', currency: 'ETB', rate: 55, priority: 'MEDIUM', language: 'am', timezone: 'EAT', population: 123, digital_penetration: 20 },
  SO: { name: 'Somalia', currency: 'SOS', rate: 570, priority: 'LOW', language: 'so', timezone: 'EAT', population: 17, digital_penetration: 12 },
  SS: { name: 'South Sudan', currency: 'SSP', rate: 130, priority: 'LOW', language: 'en', timezone: 'CAT', population: 11, digital_penetration: 8 },
  
  // SADC Countries
  ZA: { name: 'South Africa', currency: 'ZAR', rate: 18.5, priority: 'HIGH', language: 'en,zu,xh,af', timezone: 'SAST', population: 60, digital_penetration: 65 },
  ZM: { name: 'Zambia', currency: 'ZMW', rate: 19.44, priority: 'MEDIUM', language: 'en,bem', timezone: 'CAT', population: 20, digital_penetration: 35 },
  ZW: { name: 'Zimbabwe', currency: 'USD', rate: 1, priority: 'MEDIUM', language: 'en,sn,nd', timezone: 'CAT', population: 16, digital_penetration: 30 },
  MW: { name: 'Malawi', currency: 'MWK', rate: 1700, priority: 'MEDIUM', language: 'en,ny', timezone: 'CAT', population: 21, digital_penetration: 25 },
  MZ: { name: 'Mozambique', currency: 'MZN', rate: 64, priority: 'LOW', language: 'pt', timezone: 'CAT', population: 33, digital_penetration: 20 },
  AO: { name: 'Angola', currency: 'AOA', rate: 830, priority: 'LOW', language: 'pt', timezone: 'WAT', population: 36, digital_penetration: 18 },
  NA: { name: 'Namibia', currency: 'NAD', rate: 18.5, priority: 'LOW', language: 'en,af', timezone: 'CAT', population: 2.5, digital_penetration: 45 },
  BW: { name: 'Botswana', currency: 'BWP', rate: 13.5, priority: 'MEDIUM', language: 'en,tn', timezone: 'CAT', population: 2.6, digital_penetration: 65 },
  LS: { name: 'Lesotho', currency: 'LSL', rate: 18.5, priority: 'LOW', language: 'en,st', timezone: 'SAST', population: 2.1, digital_penetration: 35 },
  SZ: { name: 'Eswatini', currency: 'SZL', rate: 18.5, priority: 'LOW', language: 'en,ss', timezone: 'SAST', population: 1.2, digital_penetration: 40 },
  MG: { name: 'Madagascar', currency: 'MGA', rate: 4500, priority: 'LOW', language: 'fr,mg', timezone: 'EAT', population: 29, digital_penetration: 15 },
  MU: { name: 'Mauritius', currency: 'MUR', rate: 45, priority: 'MEDIUM', language: 'en,fr', timezone: 'MUT', population: 1.3, digital_penetration: 75 },
  SC: { name: 'Seychelles', currency: 'SCR', rate: 14, priority: 'LOW', language: 'en,fr', timezone: 'SCT', population: 0.1, digital_penetration: 85 },
  KM: { name: 'Comoros', currency: 'KMF', rate: 450, priority: 'LOW', language: 'ar,fr', timezone: 'EAT', population: 0.9, digital_penetration: 20 },
  CD: { name: 'DR Congo', currency: 'CDF', rate: 2700, priority: 'MEDIUM', language: 'fr,ln', timezone: 'CAT', population: 102, digital_penetration: 12 },
  CG: { name: 'Congo', currency: 'XAF', rate: 600, priority: 'LOW', language: 'fr', timezone: 'WAT', population: 6, digital_penetration: 18 }
};

export const RevenueTargets = {
  DAILY: 10000, // USD
  WEEKLY: 70000,
  MONTHLY: 300000,
  ANNUAL: 3650000
};

export const PricingStrategy = {
  KENYA: { course: 1500, subscription: 1300, premium: 5000 },
  TANZANIA: { course: 15000, subscription: 13000, premium: 50000 },
  UGANDA: { course: 22000, subscription: 19000, premium: 73000 },
  SOUTH_AFRICA: { course: 450, subscription: 390, premium: 1500 },
  NIGERIA: { course: 25000, subscription: 22000, premium: 85000 },
  ZAMBIA: { course: 350, subscription: 300, premium: 1150 }
};