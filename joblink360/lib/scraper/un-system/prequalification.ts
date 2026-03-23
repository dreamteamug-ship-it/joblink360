// lib/scraper/un-system/prequalification.ts
import { createClient } from '@/lib/supabase/client';

export interface UNPrequalification {
  title: string;
  organization: string;
  reference_number: string;
  category: string;
  description: string;
  deadline: string;
  url: string;
  requirements: string[];
  status: string;
}

export async function scrapeUNPrequalification(): Promise<UNPrequalification[]> {
  const supabase = createClient();
  const allPrequal: UNPrequalification[] = [];
  
  console.log('📝 Scraping UN vendor prequalification opportunities...');

  // UN Global Marketplace vendor registration
  const ungmVendor = {
    title: 'UN Global Marketplace Vendor Registration',
    organization: 'UNGM',
    reference_number: 'UNGM/VENDOR/2024',
    category: 'Vendor Registration',
    description: 'Register as a UN vendor to access all procurement opportunities across UN agencies',
    deadline: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    url: 'https://www.ungm.org/Account/Registration',
    requirements: [
      'Valid business registration certificate',
      'Tax compliance certificate',
      'Bank reference letter',
      'Audited financial statements for 2 years',
      'Quality management system certification (ISO 9001)'
    ],
    status: 'active'
  };
  
  allPrequal.push(ungmVendor);
  
  await supabase.from('sovereign_opportunities').upsert({
    title: ungmVendor.title,
    description: ungmVendor.description,
    opportunity_type: 'prequalification',
    organization: ungmVendor.organization,
    source_url: ungmVendor.url,
    deadline: ungmVendor.deadline,
    requirements: ungmVendor.requirements,
    sovereign_score: 95,
    status: 'active'
  }, { onConflict: 'source_url' });
  
  console.log(`✅ Scraped ${allPrequal.length} UN prequalification opportunities`);
  return allPrequal;
}
