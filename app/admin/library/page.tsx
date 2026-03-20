export default function LibraryAdmin() {
  return (
    <div style={{ padding: '40px', backgroundColor: '#0A192F', color: 'white', minHeight: '100vh' }}>
      <h1 style={{ color: '#D4AF37', fontFamily: 'Montserrat' }}>Joblink 360 Knowledge Vault</h1>
      <div style={{ border: '1px solid #D4AF37', padding: '20px', borderRadius: '8px' }}>
        <h3 style={{ color: '#C0C0C0' }}>Upload Agency Standards</h3>
        <input type="file" accept=".pdf,.txt" style={{ margin: '10px 0' }} />
        <br />
        <button style={{ backgroundColor: '#D4AF37', color: '#0A192F', padding: '10px 20px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Sync to Amanda's Brain
        </button>
      </div>
      <p style={{ marginTop: '20px', fontSize: '0.8rem', opacity: 0.6 }}>Managed by Delite Productions House | dtc@dreamteamconsult.net</p>
    </div>
  );
}