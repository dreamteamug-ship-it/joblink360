// apps/digital-den/page.tsx
'use client';
export default function DigitalDen() {
    return (
        <div style={{ minHeight: '100vh', background: '#001F3F', color: '#F5F5DC' }}>
            <header style={{ background: '#002B5C', padding: '20px', borderBottom: '2px solid #D4AF37' }}>
                <h1 style={{ color: '#D4AF37' }}>?? Digital Den</h1>
                <p>IoT | 3D Printing | Telematics</p>
            </header>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}><h3>?? IoT Devices</h3><div style={{ fontSize: '36px', fontWeight: 'bold' }}>1,247</div></div>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}><h3>??? 3D Printing</h3><div style={{ fontSize: '36px', fontWeight: 'bold' }}>8 Jobs</div></div>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}><h3>?? Data Points</h3><div style={{ fontSize: '36px', fontWeight: 'bold' }}>2.3M</div></div>
                </div>
            </div>
        </div>
    );
}
