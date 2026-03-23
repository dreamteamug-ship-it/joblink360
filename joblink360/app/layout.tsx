import React from 'react';
import './globals.css';
import { AuthProvider } from '@/lib/auth/AuthContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#050B14', color: 'white' }}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
