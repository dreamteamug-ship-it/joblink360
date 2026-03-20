'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AccountsModule() {
  const [invoices, setInvoices] = useState([
    { id: 1, student: "John Doe", amount: 1500, status: "Paid", date: "2026-03-20" }
  ]);
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-amber-500">Accounts</h1>
          <Link href="/erp" className="text-zinc-400 hover:text-amber-500">? Back to ERP</Link>
        </div>
        
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Invoices</h2>
          <table className="w-full text-left">
            <thead className="border-b border-zinc-800">
              <tr>
                <th className="pb-2">Invoice #</th>
                <th className="pb-2">Student</th>
                <th className="pb-2">Amount (KES)</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id} className="border-b border-zinc-800">
                  <td className="py-2">INV-{inv.id}</td>
                  <td className="py-2">{inv.student}</td>
                  <td className="py-2">{inv.amount}</td>
                  <td className="py-2 text-green-500">{inv.status}</td>
                  <td className="py-2">{inv.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
