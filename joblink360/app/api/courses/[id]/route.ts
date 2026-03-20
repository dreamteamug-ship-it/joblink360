import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  const id = parseInt(params.id);
  const csvPath = path.join(process.cwd(), 'local/amanda/assets/knowledge_base/Continental_Demand.csv');
  
  try {
    const data = fs.readFileSync(csvPath, 'utf-8');
    const lines = data.split('\n').slice(1);
    const jobs = lines.map((line, idx) => {
      const [Job_Title, Region, Demand_Score, Primary_Skill] = line.split(',');
      return { 
        id: idx,
        Job_Title: Job_Title || 'AI Career Specialist',
        Region: Region || 'Africa',
        Demand_Score: parseInt(Demand_Score) || 85,
        Primary_Skill: Primary_Skill || 'AI & Digital Skills',
        price: 1500,
        description: `Master ${Job_Title || 'AI career skills'} for the ${Region || 'African'} market.`,
        skills: [`${Primary_Skill || 'AI'} Mastery`, 'Remote Work', 'Client Management']
      };
    }).filter(j => j.Job_Title);
    
    const course = jobs[id % jobs.length];
    return NextResponse.json(course);
  } catch {
    return NextResponse.json({ 
      Job_Title: 'AI Career Specialist', Region: 'Africa', Demand_Score: 85, price: 1500,
      description: 'Master AI skills for the African market.',
      skills: ['AI Mastery', 'Remote Work', 'Client Management']
    });
  }
}