'use client';
export const dynamic = 'force-dynamic';
import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    const { error } = await supabase
      .from('contact_messages')
      .insert([{ ...formData, created_at: new Date().toISOString() }]);
    
    if (error) {
      setError(error.message);
    } else {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="bg-gradient-to-b from-zinc-900 to-black py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-black text-amber-500 mb-4">Contact Us</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">Get in touch with the JobLink 360 team</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-amber-500 mb-6">Send a Message</h2>
            
            {submitted ? (
              <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-center">
                <p className="text-green-500">Thank you! We'll get back to you soon.</p>
                <button onClick={() => setSubmitted(false)} className="mt-4 text-amber-500">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="bg-red-500/20 border border-red-500 p-3 rounded text-red-500">{error}</div>}
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your Name" className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-amber-500 outline-none" required />
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Your Email" className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-amber-500 outline-none" required />
                <textarea rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Your Message" className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:border-amber-500 outline-none" required />
                <button type="submit" disabled={submitting} className="w-full bg-amber-600 hover:bg-amber-500 p-3 rounded-lg font-bold transition disabled:opacity-50">Send Message</button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-amber-500 mb-6">Contact Information</h2>
            <div className="space-y-4">
              <p><strong>ðŸ“ Address:</strong> Off Mombasa Road, Hari Industrial Park, Nairobi, Kenya</p>
              <p><strong>ðŸ“® P.O. Box:</strong> 3515-00100, Nairobi</p>
              <p><strong>ðŸ“ž Phone:</strong> +254 718 554 383</p>
              <p><strong>ðŸ“± Mobile:</strong> +254 753 005 989</p>
              <p><strong>ðŸ“§ Email:</strong> dtc@dreamteamconsult.net</p>
              <p><strong>ðŸŒ Website:</strong> joblink360-gamma.vercel.app</p>
              <p><strong>ðŸ•’ Hours:</strong> Monday - Friday, 9am - 5pm EAT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

