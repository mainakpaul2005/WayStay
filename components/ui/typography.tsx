import React from 'react'

export function H1({ children }: { children: React.ReactNode }) {
  return <h1 className="text-3xl font-extrabold tracking-tight">{children}</h1>
}

export function Lead({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-slate-600">{children}</p>
}
