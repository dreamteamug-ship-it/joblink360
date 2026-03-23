import React from 'react';
export default function SubdomainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='titanium-ecosystem-root'>
      {children}
    </main>
  );
}
