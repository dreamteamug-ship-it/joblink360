'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function DealRoom() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMeeting, setActiveMeeting] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [isHosting, setIsHosting] = useState(false);
  const [meetingId, setMeetingId] = useState('');
  const [amandaActive, setAmandaActive] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/login');
      } else {
        setUser(data.user);
        fetchMeetings();
      }
      setLoading(false);
    });
  }, []);

  const fetchMeetings = async () => {
    const { data } = await supabase
      .from('meetings')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });
    setMeetings(data || []);
  };

  const createMeeting = async () => {
    const newId = Math.random().toString(36).substring(2, 10).toUpperCase();
    const { data } = await supabase
      .from('meetings')
      .insert({
        meeting_id: newId,
        user_id: user?.id,
        title: `Deal Room ${newId}`,
        status: 'active',
        created_at: new Date().toISOString()
      })
      .select();
    
    if (data) {
      setActiveMeeting(data[0]);
      router.push(`/deal-room/meeting/${newId}`);
    }
  };

  const joinMeeting = (meetingId) => {
    router.push(`/deal-room/meeting/${meetingId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-amber-500">Loading Deal Room...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-zinc-900 via-black to-black py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-1 border border-amber-500/30 rounded-full bg-amber-500/10">
            <span className="text-amber-500 text-sm">AI-Powered by Amanda</span>
          </div>
          <h1 className="text-7xl font-black text-amber-500 mb-6 tracking-tighter">Deal Room</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Ultra-luxury AI-powered meeting platform with Amanda as your intelligent host.
            Close deals, negotiate contracts, and build relationships in style.
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            <button
              onClick={createMeeting}
              className="bg-amber-600 hover:bg-amber-500 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-amber-500/20"
            >
              ?? Create Deal Room
            </button>
            {activeMeeting && (
              <button
                onClick={() => joinMeeting(activeMeeting.meeting_id)}
                className="border border-amber-500 hover:bg-amber-500/10 px-8 py-4 rounded-xl font-bold text-lg transition-all"
              >
                Join Active Meeting
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Amanda AI Status */}
      <div className="bg-zinc-900/50 border-y border-amber-500/20 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-sm text-amber-500 font-mono">AMANDA AI: ACTIVE & LISTENING</span>
              <span className="text-xs text-zinc-500">| Voice & Text Enabled</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setAmandaActive(!amandaActive)}
                className={`px-3 py-1 rounded-lg text-xs transition ${amandaActive ? 'bg-amber-500/20 text-amber-500' : 'bg-zinc-800 text-zinc-500'}`}
              >
                {amandaActive ? '??? AI Assistant ON' : '?? AI Assistant OFF'}
              </button>
              <div className="text-xs text-zinc-500">Deal Room v1.0 | Sovereign Intelligence</div>
            </div>
          </div>
        </div>
      </div>

      {/* Meeting Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-amber-500">Your Deal Rooms</h2>
          <button
            onClick={createMeeting}
            className="bg-amber-600 hover:bg-amber-500 px-4 py-2 rounded-lg text-sm font-bold transition"
          >
            + New Meeting
          </button>
        </div>

        {meetings.length === 0 ? (
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">??</div>
            <h3 className="text-xl font-bold mb-2">No Deal Rooms Yet</h3>
            <p className="text-zinc-500 mb-6">Create your first AI-powered deal room to start closing high-value deals.</p>
            <button
              onClick={createMeeting}
              className="bg-amber-600 hover:bg-amber-500 px-6 py-3 rounded-xl font-bold transition"
            >
              Create Deal Room
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meetings.map((meeting) => (
              <div
                key={meeting.id}
                className="group border border-zinc-800 bg-zinc-900/30 rounded-2xl p-6 hover:border-amber-500/50 transition-all hover:bg-zinc-900 cursor-pointer"
                onClick={() => joinMeeting(meeting.meeting_id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <span className="text-amber-500 text-xl">??</span>
                  </div>
                  <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded">Active</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-amber-500 transition">{meeting.title}</h3>
                <p className="text-sm text-zinc-500 mb-4">Meeting ID: {meeting.meeting_id}</p>
                <div className="flex items-center gap-2 text-xs text-zinc-600">
                  <span>Created: {new Date(meeting.created_at).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>AI Host: Amanda</span>
                </div>
                <button className="mt-4 w-full bg-zinc-800 hover:bg-amber-600 py-2 rounded-lg text-sm font-bold transition group-hover:bg-amber-600">
                  Join Deal Room ?
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-zinc-900/30 py-16 mt-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Sovereign Meeting Intelligence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">???</div>
              <h3 className="text-xl font-bold mb-2">AI Voice Assistant</h3>
              <p className="text-zinc-500 text-sm">Amanda listens, transcribes, and assists in real-time during meetings</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">??</div>
              <h3 className="text-xl font-bold mb-2">Intelligent Summaries</h3>
              <p className="text-zinc-500 text-sm">Auto-generated meeting notes, action items, and deal insights</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">??</div>
              <h3 className="text-xl font-bold mb-2">Secure & Encrypted</h3>
              <p className="text-zinc-500 text-sm">End-to-end encryption for sensitive deal conversations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
