"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Tender { id: string; title: string; country: string; deadline: string; value: string; category: string; status: string; }

export default function TendersPage() {
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setTenders([
      { id:"1", title:"Road Infrastructure Development Kenya", country:"Kenya", deadline:"2026-04-15", value:"KES 50M", category:"Infrastructure", status:"open" },
      { id:"2", title:"Digital Health Systems Uganda", country:"Uganda", deadline:"2026-04-20", value:"USD 200K", category:"Technology", status:"open" },
      { id:"3", title:"Solar Energy Installation Tanzania", country:"Tanzania", deadline:"2026-05-01", value:"USD 500K", category:"Energy", status:"open" },
      { id:"4", title:"School Construction Rwanda", country:"Rwanda", deadline:"2026-04-30", value:"USD 150K", category:"Education", status:"open" },
      { id:"5", title:"Water Sanitation Project Nigeria", country:"Nigeria", deadline:"2026-05-10", value:"USD 300K", category:"WASH", status:"open" },
      { id:"6", title:"Agricultural Supply Ghana", country:"Ghana", deadline:"2026-04-25", value:"USD 80K", category:"Agriculture", status:"open" },
    ]);
    setLoading(false);
  }, []);

  const filtered = tenders.filter(t =>
    (filter === "all" || t.category === filter) &&
    (t.title.toLowerCase().includes(search.toLowerCase()) || t.country.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ minHeight:"100vh", background:"#000", color:"#fff", fontFamily:"system-ui" }}>
      <nav style={{ borderBottom:"1px solid #333", padding:"1rem 2rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <h1 style={{ color:"#f59e0b", margin:0 }}>📋 Tenders & Procurement</h1>
        <div style={{ display:"flex", gap:"1rem" }}>
          <Link href="/" style={{ color:"#9ca3af", textDecoration:"none" }}>Home</Link>
          <Link href="/tenders/process" style={{ background:"#f59e0b", color:"#000", padding:"0.5rem 1rem", borderRadius:"0.5rem", textDecoration:"none", fontWeight:"bold" }}>Submit Tender</Link>
        </div>
      </nav>
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"2rem" }}>
        <div style={{ display:"flex", gap:"1rem", marginBottom:"2rem", flexWrap:"wrap" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tenders..." style={{ flex:1, minWidth:"200px", padding:"0.75rem", background:"#111", border:"1px solid #333", borderRadius:"0.5rem", color:"#fff" }} />
          <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding:"0.75rem", background:"#111", border:"1px solid #333", borderRadius:"0.5rem", color:"#fff" }}>
            <option value="all">All Categories</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Technology">Technology</option>
            <option value="Energy">Energy</option>
            <option value="Education">Education</option>
            <option value="WASH">WASH</option>
            <option value="Agriculture">Agriculture</option>
          </select>
        </div>
        <div style={{ display:"grid", gap:"1rem" }}>
          {loading ? <p style={{ color:"#9ca3af" }}>Loading tenders...</p> : filtered.map(t => (
            <div key={t.id} style={{ background:"#111", border:"1px solid #222", borderRadius:"1rem", padding:"1.5rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
              <div>
                <h3 style={{ color:"#f59e0b", margin:"0 0 0.5rem" }}>{t.title}</h3>
                <p style={{ color:"#9ca3af", margin:0, fontSize:"0.875rem" }}>{t.country} • {t.category} • Deadline: {t.deadline}</p>
              </div>
              <div style={{ textAlign:"right" }}>
                <p style={{ color:"#10b981", fontWeight:"bold", margin:"0 0 0.5rem" }}>{t.value}</p>
                <Link href={`/tenders/process?id=${t.id}`} style={{ background:"#f59e0b", color:"#000", padding:"0.5rem 1rem", borderRadius:"0.5rem", textDecoration:"none", fontSize:"0.875rem", fontWeight:"bold" }}>Apply Now →</Link>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && !loading && <p style={{ color:"#9ca3af", textAlign:"center", padding:"2rem" }}>No tenders found matching your search.</p>}
      </div>
    </div>
  );
}
