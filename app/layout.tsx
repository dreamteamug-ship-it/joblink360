import './globals.css';
import CommandGuard from '@/components/CommandGuard';

export const metadata = {
  title: 'JobLink 360 | Titanium Enterprise',
  description: 'Ultra-Luxury Career & Logistics Management',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CommandGuard>
          {children}
        </CommandGuard>
      </body>
    </html>
  );
}
