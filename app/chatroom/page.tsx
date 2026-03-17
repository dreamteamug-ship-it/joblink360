// app/chatroom/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { whatsAppAmanda } from '@/lib/media/whatsapp/amanda-chat';

export default function ChatroomPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState('+254712345678');
  const [loading, setLoading] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');

  useEffect(() => {
    loadChatHistory();
    loadContacts();
  }, [selectedContact]);

  const loadChatHistory = async () => {
    const history = await whatsAppAmanda.getChatHistory(selectedContact, 50);
    setMessages(history);
  };

  const loadContacts = () => {
    setContacts([
      { phone: '+254712345678', name: 'John K.', lastActive: '5 min ago', unread: 2 },
      { phone: '+254723456789', name: 'Sarah W.', lastActive: '1 hour ago', unread: 0 },
      { phone: '+254734567890', name: 'Peter O.', lastActive: '3 hours ago', unread: 0 },
      { phone: '+256712345678', name: 'Grace M.', lastActive: '1 day ago', unread: 0 },
      { phone: '+255712345678', name: 'James T.', lastActive: '2 days ago', unread: 0 }
    ]);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const result = await whatsAppAmanda.sendMessage(selectedContact, input);
    
    setMessages([...messages, {
      id: result.messageId,
      from: 'user',
      to: selectedContact,
      message: input,
      timestamp: new Date().toISOString(),
      status: 'sent'
    }]);
    
    setInput('');
    
    // Simulate Amanda's response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `msg-${Date.now()}`,
        from: 'amanda',
        to: selectedContact,
        message: "Thank you for your message. I'll analyze your query and get back to you shortly with personalized career advice.",
        timestamp: new Date().toISOString(),
        status: 'delivered'
      }]);
    }, 2000);

    setLoading(false);
  };

  const sendBroadcast = async () => {
    if (!broadcastMessage.trim()) return;
    
    const result = await whatsAppAmanda.broadcastMessage(
      contacts.map(c => c.phone),
      broadcastMessage
    );
    
    alert(`Broadcast sent to ${result.total} contacts!`);
    setBroadcastMessage('');
  };

  return (
    <div className="min-h-screen bg-[#070F1A] text-[#F5F5DC] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold text-[#C9A84C] mb-2">💬 Amanda WhatsApp Chatroom</h1>
            <p className="text-[#F5F5DC]/70">
              AI-powered WhatsApp integration with multi-agent support
            </p>
          </div>
          <div className="bg-[#25D366] px-6 py-3 rounded-lg">
            <span className="text-white font-bold">📱 WhatsApp Connected</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-[#020202] p-4 rounded-lg border-l-4 border-[#25D366]">
            <p className="text-sm text-[#F5F5DC]/60">Active Chats</p>
            <p className="text-2xl font-bold">24</p>
          </div>
          <div className="bg-[#020202] p-4 rounded-lg">
            <p className="text-sm text-[#F5F5DC]/60">Unread Messages</p>
            <p className="text-2xl font-bold">12</p>
          </div>
          <div className="bg-[#020202] p-4 rounded-lg">
            <p className="text-sm text-[#F5F5DC]/60">Contacts</p>
            <p className="text-2xl font-bold">847</p>
          </div>
          <div className="bg-[#020202] p-4 rounded-lg">
            <p className="text-sm text-[#F5F5DC]/60">Broadcasts Sent</p>
            <p className="text-2xl font-bold">156</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Contacts List */}
          <div className="col-span-1 bg-[#020202] rounded-lg p-4">
            <h2 className="text-xl font-bold text-[#C9A84C] mb-4">Contacts</h2>
            <div className="space-y-3">
              {contacts.map((contact, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg cursor-pointer transition ${
                    selectedContact === contact.phone 
                      ? 'bg-[#25D366]/20 border border-[#25D366]' 
                      : 'bg-[#070F1A] hover:bg-[#070F1A]/80'
                  }`}
                  onClick={() => setSelectedContact(contact.phone)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold">{contact.name}</p>
                      <p className="text-xs text-[#F5F5DC]/60">{contact.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#F5F5DC]/60">{contact.lastActive}</p>
                      {contact.unread > 0 && (
                        <span className="bg-[#25D366] text-white text-xs px-2 py-1 rounded-full">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="col-span-2">
            <div className="bg-[#020202] rounded-lg p-6 h-[600px] flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        msg.from === 'user'
                          ? 'bg-[#25D366] text-white'
                          : msg.from === 'amanda'
                          ? 'bg-[#C9A84C] text-[#020202]'
                          : 'bg-[#070F1A] text-[#F5F5DC]'
                      }`}
                    >
                      {msg.from === 'amanda' && (
                        <p className="text-xs font-bold mb-1">Amanda AI</p>
                      )}
                      <p>{msg.message}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 p-3 bg-[#070F1A] rounded-lg border border-[#25D366]/30 focus:border-[#25D366] focus:outline-none"
                  disabled={loading}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading}
                  className="px-6 py-3 bg-[#25D366] text-white rounded-lg font-bold hover:bg-[#25D366]/80 transition disabled:opacity-50"
                >
                  {loading ? '...' : 'Send'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Broadcast Section */}
        <div className="mt-8 bg-[#020202] p-6 rounded-lg">
          <h2 className="text-xl font-bold text-[#C9A84C] mb-4">📢 WhatsApp Broadcast</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              placeholder="Enter broadcast message for all contacts..."
              className="flex-1 p-3 bg-[#070F1A] rounded-lg border border-[#C9A84C]/30"
            />
            <button
              onClick={sendBroadcast}
              className="px-6 py-3 bg-[#C9A84C] text-[#020202] rounded-lg font-bold hover:bg-[#C9A84C]/80 transition"
            >
              Send Broadcast
            </button>
          </div>
        </div>

        {/* Analytics */}
        <div className="mt-8 grid grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-[#25D366] to-[#075E54] p-4 rounded-lg">
            <p className="text-sm text-white/80">Response Rate</p>
            <p className="text-2xl font-bold text-white">98%</p>
          </div>
          <div className="bg-gradient-to-r from-[#C9A84C] to-[#800000] p-4 rounded-lg">
            <p className="text-sm text-white/80">Avg Response Time</p>
            <p className="text-2xl font-bold text-white">2.4 min</p>
          </div>
          <div className="bg-gradient-to-r from-[#800000] to-[#1A2A44] p-4 rounded-lg">
            <p className="text-sm text-white/80">Conversion Rate</p>
            <p className="text-2xl font-bold text-white">67%</p>
          </div>
        </div>
      </div>
    </div>
  );
}