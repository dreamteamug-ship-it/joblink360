'use client'
import { useState, useEffect } from 'react';

export default function CommandGuard({ children }: { children: React.ReactNode }) {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [credentials, setCredentials] = useState({ user: '', pass: '' });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // SECRET TRIGGER: CTRL + SHIFT + E
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        setShowLogin(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // CTO LEVEL CHECK
    if (credentials.user === 'admin' && credentials.pass === '2026') {
      setIsAuthorized(true);
      setShowLogin(false);
      console.log("CTO Sande Allan Authenticated. Command Centre Unlocked.");
    } else {
      alert("UNAUTHORIZED ACCESS DETECTED. SENTINEL NOTIFIED.");
    }
  };

  if (isAuthorized) return <>{children}</>;
  if (!showLogin) return null; // Site remains "Ghost"

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-[9999] border-4 border-maroon">
      <form onSubmit={handleLogin} className="p-8 bg-black border border-gold shadow-[0_0_50px_rgba(128,0,0,0.5)]">
        <h2 className="text-gold text-2xl font-bold mb-6 tracking-tighter uppercase">Titanium Auth Layer</h2>
        <input 
          type="text" 
          placeholder="SECURE_ID" 
          className="w-full bg-gray-900 text-white p-3 mb-4 border border-maroon outline-none"
          onChange={e => setCredentials({...credentials, user: e.target.value})}
        />
        <input 
          type="password" 
          placeholder="ENCRYPTED_KEY" 
          className="w-full bg-gray-900 text-white p-3 mb-6 border border-maroon outline-none"
          onChange={e => setCredentials({...credentials, pass: e.target.value})}
        />
        <button className="w-full bg-maroon text-gold font-bold p-3 hover:bg-red-900 transition-all">
          AUTHORIZE ACCESS
        </button>
      </form>
    </div>
  );
}
