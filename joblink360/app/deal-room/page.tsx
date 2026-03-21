'use client';
export const dynamic = 'force-dynamic';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function DealRoom() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/login');
      } else {
        setUser(data.user);
      }
      setLoading(false);
    });
  }, []);

  const createMeeting = async () => {
    const newId = Math.random().toString(36).substring(2, 10).toUpperCase();
    router.push(`/deal-room/meeting/${newId}`);
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
      <div className="relative bg-gradient-to-b from-zinc-900 via-black to-black py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block mb-4 px-4 py-1 border border-amber-500/30 rounded-full bg-amber-500/10">
            <span className="text-amber-500 text-sm">AI-Powered by Amanda</span>
          </div>
          <h1 className="text-7xl font-black text-amber-500 mb-6 tracking-tighter">Deal Room</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Ultra-luxury AI-powered meeting platform with Amanda as your intelligent host.
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            <button
              onClick={createMeeting}
              className="bg-amber-600 hover:bg-amber-500 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
            >
              ðŸŽ¯ Create Deal Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

