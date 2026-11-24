import { defineBoot } from '#q-app'
import { useAuthStore } from '../stores/authStore.js'

export default defineBoot(async ({ store, router }) => {
  const authStore = useAuthStore(store)

  // Restaurar sessão ao iniciar
  await authStore.initialize()

  router.beforeEach(to => {
    // Rotas privadas
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      return {
        name: 'login',
        query: { redirect: to.fullPath }
      }
    }

    // Login e registo não são necessários
    // para utilizadores autenticados
    if (to.meta.guestOnly && authStore.isAuthenticated) {
      return { name: 'dashboard' }
    }
  })
})
