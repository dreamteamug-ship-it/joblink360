// app/command-center/ai-status/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { amandaAgentRegistry, getAgentsByCompany, companyAgentAllocation, TOTAL_AGENTS } from '@/lib/amanda/agent-registry';

export default function AIStatusDashboard() {
    const [agents, setAgents] = useState([]);
    const [companyStats, setCompanyStats] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('all');
    
    const companies = [
        { id: 'delite', name: 'Delite Productions (JobLinks Africa)' },
        { id: 'altovex', name: 'Altovex Global Logistics' },
        { id: 'jetpro', name: 'Jetpro Powerwash' },
        { id: 'balaji', name: 'Balaji Hygiene' },
        { id: 'urban-edge', name: 'Urban Edge' },
        { id: 'digital-den', name: 'Digital Den' },
        { id: 'dreamteq-360', name: 'DreamTeQ 360 Farmer' },
        { id: 'urbanis', name: 'Urbanis Parks' },
        { id: 'sinoafric', name: 'SinoAfric EV' }
    ];
    
    useEffect(() => {
        loadAgentStats();
    }, [selectedCompany]);
    
    const loadAgentStats = () => {
        let filteredAgents = amandaAgentRegistry;
        if (selectedCompany !== 'all') {
            filteredAgents = getAgentsByCompany(selectedCompany);
        }
        setAgents(filteredAgents);
        
        // Calculate company stats
        const stats = companies.map(company => {
            const companyAgents = getAgentsByCompany(company.id);
            return {
                ...company,
                totalAgents: companyAgents.length,
                activeAgents: companyAgents.filter(a => a.status === 'active').length,
                tasksCompleted: companyAgents.reduce((sum, a) => sum + a.tasks_completed, 0),
                avgSuccessRate: companyAgents.reduce((sum, a) => sum + a.success_rate, 0) / companyAgents.length
            };
        });
        setCompanyStats(stats);
    };
    
    const getAgentCountByCompany = (companyId: string) => {
        return companyAgentAllocation[companyId as keyof typeof companyAgentAllocation]?.total || 0;
    };
    
    return (
        <div style={{ minHeight: '100vh', background: '#001F3F', color: '#F5F5DC' }}>
            <header style={{ background: '#002B5C', padding: '20px', borderBottom: '2px solid #D4AF37' }}>
                <h1 style={{ color: '#D4AF37' }}>?? Amanda AI - Shared Intelligence Status</h1>
                <p>312 Specialized Agents | 9 Companies | Multi-LLM Integration</p>
            </header>
            
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
                {/* Total Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px', border: '1px solid #D4AF37' }}>
                        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#D4AF37' }}>{TOTAL_AGENTS}</div>
                        <div>Total AI Agents</div>
                    </div>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px', border: '1px solid #D4AF37' }}>
                        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#D4AF37' }}>{amandaAgentRegistry.filter(a => a.status === 'active').length}</div>
                        <div>Active Agents</div>
                    </div>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px', border: '1px solid #D4AF37' }}>
                        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#D4AF37' }}>{amandaAgentRegistry.reduce((sum, a) => sum + a.tasks_completed, 0).toLocaleString()}</div>
                        <div>Tasks Completed</div>
                    </div>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px', border: '1px solid #D4AF37' }}>
                        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#D4AF37' }}>{Math.round(amandaAgentRegistry.reduce((sum, a) => sum + a.success_rate, 0) / TOTAL_AGENTS)}%</div>
                        <div>Avg Success Rate</div>
                    </div>
                </div>
                
                {/* Company Selector */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ marginRight: '10px' }}>Filter by Company:</label>
                    <select 
                        value={selectedCompany} 
                        onChange={(e) => setSelectedCompany(e.target.value)}
                        style={{ background: '#0A1A2F', color: '#D4AF37', padding: '8px', borderRadius: '4px', border: '1px solid #D4AF37' }}
                    >
                        <option value="all">All Companies (312 Agents)</option>
                        {companies.map(c => (
                            <option key={c.id} value={c.id}>{c.name} ({getAgentCountByCompany(c.id)} agents)</option>
                        ))}
                    </select>
                </div>
                
                {/* Company Stats Grid */}
                <h2 style={{ color: '#D4AF37', marginBottom: '20px' }}>?? Company AI Allocation</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                    {companyStats.map(company => (
                        <div key={company.id} style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px', border: '1px solid #D4AF37' }}>
                            <h3 style={{ color: '#D4AF37' }}>{company.name}</h3>
                            <div style={{ marginTop: '15px' }}>
                                <div>?? Agents: {company.totalAgents}</div>
                                <div>? Active: {company.activeAgents}</div>
                                <div>?? Tasks: {company.tasksCompleted.toLocaleString()}</div>
                                <div>?? Success Rate: {company.avgSuccessRate.toFixed(1)}%</div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Agent List */}
                <h2 style={{ color: '#D4AF37', marginBottom: '20px' }}>?? Active AI Agents</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
                    {agents.slice(0, 30).map(agent => (
                        <div key={agent.id} style={{ background: '#0A1A2F', padding: '15px', borderRadius: '8px', borderLeft: `4px solid ${agent.status === 'active' ? '#10b981' : '#f59e0b'}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong>{agent.name}</strong>
                                <span style={{ color: agent.status === 'active' ? '#10b981' : '#f59e0b' }}>{agent.status}</span>
                            </div>
                            <div style={{ fontSize: '12px', color: '#C0C0C0', marginTop: '5px' }}>{agent.specialty}</div>
                            <div style={{ fontSize: '11px', marginTop: '5px' }}>
                                LLM: {agent.llm.toUpperCase()} | Tasks: {agent.tasks_completed} | Success: {agent.success_rate}%
                            </div>
                        </div>
                    ))}
                </div>
                {agents.length > 30 && (
                    <div style={{ textAlign: 'center', marginTop: '20px', color: '#C0C0C0' }}>
                        + {agents.length - 30} more agents
                    </div>
                )}
            </div>
        </div>
    );
}
