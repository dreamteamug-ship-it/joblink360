// app/[...subdomain]/page.tsx
import { notFound } from 'next/navigation';

export default function SubdomainPage({ params }: { params: { subdomain: string[] } }) {
    const subdomain = params.subdomain?.[0];
    
    // Simple mapping - redirect to main site for now
    if (subdomain === 'altovex' || subdomain === 'urban-edge' || 
        subdomain === 'digital-den' || subdomain === 'dreamteq-360' ||
        subdomain === 'urbanis' || subdomain === 'sinoafric' ||
        subdomain === 'jetpro' || subdomain === 'balaji') {
        // Redirect to main site until fully built
        if (typeof window !== 'undefined') {
            window.location.href = '/';
        }
        return null;
    }
    
    return notFound();
}