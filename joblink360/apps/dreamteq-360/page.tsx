// apps/dreamteq-360/page.tsx
'use client';

export default function DreamTeQ360() {
    return (
        <div style={{ minHeight: '100vh', background: '#001F3F', color: '#F5F5DC' }}>
            <header style={{ background: '#002B5C', padding: '20px', borderBottom: '2px solid #D4AF37' }}>
                <h1 style={{ color: '#D4AF37' }}>🌾 DreamTeQ 360 Farmer</h1>
                <p>Complete Farmer Management | Polygon Plot Mapping | NDVI Analysis</p>
            </header>
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}>
                        <h3>👨‍🌾 Registered Farmers</h3>
                        <p style={{ fontSize: '36px', fontWeight: 'bold' }}>15,234</p>
                    </div>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}>
                        <h3>🗺️ Mapped Plots</h3>
                        <p style={{ fontSize: '36px', fontWeight: 'bold' }}>22,567</p>
                    </div>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}>
                        <h3>💰 Loans Disbursed</h3>
                        <p style={{ fontSize: '36px', fontWeight: 'bold' }}>$4.2M</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
