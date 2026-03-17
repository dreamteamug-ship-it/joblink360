import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '50,234', change: '+12%' },
    { label: 'Active Jobs', value: '2,547', change: '+8%' },
    { label: 'Matches Made', value: '15,893', change: '+23%' },
    { label: 'Revenue (KES)', value: '1.2M', change: '+15%' }
  ];

  return (
    <div className="min-h-screen bg-titan-dark text-titan-cream p-8">
      <h1 className="text-4xl font-bold text-titan-gold mb-8">Titanium ERP Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-titan-deep p-6 rounded-lg border border-titan-gold/20">
            <p className="text-titan-gold-light text-sm">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
            <p className="text-green-500 text-sm mt-2">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-titan-deep p-6 rounded-lg">
          <h2 className="text-xl font-bold text-titan-gold mb-4">Recent Matches</h2>
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-titan-gold/20">
                <th className="pb-2">Candidate</th>
                <th className="pb-2">Job</th>
                <th className="pb-2">Match %</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="py-2">John K.</td><td>Developer</td><td>94%</td></tr>
              <tr><td className="py-2">Mary W.</td><td>PM</td><td>87%</td></tr>
              <tr><td className="py-2">Peter O.</td><td>Designer</td><td>92%</td></tr>
            </tbody>
          </table>
        </div>
        
        <div className="bg-titan-deep p-6 rounded-lg">
          <h2 className="text-xl font-bold text-titan-gold mb-4">System Status</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>AI Agents</span>
              <span className="text-green-500">● Online</span>
            </div>
            <div className="flex justify-between">
              <span>Job Scanner</span>
              <span className="text-green-500">● Active</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Gateway</span>
              <span className="text-yellow-500">● Test Mode</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
