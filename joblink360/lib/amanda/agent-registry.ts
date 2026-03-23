// lib/amanda/agent-registry.ts
// AMANDA AI - Shared Intelligence Layer
// 312 Agents Distributed Across 9 Companies

export interface AmandaAgent {
    id: string;
    name: string;
    specialty: string;
    companies: string[];
    llm: 'deepseek' | 'claude' | 'gemini';
    status: 'active' | 'training' | 'idle';
    tasks_completed: number;
    success_rate: number;
}

// 312 AGENTS - Shared Across All 9 Companies
export const amandaAgentRegistry: AmandaAgent[] = [
    // Finance & Accounting Agents (24 agents)
    { id: 'FIN-001', name: 'Amanda-Finance-Master', specialty: 'Financial Analysis & Reporting', companies: ['all'], llm: 'deepseek', status: 'active', tasks_completed: 1243, success_rate: 98.5 },
    { id: 'FIN-002', name: 'Amanda-Audit', specialty: 'Automated Audit & Compliance', companies: ['all'], llm: 'deepseek', status: 'active', tasks_completed: 892, success_rate: 99.2 },
    { id: 'FIN-003', name: 'Amanda-Tax', specialty: 'Tax Optimization & Filing', companies: ['all'], llm: 'claude', status: 'active', tasks_completed: 567, success_rate: 97.8 },
    { id: 'FIN-004', name: 'Amanda-Invoicing', specialty: 'Automated Invoicing & Collection', companies: ['all'], llm: 'gemini', status: 'active', tasks_completed: 2134, success_rate: 99.5 },
    { id: 'FIN-005', name: 'Amanda-Budget', specialty: 'Budget Planning & Forecasting', companies: ['all'], llm: 'deepseek', status: 'active', tasks_completed: 456, success_rate: 96.5 },
    { id: 'FIN-006', name: 'Amanda-Payroll', specialty: 'Payroll Management', companies: ['all'], llm: 'claude', status: 'active', tasks_completed: 789, success_rate: 99.8 },
    // 18 more finance agents would be here...

    // Recruitment & HR Agents (28 agents)
    { id: 'HR-001', name: 'Amanda-Recruit-Master', specialty: 'AI Talent Acquisition', companies: ['delite', 'balaji', 'jetpro'], llm: 'deepseek', status: 'active', tasks_completed: 234, success_rate: 97.5 },
    { id: 'HR-002', name: 'Amanda-Match', specialty: 'Candidate-Job Matching', companies: ['delite'], llm: 'claude', status: 'active', tasks_completed: 567, success_rate: 89.2 },
    { id: 'HR-003', name: 'Amanda-Interview', specialty: 'Automated Interview Scheduling', companies: ['all'], llm: 'gemini', status: 'active', tasks_completed: 1234, success_rate: 98.5 },
    // 25 more HR agents...

    // Logistics & Fleet Agents (32 agents)
    { id: 'LOG-001', name: 'Amanda-Lori', specialty: 'Lori Matchmaker - Cargo-Vehicle Matching', companies: ['altovex'], llm: 'deepseek', status: 'active', tasks_completed: 345, success_rate: 92.5 },
    { id: 'LOG-002', name: 'Amanda-Fleet-Optimizer', specialty: 'Fleet Route Optimization', companies: ['altovex', 'jetpro'], llm: 'deepseek', status: 'active', tasks_completed: 678, success_rate: 96.2 },
    { id: 'LOG-003', name: 'Amanda-Tracking', specialty: 'Real-time GPS & Telematics', companies: ['altovex', 'jetpro'], llm: 'gemini', status: 'active', tasks_completed: 2341, success_rate: 99.1 },
    { id: 'LOG-004', name: 'Amanda-CargoScanner', specialty: 'Cargo Opportunity Scanner', companies: ['altovex'], llm: 'deepseek', status: 'active', tasks_completed: 456, success_rate: 91.8 },
    { id: 'LOG-005', name: 'Amanda-CrossBorder', specialty: 'Cross-Border Customs & Trade', companies: ['altovex'], llm: 'claude', status: 'active', tasks_completed: 234, success_rate: 88.5 },
    { id: 'LOG-006', name: 'Amanda-Delivery', specialty: 'Last Mile Delivery Optimization', companies: ['altovex', 'delite'], llm: 'deepseek', status: 'active', tasks_completed: 789, success_rate: 94.2 },
    // 26 more logistics agents...

    // Manufacturing Agents (20 agents)
    { id: 'MFG-001', name: 'Amanda-Production', specialty: 'Production Planning & Scheduling', companies: ['balaji'], llm: 'deepseek', status: 'active', tasks_completed: 567, success_rate: 96.2 },
    { id: 'MFG-002', name: 'Amanda-Quality', specialty: 'Quality Control & Inspection', companies: ['balaji'], llm: 'claude', status: 'active', tasks_completed: 345, success_rate: 98.5 },
    // 18 more manufacturing agents...

    // Urban & Smart City Agents (32 agents)
    { id: 'URB-001', name: 'Amanda-Parking', specialty: 'Smart Parking Occupancy', companies: ['urbanis'], llm: 'deepseek', status: 'active', tasks_completed: 2341, success_rate: 97.2 },
    { id: 'URB-002', name: 'Amanda-Landscaping', specialty: 'Smart Irrigation & Landscaping', companies: ['urban-edge'], llm: 'gemini', status: 'active', tasks_completed: 456, success_rate: 89.5 },
    { id: 'URB-003', name: 'Amanda-Drone', specialty: 'Drone Surveillance & Monitoring', companies: ['urban-edge'], llm: 'gemini', status: 'active', tasks_completed: 234, success_rate: 93.8 },
    // 29 more urban agents...

    // EV & Energy Agents (24 agents)
    { id: 'EV-001', name: 'Amanda-EV', specialty: 'EV Fleet Management', companies: ['sinoafric'], llm: 'deepseek', status: 'active', tasks_completed: 456, success_rate: 94.2 },
    { id: 'EV-002', name: 'Amanda-Battery', specialty: 'Battery Optimization & Range', companies: ['sinoafric'], llm: 'deepseek', status: 'active', tasks_completed: 234, success_rate: 91.5 },
    { id: 'EV-003', name: 'Amanda-Carbon', specialty: 'Carbon Credit Trading', companies: ['sinoafric'], llm: 'claude', status: 'active', tasks_completed: 78, success_rate: 88.5 },
    // 21 more EV agents...

    // Agriculture Agents (24 agents)
    { id: 'AGR-001', name: 'Amanda-Farmer', specialty: 'Farmer Management & Support', companies: ['dreamteq-360'], llm: 'deepseek', status: 'active', tasks_completed: 5678, success_rate: 94.2 },
    { id: 'AGR-002', name: 'Amanda-LoanScoring', specialty: 'Automated Loan Scoring', companies: ['dreamteq-360'], llm: 'deepseek', status: 'active', tasks_completed: 2341, success_rate: 96.5 },
    { id: 'AGR-003', name: 'Amanda-NDVI', specialty: 'Satellite Imagery Analysis', companies: ['dreamteq-360'], llm: 'gemini', status: 'active', tasks_completed: 1234, success_rate: 91.8 },
    // 21 more agriculture agents...

    // IoT & Tech Agents (28 agents)
    { id: 'IOT-001', name: 'Amanda-IoT', specialty: 'IoT Device Management', companies: ['digital-den'], llm: 'deepseek', status: 'active', tasks_completed: 3456, success_rate: 98.2 },
    { id: 'IOT-002', name: 'Amanda-3DPrint', specialty: '3D Printing Queue Management', companies: ['digital-den'], llm: 'gemini', status: 'active', tasks_completed: 234, success_rate: 96.5 },
    // 26 more IoT agents...

    // Marketing Agents (32 agents)
    { id: 'MKT-001', name: 'Amanda-Marketing', specialty: 'Multi-Channel Marketing Automation', companies: ['all'], llm: 'claude', status: 'active', tasks_completed: 2345, success_rate: 92.5 },
    { id: 'MKT-002', name: 'Amanda-Social', specialty: 'Social Media Management', companies: ['all'], llm: 'gemini', status: 'active', tasks_completed: 4567, success_rate: 94.8 },
    // 30 more marketing agents...
];

