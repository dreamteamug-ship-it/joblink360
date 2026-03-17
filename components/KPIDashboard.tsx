'use client'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function KPIDashboard({ data }) {
  return (
    <div className="bg-[#0a0a0a] p-6 border border-gold/20 rounded-xl shadow-2xl">
      <h3 className="text-gold uppercase tracking-tighter mb-4 font-bold">5-Year Growth Velocity</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#800000" />
            <YAxis stroke="#800000" />
            <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #800000' }} />
            <Line type="monotone" dataKey="projected" stroke="#FFD700" strokeWidth={3} dot={{ fill: '#800000' }} />
            <Line type="monotone" dataKey="actual" stroke="#FFF" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-[10px] text-maroon mt-4 font-mono uppercase">Data Source: Titanium CFO Bot // Verified by CTO</p>
    </div>
  );
}
