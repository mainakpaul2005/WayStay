import React from 'react'

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      {children}
    </div>
  )
}
