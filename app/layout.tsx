import '../styles/globals.css'
import React from 'react'
import Script from 'next/script'
import { Inter, Playfair_Display, Poppins } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import AppSidebar from '@/components/app-sidebar'
import { ThemeToggle } from '@/components/ui/theme-toggle'

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
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${playfairDisplay.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans">
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');var d=t? t==='dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;var e=document.documentElement;e.classList[d?'add':'remove']('dark');var m=document.querySelector('meta[name="color-scheme"]');if(!m){m=document.createElement('meta');m.name='color-scheme';document.head.appendChild(m);}m.content=d?'dark light':'light dark';}catch(e){}})();`}
        </Script>
        <AuthProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              {/* Top bar with trigger and theme toggle for mobile/desktop */}
              <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b bg-background/80 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <SidebarTrigger className="-ml-1" />
                <div className="ml-auto">
                  <ThemeToggle />
                </div>
              </header>
              <main className="min-h-[calc(100vh-3.5rem)] bg-background">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
