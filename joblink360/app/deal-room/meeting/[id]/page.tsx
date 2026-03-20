'use client';
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function MeetingRoom() {
  const params = useParams();
  const router = useRouter();
  const meetingId = params.id;
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const videoRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login');
      else {
        setUser(data.user);
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then(stream => { if (videoRef.current) videoRef.current.srcObject = stream; })
          .catch(console.error);
      }
    });
  }, []);

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    const newMessage = { meeting_id: meetingId, user_id: user?.id, user_name: user?.email, message: text, created_at: new Date().toISOString() };
    await supabase.from('meeting_messages').insert(newMessage);
    setMessages(prev => [...prev, newMessage]);
    setInput('');
  };

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) return;
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.onresult = (e) => sendMessage(e.results[0][0].transcript);
    recognition.start();
    setIsListening(true);
    recognition.onend = () => setIsListening(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="bg-zinc-900 p-4"><h1 className="text-amber-500">Deal Room: {meetingId}</h1></div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          <div><video ref={videoRef} autoPlay muted className="w-full bg-black rounded" /></div>
          <div className="bg-zinc-900 rounded p-4 h-96 overflow-auto">
            {messages.map((m, i) => <div key={i} className="mb-2"><b>{m.user_name}:</b> {m.message}</div>)}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendMessage(input)} className="flex-1 p-2 rounded bg-zinc-800" />
          <button onClick={startVoiceInput} className="bg-amber-600 px-4 py-2 rounded">{isListening ? 'Listening...' : '🎤'}</button>
          <button onClick={() => sendMessage(input)} className="bg-blue-600 px-4 py-2 rounded">Send</button>
        </div>
      </div>
    </div>
  );
}