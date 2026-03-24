export const getRegionalCompliance = (country: string) => {
  const matrix: any = { "KE": { vat: 0.16 }, "UG": { vat: 0.18 }, "TZ": { vat: 0.18 } };
  return matrix[country] || { vat: 0.15 };
};
