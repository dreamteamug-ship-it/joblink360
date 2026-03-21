// app/employer/dashboard/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function EmployerDashboard() {
  const [employer, setEmployer] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    loadEmployerData();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) router.push('/login');
  };

  const loadEmployerData = async () => {
    const { data: employerData } = await supabase
      .from('employers')
      .select('*')
      .single();
    setEmployer(employerData);
    
    const { data: jobsData } = await supabase
      .from('jobs')
      .select('*')
      .eq('employer_id', employerData?.id);
    setJobs(jobsData || []);
    setLoading(false);
  };

  const postJob = async () => {
    // Open job posting modal
    alert('Job posting form coming soon!');
  };

  if (loading) return <div className="min-h-screen bg-black text-white p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-amber-500">Employer Dashboard</h1>
            <p className="text-zinc-400">Welcome back, {employer?.name}</p>
          </div>
          <button onClick={postJob} className="bg-amber-600 hover:bg-amber-500 px-6 py-3 rounded-lg font-bold">
            + Post New Job
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h3 className="text-zinc-400 text-sm">Active Jobs</h3>
            <p className="text-3xl font-bold text-amber-500">{jobs.filter(j => j.status === 'active').length}</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h3 className="text-zinc-400 text-sm">Applications Received</h3>
            <p className="text-3xl font-bold text-amber-500">0</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl">
            <h3 className="text-zinc-400 text-sm">Hires Made</h3>
            <p className="text-3xl font-bold text-amber-500">0</p>
          </div>
        </div>

        {/* Job Listings */}
        <h2 className="text-2xl font-bold mb-4">Your Job Listings</h2>
        <div className="space-y-4">
          {jobs.map(job => (
            <div key={job.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                  <p className="text-zinc-400 mb-2">Category: {job.category}</p>
                  <p className="text-zinc-400">Salary: {job.salary_range?.min} - {job.salary_range?.max} {job.salary_range?.currency}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${job.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'}`}>
                  {job.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}