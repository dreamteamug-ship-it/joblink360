import { redirect } from 'next/navigation';

// Hint to Next.js compiler what subdomains to expect for static generation
export function generateStaticParams() {
  return [
    { subdomain: ['delite-productions'] },
    { subdomain: ['altovex-logistics'] },
    { subdomain: ['jetpro-powerwash'] }
  ];
}

export default function SubdomainPage({ params }: { params: { subdomain?: string[] } }) {
  const brand = params.subdomain?.[0];
  
  if (!brand) {
    redirect('/delite-productions');
  }

  return (
    <div className="p-20 text-center bg-[#050B14] min-h-screen">
      <h1 className="text-4xl font-bold text-[#D4AF37]">Titanium Sovereign</h1>
      <p className="mt-4 text-gray-400 text-xl uppercase tracking-widest">Portal: {brand}</p>
      <div className="mt-10 animate-pulse text-sm text-[#C0C0C0]">Amanda Intelligence Matrix Active</div>
    </div>
  );
}
