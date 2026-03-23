// apps/urbanis/page.tsx
'use client';

export default function UrbanisParks() {
    return (
        <div style={{ minHeight: '100vh', background: '#001F3F', color: '#F5F5DC' }}>
            <header style={{ background: '#002B5C', padding: '20px', borderBottom: '2px solid #D4AF37' }}>
                <h1 style={{ color: '#D4AF37' }}>🅿️ Urbanis Parks Smart</h1>
                <p>Mobile Parking Booking | Real-Time Occupancy | Revenue Shield</p>
            </header>
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}>
                        <h3>🅿️ Available Spots</h3>
                        <p style={{ fontSize: '36px', fontWeight: 'bold' }}>847</p>
                    </div>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}>
                        <h3>📱 Active Bookings</h3>
                        <p style={{ fontSize: '36px', fontWeight: 'bold' }}>234</p>
                    </div>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}>
                        <h3>💰 Revenue Shield</h3>
                        <p style={{ fontSize: '36px', fontWeight: 'bold' }}>42%</p>
                        <p>Leakage Prevented</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
