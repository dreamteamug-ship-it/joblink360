// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JobLink 360 - Transform Learners into Earners',
  description: 'Africa\'s premier AI-powered career platform. Pay KES 5,000 via M-Pesa Paybill 400200, Account 4045731.',
  keywords: 'AI careers, African jobs, funding, M-Pesa, Kenya, Nigeria, South Africa, Ghana',
  openGraph: {
    title: 'JobLink 360',
    description: 'Transform Learners into Earners in 90 Days',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}