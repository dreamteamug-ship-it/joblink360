// lib/erp/agents/swarm.ts
export interface SwarmAgent {
  id: string;
  name: string;
  role: string;
  capabilities: string[];
  status: 'active' | 'busy' | 'idle';
  assignedTask?: string;
}

export class SwarmOrchestrator {
  private agents: SwarmAgent[] = [
    {
      id: 'agent-001',
      name: 'Amanda',
      role: 'Executive Director',
      capabilities: ['orchestration', 'strategy', 'decision-making'],
      status: 'active'
    },
    {
      id: 'agent-002',
      name: 'Atlas',
      role: 'Financial Analyst',
      capabilities: ['accounting', 'forecasting', 'budgeting'],
      status: 'idle'
    },
    {
      id: 'agent-003',
      name: 'Nia',
      role: 'HR Strategist',
      capabilities: ['recruitment', 'performance', 'culture'],
      status: 'idle'
    },
    {
      id: 'agent-004',
      name: 'Kofi',
      role: 'Sales Director',
      capabilities: ['crm', 'pipeline', 'closing'],
      status: 'idle'
    },
    {
      id: 'agent-005',
      name: 'Amina',
      role: 'Marketing Director',
      capabilities: ['campaigns', 'content', 'analytics'],
      status: 'idle'
    },
    {
      id: 'agent-006',
      name: 'Mosi',
      role: 'Supply Chain Manager',
      capabilities: ['inventory', 'logistics', 'demand'],
      status: 'idle'
    },
    {
      id: 'agent-007',
      name: 'Zuri',
      role: 'Project Director',
      capabilities: ['tasks', 'milestones', 'resources'],
      status: 'idle'
    },
    {
      id: 'agent-008',
      name: 'Jelani',
      role: 'Data Scientist',
      capabilities: ['analytics', 'insights', 'forecasting'],
      status: 'idle'
    }
  ];

  async delegateTask(task: string, targetRole?: string): Promise<string> {
    // Find appropriate agent based on task context
    const taskLower = task.toLowerCase();
    let targetAgent: SwarmAgent | undefined;

    if (taskLower.includes('finance') || taskLower.includes('account') || taskLower.includes('invoice')) {
      targetAgent = this.agents.find(a => a.role === 'Financial Analyst');
    } else if (taskLower.includes('hr') || taskLower.includes('employee') || taskLower.includes('recruit')) {
      targetAgent = this.agents.find(a => a.role === 'HR Strategist');
    } else if (taskLower.includes('sale') || taskLower.includes('crm') || taskLower.includes('lead')) {
      targetAgent = this.agents.find(a => a.role === 'Sales Director');
    } else if (taskLower.includes('market') || taskLower.includes('campaign')) {
      targetAgent = this.agents.find(a => a.role === 'Marketing Director');
    } else if (taskLower.includes('inventory') || taskLower.includes('supply')) {
      targetAgent = this.agents.find(a => a.role === 'Supply Chain Manager');
    } else if (taskLower.includes('project') || taskLower.includes('task')) {
      targetAgent = this.agents.find(a => a.role === 'Project Director');
    } else {
      targetAgent = this.agents.find(a => a.role === 'Data Scientist');
    }

    if (targetAgent) {
      targetAgent.status = 'busy';
      targetAgent.assignedTask = task;
      
      // Call OpenRouter for intelligent processing
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-chat',
          messages: [
            {
              role: 'system',
              content: `You are ${targetAgent.name}, the ${targetAgent.role} at JobLink 360. Provide expert advice on the following task.`
            },
            {
              role: 'user',
              content: task
            }
          ]
        })
      });

      const data = await response.json();
      targetAgent.status = 'idle';
      return data.choices[0].message.content;
    }

    return "No suitable agent found for this task.";
  }

  getAgents(): SwarmAgent[] {
    return this.agents;
  }

  getAgentStatus(agentId: string): SwarmAgent | undefined {
    return this.agents.find(a => a.id === agentId);
  }
}

export const swarmOrchestrator = new SwarmOrchestrator();
