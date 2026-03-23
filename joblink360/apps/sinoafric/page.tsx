// apps/sinoafric/page.tsx
'use client';

export default function SinoAfricEV() {
    return (
        <div style={{ minHeight: '100vh', background: '#001F3F', color: '#F5F5DC' }}>
            <header style={{ background: '#002B5C', padding: '20px', borderBottom: '2px solid #D4AF37' }}>
                <h1 style={{ color: '#D4AF37' }}>⚡ SinoAfric EV Mobility</h1>
                <p>Electric Vehicle Fleet | Carbon Credit Trading | Battery Optimization</p>
            </header>
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}>
                        <h3>🚗 EV Fleet</h3>
                        <p style={{ fontSize: '36px', fontWeight: 'bold' }}>128</p>
                    </div>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}>
                        <h3>🔋 Carbon Credits</h3>
                        <p style={{ fontSize: '36px', fontWeight: 'bold' }}>2,450</p>
                        <p>TONS CO₂</p>
                    </div>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}>
                        <h3>⚡ Charging Stations</h3>
                        <p style={{ fontSize: '36px', fontWeight: 'bold' }}>42</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
