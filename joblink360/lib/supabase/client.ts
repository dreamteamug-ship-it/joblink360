import { createClient as _createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder";

export const supabase = _createClient(url, key, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: "pkce",
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  },
});

export async function getCurrentUser() {
  try { const { data: { user } } = await supabase.auth.getUser(); return user; } catch { return null; }
}
export async function signIn(email: string, password: string) {
  return await supabase.auth.signInWithPassword({ email, password });
}
export async function signUp(email: string, password: string, fullName?: string) {
  const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : "";
  return await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName || email.split("@")[0] }, emailRedirectTo: redirectTo } });
}
export async function signInWithMagicLink(email: string) {
  const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : "";
  return await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo, shouldCreateUser: true } });
}
export async function signOut() {
  if (typeof window !== "undefined") localStorage.removeItem("supabase_session");
  return await supabase.auth.signOut();
}
export async function resetPassword(email: string) {
  const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/auth/reset-password` : "";
  return await supabase.auth.resetPasswordForEmail(email, { redirectTo });
}
export async function updatePassword(newPassword: string) {
  return await supabase.auth.updateUser({ password: newPassword });
}
