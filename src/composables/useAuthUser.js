import useSupabase from '@/boot/supabase'

export default function useAuthUser() {
  const { supabase } = useSupabase()

  const register = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/#/login`
      }
    })
    if (error) throw error

    return data
  }

  const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    return data
  }

  const loginWithSocial = async provider => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider
    })

    if (error) throw error
    return data
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const updated = async data => {
    const { data: result, error } = await supabase.auth.updateUser(data)
    if (error) throw error
    return result
  }

  const sendPassResetEmail = async email => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
    return data
  }

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return data.session
  }

  const onAuthStateChange = callback => {
    return supabase.auth.onAuthStateChange(callback)
  }

  return {
    register,
    login,
    loginWithSocial,
    logout,
    updated,
    sendPassResetEmail,
    getSession,
    onAuthStateChange
  }
}
