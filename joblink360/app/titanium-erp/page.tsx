'use client';

export default function TitaniumERPage() {
  const modules = ["Accounts", "HR", "Sales", "Marketing", "Inventory", "Projects"];
  
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'system-ui', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
          <h1 style={{ color: '#f59e0b' }}>🏭 Titanium ERP</h1>
          <a href="/pay" style={{ background: '#f59e0b', color: '#000', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold' }}>Pay KES 5,000</a>
        </div>
        
        <p style={{ color: '#10b981', marginBottom: '2rem' }}>🧠 Amanda AI Insights: Share your payment link to start earning!</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {modules.map((mod, i) => (
            <div key={i} style={{ background: '#111', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #222' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
              <h3>{mod}</h3>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>AI-powered {mod.toLowerCase()} management</p>
              <div style={{ background: '#000', padding: '0.5rem', borderRadius: '0.25rem', marginTop: '0.5rem', fontSize: '0.75rem', color: '#f59e0b' }}>
                💡 {mod === "Sales" ? "Top lead: Pending payment" : "Ready to scale"}
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ marginTop: '2rem', background: '#0a0a0a', padding: '1rem', borderRadius: '0.5rem', textAlign: 'center' }}>
          <p>🤖 Swarm Status: Alpha • Beta • Gamma • Delta • Sigma • Atlas — All Active</p>
        </div>
      </div>
    </div>
  );
}