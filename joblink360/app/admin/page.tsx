"use client";
export const dynamic = 'force-dynamic';
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [stats, setStats] = useState({ revenue: 0, students: 0, pending: 0, commission: 0 });
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setStats({ revenue: 125000, students: 25, pending: 3, commission: 87500 });
    setPayments([
      { id:"MPE001", phone:"0712345678", amount:5000, status:"verified", time:"2 mins ago" },
      { id:"MPE002", phone:"0723456789", amount:5000, status:"pending", time:"15 mins ago" },
      { id:"MPE003", phone:"0734567890", amount:5000, status:"verified", time:"1 hour ago" },
    ]);
    setLoading(false);
  }, []);

  const modules = [
    { label:"💰 Revenue", href:"/admin/revenue", desc:"Track earnings" },
    { label:"📋 Legal", href:"/admin/legal", desc:"Contracts & compliance" },
    { label:"📚 Courses", href:"/lms", desc:"Manage LMS" },
    { label:"🛒 Shop", href:"/shop", desc:"Products & orders" },
    { label:"📊 Funding", href:"/funding", desc:"Grant applications" },
    { label:"⚙️ ERP", href:"/titanium-erp", desc:"Business operations" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"#000", color:"#fff", fontFamily:"system-ui" }}>
      <nav style={{ borderBottom:"1px solid #333", padding:"1rem 2rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <h1 style={{ color:"#f59e0b", margin:0 }}>🔐 Admin Panel</h1>
        <div style={{ display:"flex", gap:"1rem" }}>
          <Link href="/" style={{ color:"#9ca3af", textDecoration:"none" }}>Home</Link>
          <Link href="/pay" style={{ background:"#f59e0b", color:"#000", padding:"0.5rem 1rem", borderRadius:"0.5rem", textDecoration:"none", fontWeight:"bold" }}>Payment Page</Link>
        </div>
      </nav>
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"2rem" }}>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:"1rem", marginBottom:"2rem" }}>
          {[
            { label:"Total Revenue", value:`KES ${stats.revenue.toLocaleString()}`, color:"#f59e0b" },
            { label:"Total Students", value:stats.students, color:"#10b981" },
            { label:"Pending Verification", value:stats.pending, color:"#ef4444" },
            { label:"Your Commission (70%)", value:`KES ${stats.commission.toLocaleString()}`, color:"#8b5cf6" },
          ].map((s, i) => (
            <div key={i} style={{ background:"#111", border:"1px solid #222", borderRadius:"1rem", padding:"1.5rem", textAlign:"center" }}>
              <p style={{ color:"#9ca3af", fontSize:"0.75rem", margin:"0 0 0.5rem", textTransform:"uppercase" }}>{s.label}</p>
              <p style={{ color:s.color, fontSize:"1.5rem", fontWeight:"bold", margin:0 }}>{s.value}</p>
            </div>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2rem", marginBottom:"2rem" }}>
          <div style={{ background:"#111", border:"1px solid #222", borderRadius:"1rem", padding:"1.5rem" }}>
            <h2 style={{ color:"#f59e0b", marginBottom:"1rem" }}>Recent Payments</h2>
            {loading ? <p style={{ color:"#9ca3af" }}>Loading...</p> : payments.map(p => (
              <div key={p.id} style={{ display:"flex", justifyContent:"space-between", padding:"0.75rem 0", borderBottom:"1px solid #222" }}>
                <div>
                  <p style={{ margin:0, fontFamily:"monospace", fontSize:"0.875rem" }}>{p.id}</p>
                  <p style={{ margin:0, color:"#9ca3af", fontSize:"0.75rem" }}>{p.phone} • {p.time}</p>
                </div>
                <div style={{ textAlign:"right" }}>
                  <p style={{ margin:0, color:"#f59e0b", fontWeight:"bold" }}>KES {p.amount.toLocaleString()}</p>
                  <span style={{ fontSize:"0.75rem", color: p.status === "verified" ? "#10b981" : "#f59e0b" }}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background:"#111", border:"1px solid #222", borderRadius:"1rem", padding:"1.5rem" }}>
            <h2 style={{ color:"#f59e0b", marginBottom:"1rem" }}>Quick Actions</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
              <Link href="/pay" style={{ background:"#10b981", color:"#000", padding:"0.75rem", borderRadius:"0.5rem", textDecoration:"none", textAlign:"center", fontWeight:"bold" }}>📲 Share Payment Link</Link>
              <Link href="/lms" style={{ background:"#3b82f6", color:"#fff", padding:"0.75rem", borderRadius:"0.5rem", textDecoration:"none", textAlign:"center", fontWeight:"bold" }}>📚 Manage Courses</Link>
              <Link href="/admin/revenue" style={{ background:"#8b5cf6", color:"#fff", padding:"0.75rem", borderRadius:"0.5rem", textDecoration:"none", textAlign:"center", fontWeight:"bold" }}>📊 Revenue Report</Link>
              <Link href="/admin/legal" style={{ background:"#f59e0b", color:"#000", padding:"0.75rem", borderRadius:"0.5rem", textDecoration:"none", textAlign:"center", fontWeight:"bold" }}>📋 Legal Documents</Link>
            </div>
          </div>
        </div>

        <h2 style={{ color:"#f59e0b", marginBottom:"1rem" }}>Platform Modules</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))", gap:"1rem" }}>
          {modules.map(m => (
            <Link key={m.label} href={m.href} style={{ textDecoration:"none" }}>
              <div style={{ background:"#111", border:"1px solid #222", borderRadius:"1rem", padding:"1rem", textAlign:"center", cursor:"pointer" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#f59e0b")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#222")}>
                <p style={{ color:"#f59e0b", margin:"0 0 0.25rem", fontWeight:"bold" }}>{m.label}</p>
                <p style={{ color:"#9ca3af", margin:0, fontSize:"0.75rem" }}>{m.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop:"2rem", background:"#111", border:"1px solid rgba(16,185,129,0.3)", borderRadius:"1rem", padding:"1rem", textAlign:"center" }}>
          <p style={{ color:"#10b981", margin:0 }}>⚡ Vulture-Eye Active | M-Pesa Paybill: <strong style={{ color:"#f59e0b" }}>400200</strong> | Account: <strong style={{ color:"#f59e0b" }}>4045731</strong> | NCBA: 8515130017</p>
        </div>
      </div>
    </div>
  );
}

