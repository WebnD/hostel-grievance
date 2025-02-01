import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { NextAuthProvider } from '@/providers/next-auth-providers'

export const metadata: Metadata = {
  title: 'Hostel Grievance Portal - IIT Bhubaneswar',
  description: 'Submit and track hostel-related grievances at IIT Bhubaneswar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
        <Navbar />
        {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}

