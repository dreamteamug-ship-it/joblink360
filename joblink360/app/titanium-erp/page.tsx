"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function TitaniumERPPage() {
  const [stats, setStats] = useState({ revenue: 0, employees: 0, orders: 0, customers: 0 });
  const [activeModule, setActiveModule] = useState("dashboard");

  useEffect(() => {
    setStats({ revenue: 2450000, employees: 47, orders: 183, customers: 1240 });
  }, []);

  const modules = [
    { id:"accounts", label:"💼 Accounts", desc:"Financial management & invoicing", href:"/titanium-erp/accounts" },
    { id:"hr", label:"👥 HR", desc:"Staff management & payroll", href:"/erp/hr" },
    { id:"sales", label:"📈 Sales", desc:"Pipeline & CRM", href:"/erp/sales" },
    { id:"marketing", label:"📣 Marketing", desc:"Campaigns & analytics", href:"/erp/marketing" },
    { id:"inventory", label:"📦 Inventory", desc:"Stock & supply chain", href:"/shop" },
    { id:"reports", label:"📊 Reports", desc:"Business intelligence", href:"/admin/revenue" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"#000", color:"#fff", fontFamily:"system-ui" }}>
      <nav style={{ borderBottom:"1px solid #333", padding:"1rem 2rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <h1 style={{ color:"#f59e0b", margin:0 }}>⚙️ Titanium ERP</h1>
        <div style={{ display:"flex", gap:"1rem" }}>
          <Link href="/" style={{ color:"#9ca3af", textDecoration:"none" }}>Home</Link>
          <Link href="/admin" style={{ color:"#9ca3af", textDecoration:"none" }}>Admin</Link>
        </div>
      </nav>
      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"2rem" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))", gap:"1rem", marginBottom:"2rem" }}>
          {[
            { label:"Total Revenue", value:`KES ${stats.revenue.toLocaleString()}`, color:"#f59e0b" },
            { label:"Employees", value:stats.employees, color:"#10b981" },
            { label:"Active Orders", value:stats.orders, color:"#3b82f6" },
            { label:"Customers", value:stats.customers, color:"#8b5cf6" },
          ].map((s, i) => (
            <div key={i} style={{ background:"#111", border:"1px solid #222", borderRadius:"1rem", padding:"1.5rem", textAlign:"center" }}>
              <p style={{ color:"#9ca3af", fontSize:"0.875rem", margin:"0 0 0.5rem" }}>{s.label}</p>
              <p style={{ color:s.color, fontSize:"1.5rem", fontWeight:"bold", margin:0 }}>{s.value}</p>
            </div>
          ))}
        </div>
        <h2 style={{ color:"#f59e0b", marginBottom:"1rem" }}>ERP Modules</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:"1rem" }}>
          {modules.map(m => (
            <Link key={m.id} href={m.href} style={{ textDecoration:"none" }}>
              <div style={{ background:"#111", border:"1px solid #222", borderRadius:"1rem", padding:"1.5rem", cursor:"pointer", transition:"border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#f59e0b")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#222")}>
                <h3 style={{ color:"#f59e0b", margin:"0 0 0.5rem" }}>{m.label}</h3>
                <p style={{ color:"#9ca3af", margin:0, fontSize:"0.875rem" }}>{m.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
