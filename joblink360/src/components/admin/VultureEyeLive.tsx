'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function VultureEyeLive() {
  const [payments, setPayments] = useState([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchPayments = async () => {
      const { data } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      setPayments(data || []);
    };

    fetchPayments();
    const subscription = supabase
      .channel('payment_updates')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'payments' }, fetchPayments)
      .subscribe();

    return () => { supabase.removeChannel(subscription); };
  }, []);

  return (
    <div className="p-6 bg-black border border-[#d4af37] rounded-2xl font-mono">
      <h2 className="text-[#d4af37] text-xl mb-4 uppercase">Vulture-Eye Live Recon</h2>
      <div className="space-y-2">
        {payments.map(p => (
          <div key={p.id} className="flex justify-between border-b border-white/10 py-2 text-xs">
            <span className="text-zinc-400">{p.transaction_id}</span>
            <span className={p.status === 'HARDENED' ? 'text-emerald-500' : 'text-amber-500'}>
              {p.currency} {p.amount} - {p.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
