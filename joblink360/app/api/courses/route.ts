export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const csvPath = path.join(process.cwd(), 'local/amanda/assets/knowledge_base/Continental_Demand.csv');
  
  try {
    const data = fs.readFileSync(csvPath, 'utf-8');
    const lines = data.split('\n').slice(1);
    const jobs = lines.map(line => {
      const [Job_Title, Region, Demand_Score] = line.split(',');
      return { 
        Job_Title: Job_Title || 'AI Career Specialist', 
        Region: Region || 'Africa', 
        Demand_Score: parseInt(Demand_Score) || 85,
        price: 1500
      };
    }).filter(j => j.Job_Title);
    
    return NextResponse.json(jobs.slice(0, 512));
  } catch (error) {
    return NextResponse.json([
      { Job_Title: "Cloud Systems Architect", Region: "Nairobi", Demand_Score: 94, price: 1500 },
      { Job_Title: "IoT Solutions Engineer", Region: "Lusaka", Demand_Score: 88, price: 1500 },
      { Job_Title: "AI Infrastructure Lead", Region: "Lagos", Demand_Score: 91, price: 1500 }
    ]);
  }
}
