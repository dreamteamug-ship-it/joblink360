// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import { supabase } from '@/lib/supabase/client';

export default function DashboardPage() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);
    const [enrollments, setEnrollments] = useState<any[]>([]);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
        if (user) {
            fetchProfile();
            fetchEnrollments();
        }
    }, [user, loading]);

    const fetchProfile = async () => {
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user?.id)
            .single();
        setProfile(data);
    };

    const fetchEnrollments = async () => {
        const { data } = await supabase
            .from('enrollments')
            .select('*, courses(*)')
            .eq('user_id', user?.id);
        setEnrollments(data || []);
    };

    if (loading) {
        return <div style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
    }

    if (!user) return null;

    return (
        <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff' }}>
            <header style={{ background: '#000', padding: '1rem', borderBottom: '1px solid #333' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href="/" style={{ color: '#f59e0b', textDecoration: 'none', fontWeight: 'bold' }}>JobLink 360</Link>
                    <div>
                        <Link href="/lms" style={{ color: '#9ca3af', marginRight: '1rem', textDecoration: 'none' }}>Courses</Link>
                        <Link href="/jobs" style={{ color: '#9ca3af', marginRight: '1rem', textDecoration: 'none' }}>Jobs</Link>
                        <Link href="/funding" style={{ color: '#9ca3af', marginRight: '1rem', textDecoration: 'none' }}>Funding</Link>
                        <button onClick={signOut} style={{ background: '#333', color: '#fff', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>Sign Out</button>
                    </div>
                </div>
            </header>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ color: '#f59e0b' }}>Welcome back, {profile?.full_name || user.email?.split('@')[0]}!</h1>
                    <p style={{ color: '#9ca3af' }}>Your learning journey continues</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    <div style={{ background: '#111', borderRadius: '1rem', padding: '1.5rem' }}>
                        <h3 style={{ color: '#f59e0b' }}>?? My Courses</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '1rem' }}>{enrollments.length}</p>
                        <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Courses enrolled</p>
                        <Link href="/lms" style={{ display: 'inline-block', marginTop: '1rem', color: '#f59e0b', textDecoration: 'none' }}>Browse more ?</Link>
                    </div>

                    <div style={{ background: '#111', borderRadius: '1rem', padding: '1.5rem' }}>
                        <h3 style={{ color: '#f59e0b' }}>?? Job Matches</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '1rem' }}>12</p>
                        <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>New opportunities</p>
                        <Link href="/jobs" style={{ display: 'inline-block', marginTop: '1rem', color: '#f59e0b', textDecoration: 'none' }}>View jobs ?</Link>
                    </div>

                    <div style={{ background: '#111', borderRadius: '1rem', padding: '1.5rem' }}>
                        <h3 style={{ color: '#f59e0b' }}>?? Funding Alerts</h3>
                        <p style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '1rem' }}>8</p>
                        <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Active grants</p>
                        <Link href="/funding" style={{ display: 'inline-block', marginTop: '1rem', color: '#f59e0b', textDecoration: 'none' }}>View funding ?</Link>
                    </div>
                </div>

                {enrollments.length > 0 && (
                    <div style={{ marginTop: '2rem' }}>
                        <h2 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Continue Learning</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {enrollments.slice(0, 3).map((enrollment) => (
                                <div key={enrollment.id} style={{ background: '#111', borderRadius: '1rem', padding: '1rem', border: '1px solid #222' }}>
                                    <h3 style={{ color: '#fff' }}>{enrollment.courses?.title}</h3>
                                    <div style={{ marginTop: '0.5rem' }}>
                                        <div style={{ background: '#1a1a1a', borderRadius: '0.5rem', height: '4px' }}>
                                            <div style={{ background: '#f59e0b', width: `${enrollment.progress_percent || 0}%`, height: '4px', borderRadius: '0.5rem' }}></div>
                                        </div>
                                        <p style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.25rem' }}>{enrollment.progress_percent || 0}% complete</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
