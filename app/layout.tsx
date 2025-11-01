import '../styles/globals.css'
import React from 'react'
import { AuthProvider } from '@/contexts/AuthContext'
import { Navbar } from '@/components/navbar'

export const metadata = {
  title: 'WayStay — Welcome',
  description: 'A minimal Next.js + shadcn-style UI starter'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="container">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
