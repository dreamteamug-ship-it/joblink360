export const calculateRegionalTax = (amount: number, countryCode: string) => {
  const taxRates: Record<string, number> = { "KE": 0.16, "UG": 0.18, "TZ": 0.18 };
  const rate = taxRates[countryCode] || 0.15;
  return amount * rate;
};
