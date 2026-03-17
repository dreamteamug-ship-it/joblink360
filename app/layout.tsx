import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JobLink360 - Titanium Enterprise',
  description: 'East Africa\'s AI-Powered Career Platform',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-titan-dark text-titan-cream min-h-screen-full">
        <div className="bg-gradient-titan min-h-screen-full">
          {children}
        </div>
      </body>
    </html>
  );
}
