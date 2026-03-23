import { notFound } from 'next/navigation';

export default function SubdomainPage({ params }: { params: { subdomain: string[] } }) {
  const brand = params.subdomain?.[0];
  
  return (
    <div className="p-20 text-center">
      <h1 className="text-4xl font-bold text-[#D4AF37]">Titanium Ecosystem</h1>
      <p className="mt-4 text-silver">Subsidiary Portal: {brand || 'Initializing...'}</p>
      <div className="mt-10 animate-pulse text-sm">Amanda Intelligence Swarm Synchronizing...</div>
    </div>
  );
}
