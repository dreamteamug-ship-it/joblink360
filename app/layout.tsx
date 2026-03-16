import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#800000',
}

export const metadata: Metadata = {
  title: 'JobLink360 - Talent Marketplace',
  description: 'Connect with top agents and find your dream opportunity',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
