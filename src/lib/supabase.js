import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database schema types for TypeScript-like development
export const TABLES = {
  USERS: 'users',
  SERVICES: 'services', 
  REQUESTS: 'requests',
  REVIEWS: 'reviews',
  SUBSCRIPTIONS: 'subscriptions',
  NOTIFICATIONS: 'notifications'
}

export const USER_ROLES = {
  REQUESTER: 'requester',
  PROVIDER: 'provider',
  ADMIN: 'admin'
}

export const REQUEST_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
}

export const SERVICE_CATEGORIES = {
  CLEANING: 'cleaning',
  DELIVERY: 'delivery',
  HANDYMAN: 'handyman',
  BEAUTY: 'beauty',
  TUTORING: 'tutoring',
  TRANSPORT: 'transport',
  TECH_SUPPORT: 'tech_support',
  OTHER: 'other'
}
