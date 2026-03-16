import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Joblink 360 | Titanium ERP Intelligence',
  description: 'AI-powered employment platform connecting African talent to global opportunities',
  manifest: '/manifest.json',
  themeColor: '#070F1A',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=Montserrat:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
