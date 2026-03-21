"use client";
export const dynamic = 'force-dynamic';
import { useState, useEffect } from "react";
import Link from "next/link";

export default function TendersPage() {
  const [tenders, setTenders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("all");
  const [scanning, setScanning] = useState(false);

  useEffect(() => { loadTenders(); }, []);

  const loadTenders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tenders/scanner");
      const data = await res.json();
      setTenders(data.tenders || getFallbackTenders());
    } catch {
      setTenders(getFallbackTenders());
    }
    setLoading(false);
  };

  const runScan = async () => {
    setScanning(true);
    try {
      const res = await fetch("/api/tenders/scrape");
      await res.json();
    } catch {}
    setScanning(false);
    loadTenders();
  };

  const getFallbackTenders = () => [
    { id:"1", title:"Road Infrastructure Development - Nairobi Bypass", organization:"Kenya National Highways Authority", budget:"KES 2.5 Billion", country:"KE", category:"Infrastructure", deadline:"2026-04-25", location:"Nairobi, Kenya", success_rate:68 },
    { id:"2", title:"Digital Health Information System", organization:"Uganda Ministry of Health / WHO", budget:"USD 850,000", country:"UG", category:"Technology", deadline:"2026-05-10", location:"Kampala, Uganda", success_rate:74 },
    { id:"3", title:"Solar Mini-Grid Installation - Rural Tanzania", organization:"Tanzania Rural Energy Agency", budget:"USD 1.2M", country:"TZ", category:"Energy", deadline:"2026-04-30", location:"Dodoma, Tanzania", success_rate:71 },
    { id:"4", title:"World Bank Education Infrastructure", organization:"World Bank Group", budget:"USD 5M", country:"RW", category:"Education", deadline:"2026-05-20", location:"Kigali, Rwanda", success_rate:62 },
    { id:"5", title:"UNDP Climate Resilience Consultancy", organization:"UNDP East Africa", budget:"USD 450,000", country:"KE", category:"Environment", deadline:"2026-05-15", location:"Nairobi, Kenya", success_rate:79 },
    { id:"6", title:"AfDB Water & Sanitation Project", organization:"African Development Bank", budget:"USD 3.5M", country:"NG", category:"WASH", deadline:"2026-06-01", location:"Abuja, Nigeria", success_rate:65 },
    { id:"7", title:"ICT Equipment Supply - Government", organization:"Ghana Ministry of Finance", budget:"GHS 4.5M", country:"GH", category:"Supply", deadline:"2026-04-28", location:"Accra, Ghana", success_rate:72 },
    { id:"8", title:"Digital Transformation Consultancy", organization:"World Bank / Government of Zambia", budget:"USD 750,000", country:"ZM", category:"Consulting", deadline:"2026-05-05", location:"Lusaka, Zambia", success_rate:77 },
  ];

  const countries: Record<string,string> = { KE:"Kenya", NG:"Nigeria", GH:"Ghana", ZA:"South Africa", UG:"Uganda", TZ:"Tanzania", RW:"Rwanda", ET:"Ethiopia", ZM:"Zambia", MW:"Malawi" };

  const filtered = tenders.filter(t =>
    (country === "all" || t.country === country) &&
    (!search || t.title.toLowerCase().includes(search.toLowerCase()) || t.organization?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ minHeight:"100vh", background:"#000", color:"#fff", fontFamily:"system-ui" }}>
      <nav style={{ borderBottom:"1px solid #333", padding:"1rem 2rem", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, background:"#000", zIndex:100 }}>
        <h1 style={{ color:"#f59e0b", margin:0 }}>📋 Tenders & Procurement</h1>
        <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
          <Link href="/" style={{ color:"#9ca3af", textDecoration:"none" }}>Home</Link>
          <button onClick={runScan} disabled={scanning} style={{ background:"#10b981", color:"#000", padding:"0.5rem 1rem", borderRadius:"0.5rem", border:"none", fontWeight:"bold", cursor:"pointer" }}>
            {scanning ? "🔍 Scanning..." : "🔍 Live Scan"}
          </button>
          <Link href="/tenders/process" style={{ background:"#f59e0b", color:"#000", padding:"0.5rem 1rem", borderRadius:"0.5rem", textDecoration:"none", fontWeight:"bold" }}>Submit Tender</Link>
        </div>
      </nav>
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"2rem" }}>
        <div style={{ background:"linear-gradient(135deg,rgba(245,158,11,0.1),transparent)", border:"1px solid rgba(245,158,11,0.3)", borderRadius:"1rem", padding:"1.5rem", marginBottom:"2rem" }}>
          <h2 style={{ color:"#f59e0b", margin:"0 0 0.25rem" }}>📋 {filtered.length} Active Tenders</h2>
          <p style={{ color:"#9ca3af", margin:0 }}>World Bank • AfDB • UN Agencies • Government Procurement | Real-time scanning</p>
        </div>
        <div style={{ display:"flex", gap:"1rem", marginBottom:"2rem", flexWrap:"wrap" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tenders, organizations..." style={{ flex:1, minWidth:"200px", padding:"0.75rem", background:"#111", border:"1px solid #333", borderRadius:"0.5rem", color:"#fff" }} />
          <select value={country} onChange={e => setCountry(e.target.value)} style={{ padding:"0.75rem", background:"#111", border:"1px solid #333", borderRadius:"0.5rem", color:"#fff" }}>
            <option value="all">All Countries</option>
            {Object.entries(countries).map(([code,name]) => <option key={code} value={code}>{name}</option>)}
          </select>
        </div>
        {loading ? <p style={{ textAlign:"center", color:"#9ca3af", padding:"3rem" }}>🔍 Scanning procurement databases...</p> : (
          <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
            {filtered.map(t => (
              <div key={t.id} style={{ background:"#111", border:"1px solid #222", borderRadius:"1rem", padding:"1.5rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", gap:"0.5rem", marginBottom:"0.5rem", flexWrap:"wrap" }}>
                    <span style={{ background:"rgba(59,130,246,0.2)", color:"#60a5fa", padding:"0.2rem 0.5rem", borderRadius:"0.25rem", fontSize:"0.7rem" }}>{t.category}</span>
                    <span style={{ background:"rgba(16,185,129,0.2)", color:"#10b981", padding:"0.2rem 0.5rem", borderRadius:"0.25rem", fontSize:"0.7rem" }}>{t.success_rate}% win rate</span>
                  </div>
                  <h3 style={{ color:"#f59e0b", margin:"0 0 0.25rem", fontSize:"1rem" }}>{t.title}</h3>
                  <p style={{ color:"#9ca3af", margin:"0 0 0.25rem", fontSize:"0.875rem" }}>{t.organization}</p>
                  <p style={{ color:"#6b7280", margin:0, fontSize:"0.75rem" }}>{t.location} • Deadline: {t.deadline ? new Date(t.deadline).toLocaleDateString() : "TBD"}</p>
                </div>
                <div style={{ textAlign:"right" }}>
                  <p style={{ color:"#10b981", fontWeight:"bold", margin:"0 0 0.75rem", fontSize:"1.1rem" }}>{t.budget}</p>
                  <div style={{ display:"flex", gap:"0.5rem" }}>
                    <Link href={`/tenders/process?tender=${t.id}`} style={{ background:"#f59e0b", color:"#000", padding:"0.5rem 1rem", borderRadius:"0.5rem", textDecoration:"none", fontSize:"0.875rem", fontWeight:"bold" }}>Bid Now →</Link>
                    <button onClick={() => alert(`AI Bid Analysis for: ${t.title}\n\nWin Probability: ${t.success_rate}%\nBudget: ${t.budget}\n\nAmanda will generate your complete technical proposal.\nVisit /tenders/process to start.`)} style={{ background:"#111", color:"#9ca3af", padding:"0.5rem", borderRadius:"0.5rem", border:"1px solid #333", cursor:"pointer" }}>🤖</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

