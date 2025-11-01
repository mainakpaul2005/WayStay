import React from 'react'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { Dashboard } from '@/components/Dashboard'

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  )
}