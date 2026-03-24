"use client";

import { useState } from "react";
import { MessageSquare, Send, Mic, Crown } from "lucide-react";

export default function AmandaChat() {
  const [messages, setMessages] = useState([
    { role: "amanda", content: "Welcome! AMANDA here. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const responses = [
    "I can help with that. Please provide more details.",
    "The system is operating at optimal levels. All subsidiaries reporting normal activity.",
    "Would you like me to generate a full report?",
    "I'm processing your request through the intelligence swarm."
  ];

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    setTimeout(() => {
      const response = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: "amanda", content: response }]);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050B14] to-[#0A0F1A]">
      <header className="bg-[#0A0F1A] border-b border-[#D4AF37]/30 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Crown className="text-[#D4AF37]" size={28} />
          <div>
            <h1 className="text-xl font-bold">AMANDA Chat</h1>
            <p className="text-xs opacity-70">AI Assistant · 312 Agents</p>
          </div>
        </div>
      </header>
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-[#0A0F1A] rounded-2xl border border-[#D4AF37]/20 overflow-hidden">
          <div className="h-[500px] overflow-y-auto p-4 space-y-4">
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
              placeholder="Type your message..."
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
