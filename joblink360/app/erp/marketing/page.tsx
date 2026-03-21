"use client";
export const dynamic = 'force-dynamic';
import { useState } from "react";
import Link from "next/link";
export default function ERPPage() {
  const [tab, setTab] = useState("overview");
  return (
    <div style={{ minHeight:"100vh", background:"#000", color:"#fff", fontFamily:"system-ui" }}>
      <nav style={{ borderBottom:"1px solid #333", padding:"1rem 2rem", display:"flex", justifyContent:"space-between" }}>
        <h1 style={{ color:"#f59e0b", margin:0 }}>📣 Marketing</h1>
        <div style={{ display:"flex", gap:"1rem" }}>
          <Link href="/titanium-erp" style={{ color:"#9ca3af", textDecoration:"none" }}>← ERP Home</Link>
          <Link href="/admin" style={{ color:"#9ca3af", textDecoration:"none" }}>Admin</Link>
        </div>
      </nav>
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"2rem" }}>
        <div style={{ display:"flex", gap:"1rem", marginBottom:"2rem" }}>
          {["overview","reports","settings"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding:"0.5rem 1rem", background: tab===t ? "#f59e0b" : "#111", color: tab===t ? "#000" : "#fff", border:"1px solid #333", borderRadius:"0.5rem", cursor:"pointer", textTransform:"capitalize" }}>{t}</button>
          ))}
        </div>
        <div style={{ background:"#111", border:"1px solid #222", borderRadius:"1rem", padding:"2rem", textAlign:"center" }}>
          <p style={{ color:"#f59e0b", fontSize:"1.5rem" }}>📣 Marketing Module</p>
          <p style={{ color:"#9ca3af" }}>Active tab: {tab}</p>
          <p style={{ color:"#6b7280", fontSize:"0.875rem" }}>Connect your Supabase database to see live data here.</p>
          <Link href="/titanium-erp" style={{ color:"#f59e0b", textDecoration:"none" }}>← Back to ERP Dashboard</Link>
        </div>
      </div>
    </div>
  );
}

