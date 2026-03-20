'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function HRModule() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "Sande Allan", role: "System Architect", status: "Active", joinDate: "2026-03-20" }
  ]);
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-amber-500">Human Resources</h1>
          <Link href="/erp" className="text-zinc-400 hover:text-amber-500">? Back to ERP</Link>
        </div>
        
        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Team Members</h2>
          <table className="w-full text-left">
            <thead className="border-b border-zinc-800">
              <tr>
                <th className="pb-2">ID</th>
                <th className="pb-2">Name</th>
                <th className="pb-2">Role</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Joined</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id} className="border-b border-zinc-800">
                  <td className="py-2">{emp.id}</td>
                  <td className="py-2">{emp.name}</td>
                  <td className="py-2">{emp.role}</td>
                  <td className="py-2 text-green-500">{emp.status}</td>
                  <td className="py-2">{emp.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
