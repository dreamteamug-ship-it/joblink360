// app/page.tsx - DreamTeam Consulting Mother Webapp
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DreamTeamConsulting() {
    const [systemHealth, setSystemHealth] = useState(98);
    const [activeAgents, setActiveAgents] = useState(312);

    // Subsidiaries data
    const subsidiaries = {
        primary: {
            name: "Delite Productions House",
            tradeName: "JobLinks Africa",
            domain: "deliteproductions.vercel.app",
            status: "active",
            description: "AI Skills Training | Job Placement | Funding & Tenders",
            metrics: { courses: 20, jobs: 82, funding: 68, tenders: 70, users: 1243 },
            icon: "??",
            isActive: true
        },
        logistics: {
            name: "Altovex Global Logistics",
            domain: "altovex.vercel.app",
            status: "active",
            description: "Lori Matchmaker | Fleet Management | Cross-Border Trade",
            metrics: { vehicles: 85, deliveries: 342, profit_margin: 28 },
            icon: "??"
        },
        auto: {
            name: "Jetpro Powerwash",
            domain: "jetpro-powerwash.odoo.com",
            status: "active",
            description: "Premium Auto Wash & Detailing",
            metrics: { appointments: 15, rating: 4.9 },
            icon: "??"
        },
        manufacturing: {
            name: "Balaji Hygiene Products Ltd",
            domain: "balaji-hygiene.vercel.app",
            status: "active",
            description: "Hygiene Product Manufacturing",
            metrics: { products: 28, orders: 156 },
            icon: "??"
        },
        landscaping: {
            name: "Urban Edge Landscaping",
            domain: "urban-edge.vercel.app",
            status: "active",
            description: "Smart Landscaping | Drone Surveillance",
            metrics: { projects: 65, drones: 4 },
            icon: "??"
        },
        iot: {
            name: "Digital Den",
            domain: "digital-den.vercel.app",
            status: "active",
            description: "IoT Hub | 3D Printing | Telematics",
            metrics: { devices: 1247, print_jobs: 8 },
            icon: "??"
        },
        agritech: {
            name: "DreamTeQ 360 Farmer",
            domain: "dreamteq-360.vercel.app",
            status: "active",
            description: "Farm Management | Loan Scoring",
            metrics: { farmers: 15234, loans: "4.2M" },
            icon: "??"
        },
        parking: {
            name: "Urbanis Parks Smart",
            domain: "urbanis.vercel.app",
            status: "active",
            description: "Mobile Parking Booking",
            metrics: { spots: 847, bookings: 234 },
            icon: "???"
        },
        ev: {
            name: "SinoAfric EV Mobility",
            domain: "sinoafric.vercel.app",
            status: "active",
            description: "Electric Vehicle Fleet | Carbon Credits",
            metrics: { vehicles: 128, carbon_credits: 2450 },
            icon: "?"
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#001F3F', color: '#F5F5DC' }}>
            {/* Header */}
            <header style={{ background: '#002B5C', padding: '20px', borderBottom: '2px solid #D4AF37' }}>
                <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ color: '#D4AF37', fontSize: '28px' }}>??? DreamTeam Consulting</h1>
                        <p style={{ color: '#C0C0C0' }}>Sovereign Intelligence Ecosystem</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <Link href="/command-center">
                            <button style={{ background: '#D4AF37', color: '#001F3F', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                                ?? CTO Command Centre
                            </button>
                        </Link>
                    </div>
                </div>
            </header>

            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
                {/* System Health Dashboard */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                    <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '20px', borderRadius: '12px', border: '1px solid #D4AF37' }}>
                        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#D4AF37' }}>{systemHealth}%</div>
                        <div>System Health</div>
                    </div>
                    <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '20px', borderRadius: '12px', border: '1px solid #D4AF37' }}>
                        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#D4AF37' }}>{activeAgents}</div>
                        <div>Active AI Agents</div>
                    </div>
                    <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '20px', borderRadius: '12px', border: '1px solid #D4AF37' }}>
                        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#D4AF37' }}>90%</div>
                        <div>AI Automation</div>
                    </div>
                    <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '20px', borderRadius: '12px', border: '1px solid #D4AF37' }}>
                        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#D4AF37' }}>24/7</div>
                        <div>Active Monitoring</div>
                    </div>
                </div>

                {/* PRIMARY SUBSIDIARY - DELITE PRODUCTIONS / JOBLINKS AFRICA */}
                <div style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)', borderRadius: '16px', padding: '4px', marginBottom: '40px' }}>
                    <div style={{ background: '#001F3F', borderRadius: '12px', padding: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                            <div>
                                <span style={{ background: '#D4AF37', color: '#001F3F', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                                    ACTIVE DEVELOPMENT
                                </span>
                                <h1 style={{ fontSize: '36px', marginTop: '15px', marginBottom: '5px' }}>
                                    {subsidiaries.primary.icon} {subsidiaries.primary.name}
                                </h1>
                                <h2 style={{ color: '#D4AF37', fontSize: '24px', marginBottom: '15px' }}>
                                    trading as {subsidiaries.primary.tradeName}
                                </h2>
                                <p style={{ fontSize: '18px', color: '#C0C0C0' }}>{subsidiaries.primary.description}</p>
                                <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
                                    <div><strong>?? Courses:</strong> {subsidiaries.primary.metrics.courses}</div>
                                    <div><strong>?? Jobs:</strong> {subsidiaries.primary.metrics.jobs}</div>
                                    <div><strong>?? Funding:</strong> {subsidiaries.primary.metrics.funding}</div>
                                    <div><strong>?? Tenders:</strong> {subsidiaries.primary.metrics.tenders}</div>
                                    <div><strong>?? Users:</strong> {subsidiaries.primary.metrics.users}</div>
                                </div>
                                <div style={{ marginTop: '25px', display: 'flex', gap: '15px' }}>
                                    <Link href="/lms">
                                        <button style={{ background: '#D4AF37', color: '#001F3F', padding: '12px 25px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                                            ?? Browse Courses
                                        </button>
                                    </Link>
                                    <Link href="/jobs">
                                        <button style={{ background: 'transparent', color: '#D4AF37', padding: '12px 25px', borderRadius: '8px', border: '1px solid #D4AF37', cursor: 'pointer' }}>
                                            ?? Find Jobs
                                        </button>
                                    </Link>
                                    <Link href="/funding">
                                        <button style={{ background: 'transparent', color: '#D4AF37', padding: '12px 25px', borderRadius: '8px', border: '1px solid #D4AF37', cursor: 'pointer' }}>
                                            ?? Get Funding
                                        </button>
                                    </Link>
                                    <Link href="/tenders">
                                        <button style={{ background: 'transparent', color: '#D4AF37', padding: '12px 25px', borderRadius: '8px', border: '1px solid #D4AF37', cursor: 'pointer' }}>
                                            ?? View Tenders
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div style={{ textAlign: 'center', padding: '20px' }}>
                                <div style={{ fontSize: '64px' }}>??</div>
                                <div style={{ fontSize: '12px', marginTop: '10px', color: '#D4AF37' }}>Delite Productions House</div>
                                <div style={{ fontSize: '10px', color: '#C0C0C0' }}>JobLinks Africa</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other Subsidiaries */}
                <h2 style={{ color: '#D4AF37', marginBottom: '20px' }}>?? Group Companies & Subsidiaries</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {Object.entries(subsidiaries).filter(([key]) => key !== 'primary').map(([key, sub]: [string, any]) => (
                        <div key={key} style={{ background: 'rgba(0, 43, 92, 0.8)', padding: '20px', borderRadius: '12px', border: '1px solid #D4AF37' }}>
                            <div style={{ fontSize: '32px' }}>{sub.icon}</div>
                            <h3 style={{ color: '#D4AF37', marginTop: '10px', marginBottom: '5px' }}>{sub.name}</h3>
                            <p style={{ fontSize: '12px', color: '#C0C0C0' }}>{sub.description}</p>
                            <div style={{ marginTop: '15px' }}>
                                {Object.entries(sub.metrics).map(([mKey, mValue]) => (
                                    <div key={mKey} style={{ display: 'flex', justifyContent: 'space-between', margin: '5px 0' }}>
                                        <span>{mKey}:</span>
                                        <span style={{ color: '#D4AF37' }}>{mValue}</span>
                                    </div>
                                ))}
                            </div>
                            <button style={{ marginTop: '15px', width: '100%', background: '#D4AF37', color: '#001F3F', padding: '8px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
                                Access Portal ?
                            </button>
                        </div>
                    ))}
                </div>

                {/* Titanium ERP Status */}
                <div style={{ marginTop: '40px', background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}>
                    <h2 style={{ color: '#D4AF37' }}>?? Titanium ERP Status</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '20px' }}>
                        <div>? Finance Module</div>
                        <div>? Manufacturing Module</div>
                        <div>? Logistics Module</div>
                        <div>? CRM Module</div>
                        <div>? Inventory Module</div>
                        <div>? HR Module</div>
                        <div>? Sales Module</div>
                        <div>? Procurement Module</div>
                    </div>
                </div>

                {/* Amanda AI Status */}
                <div style={{ marginTop: '40px', background: '#0A1A2F', padding: '20px', borderRadius: '12px' }}>
                    <h2 style={{ color: '#D4AF37' }}>?? Amanda AI Swarm - Active Agents</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', marginTop: '20px' }}>
                        <div>? Amanda-Finance</div>
                        <div>? Amanda-Sales</div>
                        <div>? Amanda-Lori (Altovex)</div>
                        <div>? Amanda-Recruit (JobLinks)</div>
                        <div>? Amanda-Marketing</div>
                        <div>? Amanda-Support</div>
                        <div>? Amanda-Inventory</div>
                        <div>? Amanda-Manufacturing</div>
                        <div>? Amanda-Logistics</div>
                        <div>? Amanda-Trade</div>
                        <div>? Amanda-Fleet</div>
                        <div>? + 300 more specialized agents</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
