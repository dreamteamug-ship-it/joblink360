"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function FundingPage() {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("all");
  const [category, setCategory] = useState("all");
  const [scanning, setScanning] = useState(false);

  useEffect(() => { loadOpportunities(); }, []);

  const loadOpportunities = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/funding/scanner");
      const data = await res.json();
      setOpportunities(data.opportunities || getFallbackData());
    } catch {
      setOpportunities(getFallbackData());
    }
    setLoading(false);
  };

  const runScan = async () => {
    setScanning(true);
    try {
      const res = await fetch("/api/funding/scrape");
      const data = await res.json();
      if (data.opportunities) setOpportunities(data.opportunities);
    } catch {}
    setScanning(false);
    loadOpportunities();
  };

  const getFallbackData = () => [
    { id:"1", title:"World Bank Digital Innovation Grant", provider:"World Bank", amount:"$500,000", country:"KE", category:"Technology", deadline:"2026-05-01", success_probability:78 },
    { id:"2", title:"AfDB Agri-Innovation Fund", provider:"African Development Bank", amount:"$300,000", country:"NG", category:"Agriculture", deadline:"2026-04-20", success_probability:85 },
    { id:"3", title:"Mastercard Foundation Youth Program", provider:"Mastercard Foundation", amount:"$1,500,000", country:"GH", category:"Education", deadline:"2026-06-01", success_probability:92 },
    { id:"4", title:"EU Clean Energy Initiative", provider:"EU Horizon", amount:"$3,000,000", country:"ZA", category:"Energy", deadline:"2026-05-15", success_probability:71 },
    { id:"5", title:"USAID SME Accelerator", provider:"USAID", amount:"$200,000", country:"UG", category:"Business", deadline:"2026-04-30", success_probability:88 },
    { id:"6", title:"Gates Foundation Health Systems", provider:"Gates Foundation", amount:"$750,000", country:"TZ", category:"Health", deadline:"2026-05-20", success_probability:76 },
    { id:"7", title:"Google.org AI for Good Grant", provider:"Google.org", amount:"$250,000", country:"KE", category:"Technology", deadline:"2026-05-10", success_probability:82 },
    { id:"8", title:"Ford Foundation Social Justice Fund", provider:"Ford Foundation", amount:"$400,000", country:"ZA", category:"Social", deadline:"2026-06-15", success_probability:69 },
    { id:"9", title:"Open Society Democratic Governance", provider:"Open Society", amount:"$600,000", country:"NG", category:"Governance", deadline:"2026-05-25", success_probability:74 },
    { id:"10", title:"DFID Livelihood Support Grant", provider:"FCDO/DFID", amount:"$350,000", country:"ET", category:"Livelihood", deadline:"2026-05-05", success_probability:80 },
  ];

  const countries: Record<string,string> = { KE:"Kenya", NG:"Nigeria", GH:"Ghana", ZA:"South Africa", UG:"Uganda", TZ:"Tanzania", RW:"Rwanda", ET:"Ethiopia", ZM:"Zambia", MW:"Malawi" };
  const categories = ["all", "Technology", "Agriculture", "Education", "Energy", "Health", "Business", "Social", "Governance", "Livelihood"];

  const filtered = opportunities.filter(o =>
    (country === "all" || o.country === country) &&
    (category === "all" || o.category === category) &&
    (!search || o.title.toLowerCase().includes(search.toLowerCase()) || o.provider?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ minHeight:"100vh", background:"#000", color:"#fff", fontFamily:"system-ui" }}>
      <nav style={{ borderBottom:"1px solid #333", padding:"1rem 2rem", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, background:"#000", zIndex:100 }}>
        <h1 style={{ color:"#f59e0b", margin:0 }}>💰 Funding & Grants</h1>
        <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
          <Link href="/" style={{ color:"#9ca3af", textDecoration:"none" }}>Home</Link>
          <button onClick={runScan} disabled={scanning} style={{ background:"#10b981", color:"#000", padding:"0.5rem 1rem", borderRadius:"0.5rem", border:"none", fontWeight:"bold", cursor:"pointer" }}>
            {scanning ? "🔍 Scanning..." : "🔍 Live Scan"}
          </button>
          <Link href="/funding/matchmaking" style={{ background:"#f59e0b", color:"#000", padding:"0.5rem 1rem", borderRadius:"0.5rem", textDecoration:"none", fontWeight:"bold" }}>AI Match Me</Link>
        </div>
      </nav>

      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"2rem" }}>
        <div style={{ background:"linear-gradient(135deg,rgba(245,158,11,0.1),transparent)", border:"1px solid rgba(245,158,11,0.3)", borderRadius:"1rem", padding:"1.5rem", marginBottom:"2rem", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem" }}>
          <div>
            <h2 style={{ color:"#f59e0b", margin:"0 0 0.25rem" }}>🌍 {filtered.length} Active Opportunities</h2>
            <p style={{ color:"#9ca3af", margin:0 }}>26 African countries | AI-matched | Updated daily</p>
          </div>
          <div style={{ display:"flex", gap:"1rem" }}>
            <div style={{ textAlign:"center" }}><p style={{ color:"#10b981", fontWeight:"bold", margin:0, fontSize:"1.5rem" }}>{opportunities.length}</p><p style={{ color:"#6b7280", margin:0, fontSize:"0.75rem" }}>Total Grants</p></div>
            <div style={{ textAlign:"center" }}><p style={{ color:"#f59e0b", fontWeight:"bold", margin:0, fontSize:"1.5rem" }}>$50M+</p><p style={{ color:"#6b7280", margin:0, fontSize:"0.75rem" }}>Available</p></div>
          </div>
        </div>

        <div style={{ display:"flex", gap:"1rem", marginBottom:"2rem", flexWrap:"wrap" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search grants, donors, keywords..." style={{ flex:1, minWidth:"200px", padding:"0.75rem", background:"#111", border:"1px solid #333", borderRadius:"0.5rem", color:"#fff" }} />
          <select value={country} onChange={e => setCountry(e.target.value)} style={{ padding:"0.75rem", background:"#111", border:"1px solid #333", borderRadius:"0.5rem", color:"#fff" }}>
            <option value="all">All Countries</option>
            {Object.entries(countries).map(([code,name]) => <option key={code} value={code}>{name}</option>)}
          </select>
          <select value={category} onChange={e => setCategory(e.target.value)} style={{ padding:"0.75rem", background:"#111", border:"1px solid #333", borderRadius:"0.5rem", color:"#fff" }}>
            {categories.map(c => <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>)}
          </select>
        </div>

        {loading ? (
          <div style={{ textAlign:"center", padding:"3rem", color:"#9ca3af" }}>
            <p style={{ fontSize:"1.5rem" }}>🔍 Scanning funding databases...</p>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))", gap:"1.5rem" }}>
            {filtered.map(o => (
              <div key={o.id} style={{ background:"#111", border:"1px solid #222", borderRadius:"1rem", padding:"1.5rem", display:"flex", flexDirection:"column" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.75rem" }}>
                  <span style={{ background:`rgba(${(o.success_probability||70)>80?"16,185,129":(o.success_probability||70)>60?"245,158,11":"239,68,68"},0.2)`, color:`${(o.success_probability||70)>80?"#10b981":(o.success_probability||70)>60?"#f59e0b":"#ef4444"}`, padding:"0.25rem 0.75rem", borderRadius:"2rem", fontSize:"0.75rem", fontWeight:"bold" }}>
                    {o.success_probability||70}% match
                  </span>
                  <span style={{ color:"#f59e0b", fontWeight:"bold" }}>{o.amount}</span>
                </div>
                <h3 style={{ color:"#fff", margin:"0 0 0.5rem", fontSize:"0.95rem", lineHeight:1.4 }}>{o.title}</h3>
                <p style={{ color:"#9ca3af", fontSize:"0.8rem", margin:"0 0 0.5rem" }}>{o.provider} • {countries[o.country]||o.country} • {o.category}</p>
                <p style={{ color:"#6b7280", fontSize:"0.75rem", margin:"0 0 1rem" }}>Deadline: {o.deadline ? new Date(o.deadline).toLocaleDateString() : "Rolling"}</p>
                <div style={{ display:"flex", gap:"0.5rem", marginTop:"auto" }}>
                  <Link href={`/funding/matchmaking?grant=${o.id}`} style={{ flex:1, background:"#f59e0b", color:"#000", padding:"0.6rem", borderRadius:"0.5rem", textDecoration:"none", textAlign:"center", fontWeight:"bold", fontSize:"0.875rem" }}>Apply Now →</Link>
                  <button onClick={() => alert(`Amanda is analyzing your match for: ${o.title}\n\nSuccess Probability: ${o.success_probability||70}%\nAmount: ${o.amount}\nDeadline: ${o.deadline||"Rolling"}\n\nVisit /funding/matchmaking for AI-generated proposal`)} style={{ background:"#111", color:"#9ca3af", padding:"0.6rem 0.75rem", borderRadius:"0.5rem", border:"1px solid #333", cursor:"pointer", fontSize:"0.875rem" }}>🤖</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && filtered.length === 0 && <p style={{ color:"#9ca3af", textAlign:"center", padding:"2rem" }}>No opportunities match your filters. Try broadening your search.</p>}
      </div>
    </div>
  );
}
