// lib/countries/data.ts
export interface Country {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  language: string[];
  phoneCode: string;
  timezone: string;
  jobPortals: string[];
  tenderPortals: string[];
  paymentMethods: string[];
  laborLaws: string;
  taxRate: number;
}

export const COUNTRIES: Record<string, Country> = {
  KE: {
    code: 'KE',
    name: 'Kenya',
    currency: 'KES',
    currencySymbol: 'KSh',
    language: ['en', 'sw'],
    phoneCode: '+254',
    timezone: 'EAT',
    jobPortals: ['brightermonday.co.ke', 'fuzu.com', 'linkedin.com'],
    tenderPortals: ['tenders.go.ke', 'ppra.go.ke', 'afdb.org'],
    paymentMethods: ['mpesa', 'stripe', 'paypal'],
    laborLaws: 'Employment Act 2007',
    taxRate: 30
  },
  UG: {
    code: 'UG',
    name: 'Uganda',
    currency: 'UGX',
    currencySymbol: 'USh',
    language: ['en', 'sw'],
    phoneCode: '+256',
    timezone: 'EAT',
    jobPortals: ['brightermonday.ug', 'fuzu.com', 'linkedin.com'],
    tenderPortals: ['ppda.go.ug', 'afdb.org', 'worldbank.org'],
    paymentMethods: ['airtel', 'mtn', 'stripe'],
    laborLaws: 'Employment Act 2006',
    taxRate: 30
  },
  TZ: {
    code: 'TZ',
    name: 'Tanzania',
    currency: 'TZS',
    currencySymbol: 'TSh',
    language: ['sw', 'en'],
    phoneCode: '+255',
    timezone: 'EAT',
    jobPortals: ['brightermonday.co.tz', 'fuzu.com', 'linkedin.com'],
    tenderPortals: ['ppra.go.tz', 'afdb.org', 'worldbank.org'],
    paymentMethods: ['tigopesa', 'airtel', 'stripe'],
    laborLaws: 'Employment and Labour Relations Act',
    taxRate: 30
  },
  ZA: {
    code: 'ZA',
    name: 'South Africa',
    currency: 'ZAR',
    currencySymbol: 'R',
    language: ['en', 'af', 'zu', 'xh'],
    phoneCode: '+27',
    timezone: 'SAST',
    jobPortals: ['pnet.co.za', 'careerjunction.co.za', 'linkedin.com'],
    tenderPortals: ['etenders.gov.za', 'afdb.org', 'worldbank.org'],
    paymentMethods: ['payfast', 'stripe', 'paypal'],
    laborLaws: 'Basic Conditions of Employment Act',
    taxRate: 28
  },
  // Add all 26 countries...
};

export const getCountry = (code: string): Country => COUNTRIES[code] || COUNTRIES.KE;
export const getAllCountries = (): Country[] => Object.values(COUNTRIES);
