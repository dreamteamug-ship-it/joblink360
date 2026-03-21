// app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'JobLink 360 - Transform Learners into Earners',
  description: 'Africa\'s premier AI-powered career platform',
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