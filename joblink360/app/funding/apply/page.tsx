'use client';
export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function FundingApplyContent() {
  const searchParams = useSearchParams();
  const opportunityId = searchParams.get('id');
  
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-amber-500 mb-6">Apply for Funding</h1>
        {opportunityId && (
          <p className="text-zinc-400 mb-4">Application ID: {opportunityId}</p>
        )}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
          <p className="text-zinc-300">Funding application form will appear here.</p>
        </div>
      </div>
    </div>
  );
}

export default function FundingApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-amber-500">Loading...</div>
      </div>
    }>
      <FundingApplyContent />
    </Suspense>
  );
}

