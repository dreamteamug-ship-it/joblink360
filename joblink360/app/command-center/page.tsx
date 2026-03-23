// app/command-center/page.tsx
'use client';

import Link from 'next/link';

export default function CTOCommandCentre() {
    return (
        <div style={{ minHeight: '100vh', background: '#001F3F', color: '#F5F5DC' }}>
            <header style={{ background: '#002B5C', padding: '20px', borderBottom: '2px solid #D4AF37' }}>
                <h1 style={{ color: '#D4AF37' }}>?? CTO Master Command Centre</h1>
                <p>Executive Director: Mr. Allan | 9 Companies | 312 AI Agents</p>
            </header>
            
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
                    <Link href="/command-center/ai-status">
                        <div style={{ background: '#0A1A2F', padding: '30px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', border: '1px solid #D4AF37' }}>
                            <div style={{ fontSize: '48px' }}>??</div>
                            <h3>AI Agent Status</h3>
                            <p>312 Agents | 9 Companies</p>
                        </div>
                    </Link>
                    <Link href="/admin/sovereign">
                        <div style={{ background: '#0A1A2F', padding: '30px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', border: '1px solid #D4AF37' }}>
                            <div style={{ fontSize: '48px' }}>???</div>
                            <h3>Sovereign Dashboard</h3>
                            <p>Opportunity Review</p>
                        </div>
                    </Link>
                    <Link href="/command-center/system-health">
                        <div style={{ background: '#0A1A2F', padding: '30px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', border: '1px solid #D4AF37' }}>
                            <div style={{ fontSize: '48px' }}>??</div>
                            <h3>System Health</h3>
                            <p>Real-time Monitoring</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
