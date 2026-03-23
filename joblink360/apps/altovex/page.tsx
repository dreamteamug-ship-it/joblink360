// apps/altovex/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

interface CargoOpportunity {
    id: string;
    cargo_type: string;
    origin: string;
    destination: string;
    weight_tonnage: number;
    required_vehicle: string;
    profit_margin: number;
    status: string;
}

interface FleetVehicle {
    id: string;
    registration: string;
    type: string;
    location: string;
    status: string;
    driver: string;
    telematics: {
        speed: number;
        temperature: number;
        fuel_level: number;
        last_update: string;
    };
}

interface LoriMatch {
    id: string;
    cargo_id: string;
    vehicle_id: string;
    match_score: number;
    profit_margin: number;
    route: string;
    distance_km: number;
    estimated_eta: string;
}

interface CrossBorderShipment {
    id: string;
    cargo_type: string;
    origin_country: string;
    destination_country: string;
    customs_status: string;
    clearance_progress: number;
    estimated_delivery: string;
    documents: string[];
}

export default function AltovexGlobal() {
    const [cargoOpportunities, setCargoOpportunities] = useState<CargoOpportunity[]>([]);
    const [fleet, setFleet] = useState<FleetVehicle[]>([]);
    const [loriMatches, setLoriMatches] = useState<LoriMatch[]>([]);
    const [shipments, setShipments] = useState<CrossBorderShipment[]>([]);
    const [activeTab, setActiveTab] = useState('lori');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAllData();
        const interval = setInterval(fetchRealTimeData, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        await Promise.all([
            fetchCargoOpportunities(),
            fetchFleetStatus(),
            fetchLoriMatches(),
            fetchCrossBorderShipments()
        ]);
        setLoading(false);
    };

    const fetchRealTimeData = async () => {
        await fetchFleetStatus(); // Real-time telematics update
    };

    const fetchCargoOpportunities = async () => {
        // From Lori Scanner via Amanda
        const response = await fetch('/api/altovex/cargo-scanner');
        const data = await response.json();
        setCargoOpportunities(data.opportunities || []);
    };

    const fetchFleetStatus = async () => {
        // Real-time GPS tracking
        const response = await fetch('/api/altovex/fleet-tracking');
        const data = await response.json();
        setFleet(data.vehicles || []);
    };

    const fetchLoriMatches = async () => {
        // Lori Matchmaker Engine
        const response = await fetch('/api/altovex/lori-matches');
        const data = await response.json();
        setLoriMatches(data.matches || []);
    };

    const fetchCrossBorderShipments = async () => {
        // International trade tracking
        const response = await fetch('/api/altovex/cross-border');
        const data = await response.json();
        setShipments(data.shipments || []);
    };

    const dispatchLoriMatch = async (matchId: string) => {
        await fetch('/api/altovex/dispatch', {
            method: 'POST',
            body: JSON.stringify({ matchId })
        });
        fetchLoriMatches();
    };

    return (
        <div style={{ minHeight: '100vh', background: '#001F3F', color: '#F5F5DC' }}>
            <header style={{ background: '#002B5C', padding: '20px', borderBottom: '2px solid #D4AF37' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <h1 style={{ color: '#D4AF37' }}>🚛 Altovex Global Logistics</h1>
                    <p>End-to-End Logistics | Fleet Management | Cross-Border Trade | Lori Matchmaker</p>
                </div>
            </header>

            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
                {/* Stats Overview */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px', marginBottom: '30px' }}>
                    <div style={{ background: '#0A1A2F', padding: '15px', borderRadius: '8px' }}>
                        <div>🚛 Active Fleet</div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{fleet.length}</div>
                    </div>
                    <div style={{ background: '#0A1A2F', padding: '15px', borderRadius: '8px' }}>
                        <div>📦 Cargo Opportunities</div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{cargoOpportunities.length}</div>
                    </div>
                    <div style={{ background: '#0A1A2F', padding: '15px', borderRadius: '8px' }}>
                        <div>🎯 Lori Matches</div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{loriMatches.length}</div>
                    </div>
                    <div style={{ background: '#0A1A2F', padding: '15px', borderRadius: '8px' }}>
                        <div>🌍 Active Shipments</div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{shipments.length}</div>
                    </div>
                    <div style={{ background: '#0A1A2F', padding: '15px', borderRadius: '8px' }}>
                        <div>💰 Avg Profit Margin</div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold' }}>28%</div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #D4AF37', marginBottom: '20px' }}>
                    {[
                        { id: 'lori', label: '🚛 Lori Matchmaker', icon: '🤖' },
                        { id: 'fleet', label: '🚚 Fleet Management', icon: '📍' },
                        { id: 'cargo', label: '📦 Cargo Scanner', icon: '🔍' },
                        { id: 'trade', label: '🌍 Cross-Border Trade', icon: '📋' },
                        { id: 'telematics', label: '📡 Video Telematics', icon: '🎥' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: '10px 20px',
                                background: activeTab === tab.id ? '#D4AF37' : 'transparent',
                                color: activeTab === tab.id ? '#001F3F' : '#C0C0C0',
                                border: 'none',
                                cursor: 'pointer',
                                borderRadius: '8px 8px 0 0',
                                fontWeight: 'bold'
                            }}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* Lori Matchmaker Tab */}
                {activeTab === 'lori' && (
                    <div>
                        <h2>🤖 Lori Matchmaker Engine</h2>
                        <p>AI-powered cargo-vehicle matching with profit optimization</p>
                        {loriMatches.map(match => (
                            <div key={match.id} style={{ background: '#0A1A2F', padding: '20px', margin: '10px 0', borderRadius: '8px', borderLeft: `4px solid ${match.profit_margin > 20 ? '#10b981' : '#f59e0b'}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <strong>Cargo:</strong> {match.cargo_type}<br />
                                        <strong>Route:</strong> {match.route}<br />
                                        <strong>Distance:</strong> {match.distance_km} km<br />
                                        <strong>Profit Margin:</strong> <span style={{ color: match.profit_margin > 20 ? '#10b981' : '#f59e0b' }}>{match.profit_margin}%</span><br />
                                        <strong>Match Score:</strong> {match.match_score}%
                                    </div>
                                    <button
                                        onClick={() => dispatchLoriMatch(match.id)}
                                        style={{ background: '#D4AF37', color: '#001F3F', padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
                                    >
                                        Dispatch Vehicle →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Fleet Management Tab */}
                {activeTab === 'fleet' && (
                    <div>
                        <h2>🚚 Real-Time Fleet Tracking</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
                            {fleet.map(vehicle => (
                                <div key={vehicle.id} style={{ background: '#0A1A2F', padding: '15px', borderRadius: '8px' }}>
                                    <strong>{vehicle.registration}</strong> - {vehicle.type}<br />
                                    <span>📍 Location: {vehicle.location}</span><br />
                                    <span>📡 Speed: {vehicle.telematics?.speed} km/h</span><br />
                                    <span>🌡️ Temp: {vehicle.telematics?.temperature}°C</span><br />
                                    <span>⛽ Fuel: {vehicle.telematics?.fuel_level}%</span><br />
                                    <span>👨‍✈️ Driver: {vehicle.driver}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Cross-Border Trade Tab */}
                {activeTab === 'trade' && (
                    <div>
                        <h2>🌍 Cross-Border Commodities Trade</h2>
                        <p>International Import/Export | Clearing & Forwarding | Last Mile Delivery</p>
                        {shipments.map(shipment => (
                            <div key={shipment.id} style={{ background: '#0A1A2F', padding: '20px', margin: '10px 0', borderRadius: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <strong>{shipment.cargo_type}</strong><br />
                                        {shipment.origin_country} → {shipment.destination_country}<br />
                                        Customs: {shipment.customs_status}<br />
                                        Clearance: {shipment.clearance_progress}%
                                    </div>
                                    <div>
                                        Estimated Delivery: {shipment.estimated_delivery}<br />
                                        Documents: {shipment.documents?.length} ready
                                    </div>
                                </div>
                                <div style={{ marginTop: '10px', background: '#1a2a3f', borderRadius: '4px', height: '8px' }}>
                                    <div style={{ width: `${shipment.clearance_progress}%`, background: '#D4AF37', height: '8px', borderRadius: '4px' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
