"use client";
export const dynamic = 'force-dynamic';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [pulse, setPulse] = useState(false);
  const [amandaOpen, setAmandaOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState<string[]>([]);
  const messagesEndRef = useRef<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const interval = setInterval(() => setPulse(p => !p), 1000);
    const saved = localStorage.getItem("enrolled_courses");
    if (saved) setEnrolled(JSON.parse(saved));
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (amandaOpen && messages.length === 0) {
      setMessages([{ role: "assistant", content: `👋 Habari ${user?.email?.split("@")[0] || ""}! I'm Amanda, your Sovereign AI mentor.\n\nI have full intelligence across:\n🎓 Your enrolled courses\n💰 Funding & grants (500+ opportunities)\n📋 Active tenders\n⚙️ Titanium ERP\n💼 Job matching\n\nWhat would you like to achieve today?` }]);
    }
  }, [amandaOpen]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: msg }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai/amanda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history: messages.slice(-8) })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.response, model: data.model }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Amanda is reconnecting... Please try again." }]);
    }
    setLoading(false);
  };

  const modules = [
    { title: "📚 LMS Academy", desc: "8 AI courses → $500-8K/mo", href: "/lms", color: "#f59e0b", badge: enrolled.length > 0 ? `${enrolled.length} enrolled` : "Enroll" },
    { title: "💰 Funding", desc: "500+ grants, 26 countries", href: "/funding", color: "#10b981", badge: "Live scan" },
    { title: "📋 Tenders", desc: "World Bank, UN, AfDB", href: "/tenders", color: "#3b82f6", badge: "Live scan" },
    { title: "⚙️ Titanium ERP", desc: "8 AI agents, full intelligence", href: "/titanium-erp", color: "#8b5cf6", badge: "AI-powered" },
    { title: "🛒 Shop", desc: "Courses, tools, services", href: "/shop", color: "#ec4899", badge: "8 products" },
    { title: "💳 Pay & Enroll", desc: "M-Pesa Paybill 400200", href: "/pay", color: "#f59e0b", badge: "KES 5,000" },
    { title: "🔐 Admin Panel", desc: "Revenue, payments, analytics", href: "/admin", color: "#ef4444", badge: "Live" },
    { title: "💼 Jobs", desc: "Remote global opportunities", href: "/jobs/categories", color: "#14b8a6", badge: "100+ jobs" },
  ];

  const quickActions = [
    "How do I earn $1,000/month?",
    "Find me funding for my startup",
    "Show active tenders in Kenya",
    "How do I use Titanium ERP?",
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "system-ui" }}>
      {/* Navbar */}
      <nav style={{ borderBottom: "1px solid #222", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#000", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <h1 style={{ color: "#f59e0b", margin: 0, fontSize: "1.25rem" }}>⚡ JobLink 360</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: pulse ? "#10b981" : "#065f46", transition: "0.3s", boxShadow: pulse ? "0 0 6px #10b981" : "none" }}></div>
            <span style={{ color: "#10b981", fontSize: "0.7rem" }}>LIVE</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>{user?.email}</span>
          <button onClick={() => supabase.auth.signOut().then(() => window.location.href = "/login")} style={{ color: "#9ca3af", background: "none", border: "1px solid #333", padding: "0.4rem 0.75rem", borderRadius: "0.4rem", cursor: "pointer", fontSize: "0.8rem" }}>Sign Out</button>
        </div>
      </nav>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
        {/* Welcome */}
        <div style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(139,92,246,0.1))", border: "1px solid rgba(245,158,11,0.3)", borderRadius: "1rem", padding: "1.5rem", marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h2 style={{ color: "#f59e0b", margin: "0 0 0.25rem" }}>Welcome back, {user?.email?.split("@")[0]} 👋</h2>
            <p style={{ color: "#9ca3af", margin: 0 }}>Your AI-powered platform is fully operational. Amanda is standing by.</p>
          </div>
          <button onClick={() => setAmandaOpen(true)} style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)", color: "#fff", border: "none", padding: "0.75rem 1.5rem", borderRadius: "2rem", fontWeight: "bold", cursor: "pointer", fontSize: "0.875rem" }}>
            🤖 Ask Amanda
          </button>
        </div>

        {/* Modules Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
          {modules.map(m => (
            <Link key={m.title} href={m.href} style={{ textDecoration: "none" }}>
              <div style={{ background: "#111", border: "1px solid #222", borderRadius: "1rem", padding: "1.25rem", cursor: "pointer", transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = m.color)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#222")}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                  <h3 style={{ color: m.color, margin: "0 0 0.25rem", fontSize: "1rem" }}>{m.title}</h3>
                  <span style={{ background: `${m.color}22`, color: m.color, fontSize: "0.65rem", padding: "0.2rem 0.5rem", borderRadius: "2rem", fontWeight: "bold" }}>{m.badge}</span>
                </div>
                <p style={{ color: "#9ca3af", margin: 0, fontSize: "0.8rem" }}>{m.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem" }}>
          {[
            { label: "Paybill", value: "400200", color: "#f59e0b" },
            { label: "Account", value: "4045731", color: "#10b981" },
            { label: "Amount", value: "KES 5,000", color: "#3b82f6" },
            { label: "NCBA Bank", value: "8515130017", color: "#8b5cf6" },
          ].map(s => (
            <div key={s.label} style={{ background: "#111", border: "1px solid #222", borderRadius: "0.75rem", padding: "1rem", textAlign: "center" }}>
              <p style={{ color: "#6b7280", margin: "0 0 0.25rem", fontSize: "0.7rem", textTransform: "uppercase" }}>{s.label}</p>
              <p style={{ color: s.color, fontFamily: "monospace", fontWeight: "bold", margin: 0 }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Amanda Chat Widget */}
      {!amandaOpen && (
        <button onClick={() => setAmandaOpen(true)} style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", background: "linear-gradient(135deg, #7c3aed, #3b82f6)", color: "#fff", border: "none", borderRadius: "50%", width: "60px", height: "60px", fontSize: "1.5rem", cursor: "pointer", boxShadow: "0 4px 20px rgba(124,58,237,0.4)", zIndex: 50 }}>🤖</button>
      )}

      {amandaOpen && (
        <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", width: "420px", height: "600px", background: "#0a0a0a", border: "1px solid rgba(124,58,237,0.5)", borderRadius: "1rem", display: "flex", flexDirection: "column", zIndex: 1000, boxShadow: "0 20px 60px rgba(0,0,0,0.8)" }}>
          {/* Header */}
          <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #222", display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(59,130,246,0.2))", borderRadius: "1rem 1rem 0 0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>🤖</div>
              <div>
                <p style={{ color: "#f59e0b", margin: 0, fontWeight: "bold", fontSize: "0.9rem" }}>Amanda AI</p>
                <p style={{ color: "#10b981", margin: 0, fontSize: "0.65rem" }}>● Claude 3.5 Sonnet • Online</p>
              </div>
            </div>
            <button onClick={() => setAmandaOpen(false)} style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "85%", padding: "0.75rem 1rem", borderRadius: m.role === "user" ? "1rem 1rem 0 1rem" : "1rem 1rem 1rem 0", background: m.role === "user" ? "linear-gradient(135deg, #7c3aed, #3b82f6)" : "#1a1a1a", color: "#fff", fontSize: "0.85rem", lineHeight: 1.6, whiteSpace: "pre-wrap", border: m.role !== "user" ? "1px solid #222" : "none" }}>
                  {m.content}
                  {m.model && <span style={{ display: "block", color: "#4b5563", fontSize: "0.65rem", marginTop: "0.25rem" }}>via {m.model}</span>}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: "0.25rem", padding: "0.75rem" }}>
                {[0,1,2].map(i => <div key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7c3aed", animation: `bounce 0.6s ${i*0.2}s infinite` }}></div>)}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick actions */}
          <div style={{ padding: "0 1rem 0.5rem", display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {quickActions.map(q => (
              <button key={q} onClick={() => sendMessage(q)} style={{ background: "#1a1a1a", border: "1px solid #333", color: "#9ca3af", padding: "0.3rem 0.6rem", borderRadius: "2rem", fontSize: "0.65rem", cursor: "pointer", whiteSpace: "nowrap" }}>{q.slice(0, 28)}...</button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: "0.75rem 1rem 1rem", borderTop: "1px solid #222" }}>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()} placeholder="Ask Amanda anything..." style={{ flex: 1, background: "#1a1a1a", border: "1px solid #333", borderRadius: "0.5rem", padding: "0.6rem 0.75rem", color: "#fff", fontSize: "0.85rem" }} />
              <button onClick={() => sendMessage()} disabled={loading || !input.trim()} style={{ background: "#7c3aed", color: "#fff", border: "none", borderRadius: "0.5rem", padding: "0.6rem 0.9rem", cursor: "pointer", fontSize: "0.85rem" }}>→</button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }`}</style>
    </div>
  );
}

