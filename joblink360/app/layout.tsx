import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AmandaWidget } from '@/components/AmandaWidget'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JobLink 360',
  description: 'Africa\'s first AI-powered career platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <AmandaWidget />
      </body>
    </html>
  )
}