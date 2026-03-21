// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined
  }
})

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error }
  
  // Store session
  if (data.session) {
    localStorage.setItem('supabase_session', JSON.stringify(data.session))
  }
  
  return { data, error }
}

export async function signUp(email: string, password: string, fullName?: string) {
  const redirectTo = `${window.location.origin}/auth/callback`
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName || email.split('@')[0] },
      emailRedirectTo: redirectTo
    }
  })
  
  if (error) return { error }
  return { data, error }
}

export async function signInWithMagicLink(email: string) {
  const redirectTo = `${window.location.origin}/auth/callback`
  
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
      shouldCreateUser: true
    }
  })
  
  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  localStorage.removeItem('supabase_session')
  return { error }
}

export async function resetPassword(email: string) {
  const redirectTo = `${window.location.origin}/auth/reset-password`
  
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo
  })
  
  return { data, error }
}

export async function updatePassword(newPassword: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  })
  return { data, error }
}