'use client'
import dynamic from 'next/dynamic';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// This ensures the chart only loads in the browser
const Dashboard = () => {
  const data = [
    { name: 'Mar', projected: 51000000 },
    { name: 'Apr', projected: 65000000 },
    { name: 'May', projected: 82000000 },
    { name: 'Jun', projected: 105000000 },
  ];

  return (
    <div className="bg-[#0a0a0a] p-6 border border-gold/20 rounded-xl shadow-2xl">
      <h3 className="text-gold uppercase tracking-tighter mb-4 font-bold">Growth Velocity (KES)</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#800000" />
            <YAxis stroke="#800000" />
            <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #800000' }} />
            <Line type="monotone" dataKey="projected" stroke="#FFD700" strokeWidth={3} dot={{ fill: '#800000' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });
