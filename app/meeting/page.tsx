// app/meeting/page.tsx
'use client';
import { useState, useEffect } from 'react';

export default function MeetingRoomPage() {
  const [meetingId, setMeetingId] = useState('');
  const [participants, setParticipants] = useState([]);
  const [isHost, setIsHost] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showAmanda, setShowAmanda] = useState(true);
  const [transcript, setTranscript] = useState([]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // Generate meeting ID on load
    setMeetingId(`TITANIUM-${Date.now().toString(36).toUpperCase()}`);
    
    // Mock participants
    setParticipants([
      { id: 1, name: 'Sande Allan', role: 'CIO', avatar: '👨🏾‍💼', isSpeaking: false },
      { id: 2, name: 'Grace Muhwezi', role: 'COO', avatar: '👩🏾‍💼', isSpeaking: false },
      { id: 3, name: 'Amanda AI', role: 'Chief AI Officer', avatar: '🤖', isSpeaking: true, ai: true },
      { id: 4, name: 'Kwame', role: 'Skills Agent', avatar: '🎓', isSpeaking: false, ai: true },
      { id: 5, name: 'Amara', role: 'Funding Agent', avatar: '💰', isSpeaking: false, ai: true }
    ]);

    // Simulate Amanda speaking
    const interval = setInterval(() => {
      if (showAmanda) {
        setTranscript(prev => [...prev, {
          id: Date.now(),
          speaker: 'Amanda AI',
          message: "Based on our discussion, I recommend focusing on the Sovereign Intelligence module. I've already scheduled follow-ups with the team.",
          timestamp: new Date().toLocaleTimeString()
        }]);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [showAmanda]);

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleVideo = () => setIsVideoOn(!isVideoOn);

  return (
    <div className="min-h-screen bg-[#070F1A] text-[#F5F5DC] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-bold text-[#C9A84C] mb-2">🎥 Titanium Executive Meeting</h1>
            <p className="text-[#F5F5DC]/70">AI-powered ultra-luxury conference room with Amanda</p>
          </div>
          <div className="bg-gradient-to-r from-[#800000] to-[#C9A84C] px-6 py-3 rounded-lg">
            <span className="text-white font-bold">Meeting ID: {meetingId}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Video Grid */}
          <div className="col-span-2">
            <div className="bg-[#020202] rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Host Video */}
                <div className="relative bg-gradient-to-br from-[#800000] to-[#1A2A44] aspect-video rounded-lg overflow-hidden">
                  {isVideoOn ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-[#C9A84C]/30 flex items-center justify-center">
                        <span className="text-6xl">👨🏾‍💼</span>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#1A2A44]">
                      <span className="text-6xl">🎥</span>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 bg-black/70 px-3 py-1 rounded-full text-xs">
                    Sande Allan (Host)
                    {isMuted && <span className="ml-2 text-red-500">🔇</span>}
                  </div>
                </div>

                {/* Amanda AI Video */}
                <div className="relative bg-gradient-to-br from-[#C9A84C] to-[#800000] aspect-video rounded-lg overflow-hidden border-2 border-[#C9A84C] shadow-lg shadow-[#C9A84C]/30">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                        <span className="text-6xl">🤖</span>
                      </div>
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black/70 px-3 py-1 rounded-full text-xs">
                    Amanda AI (Chief Agent)
                    <span className="ml-2 text-green-500">● Speaking</span>
                  </div>
                  <div className="absolute top-2 right-2 bg-[#C9A84C] text-[#020202] px-2 py-1 rounded-full text-xs font-bold">
                    AI POWERED
                  </div>
                </div>

                {/* Other Participants */}
                {participants.filter(p => !p.ai).map((p) => (
                  <div key={p.id} className="relative bg-[#1A2A44] aspect-video rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl">{p.avatar}</span>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/70 px-3 py-1 rounded-full text-xs">
                      {p.name}
                    </div>
                  </div>
                ))}

                {/* AI Agents */}
                {participants.filter(p => p.ai && p.name !== 'Amanda AI').map((p) => (
                  <div key={p.id} className="relative bg-gradient-to-br from-[#C9A84C]/30 to-[#800000]/30 aspect-video rounded-lg overflow-hidden border border-[#C9A84C]/30">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl">{p.avatar}</span>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/70 px-3 py-1 rounded-full text-xs">
                      {p.name}
                      <span className="ml-2 text-green-500">●</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={toggleMute}
                  className={`p-4 rounded-full transition ${
                    isMuted ? 'bg-red-500' : 'bg-[#1A2A44] hover:bg-[#1A2A44]/80'
                  }`}
                >
                  {isMuted ? '🔇' : '🎤'}
                </button>
                <button
                  onClick={toggleVideo}
                  className={`p-4 rounded-full transition ${
                    !isVideoOn ? 'bg-red-500' : 'bg-[#1A2A44] hover:bg-[#1A2A44]/80'
                  }`}
                >
                  {isVideoOn ? '📹' : '🚫'}
                </button>
                <button
                  onClick={() => setShowAmanda(!showAmanda)}
                  className={`p-4 rounded-full transition ${
                    showAmanda ? 'bg-[#C9A84C]' : 'bg-[#1A2A44]'
                  }`}
                >
                  🤖
                </button>
                <button className="p-4 bg-[#1A2A44] rounded-full hover:bg-[#1A2A44]/80 transition">
                  📧
                </button>
                <button className="p-4 bg-[#800000] rounded-full hover:bg-[#800000]/80 transition">
                  ✕
                </button>
              </div>
            </div>
          </div>

          {/* AI Transcript & Notes */}
          <div className="col-span-1">
            <div className="bg-[#020202] rounded-lg p-6 h-[600px] flex flex-col">
              <h2 className="text-xl font-bold text-[#C9A84C] mb-4">📝 AI Transcript</h2>
              
              <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                {transcript.map((item) => (
                  <div key={item.id} className="bg-[#070F1A] p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-bold text-[#C9A84C]">{item.speaker}</span>
                      <span className="text-xs text-[#F5F5DC]/40">{item.timestamp}</span>
                    </div>
                    <p className="text-sm">{item.message}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#C9A84C]/20 pt-4">
                <h3 className="text-sm font-bold mb-2">Meeting Notes</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Amanda is taking notes..."
                  className="w-full h-32 p-3 bg-[#070F1A] rounded-lg border border-[#C9A84C]/30 text-sm resize-none"
                />
                <p className="text-xs text-[#F5F5DC]/40 mt-2">
                  Amanda will automatically generate action items
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Action Items */}
        <div className="mt-8 bg-gradient-to-r from-[#800000] to-[#C9A84C] p-6 rounded-lg">
          <h3 className="text-lg font-bold text-white mb-4">🤖 Amanda's Action Items</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-sm font-bold">📅 Schedule Follow-up</p>
              <p className="text-xs">With Grace - Tomorrow 10 AM</p>
            </div>
            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-sm font-bold">📊 Generate Report</p>
              <p className="text-xs">Q1 Financial Summary</p>
            </div>
            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-sm font-bold">🎯 Match Candidates</p>
              <p className="text-xs">3 UAE positions ready</p>
            </div>
            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-sm font-bold">📧 Send Summary</p>
              <p className="text-xs">To all participants</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}