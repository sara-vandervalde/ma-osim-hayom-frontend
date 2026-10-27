import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function GuestRoute({ children }: { children: ReactNode }) {
  const auth = useAuth()

  if (auth.loading) {
    return <p>טוען...</p>
  }

  if (auth.user) {
    return <Navigate to="/activities" replace />
  }

  return children
}