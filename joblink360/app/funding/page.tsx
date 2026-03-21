'use client';

export default function FundingPage() {
  const opportunities = [
    { donor: "World Bank", amount: "$500,000", country: "Kenya", probability: "85%" },
    { donor: "African Development Bank", amount: "$250,000", country: "Kenya", probability: "78%" },
    { donor: "Mastercard Foundation", amount: "$1.5M", country: "South Africa", probability: "91%" },
    { donor: "EU Grants", amount: "€2,000,000", country: "Nigeria", probability: "65%" },
    { donor: "USAID", amount: "$1.2M", country: "Kenya", probability: "92%" },
    { donor: "Gates Foundation", amount: "$900,000", country: "Uganda", probability: "86%" },
    { donor: "Google.org", amount: "$500,000", country: "South Africa", probability: "75%" },
    { donor: "DFID/FCDO", amount: "$350,000", country: "Tanzania", probability: "79%" },
  ];
  
  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'system-ui', padding: '2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
          <h1 style={{ color: '#f59e0b' }}>💰 26-Country Funding Mesh</h1>
          <a href="/pay" style={{ background: '#f59e0b', color: '#000', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold' }}>Pay KES 5,000</a>
        </div>
        
        <p style={{ color: '#10b981', marginBottom: '2rem' }}>⚡ Vulture-Eye Active | Scanning 26 Countries | NCBA Bank 8515130017</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          {opportunities.map((opp, i) => (
            <div key={i} style={{ background: '#111', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #222' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ color: '#f59e0b' }}>{opp.donor}</h3>
                <span style={{ background: '#10b981', color: '#000', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 'bold' }}>{opp.probability}</span>
              </div>
              <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{opp.amount}</p>
              <p>🇰🇪 {opp.country}</p>
              <button style={{ background: '#f59e0b', color: '#000', padding: '0.5rem', borderRadius: '0.25rem', border: 'none', marginTop: '0.5rem', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>Apply Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}