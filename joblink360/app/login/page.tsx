"use client";
export const dynamic = 'force-dynamic';
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export default function LoginPage() {
  const [mode, setMode] = useState<"magic"|"password"|"signup">("magic");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleMagicLink = async () => {
    if (!email) { setError("Enter your email"); return; }
    setLoading(true); setError(""); setMessage("");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    });
    if (error) setError(error.message);
    else setMessage(`✅ Magic link sent to ${email}! Check your inbox and click the link to sign in.`);
    setLoading(false);
  };

  const handlePassword = async () => {
    if (!email || !password) { setError("Enter email and password"); return; }
    setLoading(true); setError("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else window.location.href = "/dashboard";
    setLoading(false);
  };

  const handleSignup = async () => {
    if (!email || !password) { setError("Enter email and password"); return; }
    setLoading(true); setError("");
    const { error } = await supabase.auth.signUp({
      email, password,
      options: {
        data: { full_name: name || email.split("@")[0] },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });
    if (error) setError(error.message);
    else setMessage("✅ Account created! Check your email to confirm, then sign in.");
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui", padding: "1rem" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ color: "#f59e0b", fontSize: "2rem", fontWeight: "bold", margin: "0 0 0.5rem" }}>⚡ JobLink 360</h1>
          <p style={{ color: "#9ca3af", margin: 0 }}>Transform Learners into Earners in 90 Days</p>
        </div>

        <div style={{ background: "#111", border: "1px solid #222", borderRadius: "1rem", padding: "2rem" }}>
          {/* Mode tabs */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {[
              { key: "magic", label: "✨ Magic Link" },
              { key: "password", label: "🔑 Password" },
              { key: "signup", label: "📝 Sign Up" },
            ].map(t => (
              <button key={t.key} onClick={() => { setMode(t.key as any); setError(""); setMessage(""); }} style={{ flex: 1, padding: "0.6rem", background: mode === t.key ? "#f59e0b" : "#1a1a1a", color: mode === t.key ? "#000" : "#9ca3af", border: "1px solid #333", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.75rem", fontWeight: mode === t.key ? "bold" : "normal" }}>
                {t.label}
              </button>
            ))}
          </div>

          {mode === "signup" && (
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "0.4rem" }}>Full Name</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Wanjiku Kamau" style={{ width: "100%", padding: "0.75rem", background: "#0a0a0a", border: "1px solid #333", borderRadius: "0.5rem", color: "#fff", boxSizing: "border-box" }} />
            </div>
          )}

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "0.4rem" }}>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={{ width: "100%", padding: "0.75rem", background: "#0a0a0a", border: "1px solid #333", borderRadius: "0.5rem", color: "#fff", boxSizing: "border-box" }} />
          </div>

          {(mode === "password" || mode === "signup") && (
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "0.4rem" }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === "Enter" && (mode === "password" ? handlePassword() : handleSignup())} style={{ width: "100%", padding: "0.75rem", background: "#0a0a0a", border: "1px solid #333", borderRadius: "0.5rem", color: "#fff", boxSizing: "border-box" }} />
            </div>
          )}

          {error && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "0.5rem", padding: "0.75rem", color: "#ef4444", fontSize: "0.85rem", marginBottom: "1rem" }}>{error}</div>}
          {message && <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "0.5rem", padding: "0.75rem", color: "#10b981", fontSize: "0.85rem", marginBottom: "1rem" }}>{message}</div>}

          <button
            onClick={mode === "magic" ? handleMagicLink : mode === "password" ? handlePassword : handleSignup}
            disabled={loading}
            style={{ width: "100%", padding: "0.875rem", background: loading ? "#333" : "#f59e0b", color: loading ? "#666" : "#000", border: "none", borderRadius: "0.5rem", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", fontSize: "1rem" }}>
            {loading ? "Processing..." : mode === "magic" ? "✨ Send Magic Link" : mode === "password" ? "🔑 Sign In" : "📝 Create Account"}
          </button>

          {mode === "magic" && !message && (
            <p style={{ color: "#6b7280", fontSize: "0.75rem", textAlign: "center", marginTop: "1rem" }}>No password needed — we email you a one-click sign in link</p>
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <p style={{ color: "#6b7280", fontSize: "0.8rem", margin: "0 0 0.5rem" }}>New to JobLink 360?</p>
          <Link href="/pay" style={{ color: "#f59e0b", textDecoration: "none", fontWeight: "bold" }}>Enroll Now — KES 5,000 via M-Pesa Paybill 400200</Link>
        </div>
      </div>
    </div>
  );
}

