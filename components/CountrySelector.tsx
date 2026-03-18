'use client';
import { useState } from 'react';
import { COUNTRIES } from '@/lib/countries/data';

export default function CountrySelector({ onCountryChange, selectedCountry }) {
  const [isOpen, setIsOpen] = useState(false);

  const countries = Object.values(COUNTRIES);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
      >
        <span className="text-xl">
          {selectedCountry ? COUNTRIES[selectedCountry]?.code : '🌍'}
        </span>
        <span>{selectedCountry ? COUNTRIES[selectedCountry]?.name : 'All Africa'}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl border border-gray-700 z-50 max-h-96 overflow-y-auto">
          <button
            onClick={() => {
              onCountryChange('all');
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-3 hover:bg-gray-700 transition border-b border-gray-700"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🌍</span>
              <div>
                <div className="font-bold">All Africa</div>
                <div className="text-xs text-gray-400">26 Countries</div>
              </div>
            </div>
          </button>

          {countries.map(country => (
            <button
              key={country.code}
              onClick={() => {
                onCountryChange(country.code);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 hover:bg-gray-700 transition border-b border-gray-700 last:border-0"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{getFlag(country.code)}</span>
                <div>
                  <div className="font-bold">{country.name}</div>
                  <div className="text-xs text-gray-400">
                    {country.currency} • {country.phoneCode}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function getFlag(code: string): string {
  const flags = {
    KE: '🇰🇪', UG: '🇺🇬', TZ: '🇹🇿', RW: '🇷🇼', BI: '🇧🇮', SS: '🇸🇸', ET: '🇪🇹',
    ZA: '🇿🇦', ZM: '🇿🇲', ZW: '🇿🇼', MW: '🇲🇼', MZ: '🇲🇿', NA: '🇳🇦', BW: '🇧🇼',
    LS: '🇱🇸', SZ: '🇸🇿', MG: '🇲🇬', AO: '🇦🇴', CD: '🇨🇩', CG: '🇨🇬', CF: '🇨🇫',
    CM: '🇨🇲', TD: '🇹🇩', SC: '🇸🇨', MU: '🇲🇺', KM: '🇰🇲'
  };
  return flags[code] || '🌍';
}
