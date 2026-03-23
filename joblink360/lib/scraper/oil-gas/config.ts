// lib/scraper/oil-gas/config.ts
export interface OilGasCountry {
  name: string;
  code: string;
  region: string;
  companies: string[];
  sources: {
    jobs: string[];
    tenders: string[];
    training: string[];
    infrastructure: string[];
    consultancy: string[];
  };
}

export const OIL_GAS_COUNTRIES: OilGasCountry[] = [
  {
    name: 'Nigeria',
    code: 'NG',
    region: 'West Africa',
    companies: ['NNPC', 'Shell', 'ExxonMobil', 'Chevron', 'TotalEnergies', 'Eni'],
    sources: {
      jobs: ['https://nnpcgroup.com/careers', 'https://www.shell.com.ng/careers'],
      tenders: ['https://nnpcgroup.com/tenders'],
      training: ['https://nnpcgroup.com/training'],
      infrastructure: ['https://nnpcgroup.com/projects'],
      consultancy: ['https://nnpcgroup.com/consultancy']
    }
  },
  {
    name: 'Angola',
    code: 'AO',
    region: 'Southern Africa',
    companies: ['Sonangol', 'TotalEnergies', 'Chevron', 'ExxonMobil', 'Eni'],
    sources: {
      jobs: ['https://sonangol.co.ao/carreiras'],
      tenders: ['https://sonangol.co.ao/licitacoes'],
      training: ['https://sonangol.co.ao/formacao'],
      infrastructure: ['https://sonangol.co.ao/projectos'],
      consultancy: ['https://sonangol.co.ao/consultoria']
    }
  },
  {
    name: 'South Sudan',
    code: 'SS',
    region: 'East Africa',
    companies: ['Nilepet', 'DPOC', 'GPOC', 'SPOC'],
    sources: {
      jobs: ['https://nilepet.gov.ss/careers'],
      tenders: ['https://nilepet.gov.ss/tenders'],
      training: ['https://nilepet.gov.ss/training'],
      infrastructure: ['https://nilepet.gov.ss/projects'],
      consultancy: ['https://nilepet.gov.ss/consultancy']
    }
  },
  {
    name: 'Uganda',
    code: 'UG',
    region: 'East Africa',
    companies: ['UNOC', 'TotalEnergies', 'Cnooc', 'Tullow Oil'],
    sources: {
      jobs: ['https://unoc.co.ug/careers'],
      tenders: ['https://unoc.co.ug/tenders'],
      training: ['https://unoc.co.ug/training'],
      infrastructure: ['https://unoc.co.ug/projects'],
      consultancy: ['https://unoc.co.ug/consultancy']
    }
  },
  {
    name: 'Tanzania',
    code: 'TZ',
    region: 'East Africa',
    companies: ['TPDC', 'Shell', 'Equinor', 'ExxonMobil'],
    sources: {
      jobs: ['https://tpdc.go.tz/ajira'],
      tenders: ['https://tpdc.go.tz/zabuni'],
      training: ['https://tpdc.go.tz/mafunzo'],
      infrastructure: ['https://tpdc.go.tz/miradi'],
      consultancy: ['https://tpdc.go.tz/ushauri']
    }
  },
  {
    name: 'Mozambique',
    code: 'MZ',
    region: 'Southern Africa',
    companies: ['ENH', 'TotalEnergies', 'ExxonMobil', 'Eni', 'Sasol'],
    sources: {
      jobs: ['https://enh.co.mz/carreiras'],
      tenders: ['https://enh.co.mz/licitacoes'],
      training: ['https://enh.co.mz/formacao'],
      infrastructure: ['https://enh.co.mz/projectos'],
      consultancy: ['https://enh.co.mz/consultoria']
    }
  },
  {
    name: 'Kenya',
    code: 'KE',
    region: 'East Africa',
    companies: ['NOCK', 'Tullow Oil', 'Africa Oil', 'TotalEnergies'],
    sources: {
      jobs: ['https://nock.co.ke/careers'],
      tenders: ['https://nock.co.ke/tenders'],
      training: ['https://nock.co.ke/training'],
      infrastructure: ['https://nock.co.ke/projects'],
      consultancy: ['https://nock.co.ke/consultancy']
    }
  },
  {
    name: 'Ghana',
    code: 'GH',
    region: 'West Africa',
    companies: ['GNPC', 'Tullow Oil', 'Kosmos Energy', 'Eni'],
    sources: {
      jobs: ['https://gnpcghana.com/careers'],
      tenders: ['https://gnpcghana.com/tenders'],
      training: ['https://gnpcghana.com/training'],
      infrastructure: ['https://gnpcghana.com/projects'],
      consultancy: ['https://gnpcghana.com/consultancy']
    }
  }
];

export const OPPORTUNITY_TYPES = [
  { id: 'job', label: 'Jobs', icon: '💼', color: 'blue' },
  { id: 'contract', label: 'Contracts', icon: '📄', color: 'purple' },
  { id: 'tender', label: 'Tenders', icon: '📋', color: 'orange' },
  { id: 'training', label: 'Training', icon: '🎓', color: 'green' },
  { id: 'capacity-building', label: 'Capacity Building', icon: '🏗️', color: 'teal' },
  { id: 'infrastructure', label: 'Infrastructure', icon: '🏭', color: 'red' },
  { id: 'consultancy', label: 'Consultancy', icon: '📊', color: 'indigo' }
];
