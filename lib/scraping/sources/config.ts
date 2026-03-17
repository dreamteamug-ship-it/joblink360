// lib/scraping/sources/international-jobs.ts
export interface JobSource {
  name: string;
  url: string;
  region: string;
  scrapeFunction: (page: any) => Promise<any[]>;
}

export const INTERNATIONAL_JOB_SOURCES = [
  {
    name: "UN Jobs",
    url: "https:// unjobs.org",
    region: "Global",
    frequency: "hourly"
  },
  {
    name: "DevNet Jobs",
    url: "https://www.devnetjobs.org",
    region: "Africa",
    frequency: "daily"
  },
  {
    name: "Africa Jobs",
    url: "https://www.africajob.com",
    region: "Africa", 
    frequency: "daily"
  },
  {
    name: "ReliefWeb",
    url: "https://reliefweb.int/jobs",
    region: "Global",
    frequency: "hourly"
  },
  {
    name: "Idealist",
    url: "https://www.idealist.org",
    region: "Global",
    frequency: "daily"
  },
  {
    name: "LinkedIn International",
    url: "https://www.linkedin.com/jobs/search",
    region: "Global",
    frequency: "hourly"
  }
];

export interface TenderSource {
  name: string;
  url: string;
  region: string;
  scrapeFunction: (page: any) => Promise<any[]>;
}

export const TENDER_SOURCES = [
  {
    name: "UN Tender Portal",
    url: "https://procurement-notices.unops.org",
    region: "Global",
    frequency: "hourly"
  },
  {
    name: "Africa Tender Board",
    url: "https://africatender.com",
    region: "Africa",
    frequency: "daily"
  },
  {
    name: "DevNet Tenders",
    url: "https://www.devnetjobs.org/tenders",
    region: "Africa",
    frequency: "daily"
  },
  {
    name: "EU Tender Portal",
    url: "https://ted.europa.eu",
    region: "Europe/Africa",
    frequency: "daily"
  },
  {
    name: "World Bank Contracts",
    url: "https://projects.worldbank.org",
    region: "Global",
    frequency: "daily"
  }
];

export interface FundingSource {
  name: string;
  url: string;
  region: string;
  scrapeFunction: (page: any) => Promise<any[]>;
}

export const FUNDING_SOURCES = [
  {
    name: "UN Funding Opportunities",
    url: "https://unsdg.un.org/resources",
    region: "Global",
    frequency: "daily"
  },
  {
    name: "Africa Grant Hub",
    url: "https://africagrantshub.org",
    region: "Africa",
    frequency: "daily"
  },
  {
    name: "DevNet Funding",
    url: "https://www.devnetjobs.org/funding",
    region: "Africa",
    frequency: "daily"
  },
  {
    name: "EU Development Funding",
    url: "https://ec.europa.eu/europeaid",
    region: "Europe/Africa",
    frequency: "daily"
  },
  {
    name: "World Bank Grants",
    url: "https://www.worldbank.org/grants",
    region: "Global",
    frequency: "daily"
  }
];
