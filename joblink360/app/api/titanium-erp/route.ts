import { NextResponse } from 'next/server';
import { swarmOrchestrator } from '@/lib/erp/agents/swarm';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  // Return ERP metrics and agent status
  const agents = swarmOrchestrator.getAgents();
  
  return NextResponse.json({
    agents: agents.map(a => ({ name: a.name, role: a.role, status: a.status })),
    metrics: {
      revenue: 124500,
      students: 1247,
      activeProjects: 12,
      aiTasks: 345
    }
  });
}

export async function POST(request: Request) {
  try {
    const { task, targetRole } = await request.json();
    
    if (!task) {
      return NextResponse.json({ error: 'Task is required' }, { status: 400 });
    }
    
    const result = await swarmOrchestrator.delegateTask(task, targetRole);
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process task' }, { status: 500 });
  }
}
