// lib/shop/countries.ts
export interface AfricanCountry {
  code: string;
  name: string;
  currency: string;
  currencyCode: string;
  currencySymbol: string;
  exchangeRate: number; // Rate to USD
  paymentMethods: string[];
  region: 'EAC' | 'SADC' | 'ECOWAS' | 'Other';
  mobileMoneyProviders?: string[];
}

export const AFRICAN_COUNTRIES: AfricanCountry[] = [
  // East African Community (EAC) - 7 countries
  { code: 'KE', name: 'Kenya', currency: 'Kenyan Shilling', currencyCode: 'KES', currencySymbol: 'KSh', exchangeRate: 129.50, region: 'EAC', paymentMethods: ['mpesa', 'cards', 'paypal', 'stripe'], mobileMoneyProviders: ['M-Pesa', 'Airtel Money'] },
  { code: 'UG', name: 'Uganda', currency: 'Ugandan Shilling', currencyCode: 'UGX', currencySymbol: 'USh', exchangeRate: 3780.00, region: 'EAC', paymentMethods: ['mpesa', 'cards', 'paypal'], mobileMoneyProviders: ['M-Pesa', 'Airtel Money'] },
  { code: 'TZ', name: 'Tanzania', currency: 'Tanzanian Shilling', currencyCode: 'TZS', currencySymbol: 'TSh', exchangeRate: 2600.00, region: 'EAC', paymentMethods: ['mpesa', 'cards', 'paypal'], mobileMoneyProviders: ['M-Pesa', 'Tigo Pesa', 'Airtel Money'] },
  { code: 'RW', name: 'Rwanda', currency: 'Rwandan Franc', currencyCode: 'RWF', currencySymbol: 'FRw', exchangeRate: 1320.00, region: 'EAC', paymentMethods: ['mobile_money', 'cards'], mobileMoneyProviders: ['MTN Mobile Money', 'Airtel Money'] },
  { code: 'BI', name: 'Burundi', currency: 'Burundian Franc', currencyCode: 'BIF', currencySymbol: 'FBu', exchangeRate: 2850.00, region: 'EAC', paymentMethods: ['mobile_money', 'cards'] },
  { code: 'SS', name: 'South Sudan', currency: 'South Sudanese Pound', currencyCode: 'SSP', currencySymbol: '£', exchangeRate: 650.00, region: 'EAC', paymentMethods: ['mobile_money'] },
  { code: 'CD', name: 'DR Congo', currency: 'Congolese Franc', currencyCode: 'CDF', currencySymbol: 'FC', exchangeRate: 2800.00, region: 'EAC', paymentMethods: ['mobile_money', 'cards'] },
  
  // SADC Countries - 16 countries
  { code: 'ZA', name: 'South Africa', currency: 'South African Rand', currencyCode: 'ZAR', currencySymbol: 'R', exchangeRate: 18.50, region: 'SADC', paymentMethods: ['cards', 'paypal', 'stripe', 'mobile_money'], mobileMoneyProviders: ['M-Pesa', 'Ozow'] },
  { code: 'NA', name: 'Namibia', currency: 'Namibian Dollar', currencyCode: 'NAD', currencySymbol: 'N$', exchangeRate: 18.50, region: 'SADC', paymentMethods: ['cards', 'paypal', 'mobile_money'] },
  { code: 'BW', name: 'Botswana', currency: 'Botswana Pula', currencyCode: 'BWP', currencySymbol: 'P', exchangeRate: 13.50, region: 'SADC', paymentMethods: ['cards', 'mobile_money'] },
  { code: 'ZW', name: 'Zimbabwe', currency: 'ZiG', currencyCode: 'ZIG', currencySymbol: 'ZiG', exchangeRate: 13.80, region: 'SADC', paymentMethods: ['mobile_money', 'cards', 'paypal'], mobileMoneyProviders: ['EcoCash', 'OneMoney'] },
  { code: 'ZM', name: 'Zambia', currency: 'Zambian Kwacha', currencyCode: 'ZMW', currencySymbol: 'ZK', exchangeRate: 24.00, region: 'SADC', paymentMethods: ['mobile_money', 'cards'], mobileMoneyProviders: ['Airtel Money', 'MTN Mobile'] },
  { code: 'MW', name: 'Malawi', currency: 'Malawian Kwacha', currencyCode: 'MWK', currencySymbol: 'MK', exchangeRate: 1700.00, region: 'SADC', paymentMethods: ['mobile_money', 'cards'] },
  { code: 'MZ', name: 'Mozambique', currency: 'Mozambican Metical', currencyCode: 'MZN', currencySymbol: 'MT', exchangeRate: 64.00, region: 'SADC', paymentMethods: ['mobile_money', 'cards'], mobileMoneyProviders: ['M-Pesa', 'E-Mola'] },
  { code: 'AO', name: 'Angola', currency: 'Angolan Kwanza', currencyCode: 'AOA', currencySymbol: 'Kz', exchangeRate: 830.00, region: 'SADC', paymentMethods: ['mobile_money', 'cards'] },
  { code: 'MG', name: 'Madagascar', currency: 'Malagasy Ariary', currencyCode: 'MGA', currencySymbol: 'Ar', exchangeRate: 4500.00, region: 'SADC', paymentMethods: ['mobile_money'] },
  { code: 'MU', name: 'Mauritius', currency: 'Mauritian Rupee', currencyCode: 'MUR', currencySymbol: '?', exchangeRate: 46.00, region: 'SADC', paymentMethods: ['cards', 'paypal', 'stripe'] },
  { code: 'SZ', name: 'Eswatini', currency: 'Lilangeni', currencyCode: 'SZL', currencySymbol: 'E', exchangeRate: 18.50, region: 'SADC', paymentMethods: ['cards', 'mobile_money'] },
  { code: 'LS', name: 'Lesotho', currency: 'Lesotho Loti', currencyCode: 'LSL', currencySymbol: 'L', exchangeRate: 18.50, region: 'SADC', paymentMethods: ['cards', 'mobile_money'] },
  { code: 'SC', name: 'Seychelles', currency: 'Seychellois Rupee', currencyCode: 'SCR', currencySymbol: '?', exchangeRate: 13.50, region: 'SADC', paymentMethods: ['cards', 'paypal'] },
  { code: 'KM', name: 'Comoros', currency: 'Comorian Franc', currencyCode: 'KMF', currencySymbol: 'CF', exchangeRate: 450.00, region: 'SADC', paymentMethods: ['mobile_money'] },
  { code: 'YT', name: 'Mayotte', currency: 'Euro', currencyCode: 'EUR', currencySymbol: '€', exchangeRate: 0.92, region: 'SADC', paymentMethods: ['cards', 'paypal'] },
  { code: 'RE', name: 'Réunion', currency: 'Euro', currencyCode: 'EUR', currencySymbol: '€', exchangeRate: 0.92, region: 'SADC', paymentMethods: ['cards', 'paypal'] },
  
  // Additional African countries
  { code: 'NG', name: 'Nigeria', currency: 'Nigerian Naira', currencyCode: 'NGN', currencySymbol: '?', exchangeRate: 1500.00, region: 'ECOWAS', paymentMethods: ['cards', 'paypal', 'mobile_money'], mobileMoneyProviders: ['Paga', 'Opay'] },
  { code: 'GH', name: 'Ghana', currency: 'Ghanaian Cedi', currencyCode: 'GHS', currencySymbol: '?', exchangeRate: 12.50, region: 'ECOWAS', paymentMethods: ['mobile_money', 'cards'], mobileMoneyProviders: ['MTN Mobile Money', 'Vodafone Cash'] },
  { code: 'EG', name: 'Egypt', currency: 'Egyptian Pound', currencyCode: 'EGP', currencySymbol: 'E£', exchangeRate: 48.00, region: 'Other', paymentMethods: ['cards', 'paypal'] }
];

export const getCountryByCode = (code: string) => AFRICAN_COUNTRIES.find(c => c.code === code);
export const getCountriesByRegion = (region: string) => AFRICAN_COUNTRIES.filter(c => c.region === region);
export const getExchangeRate = (fromCurrency: string, toCurrency: string, amount: number) => {
  const fromCountry = AFRICAN_COUNTRIES.find(c => c.currencyCode === fromCurrency);
  const toCountry = AFRICAN_COUNTRIES.find(c => c.currencyCode === toCurrency);
  if (!fromCountry || !toCountry) return amount;
  const usdAmount = amount / fromCountry.exchangeRate;
  return usdAmount * toCountry.exchangeRate;
};

export const formatPrice = (amount: number, currencyCode: string) => {
  const country = AFRICAN_COUNTRIES.find(c => c.currencyCode === currencyCode);
  if (!country) return `$${amount.toFixed(2)}`;
  return `${country.currencySymbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
