import { redirect } from 'next/navigation';

export default function SubdomainPage({ params }: { params: { subdomain?: string[] } }) {
  const brand = params.subdomain?.[0];
  
  // If no subdomain, redirect to primary subsidiary
  if (!brand) {
    redirect('/delite-productions');
  }

  return (
    <div className="p-20 text-center bg-[#050B14] min-h-screen">
      <h1 className="text-4xl font-bold text-[#D4AF37]">Titanium Sovereign</h1>
      <p className="mt-4 text-gray-400">Portal: {brand.toUpperCase()}</p>
      <div className="mt-10 animate-pulse text-sm text-[#C0C0C0]">Amanda Intelligence Syncing...</div>
    </div>
  );
}
