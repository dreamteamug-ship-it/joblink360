// lib/legal/country-tax.ts
export const CountryTaxConfig = {
  KE: {
    name: 'Kenya',
    currency: 'KES',
    tax_rate: 0.30,
    social_security: 0.06,
    health_insurance: 0.025,
    nhif: { employee: 0.025, employer: 0.025 },
    nssf: { employee: 0.06, employer: 0.06 },
    paye_brackets: [
      { up_to: 24000, rate: 0.10 },
      { up_to: 32333, rate: 0.15 },
      { up_to: 500000, rate: 0.20 },
      { up_to: 800000, rate: 0.25 },
      { above: 800000, rate: 0.30 }
    ],
    agency_fee_cap: 0.30,
    invoicing_requirements: ['ETR', 'VAT', 'PIN']
  },
  TZ: {
    name: 'Tanzania',
    currency: 'TZS',
    tax_rate: 0.30,
    social_security: 0.10,
    health_insurance: 0.03,
    paye_brackets: [
      { up_to: 270000, rate: 0 },
      { up_to: 520000, rate: 0.08 },
      { up_to: 760000, rate: 0.20 },
      { up_to: 1000000, rate: 0.25 },
      { above: 1000000, rate: 0.30 }
    ],
    agency_fee_cap: 0.30
  },
  UG: {
    name: 'Uganda',
    currency: 'UGX',
    tax_rate: 0.30,
    social_security: 0.10,
    health_insurance: 0.04,
    paye_brackets: [
      { up_to: 235000, rate: 0 },
      { up_to: 335000, rate: 0.10 },
      { up_to: 410000, rate: 0.20 },
      { up_to: 10000000, rate: 0.30 },
      { above: 10000000, rate: 0.40 }
    ],
    agency_fee_cap: 0.30
  },
  ZA: {
    name: 'South Africa',
    currency: 'ZAR',
    tax_rate: 0.45,
    social_security: 0.02,
    health_insurance: 0.08,
    uif: { employee: 0.01, employer: 0.01 },
    paye_brackets: [
      { up_to: 237100, rate: 0.18 },
      { up_to: 370500, rate: 0.26 },
      { up_to: 512800, rate: 0.31 },
      { up_to: 673000, rate: 0.36 },
      { up_to: 857900, rate: 0.39 },
      { up_to: 1817000, rate: 0.41 },
      { above: 1817000, rate: 0.45 }
    ],
    agency_fee_cap: 0.30
  },
  NG: {
    name: 'Nigeria',
    currency: 'NGN',
    tax_rate: 0.24,
    social_security: 0.10,
    health_insurance: 0.05,
    pension: { employee: 0.08, employer: 0.10 },
    nhis: { employee: 0.05, employer: 0.05 },
    paye_brackets: [
      { up_to: 300000, rate: 0.07 },
      { up_to: 600000, rate: 0.11 },
      { up_to: 1100000, rate: 0.15 },
      { up_to: 1600000, rate: 0.19 },
      { up_to: 3200000, rate: 0.21 },
      { above: 3200000, rate: 0.24 }
    ],
    agency_fee_cap: 0.30
  },
  GH: {
    name: 'Ghana',
    currency: 'GHS',
    tax_rate: 0.25,
    social_security: 0.135,
    health_insurance: 0.025,
    ssnit: { employee: 0.055, employer: 0.13 },
    paye_brackets: [
      { up_to: 490, rate: 0 },
      { up_to: 730, rate: 0.05 },
      { up_to: 3660, rate: 0.10 },
      { up_to: 20000, rate: 0.175 },
      { up_to: 50000, rate: 0.25 },
      { above: 50000, rate: 0.30 }
    ],
    agency_fee_cap: 0.30
  },
  RW: {
    name: 'Rwanda',
    currency: 'RWF',
    tax_rate: 0.30,
    social_security: 0.08,
    health_insurance: 0.03,
    paye_brackets: [
      { up_to: 30000, rate: 0 },
      { up_to: 100000, rate: 0.20 },
      { above: 100000, rate: 0.30 }
    ],
    agency_fee_cap: 0.30
  }
};

export const calculateTax = (country: string, salary: number): any => {
  const config = CountryTaxConfig[country];
  if (!config) return { tax: 0, net: salary };
  
  let tax = 0;
  for (const bracket of config.paye_brackets) {
    if (bracket.up_to && salary <= bracket.up_to) {
      tax += salary * bracket.rate;
      break;
    } else if (bracket.up_to) {
      tax += bracket.up_to * bracket.rate;
      salary -= bracket.up_to;
    } else if (bracket.above) {
      tax += salary * bracket.rate;
    }
  }
  
  const social_security = salary * config.social_security;
  const health = salary * config.health_insurance;
  const total_deductions = tax + social_security + health;
  const net_salary = salary - total_deductions;
  
  return {
    gross: salary,
    tax,
    social_security,
    health,
    total_deductions,
    net: net_salary,
    effective_rate: total_deductions / salary
  };
};