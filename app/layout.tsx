import '../styles/globals.css'
import React from 'react'
import { Inter, Playfair_Display, Poppins } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import { Navbar } from '@/components/navbar'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  variable: '--font-geist-mono',
  weight: ['400', '500', '600', '700'],
})

const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair-display',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata = {
  title: 'WayStay — Your Perfect Stay Awaits',
  description: 'Discover unique accommodations and unforgettable experiences around the world'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${playfairDisplay.variable}`}>
      <body className="antialiased font-sans">
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen bg-background">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
