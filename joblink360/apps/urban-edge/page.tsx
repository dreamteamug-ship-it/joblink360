// apps/urban-edge/page.tsx
'use client';
export default function UrbanEdge() {
    return (
        <div style={{ minHeight: '100vh', background: '#001F3F', color: '#F5F5DC' }}>
            <header style={{ background: '#002B5C', padding: '20px', borderBottom: '2px solid #D4AF37' }}>
                <h1 style={{ color: '#D4AF37' }}>?? Urban Edge</h1>
                <p>Smart Landscaping | Drone Surveillance | Precision Irrigation</p>
            </header>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}><h3>?? Active Drones</h3><div style={{ fontSize: '36px', fontWeight: 'bold' }}>4</div></div>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}><h3>?? Water Saved</h3><div style={{ fontSize: '36px', fontWeight: 'bold' }}>35%</div></div>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}><h3>?? Active Projects</h3><div style={{ fontSize: '36px', fontWeight: 'bold' }}>65</div></div>
                </div>
            </div>
        </div>
    );
}
