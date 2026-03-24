import React from 'react';
import './globals.css';

export const metadata = {
  title: 'AMANDA Command Center',
  description: 'AI-Powered Sovereign Ecosystem | 312 Agents',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#050B14] text-white">
        {children}
      </body>
    </html>
  );
}
