import { boot } from 'quasar/wrappers'
import pinia from 'src/stores'
import { useAuthStore } from 'src/stores/auth'

export default boot(({ app }) => {
  app.use(pinia)

  // Initialize auth store
  const authStore = useAuthStore()
  authStore.initAuth()
})
