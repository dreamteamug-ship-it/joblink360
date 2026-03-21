"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Grant { id: string; title: string; donor: string; amount: string; country: string; deadline: string; category: string; match: number; }

export default function FundingPage() {
  const [grants, setGrants] = useState<Grant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("all");

  useEffect(() => {
    setGrants([
      { id:"1", title:"Digital Skills Youth Grant", donor:"World Bank", amount:"$500,000", country:"Kenya", deadline:"2026-05-01", category:"Education", match:92 },
      { id:"2", title:"AgriTech Innovation Fund", donor:"AfDB", amount:"$300,000", country:"Nigeria", deadline:"2026-04-20", category:"Agriculture", match:88 },
      { id:"3", title:"Women in Tech Grant", donor:"Mastercard Foundation", amount:"$1.5M", country:"Ghana", deadline:"2026-06-01", category:"Technology", match:85 },
      { id:"4", title:"Clean Energy Initiative", donor:"EU Horizon", amount:"$3M", country:"South Africa", deadline:"2026-05-15", category:"Energy", match:79 },
      { id:"5", title:"SME Growth Capital", donor:"USAID", amount:"$200,000", country:"Uganda", deadline:"2026-04-30", category:"Business", match:91 },
      { id:"6", title:"Health Systems Strengthening", donor:"Gates Foundation", amount:"$750,000", country:"Tanzania", deadline:"2026-05-20", category:"Health", match:76 },
    ]);
    setLoading(false);
  }, []);

  const filtered = grants.filter(g =>
    (country === "all" || g.country === country) &&
    (g.title.toLowerCase().includes(search.toLowerCase()) || g.donor.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ minHeight:"100vh", background:"#000", color:"#fff", fontFamily:"system-ui" }}>
      <nav style={{ borderBottom:"1px solid #333", padding:"1rem 2rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <h1 style={{ color:"#f59e0b", margin:0 }}>💰 Funding & Grants</h1>
        <div style={{ display:"flex", gap:"1rem" }}>
          <Link href="/" style={{ color:"#9ca3af", textDecoration:"none" }}>Home</Link>
          <Link href="/funding/matchmaking" style={{ background:"#f59e0b", color:"#000", padding:"0.5rem 1rem", borderRadius:"0.5rem", textDecoration:"none", fontWeight:"bold" }}>Find My Match</Link>
        </div>
      </nav>
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"2rem" }}>
        <div style={{ background:"linear-gradient(135deg, rgba(245,158,11,0.1), transparent)", border:"1px solid rgba(245,158,11,0.3)", borderRadius:"1rem", padding:"1.5rem", marginBottom:"2rem", textAlign:"center" }}>
          <h2 style={{ color:"#f59e0b", margin:"0 0 0.5rem" }}>🌍 26 African Countries | 500+ Active Grants</h2>
          <p style={{ color:"#9ca3af", margin:0 }}>AI-matched funding opportunities updated daily</p>
        </div>
        <div style={{ display:"flex", gap:"1rem", marginBottom:"2rem", flexWrap:"wrap" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search grants, donors..." style={{ flex:1, minWidth:"200px", padding:"0.75rem", background:"#111", border:"1px solid #333", borderRadius:"0.5rem", color:"#fff" }} />
          <select value={country} onChange={e => setCountry(e.target.value)} style={{ padding:"0.75rem", background:"#111", border:"1px solid #333", borderRadius:"0.5rem", color:"#fff" }}>
            <option value="all">All Countries</option>
            {["Kenya","Nigeria","Ghana","South Africa","Uganda","Tanzania"].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(340px, 1fr))", gap:"1.5rem" }}>
          {loading ? <p style={{ color:"#9ca3af" }}>Loading grants...</p> : filtered.map(g => (
            <div key={g.id} style={{ background:"#111", border:"1px solid #222", borderRadius:"1rem", padding:"1.5rem" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"start", marginBottom:"1rem" }}>
                <span style={{ background:"rgba(16,185,129,0.2)", color:"#10b981", padding:"0.25rem 0.75rem", borderRadius:"2rem", fontSize:"0.75rem" }}>{g.match}% match</span>
                <span style={{ color:"#f59e0b", fontWeight:"bold" }}>{g.amount}</span>
              </div>
              <h3 style={{ color:"#fff", margin:"0 0 0.5rem", fontSize:"1rem" }}>{g.title}</h3>
              <p style={{ color:"#9ca3af", fontSize:"0.875rem", margin:"0 0 1rem" }}>{g.donor} • {g.country} • {g.category}</p>
              <p style={{ color:"#6b7280", fontSize:"0.75rem", margin:"0 0 1rem" }}>Deadline: {g.deadline}</p>
              <Link href={`/funding/matchmaking?grant=${g.id}`} style={{ display:"block", background:"#f59e0b", color:"#000", padding:"0.75rem", borderRadius:"0.5rem", textDecoration:"none", textAlign:"center", fontWeight:"bold" }}>Apply Now →</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
