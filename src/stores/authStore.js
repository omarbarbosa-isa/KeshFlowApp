import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import useAuthUser from '@/composables/useAuthUser'

export const useAuthStore = defineStore('auth', () => {
  const auth = useAuthUser()

  // STATE
  const user = ref(null)
  const loading = ref(false)
  const initialized = ref(false)

  // GETTER
  const isAuthenticated = computed(() => !!user.value)

  // ACTIONS
  async function login(credentials) {
    loading.value = true

    try {
      const data = await auth.login(credentials)
      user.value = data.user

      return data
    } finally {
      loading.value = false
    }
  }

  async function register(form) {
    loading.value = true

    try {
      const data = await auth.register(form)
      if (data?.session?.user) {
        user.value = data.session.user
      }
      return data
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    loading.value = true

    try {
      await auth.logout()
      user.value = null
    } finally {
      loading.value = false
    }
  }

  async function sendPassResetEmail(email) {
    loading.value = true

    try {
      return await auth.sendPassResetEmail(email)
    } finally {
      loading.value = false
    }
  }

  async function initialize() {
    if (initialized.value) return

    auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null
    })

    try {
      const session = await auth.getSession()
      user.value = session?.user ?? null
    } finally {
      initialized.value = true
    }
  }

  return {
    user,
    loading,
    initialized,
    isAuthenticated,
    login,
    register,
    logout,
    sendPassResetEmail,
    initialize
  }
})
