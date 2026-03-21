"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function TitaniumERPPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [stats, setStats] = useState({ revenue:0, employees:0, orders:0, customers:0 });
  const [task, setTask] = useState("");
  const [agentResponse, setAgentResponse] = useState("");
  const [processing, setProcessing] = useState(false);
  const [activeAgent, setActiveAgent] = useState("");
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setStats({ revenue:2450000, employees:47, orders:183, customers:1240 });
    loadAgents();
    const interval = setInterval(() => setPulse(p => !p), 1000);
    return () => clearInterval(interval);
  }, []);

  const loadAgents = async () => {
    try {
      const res = await fetch("/api/titanium-erp");
      const data = await res.json();
      setAgents(data.agents || getDefaultAgents());
    } catch {
      setAgents(getDefaultAgents());
    }
  };

  const getDefaultAgents = () => [
    { id:"001", name:"Amanda", role:"Executive Director", status:"active", capabilities:["orchestration","strategy","decision-making"] },
    { id:"002", name:"Atlas", role:"Financial Analyst", status:"idle", capabilities:["accounting","forecasting","budgeting"] },
    { id:"003", name:"Nia", role:"HR Strategist", status:"idle", capabilities:["recruitment","performance","culture"] },
    { id:"004", name:"Kofi", role:"Sales Director", status:"idle", capabilities:["crm","pipeline","closing"] },
    { id:"005", name:"Amina", role:"Marketing Director", status:"idle", capabilities:["campaigns","content","analytics"] },
    { id:"006", name:"Mosi", role:"Supply Chain", status:"idle", capabilities:["inventory","logistics","demand"] },
    { id:"007", name:"Zuri", role:"Project Director", status:"idle", capabilities:["tasks","milestones","resources"] },
    { id:"008", name:"Jelani", role:"Data Scientist", status:"idle", capabilities:["analytics","insights","forecasting"] },
  ];

  const delegateTask = async () => {
    if (!task.trim()) return;
    setProcessing(true);
    setAgentResponse("");
    setActiveAgent("Analyzing...");
    try {
      const res = await fetch("/api/titanium-erp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task })
      });
      const data = await res.json();
      setAgentResponse(data.result || "Task processed successfully.");
      setActiveAgent(data.agent || "Amanda");
    } catch {
      setAgentResponse("Amanda says: Processing your request. All agents are standing by.");
      setActiveAgent("Amanda");
    }
    setProcessing(false);
    setTask("");
  };

  const modules = [
    { label:"💼 Accounts", href:"/titanium-erp/accounts", agent:"Atlas", desc:"Financial management & invoicing" },
    { label:"👥 HR", href:"/erp/hr", agent:"Nia", desc:"Staff & payroll management" },
    { label:"📈 Sales", href:"/erp/sales", agent:"Kofi", desc:"CRM & pipeline management" },
    { label:"📣 Marketing", href:"/erp/marketing", agent:"Amina", desc:"26-country campaigns" },
    { label:"📦 Inventory", href:"/shop", agent:"Mosi", desc:"Stock & supply chain" },
    { label:"📊 Analytics", href:"/admin/revenue", agent:"Jelani", desc:"Business intelligence" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"#000", color:"#fff", fontFamily:"system-ui" }}>
      <nav style={{ borderBottom:"1px solid #333", padding:"1rem 2rem", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, background:"#000", zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
          <h1 style={{ color:"#f59e0b", margin:0 }}>⚙️ Titanium ERP</h1>
          <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
            <div style={{ width:"10px", height:"10px", borderRadius:"50%", background: pulse?"#10b981":"#065f46", transition:"0.2s", boxShadow: pulse?"0 0 8px #10b981":"none" }}></div>
            <span style={{ color:"#10b981", fontSize:"0.75rem", fontWeight:"bold" }}>SWARM ACTIVE</span>
          </div>
        </div>
        <div style={{ display:"flex", gap:"1rem" }}>
          <Link href="/" style={{ color:"#9ca3af", textDecoration:"none" }}>Home</Link>
          <Link href="/admin" style={{ color:"#9ca3af", textDecoration:"none" }}>Admin</Link>
        </div>
      </nav>

      <div style={{ maxWidth:"1400px", margin:"0 auto", padding:"2rem" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"1rem", marginBottom:"2rem" }}>
          {[
            { label:"Revenue", value:`KES ${stats.revenue.toLocaleString()}`, color:"#f59e0b", icon:"💰" },
            { label:"Employees", value:stats.employees, color:"#10b981", icon:"👥" },
            { label:"Active Orders", value:stats.orders, color:"#3b82f6", icon:"📦" },
            { label:"Customers", value:stats.customers, color:"#8b5cf6", icon:"👤" },
          ].map((s,i) => (
            <div key={i} style={{ background:"#111", border:"1px solid #222", borderRadius:"1rem", padding:"1rem", textAlign:"center" }}>
              <div style={{ fontSize:"1.5rem" }}>{s.icon}</div>
              <p style={{ color:"#9ca3af", fontSize:"0.7rem", margin:"0.25rem 0", textTransform:"uppercase", letterSpacing:"1px" }}>{s.label}</p>
              <p style={{ color:s.color, fontSize:"1.25rem", fontWeight:"bold", margin:0 }}>{s.value}</p>
            </div>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2rem", marginBottom:"2rem" }}>
          <div style={{ background:"#111", border:"1px solid #222", borderRadius:"1rem", padding:"1.5rem" }}>
            <h2 style={{ color:"#f59e0b", marginBottom:"1rem" }}>🤖 AI Agent Swarm</h2>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem" }}>
              {(agents.length ? agents : getDefaultAgents()).map(a => (
                <div key={a.id} style={{ background:"#0a0a0a", border:`1px solid ${a.status==="active"?"#10b981":"#222"}`, borderRadius:"0.5rem", padding:"0.75rem", cursor:"pointer" }}
                  onClick={() => { setTask(`${a.name}, analyze our current ${a.capabilities[0]} situation and give me 3 actionable recommendations`); }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <p style={{ color:"#f59e0b", margin:0, fontWeight:"bold", fontSize:"0.875rem" }}>{a.name}</p>
                    <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:a.status==="active"?"#10b981":"#333" }}></div>
                  </div>
                  <p style={{ color:"#9ca3af", margin:"0.25rem 0 0", fontSize:"0.7rem" }}>{a.role}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background:"#111", border:"1px solid #222", borderRadius:"1rem", padding:"1.5rem" }}>
            <h2 style={{ color:"#f59e0b", marginBottom:"1rem" }}>💬 Delegate to Swarm</h2>
            <textarea value={task} onChange={e => setTask(e.target.value)} placeholder="e.g. Atlas, analyze our Q1 financials and identify cost reduction opportunities..." style={{ width:"100%", minHeight:"100px", padding:"0.75rem", background:"#0a0a0a", border:"1px solid #333", borderRadius:"0.5rem", color:"#fff", fontFamily:"system-ui", resize:"vertical", boxSizing:"border-box" }} />
            <button onClick={delegateTask} disabled={processing || !task.trim()} style={{ width:"100%", background:processing?"#333":"#f59e0b", color:processing?"#666":"#000", padding:"0.75rem", borderRadius:"0.5rem", border:"none", fontWeight:"bold", cursor:processing?"not-allowed":"pointer", marginTop:"0.5rem" }}>
              {processing ? `🤖 ${activeAgent} is processing...` : "🚀 Deploy Agent"}
            </button>
            {agentResponse && (
              <div style={{ marginTop:"1rem", background:"#0a0a0a", border:"1px solid rgba(16,185,129,0.3)", borderRadius:"0.5rem", padding:"1rem" }}>
                <p style={{ color:"#10b981", margin:"0 0 0.5rem", fontSize:"0.75rem", fontWeight:"bold" }}>AGENT RESPONSE — {activeAgent}</p>
                <p style={{ color:"#e5e7eb", margin:0, fontSize:"0.875rem", lineHeight:1.6, whiteSpace:"pre-wrap" }}>{agentResponse}</p>
              </div>
            )}
          </div>
        </div>

        <h2 style={{ color:"#f59e0b", marginBottom:"1rem" }}>⚡ ERP Modules</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:"1rem" }}>
          {modules.map(m => (
            <Link key={m.label} href={m.href} style={{ textDecoration:"none" }}>
              <div style={{ background:"#111", border:"1px solid #222", borderRadius:"1rem", padding:"1.25rem", cursor:"pointer" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor="#f59e0b")}
                onMouseLeave={e => (e.currentTarget.style.borderColor="#222")}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"start" }}>
                  <h3 style={{ color:"#f59e0b", margin:"0 0 0.25rem", fontSize:"1rem" }}>{m.label}</h3>
                  <span style={{ color:"#9ca3af", fontSize:"0.7rem", background:"#0a0a0a", padding:"0.2rem 0.5rem", borderRadius:"0.25rem" }}>Agent: {m.agent}</span>
                </div>
                <p style={{ color:"#9ca3af", margin:0, fontSize:"0.8rem" }}>{m.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
