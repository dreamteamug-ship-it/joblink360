import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JobLink360 - Style Test',
  description: 'Testing Titan theme styling',
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
