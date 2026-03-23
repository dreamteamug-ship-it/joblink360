// apps/urban-edge/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function UrbanEdge() {
    const [projects, setProjects] = useState([]);
    const [droneData, setDroneData] = useState([]);
    const [irrigationStatus, setIrrigationStatus] = useState({});

    return (
        <div style={{ minHeight: '100vh', background: '#001F3F', color: '#F5F5DC' }}>
            <header style={{ background: '#002B5C', padding: '20px', borderBottom: '2px solid #D4AF37' }}>
                <h1 style={{ color: '#D4AF37' }}>🌿 Urban Edge</h1>
                <p>Smart Landscaping | Precision Irrigation | Drone Surveillance</p>
            </header>
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}>
                        <h3>🚁 Drone Surveillance</h3>
                        <p>Active Drones: 4</p>
                        <p>Area Covered: 1,200 acres</p>
                        <p>Last Scan: 10 min ago</p>
                    </div>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}>
                        <h3>💧 Smart Irrigation</h3>
                        <p>Active Zones: 8</p>
                        <p>Water Saved: 35%</p>
                        <p>Soil Moisture: 72%</p>
                    </div>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}>
                        <h3>🌱 Active Projects</h3>
                        <p>Commercial: 12</p>
                        <p>Residential: 45</p>
                        <p>Public Spaces: 8</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
