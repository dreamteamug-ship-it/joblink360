// apps/dreamteq-360/page.tsx
'use client';
export default function DreamTeQ360() {
    return (
        <div style={{ minHeight: '100vh', background: '#001F3F', color: '#F5F5DC' }}>
            <header style={{ background: '#002B5C', padding: '20px', borderBottom: '2px solid #D4AF37' }}>
                <h1 style={{ color: '#D4AF37' }}>?? DreamTeQ 360 Farmer</h1>
                <p>Farm Management | Plot Mapping | Loan Scoring</p>
            </header>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}><h3>????? Farmers</h3><div style={{ fontSize: '36px', fontWeight: 'bold' }}>15,234</div></div>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}><h3>??? Plots</h3><div style={{ fontSize: '36px', fontWeight: 'bold' }}>22,567</div></div>
                    <div style={{ background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}><h3>?? Loans</h3><div style={{ fontSize: '36px', fontWeight: 'bold' }}>$4.2M</div></div>
                </div>
            </div>
        </div>
    );
}
