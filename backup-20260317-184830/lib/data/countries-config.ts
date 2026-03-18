// lib/data/countries-config.ts
export interface CountryConfig {
  name: string;
  code: string;
  currency: string;
  languages: string[];
  jobPortals: string[];
  fundingSources: string[];
  regulations: string[];
  culturalNotes: string[];
}

export const EAST_AFRICA_SADC_COUNTRIES: CountryConfig[] = [
  // East Africa (7 countries)
  {
    name: "Kenya",
    code: "KE",
    currency: "KES",
    languages: ["English", "Swahili"],
    jobPortals: ["BrighterMonday", "Fuzu", "LinkedIn Kenya"],
    fundingSources: ["Uwezo Fund", "Women Enterprise Fund", "Youth Enterprise Development Fund"],
    regulations: ["Employment Act", "Registration of Business Names Act"],
    culturalNotes: ["Value punctuality", "Respect for hierarchy", "Importance of personal relationships in business"]
  },
  {
    name: "Uganda",
    code: "UG",
    currency: "UGX",
    languages: ["English", "Swahili"],
    jobPortals: ["JobNet", "BrighterMonday Uganda", "LinkedIn Uganda"],
    fundingSources: ["Youth Livelihood Support Fund", "Women Guarantee Fund"],
    regulations: ["Employment Act", "Companies Act"],
    culturalNotes: ["Strong community ties", "Respect for elders", "Value personal relationships"]
  },
  {
    name: "Tanzania",
    code: "TZ",
    currency: "TZS",
    languages: ["Swahili", "English"],
    jobPortals: ["Mwananchi Jobs", "BrighterMonday Tanzania", "LinkedIn Tanzania"],
    fundingSources: ["Youth Employment Fund", "Women Development Fund"],
    regulations: ["Employment and Labour Relations Act", "Business Registration and Licensing Act"],
    culturalNotes: ["Value community harmony", "Respect for authority", "Importance of group decision-making"]
  },
  {
    name: "Rwanda",
    code: "RW",
    currency: "RWF",
    languages: ["Kinyarwanda", "English", "French"],
    jobPortals: ["RwandaJobs", "BrighterMonday Rwanda", "LinkedIn Rwanda"],
    fundingSources: ["Agaciro Development Fund", "Youth Opportunities Fund"],
    regulations: ["Labour Law", "Company Law"],
    culturalNotes: ["Value cleanliness and organization", "Respect for rules", "Community service culture"]
  },
  {
    name: "Burundi",
    code: "BI",
    currency: "BIF",
    languages: ["Kirundi", "French"],
    jobPortals: ["Emploi.bi", "LinkedIn Burundi"],
    fundingSources: ["National Solidarity Fund", "Microfinance Institutions"],
    regulations: ["Labour Code", "Commercial Code"],
    culturalNotes: ["Strong family bonds", "Respect for elders", "Community solidarity"]
  },
  {
    name: "South Sudan",
    code: "SS",
    currency: "SSP",
    languages: ["English", "Arabic", "Dinka"],
    jobPortals: ["SSNDD", "LinkedIn South Sudan"],
    fundingSources: ["Youth Empowerment Fund", "Women Economic Empowerment Program"],
    regulations: ["Labour Act", "Companies Act"],
    culturalNotes: ["Value tribal affiliations", "Respect for traditional leaders", "Importance of reconciliation"]
  },
  {
    name: "Ethiopia",
    code: "ET",
    currency: "ETB",
    languages: ["Amharic", "English", "Oromo"],
    jobPortals: ["Ethiopian Jobs", "LinkedIn Ethiopia"],
    fundingSources: ["Development Bank of Ethiopia", "Women Development Fund"],
    regulations: ["Labour Proclamation", "Commercial Code"],
    culturalNotes: ["Value respect for age", "Importance of coffee ceremony", "Strong religious influences"]
  },

  // SADC Countries (19 additional countries)
  {
    name: "South Africa",
    code: "ZA",
    currency: "ZAR",
    languages: ["English", "Afrikaans", "Zulu", "Xhosa"],
    jobPortals: ["Indeed SA", "LinkedIn South Africa", "PNet"],
    fundingSources: ["SEFA", "Industrial Development Corporation", "Small Enterprise Development Fund"],
    regulations: ["Basic Conditions of Employment Act", "Companies Act"],
    culturalNotes: ["Diverse cultural landscape", "Value transformation and inclusion", "Multiple language considerations"]
  },
  {
    name: "Zambia",
    code: "ZM",
    currency: "ZMW",
    languages: ["English", "Bemba", "Nyanja"],
    jobPortals: ["Zambian Jobs", "LinkedIn Zambia"],
    fundingSources: ["Youth Empowerment Fund", "Women's Microfinance Programme"],
    regulations: ["Employment Act", "Companies Act"],
    culturalNotes: ["Value respect for authority", "Importance of family", "Community-oriented"]
  },
  {
    name: "Zimbabwe",
    code: "ZW",
    currency: "ZWL",
    languages: ["English", "Shona", "Ndebele"],
    jobPortals: ["ZimJobs", "LinkedIn Zimbabwe"],
    fundingSources: ["Youth Empowerment Fund", "Women's Development Fund"],
    regulations: ["Labour Act", "Companies Act"],
    culturalNotes: ["Value education", "Respect for elders", "Importance of extended family"]
  },
  {
    name: "Malawi",
    code: "MW",
    currency: "MWK",
    languages: ["English", "Chichewa"],
    jobPortals: ["JobsMalawi", "LinkedIn Malawi"],
    fundingSources: ["Youth Empowerment Fund", "Women's Development Fund"],
    regulations: ["Employment Act", "Companies Act"],
    culturalNotes: ["Value hospitality", "Importance of family", "Respect for traditional leaders"]
  },
  {
    name: "Mozambique",
    code: "MZ",
    currency: "MZN",
    languages: ["Portuguese", "Makhuwa", "Tsonga"],
    jobPortals: ["Emprego.co.mz", "LinkedIn Mozambique"],
    fundingSources: ["Youth Employment Program", "Women's Economic Empowerment"],
    regulations: ["Labour Law", "Commercial Code"],
    culturalNotes: ["Value community", "Importance of music and dance", "Respect for ancestors"]
  },
  {
    name: "Namibia",
    code: "NA",
    currency: "NAD",
    languages: ["English", "Afrikaans", "German"],
    jobPortals: ["JobsNamibia", "LinkedIn Namibia"],
    fundingSources: ["Youth Employment Scheme", "Women's Development Fund"],
    regulations: ["Labour Act", "Companies Act"],
    culturalNotes: ["Value conservation", "Importance of land rights", "Multicultural society"]
  },
  {
    name: "Botswana",
    code: "BW",
    currency: "BWP",
    languages: ["English", "Setswana"],
    jobPortals: ["Jobs.co.bw", "LinkedIn Botswana"],
    fundingSources: ["Youth Development Fund", "Women's Enterprise Development"],
    regulations: ["Employment Act", "Companies Act"],
    culturalNotes: ["Value respect for law", "Importance of cattle", "Community-based decision making"]
  },
  {
    name: "Lesotho",
    code: "LS",
    currency: "LSL",
    languages: ["Sesotho", "English"],
    jobPortals: ["JobsLesotho", "LinkedIn Lesotho"],
    fundingSources: ["Youth Employment Fund", "Women's Development Fund"],
    regulations: ["Labour Code", "Companies Act"],
    culturalNotes: ["Value traditional clothing", "Importance of mountains", "Strong Christian influence"]
  },
  {
    name: "Eswatini",
    code: "SZ",
    currency: "SZL",
    languages: ["siSwati", "English"],
    jobPortals: ["JobsEswatini", "LinkedIn Eswatini"],
    fundingSources: ["Youth Development Fund", "Women's Empowerment Fund"],
    regulations: ["Employment Act", "Companies Act"],
    culturalNotes: ["Value traditional monarchy", "Importance of cultural ceremonies", "Strong family structures"]
  },
  {
    name: "Madagascar",
    code: "MG",
    currency: "MGA",
    languages: ["Malagasy", "French"],
    jobPortals: ["MadaJob", "LinkedIn Madagascar"],
    fundingSources: ["Youth Employment Program", "Women's Economic Empowerment"],
    regulations: ["Labour Code", "Commercial Code"],
    culturalNotes: ["Value respect for ancestors", "Importance of rice cultivation", "Strong family ties"]
  },
  {
    name: "Angola",
    code: "AO",
    currency: "AOA",
    languages: ["Portuguese", "Kikongo", "Kimbanda"],
    jobPortals: ["JobsAngola", "LinkedIn Angola"],
    fundingSources: ["Youth Employment Fund", "Women's Development Fund"],
    regulations: ["Labour Law", "Commercial Code"],
    culturalNotes: ["Value family connections", "Importance of Portuguese language", "Respect for traditional leaders"]
  },
  {
    name: "Democratic Republic of Congo",
    code: "CD",
    currency: "CDF",
    languages: ["French", "Lingala", "Kikongo"],
    jobPortals: ["JobsCD", "LinkedIn DRC"],
    fundingSources: ["Youth Employment Program", "Women's Economic Empowerment"],
    regulations: ["Labour Code", "Commercial Code"],
    culturalNotes: ["Value community solidarity", "Importance of music", "Respect for traditional authorities"]
  },
  {
    name: "Republic of Congo",
    code: "CG",
    currency: "XAF",
    languages: ["French", "Lingala", "Kituba"],
    jobPortals: ["JobsCongo", "LinkedIn Congo"],
    fundingSources: ["Youth Employment Fund", "Women's Development Fund"],
    regulations: ["Labour Code", "Commercial Code"],
    culturalNotes: ["Value respect for elders", "Importance of music and dance", "Community-oriented"]
  },
  {
    name: "Central African Republic",
    code: "CF",
    currency: "XAF",
    languages: ["Sango", "French"],
    jobPortals: ["JobsCAR", "LinkedIn CAR"],
    fundingSources: ["Youth Employment Program", "Women's Economic Empowerment"],
    regulations: ["Labour Code", "Commercial Code"],
    culturalNotes: ["Value community harmony", "Importance of traditional leadership", "Respect for elders"]
  },
  {
    name: "Cameroon",
    code: "CM",
    currency: "XAF",
    languages: ["French", "English", "Fang"],
    jobPortals: ["JobsCameroon", "LinkedIn Cameroon"],
    fundingSources: ["Youth Employment Fund", "Women's Development Fund"],
    regulations: ["Labour Code", "Commercial Code"],
    culturalNotes: ["Value bilingualism", "Importance of traditional festivals", "Respect for authority"]
  },
  {
    name: "Chad",
    code: "TD",
    currency: "XAF",
    languages: ["French", "Arabic", "Sara"],
    jobPortals: ["JobsChad", "LinkedIn Chad"],
    fundingSources: ["Youth Employment Program", "Women's Economic Empowerment"],
    regulations: ["Labour Code", "Commercial Code"],
    culturalNotes: ["Value respect for traditional leaders", "Importance of livestock", "Community solidarity"]
  },
  {
    name: "Seychelles",
    code: "SC",
    currency: "SCR",
    languages: ["English", "French", "Seychellois Creole"],
    jobPortals: ["JobsSeychelles", "LinkedIn Seychelles"],
    fundingSources: ["Youth Development Fund", "Women's Empowerment Fund"],
    regulations: ["Employment Act", "Companies Act"],
    culturalNotes: ["Value environmental conservation", "Importance of tourism", "Multicultural society"]
  },
  {
    name: "Mauritius",
    code: "MU",
    currency: "MUR",
    languages: ["English", "French", "Mauritian Creole"],
    jobPortals: ["JobsMauritius", "LinkedIn Mauritius"],
    fundingSources: ["Youth Employment Fund", "Women's Development Fund"],
    regulations: ["Employment Rights Act", "Companies Act"],
    culturalNotes: ["Value multicultural harmony", "Importance of education", "Strong financial sector"]
  },
  {
    name: "Comoros",
    code: "KM",
    currency: "KMF",
    languages: ["Comorian", "Arabic", "French"],
    jobPortals: ["JobsComoros", "LinkedIn Comoros"],
    fundingSources: ["Youth Employment Program", "Women's Economic Empowerment"],
    regulations: ["Labour Code", "Commercial Code"],
    culturalNotes: ["Value Islamic traditions", "Importance of family", "Strong community bonds"]
  }
];

export const getAllCountryCodes = (): string[] => {
  return EAST_AFRICA_SADC_COUNTRIES.map(country => country.code);
};

export const getCountryByCode = (code: string): CountryConfig | undefined => {
  return EAST_AFRICA_SADC_COUNTRIES.find(country => country.code === code);
};
