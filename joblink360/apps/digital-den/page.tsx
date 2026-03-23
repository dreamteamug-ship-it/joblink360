// apps/digital-den/page.tsx
'use client';

export default function DigitalDen() {
    return (
        <div style={{ minHeight: '100vh', background: '#001F3F', color: '#F5F5DC' }}>
            <header style={{ background: '#002B5C', padding: '20px', borderBottom: '2px solid #D4AF37' }}>
                <h1 style={{ color: '#D4AF37' }}>💻 Digital Den</h1>
                <p>IoT Device Management | 3D Printing | Telematics Analytics</p>
            </header>
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}>
                        <h3>📡 IoT Devices</h3>
                        <p>Active: 1,247</p>
                        <p>Online: 98%</p>
                    </div>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}>
                        <h3>🖨️ 3D Printing Queue</h3>
                        <p>Active Jobs: 8</p>
                        <p>Completed Today: 12</p>
                    </div>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}>
                        <h3>📊 Telematics Analytics</h3>
                        <p>Data Points: 2.3M/day</p>
                        <p>Insights Generated: 156</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
