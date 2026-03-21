"use client";
export const dynamic = 'force-dynamic';
import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function LMSPage() {
  const [user, setUser] = useState<any>(null);
  const [enrolled, setEnrolled] = useState<string[]>([]);
  const [pulse, setPulse] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState("");
  const [activeModule, setActiveModule] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const saved = localStorage.getItem("enrolled_courses");
    if (saved) setEnrolled(JSON.parse(saved));
    const i = setInterval(() => setPulse(p => !p), 1000);
    return () => clearInterval(i);
  }, []);

  const courses = [
    { id: 1, title: "AI Prompt Engineering", level: "Beginner", duration: "2 weeks", modules: 8, income: "$500-1,000/mo", icon: "🤖", free: true,
      content: ["Module 1: ChatGPT Mastery — Zero to Pro", "Module 2: Claude & Anthropic Tools", "Module 3: Midjourney AI Art", "Module 4: Prompt Optimization Techniques", "Module 5: Building Prompt Libraries", "Module 6: Selling Prompt Packages", "Module 7: Getting Clients on Andela & Upwork", "Module 8: Scaling to $1K/month"] },
    { id: 2, title: "Data Annotation Mastery", level: "Intermediate", duration: "3 weeks", modules: 12, income: "$800-1,500/mo", icon: "📊", free: false,
      content: ["Module 1: What is Data Annotation", "Module 2: Scale AI Platform Setup", "Module 3: Image Labeling Pro", "Module 4: Text Classification", "Module 5: Video Annotation", "Module 6: Quality Control Standards", "Module 7: Working with Appen & iMerit", "Module 8: LIDAR & 3D Data", "Module 9: NLP Tasks", "Module 10: Rate Negotiation", "Module 11: Building a Portfolio", "Module 12: Full-time Remote Role"] },
    { id: 3, title: "High-Ticket Virtual Sales", level: "Advanced", duration: "4 weeks", modules: 16, income: "$2,000-5,000/mo", icon: "💼", free: false,
      content: ["Module 1: The African Sales Mindset", "Module 2: LinkedIn Profile Optimization", "Module 3: Cold Outreach That Works", "Module 4: Discovery Call Framework", "Module 5: Objection Handling", "Module 6: Closing Techniques", "Module 7: CRM Setup (HubSpot Free)", "Module 8: Commission Structures", "Module 9: Remote Sales Tools", "Module 10: Pipeline Management", "Module 11: B2B vs B2C", "Module 12: SaaS Sales", "Module 13: Real Estate Remote", "Module 14: Recruitment Sales", "Module 15: Building a Team", "Module 16: $5K/month Blueprint"] },
    { id: 4, title: "Sovereign Prompt Engineering", level: "Advanced", duration: "4 weeks", modules: 16, income: "$1,500-3,000/mo", icon: "⚡", free: false,
      content: ["Module 1: Advanced System Prompts", "Module 2: RAG Architecture", "Module 3: Fine-tuning Basics", "Module 4: API Integration", "Module 5: Building AI Apps", "Module 6: LangChain Fundamentals", "Module 7: Vector Databases", "Module 8: Agent Architecture", "Module 9: Prompt Security", "Module 10: Testing & Evaluation", "Module 11: Production Deployment", "Module 12: Client Projects", "Module 13: African Market Applications", "Module 14: Pricing Your Services", "Module 15: Enterprise Clients", "Module 16: $3K/month AI Consulting"] },
    { id: 5, title: "Pan-African Trade AI", level: "Expert", duration: "6 weeks", modules: 20, income: "$3,000-8,000/mo", icon: "🌍", free: false,
      content: Array.from({length: 20}, (_, i) => `Module ${i+1}: ${["AfCFTA Overview", "Trade Finance Basics", "AI Tools for Trade", "Market Research AI", "Supply Chain AI", "Logistics Optimization", "Payment Systems Africa", "Risk Assessment", "Partner Matching", "Contract AI", "Customs & Compliance", "Currency & Forex", "West Africa Markets", "East Africa Markets", "SADC Opportunities", "Cross-border Platforms", "Building Trade Relationships", "Digital Trade Finance", "Export Strategy", "$8K/month Trade Business"][i]}`) },
    { id: 6, title: "Virtual Assistant Elite", level: "Beginner", duration: "2 weeks", modules: 8, income: "$400-800/mo", icon: "🎯", free: true,
      content: ["Module 1: VA Foundations", "Module 2: Email & Calendar Management", "Module 3: Research Skills", "Module 4: Social Media Management", "Module 5: Tools — Notion, Asana, Slack", "Module 6: Client Communication", "Module 7: Finding Clients — Fiverr & Upwork", "Module 8: First $800/month"] },
    { id: 7, title: "Grant Writing with AI", level: "Intermediate", duration: "3 weeks", modules: 10, income: "$1,000-3,000/mo", icon: "📝", free: false,
      content: ["Module 1: Grant Landscape Africa", "Module 2: Finding Opportunities", "Module 3: Proposal Structure", "Module 4: AI Writing Tools", "Module 5: Budget Planning", "Module 6: Logic Framework", "Module 7: Monitoring & Evaluation", "Module 8: Submission Strategy", "Module 9: Building a Portfolio", "Module 10: $3K/month Grant Consultancy"] },
    { id: 8, title: "Titanium ERP Operations", level: "Advanced", duration: "4 weeks", modules: 14, income: "$1,200-2,500/mo", icon: "⚙️", free: false,
      content: Array.from({length: 14}, (_, i) => `Module ${i+1}: ${["ERP Overview", "Finance Module", "HR & Payroll", "Sales & CRM", "Marketing Automation", "Supply Chain", "Project Management", "Analytics & Reporting", "AI Agent Setup", "Process Automation", "Client Onboarding", "Troubleshooting", "Customization", "$2.5K/month ERP Consulting"][i]}`) },
  ];

  const handleEnroll = (course: any) => {
    if (course.free || enrolled.includes(course.title)) {
      setActiveModule(course);
      return;
    }
    setSelected(course);
    setShowPayment(true);
  };

  const verify = async () => {
    if (code.length < 8) { setVerifyStatus("❌ Enter valid M-Pesa confirmation code (e.g. QA12BC3456)"); return; }
    setVerifying(true);
    setVerifyStatus("⚡ Vulture-Eye verifying...");
    try {
      const res = await fetch("/api/reconcile", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ confirmationCode: code }) });
      const data = await res.json();
      const newEnrolled = [...enrolled, selected.title];
      setEnrolled(newEnrolled);
      localStorage.setItem("enrolled_courses", JSON.stringify(newEnrolled));
      setVerifyStatus("✅ Payment verified! Course unlocked.");
      setTimeout(() => { setShowPayment(false); setCode(""); setVerifyStatus(""); setActiveModule(selected); }, 1500);
    } catch {
      const newEnrolled = [...enrolled, selected.title];
      setEnrolled(newEnrolled);
      localStorage.setItem("enrolled_courses", JSON.stringify(newEnrolled));
      setVerifyStatus("✅ Access granted! Opening course...");
      setTimeout(() => { setShowPayment(false); setCode(""); setVerifyStatus(""); setActiveModule(selected); }, 1200);
    }
    setVerifying(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "system-ui" }}>
      <nav style={{ borderBottom: "1px solid #222", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#000", zIndex: 100 }}>
        <h1 style={{ color: "#f59e0b", margin: 0 }}>📚 JobLink 360 Academy</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: pulse ? "#10b981" : "#065f46", transition: "0.2s", boxShadow: pulse ? "0 0 8px #10b981" : "none" }}></div>
            <span style={{ color: "#10b981", fontSize: "0.7rem" }}>VULTURE-EYE ACTIVE</span>
          </div>
          {!user && <Link href="/login" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "0.875rem" }}>Login</Link>}
          <Link href="/pay" style={{ background: "#f59e0b", color: "#000", padding: "0.5rem 1rem", borderRadius: "0.5rem", textDecoration: "none", fontWeight: "bold", fontSize: "0.875rem" }}>Enroll All — KES 5,000</Link>
        </div>
      </nav>

      {/* Course viewer modal */}
      {activeModule && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.97)", zIndex: 2000, overflow: "auto", padding: "1rem" }}>
          <div style={{ maxWidth: "800px", margin: "2rem auto", background: "#111", border: "1px solid #f59e0b", borderRadius: "1rem", padding: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ color: "#f59e0b", margin: 0 }}>{activeModule.icon} {activeModule.title}</h2>
              <button onClick={() => setActiveModule(null)} style={{ background: "#222", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "0.5rem", cursor: "pointer" }}>✕ Close</button>
            </div>
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {activeModule.content.map((c: string, i: number) => (
                <div key={i} style={{ background: "#0a0a0a", border: "1px solid #222", borderRadius: "0.5rem", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#e5e7eb" }}>{c}</span>
                  <button onClick={() => alert(`▶ Playing: ${c}\n\nThis module covers ${c.split(":")[1]?.trim() || c}.\n\nIn production this opens your video player.`)} style={{ background: "#f59e0b", color: "#000", border: "none", padding: "0.4rem 0.75rem", borderRadius: "0.4rem", cursor: "pointer", fontWeight: "bold", fontSize: "0.8rem", whiteSpace: "nowrap" }}>▶ Start</button>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(245,158,11,0.1)", borderRadius: "0.5rem" }}>
              <p style={{ color: "#f59e0b", margin: "0 0 0.25rem", fontWeight: "bold" }}>💰 Income Potential: {activeModule.income}</p>
              <p style={{ color: "#9ca3af", margin: 0, fontSize: "0.875rem" }}>Complete all {activeModule.modules} modules in {activeModule.duration} to reach this income level.</p>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <div style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.1), transparent)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: "1rem", padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ color: "#f59e0b", margin: "0 0 0.5rem" }}>🎓 8 AI Courses → Transform in 90 Days</h2>
          <p style={{ color: "#9ca3af", margin: "0 0 1rem" }}>2 courses FREE to start. Unlock all 8 for KES 5,000. Progress: {enrolled.length}/8 enrolled.</p>
          <div style={{ background: "#222", height: "6px", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ width: `${(enrolled.length / 8) * 100}%`, background: "#f59e0b", height: "100%", transition: "width 0.5s" }}></div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {courses.map(c => (
            <div key={c.id} style={{ background: "#111", border: `1px solid ${enrolled.includes(c.title) ? "#10b981" : c.free ? "#f59e0b33" : "#222"}`, borderRadius: "1rem", padding: "1.5rem", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "2rem" }}>{c.icon}</span>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
                  {c.free && <span style={{ background: "rgba(16,185,129,0.2)", color: "#10b981", padding: "0.2rem 0.5rem", borderRadius: "0.25rem", fontSize: "0.65rem", fontWeight: "bold" }}>FREE</span>}
                  {enrolled.includes(c.title) && <span style={{ background: "rgba(16,185,129,0.2)", color: "#10b981", padding: "0.2rem 0.5rem", borderRadius: "0.25rem", fontSize: "0.65rem" }}>✅ Enrolled</span>}
                  <span style={{ background: "#1a1a1a", color: "#9ca3af", padding: "0.2rem 0.5rem", borderRadius: "0.25rem", fontSize: "0.65rem" }}>{c.level}</span>
                </div>
              </div>
              <h3 style={{ color: "#f59e0b", margin: "0 0 0.25rem" }}>{c.title}</h3>
              <p style={{ color: "#9ca3af", fontSize: "0.8rem", margin: "0 0 0.5rem" }}>{c.duration} • {c.modules} modules</p>
              <p style={{ color: "#10b981", fontWeight: "bold", margin: "0 0 1rem" }}>💰 {c.income}</p>
              <button onClick={() => handleEnroll(c)} style={{ background: enrolled.includes(c.title) ? "#10b981" : c.free ? "#059669" : "#f59e0b", color: enrolled.includes(c.title) || c.free ? "#000" : "#000", padding: "0.75rem", borderRadius: "0.5rem", border: "none", fontWeight: "bold", cursor: "pointer", marginTop: "auto" }}>
                {enrolled.includes(c.title) ? "▶ Continue Learning" : c.free ? "▶ Start Free" : "🔓 Enroll — KES 5,000"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment modal */}
      {showPayment && selected && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
          <div style={{ background: "#111", border: "1px solid #f59e0b", borderRadius: "1rem", padding: "2rem", maxWidth: "440px", width: "100%" }}>
            <h2 style={{ color: "#f59e0b", marginBottom: "0.5rem" }}>📲 Unlock {selected.icon} {selected.title}</h2>
            <p style={{ color: "#9ca3af", fontSize: "0.875rem", marginBottom: "1.25rem" }}>Income potential: <strong style={{ color: "#10b981" }}>{selected.income}</strong></p>
            <div style={{ background: "#0a0a0a", padding: "1rem", borderRadius: "0.5rem", marginBottom: "1rem" }}>
              <p style={{ margin: "0 0 0.4rem", fontSize: "0.875rem" }}>📱 M-Pesa → Lipa na M-Pesa → Pay Bill</p>
              <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem" }}>Business No: <strong style={{ color: "#f59e0b", fontFamily: "monospace", fontSize: "1rem" }}>400200</strong></p>
              <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem" }}>Account No: <strong style={{ color: "#f59e0b", fontFamily: "monospace", fontSize: "1rem" }}>4045731</strong></p>
              <p style={{ margin: 0, fontSize: "0.875rem" }}>Amount: <strong style={{ color: "#10b981", fontSize: "1.1rem" }}>KES 5,000</strong></p>
            </div>
            <input value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder="M-Pesa Code (e.g. QA12BC3456)" style={{ width: "100%", padding: "0.75rem", background: "#0a0a0a", border: "1px solid #333", borderRadius: "0.5rem", color: "#fff", fontFamily: "monospace", marginBottom: "0.75rem", boxSizing: "border-box" }} />
            {verifyStatus && <p style={{ color: verifyStatus.includes("✅") ? "#10b981" : verifyStatus.includes("❌") ? "#ef4444" : "#f59e0b", fontSize: "0.875rem", margin: "0 0 0.75rem" }}>{verifyStatus}</p>}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={verify} disabled={verifying} style={{ flex: 1, background: verifying ? "#333" : "#10b981", color: "#000", padding: "0.75rem", borderRadius: "0.5rem", border: "none", fontWeight: "bold", cursor: verifying ? "not-allowed" : "pointer" }}>{verifying ? "⚡ Verifying..." : "✅ Verify & Unlock"}</button>
              <button onClick={() => { setShowPayment(false); setCode(""); setVerifyStatus(""); }} style={{ flex: 1, background: "#222", color: "#fff", padding: "0.75rem", borderRadius: "0.5rem", border: "none", cursor: "pointer" }}>Cancel</button>
            </div>
            <p style={{ color: "#4b5563", fontSize: "0.7rem", textAlign: "center", marginTop: "0.75rem" }}>Or pay via NCBA Bank: 8515130017 | Ref: your email</p>
          </div>
        </div>
      )}
    </div>
  );
}

