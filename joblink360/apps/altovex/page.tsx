// apps/altovex/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function AltovexGlobal() {
    const [activeTab, setActiveTab] = useState('lori');
    const [matches, setMatches] = useState([]);
    const [fleet, setFleet] = useState([]);
    const [cargo, setCargo] = useState([]);
    const [shipments, setShipments] = useState([]);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchFleetData, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        // Fetch from Amanda AI via Titanium ERP
        const response = await fetch('/api/altovex/dashboard');
        const data = await response.json();
        setMatches(data.lori_matches || []);
        setFleet(data.fleet || []);
        setCargo(data.cargo || []);
        setShipments(data.shipments || []);
    };

    const fetchFleetData = async () => {
        const response = await fetch('/api/altovex/fleet-tracking');
        const data = await response.json();
        setFleet(data.vehicles || []);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#001F3F', color: '#F5F5DC' }}>
            <header style={{ background: '#002B5C', padding: '20px', borderBottom: '2px solid #D4AF37' }}>
                <h1 style={{ color: '#D4AF37' }}>?? Altovex Global Logistics</h1>
                <p>Lori Matchmaker | Fleet Tracking | Cross-Border Trade | Last Mile Delivery</p>
            </header>

            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}>
                        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#D4AF37' }}>{matches.length}</div>
                        <div>Lori Matches</div>
                    </div>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}>
                        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#D4AF37' }}>{fleet.length}</div>
                        <div>Active Fleet</div>
                    </div>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}>
                        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#D4AF37' }}>{cargo.length}</div>
                        <div>Cargo Opportunities</div>
                    </div>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}>
                        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#D4AF37' }}>{shipments.length}</div>
                        <div>Active Shipments</div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #D4AF37', marginBottom: '20px' }}>
                    {['lori', 'fleet', 'cargo', 'trade'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)}
                            style={{ padding: '10px 20px', background: activeTab === tab ? '#D4AF37' : 'transparent', color: activeTab === tab ? '#001F3F' : '#C0C0C0', border: 'none', cursor: 'pointer', borderRadius: '8px 8px 0 0' }}>
                            {tab === 'lori' && '?? Lori Matchmaker'}
                            {tab === 'fleet' && '?? Fleet Tracking'}
                            {tab === 'cargo' && '?? Cargo Scanner'}
                            {tab === 'trade' && '?? Cross-Border'}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {activeTab === 'lori' && (
                    <div>
                        <h3>?? AI-Powered Lori Matches</h3>
                        {matches.map((match: any) => (
                            <div key={match.id} style={{ background: '#0A1A2F', padding: '15px', margin: '10px 0', borderRadius: '8px', borderLeft: `4px solid ${match.profit_margin > 20 ? '#10b981' : '#f59e0b'}` }}>
                                <div><strong>Cargo:</strong> {match.cargo_type}</div>
                                <div><strong>Route:</strong> {match.origin} ? {match.destination}</div>
                                <div><strong>Profit Margin:</strong> {match.profit_margin}%</div>
                                <div><strong>Match Score:</strong> {match.match_score}%</div>
                                <button style={{ marginTop: '10px', background: '#D4AF37', color: '#001F3F', padding: '5px 15px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Dispatch ?</button>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'fleet' && (
                    <div>
                        <h3>?? Real-Time Fleet Tracking</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
                            {fleet.map((v: any) => (
                                <div key={v.id} style={{ background: '#0A1A2F', padding: '15px', borderRadius: '8px' }}>
                                    <strong>{v.registration}</strong> - {v.type}<br />
                                    ?? {v.location}<br />
                                    ?? Speed: {v.speed} km/h<br />
                                    ????? Driver: {v.driver}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
