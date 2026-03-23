// app/joblinks/page.tsx
'use client';

import Link from 'next/link';

export default function JobLinksAfrica() {
    return (
        <div style={{ minHeight: '100vh', background: '#001F3F', color: '#F5F5DC' }}>
            <header style={{ background: '#002B5C', padding: '20px', borderBottom: '2px solid #D4AF37' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h1 style={{ color: '#D4AF37' }}>?? Delite Productions House</h1>
                    <h2 style={{ fontSize: '24px' }}>trading as <span style={{ color: '#D4AF37' }}>JobLinks Africa</span></h2>
                    <p>Stop Dreaming, Start Believing</p>
                </div>
            </header>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px', marginBottom: '60px' }}>
                    <div>
                        <h2 style={{ color: '#D4AF37', fontSize: '32px' }}>Your Gateway to AI Careers in Africa</h2>
                        <p style={{ fontSize: '18px', lineHeight: '1.6', marginTop: '20px' }}>
                            JobLinks Africa connects you with the skills, opportunities, and funding needed to succeed in the digital economy.
                        </p>
                        <div style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
                            <Link href="/signup">
                                <button style={{ background: '#D4AF37', color: '#001F3F', padding: '12px 30px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                                    Get Started ?
                                </button>
                            </Link>
                            <Link href="/lms">
                                <button style={{ background: 'transparent', color: '#D4AF37', padding: '12px 30px', borderRadius: '8px', border: '1px solid #D4AF37', cursor: 'pointer' }}>
                                    Explore Courses
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div style={{ background: '#0A1A2F', borderRadius: '16px', padding: '30px', textAlign: 'center' }}>
                        <div style={{ fontSize: '48px' }}>??</div>
                        <h3>Current Opportunities</h3>
                        <div style={{ marginTop: '20px' }}>
                            <div>?? 20+ AI Courses</div>
                            <div>?? 80+ Job Openings</div>
                            <div>?? 60+ Funding Opportunities</div>
                            <div>?? 70+ Government Tenders</div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                    <Link href="/lms">
                        <div style={{ background: '#0A1A2F', padding: '30px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer' }}>
                            <div style={{ fontSize: '48px' }}>??</div>
                            <h3>Courses</h3>
                            <p>20+ AI & Digital Skills Courses</p>
                        </div>
                    </Link>
                    <Link href="/jobs">
                        <div style={{ background: '#0A1A2F', padding: '30px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer' }}>
                            <div style={{ fontSize: '48px' }}>??</div>
                            <h3>Jobs</h3>
                            <p>80+ Career Opportunities</p>
                        </div>
                    </Link>
                    <Link href="/funding">
                        <div style={{ background: '#0A1A2F', padding: '30px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer' }}>
                            <div style={{ fontSize: '48px' }}>??</div>
                            <h3>Funding</h3>
                            <p>60+ Grants & Scholarships</p>
                        </div>
                    </Link>
                    <Link href="/tenders">
                        <div style={{ background: '#0A1A2F', padding: '30px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer' }}>
                            <div style={{ fontSize: '48px' }}>??</div>
                            <h3>Tenders</h3>
                            <p>70+ Government Contracts</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
