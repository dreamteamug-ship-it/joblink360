// components/CountrySelector.tsx
'use client';

interface Country {
  name: string;
  code: string;
  currency: string;
}

const COUNTRIES: Country[] = [
  { name: "Kenya", code: "KE", currency: "KES" },
  { name: "Uganda", code: "UG", currency: "UGX" },
  { name: "Tanzania", code: "TZ", currency: "TZS" },
  { name: "Rwanda", code: "RW", currency: "RWF" },
  { name: "South Africa", code: "ZA", currency: "ZAR" }
];

export default function CountrySelector({ 
  selectedCountry, 
  onCountryChange 
}: { 
  selectedCountry: string; 
  onCountryChange: (code: string) => void;
}) {
  return (
    <div className="mb-4">
      <label className="block text-[#F5F5DC] text-sm font-bold mb-2">
        Select Country
      </label>
      <select
        value={selectedCountry}
        onChange={(e) => onCountryChange(e.target.value)}
        className="w-full p-3 rounded-lg bg-[#020202] text-[#F5F5DC] border border-[#C9A84C]/30"
      >
        <option value="">All Regions</option>
        {COUNTRIES.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name} ({country.code}) - {country.currency}
          </option>
        ))}
      </select>
    </div>
  );
}
