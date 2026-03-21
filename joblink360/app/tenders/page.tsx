'use client';

export default function TendersPage() {
  const tenders = [
    { title: "ICT Infrastructure Development", country: "Kenya", value: "KES 5M - 15M", deadline: "2025-05-30" },
    { title: "Solar Panel Installation", country: "Nigeria", value: "$200K - $500K", deadline: "2025-06-15" },
    { title: "Road Construction", country: "Ghana", value: "GHS 2M - 5M", deadline: "2025-07-20" },
    { title: "Healthcare Equipment Supply", country: "South Africa", value: "ZAR 1M - 3M", deadline: "2025-06-10" },
    { title: "Digital Marketing Services", country: "Kenya", value: "KES 500K - 2M", deadline: "2025-05-25" },
  ];
  
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'system-ui', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
          <h1 style={{ color: '#f59e0b' }}>📋 Tender Opportunities</h1>
          <a href="/pay" style={{ background: '#f59e0b', color: '#000', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold' }}>Pay KES 5,000</a>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1rem' }}>
          {tenders.map((tender, i) => (
            <div key={i} style={{ background: '#111', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #222' }}>
              <h3 style={{ color: '#f59e0b' }}>{tender.title}</h3>
              <p>🇰🇪 {tender.country} | 💰 {tender.value}</p>
              <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>📅 Deadline: {tender.deadline}</p>
              <button style={{ background: '#f59e0b', color: '#000', padding: '0.5rem', borderRadius: '0.25rem', border: 'none', marginTop: '0.5rem', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>Prepare Bid</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}