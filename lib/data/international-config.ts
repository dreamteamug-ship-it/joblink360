// lib/data/international-config.ts
export interface InternationalConfig {
  region: string;
  countries: string[];
  jobPortals: string[];
  visaTypes: string[];
  languageRequirements: string[];
  popularSectors: string[];
  averageSalary: string;
  culturalNotes: string[];
}

export const INTERNATIONAL_OPPORTUNITIES: Record<string, InternationalConfig> = {
  UAE: {
    region: "Middle East",
    countries: ["UAE", "Dubai", "Abu Dhabi"],
    jobPortals: ["Bayt.com", "GulfTalent", "LinkedIn UAE"],
    visaTypes: ["Employment Visa", "Golden Visa", "Freelance Visa"],
    languageRequirements: ["English", "Arabic"],
    popularSectors: ["Oil & Gas", "Finance", "Tech", "Construction"],
    averageSalary: "AED 15,000-25,000/month",
    culturalNotes: ["Respect Islamic culture", "Weekend is Friday-Saturday"]
  },
  UK: {
    region: "Europe",
    countries: ["United Kingdom", "England", "Scotland"],
    jobPortals: ["Indeed UK", "Reed.co.uk", "LinkedIn UK"],
    visaTypes: ["Skilled Worker Visa", "Global Talent Visa", "Graduate Visa"],
    languageRequirements: ["English"],
    popularSectors: ["Finance", "Tech", "Healthcare", "Education"],
    averageSalary: "£30,000-50,000/year",
    culturalNotes: ["Punctuality valued", "Regional accents"]
  },
  Germany: {
    region: "Europe",
    countries: ["Germany", "Berlin", "Munich"],
    jobPortals: ["StepStone.de", "Indeed Germany", "LinkedIn Germany"],
    visaTypes: ["EU Blue Card", "Job Seeker Visa", "Skilled Workers Visa"],
    languageRequirements: ["German (B1)", "English"],
    popularSectors: ["Engineering", "Tech", "Renewable Energy"],
    averageSalary: "€45,000-65,000/year",
    culturalNotes: ["Formal addressing", "Direct communication"]
  },
  USA: {
    region: "North America",
    countries: ["USA", "New York", "California"],
    jobPortals: ["Indeed.com", "LinkedIn USA", "Glassdoor"],
    visaTypes: ["H-1B Visa", "L-1 Visa", "O-1 Visa"],
    languageRequirements: ["English"],
    popularSectors: ["Tech", "Healthcare", "Finance"],
    averageSalary: "$60,000-90,000/year",
    culturalNotes: ["Individualistic", "Direct communication"]
  },
  Canada: {
    region: "North America",
    countries: ["Canada", "Toronto", "Vancouver"],
    jobPortals: ["Indeed Canada", "LinkedIn Canada", "JobBank"],
    visaTypes: ["Express Entry", "PNP", "Global Talent Stream"],
    languageRequirements: ["English", "French"],
    popularSectors: ["Tech", "Natural Resources", "Healthcare"],
    averageSalary: "CAD 55,000-80,000/year",
    culturalNotes: ["Multicultural", "Polite and friendly"]
  },
  Remote: {
    region: "Global Remote",
    countries: ["Worldwide"],
    jobPortals: ["RemoteOK", "WeWorkRemotely", "Upwork"],
    visaTypes: ["Digital Nomad Visa", "Freelance"],
    languageRequirements: ["English"],
    popularSectors: ["Tech", "Design", "Marketing"],
    averageSalary: "Varies",
    culturalNotes: ["Time zone flexibility", "Self-discipline"]
  }
};

export const INTERNATIONAL_REGIONS = ["Middle East", "Europe", "North America", "Global Remote"];
