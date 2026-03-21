"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Define proper types
interface Contract {
  id: string;
  title: string;
  client: string;
  amount: number;
  currency: string;
  status: 'draft' | 'active' | 'completed' | 'expired';
  created_at: string;
}

interface Payment {
  id: string;
  transaction_id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
}

export default function AdminLegalPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Mock data for now - replace with actual API calls
      const mockContracts: Contract[] = [
        { id: '1', title: 'Student Agreement', client: 'John Doe', amount: 5000, currency: 'KES', status: 'active', created_at: new Date().toISOString() },
        { id: '2', title: 'Partner Agreement', client: 'Tech Corp', amount: 50000, currency: 'KES', status: 'draft', created_at: new Date().toISOString() },
      ];
      
      const mockPayments: Payment[] = [
        { id: '1', transaction_id: 'MPESA001', amount: 5000, currency: 'KES', status: 'completed', created_at: new Date().toISOString() },
        { id: '2', transaction_id: 'MPESA002', amount: 5000, currency: 'KES', status: 'pending', created_at: new Date().toISOString() },
      ];
      
      setContracts(mockContracts);
      setPayments(mockPayments);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚖️</div>
          <p>Loading legal documents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', color: '#fff', padding: '2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ background: '#7f1a1a', padding: '1rem', borderRadius: '0.5rem', color: '#f87171' }}>
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: 'system-ui' }}>
      {/* Navigation */}
      <nav style={{ borderBottom: '1px solid #333', background: '#000', padding: '1rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#f59e0b', margin: 0, fontSize: '1.5rem' }}>⚖️ JobLink 360 Legal</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/admin" style={{ color: '#9ca3af', textDecoration: 'none' }}>Dashboard</Link>
            <Link href="/pay" style={{ background: '#f59e0b', color: '#000', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 'bold' }}>Pay KES 5,000</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>Legal & Compliance</h1>
          <p style={{ color: '#9ca3af' }}>Contracts, payments, and regulatory documents</p>
        </div>

        {/* Contracts Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#f59e0b', marginBottom: '1rem' }}>📄 Active Contracts</h2>
          {contracts.length === 0 ? (
            <div style={{ background: '#111', padding: '2rem', borderRadius: '0.5rem', textAlign: 'center', color: '#9ca3af' }}>
              No contracts found
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {contracts.map(contract => (
                <div key={contract.id} style={{ background: '#111', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #222' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <h3 style={{ color: '#f59e0b', marginBottom: '0.25rem' }}>{contract.title}</h3>
                      <p style={{ fontSize: '0.875rem', color: '#9ca3af', margin: 0 }}>Client: {contract.client}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontWeight: 'bold', margin: 0 }}>{contract.currency} {contract.amount.toLocaleString()}</p>
                      <span style={{ fontSize: '0.75rem', color: contract.status === 'active' ? '#10b981' : '#f59e0b' }}>
                        {contract.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payments Section */}
        <div>
          <h2 style={{ color: '#f59e0b', marginBottom: '1rem' }}>💰 Recent Payments</h2>
          {payments.length === 0 ? (
            <div style={{ background: '#111', padding: '2rem', borderRadius: '0.5rem', textAlign: 'center', color: '#9ca3af' }}>
              No payments found
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {payments.map(payment => (
                <div key={payment.id} style={{ background: '#111', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #222' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <p style={{ fontFamily: 'monospace', marginBottom: '0.25rem' }}>{payment.transaction_id}</p>
                      <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>{new Date(payment.created_at).toLocaleDateString()}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontWeight: 'bold', margin: 0 }}>{payment.currency} {payment.amount.toLocaleString()}</p>
                      <span style={{ fontSize: '0.75rem', color: payment.status === 'completed' ? '#10b981' : '#f59e0b' }}>
                        {payment.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #222', textAlign: 'center', fontSize: '0.75rem', color: '#52525b' }}>
          <p>⚖️ NCBA Bank Account: 8515130017 | M-Pesa Paybill: 400200 | Account: 4045731</p>
          <p style={{ marginTop: '0.5rem' }}>© 2025 JobLink 360 - All contracts are legally binding under Kenyan law</p>
        </div>
      </div>
    </div>
  );
}