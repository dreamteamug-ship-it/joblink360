"use client";
export const dynamic = 'force-dynamic';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function HomePage() {
  const [pulse, setPulse] = useState(false);
  const [amandaOpen, setAmandaOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([{ role: "assistant", content: "👋 Habari! I'm Amanda, your Sovereign AI mentor. Ask me anything about earning online, grants, tenders, or how to use this platform. What's your goal?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<any>(null);

  useEffect(() => {
    const i = setInterval(() => setPulse(p => !p), 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async (text?: string) => {
    const msg = text || input;
    if (!msg.trim() || loading) return;
    setMessages(prev => [...prev, { role: "user", content: msg }]);
    setInput(""); setLoading(true);
    try {
      const res = await fetch("/api/ai/amanda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history: messages.slice(-6) })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.response, model: data.model }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Reconnecting... Try again in a moment." }]);
    }
    setLoading(false);
  };

  const stats = [
    { label: "Active Grants", value: "500+", color: "#10b981" },
    { label: "Countries", value: "26", color: "#f59e0b" },
    { label: "Job Categories", value: "13", color: "#3b82f6" },
    { label: "Income Potential", value: "$8K/mo", color: "#8b5cf6" },
  ];

  const features = [
    { icon: "🎓", title: "LMS Academy", desc: "8 AI-powered courses. From beginner to $8,000/month in 90 days.", href: "/lms" },
    { icon: "💰", title: "Funding & Grants", desc: "500+ live opportunities across World Bank, AfDB, EU, USAID.", href: "/funding" },
    { icon: "📋", title: "Tender Scanner", desc: "Real-time procurement from World Bank, UN, AfDB and governments.", href: "/tenders" },
    { icon: "⚙️", title: "Titanium ERP", desc: "8 AI agents managing your entire business intelligently.", href: "/titanium-erp" },
    { icon: "🛒", title: "Shop", desc: "Courses, templates, consultations — all in one place.", href: "/shop" },
    { icon: "💼", title: "Job Board", desc: "Remote global jobs matched to your skills and location.", href: "/jobs/categories" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "system-ui" }}>
      {/* Navbar */}
      <nav style={{ borderBottom: "1px solid #1a1a1a", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "rgba(0,0,0,0.95)", backdropFilter: "blur(10px)", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <h1 style={{ color: "#f59e0b", margin: 0, fontSize: "1.25rem", fontWeight: "900" }}>⚡ JOBLINK 360</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: pulse ? "#10b981" : "#065f46", transition: "0.3s", boxShadow: pulse ? "0 0 8px #10b981" : "none" }}></div>
            <span style={{ color: "#10b981", fontSize: "0.65rem", fontWeight: "bold" }}>LIVE</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link href="/lms" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "0.875rem" }}>Courses</Link>
          <Link href="/funding" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "0.875rem" }}>Funding</Link>
          <Link href="/tenders" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "0.875rem" }}>Tenders</Link>
          <Link href="/login" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "0.875rem" }}>Login</Link>
          <Link href="/pay" style={{ background: "#f59e0b", color: "#000", padding: "0.5rem 1.25rem", borderRadius: "2rem", textDecoration: "none", fontWeight: "bold", fontSize: "0.875rem" }}>Enroll →</Link>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 2rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ display: "inline-block", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: "2rem", padding: "0.4rem 1.25rem", marginBottom: "1.5rem" }}>
            <span style={{ color: "#f59e0b", fontSize: "0.8rem", fontWeight: "bold" }}>🌍 Africa's First AI-Powered Career Platform</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: "900", lineHeight: 1.1, margin: "0 0 1rem" }}>
            Transform <span style={{ color: "#f59e0b" }}>Learners</span> into<br />
            <span style={{ color: "#10b981" }}>Earners</span> in 90 Days
          </h1>
          <p style={{ color: "#9ca3af", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
            AI courses, live funding opportunities, tender scanner, and intelligent ERP — all powered by Amanda AI.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/pay" style={{ background: "#f59e0b", color: "#000", padding: "0.875rem 2rem", borderRadius: "0.75rem", textDecoration: "none", fontWeight: "bold", fontSize: "1rem" }}>💳 Enroll — KES 5,000</Link>
            <button onClick={() => setAmandaOpen(true)} style={{ background: "transparent", color: "#f59e0b", border: "1px solid #f59e0b", padding: "0.875rem 2rem", borderRadius: "0.75rem", cursor: "pointer", fontWeight: "bold", fontSize: "1rem" }}>🤖 Ask Amanda</button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: "#111", border: "1px solid #222", borderRadius: "1rem", padding: "1.25rem", textAlign: "center" }}>
              <p style={{ color: s.color, fontSize: "1.75rem", fontWeight: "900", margin: "0 0 0.25rem" }}>{s.value}</p>
              <p style={{ color: "#6b7280", margin: 0, fontSize: "0.8rem" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
          {features.map(f => (
            <Link key={f.title} href={f.href} style={{ textDecoration: "none" }}>
              <div style={{ background: "#111", border: "1px solid #222", borderRadius: "1rem", padding: "1.5rem", height: "100%", cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#f59e0b")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#222")}>
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{f.icon}</div>
                <h3 style={{ color: "#f59e0b", margin: "0 0 0.5rem" }}>{f.title}</h3>
                <p style={{ color: "#9ca3af", margin: 0, fontSize: "0.875rem", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Payment CTA */}
        <div style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.1), rgba(16,185,129,0.1))", border: "1px solid rgba(245,158,11,0.3)", borderRadius: "1rem", padding: "2rem", textAlign: "center" }}>
          <h2 style={{ color: "#f59e0b", margin: "0 0 1rem" }}>💳 Start Your Journey Today</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
            <div><p style={{ color: "#9ca3af", margin: "0 0 0.25rem", fontSize: "0.8rem" }}>Paybill</p><p style={{ color: "#fff", fontFamily: "monospace", fontWeight: "bold", fontSize: "1.25rem", margin: 0 }}>400200</p></div>
            <div><p style={{ color: "#9ca3af", margin: "0 0 0.25rem", fontSize: "0.8rem" }}>Account</p><p style={{ color: "#fff", fontFamily: "monospace", fontWeight: "bold", fontSize: "1.25rem", margin: 0 }}>4045731</p></div>
            <div><p style={{ color: "#9ca3af", margin: "0 0 0.25rem", fontSize: "0.8rem" }}>Amount</p><p style={{ color: "#10b981", fontFamily: "monospace", fontWeight: "bold", fontSize: "1.25rem", margin: 0 }}>KES 5,000</p></div>
          </div>
          <Link href="/pay" style={{ background: "#f59e0b", color: "#000", padding: "0.875rem 2.5rem", borderRadius: "0.75rem", textDecoration: "none", fontWeight: "bold", fontSize: "1rem" }}>Pay & Unlock All Access →</Link>
        </div>
      </div>

      {/* Amanda floating widget */}
      {!amandaOpen && (
        <button onClick={() => setAmandaOpen(true)} style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", background: "linear-gradient(135deg, #7c3aed, #3b82f6)", color: "#fff", border: "none", borderRadius: "50%", width: "60px", height: "60px", fontSize: "1.5rem", cursor: "pointer", boxShadow: "0 4px 20px rgba(124,58,237,0.5)", zIndex: 50 }}>🤖</button>
      )}

      {amandaOpen && (
        <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", width: "380px", maxHeight: "550px", background: "#0a0a0a", border: "1px solid rgba(124,58,237,0.5)", borderRadius: "1rem", display: "flex", flexDirection: "column", zIndex: 1000, boxShadow: "0 20px 60px rgba(0,0,0,0.8)" }}>
          <div style={{ padding: "0.875rem 1.25rem", borderBottom: "1px solid #1a1a1a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ color: "#f59e0b", margin: 0, fontWeight: "bold", fontSize: "0.9rem" }}>🤖 Amanda AI</p>
              <p style={{ color: "#10b981", margin: 0, fontSize: "0.65rem" }}>● Claude 3.5 Sonnet • Full intelligence</p>
            </div>
            <button onClick={() => setAmandaOpen(false)} style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: "1.1rem" }}>✕</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem", maxHeight: "360px" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "88%", padding: "0.6rem 0.875rem", borderRadius: "0.75rem", background: m.role === "user" ? "#7c3aed" : "#1a1a1a", fontSize: "0.8rem", lineHeight: 1.6, whiteSpace: "pre-wrap", border: m.role !== "user" ? "1px solid #222" : "none" }}>{m.content}</div>
              </div>
            ))}
            {loading && <div style={{ color: "#7c3aed", fontSize: "0.8rem" }}>Amanda is thinking...</div>}
            <div ref={messagesEndRef} />
          </div>
          <div style={{ padding: "0.75rem", borderTop: "1px solid #1a1a1a", display: "flex", gap: "0.5rem" }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="Ask anything..." style={{ flex: 1, background: "#1a1a1a", border: "1px solid #333", borderRadius: "0.5rem", padding: "0.6rem", color: "#fff", fontSize: "0.8rem" }} />
            <button onClick={() => sendMessage()} style={{ background: "#7c3aed", color: "#fff", border: "none", borderRadius: "0.5rem", padding: "0.6rem 0.875rem", cursor: "pointer" }}>→</button>
          </div>
        </div>
      )}
    </div>
  );
}