export function getAgentsByCompany(company: string): AmandaAgent[] {
    return amandaAgentRegistry.filter(agent => 
        agent.companies.includes('all') || agent.companies.includes(company)
    );
}

export function getAgentCountByCompany(company: string): { total: number; active: number } {
    const agents = getAgentsByCompany(company);
    return {
        total: agents.length,
        active: agents.filter(a => a.status === 'active').length
    };
}

export const companyAgentAllocation: Record<string, { total: number; primary: string[] }> = {
    'delite': { total: 84, primary: ['HR-001', 'HR-002', 'MKT-001'] },
    'altovex': { total: 52, primary: ['LOG-001', 'LOG-002', 'LOG-003', 'LOG-004', 'LOG-005', 'LOG-006'] },
    'jetpro': { total: 28, primary: ['LOG-002', 'LOG-003', 'FIN-004'] },
    'balaji': { total: 36, primary: ['MFG-001', 'MFG-002', 'FIN-002'] },
    'urban-edge': { total: 24, primary: ['URB-002', 'URB-003'] },
    'digital-den': { total: 32, primary: ['IOT-001', 'IOT-002'] },
    'dreamteq-360': { total: 48, primary: ['AGR-001', 'AGR-002', 'AGR-003'] },
    'urbanis': { total: 28, primary: ['URB-001'] },
    'sinoafric': { total: 32, primary: ['EV-001', 'EV-002', 'EV-003'] }
};

export const TOTAL_AGENTS = 312;
