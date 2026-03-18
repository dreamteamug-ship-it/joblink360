// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Joblink 360 | Titanium ERP',
  description: 'Africa\'s AI-Powered Career Platform',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-delite-darker text-delite-cream min-h-screen">
        {children}
      </body>
    </html>
  );
}
