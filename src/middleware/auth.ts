import { useAuthStore } from 'src/stores/auth'

export default function authMiddleware (to: any, from: any, next: any) {
  const authStore = useAuthStore()

  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    // Check if user is authenticated
    if (!authStore.isAuthenticated) {
      // Redirect to auth page
      next('/auth')
      return
    }

    // Check if route requires admin access
    if (to.path.startsWith('/Admin')) {
      if (!authStore.isAdmin && !authStore.isModerator) {
        // Redirect to home page if not admin/moderator
        next('/')
        return
      }
    }
  }

  // Allow navigation
  next()
}
