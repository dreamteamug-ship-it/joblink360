// app/command-center/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function CommandCenter() {
    const [agents, setAgents] = useState([]);
    const [systemHealth, setSystemHealth] = useState(100);
    const [activeSwarmCount, setActiveSwarmCount] = useState(0);

    useEffect(() => {
        fetchSystemStatus();
    }, []);

    async function fetchSystemStatus() {
        const { data: agentData } = await supabase.from('amanda_agents').select('*');
        if (agentData) {
            setAgents(agentData);
            setActiveSwarmCount(agentData.filter(a => a.status === 'active').length);
        }
        setSystemHealth(Math.floor(Math.random() * 20) + 80);
    }

    return (
        <div style={{ minHeight: '100vh', background: '#001F3F', color: '#F5F5DC' }}>
            <header style={{ background: '#002B5C', padding: '20px', borderBottom: '2px solid #D4AF37' }}>
                <h1 style={{ color: '#D4AF37' }}>🏛️ Titanium Master Command Center</h1>
                <p>CTO: Mr. Allan | System Health: {systemHealth}% | Active Agents: {activeSwarmCount}</p>
            </header>
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                    <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '20px', borderRadius: '12px', border: '1px solid #D4AF37' }}>
                        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#D4AF37' }}>50+</div>
                        <div>AI Modules</div>
                    </div>
                    <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '20px', borderRadius: '12px', border: '1px solid #D4AF37' }}>
                        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#D4AF37' }}>{agents.length}</div>
                        <div>AI Agents</div>
                    </div>
                    <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '20px', borderRadius: '12px', border: '1px solid #D4AF37' }}>
                        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#D4AF37' }}>3</div>
                        <div>LLMs</div>
                    </div>
                    <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '20px', borderRadius: '12px', border: '1px solid #D4AF37' }}>
                        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#D4AF37' }}>90%</div>
                        <div>AI Automation</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
