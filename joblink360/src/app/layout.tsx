// src/app/layout.tsx
// Root Layout with Maasai Luxury Theme & Amanda Widget

import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { AmandaWidget } from '@/components/AmandaWidget'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'JobLink 360 - Africa\'s Premier AI Career Platform',
  description: 'Transform learners into earners within 90 days. AI-powered career matching, funding opportunities, and premium courses.',
  keywords: 'AI careers, African jobs, funding, grants, courses, Kenya, Nigeria, South Africa',
  openGraph: {
    title: 'JobLink 360',
    description: 'Transform learners into earners within 90 days',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-night-black text-white">
        {children}
        <AmandaWidget />
      </body>
    </html>
  )
}