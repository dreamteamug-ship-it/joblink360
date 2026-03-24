"use client";

import { useState } from "react";
import { Brain, Send, Mic, Volume2, VolumeX, Crown } from "lucide-react";

export default function AmandaPortal() {
  const [messages, setMessages] = useState([
    { role: "amanda", content: "Welcome, Sovereign. AMANDA is ready. 312 agents active. How may I serve you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const responses = [
    "I've analyzed your request. All subsidiaries report optimal performance. Security posture at 99.8%.",
    "The intelligence swarm is processing. Would you like a detailed report?",
    "JobLinks Africa: 47 new candidates today. 12 matched to active positions.",
    "Altovex Global: 89 shipments processed. Cross-border efficiency at 94%.",
    "DreamTeQ 360: Weather patterns favorable. Yield forecasts increased by 3%.",
    "Shall I schedule a video meeting with the executive team?"
  ];

  const speakText = (text: string) => {
    if (!voiceEnabled) return;
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    setTimeout(() => {
      const response = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: "amanda", content: response }]);
      speakText(response);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050B14] to-[#0A0F1A]">
      <header className="bg-[#0A0F1A] border-b border-[#D4AF37]/30 p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Crown className="text-[#D4AF37]" size={28} />
            <div>
              <h1 className="text-xl font-bold">AMANDA Portal</h1>
              <p className="text-xs opacity-70">Voice-Enabled AI Assistant</p>
            </div>
          </div>
          <button onClick={() => setVoiceEnabled(!voiceEnabled)} className="p-2 bg-gray-800 rounded-lg">
            {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      </header>
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-6">
          <div className="inline-block p-4 bg-[#D4AF37]/10 rounded-full mb-4">
            <Brain size={48} className="text-[#D4AF37]" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Meet AMANDA</h2>
          <p className="text-gray-400">Your AI-powered sovereign assistant. Voice-enabled, always ready.</p>
          {isSpeaking && (
            <div className="mt-3 flex justify-center gap-1">
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse"></span>
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse delay-100"></span>
              <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse delay-200"></span>
            </div>
          )}
        </div>
        <div className="bg-[#0A0F1A] rounded-2xl border border-[#D4AF37]/20 overflow-hidden">
          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "amanda" ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[80%] p-3 rounded-xl ${msg.role === "amanda" ? "bg-[#1A1F2E] border-l-4 border-[#D4AF37]" : "bg-[#D4AF37] text-black"}`}>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-[#D4AF37]/20 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message to AMANDA..."
              className="flex-1 px-4 py-2 bg-[#050B14] rounded-lg border border-[#D4AF37]/30 focus:border-[#D4AF37] outline-none"
            />
            <button onClick={sendMessage} className="px-4 py-2 bg-[#D4AF37] text-black rounded-lg">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
