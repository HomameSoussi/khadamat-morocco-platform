import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth.jsx'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import Layout from '../layout/Layout'
import Dashboard from '../pages/Dashboard'

export default function AuthWrapper() {
  const { user, loading } = useAuth()
  const [showSignup, setShowSignup] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {showSignup ? (
            <SignupForm
              onSuccess={() => {
                // User will be automatically redirected after successful signup
              }}
              onSwitchToLogin={() => setShowSignup(false)}
            />
          ) : (
            <LoginForm
              onSuccess={() => {
                // User will be automatically redirected after successful login
              }}
              onSwitchToSignup={() => setShowSignup(true)}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <Dashboard />
    </Layout>
  )
}
