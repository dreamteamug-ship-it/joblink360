// components/Footer.tsx
'use client';
import Link from 'next/link';

export default function Footer() {
  const socials = [
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com/joblink360' },
    { name: 'LinkedIn', icon: '🔗', url: 'https://linkedin.com/company/joblink360' },
    { name: 'YouTube', icon: '📺', url: 'https://youtube.com/@joblink360' },
    { name: 'Podcast', icon: '🎙️', url: 'https://podcast.joblink360.com' },
    { name: 'Instagram', icon: '📷', url: 'https://instagram.com/joblink360' },
    { name: 'WhatsApp', icon: '💬', url: 'https://wa.me/254718554383' },
  ];

  return (
    <footer className="bg-zinc-900/50 border-t border-amber-500/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-amber-500 font-bold text-lg mb-4">JobLink 360</h3>
            <p className="text-zinc-400 text-sm">Africa's first AI-powered career platform connecting talent with global opportunities.</p>
            <p className="text-zinc-500 text-xs mt-2">A Division of DreamTeam Consulting</p>
            <p className="text-zinc-500 text-xs">Delite Productions House</p>
          </div>
          <div>
            <h3 className="text-amber-500 font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/lms" className="text-zinc-400 hover:text-amber-500">Academy</Link></li>
              <li><Link href="/deal-room" className="text-zinc-400 hover:text-amber-500">Deal Room</Link></li>
              <li><Link href="/titanium-erp" className="text-zinc-400 hover:text-amber-500">Titanium ERP</Link></li>
              <li><Link href="/contact" className="text-zinc-400 hover:text-amber-500">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-amber-500 font-bold text-lg mb-4">Contact</h3>
            <p className="text-zinc-400 text-sm">Off Mombasa Road,</p>
            <p className="text-zinc-400 text-sm">Hari Industrial Park,</p>
            <p className="text-zinc-400 text-sm">Nairobi, Kenya</p>
            <p className="text-zinc-400 text-sm mt-2">📞 +254 718 554 383</p>
            <p className="text-zinc-400 text-sm">📧 dtc@dreamteamconsult.net</p>
          </div>
          <div>
            <h3 className="text-amber-500 font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex flex-wrap gap-3 mb-4">
              {socials.map(s => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="text-2xl hover:scale-110 transition" title={s.name}>
                  {s.icon}
                </a>
              ))}
            </div>
            <p className="text-zinc-500 text-xs">Managed by DreamTeam Consulting</p>
            <p className="text-zinc-500 text-xs">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </div>
        <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-zinc-500 text-sm">
          <p>Delite Productions House | JobLinks Africa | Building Africa's Digital Workforce</p>
        </div>
      </div>
    </footer>
  );
}